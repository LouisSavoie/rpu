const express = require("express");
const router = express.Router();

// ROOT
router.get("/", (req, res) => {
    res.send("Hello rp-u");
});

module.exports = router;