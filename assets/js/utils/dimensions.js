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

    function Dimensions (view) {
        this._view = view;
    }

    Dimensions.prototype._view = null;

    Dimensions.prototype.fromLatLngToDivPixel = function (latlng) {
        return this._view.getProjection().fromLatLngToDivPixel(latlng);
    };

    Dimensions.prototype.getScaleRate = function (data, zoom) {
        if ("zoom" in data) {
            if ("min" in data.zoom && data.zoom.min > zoom) {
                console.log("Zoom out of range for " + data.type);
            } else if ("max" in data.zoom && zoom > data.zoom.max) {
                console.log("Zoom out of range for " + data.type);
            }
            if ("adjusted" in data.zoom) {
                zoom -= data.zoom.adjusted;
            } else if ("min" in data.zoom) {
                zoom -= data.zoom.min;
            }
        }
        return 1 << zoom;
    };

    Dimensions.prototype.ellipse = function (data, param) {
        var scale = this.getScaleRate(data, param.zoom),
            x, y, r, rx, ry, point;

        if (data.center instanceof google.maps.LatLng || data.position instanceof google.maps.LatLng) {
            point = this.fromLatLngToDivPixel(data.center || data.position);
        } else if (data.center instanceof google.maps.Point || data.position instanceof google.maps.Point) {
            point = data.center || data.position;
        } else {
            throw new Error("Unrecognized data type");
        }

        rx = scale * data.rx;
        ry = scale * data.ry;
        r = scale * data.radius;
        x = point.x - param.left;
        y = point.y - param.top;

        var ne = this.fromLatLngToDivPixel(param.bounds.getNorthEast());
        var sw = this.fromLatLngToDivPixel(param.bounds.getSouthWest());

        // contains
        if (
            Math.pow(sw.x - param.left - x, 2) / Math.pow(rx || r, 2) + Math.pow(sw.y - param.top - y, 2) / Math.pow(ry || r, 2) < 1 &&
            Math.pow(sw.x - param.left - x, 2) / Math.pow(rx || r, 2) + Math.pow(ne.y - param.top - y, 2) / Math.pow(ry || r, 2) < 1 &&
            Math.pow(ne.x - param.left - x, 2) / Math.pow(rx || r, 2) + Math.pow(sw.y - param.top - y, 2) / Math.pow(ry || r, 2) < 1 &&
            Math.pow(ne.x - param.left - x, 2) / Math.pow(rx || r, 2) + Math.pow(ne.y - param.top - y, 2) / Math.pow(ry || r, 2) < 1
            ) {
            return this.fillAllMap(param);
        }

        return {
            figure: {x: x, y: y, rx: rx, ry: ry, r: r, data: data.data},
            dimension: {left: (rx || r) - x, top: (ry || r) - y, right: (rx || r) + x - param.worldWidth, bottom: (ry || r) + y - param.worldWidth}
        };
    };

    Dimensions.prototype.circle = function (data, param) {
        return this.ellipse(data, param);
    };

    Dimensions.prototype.text = function (data, param) {
        var point = this.fromLatLngToDivPixel(data.position),
            x = point.x - param.left,
            y = point.y - param.top;

        return {
            figure: {x: x, y: y, text: data.text}
        };
    };

    Dimensions.prototype.polygon = function (data, param) {
        var //scale = this.getScaleRate(data, param.zoom),
            line = [],
            point;

        for (var i = 0, j = data.position.length; i < j; i++) {
            point = this.fromLatLngToDivPixel(data.position[i]);
            line.push([
                    i === 0 ? "M" : "L",
                    point.x - param.left,
                    point.y - param.top
            ]);
        }
        line.push(["Z"]);

        return {
            figure: {path: Raphael.pathToRelative(line)}
        };
    };

    Dimensions.prototype.path = function (data, param) {
        var scale = this.getScaleRate(data, param.zoom),
            point = this.fromLatLngToDivPixel(data.position),
            path = Raphael.pathToRelative(Raphael.parsePathString(data.path)),
            line = [];

        for (var i = 0, p = path.length; i < p; i++) {
            for (var j = 0, l = path[i].length; j < l; j++) {
                if (j === 0) {
                    line[i] = [path[i][j]];
                } else if (i === 0 && j === 1) {
                    line[i].push(point.x - param.left + path[i][j] * scale);
                } else if (i === 0 && j === 2) {
                    line[i].push(point.y - param.top + path[i][j] * scale);
                } else {
                    line[i].push(path[i][j] * scale);
                }
            }
        }

        return {
            figure: {path: line}
        };
    };

    Dimensions.prototype.rect = function (data, param) {
        var scale = this.getScaleRate(data, param.zoom),
            ne, sw, x, y, height, width, r, point, center, fixed;

        if (data.position instanceof google.maps.LatLngBounds) {
            // contains
            if (
                data.position.contains(param.bounds.getNorthEast()) &&
                data.position.contains(param.bounds.getSouthWest())
                ) {
                return this.fillAllMap(param);
            }
            ne = this.fromLatLngToDivPixel(data.position.getNorthEast());
            sw = this.fromLatLngToDivPixel(data.position.getSouthWest());
            width = ne.x - sw.x;
            height = sw.y - ne.y;
            x = sw.x - param.left;
            y = ne.y - param.top;
            r = scale * data.radius;
            fixed = 1;
        } else {

            if (data.position instanceof google.maps.LatLng) {
                point = this.fromLatLngToDivPixel(data.position);
                center = 0;
                fixed = 1;
            } else if (data.position instanceof google.maps.Point) {
                point = data.position;
                center = 0;
                fixed = -1;
            } else if (data.center instanceof google.maps.LatLng) {
                point = this.fromLatLngToDivPixel(data.center);
                center = 1 / 2;
                fixed = 1;
            } else if (data.center instanceof google.maps.Point) {
                point = data.center;
                center = 1 / 2;
                fixed = -1;
            } else {
                throw new Error("Unrecognized data type");
            }

            ne = this.fromLatLngToDivPixel(param.bounds.getNorthEast());
            sw = this.fromLatLngToDivPixel(param.bounds.getSouthWest());
            width = data.size.width * scale;
            height = data.size.height * scale;
            r = data.radius * scale;
            x = point.x - width * center - param.left;
            y = point.y - height * center - param.top;

            // contains
            if (
                x <= sw.x - param.left &&
                y <= ne.y - param.top &&
                x + width >= ne.x - param.left &&
                y + height >= sw.y - param.top
                ) {
                return this.fillAllMap(param);
            }
        }

        return {
            figure: {x: x, y: y, width: width, height: height, r: r, src: data.src},
            dimension: {left: -x, top: -y, right: width + x - param.worldWidth * fixed, bottom: height + y - param.worldWidth * fixed},
            type: data.type
        };
    };

    Dimensions.prototype.image = function (data, param) {
        return this.rect(data, param);
    };

    Dimensions.prototype.fillAllMap = function (param) {
        var ne, sw, x, y, height, width;

        ne = this.fromLatLngToDivPixel(param.bounds.getNorthEast());
        sw = this.fromLatLngToDivPixel(param.bounds.getSouthWest());
        width = ne.x - sw.x;
        height = sw.y - ne.y;
        x = sw.x - param.left;
        y = ne.y - param.top;

        return {
            figure: {x: x, y: y, width: width, height: height, r: 0},
            dimension: {left: -x, top: -y, right: width + x - param.worldWidth, bottom: height + y - param.worldWidth},
            type: "rect"
        };
    };

    Dimensions.prototype.piechart = function (data, param) {
        return this.ellipse(data, param);
    };

    Dimensions.prototype.barchart = function (data, param) {
        return this.rect(data, param);
    };

    Dimensions.prototype.hbarchart = function (data, param) {
        return this.rect(data, param);
    };

    Dimensions.prototype.linechart = function (data, param) {
        return this.rect(data, param);
    };

    Dimensions.prototype.dotchart = function (data, param) {
        return this.rect(data, param);
    };

    google.maps.Dimensions = Dimensions;

}));