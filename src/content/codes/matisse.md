---
name: MaTiSSe
tagline: Scientific presentations written in plain Markdown, compiled to self-contained HTML slides.
kind: tool
order: 6
status: active
license: GPLv3
repo: https://github.com/szaghi/MaTiSSe
docs: https://szaghi.github.io/MaTiSSe/
logo: /codes/matisse
methods:
  - Plain Markdown, chapters, sections and subsections turned into slides, a table of contents, multi-file talks
  - LaTeX math through MathJax 3
  - Themes in YAML, per-slide overrides, built-in themes in the style of LaTeX Beamer
  - Figures, boxes, notes, tables, videos and columns; callouts; numbered theorems with cross-references
  - Code highlighted by Pygments, Mermaid and Graphviz diagrams
  - impress.js or reveal.js output, one flag; offline and PDF modes
figures:
  - src: /codes/matisse/latex.png
    width: 945
    height: 736
    alt: A MaTiSSe slide with a title and the quadratic formula rendered from LaTeX
    caption: "LaTeX in a slide: the equation typed as in a LaTeX source, rendered by MathJax."
    source: https://szaghi.github.io/MaTiSSe/advanced/math
---

**MaTiSSe** (*Ma*rkdown *T*o *I*mpressive *S*cientific *S*lid*e*s) compiles plain Markdown into self-contained HTML
presentations: no HTML, no LaTeX preamble. Headings become chapters, sections and slides; LaTeX math, figures, boxes,
columns, numbered theorems with cross-references, code and diagrams are written in the source; themes are YAML. The
same file gives impress.js slides on a 3D canvas or reveal.js ones with speaker notes and PDF export.

A Python tool, `pip install MaTiSSe.py`; in the open since 2014.
