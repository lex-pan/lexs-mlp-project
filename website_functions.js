// This function is used to open the dropdowns to filter search results //
document.addEventListener('click', e => {
    const checkIfDropDownButton = e.target.matches('h3');       //checks if filter button is being clicked//
    let openDropDown = e.target.closest('button');      //finds the closest button//
    let dropDowns = document.querySelectorAll('button.active');     // Gets a list of all elements that match the specified group of selectors.//

    //Opens dropdown when clicked//
    if (checkIfDropDownButton && openDropDown != null) { 
        openDropDown.classList.toggle('active');        //When it's given this attribute, the list of filters is alerted and will display itself//
    }

    //Closes the list when clicked outside//
    if (!checkIfDropDownButton && !e.target.matches('li') && !e.target.matches('p')) {
        
        //Since dropdowns selects all elements with said attribute, it returns a list, therefore we must iterate through each item within the list and remove each attribute.// 
        for(let i = 0; i < dropDowns.length; i ++){ 
            dropDowns[i].classList.remove("active");
        }
    }

    //Want to close dropdowns if another one is already opened when we click on another button for filters//
    if (checkIfDropDownButton && dropDowns.length > 0) {

        //removes all current active dropdowns//
        for(let i = 0; i < dropDowns.length; i ++){
            dropDowns[i].classList.remove("active");
        }
    }
})


// This function is used to call the results after the user presses the enter key //
// Gets data after user enters enter key //
function mbnSearch() {
    if (event.key === "Enter") { 
        let userInput = document.getElementById("mbnSearchBar").value; //Gets what user types in //

        fetch("https://www.googleapis.com/books/v1/volumes?q=" + userInput + "&maxResults=39") //Contacts google api //
            .then(res => res.json())            // gets response and converts into json //
            .then(data => {                     
                console.log(data)               
                displaySearchResults(data);     // Calls function to displa data //
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

        const dataTitle = document.createElement('h3');
        dataTitle.classList.add("media-title");
        dataTitle.innerHTML = dataInfo.title;

        const dataImage = document.createElement('img');
        dataImage.classList.add("book-or-movie-image");
        try {
            dataImage.src = dataInfo.imageLinks.thumbnail;
        }
        catch {
            dataImage.src = "website-images/Image-Not-Available.png"
        }

        const dataDescription = document.createElement('p');
        dataDescription.classList.add("media-description");
        dataDescription.innerHTML = dataInfo.description;

        // const dataRating = document.createElement('div');
        // dataRating.classList.add("rating-container");
        // const avgUserRating = dataInfo.averageRating;
        // dataRating.append(avgUserRating)

        const dataRating = createStarRating(dataInfo.averageRating);

        // Adds all new data into the div //
        dataDiv.appendChild(dataTitle);
        dataDiv.appendChild(dataImage);
        dataDiv.appendChild(dataDescription);
        dataDiv.appendChild(dataRating);

        applyRating(dataDiv)

        // applyRating(dataDiv) //

        const displaySection = document.getElementById('all-movies-display'); // Creates section for displaying data//
        displaySection.appendChild(dataDiv); // adds the div into section for displaying data //
    }
    
}

function createStarRating(rating){
    const container = document.createElement('div');
    container.classList.add("rating-container")
    // container.classList.add("rating-container");

    const starOuter = document.createElement('div');
    starOuter.classList.add("stars-outer");
    const starInner = document.createElement('div');
    starInner.classList.add("stars-inner");

    applyRating(starInner, rating);
    starOuter.appendChild(starInner);
    container.appendChild(starOuter);




    return container;

    /*

          <div class="stars-outer">
            <div class="stars-inner"></div>
          </div>
          <span class="number-rating"></span>
    */

}

function applyRating(starInner, rating ) {

    const starsTotal = 5;

    // Get percentage
    const starPercentage = (rating / starsTotal) * 100;

    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // starPercentageRounded = (Math.round((rate / 5) / 100));
    // console.log(ratings)   

    starInner.style.width = starPercentageRounded;
}