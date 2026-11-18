"""Stage 2 of Gradify's visual pipeline: Blender builds and renders a molecule that passed stage 1's checks.

    blender -b --factory-startup -P scripts/visuals/blender_molecule.py -- <molecule.json> <out-dir>

Makes a ball-and-stick model (CPK colours; atoms at 0.3 × their van der Waals radius so bonds stay visible; double
and triple bonds drawn as two or three parallel sticks), then:
  <out-dir>/<id>.glb   the model for the browser (kit/visuals/viewer.js turns it, labels it and asks questions)
  <out-dir>/<id>.webp  a studio render (Cycles), for posters, explainers, print and anywhere 3D can't run
Every position comes from stage 1's verified structure; Blender changes nothing about the chemistry.
"""
import bpy, json, math, sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:]
mol = json.load(open(args[0]))
out = args[1]
MID = mol["id"]

# CPK-style colours (Jmol palette) and van der Waals radii (Å, Bondi / Alvarez)
COLOUR = {"H": (1, 1, 1), "C": (0.18, 0.18, 0.2), "N": (0.19, 0.31, 0.97), "O": (1, 0.05, 0.05), "S": (1, 0.85, 0.2), "Cl": (0.12, 0.94, 0.12), "P": (1, 0.5, 0), "F": (0.56, 0.88, 0.31)}
VDW = {"H": 1.2, "C": 1.7, "N": 1.55, "O": 1.52, "S": 1.8, "Cl": 1.75, "P": 1.8, "F": 1.47}

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def material(name, rgb, rough=0.35):
    m = bpy.data.materials.get(name)
    if m: return m
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*[c ** 2.2 for c in rgb], 1)   # sRGB → linear
    p.inputs["Roughness"].default_value = rough
    if "Coat Weight" in p.inputs: p.inputs["Coat Weight"].default_value = 0.4
    return m

pos = [Vector((a["x"], a["y"], a["z"])) for a in mol["atoms"]]
radius = lambda el: VDW.get(el, 1.6) * 0.3
# one shared sphere mesh per element, so the .glb stays small
meshes = {}
for i, a in enumerate(mol["atoms"]):
    el = a["el"]
    if el not in meshes:
        bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=radius(el))
        meshes[el] = bpy.context.object.data; meshes[el].name = f"atom-{el}"
        bpy.ops.object.shade_smooth()
        bpy.data.objects.remove(bpy.context.object)
        meshes[el].materials.append(material(f"el-{el}", COLOUR.get(el, (0.8, 0.5, 0.9))))
    o = bpy.data.objects.new(f"{el}{i}", meshes[el]); o.location = pos[i]
    o["atom"] = i; o["element"] = el
    scene.collection.objects.link(o)

stick = material("bond", (0.72, 0.72, 0.76), 0.45)
def cylinder(p, q, r, name):
    d = q - p
    bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=r, depth=d.length, location=(p + q) / 2)
    o = bpy.context.object; o.name = name
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    bpy.ops.object.shade_smooth(); o.data.materials.append(stick)
    return o

for k, b in enumerate(mol["bonds"]):
    p, q = pos[b["a"]], pos[b["b"]]
    n = 2 if b["order"] == 2 else 3 if b["order"] == 3 else 1
    aromatic = b["order"] == 1.5   # aromatic (delocalised): a full stick and a thinner one beside it
    d = (q - p).normalized()
    side = d.cross(Vector((0, 0, 1)))
    if side.length < 1e-3: side = d.cross(Vector((0, 1, 0)))
    side.normalize()
    r = 0.07 if n == 1 else 0.05
    gap = 0.11
    if aromatic:
        cylinder(p, q, 0.06, f"bond{k}-0"); cylinder(p + side * gap, q + side * gap, 0.025, f"bond{k}-1"); continue
    offs = [0] if n == 1 else [-gap / 2, gap / 2] if n == 2 else [-gap, 0, gap]
    for j, off in enumerate(offs):
        cylinder(p + side * off, q + side * off, r, f"bond{k}-{j}")

# export the model for the browser before lights and camera are added
bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(filepath=f"{out}/{MID}.glb", export_format="GLB", use_selection=True, export_apply=True, export_yup=True)

# studio render
# frame the molecule face-on (stage 1 put its flattest axis along z), tilted a little for depth
half_w = max((abs(p.x) for p in pos), default=0.5) + 0.6
half_h = max((abs(p.y) for p in pos), default=0.5) + 0.6
extent = max(half_w, half_h * 4 / 3, 2.1)   # small molecules still have room around them
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam")); scene.collection.objects.link(cam)
cam.data.lens = 50
dist = extent / (18 / 50) * 1.08
cam.location = Vector((dist * 0.22, -dist * 0.32, dist * 0.92))
cam.rotation_euler = (Vector((0, 0, 0)) - cam.location).to_track_quat("-Z", "Y").to_euler()
scene.camera = cam
for name, loc, power, size in [("key", (4, -4, 6), 900, 4), ("fill", (-5, -2, 2), 300, 6), ("rim", (0, 5, 4), 500, 3)]:
    L = bpy.data.objects.new(name, bpy.data.lights.new(name, "AREA")); L.data.energy = power * (extent / 2) ** 2; L.data.size = size * extent / 2
    L.location = Vector(loc) * (extent / 2 + 1); L.rotation_euler = (Vector((0, 0, 0)) - L.location).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(L)
world = bpy.data.worlds.new("w"); scene.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.02, 0.02, 0.03, 1)
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
scene.render.engine = "CYCLES"; scene.cycles.device = "CPU"; scene.cycles.samples = 96; scene.cycles.use_denoising = False   # this Blender build has no OpenImageDenoise: more samples instead
scene.render.film_transparent = True
scene.render.resolution_x, scene.render.resolution_y = 1200, 900
scene.render.image_settings.file_format = "WEBP"; scene.render.image_settings.color_mode = "RGBA"; scene.render.image_settings.quality = 84
scene.view_settings.view_transform = "Filmic" if "Filmic" in [v.identifier for v in scene.view_settings.bl_rna.properties["view_transform"].enum_items] else "Standard"
scene.render.filepath = f"{out}/{MID}.webp"
bpy.ops.render.render(write_still=True)
print(f"GRADIFY-RENDERED {MID}")
