import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectConversation && selectConversation._id) {
        try {
          const res = await axios.get(`/api/message/get/${selectConversation._id}`);
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
