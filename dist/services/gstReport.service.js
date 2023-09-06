"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _journalVoucher = _interopRequireDefault(require("../models/journalVoucher"));
var _journalInteries = _interopRequireDefault(require("../models/journalInteries"));
var _company = _interopRequireDefault(require("../models/company"));
var _saleVoucher = _interopRequireDefault(require("../models/saleVoucher"));
var _purchaseVoucher = _interopRequireDefault(require("../models/purchaseVoucher"));
var _creditVoucher = _interopRequireDefault(require("../models/creditVoucher"));
var _debitVoucher = _interopRequireDefault(require("../models/debitVoucher"));
var _taxInteries = _interopRequireDefault(require("../models/taxInteries"));
var _voucherInteries = _interopRequireDefault(require("../models/voucherInteries"));
var _itemInteries = _interopRequireDefault(require("../models/itemInteries"));
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _recieptVoucher = _interopRequireDefault(require("../models/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _subAccountGroup = _interopRequireDefault(require("../models/subAccountGroup"));
var _states = _interopRequireDefault(require("../models/states"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _purpose = _interopRequireDefault(require("../models/purpose"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _arraySort = _interopRequireDefault(require("array-sort"));
var _database = require("../database/database");
var _voucherReport = require("../security/voucherReport");
var _ledger2 = require("../security/ledger");
var _salesvoucher = require("../security/salesvoucher");
var _paymentvoucher = require("../security/paymentvoucher");
var _purchasevoucher = require("../security/purchasevoucher");
var _receiptvoucher = require("../security/receiptvoucher");
var _creditvoucher = require("../security/creditvoucher");
var _debitvoucher = require("../security/debitvoucher");
var _journalvoucher = require("../security/journalvoucher");
var _journalEntries = require("../security/journalEntries");
var _itemEntries = require("../security/itemEntries");
var _taxEntries = require("../security/taxEntries");
var _voucherEntries = require("../security/voucherEntries");
var _item_stock_voucher_entries = _interopRequireDefault(require("../models/item_stock_voucher_entries"));
require("@babel/polyfill");
var _items = _interopRequireDefault(require("../models/items"));
var _path = _interopRequireDefault(require("path"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
var xl = require('excel4node');
function getB2bledger(_x) {
  return _getB2bledger.apply(this, arguments);
}
function _getB2bledger() {
  _getB2bledger = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data) {
    var b2b, b2c, items, taxs;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          b2b = [];
          b2c = [];
          items = [];
          taxs = [];
          if (data.length > 0) {
            data.forEach(function (item) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.SalesLedger && item.SalesLedger.gst_number) {
                item.ledger = item.SalesLedger;
                b2b.push(item);
                delete item.SalesLedger;
              } else {
                item.ledger = item.SalesLedger;
                b2c.push(item);
                delete item.SalesLedger;
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
            // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
          }
          return _context8.abrupt("return", {
            b2b: b2b,
            b2c: b2c,
            items: items,
            taxs: taxs
          });
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getB2bledger.apply(this, arguments);
}
function getB2bledgersummary(_x2, _x3, _x4) {
  return _getB2bledgersummary.apply(this, arguments);
}
function _getB2bledgersummary() {
  _getB2bledgersummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data, cdata, ddata) {
    var _b2bObject, _b2cObject, _cdnrObject, _cdnurObject, _nilObject;
    var b2b, b2bcess, b2ccess, b2cdnrcess, b2cdnurcess, b2c, items, taxs, localtaxAmount, taxAmount, cdnr, cdnur, itemnilrate, b2bObject, b2cObject, cdnrObject, cdnurObject, nilObject, total;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          b2b = [];
          b2bcess = [];
          b2ccess = [];
          b2cdnrcess = [];
          b2cdnurcess = [];
          b2c = [];
          items = [];
          taxs = [];
          localtaxAmount = 0;
          taxAmount = 0;
          cdnr = [];
          cdnur = [];
          itemnilrate = [];
          if (data.length > 0) {
            data.forEach(function (item) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.SalesLedger && item.SalesLedger.gst_number) {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2bcess.push(el.itemone);
                    }
                    if (el.igst_tax != '0' || el.igst_tax !== "0") {
                      item.ledger = item.SalesLedger;
                      delete item.SalesLedger;
                      b2b.push(item);
                    }
                  });
                }
              } else {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2ccess.push(el.itemone);
                    }
                    if (el.igst_tax != '0' || el.igst_tax !== "0") {
                      item.ledger = item.SalesLedger;
                      delete item.SalesLedger;
                      b2c.push(item);
                    }
                  });
                }
              }
              if (item.item_entries && item.item_entries.length > 0) {
                item.item_entries.forEach(function (el) {
                  if (el.igst_tax == '0' || el.igst_tax === '0') {
                    itemnilrate.push(el);
                  }
                });
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
          }
          if (cdata.length > 0) {
            cdata.forEach(function (item, index) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.CreditBuyer && item.CreditBuyer.gst_number) {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2cdnrcess.push(el.itemone);
                    }
                  });
                }
                item.ledger = item.CreditBuyer;
                delete item.CreditBuyer;
                cdnr.push(item);
              } else {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2cdnurcess.push(el.itemone);
                    }
                  });
                }
                item.ledger = item.CreditBuyer;
                delete item.CreditBuyer;
                cdnur.push(item);
              }
              if (item.item_entries && item.item_entries.length > 0) {
                item.item_entries.forEach(function (el) {
                  if (el.igst_tax == '0' || el.igst_tax === '0') {
                    itemnilrate.push(el);
                  }
                });
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
          }
          b2bObject = (_b2bObject = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_b2bObject, "cess_amount", 0), _defineProperty(_b2bObject, "invoice_amount", 0), _b2bObject);
          b2cObject = (_b2cObject = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_b2cObject, "cess_amount", 0), _defineProperty(_b2cObject, "invoice_amount", 0), _b2cObject);
          cdnrObject = (_cdnrObject = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_cdnrObject, "cess_amount", 0), _defineProperty(_cdnrObject, "invoice_amount", 0), _cdnrObject);
          cdnurObject = (_cdnurObject = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_cdnurObject, "cess_amount", 0), _defineProperty(_cdnurObject, "invoice_amount", 0), _cdnurObject);
          nilObject = (_nilObject = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_nilObject, "cess_amount", 0), _defineProperty(_nilObject, "invoice_amount", 0), _nilObject);
          total = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            tax_amount: 0,
            invoice_amount: 0
          };
          if (!(b2c.length > 0)) {
            _context9.next = 36;
            break;
          }
          b2cObject.voucher_count = b2c.length;
          b2cObject.cess_amount = 0;
          total.voucher_count = Number(total.voucher_count) + Number(b2cObject.voucher_count);
          _context9.next = 27;
          return b2c.forEach(function (element) {
            if (element.is_local == "yes") {
              b2cObject.cgst_amount = Number(b2cObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              b2cObject.sgst_amount = Number(b2cObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              b2cObject.igst_amount = Number(b2cObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              b2cObject.taxable_value = Number(b2cObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2cObject.tax_amount = Number(b2cObject.igst_amount) + Number(b2cObject.cgst_amount) + Number(b2cObject.sgst_amount);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount) + Number(b2cObject.taxable_value);
          });
        case 27:
          if (!(b2ccess.length > 0)) {
            _context9.next = 30;
            break;
          }
          _context9.next = 30;
          return b2ccess.forEach(function (element) {
            b2cObject.cess_amount = Number(b2cObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(b2cObject.cess_amount);
          });
        case 30:
          total.taxable_value = Number(total.taxable_value) + Number(b2cObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) + Number(b2cObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) + Number(b2cObject.cgst_amount);
          total.tax_amount = Number(total.tax_amount) + Number(b2cObject.tax_amount);
          total.sgst_amount = Number(total.sgst_amount) + Number(b2cObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) + Number(b2cObject.igst_amount);
        case 36:
          if (!(b2b.length > 0)) {
            _context9.next = 51;
            break;
          }
          b2bObject.voucher_count = b2b.length;
          b2bObject.cess_amount = 0;
          total.voucher_count = Number(total.voucher_count) + Number(b2bObject.voucher_count);
          _context9.next = 42;
          return b2b.forEach(function (element) {
            if (element.is_local == "yes") {
              b2bObject.cgst_amount = Number(b2bObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              b2bObject.sgst_amount = Number(b2bObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              b2bObject.igst_amount = Number(b2bObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              b2bObject.taxable_value = Number(b2bObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2bObject.tax_amount = Number(b2bObject.igst_amount) + Number(b2bObject.cgst_amount) + Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount) + Number(b2bObject.taxable_value);
          });
        case 42:
          if (!(b2bcess.length > 0)) {
            _context9.next = 45;
            break;
          }
          _context9.next = 45;
          return b2bcess.forEach(function (element) {
            b2bObject.cess_amount = Number(b2bObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(b2bObject.cess_amount);
          });
        case 45:
          total.taxable_value = Number(total.taxable_value) + Number(b2bObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) + Number(b2bObject.invoice_amount);
          total.tax_amount = Number(total.tax_amount) + Number(b2bObject.tax_amount);
          total.cgst_amount = Number(total.cgst_amount) + Number(b2bObject.cgst_amount);
          total.sgst_amount = Number(total.sgst_amount) + Number(b2bObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) + Number(b2bObject.igst_amount);
        case 51:
          if (!(cdnr.length > 0)) {
            _context9.next = 66;
            break;
          }
          cdnrObject.voucher_count = cdnr.length;
          total.voucher_count = Number(total.voucher_count) + Number(cdnrObject.voucher_count);
          cdnrObject.cess_amount = 0;
          _context9.next = 57;
          return cdnr.forEach(function (element) {
            if (element.is_local == "yes") {
              cdnrObject.cgst_amount = Number(cdnrObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              cdnrObject.sgst_amount = Number(cdnrObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              cdnrObject.igst_amount = Number(cdnrObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              cdnrObject.taxable_value = Number(cdnrObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount) + Number(cdnrObject.cgst_amount) + Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount) + Number(cdnrObject.taxable_value);
          });
        case 57:
          if (!(b2cdnrcess.length > 0)) {
            _context9.next = 60;
            break;
          }
          _context9.next = 60;
          return b2cdnrcess.forEach(function (element) {
            cdnrObject.cess_amount = Number(cdnrObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(cdnrObject.cess_amount);
          });
        case 60:
          total.taxable_value = Number(total.taxable_value) - Number(cdnrObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) - Number(cdnrObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) - Number(cdnrObject.cgst_amount);
          total.tax_amount = Number(total.tax_amount) - Number(cdnrObject.tax_amount);
          total.sgst_amount = Number(total.sgst_amount) - Number(cdnrObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) - Number(cdnrObject.igst_amount);
        case 66:
          if (!(cdnur.length > 0)) {
            _context9.next = 81;
            break;
          }
          cdnurObject.voucher_count = cdnur.length;
          total.voucher_count = Number(total.voucher_count) + Number(cdnurObject.voucher_count);
          cdnurObject.cess_amount = 0;
          _context9.next = 72;
          return cdnur.forEach(function (element) {
            if (element.is_local == "yes") {
              cdnurObject.cgst_amount = Number(cdnurObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              cdnurObject.sgst_amount = Number(cdnurObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              cdnurObject.igst_amount = Number(cdnurObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              cdnurObject.taxable_value = Number(cdnurObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            cdnurObject.tax_amount = Number(cdnurObject.igst_amount) + Number(cdnurObject.cgst_amount) + Number(cdnurObject.sgst_amount);
            cdnurObject.invoice_amount = Number(cdnurObject.tax_amount) + Number(cdnurObject.taxable_value);
          });
        case 72:
          if (!(b2cdnurcess.length > 0)) {
            _context9.next = 75;
            break;
          }
          _context9.next = 75;
          return b2cdnurcess.forEach(function (element) {
            cdnurObject.cess_amount = Number(cdnurObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(cdnurObject.cess_amount);
          });
        case 75:
          total.taxable_value = Number(total.taxable_value) - Number(cdnurObject.taxable_value);
          total.tax_amount = Number(total.tax_amount) - Number(cdnurObject.tax_amount);
          total.invoice_amount = Number(total.invoice_amount) - Number(cdnurObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) - Number(cdnurObject.cgst_amount);
          total.sgst_amount = Number(total.sgst_amount) - Number(cdnurObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) - Number(cdnurObject.igst_amount);
        case 81:
          if (!(itemnilrate.length > 0)) {
            _context9.next = 87;
            break;
          }
          // nilObject.voucher_count = itemnilrate.length;
          total.voucher_count = Number(total.voucher_count) + Number(nilObject.voucher_count);
          nilObject.cess_amount = 0;
          _context9.next = 86;
          return itemnilrate.forEach(function (element) {
            nilObject.taxable_value = Number(nilObject.taxable_value) + Number(Number(element.quantity) * Number(element.price));
            nilObject.invoice_amount = Number(nilObject.taxable_value);

            // total.invoice_amount = Number(total.invoice_amount)+Number(nilObject.invoice_amount);
            // total.tax_amount = Number(total.tax_amount)+Number(nilObject.tax_amount);
            // total.cgst_amount = Number(total.cgst_amount)+Number(cdnurObject.cgst_amount);
            // total.sgst_amount = Number(total.sgst_amount)+Number(cdnurObject.sgst_amount);
            // total.igst_amount = Number(total.igst_amount)+Number(cdnurObject.igst_amount);
          });
        case 86:
          total.taxable_value = Number(total.taxable_value) + Number(nilObject.taxable_value);
        case 87:
          return _context9.abrupt("return", {
            b2b: b2bObject,
            b2c: b2cObject,
            cdnr: cdnrObject,
            cdnur: cdnurObject,
            nilObject: nilObject,
            total: total
          });
        case 88:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _getB2bledgersummary.apply(this, arguments);
}
function getB2bledgerPurchasesummary(_x5, _x6, _x7) {
  return _getB2bledgerPurchasesummary.apply(this, arguments);
}
function _getB2bledgerPurchasesummary() {
  _getB2bledgerPurchasesummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, cdata, ddata) {
    var _b2bObject2, _b2cObject2, _cdnrObject2, _cdnurObject2, _nilObject2;
    var b2b, b2bcess, b2ccess, b2cdnrcess, b2cdnurcess, b2c, items, taxs, localtaxAmount, taxAmount, cdnr, cdnur, itemnilrate, b2bObject, b2cObject, cdnrObject, cdnurObject, nilObject, total;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          b2b = [];
          b2bcess = [];
          b2ccess = [];
          b2cdnrcess = [];
          b2cdnurcess = [];
          b2c = [];
          items = [];
          taxs = [];
          localtaxAmount = 0;
          taxAmount = 0;
          cdnr = [];
          cdnur = [];
          itemnilrate = [];
          if (data.length > 0) {
            data.forEach(function (item) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.PurchaseLedger && item.PurchaseLedger.gst_number) {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2bcess.push(el.itemone);
                    }
                    if (el.igst_tax != '0' || el.igst_tax !== "0") {
                      item.ledger = item.PurchaseLedger;
                      b2b.push(item);
                      delete item.PurchaseLedger;
                    }
                  });
                }
              } else {
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      b2ccess.push(el.itemone);
                    }
                    if (el.igst_tax != '0' || el.igst_tax !== "0") {
                      item.ledger = item.PurchaseLedger;
                      b2c.push(item);
                      delete item.PurchaseLedger;
                    }
                  });
                }
              }
              if (item.item_entries && item.item_entries.length > 0) {
                item.item_entries.forEach(function (el) {
                  if (el.igst_tax == '0' || el.igst_tax === "0") {
                    itemnilrate.push(el);
                  }
                });
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
            // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
          }

          if (ddata.length > 0) {
            // cdata.forEach((item, index)=>{
            //     if(item.tax_entries && item.tax_entries.length>0){
            //         item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
            //             return prev + Number(cur.amount);
            //           }, 0);
            //     }else{
            //         item.taxAmount = 0;
            //     }
            //     if(item.CreditBuyer && item.CreditBuyer.gst_number){
            //         if(item.item_entries && item.item_entries.length>0){
            //             item.item_entries.forEach(el=>{
            //                 if(el.itemone && el.itemone.cess){
            //                     b2cdnrcess.push(el.itemone)
            //                 }
            //             })
            //         }
            //         item.ledger = item.CreditBuyer;
            //         delete  item.CreditBuyer;
            //         cdnr.push(item);
            //     }else{
            //         if(item.item_entries && item.item_entries.length>0){
            //             item.item_entries.forEach(el=>{
            //                 if(el.itemone && el.itemone.cess){
            //                     b2cdnurcess.push(el.itemone)
            //                 }
            //             })
            //         }
            //         item.ledger = item.CreditBuyer;
            //         delete  item.CreditBuyer;
            //         cdnur.push(item);
            //     }
            //     if(item.item_entries && item.item_entries.length>0){
            //         item.item_entries.forEach(el=>{
            //             if(el.igst_tax=='0' || el.igst_tax==='0'){
            //                 itemnilrate.push(el)
            //             }
            //         })
            //     }
            //     if(item.item_entries && item.item_entries.length>0){
            //         items = items.concat(item.item_entries);
            //     }
            //     if(item.tax_entries && item.tax_entries.length>0){
            //         taxs = taxs.concat(item.tax_entries);
            //     }
            // }) 
            ddata.forEach(function (item, index) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.DebitBuyer && item.DebitBuyer.gst_number) {
                item.ledger = item.DebitBuyer;
                delete item.DebitBuyer;
                cdnr.push(item);
              } else {
                item.ledger = item.DebitBuyer;
                delete item.DebitBuyer;
                cdnur.push(item);
              }
              if (item.item_entries && item.item_entries.length > 0) {
                item.item_entries.forEach(function (el) {
                  if (el.igst_tax == '0' || el.igst_tax === '0') {
                    itemnilrate.push(el);
                  }
                });
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
          }
          b2bObject = (_b2bObject2 = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_b2bObject2, "cess_amount", 0), _defineProperty(_b2bObject2, "invoice_amount", 0), _b2bObject2);
          b2cObject = (_b2cObject2 = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_b2cObject2, "cess_amount", 0), _defineProperty(_b2cObject2, "invoice_amount", 0), _b2cObject2);
          cdnrObject = (_cdnrObject2 = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_cdnrObject2, "cess_amount", 0), _defineProperty(_cdnrObject2, "invoice_amount", 0), _cdnrObject2);
          cdnurObject = (_cdnurObject2 = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_cdnurObject2, "cess_amount", 0), _defineProperty(_cdnurObject2, "invoice_amount", 0), _cdnurObject2);
          nilObject = (_nilObject2 = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0
          }, _defineProperty(_nilObject2, "cess_amount", 0), _defineProperty(_nilObject2, "invoice_amount", 0), _nilObject2);
          total = {
            voucher_count: 0,
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            tax_amount: 0,
            invoice_amount: 0
          };
          if (!(b2c.length > 0)) {
            _context10.next = 36;
            break;
          }
          b2cObject.voucher_count = b2c.length;
          b2cObject.cess_amount = 0;
          total.voucher_count = Number(total.voucher_count) + Number(b2cObject.voucher_count);
          _context10.next = 27;
          return b2c.forEach(function (element) {
            if (element.is_local == "yes") {
              b2cObject.cgst_amount = Number(b2cObject.cgst_amount ? b2cObject.cgst_amount : 0) + Number(element.taxAmount ? Number(element.taxAmount) / 2 : 0);
              b2cObject.sgst_amount = Number(b2cObject.sgst_amount ? b2cObject.sgst_amount : 0) + Number(element.taxAmount ? Number(element.taxAmount) / 2 : 0);
            } else {
              b2cObject.igst_amount = Number(b2cObject.igst_amount ? b2cObject.igst_amount : 0) + Number(element.taxAmount ? element.taxAmount : 0);
            }
            element.item_entries.map(function (el) {
              b2cObject.taxable_value = Number(b2cObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2cObject.tax_amount = Number(b2cObject.igst_amount ? b2cObject.igst_amount : 0) + Number(b2cObject.cgst_amount ? b2cObject.cgst_amount : 0) + Number(b2cObject.sgst_amount ? b2cObject.sgst_amount : 0);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount ? b2cObject.tax_amount : 0) + Number(b2cObject.taxable_value ? b2cObject.taxable_value : 0);
          });
        case 27:
          if (!(b2ccess.length > 0)) {
            _context10.next = 30;
            break;
          }
          _context10.next = 30;
          return b2ccess.forEach(function (element) {
            b2cObject.cess_amount = Number(b2cObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(b2cObject.cess_amount);
          });
        case 30:
          total.taxable_value = Number(total.taxable_value) + Number(b2cObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) + Number(b2cObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) + Number(b2cObject.cgst_amount);
          total.tax_amount = Number(total.tax_amount) + Number(b2cObject.tax_amount);
          total.sgst_amount = Number(total.sgst_amount) + Number(b2cObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) + Number(b2cObject.igst_amount);
        case 36:
          if (!(b2b.length > 0)) {
            _context10.next = 51;
            break;
          }
          b2bObject.voucher_count = b2b.length;
          b2bObject.cess_amount = 0;
          total.voucher_count = Number(total.voucher_count) + Number(b2bObject.voucher_count);
          _context10.next = 42;
          return b2b.forEach(function (element) {
            if (element.is_local == "yes") {
              b2bObject.cgst_amount = Number(b2bObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              b2bObject.sgst_amount = Number(b2bObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              b2bObject.igst_amount = Number(b2bObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              b2bObject.taxable_value = Number(b2bObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2bObject.tax_amount = Number(b2bObject.igst_amount) + Number(b2bObject.cgst_amount) + Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount) + Number(b2bObject.taxable_value);
          });
        case 42:
          if (!(b2bcess.length > 0)) {
            _context10.next = 45;
            break;
          }
          _context10.next = 45;
          return b2bcess.forEach(function (element) {
            b2bObject.cess_amount = Number(b2bObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(b2bObject.cess_amount);
          });
        case 45:
          total.taxable_value = Number(total.taxable_value) + Number(b2bObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) + Number(b2bObject.invoice_amount);
          total.tax_amount = Number(total.tax_amount) + Number(b2bObject.tax_amount);
          total.cgst_amount = Number(total.cgst_amount) + Number(b2bObject.cgst_amount);
          total.sgst_amount = Number(total.sgst_amount) + Number(b2bObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) + Number(b2bObject.igst_amount);
        case 51:
          if (!(cdnr.length > 0)) {
            _context10.next = 66;
            break;
          }
          cdnrObject.voucher_count = cdnr.length;
          total.voucher_count = Number(total.voucher_count) + Number(cdnrObject.voucher_count);
          cdnrObject.cess_amount = 0;
          _context10.next = 57;
          return cdnr.forEach(function (element) {
            if (element.is_local == "yes") {
              cdnrObject.cgst_amount = Number(cdnrObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              cdnrObject.sgst_amount = Number(cdnrObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              cdnrObject.igst_amount = Number(cdnrObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              cdnrObject.taxable_value = Number(cdnrObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount) + Number(cdnrObject.cgst_amount) + Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount) + Number(cdnrObject.taxable_value);
          });
        case 57:
          if (!(b2cdnrcess.length > 0)) {
            _context10.next = 60;
            break;
          }
          _context10.next = 60;
          return b2cdnrcess.forEach(function (element) {
            cdnrObject.cess_amount = Number(cdnrObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(cdnrObject.cess_amount);
          });
        case 60:
          total.taxable_value = Number(total.taxable_value) - Number(cdnrObject.taxable_value);
          total.invoice_amount = Number(total.invoice_amount) - Number(cdnrObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) - Number(cdnrObject.cgst_amount);
          total.tax_amount = Number(total.tax_amount) - Number(cdnrObject.tax_amount);
          total.sgst_amount = Number(total.sgst_amount) - Number(cdnrObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) - Number(cdnrObject.igst_amount);
        case 66:
          if (!(cdnur.length > 0)) {
            _context10.next = 81;
            break;
          }
          cdnurObject.voucher_count = cdnur.length;
          total.voucher_count = Number(total.voucher_count) + Number(cdnurObject.voucher_count);
          cdnurObject.cess_amount = 0;
          _context10.next = 72;
          return cdnur.forEach(function (element) {
            if (element.is_local == "yes") {
              cdnurObject.cgst_amount = Number(cdnurObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              cdnurObject.sgst_amount = Number(cdnurObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              cdnurObject.igst_amount = Number(cdnurObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              cdnurObject.taxable_value = Number(cdnurObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            cdnurObject.tax_amount = Number(cdnurObject.igst_amount) + Number(cdnurObject.cgst_amount) + Number(cdnurObject.sgst_amount);
            cdnurObject.invoice_amount = Number(cdnurObject.tax_amount) + Number(cdnurObject.taxable_value);
          });
        case 72:
          if (!(b2cdnurcess.length > 0)) {
            _context10.next = 75;
            break;
          }
          _context10.next = 75;
          return b2cdnurcess.forEach(function (element) {
            cdnurObject.cess_amount = Number(cdnurObject.cess_amount) + Number(element.cess_tax);
            total.cess_amount = Number(total.cess_amount) + Number(cdnurObject.cess_amount);
          });
        case 75:
          total.taxable_value = Number(total.taxable_value) - Number(cdnurObject.taxable_value);
          total.tax_amount = Number(total.tax_amount) - Number(cdnurObject.tax_amount);
          total.invoice_amount = Number(total.invoice_amount) - Number(cdnurObject.invoice_amount);
          total.cgst_amount = Number(total.cgst_amount) - Number(cdnurObject.cgst_amount);
          total.sgst_amount = Number(total.sgst_amount) - Number(cdnurObject.sgst_amount);
          total.igst_amount = Number(total.igst_amount) - Number(cdnurObject.igst_amount);
        case 81:
          if (!(itemnilrate.length > 0)) {
            _context10.next = 88;
            break;
          }
          nilObject.voucher_count = itemnilrate.length;
          total.voucher_count = Number(total.voucher_count) + Number(nilObject.voucher_count);
          nilObject.cess_amount = 0;
          _context10.next = 87;
          return itemnilrate.forEach(function (element) {
            nilObject.taxable_value = Number(nilObject.taxable_value) + Number(Number(element.quantity) * Number(element.price));
            nilObject.invoice_amount = Number(nilObject.taxable_value);

            // total.invoice_amount = Number(total.invoice_amount)+Number(nilObject.invoice_amount);
            // total.tax_amount = Number(total.tax_amount)+Number(nilObject.tax_amount);
            // total.cgst_amount = Number(total.cgst_amount)+Number(cdnurObject.cgst_amount);
            // total.sgst_amount = Number(total.sgst_amount)+Number(cdnurObject.sgst_amount);
            // total.igst_amount = Number(total.igst_amount)+Number(cdnurObject.igst_amount);
          });
        case 87:
          total.taxable_value = Number(total.taxable_value) + Number(nilObject.taxable_value);
        case 88:
          return _context10.abrupt("return", {
            b2b: b2bObject,
            b2c: b2cObject,
            cdnr: cdnrObject,
            cdnur: cdnurObject,
            nilObject: nilObject,
            total: total
          });
        case 89:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _getB2bledgerPurchasesummary.apply(this, arguments);
}
function getB2bledgerPurchase(_x8) {
  return _getB2bledgerPurchase.apply(this, arguments);
}
function _getB2bledgerPurchase() {
  _getB2bledgerPurchase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data) {
    var b2b, b2c, items, taxs;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          b2b = [];
          b2c = [];
          items = [];
          taxs = [];
          if (data.length > 0) {
            data.forEach(function (item) {
              if (item.tax_entries && item.tax_entries.length > 0) {
                item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                  return prev + Number(cur.amount);
                }, 0);
              } else {
                item.taxAmount = 0;
              }
              if (item.PurchaseLedger && item.PurchaseLedger.gst_number) {
                item.ledger = item.PurchaseLedger;
                b2b.push(item);
                delete item.PurchaseLedger;
              } else {
                item.ledger = item.PurchaseLedger;
                b2c.push(item);
                delete item.PurchaseLedger;
              }
              if (item.item_entries && item.item_entries.length > 0) {
                items = items.concat(item.item_entries);
              }
              if (item.tax_entries && item.tax_entries.length > 0) {
                taxs = taxs.concat(item.tax_entries);
              }
            });
            // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
          }
          return _context11.abrupt("return", {
            b2b: b2b,
            b2c: b2c,
            items: items,
            taxs: taxs
          });
        case 6:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _getB2bledgerPurchase.apply(this, arguments);
}
function getCreditDebit(_x9, _x10) {
  return _getCreditDebit.apply(this, arguments);
}
function _getCreditDebit() {
  _getCreditDebit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(credit, debit) {
    var cdnr, cdnur;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          cdnr = [];
          cdnur = [];
          if (credit.length > 0 || debit.length > 0) {
            credit.forEach(function (item, index) {
              if (item.CreditBuyer && item.CreditBuyer.gst_number) {
                item.ledger = item.CreditBuyer;
                delete item.CreditBuyer;
                cdnr.push(item);
              } else {
                item.ledger = item.CreditBuyer;
                delete item.CreditBuyer;
                cdnur.push(item);
              }
            });
            debit.forEach(function (item, index) {
              if (item.DebitBuyer && item.DebitBuyer.gst_number) {
                item.ledger = item.DebitBuyer;
                delete item.DebitBuyer;
                cdnr.push(item);
              } else {
                item.ledger = item.DebitBuyer;
                delete item.DebitBuyer;
                cdnur.push(item);
              }
            });
          }
          return _context12.abrupt("return", {
            cdnr: cdnr,
            cdnur: cdnur
          });
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _getCreditDebit.apply(this, arguments);
}
function getSaleDocs(_x11) {
  return _getSaleDocs.apply(this, arguments);
}
function _getSaleDocs() {
  _getSaleDocs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(array) {
    var docs;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          docs = [];
          _context14.next = 3;
          return array.forEach( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(item) {
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    delete item.ledger;
                    delete item.item_entries;
                    delete item.tax_entries;
                    item.type = 'credit';
                    _context13.next = 6;
                    return item;
                  case 6:
                    if (!_context13.sent) {
                      _context13.next = 10;
                      break;
                    }
                    _context13.t0 = item.id;
                    _context13.next = 11;
                    break;
                  case 10:
                    _context13.t0 = '';
                  case 11:
                    item.voucher_number = _context13.t0;
                    _context13.next = 14;
                    return item.invoice_id;
                  case 14:
                    _context13.t1 = _context13.sent;
                    if (!(_context13.t1 <= 9)) {
                      _context13.next = 19;
                      break;
                    }
                    _context13.t2 = "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/00").concat(item.invoice_id);
                    _context13.next = 20;
                    break;
                  case 19:
                    _context13.t2 = item.invoice_id > 9 ? "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/0").concat(item.invoice_id) : "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/").concat(item.invoice_id);
                  case 20:
                    item.invoiceId = _context13.t2;
                    docs.push(item);
                  case 22:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            return function (_x29) {
              return _ref8.apply(this, arguments);
            };
          }());
        case 3:
          return _context14.abrupt("return", docs);
        case 4:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _getSaleDocs.apply(this, arguments);
}
function getPurchaseDocs(_x12) {
  return _getPurchaseDocs.apply(this, arguments);
}
function _getPurchaseDocs() {
  _getPurchaseDocs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(array) {
    var docs;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          docs = [];
          _context16.next = 3;
          return array.forEach( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(item) {
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    delete item.ledger;
                    delete item.item_entries;
                    delete item.tax_entries;
                    item.type = 'credit';
                    _context15.next = 6;
                    return item;
                  case 6:
                    if (!_context15.sent) {
                      _context15.next = 10;
                      break;
                    }
                    _context15.t0 = item.id;
                    _context15.next = 11;
                    break;
                  case 10:
                    _context15.t0 = '';
                  case 11:
                    item.voucher_number = _context15.t0;
                    _context15.next = 14;
                    return item.invoice_id;
                  case 14:
                    _context15.t1 = _context15.sent;
                    if (!(_context15.t1 <= 9)) {
                      _context15.next = 19;
                      break;
                    }
                    _context15.t2 = "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/00").concat(item.invoice_id);
                    _context15.next = 20;
                    break;
                  case 19:
                    _context15.t2 = item.invoice_id > 9 ? "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/0").concat(item.invoice_id) : "".concat(item.current_year.toString().substr(-2) + "-" + item.end_year.toString().substr(-2), "/").concat(item.invoice_id);
                  case 20:
                    item.invoiceId = _context15.t2;
                    docs.push(item);
                  case 22:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }));
            return function (_x30) {
              return _ref9.apply(this, arguments);
            };
          }());
        case 3:
          return _context16.abrupt("return", docs);
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _getPurchaseDocs.apply(this, arguments);
}
function getExemp(_x13) {
  return _getExemp.apply(this, arguments);
}
function _getExemp() {
  _getExemp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(array) {
    var exemp;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          exemp = [];
          _context19.next = 3;
          return array.forEach( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(item) {
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    if (item.item_entries.length > 0) {
                      item.item_entries.forEach( /*#__PURE__*/function () {
                        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(data) {
                          return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                            while (1) switch (_context17.prev = _context17.next) {
                              case 0:
                                if (data.igst_tax == '0') {
                                  console.log("item.ledger", item.ledger);
                                  if (item.is_local.toLowerCase() == 'yes') {
                                    data.is_local = true;
                                    data.discription = 'Inter-State supplies to registered ' + item.ledger.name;
                                  } else {
                                    data.is_local = false;
                                    data.discription = 'Intra-State supplies to registered ' + item.ledger.name;
                                  }
                                  exemp.push(data);
                                }
                              case 1:
                              case "end":
                                return _context17.stop();
                            }
                          }, _callee17);
                        }));
                        return function (_x32) {
                          return _ref11.apply(this, arguments);
                        };
                      }());
                    }
                  case 1:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18);
            }));
            return function (_x31) {
              return _ref10.apply(this, arguments);
            };
          }());
        case 3:
          return _context19.abrupt("return", exemp);
        case 4:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return _getExemp.apply(this, arguments);
}
function gst3bCal(_x14) {
  return _gst3bCal.apply(this, arguments);
}
function _gst3bCal() {
  _gst3bCal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(data) {
    var salesall, salesnogst, purchase, purchasenogst, purchasecess, creditcess, debitcess, debit, itemnilrate, salesallcess, salesnogstcess, b2cdnrcess, b2cdnurcess, items, creditdata, taxs, creditall, b2bObject, b2cObject, cdnrObject, purchaseObject, purchasenotgetObject, debitObject;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          salesall = [];
          salesnogst = [];
          purchase = [];
          purchasenogst = [];
          purchasecess = [];
          creditcess = [];
          debitcess = [];
          debit = [];
          itemnilrate = [];
          salesallcess = [];
          salesnogstcess = [];
          b2cdnrcess = [];
          b2cdnurcess = [];
          items = [];
          creditdata = [];
          taxs = [];
          creditall = [];
          if (data.length > 0) {
            data.map(function (item) {
              if (item.voucher_type == "sale") {
                if (item.tax_entries && item.tax_entries.length > 0) {
                  item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
                } else {
                  item.taxAmount = 0;
                }
                if (item.ledger && item.ledger.gst_number) {
                  if (item.item_entries && item.item_entries.length > 0) {
                    item.item_entries.forEach(function (el) {
                      if (el.itemone && el.itemone.cess) {
                        salesallcess.push(el.itemone);
                      }
                    });
                  }
                  salesall.push(item);
                } else {
                  if (item.item_entries && item.item_entries.length > 0) {
                    item.item_entries.forEach(function (el) {
                      if (el.itemone && el.itemone.cess) {
                        salesnogstcess.push(el.itemone);
                      }
                    });
                  }
                  salesall.push(item);
                  salesnogst.push(item);
                }
              } else if (item.voucher_type == "purchase") {
                if (item.tax_entries && item.tax_entries.length > 0) {
                  item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
                } else {
                  item.taxAmount = 0;
                }
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      purchasecess.push(el.itemone);
                    }
                  });
                }
                purchase.push(item);
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.igst_tax == '0' || el.igst_tax === '0') {
                      itemnilrate.push(el);
                      purchasenogst.push(item);
                    }
                  });
                }
              } else if (item.voucher_type == "credit") {
                if (item.tax_entries && item.tax_entries.length > 0) {
                  item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
                } else {
                  item.taxAmount = 0;
                }
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      creditcess.push(el.itemone);
                    }
                  });
                }
                creditdata.push(item);
              } else if (item.voucher_type == "debit") {
                if (item.tax_entries && item.tax_entries.length > 0) {
                  item.taxAmount = item.tax_entries.reduce(function (prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
                } else {
                  item.taxAmount = 0;
                }
                if (item.item_entries && item.item_entries.length > 0) {
                  item.item_entries.forEach(function (el) {
                    if (el.itemone && el.itemone.cess) {
                      debitcess.push(el.itemone);
                    }
                  });
                }
                debit.push(item);
              }
            });
          }
          b2bObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          b2cObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          cdnrObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          purchaseObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          purchasenotgetObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          debitObject = {
            taxable_value: 0,
            igst_amount: 0,
            cgst_amount: 0,
            sgst_amount: 0,
            cess_amount: 0,
            invoice_amount: 0
          };
          if (!(salesall.length > 0)) {
            _context20.next = 30;
            break;
          }
          _context20.next = 27;
          return salesall.forEach(function (element) {
            if (element.is_local == "yes") {
              b2bObject.cgst_amount = Number(b2bObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              b2bObject.sgst_amount = Number(b2bObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              b2bObject.igst_amount = Number(b2bObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              b2bObject.taxable_value = Number(b2bObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2bObject.tax_amount = Number(b2bObject.igst_amount) + Number(b2bObject.cgst_amount) + Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount) + Number(b2bObject.taxable_value);
          });
        case 27:
          if (!(salesallcess.length > 0)) {
            _context20.next = 30;
            break;
          }
          _context20.next = 30;
          return salesallcess.forEach(function (element) {
            b2bObject.cess_amount = Number(b2bObject.cess_amount) + Number(b2bObject.cess_tax);
          });
        case 30:
          if (!(salesnogst.length > 0)) {
            _context20.next = 36;
            break;
          }
          _context20.next = 33;
          return salesnogst.forEach(function (element) {
            if (element.is_local == "yes") {
              b2cObject.cgst_amount = Number(b2cObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              b2cObject.sgst_amount = Number(b2cObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              b2cObject.igst_amount = Number(b2cObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              b2cObject.taxable_value = Number(b2cObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            b2cObject.tax_amount = Number(b2cObject.igst_amount) + Number(b2cObject.cgst_amount) + Number(b2cObject.sgst_amount);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount) + Number(b2cObject.taxable_value);
          });
        case 33:
          if (!(salesnogstcess.length > 0)) {
            _context20.next = 36;
            break;
          }
          _context20.next = 36;
          return salesnogstcess.forEach(function (element) {
            b2cObject.cess_amount = Number(b2cObject.cess_amount) + Number(b2cObject.cess_tax);
          });
        case 36:
          if (!(creditdata.length > 0)) {
            _context20.next = 56;
            break;
          }
          _context20.next = 39;
          return creditdata.forEach(function (element) {
            if (element.is_local == "yes") {
              cdnrObject.cgst_amount = Number(cdnrObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              cdnrObject.sgst_amount = Number(cdnrObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              cdnrObject.igst_amount = Number(cdnrObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              cdnrObject.taxable_value = Number(cdnrObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount) + Number(cdnrObject.cgst_amount) + Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount) + Number(cdnrObject.taxable_value);
          });
        case 39:
          if (!(creditcess.length > 0)) {
            _context20.next = 42;
            break;
          }
          _context20.next = 42;
          return creditcess.forEach(function (element) {
            cdnrObject.cess_amount = Number(cdnrObject.cess_amount) + Number(cdnrObject.cess_tax);
          });
        case 42:
          b2bObject.tax_amount = Number(b2bObject.tax_amount) - Number(cdnrObject.tax_amount);
          b2bObject.invoice_amount = Number(b2bObject.invoice_amount) - Number(cdnrObject.invoice_amount);
          b2bObject.taxable_value = Number(b2bObject.taxable_value) - Number(cdnrObject.taxable_value);
          b2bObject.igst_amount = Number(b2bObject.igst_amount) - Number(cdnrObject.igst_amount);
          b2bObject.cgst_amount = Number(b2bObject.cgst_amount) - Number(cdnrObject.cgst_amount);
          b2bObject.sgst_amount = Number(b2bObject.sgst_amount) - Number(cdnrObject.sgst_amount);
          b2bObject.cess_amount = Number(b2bObject.cess_amount) - Number(cdnrObject.cess_amount);
          b2cObject.tax_amount = Number(b2cObject.tax_amount) - Number(cdnrObject.tax_amount);
          b2cObject.invoice_amount = Number(b2cObject.invoice_amount) - Number(cdnrObject.invoice_amount);
          b2cObject.taxable_value = Number(b2cObject.taxable_value) - Number(cdnrObject.taxable_value);
          b2cObject.igst_amount = Number(b2cObject.igst_amount) - Number(cdnrObject.igst_amount);
          b2cObject.cgst_amount = Number(b2cObject.cgst_amount) - Number(cdnrObject.cgst_amount);
          b2cObject.sgst_amount = Number(b2cObject.sgst_amount) - Number(cdnrObject.sgst_amount);
          b2cObject.cess_amount = Number(b2cObject.cess_amount) - Number(cdnrObject.cess_amount);
        case 56:
          if (!(purchase.length > 0)) {
            _context20.next = 62;
            break;
          }
          _context20.next = 59;
          return purchase.forEach(function (element) {
            if (element.is_local == "yes") {
              purchaseObject.cgst_amount = Number(purchaseObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              purchaseObject.sgst_amount = Number(purchaseObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              purchaseObject.igst_amount = Number(purchaseObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              purchaseObject.taxable_value = Number(purchaseObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            purchaseObject.tax_amount = Number(purchaseObject.igst_amount) + Number(purchaseObject.cgst_amount) + Number(purchaseObject.sgst_amount);
            purchaseObject.invoice_amount = Number(purchaseObject.tax_amount) + Number(purchaseObject.taxable_value);
          });
        case 59:
          if (!(purchasecess.length > 0)) {
            _context20.next = 62;
            break;
          }
          _context20.next = 62;
          return purchasecess.forEach(function (element) {
            purchaseObject.cess_amount = Number(purchaseObject.cess_amount) + Number(purchaseObject.cess_tax);
          });
        case 62:
          if (!(purchasenogst.length > 0)) {
            _context20.next = 65;
            break;
          }
          _context20.next = 65;
          return purchasenogst.forEach(function (element) {
            if (element.is_local == "yes") {
              purchasenotgetObject.cgst_amount = Number(purchasenotgetObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              purchasenotgetObject.sgst_amount = Number(purchasenotgetObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              purchasenotgetObject.igst_amount = Number(purchasenotgetObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              purchasenotgetObject.taxable_value = Number(purchasenotgetObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            purchasenotgetObject.tax_amount = Number(purchasenotgetObject.igst_amount) + Number(purchasenotgetObject.cgst_amount) + Number(purchasenotgetObject.sgst_amount);
            purchasenotgetObject.invoice_amount = Number(purchasenotgetObject.tax_amount) + Number(purchasenotgetObject.taxable_value);
          });
        case 65:
          if (!(debit.length > 0)) {
            _context20.next = 85;
            break;
          }
          _context20.next = 68;
          return debit.forEach(function (element) {
            if (element.is_local == "yes") {
              debitObject.cgst_amount = Number(debitObject.cgst_amount) + Number(Number(element.taxAmount) / 2);
              debitObject.sgst_amount = Number(debitObject.sgst_amount) + Number(Number(element.taxAmount) / 2);
            } else {
              debitObject.igst_amount = Number(debitObject.igst_amount) + Number(element.taxAmount);
            }
            element.item_entries.map(function (el) {
              debitObject.taxable_value = Number(debitObject.taxable_value) + Number(Number(el.quantity) * Number(el.price));
            });
            debitObject.tax_amount = Number(debitObject.igst_amount) + Number(debitObject.cgst_amount) + Number(debitObject.sgst_amount);
            debitObject.invoice_amount = Number(debitObject.tax_amount) + Number(debitObject.taxable_value);
          });
        case 68:
          if (!(debitcess.length > 0)) {
            _context20.next = 71;
            break;
          }
          _context20.next = 71;
          return debitcess.forEach(function (element) {
            debitObject.cess_amount = Number(debitObject.cess_amount) + Number(debitObject.cess_tax);
          });
        case 71:
          purchaseObject.tax_amount = Number(purchaseObject.tax_amount) - Number(debitObject.tax_amount);
          purchaseObject.invoice_amount = Number(purchaseObject.invoice_amount) - Number(debitObject.invoice_amount);
          purchaseObject.taxable_value = Number(purchaseObject.taxable_value) - Number(debitObject.taxable_value);
          purchaseObject.igst_amount = Number(purchaseObject.igst_amount) - Number(debitObject.igst_amount);
          purchaseObject.cgst_amount = Number(purchaseObject.cgst_amount) - Number(debitObject.cgst_amount);
          purchaseObject.sgst_amount = Number(purchaseObject.sgst_amount) - Number(debitObject.sgst_amount);
          purchaseObject.cess_amount = Number(purchaseObject.cess_amount) - Number(debitObject.cess_amount);
          purchasenotgetObject.tax_amount = Number(purchasenotgetObject.tax_amount ? purchasenotgetObject.tax_amount : 0) - Number(debitObject.tax_amount);
          purchasenotgetObject.invoice_amount = Number(purchasenotgetObject.invoice_amount) - Number(debitObject.invoice_amount);
          purchasenotgetObject.taxable_value = Number(purchasenotgetObject.taxable_value) - Number(debitObject.taxable_value);
          purchasenotgetObject.igst_amount = Number(purchasenotgetObject.igst_amount) - Number(debitObject.igst_amount);
          purchasenotgetObject.cgst_amount = Number(purchasenotgetObject.cgst_amount) - Number(debitObject.cgst_amount);
          purchasenotgetObject.sgst_amount = Number(purchasenotgetObject.sgst_amount) - Number(debitObject.sgst_amount);
          purchasenotgetObject.cess_amount = Number(purchasenotgetObject.cess_amount) - Number(debitObject.cess_amount);
        case 85:
          return _context20.abrupt("return", {
            salesOwnword: b2bObject,
            salesnotgst: b2cObject,
            purchaseItc: purchaseObject,
            purchaseItcnill: purchasenotgetObject
          });
        case 86:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return _gst3bCal.apply(this, arguments);
}
exports.getReportGST1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, res) {
    var _invoice_date, _invoice_date2, _invoice_date3, saleVoucher, creditVoucher, debitVoucher, creditdebit, b2bandb2c;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date = {}, _defineProperty(_invoice_date, Op.gte, data.start_date), _defineProperty(_invoice_date, Op.lte, data.end_date), _invoice_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              }
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          saleVoucher = _context.sent;
          _context.next = 6;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date2 = {}, _defineProperty(_invoice_date2, Op.gte, data.start_date), _defineProperty(_invoice_date2, Op.lte, data.end_date), _invoice_date2)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'CreditBuyer'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          creditVoucher = _context.sent;
          _context.next = 9;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date3 = {}, _defineProperty(_invoice_date3, Op.gte, data.start_date), _defineProperty(_invoice_date3, Op.lte, data.end_date), _invoice_date3)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'DebitBuyer'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          debitVoucher = _context.sent;
          if (!saleVoucher) {
            _context.next = 34;
            break;
          }
          _context.next = 13;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 13:
          saleVoucher = _context.sent;
          _context.next = 16;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 16:
          creditVoucher = _context.sent;
          _context.next = 19;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 19:
          debitVoucher = _context.sent;
          _context.next = 22;
          return getCreditDebit(creditVoucher, debitVoucher);
        case 22:
          creditdebit = _context.sent;
          _context.next = 25;
          return getB2bledger(saleVoucher);
        case 25:
          b2bandb2c = _context.sent;
          _context.next = 28;
          return getExemp(saleVoucher);
        case 28:
          b2bandb2c.exemp = _context.sent;
          b2bandb2c = Object.assign(b2bandb2c, creditdebit);
          _context.next = 32;
          return getSaleDocs(saleVoucher);
        case 32:
          b2bandb2c.docs = _context.sent;
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: saleVoucher,
            // creditVoucher:creditVoucher,
            // debitVoucher:debitVoucher,
            data: b2bandb2c
          });
        case 34:
          _context.next = 40;
          break;
        case 36:
          _context.prev = 36;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0, " == = = ");
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 40:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 36]]);
  }));
  return function (_x15, _x16) {
    return _ref.apply(this, arguments);
  };
}();
exports.getReportGST1Summary = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var _invoice_date4, _invoice_date5, saleVoucher, creditVoucher, b2bandb2c;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date4 = {}, _defineProperty(_invoice_date4, Op.gte, data.start_date), _defineProperty(_invoice_date4, Op.lte, data.end_date), _invoice_date4)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          saleVoucher = _context2.sent;
          _context2.next = 6;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date5 = {}, _defineProperty(_invoice_date5, Op.gte, data.start_date), _defineProperty(_invoice_date5, Op.lte, data.end_date), _invoice_date5)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'CreditBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          creditVoucher = _context2.sent;
          if (!saleVoucher) {
            _context2.next = 19;
            break;
          }
          _context2.next = 10;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 10:
          saleVoucher = _context2.sent;
          console.log("saleVoucher", saleVoucher.length);
          _context2.next = 14;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 14:
          creditVoucher = _context2.sent;
          _context2.next = 17;
          return getB2bledgersummary(saleVoucher, creditVoucher, []);
        case 17:
          b2bandb2c = _context2.sent;
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            data: b2bandb2c
          });
        case 19:
          _context2.next = 25;
          break;
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0, " == = = ");
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 25:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 21]]);
  }));
  return function (_x17, _x18) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getReportGST1download = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var wb, ws, b2b, b2ba, b2cl, b2cla, b2cs, b2csa, cdnr, cdnra, cdnur, cdnura, exp, expa, at, ata, atadj, atadja, exemp, hsn, docs, master;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          wb = new xl.Workbook();
          ws = wb.addWorksheet('Help Instruction');
          b2b = wb.addWorksheet('b2b');
          b2ba = wb.addWorksheet('b2ba');
          b2cl = wb.addWorksheet('b2cl');
          b2cla = wb.addWorksheet('b2cla');
          b2cs = wb.addWorksheet('b2cs');
          b2csa = wb.addWorksheet('b2csa');
          cdnr = wb.addWorksheet('cdnr');
          cdnra = wb.addWorksheet('cdnra');
          cdnur = wb.addWorksheet('cdnur');
          cdnura = wb.addWorksheet('cdnura');
          exp = wb.addWorksheet('exp');
          expa = wb.addWorksheet('expa');
          at = wb.addWorksheet('at');
          ata = wb.addWorksheet('ata');
          atadj = wb.addWorksheet('atadj');
          atadja = wb.addWorksheet('atadja');
          exemp = wb.addWorksheet('exemp');
          hsn = wb.addWorksheet('hsn');
          docs = wb.addWorksheet('docs');
          master = wb.addWorksheet('master'); // Set value of cell A1 to 100 as a number type styled with paramaters of style
          ws.cell(1, 1).number(100);

          // Set value of cell B1 to 200 as a number type styled with paramaters of style
          ws.cell(1, 2).number(200);

          // Set value of cell C1 to a formula styled with paramaters of style
          ws.cell(1, 3).formula('A1 + B1');

          // Set value of cell A2 to 'string' styled with paramaters of style
          ws.cell(2, 1).string('string');

          // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
          ws.cell(3, 1).bool(true).style({
            font: {
              size: 14
            }
          });
          wb.write(_path["default"].join(__dirname, '../../uploads/excel/') + 'Excel.xlsx');
          _context3.next = 35;
          break;
        case 31:
          _context3.prev = 31;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 31]]);
  }));
  return function (_x19, _x20) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getReportGST2 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var _invoice_date6, _invoice_date7, _invoice_date8, purchaseVoucher, creditVoucher, debitVoucher, creditdebit, b2bandb2c;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date6 = {}, _defineProperty(_invoice_date6, Op.gte, data.start_date), _defineProperty(_invoice_date6, Op.lte, data.end_date), _invoice_date6)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          purchaseVoucher = _context4.sent;
          _context4.next = 6;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date7 = {}, _defineProperty(_invoice_date7, Op.gte, data.start_date), _defineProperty(_invoice_date7, Op.lte, data.end_date), _invoice_date7)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'CreditBuyer'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          creditVoucher = _context4.sent;
          _context4.next = 9;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date8 = {}, _defineProperty(_invoice_date8, Op.gte, data.start_date), _defineProperty(_invoice_date8, Op.lte, data.end_date), _invoice_date8)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'DebitBuyer'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          debitVoucher = _context4.sent;
          if (!purchaseVoucher) {
            _context4.next = 34;
            break;
          }
          _context4.next = 13;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 13:
          purchaseVoucher = _context4.sent;
          _context4.next = 16;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 16:
          creditVoucher = _context4.sent;
          _context4.next = 19;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 19:
          debitVoucher = _context4.sent;
          _context4.next = 22;
          return getCreditDebit(creditVoucher, debitVoucher);
        case 22:
          creditdebit = _context4.sent;
          _context4.next = 25;
          return getB2bledgerPurchase(purchaseVoucher);
        case 25:
          b2bandb2c = _context4.sent;
          _context4.next = 28;
          return getExemp(purchaseVoucher);
        case 28:
          b2bandb2c.exemp = _context4.sent;
          b2bandb2c = Object.assign(b2bandb2c, creditdebit);
          _context4.next = 32;
          return getPurchaseDocs(purchaseVoucher);
        case 32:
          b2bandb2c.docs = _context4.sent;
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: purchaseVoucher,
            data: b2bandb2c
          });
        case 34:
          _context4.next = 40;
          break;
        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0,
            message: "Something went wrong!"
          });
        case 40:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 36]]);
  }));
  return function (_x21, _x22) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getReportGST2Summary = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, res) {
    var _invoice_date9, _invoice_date10, purchaseVoucher, debitVoucher, b2bandb2c;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date9 = {}, _defineProperty(_invoice_date9, Op.gte, data.start_date), _defineProperty(_invoice_date9, Op.lte, data.end_date), _invoice_date9)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          purchaseVoucher = _context5.sent;
          _context5.next = 6;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date10 = {}, _defineProperty(_invoice_date10, Op.gte, data.start_date), _defineProperty(_invoice_date10, Op.lte, data.end_date), _invoice_date10)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'DebitBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'credit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'credit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          debitVoucher = _context5.sent;
          if (!purchaseVoucher) {
            _context5.next = 18;
            break;
          }
          _context5.next = 10;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 10:
          purchaseVoucher = _context5.sent;
          _context5.next = 13;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 13:
          debitVoucher = _context5.sent;
          _context5.next = 16;
          return getB2bledgerPurchasesummary(purchaseVoucher, [], debitVoucher);
        case 16:
          b2bandb2c = _context5.sent;
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            purchaseVoucher: purchaseVoucher,
            debitVoucher: debitVoucher,
            data: b2bandb2c
          });
        case 18:
          _context5.next = 24;
          break;
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0, " == = = ");
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context5.t0,
            message: "Something went wrong!"
          });
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return function (_x23, _x24) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getReportGST3B = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, res) {
    var _invoice_date11, _invoice_date12, _invoice_date13, _invoice_date14, saleVoucher, creditVoucher, purchaseVoucher, debitVoucher, array, returnObj;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date11 = {}, _defineProperty(_invoice_date11, Op.gte, data.start_date), _defineProperty(_invoice_date11, Op.lte, data.end_date), _invoice_date11)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          saleVoucher = _context6.sent;
          _context6.next = 6;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date12 = {}, _defineProperty(_invoice_date12, Op.gte, data.start_date), _defineProperty(_invoice_date12, Op.lte, data.end_date), _invoice_date12)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'CreditBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          creditVoucher = _context6.sent;
          _context6.next = 9;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date13 = {}, _defineProperty(_invoice_date13, Op.gte, data.start_date), _defineProperty(_invoice_date13, Op.lte, data.end_date), _invoice_date13)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          purchaseVoucher = _context6.sent;
          _context6.next = 12;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date14 = {}, _defineProperty(_invoice_date14, Op.gte, data.start_date), _defineProperty(_invoice_date14, Op.lte, data.end_date), _invoice_date14)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'DebitBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 12:
          debitVoucher = _context6.sent;
          _context6.next = 15;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 15:
          saleVoucher = _context6.sent;
          _context6.next = 18;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 18:
          purchaseVoucher = _context6.sent;
          _context6.next = 21;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 21:
          creditVoucher = _context6.sent;
          _context6.next = 24;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 24:
          debitVoucher = _context6.sent;
          array = [];
          _context6.next = 28;
          return saleVoucher.map(function (item) {
            item.voucher_type = 'sale';
            item.ledger = item.SalesLedger;
            delete item.SalesLedger;
            array.push(item);
          });
        case 28:
          _context6.next = 30;
          return purchaseVoucher.map(function (item) {
            item.voucher_type = 'purchase';
            item.ledger = item.PurchaseLedger;
            delete item.PurchaseLedger;
            array.push(item);
          });
        case 30:
          _context6.next = 32;
          return creditVoucher.map(function (item) {
            item.voucher_type = 'credit';
            item.ledger = item.CreditBuyer;
            delete item.CreditBuyer;
            array.push(item);
          });
        case 32:
          _context6.next = 34;
          return debitVoucher.map(function (item) {
            item.voucher_type = 'debit';
            item.ledger = item.DebitBuyer;
            delete item.DebitBuyer;
            array.push(item);
          });
        case 34:
          _context6.next = 36;
          return gst3bCal(array);
        case 36:
          returnObj = _context6.sent;
          return _context6.abrupt("return", {
            totalvoucher: array.length,
            data: returnObj,
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully"
          });
        case 40:
          _context6.prev = 40;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0,
            message: "Something went wrong!"
          });
        case 44:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 40]]);
  }));
  return function (_x25, _x26) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getReportGST3BSummary = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var _invoice_date15, _invoice_date16, _invoice_date17, saleVoucher, creditVoucher, debitVoucher, b2bandb2c;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date15 = {}, _defineProperty(_invoice_date15, Op.gte, data.start_date), _defineProperty(_invoice_date15, Op.lte, data.end_date), _invoice_date15)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Sales'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          saleVoucher = _context7.sent;
          _context7.next = 6;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date16 = {}, _defineProperty(_invoice_date16, Op.gte, data.start_date), _defineProperty(_invoice_date16, Op.lte, data.end_date), _invoice_date16)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'CreditBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'Debit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 6:
          creditVoucher = _context7.sent;
          _context7.next = 9;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date17 = {}, _defineProperty(_invoice_date17, Op.gte, data.start_date), _defineProperty(_invoice_date17, Op.lte, data.end_date), _invoice_date17)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'DebitBuyer'
            }, {
              model: _itemInteries["default"],
              required: false,
              where: {
                type: 'credit'
              },
              include: [{
                model: _items["default"],
                as: "itemone"
              }]
            }, {
              model: _taxInteries["default"],
              required: false,
              where: {
                type: 'credit'
              }
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          debitVoucher = _context7.sent;
          if (!saleVoucher) {
            _context7.next = 25;
            break;
          }
          _context7.next = 13;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 13:
          saleVoucher = _context7.sent;
          _context7.next = 16;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 16:
          creditVoucher = _context7.sent;
          _context7.next = 19;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 19:
          debitVoucher = _context7.sent;
          _context7.next = 22;
          return getB2bledgersummary(saleVoucher, creditVoucher, debitVoucher);
        case 22:
          b2bandb2c = _context7.sent;
          // b2bandb2c.exemp = await getExemp(saleVoucher);
          // b2bandb2c = Object.assign(b2bandb2c, creditdebit)
          // b2bandb2c.docs =await getSaleDocs(saleVoucher);

          console.log("saleVoucher", saleVoucher.length);
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            data: b2bandb2c
          });
        case 25:
          _context7.next = 31;
          break;
        case 27:
          _context7.prev = 27;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0, " == = = ");
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 31:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 27]]);
  }));
  return function (_x27, _x28) {
    return _ref7.apply(this, arguments);
  };
}();