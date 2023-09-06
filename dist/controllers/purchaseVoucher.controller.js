"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelPurchaseVoucher = cancelPurchaseVoucher;
exports.createPurchaseVoucher = createPurchaseVoucher;
exports.deletePurchaseVoucher = deletePurchaseVoucher;
exports.getPurchaseVoucher = getPurchaseVoucher;
exports.getPurchaseVoucherLastDate = getPurchaseVoucherLastDate;
exports.getPurchaseVouchers = getPurchaseVouchers;
exports.updatePurchaseVoucher = updatePurchaseVoucher;
var _purchaseVoucher = _interopRequireDefault(require("../services/purchaseVoucher.service"));
var _purchaseVoucher2 = require("../validation/purchaseVoucher");
var _statusCode = require("../utility/statusCode");
var _purchasevoucher = require("../security/purchasevoucher");
var _config = _interopRequireDefault(require("../constant/config"));
require("@babel/polyfill");
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _ledger2 = require("../security/ledger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getPurchaseVouchers(_x, _x2) {
  return _getPurchaseVouchers.apply(this, arguments);
}
function _getPurchaseVouchers() {
  _getPurchaseVouchers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.body.data = req.decoded.data;
          _context.next = 4;
          return _purchaseVoucher["default"].getAllDataPagination(req.body, res);
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
  return _getPurchaseVouchers.apply(this, arguments);
}
function getPurchaseVoucherLastDate(_x3, _x4) {
  return _getPurchaseVoucherLastDate.apply(this, arguments);
}
function _getPurchaseVoucherLastDate() {
  _getPurchaseVoucherLastDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (req.body.company_id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.json({
            statusCode: res.statusCode,
            success: false,
            message: "company id required!"
          }));
        case 3:
          req.body.data = req.decoded.data;
          _context2.next = 6;
          return _purchaseVoucher["default"].getLastData(req.body, res);
        case 6:
          createdata = _context2.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getPurchaseVoucherLastDate.apply(this, arguments);
}
function getPurchaseVoucher(_x5, _x6) {
  return _getPurchaseVoucher.apply(this, arguments);
}
function _getPurchaseVoucher() {
  _getPurchaseVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (req.params.id) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.json({
            statusCode: res.statusCode,
            success: false,
            message: "Item id required!",
            Item: {}
          }));
        case 3:
          req.body.data = req.decoded.data;
          _context3.next = 6;
          return _purchaseVoucher["default"].getSingleData(req.params.id, req.body, res);
        case 6:
          createdata = _context3.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _getPurchaseVoucher.apply(this, arguments);
}
function createPurchaseVoucher(_x7, _x8) {
  return _createPurchaseVoucher.apply(this, arguments);
}
function _createPurchaseVoucher() {
  _createPurchaseVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var validation, find, response, findRound, data, checkdata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _purchaseVoucher2.createPurchaseVoucherValidation)(req.body);
        case 3:
          validation = _context4.sent;
          if (!validation.success) {
            _context4.next = 29;
            break;
          }
          req.body.data = req.decoded.data;
          if (!req.body.roundoff_value) {
            _context4.next = 19;
            break;
          }
          _context4.next = 9;
          return _ledger["default"].findAll({
            where: {
              company_id: req.body.company_id,
              account_group_id: _config["default"].indirect_Expenses_id
            }
          });
        case 9:
          find = _context4.sent;
          _context4.next = 12;
          return (0, _ledger2.decreption)(find, 'array', req.body.data.email);
        case 12:
          response = _context4.sent;
          findRound = {};
          _context4.next = 16;
          return response.map(function (item) {
            if (item.name && item.name.match("Round Off")) {
              findRound = item;
            }
          });
        case 16:
          req.body.total_amount = Number(req.body.total_amount) + Number(req.body.roundoff_value);
          req.body.roundoff_ledger_id = findRound.uid;
          if (Number(req.body.roundoff_value) < 0) {
            req.body.roundoff_type = "credit";
          } else {
            req.body.roundoff_type = "debit";
          }
        case 19:
          _context4.next = 21;
          return (0, _purchasevoucher.encreptionPurchase)(req.body);
        case 21:
          data = _context4.sent;
          if (!data) {
            _context4.next = 27;
            break;
          }
          _context4.next = 25;
          return _purchaseVoucher["default"].createData(data, res);
        case 25:
          checkdata = _context4.sent;
          if (checkdata) {
            res.json(checkdata);
          }
        case 27:
          _context4.next = 36;
          break;
        case 29:
          _context4.t0 = res;
          _context4.next = 32;
          return (0, _statusCode.checkCode)('validation');
        case 32:
          _context4.t1 = _context4.sent;
          _context4.t2 = validation.message;
          _context4.t3 = {
            statusCode: _context4.t1,
            success: false,
            message: _context4.t2
          };
          _context4.t0.json.call(_context4.t0, _context4.t3);
        case 36:
          _context4.next = 42;
          break;
        case 38:
          _context4.prev = 38;
          _context4.t4 = _context4["catch"](0);
          console.log("err", _context4.t4);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context4.t4,
            message: "Something went wrong!"
          });
        case 42:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 38]]);
  }));
  return _createPurchaseVoucher.apply(this, arguments);
}
function deletePurchaseVoucher(_x9, _x10) {
  return _deletePurchaseVoucher.apply(this, arguments);
}
function _deletePurchaseVoucher() {
  _deletePurchaseVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (req.params.id) {
            _context5.next = 9;
            break;
          }
          _context5.t0 = res;
          _context5.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context5.t1 = _context5.sent;
          _context5.t2 = {};
          _context5.t3 = {
            statusCode: _context5.t1,
            success: false,
            message: "Item Id required!",
            user: _context5.t2
          };
          return _context5.abrupt("return", _context5.t0.json.call(_context5.t0, _context5.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context5.next = 12;
          return _purchaseVoucher["default"].deleteData(req.params.id, req.body, res);
        case 12:
          deletedata = _context5.sent;
          if (deletedata) {
            res.json(deletedata);
          }
          _context5.next = 19;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t4 = _context5["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            error: _context5.t4,
            success: false,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return _deletePurchaseVoucher.apply(this, arguments);
}
function updatePurchaseVoucher(_x11, _x12) {
  return _updatePurchaseVoucher.apply(this, arguments);
}
function _updatePurchaseVoucher() {
  _updatePurchaseVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var validation, find, response, findRound, data, updatedata;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _purchaseVoucher2.createPurchaseVoucherValidation)(req.body);
        case 3:
          validation = _context6.sent;
          if (!validation.success) {
            _context6.next = 30;
            break;
          }
          req.body.data = req.decoded.data;
          if (!req.body.roundoff_value) {
            _context6.next = 20;
            break;
          }
          _context6.next = 9;
          return _ledger["default"].findAll({
            where: {
              company_id: req.body.company_id,
              account_group_id: _config["default"].indirect_Expenses_id
            }
          });
        case 9:
          find = _context6.sent;
          _context6.next = 12;
          return (0, _ledger2.decreption)(find, 'array', req.body.data.email);
        case 12:
          response = _context6.sent;
          findRound = {};
          _context6.next = 16;
          return response.map(function (item) {
            if (item.name && item.name.match("Round Off")) {
              findRound = item;
            }
          });
        case 16:
          console.log("findRound", findRound);
          req.body.total_amount = Number(req.body.total_amount) + Number(req.body.roundoff_value);
          req.body.roundoff_ledger_id = findRound.uid;
          if (Number(req.body.roundoff_value) < 0) {
            req.body.roundoff_type = "credit";
          } else {
            req.body.roundoff_type = "debit";
          }
        case 20:
          _context6.next = 22;
          return (0, _purchasevoucher.encreptionPurchase)(req.body);
        case 22:
          data = _context6.sent;
          if (!data) {
            _context6.next = 28;
            break;
          }
          _context6.next = 26;
          return _purchaseVoucher["default"].updateData(req.params.id, data, res);
        case 26:
          updatedata = _context6.sent;
          if (updatedata) {
            res.json(updatedata);
          }
        case 28:
          _context6.next = 37;
          break;
        case 30:
          _context6.t0 = res;
          _context6.next = 33;
          return (0, _statusCode.checkCode)('validation');
        case 33:
          _context6.t1 = _context6.sent;
          _context6.t2 = validation.message;
          _context6.t3 = {
            statusCode: _context6.t1,
            success: false,
            message: _context6.t2
          };
          _context6.t0.json.call(_context6.t0, _context6.t3);
        case 37:
          _context6.next = 42;
          break;
        case 39:
          _context6.prev = 39;
          _context6.t4 = _context6["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            error: _context6.t4,
            success: false,
            message: "Something went wrong!"
          });
        case 42:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 39]]);
  }));
  return _updatePurchaseVoucher.apply(this, arguments);
}
function cancelPurchaseVoucher(_x13, _x14) {
  return _cancelPurchaseVoucher.apply(this, arguments);
}
function _cancelPurchaseVoucher() {
  _cancelPurchaseVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var data, updatedata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (req.params.id) {
            _context7.next = 9;
            break;
          }
          _context7.t0 = res;
          _context7.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context7.t1 = _context7.sent;
          _context7.t2 = {};
          _context7.t3 = {
            statusCode: _context7.t1,
            success: false,
            message: "Item Id required!",
            user: _context7.t2
          };
          return _context7.abrupt("return", _context7.t0.json.call(_context7.t0, _context7.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context7.next = 12;
          return (0, _purchasevoucher.encreptionPurchase)(req.body);
        case 12:
          data = _context7.sent;
          if (!data) {
            _context7.next = 18;
            break;
          }
          _context7.next = 16;
          return _purchaseVoucher["default"].cancelData(req.params.id, data, res);
        case 16:
          updatedata = _context7.sent;
          if (updatedata) {
            res.json(updatedata);
          }
        case 18:
          _context7.next = 24;
          break;
        case 20:
          _context7.prev = 20;
          _context7.t4 = _context7["catch"](0);
          console.log("err", _context7.t4);
          res.status(500).json({
            statusCode: res.statusCode,
            error: _context7.t4,
            success: false,
            message: "Something went wrong!"
          });
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 20]]);
  }));
  return _cancelPurchaseVoucher.apply(this, arguments);
}