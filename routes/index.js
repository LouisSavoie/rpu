const express = require("express");
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