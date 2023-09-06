"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _saleVoucher = require("../controllers/saleVoucher.controller");
var SaleVoucherRoutes = (0, _express.Router)();
SaleVoucherRoutes.post('/all', _tokenValidation.checkToken, _saleVoucher.getSaleVouchers);
SaleVoucherRoutes.get('/:id', _tokenValidation.checkToken, _saleVoucher.getSaleVoucher);
SaleVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _saleVoucher.getSaleVoucherLastDate);
SaleVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _saleVoucher.createSaleVoucher);
SaleVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _saleVoucher.deleteSaleVoucher);
SaleVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _saleVoucher.updateSaleVoucher);
SaleVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _saleVoucher.cancelSaleVoucher);
var _default = SaleVoucherRoutes;
exports["default"] = _default;