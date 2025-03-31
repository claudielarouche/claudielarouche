module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.initConfig({
		less: {
			dev: {
				options: {
					paths: ["_/css"]
				},
				files: {
					"_/css/bootstrap.css": "_/components/less/bootstrap.less"
				}
			},
			prod{
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
		uglify: {
			dev: {
				files: {
					'_/css/bootstrap.css': ['_/css/bootstrap.css']
				}//files
			},
			test: {
				files: {
					'_/js/bootstrap.js': ['_/js/bootstrap.js']
				}//files
			},
			prod{
				files: {
					'_/js/myscript.js': ['_/components/js/_myscript.js']
				}//files
			}
		}, //uglify
		watch: {
			less: {
				files: ['_/components/less/_mystyles.less'],
				tasks: ['less:prod']
			}, //less
			uglify: {
				files: ['_/components/js/_myscrit.js'],
				tasks: ['uglify:prod']
			}
		} //watch
	})//initConfig
	grunt.registerTask('default','watch');
} //exports