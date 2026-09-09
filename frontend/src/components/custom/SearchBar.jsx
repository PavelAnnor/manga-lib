import { BookSearch } from "lucide-react";
import { Button } from "../ui/button.jsx";
export default function SearchBar() {



    function handleSubmit(){

    }
  return (
    <div className="w-[70%] border-1 flex h-[70px] m-auto rounded border-[var(--primary-border)]">
      <div className="w-[10%] md:w-[7%] flex items-center justify-center p-1 md:p-3">
        <BookSearch className="h-full w-full text-[var(--primary-text)]"></BookSearch>
      </div>

      <form className="w-[80%] h-full">
        <input
          className="w-full h-full p-1 focus:outline-none text-[var(--primary-text)]"
          placeholder="EX: Bleach"
        ></input>
      </form>
      <div className="flex grow items-center pl-3 pr-3">
        <Button size="lg" className="grow bg-[blue]" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
}
