import { GiMute } from "react-icons/gi"; 
import { CiLogout } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { checkLogin } from "../redux/appSlice";
import { toast } from "react-toastify";

function Navbar() {
  let messeges = useSelector(data=>data.messages)
  console.log('hi')
  let unreadMessagesLength = messeges?.filter(messeges=>messeges.seen == false).length
  let [newMessages, setNewMessages] = useState(0);
  useEffect(()=>{
    setNewMessages(unreadMessagesLength)
  },[messeges])
  const isLogged = useSelector((pre) => pre.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(checkLogin(null));
    signOut(auth);
    toast("Logged out");
  };

  return (
    <Container className="px-[.6rem] relative">
      <nav className="flex justify-between items-center sm:px-5 py-3 text-xl">
        <Link className="flex gap-1 items-center text-lg sm:text-xl hover:scale-105" to={"/"}>
          <GiMute size={22} color="black"/>
          <span>shh</span> 
        </Link>
      
        <div className={`font-bold space-x-2 ${!isLogged && "hidden"}`}>
          <NavLink className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-gray-500'}
            to={'/'}>
            Create
          </NavLink>

          <NavLink
          className={({ isActive }) =>
          isActive ? 'text-blue-500 relative' : 'text-gray-500 relative'}
            to={"/messages"}
          >
            Messages
            <div className={`${newMessages==0 ? 'hidden' : "absolute text-sm flex items-center justify-center text-white font-bold -right-6 top-1 bg-green-500 p-1 rounded-full w-5 h-5"} `}>{newMessages}</div>
          </NavLink>
        </div>

        <Link
          className={`hover:scale-105 duration-100 ${!isLogged && "hidden"}`}
          onClick={logoutHandler}
          to={"/"}
        >
          <CiLogout className="sm:hidden mr-1" size={25} />
          <span className="hidden sm:block">Logout</span>
        </Link>

        <div className={`space-x-2 font-bold ${isLogged && "hidden"}`}>
          <NavLink
            to={"/signin"}
            className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-gray-500'
          }
         
          >
            Login
          </NavLink>

          <NavLink
            className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-gray-500'}
            to={"/signup"}
          >
            Signup
          </NavLink>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
