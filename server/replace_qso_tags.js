import path from 'path';
import fs from 'fs';

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import Helmet from 'react-helmet';

// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { Route } from 'react-router-dom';
// import createServerStore from './store';

// import App from '../src/components/App';

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body }) => {
  // data = data.replace('<html lang="en">', `<html ${html}`);
  data = data.replace('</head>', `${head}</head>`);
  // data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return data;
};

const replace_qso_tags = (req, res) => {

  if (req.params["idQSO"] !== "empty") {
    var apigClientFactory = require('aws-api-gateway-client').default;
    // Set invokeUrl to config and create a client. For autholization, additional
    // information is required as explained below.

    var config = {
      invokeUrl: 'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com'
    }
    var apigClient = apigClientFactory.newClient(config);
    // Calls to an API take the form outlined below. Each API call returns a
    // promise, that invokes either a success and failure callback

    var params = {
      // This is where any header, path, or querystring request params go. The key is
      // the parameter named as defined in the API userId: '1234',
    };
    // Template syntax follows url-template
    // https://www.npmjs.com/package/url-template
    var pathTemplate = '/reactWeb/qso-metadata-get'
    var method = 'POST';
    var additionalParams = {
      // If there are any unmodeled query parameters or headers that need to be sent
      // with the request you can add them here
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        // param1: ''
      },
      queryParams: {
        // param0: '', param1: ''
      }
    };
    var body = {
      //This is where you define the body of the request
      "qso": req.params["idQSO"]
    };
    console.log(body)
    apigClient
      .invokeApi(params, pathTemplate, method, additionalParams, body)
      .then(function (result) {
        
        const filePath = path.resolve(__dirname, '../build/index.html');

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
          // If there's an error... serve up something nasty
          if (err) {
            console.error('Read error', err);
      
            return res
              .status(404)
              .end();
          }
          let qso = result.data.body.message;
          let title; 
          console.log(qso.qras)
          if (qso.type === "QSO") {
           title = qso.qra + ' started a QSO with ' + qso.qras[0].qra + ' - Band: ' + qso.band + ' - Mode: ' + qso.mode
          }
          var image = null ;
          if (qso.media) {
            image = '<meta property="og:image" content="'+ qso.media[0].url + '"/>'
          }
          const html = prepHTML(htmlData, {
      
            head:
            '<meta name="og:title" content="'+ title + '"/>' +
             image +
            '<meta property="og:site_name" content="SuperQSO.com"/>' +
            '<meta property="og:description" content="SuperQSO.com"/>',
            // helmet.link.toString(), body: routeMarkup
          });
      
          // Up, up, and away...
          res.send(html);
      
        });
       
        //This is where you would put a success callback
      })
      .catch(function (result) {
        console.log(result)
        //This is where you would put an error callback
        const filePath = path.resolve(__dirname, '../build/index.html');

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
          // If there's an error... serve up something nasty
          if (err) {
            console.error('Read error', err);
      
            return res
              .status(404)
              .end();
          }
      
          const html = prepHTML(htmlData, {
      
            head:
            '<meta name="og:title" content="SuperQSO.com"/>' +
            '<meta property="og:site_name" content="SuperQSO.com"/>' +
            '<meta property="og:description" content="SuperQSO.com"/>',
            // helmet.link.toString(), body: routeMarkup
          });
      
          // Up, up, and away...
          res.send(html);
      
        });
      });
  }
  // // console.log(req.path);
  
  // console.log(req.params);
  // // Load in our HTML file from our build
  // const filePath = path.resolve(__dirname, '../build/index.html');

  // fs.readFile(filePath, 'utf8', (err, htmlData) => {
  //   // If there's an error... serve up something nasty
  //   if (err) {
  //     console.error('Read error', err);

  //     return res.status(404).end();
  //   }

  //   // Create a store and sense of history based on the current path
  //   // const { store, history } = createServerStore(req.path);

  //   // Render App in React
  //   // const routeMarkup = renderToString(
  //   //   <Provider store={store}>
  //   //     <ConnectedRouter history={history}>
  //   //       <Route component={App} />
  //   //     </ConnectedRouter>
  //   //   </Provider>
  //   // );

  //   // Let Helmet know to insert the right tags
  //   // const helmet = Helmet.renderStatic();

  //   // Form the final HTML response
  //   const html = prepHTML(htmlData, {
  //     // html: helmet.htmlAttributes.toString(),
  //     head:
  //       // helmet.title.toString() +
  //       '<meta name="og:title" content="QSOFacebook Open Graph META Tags"/>' + 
  //       '<meta property="og:image" content="https://s3.amazonaws.com/sqso/us-east-1:cc508f7e-92fb-41f5-b0ef-8ba6831ce09c/images/2018-04-06T135017.jpg"/>' +
  //       '<meta property="og:site_name" content="SuperQSO.com"/>' +
  //       '<meta property="og:description" content="SuperQSO.com"/>',
  //       // helmet.link.toString(),
  //     // body: routeMarkup
  //   });

  //   // Up, up, and away...
  //   res.send(html);
  // });
};

export default replace_qso_tags;
