const express = require("express");
const router = express.Router();

// GET Landing Page (ROOT)
router.get("/", (req, res) => {
    res.render("landing");
});

module.exports = router;