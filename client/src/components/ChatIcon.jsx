import { useState } from "react";
import Chatbot from "./Chatbot";
import { MessageCircle } from "lucide-react"; // icon library (already available)

export default function ChatIcon() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#f2c4bb] text-white p-4 rounded-full shadow-lg hover:bg-[#e0a7a0] transition"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chatbot window */}
      {open && <Chatbot onClose={() => setOpen(false)} />}
    </>
  );
}
