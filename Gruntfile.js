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
		
		pkg: grunt.file.readJSON('package.json'),
		
		// Increment the app version using semantic versioning (http://semver.org/).
		bump: { 
		    options: {
		      files: ['package.json'],
		      updateConfigs: [],
		      commit: false,
		      commitMessage: 'Release v%VERSION%',
		      commitFiles: ['package.json'],
		      createTag: false,
		      tagName: 'v%VERSION%',
		      tagMessage: 'Version %VERSION%',
		      push: false,
		      pushTo: 'upstream',
		      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
		    }
		},

		// Clean selected files and folders.
		clean: {
		  build: {
		    src: [ 'build' ]
		  },
		},

		// Minify Javascript files. 
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
						' * Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
						' * License <%= pkg.license %>\n' +
						' */\n'
			},
			build: {
				expand: true,
				cwd: 'src/js/',
				src: '*.js',
				dest: 'build/js/',
				ext: '.min.js'
			}
		},

		// Minify CSS files.
		cssmin: {
			options: {
				banner: '/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
						' * Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
						' * License <%= pkg.license %>\n' +
						' */\n'
			},
			minify: {
				expand: true,
				cwd: 'src/css/',
				src: '*.css',
				dest: 'build/css/',
				ext: '.min.css'
			}
		},

		// Replicate files in a specific destination.
		copy: {
		  main: {
		    files: [
			    {expand: true, cwd: 'src/vendor/angular/', src: ['angular.min.js'], dest: 'build/vendor/'},
			    {expand: true, cwd: 'src/vendor/angular-ui-router/release/', src: ['angular-ui-router.min.js'], dest: 'build/vendor/'},
			    {expand: true, cwd: 'src/vendor/moment/min/', src: ['moment.min.js'], dest: 'build/vendor/'},
			    {expand: true, cwd: 'src/vendor/bootstrap/dist/css/', src: ['bootstrap.min.css'], dest: 'build/vendor/'},
			    {expand: true, cwd: 'src/vendor/components-font-awesome/css/', src: ['font-awesome.min.css'], dest: 'build/vendor/'},
			    {expand: true, cwd: 'src/partials/', src: ['*'], dest: 'build/partials/'}
		    ]
		  }
		},

		// Process html files at build time to modify them depending on the release environment.
		processhtml: {
			/*options:{},*/
			dist: {
				files: {
			        'build/index.html': ['src/index.html']
			    }
			}
		},

		// Concatenate the result with a newly-generated banner comment.
		concat: {
	    	options: {
		      stripBanners: true,
		      banner: 	'/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
						' * Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
						' * License <%= pkg.license %>\n' +
						' */\n'
	    	},
		    dist: {
		      src: ['src/app.js'],
		      dest: 'build/app.js'
		    }
		}
		
	});

	// Default Grunt task(s).
	grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin', 'processhtml', 'concat']);
	grunt.registerTask('build', ['bump', 'clean', 'copy', 'uglify', 'cssmin', 'processhtml', 'concat']);
}