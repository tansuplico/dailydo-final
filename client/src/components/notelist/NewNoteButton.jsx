import React from "react";

const NewNoteButton = ({ noteSelected, addNote, navigate, handleNewNote }) => {
  return (
    <div className="flex flex-center py-5 md:py-0 col-span-1">
      <div
        className="h-max px-2 hover:bg-gray-200 text-gray-400 rounded-lg cursor-pointer"
        onClick={() => {
          handleNewNote();
        }}
      >
        <h1 className="w-full flex items-center gap-2">
          <span className="text-[1.4rem]"> + </span>
          New Note
        </h1>
      </div>
    </div>
  );
};

export default NewNoteButton;
