"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Purpose = _database.sequelize.define('purpose_vouchers', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].STRING
  },
  order_by: {
    type: _sequelize["default"].INTEGER
  },
  type: {
    type: _sequelize["default"].STRING
  },
  status: {
    type: _sequelize["default"].INTEGER
  }
});
var _default = Purpose;
exports["default"] = _default;