import React from "react";

const Account = ({
  verifiedUserImage,
  userName,
  userEmail,
  setShowChangePassword,
  setCurrentPasswordError,
  setNewPasswordError,
  setReNewPasswordError,
  setCheckCurrentPassword,
  setNewPassword,
  setReNewPassword,
  showChangePassword,
  currentPasswordError,
  newPasswordError,
  reNewPasswordError,
  handleChangePassword,
  windowWidth,
  passwordChanged,
  checkCurrentPassword,
  newPassword,
  reNewPassword,
  setUserImage,
  uploadProfilePicture,
  setPasswordChanged,
}) => {
  return (
    <div className="h-full p-5 flex flex-col gap-3 dark:text-white">
      <div className="w-full  flex flex-start items-center gap-1">
        <div className="w-max p-1 flex flex-center">
          <img
            src={verifiedUserImage}
            alt="profile"
            className="w-[7rem] cursor-pointer"
          />
        </div>

        <div className="w-full h-full flex flex-col justify-start">
          <h1 className="text-[1.4rem] font-bold">{userName}</h1>
          <h1 className="text-[.8rem]"> {userEmail} </h1>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start gap-2">
        <strong className="text-[#555555] dark:text-white">
          Account Security
        </strong>
        <hr className="border-black dark:border-white" />

        <div className="w-full flex justify-between items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              Email
            </strong>
            <h3 className="text-[.85rem]"> {userEmail} </h3>
          </div>
        </div>

        <div className="w-full flex justify-between items-center gap-2">
          <div>
            <strong className="text-[#555555] dark:text-[#FF004F]">
              Password
            </strong>
            <h3 className="text-[.85rem]"> ************** </h3>
          </div>
          <button
            className="border border-black h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] dark:border-white hover:text-white cursor-pointer transition-all"
            onClick={() => {
              setShowChangePassword((val) => !val);
              setCurrentPasswordError(false);
              setNewPasswordError(false);
              setReNewPasswordError(false);
              setCheckCurrentPassword("");
              setNewPassword("");
              setReNewPassword("");
              setPasswordChanged(false);
            }}
          >
            <span className="text-[.85rem]">
              {showChangePassword
                ? "Hide"
                : windowWidth < 768
                ? "Change "
                : "Change Password"}
            </span>
          </button>
        </div>

        {showChangePassword && (
          <form
            className="w-full flex flex-col justify-between items-center gap-2 dark:text-white"
            onSubmit={(e) => handleChangePassword(e)}
          >
            {currentPasswordError && newPasswordError && reNewPasswordError && (
              <span className="text-red-500">All inputs must be filled</span>
            )}

            {currentPasswordError &&
              !newPasswordError &&
              !reNewPasswordError && (
                <span className="text-red-500">Incorrect Password</span>
              )}

            {!currentPasswordError &&
              newPasswordError &&
              !reNewPasswordError && (
                <span className="text-red-500">
                  Password must be at least 8 characters
                </span>
              )}

            {!currentPasswordError &&
              newPasswordError &&
              reNewPasswordError && <span>Password doesn't match</span>}

            {passwordChanged && (
              <span className="text-[#008000]">
                Password successfully changed
              </span>
            )}
            <div
              className={`w-full px-2 flex flex-col flex-center bg-white dark:bg-transparent rounded-md border-2 ${
                currentPasswordError && "border-red-500"
              }`}
            >
              <input
                type="password"
                placeholder="Current password"
                className="w-full py-2 pl-2 focus:outline-none rounded-2xl dark:bg-transparent"
                onChange={(e) => setCheckCurrentPassword(e.target.value)}
                value={checkCurrentPassword}
              />
            </div>

            <div
              className={`w-full px-2 flex flex-center bg-white rounded-md border-2 dark:bg-transparent ${
                newPasswordError && "border-red-500"
              }`}
            >
              <input
                type="password"
                placeholder="New password"
                className="w-full py-2 pl-2 focus:outline-none rounded-2xl dark:bg-transparent"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div
              className={`w-full px-2 flex flex-center bg-white rounded-md border-2 dark:bg-transparent ${
                reNewPasswordError && "border-red-500"
              }`}
            >
              <input
                type="password"
                placeholder="Re-type new password"
                className="w-full py-2 pl-2 focus:outline-none rounded-2xl dark:bg-transparent"
                onChange={(e) => setReNewPassword(e.target.value)}
                value={reNewPassword}
              />
            </div>

            <button
              className="w-full border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
              type="submit"
            >
              <span className="text-[.85rem] dark:text-white">
                Save Changes
              </span>
            </button>
          </form>
        )}
        <label className="font-bold text-[#555555] dark:text-[#FF004F]">
          Change Profile Picture
        </label>
        <hr className="border-black dark:border-white" />
        <div className="w-full flex justify-between items-center gap-2 ">
          <input
            type="file"
            accept="image/png"
            className="w-[7.5rem] flex file:py-1 file:px-3 file:bg-white file:border-[0.5px] file:border-black hover:file:bg-[#FF004F] hover:file:border-[#FF004F] hover:file:text-white transition-all file:cursor-pointer"
            onChange={(e) => setUserImage(e.target.files[0])}
          />

          <button
            className="border border-black dark:border-white h-max py-1 px-3 rounded-md hover:bg-[#FF004F] hover:border-[#FF004F] hover:text-white cursor-pointer transition-all"
            onClick={() => uploadProfilePicture()}
          >
            <span className="text-[.85rem] ">
              {windowWidth < 768 ? "Upload" : "Upload Image"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
