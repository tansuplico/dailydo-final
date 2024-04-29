import React from "react";
import deleteDark from "../../assets/delete-dark.png";
import deleteLight from "../../assets/delete-light.png";
import sortDark from "../../assets/sort-dark.png";
import sortLight from "../../assets/sort-light.png";
import thinRightDark from "../../assets/thin-right-dark.png";
import thinRightLight from "../../assets/thin-right-light.png";
import dateSortDark from "../../assets/sort-date-dark.png";
import dateSortLight from "../../assets/sort-date-light.png";
import titleSortDark from "../../assets/title-sort-dark.png";
import titleSortLight from "../../assets/title-sort-light.png";

const WholeShowMore = ({
  setModalIsClicked,
  setTaskToClear,
  setShowMoreSort,
  showMoreSort,
  handleSortTaskName,
  handleSortTaskDate,
  type,
  theme,
}) => {
  return (
    <div className="absolute top-[2rem] right-0 w-[10rem] bg-white dark:bg-[#242124] dark:text-white  py-2 flex flex-col gap-3 shadow-md overflow-visible z-[30] text-black">
      <div
        className="hover:bg-gray-100 dark:hover:bg-[#DE3163] flex px-2 py-1 items-center gap-2 cursor-pointer"
        onClick={() => {
          setModalIsClicked(true);
          setTaskToClear(type);
        }}
      >
        <img
          src={theme === "dark" ? deleteLight : deleteDark}
          alt="delete-dark"
          className="w-[17px] h-[17px] cursor-pointer"
        />
        <span className="text-[.8rem]">Clear whole task</span>
      </div>

      <div className="hover:bg-gray-100 dark:hover:bg-[#DE3163] flex px-2 py-1 items-center gap-2 cursor-pointer">
        <img
          src={theme === "dark" ? sortLight : sortDark}
          alt="sort-dark"
          className="w-[17px] h-[17px] cursor-pointer"
        />
        <div className="w-full flex justify-between items-center">
          <span className="text-[.8rem]">Sort task</span>
          <img
            src={theme === "dark" ? thinRightLight : thinRightDark}
            alt="arrow-light"
            className={`w-[15px] transition-all ${showMoreSort && "rotate-90"}`}
            onClick={() => setShowMoreSort(!showMoreSort)}
          />
        </div>
      </div>
      {showMoreSort && (
        <div className="w-full flex flex-col gap-3 text-[.8rem]">
          <div
            className="hover:bg-gray-100 dark:hover:bg-[#DE3163] flex px-2 py-1 items-center gap-2 cursor-pointer"
            onClick={() => handleSortTaskDate(type)}
          >
            <img
              src={theme === "dark" ? dateSortLight : dateSortDark}
              alt="delete-dark"
              className="w-[17px] cursor-pointer"
            />
            <span className="text-[.8rem]">Date created (D)</span>
          </div>

          <div
            className="hover:bg-gray-100 dark:hover:bg-[#DE3163] flex px-2 py-1 items-center gap-2 cursor-pointer"
            onClick={() => handleSortTaskName(type)}
          >
            <img
              src={theme === "dark" ? titleSortLight : titleSortDark}
              alt="delete-dark"
              className="w-[17px] cursor-pointer"
            />
            <span className="text-[.8rem]">Task name</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholeShowMore;
