import React from "react";

const PauseAndReset = ({
  togglePause,
  toggleTimer,
  isRunning,
  handleTimerValue,
  pomodoroSelected,
  shortBreakSelected,
  longBreakSelected,
  timer,
  shortBreakTimer,
  longBreakTimer,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row lg:flex-col flex-center gap-5 px-10 md:px-0 pb-10">
      {isRunning ? (
        <button
          className={`w-full sm:w-[50%] md:w-[30%] bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white py-3 cursor-pointer ${
            (!timer || !shortBreakTimer || !longBreakTimer) &&
            "cursor-not-allowed"
          } rounded-md transition-all`}
          onClick={
            !timer || !shortBreakTimer || !longBreakTimer ? null : togglePause
          }
        >
          Pause
        </button>
      ) : (
        <button
          className={`w-full sm:w-[50%] md:w-[30%] bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white py-3 cursor-pointer ${
            (!timer || !shortBreakTimer || !longBreakTimer) &&
            "cursor-not-allowed"
          } rounded-md transition-all`}
          onClick={
            !timer || !shortBreakTimer || !longBreakTimer ? null : toggleTimer
          }
        >
          Start
        </button>
      )}

      <button
        className="w-full sm:w-[50%] md:w-[30%] bg-[#DE3163] hover:bg-white hover:text-[#DE3163] hover:border-[#DE3163] border-2 text-white py-3 cursor-pointer rounded-md transition-all"
        onClick={() =>
          handleTimerValue(
            pomodoroSelected
              ? "Pomodoro"
              : shortBreakSelected
              ? "Short"
              : longBreakSelected
              ? "Long"
              : null
          )
        }
      >
        Reset
      </button>
    </div>
  );
};

export default PauseAndReset;
