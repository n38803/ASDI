
	
	
	//ajax parse
		$.ajax({
   			url      : "xhr/data.json",
			type     : "GET",
 			dataType : "json",
   			success  : function(data, status) {
    			console.log(status, data);
   			}
		});
	
console.log(data);