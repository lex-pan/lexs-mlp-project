const express = require('express');
var cors = require('cors')
const app = express();
var users = []


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/users', (req, res)=> {
    res.json(users);
});

app.get('/user-login-page', (req, res) => {
    res.redirect()
})

app.post('/login', (req, res)=>{
    console.log(req)
    users.push({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    console.log(users);
    res.redirect('/user-login-page');
})

app.listen(5000);
console.log("On port 5000")


