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
                    out: "dist/js/map-utils.min.js",
                    optimize: "uglify2",
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    skipModuleInsertion: true,
                    include: [
                        "maptypes/coordinate",
                        "maptypes/greyscale",
                        "overlays/canvas",
                        "overlays/raphael"
                    ],
                    paths: {
                        // libs
                        "raphael": "empty:",
                        "raphael.g": "empty:",
                        "raphael.g.bar": "empty:",
                        "raphael.g.dot": "empty:",
                        "raphael.g.line": "empty:",
                        "raphael.g.pie": "empty:",
                        "google-map": "empty:"
                    }
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/img/",
                        src: [
                            "*",
                            "*/**"
                        ],
                        dest: "dist/img/"
                    }
                ]
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
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-compare-size");

    // Default task(s).
    grunt.registerTask("build", ["requirejs", "jshint", "copy", "compare_size"]);
    grunt.registerTask("default", ["build"]);

};