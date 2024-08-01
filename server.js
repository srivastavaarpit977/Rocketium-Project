const express = require('express');
const { MongoClient } = require('mongodb');
const dataRoute = require('./routes/dataRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

let db;

app.use(express.json());

async function connectToDatabase() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db('dataAPI');
  app.locals.db = db;
}

app.use('/api', dataRoute);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer();