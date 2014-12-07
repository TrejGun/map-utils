(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "../projections/euclidean"
        ], factory);
    } else {

        // Browser globals
        factory();
    }
}(function () {

    "use strict";

    var GreyscaleMapType = function (url) {
        this.url = url;
    };

    GreyscaleMapType.prototype = {
        name: "Greyscale Map Type",
        minZoom: 0,
        maxZoom: 5,
        tileSize: new google.maps.Size(256, 256),
        projection: new google.maps.EuclideanProjection(),
        url: "",
        getTile: function (coord, zoom, ownerDocument) {
            var div = ownerDocument.createElement("div"),
                c = 1 << zoom,
                x = coord.x,
                y = coord.y;

            if (y < 0 || y >= c || x < 0 || x >= c || zoom > 4) {
                div.style.height = this.tileSize.height + "px";
                div.style.width = this.tileSize.width + "px";
                div.style.backgroundColor = "#fcf8ed";
                div.style.fontSize = "9";
                div.style.textAlign = "center";
                div.innerHTML = zoom > 4 ? "Sorry, we have no map <br /> images for this zoom level." : "";
                return div;
            }

            for (var g = 0, f = "t"; g < zoom; g++) {
                c = c / 2;
                if (y < c) {
                    if (x < c) {
                        f += "q";
                    } else {
                        f += "r";
                        x -= c;
                    }
                } else {
                    if (x < c) {
                        f += "t";
                        y -= c;
                    } else {
                        f += "s";
                        x -= c;
                        y -= c;
                    }
                }
            }

            var canvas = ownerDocument.createElement("canvas"),
                context = canvas.getContext("2d"),
                img = new Image();

            canvas.setAttribute("width", this.tileSize.width);
            canvas.setAttribute("height", this.tileSize.height);

            img.crossOrigin = "anonymous"; // http://example.com/crossdomain.xml
            img.src = this.url + "/" + f + ".jpg";
            img.onload = function () {
                context.drawImage(img, 0, 0);
                var imgdata = context.getImageData(0, 0, this.tileSize.width, this.tileSize.height),
                    pix = imgdata.data;
                for (var i = 0, grayscale = 0, n = pix.length; i < n; i += 4) {
                    grayscale = pix[i] * 0.3 + pix[i + 1] * 0.59 + pix[i + 2] * 0.11;
                    pix[i] = grayscale;  // red
                    pix[i + 1] = grayscale;  // green
                    pix[i + 2] = grayscale;  // blue
                }
                context.putImageData(imgdata, 0, 0);
            }.bind(this);

            div.appendChild(canvas);
            return div;
        }
    };

    google.maps.GreyscaleMapType = GreyscaleMapType;

}));