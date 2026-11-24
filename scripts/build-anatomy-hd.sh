#!/usr/bin/env bash
# Build kit/vendor/anatomy/anatomy-hd.glb: the HD skull, mandible and teeth, refined in Blender
# (scripts/blender/refine-anatomy.py) from the Z-Anatomy atlas (CC BY-SA 4.0), then compressed with gltfpack.
# Needs Blender's Python module (pip install bpy==5.3.0, on Python 3.13) or BLENDER_PY pointing at one.
#   scripts/build-anatomy-hd.sh [work dir]
set -euo pipefail
here=$(cd "$(dirname "$0")/.." && pwd); work=${1:-$(mktemp -d)}; py=${BLENDER_PY:-python3}
[ -d "$work/za-repo" ] || git clone --depth 1 https://github.com/Z-Anatomy/Models-of-human-anatomy "$work/za-repo"
[ -f "$work/za/Z-Anatomy/Startup.blend" ] || unzip -q -o "$work/za-repo/Z-Anatomy.zip" -d "$work/za"
"$py" "$here/scripts/blender/refine-anatomy.py" "$work/za/Z-Anatomy/Startup.blend" "$here/kit/vendor/anatomy/anatomy-male.glb" "$work/hd-raw.glb"
npx --yes gltfpack@1.3.0 -i "$work/hd-raw.glb" -o "$here/kit/vendor/anatomy/anatomy-hd.glb" -cc -kn -vp 14 -vn 10
ls -la "$here/kit/vendor/anatomy/anatomy-hd.glb"
