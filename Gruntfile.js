'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
    'assets/js/plugins/*.js',
    'assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true,
          // SASS source map
          // To disable, set sourcemap to false
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: false
        },
        files: {
          'assets/css/main.css': [
            'assets/sass/main.scss'
          ]
        }
      },
      build: {
        options: {
          style: 'compressed',
          compass: true,
          // SASS source map
          // To disable, set sourcemap to false
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: false
        },
        files: {
          'assets/css/main.min.css': [
            'assets/sass/main.scss'
          ]
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    shell: {
        hello: {  // Announce we are trimming PNGs
            command: function() {
              var red='$(tput setaf 1)', defaultColor = '$(tput sgr0)';
              return 'echo '+red+'Trimming PNG '+defaultColor+' sprites';
            }
        },
        trim: { // Mogrify (trim operations) requires imagemick
          command: 'mogrify -trim ./assets/sprites/*.png'
        }
    },
    sprite:{
      all: {
        src: 'assets/sprites/*.png',
        destImg: 'assets/img/_spritesheet.png',
        //destCSS: 'assets/css/sprites.css'
        destCSS: 'assets/sass/_sprite.scss',
        cssFormat: 'scss',
        padding: 200,
      }
    },
    svgstore: {
        options: {
            svg : {
                class: 'hidden', // Add class = "hidden" to generated SVG
            },
            prefix : 'shape-', // This will prefix each <g> ID
        },
        default: {
            files: {
                'assets/img/svg-defs.svg': ['assets/sprites/svg/*.svg'],
            }
        }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['assets/js/scripts.min.js'],
            ['assets/css/main.min.css']
          ]
        },
        uglify: true,
        parseFiles: true
      }
    },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          'templates/*.php',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'sass:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'sass:build',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'version'
  ]);
};
