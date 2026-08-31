import FormWrapper from "../components/custom/FormWrapper.jsx";
import FormInput from "../components/custom/FormInput.jsx";
import { useState } from "react";

import {Button }from "../components/ui/Button.jsx";

export default function Login() { 

  const [feedback, setfeedback] = useState("");


    function validateRequired(e){
        if(e.target.value.trim() === ""){
            return "This field is required";
        }
        return "";
    }

    function handleSubmit(e){
        e.preventDefault();
         const formData = new FormData(e.target);
         const formValues = Object.fromEntries(formData.entries());

         // Check if username or password is empty and provide feedback
         if(!formValues.username || !formValues.password){
             setfeedback("Please fill in all fields");
             return;
         }


         
         console.log(formValues);
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