const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/days/:day', (req, res) => {
  const dayFile = path.join(__dirname, 'days', `day${req.params.day}.html`);
  res.sendFile(dayFile);
});

app.listen(3000);