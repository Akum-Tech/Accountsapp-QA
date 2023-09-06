"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SubscriptionTranction = _database.sequelize.define('subscription_transaction', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: _sequelize["default"].STRING
  },
  type: {
    type: _sequelize["default"].STRING
  },
  entry_by: {
    type: _sequelize["default"].STRING
  },
  subscription_start: {
    type: _sequelize["default"].DATE
  },
  subscription_end: {
    type: _sequelize["default"].DATE
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = SubscriptionTranction;
exports["default"] = _default;