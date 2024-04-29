import React from "react";

const DeletePerm = ({
  handleDeleteTrash,
  trashSelected,
  setRemovePerm,
  theme,
}) => {
  return (
    <div className="fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[90%] md:w-auto bg-white dark:bg-[#242124] dark:text-white flex flex-col gap-6 py-8 px-5 md:p-8 rounded">
        <h1 className="text-[1.4rem]">Delete note permanently?</h1>

        <h1>
          <span className="text-red-500 font-bold">Note:</span> You cannot
          recover this note and this action cannot be undone
        </h1>

        <div className="w-full flex flex-center gap-5">
          <button
            className="px-7 sm:px-10 py-1 rounded border-red-500 border dark:border-white hover:border-red-600 bg-red-500 hover:bg-red-600 text-white transition-all"
            onClick={() => {
              handleDeleteTrash();
            }}
          >
            Delete
          </button>

          <button
            className="px-7 sm:px-10 py-1 rounded border-black border dark:border-white hover:border-[#DE3163] hover:bg-[#DE3163] hover:text-white transition-all"
            onClick={() => setRemovePerm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePerm;
