module.exports = function(grunt) {
    grunt.initConfig({
        concat : {
            dist : {
                src : ['components/scripts/*.js'],
                dest : 'builds/development/js/script.js'
            }
        },   // concat
        bower_concat: {
            all: {
                dest: {
                    js: 'builds/development/js/_bower.js',
                    css: 'builds/development/css/_bower.css'
                }
            }
        },
        wiredep: {
            task: {
                src: 'builds/development/*.html'
            }
        },
        sass : {
            dist : {
                options : {
                    style : 'expanded'
                },
                files : [{
                    src : 'components/sass/style.scss',
                    dest : 'builds/development/css/style.css'
                }]
            }
        },   // sass
        watch : {
            options : {
                spawn: false,
                livereload: true
            },
            scripts : {
                files : ['builds/development/**/*.html',
                    'components/scripts/**/*.js',
                    'components/sass/**/*'],
                tasks : ['concat', 'sass']
            }
        },   // watch
        connect : {
            server : {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: 'builds/development',
                    livereload: true
                }
            }
        }
    }); // initConfig

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-cdnify');

    // default task
    grunt.registerTask('default', ['wiredep', 'bower_concat', 'concat', 'sass', 'connect', 'watch']);
};  // wrapper function
