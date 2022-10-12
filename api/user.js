async function login(event) {
    // Gets the username, password, and email values from the form input
    const username = document.getElementsByClassName('username')[0].value
    const password = document.getElementsByClassName('password')[0].value
    const email = document.getElementsByClassName('email')[0].value

    // sends an asychronous post request to portal 5000 and turns the html content within into JSON
    const rawResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password, email: email })
    });
    const content = await rawResponse.json();
    console.log(content);
}

