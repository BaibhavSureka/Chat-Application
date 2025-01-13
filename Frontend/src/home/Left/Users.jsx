import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);
  return (
    <div>
      <div>
        <h1 className="px-8 py-2 bg-gray-900 text-white">message</h1>
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(70vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user}></User>
        ))}
      </div>
    </div>
  );
}

export default Users;
