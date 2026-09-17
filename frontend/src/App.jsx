import {Routes, Route} from "react-router"

//Component Imports
import Navbar from "./components/custom/Navbar.jsx";
import ProtectedRoute from "./components/custom/ProtectedRoute.jsx";

//Page Imports
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ExploreManga from "./pages/ExploreManga.jsx";
import ExploreOneManga from "./pages/ExploreOneManga.jsx";


import {navbarLinks} from "./data/navbarLinks.js"
import EditNotes from "./pages/EditNotes.jsx";
export default function App(){


  return (
    <>
      <Navbar links={navbarLinks}></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              mainText="Your Second Brain"
              subText="Create libraries, notes, and track progress, all in one
                centralized application."
            />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/explore-manga"
          element={
            <ProtectedRoute>
              <ExploreManga />
            </ProtectedRoute>
          }
        ></Route>

        <Route path = "/notes" element = {<EditNotes/>}></Route>
       
      </Routes>
    </>
  );
}