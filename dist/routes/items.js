"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _items = require("../controllers/items.controller");
var ItemRoutes = (0, _express.Router)();
ItemRoutes.get('/all', _tokenValidation.checkToken, _items.getItems);
ItemRoutes.get('/:id', _tokenValidation.checkToken, _items.getItem);
ItemRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _items.createItem);
ItemRoutes["delete"]('/:id', _tokenValidation.checkToken, _items.deleteItem);
ItemRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _items.updateItems);
var _default = ItemRoutes;
exports["default"] = _default;