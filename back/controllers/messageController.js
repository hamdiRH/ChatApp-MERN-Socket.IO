const mongoose = require("mongoose");
const Message = mongoose.model("Message");

exports.getAllMessages = async (req, res) => {
  const { chatroom } = req.params;
  const messages = await Message.find({ chatroom });
  res.json(messages);
};
