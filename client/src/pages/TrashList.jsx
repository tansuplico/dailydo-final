import React from "react";
import sortNotesDark from "../assets/sort-notes-dark.png";
import recoverDark from "../assets/recover-dark.png";
import recoverLight from "../assets/recover-light.png";
import deleteDark from "../assets/delete-dark.png";
import deleteLight from "../assets/delete-light.png";
import { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  useNotesListStore,
  useTrashListStore,
  useSidebarStore,
} from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SortMenu from "../components/trashlist/SortMenu";
import MiniNav from "../components/trashlist/MiniNav";
import EmptyTrashNotif from "../components/trashlist/EmptyTrashNotif";
import ScrollHeader from "../components/trashlist/ScrollHeader";
import TrashCollection from "../components/trashlist/TrashCollection";
import Sidebar from "../components/global/Sidebar";
import DeletePerm from "../components/modals/DeletePerm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const Trashlist = () => {
  const navigate = useNavigate();
  const recoveredAlert = () => toast.success("Note Recovered");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  const { showSortPosition, contentChange, setShowSortPosition } =
    useNotesListStore((state) => ({
      showSortPosition: state.showSortPosition,
      contentChange: state.contentChange,
      setShowSortPosition: state.setShowSortPosition,
    }));

  const {
    trashList,
    trashSelected,
    setTrashSelected,
    setTrashList,
    removePerm,
    setRemovePerm,
    showSortTrashMenu,
    setShowSortTrashMenu,
    fetchGroup,
    handleDeleteTrash,
    handleRecoverTrash,
    handleSortNoteTitle,
    handleSortNoteDate,
  } = useTrashListStore((state) => ({
    trashList: state.trashList,
    trashSelected: state.trashSelected,
    setTrashSelected: state.setTrashSelected,
    setTrashList: state.setTrashList,
    removePerm: state.removePerm,
    setRemovePerm: state.setRemovePerm,
    showSortTrashMenu: state.showSortTrashMenu,
    setShowSortTrashMenu: state.setShowSortTrashMenu,
    fetchGroup: state.fetchGroup,
    handleDeleteTrash: state.handleDeleteTrash,
    handleRecoverTrash: state.handleRecoverTrash,
    handleSortNoteTitle: state.handleSortNoteTitle,
    handleSortNoteDate: state.handleSortNoteDate,
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

  const fetchPrivateData = () => {
    setIsLoading(true);
    axios
      .get(`https://dailydo-0bc4.onrender.com/api/user/private/data`, {
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

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get("https://dailydo-0bc4.onrender.com/api/trash-list", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        const trash = res.data.fetchedData[0].trashList;
        setTrashList(trash);
        setTrashSelected(trash.length > 0 ? trash[0].id : null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPrivateData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchGroup]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (trashList.length == 1) {
      setTrashSelected(trashList[0].id);
    }
  }, []);

  useEffect(() => {
    if (trashList.length < 1) {
      navigate("/client/trash");
    } else if (trashList.length > 0) {
      setTrashSelected(trashList[0].id);
    }
  }, [trashList]);

  useEffect(() => {
    if (trashSelected !== null) {
      navigate(`/client/trash/${trashSelected}`);
    }
  }, [trashSelected]);

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
          className={`w-full flex md:h-full justify-center items-start relative ${
            darkMode && theme === "dark" && "dark"
          }`}
        >
          {showSidebar && (
            <div className="w-full fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
          )}
          <Sidebar />
          <div className="w-full md:w-[70%] lg:w-[80%] md:h-[100vh] dark:bg-neutral-900 dark:text-white flex flex-col md:flex-row absolute right-0">
            {windowWidth < 768 ? (
              <div
                className={`w-full ${
                  trashList.length === 0 ? "h-[100vh]" : "h-[50%]"
                } md:h-full flex flex-col ${
                  showSortTrashMenu ? "overflow-x-hidden" : "overflow-y-scroll"
                }`}
              >
                <div className="w-full flex flex-col py-2 px-5 border-b-2 relative ">
                  <ScrollHeader
                    trashList={trashList}
                    sortNotesDark={sortNotesDark}
                    showSortTrashMenu={showSortTrashMenu}
                    setShowSortTrashMenu={setShowSortTrashMenu}
                    setShowSortPosition={setShowSortPosition}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    theme={theme}
                  />

                  {showSortTrashMenu && (
                    <SortMenu
                      showSortPosition={showSortPosition}
                      showSortTrashMenu={showSortTrashMenu}
                      setShowSortTrashMenu={setShowSortTrashMenu}
                      handleSortNoteTitle={handleSortNoteTitle}
                      handleSortNoteDate={handleSortNoteDate}
                      theme={theme}
                    />
                  )}
                </div>

                <div className="w-full py-5 px-5 flex flex-center">
                  <Swiper
                    slidesPerView={
                      windowWidth < 425 ? 1 : windowWidth < 768 ? 2 : 1
                    }
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    className="w-full h-full flex"
                  >
                    {trashList.map((note, i) => {
                      return (
                        <SwiperSlide className="w-full" key={i}>
                          <TrashCollection
                            key={i}
                            note={note}
                            i={i}
                            trashSelected={trashSelected}
                            setTrashSelected={setTrashSelected}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                {trashList.length < 1 && (
                  <EmptyTrashNotif
                    deleteDark={deleteDark}
                    deleteLight={deleteLight}
                    theme={theme}
                    darkMode={darkMode}
                  />
                )}
              </div>
            ) : (
              <ResizableBox
                width={300}
                height={Infinity}
                className="bg-[#F5F5F5] dark:bg-neutral-900 flex overflow-y-scroll "
                resizeHandles={["e"]}
                minConstraints={[300, Infinity]}
                maxConstraints={[700, Infinity]}
              >
                <div
                  className={`w-full h-full flex flex-col  ${
                    showSortTrashMenu
                      ? "overflow-y-hidden"
                      : "overflow-y-scroll"
                  }`}
                >
                  <div
                    className={`w-full ${
                      trashList.length > 0 && "pb-[2rem]"
                    } grid grid-cols-1 gap-5 resize-x`}
                  >
                    <div className="w-full py-2 flex flex-col px-5 pb-4 border-b-2 relative z-30">
                      <ScrollHeader
                        trashList={trashList}
                        showSortTrashMenu={showSortTrashMenu}
                        setShowSortTrashMenu={setShowSortTrashMenu}
                        setShowSortPosition={setShowSortPosition}
                        theme={theme}
                      />

                      {showSortTrashMenu && (
                        <SortMenu
                          showSortPosition={showSortPosition}
                          showSortTrashMenu={showSortTrashMenu}
                          setShowSortTrashMenu={setShowSortTrashMenu}
                          handleSortNoteTitle={handleSortNoteTitle}
                          handleSortNoteDate={handleSortNoteDate}
                          theme={theme}
                        />
                      )}
                    </div>
                    {trashList.length > 0 &&
                      trashList.map((note, i) => {
                        return (
                          <TrashCollection
                            key={i}
                            note={note}
                            i={i}
                            trashSelected={trashSelected}
                            setTrashSelected={setTrashSelected}
                          />
                        );
                      })}
                  </div>
                  {trashList.length < 1 && (
                    <EmptyTrashNotif
                      deleteDark={deleteDark}
                      deleteLight={deleteLight}
                      theme={theme}
                      darkMode={darkMode}
                    />
                  )}
                </div>
              </ResizableBox>
            )}

            <div className="w-full md:w-[77%] h-[50%] md:h-full">
              {trashSelected
                ? trashList
                    .filter((data) => data.id === trashSelected)
                    .map((note, i) => {
                      return (
                        <div className="w-full h-full md:h-[95%]" key={i}>
                          <MiniNav
                            recoverDark={recoverDark}
                            recoverLight={recoverLight}
                            deleteDark={deleteDark}
                            deleteLight={deleteLight}
                            handleRecoverTrash={handleRecoverTrash}
                            recoveredAlert={recoveredAlert}
                            setRemovePerm={setRemovePerm}
                            theme={theme}
                          />

                          <ReactQuill
                            theme="snow"
                            value={note.content}
                            onChange={(value) => contentChange(note.id, value)}
                            className="h-[70vh] md:h-[80vh] textbox:h-[85.5vh] pb-[5rem] md:pb-0 dark:text-white"
                            readOnly
                          />
                        </div>
                      );
                    })
                : trashList
                    .filter((data) => data.id === 1)
                    .map((note, i) => {
                      return (
                        <div className="w-full h-full md:h-[95%]" key={i}>
                          <ReactQuill
                            theme="snow"
                            value={note.content}
                            onChange={(value) => contentChange(note.id, value)}
                            className="h-[70vh] md:h-[80vh] textbox:h-[85.5vh] pb-[5rem] md:pb-0 dark:text-white"
                            readOnly
                          />
                        </div>
                      );
                    })}
            </div>
          </div>

          {removePerm && (
            <DeletePerm
              handleDeleteTrash={handleDeleteTrash}
              trashSelected={trashSelected}
              setRemovePerm={setRemovePerm}
              theme={theme}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Trashlist;
