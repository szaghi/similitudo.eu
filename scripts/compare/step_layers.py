#!/usr/bin/env python3
"""Registered layers of the ADAM forward-facing step for the compare figure (prototype).

One axes geometry (1440x480, axes = whole figure) is used for every layer, so they register by construction.
Reads SANDBOX/data/step, writes SANDBOX/img/step-{body,twin-a,twin-b}-{light,dark}.{png,webp}.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import make_gallery as mg  # noqa: E402  (the copy next to this script; only functions are used, main() never runs)
import numpy as np  # noqa: E402
from matplotlib.colors import ListedColormap, to_rgb  # noqa: E402
from matplotlib.patches import Rectangle  # noqa: E402
from PIL import Image  # noqa: E402

plt = mg.plt
ROOT = HERE / "work"  # git-ignored: data/ in, img/ out (README.md)
WORK, OUT = ROOT / "data" / "step", ROOT / "img"
EXT = (0.0, 3.0, 0.0, 1.0)
W, H, DPI = 1440, 480, 100
DIM = 0.35  # strength of the field under the mesh in twin a
LW_BLOCK, A_BLOCK, LW_SEAM = 0.8, 0.9, 1.4


def decorate(ax, theme, seams: bool) -> None:
    """The step body, and (twins only) the two inter-realm seams: step_decorate of the gallery, seams optional."""
    ax.add_patch(Rectangle((0.6, 0.0), 2.4, 0.2, fill=True, fc=theme.bg_alt, ec=theme.mesh, lw=0.8, zorder=3))
    if seams:
        for xs, ys in (([0.0, 0.6], [0.2, 0.2]), ([0.6, 0.6], [0.2, 1.0])):
            ax.plot(xs, ys, ls=(0, (4, 2.5)), color=theme.accent, lw=LW_SEAM, zorder=4)


def draw(frame, theme, kind: str, vmin: float, vmax: float, path: Path) -> None:
    fig = plt.figure(figsize=(W / DPI, H / DPI), dpi=DPI, facecolor=theme.bg)
    ax = fig.add_axes((0, 0, 1, 1))
    ax.set_axis_off()
    ax.set_facecolor(theme.bg)
    if kind != "twin-b":
        cmap = theme.cmap
        if kind == "twin-a":  # the same map, blended toward the ground
            bg = np.array(to_rgb(theme.bg))
            cmap = ListedColormap(bg + DIM * (theme.cmap(np.linspace(0, 1, 256))[:, :3] - bg))
        ax.imshow(frame.data.T, origin="lower", extent=EXT, cmap=cmap.with_extremes(bad=theme.bg_alt), vmin=vmin,
                  vmax=vmax, interpolation="bilinear", aspect="auto")
    ax.set_xlim(EXT[0], EXT[1])
    ax.set_ylim(EXT[2], EXT[3])
    if kind != "body":
        for bx, by, bw, bh in frame.boxes:
            ax.add_patch(Rectangle((bx, by), bw, bh, fill=False, lw=LW_BLOCK, ec=theme.mesh, alpha=A_BLOCK, zorder=2))
    decorate(ax, theme, seams=kind != "body")
    ax.add_patch(Rectangle((0, 0), 1, 1, transform=ax.transAxes, fill=False, ec=theme.mesh, lw=0.8, alpha=0.7,
                           clip_on=False, zorder=5))
    fig.savefig(path, dpi=DPI, facecolor=theme.bg)
    plt.close(fig)
    im = Image.open(path).convert("RGB")
    assert im.size == (W, H), im.size
    im.save(path, optimize=True)
    im.save(path.with_suffix(".webp"), quality=82, method=6)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    frames = mg.density_frames(WORK, ["step-A", "step-B", "step-C"], EXT, ("r",))
    assert len(frames) == 1, len(frames)
    f = frames[0]
    vmin, vmax = (float(np.nanpercentile(f.data, q)) for q in (0.2, 99.8))
    sizes = sorted({round(b[2], 6) for b in f.boxes})
    print(f"t = {f.time}, raster {f.data.shape}, blocks {len(f.boxes)}, block widths {sizes}, "
          f"rho range [{np.nanmin(f.data):.4f}, {np.nanmax(f.data):.4f}], vmin/vmax {vmin:.4f}/{vmax:.4f}")
    for theme in mg.THEMES:
        for kind in ("body", "twin-a", "twin-b"):
            p = OUT / f"step-{kind}-{theme.name}.png"
            draw(f, theme, kind, vmin, vmax, p)
            print(f"{p.name} {p.stat().st_size / 1024:.0f} KiB, webp {p.with_suffix('.webp').stat().st_size / 1024:.0f} KiB")


if __name__ == "__main__":
    main()
