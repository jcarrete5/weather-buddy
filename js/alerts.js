$(document).ready(function() {
	function updatePage(weatherData) {
		$("#loadingGif").attr("hidden", "true");

		var alerts = weatherData.alerts;
		for (let alert of alerts) {
			$("#alertList")
				.css("list-style-type", "none")
				.append($("<li></li>")
					.append($("<h3></h3>")
						.html(alert.description))
					.append($("<p></p>")
						.html(alert.message)
						.css("text-align", "left"))
					.append($("<p></p>")
						.html(alert.date)
						.css("font-style", "italic")
						.css("font-size", "smaller")));
		}
	}

	queryWeatherInformation("alerts", updatePage);
});
