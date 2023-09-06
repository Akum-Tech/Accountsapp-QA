"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SubscriptionOrder = _database.sequelize.define("subscription_order", {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: _sequelize["default"].STRING
  },
  subscription_id: {
    type: _sequelize["default"].INTEGER
  },
  amount: {
    type: _sequelize["default"].DECIMAL
  },
  gst: {
    type: _sequelize["default"].DECIMAL
  },
  total: {
    type: _sequelize["default"].DECIMAL
  },
  status: {
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
  },
  razorpay_payment_id: {
    type: _sequelize["default"].STRING
  },
  razorpay_order_id: {
    type: _sequelize["default"].STRING
  },
  razorpay_signature: {
    type: _sequelize["default"].STRING
  },
  recpit_id: {
    type: _sequelize["default"].STRING
  },
  name: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  email: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  address: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  gst_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  }
});
var _default = SubscriptionOrder;
exports["default"] = _default;