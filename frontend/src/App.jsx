import {Routes, Route} from "react-router"

//Component Imports
import Navbar from "./components/custom/Navbar.jsx";

//Page Imports
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


import {navbarLinks} from "./data/navbarLinks.js"
export default function App(){


  return (
    <>
      <Navbar links={navbarLinks}></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              mainText="Your Second Brain"
              subText="Create libraries, notes, and track progress, all in one
                centralized application."
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route path = "/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}