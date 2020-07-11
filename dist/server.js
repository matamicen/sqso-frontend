"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _express = _interopRequireDefault(require("express"));

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextHttpMiddleware = _interopRequireDefault(require("i18next-http-middleware"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index"));

// Create our express app (using the port optionally specified)
var app = (0, _express.default)();
var PORT = process.env.PORT || 3000;

_i18next.default // .use(Backend)
.use(_i18nextHttpMiddleware.default.LanguageDetector).init({
  // debug: true,
  resources: {
    en: {
      translation: {
        qso: {
          workedQSO: '{{QRA}} worked a QSO with {{QRA2}} on band {{band}} and mode {{mode}}',
          listenedQSO: '{{QRA}} listened a QSO with {{QRA2}} on band {{band}} and mode {{mode}}',
          createdQAP: '{{QRA}} posted that is QAP',
          createdFLDDAY: '{{QRA}} promoted a Field Day',
          createdPOST: '{{QRA}} created a POST',
          date: ' Date:',
          band: ' Band:',
          mode: ' Mode:',
          type: ' Type:',
          sharedContent: '{{QRA}} reposted a post'
        }
      }
    },
    es: {
      translation: {
        qso: {
          workedQSO: '{{QRA}} trabajó un QSO con {{QRA2}} en la banda {{band}} y modo {{mode}}',
          listenedQSO: '{{QRA}} escuchó un QSO de {{QRA2}} en la banda {{band}} y modo {{mode}}',
          createdQAP: '{{QRA}} publicó que está QAP',
          createdFLDDAY: '{{QRA}} promocionó una activación',
          createdPOST: '{{QRA}} creó una publicación',
          sharedQSO: '{{QRA}} reposteó un QSO',
          sharedLISTEN: '{{QRA}} reposteó una escucha de un QSO',
          sharedQAP: '{{QRA}} reposteó un QAP',
          sharedFLDDAY: '{{QRA}} reposteó una activación',
          sharedPOST: '{{QRA}} reposteó una publicación',
          date: ' Fecha:',
          band: ' Banda:',
          mode: ' Modo:',
          type: ' Tipo',
          sharedContent: '{{QRA}} republicó una publicación'
        }
      }
    }
  },
  fallbackLng: 'en' // preload: ['en', 'de'],
  // saveMissing: true

});

app.use(_i18nextHttpMiddleware.default.handle(_i18next.default)); // Compress, parse, and log

app.use((0, _compression.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev')); // Set up route handling, include static assets and an optional API

app.use(_express.default.static(_path.default.resolve(__dirname, '../build')));
app.use('/', _index.default); // Let's rock

app.listen(PORT, () => {
  console.log("App listening on port ".concat(PORT, "!"));
}); // Handle the bugs somehow

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

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