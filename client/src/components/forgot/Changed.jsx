import React from "react";

const Changed = ({ verifiedCheck }) => {
  return (
    <div className="w-full md:w-[80%] xl:w-[50%] py-[5rem] bg-white flex flex-col flex-center gap-5 shadow-lg text-center">
      <img src={verifiedCheck} alt="verified-check" />
      <strong className="text-[#03C03C] text-[2rem]">
        Password successfully changed
      </strong>
      <p className="text-center w-[80%]">
        Your password has been successfully changed. You can now log in again.
      </p>
    </div>
  );
};

export default Changed;
