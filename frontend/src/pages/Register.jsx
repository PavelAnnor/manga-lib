import FormWrapper from "../components/custom/FormWrapper.jsx";
import FormInput from "../components/custom/FormInput.jsx";

import {Button }from "../components/ui/Button.jsx";

import { useState } from "react";

export default function Register() {


    // State to track the validity of each input field
    const [valid, setValid] = useState({
      fName: false,
      lName: false,
      username: false,
      email: false,
      password: false,
    });

    // Message to be displayed to provide feedback on registration attempts to track feedback messages for the user
     const [feedback, setfeedback] = useState("");


    function handleSubmit(e) {
      e.preventDefault();

      //check if one of them is false, abort the Registration attempt if so
      for (let x in valid) {
        if (!valid[x]) {
          setfeedback("Issue With One or More Fields");
          return;
        }
      }
      //Put the form data in an object I can send to backend
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
      console.log(formValues);
    }

    // Validation functions for each name field, checking just to make sure they are not empty
    function validateName(e){  
        const name = e.target.name; 
        if (e.target.value === ""){
        setValid((valid)=>({...valid, [name]:false}))
       return "Name is Required";
    } 
      setValid((valid) => ({ ...valid, [name]: true }));
    }


    // Validation function for the username field, checking for length and emptiness
  function validateUsername(e) {
    const name = e.target.name;
    if (e.target.value === "") {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Username is Required";
    }
    if (e.target.value.length < 4) {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Username Must be Greater Than 4 Characters";
    }
    if (e.target.value.length > 20) {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Username Must be Less Than 20 Characters";
    }

    setValid((valid) => ({ ...valid, [name]: true }));
    return "";
  }

  // Validation function for the email field, checking for emptiness and a valid email format
  function validateEmail(e) {
    const name = e.target.name;
    if (e.target.value === "") {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Email is Required";
    }

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(e.target.value)) {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Invalid email address";
    }

    setValid((valid) => ({ ...valid, [name]: true }));
    return "";
  }

  // Validation function for the password field, checking for emptiness, length, and if it contains the word "password"
  function validatePassword(e) {

    const name = e.target.name;
    

    if (e.target.value === "") {
     setValid((valid) => ({ ...valid, [name]: false }));
      return "Password is Required";
    }
    if (e.target.value.length <= 8) {
      setValid((valid) => ({ ...valid, [name]: false }));
      return "Password Must be 8 Characters or More";
    }
    const regex = /password/i;
    if (regex.test(e.target.value)) {
        
    //   setValid((valid) => ({ ...valid, password: false }));
      setValid((valid)=> ({...valid,[name]:false}))
      return "Password can't contain the word 'password'";
    }

    setValid((valid) => ({ ...valid, [name]: true }));
    return "";
  }




    return (
      <FormWrapper>
        <form
          className=" flex flex-col grow p-5 justify-between gap-7"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="text"
            name="fName"
            placeholder="First Name"
            validate={validateName}
          ></FormInput>

          <FormInput
            type="text"
            name="lName"
            placeholder="Last Name"
            validate={validateName}
          ></FormInput>

          <FormInput
            type="text"
            name="username"
            placeholder="Username"
            validate={validateUsername}
          ></FormInput>

          <FormInput
            type="text"
            name="email"
            placeholder="Email"
            validate={validateEmail}
          ></FormInput>

          <FormInput
            type="text"
            name="password"
            placeholder="Password"
            validate={validatePassword}
          ></FormInput>

          <Button className="bg-[#A00CF3]" type="submit">
            Register
          </Button>
        </form>
        {feedback && <h3 className="text-red-500 text-center ">{feedback}</h3>}
      </FormWrapper>
    );

}
