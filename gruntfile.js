module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    watch: {
      javascript: {
        files: ['*','!gruntfile.js'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '',
          hostname: '*'
        }
      }
    }
  });
  grunt.registerTask('default', ['connect', 'watch']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
