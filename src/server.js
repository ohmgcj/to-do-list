const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(express.json()); // Faz o sistema entender o json
app.use(cors({
  origin: '*',
}));

const PORT = 3333;

routes.forEach((route) => {
  app.use('/', route);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
