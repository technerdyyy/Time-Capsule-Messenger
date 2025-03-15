const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");
require("dotenv").config();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Cron Job: Runs every minute to send scheduled messages
cron.schedule("* * * * *", async () => {
  console.log("Checking for scheduled messages...");

  const now = new Date();
  const messages = await Message.find({ scheduledTime: { $lte: now }, sent: false });

  for (const message of messages) {
    try {
      await transporter.sendMail({
        from: message.sender,
        to: message.recipients,
        subject: message.subject,
        text: message.body
      });

      message.sent = true;
      await message.save();
      console.log(`Message sent to ${message.recipients}`);
    } catch (error) {
      console.error(`Failed to send message to ${message.recipients}:`, error);
    }
  }
});

console.log("Cron job started and running...");
