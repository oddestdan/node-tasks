import React, { useEffect, useState } from 'react';
import './Notes.css';
import Note from '../components/Note';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEYW4iLCJwYXNzd29yZCI6InF3ZXIiLCJpYXQiOjE1ODQ5MDQxNTd9.kKHZXhD-hZKWzdkxPDPJnX-YWHtTNnnDvlUV0SFEP90';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch('http://localhost:8081/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${TOKEN}`
      }
    });
    const { notes } = await response.json();
    setNotes(notes);
  };

  const checkNote = async () => {
    const response = await fetch(`http://localhost:8081/api/notes/check/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${TOKEN}`
      }
    });
    const { notes } = await response.json();
    setNotes(notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="Notes">
      <h1 className="Notes__title">Notes</h1>
      {notes.length ? (
        <div className="Notes__wrapper">
          {notes.map(note => (
            <Note note={note} key={note.id} checkNote={checkNote} />
          ))}
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
