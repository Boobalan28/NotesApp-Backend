import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema, "notes");

export default Note;
