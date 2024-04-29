import asyncHandler from "express-async-handler";
import { TaskList } from "../models/taskListModel.js";
import mongoose from "mongoose";

// Task Group
export const fetchTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskGroup = await TaskList.find({ user: userId });

    if (!taskGroup) {
      res.status(404).json({ error: "Task group doesn't exist" });
    }
    return res.status(200).json({ taskGroup });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const changeGroupTitle = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskId = req.params.taskId;
    const { taskGroupName } = req.body;

    const taskGroup = await TaskList.findOneAndUpdate(
      { user: userId, "taskGroupList.id": taskId },
      { $set: { "taskGroupList.$.taskGroupName": taskGroupName } },
      { new: true }
    );

    res.status(200).json(taskGroup);
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const sortGroupTitle = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const foundGroup = await TaskList.findOne({ user: userId });

    if (!foundGroup) {
      return res.status(404).json({ message: "User not found" });
    }

    foundGroup.taskGroupList.sort((a, b) => {
      return a.taskGroupName.localeCompare(b.taskGroupName);
    });

    const updatedGroup = await foundGroup.save();

    res
      .status(200)
      .json({ message: "Task groups sorted successfully", updatedGroup });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const sortGroupAmount = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }
    const foundGroup = await TaskList.findOne({ user: userId });

    if (!foundGroup) {
      return res.status(404).json({ message: "User not found" });
    }

    foundGroup.taskGroupList.sort(
      (a, b) =>
        a.taskList.toDoList.length +
        a.taskList.doingList.length +
        a.taskList.doneList.length -
        (b.taskList.toDoList.length +
          b.taskList.doingList.length +
          b.taskList.doneList.length)
    );

    const updatedGroup = await foundGroup.save();

    res
      .status(200)
      .json({ message: "Task groups sorted successfully", updatedGroup });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const addNewGroup = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const { groupFormat } = req.body;

    await TaskList.findOneAndUpdate(
      { user: userId },
      { $push: { taskGroupList: groupFormat } },
      { new: true }
    );

    return res.status(201).send({ message: "New Group Added" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const deleteGroup = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const { taskGroupId } = req.body;

    const foundGroup = await TaskList.findOneAndUpdate(
      { user: userId, "taskGroupList.id": taskGroupId },
      { $pull: { taskGroupList: { id: taskGroupId } } },
      { new: true }
    );

    if (!foundGroup) {
      return res.status(404).send({ message: "Group doesn't exist" });
    }

    res.status(200).send({ message: "Group removed" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const clearGroup = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const taskId = req.params.taskId;
    const { taskType } = req.body;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    let updatedPath = "";

    if (taskType === "ToDo") {
      updatedPath = "taskGroupList.$.taskList.toDoList";
    } else if (taskType === "Doing") {
      updatedPath = "taskGroupList.$.taskList.doingList";
    } else if (taskType === "Done") {
      updatedPath = "taskGroupList.$.taskList.doneList";
    }

    const findTaskCategory = await TaskList.findOneAndUpdate(
      { user: userId, "taskGroupList.id": taskId },
      { $set: { [updatedPath]: [] } },
      { new: true }
    );

    if (!findTaskCategory) {
      return res.status(404).json({ error: "Category could not be found" });
    }

    res.status(200).json({ message: "Successfully cleared to do list" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const sortTaskDate = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const taskId = req.params.taskId;
    const { taskType } = req.body;

    if (!userId) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const fetchGroup = await TaskList.findOne({ user: userId });

    if (!fetchGroup) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundGroup = fetchGroup.taskGroupList.find((d) => d.id === taskId);

    if (!foundGroup) {
      return res.status(404).json({ message: "Task group not found" });
    }

    if (taskType === "ToDo") {
      foundGroup.taskList.toDoList.sort((a, b) => {
        return b.dateCreated - a.dateCreated;
      });
    } else if (taskType === "Doing") {
      foundGroup.taskList.doingList.sort((a, b) => {
        return b.dateCreated - a.dateCreated;
      });
    } else if (taskType === "Done") {
      foundGroup.taskList.doneList.sort((a, b) => {
        return b.dateCreated - a.dateCreated;
      });
    }

    await fetchGroup.save();

    res.status(200).json({
      message: "Task groups sorted successfully",
      updatedGroup: fetchGroup,
    });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occurred: ${err}` });
  }
});

export const sortTaskName = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const taskId = req.params.taskId;
    const { taskType } = req.body;

    if (!userId) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const fetchGroup = await TaskList.findOne({ user: userId });

    if (!fetchGroup) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundGroup = fetchGroup.taskGroupList.find((d) => d.id === taskId);

    if (!foundGroup) {
      return res.status(404).json({ message: "Task group not found" });
    }

    if (taskType === "ToDo") {
      foundGroup.taskList.toDoList.sort((a, b) => {
        return a.task.localeCompare(b.task);
      });
    } else if (taskType === "Doing") {
      foundGroup.taskList.doingList.sort((a, b) => {
        return a.task.localeCompare(b.task);
      });
    } else if (taskType === "Done") {
      foundGroup.taskList.doneList.sort((a, b) => {
        return a.task.localeCompare(b.task);
      });
    }

    await fetchGroup.save();

    res.status(200).json({
      message: "Task groups sorted successfully",
      updatedGroup: fetchGroup,
    });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occurred: ${err}` });
  }
});

// Tasks
export const addToDoTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskId = req.params.taskId;
    const { taskFormat } = req.body;
    const foundToDo = await TaskList.findOne({
      user: userId,
      "taskGroupList.id": taskId,
    });

    if (foundToDo) {
      await TaskList.findOneAndUpdate(
        { user: userId, "taskGroupList.id": taskId },
        { $push: { "taskGroupList.$.taskList.toDoList": taskFormat } },
        { new: true }
      );
    }

    res.status(201).send({ message: "To Do List Added" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const addDoingTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskId = req.params.taskId;
    const { taskFormat } = req.body;
    const foundToDo = await TaskList.findOne({
      user: userId,
      "taskGroupList.id": taskId,
    });

    if (foundToDo) {
      await TaskList.findOneAndUpdate(
        { user: userId, "taskGroupList.id": taskId },
        { $push: { "taskGroupList.$.taskList.doingList": taskFormat } },
        { new: true }
      );
    }
    res.status(201).send({ message: "To Do List Added" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const addDoneTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskId = req.params.taskId;
    const { taskFormat } = req.body;
    const foundToDo = await TaskList.findOne({
      user: userId,
      "taskGroupList.id": taskId,
    });

    if (foundToDo) {
      await TaskList.findOneAndUpdate(
        { user: userId, "taskGroupList.id": taskId },
        { $push: { "taskGroupList.$.taskList.doneList": taskFormat } },
        { new: true }
      );
    }

    res.status(201).send({ message: "To Do List Added" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }
    const taskId = req.params.taskId;
    const { nestedTaskId, type } = req.body;
    let updatedQuery = {};
    let updatedPath = "";

    if (type === "ToDo") {
      updatedQuery = {
        user: userId,
        "taskGroupList.id": taskId,
        "taskGroupList.taskList.toDoList.id": nestedTaskId,
      };

      updatedPath = "taskGroupList.$.taskList.toDoList";
    } else if (type === "Doing") {
      updatedQuery = {
        user: userId,
        "taskGroupList.id": taskId,
        "taskGroupList.taskList.doingList.id": nestedTaskId,
      };

      updatedPath = "taskGroupList.$.taskList.doingList";
    } else if (type === "Done") {
      updatedQuery = {
        user: userId,
        "taskGroupList.id": taskId,
        "taskGroupList.taskList.doneList.id": nestedTaskId,
      };

      updatedPath = "taskGroupList.$.taskList.doneList";
    } else {
      throw new Error("Invalid type");
    }

    const foundTask = await TaskList.findOne(updatedQuery);

    if (!foundTask) {
      res.status(404).send({ message: "No task found" });
    }

    await TaskList.findOneAndUpdate(
      updatedQuery,
      {
        $pull: {
          [updatedPath]: {
            id: nestedTaskId,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({ message: "Task removed successfully" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const duplicateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskId = req.params.taskId;
    const { taskIndex, type } = req.body;
    const foundTaskList = await TaskList.findOne({
      user: userId,
      "taskGroupList.id": taskId,
    });

    if (!foundTaskList) {
      return res.status(404).send({ message: "Task list not found" });
    }

    const taskList = foundTaskList.taskGroupList.find(
      (d) => d.id === taskId
    ).taskList;
    let selectedTaskList;

    if (type === "ToDo") {
      selectedTaskList = taskList.toDoList;
    } else if (type === "Doing") {
      selectedTaskList = taskList.doingList;
    } else if (type === "Done") {
      selectedTaskList = taskList.doneList;
    }

    const taskIndexFound = selectedTaskList.findIndex(
      (task, index) => index === taskIndex
    );

    if (taskIndexFound === -1) {
      return res.status(404).send({ message: "Task not found in the list" });
    }

    const clonedTask = {
      ...selectedTaskList[taskIndexFound].toObject(),
      id: new mongoose.Types.ObjectId(),
      _id: new mongoose.Types.ObjectId(),
    };

    selectedTaskList.splice(taskIndexFound + 1, 0, clonedTask);

    await foundTaskList.save();

    res.status(200).send({ message: "Task duplicated successfully" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const changeTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskGroupId = req.params.taskGroupId;
    const { taskValue, soloId, type } = req.body;
    let queryCriteria = {};
    let dbpath = "";

    if (type === "ToDo") {
      queryCriteria = {
        user: userId,
        "taskGroupList.id": taskGroupId,
        "taskGroupList.taskList.toDoList.id": soloId,
      };
      dbpath = "taskGroupList.$[group].taskList.toDoList.$[task].task";
    } else if (type === "Doing") {
      queryCriteria = {
        user: userId,
        "taskGroupList.id": taskGroupId,
        "taskGroupList.taskList.doingList.id": soloId,
      };
      dbpath = "taskGroupList.$[group].taskList.doingList.$[task].task";
    } else if (type === "Done") {
      queryCriteria = {
        user: userId,
        "taskGroupList.id": taskGroupId,
        "taskGroupList.taskList.doneList.id": soloId,
      };
      dbpath = "taskGroupList.$[group].taskList.doneList.$[task].task";
    } else {
      throw new Error("Task type doesn't exist");
    }

    const updatedTaskGroup = await TaskList.findOneAndUpdate(
      queryCriteria,
      {
        $set: {
          [dbpath]: taskValue,
        },
      },
      {
        arrayFilters: [{ "group.id": taskGroupId }, { "task.id": soloId }],
        new: true,
      }
    );

    if (!updatedTaskGroup) {
      return res.status(404).send({ message: "Task or task group not found" });
    }

    res
      .status(200)
      .send({ message: "Task updated successfully", updatedTaskGroup });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const importantTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskGroupId = req.params.taskGroupId;
    const { soloId, type } = req.body;
    const getGroup = await TaskList.findOne({ user: userId });
    const findGroup = getGroup.taskGroupList.find(
      (group) => group.id === taskGroupId
    );

    if (!findGroup) {
      return res.status(404).send({ message: "Task group not found" });
    }

    let pathDb = "";
    let toFind;

    if (type === "ToDo") {
      pathDb = "taskGroupList.$[group].taskList.toDoList.$[task].isImportant";
      toFind = findGroup.taskList.toDoList;
    } else if (type === "Doing") {
      pathDb = "taskGroupList.$[group].taskList.doingList.$[task].isImportant";
      toFind = findGroup.taskList.doingList;
    } else if (type === "Done") {
      pathDb = "taskGroupList.$[group].taskList.doneList.$[task].isImportant";
      toFind = findGroup.taskList.doneList;
    }

    const updatedTaskList = await TaskList.findOneAndUpdate(
      {
        user: userId,
        "taskGroupList.id": taskGroupId,
      },
      {
        $set: {
          [pathDb]: !toFind.find((task) => task.id === soloId).isImportant,
        },
      },
      {
        arrayFilters: [{ "group.id": taskGroupId }, { "task.id": soloId }],
        new: true,
      }
    );

    if (!updatedTaskList) {
      return res.status(404).send({ message: "Task or task list not found" });
    }

    return res.status(200).send({ message: "Is important value changed" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const clearTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskGroupId = req.params.taskGroupId;
    const { soloId, type } = req.body;
    const getGroup = await TaskList.findOne({ user: userId });

    if (!getGroup) {
      res.status(404).send({ message: "No task group found" });
    }

    let pathDb = "";

    if (type === "ToDo") {
      pathDb = "taskGroupList.$[group].taskList.toDoList.$[task].task";
    } else if (type === "Doing") {
      pathDb = "taskGroupList.$[group].taskList.doingList.$[task].task";
    } else if (type === "Done") {
      pathDb = "taskGroupList.$[group].taskList.doneList.$[task].task";
    }

    const updatedTaskList = await TaskList.findOneAndUpdate(
      { user: userId, "taskGroupList.id": taskGroupId },
      { $set: { [pathDb]: "" } },
      {
        arrayFilters: [{ "group.id": taskGroupId }, { "task.id": soloId }],
        new: true,
      }
    );

    if (!updatedTaskList) {
      res.status(404).send({ message: "No task group or task found" });
    }

    res.status(200).send({ message: "Task cleared" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const moveTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const taskGroupId = req.params.taskGroupId;
    const { soloId, type } = req.body;
    const getGroup = await TaskList.findOne({ user: userId });

    if (!getGroup) {
      res.status(404).send({ message: "No group found" });
    }

    const findGroup = getGroup.taskGroupList.find(
      (group) => group.id === taskGroupId
    );

    let groupPath = "";
    let pathDb = "";
    let taskCategory;

    if (type === "ToDo") {
      groupPath = "taskGroupList.$.taskList.toDoList";
      pathDb = "taskGroupList.$.taskList.doingList";
      taskCategory = findGroup.taskList.toDoList;
    } else if (type === "Doing") {
      groupPath = "taskGroupList.$.taskList.doingList";
      pathDb = "taskGroupList.$.taskList.doneList";
      taskCategory = findGroup.taskList.doingList;
    } else {
      throw new Error("No task category found");
    }

    const taskToMove = taskCategory.find((task) => task.id === soloId);

    await TaskList.findOneAndUpdate(
      { user: userId, "taskGroupList.id": taskGroupId },
      {
        $pull: {
          [groupPath]: { id: soloId },
        },
        $push: { [pathDb]: taskToMove },
      },
      [{ "taskGroupList.id": taskGroupId }],
      { new: true }
    );

    res.status(200).send({ message: "Task moved successfully" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});
