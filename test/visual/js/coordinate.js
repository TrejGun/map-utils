google.maps.event.addDomListener(window, "load", function () {

    "use strict";

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeControlOptions: {
            mapTypeIds: ["Coordinate"]
        }
    });

    map.mapTypes.set("Coordinate", new google.maps.CoordinateMapType("../../../dist/img/portreit"));
    map.setMapTypeId("Coordinate");
});