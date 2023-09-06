"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var subcriptionFreePeriod = _database.sequelize.define('subcription_free_period', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value_days: {
    type: _sequelize["default"].INTEGER
  }
});
var _default = subcriptionFreePeriod;
exports["default"] = _default;