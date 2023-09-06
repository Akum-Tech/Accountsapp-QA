"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _paymentVoucher = require("../controllers/paymentVoucher.controller");
var PaymentVoucherRoutes = (0, _express.Router)();
PaymentVoucherRoutes.post('/all', _tokenValidation.checkToken, _paymentVoucher.getPaymentVouchers);
PaymentVoucherRoutes.get('/:id', _tokenValidation.checkToken, _paymentVoucher.getPaymentVoucher);
PaymentVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _paymentVoucher.createPaymentVoucher);
PaymentVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _paymentVoucher.deletePaymentVoucher);
PaymentVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _paymentVoucher.updatePaymentVoucher);
PaymentVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _paymentVoucher.getPaymentVoucherLastDate);
PaymentVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _paymentVoucher.cancelPaymentVoucher);
var _default = PaymentVoucherRoutes;
exports["default"] = _default;