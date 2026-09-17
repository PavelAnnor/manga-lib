import { Button } from "../components/ui/button.jsx";
import {Link} from "react-router"


export default function ExploreOneManga({manga}){


    const mangaDexLink = `https://mangadex.org/title/${manga.mangaDexId}`;



    return (
      <div className="  flex flex-col  items-center  h-full bg-[var(--background)] text-[var(--primary-text)] border-2 border-[var(--primary-border)] relative pt-8  pb-8 overflow-auto md:flex-row">
        <Button
          className=" bg-red-500 absolute top-3 right-3"
          type="button"
          commandFor="explore-modal"
          command="close"
        >
          CLOSE
        </Button>
        <div className="flex flex-col items-center w-full  md:w-[40%] md:p-3 lg:p-5 md:gap-2 ">
          <img
            className="aspect-[8/10]  md:w-full w-[35%]"
            src={manga.coverArt}
          ></img>
          <p className="text-sm w-full  text-center md:text-base lg:text-xl">
            {manga.title}
          </p>
          <p className="text-xs  w-full  text-center md:text-xs lg:text-base">
            {manga.author}, {manga.year}
          </p>
        </div>

        <div className=" w-full md:-w[60%]">
          <p className="text-xs  p-3 w-full lg:text-base">
            {manga.description}
          </p>
          <div className="w-full pl-3 gap-2 flex">
            <Link to = {mangaDexLink} target="_blank">
              <Button className="bg-orange-500">Read</Button>
            </Link>
            <Button className="bg-blue-500">Add</Button>
          </div>
          <div className="md:flex md:flex-wrap gap-2 hidden p-3">
            {manga.tags.map((t) => (
              <Button size="sm" key={t}>
                {t}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );

}

