import React from "react";
import { Link } from "react-router-dom";
import bannerWide from "../../assets/bannerWide.png";

const WideBanner = () => {
  return (
    <section className="w-full flex flex-center my-[4rem] lg:my-[6rem]">
      <img
        src={bannerWide}
        alt="banner"
        className="w-full h-[25rem] lg:h-auto relative"
      />
      <div className="absolute w-[70%] lg:w-[50%] text-white text-center flex flex-col flex-center gap-5">
        <h1 className="poppins-regular text-[1.5rem] lg:text-[3rem] xl:text-[3.5rem]">
          Bridging notes to tasks for effortless productivity
        </h1>
        <p className="poppins-regular text-[.85rem] lg:text-[1rem] after:xl:text-[1.5rem]">
          Unlock your potential with Dailydo: Notes, tasks, and success in one
          place.
        </p>

        <Link to="/login">
          <button className="group px-[1rem] lg:px-[3.5rem] py-2 lg:py-4 border border-white hover:bg-white hover:text-black rounded-md transition-all">
            <span className="text-[.85rem] lg:text-[1.35rem]">
              Start for Free
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WideBanner;
