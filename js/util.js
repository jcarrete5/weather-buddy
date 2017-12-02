// query format: http://api.wunderground.com/api/[api-key]/[data-type]/q/[state-abbr]/[city].json
// autocomplete api: http://autocomplete.wunderground.com/aq?query=[query]
var apiUrl = "http://api.wunderground.com/api/"+apikey;
var autocompleteEntries = [];

function parseAutocompleteResults(data) {
	console.log("Parsing autocomplete results");
	autocompleteEntries = data.RESULTS;
	if (autocompleteEntries.length === 0) {
		console.log("No autocomplete results");
	} else {
		$("#wuQuery").val(autocompleteEntries[0].l);
	}
}

function autocomplete(searchText) {
	var search = "http://autocomplete.wunderground.com/aq?cb=parseAutocompleteResults&query="+
		encodeURIComponent(searchText);

	// Using jsonp to retrieve and parse autocomplete results
	var script = document.createElement("script");
    script.src = search;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Gets the location and passes location information to callback once received
function getLocation(callback) {
	console.log("Finding location");
	navigator.geolocation.getCurrentPosition(function(pos) {
    	var lat = pos.coords.latitude;
		var long = pos.coords.longitude;
		$.get(apiUrl+"/geolookup/q/"+lat+","+long+".json", null, function(data, textStatus, jqXHR) {
			console.log("geolookup status: "+textStatus);
			console.log(data);
			callback(data);
		});
	});
}

function queryWeatherInformation(infoType, callback) {
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has("wuQuery") && urlParams.get("wuQuery") !== "") {
		$.get(apiUrl+"/"+infoType+urlParams.get("wuQuery")+".json", null, function(data, textStatus, jqXHR) {
			console.log("weather information status: "+textStatus);
			console.log(data);
			callback(data);
		});
	} else {
		getLocation(function(loc) {
			$.get(apiUrl+"/"+infoType+loc.location.l+".json", null, function(data, textStatus, jqXHR) {
				console.log("weather information status: "+textStatus);
				console.log(data);
				callback(data);
			});
		});
	}
}

$(document).ready(function() {
	// Add event handler for location search box to autocomplete search
	// as the user types
	$("#locationSearch").on("input", function(e) {
		var search = e.currentTarget.value;
		autocomplete(search);
	});
});
