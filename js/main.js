// Shaun Thompson
// ASDI 1307

/* this is for Web usage not MOBILE
$(document).ready(function(){
	$('#somelink').on("click", myFn);
});
*/

// Run DOM Check
$(document).on('pageinit', function(){
//all actual code goes here
	// predefined variables
	
	var meals = [
	{
		"name": "Chicken",
		"date": "07/31/2013",
		"type": "Dinner",
		"calories": "500"
	},
	{
		"name": "Rice",
		"date": "07/31/2013",
		"type": "Dinner",
		"calories": "150"
	},
	{
		"name": "Broccoli",
		"date": "07/31/2013",
		"type": "Dinner",
		"calories": "50"
	}

];
	
	// display items
	var showMeals = function(){
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


	// submit item

	// delete item
	
	var clearMeals = function(){
	if(flavors.length==0){
		alert("Already Cleared!")}
	else{
		  flavors.length = 0;
  	document.getElementById('list').innerHTML = "";
  	
	console.log("Clear function completed.");
		};
	};


	var clear = document.querySelector("#clear");
	clear.addEventListener("click", clearMeals);
	
	// edit item
	
	
	
	
});

// Create, Read, Delete first --- work on Edit last.
// AJAX Call - Copy & Paste (from FS) -- pick 2 formats (json & xml?)
// should just be a button that is clicked and pulls in the above information