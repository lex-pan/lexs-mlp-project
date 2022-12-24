const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
//const get_database_info = require('./config');
//const user_database = get_database_info.pool
const app = express();
app.use(cors())
app.use(express.json());
const userDatabase = require('./user_database');
const book_database = require('./book_database')

app.post('/login', async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const verify = await userDatabase.authenticateUser(username, password);
    if (verify == "Either the username or password is incorrect") {
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

app.post('/add-to-collection', async(req, res)=>{
    const bookData = req.body    
    checkUniqueBook = await book_database.addBookToDatabase(bookData)
    res.json("books has been checked")
})

app.listen(5000);
console.log("On port 5000");


