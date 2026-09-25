import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Button } from "../components/ui/button";
import { useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function EditNotes() {
  const [notesContent, setNotesContent] = useState({notesTitle:"", notesContent:"",new:true});

  async function saveNotes() {
    console.log(notesContent);
  }

  //React quill has a special function for on change with special paramters
  function handleContentChange(content, delta, source, editor) {
    setNotesContent({ ...notesContent, notesContent: content, new:false });
  }

  function clearNotes(){
    setNotesContent({ notesTitle: "", notesContent: "", new: true });
  }
  return (
    <main className="p-4 text-[var(--primary-text)] flex gap-2 relative">
      <div className="w-full lg:w-[70%] ">
        <div className="w-full bg-blue-600 lg:h-35 h-25 mb-5 flex flex-col justify-center p-3 border-1 border-[var(--primary-border)]">
          <p className="text-xl"> Title</p>
          <p className="text-lg">Chapter 1</p>
        </div>
        <ReactQuill
          className="mb-5"
          size="lg"
          onChange={handleContentChange}
          value={notesContent.notesContent}
        ></ReactQuill>
        <Button
          className="mr-2"
          type="button"
          commandFor="title-modal"
          command="show-modal"
        >
          Save
        </Button>
        <Button onClick= {clearNotes}>Clear</Button>
        <div className="mt-3 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open Documents
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Chapter 1</DropdownMenuItem>
                <DropdownMenuItem>Chapter 2</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden lg:block lg:w-[30%] ">
        <div className="w-full bg-red-400 h-35 mb-5 flex">
          <img
            src="books.jpg"
            className="w-full h-full border-1 border-[var(--primary-border)]"
          ></img>
        </div>
        <div className="bg-green-300">
          
        </div>
      </div>

      <dialog id="title-modal" className="">
        <div className="bg-[var(--background)]  w-full text-[var(--primary-text)] border-2 border-[var(--primary-border)] p-5 ">
          <p className="text-base mb-2">Save Document</p>
          <form className="w-full ">
            <input
              placeholder="Document Title"
              className="w-full text-base p-2 border-2 focus:border-purple-500"
              onChange={(e) =>
                setNotesContent({ ...notesContent, notesTitle: e.target.value })
              }
            ></input>
          </form>
          <Button className="mt-7 mr-2 bg-blue-500" onClick={saveNotes}>
            Save
          </Button>
          <Button
            commandFor="title-modal"
            command="close"
            className="bg-red-500"
          >
            Cancel
          </Button>
        </div>
      </dialog>
    </main>
  );
}
