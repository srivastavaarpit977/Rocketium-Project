const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const DATA_URL = process.env.DATA_URL;
const MONGO_URI = process.env.MONGO_URI;

async function initialize() {
    let client;
    try {
        if (!DATA_URL || !MONGO_URI) {
            throw new Error('Missing required environment variables');
        }

        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('dataAPI');
        const collection = db.collection('data');

        const count = await collection.countDocuments();
        if (count > 0) {
            console.log('Clearing existing data in the collection...');
            await collection.deleteMany({});
        }

        console.log('Fetching data from the server...');
        const { data: dummyData } = await axios.get(DATA_URL);
        await collection.insertMany(dummyData);
        console.log('Data fetched and stored successfully in MongoDB');
    } catch (error) {
        console.error('Error initializing data:', error.message);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

initialize();