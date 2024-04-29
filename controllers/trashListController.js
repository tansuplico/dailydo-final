import asyncHandler from "express-async-handler";
import { TrashList } from "../models/trashListModel.js";
import { NoteList } from "../models/noteListModel.js";

export const fetchTrash = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const fetchedData = await TrashList.find({ user: userId });

    if (!fetchedData) {
      res.status(404).send({ message: "Trash documents not found" });
    }

    res.status(200).json({ fetchedData });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const recoverTrash = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const trashId = req.params.trashId;
    const getTrash = await TrashList.find({ user: userId });

    if (!getTrash) {
      res.status(404).send({ message: "Trash list not found" });
    }

    const findTrash = getTrash[0].trashList.find(
      (trash) => trash.id === trashId
    );

    await TrashList.findOneAndUpdate(
      { user: userId },
      { $pull: { trashList: { id: findTrash.id } } },
      { new: true }
    );

    await NoteList.findOneAndUpdate(
      { user: userId },
      { $push: { noteList: findTrash } },
      { new: true }
    );

    res.status(200).send({ message: "Notes successfully recovered" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const deleteTrash = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const trashId = req.params.trashId;
    const getTrash = await TrashList.find({ user: userId });

    if (!getTrash) {
      res.status(404).send({ message: "Trash list not found" });
    }

    const findTrash = getTrash[0].trashList.find(
      (trash) => trash.id === trashId
    );

    const updatedTrash = await TrashList.findOneAndUpdate(
      { user: userId },
      { $pull: { trashList: { id: findTrash.id } } },
      { new: true }
    );

    if (!updatedTrash) {
      res.status(404).send({ message: "Trash group or trash list not found" });
    }

    res.status(200).send({ message: "Trash deleted permanently" });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const sortTrashName = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const foundTrash = await TrashList.findOne({ user: userId });

    if (!foundTrash) {
      return res.status(404).json({ message: "Trash not found" });
    }

    foundTrash.trashList.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    const updatedTrashList = await foundTrash.save();

    res
      .status(200)
      .json({ message: "Trash sorted successfully", updatedTrashList });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});

export const sortTrashDate = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const foundNote = await NoteList.findOne({ user: userId });

    if (!foundNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    foundNote.noteList.sort((a, b) => {
      return a.dateCreated - b.dateCreated;
    });

    const updatedNoteList = await foundNote.save();

    res
      .status(200)
      .json({ message: "Notes sorted successfully", updatedNoteList });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});
