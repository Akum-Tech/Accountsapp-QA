"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _debitVoucher = require("../controllers/debitVoucher.controller");
var DebitVoucherRoutes = (0, _express.Router)();
DebitVoucherRoutes.post('/all', _tokenValidation.checkToken, _debitVoucher.getDebitVouchers);
DebitVoucherRoutes.get('/:id', _tokenValidation.checkToken, _debitVoucher.getDebitVoucher);
DebitVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _debitVoucher.createDebitVoucher);
DebitVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _debitVoucher.deleteDebitVoucher);
DebitVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _debitVoucher.updateDebitVoucher);
DebitVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _debitVoucher.getDebitVoucherLastDate);
DebitVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _debitVoucher.cancelDebitVoucher);
var _default = DebitVoucherRoutes;
exports["default"] = _default;