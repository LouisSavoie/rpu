const mongoose = require('mongoose');

// POST MONGOOSE MODEL
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
    },
    text: String,
    image: String
});

module.exports = mongoose.model("Post", postSchema);