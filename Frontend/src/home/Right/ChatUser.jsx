import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import Avatar from "../../assets/avatar.avif";

function ChatUser() {
  const { selectConversation } = useConversation();

  const { onlineUsers } = useSocketContext();

  const getsOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[9vh] ">
      <div className={`avatar online`}>
        <div className="w-16 rounded-full">
          <img src={Avatar} alt="Avatar" />
        </div>
      </div>
      <div>
        <h1 className="text-white text-xl">{selectConversation.fullname} </h1>
        <spam className="text-blue-600 text-sm">
          {getsOnlineUsersStatus(selectConversation._id)}
        </spam>
      </div>
    </div>
  );
}

export default ChatUser;
