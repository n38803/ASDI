// Shaun Thompson
// ASDI 1307

// DOM CHECK
$(document).on('pageinit', function(){
//all actual code goes here



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


	
	
	
	
	
	
	//ajax parse
	$(function(){
		$.ajax({
   			url      : "xhr/json.php",
			type     : "GET",
 			dataType : "json",
   			success  : function(data, status) {
    			console.log(status, data);
   			},
   			error : function(error, parseerror){
   				console.log("Error: " + error + "\nParse Error: " + parseerror);
   			}
   		});
	});
	
	
	
	
	
	// DISPLAY ITEM

	var value = [1, 2, 3, 4, 5];
	
	$("#display").on("click", function(){
	
	
		$('#list').append('<ul></ul>');
		
		for(i=0;i<value.length;i++) {
			
			$('#list ul').append('<li>' + value[i] + '</li>');
			}
			
		console.log("Before: " + localStorage.length);
	
		console.log(localStorage);
		
		console.log("After: " + localStorage.length);
	});	





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
	
	var saveMeal = function(){
		var id 				= Math.floor(Math.random()*1000000001);
		var meals			= {};
			meals.name		= $('#name').val();
			meals.date		= $('#date').val();
			meals.type		= $('#type').val();
			meals.calories	= $('#calories').val();
		
		localStorage.setItem(id, JSON.stringify(meals));

				alert("Meal Saved!");
	};	
	
	$("#submitMeal").click(saveMeal);

	//  submit item original event handler 
	/*  		
		var saveMeal = function(){
		
			var newMeal = {};

 			newMeal.name = $('name').value;
  			newMeal.date = $('date').value;
  			newMeal.type = $('type').value;
  			newMeal.calories = $('calories').value;
  

		location.href="#home";
		$('list').innerHTML = "";
	
		console.log("Save function completed.");  
		console.log(newMeal);

	};

	var save = document.querySelector("#submitMeal");
	save.addEventListener("click", saveMeal);
*/

	
	
	
	
	
	
	
	
	
	
	
	
	// CLEAR STORAGE
	var clearMeals = function(){
		if(localStorage.length===0){
			alert("Already Cleared!")
		}
		else{
			localStorage.clear();
  	
			console.log("Clear function completed.");
		};
	};

	$("#clear").click(clearMeals);
	
	
	
	
	
	
	
	
	
	// edit item
	
	
	
	
});

// Create, Read, Delete first --- work on Edit last.
// AJAX Call - Copy & Paste (from FS) -- pick 2 formats (json & xml?)
// should just be a button that is clicked and pulls in the above information