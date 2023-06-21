const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/routers');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '648c2221a678b792918c00c0', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
