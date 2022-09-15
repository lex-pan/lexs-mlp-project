class User {
    constructor(username, password, join_date) {
        this.username = username;
        this.password = password;
        this.join_date =join_date;
        this.library_of_films = {};
        this.library_of_books = {};
        this.user_statistics = {};
    }

    add_item(title, itemInfo) {
        if (itemInfo.bookOrFilm == "BOOK") {
            this.library_of_books[title] = itemInfo;
        } else {
            this.library_of_films[title] = itemInfo;
        }
    }

    remove_item(title, itemInfo) {
        if (itemInfo.bookOrFilm == "BOOK") {
            delete this.library_of_books[title];
        } else {
            delete this.library_of_films[title];
        }
    }

    update_item(item) {

    }
}

var userLex = new User("lexus", "asdhjx", "September 9, 2022");

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    // This function is used to open the dropdowns to filter search results //
    document.addEventListener('click', e => {
        const checkIfDropDownButton = e.target.matches('h3');       //checks if filter button is being clicked//
        let openDropDown = e.target.closest('button.filter-button');      //finds the closest button//
        let dropDowns = document.querySelectorAll('button.filter-button.active');     // Gets a list of all elements that match the specified group of selectors.//

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

    const userSectionButtons = document.getElementsByClassName("user-section-button");

    for (let i = 0; i < userSectionButtons.length; i++) {
        let button = userSectionButtons[i];
        button.addEventListener("click", applyShowFunction)
    }

    function applyShowFunction(event) {
        let currentlyActive = document.querySelectorAll('button.user-section-button.sectionDropdown');
        for (let i = 0; i < currentlyActive.length; i++) {
            currentlyActive[i].classList.remove("sectionDropdown")
        }

        let getGiveActive = event.target.closest("button.user-section-button");
        getGiveActive.classList.toggle('sectionDropdown')
    }
}




