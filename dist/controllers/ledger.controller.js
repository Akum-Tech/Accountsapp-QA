"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLedger = createLedger;
exports.deleteLedger = deleteLedger;
exports.getAutoLedgerList = getAutoLedgerList;
exports.getCaseLedgers = getCaseLedgers;
exports.getJournlVoucherLedger = getJournlVoucherLedger;
exports.getLedger = getLedger;
exports.getLedgerReport = getLedgerReport;
exports.getLedgers = getLedgers;
exports.getLedgerwithoutbank = getLedgerwithoutbank;
exports.getSalePurchaseLedger = getSalePurchaseLedger;
exports.getSalePurchaseVoucherLedger = getSalePurchaseVoucherLedger;
exports.getbankCaseLedgers = getbankCaseLedgers;
exports.getbankLedgers = getbankLedgers;
exports.getbankdefault = getbankdefault;
exports.getdiscountLedgers = getdiscountLedgers;
exports.getstockinhandLedgers = getstockinhandLedgers;
exports.updateLedger = updateLedger;
var _ledger = _interopRequireDefault(require("../services/ledger.service"));
var _ledger2 = require("../validation/ledger");
var _statusCode = require("../utility/statusCode");
var _ledger3 = require("../security/ledger");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getLedgers(_x, _x2) {
  return _getLedgers.apply(this, arguments);
}
function _getLedgers() {
  _getLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.body.data = req.decoded.data;
          _context.next = 4;
          return _ledger["default"].getAllData(req.query.company_id, req.body, res);
        case 4:
          getdata = _context.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getLedgers.apply(this, arguments);
}
function getLedgerwithoutbank(_x3, _x4) {
  return _getLedgerwithoutbank.apply(this, arguments);
}
function _getLedgerwithoutbank() {
  _getLedgerwithoutbank = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          req.body.data = req.decoded.data;
          _context2.next = 4;
          return _ledger["default"].getAllLedgerwithoutbank(req.query.company_id, req.body, res);
        case 4:
          getdata = _context2.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getLedgerwithoutbank.apply(this, arguments);
}
function getLedgerReport(_x5, _x6) {
  return _getLedgerReport.apply(this, arguments);
}
function _getLedgerReport() {
  _getLedgerReport = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          req.body.data = req.decoded.data;
          _context3.next = 4;
          return _ledger["default"].getAllLedgerReport(req.query.company_id, req.body, res);
        case 4:
          getdata = _context3.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _getLedgerReport.apply(this, arguments);
}
function getAutoLedgerList(_x7, _x8) {
  return _getAutoLedgerList.apply(this, arguments);
}
function _getAutoLedgerList() {
  _getAutoLedgerList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          req.body.data = req.decoded.data;
          _context4.next = 4;
          return _ledger["default"].getAutoLedgerList(req.body, res);
        case 4:
          getdata = _context4.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _getAutoLedgerList.apply(this, arguments);
}
function getSalePurchaseLedger(_x9, _x10) {
  return _getSalePurchaseLedger.apply(this, arguments);
}
function _getSalePurchaseLedger() {
  _getSalePurchaseLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          req.body.data = req.decoded.data;
          _context5.next = 4;
          return _ledger["default"].getAllSalePurchase(req.params.id, req.body, res);
        case 4:
          getdata = _context5.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context5.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _getSalePurchaseLedger.apply(this, arguments);
}
function getSalePurchaseVoucherLedger(_x11, _x12) {
  return _getSalePurchaseVoucherLedger.apply(this, arguments);
}
function _getSalePurchaseVoucherLedger() {
  _getSalePurchaseVoucherLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          req.body.data = req.decoded.data;
          _context6.next = 4;
          return _ledger["default"].getAllSalePurchaseVoucherLedger(req.params.id, req.body, res);
        case 4:
          getdata = _context6.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _getSalePurchaseVoucherLedger.apply(this, arguments);
}
function getJournlVoucherLedger(_x13, _x14) {
  return _getJournlVoucherLedger.apply(this, arguments);
}
function _getJournlVoucherLedger() {
  _getJournlVoucherLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          req.body.data = req.decoded.data;
          _context7.next = 4;
          return _ledger["default"].getAllLedgerForJournlVoucher(req.params.id, req.body, res);
        case 4:
          getdata = _context7.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return _getJournlVoucherLedger.apply(this, arguments);
}
function getbankLedgers(_x15, _x16) {
  return _getbankLedgers.apply(this, arguments);
}
function _getbankLedgers() {
  _getbankLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          req.body.data = req.decoded.data;
          _context8.next = 4;
          return _ledger["default"].getAllbankData(req.body, res);
        case 4:
          getdata = _context8.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context8.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return _getbankLedgers.apply(this, arguments);
}
function getbankCaseLedgers(_x17, _x18) {
  return _getbankCaseLedgers.apply(this, arguments);
}
function _getbankCaseLedgers() {
  _getbankCaseLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          req.body.data = req.decoded.data;
          _context9.next = 4;
          return _ledger["default"].getAllbankcaseData(req.body, res);
        case 4:
          getdata = _context9.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context9.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return _getbankCaseLedgers.apply(this, arguments);
}
function getdiscountLedgers(_x19, _x20) {
  return _getdiscountLedgers.apply(this, arguments);
}
function _getdiscountLedgers() {
  _getdiscountLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          req.body.data = req.decoded.data;
          _context10.next = 4;
          return _ledger["default"].getAllDiscountData(req.body, res);
        case 4:
          getdata = _context10.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context10.next = 11;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context10.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return _getdiscountLedgers.apply(this, arguments);
}
function getbankdefault(_x21, _x22) {
  return _getbankdefault.apply(this, arguments);
}
function _getbankdefault() {
  _getbankdefault = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          req.body.data = req.decoded.data;
          _context11.next = 4;
          return _ledger["default"].getDefaultbankData(req.params.id, req.body, res);
        case 4:
          getdata = _context11.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context11.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return _getbankdefault.apply(this, arguments);
}
function getLedger(_x23, _x24) {
  return _getLedger.apply(this, arguments);
}
function _getLedger() {
  _getLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          if (req.params.id) {
            _context12.next = 3;
            break;
          }
          return _context12.abrupt("return", res.json({
            statusCode: res.statusCode,
            success: false,
            message: "Ledger id required!",
            Ledger: {}
          }));
        case 3:
          req.body.data = req.decoded.data;
          _context12.next = 6;
          return _ledger["default"].getSingleData(req.params.id, req.body, res);
        case 6:
          createdata = _context12.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context12.next = 13;
          break;
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context12.t0,
            message: "Something went wrong!"
          });
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return _getLedger.apply(this, arguments);
}
function createLedger(_x25, _x26) {
  return _createLedger.apply(this, arguments);
}
function _createLedger() {
  _createLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var validation, data, checkdata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return (0, _ledger2.createLedgerValidation)(req.body);
        case 3:
          validation = _context13.sent;
          if (!validation.success) {
            _context13.next = 17;
            break;
          }
          req.body.data = req.decoded.data;
          req.body.name = req.body.name.toLowerCase();
          _context13.next = 9;
          return (0, _ledger3.encreption)(req.body);
        case 9:
          data = _context13.sent;
          if (!data) {
            _context13.next = 15;
            break;
          }
          _context13.next = 13;
          return _ledger["default"].createData(data, res);
        case 13:
          checkdata = _context13.sent;
          if (checkdata) {
            res.json(checkdata);
          }
        case 15:
          _context13.next = 24;
          break;
        case 17:
          _context13.t0 = res;
          _context13.next = 20;
          return (0, _statusCode.checkCode)('validation');
        case 20:
          _context13.t1 = _context13.sent;
          _context13.t2 = validation.message;
          _context13.t3 = {
            statusCode: _context13.t1,
            success: false,
            message: _context13.t2
          };
          _context13.t0.json.call(_context13.t0, _context13.t3);
        case 24:
          _context13.next = 29;
          break;
        case 26:
          _context13.prev = 26;
          _context13.t4 = _context13["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context13.t4.message,
            message: "Something went wrong!"
          });
        case 29:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 26]]);
  }));
  return _createLedger.apply(this, arguments);
}
function deleteLedger(_x27, _x28) {
  return _deleteLedger.apply(this, arguments);
}
function _deleteLedger() {
  _deleteLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          if (req.params.id) {
            _context14.next = 9;
            break;
          }
          _context14.t0 = res;
          _context14.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context14.t1 = _context14.sent;
          _context14.t2 = {};
          _context14.t3 = {
            statusCode: _context14.t1,
            success: false,
            message: "Ledger Id required!",
            user: _context14.t2
          };
          return _context14.abrupt("return", _context14.t0.json.call(_context14.t0, _context14.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context14.next = 12;
          return _ledger["default"].deleteData(req.params.id, res);
        case 12:
          deletedata = _context14.sent;
          if (deletedata) {
            res.json(deletedata);
          }
          _context14.next = 19;
          break;
        case 16:
          _context14.prev = 16;
          _context14.t4 = _context14["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            error: _context14.t4.message,
            success: false,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 16]]);
  }));
  return _deleteLedger.apply(this, arguments);
}
function updateLedger(_x29, _x30) {
  return _updateLedger.apply(this, arguments);
}
function _updateLedger() {
  _updateLedger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var validation, data, updatedata;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return (0, _ledger2.createLedgerValidation)(req.body);
        case 3:
          validation = _context15.sent;
          if (!validation.success) {
            _context15.next = 16;
            break;
          }
          req.body.data = req.decoded.data;
          _context15.next = 8;
          return (0, _ledger3.encreption)(req.body);
        case 8:
          data = _context15.sent;
          if (!data) {
            _context15.next = 14;
            break;
          }
          _context15.next = 12;
          return _ledger["default"].updateData(req.params.id, data, res);
        case 12:
          updatedata = _context15.sent;
          if (updatedata) {
            res.json(updatedata);
          }
        case 14:
          _context15.next = 23;
          break;
        case 16:
          _context15.t0 = res;
          _context15.next = 19;
          return (0, _statusCode.checkCode)('validation');
        case 19:
          _context15.t1 = _context15.sent;
          _context15.t2 = validation.message;
          _context15.t3 = {
            statusCode: _context15.t1,
            success: false,
            message: _context15.t2
          };
          _context15.t0.json.call(_context15.t0, _context15.t3);
        case 23:
          _context15.next = 28;
          break;
        case 25:
          _context15.prev = 25;
          _context15.t4 = _context15["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            error: _context15.t4,
            success: false,
            message: "Something went wrong!"
          });
        case 28:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 25]]);
  }));
  return _updateLedger.apply(this, arguments);
}
function getCaseLedgers(_x31, _x32) {
  return _getCaseLedgers.apply(this, arguments);
}
function _getCaseLedgers() {
  _getCaseLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          req.body.data = req.decoded.data;
          _context16.next = 4;
          return _ledger["default"].getAllcaseData(req.body, res);
        case 4:
          getdata = _context16.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context16.next = 11;
          break;
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context16.t0,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 8]]);
  }));
  return _getCaseLedgers.apply(this, arguments);
}
function getstockinhandLedgers(_x33, _x34) {
  return _getstockinhandLedgers.apply(this, arguments);
}
function _getstockinhandLedgers() {
  _getstockinhandLedgers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          req.body.data = req.decoded.data;
          _context17.next = 4;
          return _ledger["default"].getstockinhand(req.params.id, req.body, res);
        case 4:
          getdata = _context17.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context17.next = 11;
          break;
        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context17.t0.message,
            message: "Something went wrong!"
          });
        case 11:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 8]]);
  }));
  return _getstockinhandLedgers.apply(this, arguments);
}