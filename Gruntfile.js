module.exports = function( grunt ) {

  grunt.initConfig({

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/vendor/jquery-2.1.4.js', 'js/app.js'],
        dest: 'js/built.js'
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default",["concat"]);


}
