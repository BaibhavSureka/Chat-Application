import React, { useEffect } from "react";
import ChatUser from "./ChatUser.jsx";
import Messages from "./Messages.jsx";
import TypeSend from "./TypeSend.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectConversation, setSelectConversation } = useConversation();
  useEffect(() => {
    return setSelectConversation(null);
  }, [setSelectConversation]);
  return (
    <div className=" w-[70%] bg-slate-900">
      <div>
        {!selectConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser></ChatUser>
            <div
              className="flex-1 overflow-auto"
              style={{ maxHeight: "calc(100vh - 9vh - 9vh)" }}
            >
              <Messages></Messages>
            </div>
            <TypeSend></TypeSend>
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className=" flex h-screen justify-center items-center">
        <h1 className="text-center text-white">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser.user.fullname}
          </span>
          <br />
          No chat selected, please start conversation by selecting anyone person
          in your contacts.
        </h1>
      </div>
    </>
  );
};
