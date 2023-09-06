"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _companyBank = require("../controllers/companyBank.controller");
var CompanyBankRoutes = (0, _express.Router)();
// CompanyBankRoutes.get('/', checkToken, getCompanyBanks);
CompanyBankRoutes.get('/:id', _tokenValidation.checkToken, _companyBank.getCompanyBank);
CompanyBankRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _companyBank.createCompanyBank);
CompanyBankRoutes["delete"]('/:id', _tokenValidation.checkToken, _companyBank.deleteCompanyBank);
CompanyBankRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _companyBank.updateCompanyBank);
var _default = CompanyBankRoutes;
exports["default"] = _default;