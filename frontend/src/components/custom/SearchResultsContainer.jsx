export default function SearchResultsContainer(props){


    return (
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-[98%] m-auto mt-10 gap-4 p-2">
        {props.children}
      </div>
    );
}