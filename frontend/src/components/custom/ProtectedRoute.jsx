import { useNavigate } from "react-router"
import { useContext,useEffect } from "react"
import { UserContext } from "../contextWrappers/UserContext.jsx"
export default function ProtectedRoute(props){


    const {user} = useContext(UserContext)
    const navi = useNavigate()

    //If Not logged in force them out
    useEffect(

        ()=>{
             if (!user) {
               navi("/");
             }

        }


    )





    return(

        <>
        {props.children}
        
        </>
    )
}