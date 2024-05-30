const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "subdir", "index.html"));
});

module.exports=router