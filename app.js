require('dotenv').config();
require('express-async-errors');
const express = require('express');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const mainRouter = require('./routes/mainRoutes');

const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8888;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('Data successfully ...');
    app.listen(port, console.log(`Listening on port 127.0.0.1:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
