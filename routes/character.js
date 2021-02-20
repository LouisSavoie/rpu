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
    let user = req.user._id
    // add data to Character modle and add to DB (rpu.characters)
    Character.create({
        name: name,
        image: image,
        level: 0,
        user: user
    }, function(err, character) {
        if (err) {
            res.redirect("back");
        } else {
            console.log("User added, " + character.name + " to rpu.characters.");
        }
    });
    // redirect back to character page
    res.redirect("/character");
});

// GET Character
router.get("/character", (req, res) => {
    Character.findOne({user: req.user.id}).exec(function(err, foundCharacter) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/show", {character: foundCharacter});
        }
    });
});

module.exports = router;