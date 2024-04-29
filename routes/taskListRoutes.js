import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  fetchTask,
  changeGroupTitle,
  sortGroupTitle,
  sortGroupAmount,
  addNewGroup,
  deleteGroup,
  clearGroup,
  sortTaskDate,
  sortTaskName,
  addToDoTask,
  addDoingTask,
  addDoneTask,
  deleteTask,
  duplicateTask,
  changeTask,
  importantTask,
  clearTask,
  moveTask,
} from "../controllers/taskListController.js";
const router = express.Router();

router.get(`/`, authenticateToken, fetchTask);

router.post(`/:taskId/group-title-change`, authenticateToken, changeGroupTitle);

router.put("/sort-group-title", authenticateToken, sortGroupTitle);

router.put("/sort-group-amountTask", authenticateToken, sortGroupAmount);

router.post("/add-new-group", authenticateToken, addNewGroup);

router.delete("/delete-group", authenticateToken, deleteGroup);

router.put("/:taskId/clear-whole-task", authenticateToken, clearGroup);

router.put("/:taskId/sort-task-date", authenticateToken, sortTaskDate);

router.put("/:taskId/sort-task-name", authenticateToken, sortTaskName);

// Task
router.post("/:taskId/add-toDo-task", authenticateToken, addToDoTask);

router.post("/:taskId/add-doing-task", authenticateToken, addDoingTask);

router.post("/:taskId/add-done-task", authenticateToken, addDoneTask);

router.delete("/:taskId/delete-task", authenticateToken, deleteTask);

router.post("/:taskId/duplicate-task", authenticateToken, duplicateTask);

router.patch("/:taskGroupId/change-task", authenticateToken, changeTask);

router.patch("/:taskGroupId/important-task", authenticateToken, importantTask);

router.patch("/:taskGroupId/clear-task", authenticateToken, clearTask);

router.post("/:taskGroupId/move-task", authenticateToken, moveTask);

export default router;
