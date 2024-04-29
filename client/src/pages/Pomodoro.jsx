import React, { useEffect, useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Nav from "../components/global/Nav";
import {
  usePomodoroStore,
  useSidebarStore,
  useTaskListStore,
} from "../store/store";
import TimerButtons from "../components/pomodoro/TimerButtons";
import PauseAndReset from "../components/pomodoro/PauseAndReset";
import axios from "axios";

const Pomodoro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    timer,
    shortBreakTimer,
    longBreakTimer,
    pomodoroSelected,
    shortBreakSelected,
    longBreakSelected,
    isRunning,
    toggleTimer,
    handleTimerValue,
    togglePause,
  } = usePomodoroStore((state) => ({
    timer: state.timer,
    shortBreakTimer: state.shortBreakTimer,
    longBreakTimer: state.longBreakTimer,
    pomodoroSelected: state.pomodoroSelected,
    shortBreakSelected: state.shortBreakSelected,
    longBreakSelected: state.longBreakSelected,
    isRunning: state.isRunning,

    toggleTimer: state.toggleTimer,
    handleTimerValue: state.handleTimerValue,
    togglePause: state.togglePause,
  }));

  const {
    showSidebar,
    setShowSidebar,
    theme,
    setTheme,
    darkMode,
    setDarkMode,
  } = useSidebarStore((state) => ({
    showSidebar: state.showSidebar,
    setShowSidebar: state.setShowSidebar,
    theme: state.theme,
    setTheme: state.setTheme,
    darkMode: state.darkMode,
    setDarkMode: state.setDarkMode,
  }));

  const { setShowListGroup, setShowSortGroup } = useTaskListStore((state) => ({
    setShowListGroup: state.setShowListGroup,
    setShowSortGroup: state.setShowSortGroup,
  }));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const fetchedData = () => {
    setIsLoading(true);
    axios
      .get(`https://dailydo-0bc4.onrender.com/api/workspace`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        const isDarkMode = res.data.findUserData.dark;
        setDarkMode(isDarkMode);
        setTheme(isDarkMode ? "dark" : "light");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[100vh] flex flex-center ">
          <div className="loader">
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full flex justify-center items-start relative ${
            darkMode && theme === "dark" && "dark"
          } dark:bg-neutral-900`}
        >
          {showSidebar && (
            <div className="w-full h-full fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
          )}
          <Sidebar />
          <div className="w-full md:w-[70%] lg:w-[80%] flex flex-col absolute right-0">
            <Nav
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              setShowListGroup={setShowListGroup}
              setShowSortGroup={setShowSortGroup}
              theme={theme}
            />
            <div className="poppins-regular w-full h-[100vh] md:h-full dark:bg-neutral-900 flex flex-col justify-start items-center dark:text-white">
              <h1 className="poppins-medium text-center text-[3rem] md:text-[5rem] mt-[1rem] mb-[3rem]">
                Pom<span className="text-[#DE3163]">o</span>doro Ti
                <span className="text-[#DE3163]">m</span>er
              </h1>

              <TimerButtons handleTimerValue={handleTimerValue} />

              <div className="p-5 text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem]">
                <h1 className="text-[#DE3163] dark:text-white">
                  {formatTime(
                    pomodoroSelected
                      ? timer
                      : shortBreakSelected
                      ? shortBreakTimer
                      : longBreakSelected
                      ? longBreakTimer
                      : null
                  )}
                </h1>
              </div>

              <PauseAndReset
                togglePause={togglePause}
                toggleTimer={toggleTimer}
                isRunning={isRunning}
                handleTimerValue={handleTimerValue}
                pomodoroSelected={pomodoroSelected}
                shortBreakSelected={shortBreakSelected}
                longBreakSelected={longBreakSelected}
                timer={timer}
                shortBreakTimer={shortBreakTimer}
                longBreakTimer={longBreakTimer}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pomodoro;
