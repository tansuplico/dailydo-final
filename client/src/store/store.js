import { create } from "zustand";
import { nanoid } from "nanoid";
import alarmClock from "../assets/alarm-clock.mp3";
import axios from "axios";

export const useNotesListStore = create((set) => ({
  noteLists: [{ id: nanoid(), title: "", content: "", isFavorite: false }],
  noteSelected: null,
  createTitleMode: false,
  showSortMenu: false,
  showSortPosition: { x: 20, y: 20 },
  addedToTrash: false,
  fetchData: false,

  setNoteLists: (newNoteList) => set({ noteLists: newNoteList }),
  setNoteId: (newNoteId) => set({ noteId: newNoteId }),
  setNoteSelected: (newNoteSelected) => set({ noteSelected: newNoteSelected }),
  setCreateTitleMode: (newCreateTitleMode) =>
    set({ createTitleMode: newCreateTitleMode }),
  setShowSortMenu: (newShowSortMenu) => set({ showSortMenu: newShowSortMenu }),
  setShowSortPosition: (newShowSortPosition) =>
    set({ showSortPosition: newShowSortPosition }),
  setFetchData: (newVal) => set({ fetchData: newVal }),

  addNote: () => {
    set((state) => {
      const newNote = {
        id: nanoid(),
        title: "",
        content: "",
        isFavorite: false,
      };

      return {
        noteLists: [...state.noteLists, newNote],
        noteSelected: newNote.id,
        createTitleMode: false,
      };
    });
  },

  handleTitleMode: (id) => {
    set(() => ({
      noteSelected: id,
      createTitleMode: true,
    }));
  },

  falseTitleMode: () => {
    set(() => ({
      createTitleMode: false,
    }));
  },

  titleChange: (id, value) => {
    set((state) => ({
      noteLists: state.noteLists.map((d) =>
        d.id === id ? { ...d, title: value } : d
      ),
    }));
  },

  contentChange: (id, value) => {
    set((state) => ({
      noteLists: state.noteLists.map((d) =>
        d.id === id ? { ...d, content: value } : d
      ),
    }));
  },

  handleIsFavorite: (id) => {
    set((state) => ({
      noteLists: state.noteLists.map((d) =>
        d.id === id ? { ...d, isFavorite: d.isFavorite ? false : true } : d
      ),
    }));
  },

  handleShowSortMenu: (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTimeout(() => {
      setShowSortMenu(true);

      if (showSortMenu) {
        setShowSortMenu(false);
      }
    }, 0);
    set(() => ({
      showSortPosition: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    }));
  },

  moveToTrash: (id) => {
    set((state) => {
      const noteToTrash = state.noteLists.find((note) => note.id === id);

      if (noteToTrash) {
        trashListStore.getState().trashList.push(noteToTrash);
        trashListStore.getState().setTrashSelected(noteToTrash.id);

        const newList = state.noteLists.filter(
          (notes) => notes.id !== noteToTrash.id
        );

        return {
          noteLists: newList,
          noteSelected: newList.length > 0 ? newList[0].id : null,
        };
      }
    });
  },

  sortingFunction: () => {
    set((state) => {
      const sortedNoteLists = [...state.noteLists];

      sortedNoteLists.sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      );

      return { noteLists: sortedNoteLists };
    });
  },

  handleContentInput: (content) => {
    set((state) => {
      try {
        axios.post(
          `https://dailydo-0bc4.onrender.com/api/notes/${state.noteSelected}/content-change`,
          { content: content },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }

      return { ...state };
    });
  },

  handleNewNote: () => {
    set((state) => {
      const newNoteId = nanoid();
      const newNoteFormat = {
        id: newNoteId,
        title: "",
        content: "",
        isFavorite: false,
      };

      axios
        .post(
          `https://dailydo-0bc4.onrender.com/api/notes/add-note`,
          { newNoteFormat },
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchData: !state.fetchData,
            noteSelected: newNoteFormat.id,
          }));
        })
        .catch((err) => console.log(err));

      return { ...state };
    });
  },

  handleTrashNote: (id) => {
    set((state) => {
      axios
        .post(
          `https://dailydo-0bc4.onrender.com/api/notes/${state.noteSelected}/trash-note`,
          { soloId: id },
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchData: !state.fetchData,
            noteSelected:
              state.noteLists.length > 0 ? state.noteLists[0].id : null,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return { ...state };
    });
  },

  handleNoteFavorite: (id) => {
    set((state) => {
      axios
        .post(
          `https://dailydo-0bc4.onrender.com/api/notes/${state.noteSelected}/favorite-note`,
          { soloId: id },
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchData: !state.fetchData,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return { ...state };
    });
  },

  handleSortNoteTitle: () => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/notes/sort-name-note`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchData: !state.fetchData,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleSortNoteDate: () => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/notes/sort-date-note`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchData: !state.fetchData,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },
}));

export const useSidebarStore = create((set) => ({
  settingsFetched: false,
  notesSideDrop: false,
  showSidebar: false,
  theme: "light",
  darkMode: false,
  setSettingsFetched: (newSettingsFetched) =>
    set({ settingsFetched: newSettingsFetched }),
  setNotesSideDrop: (newNotesSideDrop) =>
    set({ notesSideDrop: newNotesSideDrop }),
  setShowSidebar: (newShowSidebar) => set({ showSidebar: newShowSidebar }),
  changeNotesSideValue: () => {
    set((state) => ({
      notesSideDrop: !state.notesSideDrop,
    }));
  },
  setTheme: (newThemeVal) => set({ theme: newThemeVal }),
  setDarkMode: (newVal) => set({ darkMode: newVal }),
}));

export const useTaskListStore = create((set) => ({
  toDoTaskValue: "DailyDo Setup",
  toDoId: 1,
  toDoIdSelected: null,
  toDoList: [
    {
      id: nanoid(),
      task: "DailyDo Setup",
      isImportant: false,
      dateCreated: new Date(),
    },
  ],
  saveToDoEdit: false,
  editMode: false,
  addMode: false,
  showMore: false,
  showMorePosition: { x: 50, y: 20 },

  // Doing
  doingTaskValue: "DailyDo Setup",
  doingId: 1,
  doingIdSelected: null,
  doingList: [
    {
      id: nanoid(),
      task: "DailyDo Setup",
      isImportant: false,
      dateCreated: new Date(),
    },
  ],
  saveDoingEdit: false,
  doingEditMode: false,
  doingAddMode: false,
  doingShowMore: false,
  showMorePositionDoing: { x: 50, y: 20 },

  // Done
  doneTaskValue: "DailyDo Setup",
  doneId: 1,
  doneIdSelected: null,
  doneList: [
    {
      id: nanoid(),
      task: "DailyDo Setup",
      isImportant: false,
      dateCreated: new Date(),
    },
  ],
  saveDoneEdit: false,
  doneEditMode: false,
  doneAddMode: false,
  doneShowMore: false,
  showMorePositionDone: { x: 50, y: 20 },

  modalIsClicked: false,
  clearChoice: false,
  taskToClear: null,
  showListGroup: false,
  showDeleteGroupModal: false,
  groupToDelete: false,
  groupToEdit: false,
  wholeShowMore: false,
  wholeShowMoreDoing: false,
  wholeShowMoreDone: false,
  showMoreSort: false,
  showSortGroup: false,

  fetchTask: false,

  setModalIsClicked: (newVal) => set({ modalIsClicked: newVal }),
  setClearChoice: (newVal) => set({ clearChoice: newVal }),
  setTaskToClear: (newVal) => set({ taskToClear: newVal }),

  setToDoTaskValue: (newToDoTaskValue) =>
    set({ toDoTaskValue: newToDoTaskValue }),
  setToDoId: (newtoDoId) => set({ toDoId: newtoDoId }),
  setToDoIdSelected: (newToDoIdSelected) =>
    set({ toDoIdSelected: newToDoIdSelected }),
  setToDoList: (newToDoList) => set({ toDoList: newToDoList }),
  setSaveToDoEdit: (newBool) => set({ saveToDoEdit: newBool }),
  setEditMode: (newBool) => set({ editMode: newBool }),
  setAddMode: (newBool) => set({ addMode: newBool }),
  setShowMore: (newBool) => set({ showMore: newBool }),
  setShowMorePosition: (newPosition) => set({ showMorePosition: newPosition }),
  // Doing
  setDoingTaskValue: (newVal) => set({ doingTaskValue: newVal }),
  setDoingId: (newVal) => set({ doingId: newVal }),
  setDoingIdSelected: (newVal) => set({ doingIdSelected: newVal }),
  setDoingList: (newList) => set({ toDoList: newList }),
  setSaveDoingEdit: (newBool) => set({ saveDoingEdit: newBool }),
  setDoingEditMode: (newBool) => set({ doingEditMode: newBool }),
  setDoingAddMode: (newBool) => set({ setDoingAddMode: newBool }),
  setDoingShowMore: (newBool) => set({ doingShowMore: newBool }),
  setShowMorePositionDoing: (newPosition) =>
    set({ showMorePositionDoing: newPosition }),
  // Done
  setDoneTaskValue: (newVal) => set({ doneTaskValue: newVal }),
  setDoneId: (newVal) => set({ doneId: newVal }),
  setDoneIdSelected: (newVal) => set({ doneIdSelected: newVal }),
  setDoneList: (newList) => set({ doneList: newList }),
  setSaveDoneEdit: (newBool) => set({ saveDoneEdit: newBool }),
  setDoneEditMode: (newBool) => set({ doneEditMode: newBool }),
  setDoneAddMode: (newBool) => set({ setDoneAddMode: newBool }),
  setDoneShowMore: (newBool) => set({ doneShowMore: newBool }),
  setShowMorePositionDone: (newPosition) =>
    set({ showMorePositionDone: newPosition }),

  setShowListGroup: (newBool) => set({ showListGroup: newBool }),
  setShowDeleteGroupModal: (newBool) => set({ showDeleteGroupModal: newBool }),
  setGroupToDelete: (newBool) => set({ groupToDelete: newBool }),
  setGroupToEdit: (newBool) => set({ groupToEdit: newBool }),
  setWholeShowMore: (newBool) => set({ wholeShowMore: newBool }),
  setWholeShowMoreDoing: (newBool) => set({ wholeShowMoreDoing: newBool }),
  setWholeShowMoreDone: (newBool) => set({ wholeShowMoreDone: newBool }),
  setShowMoreSort: (newBool) => set({ showMoreSort: newBool }),
  setShowSortGroup: (newBool) => set({ showSortGroup: newBool }),
  setFetchTask: (newBool) => set({ fetchTask: newBool }),

  editTask: (id, task, taskType) => {
    set((state) => {
      if (taskType === "ToDo") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newList =
          state.toDoEditMode && state.toDoIdSelected !== null
            ? groupList.toDoList.map((tasks) =>
                tasks.id === state.toDoIdSelected
                  ? { ...tasks, task: state.toDoTaskValue }
                  : tasks
              )
            : groupList.toDoList;

        const updatedState = {
          ...state,
          toDoTaskValue: task,
          toDoIdSelected: id,
          editMode: true,
          addMode: false,
          showMore: false,
          saveToDoEdit: false,
          toDoList: newList,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: updatedState.toDoList,
                    doingList: groupList.doingList,
                    doneList: groupList.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      } else if (taskType === "Doing") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newList =
          state.doingEditMode && state.doingIdSelected !== null
            ? groupList.doingList.map((tasks) =>
                tasks.id === state.doingdSelected
                  ? { ...tasks, task: state.doingTaskValue }
                  : tasks
              )
            : groupList.doingList;

        const updatedState = {
          ...state,
          doingTaskValue: task,
          doingIdSelected: id,
          doingEditMode: true,
          doingAddMode: false,
          doingShowMore: false,
          saveDoingEdit: false,
          doingList: newList,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: groupList.toDoList,
                    doingList: updatedState.doingList,
                    doneList: groupList.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      } else if (taskType === "Done") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newList =
          state.doneEditMode && state.doneIdSelected !== null
            ? groupList.doneList.map((tasks) =>
                tasks.id === state.donedSelected
                  ? { ...tasks, task: state.doneTaskValue }
                  : tasks
              )
            : groupList.doneList;

        const updatedState = {
          ...state,
          doneTaskValue: task,
          doneIdSelected: id,
          doneEditMode: true,
          doneAddMode: false,
          doneShowMore: false,
          saveDoneEdit: false,
          doneList: newList,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: groupList.toDoList,
                    doingList: groupList.doingList,
                    doneList: updatedState.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      }
    });
  },

  handleTaskChange: (id, value, taskType) => {
    set((state) => {
      if (taskType === "ToDo") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newTaskValue = groupList.toDoList.map((d) =>
          d.id === id ? { ...d, task: value } : d
        );

        const updatedState = {
          ...state,
          toDoList: newTaskValue,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: updatedState.toDoList,
                    doingList: groupList.doingList,
                    doneList: groupList.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      } else if (taskType === "Doing") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newTaskValue = groupList.doingList.map((d) =>
          d.id === id ? { ...d, task: value } : d
        );

        const updatedState = {
          ...state,
          doingList: newTaskValue,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: groupList.toDoList,
                    doingList: updatedState.doingList,
                    doneList: groupList.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      } else if (taskType === "Done") {
        const groupList = useTaskListGroup
          .getState()
          .groupedTaskList.find(
            (data) =>
              data.id === useTaskListGroup.getState().groupedTaskSelected
          ).taskList;

        const newTaskValue = groupList.doneList.map((d) =>
          d.id === id ? { ...d, task: value } : d
        );

        const updatedState = {
          ...state,
          doneList: newTaskValue,
        };

        const updatedGroupedTaskList = useTaskListGroup
          .getState()
          .groupedTaskList.map((group) =>
            group.id === useTaskListGroup.getState().groupedTaskSelected
              ? {
                  ...group,
                  taskList: {
                    toDoList: groupList.toDoList,
                    doingList: groupList.doingList,
                    doneList: updatedState.doneList,
                  },
                }
              : group
          );

        useTaskListGroup.getState().setGroupedTaskList(updatedGroupedTaskList);

        return updatedState;
      }
    });
  },

  handleEditAndSave: (taskType) => {
    if (taskType === "ToDo") {
      set(() => ({
        editMode: false,
        saveToDoEdit: true,
      }));
    } else if (taskType === "Doing") {
      set(() => ({
        doingEditMode: false,
        saveDoingEdit: true,
      }));
    } else if (taskType === "Done") {
      set(() => ({
        doneEditMode: false,
        saveDoneEdit: true,
      }));
    }
  },

  showMoreFunction: (id, e, taskType) => {
    if (taskType === "ToDo") {
      const rect = e.currentTarget.getBoundingClientRect();
      e.stopPropagation();
      set((state) => ({
        toDoIdSelected: id,
        editMode: false,
        addMode: false,
        saveToDoEdit: false,
        showMore: !state.showMore,
        doingShowMore: false,
        doneShowMore: false,
        showMorePosition: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      }));
    } else if (taskType === "Doing") {
      const rect = e.currentTarget.getBoundingClientRect();
      e.stopPropagation();
      set((state) => ({
        doingIdSelected: id,
        doingEditMode: false,
        doingAddMode: false,
        saveDoingEdit: false,
        doingShowMore: !state.doingShowMore,
        showMore: false,
        doneShowMore: false,
        showMorePositionDoing: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      }));
    } else if (taskType === "Done") {
      const rect = e.currentTarget.getBoundingClientRect();
      e.stopPropagation();
      set((state) => ({
        doneIdSelected: id,
        doneEditMode: false,
        doneAddMode: false,
        saveDoneEdit: false,
        doneShowMore: !state.doneShowMore,
        showMore: false,
        doingShowMore: false,
        showMorePositionDone: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      }));
    }
  },

  handleAddToDo: () => {
    const taskFormat = {
      id: nanoid(),
      task: "",
      isImportant: false,
      dateCreated: new Date(),
    };

    axios
      .post(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/add-toDo-task`,
        { taskFormat },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
          wholeShowMore: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleAddDoing: () => {
    const taskFormat = {
      id: nanoid(),
      task: "",
      isImportant: false,
      dateCreated: new Date(),
    };

    axios
      .post(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/add-doing-task`,
        { taskFormat },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
          wholeShowMoreDoing: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleAddDone: () => {
    const taskFormat = {
      id: nanoid(),
      task: "",
      isImportant: false,
      dateCreated: new Date(),
    };

    axios
      .post(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/add-done-task`,
        { taskFormat },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
          wholeShowMoreDone: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleDeleteTask: (id, taskType) => {
    axios
      .delete(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/delete-task`,
        { data: { nestedTaskId: id, type: taskType }, withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleDuplicateTask: (index, taskType) => {
    axios
      .post(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/duplicate-task`,
        { taskIndex: index, type: taskType },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          showMore: false,
          doingShowMore: false,
          doneShowMore: false,
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleIsImportant: (id, taskType) => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/important-task`,
        {
          soloId: id,
          type: taskType,
        },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          showMore: false,
          doingShowMore: false,
          doneShowMore: false,
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleClearTask: (id, taskType) => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/clear-task`,
        {
          soloId: id,
          type: taskType,
        },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          showMore: false,
          doingShowMore: false,
          doneShowMore: false,
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleMoveTask: (id, taskType) => {
    axios
      .post(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/move-task`,
        { soloId: id, type: taskType },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleClearWholeTask: (taskToClear) => {
    axios
      .put(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/clear-whole-task/`,
        { taskType: taskToClear },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
          wholeShowMore: false,
          wholeShowMoreDoing: false,
          wholeShowMoreDone: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleSortTaskDate: (type) => {
    axios
      .put(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/sort-task-date`,
        { taskType: type },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleSortTaskName: (type) => {
    axios
      .put(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/${
          useTaskListGroup.getState().groupedTaskSelected
        }/sort-task-name`,
        { taskType: type },
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchTask: !state.fetchTask,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },
}));

export const combinedListStore = create((set) => ({
  combinedList: {
    id: null,
    taskGroupName: "",
    taskList: {
      toDoList: useTaskListStore.getState().toDoList,
      doingList: useTaskListStore.getState().doingList,
      doneList: useTaskListStore.getState().doneList,
    },
    dateCreated: new Date(),
  },

  setCombinedList: (newCombinedList) => set({ combinedList: newCombinedList }),
}));

export const useTaskListGroup = create((set) => ({
  groupedTaskList: [combinedListStore.getState().combinedList],
  editModeGroup: false,
  groupedTaskSelected: combinedListStore.getState().combinedList.id,
  newTaskListValue: {
    toDoList: useTaskListStore.getState().toDoList,
    doingList: useTaskListStore.getState().doingList,
    doneList: useTaskListStore.getState().doneList,
  },
  fetchGroup: false,

  setEditModeGroup: (newVal) => set({ editModeGroup: newVal }),
  setGroupedTaskList: (newGroupedList) =>
    set({ groupedTaskList: newGroupedList }),
  setGroupedTaskSelected: (newVal) => set({ groupedTaskSelected: newVal }),
  setFetchGroup: (newVal) => set({ fetchGroup: newVal }),

  editGroupTask: () => {
    set(() => {
      return { editModeGroup: true };
    });
  },

  handleGroupTitle: (id, value) => {
    set((state) => ({
      groupedTaskList: state.groupedTaskList.map((d) =>
        d.id === id ? { ...d, taskGroupName: value } : d
      ),
    }));
  },

  handleAddNewGroup: () => {
    set((state) => {
      const groupFormat = {
        id: nanoid(),
        taskGroupName: "",
        taskList: state.newTaskListValue,
        dateCreated: new Date(),
      };

      axios
        .post(
          `https://dailydo-0bc4.onrender.com/api/tasks-list/add-new-group`,
          { groupFormat },
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchGroup: !state.fetchGroup,
            groupedTaskSelected: groupFormat.id,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return {
        ...state,
      };
    });
  },

  handleDeleteGroup: (id) => {
    set((state) => {
      const findGroup = state.groupedTaskList.find((d) => d.id === id);

      axios
        .delete(
          "https://dailydo-0bc4.onrender.com/api/tasks-list/delete-group",
          {
            data: { taskGroupId: findGroup.id },
            withCredentials: true,
          }
        )
        .then(() => {
          set((state) => ({
            fetchGroup: !state.fetchGroup,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return { ...state };
    });
  },

  handleSortingLength: () => {
    axios
      .put(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/sort-group-amountTask`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchGroup: !state.fetchGroup,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleSortingTitle: () => {
    axios
      .put(
        `https://dailydo-0bc4.onrender.com/api/tasks-list/sort-group-title`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchGroup: !state.fetchGroup,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  clearWholeTask: (taskType) => {
    set((state) => {
      if (taskType === "ToDo") {
        const groupList = state.groupedTaskList.find(
          (data) => data.id === state.groupedTaskSelected
        ).taskList;

        const updatedState = { ...state, toDoList: [] };

        const updatedGroupedTaskList = state.groupedTaskList.map((group) =>
          group.id === state.groupedTaskSelected
            ? {
                ...group,
                taskList: {
                  toDoList: updatedState.toDoList,
                  doingList: groupList.doingList,
                  doneList: groupList.doneList,
                },
              }
            : group
        );

        return { groupedTaskList: updatedGroupedTaskList, updatedState };
      }
      if (taskType === "Doing") {
        const groupList = state.groupedTaskList.find(
          (data) => data.id === state.groupedTaskSelected
        ).taskList;

        const updatedState = { ...state, doingList: [] };

        const updatedGroupedTaskList = state.groupedTaskList.map((group) =>
          group.id === state.groupedTaskSelected
            ? {
                ...group,
                taskList: {
                  toDoList: groupList.toDoList,
                  doingList: updatedState.doingList,
                  doneList: groupList.doneList,
                },
              }
            : group
        );

        return { groupedTaskList: updatedGroupedTaskList, updatedState };
      }
      if (taskType === "Done") {
        const groupList = state.groupedTaskList.find(
          (data) => data.id === state.groupedTaskSelected
        ).taskList;

        const updatedState = { ...state, doneList: [] };

        const updatedGroupedTaskList = state.groupedTaskList.map((group) =>
          group.id === state.groupedTaskSelected
            ? {
                ...group,
                taskList: {
                  toDoList: groupList.toDoList,
                  doingList: groupList.doingList,
                  doneList: updatedState.doneList,
                },
              }
            : group
        );

        return { groupedTaskList: updatedGroupedTaskList, updatedState };
      }
    });
  },
}));

export const useTrashListStore = create((set) => ({
  trashList: [],
  trashSelected: null,
  removePerm: false,
  fetchGroup: false,
  showSortTrashMenu: false,

  setTrashList: (newTrashList) => set({ trashList: newTrashList }),
  setTrashSelected: (newTrashSelected) =>
    set({ trashSelected: newTrashSelected }),
  setRemovePerm: (newBool) => set({ removePerm: newBool }),
  setShowSortTrashMenu: (newBool) => set({ showSortTrashMenu: newBool }),

  handleDeleteTrash: () => {
    set((state) => {
      axios
        .delete(
          `https://dailydo-0bc4.onrender.com/api/trash-list/${state.trashSelected}/delete-trash`,
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchGroup: !state.fetchGroup,
            removePerm: false,
            trashSelected:
              state.trashList.length > 0 ? state.trashList[0].id : null,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return { ...state };
    });
  },

  handleRecoverTrash: () => {
    set((state) => {
      axios
        .put(
          `https://dailydo-0bc4.onrender.com/api/trash-list/${state.trashSelected}/recover-trash`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          set((state) => ({
            fetchGroup: !state.fetchGroup,
            trashSelected:
              state.trashList.length > 0 ? state.trashList[0].id : null,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      return { ...state };
    });
  },

  handleSortNoteTitle: () => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/trash-list/sort-name-trash`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        set((state) => ({
          fetchGroup: !state.fetchGroup,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleSortNoteDate: () => {
    axios
      .patch(
        `https://dailydo-0bc4.onrender.com/api/trash-list/sort-date-trash`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        set((state) => ({
          fetchGroup: !state.fetchGroup,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  },
}));

export const usePomodoroStore = create((set) => ({
  timer: 30 * 60,
  shortBreakTimer: 5 * 60,
  longBreakTimer: 15 * 60,
  pomodoroSelected: true,
  shortBreakSelected: false,
  longBreakSelected: false,
  isRunning: false,
  intervalId: null,

  setTimer: (newVal) => set({ timer: newVal }),
  setShortBreakTimer: (newVal) => set({ shortBreakTimer: newVal }),
  setLongBreakTimer: (newVal) => set({ longBreakTimer: newVal }),
  setPomodoroSelected: (newVal) => set({ pomodoroSelected: newVal }),
  setShortBreakSelected: (newVal) => set({ shortBreakSelected: newVal }),
  setLongBreakSelected: (newVal) => set({ longBreakSelected: newVal }),
  setIsRunning: (newVal) => set({ isRunning: newVal }),

  handleTimer: (type) => {
    const alarmAudio = new Audio(alarmClock);

    if (type === "Pomodoro") {
      set(() => ({
        intervalId: setInterval(() => {
          set((state) => {
            if (!state.isRunning) {
              clearInterval(state.intervalId);
              return state;
            }
            const newTimer = state.timer - 1;
            if (newTimer <= 0) {
              clearInterval(state.intervalId);
              alarmAudio.play();
            }
            return { timer: newTimer };
          });
        }, 1000),
      }));
    } else if (type === "Short") {
      set(() => ({
        intervalId: setInterval(() => {
          set((state) => {
            if (!state.isRunning) {
              clearInterval(state.intervalId);
              return state;
            }
            const newTimer = state.shortBreakTimer - 1;
            if (newTimer <= 0) {
              clearInterval(state.intervalId);
              alarmAudio.play();
            }
            return { shortBreakTimer: newTimer };
          });
        }, 1000),
      }));
    } else if (type === "Long") {
      set(() => ({
        intervalId: setInterval(() => {
          set((state) => {
            if (!state.isRunning) {
              clearInterval(state.intervalId);
              return state;
            }
            const newTimer = state.longBreakTimer - 1;
            if (newTimer <= 0) {
              clearInterval(state.intervalId);
              alarmAudio.play();
            }
            return { longBreakTimer: newTimer };
          });
        }, 1000),
      }));
    }
  },

  toggleTimer: () => {
    set((state) => {
      if (state.pomodoroSelected) {
        state.handleTimer("Pomodoro");
      } else if (state.shortBreakSelected) {
        state.handleTimer("Short");
      } else if (state.longBreakSelected) {
        state.handleTimer("Long");
      }
      return { isRunning: !state.isRunning };
    });
  },

  togglePause: () => {
    set((state) => {
      if (state.pomodoroSelected) {
        set((state) => {
          if (state.isRunning) {
            clearInterval(state.intervalId);
          } else {
            state.toggleTimer("Pomodoro");
          }
          return { isRunning: !state.isRunning };
        });
      } else if (state.shortBreakSelected) {
        set((state) => {
          if (state.isRunning) {
            clearInterval(state.intervalId);
          } else {
            state.toggleTimer("Short");
          }
          return { isRunning: !state.isRunning };
        });
      } else if (state.longBreakSelected) {
        set((state) => {
          if (state.isRunning) {
            clearInterval(state.intervalId);
          } else {
            state.toggleTimer("Long");
          }
          return { isRunning: !state.isRunning };
        });
      }

      return { isRunning: !state.isRunning };
    });
  },

  handleTimerValue: (type) => {
    set((state) => {
      if (type === "Pomodoro") {
        return {
          ...state,
          pomodoroSelected: true,
          shortBreakSelected: false,
          longBreakSelected: false,
          isRunning: false,
          timer: 30 * 60,
        };
      } else if (type === "Short") {
        return {
          ...state,
          shortBreakSelected: true,
          pomodoroSelected: false,
          longBreakSelected: false,
          isRunning: false,
          shortBreakTimer: 5 * 60,
        };
      } else if (type === "Long") {
        return {
          ...state,
          longBreakSelected: true,
          pomodoroSelected: false,
          shortBreakSelected: false,
          isRunning: false,
          longBreakTimer: 15 * 60,
        };
      }
    });
  },
}));

export const useSettingsStore = create((set) => ({
  verificationEnabled: false,
  setVerificationEnabled: (newVal) => set({ verificationEnabled: newVal }),
}));

export const useWorkspaceStore = create((set) => ({
  user: "",
  notesSlides: 3,
  chartSlides: 3,
  setUser: (newVal) => set({ user: newVal }),
  setNotesSlides: (newVal) => set({ notesSlides: newVal }),
  setChartSlides: (newVal) => set({ chartSlides: newVal }),
}));

export const useLoginStore = create((set) => ({
  email: "",
  password: "",
  forgotPasswordEmail: "",
  emailModalError: false,
  emailSent: false,
  showVerificationModal: false,
  showForgotPasswordModal: false,

  setEmail: (newVal) => set({ email: newVal }),
  setPassword: (newVal) => set({ password: newVal }),
  setForgotPasswordEmail: (newVal) => set({ forgotPasswordEmail: newVal }),
  setEmailModalError: (newVal) => set({ emailModalError: newVal }),
  setEmailSent: (newVal) => set({ emailSent: newVal }),
  setShowVerificationModal: (newVal) => set({ showVerificationModal: newVal }),
  setShowForgotPasswordModal: (newVal) =>
    set({ showForgotPasswordModal: newVal }),
}));
