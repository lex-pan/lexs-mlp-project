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
  const bookName = document.getElementById("form-title").innerHTML;
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
  const username = sessionStorage.getItem("username");

  const rawResponse = await fetch(`http://localhost:5000/remove-from-user-book-collection/${username}/${bookTitle}`, {
    method: 'DELETE',
  })

  const token = await rawResponse.json()
  alert(token)
  closeRemoveBookForm()
}


