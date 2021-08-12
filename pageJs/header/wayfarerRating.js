function GetWayfarerRating() {
        window.profilerequest = new XMLHttpRequest();
        window.profilerequest.addEventListener("load", function(evt){
            if (window.profilerequest.status == 200) {
                window.rating = window.profilerequest.response.body.getElementsByClassName('rating-bar__segment--active')[0].innerText;
            }
            else{
                console.log("Couldn't load profile!")
            }
        }, false);
        window.profilerequest.open('GET', 'profile', true)
        window.profilerequest.responseType = "document"
        window.profilerequest.send();
    }
function InjectRatingIntoHeader() {
        var ratingelement = document.createElement('section');
        ratingelement.innerText = window.rating;
        ratingelement.className = 'rating-bar__segment rating-bar__segment--active'
        ratingelement.style = 'border-radius:20px 20px 20px 20px; text-transform:capitalize; margin-right:10px; background-color:' + settings["headWayfarerRatingBGColor"] + ";" + " border: 1px solid " + settings["headWayfarerRatingBGColor"] + ";" + "color: " + settings["headWayfarerRatingTextColor"] + "!important;"
        ratingelement.title = window.profilerequest.response.body.getElementsByClassName('rating-bar__segment--active')[0].getAttribute('uib-tooltip')
        var profilepic = document.getElementsByClassName('inner-container')[1].children[0]
        document.body.children[0].children[2].insertBefore(ratingelement,profilepic)
}
GetWayfarerRating();
window.profilerequest.addEventListener("load", function(evt){
            if (window.profilerequest.status == 200) {
                InjectRatingIntoHeader();
            }
            else{
                console.log("Couldn't load profile!")
            }
        }, false);
