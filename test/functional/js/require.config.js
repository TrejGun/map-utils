require.config({

    baseUrl: "/",
    
    "shim":{
        "raphae.g": {
            deps: ["raphael"]
        },
        "raphael.g.bar": {
            deps: ["raphael.g"]
        },
        "raphael.g.dot": {
            deps: ["raphael.g"]
        },
        "raphael.g.line": {
            deps: ["raphael.g"]
        },
        "raphael.g.pie": {
            deps: ["raphael.g"]
        }
    },

    "paths": {

        // plugins
        "async": "dist/vendors/requirejs-plugins/src/async",
        "css": "dist/vendors/require-css/css.min",

        // map utils
        //"map-utils": "assets/js",

        // google maps
        "google-map": "http://maps.google.com/maps/api/js?v=3&sensor=false",

        // raphael
        "raphael": "dist/vendors/raphael/raphael.js",
        "raphael.g": "dist/vendors/graphael/min/g.raphael-min",
        "raphael.g.bar": "dist/vendors/graphael/min/g.bar-min",
        "raphael.g.dot": "dist/vendors/graphael/min/g.dot-min",
        "raphael.g.line": "dist/vendors/graphael/min/g.line-min",
        "raphael.g.pie": "dist/vendors/graphael/min/g.pie-min"

    }
});
