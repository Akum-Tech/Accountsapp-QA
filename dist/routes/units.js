"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _units = require("../controllers/units.controller");
var UnitsRoutes = (0, _express.Router)();
UnitsRoutes.get('/', _tokenValidation.checkToken, _units.getUnits);
UnitsRoutes.get('/:id', _tokenValidation.checkToken, _units.getUnit);
UnitsRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _units.createUnit);
UnitsRoutes["delete"]('/:id', _tokenValidation.checkToken, _units.deleteUnit);
UnitsRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _units.updateUnit);
var _default = UnitsRoutes;
exports["default"] = _default;