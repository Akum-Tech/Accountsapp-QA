"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var JournalInteries = _database.sequelize.define('journal_entries', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING,
    primaryKey: true
  },
  journa_voucher_id: {
    type: _sequelize["default"].STRING
  },
  type: {
    type: _sequelize["default"].STRING
  },
  invoice_date: {
    type: _sequelize["default"].DATEONLY
  },
  ledger_id: {
    type: _sequelize["default"].STRING
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  amount: {
    type: _sequelize["default"].STRING
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
var _default = JournalInteries;
exports["default"] = _default;