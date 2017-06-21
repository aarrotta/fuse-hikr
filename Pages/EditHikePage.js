var Context = require("Modules/Context");
var GeoLocation = require("FuseJS/GeoLocation");

var hike = this.Parameter;

var name = hike.map(function(x) { return x.name; });
var location = hike.map(function(x) { return x.location; });
var distance = hike.map(function(x) { return x.distance; });
var rating = hike.map(function(x) { return x.rating; });
var comments = hike.map(function(x) { return x.comments; });
var geoLocation = hike.map(function(x) { return x.geoLocation; });
var showGeoLocation = hike.map(function(x) {
	if(x.geoLocation != null && x.geoLocation != undefined) {
		return true;
	} else {
		return false;
	}
});

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
		comments.value);
	router.goBack();
}

function goToMap() {
	if(geoLocation == undefined || geoLocation.value == undefined
			|| geoLocation.value.latitude == undefined || geoLocation.value.longitude == undefined) {
		console.log("INFO: Getting current device location...");
		var timeoutMs = 5000;
		GeoLocation.getLocation(timeoutMs).then(function(currentLocation) {
			console.log("INFO: " + currentLocation.latitude + ", " + currentLocation.longitude);
		    router.push("geoMap", { hike: hike.value, location: currentLocation});
		}).catch(function(fail) {
		    console.log("ERROR: getLocation fail " + fail);
		});
	} else {
		console.log("INFO: Using hike location " + geoLocation.value.latitude + ", " 
			+ geoLocation.value.longitude);
		router.push("geoMap", { hike: hike.value, location: geoLocation.value});
	}
}

module.exports = {
	name: name,
	location: location,
	distance: distance,
	rating: rating,
	comments: comments,
	geoLocation: geoLocation,
	showGeoLocation: showGeoLocation,

	cancel: cancel,
	save: save,
	goToMap: goToMap
};
