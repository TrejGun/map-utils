google.maps.event.addDomListener(window, "load", function () {

    "use strict";

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 0,
        center: new google.maps.LatLng(0, 0),
        mapTypeControlOptions: {
            mapTypeIds: ["Gall-Peters"]
        }
    });

    map.mapTypes.set("Gall-Peters", new google.maps.GallPetersMapType("../../../dist/img/gall-pitess"));
    map.setMapTypeId("Gall-Peters");
});