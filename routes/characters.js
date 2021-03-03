const express = require("express");
const router = express.Router();
const Character = require("../models/character");
const middleware = require("../middleware/middleware");

// ====================
//   Character Routes
// ====================

// GET New Character Form
router.get("/characters/new", middleware.isLoggedIn, function(req, res){
    res.render("characters/new");
});

// POST New Character Form
router.post("/characters", middleware.isLoggedIn, function(req, res){
    // get data from form
    let user = req.user._id;
    let name = req.body.name;
    let image = req.body.image;
    // add data to Character model and add to DB (rpu.characters)
    Character.create({
        user: user,
        name: name,
        image: image,
        level: 0,
        levelProgress: 0
    }, function(err, character) {
        if (err) {
            res.redirect("back");
        } else {
            console.log("User added, " + character.name + " to rpu.characters");
            // redirect back to character page
            res.redirect("/characters/" + character._id + "/skills/new");
        }
    });
});

// GET Character
router.get("/characters/:id", middleware.isLoggedIn, (req, res) => {
    Character.findOne({user: req.params.id}).populate("skills").exec(function(err, foundCharacter) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("characters/show", {character: foundCharacter});
        }
    });
});

// GET Edit Character
router.get("/characters/:id/edit", middleware.checkCharacterOwnership, (req, res) => {
    Character.findById(req.params.id, function(err, foundCharacter) {
        if (err) {
            console.log(err);
            res.redirect("/characters/" + req.params.id);
        } else {
            res.render("characters/edit", {character: foundCharacter});
        }
    });
});

// PUT Edit Character
router.put("/characters/:id", middleware.checkCharacterOwnership, (req, res) => {
    Character.findOneAndUpdate(req.params.id, req.body.character, (err, updatedCharacter) => {
        if (err) {
            console.log(err);
            res.redirect("/characters/" + req.params.id)
        }
        res.redirect("/characters/" + req.params.id);
    });
});

module.exports = router;