---
name: figure
tagline: Windows, widgets and plots for Fortran programs, Dear ImGui and ImPlot declared every frame, on a desktop or in a browser.
kind: general
order: 22
status: active
license: MIT
repo: https://github.com/szaghi/figure
docs: https://szaghi.github.io/figure/
logo: /codes/figure
methods:
  - Immediate mode, no widget objects, handles or callbacks; widget values are the program's own variables
  - Plots of real32 and real64 arrays in place, lines, scatter, bars, areas, heatmaps, GPU textures
  - Forms, tables, tabs, menus, shortcuts, popups and the system's file dialogs
  - Docking layouts saved at run time, seven built-in styles, theme files and fonts
  - The same interface served to a web browser, behind a token, from a node with no display or GPU
  - Headless mode and a testing module, so the UI logic is tested in CI
  - SDL3 and OpenGL 3 on Linux, macOS and Windows; gfortran, nvfortran and ifx; FoBiS and fpm
figures:
  - src: /codes/figure/studio.png
    width: 1100
    height: 680
    alt: "A small heat solver in a FIGURE window: case, input and result panels, the temperature of a heated plate, and a monitor plot of the residual and the mean temperature while it runs"
    caption: "A solver with its own window: the tutorial's heated plate, run from the GUI, the residual and the mean temperature followed on a monitor plot, the field shown beside it."
    source: https://szaghi.github.io/figure/manual/tutorial/21-monitor
    animated: true
  - src: /codes/figure/styles.png
    width: 960
    height: 559
    alt: "One FIGURE program, with sliders, probe signals and a field heatmap, switching through the seven built-in styles"
    caption: "One program, seven built-in styles: controls, probe signals and a heatmap of a field."
    source: https://szaghi.github.io/figure/
    animated: true
---

**figure** (*F*ortran *I*mmediate-mode *G*UI for *U*ser interfaces, *R*endering and *E*xploration) gives Fortran
programs interactive windows, widgets and plots: Fortran bindings to Dear ImGui and ImPlot, on SDL3 and OpenGL 3. In
immediate mode there is no widget tree: the interface is a block of code run every frame, and its state is the
program's own variables. The same interface can be served to a web browser, from a cluster node through an SSH tunnel,
with no display or GPU on the program's side.

Fortran calls C only through `bind(C)`; it builds with FoBiS or fpm.
