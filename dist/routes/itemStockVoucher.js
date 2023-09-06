"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _itemStockVoucher = require("../controllers/itemStockVoucher.controller");
var ItemStockVoucherRoutes = (0, _express.Router)();
ItemStockVoucherRoutes.post('/all', _tokenValidation.checkToken, _itemStockVoucher.getItemStockVouchers);
ItemStockVoucherRoutes.get('/:id', _tokenValidation.checkToken, _itemStockVoucher.getItemStockVoucher);
ItemStockVoucherRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _itemStockVoucher.createItemStockVoucher);
ItemStockVoucherRoutes["delete"]('/:id', _tokenValidation.checkToken, _itemStockVoucher.deleteItemStockVoucher);
ItemStockVoucherRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _itemStockVoucher.updateItemStockVoucher);
ItemStockVoucherRoutes.post('/lastdate', _tokenValidation.checkToken, _itemStockVoucher.getItemStockVoucherLastDate);
ItemStockVoucherRoutes.put('/cancel/:id', _tokenValidation.checkToken, _itemStockVoucher.cancelItemStockVoucher);
var _default = ItemStockVoucherRoutes;
exports["default"] = _default;