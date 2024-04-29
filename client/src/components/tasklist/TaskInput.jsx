import React from "react";
import axios from "axios";

const TaskInput = ({
  task,
  saveDark,
  saveLight,
  handleTaskChange,
  taskType,
  handleEditAndSave,
  groupedTaskSelected,
  theme,
}) => {
  const handleChangeTask = () => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${groupedTaskSelected}/change-task`,
        { taskValue: task.task, soloId: task.id, type: taskType },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full dark:text-white pr-2 flex items-center border group transition-all">
      <input
        type="text"
        placeholder="Untitled Task"
        className="w-full p-2 focus:outline-none dark:bg-transparent"
        onChange={(e) => handleTaskChange(task.id, e.target.value, taskType)}
        value={task.task}
      />
      <img
        src={theme === "dark" ? saveLight : saveDark}
        alt="save-icon"
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => {
          handleEditAndSave(taskType);
          handleChangeTask();
        }}
      />
    </div>
  );
};

export default TaskInput;
