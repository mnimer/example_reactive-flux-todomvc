module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //CSS
    grunt.registerTask('build-css', ['compass']);

    //JS
    grunt.registerTask('build-babel-js', ['jshint', 'babel', 'browserify']);


    // build and watch, with un-minified DEV compiled code
    grunt.registerTask('default', ['clean:dist',  'build-css', 'build-babel-js', 'copy', 'watch']);

    // build and watch, with minified PRODUCTION compiled code
    grunt.registerTask('default-prod', ['clean:dist',  'build-css', 'build-babel-js', 'copy', 'uglify', 'watch']);



    var options = {
        port: 9081,
        src: "src",
        dist: "dist",
        tmp: ".tmp"
    };

    grunt.initConfig({
        options: options,
        pkg: grunt.file.readJSON('package.json'),



        // ========================================
        // Live Reload & Watch
        // ========================================

        connect: {
            server: {
                options: {
                    port: options.port,
                    livereload: 35729,
                    base: '.'
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= options.port %>/index.html'
            }
        },

        watch: {
            html: {
                files: ['<%= options.src %>/*.html'],
                tasks: ['newer:copy:dashboard'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['<%= options.src %/*.scss'],
                tasks: ['compass:dashboard', 'newer:copy:dashboard' ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= options.src %>/**/*.js', '<%= options.src %>/*.jsx', '<%= options.src %>/**/*.jsx'],
                tasks: ['build-babel-js'],
                options: {
                    livereload: true
                }
            }
        },



        // ========================================
        // Utilities
        // ========================================

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= options.dist %>',
                        '!<%= options.dist %>/.git*'
                    ]
                }]
            }
        },


        copy: {
            src: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= options.src %>',
                    dest: '<%= options.dist %>',
                    src: [
                        '*.{html,ico,png,txt}',
                        '*.js',  //include static js files
                        '*.json',  //include static json files
                        'todomvc-common/**',
                        '.htaccess'
                    ]
                }]
            }
        },



        // ========================================
        // SASS/CSS/COMPASS
        // ========================================

        compass: {
            src: {
                options: {
                    sassDir: '<%= options.src %>',
                    cssDir: '<%= options.dist %>',
                    debugInfo: true,
                    relativeAssets: false,
                    assetCacheBuster: false,
                    specify: [
                        '<%= options.src %>/*.scss'
                    ]
                }
            }
        },



        // ========================================
        // JS & JSX
        // ========================================

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= options.src %>/{,*/}*.js',
                '!<%= options.src %>/bower_components/*',
                '!<%= options.src %>**/*.js'
            ]
        },


        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dashboard: {
                options:{
                    beautify: false,
                    screwIE8:true,
                    sourceMap: true,
                    sourceMapIncludeSources:true,
                    compress: {
                        'drop_debugger':true,
                        'drop_console':true,
                        dead_code: true
                    }
                },
                files: {
                    '<%= options.dist %>/app.js': [  '<%= options.dist %>/app.js']
                }
            }
        },


        /**
         * TODO: fiqure out why I need to run babel first and then run browserify against the new .tmp directory
         */
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            sourceMaps: true,
                            presets: ["react"]
                        }]
                    ]
                },
                files: {
                    "<%= options.dist %>/app.js": ["<%= options.tmp %>/app.js"]
                }
            }
        },


        "babel": {
            options: {
                sourceMap: true,
                presets:['react']
            },
            app: {
                files: [{
                    "expand": true,
                    "cwd": "src",
                    "src": ["**/*.jsx", '**/*.js'],
                    "dest": ".tmp",
                    "ext": ".js"
                }]
            }
        }


    });

};
