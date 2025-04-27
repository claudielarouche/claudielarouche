---
title: City of Ottawa Library Programs
description: A tool to browse and filter all public library events in Ottawa
image: https://claudielarouche.com/assets/img/library.jpg
tags: [Ottawa]
layout: dev
js:
  - https://code.jquery.com/jquery-3.6.0.min.js
  - https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js
  - https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js
  - https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js
  - /assets/js/library.js
css: 
  - https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css
  - https://fonts.googleapis.com/icon?family=Material+Icons

---

<div class="bg-image"></div>
		<div class="container">
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
	  <a class="navbar-brand" href="https://claudielarouche.com">Claudie's other projects</a>
	  

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">
	      <!-- Add any additional menu items here if needed -->
	    </ul>
	  </div>
	</nav>
			
			<h1>Ottawa Library Programs</h1>

			<div class="row">
    <div class="col-md-6">
        <div class="mt-3">
            <a href="#csvData" class="btn btn-primary">
                Go to listing
            </a>
        </div>
        <div class="mt-3">
            <a href="#filter" class="btn btn-primary" >
                Go to filters
            </a>
        </div>

	    <div class="mt-3">
	            <a href="#" class="btn btn-primary" id="showToday" >
	                Show me today's programs
	            </a>
	    </div>
	    
	    <div class="mt-3">
            <a href="#newsletter" class="btn btn-warning" >
                Sign-up for updates
            </a>
		    
        </div>
	    
	    <div class="mt-3">
            <a href="https://forms.gle/7YHFbimGH4p5imQD8" class="btn btn-primary" target="_blank">
                Contact me
            </a>
        </div>
	     </div>
				<div class="col-md-6">
        <i>If you see me at the library, please say hi!</i>
        <img src="assets/img/claudie.png" alt="Claudie's Picture" class="img-fluid">
    </div>
				 </div>
			
<h2 id="filter">Filters</h2>
			<p>Please note that you can also use the "search" box directly on the data table to filter the data.</p>
			<form class="form">

				<div class="form-group row">
					<label for="selectedDate" class="col-sm-2 col-form-label">Select Date: </label>
					<div class="col-sm-10">
						<input type="date" id="selectedDate" class="form-control col-sm-2">
					</div>
				</div>

				<div class="form-group row">
					<label for="selectedArea" class="col-sm-2 col-form-label">Select Area(s):</label>
					<div class="col-sm-10">
						<div class="checkbox">
							<label><input type="checkbox" id="centralCheckbox" class="areaCheckbox" value="Central" checked=""> Central</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="eastCheckbox" class="areaCheckbox" value="East" checked=""> East</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="southCheckbox" class="areaCheckbox" value="South" checked=""> South</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="westCheckbox" class="areaCheckbox" value="West" checked=""> West</label>
						</div>
					</div>
				</div>

				<div class="form-group row">
				    <label for="selectedAudience" class="col-sm-2 col-form-label">Select Audience(s):</label>
				    <div class="col-sm-10">
				        <div class="checkbox">
				            <label><input type="checkbox" id="babyCheckbox" class="audienceCheckbox" value="Baby" checked=""> Baby</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="toddlerCheckbox" class="audienceCheckbox" value="Toddler" checked=""> Toddler</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="preschoolCheckbox" class="audienceCheckbox" value="Preschool" checked=""> Preschool</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="childCheckbox" class="audienceCheckbox" value="Child" checked=""> Child</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="teenCheckbox" class="audienceCheckbox" value="Teen" checked=""> Teen</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="familyCheckbox" class="audienceCheckbox" value="Family" checked=""> Family</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="adultCheckbox" class="audienceCheckbox" value="Adult" checked=""> Adult</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="50plusCheckbox" class="audienceCheckbox" value="50-plus" checked=""> 50-plus</label>
				        </div>
				        <div class="checkbox">
				            <label><input type="checkbox" id="newcomersCheckbox" class="audienceCheckbox" value="Newcomers" checked=""> Newcomers</label>
				        </div>
				    </div>
				</div>


			<!--	<div class="form-group row">
					<label for="selectedDay" class="col-sm-2 col-form-label">Select Days of the week:</label>
					<div class="col-sm-10">

						
						<div class="checkbox">
					            <label><input type="checkbox" id="mondayCheckbox" class="dayCheckbox" value="Monday" checked=""> Monday</label>
					        </div>
						<div class="checkbox">
					            <label><input type="checkbox" id="tuesdayCheckbox" class="dayCheckbox" value="Tuesday" checked=""> Tuesday</label>
					        </div>
					        <div class="checkbox">
					            <label><input type="checkbox" id="wednesdayCheckbox" class="dayCheckbox" value="Wednesday" checked=""> Wednesday</label>
					        </div>
					        <div class="checkbox">
					            <label><input type="checkbox" id="thursdayCheckbox" class="dayCheckbox" value="Thursday" checked=""> Thursday</label>
					        </div>
					        <div class="checkbox">
					            <label><input type="checkbox" id="fridayCheckbox" class="dayCheckbox" value="Friday" checked=""> Friday</label>
					        </div>
					        <div class="checkbox">
					            <label><input type="checkbox" id="saturdayCheckbox" class="dayCheckbox" value="Saturday" checked=""> Saturday</label>
					        </div>
					        <div class="checkbox">
					            <label><input type="checkbox" id="sundayCheckbox" class="dayCheckbox" value="Sunday" checked=""> Sunday</label>
					        </div>
						
					</div>
					
				</div>-->

				
				
			</form>
			
			<div class="mt-3">
				<button class="btn btn-secondary" onclick="clearAllFilters()">
					Reset filters to default
				</button>
			</div>
			<div class="mt-3">
				<a href="#csvData" class="btn btn-primary">
					 View schedule
				</a>
			</div>

			<div class="alert alert-info mt-3" role="alert">
				<span class="material-icons" style="vertical-align: middle;">lightbulb</span>
				Please make sure to <strong>always click on the Program Name link</strong> to verify that the schedule on this web page is accurate. Please note that I am not informed of last minute cancellations.
			</div>
				
			<h2>Library Activities</h2>
			<p>Data last updated: 2025-04-20 (Data is updated approximately every Sunday)</p>
			
			<label>
			    <input type="checkbox" id="showTodayOnly" name="showTodayOnly">
			    Show Today Only
			</label>
			
			<div id="csvData"></div>
			
			

			
		
			

			
			<div id="footer">
    <a href="#" id="backToTop">Back to Top</a>
</div>
		</div>
		