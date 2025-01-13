import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import Logout from "./Logout.jsx";

export const Left = () => {
  return (
    <div className=" w-[30%] bg-black">
      <Search></Search>

      <div
        className="flex-1 overflow-y-auto"
        style={{ minHeight: "calc(78vh)" }}
      >
        <Users></Users>
      </div>
      <Logout></Logout>
    </div>
  );
};
