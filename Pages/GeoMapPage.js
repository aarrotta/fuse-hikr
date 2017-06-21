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

module.exports = { 
	cancel: cancel,
	currentLocation: currentLocation,
	save: save
}