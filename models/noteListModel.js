import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const NoteContentsSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  isFavorite: { type: Boolean, required: true, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const NoteListSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  noteList: [NoteContentsSchema],
});

export const NoteList = model("notelist", NoteListSchema);
