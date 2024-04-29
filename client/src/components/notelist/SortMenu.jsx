import React, { useEffect, useRef } from "react";
import sortTitleDark from "../../assets/title-sort-dark.png";
import sortTitleLight from "../../assets/title-sort-light.png";
import sortDateDark from "../../assets/sort-date-dark.png";
import sortDateLight from "../../assets/sort-date-light.png";

const SortMenu = ({
  showSortPosition,
  showSortMenu,
  setShowSortMenu,
  handleSortNoteTitle,
  handleSortNoteDate,
  theme,
}) => {
  const showSortRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideShowSort);

    return () => {
      document.removeEventListener("click", handleClickOutsideShowSort);
    };
  }, []);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
    };

    const keydownHandler = (e) => {
      if (e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    if (showSortMenu) {
      window.addEventListener("wheel", wheelHandler, {
        passive: false,
      });
      window.addEventListener("keydown", keydownHandler);
    }

    return () => {
      window.removeEventListener("wheel", wheelHandler, {
        passive: false,
      });
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [showSortMenu]);

  const handleClickOutsideShowSort = (e) => {
    if (showSortRef.current && !showSortRef.current.contains(e.target)) {
      setShowSortMenu(false);
    }
    e.preventDefault();
  };

  return (
    <div
      className="w-[10rem] fixed bg-white dark:bg-[#242124] border-2 rounded-md z-50"
      style={{
        top: showSortPosition.y + 30,
        left: showSortPosition.x - 130,
      }}
      ref={showSortRef}
    >
      <div className="w-full flex items-center gap-1 px-2 py-1 ">
        <span> Sort By </span>
      </div>
      <div
        className="w-full flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-[#DE3163]"
        onClick={() => handleSortNoteTitle()}
      >
        <img
          src={theme === "dark" ? sortTitleLight : sortTitleDark}
          alt="title-dark"
          className="w-[17px]"
        />
        <span> Title </span>
      </div>
      <div
        className="w-full flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-[#DE3163]"
        onClick={() => handleSortNoteDate()}
      >
        <img
          src={theme === "dark" ? sortDateLight : sortDateDark}
          alt="title-dark"
          className="w-[17px]"
        />
        <span> Date Created </span>
      </div>
    </div>
  );
};

export default SortMenu;
