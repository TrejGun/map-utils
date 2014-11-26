module.exports = function (grunt) {

    "use strict";

    var gzip = require("gzip-js");

    // Project configuration.
    grunt.initConfig({
        jshint: {
            dist: {
                src: [
                    "assets/js/**/*.js"
                ],
                options: {
                    jshintrc: "assets/js/.jshintrc"
                }
            },
            test: {
                src: [
                    "test/visual/js/**/*.js"
                ],
                options: {
                    jshintrc: "test/visual/js/.jshintrc"
                }
            }

        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: "assets/js",
                    name: "map-utils",
                    out: "dist/js/map-utils.min.js",
                    optimize: "uglify2",
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    paths: {
                        // libs
                        "raphael": "empty:",
                        "google-map": "empty:"
                    }
                }
            }
        },
        compare_size: {
            files: [
                "dist/js/map-utils.min.js"
            ],
            options: {
                compress: {
                    gz: function (contents) {
                        return gzip.zip(contents, {}).length;
                    }
                },
                cache: "dist/.sizecache.json"
            }
        }
    });

    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-compare-size");

    // Default task(s).
    grunt.registerTask("build", ["requirejs", "jshint", "compare_size"]);
    grunt.registerTask("default", ["build"]);

};