"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _allreport = require("../controllers/allreport.controller");
var AllReportRoute = (0, _express.Router)();
AllReportRoute.post('/getprofitlosssheet', _tokenValidation.checkToken, _allreport.getProitLossSheet);
AllReportRoute.post('/getblancesheet', _tokenValidation.checkToken, _allreport.getBlanceSheet);
AllReportRoute.post('/trailbalance', _tokenValidation.checkToken, _allreport.getTrailBlance);
var _default = AllReportRoute;
exports["default"] = _default;