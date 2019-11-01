function modNominationPage(settings){
	var newScript = document.createElement("script");
	newScript.src = chrome.extension.getURL("pageJs/libs/S2.js");
	document.getElementsByTagName("head")[0].appendChild(newScript);

	var newScript = document.createElement("script");
	newScript.src = chrome.extension.getURL("pageJs/nominations.js");
	document.getElementsByTagName("head")[0].appendChild(newScript);

	var newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet");
	newCss.setAttribute("href", chrome.extension.getURL("assets/nominations.css"));
	document.getElementsByTagName("head")[0].appendChild(newCss);

	console.log("[WayFarer+] Nominations page mod loaded!");

	//In separate function for future readability if more mods are added
	if (settings["nomStreetView"])
		addStreetView();
	if (settings["nomStats"])
		addStats();
	if (settings["nomIntelButton"])
        addIntelButton();
    if (settings["nomGoogleMaps"])
        addGoogleMapsButton();
    if (settings["accPoGo"] && settings["accIngress"] && settings["nomStats"])
        addNomTypeButtons();

	//Observe for changes to create a custom onclick event for any nomination div
	var observer = new MutationObserver(function (mutations) {
	    mutations.forEach(function (mutation) {
	        if (!mutation.addedNodes) {
	            return;
	        }
	        var nodes = mutation.addedNodes;
	        nodes.forEach(function(node,i){
	        	if (node.className == "nomination card ng-scope" || node.className == "nomination card ng-scope --selected"){
	        		node.setAttribute("onclick", "selectNomination();");
	        	}
	        });
	    });
	});

	observer.observe(document.body, {
	    childList: true,
	    subtree: true,
			queries: [{element: "#map"}]
	});
}

function addNomTypeButtons(){
	//Adds buttons for users with both Ingress and PoGo acc to mark which nomination was made where
	var titleElem = document.getElementsByClassName("nomination-title")[0];
	var nomTypeElem = document.createElement("div");
	var inputPoGo = document.createElement("input");
	inputPoGo.type = "radio";
	inputPoGo.value = "pogo";
	inputPoGo.id = "pogo";
	inputPoGo.name = "nomType";
	inputPoGo.setAttribute("onclick", "setNomType(this.id);");
	var inputIngress = document.createElement("input");
	inputIngress.type = "radio";
	inputIngress.value = "ingress";
	inputIngress.id = "ingress";
	inputIngress.name = "nomType";
	inputIngress.setAttribute("onclick", "setNomType(this.id);");
	var labelPoGo = document.createElement("label");
	labelPoGo.for = "pogo";
	labelPoGo.innerText = "Pokémon Go";
	var labelIngress = document.createElement("label");
	labelIngress.for = "ingress";
	labelIngress.innerText = "Ingress";

	inputPoGo.style.marginLeft = "10pt";
	inputIngress.style.marginLeft = "10pt";

	nomTypeElem.innerText = "Nominated using: ";
	nomTypeElem.appendChild(inputPoGo);
	nomTypeElem.appendChild(labelPoGo);
	nomTypeElem.appendChild(inputIngress);
	nomTypeElem.appendChild(labelIngress);

	titleElem.parentNode.insertBefore(nomTypeElem, titleElem.nextSibling);
}

function addIntelButton(){
    addMapButton("https://intel.ingress.com/intel?z=17&pll=",
                 "Open in Intel", "IIButton");
}

function addGoogleMapsButton(){
    addMapButton("https://maps.google.com/maps?q=",
                 "Open in Google Maps", "gMapButton");
}

function addMapButton(mapUrl, text, buttonID){
    var mapElem = document.getElementById("map");

    var button = document.createElement("a");
    button.setAttribute("class", "customMapButton");
    button.setAttribute("target", "_BLANK");
    button.setAttribute("id", buttonID);
    button.href = mapUrl;
    button.innerText = text;

    mapElem.parentNode.insertBefore(button, mapElem.nextSibling);
}

function addStreetView(){
	//Get map elem, and add custom StreetView element
	var newMapElem = document.createElement("div");
	newMapElem.setAttribute("id", "pano");
	newMapElem.setAttribute("class", "nomination-map");

	//Add to document
	var map = document.getElementById("map");
	map.parentNode.insertBefore(newMapElem, map.nextSibling);

	//Create street view title element
	var svTitleElem = document.createElement("div");
	svTitleElem.setAttribute("class", "nomination-category-header");
	svTitleElem.innerText = "Streetview: (Review preview)";

	//Add title to page:
	map.parentNode.insertBefore(svTitleElem, newMapElem);
}

function addStats(){
	//Create required HTML (Content is written from the pageJS as NominationController access is required!)
	var container = document.createElement("div");
	container.setAttribute("class", "wrap-collabsible");

	var collapsibleInput = document.createElement("input");
	collapsibleInput.id = "collapsible";
	collapsibleInput.setAttribute("class", "toggle");
	collapsibleInput.type = "checkbox";

	var collapsibleLabel = document.createElement("label");
	collapsibleLabel.setAttribute("class", "lbl-toggle");
	collapsibleLabel.innerText = "View Nomination Stats";
	collapsibleLabel.setAttribute("for", "collapsible");

	var collapsibleContent = document.createElement("div");
	collapsibleContent.setAttribute("class", "collapsible-content");

	var contentInner = document.createElement("div");
	contentInner.setAttribute("class", "content-inner");
	contentInner.id = "nomStats";
	contentInner.innerText = "Loading...";

	collapsibleContent.appendChild(contentInner);

	container.appendChild(collapsibleInput);
	container.appendChild(collapsibleLabel);
	container.appendChild(collapsibleContent);

	var elem = document.getElementsByTagName("section")[0];
	elem.insertBefore(container, elem.children[0]);
}