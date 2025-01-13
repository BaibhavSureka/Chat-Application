import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated
    if (authUser) {
      // Initialize socket connection only when authUser exists
      const socketConnection = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:3005", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socketConnection);

      // Listen for updates on online users
      socketConnection.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup: Close socket connection when component unmounts or user changes
      return () => {
        socketConnection.close();
      };
    } else {
      // Cleanup if user logs out or is not authenticated
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
