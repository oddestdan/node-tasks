import React, { useState } from 'react';
import './NoteCreate.css';

const NoteCreate = ({ createNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClick = () => createNote(title, content);
  const handleTitleChange = event => setTitle(event.target.value);
  const handleContentChange = event => setContent(event.target.value);

  return (
    <div className="Notes__create-wrapper NoteCreate">
      <div className="NoteCreate__input-menu">
        <label className="NoteCreate__input-label">
          Title:
          <input
            className="NoteCreate__input"
            type="text"
            onChange={handleTitleChange}
          />
        </label>
        <label className="NoteCreate__input-label">
          Content:
          <input
            className="NoteCreate__input"
            type="text"
            onChange={handleContentChange}
          />
        </label>
      </div>
      <div className="NoteCreate__create" onClick={handleClick}>
        Create Note
      </div>
    </div>
  );
};

export default NoteCreate;
