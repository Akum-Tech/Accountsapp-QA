"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ItemStock = _database.sequelize.define('item_stocks', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  item_id: {
    type: _sequelize["default"].STRING
  },
  opening_blance: {
    type: _sequelize["default"].STRING
  },
  inword: {
    type: _sequelize["default"].STRING
  },
  outword: {
    type: _sequelize["default"].STRING
  },
  closing: {
    type: _sequelize["default"].STRING
  },
  date: {
    type: _sequelize["default"].DATE
  },
  period_start: {
    type: _sequelize["default"].DATE
  },
  period_end: {
    type: _sequelize["default"].DATE
  },
  status: {
    // 1=active,2=block	
    type: _sequelize["default"].STRING,
    defaultValue: 1
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
var _default = ItemStock;
exports["default"] = _default;