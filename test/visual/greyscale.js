google.maps.event.addDomListener(window, "load", function initialize() {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 0,
        center: new google.maps.LatLng(0,0),
        mapTypeControlOptions: {
            mapTypeIds: ["Greyscale"]
        }
    });

    map.mapTypes.set("Greyscale", new google.maps.GreyscaleMapType());
    map.setMapTypeId("Greyscale");
});