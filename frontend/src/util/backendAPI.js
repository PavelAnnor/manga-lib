import { createAuthRefresh } from "axios-auth-refresh";
import axios from "axios";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";


function refreshLogic(failedRequest) {
  console.log("Attempting refresh");
  const authenticateError = failedRequest.response.headers["www-authenticate"];

  // If the issue isn't the access token, skip
  if (!authenticateError) {
    return Promise.resolve();
  }

  return refreshCycle()
    .then((response) => {
      console.log(response.payload);
      setToken(response.payload.accessToken);

      // This is the important part: update the failed request's
      // auth header so the retry actually uses the new token
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + response.payload.accessToken;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

let accessToken;

function setToken(token){
  accessToken = token
}

const backendAPI = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,

});

//use the auth refresh library to inject the interceptor
createAuthRefresh(backendAPI, refreshLogic);



async function refreshCycle() {

    try {
      const response = await backendAPI.get("/refresh/refresh-cycle");

      setToken(response.data.payload.accessToken);
      

      return response.data;
    } catch (error) {
      //if the error is from backend, log the error and return the response
      if (error.response) {
        return error.response.data;
       
      }

      console.log(error);
      console.log(error.message);
    }

}


//function to send post request to backend api with log in recrieidntals 
async function loginUser(credentials){

  try {
    const response = await backendAPI.post("/users/login-user", credentials, {
      skipAuthRefresh: true,
    });
    return response.data
  } catch (error) {

   
    console.log(error.message);

     //if the error is from backend, log the error and return the response
     if(error.response){
     return error.response.data;
     }


     return {
      success: false,
          message: "Network Error",
          payload: null,
          error: error.message}
   
    
  }

}



async function createUser(credentials){


   try {
     const response = await backendAPI.post("/users/create-user", credentials, {
       skipAuthRefresh: true,
     });
     return response.data;
   } catch (error) {
     console.log(error.message);

     //if the error is from backend, log the error and return the response
     if (error.response) {
       return error.response.data;
     }

     //If its here (or backend isnt running properly)
     return {
      success: false,
          message: "Network Error",
          payload: null,
          error: error.message}
   }
}



async function logoutUser(){


   try {
    //attempt a logout post request with emoty body
     const response = await backendAPI.post(
       "/users/logout-user",
       {},
       { skipAuthRefresh: true },
     );
     return response.data;
   } catch (error) {
     console.log(error.message);

     //if the error is from backend, log the error and return the response
     if (error.response) {
       return error.response.data;
     }

     //If its here (or backend isnt running properly)
     return {
       success: false,
       message: "Network Error",
       payload: null,
       error: error.message,
     };
   }

}


//function to send request to bakcend to query mangaDex api for manga
async function searchManga(keyword){


  try {
    
    const response = await backendAPI.get(
      `/mangaDexAPI/search-manga/${keyword}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      },
    );
     return response.data;
    
  } catch (error) {
      console.log(error.message);


       if (error.response) {
         return error.response.data;
       }

       //If its here (or backend isnt running properly)
       return {
         success: false,
         message: "Network Error",
         payload: null,
         error: error.message,
       };
    
  }
}


async function addManga(mangaData) {
  try {

    const response = await backendAPI.post(
      "/mangaSubmissions/add-manga-submission",mangaData
    );

     return response.data;
    
  } catch (error) {

     console.log(error.message);

     if (error.response) {
       return error.response.data;
     }

     //If its here (or backend isnt running properly)
     return {
       success: false,
       message: "Network Error",
       payload: null,
       error: error.message,
     };
    
  }
  
}

async function getMangaData(credentials) {
  
  try {

    const response = await backendAPI.get("/")
     return response.data;
    
  } catch (error) {

      if (error.response) {
        return error.response.data;
      }

      //If its here (or backend isnt running properly)
      return {
        success: false,
        message: "Network Error",
        payload: null,
        error: error.message,
      };
    
  }
}


function useAddMangaSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => addManga(params),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["mangaSubmissions"] }),
  });
}

function useMangaSubmissions(params) {
  return useQuery({
    queryKey: ["mangaSubmissions", params],
    queryFn: () => getMangaData(params),
  });
}




export { loginUser, createUser, logoutUser, refreshCycle, searchManga,setToken,useAddMangaSubmission};