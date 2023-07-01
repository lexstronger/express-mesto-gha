const centralHandlerError = (err, req, res, next) => {
  if (!err.statusCode) {
    return res.status(500).send({ message: 'Непредусмотренная ошибка' });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
};

module.exports = centralHandlerError;
