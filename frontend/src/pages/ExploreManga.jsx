import { useState } from "react"
import SearchBar from "../components/custom/SearchBar.jsx"
import SearchResultsContainer from "../components/custom/SearchResultsContainer.jsx"
import { searchManga } from "../util/backendAPI.js"
import SkeletonSearchResultsCard from "../components/custom/SkeletonSearchResultsCard.jsx"
import SearchResultsCard from "../components/custom/SearchResultsCard.jsx"
import ExploreOneManga from "./ExploreOneManga.jsx"
export default function ExploreManga(){
    const [isLoading,setIsLoading] = useState(false)
    const [searchResults,setSearchResults] = useState(null)
    const [selectedManga, setSelectedManga] = useState(null)

    return (
      <main>
        <SearchBar
          searchFunction={searchManga}
          setIsLoading={setIsLoading}
          setSearchResults={setSearchResults}
        ></SearchBar>

        <SearchResultsContainer>
          {isLoading &&
            [0, 1, 2, 3, 4, 6].map((m) => (
              <SkeletonSearchResultsCard
                key={m * Math.random()}
              ></SkeletonSearchResultsCard>
            ))}

          {searchResults !== null && searchResults.length === 0 && (
            <p className="text-[var(--primary-text)] text-center text-3xl w-full col-span-full">
              No Results Found...
            </p>
          )}

          {searchResults !== null &&
            searchResults.length > 0 &&
            searchResults.map((s) => (
              <SearchResultsCard
                manga={s}
                key={s.mangaDexId}
                setSelectedManga = {setSelectedManga}
              ></SearchResultsCard>
            ))}

          <dialog id="explore-modal">
            {selectedManga && <ExploreOneManga manga={selectedManga} />}
          </dialog>
        </SearchResultsContainer>
      </main>
    );
}