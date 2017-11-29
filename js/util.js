// query format: http://api.wunderground.com/api/[api-key]/[data-type]/q/[state-abbr]/[city].json
// autocomplete api: http://autocomplete.wunderground.com/aq?query=[query]
var apiUrl = "http://api.wunderground.com/api/"+apikey;
var autocompleteEntries = [];

function parseAutocompleteResults(data) {
	console.log("Parsing autocomplete results");
	autocompleteEntries = data.RESULTS;
	$("#wuQuery").val(autocompleteEntries[0].l);
}

function autocomplete(searchText) {
	var search = "http://autocomplete.wunderground.com/aq?cb=parseAutocompleteResults&query="+searchText;

	// Using jsonp to retrieve and parse autocomplete results
	var script = document.createElement("script");
    script.src = search;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Gets the location and passes location information to callback once received
function getLocation(callback) {
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

$(document).ready(function() {
	// Add event handler for location search box to autocomplete search
	// as the user types
	$("#locationSearch").on("input", function(e) {
		var search = e.currentTarget.value;
		autocomplete(search);
	});
});
