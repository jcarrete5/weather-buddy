$(document).ready(function() {
	function updatePage(weatherData) {
		$("#loadingGif").attr("hidden", "true");

		var alerts = weatherData.alerts;
		if (alerts.length === 0) {
			$("#alertList")
				.append($("<li></li>")
					.html("No severe weather alerts"));
			return;
		}

		for (let alert of alerts) {
			$("#alertList")
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
