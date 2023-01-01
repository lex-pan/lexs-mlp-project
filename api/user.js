async function register(event) {
    // Gets the username, password, and email values from the form input
    const username = document.getElementsByClassName('username')[0].value
    const password = document.getElementsByClassName('password')[0].value
    const email = document.getElementsByClassName('email')[0].value

    // sends an asychronous post request to portal 5000 and turns the html content within into JSON
    const rawResponse = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password, email: email })
    });

    const token = await rawResponse.json();

    if (token["entry"] == "successful"){
      window.location.href = "../user/user_login_page.html";
    } else {
      alert("Username already exists");
      window.location.href = "../user/user_register_page.html";
    }
}

async function login(event){
  const username = document.getElementsByClassName('username')[0].value
  const password = document.getElementsByClassName('password')[0].value

  const rawResponse = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password:password})
  });
  
  const token = await rawResponse.json();

  if (token == "failure") {
    console.log("login failure")
    window.location.href = "../user/user_login_page.html"
  } else {
    loadUserInformation(username)
    window.location.href = "../index.html"
  }
}

function loadUserInformation(username){
  sessionStorage.setItem("loggedIn", true)
  sessionStorage.setItem("username", username)
  console.log(sessionStorage)
} 
let loggedIn = sessionStorage.getItem("loggedIn")

function checkIfUserLoggedIn() {
  if (loggedIn == null) {
    return "Not logged in"
  } else {
    return "User logged in"
  }
}

async function addToUserBookCollection() {
  let bookName = document.getElementById("form-title").innerHTML;
  bookName = bookName.replaceAll("'", "")
  const userNovelBookStatus = document.getElementById('status').value;
  const userRating = document.getElementById('rating').value;
  const userComment = document.getElementsByClassName('user-book-film-description')[0].value;
  const username = sessionStorage.getItem("username");
  
  const rawResponse = await fetch('http://localhost:5000/add-to-user-book-collection', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:bookName, status: userNovelBookStatus, rating: userRating, comment: userComment, username: username})
  });
  
  const token = await rawResponse.json()
  alert(token)
  closeSubmitForm()
}

async function removeBookFromCollection() {
  let bookTitle = document.getElementById("remove-book-title").innerHTML
  bookTitle = bookTitle.slice(8)
  bookTitle = bookTitle.replaceAll("'", "")
  const username = sessionStorage.getItem("username");

  const rawResponse = await fetch(`http://localhost:5000/remove-from-user-book-collection/${username}/${bookTitle}`, {
    method: 'DELETE',
  })

  const token = await rawResponse.json()
  alert(token)
  closeRemoveBookForm()
}

async function getUserBooks() {
  const completedSection = document.getElementsByClassName("completed")[1];
  completedSection.innerHTML = "";

  const readingSection = document.getElementsByClassName("reading")[1];
  readingSection.innerHTML = "";

  const planToReadSection = document.getElementsByClassName("plan-to-read")[1];
  planToReadSection.innerHTML = "";

  const droppedSection = document.getElementsByClassName("dropped")[1];
  droppedSection.innerHTML = "";

  const username = sessionStorage.getItem("username");
    const userBookUrl = `http://localhost:5000/get-user-books?username=${username}`
    const rawResponse = await fetch(userBookUrl, {
      method: 'GET'
    });
    const books = await rawResponse.json()
  
    for (i=0; i < books.length; i++) {
      const bookImage = books[i].book_image;
      let singleBook = document.createElement("a");
      singleBook.innerHTML = 
      `
      <img class="display-user-books" src=${bookImage}">
      `
      const bookStatus = books[i].user_book_status
  
      if (bookStatus == 'Completed') {
        completedSection.appendChild(singleBook);
      } else if (bookStatus == 'Reading') {
        readingSection.appendChild(singleBook);
      } else if (bookStatus == 'Plan to read') {
        planToReadSection.appendChild(singleBook);
  
      } else if (bookStatus == "Dropped") {
        droppedSection.appendChild(singleBook);
      }
      
      let book = books[i]
      singleBook.addEventListener('click', () => displaySingleUserBook(book))
    }

  
  function displaySingleUserBook(book) {
    let bookTitlePosition = document.getElementById("front-of-site")
    bookTitlePosition.innerHTML = book.book_title;
    const hideUserSections = document.getElementsByClassName("user-sections")[0]
    hideUserSections.style.visibility = "hidden"
    let currentlyActive = document.getElementsByClassName('user-section-button')[2];
    currentlyActive.classList.remove("sectionDropdown")
    let bookPlacementPosition = document.getElementsByClassName('book-profile')[0];
    bookPlacementPosition.style.display = "grid";
    bookPlacementPosition.innerHTML =        
    `
      <p class="back-arrow"></p>
      <div class="book-overview">
        <button class="book-section-button sectionDropdown"><h3>Overview</h3></button>
        <div class="book-display">
          <img class="book-render-image" src="${book.book_image}">
          <div class="book-render-info">
            <div class="website-read-stats">
              <p>Your Rating: ${book.user_rating}</p> 
              <p>status: ${book.user_book_status}</p>
              <button class="add-to-collection-button"><h3>Add to collection</h3></button>
              <button class="remove-from-collection-button"><h3>Remove from collection</h3></button>
            </div>
            <div class="book-stats">
              <p>Book Authors: ${book.book_authors}</p>
              <p>Book Page Count: ${book.book_page_count}</p>
              <p>Publish Date: ${book.book_publish_date}</p>
              <p>Book Pseudonyms:</p> 
            </div>
          </div> 
          <textarea class="book-render-description" readonly>${book.book_description}</textarea> 
        </div>
  
      </div>
      <button class="book-section-button"><h3>Characters</h3></button>
      <button class="book-section-button"><h3>Book Information</h3></button>
      <button class="book-section-button"><h3>Book Statistics</h3></button>
    `; 
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', ready)
    } else {
      ready()
    }
  }
}

function ready() {
  activate_book_profile_buttons() 
  const body = document.getElementById("body")
  body.style.position = "fixed";
  body.style.width = "100%";
}

function backToUserBookList() {
  hideBookProfile = document.getElementsByClassName("book-profile")[0]
  hideBookProfile.style.display = "none";
  let bookTitlePosition = document.getElementById("front-of-site")
  bookTitlePosition.innerHTML = "User Profile";
  const hideUserSections = document.getElementsByClassName("user-sections")[0]
  hideUserSections.style.visibility = "visible";
  
  let currentlyActive = document.getElementsByClassName('user-section-button')[2];
  currentlyActive.classList.add("sectionDropdown")

  const body = document.getElementById("body")
  body.style.position = "relative";
}




