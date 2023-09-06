"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Item = _database.sequelize.define('items', {
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
  unit_id: {
    type: _sequelize["default"].INTEGER
  },
  stock_group_id: {
    type: _sequelize["default"].STRING
  },
  stock_sub_group_id: {
    type: _sequelize["default"].STRING
  },
  hsn_code: {
    type: _sequelize["default"].STRING
  },
  rate: {
    type: _sequelize["default"].STRING,
    defaultValue: 0
  },
  quantity: {
    type: _sequelize["default"].INTEGER,
    defaultValue: 0
  },
  total_value: {
    type: _sequelize["default"].STRING
  },
  isgst_applicable: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  company_id: {
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
  period_start: {
    type: _sequelize["default"].STRING
  },
  period_end: {
    type: _sequelize["default"].STRING
  },
  status: {
    // 1=active,2=block	
    type: _sequelize["default"].STRING,
    defaultValue: 1
  },
  taxes_slab_value: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  effective_date: {
    // 1=active,2=block	
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
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
var _default = Item;
exports["default"] = _default;