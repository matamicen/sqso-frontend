"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var Sentry = _interopRequireWildcard(require("@sentry/browser"));

// A simple helper function to prepare the HTML markup
const prepHTML = (data, {
  html,
  head,
  body
}) => {
  data = data.replace("</head>", `${head}</head>`);
  return data;
};

const replace_qso_tags = async (req, res) => {
  console.log(req.params);

  if (req.params["idQSO"] !== "empty") {
    var apigClientFactory = require("aws-api-gateway-client").default;

    var config = {
      invokeUrl: "https://3hzhw0ugo1.execute-api.us-east-1.amazonaws.com"
    };
    var apigClient = apigClientFactory.newClient(config);
    var params = {};
    var pathTemplate = "/Prod/qso-metadata-get";
    var method = "POST";
    var additionalParams = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      queryParams: {}
    };
    let body = {
      qso: req.params["idQSO"]
    };
    console.log(body);
    apigClient.invokeApi(params, pathTemplate, method, additionalParams, body).then(async function (result) {
      const filePath = _path.default.resolve(__dirname, "../build/index.html");

      _fs.default.readFile(filePath, "utf8", async (err, htmlData) => {
        // If there's an error... serve up something nasty
        if (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Read error", err);
          }

          Sentry.captureException(err);
          return res.status(404).end();
        }

        console.log(result.data);
        let title;
        let image = null;

        if (!result.data.errorMessage && result.data.body.error === 0) {
          let qso = result.data.body.message;

          if (qso.type === "QSO" && qso.qras.length > 0) {
            title = qso.qra + " started a QSO with " + qso.qras[0].qra + " - Band: " + qso.band + " - Mode: " + qso.mode;
          }

          if (qso.media.length > 0) {
            image = '<meta property="og:image" content="' + qso.media[0].url + '"/>';
          }
        }

        const html = await prepHTML(htmlData, {
          head: '<meta name="og:title" content="' + title + '"/>' + image + '<meta property="og:type" content="website" />' + '<meta property="og:url" content="http://www.SuperQSO.com"/>' + '<meta property="og:site_name" content="SuperQSO.com"/>' + '<meta property="og:description" content="SuperQSO.com"/>'
        }); // Up, up, and away...

        await res.send(html);
      });
    }) //apigClient
    .catch(function (result) {
      if (process.env.NODE_ENV !== "production") {
        console.log(result);
      }

      Sentry.captureException(result);
    }); //This is where you would put an error callback
    // const filePath = path.resolve(__dirname, "../build/index.html");
    // fs.readFile(filePath, "utf8", (err, htmlData) => {
    //   // If there's an error... serve up something nasty
    //   if (err) {
    //     console.error("Read error", err);
    //     return res.status(404).end();
    //   }
    //   const html = prepHTML(htmlData, {
    //     head:
    //       '<meta property="og:type" content="website" />' +
    //       '<meta property="og:url" content="http://www.SuperQSO.com"/>' +
    //       '<meta name="og:title" content="SuperQSO.com"/>' +
    //       '<meta property="og:site_name" content="SuperQSO.com"/>' +
    //       '<meta property="og:description" content="SuperQSO.com"/>'
    //     // helmet.link.toString(), body: routeMarkup
    //   });
    //   // Up, up, and away...
    //   res.send(html);
    // });
  }
};

var _default = replace_qso_tags;
exports.default = _default;