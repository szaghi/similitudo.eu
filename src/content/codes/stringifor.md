---
name: StringiFor
tagline: A string type for modern Fortran, with the methods you miss from Python.
kind: general
order: 17
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/StringiFor
docs: https://szaghi.github.io/StringiFor/
logo: /codes/stringifor
methods:
  - A string of any length, a drop-in for character
  - Split, join, slice, replace, strip, case conversion, justified layout
  - Numbers cast to and from strings, files and paths, glob
  - Regular expressions with groups, in time linear in the text
  - UTF-8 aware lengths and positions, repair and escapes
  - Base64, ANSI colours, version comparison
  - Pure and elemental methods, applied to whole arrays
  - Doctests in the source, every documentation example compiled and run
parallelism:
  - Pure and elemental, safe in parallel regions
figures:
  - src: /codes/stringifor/quickstart.svg
    width: 812
    height: 386
    alt: A terminal session of the quick-start program, one string method per answer
    caption: "The quick start, a real session: upper case, snake case, reversed words, justified text, version comparison, hexadecimal and number detection, each one method of the string type."
    source: https://szaghi.github.io/StringiFor/#quick-start
    animated: true
    hold: 33
  - src: /codes/stringifor/regex.svg
    width: 685
    height: 329
    alt: "A terminal session of a small grep and sed built on the regex methods: search with named groups, findall, sub, split, a pattern error, and (a*)*b on 100000 bytes"
    caption: "Regular expressions: a small grep and sed built on them, with named groups, findall, sub and split, a pattern error reported at its byte, and (a*)*b on 100 000 bytes answered without catastrophic backtracking."
    source: https://szaghi.github.io/StringiFor/guide/regex
    animated: true
    hold: 34.5
---

**StringiFor** (*Stringi*s *For*tran manipulator) is a pure Fortran 2008 library that gives Fortran a real string type:
one type of any length, accepted wherever a `character` goes, with the methods of Python's strings, regular expressions
in time linear in the text, and UTF-8 aware lengths and positions. Almost every method is pure or elemental, so it
applies to a whole array of strings in one statement. Every method carries doctests, and every example of the
documentation is a program compiled and run to produce the output shown. It builds with FoBiS.py, fpm, CMake or Make.

Developed in the open since 2016, it is used beyond these codes: the MOHID Lagrangian model bundles it, the easifem
finite-element library lists it among its external packages, and Gentoo's GURU repository packages it. ADAM uses it
throughout.
