"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _creditVoucher = require("../controllers/creditVoucher.controller");
var CreditVoucherRoutes = (0, _express.Router)();
CreditVoucherRoutes.post('/all', _tokenValidation.checkToken, _creditVoucher.getCreditVouchers);
CreditVoucherRoutes.get('/:id', _tokenValidation.checkToken, _creditVoucher.getCreditVoucher);
CreditVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _creditVoucher.createCreditVoucher);
CreditVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _creditVoucher.deleteCreditVoucher);
CreditVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _creditVoucher.updateCreditVoucher);
CreditVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _creditVoucher.getCreditVoucherLastDate);
CreditVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _creditVoucher.cancelCreditVoucher);
var _default = CreditVoucherRoutes;
exports["default"] = _default;