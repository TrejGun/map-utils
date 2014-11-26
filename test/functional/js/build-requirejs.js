require(["../js/require.config.js"], function () {
    "use strict";

    require.config({
        "paths": {
            // map utils
            "map-utils": "dist/js/map-utils.min"
        }
    });

    require([
        "async!google-map",
        "map-utils"
    ], function () {

        require([
            "maptypes/coordinate",
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
