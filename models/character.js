const mongoose = require('mongoose');

// CHARACTER MONGOOSE MODEL
const characterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    image: String,
    level: Number,
    levelProgress: Number,
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }
    ]
});

module.exports = mongoose.model("Character", characterSchema);