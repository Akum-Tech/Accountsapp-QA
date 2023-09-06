"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _countries = require("../controllers/countries.controller");
var CountryRoutes = (0, _express.Router)();
CountryRoutes.get('/', _countries.getCountrys);
CountryRoutes.get('/:id', _countries.getCountry);
CountryRoutes.post('/', _countries.createCountry);
CountryRoutes["delete"]('/:id', _countries.deleteCountry);
CountryRoutes.put('/:id', _countries.updateCountrys);
var _default = CountryRoutes;
exports["default"] = _default;