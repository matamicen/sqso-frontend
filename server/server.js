import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import index from './routes/index';
import api from './routes/api';
import universalLoader from './universal';
import replace_qra_tags from './replace_qra_tags'
import replace_qso_tags from './replace_qso_tags'

// Create our express app (using the port optionally specified)
const app = express();
const PORT = process.env.PORT || 3000;

// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set up route handling, include static assets and an optional API
 



app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/',index)

// Let's rock
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
