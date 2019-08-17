Error.stackTraceLimit = 500;

// Ignore those pesky styles
require("ignore-styles");

// Set up babel to do its thing... env for the latest toys, react-app for CRA
require("@babel/register")({
  // babelrc: false,
  presets: ["@babel/env", "@babel/react"],
  only: [__dirname + "/../../"],
  ignore: [__dirname + "/../../**/node_modules"]
});
// Now that the nonsense is over... load up the server entry point
require("./server/server");
