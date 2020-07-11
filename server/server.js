import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import morgan from 'morgan';
import path from 'path';
import index from './routes/index';
// Create our express app (using the port optionally specified)
const app = express();
const PORT = process.env.PORT || 3000;
i18next
  // .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    resources: {
      en: {
        translation: {
          qso: {
            workedQSO:
              '{{QRA}} worked a QSO with {{QRA2}} on band {{band}} and mode {{mode}}',
            listenedQSO:
              '{{QRA}} listened a QSO with {{QRA2}} on band {{band}} and mode {{mode}}',
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
            workedQSO:
              '{{QRA}} trabajó un QSO con {{QRA2}} en la banda {{band}} y modo {{mode}}',
            listenedQSO:
              '{{QRA}} escuchó un QSO de {{QRA2}} en la banda {{band}} y modo {{mode}}',
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
    fallbackLng: 'en'
    // preload: ['en', 'de'],
    // saveMissing: true
  });

app.use(i18nextMiddleware.handle(i18next));

// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set up route handling, include static assets and an optional API

app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/', index);

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
