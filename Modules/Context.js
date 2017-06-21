var Observable = require("FuseJS/Observable");
var Backend = require("./Backend");
var Share = require("./Share");

var hikes = Observable();

Backend.getHikes()
	.then(function(newHikes) {
		hikes.replaceAll(newHikes);
	})
	.catch(function(error) {
		console.log("Couldn't get hikes: " + error);
	});

function updateHike(id, name, location, distance, rating, comments) {
	for (var i = 0; i < hikes.length; i++) {
		var hike = hikes.getAt(i);
		if (hike.id == id) {
			hike.name = name;
			hike.location = location;
			hike.distance = distance;
			hike.rating = rating;
			hike.comments = comments;
			hikes.replaceAt(i, hike);
			break;
		}
	}
	Backend.updateHike(id, name, location, distance, rating, comments)
		.catch(function(error) {
			console.log("Couldn't update hike: " + id);
		});
}

function updateGeoLocation(id, geoLocation) {
		for (var i = 0; i < hikes.length; i++) {
		var hike = hikes.getAt(i);
		if (hike.id == id) {
			hike.geoLocation = geoLocation;
			hikes.replaceAt(i, hike);
			break;
		}
	}
	Backend.updateGeoLocation(id, geoLocation)
		.catch(function(error) {
			console.log("Couldn't update hike: " + id);
		});
}

function shareHike(hike) {
	console.log("Sharing hike: " + hike.name + " - " + hike.comments);
	Share.shareText(hike.name, hike.comments);
}

module.exports = {
	hikes: hikes,

	updateHike: updateHike,
	shareHike: shareHike,
	updateGeoLocation: updateGeoLocation
};
