async function login(event) {
    const username = document.getElementsByClassName('username')[0].value
    const password = document.getElementsByClassName('password')[0].value
    const email = document.getElementsByClassName('email')[0].value
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

