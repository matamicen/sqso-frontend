import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import morgan from "morgan";
import path from "path";
import index from "./routes/index";
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
          "qso": {
            "workedAQSO": " worked a QSO with ",
            "createdPost": " created a new POST",
            "listenedQSO": " listened a QSO",
            "repostedQSO": " reposted a QSO",
            "date": " Date:",
            "band": " Band:",
            "mode": " Mode:",
            "type": " Type:",
            "sharedContent": " shared content"
          }
        }
      },
      es: {
        translation: {
          "qso": {
            "workedAQSO": " trabajó un QSO con ",
            "createdPost": " hizo una nueva publicación",
            "listenedQSO": " escuchó un QSO ",
            "repostedQSO": " resposteó un QSO",
            "date": " Fecha:",
            "band": " Banda:",
            "mode": " Modo:",
            "type": " Tipo",
            "sharedContent": " compartió contenido"
          }
        }
      }
    },
    fallbackLng: 'en',
    // preload: ['en', 'de'],
    // saveMissing: true
  })

app.use(i18nextMiddleware.handle(i18next))


// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set up route handling, include static assets and an optional API

app.use(express.static(path.resolve(__dirname, "../build")));
app.use("/", index);

// Let's rock
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Handle the bugs somehow
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
