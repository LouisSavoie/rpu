const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");
const Character = require("../models/character");
const middleware = require("../middleware/middleware");
const { populate } = require("../models/skill");

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
    Character.findById(req.params.id).populate("skills").populate({ path: "posts", populate: { path: "skill"}}).exec(function(err, foundCharacter) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            // populate array of posts to render on character show view, up to 3 most recent posts
            let postsForRender = [];
            if (foundCharacter.posts.length > 0) {
                for (let i = foundCharacter.posts.length - 1; i >= foundCharacter.posts.length - 3; i--){
                    if (i >= 0){
                        postsForRender.push( foundCharacter.posts[i] );
                    }
                };
            }
            res.render("characters/show", {
                character: foundCharacter,
                posts: postsForRender
            });
        }
    });
});

// GET Character Redirect
router.get("/characters/redirect/current", middleware.isLoggedIn, (req, res) => {
    Character.findOne({user: req.user._id}, function(err, foundCharacter) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/characters/" + foundCharacter._id);
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
    Character.findByIdAndUpdate(req.params.id, req.body.character, (err, updatedCharacter) => {
        if (err) {
            console.log(err);
            res.redirect("/characters/" + req.params.id)
        }
        res.redirect("/characters/" + req.params.id);
    });
});

module.exports = router;