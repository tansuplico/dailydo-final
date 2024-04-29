import React from "react";

const EmptyTrashNotif = ({ deleteDark, deleteLight, theme, darkMode }) => {
  return (
    <div className="w-full h-[80%] flex flex-col flex-center text-center gap-5">
      <img
        src={darkMode && theme === "dark" ? deleteLight : deleteDark}
        alt="trash-dark"
        className="w-[5rem]"
      />
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-[1.5rem]">Your Trash List is Empty</h1>
        <p className="px-2">
          Click on "Add to Trash" to remove notes from the main notes page
        </p>
      </div>
    </div>
  );
};

export default EmptyTrashNotif;
