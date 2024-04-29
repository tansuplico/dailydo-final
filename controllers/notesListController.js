import asyncHandler from "express-async-handler";
import { NoteList } from "../models/noteListModel.js";
import { TrashList } from "../models/trashListModel.js";

export const fetchNotes = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }
    const notes = await NoteList.find({ user: userId });
    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const changeNoteTitle = asyncHandler(async (req, res) => {
  const userId = req.authInfo.userId;

  if (!userId) {
    res.status(401).send({ error: "Unauthorized" });
  }

  const noteId = req.params.noteId;
  const { title } = req.body;

  if (title.length > 100) {
    return res.status(400).send({ message: "Title is too long" });
  }

  try {
    const foundNote = await NoteList.find({
      user: userId,
      "noteList.id": noteId,
    });

    if (foundNote) {
      const updatedNote = await NoteList.findOneAndUpdate(
        { "noteList.id": noteId },
        { $set: { "noteList.$.title": title } },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).send({ message: "Note not found" });
      }

      res.status(200).json(updatedNote);
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export const changeNoteContent = asyncHandler(async (req, res) => {
  const userId = req.authInfo.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  const noteId = req.params.noteId;
  const { content } = req.body;

  try {
    const foundNote = await NoteList.findOne({
      user: userId,
      "noteList.id": noteId,
    });
    if (foundNote) {
      const updatedNote = await NoteList.findOneAndUpdate(
        { "noteList.id": noteId },
        { $set: { "noteList.$.content": content } },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const trashNote = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const noteId = req.params.noteId;
    const { soloId } = req.body;

    const getNote = await NoteList.findOne({ user: userId });

    if (!getNote) {
      res.status(404).send({ message: "Note not found" });
    }

    const noteToTrash = getNote.noteList.find((note) => note.id === soloId);

    await NoteList.findOneAndUpdate(
      { user: userId, "noteList.id": noteId },
      { $pull: { noteList: { id: soloId } } },
      { new: true }
    );

    await TrashList.findOneAndUpdate(
      { user: userId },
      { $push: { trashList: noteToTrash } },
      { new: true }
    );

    res.status(200).send({ message: "Note moved to trash" });
  } catch (error) {
    console.log(error);
  }
});

export const favoriteNote = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const noteId = req.params.noteId;

    const getNotes = await NoteList.find({ user: userId });

    if (!getNotes) {
      res.status(404).send({ message: "Notes document cannot be found" });
    }

    const foundNote = getNotes[0].noteList.find((note) => note.id === noteId);

    const updatedNotes = await NoteList.findOneAndUpdate(
      { user: userId, "noteList.id": noteId },
      { $set: { "noteList.$[element].isFavorite": !foundNote.isFavorite } },
      {
        new: true,
        arrayFilters: [{ "element.id": noteId }],
      }
    );

    if (!updatedNotes) {
      res.status(404).send({ message: "No notes found" });
    }

    res.status(200).send({ message: "Changes applied" });
  } catch (error) {
    console.log(error);
  }
});

export const addNewNote = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const { newNoteFormat } = req.body;

    await NoteList.findOneAndUpdate(
      { user: userId },
      { $push: { noteList: newNoteFormat } },
      { new: true }
    );

    return res.status(201).send({ message: "New note added" });
  } catch (error) {
    console.log(error);
  }
});

export const sortNoteName = asyncHandler(async (req, res) => {
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
      return a.title.localeCompare(b.title);
    });

    const updatedNoteList = await foundNote.save();

    res
      .status(200)
      .json({ message: "Task groups sorted successfully", updatedNoteList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const sortNoteDate = asyncHandler(async (req, res) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
