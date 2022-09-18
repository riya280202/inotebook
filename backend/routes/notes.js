const express = require("express")
const router = express.Router();
const fetchUser = require("../middleware/fetchUser")
const Note = require ("../models/Note")
const { body, validationResult } = require('express-validator');



//Route 1 get all the notes
router.get("/fetchallnotes", fetchUser,  async (req,res) => {
    try {
        const notes = await Note.find({user: req.user.id})
        // console.log(notes)
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
    
})


//Route 2 add a new note
router.post("/addnote", fetchUser, [
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter description').isLength({ min: 5 })
], async (req,res) => {
    const {title, description, tag} =req.body;

    //errors - send bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    };

    try {
        const note = new Note  ({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }

    
} )


//Route 3 update an existing note
router.put("/updatenote/:id", fetchUser, async (req,res) => {
    const {title, description, tags} = req.body
    try {
    

    //create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tags){newNote.tags = tags};


    //find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note){
        res.status(404).send("Not found")
    }

    if(note.user.toString() !== req.user.id){
        res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
    
})

//route4 delete note
router.delete("/deletenote/:id", fetchUser, async (req,res) => {
    try {
    //find note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note){
        res.status(404).send("Not found")
    }


    //allow deletion only if user owns it
    if(note.user.toString() !== req.user.id){
        res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted ", note: note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
    
})
module.exports = router;