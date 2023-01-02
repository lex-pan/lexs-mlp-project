const bcrypt = require('bcrypt');
require('dotenv').config();
connectionString = process.env.connectionString
const Pool = require('pg').Pool
const user_database = new Pool({
    connectionString
})

async function checkIfUserAlreadyExists(username){
    try {
        console.log("SELECT * FROM users WHERE username= '" + username + "';")
        const check = await user_database.query("SELECT * FROM users WHERE username= '" + username + "';")
        console.log(check)
        if (check.rows[0] == undefined) {
            return "Valid Username"
        } else {
            return check.rows[0]
        }
    } catch {
        return "Database Error"
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
    console.log(checkAndLogin)
    if (checkAndLogin == "Database Error") {
        return "Database Error"
    }
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

//Checks if user has listed enough information for book to be considered an entry
//Checks if book entry by user already exists
async function checkIfUpdate(bookName, username) {
    const check = await user_database.query(`SELECT * FROM users_and_books WHERE book_name= '${bookName}' AND username = '${username}';`)
    console.log(`SELECT * FROM users_and_books WHERE book_name= '${bookName}' AND username = '${username}';`)
    if (check.rows[0] == undefined){
        return "Book does not exist"
    } else {
        return "Entry already exists"
    }
}

async function insertToUserBookDB(bookName, userBookStatus, userRating, username, userComment) {
    const typeOfEntry = await checkIfUpdate(bookName, username)
    console.log(typeOfEntry)
    if (typeOfEntry == "Book does not exist") {
        try {
            user_database.query(`INSERT INTO users_and_books (book_name, username, user_rating, user_comment, user_book_status) 
                                 VALUES ('${bookName}', '${username}','${userRating}','${userComment}', '${userBookStatus}');`)
            return "Book has been successfully added"
        } catch {
            return "Unable to add to database"
        }
        
    } else if  (typeOfEntry == "Entry already exists"){
        try {
            user_database.query(`UPDATE users_and_books 
                                 SET user_book_status = '${userBookStatus}', user_rating = '${userRating}', user_comment = '${userComment}' 
                                 WHERE book_name= '${bookName}' AND username = '${username}';`)
            return "Book has been updated"
        } catch {
            return "Unable to update"
        }
    }
}

//check if user-book relation exists
//from that result delete entry
async function delete_book_from_uab_db(username, bookName) {
    const checkIfExists = await checkIfUpdate(bookName, username);
    if (checkIfExists == "Book does not exist") {
        return "No book exists in collection"
    } else if (checkIfExists == "Entry already exists") {
        try {
            console.log(`DELETE FROM users_and_books WHERE book_name = '${bookName}' AND username = '${username}'`)
            user_database.query(`DELETE FROM users_and_books WHERE book_name = '${bookName}' AND username = '${username}'`)
            return "Book has been removed from collection"
        } catch {
            return "Database error"
        }
        
    }
}

async function get_books_from_uab_db(username) {
    const books = await user_database.query(`SELECT book_title, book_authors, book_publisher, book_page_count, user_rating, book_image, book_description, user_comment, user_book_status, book_publish_date 
                                             FROM users_and_books INNER JOIN books ON book_title = book_name 
                                             WHERE username = '${username}';`);
    return books.rows
}

// checkIfUserAlreadyExists('lexia').then( x=> console.log(`the user exists: ${x}`));
// console.log(checkIfUserAlreadyExists('lexia'));

//(async () => {
//    const x = await get_books_from_uab_db("lexia");
//    console.log(x)
//})();


module.exports = {
    authenticateUser,
    checkIfUserAlreadyExists,
    addUserToDatabase,
    insertToUserBookDB,
    checkIfUpdate,
    delete_book_from_uab_db,
    get_books_from_uab_db
}
