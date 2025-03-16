const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");
require("dotenv").config();

// Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Cron Job: Runs every minute to send scheduled messages
// cron.schedule("* * * * *", async () => {
//   console.log("Checking for scheduled messages...");

//   const now = new Date();
//   const messages = await Message.find({ scheduledTime: { $lte: now }, sent: false });

//   for (const message of messages) {
//     try {
//       await transporter.sendMail({
//         from: message.sender,
//         to: message.recipients,
//         subject: message.subject,
//         text: message.body
//       });

//       message.sent = true;
//       await message.save();
//       console.log(`Message sent to ${message.recipients}`);
//     } catch (error) {
//       console.error(`Failed to send message to ${message.recipients}:`, error);
//     }
//   }
// });

// console.log("Cron job started and running...");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendScheduledMessages = async () => {
  try {
    console.log("Checking for scheduled messages...");
    console.log("Server time:", new Date().toISOString());

    // Fetch only unsent messages that are due
    const now = new Date();
    const messages = await Message.find({ scheduledTime: { $lte: now }, sent: false });

    if (messages.length === 0) {
      console.log("No messages to send.");
      return;
    }

    // Send all emails in parallel
    await Promise.all(
      messages.map(async (msg) => {
        try {
          const mailOptions = {
            from: `"${msg.sender.name}" <${process.env.EMAIL_USER}>`,
            to: msg.recipients.join(","),
            subject: msg.subject,
            text: msg.body,
          };
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${msg.recipients.join(",")}:`, info.response);

          // Mark message as sent instead of deleting
          await Message.findByIdAndUpdate(msg._id, { sent: true });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }
      })
    );
  } catch (error) {
    console.error("Error checking messages:", error);
  }
};

// Schedule cron job to run every minute
cron.schedule("* * * * *", () => {
  console.log("Cron job running...");
  sendScheduledMessages();
});

module.exports = sendScheduledMessages;