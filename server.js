const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = [
  { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
  { id: '2', author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: '3', author: 'Steven Smith', text: 'This company is worth every coin!' },
  { id: '4', author: 'Joanna Light', text: 'They really know how to make you happy.' },
];


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  if (req.params.id === 'random') {
    const randomIndex = Math.floor(Math.random() * db.length);
    res.json(db[randomIndex]);
  } else {
    res.json(db.find(o => o.id === req.params.id));
  }
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
