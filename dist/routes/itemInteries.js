"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _itemInteries = require("../controllers/itemInteries.controller");
var ItemInteriesRoutes = (0, _express.Router)();
ItemInteriesRoutes.get('/all', _tokenValidation.checkToken, _itemInteries.getItemInteries);
ItemInteriesRoutes.get('/:id', _tokenValidation.checkToken, _itemInteries.getItemIntery);
ItemInteriesRoutes.post('/', _tokenValidation.checkToken, _itemInteries.createItemInteries);
ItemInteriesRoutes["delete"]('/:id', _tokenValidation.checkToken, _itemInteries.deleteItemInteries);
ItemInteriesRoutes.put('/:id', _tokenValidation.checkToken, _itemInteries.updateItemInteries);
var _default = ItemInteriesRoutes;
exports["default"] = _default;