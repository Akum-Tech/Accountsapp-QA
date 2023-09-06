"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _forgetPassword = require("../controllers/forgetPassword.controller");
var ForgetPassRoutes = (0, _express.Router)();
ForgetPassRoutes.post('/otp', _forgetPassword.genrateOtp);
ForgetPassRoutes.post('/votp', _forgetPassword.verifyOtp);
ForgetPassRoutes.put('/:id', _forgetPassword.UpdatePassword);
var _default = ForgetPassRoutes;
exports["default"] = _default;