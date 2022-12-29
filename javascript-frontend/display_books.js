// This function is used to open and close the dropdowns to filter search results //
// applied to filters: Sort, Genres and Themes, Status of Publication, Year, Country of origin //
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

async function mbnSearch() {
    if (event.key === "Enter") { 
        let userInput = document.getElementById("mbnSearchBar").value; //Gets what user types in //
        //let userPageSearch = document.getElementsByClassName("page-number");

        const bookResult = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput}&maxResults=39`) //Contacts google api //
            .then(res => res.json())            // gets response and converts into json //
        displaySearchResults(bookResult);
        return bookResult
    }
}

// Displays the data //
function displaySearchResults(data) {

    //Checks if there is already results displayed, if there is, remove current search results//
    let checkSearch = document.getElementById('all-movies-display')
    let booksFilmsAlreadyPresent = checkSearch.getElementsByClassName('media-display')
    while (booksFilmsAlreadyPresent.length > 0) {
        booksFilmsAlreadyPresent[0].remove();
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
            dataDescription = "No description";
        }

        const starPercentage = createStarRating(dataInfo.averageRating);
        let averageRating = dataInfo.averageRating;
        if (averageRating == undefined) {
            averageRating = 0;
        }

        const bookID = data.items[i].id;

        dataDiv.innerHTML = // the data rating shows the percentage that the star should be covered//
        `
        <h3 class="media-title" data-bookID=${bookID} >${dataTitle}</h3>
        <img class="book-or-movie-image" src=${dataImage}>
        <p class="media-description">${dataDescription}</p>
        <div class="rating-container">
            <div class="rating-outer">
                <div class="rating-inner" style="width:${starPercentage}"></div>
            </div>
            <span>&nbsp&nbsp${averageRating}</span>
            <span class="item-adder-icon"></span>
            <span class="item-remover-icon"></span>
        </div>
        `;
        const displaySection = document.getElementById('all-movies-display'); // Creates section for displaying data//
        displaySection.appendChild(dataDiv); // adds the div into section for displaying data //

        // ()=> console.log(1)
        dataDiv.getElementsByClassName("media-title")[0].addEventListener('click', renderBookInfo);
        dataDiv.getElementsByClassName("item-adder-icon")[0].addEventListener('click', () => userBookorFilmSubmitForm(dataTitle));
        dataDiv.getElementsByClassName("item-remover-icon")[0].addEventListener('click', () => bookFilmremoveForm(dataTitle));
    }
}

// Finds the width that matches up to a star and returns it
function createStarRating(rating){
    if (rating == undefined) {
        return 0;
    } else {
        const starsTotal = 5;

        // Get percentage
        const starPercentage = (rating / starsTotal) * 100;
    
        let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    
        roundUp = {"10%":"0.85em" ,"30%":"2.9em", "50%":"4.9em", "70%":"6.9em", "90%":"8.9em"};
        compare = ["10%", "30%", "50%", "70%", "90%"];
    
        if (compare.includes(starPercentageRounded)) {
            starPercentageRounded = roundUp[starPercentageRounded];
        } 
        return starPercentageRounded
    }
}

function displaySingleBook(bookInfo) {
    let hideFilterButtons = document.getElementsByClassName("filter-sort-search")[0];
    hideFilterButtons.style.display = "none";

    let hideBooks = document.getElementById("all-movies-display");
    hideBooks.style.display = "none";

    let bookTitlePosition = document.getElementById("front-of-site");
    bookTitlePosition.innerHTML = bookInfo.book_title;
    let bookPlacementPosition = document.getElementsByClassName('book-profile')[0];
    bookPlacementPosition.style.display = "grid";
    bookPlacementPosition.innerHTML =        
    `
      <p class="back-arrow"></p>
      <div class="book-overview">
        <button class="book-section-button sectionDropdown"><h3>Overview</h3></button>
        <div class="book-display">
          <img class="book-render-image" src="${bookInfo.book_image}">
          <div class="book-render-info">
            <div class="website-read-stats">
              <p>Average Rating: ${bookInfo.book_rating}</p> 
              <p>members: ${bookInfo.book_rating_count}</p>
              <button class="add-to-collection-button"><h3>Add to collection</h3></button>
            </div>
            <div class="book-stats">
              <p>Book Authors: ${bookInfo.book_authors}</p>
              <p>Book Page Count: ${bookInfo.book_page_count}</p>
              <p>Publish Date: ${bookInfo.book_publish_date}</p>
              <p>Book Pseudonyms:</p> 
            </div>
          </div> 
          <textarea class="book-render-description" readonly>${bookInfo.book_description}</textarea> 
        </div>

      </div>
      <button class="book-section-button"><h3>Characters</h3></button>
      <button class="book-section-button"><h3>Book Information</h3></button>
      <button class="book-section-button"><h3>Book Statistics</h3></button>
    `;


    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', activate_book_profile_buttons);
    } else {
        activate_book_profile_buttons();
    }
}

function activate_book_profile_buttons(){
    const bookSectionButtons = document.getElementsByClassName("book-section-button");  
    for (let i = 0; i < bookSectionButtons.length; i++) {
        let button = bookSectionButtons[i];
        button.addEventListener("click", applyShowFunction);
    }

    function applyShowFunction(event) {

        // when the user clicks a new button all previous sections become hidden
        // and the section that is clicked is shown using the 
        // sectionDropdown class that gives the section clicked visibility
        let currentlyActive = document.querySelectorAll('button.book-section-button.sectionDropdown');
        for (let i = 0; i < currentlyActive.length; i++) {
            currentlyActive[i].classList.remove("sectionDropdown");
        }

        // Displays the buttons
        let getGiveActive = event.target.closest("button.book-section-button");
        getGiveActive.classList.toggle('sectionDropdown');
    }
    const arrowButton = document.getElementsByClassName("back-arrow")[0];
    arrowButton.addEventListener('click', backToBookSearchResults);

    const collectionButton = document.getElementsByClassName("add-to-collection-button")[0]
    const titleOfBook = document.getElementById("front-of-site").innerHTML

    collectionButton.addEventListener('click', () => userBookorFilmSubmitForm(titleOfBook))
}

function backToBookSearchResults() {
    let bookTitlePosition = document.getElementById("front-of-site");
    bookTitlePosition.innerHTML = "All Books";

    let bookPlacementPosition = document.getElementsByClassName('book-profile')[0];
    bookPlacementPosition.style.display = "none";

    let showFilterButtons = document.getElementsByClassName("filter-sort-search")[0];
    showFilterButtons.style.display = "grid";

    let showBooks = document.getElementById("all-movies-display");
    showBooks.style.display = "grid";
}

function userBookorFilmSubmitForm(itemTitle) {
    if (checkIfUserLoggedIn() == "User logged in") {
        const booktitle = document.getElementById("form-title");
        booktitle.innerHTML = itemTitle;
        const bookOrFilmForm = document.getElementsByClassName('book-submit')[0];
        bookOrFilmForm.classList.add('sectionDisplay');
    } else {
        alert("You must be signed in to bookmark");
    }
}

function closeSubmitForm() {
    document.getElementsByClassName('book-submit')[0].classList.remove('sectionDisplay');
    document.getElementById("rating").selected = "Select Rating";
    document.getElementById("status").selected = "Select Status";
    document.getElementsByClassName("user-book-film-description")[0].value = "";
}

function toUserPage() {
    if (checkIfUserLoggedIn() == "User logged in") {
        window.location.href = "../user/user.html";
    } else {
        window.location.href = "../user/user_login_page.html";
    }
}

function bookFilmremoveForm(title) {
    const bookTitle = document.getElementById("remove-book-title")
    bookTitle.innerHTML = `Remove: ${title}`

    const removeBookForm = document.getElementById('remove-book-form')
    removeBookForm.classList.add('sectionDisplay');
}

function closeRemoveBookForm() {
    const removebook = document.getElementById('remove-book-form')
    removebook.classList.remove('sectionDisplay');
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready()
}

function ready() {
    const closeBookAddButton = document.getElementsByClassName('close-add-book-form')[0];
    closeBookAddButton.addEventListener('click', closeSubmitForm);

    const removeBookFormButton = document.getElementsByClassName('close-remove-form')[0];
    removeBookFormButton.addEventListener('click', closeRemoveBookForm)

    const userBookorFilmSubmitButton = document.getElementsByClassName('user-selection-complete')[0];
    userBookorFilmSubmitButton.addEventListener('click', closeSubmitForm);
}



