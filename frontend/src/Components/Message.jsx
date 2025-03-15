import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Message = () => {
  const location = useLocation();
  const recipientEmail = location.state?.recipientEmail || "";

  const [recipient, setRecipient] = useState(recipientEmail);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleScheduleMessage = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/schedule-message`,
        {
          recipient,
          subject,
          body,
          scheduledTime,
        }
      );

      toast.success(response.data.message);
      setRecipient("");
      setSubject("");
      setBody("");
      setScheduledTime("");
    } catch (error) {
      toast.error("Failed to schedule message");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-300 min-h-screen">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Schedule a Message</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        className="p-2 border bg-slate-400 rounded mb-2 w-80"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        disabled={recipientEmail} // Prevents editing if recipient is pre-filled
      />
      <input
        type="text"
        placeholder="Subject"
        className="p-2 border rounded mb-2 w-80"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message Body"
        className="p-2 border rounded mb-2 w-80 h-24"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="datetime-local"
        className="p-2 border rounded mb-2 w-80"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
      />
      <button className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={handleScheduleMessage}>
        Schedule Message
      </button>
    </div>
  );
};

export default Message;

