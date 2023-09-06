"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _accountGroup = require("../controllers/accountGroup.controller");
var AccountGroupRoutes = (0, _express.Router)();
AccountGroupRoutes.get('/', _tokenValidation.checkToken, _accountGroup.getAccountGroups);
AccountGroupRoutes.get('/:id', _tokenValidation.checkToken, _accountGroup.getAccountGroup);
AccountGroupRoutes.get('/name/:name', _tokenValidation.checkToken, _accountGroup.getAccountGroupByName);
AccountGroupRoutes.post('/', _tokenValidation.checkToken, _planCheck.checkPlan, _accountGroup.createAccountGroup);
AccountGroupRoutes["delete"]('/:id', _tokenValidation.checkToken, _accountGroup.deleteAccountGroup);
AccountGroupRoutes.put('/:id', _tokenValidation.checkToken, _planCheck.checkPlan, _accountGroup.updateAccountGroup);
AccountGroupRoutes.get('/all/:id', _tokenValidation.checkToken, _accountGroup.getAllAccountGroups);
AccountGroupRoutes.get('/all/list/:id', _tokenValidation.checkToken, _accountGroup.getAllAccountGroupList);
var _default = AccountGroupRoutes;
exports["default"] = _default;