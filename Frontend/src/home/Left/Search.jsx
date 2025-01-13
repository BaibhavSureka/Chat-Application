import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../zustand/useConversation.js";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectConversation } = useConversation();
  console.log(allUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectConversation(conversation);
      setSearch("");
    } else {
      toast.error("user not found");
    }
  };

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <label className="border-[1px] border-gray-700 input fi input-bordered flex items-center gap-2 w-[80%]  bg-black">
            <input
              type="text"
              placeholder="Search"
              className="text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button>
            <IoIosSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full " />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
