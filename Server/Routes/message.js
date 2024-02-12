const express = require("express");
const router = express.Router();
const { createMsg, getAllMsg } = require("../Controller/message");
const auth = require("../Middleware/auth");

router.post("/createMsg", auth, createMsg);
router.get("/getAllMsg/:id",auth, getAllMsg);

module.exports = router;
