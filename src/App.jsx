import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Container, Footer, Navbar } from "./components";

function App() {
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
