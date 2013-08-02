// Shaun Thompson
// ASDI 1307



// HOME - INITIAL LOAD
$(document).on('pageinit', '#home', function(){
	console.log("DOM Ready!");

//	$.ajax({
//		"url" 		: "_view/entries",
//		"dataType"	: "json",

	$.couch.db("asdproject").view("healthylife/entries", {
			"success"	: function(data){
			console.log(data);
			$('#homeItems').empty();
			$.each(data.rows, function(index, value) {
				var item = (value.value || value.doc);
					$('#homeItems').append(
						$('<li>').append(
							$('<a>')
								.attr("href", "program.html?name=" + item.name)
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

var urlVars = function(urlData){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[0].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	console.log(urlValues);
	return urlValues;
};




// INDIVIDUAL ITEM WRITE - 
$(document).on('pageinit', '#program', function(){
	console.log("Entries DOM Ready!");
	var program = urlVars()["name"];
	console.log(name);
	
	// TEST
$('#edit').on("click", function(){
	$.couch.db("asdproject").openDoc("entry10"), {
	    success: function(data) {
	        console.log(data);
	    },
	    error: function(status) {
	        console.log(status);
	    }
	}
});





});





// FORM - Submit Data
$(document).on('pageinit', '#form', function(){
	console.log("Form DOM Ready!");
	
	 $("#submitMeal").on("click", function() {
        var doc = {};
        doc._id = $("input#name").val();
        doc.name = $("input#name").val();
        doc.date = $("input#date").val();
        doc.calories = $("input#calories").val();
        $.couch.db("asdproject").saveDoc(doc, {
                success: function() {
                    $.mobile.changePage( "#home", "slidedown", true, true );
                    $("#homeItems").listview('refresh');
                    
                },
                error: function() {
                    alert( "Cannot save new document." );
                }
        });
        return false;
    });

	


});