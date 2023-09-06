"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _database = require("../database/database");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Subscription = _database.sequelize.define('subscription', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  months: {
    type: _sequelize["default"].INTEGER
  },
  tax_id: {
    type: _sequelize["default"].INTEGER
  },
  basic: {
    type: _sequelize["default"].STRING,
    defaultValue: '0'
  },
  gst: {
    type: _sequelize["default"].STRING,
    defaultValue: '0'
  },
  total: {
    type: _sequelize["default"].STRING,
    defaultValue: '0'
  },
  title: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  description: {
    type: _sequelize["default"].STRING,
    defaultValue: ''
  },
  status: {
    type: _sequelize["default"].STRING,
    defaultValue: 1
  },
  creation_date: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
});
var _default = Subscription;
exports["default"] = _default;