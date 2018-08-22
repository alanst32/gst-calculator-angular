/**
 * Created by alanterriaga on 30/7/18.
 */
const express     = require('express');
const router      = require('./server/routes/routes');
const path        = require('path');
const mongoose    = require('mongoose');
const app         = express();
const http        = require('http');
const bodyParser  = require('body-parser');

//==================================================================================
// Connect MongoDB database
mongoose.connect("mongodb://localhost:27017/gstDatabase");

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"))

//==================================================================================
// Setting the applicatoin

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/gst-calculator-angular/index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);

// Create the server
const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
