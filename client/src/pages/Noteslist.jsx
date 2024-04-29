import React from "react";
import Sidebar from "../components/global/Sidebar";
import { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import { useNavigate } from "react-router-dom";
import { useNotesListStore, useSidebarStore } from "../store/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ScrollHeader from "../components/notelist/ScrollHeader";
import SortMenu from "../components/notelist/SortMenu";
import NoteCollection from "../components/notelist/NoteCollection";
import NewNoteButton from "../components/notelist/NewNoteButton";
import EmptyNoteDisplay from "../components/notelist/EmptyNoteDisplay";
import MiniNav from "../components/notelist/MiniNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const Noteslist = () => {
  const navigate = useNavigate();
  const addedNotfy = () => toast.success("Added to Favorites");
  const deletedNotfy = () => toast.success("Removed from Favorites");
  const addedToTrash = () => toast.success("Added to Trash");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  const {
    noteLists,
    noteSelected,
    createTitleMode,
    showSortMenu,
    showSortPosition,
    setShowSortMenu,
    titleChange,
    falseTitleMode,
    handleTitleMode,
    contentChange,
    sortingFunction,
    setShowSortPosition,
    setNoteSelected,
    setCreateTitleMode,
    setNoteLists,

    fetchData,
    setFetchData,
    handleContentInput,
    handleNewNote,
    handleTrashNote,
    handleNoteFavorite,
    handleSortNoteTitle,
    handleSortNoteDate,
  } = useNotesListStore((state) => ({
    noteLists: state.noteLists,
    noteId: state.noteId,
    noteSelected: state.noteSelected,
    createTitleMode: state.createTitleMode,
    showSortMenu: state.showSortMenu,
    showSortPosition: state.showSortPosition,
    setShowSortMenu: state.setShowSortMenu,
    titleChange: state.titleChange,
    selectNote: state.selectNote,
    falseTitleMode: state.falseTitleMode,
    handleTitleMode: state.handleTitleMode,
    contentChange: state.contentChange,
    sortingFunction: state.sortingFunction,
    setShowSortPosition: state.setShowSortPosition,
    setNoteSelected: state.setNoteSelected,
    setCreateTitleMode: state.setCreateTitleMode,
    setNoteLists: state.setNoteLists,

    fetchData: state.fetchData,
    setFetchData: state.setFetchData,
    handleContentInput: state.handleContentInput,
    handleNewNote: state.handleNewNote,
    handleTrashNote: state.handleTrashNote,
    handleNoteFavorite: state.handleNoteFavorite,
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

  useEffect(() => {
    fetchPrivateData();
  }, []);

  const fetchNotesData = () => {
    setIsLoading(true);
    axios
      .get("https://dailydo-0bc4.onrender.com/api/notes", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        const notes = response.data.notes[0].noteList;
        setNoteLists(notes);
        const newNoteSelected = calculateNoteSelected(notes, noteSelected);
        setNoteSelected(newNoteSelected);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  useEffect(() => {
    fetchNotesData();
  }, [fetchData]);

  const calculateNoteSelected = (notes, currentNoteSelected) => {
    if (
      notes.length > 0 &&
      (!currentNoteSelected ||
        !notes.some((note) => note.id === currentNoteSelected))
    ) {
      return notes[0].id;
    }
    return currentNoteSelected;
  };

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
    if (noteLists.length < 1) {
      navigate("/client/notes");
    }
  }, [noteLists]);

  useEffect(() => {
    setCreateTitleMode(false);
  }, [noteSelected]);

  useEffect(() => {
    if (noteSelected !== null) {
      navigate(`/client/notes/${noteSelected}`);
    }
  }, [noteSelected]);

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
          className={`w-full flex md:h-full justify-center items-start  ${
            darkMode && theme === "dark" && "dark"
          }`}
        >
          {showSidebar && (
            <div className="w-full fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
          )}
          <Sidebar />
          <div className="w-full md:w-[70%] lg:w-[80%] md:h-full dark:bg-neutral-900 dark:text-white flex flex-col md:flex-row absolute right-0">
            {windowWidth < 768 ? (
              <div
                className={`w-full ${
                  noteLists.length === 0 ? "h-[100vh]" : "h-[50%]"
                } md:h-full flex flex-col  ${
                  showSortMenu ? "overflow-x-hidden" : "overflow-y-scroll"
                }`}
              >
                <div className="w-full flex flex-col py-2 px-5 border-b-2 relative">
                  <ScrollHeader
                    noteLists={noteLists}
                    showSortMenu={showSortMenu}
                    setShowSortMenu={setShowSortMenu}
                    setShowSortPosition={setShowSortPosition}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    windowWidth={windowWidth}
                    theme={theme}
                  />

                  {showSortMenu && (
                    <SortMenu
                      showSortPosition={showSortPosition}
                      showSortMenu={showSortMenu}
                      setShowSortMenu={setShowSortMenu}
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
                    {noteLists.map((note, i) => {
                      return (
                        <SwiperSlide className="w-full" key={i}>
                          <NoteCollection
                            key={i}
                            note={note}
                            createTitleMode={createTitleMode}
                            noteSelected={noteSelected}
                            setNoteSelected={setNoteSelected}
                            falseTitleMode={falseTitleMode}
                            handleTitleMode={handleTitleMode}
                            navigate={navigate}
                            titleChange={titleChange}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                {noteLists.length > 0 && (
                  <NewNoteButton handleNewNote={handleNewNote} />
                )}

                {noteLists.length < 1 && (
                  <EmptyNoteDisplay
                    noteSelected={noteSelected}
                    handleNewNote={handleNewNote}
                    navigate={navigate}
                    theme={theme}
                    darkMode={darkMode}
                  />
                )}
              </div>
            ) : (
              <ResizableBox
                width={300}
                height={Infinity}
                className="bg-[#F5F5F5] dark:bg-neutral-900 flex overflow-y-scroll"
                resizeHandles={["e"]}
                minConstraints={[300, Infinity]}
                maxConstraints={[700, Infinity]}
              >
                <div
                  className={`w-full h-full flex flex-col ${
                    showSortMenu ? "overflow-y-hidden" : "overflow-y-scroll"
                  }`}
                >
                  <div className="w-full pb-[2rem] grid grid-cols-1 gap-5 resize-x">
                    <div className="w-full py-2 flex flex-col px-5 border-b-2 relative">
                      <ScrollHeader
                        noteLists={noteLists}
                        showSortMenu={showSortMenu}
                        setShowSortMenu={setShowSortMenu}
                        setShowSortPosition={setShowSortPosition}
                        theme={theme}
                      />

                      {showSortMenu && (
                        <SortMenu
                          showSortPosition={showSortPosition}
                          sortingFunction={sortingFunction}
                          showSortMenu={showSortMenu}
                          setShowSortMenu={setShowSortMenu}
                          handleSortNoteTitle={handleSortNoteTitle}
                          handleSortNoteDate={handleSortNoteDate}
                          theme={theme}
                        />
                      )}
                    </div>
                    {noteLists.map((note, i) => {
                      return (
                        <NoteCollection
                          key={i}
                          note={note}
                          createTitleMode={createTitleMode}
                          noteSelected={noteSelected}
                          setNoteSelected={setNoteSelected}
                          falseTitleMode={falseTitleMode}
                          handleTitleMode={handleTitleMode}
                          navigate={navigate}
                          titleChange={titleChange}
                          fetchData={fetchData}
                          setFetchData={setFetchData}
                          theme={theme}
                        />
                      );
                    })}

                    {noteLists.length > 0 && (
                      <NewNoteButton handleNewNote={handleNewNote} />
                    )}
                  </div>

                  {noteLists.length < 1 && (
                    <EmptyNoteDisplay
                      noteSelected={noteSelected}
                      handleNewNote={handleNewNote}
                      navigate={navigate}
                      theme={theme}
                      darkMode={darkMode}
                    />
                  )}
                </div>
              </ResizableBox>
            )}

            <div className="w-full md:w-[77%] h-[50%] md:h-full">
              {noteSelected &&
                noteLists
                  .filter((data) => data.id === noteSelected)
                  .map((note) => {
                    return (
                      <div className="w-full h-full md:h-[95%]" key={note.id}>
                        <MiniNav
                          note={note}
                          addedNotfy={addedNotfy}
                          deletedNotfy={deletedNotfy}
                          addedToTrash={addedToTrash}
                          handleTrashNote={handleTrashNote}
                          handleNoteFavorite={handleNoteFavorite}
                          theme={theme}
                        />
                        <ReactQuill
                          theme="snow"
                          value={note.content}
                          onChange={(value) => {
                            contentChange(note.id, value);
                            handleContentInput(value);
                          }}
                          className="h-[70vh] md:h-[80vh] textbox:h-[85.5vh] pb-[5rem] md:pb-0 dark:text-white"
                        />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Noteslist;
