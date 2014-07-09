(function () {

    "use strict";

    var EuclideanProjection = function () {
        var EUCLIDEAN_RANGE = 256;
        this.pixelOrigin = new google.maps.Point(EUCLIDEAN_RANGE / 2, EUCLIDEAN_RANGE / 2);
        this.pixelsPerLonDegree = EUCLIDEAN_RANGE / 360;
        this.pixelsPerLonRadian = EUCLIDEAN_RANGE / (2 * Math.PI);
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

        fromPointToLatLng: function (point) {
            var lng = (point.x - this.pixelOrigin.x) / this.pixelsPerLonDegree / this.scaleLng - this.offsetLng,
                lat = -1 * (point.y - this.pixelOrigin.y) / this.pixelsPerLonDegree / this.scaleLat - this.offsetLat;
            return new google.maps.LatLng(lat, lng, true);
        }
    };

    google.maps.EuclideanProjection = EuclideanProjection;

})();
