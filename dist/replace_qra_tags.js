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

const prepHTML = (data, {
  html,
  head,
  body
}) => {
  data = data.replace("</head>", `${head}</head>`);
  return data;
};

const replace_qra_tags = (req, res) => {
  console.log(req.params);

  if (req.params["idQRA"] !== "empty") {
    var apigClientFactory = require("aws-api-gateway-client").default;

    var config = {
      invokeUrl: "https://d1xllikkw9xhcf.cloudfront.net"
    };
    var apigClient = apigClientFactory.newClient(config);
    var params = {};
    var pathTemplate = "/qra-get-data";
    var method = "POST";
    var additionalParams = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      queryParams: {}
    };
    var body = {
      qra: req.params["idQRA"]
    };
    console.log(body);
    apigClient.invokeApi(params, pathTemplate, method, additionalParams, body).then(function (result) {
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
        let url;

        if (!result.data.errorMessage && result.data.body.error === 0) {
          title = result.data.body.message.qra.toUpperCase() + " - " + result.data.body.message.firstname + " " + result.data.body.message.lastname;
          url = result.data.body.message.avatarpic;
        }

        const html = await prepHTML(htmlData, {
          head: '<meta name="og:title" content="' + title + '"/>' + '<meta property="og:image" content="' + url + '"/>' + '<meta property="og:type" content="website" />' + '<meta property="og:url" content="http://www.SuperQSO.com"/>' + '<meta property="og:site_name" content="SuperQSO.com"/>' + '<meta property="og:description" content="SuperQSO.com"/>'
        });
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
}; //end replace_Qra_tags


var _default = replace_qra_tags;
exports.default = _default;