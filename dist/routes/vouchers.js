"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _vouchers = require("../controllers/vouchers.controller");
var VoucherRoutes = (0, _express.Router)();
VoucherRoutes.post('/', _tokenValidation.checkToken, _vouchers.getAllVoucher);
var _default = VoucherRoutes;
exports["default"] = _default;