"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var City = _database.sequelize.define('cities', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state_id: {
    type: _sequelize["default"].INTEGER
  },
  name: {
    type: _sequelize["default"].STRING
  }
});
var _default = City;
exports["default"] = _default;