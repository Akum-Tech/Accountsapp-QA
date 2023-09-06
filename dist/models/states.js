"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var State = _database.sequelize.define('states', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gst_code: {
    type: _sequelize["default"].STRING
  },
  name: {
    type: _sequelize["default"].STRING
  },
  effective_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = State;
exports["default"] = _default;