$(document).ready(function() {
	function updatePage(weatherData) {
		// Update webpage to show relevant weather information
		$("#weatherIcon")
			.attr("src", weatherData.icon_url)
			.attr("alt", "weather: "+weatherData.icon);
	}

	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has("wuQuery") && urlParams.get("wuQuery") !== "") {
		$.get(apiUrl+"/conditions"+urlParams.get("wuQuery")+".json", null, function(data, textStatus, jqXHR) {
			console.log("weather information status: "+textStatus);
			console.log(data);
			updatePage(data.current_observation);
		});
	} else {
		getLocation(function(loc) {
			$.get(apiUrl+"/conditions"+loc.location.l+".json", null, function(data, textStatus, jqXHR) {
				console.log("weather information status: "+textStatus);
				console.log(data);
				updatePage(data.current_observation);
			});
		});
	}
});
