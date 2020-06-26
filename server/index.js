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

const connect_routes = require('./routes/connection_module/router');
const posts_routes = require('./routes/posts_module/router');
app.use('/', connect_routes);
app.use('/posts', posts_routes);

app.listen(port, () => console.log(`The server is running on port ${port}`));