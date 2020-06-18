"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _replace_qra_tags = _interopRequireDefault(require("../replace_qra_tags"));

var _replace_qso_tags = _interopRequireDefault(require("../replace_qso_tags"));

var _universal = _interopRequireDefault(require("../universal"));

// Any route that comes in, send it to the universalLoader
var router = _express.default.Router();

router.get("/", _universal.default);
router.use("/qso/:idQSO", _replace_qso_tags.default);
router.use("/:idQRA", _replace_qra_tags.default);
var _default = router;
exports.default = _default;