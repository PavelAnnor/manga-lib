import {createContext, useState,useEffect} from "react";

export const ThemeContext = createContext(null);

//Wrapper context provider component to provide theme context to the entire application
export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("dark-mode");



  //Use effect to update the theme state when the component mounts or when the theme state variable changes
  useEffect(() => {

    switch (theme) {

      case "dark-mode":
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        break;
      case "light-mode":
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        break;
      default:
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}