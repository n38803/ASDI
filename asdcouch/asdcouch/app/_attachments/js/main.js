$(document).ready(function() {
	console.log('DOM IS READY!');
	
	$.ajax({
		"url" 		: "_view/entries",
		"dataType"	: "json",
		"success"	: function(data){
			console.log(data);
			$.each(data.rows, function(index, program) {
				var name = program.value.name;
				var date = program.value.date;
				var calories = program.value.calories;
				$('#entrylist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(title)
						)
					);
			});
			$('#entrylist').listview('refresh');
		}
	});
		
});