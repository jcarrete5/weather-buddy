// query format: http://api.wunderground.com/api/[api-key]/[data-type]/q/[state-abbr]/[city].json
// autocomplete api: http://autocomplete.wunderground.com/aq?query=[query]

function parseAutocompleteResults(data) {
	console.log("Parsing autocomplete results");
	console.log(data);
}

function autocomplete(searchText) {
	var search = "http://autocomplete.wunderground.com/aq?cb=parseAutocompleteResults&query="+searchText;

	// Using jsonp to retrieve and parse autocomplete results
	var script = document.createElement('script');
    script.src = search;
    document.getElementsByTagName('head')[0].appendChild(script);
}

$(document).ready(function() {
	var apiUrl = "http://api.wunderground.com/api/"+apikey;

	var queryStr = new URLSearchParams(window.location.search);
	if (!queryStr.has("loc-query")) {
		console.log("no loc-query string; using geolocation");

		// If there is no location query, use client location
		navigator.geolocation.getCurrentPosition(function(pos) {
        	var lat = pos.coords.latitude;
			var long = pos.coords.longitude;
			$.get(apiUrl+"/geolookup/q/"+lat+","+long+".json", null, function(data, textStatus, jqXHR) {
				console.log("geolookup status: "+textStatus);
				console.log(data);
				$.get(apiUrl+"/forecast"+data.location.l+".json", null, function(data, textStatus, jqXHR) {
					console.log("weather information status: "+textStatus);
					console.log(data);
				});
			});
		});
	} else {
		console.log("loc-query present; using it");
	}
});
