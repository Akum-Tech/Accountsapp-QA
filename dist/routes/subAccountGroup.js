"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _subAccountGroup = require("../controllers/subAccountGroup.controller");
var SubAccountGroupRoutes = (0, _express.Router)();
SubAccountGroupRoutes.get('/all', _tokenValidation.checkToken, _subAccountGroup.getSubAccountGroups);
SubAccountGroupRoutes.get('/:id', _tokenValidation.checkToken, _subAccountGroup.getSubAccountGroup);
SubAccountGroupRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _subAccountGroup.createSubAccountGroup);
SubAccountGroupRoutes["delete"]('/:id', _tokenValidation.checkToken, _subAccountGroup.deleteSubAccountGroup);
SubAccountGroupRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _subAccountGroup.updateSubAccountGroups);
var _default = SubAccountGroupRoutes;
exports["default"] = _default;