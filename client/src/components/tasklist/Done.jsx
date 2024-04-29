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

const Done = ({
  task,
  i,
  scrollToNewTask,
  handleDeleteTask,
  handleDuplicateTask,
  groupedTaskSelected,
  handleIsImportant,
  handleClearTask,
  theme,
}) => {
  const showMoreRefDone = useRef();
  const {
    // Doing
    doneList,
    doneId,
    doneIdSelected,
    saveDoneEdit,
    doneEditMode,
    doneAddMode,
    doneShowMore,
    showMorePositionDone,

    setDoneTaskValue,
    setDoneEditMode,
    setDoneShowMore,
    setDoneId,

    editTask,
    showMoreFunction,
    handleTaskChange,
    handleEditAndSave,
  } = useTaskListStore((state) => ({
    // Doing
    doneList: state.doneList,
    doneId: state.doneId,
    doneIdSelected: state.doneIdSelected,
    saveDoneEdit: state.saveDoneEdit,

    doneEditMode: state.doneEditMode,
    doneAddMode: state.doneAddMode,
    doneShowMore: state.doneShowMore,
    showMorePositionDone: state.showMorePositionDone,

    setDoneTaskValue: state.setDoneTaskValue,
    setDoneEditMode: state.setDoneEditMode,
    setDoneShowMore: state.setDoneShowMore,
    setDoneId: state.setDoneId,

    editTask: state.editTask,
    showMoreFunction: state.showMoreFunction,
    handleTaskChange: state.handleTaskChange,
    handleEditAndSave: state.handleEditAndSave,
  }));

  useEffect(() => {
    const handleScroll = (event) => {
      if (doneShowMore && task.id === doneIdSelected) {
        event.preventDefault();
      }
    };

    if (doneShowMore && task.id === doneIdSelected) {
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
  }, [doneShowMore, task.id, doneIdSelected]);

  useEffect(() => {
    setDoneTaskValue("");

    if (doneAddMode) {
      setDoneEditMode(true);
    }
  }, [doneId]);

  useEffect(() => {
    scrollToNewTask("Done");
  }, [doneList]);

  useEffect(() => {
    if (doneList.length == 0) setDoneId(0);

    if (doneList.length > 0)
      setDoneId(
        Math.max(
          ...doneList.map((data) => {
            return data.id;
          })
        )
      );
  }, [doneList]);

  useEffect(() => {
    const showTaskMore = doneList.find((data) => data.id === doneIdSelected);

    if (showTaskMore) {
      if (doneEditMode) {
        setDoneShowMore(false);
      } else {
        if (saveDoneEdit) {
          setDoneShowMore(false);
        }
      }
    }
  }, [doneIdSelected, doneEditMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMoreRefDone.current &&
        !showMoreRefDone.current.contains(event.target)
      ) {
        setDoneShowMore(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMoreRefDone]);

  return (
    <div className="relative w-full h-max truncate" key={i}>
      <div className="w-full overflow-x-hidden">
        {doneEditMode && task.id === doneIdSelected ? (
          <TaskInput
            task={task}
            saveDark={saveDark}
            saveLight={saveLight}
            handleTaskChange={handleTaskChange}
            taskType={"Done"}
            handleEditAndSave={handleEditAndSave}
            groupedTaskSelected={groupedTaskSelected}
            theme={theme}
          />
        ) : (
          <SaveInput
            task={task}
            showMore={doneShowMore}
            editDark={editDark}
            editLight={editLight}
            moreDark={moreDark}
            moreLight={moreLight}
            editTask={editTask}
            importantIcon={importantIcon}
            idSelected={doneIdSelected}
            showMoreFunction={showMoreFunction}
            taskType={"Done"}
            theme={theme}
          />
        )}
      </div>
      {doneShowMore && task.id === doneIdSelected && (
        <ShowMore
          task={task}
          i={i}
          showMoreRef={showMoreRefDone}
          showMorePosition={showMorePositionDone}
          handleDeleteTask={handleDeleteTask}
          handleDuplicateTask={handleDuplicateTask}
          handleIsImportant={handleIsImportant}
          handleClearTask={handleClearTask}
          taskType={"Done"}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Done;
