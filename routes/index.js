const express = require("express");
const router = express.Router();

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

module.exports = router;