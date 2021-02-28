const Character = require("../models/character");

let middlewareObj = {};

// CHECK FOR LOGGED IN
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

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

module.exports = middlewareObj;