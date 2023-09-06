"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CreditVoucher = _database.sequelize.define('credit_vouchers', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING,
    primaryKey: true
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  purpose_id: {
    type: _sequelize["default"].INTEGER
  },
  buyer_ledger_id: {
    type: _sequelize["default"].STRING
  },
  narration: {
    type: _sequelize["default"].STRING
  },
  is_bank: {
    type: _sequelize["default"].STRING
  },
  is_local: {
    type: _sequelize["default"].STRING
  },
  sub_amount: {
    type: _sequelize["default"].STRING
  },
  total_amount: {
    type: _sequelize["default"].STRING
  },
  bank_name: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  bank_account_number: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  bank_ifsc: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  shipping_address: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  discount_type: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  discount: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  discount_percentage: {
    type: _sequelize["default"].STRING,
    defaultValue: null
  },
  discount_ledger: {
    type: _sequelize["default"].STRING
  },
  invoice_id: {
    type: _sequelize["default"].STRING
  },
  invoice_date: {
    type: _sequelize["default"].DATEONLY
  },
  description: {
    type: _sequelize["default"].STRING
  },
  current_year: {
    type: _sequelize["default"].STRING
  },
  end_year: {
    type: _sequelize["default"].STRING
  },
  status: {
    type: _sequelize["default"].INTEGER,
    // 1=active, 0=cancel
    defaultValue: 1
  },
  isinclusive: {
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
var _default = CreditVoucher;
exports["default"] = _default;