import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteGroup = ({
  setShowListGroup,
  deleteGroupTask,
  id,
  setShowDeleteGroupModal,
  groupedTaskList,
  setGroupedTaskSelected,
  handleDeleteGroup,
  setFetchGroup,
  groupedTaskSelected,
  theme,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-default">
      <div className="bg-white dark:bg-neutral-900 flex flex-col gap-6 p-8 rounded">
        <h1 className="text-[1.4rem]">Delete task group permanently?</h1>

        <h1>
          <span className="text-red-500 font-bold">Note:</span> You cannot
          recover your tasks group and this action cannot be undone
        </h1>

        <div className="w-full flex flex-center gap-5">
          <button
            className="px-10 py-1 rounded border-red-500 border dark:hover:border-white hover:border-red-600 bg-red-500 hover:bg-red-600 text-white transition-all"
            onClick={() => {
              handleDeleteGroup(id);
              setShowDeleteGroupModal(false);
              setShowListGroup(false);
              navigate(`/client/tasks-list/${groupedTaskSelected}`);
              setGroupedTaskSelected(
                groupedTaskList.length > 1
                  ? groupedTaskSelected === groupedTaskList[0].id
                    ? groupedTaskList[1].id
                    : groupedTaskSelected ===
                      groupedTaskList[groupedTaskList.length - 1].id
                    ? groupedTaskList[groupedTaskList.length - 2].id
                    : groupedTaskList[0].id
                  : groupedTaskList[groupedTaskList.length - 1].id
              );
            }}
          >
            Delete
          </button>

          <button
            className="px-10 py-1 rounded border-black dark:border-white border hover:border-[#DE3163] hover:bg-[#DE3163] hover:text-white  transition-all"
            onClick={() => setShowDeleteGroupModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGroup;
