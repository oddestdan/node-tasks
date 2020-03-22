const express = require('express');
const router = express.Router();
const path = require('path');

const logger = require('../../logger/logger');
const mockNotes = require('../../data/notes.json');
const { getNotesByUserId } = require('../../utils/notes');

// Get all notes
router.get('/notes', (req, res) => {
  const notes = getNotesByUserId(req.user.id);

  res.json({ notes, amount: notes.length });
  console.log(`Sent User #${req.user.id} notes`);
});

// Get a note
router.get('/notes/:id', (req, res) => {
  const noteId = +req.params.id;
  const note = getNotesByUserId(req.user.id).find(note => note.id === noteId);

  res.json({ note });
  console.log(`Sent User #${req.user.id} note #${noteId}`);
});

// Create a note
router.post('/notes/', (req, res) => {
  const notes = getNotesByUserId(req.user.id);
  const newId = notes[notes.length - 1].id + 1;

  notes.push({ id: newId, ...req.body });
  logger.updateFile(path.join(__dirname, '../../data/notes.json'), mockNotes);

  console.log(`Created User #${req.user.id} note #${newId}`);
  res.status(200).json({ status: 'ok' });
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
  const noteId = +req.params.id;
  const notes = getNotesByUserId(req.user.id);

  notes.splice(
    notes.findIndex(note => note.id === noteId),
    1
  );

  logger.updateFile(path.join(__dirname, '../../data/notes.json'), mockNotes);

  console.log(`Deleted User #${req.user.id} note #${noteId}`);
  res.status(200).json({ status: 'ok' });
});

// Update a note
router.patch('/notes/:id', (req, res) => {
  const noteId = +req.params.id;
  const notes = getNotesByUserId(req.user.id);

  const noteIndex = notes.findIndex(note => note.id === noteId);
  notes[noteIndex] = { id: noteId, ...req.body };

  logger.updateFile(path.join(__dirname, '../../data/notes.json'), mockNotes);

  console.log(`Updated User #${req.user.id} note #${noteId}`);
  res.status(200).json({ status: 'ok' });
});

// Toggle check a note
router.patch('/notes/check/:id', (req, res) => {
  const noteId = +req.params.id;
  const note = getNotesByUserId(req.user.id).find(note => note.id === noteId);

  note.isChecked = !note.isChecked;
  logger.updateFile(path.join(__dirname, '../../data/notes.json'), mockNotes);

  console.log(`Checked User #${req.user.id} note #${noteId}`);
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
