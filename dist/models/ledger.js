"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Ledger = _database.sequelize.define('ledgers', {
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
    type: _sequelize["default"].STRING
  },
  amount: {
    type: _sequelize["default"].STRING
  },
  phone: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  company_id: {
    type: _sequelize["default"].STRING
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
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  sub_account_group_id: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  tax_key: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  sale_key: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  account_group_id: {
    type: _sequelize["default"].STRING
  },
  gst_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  opening_balance: {
    type: _sequelize["default"].STRING,
    defaultValue: 'Debit' //Debit/credit
  },

  registration_type: {
    type: _sequelize["default"].STRING,
    defaultValue: 'Regular' //Regular/composition/consumer/unregistered
  },

  status: {
    // 1=active,2=block	
    type: _sequelize["default"].STRING,
    defaultValue: 1
  },
  state_status: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  period_start: {
    type: _sequelize["default"].STRING
  },
  period_end: {
    type: _sequelize["default"].STRING
  },
  taxes_slab_id: {
    type: _sequelize["default"].INTEGER,
    defaultValue: null
  },
  cess: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  cess_tax: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  bank_name: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  bank_branch: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  account_holder_name: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  ifsc: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  pan_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  bank_account_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  website: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  jurisdiction: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  cin_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  is_default_bank: {
    type: _sequelize["default"].ENUM,
    values: ['true', 'false']
  },
  is_gst: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  is_auto: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
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
var _default = Ledger;
exports["default"] = _default;