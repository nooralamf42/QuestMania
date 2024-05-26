import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Home } from "../../pages";

function Protected({ children}) {
  const user = useSelector(data=>data.user)
  console.log(user)
  const navigate = useNavigate()
  if (user) 
    return <Home/>
  else return <>{children}</>
}

export default Protected;
