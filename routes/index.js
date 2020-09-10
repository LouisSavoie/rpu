const express = require("express");
const router = express.Router();

// ROOT (FEED)
router.get("/", (req, res) => {
    res.render("feed");
});

module.exports = router;