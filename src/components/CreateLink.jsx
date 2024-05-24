import React from "react";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

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
    <div>
      <span className="mr-3">{url+uid}</span>
      <button className="rounded-lg px-4 py-2 bg-black text-white hover:bg-gray-800" onClick={clickHandlder}>Click here to copy</button>
      <h1 className="mt-3 text-xl">Share this link with friends to start !</h1>
    </div>
  );
}

export default CreateLink;
