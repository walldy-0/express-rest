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
    res.json(db.find(item => item.id === req.params.id));
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  
  if(author && text) {
    db.push({id: uuidv4(), author: author, text: text});

    res.status(200).json({ message: 'OK' });
  }
  else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  
  if(id && author && text) {
    const item = db.find(item => item.id === id);
    item.author = author;
    item.text = text;

    res.status(200).json({ message: 'OK' });
  }
  else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  
  if(id) {
    const indexToRemove = db.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      db.splice(indexToRemove, 1);
    }

    res.status(200).json({ message: 'OK' });
  }
  else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
