$(document).ready(function() {
	getLocation(function(loc) {
		$.get(apiUrl+"/conditions"+loc.location.l+".json", null, function(data, textStatus, jqXHR) {
			console.log("weather information status: "+textStatus);
			console.log(data);
		});
	});
});
