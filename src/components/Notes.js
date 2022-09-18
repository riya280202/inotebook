import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes , editNote} = context;
  useEffect(() => {
    getNotes();
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);


  const [note, setNote] = React.useState({id:"", etitle: "", edescription: "", etag:""})
  const handleClick =(e) => {
    // console.log(note.id)
    editNote(note.id, note.etitle, note.edescription);
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value})
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form action="" className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            aria-describedby="emailHelp"
            name="etitle"
            value={note.etitle}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
           Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
          />
        </div>
      </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={handleClick} disabled= {note.etitle.length<5 || note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container"> 
        {notes.length=== 0 && "No notes found"}
        </div>
        {notes.map((note) => {
          return <NoteItem note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
