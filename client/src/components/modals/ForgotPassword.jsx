import React from "react";
import profile from "../../assets/profile.png";

const ForgotPassword = ({
  emailModalError,
  emailSent,
  setForgotPasswordEmail,
  handleForgotPassword,
  setShowForgotPasswordModal,
  setEmailModalError,
  setEmailSent,
  errorMessage,
  forgotPasswordEmail,
}) => {
  return (
    <div className="fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="absolute w-[40%] pb-5 rounded-md bg-white">
        <div className="w-full p-5 bg-[#DE3163] text-white">
          <h1> We'll send an email verification to change your password</h1>
        </div>
        <div className="flex flex-col px-5 pt-2 gap-2 ">
          <div className="flex gap-3">
            {emailModalError && errorMessage === "Email not registered" ? (
              <h1 className="text-red-500"> Email is not registered! </h1>
            ) : errorMessage === "Invalid input value" ? (
              <h1 className="text-red-500"> Invalid input value! </h1>
            ) : emailSent ? (
              <h1 className="text-[#008000]">
                We've sent an email to your gmail account
              </h1>
            ) : (
              <h1> Email: </h1>
            )}
          </div>
          <div
            className={`${
              emailModalError && "border-red-500"
            } w-full px-2 flex flex-center bg-white rounded-2xl border-2`}
          >
            <img src={profile} alt="lock" className="w-[23px] h-[25px]" />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              value={forgotPasswordEmail}
            />
          </div>

          <div className="w-full flex flex-center gap-5 mt-5">
            <button
              className="bg-[#DE3163] text-white px-4 py-2 rounded-sm"
              onClick={() => handleForgotPassword()}
            >
              Submit
            </button>

            <button
              className="bg-white text-black border border-black px-4 py-2 rounded-sm"
              onClick={() => {
                setShowForgotPasswordModal(false);
                setEmailModalError(false);
                setEmailSent(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
