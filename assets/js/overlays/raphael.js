(function () {

    "use strict";

    function RaphaelOverlayView (options) {
        this.setMap(options.map);
        this.shapes = options.shapes || [];
        this.dimensions = new google.maps.Dimensions(this);
    }

    RaphaelOverlayView.prototype = new google.maps.OverlayView();

    RaphaelOverlayView.prototype.onAdd = function () {

        var projection = this.getProjection(),
            center = projection.fromLatLngToDivPixel(new google.maps.LatLng(0, 0)),
            worldWidth = projection.getWorldWidth();

        this.div = document.createElement("div");
        this.div.style.border = "none";
        this.div.style.position = "absolute";
        this.div.style.overflow = "visible";

        this.div.style.left = center.x - worldWidth / 2 + "px";
        this.div.style.top = center.y - worldWidth / 2 + "px";
        this.div.style.width = worldWidth + "px";
        this.div.style.height = worldWidth + "px";

        this.getPanes().overlayImage.appendChild(this.div);
        this.canvas = Raphael(this.div);
    };

    RaphaelOverlayView.prototype.draw = function () {

        var projection = this.getProjection(),
            center = projection.fromLatLngToDivPixel(new google.maps.LatLng(0, 0)),
            worldWidth = projection.getWorldWidth(),
            bounds = this.getMap().getBounds(),
            left = center.x - worldWidth / 2,
            top = center.y - worldWidth / 2,
            zoom = this.getMap().getZoom(),
            shapes = [],
            figures = [],
            dim = {
                left: [0],
                top: [0],
                right: [0],
                bottom: [0]
            };

        this.canvas.clear();

        for (var i = 0, j = this.shapes.length; i < j; i++) {
            try {
                var data = this.dimensions[this.shapes[i].type](this.shapes[i], {
                    map: this.getMap(),
                    bounds: bounds,
                    worldWidth: worldWidth,
                    zoom: zoom,
                    left: left,
                    top: top
                });

                if ("dimension" in data) {
                    dim.left.push(data.dimension.left);
                    dim.top.push(data.dimension.top);
                    dim.right.push(data.dimension.right);
                    dim.bottom.push(data.dimension.bottom);
                }

                figures.push({
                    data: data.figure,
                    type: data.type || this.shapes[i].type,
                    attr: this.shapes[i].attr,
                    info: this.shapes[i].info
                });

            } catch (e) {
                console.log(e);
            }
        }

        var offsetLeft = Math.max.apply(null, dim.left),
            offsetTop = Math.max.apply(null, dim.top),
            offsetRight = Math.max.apply(null, dim.right),
            offsetBottom = Math.max.apply(null, dim.bottom),
            fullWorldWidth = offsetLeft + worldWidth + offsetRight,
            fullWorldHeight = offsetTop + worldWidth + offsetBottom;

        this.div.style.left = left - offsetLeft + "px";
        this.div.style.top = top - offsetTop + "px";
        this.div.style.width = fullWorldWidth + "px";
        this.div.style.height = fullWorldHeight + "px";
        this.canvas.setSize(fullWorldWidth, fullWorldHeight);

        for (var f = 0, l = figures.length; f < l; f++) {
            shapes[f] = this._draw(figures[f].type, figures[f].data, {
                left: offsetLeft,
                top: offsetTop
            }, this.clone(figures[f].info));
            if (figures[f].attr) {
                shapes[f].attr(figures[f].attr);
            }
        }
    };

    RaphaelOverlayView.prototype.onRemove = function () {
        this.canvas.clear();
        this.div.parentNode.removeChild(this.div);
    };

    RaphaelOverlayView.prototype.clone = function (obj) {
        return obj ? JSON.parse(JSON.stringify(obj)) : {};
    };

    RaphaelOverlayView.prototype._draw = function (type, data, param, info) {
        switch (type) {
            case "path" :
            case "polygon" :
                data.path[0][1] += param.left;
                data.path[0][2] += param.top;
                return this.canvas.path(data.path);
            case "text":
                return this.canvas.text(
                        data.x + param.left,
                        data.y + param.top,
                    data.text
                );
            case "image":
                return this.canvas.image(
                    data.src,
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height
                );
            case "rect":
                return this.canvas.rect(
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height,
                    data.r
                );
            case "circle":
                return this.canvas.circle(
                        data.x + param.left,
                        data.y + param.top,
                    data.r
                );
            case "ellipse":
                return this.canvas.ellipse(
                        data.x + param.left,
                        data.y + param.top,
                    data.rx,
                    data.ry
                );
            case "piechart":
                return this.canvas.piechart(
                        data.x + param.left,
                        data.y + param.top,
                    data.r,
                    info.data
                );
            case "barchart":
                return this.canvas.barchart(
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height,
                    info.data,
                    info.param
                );
            case "hbarchart":
                return this.canvas.hbarchart(
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height,
                    info.data,
                    info.param
                );
            case "linechart":
                return this.canvas.linechart(
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height,
                    info.x,
                    info.y,
                    info.param
                );
            case "dotchart":
                return this.canvas.dotchart(
                        data.x + param.left,
                        data.y + param.top,
                    data.width,
                    data.height,
                    info.xs,
                    info.ys,
                    info.data,
                    info.param
                );
            default:
                throw new Error("Unrecognized data type: " + data.type);
        }
    };

    google.maps.RaphaelOverlayView = RaphaelOverlayView;

})();