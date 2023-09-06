"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CompanyBank = _database.sequelize.define('company_bank_details', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  account_number: {
    type: _sequelize["default"].STRING
  },
  ifsc_code: {
    type: _sequelize["default"].STRING
  },
  branch_name: {
    type: _sequelize["default"].STRING
  },
  bank_name: {
    type: _sequelize["default"].STRING
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  isdefault: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  updated_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = CompanyBank;
exports["default"] = _default;