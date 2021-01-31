const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local");
User = require("./models/user");
require('dotenv').config();

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Mongoose connected to MongoDB'))
.catch(error => console.log(error.message));
mongoose.set('useFindAndModify', false);

// APP SETUP
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// REQUIRE ROUTES
const indexRoutes = require('./routes/index');

// USE ROUTES
app.use(indexRoutes);

// PORT LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listing on port ${port}`);
});