const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { 
    name: { type: String, required: true },  // Correct way to define required
    email: { type: String, required: true } 
  },
  recipients: [{ type: String, required: true }], // Array of email strings
  subject: { type: String, required: true },
  body: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
   sent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Message", MessageSchema);


