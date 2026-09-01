import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,

});

async function testBackendAPI() {

    try{
        const response =  await backendAPI.get("/refresh");
        console.log(response.data)
    }

    catch (error) {
       console.log(error)
       console.log(error.message)
    }

}


//function to send post request to backend api with log in recrieidntals 
async function loginUser(credentials){

  try {
    const response = await backendAPI.post("users/login-user",credentials);
    return response.data
  } catch (error) {

   
    console.log(error.message);

     //if the error is from backend, log the error and return the response
     if(error.response){
     return error.response.data;
     }
    
  }

}



async function createUser(credentials){


   try {
     const response = await backendAPI.post("users/create-user", credentials);
     return response.data;
   } catch (error) {
     console.log(error.message);

     //if the error is from backend, log the error and return the response
     if (error.response) {
       return error.response.data;
     }
   }
}






export {testBackendAPI,loginUser,createUser};