// HOME - INITIAL LOAD
$(document).on('pageinit', '#home', function(){
	$('#homeItems').empty();	
	$.couch.db("asdproject").view("healthylife/entries", {
			"success"	: function(data){
			console.log(data);
			
			$.each(data.rows, function(index, value) {
				var item = (value.value || value.doc);
	
					$('#homeItems').append(
						$('<li>').append(
							$('<a>')
								.attr("href", "program.html?entry=" + item.name)
								.text(item.name).append(
									$('<br>Date: ' + item.date + '</br>')
								)
						)
					);
			});
			$("#homeItems").listview('refresh');
		} 

	});	
});


// LOAD INDIVIDUAL ENTRY
$(document).on("pageinit", '#entry', function(){
	$('#details').empty();
	
	
	var urlData = $(this).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	console.log("Url value: ");
	console.log(urlValues);
	
	var entryKey = urlValues["entry"];
	
	console.log("Key: " + entryKey);
	
	// OPEN DOCUMENT
	$.couch.db("asdproject").openDoc(entryKey, {
		"success"	: function(data){
			console.log("This is the data");
			console.log(data);

			// DISPLAYS ITEMS			
			$('#details').append('<h3>' + data.name + '</h3>' 
				+ '<li>Entry Date: ' + data.date 
				+ '</li><li>Entry Calories: ' + data.calories + '</li>');
				console.log("Revision: " + data._rev);
				
			// DELETE ITEM	
			$('#delete').on("click", function(){
				var remove = confirm('Are you sure you wish to delete Entry [' + data.name + ']?');
					if (remove === true) {
						$.couch.db("asdproject").removeDoc({_id: data._id, _rev: data._rev});
						alert('Entry Deleted.');
						$.mobile.changePage( "entries.html#home", { transition: "slideup", changeHash: false });
					}
					else {
						alert('Delete Function Aborted.');
					};
			});
	
			
			// EDIT ITEM	
			$('#edit').on("click", function(){
			$.mobile.changePage("entries.html#form");
			$('#name').replaceWith(data.name);
			$('#date').replaceWith(data.date);
			$('#calories').replaceWith(data.calories);
			$('#submitMeal').on("click", function(){
				$.couch.db("asdproject").saveDoc(entryKey, {
					"success": function(data){
						alert("Data Successfully Updated.");
					 	$("#homeItems").listview('refresh');
                    location.reload();
                    alert('Data Saved.');	
					},
					"error": function(){
						alert("Could not update data.");
					}
				});
			});



			});
			
			
			
						
		}
		
	});
                 
                  
              

});



// FORM - SAVE DATA
$(document).on('pageinit', '#form', function(){
	console.log("Form DOM Ready!");
	
	 $("#submitMeal").on("click", function() {
        var doc = {};
        doc._id = $("#name").val();
        doc.name = $("#name").val();
        doc.date = $("#date").val();
        doc.calories = $("#calories").val();
        $.couch.db("asdproject").saveDoc(doc, {
                success: function() {
                    $.mobile.changePage("entries.html#home");
                    $("#homeItems").listview('refresh');
                    location.reload();
                    alert('Data Saved.');
                    
                },
                error: function() {
                    alert( "Cannot save new document." );
                }
        });
        return false;
    });

	


});