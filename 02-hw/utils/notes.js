const mockNotes = require('../data/notes.json');

module.exports.getNotesByUserId = userId => {
  console.log('USER ID:', userId);
  return mockNotes.find(mock => mock.userId === userId).notes;
};
