"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sequelize = new _sequelize["default"]('maa', 'maa', 'wkoAzUNz72TnhsA', {
  host: "127.0.0.1",
  // host:"localhost",
  dialect: 'mysql',
  login: false,
  logging: false,
  define: {
    "timestamps": false,
    freezeTableName: true,
    "underscored": true
  },
  dialectOptions: {
    useUTC: false //for reading from database
  },

  timezone: '+05:30'
});

// export const sequelize =  new Sequelize('gstappplive', 'root', '', {
//   host: "localhost",
//   dialect: 'mysql',
//   login:false,
//   logging: false,
//   define:{
//     "timestamps":false,
//     freezeTableName:true,
//     "underscored": true,
//   },
//   dialectOptions: {
//     useUTC: false, //for reading from database
//   },
//   timezone: '+05:30'
// });

// export const sequelize =  new Sequelize('db_a4d967_account', 'a4d967_account', 'Account@2020', {
//   host: "mysql6001.site4now.net",
//   dialect: 'mysql',
//   login:false,
//   define:{
//     "timestamps":false,
//     freezeTableName:true,
//     "underscored": true,
//   },
//   dialectOptions: {
//     useUTC: false, //for reading from database
//   },
//   timezone: '+00:00'
// });
exports.sequelize = sequelize;
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});