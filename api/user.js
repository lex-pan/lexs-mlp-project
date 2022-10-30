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

    console.log(token);
    if (token["entry"] == "successful"){
      window.location.href = "../user/user_login_page.html";
    } else {
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
    window.location.href = "../user/user_login_page.html"
  } else {
    console.log(token)
    loadUserInformation(token)
    window.location.href = "../index.html"
  }
}

function loadUserInformation(token){
  sessionStorage.setItem("loggedIn", true)
  sessionStorage.setItem("userInfo", JSON.stringify(token))
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

async function addToCollection() {
  const bookID = document.getElementById("form-title").getAttribute("data");
  const userNovelBookStatus = document.getElementById('status').value;
  const userRating = document.getElementById('rating').value;
  const userComment = document.getElementsByClassName('user-book-film-description')[0].value;
  const user = JSON.parse(sessionStorage.getItem("userInfo"));
  
  const rawResponse = await fetch('http://localhost:5000/add-to-collection', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ID: bookID, status: userNovelBookStatus, rating: userRating, comment: userComment, userInfo: user})
  });

  closeSubmitForm()

  alert("Successfully added")
}