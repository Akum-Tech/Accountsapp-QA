"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _stockGroup = require("../controllers/stockGroup.controller");
var StockRoutes = (0, _express.Router)();
StockRoutes.get('/all', _tokenValidation.checkToken, _stockGroup.getStocks);
StockRoutes.get('/:id', _tokenValidation.checkToken, _stockGroup.getStock);
StockRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _stockGroup.createStock);
StockRoutes["delete"]('/:id', _tokenValidation.checkToken, _stockGroup.deleteStock);
StockRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _stockGroup.updateStocks);
StockRoutes.get('/all/:id', _tokenValidation.checkToken, _stockGroup.getAllStockGroups);
var _default = StockRoutes;
exports["default"] = _default;