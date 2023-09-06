"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Taxes = _database.sequelize.define('taxes', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state_type: {
    type: _sequelize["default"].ENUM,
    values: ['Local', 'Globe']
  },
  type: {
    type: _sequelize["default"].ENUM,
    values: ['Sales', 'Purchase']
  },
  tax: {
    type: _sequelize["default"].STRING
  },
  title: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  }
});
var _default = Taxes;
exports["default"] = _default;