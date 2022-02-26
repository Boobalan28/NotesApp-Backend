import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";


// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find(); 
  res.json(notes);
});  

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getNoteById = async (req, res) => {
  const {noteid} = req.params.noteid;
  try {
    const note = await Note.findOne({_id: noteid});
    res.send(note);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({
      title:req.body.title, 
      content:req.body.content, 
      category:req.body.category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteNote = async (req, res) => {
  
  const noteid = req.params.noteid;

  try{
    const note = await Note.findByIdAndRemove({_id:noteid});
    res.send(note);
    if (note){
      await note.remove();
      res.json({message:"Note is Removed"})
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const {noteid} = req.params.noteid;

  const note = await Note.findByIdAndUpdate({_id: noteid});

  if (note.toString() !== noteid.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
