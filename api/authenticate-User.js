const bcrypt = require('bcrypt')

async function authenticateUser(username, password, users) {
    if (!(username in users)) {
        return "Either the username or password is incorrect"
    }
    try {
        passwordComparision = await (bcrypt.compare(password, users[username].password))  
        if (passwordComparision == true) {
            return (user[username])
        } else {
            console.log("how did we get here")
            return "Either the username or password is incorrect"
        }
    }  catch(Error) {
        return Error
    }
}

module.exports = authenticateUser

