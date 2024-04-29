import React from "react";

const SavedInput = ({
  task,
  showMore,
  editDark,
  editLight,
  moreDark,
  moreLight,
  editTask,
  importantIcon,
  idSelected,
  showMoreFunction,
  taskType,
  theme,
}) => {
  return (
    <div className="w-full dark:text-white pr-2 flex items-center border group transition-all hover:bg-gray-100 dark:hover:bg-[#DE3163]">
      {task.isImportant && (
        <div className="w-max px-1">
          <img src={importantIcon} alt="important-icon" className="w-[15px]" />
        </div>
      )}
      <h1
        className={`${
          !task.task && "text-gray-400"
        } w-full p-2  text-ellipsis overflow-x-hidden`}
      >
        {task.task ? task.task : "Untitled Task"}
      </h1>
      <div className="w-max  flex flex-center gap-2">
        <img
          src={theme === "dark" ? editLight : editDark}
          alt="dark-edit"
          className={`${
            showMore && task.id === idSelected
              ? "block"
              : window.innerWidth < 768
              ? "block"
              : "hidden"
          } group-hover:block w-[20px] h-[20px] cursor-pointer`}
          onClick={() => editTask(task.id, task.task, taskType)}
        />

        <img
          src={theme === "dark" ? moreLight : moreDark}
          alt="more-icon"
          className={`${
            showMore && task.id === idSelected
              ? "block"
              : window.innerWidth < 768
              ? "block"
              : "hidden"
          } group-hover:block w-[20px] h-[20px] cursor-pointer`}
          onClick={(e) => showMoreFunction(task.id, e, taskType)}
        />
      </div>
    </div>
  );
};

export default SavedInput;
