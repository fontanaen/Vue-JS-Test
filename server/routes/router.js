const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Mongo Atlas Url
const url = 'mongodb+srv://user_1:user_1@cluster0-yjikz.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

// const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';

// Get routes
router.get('/', async (req, res) => {
    const data = await createConnectionToDB('users');
    console.log(data); 
    res.send(await data.find({}).toArray());
});

// Post routes
router.post('/', async (req, res) => {
    console.log(req.body.email, req.body.password);
    res.send({ email : req.body.email, password : req.body.password});
    /*const data = await createConnectionToDB('users');
    const myuser = await data.find({email : req.body.email, password : req.body.password}).toArray();
    if (myuser) {
        res.status(201).send(myuser);
    } else {
        res.status(201).send(false);
    }*/
});

// MongoDB connection
async function createConnectionToDB(collection) {
    const client = await mongodb.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('vue_express').collection(collection);
}

module.exports = router;