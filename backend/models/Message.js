const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  recipients: [String],
  subject: String,
  body: String,
  scheduledTime: Date,
  sent: { type: Boolean, default: false }
});

module.exports = mongoose.model("Message", messageSchema);

