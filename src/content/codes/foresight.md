---
name: foresight
tagline: gnuplot-like plots from pure Fortran, as interactive HTML, SVG or text, live while a job runs.
kind: library
order: 16
status: active
license: GPLv3
repo: https://github.com/szaghi/foresight
docs: https://szaghi.github.io/foresight/
logo: /codes/foresight
methods:
  - A library, fig%plot from the solver, and a command line tool for gnuplot scripts, one interpreter
  - Self-contained interactive HTML pages, zoom, pan, panels zoomed together
  - Live monitoring, --watch re-renders while a job appends to its logs
  - The gnuplot language, using expressions, index and every, CSV headers, two y axes, multiplot
  - Every 2D plot style, heatmaps, polar plots, dashboards of gauges and seven-segment readouts
  - Text output, characters or Braille dots, over plain ssh
  - Exact tick labels and byte-exact golden tests of every output format
parallelism:
  - None needed, it reads the logs a parallel run writes
figures:
  - src: /codes/foresight/dashboard.svg
    width: 640
    height: 440
    alt: "A run monitor in vacuum-fluorescent colours: seven-segment readouts of the iteration and the drag coefficient, segmented bars per device, and the residuals"
    caption: "A run monitor in the colours of a 1980s dashboard: the iteration and the drag coefficient in seven-segment digits, a segmented bar per device, the residuals below."
    source: https://szaghi.github.io/foresight/manual/cookbook#an-1980s-dashboard
  - src: /codes/foresight/monitor.svg
    width: 560
    height: 420
    alt: "Two panels of a run: the continuity residual on a log axis and the drag coefficient"
    caption: "Two panels of a run, the residual on a log axis and the drag coefficient; on the HTML page, panels sharing their x axis zoom and pan their x together."
    source: https://szaghi.github.io/foresight/manual/cookbook#a-grid-of-panels
---

**foresight** (*FOR*tran *E*asy *S*vg *I*nteractive *G*nuplot-like *H*tml *T*ool) draws gnuplot-like plots from pure
Fortran, with no Python, no gnuplot and no graphics library: a solver calls `fig%plot`, or a gnuplot-subset script runs
from the shell, through the same interpreter. The output is a self-contained interactive HTML page, static SVG, or text
for a terminal. `foresight --watch` re-renders while a job appends to its logs, and the page reloads keeping the zoom:
a cockpit for a running simulation.

The figures of VecFor's documentation are drawn by foresight.
