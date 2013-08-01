// Shaun Thompson
// ASDI 1307

// DOM CHECK
$(document).on('pageinit', '#home', function(){
	console.log("DOM Ready!");
	$.couch.db("asdproject").view("healhylife/entries", {
		success: function(data) {
			console.log(data);
		}
	});
});