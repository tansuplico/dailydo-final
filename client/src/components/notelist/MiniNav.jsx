import React from "react";
import { Tooltip } from "react-tooltip";
import starFav from "../../assets/star-fav.png";
import starUnFav from "../../assets/star-notfav-dark.png";
import starUnFavLight from "../../assets/star-notfav-light.png";

import deleteDark from "../../assets/delete-dark.png";
import deleteLight from "../../assets/delete-light.png";

const MiniNav = ({
  note,

  addedNotfy,
  deletedNotfy,
  addedToTrash,
  handleTrashNote,
  handleNoteFavorite,
  theme,
}) => {
  return (
    <div className="px-4 py-3 border-[#ccc] border border-b-0 flex justify-between">
      <strong className="poppins-semibold cursor-pointer ">
        Daily<span className="text-[#DE3163]">Do.</span>com
      </strong>

      <div className="flex gap-3">
        <img
          src={
            note.isFavorite
              ? starFav
              : theme === "dark"
              ? starUnFavLight
              : starUnFav
          }
          alt="more-dark"
          data-tooltip-id="star"
          data-tooltip-content="Favorites"
          className={`${
            note.isFavorite ? "w-[25px]" : "w-[25px] "
          } cursor-pointer`}
          onClick={() => {
            handleNoteFavorite(note.id);
            note.isFavorite ? deletedNotfy() : addedNotfy();
          }}
        />
        <Tooltip
          id="star"
          place="bottom"
          style={{ backgroundColor: "#DE3163" }}
          className="ave-padding"
        />
        <img
          src={theme === "dark" ? deleteLight : deleteDark}
          alt="more-dark"
          data-tooltip-id="trash"
          data-tooltip-content="Trash"
          className="w-[25px] cursor-pointer"
          onClick={() => {
            handleTrashNote(note.id);
            addedToTrash();
          }}
        />
        <Tooltip
          id="trash"
          place="bottom"
          style={{ backgroundColor: "#DE3163" }}
          className="ave-padding"
        />
      </div>
    </div>
  );
};

export default MiniNav;
