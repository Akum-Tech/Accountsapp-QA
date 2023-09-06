"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SubAccountGroup = _database.sequelize.define('sub_account_groups', {
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
  account_group_id: {
    type: _sequelize["default"].STRING
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  type: {
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
var _default = SubAccountGroup;
exports["default"] = _default;