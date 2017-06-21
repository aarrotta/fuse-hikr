var Context = require("Modules/Context");

var currentLocation = this.Parameter.map(function(p){return p.location});
var hike = this.Parameter.map(function(p){return p.hike});
var tmpLatitude;
var tmpLongitude;

this.Parameter.onValueChanged(module, function(p) {
	currentLocation = p.location;
	hike = p.hike;
	if(hikeMapView != null) {
		hikeMapView.setMarkers([{latitude: currentLocation.latitude, longitude: currentLocation.longitude}]);
		hikeMapView.setLocation(currentLocation.latitude, currentLocation.longitude);
	}
});

function cancel() {
	if(tmpLatitude != undefined && tmpLongitude != null) {
		currentLocation.latitude = tmpLatitude;
		currentLocation.longitude = tmpLongitude;
	}
	router.goBack();
}

function save() {
	Context.updateGeoLocation(hike.id, currentLocation);
	router.goBack();
}

function updateLocation(args) {
	console.log("hikeMapView longpresed: " + args.latitude + ", " + args.longitude);
	hikeMapView.setMarkers([{latitude: args.latitude, longitude: args.longitude}]);
	if(tmpLatitude == undefined && tmpLongitude == undefined) {
		console.log("setting temp lagitude and longitude: " + currentLocation.latitude + ", " + currentLocation.longitude);
		tmpLatitude = currentLocation.latitude;
		tmpLongitude = currentLocation.longitude;
	}
	currentLocation.latitude = args.latitude;
	currentLocation.longitude = args.longitude;
}

module.exports = { 
	cancel: cancel,
	currentLocation: currentLocation,
	save: save,
	updateLocation: updateLocation
}