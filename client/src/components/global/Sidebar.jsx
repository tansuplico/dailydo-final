import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import taskIconDark from "../../assets/task-list-dark.png";
import taskIconLight from "../../assets/task-list-light.png";
import notesDark from "../../assets/notes-dark.png";
import notesLight from "../../assets/notes-light.png";
import plusLight from "../../assets/plus-light.png";
import plusCerise from "../../assets/plus-cerise.png";
import startLight from "../../assets/start-light.png";
import helpLight from "../../assets/help-light.png";
import arrowRightLight from "../../assets/thin-right-light.png";
import settingsLight from "../../assets/settings-light.png";
import deleteLight from "../../assets/delete-light.png";
import favoriteLight from "../../assets/favorite-light.png";
import timerLight from "../../assets/timer-light.png";
import SettingsModal from "../modals/SettingsModal";
import defaultImage from "../../assets/default-alora.png";
import menuLight from "../../assets/menu-icon-light.png";
import ContentUnavailable from "../modals/ContentUnavailable";
import axios from "axios";
import {
  useNotesListStore,
  useSidebarStore,
  useTrashListStore,
  useTaskListGroup,
  useTaskListStore,
} from "../../store/store";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    settingsFetched,
    notesSideDrop,
    changeNotesSideValue,
    showSidebar,
    setShowSidebar,
  } = useSidebarStore((state) => ({
    settingsFetched: state.settingsFetched,
    notesSideDrop: state.notesSideDrop,
    changeNotesSideValue: state.changeNotesSideValue,
    showSidebar: state.showSidebar,
    setShowSidebar: state.setShowSidebar,
  }));

  const { noteLists, noteSelected, setNoteSelected, setNoteLists } =
    useNotesListStore((state) => ({
      noteLists: state.noteLists,
      noteSelected: state.noteSelected,

      setNoteSelected: state.setNoteSelected,
      setNoteLists: state.setNoteLists,
    }));

  const { trashList, trashSelected } = useTrashListStore((state) => ({
    trashList: state.trashList,
    trashSelected: state.trashSelected,
  }));

  const {
    groupedTaskList,
    groupedTaskSelected,
    setGroupedTaskList,
    setGroupedTaskSelected,
  } = useTaskListGroup((state) => ({
    groupedTaskList: state.groupedTaskList,
    groupedTaskSelected: state.groupedTaskSelected,
    setGroupedTaskList: state.setGroupedTaskList,
    setGroupedTaskSelected: state.setGroupedTaskSelected,
  }));

  const { setShowListGroup, setShowSortGroup } = useTaskListStore((state) => ({
    setShowListGroup: state.setShowListGroup,
    setShowSortGroup: state.setShowSortGroup,
  }));

  const [userName, setUserName] = useState("");
  const [verifiedUserImage, setVerifiedUserImage] = useState(defaultImage);
  const [settingIsClicked, setSettingIsClicked] = useState(false);
  const [createNewHover, setCreateNewHover] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCreateNewOptions, setShowCreateNewOptions] = useState(false);
  const [createNewOptionsHover, setCreateNewOptionsHover] = useState(null);
  const [contentUnavailable, setContentUnavailable] = useState(false);

  useEffect(() => {
    if (settingIsClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [settingIsClicked]);

  useEffect(() => {
    fetchData();
  }, [settingsFetched]);

  const fetchData = () => {
    axios
      .get(`https://dailydo-0bc4.onrender.com/api/user/private/data`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res.data.findUserData.username);
        setVerifiedUserImage(res.data.findUserData.picture);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://dailydo-0bc4.onrender.com/api/notes", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.notes.length > 0) {
          setNoteLists(response.data.notes[0].noteList);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });

    axios
      .get("https://dailydo-0bc4.onrender.com/api/tasks-list", {
        withCredentials: true,
      })
      .then((res) => {
        const mappedTaskGroup = res.data.taskGroup[0].taskGroupList;
        setGroupedTaskList(mappedTaskGroup);
        setGroupedTaskSelected(mappedTaskGroup[0].id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <aside
      className={`poppins-regular w-[80%] md:w-[30%] lg:w-[20%] h-full bg-[#DE3163] dark:bg-[#242124] text-white fixed  ${
        showSidebar ? "left-0" : "left-[-70rem]"
      } md:left-0 z-50 transition-all`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-[10%] py-2 px-5 flex flex-center gap-3">
          <div className="w-full flex justify-start items-center gap-2">
            <div className="rounded-[50%]">
              <img
                src={verifiedUserImage}
                alt="user-icon"
                className="w-[45px] h-[45px] rounded-[50%]"
              />
            </div>

            <h1> {userName} </h1>
          </div>

          <div className="flex gap-3 items-center">
            <img
              src={settingsLight}
              alt="settings-light"
              className="w-[22px] h-[20px] cursor-pointer"
              onClick={() => {
                setSettingIsClicked(true);
                setShowListGroup(false);
                setShowSortGroup(false);
              }}
            />

            <img
              src={menuLight}
              alt="menu-light"
              className="w-[22px] h-[25px] block md:hidden"
              onClick={() => {
                setShowSidebar(false);
                setShowListGroup(false);
                setShowSortGroup(false);
              }}
            />
          </div>
        </div>

        {settingIsClicked && (
          <>
            <div className="fixed inset-0 overflow-hidden bg-black bg-opacity-50 flex justify-center items-center z-50">
              <SettingsModal setSettingIsClicked={setSettingIsClicked} />
            </div>
          </>
        )}

        <ul className="w-full h-[70%] flex flex-col justify-start items-center overflow-hidden">
          <div className="w-full flex flex-center relative">
            <div
              className="w-[90%] group bg-white text-[#DE3163] rounded-lg my-2 py-2 px-5 flex justify-start items-center gap-3 cursor-pointer transition-all hover:bg-[#FF004F]"
              onMouseEnter={() => setCreateNewHover(true)}
              onMouseLeave={() => setCreateNewHover(false)}
              onClick={() => {
                setShowCreateNewOptions((val) => !val);
                setShowListGroup(false);
                setShowSortGroup(false);
              }}
            >
              <img
                src={createNewHover ? plusLight : plusCerise}
                alt="plus-light"
                className="w-[20px] "
              />
              <strong className="poppins-regular group-hover:text-white">
                Create New
              </strong>
            </div>
            <div
              className={`w-[90%] flex p-2 bg-white text-[#DE3163] absolute ${
                showCreateNewOptions
                  ? "opacity-1 visible"
                  : "opacity-0 invisible"
              } top-[3.2rem] rounded-md overflow-hidden transition-all`}
            >
              <div className="w-full flex flex-col gap-2">
                <Link
                  to={`/client/tasks-list${
                    groupedTaskList.length > 0 ? `/${groupedTaskSelected}` : ""
                  }`}
                  onClick={() => {
                    setShowSidebar(false);
                    setShowListGroup(false);
                    setShowSortGroup(false);
                  }}
                >
                  <div
                    className="flex items-center p-2 gap-3 hover:bg-[#DE3163] hover:text-white cursor-pointer rounded-md"
                    onMouseEnter={() => setCreateNewOptionsHover(1)}
                    onMouseLeave={() => setCreateNewOptionsHover(null)}
                  >
                    <img
                      src={
                        createNewOptionsHover === 1
                          ? taskIconLight
                          : taskIconDark
                      }
                      className="w-[20px] h-[20px]"
                    />
                    <h1> New Task </h1>
                  </div>
                </Link>
                <Link
                  to={`/client/notes${
                    noteLists.length > 0 ? `/${noteSelected}` : ""
                  }`}
                  onClick={() => {
                    setShowSidebar(false);
                    setShowListGroup(false);
                    setShowSortGroup(false);
                  }}
                >
                  <div
                    className="flex items-center p-2 gap-3 hover:bg-[#DE3163] hover:text-white cursor-pointer rounded-md"
                    onMouseEnter={() => setCreateNewOptionsHover(2)}
                    onMouseLeave={() => setCreateNewOptionsHover(null)}
                  >
                    <img
                      src={createNewOptionsHover === 2 ? notesLight : notesDark}
                      className="w-[20px] h-[20px]"
                    />
                    <h1> New Note </h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/client/workspace"
            className="w-full"
            onClick={() => {
              setShowSidebar(false);
              setShowListGroup(false);
              setShowSortGroup(false);
            }}
          >
            <div className="w-full py-2 px-5 flex justify-start items-center gap-3 cursor-pointer transition-all hover:bg-[#FF004F]">
              <img src={startLight} alt="task-icon" className="w-[20px]" />
              <li> Workspace </li>
            </div>
          </Link>
          <Link
            to="/client/pomodoro"
            className="w-full"
            onClick={() => {
              setShowSidebar(false);
              setShowListGroup(false);
              setShowSortGroup(false);
            }}
          >
            <div className="w-full py-2 px-5 flex justify-start items-center gap-3 cursor-pointer transition-all hover:bg-[#FF004F]">
              <img src={timerLight} alt="task-icon" className="w-[20px]" />
              <li> Pomodoro Timer </li>
            </div>
          </Link>
          <Link
            to={`/client/tasks-list${
              groupedTaskList.length > 0 ? `/${groupedTaskSelected}` : ""
            }`}
            className="w-full"
            onClick={() => {
              setShowSidebar(false);
              setShowListGroup(false);
              setShowSortGroup(false);
            }}
          >
            <div className="w-full  py-2 px-5 flex justify-start items-center gap-3  cursor-pointer transition-all hover:bg-[#FF004F]">
              <img src={taskIconLight} alt="task-icon" className="w-[20px]" />
              <li> Tasks List </li>
            </div>
          </Link>
          <hr className="w-full bg-white my-2" />
          <div className="w-full hover:bg-[#FF004F] pr-2 flex justify-between items-center transition-all ">
            <Link
              to={`/client/notes${
                noteLists.length > 0 ? `/${noteSelected}` : ""
              }`}
              className="w-full"
              onClick={() => setShowSidebar(false)}
            >
              <div className="w-full py-2 flex  cursor-pointer">
                <div className="px-5 flex justify-start items-center gap-3 cursor-pointer ">
                  <img src={notesLight} alt="task-icon" className="w-[20px]" />
                  <li> Notes </li>
                </div>
              </div>
            </Link>
            {noteLists.length > 0 && (
              <img
                src={arrowRightLight}
                alt="arrow-right"
                className={`w-[17px] cursor-pointer transition-all ${
                  notesSideDrop && "rotate-90"
                }`}
                onClick={changeNotesSideValue}
              />
            )}
          </div>

          <>
            {noteLists.length > 1
              ? noteLists.slice(0, 3).map((data, i) => (
                  <div
                    key={i}
                    className={`w-full relative ${
                      notesSideDrop ? "h-[2rem]" : "h-auto"
                    } overflow-hidden `}
                    onClick={() => {
                      setNoteSelected(data.id);
                      navigate(`/client/notes/${data.id}`);
                      setShowSidebar(false);
                      setShowListGroup(false);
                      setShowSortGroup(false);
                    }}
                  >
                    <div
                      className={`w-full absolute ${
                        notesSideDrop ? "top-0" : "top-[-5rem]"
                      } py-1 px-10 flex items-center gap-2 cursor-pointer transition-all hover:bg-[#FF004F] duration-300`}
                    >
                      <img
                        src={notesLight}
                        alt="notes-light"
                        className="w-[15px]"
                      />
                      <h1 className="truncate">
                        {data.title ? data.title : "Untitled"}
                      </h1>
                    </div>
                  </div>
                ))
              : noteLists.map((data, i) => (
                  <div
                    key={i}
                    className={`w-full relative ${
                      notesSideDrop ? "h-[2rem]" : "h-auto"
                    } overflow-hidden`}
                    onClick={() => {
                      setNoteSelected(data.id);
                      navigate(`/client/notes/${data.id}`);
                      setShowSidebar(false);
                      setShowListGroup(false);
                      setShowSortGroup(false);
                    }}
                  >
                    <div
                      className={`w-full absolute ${
                        notesSideDrop ? "top-0" : "top-[-5rem]"
                      } py-1 px-10 flex items-center gap-2 cursor-pointer transition-all hover:bg-[#FF004F] duration-300`}
                    >
                      <img
                        src={notesLight}
                        alt="notes-light"
                        className="w-[15px]"
                      />
                      <h1 className="truncate">
                        {data.title ? data.title : "Untitled"}
                      </h1>
                    </div>
                  </div>
                ))}
          </>

          {noteLists.filter((notes) => notes.isFavorite).length > 0 && (
            <>
              <div className="w-full py-2 pl-5 pr-2 flex justify-between items-center gap-3 cursor-default transition-all hover:bg-[#FF004F]">
                <div className="w-max flex gap-3">
                  <img
                    src={favoriteLight}
                    alt="fav-icon"
                    className="w-[20px]"
                  />
                  <li> Favorites </li>
                </div>
                <img
                  src={arrowRightLight}
                  alt="arrow-right"
                  className={`w-[17px] cursor-pointer transition-all ${
                    showFavorites && "rotate-90"
                  }`}
                  onClick={() => {
                    setShowFavorites((val) => !val);
                    setShowListGroup(false);
                    setShowSortGroup(false);
                  }}
                />
              </div>

              {noteLists
                .filter((notes) => notes.isFavorite)
                .slice(0, 3)
                .map((data, i) => (
                  <div
                    key={i}
                    className={`w-full relative ${
                      showFavorites ? "h-[2rem]" : "h-auto"
                    } overflow-hidden`}
                    onClick={() => {
                      setNoteSelected(data.id);
                      navigate(`/client/notes/${data.id}`);
                      setShowListGroup(false);
                      setShowSortGroup(false);
                    }}
                  >
                    <div
                      className={`w-full absolute ${
                        showFavorites ? "top-0" : "top-[-5rem]"
                      } py-1 px-10 flex items-center gap-2 cursor-pointer transition-all hover:bg-[#FF004F] duration-300`}
                    >
                      <img
                        src={notesLight}
                        alt="notes-light"
                        className="w-[15px]"
                      />
                      <h1 className="truncate">
                        {data.title ? data.title : "Untitled"}
                      </h1>
                    </div>
                  </div>
                ))}
            </>
          )}
          <Link
            to={`/client/trash${
              trashList.length < 1 ? "" : `/${trashSelected}`
            }`}
            className="w-full"
            onClick={() => {
              setShowSidebar(false);
              setShowListGroup(false);
              setShowSortGroup(false);
            }}
          >
            <div className="w-full py-2 px-5 flex justify-start items-center gap-3 cursor-pointer transition-all hover:bg-[#FF004F]">
              <img src={deleteLight} alt="task-icon" className="w-[20px]" />
              <li> Trash </li>
            </div>
          </Link>
        </ul>
        <div className="w-full h-[20%] flex justify-end flex-col border-t">
          <div className="w-full h-full flex flex-center">
            <div
              className="px-5 py-2 font-bold bg-white rounded-full text-[#DE3163] cursor-pointer"
              onClick={() => setContentUnavailable(true)}
            >
              <h1> Get Premium Plan </h1>
            </div>
          </div>

          <div className="w-full mb-2">
            <div
              className="w-max flex px-5 gap-2 cursor-pointer"
              onClick={() => setContentUnavailable(true)}
            >
              <img src={helpLight} alt="help-light" className="w-[20px]" />
              <h1> Need Help? </h1>
            </div>
          </div>

          {contentUnavailable && (
            <ContentUnavailable setContentUnavailable={setContentUnavailable} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
