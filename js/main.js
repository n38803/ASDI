// Shaun Thompson
// ASDI 1307

/* this is for Web usage not MOBILE
$(document).ready(function(){
	$('#somelink').on("click", myFn);
});
*/

// DOM CHECK
$(document).on('pageinit', function(){
//all actual code goes here


	// PREDEFINED VARIABLE IN LOCAL STORAGE
	var meals = {
		name: "Orange",
		date: "2013-05-21",
		type: "Dinner",
		calories: "120"
	};
	
	localStorage.setItem("meals", JSON.stringify(meals));

	
//	var viewstorage = localStorage.getItem("meals");
//	meals = JSON.parse(viewstorage); //var test is now re-loaded!


	// DISPLAY ITEM
	$('div#list').append('<ul></ul>');
	
	var showMeals = function(){
	
		console.log("Before: " + meals.length);
	
		if(meals.length>0){
			for(i=0;i<meals.length;i++) {
				$('div#display ul').append('<li>' + meals[i] + '</li>');
		
				console.log(meals[i]);
				console.log("After: " + meals.length);
		
			};
		}
		else{
			alert("No Data to Display");
			
		};
	};	

	$("#display").on("click", showMeals);

	
	// original display items
	/*	var showMeals = function(){
  	if(meals.length>0){
		for(var i=0, len=meals.length; i<len; i++){
    	var newLi = document.createElement('li');
    		
	document.getElementById('list').appendChild(newLi);
  
      var heading = document.createElement('h3');
          heading.innerHTML = meals[i].name;
          	newLi.appendChild(heading);
      var pDate = document.createElement('p');
          	pDate.innerHTML = meals[i].date;
          newLi.appendChild(pDate);
      var pType = document.createElement('p');
          pType.innerHTML = meals[i].type;
          	newLi.appendChild(pType);
		var pCal = document.createElement('p');
          pCal.innerHTML = meals[i].calories;
          	newLi.appendChild(pCal);
    
    console.log("Show function completed.");

  }
  	}
  	else{
  		alert("Nothing to show!");
  		};
  };

	var display = document.querySelector("#display");
	display.addEventListener("click", showMeals);
*/	
	
	
	
	
	
	
	







	// SUBMIT ITEM
	var saveMeal = function(){

  		var newMeal = {};

 			newMeal.name = document.getElementById('name').value;
  			newMeal.date = document.getElementById('date').value;
  			newMeal.type = document.getElementById('type').value;
  			newMeal.calories = document.getElementById('calories').value;
  

		location.href="#home";
		document.getElementById('list').innerHTML = "";
		meals.push(newMeal);
	
		console.log("Save function completed.");  
		console.log(newMeal);

	};
	$("#submitMeal").on("click", saveMeal);

	//  submit item original event handler 
	/*  		
		var saveMeal = function(){
		
			var newMeal = {};

 			newMeal.name = document.getElementById('name').value;
  			newMeal.date = document.getElementById('date').value;
  			newMeal.type = document.getElementById('type').value;
  			newMeal.calories = document.getElementById('calories').value;
  

		location.href="#home";
		document.getElementById('list').innerHTML = "";
	
		console.log("Save function completed.");  
		console.log(newMeal);

	};

	var save = document.querySelector("#submitMeal");
	save.addEventListener("click", saveMeal);
*/

	
	
	
	
	
	
	
	
	
	
	
	
	// DELETE ITEM
	var clearMeals = function(){
		if(meals.length==0){
			alert("Already Cleared!")
		}
		else{
			localStorage.clear();
			var clearMeals = meals.length;
  			document.getElementById('list').innerHTML = "";
  			meals.push(clearMeals);
  			
  	
			console.log("Clear function completed.");
		};
	};

	$("#clear").on("click", clearMeals);
	
	
	// original delete item
	/*	
	var clearMeals = function(){
		if(meals.length==0){
			alert("Already Cleared!")
		}
		else{
			meals.length = 0;
			var clearMeals = meals.length;
  			document.getElementById('list').innerHTML = "";
  			meals.push(clearMeals);
  			
  	
			console.log("Clear function completed.");
		};
	};


	var clear = document.querySelector("#clear");
	clear.addEventListener("click", clearMeals);
*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// edit item
	
	
	
	
});

// Create, Read, Delete first --- work on Edit last.
// AJAX Call - Copy & Paste (from FS) -- pick 2 formats (json & xml?)
// should just be a button that is clicked and pulls in the above information