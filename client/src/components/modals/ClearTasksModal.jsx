import React from "react";

const ClearTasksModal = ({
  clearWholeTask,
  taskToClear,
  setModalIsClicked,
  handleClearWholeTask,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50 text-black">
      <div className="bg-white dark:bg-neutral-900  dark:text-white flex flex-col gap-6 p-8 rounded">
        <h1 className="text-[1.4rem]">
          Clear all {taskToClear === "ToDo" ? "To Do" : taskToClear} tasks?
        </h1>

        <h1>
          <span className="text-red-500 font-bold">Note:</span> You cannot
          recover your tasks and this action cannot be undone
        </h1>

        <div className="w-full flex flex-center gap-5">
          <button
            className="px-10 py-1 rounded border-red-500 dark:border-white border hover:border-red-600 bg-red-500 hover:bg-red-600 text-white transition-all"
            onClick={() => {
              clearWholeTask(taskToClear);
              handleClearWholeTask(taskToClear);
              setModalIsClicked(false);
            }}
          >
            Clear
          </button>

          <button
            className="px-10 py-1 rounded border-black dark:border-white border hover:border-[#DE3163] hover:bg-[#DE3163] hover:text-white transition-all"
            onClick={() => setModalIsClicked(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearTasksModal;
