"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LedgerBalance = _database.sequelize.define('ledger_balances', {
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
  date: {
    type: _sequelize["default"].DATE
  },
  financial_year: {
    type: _sequelize["default"].STRING
  },
  opening_balance: {
    type: _sequelize["default"].STRING
  },
  balance_status: {
    type: _sequelize["default"].ENUM,
    values: ['Credit', 'Debit']
  },
  closing: {
    type: _sequelize["default"].STRING
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
var _default = LedgerBalance;
exports["default"] = _default;