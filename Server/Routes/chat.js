const express = require("express");
const router = express.Router();

const { createChat, getChats } = require("../Controller/chat");
const auth = require("../Middleware/auth");

router.post("/createChat", auth, createChat);
router.get("/getChats",auth, getChats);

module.exports = router;
