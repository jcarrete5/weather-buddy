$(document).ready(function() {
	function updatePage(weatherData) {
		// Update webpage to show relevant weather information
		$("#weatherLocation")
			.html(weatherData.display_location.full);
		$("#weatherIcon")
			.attr("src", weatherData.icon_url)
			.attr("alt", "weather: "+weatherData.weather);
		$("#weatherConditions")
			.append($("<li></li>")
				.html("Temperature: "+weatherData.temperature_string))
			.append($("<li></li>")
				.html("Feels like "+weatherData.feelslike_string))
			.append($("<li></li>")
				.html("Dewpoint: "+weatherData.dewpoint_string))
			.append($("<li></li>")
				.html("Humidity: "+weatherData.relative_humidity))
			.append($("<li></li>")
				.html("Wind: "+weatherData.wind_string))
			.append($("<li></li>")
				.html("Wind Chill: "+weatherData.windchill_string))
			.append($("<li></li>")
				.html(weatherData.observation_time));

		// Give inner div appearence of being raised
		$("#inner").css("box-shadow", "1px 1px 5px #62757f");
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
