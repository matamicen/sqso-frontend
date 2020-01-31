"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

// This file includes an optional API common in isomorphic applications
// Of course, you should probably spin up your API elsewhere... but you get the idea
const router = _express.default.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
router.get('/', (req, res, next) => {
  res.json({});
});
var _default = router;
exports.default = _default;