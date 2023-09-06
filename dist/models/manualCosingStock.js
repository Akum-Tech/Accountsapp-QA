"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ManualClosingStock = _database.sequelize.define('maual_closingstock', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING,
    primaryKey: true
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  stockvalue: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  closingdate: {
    type: _sequelize["default"].DATEONLY
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
var _default = ManualClosingStock;
exports["default"] = _default;