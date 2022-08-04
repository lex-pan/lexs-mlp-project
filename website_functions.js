document.addEventListener('click', e => {

    //checks if we are clicking on a filter button//
    const checkIfDropDownButton = e.target.matches('h3');

    //finds the closest button//
    let openDropDown = e.target.closest('button');

    //We get a list of all elements that match the specified group of selectors.//
    let dropDowns = document.querySelectorAll('button.active');


    //Opens dropdown when clicked//
    // checks if dropdown button is clicked, if so, the closest element named button is given the attribute active.//
    if (checkIfDropDownButton) { 

        //When it's given this attribute, the list of filters is alerted and will display itself//
        openDropDown.classList.toggle('active');
    }

    //Closes the list when clicked outside//
    //If the click is outside of the button, or the list itself, we want to close all lists.//
    if (!checkIfDropDownButton && !e.target.matches('li') && !e.target.matches('p')) {
        
        //Since it is a list we must iterate through each item within the list and remove attribute.// 
        for(let i = 0; i < dropDowns.length; i ++){ 
            dropDowns[i].classList.remove("active");
        }
    }

    //Want to close dropdowns if another one is already opened when we click on another button for filters//
    //checks if we are clicking a button and if we have more than one dropdown open//
    if (checkIfDropDownButton && dropDowns.length > 1) {

        //removes all current active dropdowns//
        for(let i = 0; i < dropDowns.length; i ++){
            dropDowns[i].classList.remove("active");
        }

        //opens dropdown//
        openDropDown.classList.toggle('active');

    }
})