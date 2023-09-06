"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var transport = _nodemailer["default"].createTransport({
  // name: 'www.3ewebapps.co.in',
  // host: 'mail.3ewebapps.co.in',
  // port: 465,
  // secure: true, // use SSL
  // auth: {
  //     user: 'gstapp@3ewebapps.co.in',
  //     pass: 'Gst@123#'
  // }

  host: "smtp.ethereal.email",
  // name: 'LorineWeber',
  port: 587,
  secure: false,
  // upgrade later with STARTTLS
  auth: {
    user: "lorine82@ethereal.email",
    pass: "8XryvGNhCkXmSGXP1K"
  },
  tls: {
    ciphers: 'SSLv3'
  }
});
var _default = transport;
exports["default"] = _default;