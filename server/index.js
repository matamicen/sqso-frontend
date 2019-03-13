Error.stackTraceLimit = 500;
// Ignore those pesky styles
require('ignore-styles');

// Set up babel to do its thing... env for the latest toys, react-app for CRA
require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/react']
    
});

// Now that the nonsense is over... load up the server entry point
require('./server');
