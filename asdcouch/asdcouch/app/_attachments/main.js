// Shaun Thompson
// ASDI 1307

// DOM CHECK
$(document).on('pageinit', function(){
	console.log("DOM Ready!");

	
	
	
	// DISPLAY ITEM
	$('#display').on("click", function(){
		
		$.ajax({
			"url" 		: "_view/entries",
			"dataType"	: "json",
			"success"	: function(data){
				console.log(data);
				$.each(data.rows, function(index, program) {
					var name = program.value.name;
					var date = program.value.date;
					var calories = program.value.calories;
					$('#list').append('<ul></ul>');
					$('#list ul').append('<li>' + name + '</li>');
					$('#list ul').append('<li>' + date + '</li>');
					$('#list ul').append('<li>' + calories + '</li>');
				});
			}
			
		});   
		
	});	


	// STORE ITEM
	
	$('#submitMeal').on("click", function(){
	
		alert("This function is currently unavailable.");
	
	});

	
	// CLEAR STORAGE
	$('#clear').on("click", function(){

		$('#list ul').remove();

	});	


	// JSON ajax parse
	$('#json').on("click", function(){
		
		alert("This function is currently unavailable.");
  		
	});	


	
	// XML ajax parse
	$('#xml').on("click", function(){

		alert("This function is currently unavailable.");

	});	

	
	// CSV ajax parse
	$('#csv').on("click", function(){
	
		alert("This function is currently unavailable.");
	
	});
	
	
	
	
	
});