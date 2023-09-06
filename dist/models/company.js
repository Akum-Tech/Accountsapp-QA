"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Company = _database.sequelize.define('companies', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  user_id: {
    type: _sequelize["default"].STRING
  },
  company_name: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  street: {
    type: _sequelize["default"].STRING
  },
  state_id: {
    type: _sequelize["default"].INTEGER
  },
  city_id: {
    type: _sequelize["default"].INTEGER
  },
  area: {
    type: _sequelize["default"].STRING
  },
  pin_code: {
    type: _sequelize["default"].STRING
  },
  gst_number: {
    type: _sequelize["default"].STRING
  },
  composition_dealer: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  company_logo: {
    type: _sequelize["default"].STRING
  },
  status: {
    // 1=active,2=block	
    type: _sequelize["default"].STRING,
    defaultValue: 1
  },
  cin_number: {
    type: _sequelize["default"].STRING
  },
  company_pan_number: {
    type: _sequelize["default"].STRING
  },
  terms: {
    type: _sequelize["default"].STRING
  },
  financial_year: {
    type: _sequelize["default"].STRING
  },
  financial_start: {
    type: _sequelize["default"].STRING
  },
  financial_end: {
    type: _sequelize["default"].STRING
  },
  bookstart_date: {
    type: _sequelize["default"].STRING
  },
  current_period_start: {
    type: _sequelize["default"].STRING
  },
  manualstock_closing: {
    type: _sequelize["default"].STRING,
    defaultValue: "No"
  },
  website: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  jurisdiction: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  phone_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  email: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  current_period_end: {
    type: _sequelize["default"].STRING
  },
  updated_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = Company;
exports["default"] = _default;