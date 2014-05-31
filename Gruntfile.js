(function() {

    'use strict';

    // Main Grunt section ------------------------------------------------------
    module.exports = function(grunt) {

        // Load dependencies ---------------------------------------------------
        require('time-grunt')(grunt);

        // Project configuration -----------------------------------------------
        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            siteDir: '_site',

            compass: {
                compile: {
                    options: {
                        config: 'config.rb'
                    }
                }
            },

            concat: {
                js: {
                    src: [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/jquery-throttle-debounce/jquery.ba-throttle-debounce.js',
                        'bower_components/sticky/jquery.sticky.js',
                        '_js/*.js'
                    ],
                    dest: 'app.js'
                }
            },

            connect: {
                server: {
                    options: {
                        port: 4000,
                        base: '<%= siteDir %>'
                    }
                }
            },

            jekyll: {
                build: {
                    dest: '<%= siteDir %>'
                }
            },

            watch: {
                sass: {
                    files: ['_sass/**/*.sass'],
                    tasks: ['compass'],
                },
                jekyll: {
                    files: [
                        '_config.yml',
                        '**/*.{html, md, yaml, yml}',
                        'style.css',
                        'app.js',
                        '!_site/**/*.{html, md, yaml, yml}'
                    ],
                    tasks: ['build']
                },
                js: {
                    files: ['_js/*.js', 'Gruntfile.js'],
                    tasks: ['concat:js', 'build']
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-compass');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-jekyll');

        // Tasks ---------------------------------------------------------------
        grunt.registerTask(
            'default',
            'Default task: serve',
            ['serve']
        );

        grunt.registerTask(
            'build',
            'Recompiles the sass, js, and rebuilds Jekyll',
            ['compass', 'concat', 'jekyll']
        );

        grunt.registerTask(
            'serve',
            'Start a web server on port 4000, and rebuild after changes',
            ['build', 'connect', 'watch']
        );

    };

})();
