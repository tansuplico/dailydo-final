import React from "react";

const ContentUnavailable = ({ setContentUnavailable }) => {
  return (
    <div className="fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-default">
      <div className="bg-white text-black dark:text-white dark:bg-neutral-900 flex flex-col gap-6 p-8 rounded ">
        <h1 className="text-[1.4rem]">Content Unavailable</h1>

        <h1>
          <span className="text-red-500 font-bold">Info:</span> This content is
          currently unavailable.
        </h1>

        <div className="w-full flex flex-center gap-5">
          <button
            className="px-10 py-1 rounded border-red-500 border dark:hover:border-white hover:border-red-600 bg-red-500 hover:bg-red-600 text-white transition-all"
            onClick={() => setContentUnavailable(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentUnavailable;
