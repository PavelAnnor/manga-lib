import axios from "axios";


let accessToken;

function setToken(token){
  accessToken = token
}

const backendAPINoToken = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,

});

const backendAPIWithToken = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

backendAPIWithToken.interceptors.response.use(
  (response)=>{




 
  return response
}
,
(error)=>{

  if(error.response){
  console.log(error.response)
  console.log(error.response.data)
  // console.log(error.response.data);
  }



})

async function refreshCycle() {

    try {
      const response = await backendAPINoToken.get("/refresh/refresh-cycle");
      // setToken(response.data.payload.accessToken);
      setToken("ahhaha");

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
    const response = await backendAPINoToken.post("/users/login-user",credentials);
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
     const response = await backendAPINoToken.post("/users/create-user", credentials);
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
     const response = await backendAPINoToken.post("/users/logout-user", {});
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
    
    const response = await backendAPIWithToken.get(
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






export { loginUser, createUser, logoutUser, refreshCycle, searchManga,setToken };