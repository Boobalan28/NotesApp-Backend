import express from "express";
import {
  getNoteById,
  getNotes,
  CreateNote,
  DeleteNote,
  UpdateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.route("/").get(getNotes);
router.get("/getnotebyid/:noteid",getNoteById);
router.delete("/deletenote/:noteid",DeleteNote);
router.put("/updatenote/:noteid",UpdateNote);
router.route("/create").post(CreateNote);

export default router;
