import React, { useEffect, useRef } from "react";
import importantIcon from "../../assets/important-icon.png";
import editLight from "../../assets/edit-light.png";
import editDark from "../../assets/edit-dark.png";
import saveLight from "../../assets/save-light.png";
import saveDark from "../../assets/save-dark.png";
import moreDark from "../../assets/more-dark.png";
import moreLight from "../../assets/more-light.png";
import TaskInput from "./TaskInput";
import SaveInput from "./SaveInput";
import ShowMore from "../tasklist/ShowMore";
import { useTaskListStore } from "../../store/store";

const Doing = ({
  task,
  i,
  scrollToNewTask,
  handleDeleteTask,
  handleDuplicateTask,
  groupedTaskSelected,
  handleIsImportant,
  handleClearTask,
  handleMoveTask,
  theme,
}) => {
  const showMoreRefDoing = useRef();
  const {
    // Doing
    doingList,
    doingId,
    doingIdSelected,
    saveDoingEdit,
    doingEditMode,
    doingAddMode,
    doingShowMore,
    showMorePositionDoing,

    setDoingTaskValue,
    setDoingEditMode,
    setDoingShowMore,
    setDoingId,

    editTask,
    deleteTask,
    duplicateTask,
    showMoreFunction,
    isImportantFunction,
    clearTaskInput,
    handleTaskChange,
    handleEditAndSave,
    moveCategoryFunction,
  } = useTaskListStore((state) => ({
    doingList: state.doingList,
    doingId: state.doingId,
    doingIdSelected: state.doingIdSelected,
    saveDoingEdit: state.saveDoingEdit,

    doingEditMode: state.doingEditMode,
    doingAddMode: state.doingAddMode,
    doingShowMore: state.doingShowMore,
    showMorePositionDoing: state.showMorePositionDoing,

    setDoingTaskValue: state.setDoingTaskValue,
    setDoingEditMode: state.setDoingEditMode,
    setDoingShowMore: state.setDoingShowMore,
    setDoingId: state.setDoingId,

    editTask: state.editTask,
    deleteTask: state.deleteTask,
    duplicateTask: state.duplicateTask,
    showMoreFunction: state.showMoreFunction,
    isImportantFunction: state.isImportantFunction,
    clearTaskInput: state.clearTaskInput,
    handleTaskChange: state.handleTaskChange,
    handleEditAndSave: state.handleEditAndSave,
    moveCategoryFunction: state.moveCategoryFunction,
  }));

  useEffect(() => {
    const handleScroll = (event) => {
      if (doingShowMore && task.id === doingIdSelected) {
        event.preventDefault();
      }
    };

    if (doingShowMore && task.id === doingIdSelected) {
      document.addEventListener("wheel", handleScroll, { passive: false });
      document.addEventListener("touchmove", handleScroll, { passive: false });
    } else {
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchmove", handleScroll);
    }

    return () => {
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchmove", handleScroll);
    };
  }, [doingShowMore, task.id, doingIdSelected]);

  useEffect(() => {
    setDoingTaskValue("");

    if (doingAddMode) {
      setDoingEditMode(true);
    }
  }, [doingId]);

  useEffect(() => {
    scrollToNewTask("Doing");
  }, [doingList]);

  useEffect(() => {
    if (doingList.length == 0) setDoingId(0);

    if (doingList.length > 0)
      setDoingId(
        Math.max(
          ...doingList.map((data) => {
            return data.id;
          })
        )
      );
  }, [doingList]);

  useEffect(() => {
    const showTaskMore = doingList.find((data) => data.id === doingIdSelected);

    if (showTaskMore) {
      if (doingEditMode) {
        setDoingShowMore(false);
      } else {
        if (saveDoingEdit) {
          setDoingShowMore(false);
        }
      }
    }
  }, [doingIdSelected, doingEditMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMoreRefDoing.current &&
        !showMoreRefDoing.current.contains(event.target)
      ) {
        setDoingShowMore(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMoreRefDoing]);
  return (
    <div className="relative w-full h-max truncate" key={i}>
      <div className="w-full overflow-x-hidden">
        {doingEditMode && task.id === doingIdSelected ? (
          <TaskInput
            task={task}
            saveDark={saveDark}
            saveLight={saveLight}
            handleTaskChange={handleTaskChange}
            taskType={"Doing"}
            handleEditAndSave={handleEditAndSave}
            groupedTaskSelected={groupedTaskSelected}
            theme={theme}
          />
        ) : (
          <SaveInput
            task={task}
            showMore={doingShowMore}
            editDark={editDark}
            editLight={editLight}
            moreDark={moreDark}
            moreLight={moreLight}
            editTask={editTask}
            importantIcon={importantIcon}
            idSelected={doingIdSelected}
            showMoreFunction={showMoreFunction}
            taskType={"Doing"}
            theme={theme}
          />
        )}
      </div>
      {doingShowMore && task.id === doingIdSelected && (
        <ShowMore
          task={task}
          i={i}
          showMoreRef={showMoreRefDoing}
          showMorePosition={showMorePositionDoing}
          handleDeleteTask={handleDeleteTask}
          handleDuplicateTask={handleDuplicateTask}
          handleIsImportant={handleIsImportant}
          handleClearTask={handleClearTask}
          handleMoveTask={handleMoveTask}
          taskType={"Doing"}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Doing;
