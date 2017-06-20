var currentLocation = this.Parameter;

console.log("INFO (GeoMapPage): currentLocation: " + JSON.stringify(currentLocation));

function cancel() {
	router.goBack();
}

module.exports = { 
	cancel: cancel,
	currentLocation: currentLocation
}