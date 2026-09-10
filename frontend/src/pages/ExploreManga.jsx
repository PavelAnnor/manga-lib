import { useState } from "react"
import SearchBar from "../components/custom/SearchBar.jsx"
import SearchResultsContainer from "../components/custom/SearchResultsContainer.jsx"
import { searchManga } from "../util/backendAPI.js"
import SkeletonSearchResultsCard from "../components/custom/SkeletonSearchResultsCard.jsx"
export default function ExploreManga(){
    const [isLoading,setIsLoading] = useState(false)
    const [searchResults,setSearchResults] = useState(null)

    return (
      <main>
        <SearchBar
          searchFunction={searchManga}
          setIsLoading={setIsLoading}
          setSearchResults={setSearchResults}
        ></SearchBar>

        <SearchResultsContainer>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>
          <SkeletonSearchResultsCard></SkeletonSearchResultsCard>

          {searchResults !== null && searchResults.length === 0 && (
            <p>No Results</p>
          )}
        </SearchResultsContainer>
        {isLoading === true}
      </main>
    );
}