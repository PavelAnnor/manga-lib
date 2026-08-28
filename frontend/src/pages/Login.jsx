import FormWrapper from "../components/custom/FormWrapper.jsx";
import FormInput from "../components/custom/FormInput.jsx";

export default function Login() { 


    function validateRequired(e){
        if(e.target.value.trim() === ""){
            return "This field is required";
        }
        return "";
    }



    return (
     
        <FormWrapper>
          <form className=" flex flex-col grow p-5 justify-between gap-7">
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
          </form>
        </FormWrapper>
     
    );
   }