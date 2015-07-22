'use strict';
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    browserify: {
      options: {
        transform: [
          ['babelify', {}]
        ]
      },
      dist: {
        src: ['src/*'],
        dest: 'public/build/bundle.js'
      }
    },
  });

  grunt.registerTask('default', ['browserify']);
};
