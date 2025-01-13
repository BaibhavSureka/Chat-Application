import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout successfully");
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error("error in logout")
    }
  };

  return (
    <div className="h-[9vh] bg-slate-800">
      <div>
        <BiLogOutCircle
          className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 mt-2 ml-2"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
