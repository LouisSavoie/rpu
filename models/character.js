const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    image: String,
    level: Number,
    levelProgress: Number,
    skills: []
});

module.exports = mongoose.model("Character", characterSchema);