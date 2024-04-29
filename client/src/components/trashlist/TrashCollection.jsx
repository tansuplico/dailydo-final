import React from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const TrashCollection = ({
  note,
  i,
  trashSelected,
  setTrashSelected,
  theme,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full md:h-max flex justify-center items-start col-span-1"
      key={i}
    >
      <div
        className={`w-full md:w-[90%] h-max md:h-[16rem]  ${
          trashSelected === note.id ? "bg-[#DC143C]" : "bg-[#DE3163]"
        } border-2 text-white p-5 rounded-md flex flex-col gap-5 cursor-pointer group transition-all duration-500 relative overflow-hidden`}
        onClick={() => {
          navigate(`/client/trash/${note.id}`);
          setTrashSelected(note.id);
        }}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="w-full text-[1.4rem] z-20 truncate border-b">
            {note.title ? note.title : "Untitled"}
          </h1>
        </div>
        <div className="w-full h-[6.8rem] md:h-[12rem] z-20 overflow-hidden md:overflow-none">
          <div className="w-full line-clamp-6 whitespace-pre-line">
            {note.content ? parse(note.content) : "Start typing"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrashCollection;
