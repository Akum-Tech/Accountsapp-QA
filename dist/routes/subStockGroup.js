"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _substockGroup = require("../controllers/substockGroup.controller");
var SubStockRoutes = (0, _express.Router)();
SubStockRoutes.get('/all', _tokenValidation.checkToken, _substockGroup.getSubStocks);
SubStockRoutes.get('/:id', _tokenValidation.checkToken, _substockGroup.getSubStock);
SubStockRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _substockGroup.createSubStock);
SubStockRoutes["delete"]('/:id', _tokenValidation.checkToken, _substockGroup.deleteSubStock);
SubStockRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _substockGroup.updateSubStocks);
var _default = SubStockRoutes;
exports["default"] = _default;