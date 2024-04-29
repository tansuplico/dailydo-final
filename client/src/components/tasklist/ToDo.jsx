import React, { useEffect, useRef } from "react";
import importantIcon from "../../assets/important-icon.png";
import editLight from "../../assets/edit-light.png";
import editDark from "../../assets/edit-dark.png";
import saveDark from "../../assets/save-dark.png";
import saveLight from "../../assets/save-light.png";
import moreDark from "../../assets/more-dark.png";
import moreLight from "../../assets/more-light.png";
import TaskInput from "./TaskInput";
import SaveInput from "./SaveInput";
import ShowMore from "./ShowMore";
import { useTaskListStore } from "../../store/store";

const ToDo = ({
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
  const showMoreRef = useRef();
  const {
    toDoList,
    toDoId,
    toDoIdSelected,
    editMode,
    addMode,
    showMore,
    showMorePosition,
    saveToDoEdit,

    setToDoTaskValue,
    setEditMode,
    setShowMore,
    setToDoId,

    editTask,
    showMoreFunction,
    handleTaskChange,
    handleEditAndSave,
  } = useTaskListStore((state) => ({
    toDoList: state.toDoList,
    toDoId: state.toDoId,
    toDoIdSelected: state.toDoIdSelected,
    editMode: state.editMode,
    addMode: state.addMode,
    showMore: state.showMore,
    showMorePosition: state.showMorePosition,
    saveToDoEdit: state.saveToDoEdit,

    setToDoTaskValue: state.setToDoTaskValue,
    setEditMode: state.setEditMode,
    setShowMore: state.setShowMore,
    setToDoId: state.setToDoId,

    editTask: state.editTask,
    showMoreFunction: state.showMoreFunction,
    handleTaskChange: state.handleTaskChange,
    handleEditAndSave: state.handleEditAndSave,
  }));

  useEffect(() => {
    scrollToNewTask("ToDo");
  }, [toDoList]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (showMore && task.id === toDoIdSelected) {
        event.preventDefault();
      }
    };

    if (showMore && task.id === toDoIdSelected) {
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
  }, [showMore, task.id, toDoIdSelected]);

  useEffect(() => {
    if (toDoList.length == 0) setToDoId(0);

    if (toDoList.length > 0)
      setToDoId(
        Math.max(
          ...toDoList.map((data) => {
            return data.id;
          })
        )
      );
  }, [toDoList]);

  useEffect(() => {
    setToDoTaskValue("");

    if (addMode) {
      setEditMode(true);
    }
  }, [toDoId]);

  useEffect(() => {
    const showTaskMore = toDoList.find((data) => data.id === toDoIdSelected);
    if (showTaskMore) {
      if (editMode) {
        setShowMore(false);
      } else {
        if (saveToDoEdit) {
          setShowMore(false);
        }
      }
    }
  }, [toDoIdSelected, editMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMoreRef.current && !showMoreRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMoreRef]);

  return (
    <div className="relative w-full h-max truncate" key={i}>
      <div className="w-full overflow-x-hidden">
        {editMode && task.id === toDoIdSelected ? (
          <TaskInput
            task={task}
            saveDark={saveDark}
            saveLight={saveLight}
            handleTaskChange={handleTaskChange}
            taskType={"ToDo"}
            handleEditAndSave={handleEditAndSave}
            groupedTaskSelected={groupedTaskSelected}
            theme={theme}
          />
        ) : (
          <SaveInput
            task={task}
            showMore={showMore}
            editDark={editDark}
            editLight={editLight}
            moreDark={moreDark}
            moreLight={moreLight}
            editTask={editTask}
            importantIcon={importantIcon}
            idSelected={toDoIdSelected}
            showMoreFunction={showMoreFunction}
            taskType={"ToDo"}
            theme={theme}
          />
        )}
      </div>
      {showMore && task.id === toDoIdSelected && (
        <ShowMore
          task={task}
          i={i}
          showMoreRef={showMoreRef}
          showMorePosition={showMorePosition}
          handleDeleteTask={handleDeleteTask}
          handleDuplicateTask={handleDuplicateTask}
          handleIsImportant={handleIsImportant}
          handleClearTask={handleClearTask}
          handleMoveTask={handleMoveTask}
          taskType={"ToDo"}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ToDo;
