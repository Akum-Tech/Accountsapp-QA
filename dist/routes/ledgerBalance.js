"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _ledgerBalance = require("../controllers/ledgerBalance.controller");
var LedgerBalanceRoutes = (0, _express.Router)();
LedgerBalanceRoutes.get('/all', _tokenValidation.checkToken, _ledgerBalance.getLedgerBalancies);
LedgerBalanceRoutes.get('/:id', _tokenValidation.checkToken, _ledgerBalance.getLedgerBalance);
LedgerBalanceRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _ledgerBalance.createLedgerBalance);
LedgerBalanceRoutes["delete"]('/:id', _tokenValidation.checkToken, _ledgerBalance.deleteLedgerBalance);
LedgerBalanceRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _ledgerBalance.updateLedgerBalance);
var _default = LedgerBalanceRoutes;
exports["default"] = _default;