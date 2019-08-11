module.exports = function (grunt) {
  //初始化配置grunt任务
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/js/test1.js', 'src/js/test2.js'],
        dest: 'dist/build.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> -v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      }
    },
    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc'//指定配置文件
    //   },
    //   build: ['Gruntfile.js', 'src/js/*.js']//指定检查文件
    // },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/build.min.css': 'src/css/*.css'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js','src/css/*.css'],
        tasks: ['concat', 'uglify', 'cssmin'],
        options: {
          spawn: false //变量更新（性能更好）  true：全量更新
        }
      }
    }
  })

  //grunt任务执行的时候去加载对应的任务插件
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-watch')

  //注册grunt默认任务，执行任务是同步
  // grunt.registerTask('default',['concat', 'uglify', 'jshint'])
  grunt.registerTask('default',['concat', 'uglify', 'cssmin'])
  grunt.registerTask('myWatch',['default', 'watch'])
}