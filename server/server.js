const express = require("express");
var app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config({path:path.join(__dirname,'./.env')});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
require('./utils/mongo_config')();
app = require('./utils/handlebars_config')(app);
require('./sockets')(io);

//serve public folder
app.use(express.static(path.join(__dirname, '../public')));

//Routes
app.use('/',require('./routes/index'));
app.use('/board',require('./routes/board'));


const PORT = process.env.PORT;
httpServer.listen(PORT, console.log(`Running in Port : ${PORT}`));   

//test
