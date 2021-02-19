const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: String,
    image: String,
    level: Number,
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
});

module.exports = mongoose.model("Character", characterSchema);