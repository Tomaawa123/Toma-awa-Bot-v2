const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('En línea.')
});
app.listen(3000, () => {
  console.log('Express 10/10');
});