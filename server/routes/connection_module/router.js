const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Mongo Atlas Url
//const url = 'mongodb+srv://user_1:user_1@cluster0-yjikz.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = 'mongodb+srv://user_1:user_1@cluster0-yjikz.mongodb.net/vue_express?retryWrites=true&w=majority';

//const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';

// Get routes


// Post routes
router.post('/login', async (req, res) => {
    console.log(req.body.email, req.body.password);
    const data = await createConnectionToDB('users');
    const myuser = await data.findOne({email : req.body.email, password : req.body.password})
        .then((data) => { return data })
        .catch((err) => console.log(err));
    console.log(myuser)
    if (myuser) {
        req.session.islog = true;
        req.session.user = myuser;
        res.status(201).send(myuser);
    } else {
        res.status(201).send(false);
    }
});

router.post('/logout', async (req, res) => {
    try {
        await req.session.destroy()
        res.status(201).send('disconnected');
    } catch (err) {
        res.status(501).send(err.message);
    }
    
});

router.post('/CreateAccount', async (req, res) => {
    const data = await createConnectionToDB('users');
    const myuser = await data.findOne({email : req.body.email});
    
    if (myuser) {
        res.status(201).send(false);
    } else {
        await data.insertOne(req.body);
        res.status(201).send(true);
    }
});

// MongoDB connection
async function createConnectionToDB(collection) {
    const client = await mongodb.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client.db('vue_express').collection(collection);
}

module.exports = router;