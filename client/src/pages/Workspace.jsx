import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Nav from "../components/global/Nav";
import NotesDisplay from "../components/workspace/NotesDisplay";
import TasksChart from "../components/workspace/TasksChart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import {
  useTaskListStore,
  useNotesListStore,
  useSidebarStore,
  useWorkspaceStore,
  useTaskListGroup,
} from "../store/store";

import axios from "axios";
const Workspace = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { groupedTaskList } = useTaskListGroup((state) => ({
    groupedTaskList: state.groupedTaskList,
  }));

  const { setShowListGroup, setShowSortGroup } = useTaskListStore((state) => ({
    setShowListGroup: state.setShowListGroup,
    setShowSortGroup: state.setShowSortGroup,
  }));

  const { noteLists, setNoteSelected } = useNotesListStore((state) => ({
    noteLists: state.noteLists,
    setNoteSelected: state.setNoteSelected,
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

  const {
    user,
    setUser,
    notesSlides,
    setNotesSlides,
    chartSlides,
    setChartSlides,
  } = useWorkspaceStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    notesSlides: state.notesSlides,
    setNotesSlides: state.setNotesSlides,
    chartSlides: state.chartSlides,
    setChartSlides: state.setChartSlides,
  }));

  useEffect(() => {
    const handleResize = () => {
      const newSlideToShow =
        window.innerWidth < 550 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setNotesSlides(newSlideToShow);
      setChartSlides(newSlideToShow);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchedData = () => {
    setIsLoading(true);
    axios
      .get(`https://dailydo-0bc4.onrender.com/api/workspace`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setUser(res.data.findUserData.username);
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
          }`}
        >
          {showSidebar && (
            <div className="w-full h-full fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
          )}
          <Sidebar />
          <div className="poppins-regular w-full md:w-[70%] lg:w-[80%] flex flex-col absolute right-0 dark:bg-neutral-900">
            <Nav
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              setShowListGroup={setShowListGroup}
              setShowSortGroup={setShowSortGroup}
              theme={theme}
            />
            <div
              className={`w-full ${
                noteLists.length > 0 && groupedTaskList.length > 0
                  ? "h-full"
                  : "h-[100vh]"
              } pt-5 flex justify-center items-start`}
            >
              <div className="w-[90%]">
                <div className="w-full">
                  <h1 className="poppins-semibold text-[1.65rem] dark:text-white">
                    {user}'s Workspace
                  </h1>
                </div>

                <div className="w-full py-5">
                  <h1 className="text-[1.3rem] my-2 border-b border-gray-400 dark:text-white">
                    Notes
                  </h1>

                  <div
                    className={`${
                      theme !== "dark" && "noteTaskDisplay"
                    } w-full flex gap-5 overflow-x-scroll`}
                  >
                    {noteLists.length > 0 ? (
                      <NotesDisplay
                        notesSlides={notesSlides}
                        noteLists={noteLists}
                        setNoteSelected={setNoteSelected}
                        navigate={navigate}
                      />
                    ) : (
                      <h1 className="dark:text-white"> Note list is empty </h1>
                    )}
                  </div>
                </div>

                <div className="w-full  py-5">
                  <h1 className="text-[1.3rem] my-2 border-b border-gray-400 dark:text-white">
                    Tasks Group
                  </h1>

                  <div className="groupedTaskGraph w-full flex gap-5">
                    {groupedTaskList.length > 0 ? (
                      <TasksChart
                        groupedTaskList={groupedTaskList}
                        chartSlides={chartSlides}
                      />
                    ) : (
                      <h1 className="dark:text-white">
                        No task group were found
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workspace;
