"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _company = _interopRequireDefault(require("../models/company"));
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _subAccountGroup = _interopRequireDefault(require("../models/subAccountGroup"));
var _states = _interopRequireDefault(require("../models/states"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _taxInteries = _interopRequireDefault(require("../models/taxInteries"));
var _voucherInteries = _interopRequireDefault(require("../models/voucherInteries"));
var _itemInteries = _interopRequireDefault(require("../models/itemInteries"));
var _database = require("../database/database");
var _config = _interopRequireDefault(require("../constant/config"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _entry = _interopRequireDefault(require("../utility/entry"));
var _arraySort = _interopRequireDefault(require("array-sort"));
var _paymentvoucher = require("../security/paymentvoucher");
var _bank = require("../security/bank");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              uid: id
            },
            include: [{
              model: _company["default"],
              include: [{
                model: _cities["default"],
                attributes: ["name"],
                include: [{
                  model: _states["default"],
                  attributes: ["name"]
                }]
              }]
            }, {
              model: _ledger["default"],
              as: "PaymentBuyer",
              attributes: ["uid", "name", "opening_balance", "amount"],
              include: [{
                model: _cities["default"],
                attributes: ["name"],
                include: [{
                  model: _states["default"],
                  attributes: ["name"]
                }]
              }, {
                model: _subAccountGroup["default"],
                attributes: ["uid", "name"]
              }, {
                model: _accountGroup["default"],
                attributes: ["uid", "name"]
              }]
            }, {
              model: _ledger["default"],
              as: "PaymentReciver",
              attributes: ["uid", "name", "opening_balance", "amount"],
              include: [{
                model: _cities["default"],
                include: [{
                  model: _states["default"],
                  attributes: ["name"]
                }]
              }, {
                model: _subAccountGroup["default"],
                attributes: ["uid", "name"]
              }, {
                model: _accountGroup["default"],
                attributes: ["uid", "name"]
              }]
            }]
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 11;
            break;
          }
          _context.next = 7;
          return (0, _paymentvoucher.decreptionPayment)(createdata, "object", data.data.email);
        case 7:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher fetch Successfully",
            PaymentVoucher: response
          });
        case 11:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher not Found!",
            PaymentVoucher: createdata ? createdata : {}
          });
        case 12:
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getLastData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            order: [["invoice_date", "DESC"]]
          });
        case 3:
          createdata = _context2.sent;
          if (!createdata) {
            _context2.next = 12;
            break;
          }
          _context2.next = 7;
          return (0, _paymentvoucher.decreptionPayment)(createdata, "object", data.data.email);
        case 7:
          response = _context2.sent;
          response.dataValues.invoice_id = response.dataValues.invoice_id <= 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/00").concat(response.dataValues.invoice_id) : response.dataValues.invoice_id > 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/0").concat(response.dataValues.invoice_id) : "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/").concat(response.dataValues.invoice_id);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher fetch Successfully",
            PaymentVoucher: response
          });
        case 12:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher not Found!",
            PaymentVoucher: createdata ? createdata : {}
          });
        case 13:
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _paymentVoucher["default"].findAll({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ["company_name", "uid", "gst_number", "terms", "financial_year", "cin_number", "company_pan_number"]
            }, {
              model: _ledger["default"],
              as: "PaymentBuyer",
              attributes: ["name", "uid", "amount", "opening_balance"]
            }, {
              model: _ledger["default"],
              as: "PaymentReciver",
              attributes: ["name", "uid", "amount", "opening_balance"]
            }],
            order: [['invoice_date', 'ASC']]
          });
        case 3:
          createdata = _context3.sent;
          if (!(createdata.length > 0)) {
            _context3.next = 15;
            break;
          }
          _context3.next = 7;
          return (0, _paymentvoucher.decreptionPayment)(createdata, "array", data.data.email);
        case 7:
          response = _context3.sent;
          response = response.map(function (item) {
            if (item.invoice_id) {
              item.invoice_id = item.invoice_id <= 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/00").concat(item.invoice_id) : item.invoice_id > 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/0").concat(item.invoice_id) : "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/").concat(item.invoice_id);
            }
            return item;
          });
          _context3.next = 11;
          return (0, _arraySort["default"])(response, 'invoice_id');
        case 11:
          response = _context3.sent;
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher fetch Successfully",
            PaymentVoucher: response
          });
        case 15:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher not Found!",
            PaymentVoucher: createdata ? createdata : []
          });
        case 16:
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllDataPagination = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _paymentVoucher["default"].findAndCountAll({
            limit: data.limit,
            offset: data.offset,
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ["company_name", "uid", "gst_number", "terms", "financial_year", "cin_number", "company_pan_number"]
            }, {
              model: _ledger["default"],
              as: "PaymentBuyer",
              attributes: ["name", "uid", "amount", "opening_balance"]
            }, {
              model: _ledger["default"],
              as: "PaymentReciver",
              attributes: ["name", "uid", "amount", "opening_balance"]
            }],
            order: [['invoice_date', 'ASC']],
            distinct: true
          });
        case 3:
          createdata = _context4.sent;
          if (!(createdata.rows.length > 0)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 7;
          return (0, _paymentvoucher.decreptionPayment)(createdata.rows, "array", data.data.email);
        case 7:
          response = _context4.sent;
          response = response.map(function (item) {
            if (item.invoice_id) {
              item.invoice_id = item.invoice_id <= 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/00").concat(item.invoice_id) : item.invoice_id > 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/0").concat(item.invoice_id) : "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/").concat(item.invoice_id);
            }
            return item;
          });
          _context4.next = 11;
          return (0, _arraySort["default"])(response, 'invoice_id');
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher fetch Successfully",
            PaymentVoucher: response,
            Count: createdata.count
          });
        case 15:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher not Found!",
            PaymentVoucher: createdata.rows.length > 0 ? createdata : []
          });
        case 16:
          _context4.next = 21;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0.message,
            message: "Something went wrong!"
          });
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(t) {
              var count, checkYear, _where3, updateCount, _count, _checkYear, finddate, _updateCount, _updateCount2, _count2, _checkYear2, createdata, response;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!data.is_after) {
                      _context5.next = 22;
                      break;
                    }
                    _context5.next = 3;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        uid: data.after_id
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 3:
                    count = _context5.sent;
                    _context5.next = 6;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 6:
                    checkYear = _context5.sent;
                    if (!checkYear) {
                      _context5.next = 17;
                      break;
                    }
                    _context5.next = 10;
                    return Number(count.dataValues.invoice_id);
                  case 10:
                    _context5.t0 = _context5.sent;
                    data.invoice_id = _context5.t0 + 1;
                    _context5.next = 14;
                    return _paymentVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal("invoice_id+1")
                    }, {
                      where: (_where3 = {}, _defineProperty(_where3, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }]), _defineProperty(_where3, "invoice_id", _defineProperty({}, Op.gte, data.invoice_id)), _where3)
                    }, t);
                  case 14:
                    updateCount = _context5.sent;
                    _context5.next = 20;
                    break;
                  case 17:
                    _context5.next = 19;
                    return 1;
                  case 19:
                    data.invoice_id = _context5.sent;
                  case 20:
                    _context5.next = 76;
                    break;
                  case 22:
                    if (!data.is_before) {
                      _context5.next = 63;
                      break;
                    }
                    _context5.next = 25;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        invoice_date: _defineProperty({}, Op.lte, data.invoice_date)
                      }, {
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }]),
                      order: [['invoice_id', 'DESC']]
                    }, t);
                  case 25:
                    _count = _context5.sent;
                    _context5.next = 28;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 28:
                    _checkYear = _context5.sent;
                    if (!_checkYear) {
                      _context5.next = 58;
                      break;
                    }
                    _context5.next = 32;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        invoice_date: data.invoice_date
                      }, {
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }]),
                      order: [['invoice_id', 'DESC']]
                    }, t);
                  case 32:
                    finddate = _context5.sent;
                    if (!finddate) {
                      _context5.next = 43;
                      break;
                    }
                    _context5.next = 36;
                    return Number(finddate.dataValues.invoice_id);
                  case 36:
                    _context5.t1 = _context5.sent;
                    data.invoice_id = _context5.t1 + 1;
                    _context5.next = 40;
                    return _paymentVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal('invoice_id+1')
                    }, {
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }, {
                        invoice_id: _defineProperty({}, Op.gte, data.invoice_id)
                      }]),
                      order: [['invoice_id', 'DESC']]
                    }, t);
                  case 40:
                    _updateCount = _context5.sent;
                    _context5.next = 56;
                    break;
                  case 43:
                    if (!_count) {
                      _context5.next = 50;
                      break;
                    }
                    _context5.next = 46;
                    return Number(_count.dataValues.invoice_id);
                  case 46:
                    _context5.t2 = _context5.sent;
                    data.invoice_id = _context5.t2 + 1;
                    _context5.next = 53;
                    break;
                  case 50:
                    _context5.next = 52;
                    return 1;
                  case 52:
                    data.invoice_id = _context5.sent;
                  case 53:
                    _context5.next = 55;
                    return _paymentVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal('invoice_id+1')
                    }, {
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }, {
                        invoice_date: _defineProperty({}, Op.gte, data.invoice_date)
                      }])
                    }, t);
                  case 55:
                    _updateCount2 = _context5.sent;
                  case 56:
                    _context5.next = 61;
                    break;
                  case 58:
                    _context5.next = 60;
                    return 1;
                  case 60:
                    data.invoice_id = _context5.sent;
                  case 61:
                    _context5.next = 76;
                    break;
                  case 63:
                    _context5.next = 65;
                    return _paymentVoucher["default"].count({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    });
                  case 65:
                    _count2 = _context5.sent;
                    _context5.next = 68;
                    return _paymentVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 68:
                    _checkYear2 = _context5.sent;
                    if (!_checkYear2) {
                      _context5.next = 73;
                      break;
                    }
                    data.invoice_id = Number(_count2) + 1;
                    _context5.next = 76;
                    break;
                  case 73:
                    _context5.next = 75;
                    return 1;
                  case 75:
                    data.invoice_id = _context5.sent;
                  case 76:
                    data.invoice_date = data.invoice_date;
                    _context5.next = 79;
                    return (0, _uniqid["default"])();
                  case 79:
                    data.uid = _context5.sent;
                    data.status = 1;
                    data.creation_date = new Date();
                    data.updated_date = new Date();
                    _context5.next = 85;
                    return _paymentVoucher["default"].create(data, {
                      transaction: t
                    });
                  case 85:
                    createdata = _context5.sent;
                    _entry["default"].createData(data.company_id, _entryMessage["default"].payment_create);
                    _context5.next = 89;
                    return (0, _paymentvoucher.decreptionPayment)(createdata, "object", data.data.email);
                  case 89:
                    response = _context5.sent;
                    return _context5.abrupt("return", response);
                  case 91:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x12) {
              return _ref6.apply(this, arguments);
            };
          }());
        case 3:
          result = _context6.sent;
          if (!result) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher Created Successfully",
            PaymentVoucher: result
          });
        case 8:
          _context6.next = 10;
          return transaction.rollback();
        case 10:
          _context6.next = 17;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 16;
          return transaction.rollback();
        case 16:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0,
            message: "Something went wrong!"
          });
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, data, res) {
    var find, _where11, updateCount, deletedata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          find = _context7.sent;
          if (!find) {
            _context7.next = 18;
            break;
          }
          _context7.next = 7;
          return _paymentVoucher["default"].update({
            invoice_id: _sequelize["default"].literal('invoice_id-1')
          }, {
            where: (_where11 = {}, _defineProperty(_where11, Op.and, [{
              current_year: find.dataValues.current_year
            }, {
              end_year: find.dataValues.end_year
            }, {
              company_id: find.dataValues.company_id
            }]), _defineProperty(_where11, "invoice_id", _defineProperty({}, Op.gte, Number(find.dataValues.invoice_id))), _where11)
          });
        case 7:
          updateCount = _context7.sent;
          _context7.next = 10;
          return _paymentVoucher["default"].destroy({
            where: {
              uid: id
            }
          });
        case 10:
          deletedata = _context7.sent;
          if (!deletedata) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher Delete Successfully",
            PaymentVoucher: deletedata
          });
        case 15:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not delete please try later!",
            PaymentVoucher: {}
          });
        case 16:
          _context7.next = 19;
          break;
        case 18:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not found!",
            PaymentVoucher: {}
          });
        case 19:
          _context7.next = 24;
          break;
        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 21]]);
  }));
  return function (_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id, data, res) {
    var finddata, updatedata, response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _paymentVoucher["default"].findOne({
            where: {
              uid: id,
              company_id: data.company_id
            }
          });
        case 3:
          finddata = _context8.sent;
          if (!finddata) {
            _context8.next = 21;
            break;
          }
          data.updated_date = new Date();
          delete data.invoice_id;
          _context8.next = 9;
          return finddata.update(data);
        case 9:
          updatedata = _context8.sent;
          _entry["default"].createData(data.company_id, _entryMessage["default"].payment_update);
          if (!updatedata) {
            _context8.next = 18;
            break;
          }
          _context8.next = 14;
          return (0, _paymentvoucher.decreptionPayment)(updatedata, "object", data.data.email);
        case 14:
          response = _context8.sent;
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher update Successfully",
            PaymentVoucher: response
          });
        case 18:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            PaymentVoucher: updatedata
          });
        case 19:
          _context8.next = 22;
          break;
        case 21:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "PaymentVoucher not found!",
            PaymentVoucher: finddata ? finddata : {}
          });
        case 22:
          _context8.next = 27;
          break;
        case 24:
          _context8.prev = 24;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context8.t0,
            message: "Something went wrong!"
          });
        case 27:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 24]]);
  }));
  return function (_x16, _x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();
exports.cancelData = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(t) {
              var updatedata, response;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    data.updated_date = new Date();
                    data.status = 0;
                    data.ledger_id = '';
                    data.receive_id = '';
                    data.is_local = '';
                    data.name = '';
                    data.bank_account_number = '';
                    data.bank_ifsc = '';
                    data.bank_name = '';
                    data.receive_type = '';
                    data.narration = '';
                    data.type = '';
                    data.total_amount = '0';
                    _context9.next = 15;
                    return (0, _paymentvoucher.encreptionPayment)(data, data.data.email);
                  case 15:
                    data = _context9.sent;
                    _context9.next = 18;
                    return _paymentVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 18:
                    updatedata = _context9.sent;
                    if (!updatedata) {
                      _context9.next = 25;
                      break;
                    }
                    delete data.invoice_id;
                    _context9.next = 23;
                    return updatedata.update(data);
                  case 23:
                    _context9.next = 27;
                    break;
                  case 25:
                    _context9.next = 27;
                    return t.rollback();
                  case 27:
                    _context9.next = 29;
                    return (0, _paymentvoucher.decreptionPayment)(updatedata, 'object', data.data.email);
                  case 29:
                    response = _context9.sent;
                    return _context9.abrupt("return", response);
                  case 31:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x22) {
              return _ref10.apply(this, arguments);
            };
          }());
        case 3:
          result = _context10.sent;
          if (!result) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PaymentVoucher Cancel Successfully",
            PaymentVoucher: result
          });
        case 8:
          _context10.next = 10;
          return transaction.rollback();
        case 10:
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context10.t0,
            message: "Something went wrong!"
          });
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 12]]);
  }));
  return function (_x19, _x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();