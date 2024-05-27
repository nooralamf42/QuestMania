import React, { Children } from "react";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Container from "./Container";

function CreateLink() {
  const location = useLocation();
  console.log(location.pathname);
  const uid = auth.currentUser.uid;
  let url = window.location.href;
  url = url.includes(".com")
    ? url.split(".com")[0] + ".com/user/"
    : url.split("/")[0] + url.split("/")[2] + "/user/";
  function clickHandlder() {
    navigator.clipboard.writeText(url + uid);
    toast.success("Copied to clipboard");
  }
  return (
  
    <Container className={'flex items-center flex-col'}>
      <StepCard feature={'copy link'} step={1}>
      <h2 className="w-[60%] mx-auto mb-2 truncate">{url+uid}</h2><button className="rounded-lg px-4 py-2 bg-black text-white hover:bg-gray-800" onClick={clickHandlder}>Click here to copy</button>
      </StepCard>

      <StepCard feature={'Share link on story!'} step={1}>
      <a className="rounded-lg w-full px-4 py-2 block mt-2 hover:-rotate-3 duration-100 bg-black text-white hover:bg-gray-800" href="instagram://story-camera">Share</a>
      </StepCard>

    </Container>
  );
}

export const StepCard = ({step,feature, children}) =>{
  return(
    <div className="relative cursor-pointer dark:text-white max-w-[400px] w-[90%] text-center mb-5 shadow-2xl">
    <span className="absolute top-0 left-0 w-full mt-1 ml-1 bg-indigo-500 rounded-lg dark:bg-gray-200"></span>
    <div
        className="relative p-6 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
        <div className="flex items-center justify-center gap-2">
            <span className="text-xl">Step {step} : </span>
            <h3 className="my-2 text-lg font-bold text-gray-800 dark:text-white">{feature}</h3>
        </div>
        {
          children
        }
    </div>
</div>
  )
}

export default CreateLink;
