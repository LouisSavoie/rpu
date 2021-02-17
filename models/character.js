const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: String,
    image: String,
    level: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Character", characterSchema);