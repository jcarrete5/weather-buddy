$(document).ready(function() {
	function formatTemp(temp) {
		return temp.fahrenheit+" F&deg; ("+temp.celsius+" C)";
	}

	function updatePage(weatherData) {
		$("#loadingGif").attr("hidden", "true");

		var daily = weatherData.forecast.simpleforecast.forecastday;
		$("#mainContent>div.inlineContainer>div").each(function(i, elm) {
			$(elm)
				.append($("<h3></h3>")
					.html(daily[i].date.weekday_short))
				.append($("<img>")
					.attr("src", daily[i].icon_url)
					.attr("alt", daily[i].conditions))
				.append($("<h5></h5>")
					.html(daily[i].conditions))
				.append($("<ul></ul>")
					.attr("id", "weatherConditions")
					.append($("<li></li>")
						.html("High: "+formatTemp(daily[i].high)))
					.append($("<li></li>")
						.html("Low: "+formatTemp(daily[i].low)))
					.append($("<li></li>")
						.html("Avg Humidity: "+daily[i].avehumidity+"%")));
		});
	}

	$("#loadingGif").attr("src", "img/loading.gif");

	queryWeatherInformation("forecast10day", updatePage);
});
