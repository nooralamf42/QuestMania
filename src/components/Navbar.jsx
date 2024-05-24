import { BiMenuAltRight } from "react-icons/bi"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { checkLogin } from "../redux/appSlice";
import { toast } from "react-toastify";

function Navbar() {
    let [menuClicked, setMenuClicked] = useState(false);
    const isLogged = useSelector(pre=>pre.user);
    const dispatch = useDispatch()
    const logoutHandler = () =>{
      dispatch(checkLogin(null))
      signOut(auth)
      toast("Logged out")
    }

  return (
    <Container className="px-[.6rem] relative">
      <nav className="flex justify-between items-center sm:px-5 py-3">
        <Link className="text-xl hover:scale-105" to={"/"}>QuestMania</Link>
        <ul className="hidden sm:flex gap-4 justify-center items-center text-lg">
          <li className="hover:scale-105 duration-100">
            <Link  to={"/"}>Home</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${isLogged && 'hidden'}`}>
            <Link  to={"/signin"}>Login</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${isLogged && 'hidden'}`}>
            <Link  to={"/signup"}>Signup</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${!isLogged && 'hidden'}`}>
            <Link  onClick={logoutHandler} to={"/"}>Logout</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${!isLogged && 'hidden'}`}>
            <Link to={"/messages"}>Messages</Link>
          </li>
        </ul>

        <button className={`sm:hidden ${menuClicked&& 'rotate-180 duration-150'}`}><BiMenuAltRight size={24} onClick={()=>setMenuClicked((pre)=>!pre)}/></button>
      </nav>
      <aside className={` duration-300 sm:hidden ${menuClicked ? 'flex' : 'hidden'}`}>
      <ul className={`gap-4 justify-end w-full text-right pr-3 text-lg flex-row`}>
      <li className="hover:scale-105 duration-100">
            <Link  to={"/"}>Home</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${isLogged && 'hidden'}`}>
            <Link  to={"/signin"}>Login</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${isLogged && 'hidden'}`}>
            <Link  to={"/signup"}>Signup</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${!isLogged && 'hidden'}`}>
            <Link  onClick={logoutHandler} to={"/"}>Logout</Link>
          </li>
          <li className={`hover:scale-105 duration-100 ${!isLogged && 'hidden'}`}>
            <Link to={"/messages"}>Messages</Link>
          </li>
        </ul>
      </aside>
    </Container>
  );
}

export default Navbar;
