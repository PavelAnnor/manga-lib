import FormWrapper from "../components/custom/FormWrapper.jsx";
import FormInput from "../components/custom/FormInput.jsx";
import { useState,useContext } from "react";


import {UserContext} from "../components/contextWrappers/UserContext.jsx";

import {Button }from "../components/ui/Button.jsx";


import { loginUser,testBackendAPI } from "../util/backendAPI.js";

export default function Login() { 
  const { setUser } = useContext(UserContext);

  const [feedback, setfeedback] = useState("");


    function validateRequired(e){
        if(e.target.value.trim() === ""){
            return "This field is required";
        }
        return "";
    }

    async function handleSubmit(e){
        e.preventDefault();
         const formData = new FormData(e.target);
         const formValues = Object.fromEntries(formData.entries());

         // Check if username or password is empty and provide feedback
         if(!formValues.username || !formValues.password){
             setfeedback("Please fill in all fields");
             return;
         }

         //if everythign is good, send the log in request 
         const response = await loginUser(formValues)


         //if the login request failed, tell the user and log the error
         if(!response.success){
          console.log(response.error)
          setfeedback(response.message);
          return;
         }
         setfeedback("")
         setUser(response.payload.user);
         return
       

        
         


         
        
    }



   

    return (
      <FormWrapper>
        <form
          className=" flex flex-col grow p-5 justify-between gap-7"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="text"
            name="username"
            placeholder="Username or Email"
            validate={validateRequired}
          ></FormInput>

          <FormInput
            type="text"
            name="password"
            placeholder="Password"
            validate={validateRequired}
          ></FormInput>

          <Button className="bg-[#A00CF3]" type="submit">
            Register
          </Button>
          {feedback && (
            <h3 className="text-red-500 text-center ">{feedback}</h3>
          )}
        </form>
       
      </FormWrapper>
    );
   }