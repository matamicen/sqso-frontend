"use strict";

Error.stackTraceLimit = 500; // Ignore those pesky styles

require("ignore-styles"); // Set up babel to do its thing... env for the latest toys, react-app for CRA
// require("@babel/register")({
//     presets: ["@babel/preset-env"]
//   });
// Now that the nonsense is over... load up the server entry point


require("./server");