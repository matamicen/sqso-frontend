"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index"));

// import api from './routes/api';
// import universalLoader from './universal';
// import replace_qra_tags from './replace_qra_tags'
// import replace_qso_tags from './replace_qso_tags'
// Create our express app (using the port optionally specified)
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000; // Compress, parse, and log

app.use((0, _compression.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)("dev")); // Set up route handling, include static assets and an optional API

app.use(_express.default.static(_path.default.resolve(__dirname, "../build")));
app.use("/", _index.default); // Let's rock

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
}); // Handle the bugs somehow

app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;

    default:
      throw error;
  }
});