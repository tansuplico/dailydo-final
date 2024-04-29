import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const TaskSchema = new Schema({
  id: { type: String, required: true },
  task: { type: String, default: "" },
  isImportant: { type: Boolean, required: true, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const TasksArrSchema = new Schema({
  toDoList: [TaskSchema],
  doingList: [TaskSchema],
  doneList: [TaskSchema],
});

const TaskListSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  taskGroupName: {
    type: String,
    default: "",
  },
  taskList: TasksArrSchema,
  dateCreated: { type: Date, default: Date.now },
});

const TaskGroupSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  taskGroupList: [TaskListSchema],
});

export const TaskList = model("tasklists", TaskGroupSchema);
