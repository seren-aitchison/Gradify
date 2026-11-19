# Render a 3D model's preview still in Blender Cycles at 4K (3840x2160), from the scene and camera that
# scripts/blender/export-scenes.cjs exported out of the live viewer. Studio set-up: a soft key, fill and rim
# (area lights), a dark backdrop like the viewer's, a shadow-catching floor, filmic colour (AgX), and
# OpenImageDenoise. The PNG it writes is made into AVIF/WebP sizes by scripts/blender/encode-previews.mjs.
#   python render-previews.py <scene.glb> <scene.json> <out.png> [samples] [width height]
import bpy, sys, json, math
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
GLB, INFO, OUT = args[:3]
SAMPLES = int(args[3]) if len(args) > 3 else 96
W, H = (int(args[4]), int(args[5])) if len(args) > 5 else (3840, 2160)
info = json.load(open(INFO))
gl = lambda v: Vector((v[0], -v[2], v[1]))   # glTF / three.js (y up) -> Blender (z up)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=GLB)
sc = bpy.context.scene
meshes = [o for o in sc.objects if o.type == "MESH"]
for o in meshes:
    for p in o.data.polygons: p.use_smooth = True   # three's shading is smooth; the exporter keeps the normals
    # the viewer's see-through housings and skin are tinted, alpha-blended panels: glass (transmission) in
    # Cycles would light them up white, so keep them as alpha translucency like the viewer draws them
    for slot in o.material_slots:
        bsdf = slot.material and slot.material.node_tree and slot.material.node_tree.nodes.get("Principled BSDF")
        # three's sheen and clearcoat are far gentler than Cycles' at the same values (glTF has no sheen strength,
        # so the importer sets it to full): left as imported they lay a grey veil over every dark surface
        if bsdf:
            bsdf.inputs["Sheen Weight"].default_value = 0.0
            bsdf.inputs["Coat Weight"].default_value *= 0.5
        if bsdf and bsdf.inputs["Transmission Weight"].default_value > 0:
            bsdf.inputs["Transmission Weight"].default_value = 0.0
            if not bsdf.inputs["Alpha"].is_linked: bsdf.inputs["Alpha"].default_value = min(bsdf.inputs["Alpha"].default_value, 0.35)

# bounds of everything, for the floor and the lights
pts = [o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]
lo = Vector(map(min, *pts)); hi = Vector(map(max, *pts)); size = (hi - lo).length; ctr = (lo + hi) / 2

# camera: the viewer's default view
cam_data = bpy.data.cameras.new("cam"); cam = bpy.data.objects.new("cam", cam_data); sc.collection.objects.link(cam)
cam_data.sensor_fit = "VERTICAL"; cam_data.angle_y = math.radians(info["fov"]); cam_data.clip_start = 0.001; cam_data.clip_end = 200
cam.location = gl(info["pos"]); target = gl(info["target"])
cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
sc.camera = cam
# a gentle depth of field, focused on the orbit target
cam_data.dof.use_dof = True; cam_data.dof.focus_distance = (target - cam.location).length; cam_data.dof.aperture_fstop = 8

def area(name, loc, energy, size_, colour):
    d = bpy.data.lights.new(name, "AREA"); d.energy = energy; d.size = size_; d.color = colour; d.shape = "DISK"
    o = bpy.data.objects.new(name, d); sc.collection.objects.link(o); o.location = loc
    o.rotation_euler = (ctr - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
s = max(size, 0.3)
area("key", ctr + Vector((1.2, -2.0, 1.6)) * s, 140 * s * s, 1.2 * s, (1.0, 0.96, 0.91))
area("fill", ctr + Vector((-2.0, -1.2, 0.6)) * s, 40 * s * s, 2.0 * s, (0.9, 0.94, 1.0))
area("rim", ctr + Vector((-0.8, 2.2, 1.8)) * s, 110 * s * s, 1.0 * s, (1.0, 1.0, 1.0))

# floor that only catches shadows
bpy.ops.mesh.primitive_plane_add(size=s * 12, location=(ctr.x, ctr.y, lo.z - 0.0005))
floor = bpy.context.active_object; floor.is_shadow_catcher = True

# backdrop: a dark radial studio gradient, seen by the camera only; lighting comes from the area lights
# and a dim neutral world for fill
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
nt = world.node_tree; nt.nodes.clear()
bg_light = nt.nodes.new("ShaderNodeBackground"); bg_light.inputs[0].default_value = (0.32, 0.32, 0.34, 1); bg_light.inputs[1].default_value = 0.25
bg_cam = nt.nodes.new("ShaderNodeBackground"); bg_cam.inputs[1].default_value = 1.0
# radial gradient in window space for what the camera sees
tc = nt.nodes.new("ShaderNodeTexCoord"); grad = nt.nodes.new("ShaderNodeTexGradient"); grad.gradient_type = "SPHERICAL"
mp = nt.nodes.new("ShaderNodeMapping"); mp.inputs["Location"].default_value = (-0.5, -0.42, 0); mp.inputs["Scale"].default_value = (1.1, 1.6, 1)
ramp = nt.nodes.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.0; ramp.color_ramp.elements[0].color = (0.010, 0.010, 0.012, 1)
ramp.color_ramp.elements[1].position = 1.0; ramp.color_ramp.elements[1].color = (0.075, 0.075, 0.085, 1)
nt.links.new(tc.outputs["Window"], mp.inputs["Vector"]); nt.links.new(mp.outputs["Vector"], grad.inputs["Vector"])
nt.links.new(grad.outputs["Fac"], ramp.inputs["Fac"]); nt.links.new(ramp.outputs["Color"], bg_cam.inputs["Color"])
lp = nt.nodes.new("ShaderNodeLightPath"); mix = nt.nodes.new("ShaderNodeMixShader"); outn = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs[0]); nt.links.new(bg_light.outputs[0], mix.inputs[1]); nt.links.new(bg_cam.outputs[0], mix.inputs[2])
nt.links.new(mix.outputs[0], outn.inputs["Surface"])

# render
sc.render.engine = "CYCLES"; cy = sc.cycles
cy.device = "CPU"; cy.samples = SAMPLES; cy.use_adaptive_sampling = True; cy.adaptive_threshold = 0.02
cy.use_denoising = True; cy.denoiser = "OPENIMAGEDENOISE"
cy.max_bounces = 6; cy.transparent_max_bounces = 16; cy.caustics_reflective = cy.caustics_refractive = False
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = W, H, 100
sc.render.film_transparent = False
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Punchy"   # keeps tissue and paint colours saturated
sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_depth = "8"
sc.render.filepath = OUT
bpy.ops.render.render(write_still=True)
print("RENDERED", OUT)
