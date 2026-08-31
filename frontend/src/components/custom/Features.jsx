
import FeaturesCard from "./FeaturesCard.jsx";
const features = [
  {
    imgSrc: "/users.png",
    label: "Account Creation & Login",
    desc: "Create an account and log in to access your personal library and saved documents anytime.",
  },
  {
    imgSrc: "/book.png",
    label: "Library Creation",
    desc: "Add various official and fanmade titles to your library, to keep track of what you're reading.",
  },
  {
    imgSrc: "/pen.png",
    label: "Generate Documents",
    desc: "Create, edit, and delete a variety of note-taking documents, including chapter summaries, volume notes, compendiums, and personal thoughts.",
  },
  {
    imgSrc: "/magnifying-glass.png",
    label: "Discover New Titles",
    desc: "Discover various mangas, light novels, and anime to watch with MangaLibs search features.",
  },
];

export default function Features() {


    return (
      <main className="w-full p-5 md:p-7 mt-20">
        <h1 className="text-3xl  md:text-3xl lg:text-5xl mb-3 xl:text-6xl text-[blue]  ">
          Features
        </h1>
        <h2 className="text-xs  md:text-sm lg:text-xl mb-5 text-[var(--secondary-text)] ">
          Explore All You Can Do with MangaLib
        </h2>

        <section className="grid grid-cols-4 gap-4">
            {features.map( f=> <FeaturesCard imgSrc={f.imgSrc} label={f.label} desc= {f.desc}></FeaturesCard>)}
        </section>
      </main>
    );
}