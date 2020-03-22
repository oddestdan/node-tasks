import React from 'react';
import './Note.css';

const Note = props => {
  const { note, checkNote } = props;

  const handleClick = () => {
    checkNote(note.id);
  };

  return (
    <div className={`Note ${note.isChecked && 'Note--is-checked'}`}>
      <span className="Note__checker" onClick={handleClick}>
        ✔
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
