var express = require('express');
var app = express();

app.get('/', function (req, res) {

  console.log("hello world")
  // // Require module
  // var apigClientFactory = require('aws-api-gateway-client').default;
  // var apigClient = apigClientFactory.newClient({apiKey: '95ViWSSBCX2QvYryFx3YlCxgZL0hfST3ZhnnrG4c', invokeUrl: 'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com'});
  // // ES6: import apigClientFactory from 'aws-api-gateway-client'; Set invokeUrl to
  // // config and create a client. For authorization, additional information is
  // // required as explained below. you can find the following url on AWS
  // // Console/Gateway in the API Gateway Stage session
  // console.log(apigClient)
  // var config = {
  //   apiKey: '95ViWSSBCX2QvYryFx3YlCxgZL0hfST3ZhnnrG4c',
  //   invokeUrl: 'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com'
  // };
  // // var apigClient = apigClientFactory.newClient(config); Calls to an API take the
  // // form outlined below. Each API call returns a promise, that invokes either a
  // // success and failure callback

  // var params = {
  //   // This is where any header, path, or querystring request params go. The key is
  //   // the parameter named as defined in the API userId: '1234'
  // };
  // // Template syntax follows url-template
  // // https://www.npmjs.com/package/url-template
  // var pathTemplate = '';
  // var method = 'POST';
  // var additionalParams = {
  //   // If there are any unmodeled query parameters or headers that need to be sent
  //   // with the request you can add them here
  //   headers: {
  //     'x-api-key' : '95ViWSSBCX2QvYryFx3YlCxgZL0hfST3ZhnnrG4c',
  //     // param1: ''
  //   },
  //   queryParams: {
  //     // param0: '',
  //     // param1: ''
  //   }
  // };
  // // var body = {
  // //   "QRA": "LU2ACH"
  // //   //This is where you define the body of the request
  // // };
  // var body = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb/",
  //   "method": "POST",
  //   "headers": {
  //     "Content-Type": "no-cache",
      
  //   },
  //   "QRA": "LU2ACH"
  // };

  // apigClient.invokeApi(params, '/qra-info', 'POST', additionalParams, body)
  //   .then(function (result) {
  //     console.log(result)
  //     // Add success callback code here.
  //   })
  //   .catch(function (result) {
  //  //   console.log(result)
  //     // Add error callback code here.
  //   });



var apigClientFactory = require('aws-api-gateway-client').default;
// Set invokeUrl to config and create a client. For autholization, additional information is required as explained below.

config = {invokeUrl:'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com'}
var apigClient = apigClientFactory.newClient(config);
// Calls to an API take the form outlined below. Each API call returns a promise, that invokes either a success and failure callback

var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
    // userId: '1234',
};
// Template syntax follows url-template https://www.npmjs.com/package/url-template
var pathTemplate = '/reactWeb/qso-detail'
var method = 'POST';
var additionalParams = {
    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*"
        // param1: ''
    },
    queryParams: {
        // param0: '',
        // param1: ''
    }
};
var body = {
    //This is where you define the body of the request
    "qso" : '1258'
};

apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result){
      console.log(result.data)
      res.send(result.data);
        //This is where you would put a success callback
    }).catch( function(result){
      console.log(result)
        //This is where you would put an error callback
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
