# Basil.js: Load Images

[Deutsch](README_DE.md)

An InDesign script that asks for a folder and places every image it finds
(jpg, png or tif) on its own page, fitted proportionally and centred. It
fills the pages already in the document first and adds pages as needed. Written with
[basil.js](https://basiljs2.netlify.app), a library that brings the spirit
of Processing to InDesign. A starting point for generating photo books or
contact sheets from a folder of files.

## Installation

Requirements: Adobe InDesign. The library is included in `basiljs/`
(basil.js 2.0.0-beta, build 2025-01-19, with source, tests and tutorials;
basil.js is released under the MIT license); the script is in
`Basil Scripts/load_folder/load_folder.jsx`.

1. Basil scripts load the library with these two lines:
   ```js
   // @includepath "~/Documents/;%USERPROFILE%Documents";
   // @include "basiljs/basil.js";
   ```
   InDesign therefore expects the library in `~/Documents/basiljs`. The
   easiest way is a symbolic link:
   ```sh
   ln -s "/path/to/Indesign_Basil_LoadImages/basiljs" ~/Documents
   ```
   Alternatively, change the `@includepath` line to where the library
   actually lives.
2. In InDesign, open the Scripts panel (*Window → Utilities → Scripts*),
   right-click the folder *User* and choose *Reveal in Finder*. Link the
   `Basil Scripts` folder into that directory:
   ```sh
   ln -s "/path/to/Indesign_Basil_LoadImages/Basil Scripts" "/path/to/revealed/Scripts Panel"
   ```

More on the setup: the official
[getting started guide](https://basiljs2.netlify.app/tutorials/01-getting-started/).
All functions: [basil.js reference](https://basiljs2.netlify.app/reference/).

## How to Run

Double-click `load_folder.jsx` in the Scripts panel and choose a folder
with images.

The tutorials in `basiljs/scripts/tutorials` were written for basil.js 1.x,
where every function had the prefix `b.` and each script ended with
`b.go()`. If a tutorial fails, remove the `b.` prefixes and the final
`b.go();` line.

## Coding Help

Scripts are written in ExtendScript (an old dialect of JavaScript). A basil
script defines `draw()` and optionally `setup()`, which runs once before it;
basil calls both automatically once the library is included.

- **`load_folder.jsx` → `setup()`**: opens `Folder.selectDialog()` and
  stores the chosen folder in `_folder`.
- **`load_folder.jsx` → `draw()`**: lists the files in the folder with
  `getFiles()` and keeps only images. The regular expression
  `/\.(jpg|jpeg|png|tif|tiff)$/i` decides which file types are used —
  extend it for other formats.
- **The loop**: for every image, `page(i + 1)` takes the next page that
  already exists in the document (`pageCount()` tells how many there are);
  when they run out, `addPage()` appends a new page at the end. `bounds()`
  gets the page size, and `rect()` draws a frame over
  the whole page. The image is placed into the frame with `place()` and
  fitted with `FitOptions.PROPORTIONALLY` and `FitOptions.CENTER_CONTENT`.
  Use `FitOptions.FILL_PROPORTIONALLY` to fill the page instead, or change
  the `rect()` values to leave a margin.
