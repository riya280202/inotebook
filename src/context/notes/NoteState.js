import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "63220405dd3763014d449541",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "JSON=jjvfv",
          "description": "Standard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:37.725Z",
          "__v": 0
        },
        {
          "_id": "a6322r040ddd3763014d449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "b6322040ddd3763014d44954f3",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "c6322040dddd3763014d449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "d6322040ddd37630d14d449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "6322040ddd3763014d449d543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "e6322040ddd3d763014d449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "f6322040ddd3763014dd449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "g6322040ddd3763014d449d543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        {
          "_id": "h6322040ddd3763014d44g9543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": "fef=jjvfvfvffv",
          "description": "Stanfvfdard library",
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0
        },
        
      ]

      const [notes, setNotes] = useState(notesInitial)

      //add a note
      const addNote = (title, description, tag) => {
        const note = {
          "_id": "6322040ddd37630g14d449543",
          "user": "6321a5f09c57d9d9a2d68ac9",
          "title": title,
          "description": description,
          "tag": "html, css",
          "date": "2022-09-14T16:40:45.564Z",
          "__v": 0,
        }
        setNotes(notes.concat(note))
      }




      //delete a note
      const deleteNote = (id) => {
        console.log("Deleting the note with id " + id)
        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes)
      }


      //update a note
      const updateNote = () => {

      }
    return (
        <noteContext.Provider value= {{notes, addNote, deleteNote, updateNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;