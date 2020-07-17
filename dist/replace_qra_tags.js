"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Sentry = _interopRequireWildcard(require("@sentry/browser"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _global_config = _interopRequireDefault(require("./global_config.json"));

var prepHTML = (data, _ref) => {
  var {
    html,
    head,
    body
  } = _ref;
  data = data.replace('</head>', "".concat(head, "</head>"));
  return data;
};

var replace_qra_tags = (req, res) => {
  console.log(req.params);

  if (req.params['idQRA'] !== 'empty') {
    var apigClientFactory = require('aws-api-gateway-client').default;

    var config = {
      invokeUrl: _global_config.default.apiEndpoint
    };
    var apigClient = apigClientFactory.newClient(config);
    var params = {};
    var pathTemplate = '/qra-get-data';
    var method = 'POST';
    var additionalParams = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      queryParams: {}
    };
    var body = {
      qra: req.params['idQRA']
    };
    console.log(body);
    apigClient.invokeApi(params, pathTemplate, method, additionalParams, body).then(function (result) {
      var filePath = _path.default.resolve(__dirname, '../build/index.html');

      _fs.default.readFile(filePath, 'utf8', /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* (err, htmlData) {
          // If there's an error... serve up something nasty
          if (err) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('Read error', err);
            } else {
              Sentry.configureScope(function (scope) {
                scope.setExtra('ENV', process.env.REACT_APP_STAGE);
              });
              Sentry.captureException(err);
            }

            return res.status(404).end();
          }

          console.log(result.data);
          var title;
          var url;

          if (!result.data.errorMessage && result.data.body.error === 0) {
            title = result.data.body.message.qra.toUpperCase() + ' - ' + result.data.body.message.firstname + ' ' + result.data.body.message.lastname;
            url = result.data.body.message.avatarpic;
          }

          var html = yield prepHTML(htmlData, {
            head: '<meta name="og:title" content="' + title + '"/>' + '<meta property="og:image" content="' + url + '"/>' + '<meta property="og:type" content="website" />' + '<meta property="og:url" content="http://www.SuperQSO.com"/>' + '<meta property="og:site_name" content="SuperQSO.com"/>' + '<meta property="og:description" content="SuperQSO.com"/>'
          });
          yield res.send(html);
        });

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }) //apigClient
    .catch(function (result) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(result);
      } else {
        Sentry.configureScope(function (scope) {
          scope.setExtra('ENV', process.env.REACT_APP_STAGE);
        });
        Sentry.captureException(result);
      }
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