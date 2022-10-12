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


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    // Adds a event listener for when users click on certain buttons within the user page, they are displayed the sections they want to see
    //Since each user section is positioned absolute, their visibility is hidden using css, therefore they are all in the same spot with no visibility
    //when the user clicks the button all previous sections become hidden, and the section that is clicked is shown using the sectionDropdown class that gives the section clicked visibility
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