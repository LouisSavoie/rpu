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
            console.log("User added, " + character.name + " to rpu.characterss.");
        }
    });
    // redirect back to character page
    res.redirect("/character/:id");
});

// GET Character
router.get("/character/:id", (req, res) => {
    Character.findOne({user: req.user.id}).exec(function(err, foundCharacter) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.user.id)
            console.log(foundCharacter);
            res.render("character/show", {character: foundCharacter});
        }
    });
});

module.exports = router;