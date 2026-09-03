

import { useContext } from "react";
import { UserContext } from "../components/contextWrappers/UserContext.jsx";
import { Button } from "../components/ui/button.jsx";

import Hero from "../components/custom/Hero.jsx";
import Features from "../components/custom/Features.jsx";
import SectionWrapper from "../components/custom/SectionWrapper.jsx";
import Dashbaord from "../components/custom/Dashboard.jsx";
export default function Home({mainText,subText}) {

    const {user} = useContext(UserContext)

   
    
      return (
        <main>
          {user && <Dashbaord></Dashbaord>}
          {!user && (
            <>
              <SectionWrapper>
                <Hero mainText={mainText} subText={subText}></Hero>
              </SectionWrapper>

              <SectionWrapper>
                <Features />
              </SectionWrapper>
            </>
          )}
        </main>
      );
    

    
}