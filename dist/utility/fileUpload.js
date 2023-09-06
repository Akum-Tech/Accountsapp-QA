"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPhoto = void 0;
var _multer = _interopRequireDefault(require("multer"));
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// file upload code
var storage = _multer["default"].diskStorage({
  //multers disk storage settings
  destination: function destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function filename(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, 'accounting' + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
var uploadPhoto = (0, _multer["default"])({
  storage: storage
});
exports.uploadPhoto = uploadPhoto;