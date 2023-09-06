"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cities = require("../controllers/cities.controller");
var CityRoutes = (0, _express.Router)();
CityRoutes.get('/', _cities.getCitys);
CityRoutes.get('/:id', _cities.getCity);
CityRoutes.post('/', _cities.createCity);
CityRoutes["delete"]('/:id', _cities.deleteCity);
CityRoutes.put('/:id', _cities.updateCitys);
var _default = CityRoutes;
exports["default"] = _default;