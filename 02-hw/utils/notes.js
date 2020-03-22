const mockNotes = require('../data/notes.json');

module.exports.getNotesByUserId = userId => {
  return mockNotes.find(mock => mock.userId === userId).notes;
};
