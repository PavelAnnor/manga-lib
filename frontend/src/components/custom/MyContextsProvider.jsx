
import {ThemeContext} from "../contextWrappers/ThemeContext.jsx";
import {UserContext} from "../contextWrappers/UserContext.jsx";


import ThemeContextProvider from "../contextWrappers/ThemeContext.jsx";
import UserContextProvider from "../contextWrappers/UserContext.jsx";


export default function MyContextsProvider(props) {
  return (
   <UserContextProvider>
      <ThemeContextProvider>
        {props.children}
      </ThemeContextProvider>
    </UserContextProvider>
  );
}