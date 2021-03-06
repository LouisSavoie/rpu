const Character = require("../models/character");

// Create middleware object
let middlewareObj = {};

// CHECK LOGGED IN
// Check if the user making request is logged in by checking if they are authenticated by passport
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

// CHECK CHARACTER OWNERSHIP
// Check if user making request is authenticated by passport and owns the requested character
middlewareObj.checkCharacterOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Character.findById(req.params.id, function(err, foundCharacter){
            if(err){
                res.redirect("back");
            } else {
                // does user own character
                if(foundCharacter.user.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

//  Export middleware object
module.exports = middlewareObj;