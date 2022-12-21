const bcrypt = require('bcrypt');
const get_database_info = require('./config');
const user_database = get_database_info.pool

async function checkIfUserAlreadyExists(username){
    try {
        const check = await user_database.query("SELECT * FROM users WHERE username= '" + username + "';")
        if (check.rows[0] == undefined) {
            return "Valid Username"
        } else {
            return check.rows[0]
        }
    } catch {
        if (err) {
            console.log("error")
        }
    }
}

async function addUserToDatabase(username, password, email) {
    const checkAndAdd = await checkIfUserAlreadyExists(username);
    if (checkAndAdd == "Valid Username") {
        console.log("User added to database")
        user_database.query("INSERT INTO users (username, password, email)" + " VALUES ('" + username + "', '" + password + "', '"+ email + "');")
    } else {
        return "The user already exists"
    }
}

async function authenticateUser(username, password) {
    const checkAndLogin = await checkIfUserAlreadyExists(username);
    if (checkAndLogin != "Valid Username") {
        passwordComparision = await (bcrypt.compare(password, checkAndLogin.password))
        if (passwordComparision == true) {
            console.log("password matched")
            return checkAndLogin
        } else {
            return "Either the username or password is incorrect"
        }
    } else {
        return "Either the username or password is incorrect"
    }
}

// checkIfUserAlreadyExists('lexia').then( x=> console.log(`the user exists: ${x}`));
// console.log(checkIfUserAlreadyExists('lexia'));

//(async () => {
//    const x = await addUserToDatabase('xelus', 'maythispleasework', 'throwaaway@gmail.com');
//    console.log(x)
//  })();


module.exports = {
    authenticateUser,
    checkIfUserAlreadyExists,
    addUserToDatabase
}

