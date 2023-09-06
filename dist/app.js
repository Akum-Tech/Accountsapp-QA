"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
require("@babel/polyfill");
var _cryptoJs = _interopRequireDefault(require("crypto-js"));
var _user = _interopRequireDefault(require("./routes/user"));
var _company = _interopRequireDefault(require("./routes/company"));
var _companyBank = _interopRequireDefault(require("./routes/companyBank"));
var _accountGroup = _interopRequireDefault(require("./routes/accountGroup"));
var _ledger = _interopRequireDefault(require("./routes/ledger"));
var _items = _interopRequireDefault(require("./routes/items"));
var _cities = _interopRequireDefault(require("./routes/cities"));
var _countries = _interopRequireDefault(require("./routes/countries"));
var _states = _interopRequireDefault(require("./routes/states"));
var _stockGroup = _interopRequireDefault(require("./routes/stockGroup"));
var _subAccountGroup = _interopRequireDefault(require("./routes/subAccountGroup"));
var _registrationType = _interopRequireDefault(require("./routes/registrationType"));
var _units = _interopRequireDefault(require("./routes/units"));
var _subStockGroup = _interopRequireDefault(require("./routes/subStockGroup"));
var _forgetpassword = _interopRequireDefault(require("./routes/forgetpassword"));
var _taxes = _interopRequireDefault(require("./routes/taxes"));
var _itemStock = _interopRequireDefault(require("./routes/itemStock"));
var _itemInteries = _interopRequireDefault(require("./routes/itemInteries"));
var _ledgerBalance = _interopRequireDefault(require("./routes/ledgerBalance"));
var _saleVoucher = _interopRequireDefault(require("./routes/saleVoucher"));
var _purchaseVoucher = _interopRequireDefault(require("./routes/purchaseVoucher"));
var _creditVoucher = _interopRequireDefault(require("./routes/creditVoucher"));
var _debitVoucher = _interopRequireDefault(require("./routes/debitVoucher"));
var _recieptVoucher = _interopRequireDefault(require("./routes/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("./routes/paymentVoucher"));
var _journalVoucher = _interopRequireDefault(require("./routes/journalVoucher"));
var _purpose = _interopRequireDefault(require("./routes/purpose"));
var _vouchers = _interopRequireDefault(require("./routes/vouchers"));
var _subscription = _interopRequireDefault(require("./routes/subscription"));
var _nextprivious = _interopRequireDefault(require("./routes/nextprivious"));
var _manualClosingStock = _interopRequireDefault(require("./routes/manualClosingStock"));
var _allReports = _interopRequireDefault(require("./routes/allReports"));
var _subscriptionTrail = _interopRequireDefault(require("./routes/subscriptionTrail"));
var _gstReport = _interopRequireDefault(require("./routes/gstReport"));
var _organizationInfo = _interopRequireDefault(require("./routes/organizationInfo"));
var _itemStockVoucher = _interopRequireDefault(require("./routes/itemStockVoucher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// console.log(CryptoJS)

var crypto;
try {
  crypto = require('crypto');
} catch (err) {
  //   console.log('crypto support is disabled!');
}

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
// console.log(ciphertext.toString());
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);
// console.log(plaintext);

// console.log(new Date().getFullYear())

//Importing Routes
var app = (0, _express["default"])();

//middlewares
app.all('*', function (req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
  next();
});
app.use('/', _express["default"]["static"](_path["default"].join(__dirname, '../app')));
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, '../uploads')));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json({
  limit: '100mb'
}));
app.use(_express["default"].urlencoded({
  limit: '50mb',
  'extended': 'true'
}));
app.use(_express["default"].json({
  type: 'application/vnd.api+json'
}));
app.get('/', function (req, res) {
  return res.status(200).sendFile(_path["default"].join(__dirname, '../app', 'index.html'));
});

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
var uploadSingle = (0, _multer["default"])({
  //multer settings
  storage: storage
}).single('file');

/** API for single file upload */
app.post('/api/uploadPhoto', function (req, res) {
  uploadSingle(req, res, function (err) {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }
    res.json(req.file);
  });
});

//routes
app.use('/api/user', _user["default"]);
app.use('/api/company', _company["default"]);
app.use('/api/companybank', _companyBank["default"]);
app.use('/api/accountGroup', _accountGroup["default"]);
app.use('/api/ledger', _ledger["default"]);
app.use('/api/item', _items["default"]);
app.use('/api/cities', _cities["default"]);
app.use('/api/countries', _countries["default"]);
app.use('/api/states', _states["default"]);
app.use('/api/stockGroup', _stockGroup["default"]);
app.use('/api/subAccountGroup', _subAccountGroup["default"]);
app.use('/api/registrationType', _registrationType["default"]);
app.use('/api/units', _units["default"]);
app.use('/api/subStockGroup', _subStockGroup["default"]);
app.use('/api/forgetpassword', _forgetpassword["default"]);
app.use('/api/taxes', _taxes["default"]);
app.use('/api/itemStock', _itemStock["default"]);
app.use('/api/itemInteries', _itemInteries["default"]);
app.use('/api/ledgerBalance', _ledgerBalance["default"]);
app.use('/api/saleVoucher', _saleVoucher["default"]);
app.use('/api/purchaseVoucher', _purchaseVoucher["default"]);
app.use('/api/creditVoucher', _creditVoucher["default"]);
app.use('/api/debitVoucher', _debitVoucher["default"]);
app.use('/api/recieptVoucher', _recieptVoucher["default"]);
app.use('/api/paymentVoucher', _paymentVoucher["default"]);
app.use('/api/journalVoucher', _journalVoucher["default"]);
app.use('/api/purpose', _purpose["default"]);
app.use('/api/voucher', _vouchers["default"]);
app.use('/api/subscription', _subscription["default"]);
app.use('/api/nextPrevious', _nextprivious["default"]);
app.use('/api/manualStock', _manualClosingStock["default"]);
app.use('/api/report', _allReports["default"]);
app.use('/api/subscriptiontrail', _subscriptionTrail["default"]);
app.use('/api/gstreport', _gstReport["default"]);
app.use('/api/organizationinfo', _organizationInfo["default"]);
app.use('/api/stockvoucher', _itemStockVoucher["default"]);
var _default = app;
exports["default"] = _default;