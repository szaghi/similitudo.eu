# Compare-figure layers

The renderers of the two compare figures (`src/components/CompareFigure.astro`): a body and a twin layer, registered
pixel for pixel because both are drawn in one frame.

| Figure | Script | Input (copy into `work/data/`) | Output (`work/img/`) | Published as |
|---|---|---|---|---|
| ADAM step, solution | `step_layers.py` | `step/`: the `*-000007545*` `.h5` / `.xdmf` files and the three `step-?.ini` of `adam/src/tests/flume/verification/step/work-adam_flume_cpu-np2-full` | `step-body-{light,dark}.webp` | `public/codes/adam/step-body[-dark].webp` |
| ADAM step, mesh by level | `step_twin_levels.py` | the same | `step-twin-c-{light,dark}.webp` | `public/codes/adam/step-mesh[-dark].webp` |
| FOSSIL dragon | `dragon_layers.py` | `dragon.stl` from `FOSSIL/src/tests/` | `dragon-body.svg`, `dragon-twin.svg` | `public/codes/fossil/dragon-body.svg`, `dragon-field.svg` |

`make_gallery.py` is a copy of ADAM's `docs/scripts/make_gallery.py` (2026-11-14), pinned here so the themes, colour
maps and readers do not drift; only its functions are imported. The step run is the EV-step `full` leg of
`step/check.sh` (`make_step.py --tree quad --cells 80 --time-max 4 --refine`): if the work directory is gone, rerun it.
The dragon's distance field is computed by `dragon_layers.py` itself (numpy), not by FOSSIL.

```sh
python3 -m venv work/venv && work/venv/bin/pip install numpy h5py matplotlib pillow
work/venv/bin/python -B step_layers.py && work/venv/bin/python -B step_twin_levels.py && work/venv/bin/python -B dragon_layers.py
```

`step_layers.py` also writes the two twin variants that were tried and not used (`twin-a`: plain outlines, `twin-b`:
mesh alone). `work/` is git-ignored. Copy the outputs to `public/codes/` by hand, under the published names.
