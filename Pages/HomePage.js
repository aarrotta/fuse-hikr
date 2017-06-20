var Context = require("Modules/Context");

function goToHike(arg) {
	var hike = arg.data;
	router.push("editHike", hike);
}

function shareHike(arg) {
	var hike = arg.data;
	Context.shareHike(hike);
}

module.exports = {
	hikes: Context.hikes,

	goToHike: goToHike,
	shareHike: shareHike
};
