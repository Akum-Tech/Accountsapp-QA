"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _taxes = require("../controllers/taxes.controller");
var TaxesRoutes = (0, _express.Router)();
TaxesRoutes.get('/', _tokenValidation.checkToken, _taxes.getTaxess);
TaxesRoutes.get('/:id', _tokenValidation.checkToken, _taxes.getTaxes);
TaxesRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _taxes.createTaxes);
TaxesRoutes.get('/status/:status', _taxes.getTaxebyStatus);
TaxesRoutes["delete"]('/:id', _tokenValidation.checkToken, _taxes.deleteTaxes);
TaxesRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _taxes.updateTaxes);
var _default = TaxesRoutes;
exports["default"] = _default;