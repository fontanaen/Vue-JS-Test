const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Mongo Atlas Url
//const url = 'mongodb+srv://user_1:user_1@cluster0-yjikz.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';

// Get routes
router.get('/', async (req, res) => {
    const data = await createConnectionToDB('posts');
    res.send(await data.find().sort({date: -1}).toArray());
});

router.get('/:id', async (req, res) => {
    const data = await createConnectionToDB('posts');
    res.send(await data.findOne( mongodb.ObjectId(`${req.params.id}`)));
});

// Post routes
router.post('/', async (req, res) => {
    const data = await createConnectionToDB('posts');
    console.log(`add`)
    await data.insertOne({ title : req.body.title, content : req.body.content, date : new Date(req.body.date) });
    res.send(await data.find().sort({date: -1}).toArray())
});

// Patch routes
router.patch('/:id', async (req, res) => {
    const data = await createConnectionToDB('posts');
    console.log(`patch : ${req.params.id}`)
    await data.updateOne({ _id : mongodb.ObjectId(`${req.params.id}`)} , { $set : { title : req.body.title, content : req.body.content }});
    res.send(await data.findOne( mongodb.ObjectId(`${req.params.id}`)));
});

// Delete routes
router.delete('/:id', async (req, res) => {
    const data = await createConnectionToDB('posts');
    console.log(`delete : ${req.params.id}`)
    await data.deleteOne( { _id : mongodb.ObjectId(`${req.params.id}`) });
    res.send(await data.find().sort({date: -1}).toArray());
});

// MongoDB connection
async function createConnectionToDB(collection) {
    const client = await mongodb.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('vue_expresss').collection(collection);
}

module.exports = router;