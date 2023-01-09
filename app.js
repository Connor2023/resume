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
        } else {
            if ( (imageClickedIndex > imageCentreIndex && (imageClickedIndex - (slideshowOrder.length - 1) != imageCentreIndex)) || (imageClickedIndex + (slideshowOrder.length - 1) == imageCentreIndex)) { // Right image clicked
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 2)]).className = "slideshow-display-container slideshow-hidden";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 1)]).className = "slideshow-display-container slideshow-transition slideshow-far-left";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex)]).className = "slideshow-display-container slideshow-transition slideshow-left";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 1)]).className = "slideshow-display-container slideshow-transition slideshow-centre";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 2)]).className = "slideshow-display-container slideshow-transition slideshow-right";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 3)]).className = "slideshow-display-container slideshow-far-right";
            } else { // Left image clicked
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 2)]).className = "slideshow-display-container slideshow-hidden";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex + 1)]).className = "slideshow-display-container slideshow-transition slideshow-far-right";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex)]).className = "slideshow-display-container slideshow-transition slideshow-right";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 1)]).className = "slideshow-display-container slideshow-transition slideshow-centre";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 2)]).className = "slideshow-display-container slideshow-transition slideshow-left";
                document.getElementById(slideshowOrder[slideshowOrderIndexer(imageCentreIndex - 3)]).className = "slideshow-display-container slideshow-far-left";
            }
            document.getElementsByClassName("active-slideshow-locator").item(0).className = "slideshow-locator";
            document.getElementById(`slideshow-locator-${imageClickedIndex+1}`).className = "slideshow-locator active-slideshow-locator";
        }
    }
}



// Scrolling Animation on Resume/Projects Webpages
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("scroll-show", entry.isIntersecting);
    });
});

const hiddenElements = document.querySelectorAll(".scroll-hidden");
hiddenElements.forEach((element) => observer.observe(element));


// Filtering Resume
var resumeFilterApplied = ''
function resumeFilterHandler(filter) {
    if (filter == 'experience-type') {
        // Sorting by experience type
        minorExperienceList = document.getElementsByClassName('minor-experience')
        experienceTypeSelectorStatus = (document.getElementById("experience-type-selector").value == 1)
        for (let i = 0; i < minorExperienceList.length; i++) {
            minorExperienceList.item(i).classList.toggle('sort-hidden',experienceTypeSelectorStatus)
        } 
    } else if (filter == 'experience-chronological-order') {
        // Sorting by time began
        document.getElementById("experience-list").classList.toggle("experience-list-earliest")
    } else {
        // Filtering by category
        if (resumeFilterApplied != '') {
            document.getElementById(`${resumeFilterApplied}-filterer`).classList.remove('filter-selected')
        }
        experienceList = document.getElementsByClassName('experience')
        if (resumeFilterApplied == filter) {
            resumeFilterApplied = ''
            function experienceFilterStatus(i) { return false }
        } else {
            resumeFilterApplied = filter
            function experienceFilterStatus(i) { return !(experienceList.item(i).classList.contains(filter)) }
            document.getElementById(`${resumeFilterApplied}-filterer`).classList.add('filter-selected')
        }
        for (let i = 0; i < experienceList.length; i++) {
            experienceList.item(i).classList.toggle('filter-hidden',experienceFilterStatus(i))
        }
    }
}



// Filtering Projects
var projectFilterApplied = ''
function projectFilterHandler(filter) {
    if (filter == 'project-type') {
        // Sorting by experience type
        projectList = document.getElementsByClassName('project')
        if (document.getElementById("project-type-selector").value == 1) {
            function projectSortStatus(i) { return !projectList.item(i).classList.contains('team-project') }
        } else if (document.getElementById("project-type-selector").value == 2) {
            function projectSortStatus(i) { return !projectList.item(i).classList.contains('individual-project') }
        } else {
            function projectSortStatus(i) { return false }
        }
        for (let i = 0; i < projectList.length; i++) {
            projectList.item(i).classList.toggle('sort-hidden',projectSortStatus(i))
        }
    } else if (filter == 'project-chronological-order') {
        // Sorting by time began
        document.getElementById("project-list").classList.toggle("project-list-earliest")
    } else {
        // Filtering by category
        if (projectFilterApplied != '') {
            document.getElementById(`${projectFilterApplied}-filterer`).classList.remove('filter-selected')
        }
        projectList = document.getElementsByClassName('project')
        if (projectFilterApplied == filter) {
            projectFilterApplied = ''
            function projectFilterStatus(i) { return false }
        } else {
            projectFilterApplied = filter
            function projectFilterStatus(i) { return !(projectList.item(i).classList.contains(filter)) } 
            document.getElementById(`${projectFilterApplied}-filterer`).classList.add('filter-selected')
        }
        for (let i = 0; i < projectList.length; i++) {
            projectList.item(i).classList.toggle('filter-hidden',projectFilterStatus(i))
        }
    }
}