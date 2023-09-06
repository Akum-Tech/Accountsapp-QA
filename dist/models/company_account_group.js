"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CompanyAccountGroup = _database.sequelize.define('companies_account_groups', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING
  },
  company_id: {
    type: _sequelize["default"].STRING
  },
  account_group_id: {
    type: _sequelize["default"].INTEGER
  },
  name: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  type: {
    type: _sequelize["default"].STRING
  }
});
var _default = CompanyAccountGroup;
exports["default"] = _default;