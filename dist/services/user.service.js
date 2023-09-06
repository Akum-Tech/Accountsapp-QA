"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _users = _interopRequireDefault(require("../models/users"));
var _company = _interopRequireDefault(require("../models/company"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _statusCode = require("../utility/statusCode");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _otpGenerator = _interopRequireDefault(require("otp-generator"));
var _database = require("../database/database");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _sha = _interopRequireDefault(require("sha1"));
require("@babel/polyfill");
var _mail = _interopRequireDefault(require("../utility/mail"));
var _config = _interopRequireDefault(require("../constant/config"));
var _subcription_free_period = _interopRequireDefault(require("../models/subcription_free_period"));
var _subscriptionTransction = _interopRequireDefault(require("../models/subscriptionTransction"));
var _company2 = require("../security/company");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
var axios = require("axios");
var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");

// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "webapitest101@gmail.com",
//     pass: "test@123#"
//   },
//   secure: false,
//   tls: {
//     rejectUnauthorized: false
//   }
// });

var readHTMLFile = function readHTMLFile(path, callback) {
  fs.readFile(path, {
    encoding: "utf-8"
  }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
function gettemplate(_x, _x2) {
  return _gettemplate.apply(this, arguments);
}
function _gettemplate() {
  _gettemplate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(path, sendotp) {
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _gettemplate.apply(this, arguments);
}
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, data, res) {
    var _createdata, countcomapny;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _users["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          _createdata = _context.sent;
          if (!_createdata) {
            _context.next = 17;
            break;
          }
          _context.next = 7;
          return _company["default"].findAll({
            where: {
              user_id: _createdata.dataValues.uid
            }
          });
        case 7:
          countcomapny = _context.sent;
          _createdata.dataValues.serverdate = new Date().toISOString().slice(0, 10);
          _context.next = 11;
          return (0, _company2.decreption)(countcomapny, "array", _createdata.dataValues.email);
        case 11:
          _createdata.dataValues.companyList = _context.sent;
          ;
          console.log("resp----->", _createdata.dataValues);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User fetch Successfully",
            user: _createdata
          });
        case 17:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User not Found!",
            user: _createdata ? _createdata : {}
          });
        case 18:
          _context.next = 28;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          _context.next = 25;
          return (0, _statusCode.checkCode)("error");
        case 25:
          _context.t1 = _context.sent;
          _context.t2 = _context.t0;
          return _context.abrupt("return", {
            statusCode: _context.t1,
            success: false,
            error: _context.t2,
            message: "Something went wrong!"
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function (_x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var _createdata2;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _users["default"].findAll({
            order: [['creation_date', 'DESC']]
          });
        case 3:
          _createdata2 = _context2.sent;
          console.log(_createdata2);
          if (!(_createdata2.length > 0)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User fetch Successfully",
            user: _createdata2
          });
        case 9:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User not Found!",
            user: []
          });
        case 10:
          _context2.next = 20;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          _context2.next = 17;
          return (0, _statusCode.checkCode)("error");
        case 17:
          _context2.t1 = _context2.sent;
          _context2.t2 = _context2.t0;
          return _context2.abrupt("return", {
            statusCode: _context2.t1,
            success: false,
            error: _context2.t2,
            message: "Something went wrong!"
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var emailotp, smsotp, checkuser, finddata, updatedata, token, countcomapny, url, urlwithnumber, v3, v4, v5, msg, html, template, replacements, htmlToSend, mailOptions, _createdata3, _token, _countcomapny, _url, _urlwithnumber, v1, v2, _v, _v2, _v3, _msg, _mailOptions;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(data);
          emailotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          smsotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          _context3.next = 6;
          return _users["default"].findOne({
            where: _defineProperty({}, Op.or, [{
              email: data.email
            }, {
              phone: data.phone
            }])
          });
        case 6:
          checkuser = _context3.sent;
          console.log("colan test" + checkuser);
          if (!checkuser) {
            _context3.next = 69;
            break;
          }
          if (!(checkuser.dataValues.is_email_verify == 1)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Email ID Already Exist"
            //user: checkdata
          });
        case 13:
          if (!(checkuser.dataValues.is_mobile_verify == 1)) {
            _context3.next = 17;
            break;
          }
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: " Mobile Number Already Exist"
          });
        case 17:
          _context3.next = 19;
          return _users["default"].findOne({
            where: {
              uid: checkuser.dataValues.uid
            }
          });
        case 19:
          finddata = _context3.sent;
          if (!finddata) {
            _context3.next = 67;
            break;
          }
          data.updated_date = new Date();
          data.status = 1;
          data.email_otp = emailotp;
          data.sms_otp = smsotp;
          data.is_email_verify = 0;
          data.is_mobile_verify = 0;
          // data.application_type =data.application_type;
          // if(data.application_type=='ios'){
          //   data.apple_token = data.apple_token;
          // }else{
          //   data.android_token = data.android_token;
          // }
          _context3.next = 29;
          return (0, _sha["default"])(data.password);
        case 29:
          data.password = _context3.sent;
          _context3.next = 32;
          return finddata.update(data);
        case 32:
          updatedata = _context3.sent;
          console.log(updatedata);
          if (!updatedata) {
            _context3.next = 66;
            break;
          }
          _context3.next = 37;
          return _jsonwebtoken["default"].sign({
            data: updatedata.dataValues
          }, "AccountingApi");
        case 37:
          token = _context3.sent;
          updatedata.dataValues.token = token;
          _context3.next = 41;
          return _company["default"].findAll({
            where: {
              user_id: updatedata.uid
            },
            attributes: [[_database.sequelize.fn("COUNT", _database.sequelize.col("company_name")), "company"]]
          });
        case 41:
          countcomapny = _context3.sent;
          updatedata.dataValues.comapny = countcomapny[0];
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          url = _config["default"].smsurl;
          urlwithnumber = url.concat(data.phone);
          v3 = urlwithnumber.concat("&message=");
          v4 = v3.concat(_config["default"].verficationotpmsgtxt1);
          v5 = v4.concat(smsotp);
          msg = v5; //.concat(Constant.verficationotpmsgtxt2);
          //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
          console.log("smstemplate", msg);
          //let lasturl=data.concat(msg);
          axios.get(msg).then(function (response) {
            // handle success
            console.log(response);
            console.log("response");
          })["catch"](function (error) {
            // handle error
            console.log(error);
            console.log("error");
          }).then(function () {
            // always executed
            console.log("always");
          });
          html = fs.readFileSync(path.resolve(__dirname, "../template/email.html"), "utf8");
          template = handlebars.compile(html);
          replacements = {
            otp: emailotp
          };
          htmlToSend = template(replacements);
          console.log("iii---------", htmlToSend);
          mailOptions = {
            from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
            // sender address
            to: data.email,
            // list of receivers
            subject: "Otp for verify Email ID",
            // Subject line
            html: "<b>Hello world</b>" // plain text body
          };

          _mail["default"].sendMail(mailOptions, function (err, info) {
            if (err) console.log("==err", err);else console.log("==info", info);
          });
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User Already Exists",
            user: updatedata
          });
        case 66:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            user: createdata
          });
        case 67:
          _context3.next = 120;
          break;
        case 69:
          _context3.next = 71;
          return (0, _uniqid["default"])();
        case 71:
          data.uid = _context3.sent;
          data.creation_date = new Date();
          data.updated_date = new Date();
          data.status = 1;
          data.email_otp = emailotp;
          data.sms_otp = smsotp;
          data.is_email_verify = 0;
          data.is_mobile_verify = 0;
          _context3.next = 81;
          return (0, _sha["default"])(data.password);
        case 81:
          data.password = _context3.sent;
          _context3.next = 84;
          return _users["default"].create(data);
        case 84:
          _createdata3 = _context3.sent;
          if (!_createdata3) {
            _context3.next = 119;
            break;
          }
          _context3.next = 88;
          return _jsonwebtoken["default"].sign({
            data: _createdata3.dataValues
          }, "AccountingApi");
        case 88:
          _token = _context3.sent;
          _createdata3.dataValues.token = _token;
          _context3.next = 92;
          return _company["default"].findAll({
            where: {
              user_id: _createdata3.uid
            },
            attributes: [[_database.sequelize.fn("COUNT", _database.sequelize.col("company_name")), "company"]]
          });
        case 92:
          _countcomapny = _context3.sent;
          _createdata3.dataValues.comapny = _countcomapny[0];
          delete _createdata3.dataValues.password;
          delete _createdata3.dataValues.email_otp;
          delete _createdata3.dataValues.sms_otp;
          delete _createdata3.dataValues.android_token;
          delete _createdata3.dataValues.apple_token;
          _url = _config["default"].smsurl;
          _urlwithnumber = _url.concat(data.phone);
          v1 = _urlwithnumber.concat("&template_id=");
          v2 = v1.concat(_config["default"].verficationotpid);
          _v = _urlwithnumber.concat("&message=");
          _v2 = _v.concat(_config["default"].verficationotpmsgtxt1);
          _v3 = _v2.concat(smsotp);
          _msg = _v3; //.concat(Constant.verficationotpmsgtxt2);
          //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
          console.log("smstemplate", _msg);
          //let lasturl=data.concat(msg);
          axios.get(_msg).then(function (response) {
            // handle success
            console.log(response);
            console.log("response");
          })["catch"](function (error) {
            // handle error
            console.log(error);
            console.log("error");
          }).then(function () {
            // always executed
            console.log("always");
          });
          html = fs.readFileSync(path.resolve(__dirname, "../template/email.html"), "utf8");
          template = handlebars.compile(html);
          replacements = {
            otp: emailotp
          };
          htmlToSend = template(replacements);
          console.log("iii---------", htmlToSend);
          _mailOptions = {
            from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
            // sender address
            to: data.email,
            // list of receivers
            subject: "Otp for verify Email ID",
            // Subject line
            html: htmlToSend // plain text body
          };

          _mail["default"].sendMail(_mailOptions, function (err, info) {
            if (err) console.log("==err", err);else console.log("==info", info);
          });
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User Created Successfully",
            user: _createdata3
          });
        case 119:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            user: _createdata3
          });
        case 120:
          _context3.next = 129;
          break;
        case 122:
          _context3.prev = 122;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 126;
          return (0, _statusCode.checkCode)("error");
        case 126:
          _context3.t1 = _context3.sent;
          _context3.t2 = _context3.t0;
          return _context3.abrupt("return", {
            statusCode: _context3.t1,
            success: false,
            error: _context3.t2,
            message: "Something went wrong!"
          });
        case 129:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 122]]);
  }));
  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _users["default"].destroy({
            where: {
              uid: id
            }
          });
        case 3:
          deletedata = _context4.sent;
          if (!deletedata) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User Delete Successfully",
            user: deletedata
          });
        case 8:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            user: deletedata
          });
        case 9:
          _context4.next = 18;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 15;
          return (0, _statusCode.checkCode)("error");
        case 15:
          _context4.t1 = _context4.sent;
          _context4.t2 = _context4.t0;
          return _context4.abrupt("return", {
            statusCode: _context4.t1,
            success: false,
            error: _context4.t2,
            message: "Something went wrong!"
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function (_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, data, res) {
    var finddata, updatedata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _users["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          finddata = _context5.sent;
          if (!finddata) {
            _context5.next = 16;
            break;
          }
          data.updated_date = new Date();
          _context5.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context5.sent;
          if (!updatedata) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User update Successfully",
            user: updatedata
          });
        case 13:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            user: updatedata
          });
        case 14:
          _context5.next = 17;
          break;
        case 16:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "User not found!",
            user: finddata ? finddata : {}
          });
        case 17:
          _context5.next = 26;
          break;
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 23;
          return (0, _statusCode.checkCode)("error");
        case 23:
          _context5.t1 = _context5.sent;
          _context5.t2 = _context5.t0;
          return _context5.abrupt("return", {
            statusCode: _context5.t1,
            success: false,
            error: _context5.t2,
            message: "Something went wrong!"
          });
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updatesubscriptionData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, data, res) {
    var finddata, updatedata, obj, create;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _users["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          finddata = _context6.sent;
          if (!finddata) {
            _context6.next = 22;
            break;
          }
          data.updated_date = new Date();
          _context6.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context6.sent;
          if (!updatedata) {
            _context6.next = 19;
            break;
          }
          _context6.next = 12;
          return {
            user_id: updatedata.dataValues.uid,
            type: 'free',
            entry_by: 'Admin',
            subscription_start: data.subscription_old_date,
            subscription_end: data.subscription_end_date,
            creation_date: new Date()
          };
        case 12:
          obj = _context6.sent;
          _context6.next = 15;
          return _subscriptionTransction["default"].create(obj);
        case 15:
          create = _context6.sent;
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User update Successfully",
            user: updatedata
          });
        case 19:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            user: updatedata
          });
        case 20:
          _context6.next = 23;
          break;
        case 22:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "User not found!",
            user: finddata ? finddata : {}
          });
        case 23:
          _context6.next = 32;
          break;
        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 29;
          return (0, _statusCode.checkCode)("error");
        case 29:
          _context6.t1 = _context6.sent;
          _context6.t2 = _context6.t0;
          return _context6.abrupt("return", {
            statusCode: _context6.t1,
            success: false,
            error: _context6.t2,
            message: "Something went wrong!"
          });
        case 32:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 25]]);
  }));
  return function (_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
exports.loginUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var emailotp, smsotp, finddata, updatedata, token, countcomapny, url, urlwithnumber, v3, v4, v5, msg, html, template, replacements, htmlToSend, mailOptions;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          emailotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          smsotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          }); //let finddata = await  User.findOne({ where: {email:data.email}});
          // let obj = null;
          // if (data.logintype == 1) {
          //     obj = {
          //         where: {
          //             email: data.email
          //         }
          //     };
          // } else {
          //     obj = {
          //         where: {
          //             phone: data.phone
          //         }
          //     };
          // }
          _context7.next = 5;
          return _users["default"].findOne({
            where: _defineProperty({}, Op.or, [data.email ? {
              email: data.email
            } : null, data.phone ? {
              phone: data.phone
            } : null])
          });
        case 5:
          finddata = _context7.sent;
          if (!finddata) {
            _context7.next = 40;
            break;
          }
          if (!((0, _sha["default"])(data.password) === finddata.password)) {
            _context7.next = 37;
            break;
          }
          if (finddata.dataValues.is_email_verify == 0) {
            data.email_otp = emailotp;
          }
          if (finddata.dataValues.is_mobile_verify == 0) {
            data.sms_otp = smsotp;
          }
          _context7.next = 12;
          return (0, _sha["default"])(data.password);
        case 12:
          data.password = _context7.sent;
          _context7.next = 15;
          return finddata.update(data);
        case 15:
          updatedata = _context7.sent;
          if (!updatedata) {
            _context7.next = 34;
            break;
          }
          _context7.next = 19;
          return _jsonwebtoken["default"].sign({
            data: updatedata.dataValues
          }, "AccountingApi");
        case 19:
          token = _context7.sent;
          updatedata.dataValues.token = token;
          _context7.next = 23;
          return _company["default"].findAll({
            where: {
              user_id: updatedata.uid
            },
            attributes: [[_database.sequelize.fn("COUNT", _database.sequelize.col("company_name")), "company"]]
          });
        case 23:
          countcomapny = _context7.sent;
          updatedata.dataValues.comapny = countcomapny[0];
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          // delete updatedata.dataValues.android_token;
          // delete updatedata.dataValues.apple_token;
          updatedata.dataValues.serverdate = new Date().toISOString().slice(0, 10);
          if (finddata.dataValues.is_mobile_verify == 0) {
            url = _config["default"].smsurl;
            urlwithnumber = url.concat(data.phone);
            v3 = urlwithnumber.concat("&message=");
            v4 = v3.concat(_config["default"].verficationotpmsgtxt1);
            v5 = v4.concat(smsotp);
            msg = v5; //.concat(Constant.verficationotpmsgtxt2);
            //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
            console.log("smstemplate", msg);
            //let lasturl=data.concat(msg);
            axios.get(msg).then(function (response) {
              // handle success
              console.log(response);
              console.log("response");
            })["catch"](function (error) {
              // handle error
              console.log(error);
              console.log("error");
            }).then(function () {
              // always executed
              console.log("always");
            });
          }
          if (finddata.dataValues.is_email_verify == 0) {
            html = fs.readFileSync(path.resolve(__dirname, "../template/email.html"), "utf8");
            template = handlebars.compile(html);
            replacements = {
              otp: emailotp
            };
            htmlToSend = template(replacements);
            console.log("iii---------", htmlToSend);
            mailOptions = {
              from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
              // sender address
              to: data.email,
              // list of receivers
              subject: "Otp for verify Email ID",
              // Subject line
              html: htmlToSend // plain text body
            };

            _mail["default"].sendMail(mailOptions, function (err, info) {
              if (err) console.log("==err", err);else console.log("==info", info);
            });
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User Login Successfully",
            user: updatedata
          });
        case 34:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!"
          });
        case 35:
          _context7.next = 38;
          break;
        case 37:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Password incorrect!",
            user: {}
          });
        case 38:
          _context7.next = 45;
          break;
        case 40:
          if (!(data.logintype == 1)) {
            _context7.next = 44;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Email ID not exist!"
          });
        case 44:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Phone Number not exist!"
          });
        case 45:
          _context7.next = 54;
          break;
        case 47:
          _context7.prev = 47;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 51;
          return (0, _statusCode.checkCode)("error");
        case 51:
          _context7.t1 = _context7.sent;
          _context7.t2 = _context7.t0.message;
          return _context7.abrupt("return", {
            statusCode: _context7.t1,
            success: false,
            error: _context7.t2,
            message: "Something went wrong!"
          });
        case 54:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 47]]);
  }));
  return function (_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
exports.verifyotpemail = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data, res) {
    var finddata, updatedata;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _users["default"].findOne({
            where: {
              email: data.email,
              email_otp: data.otp,
              is_email_verify: "0"
            }
          });
        case 3:
          finddata = _context8.sent;
          if (!finddata) {
            _context8.next = 17;
            break;
          }
          data.is_email_verify = 1;
          _context8.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context8.sent;
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: updatedata,
            message: "Email OTP verify Sucessfully"
          });
        case 17:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "OTP not valid!"
          });
        case 18:
          _context8.next = 23;
          break;
        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context8.t0.message,
            message: "Something went wrong!"
          });
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 20]]);
  }));
  return function (_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();
exports.verifyotpmobile = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data, res) {
    var finddata, updatedata;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _users["default"].findOne({
            where: {
              phone: data.phone,
              sms_otp: data.otp,
              is_mobile_verify: "0"
            }
          });
        case 3:
          finddata = _context9.sent;
          if (!finddata) {
            _context9.next = 17;
            break;
          }
          data.is_mobile_verify = 1;
          _context9.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context9.sent;
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: updatedata,
            message: "Mobile OTP verify Sucessfully"
          });
        case 17:
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "OTP not valid!"
          });
        case 18:
          _context9.next = 23;
          break;
        case 20:
          _context9.prev = 20;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context9.t0.message,
            message: "Something went wrong!"
          });
        case 23:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 20]]);
  }));
  return function (_x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();
exports.resendotpemail = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, res) {
    var emailotp, finddata, updatedata, html, template, replacements, htmlToSend, mailOptions;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          emailotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          _context10.next = 4;
          return _users["default"].findOne({
            where: {
              email: data.email,
              is_email_verify: "0"
            }
          });
        case 4:
          finddata = _context10.sent;
          if (!finddata) {
            _context10.next = 25;
            break;
          }
          data.email_otp = emailotp;
          _context10.next = 9;
          return finddata.update(data);
        case 9:
          updatedata = _context10.sent;
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          html = fs.readFileSync(path.resolve(__dirname, "../template/email.html"), "utf8");
          template = handlebars.compile(html);
          replacements = {
            otp: emailotp
          };
          htmlToSend = template(replacements);
          console.log("iii---------", htmlToSend);
          mailOptions = {
            from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
            // sender address
            to: data.email,
            // list of receivers
            subject: "Otp for verify Email ID",
            // Subject line
            html: htmlToSend // plain text body
          };

          _mail["default"].sendMail(mailOptions, function (err, info) {
            if (err) console.log("==err", err);else console.log("==info", info);
          });
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: updatedata,
            message: "Rsend OTP On your Email Id  Sucessfully"
          });
        case 25:
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Email id  not valid!"
          });
        case 26:
          _context10.next = 31;
          break;
        case 28:
          _context10.prev = 28;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context10.t0.message,
            message: "Something went wrong!"
          });
        case 31:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 28]]);
  }));
  return function (_x24, _x25) {
    return _ref10.apply(this, arguments);
  };
}();
exports.resendotpmobile = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data, res) {
    var smsotp, finddata, updatedata, url, urlwithnumber, v3, v4, v5, msg;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          smsotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          _context11.next = 4;
          return _users["default"].findOne({
            where: {
              phone: data.phone,
              is_mobile_verify: "0"
            }
          });
        case 4:
          finddata = _context11.sent;
          if (!finddata) {
            _context11.next = 26;
            break;
          }
          data.sms_otp = smsotp;
          _context11.next = 9;
          return finddata.update(data);
        case 9:
          updatedata = _context11.sent;
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          url = _config["default"].smsurl;
          urlwithnumber = url.concat(data.phone);
          v3 = urlwithnumber.concat("&message=");
          v4 = v3.concat(_config["default"].verficationotpmsgtxt1);
          v5 = v4.concat(smsotp);
          msg = v5; //.concat(Constant.verficationotpmsgtxt2);
          //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
          console.log("smstemplate", msg);
          //let lasturl=data.concat(msg);
          axios.get(msg).then(function (response) {
            // handle success
            console.log(response);
            console.log("response");
          })["catch"](function (error) {
            // handle error
            console.log(error);
            console.log("error");
          }).then(function () {
            // always executed
            console.log("always");
          });
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: updatedata,
            message: "Resend OTP on your registerd mobile number sucessfully"
          });
        case 26:
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "phone number not valid!"
          });
        case 27:
          _context11.next = 32;
          break;
        case 29:
          _context11.prev = 29;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context11.t0.message,
            message: "Something went wrong!"
          });
        case 32:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 29]]);
  }));
  return function (_x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}();
exports.checksubscription = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(data, res) {
    var finddatasubscription, user, d, datan, transctiondata, updatedata;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _subcription_free_period["default"].findOne({
            where: {
              id: 1
            }
          });
        case 3:
          finddatasubscription = _context12.sent;
          _context12.next = 6;
          return _users["default"].findOne({
            where: {
              uid: data.id
            }
          });
        case 6:
          user = _context12.sent;
          if (!user) {
            _context12.next = 28;
            break;
          }
          if (!(finddatasubscription.value_days != 0)) {
            _context12.next = 17;
            break;
          }
          d = new Date();
          d.setDate(d.getDate() + finddatasubscription.value_days);
          datan = {
            subscription_end_date: d
          };
          _context12.next = 14;
          return user.update(datan);
        case 14:
          transctiondata = {
            user_id: data.id,
            type: "free",
            entry_by: "self",
            subscription_start: new Date(),
            subscription_end: d
          };
          _context12.next = 17;
          return _subscriptionTransction["default"].create(transctiondata);
        case 17:
          _context12.next = 19;
          return _users["default"].findOne({
            where: {
              uid: data.id
            }
          });
        case 19:
          updatedata = _context12.sent;
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          delete updatedata.dataValues.android_token;
          delete updatedata.dataValues.apple_token;
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: updatedata,
            severdate: new Date().toISOString().slice(0, 10),
            message: "User subscription sucesfully"
          });
        case 28:
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User Not find "
          });
        case 29:
          _context12.next = 34;
          break;
        case 31:
          _context12.prev = 31;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context12.t0.message,
            message: "Something went wrong!"
          });
        case 34:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 31]]);
  }));
  return function (_x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}();
exports.checksubscriptionuser = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data, res) {
    var userdata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _users["default"].findOne({
            where: {
              uid: data.id
            }
          });
        case 3:
          userdata = _context13.sent;
          if (!userdata) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            user: userdata,
            severdate: new Date().toISOString().slice(0, 10),
            message: "User detail sucesfully"
          });
        case 8:
          return _context13.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "User detail find "
          });
        case 9:
          _context13.next = 14;
          break;
        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](0);
          return _context13.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context13.t0.message,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 11]]);
  }));
  return function (_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}();
exports.testemail = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, res) {
    var emailotp, html, template, replacements, htmlToSend, mailOptions;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          emailotp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          data.email_otp = emailotp;
          console.log("========", data.email);
          html = fs.readFileSync(path.resolve(__dirname, "../template/email.html"), "utf8");
          template = handlebars.compile(html);
          replacements = {
            otp: emailotp
          };
          htmlToSend = template(replacements);
          console.log("iii---------", htmlToSend);
          mailOptions = {
            from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
            // sender address
            to: data.email,
            // list of receivers
            subject: "Otp for verify Email ID",
            // Subject line
            html: htmlToSend // plain text body
          };

          _mail["default"].sendMail(mailOptions, function (err, info) {
            if (err) console.log("==err", err);else console.log("==info", info);
          });

          // await fs.readFile(path.resolve(__dirname, "../template/email.html"), {encoding: 'utf-8'}, function (err, html) {

          //            if (err) {
          //             throw err;

          //         }
          //         else {
          //              var template = handlebars.compile(html);
          //     var replacements = {
          //          otp: emailotp
          //     };
          //      var htmlToSend = template(replacements);
          //     console.log("iii---------",htmlToSend);

          //       let mailOptions = {
          //         from: `GSTApp ${transport.options.auth.user}`, // sender address
          //         to: data.email, // list of receivers
          //         subject: "Otp for forget password", // Subject line
          //         html: htmlToSend // plain text body
          //       };

          //       transport.sendMail(mailOptions, function(err, info) {
          //         if (err)
          //         console.log("==err",err);
          //         else console.log("==info",info);
          //       });
          //         }

          //     });
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: " OTP On your Email Id  Sucessfully"
          });
        case 14:
          _context14.prev = 14;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context14.t0.message,
            message: "Something went wrong!"
          });
        case 17:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 14]]);
  }));
  return function (_x32, _x33) {
    return _ref14.apply(this, arguments);
  };
}();