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
        uglify: {
            js: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "assets/js",
                        src: "**/*.js",
                        dest: "dist/js",
                        ext: ".min.js"
                    }
                ]
            }
        },
        compare_size: {
            files: [
                "dist/js/maptypes/coordinate.min.js",
                "dist/js/maptypes/greyscale.min.js",
                "dist/js/overlays/canvas.min.js",
                "dist/js/overlays/raphael.min.js",
                "dist/js/projections/euclidean.min.js",
                "dist/js/utils/dimensions.min.js"
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
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-compare-size");

    // Default task(s).
    grunt.registerTask("default", ["jshint", "uglify", "compare_size"]);

};