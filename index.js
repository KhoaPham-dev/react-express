
const express = require('express')

const app = express()
const path = require('path');
app.use(express.static(path.join(__dirname)));

app.get('/api/a', (req, res) => {
    res.json({sayHi: 'hello from server, nice to meet you!'})
  })
app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'));
 });
app.listen(5000, () => {
   console.log('App listening on port 5000')
})
