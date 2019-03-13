import path from 'path';
import fs from 'fs';
// import universalLoader from './universal';
// import apigClientFactory from '../build/apigClient' import React from
// 'react'; import { renderToString } from 'react-dom/server'; import Helmet
// from 'react-helmet'; import { Provider } from 'react-redux'; import {
// ConnectedRouter } from 'react-router-redux'; import { Route } from
// 'react-router-dom'; import createServerStore from './store'; import App from
// '../src/components/App'; A simple helper function to prepare the HTML markup
const prepHTML = (data, {html, head, body}) => {
  // data = data.replace('<html lang="en">', `<html ${html}`);
  data = data.replace('</head>', `${head}</head>`);
  // data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return data;
};

const replace_qra_tags = (req, res) => {
console.log(req.params)

  if (req.params["idQRA"] !== "empty") {
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
    var pathTemplate = '/reactWeb/qra-get-data'
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
        
      }
    };
    var body = {
      //This is where you define the body of the request
      "qra": req.params["idQRA"]
    };
    let title;
    let url;
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
          if (result.data.body.error === 0)
          title = result.data.body.message.qra.toUpperCase() + ' - ' + 
              result.data.body.message.firstname + ' ' + 
              result.data.body.message.lastname;
              url =  result.data.body.message.avatarpic
          const html = prepHTML(htmlData, {
      
            head:
            '<meta name="og:title" content="'+ title + '"/>' +
            '<meta property="og:image" content="'+ url + '"/>' +
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


};

export default replace_qra_tags;
