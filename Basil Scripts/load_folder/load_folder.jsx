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
            // Loop through each image: one image per page
            for (var i = 0; i < files.length; i++) {
                var imageFile = files[i];

                // Use the pages already in the document first,
                // add a new page at the end only when they run out
                var currentPage;
                if (i < pageCount()) {
                    currentPage = page(i + 1); // page numbers start at 1
                } else {
                    currentPage = addPage();
                }

                var pageBounds = bounds(currentPage); // object with width and height of the page

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