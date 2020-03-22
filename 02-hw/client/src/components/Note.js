import React from 'react';
import './Note.css';

const Note = props => {
  const { note, checkNote, deleteNote } = props;

  const handleCheckClick = () => checkNote(note.id);
  const handleDeleteClick = () => deleteNote(note.id);

  return (
    <div className={`Note ${note.isChecked && 'Note--is-checked'}`}>
      <span
        className="Note__checker Note__action-icon"
        onClick={handleCheckClick}
      >
        ✔
      </span>
      <span
        className="Note__deleter Note__action-icon"
        onClick={handleDeleteClick}
      >
        X
      </span>
      <p className="Note__title">
        {note.title}
        <span className="Note__is-checked">{note.isChecked && 'checked'}</span>
      </p>
      <p className="Note__content">{note.content}</p>
    </div>
  );
};

export default Note;
