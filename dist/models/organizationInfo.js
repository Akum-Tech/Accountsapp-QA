"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var OrganizationInfo = _database.sequelize.define('organization_info', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_name: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  gst_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  cin_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  phone_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  email: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  terms: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  pan_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  address: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  logo: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  service_code: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  updated_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = OrganizationInfo;
exports["default"] = _default;