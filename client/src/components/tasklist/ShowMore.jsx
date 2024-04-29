import React from "react";
import deleteDark from "../../assets/delete-dark.png";
import deleteLight from "../../assets/delete-light.png";
import markDark from "../../assets/mark-dark.png";
import markLight from "../../assets/mark-light.png";
import importantDark from "../../assets/important-dark.png";
import importantLight from "../../assets/important-light.png";
import clearDark from "../../assets/clear-dark.png";
import clearLight from "../../assets/clear-light.png";
import duplicateDark from "../../assets/duplicate-dark.png";
import duplicateLight from "../../assets/duplicate-light.png";

const ShowMore = ({
  task,
  i,
  showMoreRef,
  showMorePosition,
  handleDeleteTask,
  handleDuplicateTask,
  handleIsImportant,
  handleClearTask,
  handleMoveTask,
  taskType,
  theme,
}) => {
  const showAdjust =
    taskType === "Done"
      ? window.innerWidth < 768
        ? -50
        : window.innerWidth < 1440
        ? -70
        : 0
      : window.innerWidth < 768
      ? -70
      : 100;

  const topAdjust =
    taskType === "Done" ? 80 : window.innerWidth < 768 ? 90 : 50;

  return (
    <div
      ref={showMoreRef}
      className="fixed transform -translate-x-1/2 -translate-y-1/2 w-[11rem] bg-white dark:bg-[#242124] dark:text-white py-2 shadow-md z-[99] rounded-lg overflow-visible"
      style={{
        top: showMorePosition.y + topAdjust,
        left: showMorePosition.x + showAdjust,
      }}
    >
      <div
        className="w-full pl-2 py-1 flex justify-start items-center text-[.8rem] gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#DE3163]"
        onClick={() => handleDeleteTask(task.id, taskType)}
      >
        <img
          src={theme === "dark" ? deleteLight : deleteDark}
          alt="delete-icon"
          className="w-[15px] h-[15px]"
        />
        <p> Delete </p>
      </div>
      <div
        className="w-full pl-2 py-1 flex justify-start items-center text-[.8rem] gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#DE3163]"
        onClick={() => handleDuplicateTask(i, taskType)}
      >
        <img
          src={theme === "dark" ? duplicateLight : duplicateDark}
          alt="status-icon"
          className="w-[15px] h-[15px]"
        />
        <p> Duplicate </p>
      </div>
      {(taskType === "ToDo" || taskType === "Doing") && (
        <div
          className="w-full pl-2 py-1 flex justify-start items-center text-[.8rem] gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#DE3163]"
          onClick={() => handleMoveTask(task.id, taskType)}
        >
          <img
            src={theme === "dark" ? markLight : markDark}
            alt="status-icon"
            className="w-[15px] h-[15px]"
          />
          <p> Mark as {taskType === "ToDo" ? "Doing" : "Done"} </p>
        </div>
      )}
      <div
        className="w-full pl-2 py-1 flex justify-start items-center text-[.8rem] gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#DE3163]"
        onClick={() => handleIsImportant(task.id, taskType)}
      >
        <img
          src={theme === "dark" ? importantLight : importantDark}
          alt="status-icon"
          className="w-[15px] h-[15px]"
        />
        <p>
          Mark as
          {task.isImportant ? " Unimportant" : " Important"}
        </p>
      </div>

      <div
        className="w-full pl-2 py-1 flex justify-start items-center text-[.8rem] gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#DE3163]"
        onClick={() => handleClearTask(task.id, taskType)}
      >
        <img
          src={theme === "dark" ? clearLight : clearDark}
          alt="status-icon"
          className="w-[15px] h-[15px]"
        />
        <p> Clear Task </p>
      </div>
    </div>
  );
};

export default ShowMore;
