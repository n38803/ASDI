function (doc) { 
	if (doc._id.substr(0, 5) === "entry") {
		emit(doc._id.substr(5), {
			"name": doc.name,
			"date": doc.date,
			"calories": doc.calories		
		});
	}
	else if (doc._id === doc.name) {
		emit(doc._id, {
			"name": doc.name,
			"date": doc.date,
			"calories": doc.calories
		});
	}	
};