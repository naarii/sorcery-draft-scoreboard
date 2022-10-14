const path = require('path');
const express = require("express");
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.get("/api", (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync('./server/data.json', 'utf-8'))
  res.json(jsonData);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.put("/api/put", (req, res) => {
  fs.writeFile('./server/data.json', JSON.stringify(req.body), err => {
    if (err)
      console.log(err);
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});