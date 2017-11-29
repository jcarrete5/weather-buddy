$(document).ready(function() {
	var weatherData;
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has("wuQuery") && urlParams.get("wuQuery") !== "") {
		$.get(apiUrl+"/conditions"+urlParams.get("wuQuery")+".json", null, function(data, textStatus, jqXHR) {
			console.log("weather information status: "+textStatus);
			console.log(data);
			weatherData = data;
		});
	} else {
		getLocation(function(loc) {
			$.get(apiUrl+"/conditions"+loc.location.l+".json", null, function(data, textStatus, jqXHR) {
				console.log("weather information status: "+textStatus);
				console.log(data);
				weatherData = data;
			});
		});
	}
});
