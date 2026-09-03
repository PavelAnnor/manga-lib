
import {Button} from "../ui/button.jsx"
import {Switch} from "../ui/switch.jsx"
import {Link} from "react-router"

import {useContext,useEffect} from "react";
import {ThemeContext} from "../contextWrappers/ThemeContext.jsx";
import {UserContext} from "../contextWrappers/UserContext.jsx";

import { logoutUser } from "../../util/backendAPI.js";




export default function Navbar({links}){




    async function handleLogOut(){

      const response = await logoutUser()
     
      if(response.success){
        setUser(null);
        return
      }

      else{
        return
      }
     
    }
   

    const {user,setUser} = useContext(UserContext);
    const {theme, setTheme} = useContext(ThemeContext);


    return (
      <nav
        className="w-full md:h-18 h-12 bg-[var(--navbar-bg)] border-1 border border-[var(--primary-border)] flex pl-10 pr-10 justify-between mb-10"
        role="navigation"
        aria-label="Main"
      >
        <div className="h-full flex items-center text-[var(--primary-text)]  gap-5 ">
          <Link to="/">
            <p className="md:text-2xl text-lg text-[#0404fa]">Manga Lib</p>
          </Link>
          <div className="flex gap-4 ">
            {links.map((l) => (
              <Link to={l.href} key={l.href}>
                <p className="  border-blue-500 md:text-sm text-xs hover:text-blue-500 hover:border-b-2">
                  {l.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="h-full flex items-center text-[var(--primary-text)] gap-10 items-center">
          {!user && (
            <div className="gap-3 flex">
              <Link to="/login">
                <Button
                  size=""
                  className="bg-[#48047f] border border-[var(--primary-border)]"
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  size=""
                  className="bg-[#48047f] border border-[var(--primary-border)]"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <>
              <p className="md:text-sm text-xs">Welcome {user.username}</p>
              
            </>
          )}

          <div className="flex gap-3 items-center">
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200"
              onCheckedChange={() => {
                setTheme(theme === "dark-mode" ? "light-mode" : "dark-mode");
              }}
            ></Switch>
            <p className="  md:text-sm text-xs">
              {theme === "dark-mode" ? "Dark" : "Light"}
            </p>
            {user && (
              <Button
                size=""
                className="bg-[#48047f] border border-[var(--primary-border)]"
                onClick = {handleLogOut}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    );



}