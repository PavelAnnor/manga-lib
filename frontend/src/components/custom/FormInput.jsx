import { useState } from "react";

export default function FormInput({ type, name, placeholder, validate }) {




    //Feedback Message to be displayed to the user if the input is invalid

     const [message, setMessage] = useState("");

     //Function to handle the onBlur event of the input field 
     // validates when the user clicks out of the input field and sets the message to the return value of the validate function
       function handleBlur(e) {
         e.preventDefault();
         setMessage(validate(e));
       }

        //Function to handle the onChange event of the input field 
        // validates everytime the user types in the input field and sets the message to the return value of the validate function
       function handleChange(e) {
         if (message) {
           setMessage(validate(e));
         }
       }


        return (
          <div className="w-full">
            <input
              placeholder={placeholder}
              onBlur={handleBlur}
              onChange={handleChange}
              type={type}
              className="border-b-2 p-3 pl-0 focus:outline-none focus:border-[#A00CF3] w-full border-[var(--primary-border)] text-[var(--primary-text)] bg-transparent"
              name={name}
            ></input>
            {message && <p className="text-xs mt-2 text-red-600">{message}</p>}
          </div>
        ); 


}