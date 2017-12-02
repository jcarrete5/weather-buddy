$(document).ready(function() {
	function updatePage(weatherData) {
		var daily = weatherData.forecast.simpleforecast.forecastday;
		$("#mainContent>div.inlineContainer>div").each(function(i, elm) {
			$(elm)
				.append($("<h3></h3>")
					.html(daily[i].date.weekday_short));
		});
	}

	queryWeatherInformation("forecast10day", updatePage);
});
