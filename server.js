const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('En línea.')
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express 10/10');
}).on('error', (err) => {
  console.log('Servidor web opcional no pudo iniciar (no afecta al bot):', err.message);
});