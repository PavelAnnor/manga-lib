
import { ThemeContext } from "../components/contextWrappers/ThemeContext";

import { useContext } from "react";
import { Button } from "../components/ui/button";

import Hero from "../components/custom/Hero.jsx";
import Features from "../components/custom/Features.jsx";
import SectionWrapper from "../components/custom/SectionWrapper.jsx";
export default function Landing({mainText,subText}) {

    const {theme} = useContext(ThemeContext)

    return (
      <main>
        <SectionWrapper>
          <Hero mainText={mainText} subText={subText}></Hero>
        </SectionWrapper>

        <SectionWrapper>
          <Features />
        </SectionWrapper>
      </main>
    );
}