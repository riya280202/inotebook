import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
    const notesInitial = []

      const [notes, setNotes] = useState(notesInitial)
            //get all note
            const getNotes = async () => {
              //API call
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMWE1ZjA5YzU3ZDlkOWEyZDY4YWM5In0sImlhdCI6MTY2MzE0OTU2NX0.3N3bixQ6qMuPQXzz7ydKCGU4u15i3pFgVGGCQW5K58Q'
                }
              });
              const json = await response.json();
              // console.log(json)
              setNotes(json)
            }
      //add a note
      const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMWE1ZjA5YzU3ZDlkOWEyZDY4YWM5In0sImlhdCI6MTY2MzE0OTU2NX0.3N3bixQ6qMuPQXzz7ydKCGU4u15i3pFgVGGCQW5K58Q'
          },
          body: JSON.stringify({title,description}) 
        });
        const note = await response.json()
        setNotes(notes.concat(note))

      }




      //delete a note
      const deleteNote =async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMWE1ZjA5YzU3ZDlkOWEyZDY4YWM5In0sImlhdCI6MTY2MzE0OTU2NX0.3N3bixQ6qMuPQXzz7ydKCGU4u15i3pFgVGGCQW5K58Q'
          }
        });
        const json = await response.json();
        // console.log(json)
        console.log("Deleting the note with id " + id)
        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes)
      }


      //update a note
      const editNote = async (id, title, description) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyMWE1ZjA5YzU3ZDlkOWEyZDY4YWM5In0sImlhdCI6MTY2MzE0OTU2NX0.3N3bixQ6qMuPQXzz7ydKCGU4u15i3pFgVGGCQW5K58Q'
          },
          body: JSON.stringify({title,description}) 
        });
        const json = await response.json();
        const newNote = JSON.parse(JSON.stringify(notes))
        //Logic to edit
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          if(element._id === id){
            newNote[index].title = title;
            newNote[index].description = description;
         
         break;
        };
         setNotes(newNote);
          
        }
      }
    return (
        <noteContext.Provider value= {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;