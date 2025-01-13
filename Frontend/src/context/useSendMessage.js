import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectConversation._id}`,
        { message }
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in sending messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
}

export default useSendMessage;
