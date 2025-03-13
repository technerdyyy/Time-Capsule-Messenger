const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Schedule a message
router.post("/schedule-message", async (req, res) => {
  try {
    const { sender, recipient, subject, body, scheduledTime } = req.body;

    const newMessage = new Message({
      sender,
      recipient,
      subject,
      body,
      scheduledTime
    });

    await newMessage.save();
    res.status(201).json({ message: "Message scheduled successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule message" });
  }
});

module.exports = router;
