const express = require('express');
const router = express.Router();

const mockNotes = require('../../data/notes.json');

router.get('/notes', (req, res) => {
  const userId = req.user.id;
  const notes = mockNotes.find(note => note.userId === userId).notes;
  res.json({ notes });
  console.log(`Sent User #${userId} notes`);
});

module.exports = router;
