var Context = require("Modules/Context");
var GeoLocation = require("FuseJS/GeoLocation");

var hike = this.Parameter;

var name = hike.map(function(x) { return x.name; });
var location = hike.map(function(x) { return x.location; });
var geoLocation = hike.map(function(x) { return x.geoLocation; });
var distance = hike.map(function(x) { return x.distance; });
var rating = hike.map(function(x) { return x.rating; });
var comments = hike.map(function(x) { return x.comments; });

function cancel() {
	// Refresh hike value to reset dependent Observables' values
	hike.value = hike.value;
	router.goBack();
}

function save() {
	Context.updateHike(hike.value.id,
		name.value, 
		location.value, 
		distance.value, 
		rating.value, 
		comments.value,
		geoLocation.value);
	router.goBack();
}

function goToMap() {
	var timeoutMs = 3000;
	GeoLocation.getLocation(timeoutMs).then(function(currentLocation) {
		console.log("INFO (EditHikePage): currentLocation: " + JSON.stringify(currentLocation));
	    router.push("geoMap", currentLocation);
	}).catch(function(fail) {
	    console.log("ERROR: getLocation fail " + fail);
	});
}

module.exports = {
	name: name,
	location: location,
	distance: distance,
	rating: rating,
	comments: comments,
	geoLocation: geoLocation,

	cancel: cancel,
	save: save,
	goToMap: goToMap
};