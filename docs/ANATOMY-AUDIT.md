# Anatomy model audit: what the existing asset can and can't do

**Asset:** `kit/vendor/anatomy/anatomy-male.glb`, BodyParts3D © DBCLS (CC BY 4.0), prepared by open-anatomy-3d (CC BY 4.0). 7.6 MB, meshopt-compressed, untextured. Audited 31 October 2026 by loading the file exactly as the site does, splitting every mesh into connected surfaces (vertices welded by position), and rendering the surfaces in distinct colours from the front and back to identify them.

## Summary

- The file contains **128 meshes, one surface primitive each, no materials or textures**. The catalogue (`catalog.json`) lists **147 entries**: the extra 19 are 12 joint anchors (points, not geometry) and 7 female-only organs that exist only in the separate female model, which is not in this repository.
- **Left/right is correct:** every `_l` mesh lies on the subject's left (+x), checked for all 34 paired muscle meshes.
- Muscles come as **41 group meshes** (e.g. "Quadriceps (L)"). But most group meshes are **assemblies of separate, unconnected surfaces**, one per original BodyParts3D muscle or muscle part. That is the key finding: individual muscles are recoverable from the existing file without a new asset.
- **Identified and now selectable as individual muscles** (in *Individual muscles* mode), by geometric rules in `kit/sport/anatomy-parts.js` that work identically on both sides (verified: same parts, matching triangle counts left and right, `tests/body.test.mjs`):
  - Quadriceps: rectus femoris, vastus lateralis, vastus medialis, vastus intermedius, **plus sartorius** (sartorius is included in the model's "quadriceps" mesh; it is labelled as sartorius, not as a quadriceps head)
  - Hamstrings: biceps femoris long head, biceps femoris short head, semitendinosus & semimembranosus (two surfaces that geometry can't tell apart reliably, so shown together)
  - Deltoid: anterior, lateral and posterior heads
  - Trapezius: upper, middle, lower
  - Rotator cuff: subscapularis, supraspinatus, infraspinatus, teres minor
  - Glutes: gluteus maximus, gluteus medius, gluteus minimus, tensor fasciae latae & iliotibial band, deep hip muscles (the remaining small surfaces, not individually named)
  - Adductors: adductor magnus, gracilis, adductor longus/brevis & pectineus (grouped)
  - Upper arm: biceps brachii, brachialis, coracobrachialis, triceps long head, triceps lateral & medial heads (grouped), anconeus
  - Chest: pectoralis major clavicular head; sternocostal head with pectoralis minor (grouped, because the deep surfaces can't be separated reliably)
  - Hip flexors: psoas major, iliacus
  - Abdominals: left and right halves only (rectus abdominis and the obliques are merged within each half)
- **Kept as groups** because their surfaces are many small fragments without a reliable geometric signature: back (latissimus dorsi + erector spinae + others, 128–130 surfaces), forearms (~70 surfaces), shoulder girdle (rhomboids, serratus, levator scapulae, teres major: 33 surfaces), calves (gastrocnemius heads, soleus and deep calf muscles: 15 surfaces), shins, neck. They are separable in principle, but naming them correctly needs the original BodyParts3D part lists (below), not guesswork.
- **Nothing is fabricated:** a rule only splits a group when the expected number of large surfaces is present, and surfaces that can't be told apart stay together under a combined name.

## How to get more detail (in order of cost)

1. **Use the original BodyParts3D data (free, CC BY 4.0, same licence as today).** BodyParts3D 4.0 publishes one OBJ per FMA structure plus `*_element_parts.txt` files that name every part, for example separate latissimus dorsi, erector spinae columns, rhomboid major/minor, gastrocnemius medial/lateral heads, soleus, rectus abdominis, external and internal obliques. A build script could import those OBJs directly, name each one from the FMA list, and export a Gradify GLB with every muscle as a named mesh. That removes all guessing and covers the groups kept whole above. Cost: engineering time only (a Node or Blender pipeline, mesh decimation and meshopt compression, and an asset-size budget). Recommended next.
2. **Female model.** open-anatomy-3d also publishes `anatomy-female.glb` (BodyParts3D organs, HuBMAP female organs CC BY 4.0, MakeHuman CC0 body). Adding it gives users a matching body. Same licence family.
3. **A premium commercial asset** (textured, sculpted muscle definition, fascia, tendons, LODs). Only this closes the gap to photoreal marketing renders. Before buying, check that the licence explicitly permits embedding in an interactive web and mobile app, and modification. Many stock licences forbid it. Recommended only after options 1–2, if user testing shows the look is limiting.

## Visual-quality ceiling of the current asset

The geometry is scan-derived and anatomically accurate, but it has no textures, no normal maps, coarse triangles in places (e.g. the hamstrings are about 1,400 triangles per side) and no tendons or fascia. Procedural work already applied: physical materials with clearcoat and sheen, a muscle-fibre bump texture, a view-dependent rim term, studio key, fill, bounce and two rim lights, soft shadows, filmic tone mapping, an outline on selection. Further gains without a new asset: baked ambient occlusion per vertex, smoothed normals on low-poly muscles, and subdivision of the coarsest meshes in the build step from option 1.

## Full mesh inventory

### Muscles (41 meshes)

| Mesh | Catalogue label | Triangles | Separate surfaces (≥ 2%) | Used by Body Intelligence | Individual muscles identified |
|---|---|---:|---:|---|---|
| `abdominal_muscles` | Abdominal Wall Muscles | 22564 | 37 (2) | Yes: Core (abdominals) | Abdominal wall (left side); Abdominal wall (right side) |
| `back_muscles_l` | Back Muscles (L) | 27204 | 128 (13) | Yes: Back | No: kept as one group |
| `back_muscles_r` | Back Muscles (R) | 27008 | 130 (14) | Yes: Back | No: kept as one group |
| `calf_l` | Calf Muscles (L) | 4958 | 15 (9) | Yes: Calves | No: kept as one group |
| `calf_r` | Calf Muscles (R) | 4944 | 15 (9) | Yes: Calves | No: kept as one group |
| `chest_muscles_l` | Chest (Pectoral) Muscle (L) | 1940 | 8 (4) | Yes: Chest | Pectoralis major (clavicular head); Pectoralis major (sternocostal head) & pectoralis minor |
| `chest_muscles_r` | Chest (Pectoral) Muscle (R) | 1952 | 8 (4) | Yes: Chest | Pectoralis major (clavicular head); Pectoralis major (sternocostal head) & pectoralis minor |
| `deltoid_l` | Deltoid (Shoulder) (L) | 1602 | 5 (3) | Yes: Shoulders (deltoids) | Posterior deltoid; Lateral deltoid; Anterior deltoid |
| `deltoid_r` | Deltoid (Shoulder) (R) | 1584 | 5 (3) | Yes: Shoulders (deltoids) | Posterior deltoid; Lateral deltoid; Anterior deltoid |
| `diaphragm` | Diaphragm | 6852 | 5 (1) | Shown, not tracked | No: kept as one group |
| `foot_muscles_l` | Foot Muscles (L) | 6088 | 48 (14) | Shown, not tracked | No: kept as one group |
| `foot_muscles_r` | Foot Muscles (R) | 6044 | 48 (14) | Shown, not tracked | No: kept as one group |
| `forearm_muscles_l` | Forearm Muscles (L) | 12204 | 71 (16) | Yes: Forearms | No: kept as one group |
| `forearm_muscles_r` | Forearm Muscles (R) | 12198 | 69 (16) | Yes: Forearms | No: kept as one group |
| `gluteal_l` | Gluteal Muscles (L) | 3930 | 25 (11) | Yes: Glutes | Gluteus maximus; Tensor fasciae latae & iliotibial band; Gluteus medius; Gluteus minimus; Deep hip muscles |
| `gluteal_r` | Gluteal Muscles (R) | 3926 | 25 (11) | Yes: Glutes | Gluteus maximus; Tensor fasciae latae & iliotibial band; Gluteus medius; Gluteus minimus; Deep hip muscles |
| `hamstrings_l` | Hamstrings (Back Thigh) (L) | 1416 | 4 (4) | Yes: Hamstrings | Biceps femoris (long head); Biceps femoris (short head); Semitendinosus & semimembranosus |
| `hamstrings_r` | Hamstrings (Back Thigh) (R) | 1416 | 4 (4) | Yes: Hamstrings | Biceps femoris (long head); Biceps femoris (short head); Semitendinosus & semimembranosus |
| `hand_muscles_l` | Hand Muscles (L) | 4790 | 65 (18) | Shown, not tracked | No: kept as one group |
| `hand_muscles_r` | Hand Muscles (R) | 4764 | 65 (18) | Shown, not tracked | No: kept as one group |
| `iliopsoas_l` | Hip Flexor (Iliopsoas) (L) | 1414 | 8 (2) | Yes: Hip flexors | Psoas major; Iliacus |
| `iliopsoas_r` | Hip Flexor (Iliopsoas) (R) | 1448 | 8 (2) | Yes: Hip flexors | Psoas major; Iliacus |
| `adductors_l` | Inner Thigh (Adductors) (L) | 2562 | 7 (6) | Yes: Adductors (inner thigh) | Adductor magnus; Gracilis; Adductor longus, brevis & pectineus |
| `adductors_r` | Inner Thigh (Adductors) (R) | 2548 | 7 (6) | Yes: Adductors (inner thigh) | Adductor magnus; Gracilis; Adductor longus, brevis & pectineus |
| `intercostals_l` | Intercostal Muscles (L) | 63574 | 85 (25) | Shown, not tracked | No: kept as one group |
| `intercostals_r` | Intercostal Muscles (R) | 63666 | 84 (25) | Shown, not tracked | No: kept as one group |
| `neck_muscles_l` | Neck Muscles (L) | 7852 | 40 (22) | Yes: Neck | No: kept as one group |
| `neck_muscles_r` | Neck Muscles (R) | 8190 | 46 (18) | Yes: Neck | No: kept as one group |
| `pelvic_floor` | Pelvic Floor | 10092 | 61 (9) | Shown, not tracked | No: kept as one group |
| `quadriceps_l` | Quadriceps (Front Thigh) (L) | 2462 | 10 (5) | Yes: Quadriceps | Sartorius; Vastus lateralis; Vastus medialis; Rectus femoris; Vastus intermedius |
| `quadriceps_r` | Quadriceps (Front Thigh) (R) | 2462 | 10 (5) | Yes: Quadriceps | Sartorius; Vastus lateralis; Vastus medialis; Rectus femoris; Vastus intermedius |
| `rotator_cuff_l` | Rotator Cuff (L) | 1650 | 5 (4) | Yes: Rotator cuff | Subscapularis; Supraspinatus; Teres minor; Infraspinatus |
| `rotator_cuff_r` | Rotator Cuff (R) | 1696 | 5 (4) | Yes: Rotator cuff | Subscapularis; Supraspinatus; Teres minor; Infraspinatus |
| `shin_muscles_l` | Shin Muscles (L) | 3626 | 47 (6) | Yes: Shins | No: kept as one group |
| `shin_muscles_r` | Shin Muscles (R) | 3642 | 47 (6) | Yes: Shins | No: kept as one group |
| `shoulder_muscles_l` | Shoulder Girdle Muscles (L) | 9926 | 33 (9) | Yes: Shoulder girdle | No: kept as one group |
| `shoulder_muscles_r` | Shoulder Girdle Muscles (R) | 9810 | 33 (9) | Yes: Shoulder girdle | No: kept as one group |
| `trapezius_l` | Trapezius (L) | 3574 | 21 (3) | Yes: Trapezius | Upper trapezius; Middle trapezius; Lower trapezius |
| `trapezius_r` | Trapezius (R) | 3590 | 22 (3) | Yes: Trapezius | Upper trapezius; Middle trapezius; Lower trapezius |
| `upper_arm_muscles_l` | Upper Arm Muscles (L) | 2152 | 8 (8) | Yes: Upper arms | Anconeus; Coracobrachialis; Triceps (long head); Triceps (lateral & medial heads); Brachialis; Biceps brachii |
| `upper_arm_muscles_r` | Upper Arm Muscles (R) | 2162 | 9 (8) | Yes: Upper arms | Anconeus; Coracobrachialis; Triceps (long head); Triceps (lateral & medial heads); Brachialis; Biceps brachii |

### Everything else

#### Skeleton

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `spine_cervical` | Cervical Spine (Neck) | 5182 | Skeleton layer |
| `clavicle_l` | Collarbone (L) | 400 | Skeleton layer |
| `clavicle_r` | Collarbone (R) | 400 | Skeleton layer |
| `foot_l` | Foot (L) | 3442 | Skeleton layer |
| `foot_r` | Foot (R) | 3334 | Skeleton layer |
| `forearm_l` | Forearm Bones (L) | 400 | Skeleton layer |
| `forearm_r` | Forearm Bones (R) | 400 | Skeleton layer |
| `hand_l` | Hand (L) | 2250 | Skeleton layer |
| `hand_r` | Hand (R) | 2138 | Skeleton layer |
| `mandible` | Jaw (Mandible) | 2492 | Skeleton layer |
| `patella_l` | Kneecap (L) | 310 | Skeleton layer |
| `patella_r` | Kneecap (R) | 306 | Skeleton layer |
| `spine_lumbar` | Lumbar Spine (Lower Back) | 9136 | Skeleton layer |
| `pelvis` | Pelvis & Sacrum | 3218 | Skeleton layer |
| `ribs_l` | Ribs (L) | 18788 | Skeleton layer |
| `ribs_r` | Ribs (R) | 18778 | Skeleton layer |
| `lower_leg_l` | Shin Bones (L) | 620 | Skeleton layer |
| `lower_leg_r` | Shin Bones (R) | 616 | Skeleton layer |
| `scapula_l` | Shoulder Blade (L) | 6182 | Skeleton layer |
| `scapula_r` | Shoulder Blade (R) | 5758 | Skeleton layer |
| `skull` | Skull | 26438 | Skeleton layer |
| `sternum` | Sternum | 1784 | Skeleton layer |
| `teeth` | Teeth & Gums | 9572 | Skeleton layer |
| `femur_l` | Thigh Bone (Femur) (L) | 704 | Skeleton layer |
| `femur_r` | Thigh Bone (Femur) (R) | 682 | Skeleton layer |
| `spine_thoracic` | Thoracic Spine | 11666 | Skeleton layer |
| `humerus_l` | Upper Arm Bone (L) | 846 | Skeleton layer |
| `humerus_r` | Upper Arm Bone (R) | 832 | Skeleton layer |

#### Organs

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `adrenal_l` | Adrenal Gland (L) | 558 | Not shown in Body Intelligence (used by other Gradify models) |
| `adrenal_r` | Adrenal Gland (R) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `appendix` | Appendix | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `brain` | Brain | 49942 | Not shown in Body Intelligence (used by other Gradify models) |
| `brainstem` | Brainstem | 7994 | Not shown in Body Intelligence (used by other Gradify models) |
| `breast_l` | Breast (L) | — | **Not in the male model file** (catalogue entry only) |
| `breast_r` | Breast (R) | — | **Not in the male model file** (catalogue entry only) |
| `bronchi` | Bronchi | 1204 | Not shown in Body Intelligence (used by other Gradify models) |
| `cerebellum` | Cerebellum | 6678 | Not shown in Body Intelligence (used by other Gradify models) |
| `esophagus` | Esophagus | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `eye_l` | Eye (L) | 24446 | Not shown in Body Intelligence (used by other Gradify models) |
| `eye_r` | Eye (R) | 25490 | Not shown in Body Intelligence (used by other Gradify models) |
| `fallopian_tubes` | Fallopian Tubes | — | **Not in the male model file** (catalogue entry only) |
| `gallbladder` | Gallbladder & Bile Ducts | 564 | Not shown in Body Intelligence (used by other Gradify models) |
| `heart` | Heart | 14832 | Heart & lungs layer (Fitness mode) |
| `kidney_l` | Kidney (L) | 416 | Not shown in Body Intelligence (used by other Gradify models) |
| `kidney_r` | Kidney (R) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `colon` | Large Intestine (Colon) | 2028 | Not shown in Body Intelligence (used by other Gradify models) |
| `larynx` | Larynx (Voice Box) | 24570 | Not shown in Body Intelligence (used by other Gradify models) |
| `liver` | Liver | 26886 | Not shown in Body Intelligence (used by other Gradify models) |
| `lung_l` | Lung (L) | 5800 | Heart & lungs layer (Fitness mode) |
| `lung_r` | Lung (R) | 10264 | Heart & lungs layer (Fitness mode) |
| `reproductive` | Male Reproductive Organs | 1024 | Not shown in Body Intelligence (used by other Gradify models) |
| `ovary_l` | Ovary (L) | — | **Not in the male model file** (catalogue entry only) |
| `ovary_r` | Ovary (R) | — | **Not in the male model file** (catalogue entry only) |
| `pancreas` | Pancreas | 4406 | Not shown in Body Intelligence (used by other Gradify models) |
| `pharynx` | Pharynx (Throat) | 32510 | Not shown in Body Intelligence (used by other Gradify models) |
| `pituitary` | Pituitary Gland | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `prostate` | Prostate | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `salivary_glands` | Salivary Glands | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `small_intestine` | Small Intestine | 2248 | Not shown in Body Intelligence (used by other Gradify models) |
| `spleen` | Spleen | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `stomach` | Stomach | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `thymus` | Thymus | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `tongue` | Tongue | 3298 | Not shown in Body Intelligence (used by other Gradify models) |
| `trachea` | Trachea | 698 | Not shown in Body Intelligence (used by other Gradify models) |
| `ureter_l` | Ureter (L) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `ureter_r` | Ureter (R) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `bladder` | Urinary Bladder | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `uterus` | Uterus | — | **Not in the male model file** (catalogue entry only) |
| `vagina` | Vagina | — | **Not in the male model file** (catalogue entry only) |

#### Vessels

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `aorta` | Aorta | 1520 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_abdomen` | Arteries — Abdomen | 14594 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_thorax` | Arteries — Chest | 16946 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_head` | Arteries — Head & Neck | 14424 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_arm_l` | Arteries — Left Arm | 8036 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_leg_l` | Arteries — Left Leg | 14582 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_pelvis` | Arteries — Pelvis | 6930 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_arm_r` | Arteries — Right Arm | 8116 | Not shown in Body Intelligence (used by other Gradify models) |
| `arteries_leg_r` | Arteries — Right Leg | 15300 | Not shown in Body Intelligence (used by other Gradify models) |
| `carotid_l` | Carotid Artery (L) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `carotid_r` | Carotid Artery (R) | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `coronary_arteries` | Coronary Arteries | 3904 | Not shown in Body Intelligence (used by other Gradify models) |
| `vena_cava_inferior` | Inferior Vena Cava | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `pulmonary_vessels` | Pulmonary Vessels | 2710 | Not shown in Body Intelligence (used by other Gradify models) |
| `vena_cava_superior` | Superior Vena Cava | 400 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_abdomen` | Veins — Abdomen | 13310 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_thorax` | Veins — Chest | 16730 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_arm_l` | Veins — Left Arm | 10242 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_leg_l` | Veins — Left Leg | 18004 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_pelvis` | Veins — Pelvis | 17380 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_arm_r` | Veins — Right Arm | 10236 | Not shown in Body Intelligence (used by other Gradify models) |
| `veins_leg_r` | Veins — Right Leg | 19362 | Not shown in Body Intelligence (used by other Gradify models) |

#### Nerves

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `cranial_nerves` | Cranial & Eye Nerves | 17818 | Not shown in Body Intelligence (used by other Gradify models) |
| `spinal_cord` | Spinal Cord | 400 | Not shown in Body Intelligence (used by other Gradify models) |

#### Skin

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `skin` | Skin | 40676 | Skin layer |

#### Joints

| Mesh | Label | Triangles | Use |
|---|---|---:|---|
| `ankle_l` | Ankle Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `ankle_r` | Ankle Joint (R) | — | **Not in the male model file** (catalogue entry only) |
| `elbow_l` | Elbow Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `elbow_r` | Elbow Joint (R) | — | **Not in the male model file** (catalogue entry only) |
| `hip_l` | Hip Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `hip_r` | Hip Joint (R) | — | **Not in the male model file** (catalogue entry only) |
| `knee_l` | Knee Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `knee_r` | Knee Joint (R) | — | **Not in the male model file** (catalogue entry only) |
| `shoulder_l` | Shoulder Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `shoulder_r` | Shoulder Joint (R) | — | **Not in the male model file** (catalogue entry only) |
| `wrist_l` | Wrist Joint (L) | — | **Not in the male model file** (catalogue entry only) |
| `wrist_r` | Wrist Joint (R) | — | **Not in the male model file** (catalogue entry only) |

