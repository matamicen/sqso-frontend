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

var _i18next = _interopRequireDefault(require("i18next"));

var _path = _interopRequireDefault(require("path"));

var _global_config = _interopRequireDefault(require("./global_config.json"));

// A simple helper function to prepare the HTML markup
var prepHTML = (data, _ref) => {
  var {
    html,
    head,
    body
  } = _ref;
  data = data.replace('</head>', "".concat(head, "</head>"));
  return data;
};

var replace_qso_tags = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (req, res) {
    _i18next.default.changeLanguage(req.language);

    var t = _i18next.default.t.bind(_i18next.default);

    console.log(req.params);

    if (req.params['idQSO'] !== 'empty') {
      var apigClientFactory = require('aws-api-gateway-client').default;

      var config = {
        invokeUrl: _global_config.default.apiEndpoint
      };
      var apigClient = apigClientFactory.newClient(config);
      var params = {};
      var pathTemplate = '/qso-metadata-get';
      var method = 'POST';
      var additionalParams = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        queryParams: {}
      };
      var body = {
        qso: req.params['idQSO']
      };
      console.log(body);
      apigClient.invokeApi(params, pathTemplate, method, additionalParams, body).then( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)(function* (result) {
          var filePath = _path.default.resolve(__dirname, '../build/index.html');

          _fs.default.readFile(filePath, 'utf8', /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2.default)(function* (err, htmlData) {
              // If there's an error... serve up something nasty
              if (err) {
                if (process.env.NODE_ENV !== 'production') {
                  console.error('Read error', err);
                }

                Sentry.configureScope(function (scope) {
                  scope.setExtra('ENV', process.env.NODE_ENV);
                });
                Sentry.captureException(err);
                return res.status(404).end();
              }

              console.log(result.data);
              var title;
              var image = null;

              if (!result.data.errorMessage && result.data.body.error === 0) {
                var qso = result.data.body.message;

                if (qso.type === 'QSO' && qso.qras.length > 0) {
                  title = qso.qra + t('qso.workedAQSO') + qso.qras[0].qra + t('qso.band') + qso.band + t('qso.mode') + qso.mode;
                } else if (qso.type === 'LISTEN' && qso.qras.length > 0) {
                  title = qso.qra + t('qso.listenedQSO') + qso.qras[0].qra + t('qso.band') + qso.band + t('qso.mode') + qso.mode;
                } else if (qso.type === 'POST') {
                  title = qso.qra + t('qso.createdPost');
                } else if (qso.type === 'SHARE') {
                  title = qso.qra + t('qso.sharedContent');
                }

                if (qso.media.length > 0) {
                  image = '<meta property="og:image" content="' + qso.media[0].url + '"/>';
                }
              }

              var html = yield prepHTML(htmlData, {
                head: '<meta name="og:title" content="' + title + '"/>' + image + '<meta property="og:type" content="website" />' + '<meta property="og:url" content="http://www.SuperQSO.com"/>' + '<meta property="og:site_name" content="SuperQSO.com"/>' + '<meta property="og:description" content="SuperQSO.com"/>'
              }); // Up, up, and away...

              yield res.send(html);
            });

            return function (_x4, _x5) {
              return _ref4.apply(this, arguments);
            };
          }());
        });

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }()) //apigClient
      .catch(function (result) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(result);
        } else {
          Sentry.configureScope(function (scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
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
  });

  return function replace_qso_tags(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = replace_qso_tags;
exports.default = _default;