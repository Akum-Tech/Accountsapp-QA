"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _fileUpload = require("../utility/fileUpload");
var _tokenValidation = require("../utility/tokenValidation");
var _planCheck = require("../utility/planCheck");
var _organizationInfo = require("../controllers/organizationInfo.controller");
var OrganizationInfoRoutes = (0, _express.Router)();
OrganizationInfoRoutes.get('/', _tokenValidation.checkToken, _organizationInfo.getOrganizationInfos);
OrganizationInfoRoutes.get('/:id', _tokenValidation.checkToken, _organizationInfo.getOrganizationInfo);
OrganizationInfoRoutes.post('/', _fileUpload.uploadPhoto.single('file'), _tokenValidation.checkToken, _organizationInfo.createOrganizationInfo);
OrganizationInfoRoutes["delete"]('/:id', _tokenValidation.checkToken, _organizationInfo.deleteOrganizationInfo);
OrganizationInfoRoutes.put('/:id', _fileUpload.uploadPhoto.single('file'), _tokenValidation.checkToken, _organizationInfo.updateOrganizationInfo);
var _default = OrganizationInfoRoutes;
exports["default"] = _default;