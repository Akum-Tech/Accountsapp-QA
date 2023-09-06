"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _nextPrevious = require("../controllers/nextPrevious.controller");
var NextPreviousRoutes = (0, _express.Router)();
NextPreviousRoutes.post('/next', _tokenValidation.checkToken, _nextPrevious.nextVoucher);
NextPreviousRoutes.post('/previous', _tokenValidation.checkToken, _nextPrevious.previousVoucher);
var _default = NextPreviousRoutes;
exports["default"] = _default;