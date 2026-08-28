
import { ThemeContext } from "../contextWrappers/ThemeContext.jsx";
import { Button } from "../ui/button.jsx";
import { useContext } from "react";

export default function Hero({mainText,subText}){

    const { theme } = useContext(ThemeContext);

    return (
      <main className="w-[100%] flex aspect-6/3">
        <section className=" h-full w-45/100 items-center  text-[var(--primary-text)] flex p-5 md:p-7">
          <div className="">
            <h1 className="text-3xl  md:text-3xl lg:text-5xl mb-3 xl:text-6xl ">
              {mainText}
            </h1>
            <h2 className="text-xs  md:text-sm lg:text-xl mb-5 text-[var(--secondary-text)]">
              {subText}
            </h2>
            <Button
              size="lg"
              className="bg-[#04047f] border-[var(--primary-border)]"
            >
              Get Started
            </Button>
          </div>
        </section>

        <section className="h-full w-55/100 flex  z-4">
          {theme === "dark-mode" && (
            <img src="./hero-image(dark).png" className="w-full "></img>
          )}

          {theme === "light-mode" && (
            <img src="./hero-image(light).png" className="w-full "></img>
          )}
        </section>
      </main>
    );

}