"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _itemStock = require("../controllers/itemStock.controller");
var ItemStockRoutes = (0, _express.Router)();
ItemStockRoutes.get('/all', _tokenValidation.checkToken, _itemStock.getItemStocks);
ItemStockRoutes.get('/:id', _tokenValidation.checkToken, _itemStock.getItemStock);
ItemStockRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _itemStock.createItemStock);
ItemStockRoutes["delete"]('/:id', _tokenValidation.checkToken, _itemStock.deleteItemStock);
ItemStockRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _itemStock.updateItemStocks);
ItemStockRoutes.post('/getItemStockReport', _tokenValidation.checkToken, _itemStock.getItemStockReport);
ItemStockRoutes.post('/getItemStockGroupReport', _tokenValidation.checkToken, _itemStock.getItemStockGroupReport);
var _default = ItemStockRoutes;
exports["default"] = _default;