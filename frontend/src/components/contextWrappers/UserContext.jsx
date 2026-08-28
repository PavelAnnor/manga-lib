import {useState, useEffect, createContext} from "react";


export const UserContext = createContext(null);


export default function UserContextProvider(props){
  const [user, setUser] = useState(null);  //State variable to hold user data (username, id, email, etc.)
  const [mangaData, setMangaData] = useState(null); //State variable to hold manga data (title, author, chapters, etc.)

  //use effect to update the user state when the component mounts or when the user prop changes
  useEffect(() => {
    if (!user) return;

    //add the fucntionality to make a fetch request to the backend to get the user data and set it to the user state variable later
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, mangaData, setMangaData }}>
      {props.children}
    </UserContext.Provider>
  );
}