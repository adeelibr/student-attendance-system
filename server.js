const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const config = require('./server/config');

// Enable CORs
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Logger
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.set('superSecret', config.secret);

// Get our API routes
const index = require('./server/routes/');
// Set our api routes
app.use('/api', index);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on http://localhost:${port}/`))
