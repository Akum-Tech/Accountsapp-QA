"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _ledgerBalance = _interopRequireDefault(require("../models/ledgerBalance"));
var _company = _interopRequireDefault(require("../models/company"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _units = _interopRequireDefault(require("../models/units"));
var _states = _interopRequireDefault(require("../models/states"));
var _stockGroup = _interopRequireDefault(require("../models/stockGroup"));
var _stockSubGroup = _interopRequireDefault(require("../models/stockSubGroup"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _journalVoucher = _interopRequireDefault(require("../models/journalVoucher"));
var _saleVoucher = _interopRequireDefault(require("../models/saleVoucher"));
var _purchaseVoucher = _interopRequireDefault(require("../models/purchaseVoucher"));
var _recieptVoucher = _interopRequireDefault(require("../models/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _creditVoucher = _interopRequireDefault(require("../models/creditVoucher"));
var _debitVoucher = _interopRequireDefault(require("../models/debitVoucher"));
var _salesvoucher = require("../security/salesvoucher");
var _uniqid = _interopRequireDefault(require("uniqid"));
require("@babel/polyfill");
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _subAccountGroup = _interopRequireDefault(require("../models/subAccountGroup"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _taxInteries = _interopRequireDefault(require("../models/taxInteries"));
var _voucherInteries = _interopRequireDefault(require("../models/voucherInteries"));
var _itemInteries = _interopRequireDefault(require("../models/itemInteries"));
var _database = require("../database/database");
var _config = _interopRequireDefault(require("../constant/config"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _entry = _interopRequireDefault(require("../utility/entry"));
var _bank = require("../security/bank");
var _ledger2 = require("../security/ledger");
var _itemEntries = require("../security/itemEntries");
var _taxEntries = require("../security/taxEntries");
var _voucherEntries = require("../security/voucherEntries");
var _itemStockVoucher = _interopRequireDefault(require("../models/itemStockVoucher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
exports.getnextDataDetail_sv = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _saleVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 15;
            break;
          }
          _context.next = 7;
          return _saleVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context.sent;
          if (!nextdata) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", nextdata);
        case 12:
          return _context.abrupt("return", false);
        case 13:
          _context.next = 16;
          break;
        case 15:
          return _context.abrupt("return", false);
        case 16:
          _context.next = 21;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", false);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_sv = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _saleVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context2.sent;
          if (!createdata) {
            _context2.next = 15;
            break;
          }
          _context2.next = 7;
          return _saleVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context2.sent;
          if (!nextdata) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", nextdata);
        case 12:
          return _context2.abrupt("return", false);
        case 13:
          _context2.next = 16;
          break;
        case 15:
          return _context2.abrupt("return", false);
        case 16:
          _context2.next = 21;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", false);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getnextDataDetail_purv = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _purchaseVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context3.sent;
          if (!createdata) {
            _context3.next = 15;
            break;
          }
          _context3.next = 7;
          return _purchaseVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context3.sent;
          if (!nextdata) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", nextdata);
        case 12:
          return _context3.abrupt("return", false);
        case 13:
          _context3.next = 16;
          break;
        case 15:
          return _context3.abrupt("return", false);
        case 16:
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", false);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_purv = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _purchaseVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context4.sent;
          if (!createdata) {
            _context4.next = 15;
            break;
          }
          _context4.next = 7;
          return _purchaseVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context4.sent;
          if (!nextdata) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", nextdata);
        case 12:
          return _context4.abrupt("return", false);
        case 13:
          _context4.next = 16;
          break;
        case 15:
          return _context4.abrupt("return", false);
        case 16:
          _context4.next = 21;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", false);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getnextDataDetail_rv = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _recieptVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context5.sent;
          if (!createdata) {
            _context5.next = 15;
            break;
          }
          _context5.next = 7;
          return _recieptVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context5.sent;
          if (!nextdata) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", nextdata);
        case 12:
          return _context5.abrupt("return", false);
        case 13:
          _context5.next = 16;
          break;
        case 15:
          return _context5.abrupt("return", false);
        case 16:
          _context5.next = 21;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", false);
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_rv = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _recieptVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context6.sent;
          if (!createdata) {
            _context6.next = 15;
            break;
          }
          _context6.next = 7;
          return _recieptVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context6.sent;
          if (!nextdata) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", nextdata);
        case 12:
          return _context6.abrupt("return", false);
        case 13:
          _context6.next = 16;
          break;
        case 15:
          return _context6.abrupt("return", false);
        case 16:
          _context6.next = 21;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", false);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getnextDataDetail_payv = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context7.sent;
          if (!createdata) {
            _context7.next = 15;
            break;
          }
          _context7.next = 7;
          return _paymentVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context7.sent;
          if (!nextdata) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", nextdata);
        case 12:
          return _context7.abrupt("return", false);
        case 13:
          _context7.next = 16;
          break;
        case 15:
          return _context7.abrupt("return", false);
        case 16:
          _context7.next = 21;
          break;
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", false);
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_payv = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context8.sent;
          if (!createdata) {
            _context8.next = 15;
            break;
          }
          _context8.next = 7;
          return _paymentVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context8.sent;
          if (!nextdata) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", nextdata);
        case 12:
          return _context8.abrupt("return", false);
        case 13:
          _context8.next = 16;
          break;
        case 15:
          return _context8.abrupt("return", false);
        case 16:
          _context8.next = 21;
          break;
        case 18:
          _context8.prev = 18;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", false);
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 18]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getnextDataDetail_cv = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _creditVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context9.sent;
          if (!createdata) {
            _context9.next = 15;
            break;
          }
          _context9.next = 7;
          return _creditVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context9.sent;
          if (!nextdata) {
            _context9.next = 12;
            break;
          }
          return _context9.abrupt("return", nextdata);
        case 12:
          return _context9.abrupt("return", false);
        case 13:
          _context9.next = 16;
          break;
        case 15:
          return _context9.abrupt("return", false);
        case 16:
          _context9.next = 21;
          break;
        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", false);
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 18]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_cv = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _creditVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context10.sent;
          if (!createdata) {
            _context10.next = 15;
            break;
          }
          _context10.next = 7;
          return _creditVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context10.sent;
          if (!nextdata) {
            _context10.next = 12;
            break;
          }
          return _context10.abrupt("return", nextdata);
        case 12:
          return _context10.abrupt("return", false);
        case 13:
          _context10.next = 16;
          break;
        case 15:
          return _context10.abrupt("return", false);
        case 16:
          _context10.next = 21;
          break;
        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", false);
        case 21:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 18]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.getnextDataDetail_dv = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _debitVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context11.sent;
          if (!createdata) {
            _context11.next = 15;
            break;
          }
          _context11.next = 7;
          return _debitVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.gt, createdata.id)
            }]),
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context11.sent;
          if (!nextdata) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", nextdata);
        case 12:
          return _context11.abrupt("return", false);
        case 13:
          _context11.next = 16;
          break;
        case 15:
          return _context11.abrupt("return", false);
        case 16:
          _context11.next = 21;
          break;
        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", false);
        case 21:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 18]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_dv = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _debitVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context12.sent;
          if (!createdata) {
            _context12.next = 15;
            break;
          }
          _context12.next = 7;
          return _debitVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              id: _defineProperty({}, Op.lt, createdata.id)
            }]),
            order: [['id', 'DESC']],
            attributes: ['company_id', 'id', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context12.sent;
          if (!nextdata) {
            _context12.next = 12;
            break;
          }
          return _context12.abrupt("return", nextdata);
        case 12:
          return _context12.abrupt("return", false);
        case 13:
          _context12.next = 16;
          break;
        case 15:
          return _context12.abrupt("return", false);
        case 16:
          _context12.next = 21;
          break;
        case 18:
          _context12.prev = 18;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", false);
        case 21:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 18]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getnextDataDetail_jv = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _journalVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'invoice_id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context13.sent;
          if (!createdata) {
            _context13.next = 15;
            break;
          }
          _context13.next = 7;
          return _journalVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              invoice_id: _defineProperty({}, Op.gt, createdata.invoice_id)
            }]),
            order: [['invoice_id', 'ASC']],
            attributes: ['company_id', 'id', 'voucher_type', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context13.sent;
          if (!nextdata) {
            _context13.next = 12;
            break;
          }
          return _context13.abrupt("return", nextdata);
        case 12:
          return _context13.abrupt("return", false);
        case 13:
          _context13.next = 16;
          break;
        case 15:
          return _context13.abrupt("return", false);
        case 16:
          _context13.next = 21;
          break;
        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](0);
          return _context13.abrupt("return", false);
        case 21:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 18]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_jv = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _journalVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'invoice_id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context14.sent;
          if (!createdata) {
            _context14.next = 15;
            break;
          }
          _context14.next = 7;
          return _journalVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              invoice_id: _defineProperty({}, Op.lt, createdata.invoice_id)
            }]),
            order: [['invoice_id', 'DESC']],
            attributes: ['company_id', 'id', 'voucher_type', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context14.sent;
          if (!nextdata) {
            _context14.next = 12;
            break;
          }
          return _context14.abrupt("return", nextdata);
        case 12:
          return _context14.abrupt("return", false);
        case 13:
          _context14.next = 16;
          break;
        case 15:
          return _context14.abrupt("return", false);
        case 16:
          _context14.next = 21;
          break;
        case 18:
          _context14.prev = 18;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", false);
        case 21:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 18]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getnextDataDetail_isv = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _itemStockVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'invoice_id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context15.sent;
          if (!createdata) {
            _context15.next = 15;
            break;
          }
          _context15.next = 7;
          return _itemStockVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              invoice_id: _defineProperty({}, Op.gt, createdata.invoice_id)
            }]),
            order: [['invoice_id', 'ASC']],
            attributes: ['company_id', 'id', 'voucher_type', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context15.sent;
          if (!nextdata) {
            _context15.next = 12;
            break;
          }
          return _context15.abrupt("return", nextdata);
        case 12:
          return _context15.abrupt("return", false);
        case 13:
          _context15.next = 16;
          break;
        case 15:
          return _context15.abrupt("return", false);
        case 16:
          _context15.next = 22;
          break;
        case 18:
          _context15.prev = 18;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", false);
        case 22:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 18]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getpreviousDataDetail_isv = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(data, res) {
    var createdata, nextdata;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return _itemStockVoucher["default"].findOne({
            where: {
              uid: data.id
            },
            attributes: ['company_id', 'id', 'invoice_id', 'current_year', 'end_year']
          });
        case 3:
          createdata = _context16.sent;
          if (!createdata) {
            _context16.next = 15;
            break;
          }
          _context16.next = 7;
          return _itemStockVoucher["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              end_year: createdata.end_year
            }, {
              company_id: createdata.company_id
            }, {
              current_year: createdata.current_year
            }, {
              invoice_id: _defineProperty({}, Op.lt, createdata.invoice_id)
            }]),
            order: [['invoice_id', 'DESC']],
            attributes: ['company_id', 'id', 'voucher_type', 'uid', 'current_year', 'end_year']
          });
        case 7:
          nextdata = _context16.sent;
          if (!nextdata) {
            _context16.next = 12;
            break;
          }
          return _context16.abrupt("return", nextdata);
        case 12:
          return _context16.abrupt("return", false);
        case 13:
          _context16.next = 16;
          break;
        case 15:
          return _context16.abrupt("return", false);
        case 16:
          _context16.next = 21;
          break;
        case 18:
          _context16.prev = 18;
          _context16.t0 = _context16["catch"](0);
          return _context16.abrupt("return", false);
        case 21:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 18]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();