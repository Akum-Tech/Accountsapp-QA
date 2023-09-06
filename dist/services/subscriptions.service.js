"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _subscription = _interopRequireDefault(require("../models/subscription"));
var _subscriptionOrder = _interopRequireDefault(require("../models/subscriptionOrder"));
var _statusCode = require("../utility/statusCode");
var _sequelize = _interopRequireDefault(require("sequelize"));
var _otpGenerator = _interopRequireDefault(require("otp-generator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
require("@babel/polyfill");
var _company = _interopRequireDefault(require("../models/company"));
var _users = _interopRequireDefault(require("../models/users"));
var _subscriptionTransction = _interopRequireDefault(require("../models/subscriptionTransction"));
var _path = _interopRequireDefault(require("path"));
var _mail = _interopRequireDefault(require("../utility/mail"));
var _config = _interopRequireDefault(require("../constant/config"));
var _organizationInfo = _interopRequireDefault(require("../models/organizationInfo"));
var _taxes = _interopRequireDefault(require("../models/taxes"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
var fs = require('fs');
var pdf = require('html-pdf');
var Razorpay = require("razorpay");
var crypto = require("crypto");
var axios = require("axios");
var converter = require('number-to-words');
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _subscription["default"].findOne({
            where: {
              id: id
            },
            include: [{
              model: _taxes["default"]
            }]
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription fetch Successfully",
            Subscription: createdata
          });
        case 8:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription not Found!",
            Subscription: createdata ? createdata : {}
          });
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.checkPlanExpired = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var getUser;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _users["default"].findOne({
            where: {
              id: data.data.id
            }
          });
        case 3:
          getUser = _context2.sent;
          if (!getUser) {
            _context2.next = 12;
            break;
          }
          if (!(getUser.dataValues.subscription_end_date && new Date(getUser.dataValues.subscription_end_date + ' 23:59:00').getTime() > new Date().getTime())) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription fetch Successfully",
            Subscription: true,
            subscription_date: getUser.dataValues.subscription_end_date
          });
        case 9:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Your subscription plan expired",
            Subscription: false
          });
        case 10:
          _context2.next = 13;
          break;
        case 12:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Subscription not Found!",
            Subscription: false
          });
        case 13:
          _context2.next = 19;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.log("e", _context2.t0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _subscription["default"].findAll({
            include: [{
              model: _taxes["default"]
            }],
            order: [
            // Will escape username and validate DESC against a list of valid direction parameters
            ["months", "ASC"]]
          });
        case 3:
          createdata = _context3.sent;
          if (!(createdata.length > 0)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription fetch Successfully",
            Subscription: createdata
          });
        case 8:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription not Found!",
            Subscription: createdata ? createdata : []
          });
        case 9:
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log("e", _context3.t0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getActiveAllData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _subscription["default"].findAll({
            where: {
              status: '1'
            },
            include: [{
              model: _taxes["default"]
            }],
            order: [["months", "ASC"]]
          });
        case 3:
          createdata = _context4.sent;
          if (!(createdata.length > 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription fetch Successfully",
            Subscription: createdata
          });
        case 8:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription not Found!",
            Subscription: createdata ? createdata : []
          });
        case 9:
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, res) {
    var checkdata, createdata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _subscription["default"].findOne({
            where: {
              months: data.months
            }
          });
        case 3:
          checkdata = _context5.sent;
          if (!checkdata) {
            _context5.next = 12;
            break;
          }
          _context5.next = 7;
          return (0, _statusCode.checkCode)("validation");
        case 7:
          _context5.t0 = _context5.sent;
          _context5.t1 = checkdata;
          return _context5.abrupt("return", {
            statusCode: _context5.t0,
            success: false,
            message: "Already Exist",
            Subscription: _context5.t1
          });
        case 12:
          _context5.next = 14;
          return _subscription["default"].create(data);
        case 14:
          createdata = _context5.sent;
          if (!createdata) {
            _context5.next = 19;
            break;
          }
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription Created Successfully",
            Subscription: createdata
          });
        case 19:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Something went wrong!",
            Subscription: createdata
          });
        case 20:
          _context5.next = 25;
          break;
        case 22:
          _context5.prev = 22;
          _context5.t2 = _context5["catch"](0);
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context5.t2,
            message: "Something went wrong!"
          });
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _subscription["default"].destroy({
            where: {
              id: id
            }
          });
        case 3:
          deletedata = _context6.sent;
          if (!deletedata) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription Delete Successfully",
            Subscription: deletedata
          });
        case 8:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            Subscription: deletedata
          });
        case 9:
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, data, res) {
    var finddata, updatedata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _subscription["default"].findOne({
            where: {
              id: id
            }
          });
        case 3:
          finddata = _context7.sent;
          if (!finddata) {
            _context7.next = 15;
            break;
          }
          _context7.next = 7;
          return finddata.update(data);
        case 7:
          updatedata = _context7.sent;
          if (!updatedata) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription update Successfully",
            Subscription: updatedata
          });
        case 12:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            Subscription: updatedata
          });
        case 13:
          _context7.next = 17;
          break;
        case 15:
          console.log("come");
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Subscription not found!",
            Subscription: finddata ? finddata : {}
          });
        case 17:
          _context7.next = 22;
          break;
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 19]]);
  }));
  return function (_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.order = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var finddata, data, recpit_id, rzp, options;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log("ordercreate", req);
          _context9.next = 4;
          return _subscription["default"].findOne({
            where: {
              id: req.body.id
            }
          });
        case 4:
          finddata = _context9.sent;
          data = new _subscriptionOrder["default"]();
          recpit_id = Math.random().toString().substr(2, 8);
          rzp = new Razorpay({
            key_id: _config["default"].razorpay_key_id,
            key_secret: _config["default"].razorpay_key_secret
          });
          options = {
            amount: finddata.total * 100,
            currency: "INR",
            receipt: recpit_id,
            payment_capture: "0"
          };
          rzp.orders.create(options, /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resp, order) {
              var createdata;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!(resp == null && order.id != null)) {
                      _context8.next = 10;
                      break;
                    }
                    console.log("responce", resp);
                    console.log("order", order);
                    //let DataForUpdate = await  SubscriptionOrder.findOne({ where: {id: createdata.dataValues.id}});
                    // data.razorpay_order_id = order.id;
                    data = {
                      user_id: req.decoded.data.uid,
                      amount: finddata.basic,
                      subscription_id: finddata.id,
                      recpit_id: recpit_id,
                      razorpay_order_id: order.id,
                      gst: finddata.gst,
                      total: finddata.total,
                      status: "Pending",
                      name: req.body.name ? req.body.name : '',
                      email: req.body.email ? req.body.email : '',
                      address: req.body.address ? req.body.address : '',
                      gst_number: req.body.name ? req.body.gst_number : ''
                    };
                    _context8.next = 6;
                    return _subscriptionOrder["default"].create(data);
                  case 6:
                    createdata = _context8.sent;
                    //console.log(createdata.dataValues.id);
                    //let dbop = await DataForUpdate.update(data);
                    res.status(200).json({
                      message: "Order Created Successfully",
                      success: true,
                      statuscode: 200,
                      data: order
                    });
                    _context8.next = 14;
                    break;
                  case 10:
                    _context8.next = 12;
                    return (0, _statusCode.checkCode)("error");
                  case 12:
                    _context8.t0 = _context8.sent;
                    return _context8.abrupt("return", {
                      statusCode: _context8.t0,
                      success: false,
                      message: "Something went wrong!"
                    });
                  case 14:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x18, _x19) {
              return _ref9.apply(this, arguments);
            };
          }());
          _context9.next = 19;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          _context9.next = 16;
          return (0, _statusCode.checkCode)("error");
        case 16:
          _context9.t1 = _context9.sent;
          _context9.t2 = _context9.t0.message;
          return _context9.abrupt("return", {
            statusCode: _context9.t1,
            success: false,
            error: _context9.t2,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return function (_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
exports.verifyPayment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req) {
    var DataForUpdate, data, finddata, user, d, transctiondata, finSubscription, url, urlwithnumber, v3, v4, v5, v6, v7, v8, v9, msg, findInfo, Orginfo, islocal, Orginfogst, recivergst, options, file;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _subscriptionOrder["default"].findOne({
            where: {
              razorpay_order_id: req.body.razorpay_order_id
            }
          });
        case 3:
          DataForUpdate = _context11.sent;
          if (!(req.body.razorpay_payment_id && req.body.razorpay_signature)) {
            _context11.next = 56;
            break;
          }
          data = {
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_signature: req.body.razorpay_signature,
            status: "success"
          };
          _context11.next = 8;
          return DataForUpdate.update(data);
        case 8:
          console.log("ddd", DataForUpdate);
          _context11.next = 11;
          return _subscription["default"].findOne({
            where: {
              id: DataForUpdate.subscription_id
            },
            include: [{
              model: _taxes["default"]
            }]
          });
        case 11:
          finddata = _context11.sent;
          _context11.next = 14;
          return _users["default"].findOne({
            where: {
              uid: DataForUpdate.user_id
            }
          });
        case 14:
          user = _context11.sent;
          if (!user) {
            _context11.next = 49;
            break;
          }
          if (!(new Date(user.subscription_end_date) > new Date())) {
            _context11.next = 23;
            break;
          }
          d = new Date(user.subscription_end_date);
          d.setMonth(d.getMonth() + finddata.months);
          _context11.next = 21;
          return _users["default"].update({
            subscription_end_date: d
          }, {
            where: {
              id: user.id
            }
          });
        case 21:
          _context11.next = 27;
          break;
        case 23:
          d = new Date();
          d.setMonth(d.getMonth() + finddata.months);
          _context11.next = 27;
          return user.update({
            subscription_end_date: d
          }, {
            where: {
              id: user.id
            }
          });
        case 27:
          transctiondata = null;
          if (user.subscription_end_date) {
            transctiondata = {
              user_id: user.uid,
              type: 'paid',
              entry_by: 'self',
              subscription_start: new Date(user.subscription_end_date),
              subscription_end: d
            };
          } else {
            transctiondata = {
              user_id: user.uid,
              type: 'paid',
              entry_by: 'self',
              subscription_start: new Date(),
              subscription_end: d
            };
          }
          _context11.next = 31;
          return _subscriptionTransction["default"].create(transctiondata);
        case 31:
          _context11.next = 33;
          return _subscription["default"].findOne({
            where: {
              id: DataForUpdate.subscription_id
            }
          });
        case 33:
          finSubscription = _context11.sent;
          if (DataForUpdate && DataForUpdate.dataValues && DataForUpdate.dataValues.status == "success") {
            url = _config["default"].smsurl;
            urlwithnumber = url.concat(user.phone);
            v3 = urlwithnumber.concat("&message=");
            v4 = v3.concat(_config["default"].purchasemsgtxt1);
            v5 = v4.concat(DataForUpdate.total);
            v6 = v5.concat(_config["default"].purchasemsgtxt2);
            v7 = v6.concat(finSubscription.months + " months");
            v8 = v7.concat(_config["default"].purchasemsgtxt3);
            v9 = v8.concat((0, _moment["default"])(user.subscription_end_date).format('DD-MMM-YYYY'));
            msg = v9.concat(_config["default"].purchasemsgtxt4 + _config["default"].websiteurl); //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
            console.log("smstemplate", msg);

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
          }
          console.log("finddata.dataValues1", finddata.dataValues);
          if (!(DataForUpdate && DataForUpdate.dataValues && DataForUpdate.dataValues.status == "success" && DataForUpdate.dataValues.email)) {
            _context11.next = 46;
            break;
          }
          _context11.next = 39;
          return _organizationInfo["default"].findAll({});
        case 39:
          findInfo = _context11.sent;
          Orginfo = findInfo.length > 0 ? findInfo[0].dataValues : {};
          islocal = true;
          if (Orginfo.gst_number && DataForUpdate.dataValues.gst_number) {
            Orginfogst = Orginfo.gst_number.substring(0, 2);
            recivergst = DataForUpdate.dataValues.gst_number.substring(0, 2);
            console.log("Orginfogst", Orginfogst, "recivergst", recivergst);
            if (Orginfogst !== recivergst) {
              islocal = false;
            }
          }
          options = {
            format: 'A4'
          };
          file = "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\"> <head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title></title> <link href=\"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap\" rel=\"stylesheet\"> <style>@page{size: auto; margin: 0;}b{font-size: 11px;}th{font-size: 12px;}</style> </head> <body> <div style=\"width:100%; max-width: 1000px; margin:auto;\"> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\" > <tbody> <tr> <td> <table cellpadding=\"0\" cellspacing=\"0\" height=\"auto\" width=\"100%\" style=\"width: 100%; margin:auto;\"> <tr> <td align=\"center\" style=\"border: 1px solid #414141; border-collapse: collapse; width: 100%; margin-top:5px;font-family: 'Lato', sans-serif;\"> <h4 style=\"margin:5px 0; font-size:15px;\">TAX INVOICE</h4> </td></tr><tr> <td class=\"emailHead\" align=\"center\" style=\"padding: 0;border-left: 1px solid #414141;border-right: 1px solid #414141;\"> <img src=\"http://www.myaccountsapp.in/assets/images/logofinal500.png\" width=\"100\"> </td></tr><table style=\"border: 1px solid #414141; border-collapse: collapse; width: 100%; font-family: 'Lato', sans-serif;\"> <thead> <tr> <th style=\"border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;\">Seller</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;\">Buyer</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;\">Invoice No.</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;\">Date</th> </tr></thead> <thead> <tr> <td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;\"> <h3 style=\"margin: 0;\">".concat(Orginfo && Orginfo.company_name ? Orginfo.company_name : '', "</h3> <p style=\"margin: 5px 0;\">").concat(Orginfo && Orginfo.address ? Orginfo.address : '', "</p>").concat(Orginfo.gst_number ? " <p style=\"margin: 5px 0;\">GSTIN No:- ".concat(Orginfo.gst_number, "</p>") : '').concat(Orginfo.cin_number ? " <p style=\"margin: 5px 0;\">CIN No:- ".concat(Orginfo.cin_number, "</p>") : '', "</td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;\"> <h3 style=\"margin: 0;\">").concat(DataForUpdate.dataValues && DataForUpdate.dataValues.name ? DataForUpdate.dataValues.name : '', "</h3> ").concat(DataForUpdate.dataValues && DataForUpdate.dataValues.address ? " <p style=\"margin: 5px 0;\">DataForUpdate.dataValues.address</p>" : '').concat(DataForUpdate.dataValues && DataForUpdate.dataValues.gst_number ? " <p style=\"margin: 5px 0;\">GSTIN No:- ".concat(DataForUpdate.dataValues.gst_number, "</p>") : '', "<p style=\"margin: 5px 0;\">Place of supply:- </p></td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;\">XXXXXX</td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;\">").concat((0, _moment["default"])(new Date(DataForUpdate.dataValues.creation_date)).format('DD-MMM-YYYY'), "</td></tr></thead> </table> <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <thead> <tr> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Description of Goods/Services</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Units</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Discount</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">GST</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Amount</th> </tr></thead> <tbody> <tr> <td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\">").concat(finddata.dataValues.title ? finddata.dataValues.title : '', "</td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>", '1', "</b> </td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> ", 0, "</td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(finddata.dataValues.tax.dataValues.tax).toFixed(2) + "%" : '', "</b> </td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</b> </td></tr></tbody> </table> <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: left;width: 59.8%;\" colspan=\"3\"> <p style=\"margin: 3px 0;font-size: 12px;font-weight: 400;\">Amount Chargeable (in words):</p><p style=\"margin: 0;font-size: 12px;text-transform: capitalize;\"><b>").concat(finddata.dataValues.total ? converter.toWords(finddata.dataValues.total) + " only" : '', "</b></p></th> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;\" colspan=\"2\"> <b>Total</b> </th> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;\"> <b>").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</b> </th> </tr></table> ").concat(islocal ? " <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Services Accounting Code</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Taxable Value</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>Central (CGST)</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>State (SGST)</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Total Invoice Value</b> </td></tr><tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td></tr><tr> <td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ".concat(Orginfo && Orginfo.service_code ? Orginfo.service_code : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.basic ? "Rs." + Number(finddata.dataValues.basic).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(Number(finddata.dataValues.tax.dataValues.tax) / 2) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\">").concat(finddata.dataValues.gst ? "Rs." + Number(Number(finddata.dataValues.gst) / 2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(Number(finddata.dataValues.tax.dataValues.tax) / 2) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\">").concat(finddata.dataValues.gst ? "Rs." + Number(Number(finddata.dataValues.gst) / 2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</td></tr><tr> ").concat(Orginfo && Orginfo.pan_number ? " <td style=\"border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;\" colspan=\"4\"> <b>Company's PAN: ".concat(Orginfo.pan_number, "</b> </td>") : null, "<td style=\"border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;\" colspan=\"3\"> <b style=\"font-size: 11px;\">").concat(Orginfo && Orginfo.company_name ? 'For ' + Orginfo.company_name : '', "</b> <p style=\"font-size: 12px; margin: 0; margin-bottom: 30px;\">Authorised Signatory</p><img src=\"http://www.myaccountsapp.in/assets/images/intrahop.png\" width=\"60\"> </td></td></tr></table> ") : " <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\" colspan=\"3\"> <b>Services Accounting Code</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Taxable Value</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>Integrated Tax</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Total Invoice Value</b> </td></tr><tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td></tr><tr> <td colspan=\"3\" style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ".concat(Orginfo && Orginfo.service_code ? Orginfo.service_code : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.basic ? "Rs." + Number(finddata.dataValues.basic).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? "Rs." + Number(finddata.dataValues.tax.dataValues.tax) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.gst ? "Rs." + Number(finddata.dataValues.gst).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</td></tr><tr> ").concat(Orginfo && Orginfo.pan_number ? " <td style=\"border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;\" colspan=\"4\"> <b>Company's PAN: ".concat(Orginfo.pan_number, "</b> </td>") : null, "<td style=\"border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;\" colspan=\"3\"> <b style=\"font-size: 11px;\">").concat(Orginfo && Orginfo.company_name ? 'For ' + Orginfo.company_name : '', "</b> <p style=\"font-size: 12px; margin: 0; margin-bottom: 30px;\">Authorised Signatory</p><img src=\"http://www.myaccountsapp.in/assets/images/intrahop.png\" width=\"60\"> </td></td></tr></table> "), "<table style=\"margin-top:15px; margin-bottom: 15px; font-family: 'Lato', sans-serif;\"> <tr style=\"vertical-align:top;\"> <td> <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">For Support</p>").concat(Orginfo && Orginfo.phone_number ? " <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">Call: ".concat(Orginfo.phone_number, "</p>") : '').concat(Orginfo && Orginfo.email ? " <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">Email: ".concat(Orginfo.email, "</p>") : '', "<p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">*This is a system generated Invoice</p></td></tr></table> </td></tr></tbody> </table> </div></body></html>");
          pdf.create(file, options).toFile(_path["default"].join(__dirname, '../../uploads/invoice/') + DataForUpdate.dataValues.id + DataForUpdate.dataValues.recpit_id + '.pdf', /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(err, pdfdata) {
              var messgae, msg, maildata;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    if (!(pdfdata && pdfdata.filename)) {
                      _context10.next = 8;
                      break;
                    }
                    messgae = "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\"> <head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title></title> <link href=\"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap\" rel=\"stylesheet\"> </head> <body> <div style=\"width:100%; max-width: 605px; margin:auto; background:#F4F5FB; padding: 20px 15px;\"> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\" bgcolor=\"#fff\" style=\"padding:15px\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"auto\" width=\"100%\" style=\"max-width: 605px; width: 100%; margin:auto;\"> <tr> <td class=\"emailHead\" align=\"center\" style=\"padding: 0;\"> <img src=\"http://www.myaccountsapp.in/assets/images/gstlogo.png\" width=\"140\" style=\"border-radius:25px;\"> <h2 style=\"color: #111; letter-spacing: 0.5px; font-size: 20px; line-height: 26px; margin: 15px 0 0 0; font-family: 'Lato', sans-serif; font-weight: 700;\">Thank you for your purchase</h2> <h4 style=\"color:#747474; margin: 10px 0; letter-spacing: 0.5px; font-size: 16px; font-weight: 400; font-family: 'Lato', sans-serif;\">Your purchase details as below</h4> </td></tr><table style=\"border-collapse: collapse; width: 100%; text-align: center; margin-top:15px;font-family: 'Lato', sans-serif;\"> <thead> <tr> <th style=\"border: 1px solid #ccc; padding: 5px;\">Date</th> <th style=\"border: 1px solid #ccc; padding: 5px;\">Particulars</th> <th style=\"border: 1px solid #ccc; padding: 5px;\">Basic Value</th> <th style=\"border: 1px solid #ccc; padding: 5px;\">Tax</th> <th style=\"border: 1px solid #ccc; padding: 5px;\">Total Value</th> </tr></thead> <thead> <tr> <td style=\"border: 1px solid #ccc;padding: 5px;font-size: 13px;\">".concat((0, _moment["default"])(new Date(DataForUpdate.dataValues.creation_date)).format('DD-MMM-YYYY'), "</td><td style=\"border: 1px solid #ccc;padding: 5px;font-size: 13px;\">").concat(finddata.dataValues.title, "</td><td style=\"border: 1px solid #ccc;padding: 5px;font-size: 13px;\">\u20B9 ").concat(finddata.dataValues.basic, "</td><td style=\"border: 1px solid #ccc;padding: 5px;font-size: 13px;\">\u20B9 ").concat(finddata.dataValues.gst, "</td><td style=\"border: 1px solid #ccc;padding: 5px;font-size: 13px;\">\u20B9 ").concat(finddata.dataValues.total, "</td></tr></thead> </table> <table style=\"margin-top:15px;font-family: 'Lato', sans-serif;\"> <thead> <tr> <td style=\"font-size: 15px; padding-top:10px;\"><b>Paid through : </b></td></tr><tr> <td style=\"font-size: 15px; padding-top:10px;\">You received this email because you made a purchase on <a target=\"_blank\" href=\"http://www.myaccountsapp.in/\">MYACCOUNTSAPP.IN</a></td></tr><tr> <td style=\"font-size: 15px; padding-top:10px;\"> Please contact <a style=\"color:#1a1e57\" href=\"mailto:connect@myaccountsapp.in\">connect@myaccountsapp.in</a> or call <a style=\"color:#1a1e57\" href=\"tel:+917970020909\">+91-7970020909</a> </td></tr></thead> </table> <table style=\"margin-top:20px;font-family: 'Lato', sans-serif;\"> <tr style=\"vertical-align:top;\"> <td> <img src=\"http://www.myaccountsapp.in/assets/images/gstlogo.png\" width=\"120\"> </td><td style=\"padding-left: 15px;\"> <h4 style=\"margin-bottom:10px;margin-top:0;\">Made for you with passion</h4> <p style=\"margin-bottom:6px; margin-top: 0; font-size: 14px;\">By Intrahop Systech Team</p><p style=\"margin-bottom:6px; margin-top: 0; font-size: 14px;\">Plot No 287, PU4, Scheme No 54,</p><p style=\"margin-bottom:6px; margin-top: 0; font-size: 14px;\">Behind C21 Mall, </p><p style=\"margin-bottom:6px; margin-top: 0; font-size: 14px;\">Indore MP 452010 IN</p></td></tr></table> </td></tr></tbody> </table> </div><table width=\"320\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" style=\"margin-top: 30px;\"> <tr> <td align=\"center\" width=\"50\"> <a href=\"#\" target=\"_blank\"><img src=\"http://www.myaccountsapp.in/assets/images/fb.png\" style=\"width:12px;max-width:21px;\"></a> </td><td align=\"center\" width=\"50\"> <a href=\"#\" target=\"_blank\"><img src=\"http://www.myaccountsapp.in/assets/images/insta.png\" style=\"width:25px;max-width:25px;\"></a> </td><td align=\"center\" width=\"50\"> <a href=\"#\" target=\"_blank\"><img src=\"http://www.myaccountsapp.in/assets/images/in.png\" style=\"width:19px;max-width:19px;\"></a> </td></tr></table> </body></html>");
                    msg = {
                      html: messgae,
                      createTextFromHtml: true,
                      from: "".concat(_config["default"].App_name, " ").concat(_mail["default"].options.auth.user),
                      to: DataForUpdate.dataValues.email,
                      subject: "invoice confirmation",
                      attachments: [{
                        filename: "".concat(DataForUpdate.dataValues.id).concat(DataForUpdate.dataValues.recpit_id, ".pdf"),
                        path: pdfdata.filename
                      }]
                    };
                    _context10.next = 5;
                    return _mail["default"].sendMail(msg);
                  case 5:
                    maildata = _context10.sent;
                    console.log("maile data", maildata);
                    if (maildata && maildata.messageId) {
                      console.log("success fully send mail");
                    }
                  case 8:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x21, _x22) {
              return _ref11.apply(this, arguments);
            };
          }());
        case 46:
          return _context11.abrupt("return", {
            statusCode: 200,
            success: true,
            message: "Order update Successfully",
            Subscription: DataForUpdate
          });
        case 49:
          _context11.next = 51;
          return (0, _statusCode.checkCode)("error");
        case 51:
          _context11.t0 = _context11.sent;
          _context11.t1 = e.message;
          return _context11.abrupt("return", {
            statusCode: _context11.t0,
            success: false,
            error: _context11.t1,
            message: "User Not valid"
          });
        case 54:
          _context11.next = 61;
          break;
        case 56:
          _context11.next = 58;
          return (0, _statusCode.checkCode)("error");
        case 58:
          _context11.t2 = _context11.sent;
          _context11.t3 = e.message;
          return _context11.abrupt("return", {
            statusCode: _context11.t2,
            success: false,
            error: _context11.t3,
            message: "Something went wrong!"
          });
        case 61:
          _context11.next = 71;
          break;
        case 63:
          _context11.prev = 63;
          _context11.t4 = _context11["catch"](0);
          console.log("e", _context11.t4);
          _context11.next = 68;
          return (0, _statusCode.checkCode)("error");
        case 68:
          _context11.t5 = _context11.sent;
          _context11.t6 = _context11.t4.message;
          return _context11.abrupt("return", {
            statusCode: _context11.t5,
            success: false,
            error: _context11.t6,
            message: "Something went wrong!"
          });
        case 71:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 63]]);
  }));
  return function (_x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.orderListByUser = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var finddata;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          console.log("orderreqlist", req.body);
          _context12.next = 4;
          return _subscriptionOrder["default"].findAll({
            where: {
              user_id: req.body.id,
              status: 'success'
            },
            order: [['creation_date', 'DESC']]
          });
        case 4:
          finddata = _context12.sent;
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Order List",
            Subscription: finddata
          });
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: _context12.t0.message
          });
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.orderList = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req) {
    var finddata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return _subscriptionOrder["default"].findAll();
        case 2:
          finddata = _context13.sent;
          return _context13.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Order List",
            Subscription: finddata
          });
        case 4:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x25) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getDownload = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, res) {
    var createdata, finddata, findInfo, Orginfo, islocal, Orginfogst, recivergst, options, file;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _subscriptionOrder["default"].findOne({
            where: {
              id: data.id
            }
          });
        case 3:
          createdata = _context14.sent;
          _context14.next = 6;
          return _subscription["default"].findOne({
            where: {
              id: createdata.dataValues.subscription_id
            },
            include: [{
              model: _taxes["default"]
            }]
          });
        case 6:
          finddata = _context14.sent;
          _context14.next = 9;
          return _organizationInfo["default"].findAll({});
        case 9:
          findInfo = _context14.sent;
          if (!(createdata && createdata.dataValues && createdata.dataValues.status == "success")) {
            _context14.next = 24;
            break;
          }
          if (!(createdata && finddata)) {
            _context14.next = 21;
            break;
          }
          console.log("findInfo", createdata.dataValues);
          Orginfo = findInfo.length > 0 ? findInfo[0].dataValues : {};
          islocal = true;
          if (Orginfo.gst_number && createdata.dataValues.gst_number) {
            Orginfogst = Orginfo.gst_number.substring(0, 2);
            recivergst = createdata.dataValues.gst_number.substring(0, 2);
            console.log("Orginfogst", Orginfogst, "recivergst", recivergst);
            if (Orginfogst !== recivergst) {
              islocal = false;
            }
          }
          options = {
            format: 'A4'
          };
          file = "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\"> <head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title></title> <link href=\"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap\" rel=\"stylesheet\"> <style>@page{size: auto; margin: 0;}b{font-size: 11px;}th{font-size: 12px;}</style> </head> <body> <div style=\"width:100%; max-width: 1000px; margin:auto;\"> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\" > <tbody> <tr> <td> <table cellpadding=\"0\" cellspacing=\"0\" height=\"auto\" width=\"100%\" style=\"width: 100%; margin:auto;\"> <tr> <td align=\"center\" style=\"border: 1px solid #414141; border-collapse: collapse; width: 100%; margin-top:5px;font-family: 'Lato', sans-serif;\"> <h4 style=\"margin:5px 0; font-size:15px;\">TAX INVOICE</h4> </td></tr><tr> <td class=\"emailHead\" align=\"center\" style=\"padding: 0;border-left: 1px solid #414141;border-right: 1px solid #414141;\"> <img src=\"http://www.myaccountsapp.in/assets/images/logofinal500.png\" width=\"100\"> </td></tr><table style=\"border: 1px solid #414141; border-collapse: collapse; width: 100%; font-family: 'Lato', sans-serif;\"> <thead> <tr> <th style=\"border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;\">Seller</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;\">Buyer</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;\">Invoice No.</th> <th style=\"border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;\">Date</th> </tr></thead> <thead> <tr> <td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;\"> <h3 style=\"margin: 0;\">".concat(Orginfo && Orginfo.company_name ? Orginfo.company_name : '', "</h3> <p style=\"margin: 5px 0;\">").concat(Orginfo && Orginfo.address ? Orginfo.address : '', "</p>").concat(Orginfo.gst_number ? " <p style=\"margin: 5px 0;\">GSTIN No:- ".concat(Orginfo.gst_number, "</p>") : '').concat(Orginfo.cin_number ? " <p style=\"margin: 5px 0;\">CIN No:- ".concat(Orginfo.cin_number, "</p>") : '', "</td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;\"> <h3 style=\"margin: 0;\">").concat(createdata.dataValues && createdata.dataValues.name ? createdata.dataValues.name : '', "</h3> ").concat(createdata.dataValues && createdata.dataValues.address ? " <p style=\"margin: 5px 0;\">createdata.dataValues.address</p>" : '').concat(createdata.dataValues && createdata.dataValues.gst_number ? " <p style=\"margin: 5px 0;\">GSTIN No:- ".concat(createdata.dataValues.gst_number, "</p>") : '', "<p style=\"margin: 5px 0;\">Place of supply:- </p></td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;\">XXXXXX</td><td style=\"border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;\">").concat((0, _moment["default"])(new Date(createdata.dataValues.creation_date)).format('DD-MMM-YYYY'), "</td></tr></thead> </table> <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <thead> <tr> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Description of Goods/Services</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Units</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Discount</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">GST</th> <th style=\"border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;\">Amount</th> </tr></thead> <tbody> <tr> <td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\">").concat(finddata.dataValues.title ? finddata.dataValues.title : '', "</td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>", '1', "</b> </td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> ", 0, "</td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(finddata.dataValues.tax.dataValues.tax) + "%" : '', "</b> </td><td style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;\"> <b>").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</b> </td></tr></tbody> </table> <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: left;width: 59.8%;\" colspan=\"3\"> <p style=\"margin: 3px 0;font-size: 12px;font-weight: 400;\">Amount Chargeable (in words):</p><p style=\"margin: 0;font-size: 12px;text-transform: capitalize;\"><b>").concat(finddata.dataValues.total ? converter.toWords(finddata.dataValues.total) + " only" : '', "</b></p></th> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;\" colspan=\"2\"> <b>Total</b> </th> <th style=\"border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;\"> <b>").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</b> </th> </tr></table> ").concat(islocal ? " <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Services Accounting Code</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Taxable Value</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>Central (CGST)</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>State (SGST)</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Total Invoice Value</b> </td></tr><tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td></tr><tr> <td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ".concat(Orginfo && Orginfo.service_code ? Orginfo.service_code : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.basic ? "Rs." + Number(finddata.dataValues.basic).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(Number(finddata.dataValues.tax.dataValues.tax) / 2) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\">").concat(finddata.dataValues.gst ? "Rs." + Number(Number(finddata.dataValues.gst) / 2).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(Number(finddata.dataValues.tax.dataValues.tax) / 2) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\">").concat(finddata.dataValues.gst ? "Rs." + Number(Number(finddata.dataValues.gst) / 2).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;\"> ").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</td></tr><tr> ").concat(Orginfo && Orginfo.pan_number ? " <td style=\"border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;\" colspan=\"4\"> <b>Company's PAN: ".concat(Orginfo.pan_number, "</b> </td>") : null, "<td style=\"border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;\" colspan=\"3\"> <b style=\"font-size: 11px;\">").concat(Orginfo && Orginfo.company_name ? 'For ' + Orginfo.company_name : '', "</b> <p style=\"font-size: 12px; margin: 0; margin-bottom: 30px;\">Authorised Signatory</p><img src=\"http://www.myaccountsapp.in/assets/images/intrahop.png\" width=\"60\"></td></td></tr></table> ") : " <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;\"> <tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\" colspan=\"3\"> <b>Services Accounting Code</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Taxable Value</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" colspan=\"2\"> <b>Integrated Tax</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\" rowspan=\"2\"> <b>Total Invoice Value</b> </td></tr><tr> <td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Rate</b> </td><td style=\"border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;\"> <b>Amount</b> </td></tr><tr> <td colspan=\"3\" style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ".concat(Orginfo && Orginfo.service_code ? Orginfo.service_code : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.basic ? "Rs." + Number(finddata.dataValues.basic).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax ? Number(finddata.dataValues.tax.dataValues.tax) + "%" : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.gst ? "Rs." + Number(finddata.dataValues.gst).toFixed(2) : '', "</td><td style=\"border: 1px solid #414141; padding: 5px;text-align: center;\"> ").concat(finddata.dataValues.total ? "Rs." + Number(finddata.dataValues.total).toFixed(2) : '', "</td></tr><tr> ").concat(Orginfo && Orginfo.pan_number ? " <td style=\"border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;\" colspan=\"4\"> <b>Company's PAN: ".concat(Orginfo.pan_number, "</b> </td>") : null, "<td style=\"border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;\" colspan=\"3\"> <b style=\"font-size: 11px;\">").concat(Orginfo && Orginfo.company_name ? 'For ' + Orginfo.company_name : '', "</b> <p style=\"font-size: 12px; margin: 0; margin-bottom: 30px;\">Authorised Signatory</p><img src=\"http://www.myaccountsapp.in/assets/images/intrahop.png\" width=\"60\"> </td></td></tr></table> "), "<table style=\"margin-top:15px; margin-bottom: 15px; font-family: 'Lato', sans-serif;\"> <tr style=\"vertical-align:top;\"> <td> <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">For Support</p>").concat(Orginfo && Orginfo.phone_number ? " <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">Call: ".concat(Orginfo.phone_number, "</p>") : '').concat(Orginfo && Orginfo.email ? " <p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">Email: ".concat(Orginfo.email, "</p>") : '', "<p style=\"margin-bottom:5px; margin-top: 0; font-size: 11px;\">*This is a system generated Invoice</p></td></tr></table> </td></tr></tbody> </table> </div></body></html>");
          pdf.create(file, options).toFile(_path["default"].join(__dirname, '../../uploads/invoice/') + createdata.dataValues.id + createdata.dataValues.recpit_id + '.pdf', function (err, data) {
            if (data && data.filename) {
              console.log("data.filename", data);
              res.send({
                statusCode: res.statusCode,
                success: true,
                message: "PDF path",
                filepath: "uploads/invoice/".concat(createdata.dataValues.id).concat(createdata.dataValues.recpit_id, ".pdf")
              });
            } else {
              res.send({
                statusCode: res.statusCode,
                success: false,
                message: "PDF not genrated please try later!"
              });
            }
            return;
          });
          _context14.next = 22;
          break;
        case 21:
          return _context14.abrupt("return", {
            statusCode: 404,
            success: false,
            message: "Order not Found!"
          });
        case 22:
          _context14.next = 25;
          break;
        case 24:
          return _context14.abrupt("return", {
            statusCode: 404,
            success: false,
            message: "Order status is pendding"
          });
        case 25:
          _context14.next = 31;
          break;
        case 27:
          _context14.prev = 27;
          _context14.t0 = _context14["catch"](0);
          console.log("e", _context14.t0);
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context14.t0,
            message: "Something went wrong!"
          });
        case 31:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 27]]);
  }));
  return function (_x26, _x27) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getRemove = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _subscriptionOrder["default"].findOne({
            where: {
              id: data.id
            }
          });
        case 3:
          createdata = _context15.sent;
          if (!createdata) {
            _context15.next = 8;
            break;
          }
          if (fs.existsSync(_path["default"].join(__dirname, '../../uploads/invoice/') + createdata.dataValues.id + createdata.dataValues.recpit_id + '.pdf')) {
            fs.unlink(_path["default"].join(__dirname, '../../uploads/invoice/') + createdata.dataValues.id + createdata.dataValues.recpit_id + '.pdf', function (err) {
              console.log("err", err);
              if (err) {
                res.send({
                  statusCode: res.statusCode,
                  success: false,
                  message: "PDF not remove!"
                });
              }
              ;
              res.send({
                statusCode: res.statusCode,
                success: true,
                message: "file deleted"
              });
            });
          } else {
            res.send({
              statusCode: res.statusCode,
              success: true,
              message: "file alredy deleted"
            });
          }
          _context15.next = 9;
          break;
        case 8:
          return _context15.abrupt("return", {
            statusCode: 404,
            success: false,
            message: "Order not Found!"
          });
        case 9:
          _context15.next = 14;
          break;
        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          return _context15.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context15.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 11]]);
  }));
  return function (_x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();
exports.subscribed = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(data, res) {
    var object, _creation_date, findsubscribed;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          object = {};
          if (data.start_date && data.end_date) {
            object = {
              creation_date: (_creation_date = {}, _defineProperty(_creation_date, Op.gte, data.start_date), _defineProperty(_creation_date, Op.lte, data.end_date), _creation_date)
            };
          }
          console.log("object", object);
          _context16.next = 6;
          return _subscriptionOrder["default"].findAll({
            where: object,
            include: [{
              model: _users["default"]
            }],
            order: [['creation_date', 'DESC']]
          });
        case 6:
          findsubscribed = _context16.sent;
          if (!(findsubscribed && findsubscribed.length > 0)) {
            _context16.next = 11;
            break;
          }
          return _context16.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Order List",
            data: findsubscribed
          });
        case 11:
          return _context16.abrupt("return", {
            statusCode: 404,
            success: false,
            message: "Order List not Found!"
          });
        case 12:
          _context16.next = 18;
          break;
        case 14:
          _context16.prev = 14;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context16.t0,
            message: "Something went wrong!"
          });
        case 18:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 14]]);
  }));
  return function (_x30, _x31) {
    return _ref16.apply(this, arguments);
  };
}();