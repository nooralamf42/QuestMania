import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Container } from "./components";

function App() {
  return (
    <>
      <header className="bg-gray-200">
        <nav className="flex justify-between items-center px-5 py-3">
          <Link to={"/"}>QuestMania</Link>
          <ul className="flex gap-2 justify-center items-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Container><Outlet /></Container>
      <footer>footer here</footer>
    </>
  );
}

export default App;
