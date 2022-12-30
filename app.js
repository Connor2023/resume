function hyperlinkHandler(id,status) {
    if (id=="contact-button") {
        var textClass = ""
    } else if (id.includes("button")){
        var textClass = "navbar-locator "
    } else {
        var textClass = ""
    } // Just put this first section as the enterable id, instead of getting the element's actual ID
    if (status==1) {
        var element = document.getElementById(id);
        element.className = textClass + "mouse-over";
    } else {
        var element = document.getElementById(id);
        element.className = textClass + "mouse-not-over";
    }
}


// Home Page Slideshow Functionality
const slideshowOrder = ["slideshow-display-container-1","slideshow-display-container-2","slideshow-display-container-3","slideshow-display-container-4","slideshow-display-container-5","slideshow-display-container-6"]

function slideshowOrderIndexer(index) {
    if (0 <= index && index < slideshowOrder.length) {}
    else if (index >= slideshowOrder.length) {
        index -= slideshowOrder.length
    }
    else {
        index += slideshowOrder.length
    }
    return index
}


// Pausing the slideshow
var SlideshowInterval = 10 * 1000
var slideshowFocusStatus = 0
function slideshowAutonomousHandler() {
    if (slideshowFocusStatus == 1) {
        setTimeout(slideshowAutonomousHandler, SlideshowInterval);
        slideshowFocusStatus = 0;
    } else {
        newSlideID = document.getElementsByClassName("slideshow-right").item(0).id;
        slideshowHandler(newSlideID, 1);
        setTimeout(slideshowAutonomousHandler, SlideshowInterval);
    }
}

// Configuring navigation of the slideshow
function slideshowHandler(elementID, autonomousActive) {
    if (autonomousActive == 1) {}
    else {
        slideshowFocusStatus = 1
    }
    // First determine if slideshow locator or image clicked
    if (document.getElementById(elementID).classList.contains("slideshow-locator")) {
        if (document.getElementById(elementID).classList.contains("active-slideshow-locator")) {}
        else {
            document.getElementsByClassName("active-slideshow-locator").item(0).className = "slideshow-locator";
            document.getElementById(elementID).className = "slideshow-locator active-slideshow-locator";
            locatorIndex = (+elementID.slice(-1))-1;
            for (let i = 0; i < slideshowOrder.length; i++) {
                document.getElementById(slideshowOrder[i]).className = "slideshow-display-container slideshow-hidden";
            }
            document.getElementById(slideshowOrder[slideshowOrderIndexer(locatorIndex - 2)]).className = "slideshow-display-container slideshow-far-left";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(locatorIndex - 1)]).className = "slideshow-display-container slideshow-left";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(locatorIndex)]).className = "slideshow-display-container slideshow-centre";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(locatorIndex + 1)]).className = "slideshow-display-container slideshow-right";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(locatorIndex + 2)]).className = "slideshow-display-container slideshow-far-right";
        }
    } else { // If image is clicked, it must be one of three images
        const imageCentreID = document.getElementsByClassName("slideshow-centre").item(0).id;
        var imageCentreIndex = slideshowOrder.indexOf(imageCentreID);
        var imageClickedIndex = slideshowOrder.indexOf(elementID);
        if (imageClickedIndex == imageCentreIndex) { // Centre image clicked
        } else if ( (imageClickedIndex > imageCentreIndex && (imageClickedIndex - (slideshowOrder.length - 1) != imageCentreIndex)) || (imageClickedIndex + (slideshowOrder.length - 1) == imageCentreIndex)) { // Right image clicked
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 2)]).className = "slideshow-display-container slideshow-hidden";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 1)]).className = "slideshow-display-container slideshow-transition slideshow-far-left";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex)]).className = "slideshow-display-container slideshow-transition slideshow-left";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 1)]).className = "slideshow-display-container slideshow-transition slideshow-centre";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 2)]).className = "slideshow-display-container slideshow-transition slideshow-right";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 3)]).className = "slideshow-display-container slideshow-far-right";
            document.getElementsByClassName("active-slideshow-locator").item(0).className = "slideshow-locator";
            document.getElementById(`slideshow-locator-${imageClickedIndex+1}`).className = "slideshow-locator active-slideshow-locator";
        } else { // Left image clicked
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 2)]).className = "slideshow-display-container slideshow-hidden";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 1)]).className = "slideshow-display-container slideshow-transition slideshow-far-right";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex)]).className = "slideshow-display-container slideshow-transition slideshow-right";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 1)]).className = "slideshow-display-container slideshow-transition slideshow-centre";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 2)]).className = "slideshow-display-container slideshow-transition slideshow-left";
            document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 3)]).className = "slideshow-display-container slideshow-far-left";
            document.getElementsByClassName("active-slideshow-locator").item(0).className = "slideshow-locator";
            document.getElementById(`slideshow-locator-${imageClickedIndex+1}`).className = "slideshow-locator active-slideshow-locator";
        }
    }
}



// Scrolling Animation on Resume Webpage
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("scroll-show", entry.isIntersecting);
    });
});

const hiddenElements = document.querySelectorAll(".scroll-hidden");
hiddenElements.forEach((element) => observer.observe(element));




// Running Functions as necessary
slideshowAutonomousHandler()