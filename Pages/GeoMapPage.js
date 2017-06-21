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
	var locationString = currentLocation.latitude + "," + currentLocation.longitude;
	console.log("INFO (GeoMapPage): saving location " + locationString + " for hike " + hike.id);
	Context.updateGeoLocation(hike.id, currentLocation.latitude + ", " + currentLocation.longitude);
	router.goBack();
}

module.exports = { 
	cancel: cancel,
	currentLocation: currentLocation,
	save: save
}