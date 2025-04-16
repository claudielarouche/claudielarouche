console.log("application starting v2");
let historyStack = [];
        document.body.addEventListener('keydown', function(event) {
	    const keyName = event.key;
	    if ((event.ctrlKey || event.metaKey) && keyName === 'z') {
	        undoLastAction();
	    } else if (keyName === '=') {  // Checking for the equal sign to perform undo
	        undoLastAction();
	    } else if (keyName.toUpperCase() === 'A' || keyName.toUpperCase() === 'D' || keyName.toUpperCase() === 'R' || keyName.toUpperCase() === 'M' || keyName.toUpperCase() === 'T' || keyName.toUpperCase() === 'P') {
	        const buttonMap = {
	            'A': 'Automation',
	            'D': 'DINE',
	            'R': 'RTL',
	            'M': 'Manual',
	            'T': 'TBD',
		    'P': 'Pivot'
	        };
	        addToText(buttonMap[keyName.toUpperCase()]);
	    }
	});


        function addToText(category) {
		console.log("category pressed:" + category);
		

	            const pageInput = document.getElementById('pageNumber');
	            let pageNumber = parseInt(pageInput.value);
	            const finalText = document.getElementById('finalText');
	            const lines = finalText.value.split('\n');
	            const updatedLines = lines.map(line => {
	                if (line.startsWith(category + ':')) {
			    if (category != "Pivot"){
	                        historyStack.push(finalText.value); // Save the current state before updating
			    }
	                    return line + pageNumber + ', ';
	                } else {
	                    return line;
	                }
	            });
	            finalText.value = updatedLines.join('\n');
	            adjustTextArea(finalText); // Adjust the height of the textarea
			if (category != "Pivot")
		{
			pageInput.value = pageNumber + 1;
			
		}
	            
		
        }

       function createFinalRecord() {
		let text = document.getElementById('finalText').value;
		text = text.split('\n').map(line => {
			// Keep only lines that have numbers (digits)
			return line.match(/\d+/) ? line.replace(/,\s*$/, '') : null;
		}).filter(line => line) // Remove null entries (lines without numbers)
		  .map(line => {
			// This part will handle the range compression for numbers.
			if (line.includes(',')) {
				return line.replace(/\b(\d+)(, (\d+))+\b/g, (match) => {
					let nums = match.split(', ').map(Number);
					let ranges = [];
					let start = nums[0];
		
					for (let i = 1; i < nums.length; i++) {
						if (nums[i] !== nums[i - 1] + 1) {
							if (start === nums[i - 1]) {
								ranges.push(start.toString());
							} else {
								ranges.push(start + '-' + nums[i - 1]);
							}
							start = nums[i];
						}
					}
					// Push the last range or number
					if (start === nums[nums.length - 1]) {
						ranges.push(start.toString());
					} else {
						ranges.push(start + '-' + nums[nums.length - 1]);
					}
					return ranges.join(', ');
				});
			}
			return line;
		}).join(', ');

	        text = text.replace(/(Pivot)/g, '<br><br>$1');
		
		document.getElementById('recordDisplay').innerText = text;
		
		// Determine instructions based on content
		provideInstructions(text);
		}

        function provideInstructions(text) {
			const counts = {
				automation: (text.match(/Automation:/g) || []).length,
				manual: (text.match(/Manual:/g) || []).length,
				dine: (text.match(/DINE:/g) || []).length,
				rtl: (text.match(/RTL:/g) || []).length
			};
			let instructions = '';

			if (counts.automation > 0 && counts.dine === 0 && counts.rtl === 0 && counts.manual === 0) {
				instructions = 'Please add the file to the <a href="https://042gc.sharepoint.com/:x:/r/sites/TemplateQCTeams/_layouts/15/Doc.aspx?sourcedoc=%7BC31D2EAA-7716-4911-8136-326EEBE64786%7D&file=Review%20Log.xlsx&action=default&mobileredirect=true&isSPOFile=1" target="_blank">Review log</a>.';
			} else if (counts.dine > 0 && counts.automation === 0 && counts.rtl === 0 && counts.manual === 0) {
				instructions = 'Please send the file to Rejected with the parser (no need to add to any log). Close the PDF first.';
			} else if (counts.rtl > 0 && counts.automation === 0 && counts.dine === 0 && counts.manual === 0) {
				instructions = 'Please send the file to Manual with the parser (no need to add to any log). Close the PDF first.';
			} else if (counts.manual > 0 && counts.automation === 0 && counts.dine === 0 && counts.rtl === 0) {
				instructions = 'Please send the file to Manual with the parser (no need to add to any log). Close the PDF first.';
			} else if (counts.automation > 0 && (counts.dine > 0 || counts.rtl > 0) && counts.manual === 0) {
				instructions = 'Please add the file to the <a href="https://042gc.sharepoint.com/:x:/r/sites/TemplateQCTeams/_layouts/15/Doc.aspx?sourcedoc=%7BC31D2EAA-7716-4911-8136-326EEBE64786%7D&file=Review%20Log.xlsx&action=default&mobileredirect=true&isSPOFile=1" target="_blank">Review Log</a>.';
			} else if (counts.automation > 0 && counts.manual > 0) {
				instructions = 'Please add the file to the <a href="https://042gc.sharepoint.com/:x:/r/sites/TemplateQCTeams/_layouts/15/Doc.aspx?sourcedoc=%7BC31D2EAA-7716-4911-8136-326EEBE64786%7D&file=Review%20Log.xlsx&action=default&mobileredirect=true&isSPOFile=1" target="_blank">Review log</a> and to the <a href="https://042gc.sharepoint.com/:x:/r/sites/TemplateQCTeams/_layouts/15/Doc.aspx?sourcedoc=%7BD74A1724-574A-4164-8475-F69449BA732F%7D&file=Files%20for%20Manual%20Team.xlsx&action=default" target="_blank">Manual Log</a>.';
			} else if ((counts.dine > 0 && counts.rtl > 0) || (counts.dine > 0 && counts.manual > 0) || (counts.rtl > 0 && counts.manual > 0) || (counts.dine > 0 && counts.rtl > 0 && counts.manual > 0)) {
				instructions = 'Please send the file to Manual with the parser (no need to add to any log). Close the PDF first.';
			}

			document.getElementById('instructionDisplay').innerHTML = instructions;
		}


        function startOver() {
            document.getElementById('pageNumber').value = '1';
            document.getElementById('finalText').value = 'Automation: \nDINE: \nRTL: \nManual: \nTBD: \n\nPivot:';
            document.getElementById('recordDisplay').innerText = '';
            document.getElementById('instructionDisplay').innerText = '';
            historyStack = []; // Clear history on start over
        }

	function adjustTextArea(textarea) {
            textarea.style.height = ""; // Reset the height
            textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight) + "px";
        }

        function undoLastAction() {
            if (historyStack.length > 0) {
                const previousState = historyStack.pop();
                document.getElementById('finalText').value = previousState;
                // Optionally decrement the page number
                const pageInput = document.getElementById('pageNumber');
                let currentPage = parseInt(pageInput.value);
                pageInput.value = Math.max(1, currentPage - 1);
            }
        }
