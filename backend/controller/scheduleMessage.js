const Message = require("../models/Message");

async function scheduleMessage(req, res) {
  try {
    console.log("Incoming request data:", req.body);

    const { sender, recipients, subject, body, scheduledTime } = req.body;

    if (!sender || !recipients || !subject || !body) {
      return res.status(400).json({ error: "Missing required fields" });
      }
      const scheduledTimeUTC = new Date(scheduledTime).toISOString();

    const newMessage = new Message({
      sender,
      recipients,
      subject,
      body,
      scheduledTime: scheduledTimeUTC
    });

    await newMessage.save();
    res.status(201).json({ message: "Message scheduled successfully!" });

  } catch (error) {
    console.error("Error scheduling message:", error);
    res.status(500).json({ error: "Failed to schedule message", details: error.message });
  }
};

module.exports = scheduleMessage;