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
    },

    cssmin: {
      dist: {
        files: {
          'dist/styles.css': ['css/*.css']
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-babel");
  grunt.registerTask("default",["babel", "cssmin"]);


}
