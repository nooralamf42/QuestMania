import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(data=>data.user)
  console.log(user)
  const navigate = useNavigate()
  if (user) 
    navigate('/')
  else return <>{children}</>
}

export default Protected;
