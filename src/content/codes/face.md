---
name: FACE
tagline: ANSI colours and styles for Fortran strings, in one function.
kind: general
order: 10
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/FACE
docs: https://szaghi.github.io/FACE/
methods:
  - One function, colorize(string, color_fg, color_bg, style)
  - Named colours and 24-bit RGB (#rrggbb), foreground and background
  - Bold, italic, underline, inverse, strikethrough and the other ANSI styles
  - Optional UCS4 strings
  - Pure Fortran 2008, no dependency
figures:
  - src: /codes/face/samples.png
    width: 721
    height: 913
    alt: A terminal listing every colorize call for the foreground colours, the background colours and the styles, with the string it prints
    caption: "Every named foreground colour, background colour and style, each with the colorize call that prints it and its ANSI code."
    source: https://szaghi.github.io/FACE/
---

**FACE** (*F*ortran *A*nsi *C*olors and Styles *E*nvironment) is a small pure Fortran 2008 library with no dependency:
one function, `colorize`, returns a string with the ANSI escape codes for a foreground colour, a background colour and a
style, named or as 24-bit RGB.

It colours the help and the errors of FLAP, the bars of forbear and the colour methods of StringiFor.
