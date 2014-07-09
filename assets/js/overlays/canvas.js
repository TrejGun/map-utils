(function () {

    function CanvasOverlay (options) {
        this.setMap(options.map);
        this.shapes = options.shapes || [];
        this.intervals = [];
        this.dimensions = new google.maps.Dimensions(this);
    }

    CanvasOverlay.prototype = new google.maps.OverlayView();

    CanvasOverlay.prototype.onAdd = function () {

        var projection = this.getProjection(),
            center = projection.fromLatLngToDivPixel(new google.maps.LatLng(0, 0)),
            worldWidth = projection.getWorldWidth();

        this.canvas = document.createElement('canvas');
        this.canvas.style.border = 'none';
        this.canvas.style.position = 'absolute';
        this.canvas.style.overflow = 'visible';

        this.canvas.width = worldWidth;
        this.canvas.height = worldWidth;
        this.canvas.style.left = center.x - worldWidth / 2 + 'px';
        this.canvas.style.top = center.y - worldWidth / 2 + 'px';

        this.getPanes().overlayImage.appendChild(this.canvas);
    };

    CanvasOverlay.prototype.draw = function () {
        var projection = this.getProjection(),
            center = projection.fromLatLngToDivPixel(new google.maps.LatLng(0, 0)),
            bounds = this.getMap().getBounds(),
            worldWidth = projection.getWorldWidth(),
            left = center.x - worldWidth / 2,
            top = center.y - worldWidth / 2,
            zoom = this.getMap().getZoom(),
            context = this.canvas.getContext('2d'),
            figures = [],
            dim = {
                left: [0],
                top: [0],
                right: [0],
                bottom: [0]
            };

        for (var i = 0, j = this.intervals.length; i < j; i++) {
            clearInterval(this.intervals[i]);
        }

        for (var s = 0, l = this.shapes.length; s < l; s++) {
            try {

                data = this.dimensions.rect(this.shapes[s], {
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
                figures.push(data)
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

        this.canvas.style.left = left - offsetLeft + 'px';
        this.canvas.style.top = top - offsetTop + 'px';
        this.canvas.width = fullWorldWidth;
        this.canvas.height = fullWorldHeight;

        for (var z = 0, x = this.shapes.length; z < x; z++) {
            (function (i, self, figures) {
                self.intervals.push(setInterval(function () {
                    self.shapes[i].drawable.draw(context, {
                        left: offsetLeft,
                        top: offsetTop,
                        right: offsetRight,
                        bottom: offsetBottom,
                        fullWorldWidth: fullWorldWidth,
                        fullWorldHeight: fullWorldHeight
                    }, figures[i].figure, zoom);
                }, self.shapes[i].interval));
            })(z, this, figures);
        }
    };

    CanvasOverlay.prototype.onRemove = function () {
        this.canvas.parentNode.removeChild(this.canvas);
    };

    google.maps.CanvasOverlay = CanvasOverlay;

})();