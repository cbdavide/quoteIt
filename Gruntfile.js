module.exports = function( grunt ) {

  grunt.initConfig({

    babel: {
      options: {
      },
      dist: {
        files: {
          "dist/app.js": "js/app.js"
        }
      }
  }

  });

  grunt.loadNpmTasks("grunt-babel");
  grunt.registerTask("default",["babel"]);


}
