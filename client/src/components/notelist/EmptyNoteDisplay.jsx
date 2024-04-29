import React from "react";

import notesDark from "../../assets/notes-dark.png";
import notesLight from "../../assets/notes-light.png";

const EmptyNoteDisplay = ({
  noteSelected,
  handleNewNote,
  navigate,
  theme,
  darkMode,
}) => {
  return (
    <div className="w-full h-[80%] flex flex-col flex-center text-center gap-5">
      <img
        src={darkMode && theme === "dark" && "dark" ? notesLight : notesDark}
        alt="trash-dark"
        className="w-[5rem]"
      />
      <div className="w-full flex flex-col flex-center  gap-2">
        <h1 className="text-[1.5rem]">Your Note List is Empty</h1>
        <p className="px-2">Click on "Add Note" to add a note</p>
        <button
          className="w-max px-5 py-1 text-[#DE3163] hover:text-white border-[#DE3163] border-2 rounded-full hover:bg-[#DE3163] transition-all"
          onClick={() => {
            handleNewNote();
            navigate(`/client/notes/${noteSelected}`);
          }}
        >
          Add Node
        </button>
      </div>
    </div>
  );
};

export default EmptyNoteDisplay;
