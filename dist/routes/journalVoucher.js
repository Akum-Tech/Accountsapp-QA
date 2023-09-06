"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _journalVoucher = require("../controllers/journalVoucher.controller");
var JournalVoucherRoutes = (0, _express.Router)();
JournalVoucherRoutes.post('/all', _tokenValidation.checkToken, _journalVoucher.getJournalVouchers);
JournalVoucherRoutes.get('/:id', _tokenValidation.checkToken, _journalVoucher.getJournalVoucher);
JournalVoucherRoutes.get('/getStockJournal/:id', _tokenValidation.checkToken, _journalVoucher.getJournalStockVoucher);
JournalVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _journalVoucher.createJournalVoucher);
JournalVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _journalVoucher.deleteJournalVoucher);
JournalVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _journalVoucher.updateJournalVoucher);
JournalVoucherRoutes.put('/updateStockJournalVoucher/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _journalVoucher.updateStockJournalVoucher);
JournalVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _journalVoucher.getJournalVoucherLastDate);
JournalVoucherRoutes.post('/createStockJournal', _tokenValidation.checkToken, _journalVoucher.createStockJournalVoucher);
JournalVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _journalVoucher.cancelJournalVoucher);
var _default = JournalVoucherRoutes;
exports["default"] = _default;