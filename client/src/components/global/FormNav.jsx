import React from "react";

const FormNav = ({ navigate }) => {
  return (
    <div className="w-full py-2 px-5 flex justify-between items-center dark:bg-neutral-900">
      <strong
        className="poppins-semibold text-[1.5rem] lg:text-[1.3rem] dark:text-white cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Daily<span className="text-[#DE3163]">Do.</span>com
      </strong>
    </div>
  );
};

export default FormNav;
