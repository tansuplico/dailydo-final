import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  fetchTrash,
  recoverTrash,
  deleteTrash,
  sortTrashName,
  sortTrashDate,
} from "../controllers/trashListController.js";
const router = express.Router();

router.get("/", authenticateToken, fetchTrash);

router.put("/:trashId/recover-trash", authenticateToken, recoverTrash);

router.delete("/:trashId/delete-trash", authenticateToken, deleteTrash);

router.patch(`/sort-name-trash`, authenticateToken, sortTrashName);

router.patch(`/sort-date-trash`, authenticateToken, sortTrashDate);

export default router;
