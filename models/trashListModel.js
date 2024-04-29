import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const TrashContentsSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  isFavorite: { type: Boolean, required: true, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const TrashListSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  trashList: [TrashContentsSchema],
});

export const TrashList = model("trashlist", TrashListSchema);
