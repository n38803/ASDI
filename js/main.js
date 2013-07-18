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


console.log(localStorage);
console.log(localStorage.length);


	// PREDEFINED VARIABLE IN LOCAL STORAGE
	
	/*	var meals = {
		name: "Orange",
		date: "2013-05-21",
		type: "Dinner",
		calories: "120"
	};
	
	localStorage.setItem("meals", JSON.stringify(meals));
*/	
	
	
	
	
	//Auto Populate from JSON
	function jsonFill(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};	
	
	//Auto Populate from XML
	function xmlFill(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};		

	//Auto Populate from CSV
	function csvFill(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};	
	









	//	var viewstorage = localStorage.getItem("meals");
	//	meals = JSON.parse(viewstorage); //var test is now re-loaded!


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// DISPLAY ITEM
	$('div#list').append('<ul></ul>');
	
	var showMeals = function(){
	
		console.log("Before: " + localStorage.length);
	
		if(localStorage.length>0){
			for(i=0,len=localStorage.length; i<len;i++) {
				$('div#display ul').append('<li>' + localStorage[i] + '</li>');
		
				console.log(localStorage[i]);
				console.log("After: " + localStorage.length);
		
			};
		}
		else{
			var warning = prompt("No Data to Display - Which type of data would you like to auto-populate? Please select one of the following (case sensitive): XML | JSON | CSV");
			if(warning == "JSON" || warning == "json"){
				console.log("JSON Auto-Fill Initiated.");
				jsonFill()
			}
			else if(warning == "CSV" || warning == "csv"){
				console.log("CSV Auto-Fill Initiated");
				csvFill()
			}
			else if(warning == "XML" || warning == "xml"){
				console.log("XML Auto-Fill Initiated.");
				xmlFill()
			}
			else{
				console.log("Error: You have made an invalid selection.");
				alert("You have made an invalid selection. Please try again.");
			};
			
		};
	};	

	$("#display").on("click", showMeals);





	// PARSE LOCAL STORAGE
/*	function getData(){
		if(localStorage.length === 0){
			alert("There are no meals currently tracked so default information has been loaded.");
			autoFill();
		};
		

		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		
		document.body.appendChild(makeDiv);
		
		$('items').style.display = "block";
		
		
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//Convert the string from local storage
			var obj = JSON.parse(value);
			var makeSublist = document.createElement('ul');
			makeli.appendChild(makeSublist);
			

			
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSublist.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;		
				makeSublist.appendChild(linksLi);
			};
			//Create our edit & delete buttons for local storage
			makeItemLinks(localStorage.key(i), linksLi);
		};
	};	*/
	
	
	
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
	
	
	
	
	
	
	








	// SUBMIT TO LOCAL STORAGE
	var saveMeal = function(key){
		//if there is no key, this is a brand new item & we need a new key
		if(!(key)){
			var id				= Math.floor(Math.random()*1000000001);
		}else{
			//set the id to the existing key that we're editing in order to rewrite local storage
			id = key;
		}
		
		var meals			= {};
			meals.name		= $('#name').value();
			meals.date		= $('#date').value();
			meals.type		= $('#type').value();
			meals.calories	= $('#calories').value();
		
		localStorage.setItem(id, JSON.stringify(meals));
		alert("Meal Saved!");	
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
		if(localStorage.length==0){
			alert("Already Cleared!")
		}
		else{
			localStorage.clear();
  	
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