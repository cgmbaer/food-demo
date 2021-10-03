const express = require('express')
const app = express()
const port = 5000

const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000'
    }
  
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})