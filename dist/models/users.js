"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var User = _database.sequelize.define('users', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  name: {
    type: _sequelize["default"].STRING
  },
  email: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  password: {
    type: _sequelize["default"].STRING
  },
  phone: {
    type: _sequelize["default"].STRING
  },
  email_otp: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  sms_otp: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  is_email_verify: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  is_mobile_verify: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  device_id: {
    type: _sequelize["default"].STRING
  },
  android_token: {
    type: _sequelize["default"].STRING
  },
  apple_token: {
    type: _sequelize["default"].STRING
  },
  application_type: {
    type: _sequelize["default"].STRING // ['web', 'android', 'ios', 'admin']
  },

  status: {
    // 1=active,2=block	
    type: _sequelize["default"].STRING,
    defaultValue: 1
  },
  updated_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  subscription_end_date: {
    type: _sequelize["default"].DATE,
    "default": _sequelize["default"].NOW
  }
});
var _default = User;
exports["default"] = _default;