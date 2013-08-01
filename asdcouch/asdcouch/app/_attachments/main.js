// Shaun Thompson
// ASDI 1307


// DOM CHECK
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
								.attr("href", "program.html?entry=" + item)
								.text(item.name)
						)
					);
			});
			$('#homeItems').listview('refresh');
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

$(document).on('pageinit', '#program', function(){
	console.log("Entries DOM Ready!");
	var program = urlVars();
	console.log(program);
	var urlData = $(this).data("url");




});