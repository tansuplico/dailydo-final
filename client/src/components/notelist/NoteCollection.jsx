import React, { useEffect } from "react";

import editLight from "../../assets/edit-light.png";
import editDark from "../../assets/edit-dark.png";

import saveLight from "../../assets/save-light.png";
import saveDark from "../../assets/save-dark.png";

import parse from "html-react-parser";

// Backend
import axios from "axios";

const NoteCollection = ({
  note,
  createTitleMode,
  noteSelected,
  setNoteSelected,
  falseTitleMode,
  handleTitleMode,
  navigate,
  titleChange,
  setFetchData,
  theme,
}) => {
  const handleTitleInput = () => {
    axios
      .post(
        `http://localhost:3000/client/notes/${noteSelected}/title-change`,
        { title: note.title },
        { withCredentials: true }
      )
      .then((res) => {
        setFetchData((val) => !val);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full md:h-max  flex justify-center items-start col-span-1">
      <div
        className={`w-full md:w-[90%] h-[10rem] md:h-[16rem] border-2 bg-[#DE3163] dark:bg-[#242124] text-white p-3 md:p-5 rounded-md flex flex-center flex-col gap-5 cursor-pointer group transition-all duration-500 relative overflow-hidden`}
        onClick={() => {
          navigate(`/client/notes/${note.id}`);
          setNoteSelected(note.id);
        }}
      >
        {createTitleMode && note.id === noteSelected ? (
          <div className="w-full flex justify-between items-center z-20">
            <input
              className="w-full bg-transparent h-[2rem] truncate outline-none resize-none border-b"
              value={note.title}
              onChange={(e) => {
                titleChange(note.id, e.target.value);
              }}
              maxLength={30}
            />
            <img
              src={saveLight}
              alt="save-light"
              className="w-[15px]"
              onClick={() => {
                falseTitleMode();
                handleTitleInput();
              }}
            />
          </div>
        ) : (
          <div className="w-full flex items-center justify-between z-20">
            <h1 className="w-full text-[1.4rem] z-20 truncate border-b">
              {note.title ? note.title : "Untitled"}
            </h1>

            <img
              src={editLight}
              alt="edit-title"
              className="w-[20px] "
              onClick={() => {
                handleTitleMode(note.id);
              }}
            />
          </div>
        )}

        <div className="w-full h-[6.8rem] md:h-[12rem] z-20 overflow-hidden md:overflow-none">
          <div className="w-full line-clamp-6 whitespace-pre-line">
            {parse(note.content) ? parse(note.content) : "Start typing"}
          </div>
        </div>

        <div
          className={`absolute bg-[#FF004F] z-5 w-2 h-2 ${
            note.id === noteSelected ? "scale-[99]" : "scale-[0]"
          } rounded-full transition-all`}
        ></div>
      </div>
    </div>
  );
};

export default NoteCollection;
