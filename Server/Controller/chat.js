const Chat = require("../Model/Chat");

const createChat = async (req, res) => {
  const userId = req.body.userId;
  try {
    const existChat = await Chat.find({ users: { $in: [userId] } });
    if (existChat.length>0) {
        console.log('chatexist');
      return res.status(200).json({ Success: true, message: "chat exist" });
    }
    const createdChat = await Chat.create({ users: [userId, req.user._id] });
    const newChat = await Chat.find({ users: { $in: [userId] } }).populate('users');
    console.log(newChat);
    return res
      .status(201)
      .json({ Success: true, message: "Chats created", newChat });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const getChats = async (req, res) => {
  try {
    const id = req.user._id;
    const chats = await Chat.find({ users: { $in: [id] } }).populate("users");

    res.status(200).json({
      Success: true,
      message: "Got all chats",
      chats,
      userId: req.user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { createChat, getChats };
