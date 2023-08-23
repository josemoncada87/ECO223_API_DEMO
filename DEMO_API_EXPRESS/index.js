const express = require('express')
const app = express()
const port = 3000

// Import the cors package to prevent cors error
const cors = require('cors'); 

// Use the cors middleware
app.use(cors());
// Use Json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// New list for items storage (only ram memory)
let items = []

// 📤 Endpoint for obtain all items
app.get('/items', (req, res) => {  
  res.send({"items":items})
})

// 📥 Enpoint for save one new item
app.post('/items', (req, res) => {
  const newItem = {
    x: req.body.x,
    y: req.body.y,
    r: req.body.r,
    g: req.body.g,
    b: req.body.b,
  }

  // Add new Item to list 
  items.push(newItem);

  // Send a response
  res.send({"response":`New Item at ${newItem.x}, ${newItem.y}`});
})

app.get('/', (req, res) => {    
  res.send('Server started')
})

app.post('/clear', (req, res) => {    
  items = []
  res.send('Server cleared')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})