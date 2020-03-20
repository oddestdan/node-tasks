const express = require('express');
const path = require('path');

const mockNotes = ['item1', 'item2', 'item3'];

// Create express application
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/notes', (req, res) => {
  res.json(mockNotes);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);

console.log(`App is listening on port ${port}...`);
