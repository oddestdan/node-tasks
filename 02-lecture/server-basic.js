const express = require('express');
const app = express();
const router = express.Router();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ books: [], username: req.body.name });
});

app.listen(8082);
