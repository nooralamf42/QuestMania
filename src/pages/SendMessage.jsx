import { IoMdCheckmarkCircle } from "react-icons/io";
import React from "react";
import { Container } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SendMessage() {
    const pathname = window.location.href
    const url = pathname.replace('sent', 'user')
    const navigate = useNavigate()
    const clickHandler = () =>{
      navigate('/signup')
    }
  return (
    <Container className={"text-center py-12 h-[90vh]"}>
      <IoMdCheckmarkCircle
        size={120}
        color="white"
        className="mx-auto bg-green-400 rounded-full p-2"
      />
      <h1 className="text-xl text-slate-600 font-semibold mt-1">
        Message Sent
      </h1>
      <button className="mt-10 text-white text-2xl hover:scale-105 duration-200 hover:-rotate-3 bg-green-500 py-4 rounded-2xl w-80 animate-bounce shadow-2xl" onClick={clickHandler}>
        Get Your Own Messeges!
      </button>
      <Link to={url} className="block w-fit mx-auto mt-8 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear">
        Send Another
      </Link>
    </Container>
  );
}

export default SendMessage;
