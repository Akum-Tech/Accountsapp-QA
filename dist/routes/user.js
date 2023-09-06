"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _users = require("../controllers/users.controller");
var UserRoutes = (0, _express.Router)();
UserRoutes.get('/', _users.getUsers);
UserRoutes.get('/:id', _tokenValidation.checkToken, _users.getUser);
UserRoutes.post('/', _users.createUser);
UserRoutes["delete"]('/:id', _tokenValidation.checkToken, _users.deleteUser);
UserRoutes.put('/:id', _tokenValidation.checkToken, _users.updateUsers);
UserRoutes.put('/subscription/:id', _tokenValidation.checkToken, _users.updatesubscriptionUsers);
UserRoutes.post('/login', _users.login);
UserRoutes.post('/mobileverify', _users.mobileverify);
UserRoutes.post('/emailverify', _users.emailverify);
UserRoutes.post('/resendotpemail', _users.resendotpemail);
UserRoutes.post('/resendotpmobile', _users.resendotpmobile);
UserRoutes.post('/checksubscription', _tokenValidation.checkToken, _users.checksubscription);
UserRoutes.post('/checksubscriptionuser', _tokenValidation.checkToken, _users.checksubscriptionuser);
UserRoutes.post('/testemail', _users.testemail);
var _default = UserRoutes;
exports["default"] = _default;