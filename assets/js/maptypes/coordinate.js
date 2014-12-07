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

    var CoordinateMapType = function (url) {
        this.url = url;
    };

    CoordinateMapType.prototype = {
        name: "Coordinate Map Type",
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

            var img = new Image();
            img.src = this.url + "/" + f + ".jpg";
            div.appendChild(img);
            return div;
        }
    };

    google.maps.CoordinateMapType = CoordinateMapType;

}));