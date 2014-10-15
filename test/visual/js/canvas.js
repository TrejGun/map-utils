google.maps.event.addDomListener(window, "load", function () {

    "use strict";

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.CanvasOverlay({
        map: map,
        shapes: [
            {
                center: new google.maps.LatLng(85, 175),
                size: new google.maps.Size(255, 255),
                interval: 50,
                drawable: {
                    theta: 0,
                    outerRadius: 1,
                    innerRadius: 0.2005,
                    size: 250,
                    a: 0,
                    b: 0,
                    draw: function (context, size, figure, zoom) {

                        context.clearRect(0, 0, size.fullWorldWidth, size.fullWorldHeight);

                        var d = (this.size << zoom) / 2;
                        context.beginPath();
                        for (var i = 0, x = 0, y = 0, q = 0; i < 50; i++) {
                            this.theta += 2 * Math.PI;
                            q = (this.innerRadius / this.outerRadius - 1) * this.theta;
                            x = size.left + figure.x + (this.innerRadius - this.outerRadius) * Math.cos(this.theta) + d * Math.cos(q) + d;
                            y = size.top + figure.y + (this.innerRadius - this.outerRadius) * Math.sin(this.theta) - d * Math.sin(q) + d;
                            context[!!this.a ? "lineTo" : "moveTo"](x, y);
                            this.a = x;
                            this.b = y;
                        }
                        context.strokeStyle = "hsla(" + (100 % 360) + ",100%,50%,0.75)";
                        context.stroke();

                    }
                }
            },
            {
                center: new google.maps.LatLng(-85, -175),
                size: new google.maps.Size(255, 255),
                interval: 50,
                drawable: {
                    theta: 0,
                    outerRadius: 1,
                    innerRadius: 0.4005,
                    size: 250,
                    a: 0,
                    b: 0,
                    draw: function (context, size, figure, zoom) {

                        //context.clearRect (0, 0, size.fullWorldWidth, size.fullWorldHeight);

                        var d = (this.size << zoom) / 2;
                        context.beginPath();
                        for (var i = 0, x = 0, y = 0, q = 0; i < 50; i++) {
                            this.theta += 2 * Math.PI;
                            q = (this.innerRadius / this.outerRadius - 1) * this.theta;
                            x = size.left + figure.x + (this.innerRadius - this.outerRadius) * Math.cos(this.theta) + d * Math.cos(q) + d;
                            y = size.top + figure.y + (this.innerRadius - this.outerRadius) * Math.sin(this.theta) - d * Math.sin(q) + d;
                            context[!!this.a ? "lineTo" : "moveTo"](x, y);
                            this.a = x;
                            this.b = y;
                        }
                        context.strokeStyle = "hsla(" + (200 % 360) + ",100%,50%,0.75)";
                        context.stroke();

                    }
                }
            }
        ]
    });
});

