import { BiMenuAltRight } from "react-icons/bi"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { checkLogin } from "../redux/appSlice";

function Navbar() {
    let [menuClicked, setMenuClicked] = useState(false);
    const isLogged = useSelector(pre=>pre.isLogged);
    const dispatch = useDispatch()
    const logoutHandler = () =>{
      signOut(auth)
      dispatch(checkLogin(false))
    }

  return (
    <Container className="px-[.6rem] relative">
      <nav className="flex justify-between items-center sm:px-5 py-3">
        <Link className="text-xl hover:scale-105" to={"/"}>QuestMania</Link>
        <ul className="hidden sm:flex gap-4 justify-center items-center text-lg">
          <li className="hover:scale-105 duration-100">
            <Link  to={"/"}>Home</Link>
          </li>
          <li className={`"hover:scale-105 duration-100" ${isLogged && 'hidden'}`}>
            <Link  to={"/signin"}>Login</Link>
          </li>
          <li className={`"hover:scale-105 duration-100" ${isLogged && 'hidden'}`}>
            <Link  to={"/signup"}>Signup</Link>
          </li>
          <li className={`"hover:scale-105 duration-100" ${!isLogged && 'hidden'}`}>
            <Link  onClick={logoutHandler} to={"/"}>Logout</Link>
          </li>
        </ul>

        <button className={`sm:hidden ${menuClicked&& 'rotate-180 duration-150'}`}><BiMenuAltRight size={24} onClick={()=>setMenuClicked((pre)=>!pre)}/></button>
      </nav>
      <aside className={`translate-x-[-100%] duration-300 ${menuClicked ? 'flex translate-x-0' : 'hidden'}`}>
      <ul className={`gap-4 justify-end w-full text-right pr-3 text-lg flex-row`}>
          <li className="hover:scale-105 duration-100">
            <Link  to={"/"}>Home</Link>
          </li>
          <li className="hover:scale-105 duration-100">
            <Link  to={"/login"}>Login</Link>
          </li>
          <li className="hover:scale-105 duration-100">
            <Link  to={"/signup"}>Signup</Link>
          </li>
        </ul>
      </aside>
    </Container>
  );
}

export default Navbar;
