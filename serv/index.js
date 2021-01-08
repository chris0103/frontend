const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
app.use(compression());
const port = 8000;

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname)));

app.get('*', function(req, res) {
  const file = fs.readFileSync(
    path.join(__dirname, '..', 'dist', 'index.html'),
  );
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(file);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
