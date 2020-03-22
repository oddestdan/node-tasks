import React from 'react';
import './Note.css';

const Note = props => {
  const { note, checkNote } = props;

  return (
    <div className="Note">
      <span onClick={checkNote}>x</span>
      <p>{note.title}</p>
      <p>{note.content}</p>
      <p>{note.isChecked && 'x'}</p>
    </div>
  );
};

export default Note;
