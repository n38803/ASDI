// Shaun Thompson
// ASDI 1307

// DOM CHECK
$(document).on('pageinit', function(){
	
	//ajax parse
/*	$(function(){
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
*/




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
		return;
	};	
	
	// DISPLAY ITEM
	$("#display").on("click", function(){
		if(localStorage.length === 0){
			alert("There is no information to display. Please select a file for auto-population.");
			console.log(localStorage.length);
		}
		else{
			$('#list').append('<ul></ul>');
			
			for(var i=0, len=localStorage.length; i<len;i++){
				var key = localStorage.key(i);
				$('#list').append('<li>' + localStorage[key] + '</li>');
			
			};
		};
	});	






	
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
		};
	});

	
	
	
	
	
	
	// edit item
	
	
	
	
});

// Create, Read, Delete first --- work on Edit last.
// AJAX Call - Copy & Paste (from FS) -- pick 2 formats (json & xml?)
// should just be a button that is clicked and pulls in the above information