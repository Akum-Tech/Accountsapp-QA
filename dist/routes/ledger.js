"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _ledger = require("../controllers/ledger.controller");
var LedgerRoutes = (0, _express.Router)();
LedgerRoutes.get('/all', _tokenValidation.checkToken, _ledger.getLedgers);
LedgerRoutes.get('/alllegerwithoutbak', _tokenValidation.checkToken, _ledger.getLedgerwithoutbank);
LedgerRoutes.get('/alllegerreport', _tokenValidation.checkToken, _ledger.getLedgerReport);
LedgerRoutes.get('/getBankdefault/:id', _tokenValidation.checkToken, _ledger.getbankdefault);
LedgerRoutes.post('/getbankledger', _tokenValidation.checkToken, _ledger.getbankLedgers);
LedgerRoutes.post('/getdiscountledger', _tokenValidation.checkToken, _ledger.getdiscountLedgers);
LedgerRoutes.post('/getbankcaseledger', _tokenValidation.checkToken, _ledger.getbankCaseLedgers);
LedgerRoutes.post('/getcashledger', _tokenValidation.checkToken, _ledger.getCaseLedgers);
LedgerRoutes.get('/getSalePurchaseLedger/:id', _tokenValidation.checkToken, _ledger.getSalePurchaseLedger);
LedgerRoutes.get('/getJournlVoucherLedger/:id', _tokenValidation.checkToken, _ledger.getJournlVoucherLedger);
LedgerRoutes.get('/getSalePurchaseVoucherLedger/:id', _tokenValidation.checkToken, _ledger.getSalePurchaseVoucherLedger);
LedgerRoutes.get('/getStockVoucherLedger/:id', _tokenValidation.checkToken, _ledger.getstockinhandLedgers);
LedgerRoutes.get('/:id', _tokenValidation.checkToken, _ledger.getLedger);
LedgerRoutes.post('/getautoledgerlist', _tokenValidation.checkToken, _ledger.getAutoLedgerList);
LedgerRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _ledger.createLedger);
LedgerRoutes["delete"]('/:id', _tokenValidation.checkToken, _ledger.deleteLedger);
LedgerRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _ledger.updateLedger);
var _default = LedgerRoutes;
exports["default"] = _default;