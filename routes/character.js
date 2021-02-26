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
router.post("/character/new", middleware.isLoggedIn, function(req, res){
    // get data from form
    let user = req.user._id;
    let name = req.body.name;
    let image = req.body.image;
    let skill = req.body.skill;
    // add data to Character model and add to DB (rpu.characters)
    Character.create({
        user: user,
        name: name,
        image: image,
        level: 0,
        levelProgress: 0,
        skills: [{name: skill, level: 0, progress: 0}]
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

// GET Edit Character
router.get("/character/edit", (req, res) => {
    Character.findOne({user: req.user.id}).exec(function(err, foundCharacter) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/edit", {character: foundCharacter});
        }
    });
});

// PUT Edit Character
router.put("/character", (req, res) => {
    Character.findOneAndUpdate({user: req.user.id}, req.body.character, (err, updatedCharacter) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/character");
    });
});

module.exports = router;