"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ItemInteries = _database.sequelize.define('item_entries', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  voucher_id: {
    type: _sequelize["default"].STRING
  },
  item_id: {
    type: _sequelize["default"].STRING
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  ledger_id: {
    type: _sequelize["default"].STRING
  },
  quantity: {
    type: _sequelize["default"].STRING
  },
  unit: {
    type: _sequelize["default"].STRING
  },
  name: {
    type: _sequelize["default"].STRING
  },
  description: {
    type: _sequelize["default"].STRING
  },
  model: {
    type: _sequelize["default"].STRING
  },
  hsn_code: {
    type: _sequelize["default"].STRING
  },
  price: {
    type: _sequelize["default"].STRING
  },
  discount: {
    type: _sequelize["default"].STRING
  },
  discount_type: {
    type: _sequelize["default"].STRING
  },
  total_amount: {
    type: _sequelize["default"].STRING
  },
  igst_tax: {
    type: _sequelize["default"].STRING
  },
  invoice_date: {
    type: _sequelize["default"].DATEONLY
    // validate:
    // {
    //     notEmpty: 
    //     {
    //         msg: "-> Falta data"
    //     }
    // }
  },

  type: {
    type: _sequelize["default"].ENUM,
    values: ['Sales', 'Purchase', 'Credit', 'Debit']
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
var _default = ItemInteries;
exports["default"] = _default;