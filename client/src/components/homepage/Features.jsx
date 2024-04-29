import React from "react";
import realtime from "../../assets/realtime.png";
import intelligent from "../../assets/intelligent.png";
import visual from "../../assets/visual.png";
import innovate from "../../assets/innovate.png";

const Features = ({ featureRef }) => {
  return (
    <section
      className="w-full bg-[#DE3163] text-white grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 my-[4rem]"
      ref={featureRef}
    >
      <div className="w-full flex flex-col gap-5 p-[3rem] sm:p-[4rem] xl:p-[6rem]">
        <img src={realtime} alt="realtime" className="w-[5rem]" />
        <h1 className="text-[2rem]"> Real-Time Syncing </h1>
        <p className="text-[1.2rem]">
          Keep your notes and tasks up-to-date across all devices instantly.
        </p>
      </div>
      <div className="w-full flex flex-col gap-5 p-[3rem] sm:p-[4rem] xl:p-[6rem]">
        <img src={intelligent} alt="intelligent" className="w-[5rem]" />

        <h1 className="text-[2rem]"> Intelligent Insights </h1>
        <p className="text-[1.2rem]">
          Gain personalized productivity recommendations by analyzing your notes
          and tasks.
        </p>
      </div>
      <div className="w-full flex flex-col gap-5 p-[3rem] sm:p-[4rem] xl:p-[6rem]">
        <img src={visual} alt="visual" className="w-[5rem]" />

        <h1 className="text-[2rem]"> Visual Organization </h1>
        <p className="text-[1.2rem]">
          Easily organize notes and tasks visually with customizable tags and
          labels.
        </p>
      </div>
      <div className="w-full flex flex-col gap-5 p-[3rem] sm:p-[4rem] xl:p-[6rem]">
        <img src={innovate} alt="innovate" className="w-[5rem]" />

        <h1 className="text-[2rem]"> Innovative Integration </h1>
        <p className="text-[1.2rem]">
          Connect DailyDo with your favorite apps for a streamlined workflow and
          synchronized tasks.
        </p>
      </div>
    </section>
  );
};

export default Features;
