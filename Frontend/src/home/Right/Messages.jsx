import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../component/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();  // listening incoming message.
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="flex-1" style={{ minHeight: "calc(100vh - 9vh - 9vh)" }}>
        {loading ? (
          <Loading />
        ) : (
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message.id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))
        )}

        {!loading && messages.length === 0 && (
          <div className="text-white text-center mt-[10%]">
            <p>Say! hii to start the conversation</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
