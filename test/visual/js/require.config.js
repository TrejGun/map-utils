require.config({

    baseUrl: "/",

    "shim": {

        // maps
        "map-utils": {
            deps: ["google-map"]
        }
    },

    "paths": {

        // plugins
        "async": "dist/vendors/requirejs-plugins/src/async",
        "css": "dist/vendors/require-css/css.min",

        // map utils
        "map-utils": "assets/js",

        // google maps
        "google-map": "http://maps.google.com/maps/api/js?v=3&sensor=false"

    }
});
