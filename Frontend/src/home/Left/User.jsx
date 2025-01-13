import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import Avatar from "../../assets/avatar.avif";

function User({ user }) {
  const { selectConversation, setSelectConversation } = useConversation();
  const isSelected = selectConversation?._id === user._id;

  // Check if the user is online
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectConversation(user)}
    >
      <div className="flex space-x-5 px-6 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-16 rounded-full">
            <img src={Avatar} alt="Avatar" />
          </div>
        </div>
        <div className="text-white">
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
