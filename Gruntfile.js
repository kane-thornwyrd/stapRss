module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filesTypes: {
      js : '**/*.js',
      less : '**/*.less',
      css : '**/*.css',
      jade : '**/*.jade'
    },
    files: {
      src : 'src',
      publicFolder : './public',
      publicJs : '<%= files.publicFolder %>/js',
      jsSrc: '<%= files.src %>/js',
      cssSrc: '<%= files.src %>/css',
      templates : 'src/templates',
      templatesCompiled : 'public/js/templates.js',
      app : 'public/js/<%= pkg.name %>.js',
      appCss : 'public/css/<%= pkg.name %>.css',
      appMin : 'public/js/<%= pkg.name %>.min.js',
      appCssMin : 'public/css/<%= pkg.name %>.min.css',
      nodeModules : 'node_modules'
    },
    mince: {
      'app': {
        include: [
          '<%= files.nodeModules %>',
          '<%= files.jsSrc %>',
          '<%= files.src %>',
          '<%= files.publicJs %>'
        ],
        src: 'app.js',
        dest: '<%= files.app %>'
      },
      'css': {
        include: [
          '<%= files.cssSrc %>'
        ],
        src: 'app.css',
        dest: '<%= files.appCss %>'
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= files.appMin %>': ['<%= files.app %>']
        }
      }
    },
    jshint: {
      files: [
        'gruntfile.js',
        '<%= files.src %>/<%= filesTypes.js %>'
      ],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        files:{
          '<%= files.appCssMin %>': '<%= files.appCss %>'
        },
        report: 'min'
      }
    },
    jade: {
      compile: {
        options: {
          client: true,
          namespace: 'templates',
          compileDebug: false,
          processName: function(original){
            return original
              .replace(/(src\/templates\/)((\w+|\/)+)(\.jade)/, '$2','gi')
            ;
          }
        },
        files: {
          "<%= files.templatesCompiled %>": [
            "<%= files.templates %>/<%= filesTypes.jade %>"
          ]
        }
      }
    },
    watch: {
      js: {
        files: [
          '<%= files.templates %>/<%= filesTypes.jade %>',
          '<%= files.jsSrc %>/<%= filesTypes.js %>'
        ],
        tasks: ['jshint', 'jade', 'mince:app','uglify'],
      },
      css: {
        files: [
          '<%= files.cssSrc %>/<%= filesTypes.less %>',
        ],
        tasks: ['mince:css','cssmin'],
      },
      options: {
        livereload: 1338,
        nospawn: true,
      },
    }
  });
grunt.log.subhead('Local StapRss Server');
console.log(grunt.config.get('filesTypes'));

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-mincer');

  grunt.registerTask('build', ['jshint', 'mince', 'jade', 'cssmin', 'uglify']);
  grunt.registerTask('default', 'watch');

};
