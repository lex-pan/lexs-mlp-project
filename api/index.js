const express = require('express');
var cors = require('cors')
const bcrypt = require('bcrypt');
const authenticateUser = require('./authenticate-User');

var users = {
    lexus: {
        password: '$2b$10$e5IbcDMC8Qhp5Zb3/4jRvecY/LKRNzVRi3JisjiRs2ODAINnUTtNu',
        email: 'lexiang.pan@gmail.com',
        userStatistics: {},
        listOfBooks: {},
        listOfFilms: {}
      }
}

const app = express();
app.use(cors())
app.use(express.json());

app.post('/login', async(req, res)=>{
    const username = req.body.username
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const verify = await authenticateUser(username, hashedpassword, users)
    if (verify == "Either the username or password is incorrect") {
        res.json("failure")
    } else {
        res.json(users[username])
    } 
})

app.post('/register', async(req, res)=>{
    console.log('got request')
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10)
        const username = req.body.username
        users[username] = {
            password: hashedpassword,
            email: req.body.email,
            userStatistics: {},
            listOfBooks: {},
            listOfFilms: {}
        }
        console.log(users)
        res.json({"entry": "successful"});
    } catch {
        res.json({"entry": "failure"})
    }
    
    
})

app.listen(5000);
console.log("On port 5000")


