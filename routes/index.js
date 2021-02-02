const express = require("express");
const { deserializeUser } = require("passport");
const router = express.Router();
const passport = require("passport");

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
            res.redirect("/character");
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
      successRedirect: "/character",
      failureRedirect: "/login"
  }), (req, res) => {

});

module.exports = router;