import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Message = () => {
  const location = useLocation();
  const recipients = location.state?.recipients || []; 
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleScheduleMessage = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/schedule-message`,
        {
          sender: "",
          recipients: recipients.map((user) => user.email), 
          subject,
          body,
          scheduledTime,
        }
      );

      toast.success(response.data.message);
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

      {/* Display selected recipients */}
      <div className="bg-slate-400 p-2 border rounded mb-4 w-80">
        <h3 className="font-semibold mb-2">Recipients:</h3>
        {recipients.map((user) => (
          <p key={user._id} className="text-sm">
            {user.email}
          </p>
        ))}
      </div>

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

      <button
        className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-[#03435A]"
        onClick={handleScheduleMessage}
      >
        Schedule Message
      </button>
    </div>
  );
};

export default Message;
