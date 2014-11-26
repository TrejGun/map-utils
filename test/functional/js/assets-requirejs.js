require(["../js/require.config.js"], function () {
    "use strict";

    require.config({
        "shim": {
            // maps
            "map-utils": {
                deps: ["google-map"]
            }
        },
        "paths": {
            // map utils
            "map-utils": "assets/js"
        }
    });

    require([
        "async!google-map"
    ], function () {

        require([
            "map-utils/maptypes/coordinate",
            "css!test/visual/css/visual.css"
        ], function () {

            //google.maps.event.addDomListener(window, "load", function () {

                var map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 0,
                    center: new google.maps.LatLng(0,0),
                    mapTypeControlOptions: {
                        mapTypeIds: ["Coordinate"]
                    }
                });

                map.mapTypes.set("Coordinate", new google.maps.CoordinateMapType());
                map.setMapTypeId("Coordinate");

            //});

        });
    });
});
