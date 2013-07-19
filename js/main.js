// Shaun Thompson
// ASDI 1307

// DOM CHECK
$(document).on('pageinit', function(){
	

	
	
	
	// DISPLAY ITEM
	$('#display').on("click", function(){
		if(localStorage.length === 0){
			alert("There is no information to display. Please select a file for auto-population.");
			console.log("Items in Storage: " + localStorage.length);
		}
		else{
			$('#list').append('<ul></ul>');
			
			for(var i=0;i<localStorage.length;i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			$('#list').append('<ul>' + obj.name + '</ul>');
			$('#list ul').append('<li>Date: ' + obj.date + '</li>');
			$('#list ul').append('<li>Calories: ' + obj.calories + '</li>');
			
			
		};	
			
		}; 

	});	



	// SUBMIT TO LOCAL STORAGE
	$('#submitMeal').on("click", storeData(this.key));
	function storeData(key){
		if(!(key)){
			var id			= Math.floor(Math.random()*1000000001);
		}else{
			id = key;
		}
		var meals			= {};
			meals.name		= $('#name').val();
			meals.date		= $('#date').val();
			meals.calories	= $('#calories').val();
		
		localStorage.setItem(id, JSON.stringify(meals));
		
		//localStorage.meals = JSON.stringify(meals);

		alert("Meal Saved!");
	};	
	

	
	// CLEAR STORAGE
	$('#clear').on("click", function(){
		if(localStorage.length === 0){
			alert("Already Cleared!");
			return;
		}
		else{
			localStorage.clear();
  			alert("All Data Cleared.");
			console.log("Clear function completed.");
			
			$('#list ul').remove();
		};
	});

	


	// JSON ajax parse
	$('#json').on("click", function(){
	
		$(function(){
			$.ajax({
   				url      : "xhr/data.json",
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
	});	
	
	// XML ajax parse
	$('#xml').on("click", function(){
	
		$(function(){
			$.ajax({
   				url      : "xhr/data.xml",
				type     : "GET",
 				dataType : "xml",
   				success  : function(data, status) {
    				console.log(status, data);
   				},
   				error : function(error, parseerror){
   					console.log("Error: " + error + "\nParse Error: " + parseerror);
   				}
   			});
		});
	});	
	
		// CSV ajax parse
	$('#csv').on("click", function(){
	
		$(function(){
			$.ajax({
   				url      : "xhr/data.csv",
				type     : "GET",
 				dataType : "csv",
   				success  : function(data, status) {
    				console.log(status, data);
   				},
   				error : function(error, parseerror){
   					console.log("Error: " + error + "\nParse Error: " + parseerror);
   				}
   			});
		});
	});	
	
	
	
	
	// edit item
	
/*	function editItem() {
		var value = localStorage.getItem(this.key);	
		var item = JSON.parse(value);
		
		//show form again
		toggleControls("off");
		
		//populate form field with current localstorage
		$('date').value = item.date[1];
		$('type').value = item.type[1];
		var radios = document.forms[0].group;
		for (var i=0, j = radios.length; i < j; i++){
			if (radios[i].value == "Meat" && item.group[1] == "Meat"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Vegetable" && item.group[1] == "Vegetable"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Fruit" && item.group[1] == "Fruit"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Grain" && item.group[1] == "Grain"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Dairy" && item.group[1] == "Dairy"){
				radios[i].setAttribute("checked", "checked");
			};		
		};
		$('name').value = item.name[1];
		$('calories').value = item.calories[1];
		$('notes').value = item.notes[1];
		
		//remove initial listener from input save contact button
		save.removeEventListener("click", storeData);
		//change submit button to edit button
		$('submit').value = "Edit Meal Entry";
		var editSubmit = $('submit');
		//save key value established in this function as property of editsubmit
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		

	};*/	
	
	
});

// Create, Read, Delete first --- work on Edit last.
// AJAX Call - Copy & Paste (from FS) -- pick 2 formats (json & xml?)
// should just be a button that is clicked and pulls in the above information