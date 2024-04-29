import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/global/Nav";
import {
  useTaskListStore,
  useTaskListGroup,
  useSidebarStore,
} from "../store/store";
import Sidebar from "../components/global/Sidebar";
import ToDo from "../components/tasklist/ToDo";
import Doing from "../components/tasklist/Doing";
import Done from "../components/tasklist/Done";
import ClearTasksModal from "../components/modals/ClearTasksModal";
import downArrowLight from "../assets/arrow-down-light.png";
import moreLight from "../assets/more-light.png";
import ShowListGroup from "../components/tasklist/ShowListGroup";
import WholeShowMore from "../components/tasklist/WholeShowMore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Empty from "../components/tasklist/Empty";

const TasksList = () => {
  const newTaskRef = useRef();
  const newTaskRefDoing = useRef();
  const newTaskRefDone = useRef();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  const {
    addMode,
    doingAddMode,
    doneAddMode,
    modalIsClicked,
    setModalIsClicked,
    taskToClear,
    setTaskToClear,
    showListGroup,
    showDeleteGroupModal,
    groupToDelete,
    groupToEdit,
    wholeShowMore,
    wholeShowMoreDoing,
    wholeShowMoreDone,
    showMoreSort,
    showSortGroup,
    setShowListGroup,
    setShowDeleteGroupModal,
    setGroupToDelete,
    setGroupToEdit,
    setWholeShowMore,
    setWholeShowMoreDoing,
    setWholeShowMoreDone,
    setShowMoreSort,
    setShowSortGroup,
    fetchTask,
    handleAddToDo,
    handleAddDoing,
    handleAddDone,
    handleDeleteTask,
    handleDuplicateTask,
    handleIsImportant,
    handleClearTask,
    handleMoveTask,
    handleClearWholeTask,
    handleSortTaskDate,
    handleSortTaskName,
    setShowMore,
    setDoingShowMore,
    setDoneShowMore,
  } = useTaskListStore((state) => ({
    addMode: state.addMode,
    doingAddMode: state.doingAddMode,
    doneAddMode: state.doneAddMode,
    modalIsClicked: state.modalIsClicked,
    taskToClear: state.taskToClear,
    setModalIsClicked: state.setModalIsClicked,
    setClearChoice: state.setClearChoice,
    setTaskToClear: state.setTaskToClear,
    showListGroup: state.showListGroup,
    showDeleteGroupModal: state.showDeleteGroupModal,
    groupToDelete: state.groupToDelete,
    groupToEdit: state.groupToEdit,
    wholeShowMore: state.wholeShowMore,
    wholeShowMoreDoing: state.wholeShowMoreDoing,
    wholeShowMoreDone: state.wholeShowMoreDone,
    showMoreSort: state.showMoreSort,
    showSortGroup: state.showSortGroup,
    setShowListGroup: state.setShowListGroup,
    setShowDeleteGroupModal: state.setShowDeleteGroupModal,
    setGroupToDelete: state.setGroupToDelete,
    setGroupToEdit: state.setGroupToEdit,
    setWholeShowMore: state.setWholeShowMore,
    setWholeShowMoreDoing: state.setWholeShowMoreDoing,
    setWholeShowMoreDone: state.setWholeShowMoreDone,
    setShowMoreSort: state.setShowMoreSort,
    setShowSortGroup: state.setShowSortGroup,
    fetchTask: state.fetchTask,
    handleAddToDo: state.handleAddToDo,
    handleAddDoing: state.handleAddDoing,
    handleAddDone: state.handleAddDone,
    handleDeleteTask: state.handleDeleteTask,
    handleDuplicateTask: state.handleDuplicateTask,
    handleIsImportant: state.handleIsImportant,
    handleClearTask: state.handleClearTask,
    handleMoveTask: state.handleMoveTask,
    handleClearWholeTask: state.handleClearWholeTask,
    handleSortTaskDate: state.handleSortTaskDate,
    handleSortTaskName: state.handleSortTaskName,
    setShowMore: state.setShowMore,
    setDoingShowMore: state.setDoingShowMore,
    setDoneShowMore: state.setDoneShowMore,
  }));

  const {
    groupedTaskList,
    handleGroupTitle,
    editGroupTask,
    deleteGroupTask,
    editModeGroup,
    groupedTaskSelected,
    setEditModeGroup,
    setGroupedTaskSelected,
    setGroupedTaskList,

    handleSortingLength,
    handleSortingTitle,
    handleAddNewGroup,
    handleDeleteGroup,

    fetchGroup,
    setFetchGroup,
    clearWholeTask,
  } = useTaskListGroup((state) => ({
    groupedTaskList: state.groupedTaskList,
    editModeGroup: state.editModeGroup,
    groupedTaskSelected: state.groupedTaskSelected,
    setEditModeGroup: state.setEditModeGroup,
    setGroupedTaskSelected: state.setGroupedTaskSelected,
    handleGroupTitle: state.handleGroupTitle,
    editGroupTask: state.editGroupTask,
    deleteGroupTask: state.deleteGroupTask,
    setGroupedTaskList: state.setGroupedTaskList,

    handleSortingLength: state.handleSortingLength,
    handleSortingTitle: state.handleSortingTitle,
    handleAddNewGroup: state.handleAddNewGroup,
    handleDeleteGroup: state.handleDeleteGroup,
    fetchGroup: state.fetchGroup,
    setFetchGroup: state.setFetchGroup,
    clearWholeTask: state.clearWholeTask,
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToNewTask = (taskType) => {
    if (taskType === "ToDo") {
      if (newTaskRef.current && addMode) {
        newTaskRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (taskType === "Doing") {
      if (newTaskRefDoing.current && doingAddMode) {
        newTaskRefDoing.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (taskType === "Done") {
      if (newTaskRefDone.current && doneAddMode) {
        newTaskRefDone.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleTaskGroupName = () => {
    const groupSelected = groupedTaskList.find(
      (group) => group.id === groupedTaskSelected
    );

    const groupData = { taskGroupName: groupSelected.taskGroupName };
    axios
      .post(
        `http://localhost:3000/api/tasks-list/${groupedTaskSelected}/group-title-change`,
        groupData,
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/user/private/data`, {
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

  const fetchGroupData = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/tasks-list`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.taskGroup.length > 0) {
          setGroupedTaskList(res.data.taskGroup[0].taskGroupList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroup, fetchTask]);

  useEffect(() => {
    if (groupedTaskList.length < 1) {
      navigate("/client/tasks-list");
    }
  }, [groupedTaskList]);

  useEffect(() => {
    if (groupedTaskSelected !== null) {
      navigate(`/client/tasks-list/${groupedTaskSelected}`);
    }
  }, [groupedTaskSelected]);

  const groupLength = groupedTaskList
    .filter((group) => group.id === groupedTaskSelected)
    .map(
      (d) =>
        d.taskList.toDoList.length +
        d.taskList.doingList.length +
        d.taskList.doneList.length
    );

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
          className={`poppins-regular w-full flex h-full justify-center items-start ${
            darkMode && theme === "dark" && "dark"
          }`}
        >
          {showSidebar && (
            <div className="w-full h-full fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
          )}
          <Sidebar />
          <div
            className={`dark:bg-neutral-900 w-full md:w-[70%] lg:w-[80%] ${
              windowWidth < 768 && groupLength > 2 ? "h-auto" : "h-[100vh]"
            }  md:h-full py-5 md:py-0 flex flex-col flex-center absolute right-0`}
          >
            <Nav
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              setShowListGroup={setShowListGroup}
              setShowSortGroup={setShowSortGroup}
              theme={theme}
            />
            <div className="w-[90%] h-full flex justify-center items-start">
              <div className="w-full flex flex-col flex-center">
                <div className="w-full flex flex-center mb-5 gap-2">
                  <strong className="font-normal text-[2.5rem] dark:text-white">
                    T<span className="text-[#DE3163]">a</span>sk Li
                    <span className="text-[#DE3163]">s</span>t
                  </strong>
                </div>

                <div className="w-full mb-2 flex justify-start items-start">
                  <div className="flex relative bg-red-500">
                    <div
                      className="w-max border border-gray-300 border-r-0 hover:bg-[#FF004F] text-white px-2 py-1 cursor-pointer transition-all"
                      onClick={() => {
                        handleAddNewGroup();
                        setShowListGroup(false);
                        setShowSortGroup(false);
                      }}
                    >
                      <h1 className="text-[.95rem]"> New Group </h1>
                    </div>
                    <div
                      className="w-max flex flex-center border border-gray-300 hover:bg-[#FF004F] hover:text-white px-2 py-1 cursor-pointer transition-all"
                      onClick={() => {
                        setShowListGroup(!showListGroup);
                        setWholeShowMore(false);
                        setWholeShowMoreDoing(false);
                        setWholeShowMoreDone(false);
                        setShowSortGroup(false);
                      }}
                    >
                      <img
                        src={downArrowLight}
                        alt="down-arrow"
                        className="w-[18px]"
                      />
                    </div>
                    {showListGroup && (
                      <ShowListGroup
                        setShowListGroup={setShowListGroup}
                        setShowSortGroup={setShowSortGroup}
                        showSortGroup={showSortGroup}
                        handleSortingTitle={handleSortingTitle}
                        handleSortingLength={handleSortingLength}
                        groupedTaskList={groupedTaskList}
                        editModeGroup={editModeGroup}
                        groupToEdit={groupToEdit}
                        setGroupedTaskSelected={setGroupedTaskSelected}
                        setEditModeGroup={setEditModeGroup}
                        editGroupTask={editGroupTask}
                        setGroupToEdit={setGroupToEdit}
                        setShowDeleteGroupModal={setShowDeleteGroupModal}
                        setGroupToDelete={setGroupToDelete}
                        groupedTaskSelected={groupedTaskSelected}
                        showDeleteGroupModal={showDeleteGroupModal}
                        groupToDelete={groupToDelete}
                        deleteGroupTask={deleteGroupTask}
                        navigate={navigate}
                        handleGroupTitle={handleGroupTitle}
                        handleTaskGroupName={handleTaskGroupName}
                        handleAddNewGroup={handleAddNewGroup}
                        handleDeleteGroup={handleDeleteGroup}
                        setFetchGroup={setFetchGroup}
                        theme={theme}
                      />
                    )}
                  </div>
                </div>

                <hr className="w-full border-b border-gray-200 mb-2" />

                <div className="w-full pb-5 md:pb-0">
                  {groupedTaskList.length > 0 ? (
                    groupedTaskList
                      .filter((group) => group.id === groupedTaskSelected)
                      .map((data, i) => {
                        return (
                          <div key={i}>
                            {windowWidth < 768 ? (
                              <div className="w-full grid col-span-1 gap-3 ">
                                <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-red-500 text-white">
                                  <span className="text-center text-white">
                                    To Do
                                  </span>

                                  <img
                                    src={moreLight}
                                    alt="more-light"
                                    className="w-[20px] cursor-pointer"
                                    onClick={() => {
                                      setWholeShowMore(!wholeShowMore);
                                      setWholeShowMoreDoing(false);
                                      setWholeShowMoreDone(false);
                                      setShowMoreSort(false);
                                      setShowListGroup(false);
                                      setShowSortGroup(false);
                                    }}
                                  />

                                  {wholeShowMore && (
                                    <WholeShowMore
                                      setModalIsClicked={setModalIsClicked}
                                      setTaskToClear={setTaskToClear}
                                      setShowMoreSort={setShowMoreSort}
                                      showMoreSort={showMoreSort}
                                      handleSortTaskName={handleSortTaskName}
                                      handleSortTaskDate={handleSortTaskDate}
                                      type={"ToDo"}
                                      theme={theme}
                                    />
                                  )}

                                  {modalIsClicked && (
                                    <ClearTasksModal
                                      clearWholeTask={clearWholeTask}
                                      taskToClear={taskToClear}
                                      setModalIsClicked={setModalIsClicked}
                                      handleClearWholeTask={
                                        handleClearWholeTask
                                      }
                                    />
                                  )}
                                </div>
                                {data.taskList.toDoList.map((task, i) => (
                                  <ToDo
                                    key={i}
                                    task={task}
                                    i={i}
                                    scrollToNewTask={scrollToNewTask}
                                    handleDeleteTask={handleDeleteTask}
                                    handleDuplicateTask={handleDuplicateTask}
                                    groupedTaskSelected={groupedTaskSelected}
                                    handleIsImportant={handleIsImportant}
                                    handleClearTask={handleClearTask}
                                    handleMoveTask={handleMoveTask}
                                    theme={theme}
                                  />
                                ))}
                                <div
                                  className="w-full h-max px-2 hover:bg-gray-100 text-gray-400 rounded-lg cursor-pointer"
                                  onClick={() => {
                                    handleAddToDo();
                                    setWholeShowMore(false);
                                    setShowMore(false);
                                    setShowListGroup(false);
                                    setShowSortGroup(false);
                                  }}
                                  ref={newTaskRef}
                                >
                                  <h1 className="w-full flex items-center gap-2">
                                    <span className="text-[1.4rem]"> + </span>
                                    New Task
                                  </h1>
                                </div>

                                <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-orange-500 text-white">
                                  <span className="text-center">Doing</span>
                                  <img
                                    src={moreLight}
                                    alt="more-light"
                                    className="w-[20px] cursor-pointer"
                                    onClick={() => {
                                      setWholeShowMoreDoing(
                                        !wholeShowMoreDoing
                                      );
                                      setWholeShowMore(false);
                                      setWholeShowMoreDone(false);
                                      setShowMoreSort(false);
                                      setShowListGroup(false);
                                      setShowSortGroup(false);
                                    }}
                                  />
                                  {wholeShowMoreDoing && (
                                    <WholeShowMore
                                      setModalIsClicked={setModalIsClicked}
                                      setTaskToClear={setTaskToClear}
                                      setShowMoreSort={setShowMoreSort}
                                      showMoreSort={showMoreSort}
                                      handleSortTaskName={handleSortTaskName}
                                      handleSortTaskDate={handleSortTaskDate}
                                      type={"Doing"}
                                      theme={theme}
                                    />
                                  )}
                                </div>
                                {data.taskList.doingList.map((task, i) => (
                                  <Doing
                                    key={i}
                                    task={task}
                                    i={i}
                                    scrollToNewTask={scrollToNewTask}
                                    handleDeleteTask={handleDeleteTask}
                                    handleDuplicateTask={handleDuplicateTask}
                                    groupedTaskSelected={groupedTaskSelected}
                                    handleIsImportant={handleIsImportant}
                                    handleClearTask={handleClearTask}
                                    handleMoveTask={handleMoveTask}
                                    theme={theme}
                                  />
                                ))}
                                <div
                                  className="w-full h-max px-2 hover:bg-gray-100 text-gray-400 rounded-lg cursor-pointer"
                                  onClick={() => {
                                    handleAddDoing();
                                    setWholeShowMoreDoing(false);
                                    setShowMore(false);
                                    setShowListGroup(false);
                                    setShowSortGroup(false);
                                  }}
                                  ref={newTaskRefDoing}
                                >
                                  <h1 className="w-full flex items-center gap-2">
                                    <span className="text-[1.4rem]"> + </span>
                                    New Task
                                  </h1>
                                </div>

                                <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-green-500 text-white">
                                  <span> Done </span>
                                  <img
                                    src={moreLight}
                                    alt="more-light"
                                    className="w-[20px] cursor-pointer"
                                    onClick={() => {
                                      setWholeShowMoreDone(!wholeShowMoreDone);
                                      setWholeShowMoreDoing(false);
                                      setWholeShowMore(false);
                                      setShowMoreSort(false);
                                      setShowListGroup(false);
                                      setShowSortGroup(false);
                                    }}
                                  />
                                  {wholeShowMoreDone && (
                                    <WholeShowMore
                                      setModalIsClicked={setModalIsClicked}
                                      setTaskToClear={setTaskToClear}
                                      setShowMoreSort={setShowMoreSort}
                                      showMoreSort={showMoreSort}
                                      handleSortTaskName={handleSortTaskName}
                                      handleSortTaskDate={handleSortTaskDate}
                                      type={"Done"}
                                      theme={theme}
                                    />
                                  )}
                                </div>
                                {data.taskList.doneList.map((task, i) => (
                                  <Done
                                    key={i}
                                    task={task}
                                    i={i}
                                    scrollToNewTask={scrollToNewTask}
                                    handleDeleteTask={handleDeleteTask}
                                    handleDuplicateTask={handleDuplicateTask}
                                    groupedTaskSelected={groupedTaskSelected}
                                    handleIsImportant={handleIsImportant}
                                    handleClearTask={handleClearTask}
                                    theme={theme}
                                  />
                                ))}
                                <div
                                  className="w-full h-max px-2 hover:bg-gray-100 text-gray-400 rounded-lg cursor-pointer"
                                  onClick={() => {
                                    handleAddDone();
                                    setWholeShowMoreDone(false);
                                    setShowMore(false);
                                    setShowListGroup(false);
                                    setShowSortGroup(false);
                                  }}
                                  ref={newTaskRefDone}
                                >
                                  <h1 className="w-full flex items-center gap-2">
                                    <span className="text-[1.4rem]"> + </span>
                                    New Task
                                  </h1>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div
                                  key={i}
                                  className="w-full grid grid-cols-3 mb-2 gap-5 "
                                >
                                  <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-red-500 text-white">
                                    <span className="text-center text-white">
                                      To Do
                                    </span>

                                    <img
                                      src={moreLight}
                                      alt="more-light"
                                      className="w-[20px] cursor-pointer"
                                      onClick={() => {
                                        setWholeShowMore(!wholeShowMore);
                                        setWholeShowMoreDoing(false);
                                        setWholeShowMoreDone(false);
                                        setShowMoreSort(false);
                                        setShowListGroup(false);
                                        setShowSortGroup(false);
                                      }}
                                    />

                                    {wholeShowMore && (
                                      <WholeShowMore
                                        setModalIsClicked={setModalIsClicked}
                                        setTaskToClear={setTaskToClear}
                                        setShowMoreSort={setShowMoreSort}
                                        showMoreSort={showMoreSort}
                                        handleSortTaskName={handleSortTaskName}
                                        handleSortTaskDate={handleSortTaskDate}
                                        type={"ToDo"}
                                        theme={theme}
                                      />
                                    )}

                                    {modalIsClicked && (
                                      <ClearTasksModal
                                        clearWholeTask={clearWholeTask}
                                        taskToClear={taskToClear}
                                        setModalIsClicked={setModalIsClicked}
                                        handleClearWholeTask={
                                          handleClearWholeTask
                                        }
                                      />
                                    )}
                                  </div>

                                  <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-orange-500 text-white">
                                    <span className="text-center">Doing</span>
                                    <img
                                      src={moreLight}
                                      alt="more-light"
                                      className="w-[20px] cursor-pointer"
                                      onClick={() => {
                                        setWholeShowMoreDoing(
                                          !wholeShowMoreDoing
                                        );
                                        setWholeShowMore(false);
                                        setWholeShowMoreDone(false);
                                        setShowMoreSort(false);
                                        setShowListGroup(false);
                                        setShowSortGroup(false);
                                      }}
                                    />
                                    {wholeShowMoreDoing && (
                                      <WholeShowMore
                                        setModalIsClicked={setModalIsClicked}
                                        setTaskToClear={setTaskToClear}
                                        setShowMoreSort={setShowMoreSort}
                                        showMoreSort={showMoreSort}
                                        handleSortTaskName={handleSortTaskName}
                                        handleSortTaskDate={handleSortTaskDate}
                                        type={"Doing"}
                                        theme={theme}
                                      />
                                    )}
                                  </div>

                                  <div className="relative w-full px-2 py-1 flex justify-between items-center col-span-1 bg-green-500 text-white">
                                    <span> Done </span>
                                    <img
                                      src={moreLight}
                                      alt="more-light"
                                      className="w-[20px] cursor-pointer"
                                      onClick={() => {
                                        setWholeShowMoreDone(
                                          !wholeShowMoreDone
                                        );
                                        setWholeShowMoreDoing(false);
                                        setWholeShowMore(false);
                                        setShowMoreSort(false);
                                        setShowListGroup(false);
                                        setShowSortGroup(false);
                                      }}
                                    />
                                    {wholeShowMoreDone && (
                                      <WholeShowMore
                                        setModalIsClicked={setModalIsClicked}
                                        setTaskToClear={setTaskToClear}
                                        setShowMoreSort={setShowMoreSort}
                                        showMoreSort={showMoreSort}
                                        handleSortTaskName={handleSortTaskName}
                                        handleSortTaskDate={handleSortTaskDate}
                                        type={"Done"}
                                        theme={theme}
                                      />
                                    )}
                                  </div>
                                </div>

                                <div className="w-full h-[60vh] grid grid-cols-3 gap-5">
                                  <div className="overflow-y-scroll">
                                    <div className="w-full h-max grid col-span-1 gap-5">
                                      {data.taskList.toDoList.map((task, i) => (
                                        <ToDo
                                          key={i}
                                          task={task}
                                          i={i}
                                          scrollToNewTask={scrollToNewTask}
                                          handleDeleteTask={handleDeleteTask}
                                          handleDuplicateTask={
                                            handleDuplicateTask
                                          }
                                          groupedTaskSelected={
                                            groupedTaskSelected
                                          }
                                          handleIsImportant={handleIsImportant}
                                          handleClearTask={handleClearTask}
                                          handleMoveTask={handleMoveTask}
                                          theme={theme}
                                        />
                                      ))}

                                      <div
                                        className="w-full h-max px-2 hover:bg-gray-100 dark:hover:bg-[#DE3163] dark:text-white text-gray-400 rounded-lg cursor-pointer"
                                        onClick={() => {
                                          handleAddToDo();
                                          setShowMore(false);
                                          setShowListGroup(false);
                                          setShowSortGroup(false);
                                        }}
                                        ref={newTaskRef}
                                      >
                                        <h1 className="w-full flex items-center gap-2">
                                          <span className="text-[1.4rem]">
                                            {" "}
                                            +{" "}
                                          </span>
                                          New Task
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="overflow-y-scroll">
                                    <div className="w-full h-max grid col-span-1 gap-5 ">
                                      {data.taskList.doingList.map(
                                        (task, i) => (
                                          <Doing
                                            key={i}
                                            task={task}
                                            i={i}
                                            scrollToNewTask={scrollToNewTask}
                                            handleDeleteTask={handleDeleteTask}
                                            handleDuplicateTask={
                                              handleDuplicateTask
                                            }
                                            groupedTaskSelected={
                                              groupedTaskSelected
                                            }
                                            handleIsImportant={
                                              handleIsImportant
                                            }
                                            handleClearTask={handleClearTask}
                                            handleMoveTask={handleMoveTask}
                                            theme={theme}
                                          />
                                        )
                                      )}

                                      <div
                                        className="w-full h-max px-2 hover:bg-gray-100 dark:hover:bg-[#DE3163] dark:text-white text-gray-400 rounded-lg cursor-pointer"
                                        onClick={() => {
                                          handleAddDoing();
                                          setDoingShowMore(false);
                                          setShowListGroup(false);
                                          setShowSortGroup(false);
                                        }}
                                        ref={newTaskRefDoing}
                                      >
                                        <h1 className="w-full flex items-center gap-2">
                                          <span className="text-[1.4rem]">
                                            {" "}
                                            +{" "}
                                          </span>
                                          New Task
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="overflow-y-scroll">
                                    <div className="w-full h-max grid col-span-1 gap-5 ">
                                      {data.taskList.doneList.map((task, i) => (
                                        <Done
                                          key={i}
                                          task={task}
                                          i={i}
                                          scrollToNewTask={scrollToNewTask}
                                          handleDeleteTask={handleDeleteTask}
                                          handleDuplicateTask={
                                            handleDuplicateTask
                                          }
                                          groupedTaskSelected={
                                            groupedTaskSelected
                                          }
                                          handleIsImportant={handleIsImportant}
                                          handleClearTask={handleClearTask}
                                          theme={theme}
                                        />
                                      ))}

                                      <div
                                        className="w-full h-max px-2 hover:bg-gray-100 dark:hover:bg-[#DE3163] dark:text-white text-gray-400 rounded-lg cursor-pointer"
                                        onClick={() => {
                                          handleAddDone();
                                          setDoneShowMore(false);
                                          setShowListGroup(false);
                                          setShowSortGroup(false);
                                        }}
                                        ref={newTaskRefDone}
                                      >
                                        <h1 className="w-full flex items-center gap-2">
                                          <span className="text-[1.4rem]">
                                            {" "}
                                            +{" "}
                                          </span>
                                          New Task
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksList;
