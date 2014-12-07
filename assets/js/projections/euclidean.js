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

    var EUCLIDEAN_RANGE_X = 256;
    var EUCLIDEAN_RANGE_Y = 256;

    /**
     * @constructor
     * @implements {google.maps.Projection}
     */
    var EuclideanProjection = function () {
        this.pixelOrigin = new google.maps.Point(EUCLIDEAN_RANGE_X / 2, EUCLIDEAN_RANGE_Y / 2);
        this.pixelsPerLonDegree = EUCLIDEAN_RANGE_X / 360;
        this.pixelsPerLonRadian = EUCLIDEAN_RANGE_Y / (2 * Math.PI);
        this.scaleLat = 2;
        this.scaleLng = 1;
    };

    EuclideanProjection.prototype = {
        pixelOrigin: new google.maps.Point(0, 0),
        pixelsPerLonDegree: 0,
        pixelsPerLonRadian: 0,
        scaleLat: 0,
        scaleLng: 0,
        offsetLat: 0,
        offsetLng: 0,

        fromLatLngToPoint: function (latLng, opt_point) {
            var point = opt_point || new google.maps.Point(0, 0);
            point.x = this.pixelOrigin.x + (latLng.lng() + this.offsetLng) * this.pixelsPerLonDegree * this.scaleLng;
            point.y = this.pixelOrigin.y + (-1 * latLng.lat() + this.offsetLat) * this.pixelsPerLonDegree * this.scaleLat;
            return point;
        },

        fromPointToLatLng: function (point, noWrap) {
            var lat = -1 * (point.y - this.pixelOrigin.y) / this.pixelsPerLonDegree / this.scaleLat - this.offsetLat,
                lng = (point.x - this.pixelOrigin.x) / this.pixelsPerLonDegree / this.scaleLng - this.offsetLng;
            return new google.maps.LatLng(lat, lng, noWrap);
        }
    };

    google.maps.EuclideanProjection = EuclideanProjection;

}));
