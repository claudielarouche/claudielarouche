module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.initConfig({
		less: {
			lessbootstrap: {
				options: {
					paths: ["_/css"]
				},
				files: {
					"_/css/bootstrap.css": "_/components/less/bootstrap.less"
				}
			},
			lessother: {
				options: {
					paths: ["_/css"]
				},
				files: {
					"_/css/mystyles.css": "_/components/less/_mystyles.less"
				}
			}
		},
		concat: {
			dist: {
				src: ['_/components/js/jquery.js', '_/components/js/affix.js', '_/components/js/transition.js', '_/components/js/tooltip.js', '_/components/js/alert.js', '_/components/js/button.js', '_/components/js/carousel.js', '_/components/js/collapse.js', '_/components/js/dropdown.js', '_/components/js/modal.js', '_/components/js/popover.js', '_/components/js/scrollspy.js', '_/components/js/tab.js'],
				dest: '_/js/bootstrap.js',
			}
		},
		cssmin: {
			target: {
				files: {
					'_/css/final.css': ['_/css/bootstrap.css', '_/css/mystyles.css']
				}
			}
		},
		uglify: {
			uglifybootstrap: {
				files: {
					'_/js/bootstrap.js': ['_/js/bootstrap.js']
				}//files
			},
			uglifyother: {
				files: {
					'_/js/myscript.js': ['_/components/js/_myscript.js']
				}//files
			}
		}, //uglify
		watch: {
			less: {
				files: ['_/components/less/_mystyles.less'],
				tasks: ['less:lessother', 'cssmin']
			}, //less
			uglify: {
				files: ['_/components/js/_myscript.js'], 
				tasks: ['uglify:uglifyother']
			}, //uglify
		} //watch
	})//initConfig
	grunt.registerTask('default','watch');
} //exports