import React from "react";

const VerificationModal = ({ setShowVerificationModal }) => {
  return (
    <div className="fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="absolute w-[40%] pb-5 rounded-md bg-white">
        <div className="w-full p-5 bg-[#DE3163] text-white">
          <h1>2-step Email Verification</h1>
        </div>
        <div className="flex flex-col px-5 pt-2 gap-2 ">
          <div className="flex gap-3">
            <h1>
              We've sent an email to your gmail account to verify that it's you
            </h1>
          </div>

          <div className="w-full flex flex-center gap-5 mt-5">
            <button
              className="bg-[#DE3163] text-white px-4 py-2 rounded-sm"
              onClick={() => setShowVerificationModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
