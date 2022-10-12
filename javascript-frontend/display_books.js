
function mbnSearch() {
    if (event.key === "Enter") { 
        let userInput = document.getElementById("mbnSearchBar").value; //Gets what user types in //

        fetch("https://www.googleapis.com/books/v1/volumes?q=" + userInput + "&maxResults=39") //Contacts google api //
            .then(res => res.json())            // gets response and converts into json //
            .then(data => {                     
                console.log(data)               
                displaySearchResults(data);     // Calls function to display data //
            })
    }
}

// Displays the data //
function displaySearchResults(data) {

    //Checks if there is already results displayed, if there is, remove current search results//
    let checkSearch = document.getElementById('all-movies-display')
    let divsWithin = checkSearch.getElementsByTagName('div')
    while (divsWithin.length > 0) {
        divsWithin[0].remove()
    }

    for (i=0; i < data.items.length; i++){
        const dataInfo = data.items[i].volumeInfo;

        // Creates HTML elements to input data fetched from API//
        const dataDiv = document.createElement('div'); 
        dataDiv.classList.add("media-display");

        const dataTitle = dataInfo.title;

        let dataImage = null;
        if (dataInfo.imageLinks != undefined){
            dataImage = dataInfo.imageLinks.thumbnail;
        } else {
            dataImage = document.createElement('img');
            dataImage.src = "website-images/Image-Not-Available.png";
        }


        let dataDescription = dataInfo.description;
        if (dataDescription == undefined) {
            dataDescription = "No description"
        }

        const starPercentage = createStarRating(dataInfo.averageRating)
        let averageRating = dataInfo.averageRating
        if (averageRating == undefined) {
            averageRating = 0
        }

        dataDiv.innerHTML = // the data rating shows the percentage that the star should be covered//
        `
        <h3 class="media-title">${dataTitle}</h3>
        <img class="book-or-movie-image" src=${dataImage}>
        <p class="media-description">${dataDescription}</p>
        <div class="rating-container">
            <div class="stars-outer">
                <div class="stars-inner" style="width:${starPercentage}"></div>  
            </div>
            <span>&nbsp&nbsp${averageRating}</span>
            <span class="item-adder-icon"></span>
        </div>
        `
        const displaySection = document.getElementById('all-movies-display'); // Creates section for displaying data//
        displaySection.appendChild(dataDiv); // adds the div into section for displaying data //

        //Information is used if user wants to add the book data to their library
        let allDataInfo = {
            title: dataTitle,
            image: dataImage,
            description: dataDescription,
            rating: averageRating,
            bookOrFilm: dataInfo.printType 
        }

        // ()=> console.log(1)
        dataDiv.getElementsByClassName("item-adder-icon")[0].addEventListener('click', () => userLex.add_item(dataTitle, allDataInfo))
    }
}

// Finds the width that matches up to a star and returns it
function createStarRating(rating){
    if (rating == undefined) {
        return 0
    } else {
        const starsTotal = 5;

        // Get percentage
        const starPercentage = (rating / starsTotal) * 100;
    
        let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    
        roundUp = {"30%":"28%" ,"70%":"72%", "90%":"93.5%"};
        compare = ["30%", "70%", "90%"];
    
        if (compare.includes(starPercentageRounded)) {
            starPercentageRounded = roundUp[starPercentageRounded];
        } 
        return starPercentageRounded;
    }
}






