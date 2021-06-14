const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

//mongo db configuration
const db= require('./setup/myurl').mongoURL;
const passport = require('passport');

//middleware for bodyparser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Attempt to connect database

mongoose
    .connect(db,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> console.log('Mongo DB connected successfully'))
    .catch(err=> console.log(err));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//CONFIG FOR JWT STRATEGY
require("./strategies/jsonjwtStrategy")(passport);

//route for testing
app.get("/",(req,res)=>{
    res.send('hey there big stack');
})

//actual route
app.use('/api/auth',auth);
app.use('/api/profile',profile);
app.use('/api/questions',questions);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`App is running at ${port}`));