const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");
const Character = require("../models/character");
const middleware = require("../middleware/middleware");

// ====================
//   Skill Routes
// ====================

// GET New Skill Form
router.get("/characters/:id/skills/new", middleware.checkCharacterOwnership, function(req, res){
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
router.post("/characters/:id/skills", middleware.checkCharacterOwnership, function(req, res){
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

// GET Edit Skill Form
router.get("/characters/:id/skills/:skill_id/edit", middleware.checkCharacterOwnership, function(req, res){
    Skill.findById(req.params.skill_id, function(err, foundSkill){
        if(err){
            res.redirect("back");
        } else {
            res.render("skills/edit", {character_id: req.params.id, skill: foundSkill});
        }
    });
});

// PUT Edit Skill Form
router.put("/characters/:id/skills/:skill_id", middleware.checkCharacterOwnership, function(req, res){
    Skill.findByIdAndUpdate(req.params.skill_id, req.body.skill, function(err, updatedSkill){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/characters/" + req.params.id);
        }
    })
});

module.exports = router;