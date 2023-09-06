"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _gstReport = require("../controllers/gstReport.controller");
var GSTReportRoutes = (0, _express.Router)();
GSTReportRoutes.post('/r1', _tokenValidation.checkToken, _gstReport.getGstR1);
GSTReportRoutes.post('/r1/summary', _tokenValidation.checkToken, _gstReport.getGstR1Summary);
GSTReportRoutes.post('/r2', _tokenValidation.checkToken, _gstReport.getGstR2);
GSTReportRoutes.post('/r2/summary', _tokenValidation.checkToken, _gstReport.getGstR2Summary);
GSTReportRoutes.post('/r3b', _tokenValidation.checkToken, _gstReport.getGstR3B);
GSTReportRoutes.post('/r3b/summary', _tokenValidation.checkToken, _gstReport.getGstR3BSummary);
var _default = GSTReportRoutes;
exports["default"] = _default;