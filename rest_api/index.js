const express = require('express');
const app = express();
const fs = require("fs");
const multer = require('multer');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const uri = "mongodb+srv://ibellero:Kenneth@clusterianstest.lw07g.mongodb.net/?retryWrites=true&w=majority";
const JWT_SECRET = 'bwoeufov2@348q3@4trpqt80234o$9q34vpq3_0n4aclf38&^49q3vp4bvsergtvqw39453423vvvfsws';
mongoose.connect(uri, {useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'travelBadge'
});

app.use(express.static("public"));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/home', (req, res) => {
    res.render("home");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/userHomeInfo', async (req, res) => {
    const {token} = req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);

        const _id = user.id;

        const userInfo = await User.findOne({_id}).lean();

        return res.json({status: 'ok', data: {firstname: userInfo.firstname, lastname: userInfo.lastname}});
    } catch(error){

    }
});

// app.post('changePassword', async (req, res) => {
//     const {token} = req.body;
//     try{
//         const user = jwt.verify(token, JWT_SECRET);

//         const _id = user.id;

//         const userInfo = await User.findOne({_id}).lean();

//         return res.json({status: 'ok', data: {firstname: userInfo.firstname, lastname: userInfo.userInfo}});
//     } catch(error){

//     }
// })

app.post('/logUserIn', async (req, res) => {

    const {username, password} = req.body;

    // find user
    const user = await User.findOne({username}).lean();

    if(!user){
        return res.json({status: 'error', error: 'The username or password is not correct'});
    }
    // check hashed password to match with usernames password

    if (await bcrypt.compare(password, (await user).password)){
        const token = jwt.sign({
            id: (await user)._id,
            username: (await user).username},
            JWT_SECRET
        );

        console.log(token);
        return res.json({status: 'ok', data: token});
    }

    return res.json({status: 'error', error: 'The username or password is not correct'});
});

app.post('/register', async(req, res) =>{
    const {username, password: plainTextPassword, email, firstname, lastname} = req.body;
    
    const password = await bcrypt.hash(plainTextPassword, 10);

    try{
        const response = await User.create({
            username,
            password,
            email,
            firstname,
            lastname
        });
        console.log('register');
    } catch(error){
        if (error.code === 11000){
            return res.json({status: 'error', error: 'Username or email already in use'})
        }
        throw error;
    }

    res.json({status: 'ok'});
    console.log(req.body);
});

//Sart Server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log('Running on port ' + PORT));
