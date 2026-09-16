# Basil.js Examples

This repository collects coding examples for scripting Adobe InDesign with [basil.js](https://basiljs2.netlify.app), a library that brings the spirit of Processing to InDesign. Scripts are written in ExtendScript (an old dialect of JavaScript) and run directly inside InDesign, where they can create pages, draw shapes, place images and manipulate text.

The folder `basiljs` contains the library itself (version 2.0.0 beta) together with its source, tests and a set of tutorials. The folder `Basil Scripts` contains our own scripts written for this course.

## Installation

Basil scripts load the library with two directives at the top of the file:

```js
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";
```

InDesign therefore expects the library in `~/Documents/basiljs`. If you keep this repository somewhere else, the easiest solution is a symbolic link:

```sh
ln -s "/path/to/examples_04_basil/basiljs" ~/Documents
```

Alternatively you can change the `@includepath` line in every script to point to the place where the library actually lives.

To make the scripts show up in InDesign, open the Scripts panel (Window → Utilities → Scripts), right-click the folder "User" and choose "Reveal in Finder". Link the `Basil Scripts` folder into that directory:

```sh
ln -s "/path/to/examples_04_basil/Basil Scripts" "/path/to/revealed/Scripts Panel"
```

The scripts now appear in the panel and can be started with a double click. The official getting started guide explains the setup in more detail: https://basiljs2.netlify.app/tutorials/01-getting-started/

## Writing a script

A basil script defines a `draw()` function and optionally a `setup()` function that runs once before it. Basil calls them automatically once the library is included. A minimal example that draws a red bar across the top of the current page looks like this:

```js
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  units(MM);
  noStroke();
  fill(255, 0, 0);
  rect(0, 0, width, 50);
}
```

The reference of all available functions can be found at https://basiljs2.netlify.app/reference/

## A note on the tutorials

The tutorials in `basiljs/scripts/tutorials` were written for basil.js 1.x, where every function was prefixed with `b.` and each script ended with a call to `b.go()`. Version 2 has dropped both. If a tutorial fails, remove the `b.` prefixes and the final `b.go();` line, and it should run with the included library.

## Examples

`Basil Scripts/load_folder` asks for a folder, adds a new page for every image it finds (jpg, png or tif) and places the image on it, fitted proportionally and centered. It is a good starting point for generating photo books or contact sheets from a directory of files.

## License

basil.js is released under the MIT license, see `basiljs/MIT-LICENSE.txt`.
