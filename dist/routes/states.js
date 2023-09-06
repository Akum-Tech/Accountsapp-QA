"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _states = require("../controllers/states.controller");
var StateRoutes = (0, _express.Router)();
StateRoutes.get('/', _states.getStates);
StateRoutes.get('/:id', _states.getState);
StateRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _states.createState);
StateRoutes["delete"]('/:id', _tokenValidation.checkToken, _states.deleteState);
StateRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _states.updateStates);
var _default = StateRoutes;
exports["default"] = _default;