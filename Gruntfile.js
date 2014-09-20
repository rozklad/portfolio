'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
    'public/assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
    'public/assets/js/plugins/*.js',
    'public/assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'public/assets/js/*.js',
        '!public/assets/js/scripts.js',
        '!public/assets/**/*.min.*'
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
          'public/assets/css/main.css': [
            'public/assets/sass/main.scss'
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
          'public/assets/css/main.min.css': [
            'public/assets/sass/main.scss'
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
        dest: 'public/assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'public/assets/js/scripts.min.js': [jsFileList]
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
          command: 'mogrify -trim ./public/assets/sprites/*.png'
        }
    },
    sprite:{
      all: {
        src: 'public/assets/sprites/*.png',
        destImg: 'public/assets/img/_spritesheet.png',
        //destCSS: 'public/assets/css/sprites.css'
        destCSS: 'public/assets/sass/_sprite.scss',
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
                'public/assets/img/svg-defs.svg': ['public/assets/sprites/svg/*.svg'],
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
            prev: 'public/assets/css/'
          }
        },
        src: 'public/assets/css/main.css'
      },
      build: {
        src: 'public/assets/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'public/assets/vendor/modernizr/modernizr.js',
        outputFile: 'public/assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['public/assets/js/scripts.min.js'],
            ['public/assets/css/main.min.css']
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
          manifest: 'public/assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'lib/scripts.php': 'public/assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'public/assets/sass/*.scss',
          'public/assets/sass/**/*.scss'
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
          'public/assets/css/main.css',
          'public/assets/js/scripts.js',
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
