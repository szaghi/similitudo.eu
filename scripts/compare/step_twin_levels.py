#!/usr/bin/env python3
"""Twin layer of the ADAM step with the blocks shaded by refinement level: step-twin-c-{light,dark}.{png,webp}.

Same axes geometry as step_layers.py (1440x480, axes = whole figure), so it registers with step-body.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import make_gallery as mg  # noqa: E402
import numpy as np  # noqa: E402
import step_layers as sl  # noqa: E402
from matplotlib.colors import ListedColormap, to_rgb  # noqa: E402
from matplotlib.patches import Rectangle  # noqa: E402
from PIL import Image  # noqa: E402

plt = mg.plt
WASH = float(sys.argv[1]) if len(sys.argv) > 1 else 0.2


def main() -> None:
    f = mg.density_frames(sl.WORK, ["step-A", "step-B", "step-C"], sl.EXT, ("r",))[0]
    vmin, vmax = (float(np.nanpercentile(f.data, q)) for q in (0.2, 99.8))
    ngc = int(mg.read_ini(sl.WORK / "step-A.ini")["grid"]["ngc"])
    blocks = []  # (x, y, w, h, dx)
    for pre in ("step-A", "step-B", "step-C"):
        cps = mg.checkpoints(sl.WORK, pre)
        for b in mg.read_blocks(cps[max(cps)][1], ngc, ("r",)):
            n = b["f"]["r"].shape
            blocks.append((b["lo"][0], b["lo"][1], n[0] * b["d"][0], n[1] * b["d"][1], float(b["d"][0])))
    base = max(b[4] for b in blocks)
    fine = [b for b in blocks if b[4] < 0.75 * base]
    print(f"blocks {len(blocks)}, base dx {base:.6f}, refined {len(fine)}, "
          f"refined area {sum(b[2] * b[3] for b in fine):.4f} of {sum(b[2] * b[3] for b in blocks):.4f}")
    for theme in mg.THEMES:
        fig = plt.figure(figsize=(sl.W / sl.DPI, sl.H / sl.DPI), dpi=sl.DPI, facecolor=theme.bg)
        ax = fig.add_axes((0, 0, 1, 1))
        ax.set_axis_off()
        ax.set_facecolor(theme.bg)
        bg = np.array(to_rgb(theme.bg))
        cmap = ListedColormap(bg + sl.DIM * (theme.cmap(np.linspace(0, 1, 256))[:, :3] - bg))
        ax.imshow(f.data.T, origin="lower", extent=sl.EXT, cmap=cmap.with_extremes(bad=theme.bg_alt), vmin=vmin,
                  vmax=vmax, interpolation="bilinear", aspect="auto")
        ax.set_xlim(sl.EXT[0], sl.EXT[1])
        ax.set_ylim(sl.EXT[2], sl.EXT[3])
        for x, y, w, h, d in blocks:
            refined = d < 0.75 * base
            if refined:
                ax.add_patch(Rectangle((x, y), w, h, fill=True, fc=theme.accent, ec="none", alpha=WASH, zorder=1.5))
            ax.add_patch(Rectangle((x, y), w, h, fill=False, lw=0.9 if refined else 0.6, ec=theme.text if refined else theme.mesh,
                                   alpha=0.9 if refined else 0.7, zorder=2.5 if refined else 2))
        sl.decorate(ax, theme, seams=True)
        ax.add_patch(Rectangle((0, 0), 1, 1, transform=ax.transAxes, fill=False, ec=theme.mesh, lw=0.8, alpha=0.7,
                               clip_on=False, zorder=5))
        p = sl.OUT / f"step-twin-c-{theme.name}.png"
        fig.savefig(p, dpi=sl.DPI, facecolor=theme.bg)
        plt.close(fig)
        im = Image.open(p).convert("RGB")
        assert im.size == (sl.W, sl.H)
        im.save(p, optimize=True)
        im.save(p.with_suffix(".webp"), quality=82, method=6)
        print(p.name, p.stat().st_size // 1024, p.with_suffix(".webp").stat().st_size // 1024)


main()
