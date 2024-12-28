const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
require("dotenv").config();
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const {connectToDB}= require('./config/db');

// connect to MongoDB
connectToDB();

// apply middleware
app.use(express.json()); // for parsing application/json
app.use(logger);
// routes
app.use("/api/books",require('./routes/books'));
app.use("/api/authors",require('./routes/authors'));
app.use("/api/auth",require('./routes/auth'));
app.use("/api/users",require('./routes/users'));

// error hander middleware
app.use(notFound);
app.use(errorHandler);

// run the server
app.listen(port, () => {
  console.log(`server is running in ${process.env.NODE_ENV} app listening at ${port}`);
 });