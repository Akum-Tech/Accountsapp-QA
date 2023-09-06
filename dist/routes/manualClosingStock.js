"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _fileUpload = require("../utility/fileUpload");
var _tokenValidation = require("../utility/tokenValidation");
var _manualColsingStock = require("../controllers/manualColsingStock.controller");
var ManulstockRoutes = (0, _express.Router)();
ManulstockRoutes.post('/all', _tokenValidation.checkToken, _manualColsingStock.getManulstocks);
ManulstockRoutes.get('/:id', _tokenValidation.checkToken, _manualColsingStock.getManulstock);
ManulstockRoutes.post('/', _tokenValidation.checkToken, _manualColsingStock.createManulstock);
ManulstockRoutes.put('/:id', _tokenValidation.checkToken, _manualColsingStock.updateManulstock);
ManulstockRoutes["delete"]('/:id', _tokenValidation.checkToken, _manualColsingStock.deleteManulstock);
var _default = ManulstockRoutes;
exports["default"] = _default;