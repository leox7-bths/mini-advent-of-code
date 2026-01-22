const express = require('express');
const path = require('path');
const fs = require("fs/promises");
const cookieParser = require('cookie-parser');
const crypto = require("crypto");
const app = express();

async function createDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error('something happened idk');
  }
}
app.use(cookieParser());


app.get('/', async (req, res) => {
  if (!req.cookies.user_id) {
    const id = crypto.randomUUID();
    const userDir = path.join(__dirname, "users", id);
    await createDirectory(userDir);
    res.cookie("user_id", id, {
      maxAge: 10000000000,
      httpOnly: false,
      path: "/"
    });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});




app.get('/days/:day', (req, res) => {
  const dayFile = path.join(__dirname, 'days', `day${req.params.day}.html`);
  res.sendFile(dayFile);
});
app.use(express.static(path.join(__dirname)));
app.listen(3000);