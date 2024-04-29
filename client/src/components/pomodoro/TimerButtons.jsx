import React from "react";

const TimerButtons = ({ handleTimerValue }) => {
  return (
    <div className="w-full px-5 flex flex-center gap-5">
      <div
        className="bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white p-3 cursor-pointer rounded-md transition-all"
        onClick={() => handleTimerValue("Pomodoro")}
      >
        <h1 className="text-[.85rem] md:text-[1rem]">Pomodoro</h1>
      </div>
      <div
        className="bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white p-3 cursor-pointer rounded-md transition-all"
        onClick={() => handleTimerValue("Short")}
      >
        <h1 className="text-[.85rem] md:text-[1rem]">
          {window.innerWidth < 768 ? "Short" : "Short Break"}
        </h1>
      </div>

      <div
        className="bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white p-3 cursor-pointer rounded-md transition-all"
        onClick={() => handleTimerValue("Long")}
      >
        <h1 className="text-[.85rem] md:text-[1rem]">
          {window.innerWidth < 768 ? "Long" : "Long Break"}
        </h1>
      </div>
    </div>
  );
};

export default TimerButtons;
