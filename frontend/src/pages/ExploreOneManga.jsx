import { Button } from "../components/ui/button.jsx";
export default function ExploreOneManga({manga}){



    return (
      <div className="  flex flex-col  items-center  h-full bg-[var(--background)] text-[var(--primary-text)] border-2 border-[var(--primary-border)] relative pt-8  pb-8 overflow-auto md:flex-row">
        <Button
          className=" bg-red-500 absolute top-3 right-3"
          type="button"
          commandFor="my-modal"
          command="close"
        >
          CLOSE
        </Button>
        <div className="flex flex-col items-center w-full  md:w-[40%] md:p-3 md:gap-2 ">
          <img
            className="aspect-[8/10]  md:w-full w-[35%]"
            src={manga.coverArt}
          ></img>
          <p className="text-sm w-full border-2 text-center">{manga.title}</p>
          <p className="text-xs  w-full  border-2 text-center">
            {manga.author}, {manga.year}
          </p>
        </div>

        <div className=" w-full md:-w[60%]">
          <p className="text-xs  p-3 w-full lg:text-base">
            {manga.description}
          </p>
          <div className="w-full pl-3 gap-2 flex">
            <Button className="bg-orange-500">Read</Button>
            <Button className="bg-blue-500">Add</Button>
          </div>
          <div className="md:flex md:flex-wrap gap-2 hidden p-3">
            {manga.tags.map((t) => (
              <Button size="sm" key={t}>{t}</Button>
            ))}
          </div>
        </div>
      </div>
    );

}


//  <div className="md: w-[30%]  md:flex md:flex-col  justify-center gap-5  items-center ">
//           <Button
//             className=" bg-red-500 absolute top-10 right-10"
//             type="button"
//             commandFor="my-modal"
//             command="close"
//           >
//             CLOSE
//           </Button>
//           <img className="w-[90%] aspect-[8/10] " src={manga.coverArt}></img>
//           <div className="flex gap-2  w-full pl-3 ">
//             <Button className="bg-orange-500">Read</Button>
//             <Button className="bg-blue-500">Add</Button>
//           </div>
//         </div>
//         <div className="w-[70%]  flex flex-col justify-center gap-2 p-4">
//           <p className="lg:text-2xl text-sm">{manga.title}</p>
//           <p className="lg:text-xl text-sm">
//             {manga.author}, {manga.year}
//           </p>
//           <p className="lg:text-lg text-xs md:text-base">{manga.description}</p>
//           
//         </div>