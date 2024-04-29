import React from "react";

const Expired = ({ expired }) => {
  return (
    <div className="w-full h-full poppins-regular py-[5rem] flex flex-center">
      <div className="w-[50%] py-[5rem] bg-white flex flex-col flex-center gap-5 shadow-lg">
        <img src={expired} alt="verified-check" />
        <strong className="text-[#DE3163] text-[2rem]">Session Expired</strong>
        <p className="text-center w-[80%]">
          This session is expired, resend your email to the form again.
        </p>
      </div>
    </div>
  );
};

export default Expired;
