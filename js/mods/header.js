function modHeader(settings){
	if (settings["headProgress"])
		addPageJS("header/upgradeProgress.js",true);
	if (settings["headRevCounter"])
		addPageJS("header/reviewCounter.js");
	if (settings["headWayfarerRating"])
		addPageJS("header/wayfarerRating.js");
	console.log("[WayFarer+] Header injection successful!");
}
