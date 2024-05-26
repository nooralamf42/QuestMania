import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Loading, Navbar } from "./components";
import {useSelector, useDispatch} from 'react-redux'
import { checkLogin, setMessages } from "./redux/appSlice";
import { auth, readMesseges } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const fetchingData = useSelector(pre=>pre.fetchingData)
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user)
        {
          readMesseges(user.uid).then((messages)=>dispatch(setMessages(messages))).then(()=>dispatch(checkLogin(user)))
        }
        
      else dispatch(checkLogin(null))
    })
  }, [])
  if(fetchingData) return <Loading/>
  return (   
    <>
      <ToastContainer
      position="bottom-center" autoClose='1000'
      />
      <header className="shadow bg-gray-200 bg-opacity-40">
       <Navbar/>
      </header>
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
