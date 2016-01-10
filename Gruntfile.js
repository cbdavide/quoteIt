module.exports = function( grunt ) {

  grunt.initConfig({

    babel: {
      options: {
      },
      dist: {
        files: {
          "dist/js/app.js": "js/app.js",
          "dist/js/main.js": "js/main.js",
          "dist/js/quote.js": "js/quote.js",
          "dist/js/model.js": "js/model.js"
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/css/styles.css': ['css/fonts.css', 'css/normalize.css', 'css/styles.css']
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-babel");
  grunt.registerTask("default",["babel", "cssmin"]);


}
