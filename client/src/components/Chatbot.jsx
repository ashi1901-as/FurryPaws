import { useState } from "react";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there 🐾! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { from: "user", text: input }]);

    // Add hardcoded bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for your query! Our team will reach out 🐶." },
      ]);
    }, 800);

    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-[#f2c4bb] text-white p-3 flex justify-between items-center rounded-t-xl">
        <span className="font-semibold">PetCare Chat</span>
        <button onClick={onClose} className="font-bold">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.from === "bot"
                ? "bg-gray-200 text-gray-800 self-start"
                : "bg-[#f2c4bb] text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#f2c4bb] text-white px-3 py-1 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
