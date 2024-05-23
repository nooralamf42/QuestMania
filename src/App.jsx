import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Loading, Navbar } from "./components";
import {useSelector, useDispatch} from 'react-redux'
import { checkLogin } from "./redux/appSlice";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch()
  const fetchingData = useSelector(pre=>pre.fetchingData)
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user)
        dispatch(checkLogin(true))
      else dispatch(checkLogin(false))
    })
  }, [])

  if(fetchingData) return <Loading/>
  else console.log(fetchingData)
  return (   
    <>
      <header className="shadow bg-gray-200 bg-opacity-40">
       <Navbar/>
      </header>
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
