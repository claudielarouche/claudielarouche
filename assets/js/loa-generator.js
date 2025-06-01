    // Declare variables at the beginning of the script
    let userName, ministerName, departmentName, departmentAddress, linguisticProfile, clearance, startDate, endDate, level, depCode, orgCode, refCode, hostContactName, hostContactPhone,hostContactEmail, finContactName, finContactPhone, finContactEmail, signatoryTitle, hostContactPosition, finContactPosition;
	
	// Declare an array to store main tasks
	let mainTasks = [];
	let supportingTasks = [];

	
    async function generateAgreement() {
        const userNameInput = document.getElementById("personName");
        const ministerNameInput = document.getElementById("ministerName");
        const departmentNameInput = document.getElementById("departmentName");
        const departmentAddressInput = document.getElementById("departmentAddress");
		const linguisticProfileInput = document.getElementById("linguisticProfile");
		const clearanceInput = document.getElementById("clearance");
		const startDateInput = document.getElementById("startDate");
		const endDateInput = document.getElementById("endDate");
		const levelInput = document.getElementById("level");
		const depCodeInput = document.getElementById("depCode");
		const orgCodeInput = document.getElementById("orgCode");
		const refCodeInput = document.getElementById("refCode");
		const hostContactNameInput = document.getElementById("hostContactName");
		const hostContactEmailInput = document.getElementById("hostContactEmail");
		const finContactNameInput = document.getElementById("finContactName");
		const finContactEmailInput = document.getElementById("finContactEmail");
		const signatoryTitleInput = document.getElementById("signatoryTitle");
		const hostContactPositionInput = document.getElementById("hostContactPosition");
		const finContactPositionInput = document.getElementById("finContactPosition");
		const mainTasksInput = document.getElementById("mainTasks");
		const supportingTasksInput = document.getElementById("supportingTasks");
		
		 // Update the variables with input values
        userName = userNameInput.value.trim() || "";
        ministerName = ministerNameInput.value.trim() || "";
        departmentName = departmentNameInput.value.trim() || "";
        departmentAddress = departmentAddressInput.value.trim() || "";
        linguisticProfile = linguisticProfileInput.value.trim() || "";
        clearance = clearanceInput.value.trim() || "";
        startDate = startDateInput.value.trim() || "";
        endDate = endDateInput.value.trim() || "";
        level = levelInput.value.trim() || "";
		depCode = depCodeInput.value.trim() || "";		
		orgCode = orgCodeInput.value.trim() || "";
		refCode = refCodeInput.value.trim() || "";
		hostContactName = hostContactNameInput.value.trim() || "";
		hostContactEmail = hostContactEmailInput.value.trim() || "";
		finContactName = finContactNameInput.value.trim() || "";
		finContactEmail = finContactEmailInput.value.trim() || "";
		signatoryTitle = signatoryTitleInput.value.trim() || "";
		hostContactPosition = hostContactPositionInput.value.trim() || "";
		finContactPosition = finContactPositionInput.value.trim() || "";
		mainTasks = mainTasksInput.value.trim().split('\n').map(task => task.trim());
		supportingTasks = supportingTasksInput.value.trim().split('\n').map(supportingTask => supportingTask.trim());


        
		
        document.getElementById('ministerNameDisplay').innerText = ministerName;
		document.getElementById('minister2Display').innerText = ministerName;
        document.getElementById('personNameDisplay').innerText = userName;
        document.getElementById('departmentNameDisplay').innerText = departmentName;
		document.getElementById('department2Display').innerText = departmentName;
		document.getElementById('department3Display').innerText = departmentName;
        document.getElementById('addressDisplay').innerText = departmentAddress;
		document.getElementById('linguisticProfileDisplay').innerText = linguisticProfile;		
		document.getElementById('clearanceDisplay').innerText = clearance;
		document.getElementById('startDateDisplay').innerText = startDate;
		document.getElementById('endDateDisplay').innerText = endDate;
		document.getElementById('endDateDisplay2').innerText = endDate;
		document.getElementById('levelDisplay').innerText = level;
		document.getElementById('depCodeDisplay').innerText = depCode;
		document.getElementById('orgCodeDisplay').innerText = orgCode;
		document.getElementById('refCodeDisplay').innerText = refCode;
		document.getElementById('hostContactNameDisplay').innerText = hostContactName;
		document.getElementById('hostContactEmailDisplay').innerText = hostContactEmail;
		document.getElementById('finContactNameDisplay').innerText = finContactName;
		document.getElementById('finContactEmailDisplay').innerText = finContactEmail;
		document.getElementById('signatoryTitleDisplay').innerText = signatoryTitle;
		document.getElementById('hostContactPositionDisplay').innerText = hostContactPosition;
		document.getElementById('finContactPositionDisplay').innerText = finContactPosition;
		
		// Update the display of main tasks
		updateMainTasksDisplay();
		updateSupportingTasksDisplay();
		updateBilingualBonusDisplay();



        // Show the letter content
        document.getElementById('letterContent').style.display = 'block';
    }
	function updateMainTasksDisplay() {
    // Get the element where you want to display the main tasks
    const mainTasksDisplay = document.getElementById('mainTasksDisplay');

    // Clear the existing content
    mainTasksDisplay.innerHTML = '';

    // Check if there are tasks to display
    if (mainTasks.length > 0) {
        // Create an unordered list element
        const ul = document.createElement('ul');

        // Populate the list with tasks
        mainTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            ul.appendChild(li);
        });

        // Append the list to the display element
        mainTasksDisplay.appendChild(ul);
    } 
}

function updateSupportingTasksDisplay() {
    // Get the element where you want to display the supporting tasks
    const supportingTasksDisplay = document.getElementById('supportingTasksDisplay');

    // Clear the existing content
    supportingTasksDisplay.innerHTML = '';

    // Check if there are tasks to display
    if (supportingTasks != "") {
        // Create an unordered list element
        const ul = document.createElement('ul');

        // Populate the list with tasks
        supportingTasks.forEach(supportingTask => {
            const li = document.createElement('li');
            li.textContent = supportingTask;
            ul.appendChild(li);
        });

        // Append the list to the display element
        supportingTasksDisplay.appendChild(ul);

        // Show the supporting tasks paragraph
        document.getElementById('supportingTasksParagraph').style.display = 'block';
    } else {
       
        // Hide the supporting tasks paragraph if there are no tasks
        document.getElementById('supportingTasksParagraph').style.display = 'none';
    }
}

function updateBilingualBonusDisplay() {
    // Get the checkbox element
    //const bilingualBonusCheckbox = document.getElementById('bilingualBonusCheckbox');
	const bilingualBonusValue = document.getElementById('bilingualBonusDropdown').value;
	
	const bilingualBonusDisplay1 = document.getElementById('bilingualBonusDisplay1');
	const bilingualBonusDisplay2 = document.getElementById('bilingualBonusDisplay2');

    // Get the element where you want to display the bilingual bonus
    //const bilingualBonusDisplay = document.getElementById('bilingualBonusDisplay');

    if (bilingualBonusValue === 'Yes') {
        // Display the element if the checkbox is checked
        bilingualBonusDisplay1.style.display = 'inline';
		bilingualBonusDisplay2.style.display = 'inline';
    } else {
        // Hide the element if the checkbox is unchecked
        bilingualBonusDisplay1.style.display = 'none';
		bilingualBonusDisplay2.style.display = 'none';
    }
}




function saveFormData() {
    // Prompt the user for the file name
    const fileName = prompt('Enter the file name (without extension):');
    
    if (!fileName) {
        // If the user cancels or provides an empty name, exit the function
        return;
    }

    // Get all input elements in the form
    const formElements = document.getElementById('agreementForm').elements;

    // Create an object to store form data
    const formData = {};

    // Iterate through form elements and save their values
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        // Exclude buttons and file input from saving
        if (element.type !== 'button' && element.type !== 'file') {
            if (element.type === 'checkbox') {
                // Save the state of the checkbox as a boolean
                formData[element.name] = element.checked;
            } else {
                formData[element.name] = element.value;
            }
        }
    }

    // Convert the object to JSON
    const jsonData = JSON.stringify(formData);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a link to download the file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    
    // Append the file extension to the user-provided file name
    a.download = `${fileName}.json`;

    // Append the link to the document and trigger the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


function loadFormData() {
    // Create an input element of type file
    const input = document.createElement('input');
    input.type = 'file';

    // Trigger a click event on the input
    input.click();

    // Listen for the change event on the input
    input.addEventListener('change', function () {
        const file = input.files[0];

        if (file) {
            // Create a FileReader to read the contents of the file
            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    // Parse the JSON data
                    const jsonData = JSON.parse(e.target.result);

                    // Get all input elements in the form
                    const formElements = document.getElementById('agreementForm').elements;

                    // Iterate through form elements and set their values
                    for (let i = 0; i < formElements.length; i++) {
						
                        const element = formElements[i];

                        // Check if the element's name exists in the loaded data
                        if (jsonData.hasOwnProperty(element.name)) {
                            if (element.type === 'checkbox') {
                                // Set the checked state of the checkbox
                                element.checked = jsonData[element.name];
                                // Call the update function for checkboxes (if any)
                                if (element.name === 'bilingualBonusCheckbox') {
                                    updateBilingualBonusDisplay();
                                }
                            } else if (element.type === 'radio') {
                                // Set the checked state of radio buttons
                                element.checked = element.value === jsonData[element.name];
                            } else {
                                // Set the value of the element
								
                                element.value = jsonData[element.name];
								

                            }
                        }
                    }

                    alert('Form data loaded successfully!');
                } catch (error) {
                    console.error(error);
                    alert('Error loading form data. Please make sure the file is valid JSON.');
                }
            };

            // Read the contents of the file as text
            reader.readAsText(file);
        }
    });
}