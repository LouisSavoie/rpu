const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");
const Character = require("../models/character");
const middleware = require("../middleware/middleware");

// ====================
//     Posts Routes
// ====================

// GET New Post Form
router.get("/characters/:id/posts/new", middleware.checkCharacterOwnership, function(req, res){
    Character.findById(req.params.id).populate("skills").exec(function(err, character){
        if(err){
            console.log(err);
        } else {
            res.render("posts/new", {character: character});
        }
    });
});

module.exports = router;