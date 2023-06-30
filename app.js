const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/routers');
const centralHandlerError = require('./middlewares/centralHadlerError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(router);

app.use(errors());

app.use(centralHandlerError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
