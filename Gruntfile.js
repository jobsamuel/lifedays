module.exports = function (grunt) {

	// Load required Grunt plugin(s).
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-processhtml');
  	grunt.loadNpmTasks('grunt-bump');

	// Configuration Grunt uses to give each plugin its instructions.
	grunt.initConfig({
		
		//TODO
		
	});

	// Default Grunt task(s).
	grunt.registerTask('default', ['bump', 'clean', 'copy', 'uglify', 'cssmin', 'processhtml', 'concat']);
}