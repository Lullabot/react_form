'use strict';
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
      babel: {
          options: {
              sourceMap: true
          },
          dist: {
              files: {
                  'public/build/contact-form.js': 'src/contact-form.jsx'
              }
          }
      }
  });

  grunt.registerTask('default', ['babel']);
};
