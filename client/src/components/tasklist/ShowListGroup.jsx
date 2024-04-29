import React from "react";
import darkNoteBook from "../../assets/dark-notebook.png";
import lightNoteBook from "../../assets/light-notebook.png";
import deleteDark from "../../assets/delete-dark.png";
import deleteLight from "../../assets/delete-light.png";
import saveDark from "../../assets/save-dark.png";
import saveLight from "../../assets/save-light.png";
import plusDark from "../../assets/plus-dark.png";
import plusLight from "../../assets/plus-light.png";
import sortGray from "../../assets/sort-gray.png";
import sortLight from "../../assets/sort-light.png";
import editDark from "../../assets/edit-dark.png";
import editLight from "../../assets/edit-light.png";
import sortTitleDark from "../../assets/title-sort-dark.png";
import sortTitleLight from "../../assets/title-sort-light.png";
import tasksDark from "../../assets/tasks-dark.png";
import tasksLight from "../../assets/tasks-light.png";
import DeleteGroup from "../modals/DeleteGroup";

const ShowListGroup = ({
  setShowListGroup,
  setShowSortGroup,
  showSortGroup,
  handleSortingTitle,
  handleSortingLength,
  groupedTaskList,
  editModeGroup,
  groupToEdit,
  setGroupedTaskSelected,
  setEditModeGroup,
  editGroupTask,
  setGroupToEdit,
  setShowDeleteGroupModal,
  setGroupToDelete,
  groupedTaskSelected,
  showDeleteGroupModal,
  groupToDelete,
  deleteGroupTask,
  navigate,
  handleGroupTitle,
  handleTaskGroupName,
  handleAddNewGroup,
  handleDeleteGroup,
  setFetchGroup,
  theme,
}) => {
  return (
    <div className="absolute bg-white dark:bg-[#242124] dark:text-white w-[18rem] md:w-[20rem] h-[20rem] top-[2.1rem] rounded-md shadow-lg z-50">
      <div className="w-full h-full">
        <div className="h-[15%] flex justify-between items-center px-2 gap-1 relative">
          <h1 className="gap-1">
            List of all
            <strong className="text-[#FF004F]"> Task Groups </strong>
          </h1>

          <img
            src={theme === "dark" ? sortLight : sortGray}
            alt="sort-gray"
            className="w-[25px] cursor-pointer"
            onClick={() => setShowSortGroup(!showSortGroup)}
          />
          {showSortGroup && (
            <div className="bg-white dark:bg-[#242124] w-[10rem] absolute top-[2rem] md:top-0 right-0 md:right-[-50%] shadow-lg md:shadow-none  ">
              <h1 className="text-[.85rem] border-b px-2 py-1 border-gray-300 w-full">
                Sort By
              </h1>

              <div
                className="w-full flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-[#DE3163]"
                onClick={() => handleSortingTitle()}
              >
                <img
                  src={theme === "dark" ? sortTitleLight : sortTitleDark}
                  alt="title-sort"
                  className="w-[20px]"
                />
                <span className="text-[.9rem]"> Title </span>
              </div>
              <div
                className="w-full flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-[#DE3163]"
                onClick={handleSortingLength}
              >
                <img
                  src={theme === "dark" ? tasksLight : tasksDark}
                  alt="date-sort"
                  className="w-[20px]"
                />
                <span className="text-[.9rem]">Most Tasks</span>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-[75%] flex flex-col gap-1 overflow-y-scroll">
          {groupedTaskList.map((d, i) => {
            return (
              <div
                key={i}
                className="w-full py-1 flex items-center justify-between px-2 hover:bg-slate-100 dark:hover:bg-[#DE3163] cursor-pointer"
              >
                <div
                  className="w-full flex text-ellipsis overflow-x-hidden"
                  onClick={() => {
                    navigate(`/client/tasks-list/${d.id}`),
                      setGroupedTaskSelected(d.id);
                  }}
                >
                  {editModeGroup && groupToEdit === d.id ? (
                    <div className="w-full pr-2 flex items-center gap-2 group transition-all ">
                      <img
                        src={theme === "dark" ? lightNoteBook : darkNoteBook}
                        alt="note"
                        className="w-[20px]"
                      />
                      <input
                        type="text"
                        placeholder="Untitled Group"
                        className="w-full bg-transparent focus:outline-none "
                        onChange={(e) => {
                          handleGroupTitle(d.id, e.currentTarget.value);
                        }}
                        value={d.taskGroupName}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full flex items-center gap-2 truncate"
                      onClick={() => {
                        setGroupedTaskSelected(d.id);
                      }}
                    >
                      <img
                        src={theme === "dark" ? lightNoteBook : darkNoteBook}
                        alt="note"
                        className="w-[20px]"
                      />

                      <h1 className="truncate">
                        {d.taskGroupName ? d.taskGroupName : "Untitled Group"}
                      </h1>
                    </div>
                  )}
                </div>

                <div className="w-[15%] flex flex-center gap-2 ">
                  {editModeGroup && groupToEdit === d.id ? (
                    <img
                      src={theme === "dark" ? saveLight : saveDark}
                      alt="save-icon"
                      className="w-[15px] h-[15px] cursor-pointer"
                      onClick={() => {
                        setEditModeGroup(false);
                        handleTaskGroupName();
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={theme === "dark" ? editLight : editDark}
                        alt="more-dark"
                        className="w-[20px] cursor-pointer"
                        onClick={() => {
                          editGroupTask();
                          setGroupToEdit(d.id);
                          handleTaskGroupName();
                        }}
                      />
                      <img
                        src={theme === "dark" ? deleteLight : deleteDark}
                        alt="delete-dark"
                        className="w-[17px] cursor-pointer"
                        onClick={() => {
                          setShowDeleteGroupModal(true);
                          setGroupToDelete(d.id);
                          setGroupedTaskSelected(d.id);
                        }}
                      />
                      {showDeleteGroupModal && groupToDelete === d.id && (
                        <DeleteGroup
                          setShowListGroup={setShowListGroup}
                          deleteGroupTask={deleteGroupTask}
                          id={d.id}
                          setShowDeleteGroupModal={setShowDeleteGroupModal}
                          groupedTaskList={groupedTaskList}
                          setGroupedTaskSelected={setGroupedTaskSelected}
                          handleDeleteGroup={handleDeleteGroup}
                          setFetchGroup={setFetchGroup}
                          groupedTaskSelected={groupedTaskSelected}
                          theme={theme}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="w-full h-[10%] hover:bg-gray-100 dark:hover:bg-[#DE3163] rounded-md flex px-3 py-2 gap-2 items-center cursor-pointer"
          onClick={() => {
            // addNewGroup();
            // navigate(`/client/tasks-list/${groupedTaskSelected}`);
            handleAddNewGroup();
            setShowListGroup(false);
            setShowSortGroup(false);
          }}
        >
          <img
            src={theme === "dark" ? plusLight : plusDark}
            alt="plus-dark"
            className="w-[15px]"
          />

          <h1> New Task Group </h1>
        </div>
      </div>
    </div>
  );
};

export default ShowListGroup;
