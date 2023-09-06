"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _users = _interopRequireDefault(require("../models/users"));
var _forgetpassword = _interopRequireDefault(require("../models/forgetpassword"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _otpGenerator = _interopRequireDefault(require("otp-generator"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _config = _interopRequireDefault(require("../constant/config"));
var _mail = _interopRequireDefault(require("../utility/mail"));
var _sha = _interopRequireDefault(require("sha1"));
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
var axios = require('axios');
var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");
console.log(_mail["default"].options.auth.user);
exports.genrateOtp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, res) {
    var checkdata, otp, checkdata1, updatedata2, number, url, urlwithnumber, v3, v4, v5, msg, html, template, replacements, htmlToSend, mailOptions, createdata, _number, _url, _urlwithnumber, _v, _v2, _v3, _msg, _mailOptions;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _users["default"].findOne({
            where: _defineProperty({}, Op.or, [{
              email: data.email
            }, {
              phone: data.phone
            }])
          });
        case 3:
          checkdata = _context.sent;
          if (!checkdata) {
            _context.next = 37;
            break;
          }
          otp = _otpGenerator["default"].generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false
          });
          data.creation_date = new Date();
          data.updated_date = new Date();
          data.otp = otp;
          data.user_id = checkdata.uid;
          data.is_verified = 0;
          _context.next = 13;
          return _forgetpassword["default"].findOne({
            where: {
              user_id: checkdata.uid
            }
          });
        case 13:
          checkdata1 = _context.sent;
          if (!checkdata1) {
            _context.next = 26;
            break;
          }
          _context.next = 17;
          return checkdata1.update(data);
        case 17:
          updatedata2 = _context.sent;
          if (!updatedata2) {
            _context.next = 23;
            break;
          }
          if (data.phone) {
            number = checkdata.phone; //  let url=Constant.smsurl;
            // let urlwithnumber = url.concat(number);
            //  let v1= urlwithnumber.concat('&template_id=');
            //     let v2=v1.concat(Constant.verficationotpid);
            //     let v3=v2.concat('&msgtxt=');
            //      let v4=v3.concat(Constant.verficationotpmsgtxt1);
            //    let v5= v4.concat(otp);
            //     let msg= v5.concat(Constant.verficationotpmsgtxt2);
            url = _config["default"].smsurl;
            urlwithnumber = url.concat(number);
            v3 = urlwithnumber.concat("&message=");
            v4 = v3.concat(_config["default"].verficationotpmsgtxt1);
            v5 = v4.concat(otp);
            msg = v5; //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
            console.log('smstemplate', msg);
            // let lasturl=data.concat(msg);
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
          } else {
            html = fs.readFileSync(path.resolve(__dirname, "../template/forgot.html"), "utf8");
            template = handlebars.compile(html);
            replacements = {
              otp: otp
            };
            htmlToSend = template(replacements);
            mailOptions = {
              from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
              // sender address
              to: checkdata.email,
              // list of receivers
              subject: 'Otp for forget password',
              // Subject line
              html: htmlToSend // plain text body
            };

            _mail["default"].sendMail(mailOptions, function (err, info) {
              if (err) console.log(err);else console.log(info);
            });
          }
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Otp send Sucessfully",
            userinfo: {
              'userid': checkdata.uid
            }
          });
        case 23:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "request not genrated please try later"
          });
        case 24:
          _context.next = 35;
          break;
        case 26:
          _context.next = 28;
          return _forgetpassword["default"].create(data);
        case 28:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 34;
            break;
          }
          if (data.phone) {
            _number = checkdata.phone; //  let url=Constant.smsurl;
            // let urlwithnumber = url.concat(number);
            //  let v1= urlwithnumber.concat('&template_id=');
            //     let v2=v1.concat(Constant.verficationotpid);
            //     let v3=v2.concat('&msgtxt=');
            //      let v4=v3.concat(Constant.verficationotpmsgtxt1);
            //    let v5= v4.concat(otp);
            //     let msg= v5.concat(Constant.verficationotpmsgtxt2);
            _url = _config["default"].smsurl;
            _urlwithnumber = _url.concat(_number);
            _v = _urlwithnumber.concat("&message=");
            _v2 = _v.concat(_config["default"].verficationotpmsgtxt1);
            _v3 = _v2.concat(otp);
            _msg = _v3; //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
            console.log('smstemplate', _msg);
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
          } else {
            html = fs.readFileSync(path.resolve(__dirname, "../template/forgot.html"), "utf8");
            template = handlebars.compile(html);
            replacements = {
              otp: otp
            };
            htmlToSend = template(replacements);
            _mailOptions = {
              from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
              // sender address
              to: checkdata.email,
              // list of receivers
              subject: 'Otp for forget password',
              // Subject line
              html: htmlToSend // plain text body
            };

            _mail["default"].sendMail(_mailOptions, function (err, info) {
              if (err) console.log(err);else console.log(info);
            });
          }
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Otp send Sucessfully",
            userinfo: {
              'userid': checkdata.uid
            }
          });
        case 34:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "request not genrated please try later"
          });
        case 35:
          _context.next = 38;
          break;
        case 37:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "User Not Exsit!"
          });
        case 38:
          _context.next = 44;
          break;
        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](0);
          console.log();
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0.message,
            message: "Something went wrong!"
          });
        case 44:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 40]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.verifyotp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var finddata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _forgetpassword["default"].findOne({
            where: {
              user_id: data.user_id,
              otp: data.otp,
              is_verified: '0'
            }
          });
        case 3:
          finddata = _context2.sent;
          if (!finddata) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "OTP verify Sucessfully"
          });
        case 8:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "OTP not valid!"
          });
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0.message,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, data, res) {
    var finddata, updatedata, finddata1, updatedata1;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _users["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          finddata = _context3.sent;
          if (!finddata) {
            _context3.next = 27;
            break;
          }
          data.updated_date = new Date();
          _context3.next = 8;
          return (0, _sha["default"])(data.password);
        case 8:
          data.password = _context3.sent;
          _context3.next = 11;
          return finddata.update(data);
        case 11:
          updatedata = _context3.sent;
          if (!updatedata) {
            _context3.next = 23;
            break;
          }
          _context3.next = 15;
          return _forgetpassword["default"].findOne({
            where: {
              user_id: id
            }
          });
        case 15:
          finddata1 = _context3.sent;
          data.is_verified = 1;
          _context3.next = 19;
          return finddata1.update(data);
        case 19:
          updatedata1 = _context3.sent;
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Password update Successfully"
          });
        case 23:
          console.log("come");
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "someting went wrong Please try later"
          });
        case 25:
          _context3.next = 28;
          break;
        case 27:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "User not found!"
          });
        case 28:
          _context3.next = 33;
          break;
        case 30:
          _context3.prev = 30;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0.message,
            message: "Something went wrong!"
          });
        case 33:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 30]]);
  }));
  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();