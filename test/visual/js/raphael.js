google.maps.event.addDomListener(window, "load", function () {

    "use strict";

    // example 1
    var map1 = new google.maps.Map(document.getElementById("map1"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map1,
        shapes: [
            {
                position: new google.maps.LatLng(0, 0),
                type: "circle",
                radius: 150,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 2
    var map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map2,
        shapes: [
            {
                position: new google.maps.LatLng(85, -175),
                type: "circle",
                radius: 75,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                center: new google.maps.LatLng(-85, 175),
                size: new google.maps.Size(100, 100),
                radius: 10,
                type: "rect",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#0f0",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 3
    var map3 = new google.maps.Map(document.getElementById("map3"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map3,
        shapes: [
            {
                position: new google.maps.LatLng(85, -175),
                path: "M100,100c0,50 100,-50 100,0c0,50-100-50-100,0z",
                type: "path",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 4
    var map4 = new google.maps.Map(document.getElementById("map4"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map4,
        shapes: [
            {
                position: new google.maps.LatLngBounds(
                    new google.maps.LatLng(-50, -100),
                    new google.maps.LatLng(50, 100)
                ),
                type: "rect",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#00f",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.LatLng(85, -175),
                size: new google.maps.Size(100, 100),
                type: "rect",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#0f0",
                    "fill-opacity": 0.3
                }
            },
            {
                center: new google.maps.LatLng(-85, 175),
                size: new google.maps.Size(100, 100),
                type: "rect",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.Point(300, 100),
                size: new google.maps.Size(100, 100),
                type: "rect",
                radius: 10,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#ff0",
                    "fill-opacity": 0.3
                }
            },
            {
                center: new google.maps.Point(300, 100),
                size: new google.maps.Size(100, 100),
                type: "rect",
                radius: 10,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f0f",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 5
    var map5 = new google.maps.Map(document.getElementById("map5"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map5,
        shapes: [
            {
                src: "http://upload.wikimedia.org/wikipedia/commons/d/d6/Wikipedia-logo-v2-en.png",
                position: new google.maps.LatLng(85, -175),
                size: new google.maps.Size(135, 155),
                type: "image"
            }
        ]
    });

    // example 6
    var map6 = new google.maps.Map(document.getElementById("map6"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map6,
        shapes: [
            {
                center: new google.maps.LatLng(85, 175),
                type: "circle",
                radius: 100,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#0f0",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.Point(300, 100),
                type: "circle",
                radius: 100,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.LatLng(-85, -175),
                type: "ellipse",
                rx: 100,
                ry: 50,
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#00f",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 7
    var map7 = new google.maps.Map(document.getElementById("map7"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map7,
        shapes: [
            {
                position: [
                    new google.maps.LatLng(84, -175),
                    new google.maps.LatLng(84, 175),
                    new google.maps.LatLng(0, 0)
                ],
                type: "polygon",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.LatLng(85, -175),
                path: "M 0 0 L 200 0 L 100 200 z",
                type: "path",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.LatLng(85, -175),
                path: "M100,100c0,50 100-50 100,0c0,50 -100-50 -100,0z",
                type: "path",
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

    // example 8
    var map8 = new google.maps.Map(document.getElementById("map8"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    new google.maps.RaphaelOverlayView({
        map: map8,
        shapes: [
            {
                position: new google.maps.LatLng(0, 0),
                text: "CTAPbIu_MABP",
                type: "text",
                attr: {
                    fill: "#fff",
                    "font-size": 20
                }
            }
        ]
    });

    // example 9
    var map9 = new google.maps.Map(document.getElementById("map9"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(0, 0),
        map: map9,
        draggable: true
    });

    // for consistency
    void(marker);

    new google.maps.RaphaelOverlayView({
        map: map9,
        shapes: [
            {
                position: new google.maps.LatLng(0, 0),
                path: "M0,0c0,50 100-50 100,0c0,50 -100-50 -100,0z",
                type: "path",
                zoom: {
                    min: 3,
                    max: 5
                },
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            },
            {
                position: new google.maps.LatLng(0, 0),
                path: "M0,0c0,50 100-50 100,0c0,50 -100-50 -100,0z",
                type: "path",
                zoom: {
                    min: 3,
                    max: 5,
                    adjusted: 0
                },
                attr: {
                    stroke: "#fff",
                    "stroke-width": 2,
                    fill: "#f00",
                    "fill-opacity": 0.3
                }
            }
        ]
    });

});

