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
  sessionStorage.setItem("userInfo", token)
  console.log(sessionStorage)
} 
var loggedIn = sessionStorage.getItem("loggedIn")

function checkIfUserLoggedIn() {
  if (loggedIn == null) {
    alert("You must be signed in to bookmark")
    return "Not logged in"
  } else {
    return "User logged in"
  }
}

async function addToCollection(event) {
}