(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(factory);
    } else {

        // Browser globals
        factory();
    }
}(function () {

    "use strict";

    // Note: this value is exact as the map projects a full 360 degrees of longitude
    var GALL_PETERS_RANGE_X = 800;

    // Note: this value is inexact as the map is cut off at ~ +/- 83 degrees.
    // However, the polar regions produce very little increase in Y range, so
    // we will use the tile size.
    var GALL_PETERS_RANGE_Y = 510;

    /**
     * @constructor
     * @implements {google.maps.Projection}
     */
    function GallPetersProjection() {

        // Using the base map tile, denote the lat/lon of the equatorial origin.
        this.pixelOrigin = new google.maps.Point(GALL_PETERS_RANGE_X * 400 / 800, GALL_PETERS_RANGE_Y / 2);

        // This projection has equidistant meridians, so each longitude degree is a linear
        // mapping.
        this.worldCoordinatePerLonDegree = GALL_PETERS_RANGE_X / 360;

        // This constant merely reflects that latitudes vary from +90 to -90 degrees.
        this.worldCoordinateLatRange = GALL_PETERS_RANGE_Y / 2;
    }

    GallPetersProjection.prototype = {
        fromLatLngToPoint: function (latLng, opt_point) {
            var point = opt_point || new google.maps.Point(0, 0);
            point.x = this.pixelOrigin.x + this.worldCoordinatePerLonDegree * latLng.lng();
            point.y = this.pixelOrigin.y - this.worldCoordinateLatRange * Math.sin(latLng.lat() * (Math.PI / 180));
            return point;
        },

        fromPointToLatLng: function (point, noWrap) {
            var lat = Math.asin((this.pixelOrigin.y - Math.min(Math.max(0, point.y), GALL_PETERS_RANGE_Y)) / this.worldCoordinateLatRange) / (Math.PI / 180),
                lng = (point.x - this.pixelOrigin.x) / this.worldCoordinatePerLonDegree;
            return new google.maps.LatLng(lat, lng, noWrap);
        }
    };

    google.maps.GallPetersProjection = GallPetersProjection;

}));
