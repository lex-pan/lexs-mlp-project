const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const url = require('url');
const app = express();
app.use(cors())
app.use(express.json());
const userDatabase = require('./user_database');
const book_database = require('./book_database')

app.post('/login', async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const verify = await userDatabase.authenticateUser(username, password);
    if (verify == "Either the username or password is incorrect" || verify == "Database Error") {
        res.json("failure")
    } else {
        res.json(verify)
    } 
})

app.post('/register', async(req, res)=>{
    console.log('got register request')
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    let email = req.body.email;
    if (email == '') {
        email = 'No Email Submitted';
    }
    checkAndAdd = await userDatabase.checkIfUserAlreadyExists(username)
    if (checkAndAdd == "Valid Username") {
        try {
            userDatabase.addUserToDatabase(username, hashedpassword, email)
            res.json({"entry": "successful"});
        }
        catch{
            res.json({"entry": "failure"})
        }
    } else {
        res.json({"entry": "Username already exists"});
    }
})

app.post('/add-to-user-book-collection', async(req, res)=>{
    const submitInfo = req.body
    const bookName = submitInfo.name
    const userBookStatus = submitInfo.status
    const userRating = submitInfo.rating
    const username = submitInfo.username;
    const userComment = submitInfo.comment;

    bookInsertion = await userDatabase.insertToUserBookDB(bookName, userBookStatus, userRating, username, userComment)
    res.json(bookInsertion)
})

app.post('/add-to-book-database', async(req, res)=>{
    const bookData = req.body    
    checkUniqueBook = await book_database.addBookToDatabase(bookData)
    res.json("books has been checked")
})

app.get('/get-book-info', async(req, res)=>{
    const bookUrl = url.parse(req.url, true).query;
    bookTitle = bookUrl["booktitle"];
    console.log(bookTitle)
    checkUniqueBook = await book_database.queryBookInfoFromDB(bookTitle)
    if (checkUniqueBook == undefined) {
        res.json("Book does not exist in database")
    } else {
        res.json(checkUniqueBook)
    }
})

app.delete('/remove-from-user-book-collection/:username/:bookname', async(req, res)=> {
    const username = req.params.username;
    const bookName = req.params.bookname;
    const result = await userDatabase.delete_book_from_uab_db(username, bookName)
    res.json(result)
})

app.get('/get-user-books', async(req, res) => {
    const getUserBooksUrl = url.parse(req.url, true).query;
    console.log(getUserBooksUrl)
    const username = getUserBooksUrl["username"];
    const getUserBooks = await userDatabase.get_books_from_uab_db(username)
    console.log(getUserBooks)
    res.json(getUserBooks)
})

app.listen(5000);
console.log("On port 5000");


