import {useState, useEffect, createContext} from "react";
import { testBackendAPI } from "../../util/backendAPI.js";


export const UserContext = createContext(null);


export default function UserContextProvider(props){
  const [user, setUser] = useState(null);  //State variable to hold user data (username, id, email, etc.)
  const [mangaData, setMangaData] = useState(null); //State variable to hold manga data (title, author, chapters, etc.)
  const [accessToken, setAccessToken] = useState(null); //State variable to hold the access token


  //use effect to update the user state when the component mounts or when the user prop changes
  useEffect(() => {

    async function fetchUserData() {
      try {
        console.log("Rnning")
        const response = await testBackendAPI();
        console.log(response)
        setUser(response.payload.user)
        setAccessToken(response.payload.accessToken)
      }
      catch(err){

      }
    }
    fetchUserData()

    if (!user) {
      setAccessToken(null);
      return;
    }
    

    //add the fucntionality to make a fetch request to the backend to get the user data and set it to the user state variable later
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, mangaData, setMangaData, accessToken, setAccessToken }}>
      {props.children}
    </UserContext.Provider>
  );
}