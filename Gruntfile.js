(function() {

    'use strict';

    // Main Grunt section ------------------------------------------------------
    module.exports = function(grunt) {

        // Load dependencies ---------------------------------------------------
        require('time-grunt')(grunt);

        // Project configuration -----------------------------------------------
        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            devDir: '_dev',

            compass: {
                options: {
                    noLineComments: false,
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    sassDir: '_sass'
                },
                dev: {
                    options: {
                        cssDir: '<%= devDir %>/css'
                    }
                }
            },

            connect: {
                server: {
                    options: {
                        base: '<%= devDir %>',
                        port: 4000
                    }
                }
            },

            jekyll: {
                dev: {
                    dest: '<%= devDir %>'
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
