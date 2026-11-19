# Build the HD anatomy layer (kit/vendor/anatomy/anatomy-hd.glb) in Blender: the skull, mandible and teeth,
# from a higher-detail source than anatomy-male.glb, refined so they hold up at 4K and close up.
#
# Sources (either works; scripts/build-anatomy-hd.sh uses Z-Anatomy):
#   - Z-Anatomy (github.com/Z-Anatomy/Models-of-human-anatomy, CC BY-SA 4.0): the Startup.blend of its
#     Blender template. Artist-cleaned BodyParts3D, with the sphenoid, ethmoid and vomer and denser
#     mandible and molars. Pass the .blend.
#   - BodyParts3D 4.3 full resolution (github.com/olivercase/body_parts_3d_api, © DBCLS): pass a folder with
#     one sub-folder of .obj files per key.
#
# For each structure: take the source meshes (modifiers applied), put them in the frame of anatomy-male.glb
# (metres, Y up, facing +z; the glTF exporter turns Blender's Z up into Y up) with one similarity transform
# fitted on the skull, weld seams, subdivide (Catmull-Clark) so curves stay round, shade smooth with
# weighted normals, and export one mesh per catalog key. gltfpack compresses the result.
#
#   python refine-anatomy.py <Startup.blend | BodyParts3D folder> <current anatomy-male.glb> <out.glb>
import bpy, bmesh, sys, json, struct, os, re
from mathutils import Vector, Matrix

SRC, CURRENT, OUT = sys.argv[-3:]
ZA = SRC.endswith(".blend")
# key -> (Catmull-Clark levels, Z-Anatomy object names). The skull goes first: it sets the transform for the rest.
PARTS = {
    "skull": (1, r"^(frontal|occipital|sphenoid|ethmoid) bone$|^(parietal|temporal|zygomatic|nasal|lacrimal|palatine) bone\.[lr]$|^maxilla\.[lr]$|^vomer$|^inferior nasal concha( bone)?\.[lr]$"),
    "mandible": (1, r"^mandible$"),
    "teeth": (1, r"^(upper|lower) .*(incisor|canine|premolar|molar)( tooth)?\.[lr]$"),
}

def current_boxes(path):
    """World-space bounds of each mesh in the current GLB, in Blender's frame, from the accessor min/max."""
    b = open(path, "rb").read(); n = struct.unpack("<I", b[12:16])[0]; j = json.loads(b[20:20 + n])
    out = {}
    for node in j["nodes"]:
        if "mesh" not in node: continue
        acc = j["accessors"][j["meshes"][node["mesh"]]["primitives"][0]["attributes"]["POSITION"]]
        q = 32767.0 if acc.get("normalized") else 1.0
        s, t = node.get("scale", [1, 1, 1]), node.get("translation", [0, 0, 0])
        lo = Vector([acc["min"][i] / q * s[i] + t[i] for i in range(3)]); hi = Vector([acc["max"][i] / q * s[i] + t[i] for i in range(3)])
        out[node["name"]] = (Vector((lo.x, -hi.z, lo.y)), Vector((hi.x, -lo.z, hi.y)))   # glTF (x, y up, z front) -> Blender (x, -y front, z up)
    return out

def bounds(objs):
    pts = [o.matrix_world @ v.co for o in objs for v in o.data.vertices]
    return Vector(map(min, *pts)), Vector(map(max, *pts))

boxes = current_boxes(CURRENT)
if ZA: bpy.ops.wm.open_mainfile(filepath=SRC, load_ui=False)
else: bpy.ops.wm.read_factory_settings(use_empty=True)
work = bpy.data.scenes.new("hd")

def from_blend(rx):
    """The Z-Anatomy objects for a key, as new plain meshes with their modifiers and world transform applied."""
    dg = bpy.context.evaluated_depsgraph_get(); out = []
    for o in list(bpy.data.objects):
        if o.type != "MESH" or not len(o.data.polygons) or not re.match(rx, o.name, re.I): continue
        me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), depsgraph=dg); me.transform(o.matrix_world)
        if o.matrix_world.determinant() < 0:   # Z-Anatomy's right-side bones are mirrored copies: baking the mirror turns them inside out
            bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.reverse_faces(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
        n = bpy.data.objects.new(o.name + ".hd", me); work.collection.objects.link(n); out.append(n)
    return out

def from_objs(key):
    out, folder = [], os.path.join(SRC, key)
    for f in sorted(os.listdir(folder)):
        if not f.endswith(".obj"): continue
        bpy.ops.wm.obj_import(filepath=os.path.join(folder, f), forward_axis="Y", up_axis="Z")   # keep the source's own axes (Z up)
        for o in list(bpy.context.selected_objects):
            o.data.transform(Matrix.Scale(0.001, 4))   # millimetres -> metres
            for c in list(o.users_collection): c.objects.unlink(o)
            work.collection.objects.link(o); out.append(o)
    return out

report, fit = {}, None
for key, (levels, rx) in PARTS.items():
    objs = from_blend(rx) if ZA else from_objs(key)
    if not objs: print("nothing for", key); continue
    for o in objs: o.data.transform(o.matrix_world); o.matrix_world = Matrix.Identity(4)
    if fit is None:   # one similarity transform for every part, fitted on the skull
        lo, hi = bounds(objs); tlo, thi = boxes["skull"]
        k = sum((thi[i] - tlo[i]) / (hi[i] - lo[i]) for i in range(3)) / 3
        fit = Matrix.Translation((tlo + thi) / 2) @ Matrix.Scale(k, 4) @ Matrix.Translation(-(lo + hi) / 2)
        report["fit_scale"] = round(k, 4)
    # weld, subdivide (applied through the evaluated mesh), join
    for o in objs:
        o.data.transform(fit)
        bm = bmesh.new(); bm.from_mesh(o.data); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6); bm.to_mesh(o.data); bm.free()
        m = o.modifiers.new("subsurf", "SUBSURF"); m.levels = m.render_levels = levels; m.quality = 3
        m.uv_smooth = "NONE"; m.boundary_smooth = "PRESERVE_CORNERS"
    work.view_layers[0].update(); dg = work.view_layers[0].depsgraph
    bm = bmesh.new()
    for o in objs:
        me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), depsgraph=dg); bm.from_mesh(me); bpy.data.meshes.remove(me)
        bpy.data.objects.remove(o)
    me = bpy.data.meshes.new(key); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(key, me); work.collection.objects.link(ob); ob.name = key
    me.shade_smooth()
    wn = ob.modifiers.new("wn", "WEIGHTED_NORMAL"); wn.keep_sharp = False; wn.weight = 50
    work.view_layers[0].update()
    ev = bpy.data.meshes.new_from_object(ob.evaluated_get(work.view_layers[0].depsgraph), depsgraph=work.view_layers[0].depsgraph)
    ob.modifiers.clear(); ob.data = ev; ev.name = key
    lo, hi = bounds([ob]); tlo, thi = boxes[key]
    report[key] = {"verts": len(ob.data.vertices), "faces": len(ob.data.polygons), "size_vs_current": [round((hi[i] - lo[i]) / (thi[i] - tlo[i]), 3) for i in range(3)],
                   "centre_offset_mm": [round(((lo + hi) / 2 - (tlo + thi) / 2)[i] * 1000, 1) for i in range(3)]}

for s in list(bpy.data.scenes):
    if s != work: bpy.data.scenes.remove(s)
for o in work.collection.objects: o.select_set(o.name in PARTS, view_layer=work.view_layers[0])
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", use_selection=True, export_normals=True,
                          export_materials="NONE", export_yup=True, export_apply=True)
print("REPORT", json.dumps(report))
