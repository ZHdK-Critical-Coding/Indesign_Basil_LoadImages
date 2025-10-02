// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// Ask the user to select a folder
var _folder;

function setup() {
    _folder = Folder.selectDialog("Select a folder with images");
}

function draw() {
    if (_folder) {
        // Get all image files in the folder
        var files = _folder.getFiles(function(file) {
            return file instanceof File && /\.(jpg|jpeg|png|tif|tiff)$/i.test(file.name);
        });

        if (files.length === 0) {
            alert("No images found in the folder.");
        } else {
            // Loop through each page in the document
            for (var i = 0; i < files.length; i++) {
                var imageFile = files[i]; // cycle images if fewer than pages
                var page = addPage();

                // Alternate sides: left = i % 2 === 0, right = i % 2 === 1
                var pageBounds = bounds(page); // [y1, x1, y2, x2]
                
                var r = rect(0,0, pageBounds.width,pageBounds.height);
                r.place(imageFile);
                r.fit(FitOptions.PROPORTIONALLY); // fit proportionally
                r.fit(FitOptions.CENTER_CONTENT);
            }
        }
    } else {
        alert("No folder selected.");
    }
}