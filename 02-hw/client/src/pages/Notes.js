import React, { useEffect, useState } from 'react';
import './Notes.css';
import Note from '../components/Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(notes => setNotes(notes));
  };

  useEffect(() => fetchNotes(), []);

  return (
    <div className="Notes">
      <h1 className="Notes__title">Notes of Items</h1>
      {notes.length ? (
        <div className="Notes__wrapper">
          {notes.map(note => {
            return <div>{<Note note={note} />}</div>;
          })}
        </div>
      ) : (
        <div className="Notes__wrapper">
          <h2>Notes not found</h2>
        </div>
      )}
    </div>
  );
};

export default Notes;
