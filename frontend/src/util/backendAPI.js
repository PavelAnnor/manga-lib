import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

async function testBackendAPI() {

    try{
        const response =  await backendAPI.get("/test");
        console.log(response.data)
    }

    catch (error) {
       console.log(error)
       console.log(error.message)
    }

}



export {testBackendAPI};