const express = require("express");
const router = express.Router();
const Character = require("../models/character");
const character = require("../models/character");
const middleware = require("../middleware/middleware");

// ====================
//   Character Routes
// ====================

// GET New Character Form
router.get("/character/new", middleware.isLoggedIn, function(req, res){
    res.render("character/new");
});

// POST New Character Form
router.post("/character", middleware.isLoggedIn, function(req, res){
    // get data from form
    let name = req.body.name;
    let image = req.body.image;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    // add data to Character modle and add to DB (rpu.characters)
    Character.create({
        name: name,
        image: image,
        level: 0,
        author: author
    }, function(err, character) {
        if (err) {
            res.redirect("back");
        } else {
            console.log("User added, " + character.name + " to rpu.characterss.");
        }
    });
    // redirect back to character page
    res.redirect("/character");
});

// GET Character
router.get("/character/:id", (req, res) => {
    res.render("character/show");
});

module.exports = router;