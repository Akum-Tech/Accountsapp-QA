"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tokenValidation = require("../utility/tokenValidation");
var _registrationtype = require("../controllers/registrationtype.controller");
var RegistrationTypeRoutes = (0, _express.Router)();
RegistrationTypeRoutes.get('/', _tokenValidation.checkToken, _registrationtype.getRegistrationTypes);
RegistrationTypeRoutes.get('/:id', _tokenValidation.checkToken, _registrationtype.getRegistrationType);
var _default = RegistrationTypeRoutes;
exports["default"] = _default;