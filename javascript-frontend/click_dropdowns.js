if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Adds a event listener for when users click on profile/reading list within the user page
    // to redirect users to the clicked section

    // Selects all user profile section buttons and applies an event listener
    const userSectionButtons = document.getElementsByClassName("user-section-button");  
    for (let i = 0; i < userSectionButtons.length; i++) {
        let button = userSectionButtons[i];
        button.addEventListener("click", applyShowFunction)
    }

    function applyShowFunction(event) {

        // when the user clicks a new button all previous sections become hidden
        // and the section that is clicked is shown using the 
        // sectionDropdown class that gives the section clicked visibility
        let currentlyActive = document.querySelectorAll('button.user-section-button.sectionDropdown');
        for (let i = 0; i < currentlyActive.length; i++) {
            currentlyActive[i].classList.remove("sectionDropdown")
        }

        // Displays the buttons
        let getGiveActive = event.target.closest("button.user-section-button");
        getGiveActive.classList.toggle('sectionDropdown')
    }
}
