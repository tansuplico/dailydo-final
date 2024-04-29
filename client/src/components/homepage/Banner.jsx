import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-[90%] lg:w-full flex flex-center">
      <div className="w-full lg:w-[50%] mt-[4rem] text-center">
        <div className="flex flex-col gap-4">
          <h1 className="poppins-medium text-[2rem] lg:text-[3.7rem] lg:leading-[5rem]">
            <span className="text-[#DE3163]">Elevating</span> your daily routine
            with <span className="text-[#DE3163]">streamlined</span>{" "}
            <span className="text-[#DE3163]">notes</span> and{" "}
            <span className="text-[#DE3163]">tasks</span>
          </h1>
          <p className="poppins-regular text-[1.2rem] ">
            Seamlessly integrate notes and tasks for a productive day.
          </p>
        </div>

        <div className="w-full mt-7">
          <Link to="/login">
            <button className="group px-[3.5rem] py-3 lg:py-4 border bg-[#DE3163] border-[#DE3163] hover:bg-white hover:text-[#DE3163] text-white rounded-lg transition-all">
              <span className="text-[1.35rem]">Start for Free</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
