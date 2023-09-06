"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var VoucherInteries = _database.sequelize.define('voucher_entries', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  ledger_id: {
    type: _sequelize["default"].STRING
  },
  amount: {
    type: _sequelize["default"].STRING
  },
  voucher_id: {
    type: _sequelize["default"].STRING
  },
  type: {
    type: _sequelize["default"].ENUM,
    values: ['Sales', 'Purchase', 'Credit', 'Debit']
  },
  invoice_date: {
    type: _sequelize["default"].DATEONLY
  },
  status: {
    // 1=active,2=block	
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
  }
});
var _default = VoucherInteries;
exports["default"] = _default;