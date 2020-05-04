import * as Sentry from '@sentry/browser';
import fs from 'fs';
import path from 'path';
import global_configDEV from './global_configDEV.json';
import global_configPRD from './global_configPRD.json';

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body }) => {
  data = data.replace('</head>', `${head}</head>`);
  return data;
};
const replace_qso_tags = async (req, res) => {
  console.log(req.params);

  if (req.params['idQSO'] !== 'empty') {
    var apigClientFactory = require('aws-api-gateway-client').default;
    if (process.env.NODE_ENV === 'production')
      var config = {
        invokeUrl: global_configPRD.apiEndpoint
      };
    else
      config = {
        invokeUrl: global_configDEV.apiEndpoint
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
    let body = {
      qso: req.params['idQSO']
    };
    console.log(body);
    apigClient
      .invokeApi(params, pathTemplate, method, additionalParams, body)
      .then(async function(result) {
        const filePath = path.resolve(__dirname, '../build/index.html');

        fs.readFile(filePath, 'utf8', async (err, htmlData) => {
          // If there's an error... serve up something nasty
          if (err) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('Read error', err);
            }
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.NODE_ENV);
            });
            Sentry.captureException(err);

            return res.status(404).end();
          }
          console.log(result.data);

          let title;
          let image = null;
          if (!result.data.errorMessage && result.data.body.error === 0) {
            let qso = result.data.body.message;
            if (qso.type === 'QSO' && qso.qras.length > 0) {
              title =
                qso.qra +
                ' started a QSO with ' +
                qso.qras[0].qra +
                ' - Band: ' +
                qso.band +
                ' - Mode: ' +
                qso.mode;
            }

            if (qso.media.length > 0) {
              image =
                '<meta property="og:image" content="' +
                qso.media[0].url +
                '"/>';
            }
          }
          const html = await prepHTML(htmlData, {
            head:
              '<meta name="og:title" content="' +
              title +
              '"/>' +
              image +
              '<meta property="og:type" content="website" />' +
              '<meta property="og:url" content="http://www.SuperQSO.com"/>' +
              '<meta property="og:site_name" content="SuperQSO.com"/>' +
              '<meta property="og:description" content="SuperQSO.com"/>'
          });

          // Up, up, and away...
          await res.send(html);
        });
      }) //apigClient
      .catch(function(result) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(result);
        }
        Sentry.captureException(result);
      });
    //This is where you would put an error callback
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

export default replace_qso_tags;
