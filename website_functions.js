document.addEventListener('click', e => {
    const checkIfDropDownButton = e.target.matches('h3');       //checks if filter button is being clicked//
    let openDropDown = e.target.closest('button');      //finds the closest button//
    let dropDowns = document.querySelectorAll('button.active');     // Gets a list of all elements that match the specified group of selectors.//



    //Opens dropdown when clicked//
    if (checkIfDropDownButton) { 
        openDropDown.classList.toggle('active');        //When it's given this attribute, the list of filters is alerted and will display itself//
    }

    //Closes the list when clicked outside//
    if (!checkIfDropDownButton && !e.target.matches('li') && !e.target.matches('p')) {
        
        //Since it is a list we must iterate through each item within the list and remove attribute.// 
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


function mbnSearch() {
    if (event.key === "Enter") {
        let userInput = document.getElementById("mbnSearchBar").value;

        fetch("https://www.googleapis.com/books/v1/volumes?q=" + userInput + "&maxResults=39")
            .then(res => res.json())            
            .then(data => {
                displaySearchResults(data);
            })
            
    }
}

function displaySearchResults(data) {
    let checkSearch = document.getElementById('all-movies-display')

    let divsWithin = checkSearch.getElementsByTagName('div')
    while (divsWithin.length > 0) {
        divsWithin[0].remove()
    }

    for (i=0; i < data.items.length; i++){
        const dataInfo = data.items[i].volumeInfo

        const dataDiv = document.createElement('div');
        dataDiv.classList.add("media-display")


        const dataTitle = document.createElement('h3');
        dataTitle.classList.add("media-title")
        dataTitle.innerHTML = dataInfo.title;

        const dataImage = document.createElement('img');
        dataImage.classList.add("book-or-movie-image")
        dataImage.src = dataInfo.imageLinks.thumbnail;

        const dataDescription = document.createElement('p');
        dataDescription.classList.add("media-description")
        dataDescription.innerHTML = dataInfo.description;


        dataDiv.appendChild(dataTitle);
        dataDiv.appendChild(dataImage);
        dataDiv.appendChild(dataDescription);

        const displaySection = document.getElementById('all-movies-display');
        displaySection.appendChild(dataDiv);

    }
}