module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // load all necessery task for grunt

    grunt.initConfig({
        // *******************************
        // *          NODE-SASS          *
        // *******************************
        // - for the options see https://github.com/sass/node-sass#options
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                options: {
                    outpusStyle: 'nested'
                },
                files: {
                    'css/styles.css': [
                        'src/scss/website.scss'
                    ]
                }
            }
        },
        // *******************************
        // *      JavaScript             *
        // *******************************
        uglify: {
            my_target: {
                files: {
                    'js/app.min.js': [
                        'src/js/vendor/jquery.js',
                        'src/js/vendor/foundation.min.js',
                        'src/js/vendor/owl.carousel.min.js',
                        'src/js/vendor/what-input.js',
                        'src/js/main.js'
                    ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'css/styles.min.css': [
                        'assets/owl.carousel.css',
                        'assets/owl.theme.default.css',
                        'node_modules/foundation-sites/dist/foundation.css',
                        'css/styles.css']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 4 versions', 'ie 9', 'safari 7']
                // map: true
            },
            single_target: {
                src: 'css/styles.css',
                dest: 'css/styles.css'
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'js/',
                        src: ['app.min.js'],
                        dest: 'dist/js/',
                        ext: '.jgz'
                    },
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['styles.min.css'],
                        dest: 'dist/css/',
                        ext: '.cgz'
                    },
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['Desinfektor_Logo.svg'],
                        dest: 'dist/images/',
                        ext: '.sgz'
                    },
                    {
                        expand: true,
                        cwd: './',
                        src: ['index.html'],
                        dest: 'dist/',
                        ext: '.html'
                    }
                ]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'index.html'    // 'destination': 'source'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,JPG,gif}'],   // Actual patterns to match
                    dest: 'dist/images/'                  // Destination path prefix
                }]
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            autoprefixer: {
                files: 'css/styles.css',
                tasks: ['autoprefixer']
            },
            uglify: {
                files: 'src/js/*.js',
                tasks: ['uglify']
            },
            cssmin: {
                files: 'css/styles.css',
                tasks: ['cssmin']
            },
            compress: {
                files: 'css/styles.min.css',
                tasks: ['compress']
            },
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass']
            },
            htmlmin: {
                files: ['index.html'],
                tasks: ['htmlmin']
            }
        }
    });

    // *******************************
    // *          TASKS              *
    // *******************************
    grunt.registerTask('prod', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin', 'htmlmin', 'compress']);
    grunt.registerTask('plain', ['sass', 'autoprefixer', 'imagemin', 'htmlmin', 'compress']);
    grunt.registerTask('default', ['prod', 'watch']);
};
