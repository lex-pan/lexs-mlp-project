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
              <button class="website-read-stats-button"><h3>Add to collection</h3></button>
            </div>
            <div class="book-stats">
              <p>Book Authors: ${bookInfo.book_authors}</p>
              <p>Book Page Count: ${bookInfo.book_page_count}</p>
              <p>Publish Date: April 17</p>
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