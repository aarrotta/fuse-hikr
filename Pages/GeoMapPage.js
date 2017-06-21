var Context = require("Modules/Context");

var currentLocation = this.Parameter.map(function(p){return p.location});
var hike = this.Parameter.map(function(p){return p.hike});

this.Parameter.onValueChanged(module, function(p) {
	currentLocation = p.location;
	hike = p.hike;
});

function cancel() {
	currentLocation = null;
	hike = null;
	router.goBack();
}

function save() {
	Context.updateGeoLocation(hike.id, currentLocation);
	router.goBack();
}

function updateLocation(args) {
	console.log("hikeMapView longpresed: " + args.latitude + ", " + args.longitude);
	hikeMapView.setMarkers([{latitude: args.latitude, longitude: args.longitude}]);
	currentLocation.latitude = args.latitude;
	currentLocation.longitude = args.longitude;
}

module.exports = { 
	cancel: cancel,
	currentLocation: currentLocation,
	save: save,
	updateLocation: updateLocation
}