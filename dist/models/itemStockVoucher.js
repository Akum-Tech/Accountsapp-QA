"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ItemStockVoucher = _database.sequelize.define("item_stock_vouchers", {
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
  ledger_id: {
    type: _sequelize["default"].STRING
  },
  narration: {
    type: _sequelize["default"].STRING
  },
  total_amount: {
    type: _sequelize["default"].STRING
  },
  type: {
    type: _sequelize["default"].STRING
  },
  voucher_type: {
    type: _sequelize["default"].STRING,
    defaultValue: "itemStockVoucher"
  },
  invoice_id: {
    type: _sequelize["default"].STRING
  },
  invoice_date: {
    type: _sequelize["default"].DATEONLY
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
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  updated_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = ItemStockVoucher;
exports["default"] = _default;