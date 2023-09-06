"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _purchaseVoucher = require("../controllers/purchaseVoucher.controller");
var PurchaseVoucherRoutes = (0, _express.Router)();
PurchaseVoucherRoutes.post('/all', _tokenValidation.checkToken, _purchaseVoucher.getPurchaseVouchers);
PurchaseVoucherRoutes.get('/:id', _tokenValidation.checkToken, _purchaseVoucher.getPurchaseVoucher);
PurchaseVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _purchaseVoucher.createPurchaseVoucher);
PurchaseVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _purchaseVoucher.deletePurchaseVoucher);
PurchaseVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _purchaseVoucher.updatePurchaseVoucher);
PurchaseVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _purchaseVoucher.getPurchaseVoucherLastDate);
PurchaseVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _purchaseVoucher.cancelPurchaseVoucher);
var _default = PurchaseVoucherRoutes;
exports["default"] = _default;