require('@babel/register')({
	extends: './.babelrc',
})
const Sitemap = require("react-router-sitemap").default;
if (process.env.NODE_ENV === 'production')
  import global_config from './global_configPRD.json';
else import global_config from './global_configDEV.json';

require("ignore-styles");
// require("@babel/register")({
//   presets: ["@babel/preset-env", "@babel/react"]
// });
// Ignore those pesky styles
const App = require("./AppForSitemap").default;
async function generateSitemap() {
  try {
    var apigClientFactory = require("aws-api-gateway-client").default;

    var config = {
      invokeUrl: global_config.apiEndpoint
    };
    var apigClient = apigClientFactory.newClient(config);
    var params = {};
    var pathTemplate = "/qra/list";
    var method = "GET";
    var additionalParams = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      queryParams: {}
    };
    let body = {};
    let idMap = [];
    await apigClient
      .invokeApi(params, pathTemplate, method, additionalParams, body)
      .then(function(response) {
        console.log(response.data.body.qras);
        for (var i = 0; i < response.data.body.qras.length; i++) {
          idMap.push(response.data.body.qras[i].qra);
        }

        const paramsConfig = {
          "/:qra": [
            { qra: idMap } // array of ids
            // { qra: "LU2FFF" } // array of ids
          ]
        };

        new Sitemap(App)

          .applyParams(paramsConfig)
          .build("https://www.superqso.com")
          .save("./public/sitemap.xml");
      })
      .catch(error => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
