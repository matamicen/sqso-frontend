"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import Helmet from 'react-helmet';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { Route } from 'react-router-dom';
// import createServerStore from './store';
// import App from '../src/components/App';
// A simple helper function to prepare the HTML markup
const prepHTML = (data, {
  html,
  head,
  body
}) => {
  // data = data.replace('<html lang="en">', `<html ${html}`);
  data = data.replace("</head>", `${head}</head>`); // data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return data;
};

const universalLoader = (req, res) => {
  // console.log(req.path);
  console.log(req.params); // Load in our HTML file from our build

  const filePath = _path.default.resolve(__dirname, "../build/index.html");

  _fs.default.readFile(filePath, "utf8", (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error("Read error", err);
      return res.status(404).end();
    } // Create a store and sense of history based on the current path
    // const { store, history } = createServerStore(req.path);
    // Render App in React
    // const routeMarkup = renderToString(
    //   <Provider store={store}>
    //     <ConnectedRouter history={history}>
    //       <Route component={App} />
    //     </ConnectedRouter>
    //   </Provider>
    // );
    // Let Helmet know to insert the right tags
    // const helmet = Helmet.renderStatic();
    // Form the final HTML response


    const html = prepHTML(htmlData, {
      // html: helmet.htmlAttributes.toString(),
      head: // helmet.title.toString() +
      '<meta name="og:title" content="SuperQSO HomePage"/>' + '<meta property="og:site_name" content="SuperQSO.com"/>' + '<meta property="og:description" content="SuperQSO.com"/>' // helmet.link.toString(),
      // body: routeMarkup

    }); // Up, up, and away...

    res.send(html);
  });
};

var _default = universalLoader;
exports.default = _default;