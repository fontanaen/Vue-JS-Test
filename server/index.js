const port = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

// Middleware
app.use(session({secret: "Shh, its a secret!", resave: true, saveUninitialized: true}));
app.use(bodyParser.json()); 
app.use(cors());

const router = require('./routes/router');
app.use('/', router);

app.listen(port, () => console.log(`The server is running on port ${port}`));