module.exports = function( grunt ) {

  grunt.initConfig({

    browserify: {
      dist: {
        options: {
          transform: ["babelify"]
        },
        files: {
          "dist/app.js" : "js/app.js"
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
  grunt.loadNpmTasks("grunt-browserify");
  grunt.registerTask("default",["browserify", "cssmin"]);


}
