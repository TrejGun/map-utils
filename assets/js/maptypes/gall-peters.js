(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "../projections/gall-peters"
        ], factory);
    } else {

        // Browser globals
        factory();
    }
}(function () {

    "use strict";

    var GallPetersMapType = function (url) {
        this.url = url;
    };

    GallPetersMapType.prototype = {
        name: "Gall-Peters Map Type",
        minZoom: 0,
        maxZoom: 2,
        tileSize: new google.maps.Size(800, 512),
        projection: new google.maps.GallPetersProjection(),
        url: "",

        getTile: function (coord, zoom, ownerDocument) {
            var div = ownerDocument.createElement("div"),
                c = 1 << zoom,
                x = coord.x,
                y = coord.y;

            if (y < 0 || y >= c || x < 0 || x >= c || zoom > 1) {
                div.style.height = this.tileSize.height + "px";
                div.style.width = this.tileSize.width + "px";
                div.style.backgroundColor = "#fcf8ed";
                div.style.fontSize = "9";
                div.style.textAlign = "center";
                div.innerHTML = zoom > 1 ? "Sorry, we have no map <br /> images for this zoom level." : "";
                return div;
            }

            // Wrap tiles horizontally.
            var f = ((x % c) + c) % c;

            var img = new Image();
            img.src = this.url + "/" + "gall-peters_" + zoom + "_" + f + "_" + coord.y + ".png";
            div.appendChild(img);
            return div;
        }
    };

    google.maps.GallPetersMapType = GallPetersMapType;

}));