const express = require("express");
const {advertiseController} = require("../controllers/advertiseController");
const router = express.Router();
router.post("/", advertiseController);
module.exports = router;