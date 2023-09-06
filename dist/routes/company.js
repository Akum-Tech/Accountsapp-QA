"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _fileUpload = require("../utility/fileUpload");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _company = require("../controllers/company.controller");
var CompanyRoutes = (0, _express.Router)();
CompanyRoutes.get('/', _tokenValidation.checkToken, _company.getCompanys);
CompanyRoutes.get('/:id', _tokenValidation.checkToken, _company.getCompany);
CompanyRoutes.post('/', _fileUpload.uploadPhoto.single('file'), _tokenValidation.checkToken, _planCheck.checkPlan, _company.createCompany);
CompanyRoutes.put('/:id/changePeriod', _tokenValidation.checkToken, _planCheck.checkPlan, _company.updatePeriod);
CompanyRoutes.put('/:id/changemanualstock', _tokenValidation.checkToken, _planCheck.checkPlan, _company.updatemanualstock);
CompanyRoutes["delete"]('/:id', _tokenValidation.checkToken, _company.deleteCompany);
CompanyRoutes.put('/:id', _tokenValidation.checkToken, _fileUpload.uploadPhoto.single('file'), _planCheck.checkPlan, _company.updateCompany);
var _default = CompanyRoutes;
exports["default"] = _default;