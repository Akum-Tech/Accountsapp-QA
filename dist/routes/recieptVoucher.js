"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _recieptVoucher = require("../controllers/recieptVoucher.controller");
var RecieptVoucherRoutes = (0, _express.Router)();
RecieptVoucherRoutes.post('/all', _tokenValidation.checkToken, _recieptVoucher.getRecieptVouchers);
RecieptVoucherRoutes.get('/:id', _tokenValidation.checkToken, _recieptVoucher.getRecieptVoucher);
RecieptVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _recieptVoucher.createRecieptVoucher);
RecieptVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _recieptVoucher.deleteRecieptVoucher);
RecieptVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _recieptVoucher.updateRecieptVoucher);
RecieptVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _recieptVoucher.getRecieptVoucherLastDate);
RecieptVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _recieptVoucher.cancelRecieptVoucher);
var _default = RecieptVoucherRoutes;
exports["default"] = _default;