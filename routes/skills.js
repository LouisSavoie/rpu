const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");
const Character = require("../models/character");
const middleware = require("../middleware/middleware");

// ====================
//   Skill Routes
// ====================

// GET New Skill Form
router.get("/characters/:id/skills/new", middleware.isLoggedIn, function(req, res){
    Character.findById(req.params.id, function(err, character){
        if(err){
            console.log(err);
        } else {
            // Render the new skill form
            res.render("skills/new", {character: character});
        }
    });
});

// POST New Skill Form
router.post("/characters/:id/skills", middleware.isLoggedIn, function(req, res){
    // Find Character by id
    Character.findById(req.params.id, function(err, character){
        if(err){
            console.log(err);
            res.redirect("/characters/" + character._id);
        } else {
          // Create new Skill
          Skill.create(req.body.skill, function(err, skill){
            if(err){
                console.log(err);
            } else {
                // Add Character id to Skill
                skill.user = req.user._id;
                skill.level = 0;
                skill.progress = 0;
                skill.save();
                // Connect new Skill to Character
                character.skills.push(skill);
                character.save();
                // Redirect to chracter show page
                res.redirect("/characters/" + character._id);
            }
          });
        }
    });
});

module.exports = router;