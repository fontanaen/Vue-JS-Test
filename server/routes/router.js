const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get routes
router.get('/', async (req, res) => {
    const data = await createConnectionToDB('users');
    res.send(await data.find({}).toArray());
});

// MongoDB connection
async function createConnectionToDB(collection) {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection(collection);
}

module.exports = router;