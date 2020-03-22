import React, { useEffect, useState } from 'react';
import './Notes.css';
import Note from '../components/Note';
import NoteCreate from '../components/NoteCreate';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEYW4iLCJwYXNzd29yZCI6InF3ZXIiLCJpYXQiOjE1ODQ5MDQxNTd9.kKHZXhD-hZKWzdkxPDPJnX-YWHtTNnnDvlUV0SFEP90';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [amount, setAmount] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch('http://localhost:8081/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${TOKEN}`
      }
    });
    const { notes, amount } = await response.json();
    setNotes(notes);
    setAmount(amount);
  };

  const checkNote = async id => {
    const response = await fetch(
      `http://localhost:8081/api/notes/check/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${TOKEN}`
        }
      }
    );
    const { notes, amount } = await response.json();
    setNotes(notes);
    setAmount(amount);
  };

  const createNote = async (title, content) => {
    const response = await fetch(`http://localhost:8081/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${TOKEN}`
      },
      body: JSON.stringify({ title, content })
    });
    const { notes, amount } = await response.json();
    setNotes(notes);
    setAmount(amount);
  };

  const deleteNote = async id => {
    const response = await fetch(`http://localhost:8081/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${TOKEN}`
      }
    });
    const { notes, amount } = await response.json();
    setNotes(notes);
    setAmount(amount);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="Notes">
      <h1 className="Notes__title">
        Notes<sup className="Notes__amount">{`(${amount})`}</sup>
      </h1>
      <NoteCreate createNote={createNote} />
      {notes.length ? (
        <div className="Notes__wrapper">
          {notes.map(note => (
            <Note
              note={note}
              key={note.id}
              deleteNote={deleteNote}
              checkNote={checkNote}
            />
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
