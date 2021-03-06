const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Skill = require("../models/skill");
const Character = require("../models/character");
const middleware = require("../middleware/middleware");
const leveling = require("../lib/leveling");

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

// POST New Post Form
router.post("/characters/:id/posts", middleware.checkCharacterOwnership, function(req, res){
    // find Character by id
    Character.findById(req.params.id).populate({ path: "skills" }).exec(function(err, character){
        if(err){
            console.log(err);
            res.redirect("/characters/" + character._id);
        } else {
            // create new Post
            Post.create(req.body.post, function(err, post){
                if(err){
                    console.log(err);
                } else {
                    // add user id to Post
                    post.user = req.user._id;
                    post.skill = req.body.post.skill;
                    post.text = req.body.post.text;
                    post.image = req.body.post.image;
                    post.save();
                    // connect new Post to Character
                    character.posts.push(post);
                    character.save();
                }
            });
            // level up skill progress by 1, if skill progress would be 10 then level up skill and reset skill progress to 0
            leveling.levelSkill(req.body.post.skill);
            // level up character progress by 1, if character progress would be 10 then level up character and reset character progress to 0
            leveling.levelCharacter(character._id);
        }
        res.redirect("/characters/" + character._id);
    });
});

// GET Edit Post Form
router.get("/characters/:id/posts/:post_id/edit", middleware.checkCharacterOwnership, function(req, res){
    Post.findById(req.params.post_id, function(err, foundPost){
        if(err){
            res.redirect("back");
        } else {
            res.render("posts/edit", {character_id: req.params.id, post: foundPost});
        }
    });
});

// PUT Edit Post Form
router.put("/characters/:id/posts/:post_id", middleware.checkCharacterOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/characters/" + req.params.id);
        }
    });
});

// GET Delete Post Form
router.get("/characters/:id/posts/:post_id/delete", middleware.checkCharacterOwnership, function(req, res){
    Post.findById(req.params.post_id, function(err, foundPost){
        if(err){
            res.redirect("back");
        } else {
            res.render("posts/delete", {character_id: req.params.id, post: foundPost});
        }
    });
});

// DELETE Delete Post
router.delete("/characters/:id/posts/:post_id", middleware.checkCharacterOwnership, function(req, res){
    // find character, delete post id from character's posts array
    Character.findByIdAndUpdate(req.params.id, { $pull: { 'posts': req.params.post_id } }, { returnOriginal: false }, function(err, foundCharacter){
        if(err){
            console.log(err)
            res.redirect("back");
        } else {
            // find post and remove from database
            Post.findByIdAndRemove(req.params.post_id, function(err, foundPost){
                if(err){
                    console.log(err)
                    res.redirect("back");
                } else {
                    // delevel skill progress by 1, if skill progress would be -1 then delevel skill and reset skill progress to 9
                    leveling.delevelSkill(foundPost.skill);
                }
            });
            // delevel character progress by 1, if character progress would be -1 then delevel character and reset character progress to 9
            leveling.delevelCharacter(req.params.id);
        }
        res.redirect("/characters/" + req.params.id);
    });
});

module.exports = router;