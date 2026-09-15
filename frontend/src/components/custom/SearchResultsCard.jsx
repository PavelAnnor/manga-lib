
import { Button } from "../ui/button.jsx";
import {Link} from "react-router"
import ExploreOneManga from "../../pages/ExploreOneManga.jsx";
export default function SearchResultsCard({manga,setSelectedManga}){

  const link = `./manga/${manga.mangaDexId}`

    return (
      // <Link to = "./manga/sdfsdfsdf" >
      <div className="col-span-1 flex flex-col justify-center gap-2 text-[var(--primary-text)]">
        <img
          className="w-full bg-[#1c1c1c] rounded-xl aspect-[7/10] grow-1"
          src={manga.coverArt}
        />

        <div className="flex-col ">
          <p className=" text-sm font-medium">{manga.title}</p>

          <div className="flex gap-1  text-sm text-[var(--secondary-text)]">
            <p className="">{manga.author},</p>
            <p className="">{manga.year}</p>
          </div>
          <Button command = "show-modal" commandFor = "my-modal" onClick = {()=>{setSelectedManga(manga)}} className="bg-red-600" size="sm">Expand</Button>
        </div>

       
       
      </div>
     
    );
}