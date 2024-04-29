import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  fetchNotes,
  changeNoteTitle,
  changeNoteContent,
  trashNote,
  favoriteNote,
  addNewNote,
  sortNoteName,
  sortNoteDate,
} from "../controllers/notesListController.js";
const router = express.Router();

router.get("/", authenticateToken, fetchNotes);

router.post(`/:noteId/title-change`, authenticateToken, changeNoteTitle);

router.post(`/:noteId/content-change`, authenticateToken, changeNoteContent);

router.post(`/:noteId/trash-note`, authenticateToken, trashNote);

router.post(`/:noteId/favorite-note`, authenticateToken, favoriteNote);

router.post(`/add-note`, authenticateToken, addNewNote);

router.patch(`/sort-name-note`, authenticateToken, sortNoteName);

router.patch(`/sort-date-note`, authenticateToken, sortNoteDate);

export default router;
