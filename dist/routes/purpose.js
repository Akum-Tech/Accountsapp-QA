"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _purpose = require("../controllers/purpose.controller");
var PurposeRoutes = (0, _express.Router)();
PurposeRoutes.get('/:type', _purpose.getPurposes);
PurposeRoutes.get('/:id', _purpose.getPurpose);
PurposeRoutes.post('/', _purpose.createPurpose);
PurposeRoutes["delete"]('/:id', _purpose.deletePurpose);
PurposeRoutes.put('/:id', _purpose.updatePurposes);
var _default = PurposeRoutes;
exports["default"] = _default;