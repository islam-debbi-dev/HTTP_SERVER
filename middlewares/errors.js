const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`)
    res.status(404);
    next(error);
  }
  const errorHandler = (err, req, res, next) => {
    const statuseCode = res.statuseCode === 200 ? 500 : res.statusCode;
    res.status(statuseCode).json({ message: err.message });
  }
  module.exports = { notFound, errorHandler };