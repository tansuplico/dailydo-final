import React from "react";

const Security = ({
  verificationEnabled,
  toggleEmailVerification,
  logout,
  setDeleteWarning,
  deleteWarning,
  deleteAccount,
}) => {
  return (
    <div className="h-full p-5 flex flex-col gap-3 dark:text-white">
      <div className="w-full flex flex-col justify-start gap-2">
        <strong className="text-[#555555] dark:text-white">
          Manage Account
        </strong>
        <hr className="border-black dark:border-white" />
        <div className="w-full flex justify-between items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              2 step email verification
            </strong>
            <p className="text-[.75rem]">
              Add an additional layer of security to your account during login.
            </p>
          </div>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                value="Verification Enabled"
                defaultChecked={verificationEnabled}
                onClick={() => toggleEmailVerification()}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              Log out of all devices
            </strong>
            <h3 className="text-[.6rem] sm:text-[.75rem]">
              Log out of all other active sessions on other devices besides this
              one.
            </h3>
          </div>
          <button
            className="border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
            onClick={() => {
              logout();
            }}
          >
            <span className="text-[.85rem]"> Log Out </span>
          </button>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              Log out
            </strong>
            <h3 className="text-[.75rem]">Log out account on this devices</h3>
          </div>
          <button
            className="border border-black dark:border-white h-max py-1 px-2 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
            onClick={() => {
              logout();
            }}
          >
            <span className="sm:text-[.85rem]">Log Out</span>
          </button>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              Delete Account
            </strong>
            <h3 className="text-[.75rem]">
              Permanently delete the account and remove access from all
              workspaces.
            </h3>
          </div>
          <button
            className="border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
            onClick={() => setDeleteWarning((val) => !val)}
          >
            <span className="text-[.85rem]"> Delete </span>
          </button>
        </div>

        {deleteWarning && (
          <div className="w-full flex justify-between items-center gap-2">
            <div>
              <strong className="text-red-500">
                Are you sure you want to delete this account?
              </strong>
              <h3 className="text-[.75rem]">Actions cannot be undone</h3>
            </div>
            <button
              className="border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
              onClick={() => deleteAccount()}
            >
              <span className="text-[.85rem]"> Delete </span>
            </button>

            <button
              className="border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
              onClick={() => setDeleteWarning(false)}
            >
              <span className="text-[.85rem]"> Cancel </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Security;
