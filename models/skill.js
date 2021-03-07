const mongoose = require('mongoose');

// SKILL MONGOOSE MODEL
const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    level: Number,
    progress: Number
});

module.exports = mongoose.model("Skill", skillSchema);