import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function TypeSend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e.target.value)
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-3 h-[9vh] bg-gray-800 text-center">
        <div className="w-[70%] text-center p-1.5">
          <input
            type="text"
            placeholder="Type here"
            className="border border-gray-700 rounded-xl px-4 py-3 outline-none w-full bg-black text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button>
          <IoSend className="text-3xl text-white" />
        </button>
      </div>
    </form>
  );
}

export default TypeSend;
