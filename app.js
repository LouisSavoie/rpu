// REQUIRES
const express = require('express');
const app = express();
// For database models
const mongoose = require('mongoose');
// For user auth
const passport = require("passport");
const LocalStrategy = require("passport-local");
// For PUT and DELELTE requests in HTML forms
const methodOverride = require("method-override");
// Mongoose Models
const Post = require("./models/post");
const Skill = require("./models/skill");
const Character = require("./models/character");
const User = require("./models/user");
// For enviromental variables
require('dotenv').config();

// REQUIRE ROUTES
const postRoutes = require('./routes/posts');
const skillRoutes = require('./routes/skills');
const characterRoutes = require('./routes/characters');
const indexRoutes = require('./routes/index');

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Mongoose connected to MongoDB'))
.catch(error => console.log(error.message));
mongoose.set('useFindAndModify', false);

// APP SETUP
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: process.env.EXPSESSSCT,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

// USE ROUTES
app.use(postRoutes);
app.use(skillRoutes);
app.use(characterRoutes);
app.use(indexRoutes);

// PORT LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listing on port ${port}`);
});