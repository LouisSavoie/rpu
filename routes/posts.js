const express = require("express");
const router = express.Router();
const Post = require("../models/post");
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

// POST New Post Form
router.post("/characters/:id/posts", middleware.checkCharacterOwnership, function(req, res){
    // find Character by id
    Character.findById(req.params.id, function(err, character){
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
                // redirect to chracter show page
                res.redirect("/characters/" + character._id);
            }
          });
        }
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

module.exports = router;