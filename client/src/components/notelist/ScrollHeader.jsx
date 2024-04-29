import React from "react";
import { Tooltip } from "react-tooltip";

import sortNotesDark from "../../assets/sort-notes-dark.png";
import sortNotesLight from "../../assets/sort-notes-light.png";
import menuDark from "../../assets/menu-icon-dark.png";
import menuLight from "../../assets/menu-icon-light.png";

const ScrollHeader = ({
  noteLists,
  showSortMenu,
  setShowSortMenu,
  setShowSortPosition,
  setShowSidebar,
  showSidebar,
  windowWidth,
  theme,
}) => {
  const handleShowSortMenu = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTimeout(() => {
      setShowSortMenu(true);

      if (showSortMenu) {
        setShowSortMenu(false);
      }
    }, 0);

    setShowSortMenu((val) => !val);
    setShowSortPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <strong className="text-[1.5rem]">
          N<span className="text-[#DE3163]">o</span>tes
        </strong>
        {windowWidth < 768 && (
          <img
            src={theme === "dark" ? menuLight : menuDark}
            alt="menu"
            className="w-[25px] h-[25px]"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <span> {noteLists.length} Notes </span>

        <div className="w-max flex gap-3">
          {noteLists.length > 0 && (
            <img
              src={theme === "dark" ? sortNotesLight : sortNotesDark}
              alt="sort-icon"
              data-tooltip-id="sort"
              data-tooltip-content="Sort Notes"
              className="w-[25px] h-[25px] cursor-pointer"
              onClick={(e) => handleShowSortMenu(e)}
            />
          )}
          <Tooltip
            id="sort"
            place="bottom"
            style={{ backgroundColor: "#DE3163" }}
            className="ave-padding"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollHeader;
