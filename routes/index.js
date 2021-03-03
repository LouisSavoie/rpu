const express = require("express");
const router = express.Router();
const passport = require("passport");
const { deserializeUser } = require("passport");
const User = require("../models/user");

// ====================
//     Index Routes
// ====================

// GET Landing Page (ROOT)
router.get("/", (req, res) => {
    res.render("landing");
});



// GET Sign Up Form
router.get("/signup", (req, res) => {
    res.render("signup");
});

// POST Sign Up Form
router.post("/signup", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            return res.render("/signup")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/characters/new");
        });
    });
});



// GET Log In Form
router.get("/login", (req, res) => {
    res.render("login");
});

// POST Log In Form
router.post("/login", passport.authenticate("local",
  {
      failureRedirect: "/login"
  }), (req, res) => {
    res.redirect("/characters/" + req.user._id)

});

// GET Log Out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;