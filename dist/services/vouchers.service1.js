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
require("@babel/polyfill");
var _item_stock_voucher_entries = _interopRequireDefault(require("../models/item_stock_voucher_entries"));
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
function groupFuncation(_x) {
  return _groupFuncation.apply(this, arguments);
}
function _groupFuncation() {
  _groupFuncation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(array) {
    return _regeneratorRuntime().wrap(function _callee11$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", array.reduce(function (acc, obj) {
            var key;
            // console.log(obj, "= = = = == =object");
            if (obj.subAccount && obj.subAccount.name) {
              key = obj.subAccount.name;
            } else {
              key = 'MainGroup';
            }
            if (!acc[key]) {
              acc[key] = [];
            }
            // Add object to list for given key's value
            acc[key].push(obj);
            return acc;
          }, {}));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee11);
  }));
  return _groupFuncation.apply(this, arguments);
}
function getAllLedgerVoucherprivious(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
  return _getAllLedgerVoucherprivious.apply(this, arguments);
}
function _getAllLedgerVoucherprivious() {
  _getAllLedgerVoucherprivious = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(start_date, end_date, ledger_id, company_id, openingbalncecredit, openingbalncedebit, email) {
    var journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, ledger, array, i, s, mainArray, creditamount, debetamount, totalbalnce;
    return _regeneratorRuntime().wrap(function _callee12$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          paymentVoucher = [];
          _context14.next = 4;
          return _ledger["default"].findOne({
            where: {
              uid: ledger_id,
              company_id: company_id
            }
          });
        case 4:
          ledger = _context14.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context14.next = 790;
            break;
          }
          if (!ledger.dataValues.tax_key) {
            _context14.next = 21;
            break;
          }
          _context14.next = 9;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: ledger_id
            }, {
              type: 'Sales'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _saleVoucher["default"],
              as: 'tax',
              include: [{
                model: _ledger["default"],
                as: 'SalesLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          saleVoucher = _context14.sent;
          _context14.next = 12;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: ledger_id
            }, {
              type: 'Purchase'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _purchaseVoucher["default"],
              as: 'taxp',
              include: [{
                model: _ledger["default"],
                as: 'PurchaseLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 12:
          purchaseVoucher = _context14.sent;
          _context14.next = 15;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: ledger_id
            }, {
              type: 'Debit'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _creditVoucher["default"],
              as: 'taxc',
              include: [{
                model: _ledger["default"],
                as: 'CreditBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 15:
          creditVoucher = _context14.sent;
          _context14.next = 18;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: ledger_id
            }, {
              type: 'Credit'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _debitVoucher["default"],
              as: 'taxd',
              include: [{
                model: _ledger["default"],
                as: 'DebitBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 18:
          debitVoucher = _context14.sent;
          _context14.next = 57;
          break;
        case 21:
          if (!ledger.dataValues.sale_key) {
            _context14.next = 36;
            break;
          }
          _context14.next = 24;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: ledger_id
            }, {
              type: 'Sales'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _saleVoucher["default"],
              as: 'Vouchers',
              include: [{
                model: _ledger["default"],
                as: 'SalesLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 24:
          saleVoucher = _context14.sent;
          _context14.next = 27;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: ledger_id
            }, {
              type: 'Purchase'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _purchaseVoucher["default"],
              as: 'Voucherp',
              include: [{
                model: _ledger["default"],
                as: 'PurchaseLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 27:
          purchaseVoucher = _context14.sent;
          _context14.next = 30;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: ledger_id
            }, {
              type: 'Debit'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _creditVoucher["default"],
              as: 'Voucherc',
              include: [{
                model: _ledger["default"],
                as: 'CreditBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 30:
          creditVoucher = _context14.sent;
          _context14.next = 33;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: ledger_id
            }, {
              type: 'ow1kac6rc1y'
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _debitVoucher["default"],
              as: 'Voucherd',
              include: [{
                model: _ledger["default"],
                as: 'DebitBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 33:
          debitVoucher = _context14.sent;
          _context14.next = 57;
          break;
        case 36:
          _context14.next = 38;
          return _journalInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: ledger_id
            }, {
              company_id: company_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: "VoucherLedger"
            }, {
              model: _journalVoucher["default"],
              as: 'Voucher'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 38:
          journalVoucher = _context14.sent;
          _context14.next = 41;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              buyer_ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 41:
          saleVoucher = _context14.sent;
          _context14.next = 44;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              buyer_ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 44:
          purchaseVoucher = _context14.sent;
          _context14.next = 47;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              buyer_ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
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
        case 47:
          creditVoucher = _context14.sent;
          _context14.next = 50;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              buyer_ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
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
        case 50:
          debitVoucher = _context14.sent;
          _context14.next = 53;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'ReciptBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 53:
          recieptVoucher = _context14.sent;
          _context14.next = 56;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: company_id
            }, {
              ledger_id: ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, start_date)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PaymentBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 56:
          paymentVoucher = _context14.sent;
        case 57:
          _context14.next = 59;
          return (0, _ledger2.decreption)(ledger, 'object', email);
        case 59:
          ledger = _context14.sent;
          if (!(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key)) {
            _context14.next = 70;
            break;
          }
          _context14.next = 63;
          return (0, _journalEntries.decreptionJournalEntries)(journalVoucher, 'array', email);
        case 63:
          journalVoucher = _context14.sent;
          _context14.next = 66;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', email);
        case 66:
          recieptVoucher = _context14.sent;
          _context14.next = 69;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', email);
        case 69:
          paymentVoucher = _context14.sent;
        case 70:
          _context14.next = 72;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', email);
        case 72:
          saleVoucher = _context14.sent;
          _context14.next = 75;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', email);
        case 75:
          purchaseVoucher = _context14.sent;
          _context14.next = 78;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', email);
        case 78:
          creditVoucher = _context14.sent;
          _context14.next = 81;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', email);
        case 81:
          debitVoucher = _context14.sent;
          _context14.next = 84;
          return [];
        case 84:
          array = _context14.sent;
          if (!(journalVoucher && journalVoucher.length > 0)) {
            _context14.next = 139;
            break;
          }
          i = 0;
        case 87:
          if (!(i < journalVoucher.length)) {
            _context14.next = 139;
            break;
          }
          _context14.next = 90;
          return journalVoucher[i].type;
        case 90:
          _context14.t0 = _context14.sent;
          if (!(_context14.t0 === 'debit')) {
            _context14.next = 100;
            break;
          }
          _context14.next = 94;
          return journalVoucher[i].amount;
        case 94:
          journalVoucher[i].debitAmount = _context14.sent;
          _context14.next = 97;
          return 0;
        case 97:
          journalVoucher[i].creditAmount = _context14.sent;
          _context14.next = 106;
          break;
        case 100:
          _context14.next = 102;
          return 0;
        case 102:
          journalVoucher[i].debitAmount = _context14.sent;
          _context14.next = 105;
          return journalVoucher[i].amount;
        case 105:
          journalVoucher[i].creditAmount = _context14.sent;
        case 106:
          if (!journalVoucher[i].Voucher) {
            _context14.next = 124;
            break;
          }
          _context14.next = 109;
          return journalVoucher[i].Voucher.invoice_date;
        case 109:
          journalVoucher[i].invoice_date = _context14.sent;
          _context14.next = 112;
          return journalVoucher[i].Voucher.id;
        case 112:
          journalVoucher[i].voucher_number = _context14.sent;
          _context14.next = 115;
          return journalVoucher[i].Voucher.invoice_id;
        case 115:
          _context14.t1 = _context14.sent;
          if (!(_context14.t1 <= 9)) {
            _context14.next = 120;
            break;
          }
          _context14.t2 = "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/00").concat(journalVoucher[i].Voucher.invoice_id);
          _context14.next = 121;
          break;
        case 120:
          _context14.t2 = journalVoucher[i].Voucher.invoice_id > 9 ? "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/0").concat(journalVoucher[i].Voucher.invoice_id) : "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/").concat(journalVoucher[i].Voucher.invoice_id);
        case 121:
          journalVoucher[i].invoice_id = _context14.t2;
          _context14.next = 127;
          break;
        case 124:
          journalVoucher[i].invoice_date = '';
          journalVoucher[i].voucher_number = '';
          journalVoucher[i].invoice_id = '';
        case 127:
          _context14.next = 129;
          return 'journal';
        case 129:
          journalVoucher[i].voucher_type = _context14.sent;
          _context14.next = 132;
          return journalVoucher[i].VoucherLedger;
        case 132:
          journalVoucher[i].ledger = _context14.sent;
          delete journalVoucher[i].VoucherLedger;
          _context14.next = 136;
          return array.push(journalVoucher[i]);
        case 136:
          i++;
          _context14.next = 87;
          break;
        case 139:
          if (!(saleVoucher && saleVoucher.length > 0)) {
            _context14.next = 275;
            break;
          }
          s = 0;
        case 141:
          if (!(s < saleVoucher.length)) {
            _context14.next = 275;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context14.next = 191;
            break;
          }
          _context14.next = 145;
          return 'sale';
        case 145:
          saleVoucher[s].voucher_type = _context14.sent;
          if (!saleVoucher[s].Vouchers) {
            _context14.next = 153;
            break;
          }
          _context14.next = 149;
          return saleVoucher[s].Vouchers.SalesLedger;
        case 149:
          saleVoucher[s].ledger = _context14.sent;
          delete saleVoucher[s].Vouchers.SalesLedger;
          _context14.next = 154;
          break;
        case 153:
          saleVoucher[s].ledger = {};
        case 154:
          _context14.next = 156;
          return saleVoucher[s].Vouchers;
        case 156:
          if (!_context14.sent) {
            _context14.next = 160;
            break;
          }
          _context14.t3 = saleVoucher[s].Vouchers;
          _context14.next = 161;
          break;
        case 160:
          _context14.t3 = {};
        case 161:
          saleVoucher[s].Voucher = _context14.t3;
          saleVoucher[s].type = 'credit';
          _context14.next = 165;
          return 0;
        case 165:
          saleVoucher[s].debitAmount = _context14.sent;
          _context14.next = 168;
          return saleVoucher[s].amount;
        case 168:
          saleVoucher[s].creditAmount = _context14.sent;
          saleVoucher[s].amount = saleVoucher[s].amount;
          _context14.next = 172;
          return saleVoucher[s].Vouchers;
        case 172:
          if (!_context14.sent) {
            _context14.next = 176;
            break;
          }
          _context14.t4 = saleVoucher[s].Vouchers.id;
          _context14.next = 177;
          break;
        case 176:
          _context14.t4 = '';
        case 177:
          saleVoucher[s].voucher_number = _context14.t4;
          _context14.next = 180;
          return saleVoucher[s].Vouchers;
        case 180:
          if (!_context14.sent) {
            _context14.next = 184;
            break;
          }
          _context14.t5 = saleVoucher[s].Vouchers.invoice_id <= 9 ? "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/00").concat(saleVoucher[s].Vouchers.invoice_id) : saleVoucher[s].Vouchers.invoice_id > 9 ? "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/0").concat(saleVoucher[s].Vouchers.invoice_id) : "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/").concat(saleVoucher[s].Vouchers.invoice_id);
          _context14.next = 185;
          break;
        case 184:
          _context14.t5 = '';
        case 185:
          saleVoucher[s].invoice_id = _context14.t5;
          delete saleVoucher[s].Vouchers;
          _context14.next = 189;
          return array.push(saleVoucher[s]);
        case 189:
          _context14.next = 272;
          break;
        case 191:
          if (!ledger.dataValues.tax_key) {
            _context14.next = 240;
            break;
          }
          _context14.next = 194;
          return 'sale';
        case 194:
          saleVoucher[s].voucher_type = _context14.sent;
          if (!saleVoucher[s].tax) {
            _context14.next = 202;
            break;
          }
          _context14.next = 198;
          return saleVoucher[s].tax.SalesLedger;
        case 198:
          saleVoucher[s].ledger = _context14.sent;
          delete saleVoucher[s].tax.SalesLedger;
          _context14.next = 203;
          break;
        case 202:
          saleVoucher[s].ledger = {};
        case 203:
          _context14.next = 205;
          return saleVoucher[s].tax;
        case 205:
          if (!_context14.sent) {
            _context14.next = 209;
            break;
          }
          _context14.t6 = saleVoucher[s].tax;
          _context14.next = 210;
          break;
        case 209:
          _context14.t6 = {};
        case 210:
          saleVoucher[s].Voucher = _context14.t6;
          saleVoucher[s].type = 'credit';
          _context14.next = 214;
          return 0;
        case 214:
          saleVoucher[s].debitAmount = _context14.sent;
          _context14.next = 217;
          return saleVoucher[s].amount;
        case 217:
          saleVoucher[s].creditAmount = _context14.sent;
          saleVoucher[s].amount = saleVoucher[s].amount;
          _context14.next = 221;
          return saleVoucher[s].tax;
        case 221:
          if (!_context14.sent) {
            _context14.next = 225;
            break;
          }
          _context14.t7 = saleVoucher[s].tax.id;
          _context14.next = 226;
          break;
        case 225:
          _context14.t7 = '';
        case 226:
          saleVoucher[s].voucher_number = _context14.t7;
          _context14.next = 229;
          return saleVoucher[s].tax;
        case 229:
          if (!_context14.sent) {
            _context14.next = 233;
            break;
          }
          _context14.t8 = saleVoucher[s].tax.invoice_id <= 9 ? "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/00").concat(saleVoucher[s].tax.invoice_id) : saleVoucher[s].tax.invoice_id > 9 ? "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/0").concat(saleVoucher[s].tax.invoice_id) : "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/").concat(saleVoucher[s].tax.invoice_id);
          _context14.next = 234;
          break;
        case 233:
          _context14.t8 = '';
        case 234:
          saleVoucher[s].invoice_id = _context14.t8;
          delete saleVoucher[s].tax;
          _context14.next = 238;
          return array.push(saleVoucher[s]);
        case 238:
          _context14.next = 272;
          break;
        case 240:
          _context14.next = 242;
          return 'sale';
        case 242:
          saleVoucher[s].voucher_type = _context14.sent;
          _context14.next = 245;
          return saleVoucher[s].SalesLedger;
        case 245:
          saleVoucher[s].ledger = _context14.sent;
          _context14.next = 248;
          return {};
        case 248:
          saleVoucher[s].Voucher = _context14.sent;
          saleVoucher[s].type = 'debit';
          _context14.next = 252;
          return saleVoucher[s].total_amount;
        case 252:
          saleVoucher[s].debitAmount = _context14.sent;
          _context14.next = 255;
          return 0;
        case 255:
          saleVoucher[s].creditAmount = _context14.sent;
          saleVoucher[s].amount = saleVoucher[s].total_amount;
          _context14.next = 259;
          return saleVoucher[s].id;
        case 259:
          saleVoucher[s].voucher_number = _context14.sent;
          _context14.next = 262;
          return saleVoucher[s].invoice_id;
        case 262:
          _context14.t9 = _context14.sent;
          if (!(_context14.t9 <= 9)) {
            _context14.next = 267;
            break;
          }
          _context14.t10 = "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/00").concat(saleVoucher[s].invoice_id);
          _context14.next = 268;
          break;
        case 267:
          _context14.t10 = saleVoucher[s].invoice_id > 9 ? "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/0").concat(saleVoucher[s].invoice_id) : "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/").concat(ssaleVoucher[s].invoice_id);
        case 268:
          saleVoucher[s].invoice_id = _context14.t10;
          delete saleVoucher[s].SalesLedger;
          _context14.next = 272;
          return array.push(saleVoucher[s]);
        case 272:
          s++;
          _context14.next = 141;
          break;
        case 275:
          if (!(purchaseVoucher && purchaseVoucher.length > 0)) {
            _context14.next = 411;
            break;
          }
          s = 0;
        case 277:
          if (!(s < purchaseVoucher.length)) {
            _context14.next = 411;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context14.next = 327;
            break;
          }
          _context14.next = 281;
          return 'purchase';
        case 281:
          purchaseVoucher[s].voucher_type = _context14.sent;
          if (!purchaseVoucher[s].Voucherp) {
            _context14.next = 289;
            break;
          }
          _context14.next = 285;
          return purchaseVoucher[s].Voucherp.PurchaseLedger;
        case 285:
          purchaseVoucher[s].ledger = _context14.sent;
          delete purchaseVoucher[s].Voucherp.PurchaseLedger;
          _context14.next = 290;
          break;
        case 289:
          purchaseVoucher[s].ledger = {};
        case 290:
          _context14.next = 292;
          return purchaseVoucher[s].Voucherp;
        case 292:
          if (!_context14.sent) {
            _context14.next = 296;
            break;
          }
          _context14.t11 = purchaseVoucher[s].Voucherp;
          _context14.next = 297;
          break;
        case 296:
          _context14.t11 = {};
        case 297:
          purchaseVoucher[s].Voucher = _context14.t11;
          purchaseVoucher[s].type = 'debit';
          _context14.next = 301;
          return purchaseVoucher[s].amount;
        case 301:
          purchaseVoucher[s].debitAmount = _context14.sent;
          _context14.next = 304;
          return 0;
        case 304:
          purchaseVoucher[s].creditAmount = _context14.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].amount;
          _context14.next = 308;
          return purchaseVoucher[s].Voucherp;
        case 308:
          if (!_context14.sent) {
            _context14.next = 312;
            break;
          }
          _context14.t12 = purchaseVoucher[s].Voucherp.id;
          _context14.next = 313;
          break;
        case 312:
          _context14.t12 = '';
        case 313:
          purchaseVoucher[s].voucher_number = _context14.t12;
          _context14.next = 316;
          return purchaseVoucher[s].Voucherp;
        case 316:
          if (!_context14.sent) {
            _context14.next = 320;
            break;
          }
          _context14.t13 = purchaseVoucher[s].taxp.invoice_id <= 9 ? "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/00").concat(purchaseVoucher[s].Voucherp.invoice_id) : purchaseVoucher[s].Voucherp.invoice_id > 9 ? "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/0").concat(purchaseVoucher[s].Voucherp.invoice_id) : "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].Voucherp.invoice_id);
          _context14.next = 321;
          break;
        case 320:
          _context14.t13 = '';
        case 321:
          purchaseVoucher[s].invoice_id = _context14.t13;
          delete purchaseVoucher[s].Voucherp;
          _context14.next = 325;
          return array.push(purchaseVoucher[s]);
        case 325:
          _context14.next = 408;
          break;
        case 327:
          if (!ledger.dataValues.tax_key) {
            _context14.next = 376;
            break;
          }
          _context14.next = 330;
          return 'purchase';
        case 330:
          purchaseVoucher[s].voucher_type = _context14.sent;
          if (!purchaseVoucher[s].taxp) {
            _context14.next = 338;
            break;
          }
          _context14.next = 334;
          return purchaseVoucher[s].taxp.PurchaseLedger;
        case 334:
          purchaseVoucher[s].ledger = _context14.sent;
          delete purchaseVoucher[s].taxp.PurchaseLedger;
          _context14.next = 339;
          break;
        case 338:
          purchaseVoucher[s].ledger = {};
        case 339:
          _context14.next = 341;
          return purchaseVoucher[s].taxp;
        case 341:
          if (!_context14.sent) {
            _context14.next = 345;
            break;
          }
          _context14.t14 = purchaseVoucher[s].taxp;
          _context14.next = 346;
          break;
        case 345:
          _context14.t14 = {};
        case 346:
          purchaseVoucher[s].Voucher = _context14.t14;
          purchaseVoucher[s].type = 'debit';
          _context14.next = 350;
          return purchaseVoucher[s].amount;
        case 350:
          purchaseVoucher[s].debitAmount = _context14.sent;
          _context14.next = 353;
          return 0;
        case 353:
          purchaseVoucher[s].creditAmount = _context14.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].amount;
          _context14.next = 357;
          return purchaseVoucher[s].taxp;
        case 357:
          if (!_context14.sent) {
            _context14.next = 361;
            break;
          }
          _context14.t15 = purchaseVoucher[s].taxp.id;
          _context14.next = 362;
          break;
        case 361:
          _context14.t15 = '';
        case 362:
          purchaseVoucher[s].voucher_number = _context14.t15;
          _context14.next = 365;
          return purchaseVoucher[s].taxp;
        case 365:
          if (!_context14.sent) {
            _context14.next = 369;
            break;
          }
          _context14.t16 = purchaseVoucher[s].taxp.invoice_id <= 9 ? "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/00").concat(purchaseVoucher[s].taxp.invoice_id) : purchaseVoucher[s].taxp.invoice_id > 9 ? "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/0").concat(purchaseVoucher[s].taxp.invoice_id) : "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].taxp.invoice_id);
          _context14.next = 370;
          break;
        case 369:
          _context14.t16 = '';
        case 370:
          purchaseVoucher[s].invoice_id = _context14.t16;
          delete purchaseVoucher[s].tax;
          _context14.next = 374;
          return array.push(purchaseVoucher[s]);
        case 374:
          _context14.next = 408;
          break;
        case 376:
          _context14.next = 378;
          return 'purchase';
        case 378:
          purchaseVoucher[s].voucher_type = _context14.sent;
          _context14.next = 381;
          return purchaseVoucher[s].PurchaseLedger;
        case 381:
          purchaseVoucher[s].ledger = _context14.sent;
          _context14.next = 384;
          return {};
        case 384:
          purchaseVoucher[s].Voucher = _context14.sent;
          purchaseVoucher[s].type = 'Credit';
          _context14.next = 388;
          return 0;
        case 388:
          purchaseVoucher[s].debitAmount = _context14.sent;
          _context14.next = 391;
          return purchaseVoucher[s].total_amount;
        case 391:
          purchaseVoucher[s].creditAmount = _context14.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].total_amount;
          _context14.next = 395;
          return purchaseVoucher[s].id;
        case 395:
          purchaseVoucher[s].voucher_number = _context14.sent;
          _context14.next = 398;
          return purchaseVoucher[s].invoice_id;
        case 398:
          _context14.t17 = _context14.sent;
          if (!(_context14.t17 <= 9)) {
            _context14.next = 403;
            break;
          }
          _context14.t18 = "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/00").concat(purchaseVoucher[s].invoice_id);
          _context14.next = 404;
          break;
        case 403:
          _context14.t18 = purchaseVoucher[s].invoice_id > 9 ? "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/0").concat(purchaseVoucher[s].invoice_id) : "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].invoice_id);
        case 404:
          purchaseVoucher[s].invoice_id = _context14.t18;
          delete purchaseVoucher[s].PurchaseLedger;
          _context14.next = 408;
          return array.push(purchaseVoucher[s]);
        case 408:
          s++;
          _context14.next = 277;
          break;
        case 411:
          if (!(creditVoucher && creditVoucher.length > 0)) {
            _context14.next = 547;
            break;
          }
          s = 0;
        case 413:
          if (!(s < creditVoucher.length)) {
            _context14.next = 547;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context14.next = 463;
            break;
          }
          _context14.next = 417;
          return 'sale';
        case 417:
          creditVoucher[s].voucher_type = _context14.sent;
          if (!creditVoucher[s].Voucherc) {
            _context14.next = 425;
            break;
          }
          _context14.next = 421;
          return creditVoucher[s].Voucherc.CreditBuyer;
        case 421:
          creditVoucher[s].ledger = _context14.sent;
          delete creditVoucher[s].Voucherc.CreditBuyer;
          _context14.next = 426;
          break;
        case 425:
          creditVoucher[s].ledger = {};
        case 426:
          _context14.next = 428;
          return creditVoucher[s].Voucherc;
        case 428:
          if (!_context14.sent) {
            _context14.next = 432;
            break;
          }
          _context14.t19 = creditVoucher[s].Voucherc;
          _context14.next = 433;
          break;
        case 432:
          _context14.t19 = {};
        case 433:
          creditVoucher[s].Voucher = _context14.t19;
          creditVoucher[s].type = 'credit';
          _context14.next = 437;
          return 0;
        case 437:
          creditVoucher[s].debitAmount = _context14.sent;
          _context14.next = 440;
          return creditVoucher[s].amount;
        case 440:
          creditVoucher[s].creditAmount = _context14.sent;
          creditVoucher[s].amount = creditVoucher[s].amount;
          _context14.next = 444;
          return creditVoucher[s].Voucherc;
        case 444:
          if (!_context14.sent) {
            _context14.next = 448;
            break;
          }
          _context14.t20 = creditVoucher[s].Voucherc.id;
          _context14.next = 449;
          break;
        case 448:
          _context14.t20 = '';
        case 449:
          creditVoucher[s].voucher_number = _context14.t20;
          _context14.next = 452;
          return creditVoucher[s].Voucherc;
        case 452:
          if (!_context14.sent) {
            _context14.next = 456;
            break;
          }
          _context14.t21 = creditVoucher[s].Voucherc.invoice_id <= 9 ? "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/00").concat(creditVoucher[s].Voucherc.invoice_id) : creditVoucher[s].Voucherc.invoice_id > 9 ? "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/0").concat(creditVoucher[s].Voucherc.invoice_id) : "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/").concat(creditVoucher[s].Voucherc.invoice_id);
          _context14.next = 457;
          break;
        case 456:
          _context14.t21 = '';
        case 457:
          creditVoucher[s].invoice_id = _context14.t21;
          delete creditVoucher[s].Voucherc;
          _context14.next = 461;
          return array.push(creditVoucher[s]);
        case 461:
          _context14.next = 544;
          break;
        case 463:
          if (!ledger.dataValues.tax_key) {
            _context14.next = 512;
            break;
          }
          _context14.next = 466;
          return 'sale';
        case 466:
          creditVoucher[s].voucher_type = _context14.sent;
          if (!creditVoucher[s].taxc) {
            _context14.next = 474;
            break;
          }
          _context14.next = 470;
          return creditVoucher[s].taxc.CreditBuyer;
        case 470:
          creditVoucher[s].ledger = _context14.sent;
          delete creditVoucher[s].taxc.CreditBuyer;
          _context14.next = 475;
          break;
        case 474:
          creditVoucher[s].ledger = {};
        case 475:
          _context14.next = 477;
          return creditVoucher[s].taxc;
        case 477:
          if (!_context14.sent) {
            _context14.next = 481;
            break;
          }
          _context14.t22 = creditVoucher[s].taxc;
          _context14.next = 482;
          break;
        case 481:
          _context14.t22 = {};
        case 482:
          creditVoucher[s].Voucher = _context14.t22;
          creditVoucher[s].type = 'credit';
          _context14.next = 486;
          return 0;
        case 486:
          creditVoucher[s].debitAmount = _context14.sent;
          _context14.next = 489;
          return creditVoucher[s].amount;
        case 489:
          creditVoucher[s].creditAmount = _context14.sent;
          creditVoucher[s].amount = creditVoucher[s].amount;
          _context14.next = 493;
          return creditVoucher[s].taxc;
        case 493:
          if (!_context14.sent) {
            _context14.next = 497;
            break;
          }
          _context14.t23 = creditVoucher[s].taxc.id;
          _context14.next = 498;
          break;
        case 497:
          _context14.t23 = '';
        case 498:
          creditVoucher[s].voucher_number = _context14.t23;
          _context14.next = 501;
          return creditVoucher[s].taxc;
        case 501:
          if (!_context14.sent) {
            _context14.next = 505;
            break;
          }
          _context14.t24 = creditVoucher[s].taxc.invoice_id <= 9 ? "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/00").concat(creditVoucher[s].taxc.invoice_id) : creditVoucher[s].taxc.invoice_id > 9 ? "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/0").concat(creditVoucher[s].taxc.invoice_id) : "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/").concat(creditVoucher[s].taxc.invoice_id);
          _context14.next = 506;
          break;
        case 505:
          _context14.t24 = '';
        case 506:
          creditVoucher[s].invoice_id = _context14.t24;
          delete creditVoucher[s].taxc;
          _context14.next = 510;
          return array.push(creditVoucher[s]);
        case 510:
          _context14.next = 544;
          break;
        case 512:
          _context14.next = 514;
          return 'Credit note';
        case 514:
          creditVoucher[s].voucher_type = _context14.sent;
          _context14.next = 517;
          return creditVoucher[s].CreditBuyer;
        case 517:
          creditVoucher[s].ledger = _context14.sent;
          _context14.next = 520;
          return {};
        case 520:
          creditVoucher[s].Voucher = _context14.sent;
          creditVoucher[s].type = 'debit';
          _context14.next = 524;
          return creditVoucher[s].total_amount;
        case 524:
          creditVoucher[s].debitAmount = _context14.sent;
          _context14.next = 527;
          return 0;
        case 527:
          creditVoucher[s].creditAmount = _context14.sent;
          creditVoucher[s].amount = creditVoucher[s].total_amount;
          _context14.next = 531;
          return creditVoucher[s].id;
        case 531:
          creditVoucher[s].voucher_number = _context14.sent;
          _context14.next = 534;
          return creditVoucher[s].invoice_id;
        case 534:
          _context14.t25 = _context14.sent;
          if (!(_context14.t25 <= 9)) {
            _context14.next = 539;
            break;
          }
          _context14.t26 = "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/00").concat(creditVoucher[s].invoice_id);
          _context14.next = 540;
          break;
        case 539:
          _context14.t26 = creditVoucher[s].invoice_id > 9 ? "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/0").concat(creditVoucher[s].invoice_id) : "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/").concat(creditVoucher[s].invoice_id);
        case 540:
          creditVoucher[s].invoice_id = _context14.t26;
          delete creditVoucher[s].CreditBuyer;
          _context14.next = 544;
          return array.push(creditVoucher[s]);
        case 544:
          s++;
          _context14.next = 413;
          break;
        case 547:
          if (!(debitVoucher && debitVoucher.length > 0)) {
            _context14.next = 683;
            break;
          }
          s = 0;
        case 549:
          if (!(s < debitVoucher.length)) {
            _context14.next = 683;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context14.next = 599;
            break;
          }
          _context14.next = 553;
          return 'sale';
        case 553:
          debitVoucher[s].voucher_type = _context14.sent;
          if (!debitVoucher[s].Voucherd) {
            _context14.next = 561;
            break;
          }
          _context14.next = 557;
          return debitVoucher[s].Voucherd.DebitBuyer;
        case 557:
          debitVoucher[s].ledger = _context14.sent;
          delete debitVoucher[s].Voucherd.DebitBuyer;
          _context14.next = 562;
          break;
        case 561:
          debitVoucher[s].ledger = {};
        case 562:
          _context14.next = 564;
          return debitVoucher[s].Voucherd;
        case 564:
          if (!_context14.sent) {
            _context14.next = 568;
            break;
          }
          _context14.t27 = debitVoucher[s].Voucherd;
          _context14.next = 569;
          break;
        case 568:
          _context14.t27 = {};
        case 569:
          debitVoucher[s].Voucher = _context14.t27;
          debitVoucher[s].type = 'debit';
          _context14.next = 573;
          return 0;
        case 573:
          debitVoucher[s].debitAmount = _context14.sent;
          _context14.next = 576;
          return debitVoucher[s].amount;
        case 576:
          debitVoucher[s].creditAmount = _context14.sent;
          debitVoucher[s].amount = debitVoucher[s].amount;
          _context14.next = 580;
          return debitVoucher[s].Voucherd;
        case 580:
          if (!_context14.sent) {
            _context14.next = 584;
            break;
          }
          _context14.t28 = debitVoucher[s].Voucherd.id;
          _context14.next = 585;
          break;
        case 584:
          _context14.t28 = '';
        case 585:
          debitVoucher[s].voucher_number = _context14.t28;
          _context14.next = 588;
          return debitVoucher[s].Voucherd;
        case 588:
          if (!_context14.sent) {
            _context14.next = 592;
            break;
          }
          _context14.t29 = debitVoucher[s].Voucherd.invoice_id <= 9 ? "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/00").concat(debitVoucher[s].Voucherd.invoice_id) : debitVoucher[s].Voucherd.invoice_id > 9 ? "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/0").concat(debitVoucher[s].Voucherd.invoice_id) : "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/").concat(debitVoucher[s].Voucherd.invoice_id);
          _context14.next = 593;
          break;
        case 592:
          _context14.t29 = '';
        case 593:
          debitVoucher[s].invoice_id = _context14.t29;
          delete debitVoucher[s].Voucherd;
          _context14.next = 597;
          return array.push(debitVoucher[s]);
        case 597:
          _context14.next = 680;
          break;
        case 599:
          if (!ledger.dataValues.tax_key) {
            _context14.next = 648;
            break;
          }
          _context14.next = 602;
          return 'sale';
        case 602:
          debitVoucher[s].voucher_type = _context14.sent;
          if (!debitVoucher[s].taxd) {
            _context14.next = 610;
            break;
          }
          _context14.next = 606;
          return debitVoucher[s].taxd.DebitBuyer;
        case 606:
          debitVoucher[s].ledger = _context14.sent;
          delete debitVoucher[s].taxd.DebitBuyer;
          _context14.next = 611;
          break;
        case 610:
          debitVoucher[s].ledger = {};
        case 611:
          _context14.next = 613;
          return debitVoucher[s].taxd;
        case 613:
          if (!_context14.sent) {
            _context14.next = 617;
            break;
          }
          _context14.t30 = debitVoucher[s].taxd;
          _context14.next = 618;
          break;
        case 617:
          _context14.t30 = {};
        case 618:
          debitVoucher[s].Voucher = _context14.t30;
          debitVoucher[s].type = 'debit';
          _context14.next = 622;
          return 0;
        case 622:
          debitVoucher[s].debitAmount = _context14.sent;
          _context14.next = 625;
          return debitVoucher[s].amount;
        case 625:
          debitVoucher[s].creditAmount = _context14.sent;
          debitVoucher[s].amount = debitVoucher[s].amount;
          _context14.next = 629;
          return debitVoucher[s].taxd;
        case 629:
          if (!_context14.sent) {
            _context14.next = 633;
            break;
          }
          _context14.t31 = debitVoucher[s].taxd.id;
          _context14.next = 634;
          break;
        case 633:
          _context14.t31 = '';
        case 634:
          debitVoucher[s].voucher_number = _context14.t31;
          _context14.next = 637;
          return debitVoucher[s].taxd;
        case 637:
          if (!_context14.sent) {
            _context14.next = 641;
            break;
          }
          _context14.t32 = debitVoucher[s].taxd.invoice_id <= 9 ? "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/00").concat(debitVoucher[s].taxd.invoice_id) : debitVoucher[s].taxd.invoice_id > 9 ? "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/0").concat(debitVoucher[s].taxd.invoice_id) : "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/").concat(debitVoucher[s].taxd.invoice_id);
          _context14.next = 642;
          break;
        case 641:
          _context14.t32 = '';
        case 642:
          debitVoucher[s].invoice_id = _context14.t32;
          delete debitVoucher[s].taxd;
          _context14.next = 646;
          return array.push(debitVoucher[s]);
        case 646:
          _context14.next = 680;
          break;
        case 648:
          _context14.next = 650;
          return 'Debit note';
        case 650:
          debitVoucher[s].voucher_type = _context14.sent;
          _context14.next = 653;
          return debitVoucher[s].DebitBuyer;
        case 653:
          debitVoucher[s].ledger = _context14.sent;
          _context14.next = 656;
          return {};
        case 656:
          debitVoucher[s].Voucher = _context14.sent;
          debitVoucher[s].type = 'Credit';
          _context14.next = 660;
          return 0;
        case 660:
          debitVoucher[s].debitAmount = _context14.sent;
          _context14.next = 663;
          return debitVoucher[s].total_amount;
        case 663:
          debitVoucher[s].creditAmount = _context14.sent;
          debitVoucher[s].amount = debitVoucher[s].total_amount;
          _context14.next = 667;
          return debitVoucher[s].id;
        case 667:
          debitVoucher[s].voucher_number = _context14.sent;
          _context14.next = 670;
          return debitVoucher[s].invoice_id;
        case 670:
          _context14.t33 = _context14.sent;
          if (!(_context14.t33 <= 9)) {
            _context14.next = 675;
            break;
          }
          _context14.t34 = "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/00").concat(debitVoucher[s].invoice_id);
          _context14.next = 676;
          break;
        case 675:
          _context14.t34 = debitVoucher[s].invoice_id > 9 ? "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/0").concat(debitVoucher[s].invoice_id) : "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/").concat(debitVoucher[s].invoice_id);
        case 676:
          debitVoucher[s].invoice_id = _context14.t34;
          delete debitVoucher[s].DebitBuyer;
          _context14.next = 680;
          return array.push(debitVoucher[s]);
        case 680:
          s++;
          _context14.next = 549;
          break;
        case 683:
          if (!(recieptVoucher && recieptVoucher.length > 0)) {
            _context14.next = 728;
            break;
          }
          i = 0;
        case 685:
          if (!(i < recieptVoucher.length)) {
            _context14.next = 728;
            break;
          }
          _context14.next = 688;
          return recieptVoucher[i].type;
        case 688:
          _context14.t35 = _context14.sent;
          if (!(_context14.t35 === 'debit')) {
            _context14.next = 698;
            break;
          }
          _context14.next = 692;
          return recieptVoucher[i].total_amount;
        case 692:
          recieptVoucher[i].debitAmount = _context14.sent;
          _context14.next = 695;
          return 0;
        case 695:
          recieptVoucher[i].creditAmount = _context14.sent;
          _context14.next = 704;
          break;
        case 698:
          _context14.next = 700;
          return 0;
        case 700:
          recieptVoucher[i].debitAmount = _context14.sent;
          _context14.next = 703;
          return recieptVoucher[i].total_amount;
        case 703:
          recieptVoucher[i].creditAmount = _context14.sent;
        case 704:
          _context14.next = 706;
          return recieptVoucher[i].ReciptBuyer;
        case 706:
          recieptVoucher[i].ledger = _context14.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context14.next = 710;
          return 'reciept';
        case 710:
          recieptVoucher[i].voucher_type = _context14.sent;
          _context14.next = 713;
          return recieptVoucher[i].id;
        case 713:
          recieptVoucher[i].voucher_number = _context14.sent;
          _context14.next = 716;
          return recieptVoucher[i].invoice_id;
        case 716:
          _context14.t36 = _context14.sent;
          if (!(_context14.t36 <= 9)) {
            _context14.next = 721;
            break;
          }
          _context14.t37 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context14.next = 722;
          break;
        case 721:
          _context14.t37 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 722:
          recieptVoucher[i].invoice_id = _context14.t37;
          _context14.next = 725;
          return array.push(recieptVoucher[i]);
        case 725:
          i++;
          _context14.next = 685;
          break;
        case 728:
          if (!(paymentVoucher && paymentVoucher.length > 0)) {
            _context14.next = 773;
            break;
          }
          i = 0;
        case 730:
          if (!(i < paymentVoucher.length)) {
            _context14.next = 773;
            break;
          }
          _context14.next = 733;
          return paymentVoucher[i].type;
        case 733:
          _context14.t38 = _context14.sent;
          if (!(_context14.t38 === 'debit')) {
            _context14.next = 743;
            break;
          }
          _context14.next = 737;
          return paymentVoucher[i].total_amount;
        case 737:
          paymentVoucher[i].debitAmount = _context14.sent;
          _context14.next = 740;
          return 0;
        case 740:
          paymentVoucher[i].creditAmount = _context14.sent;
          _context14.next = 749;
          break;
        case 743:
          _context14.next = 745;
          return 0;
        case 745:
          paymentVoucher[i].debitAmount = _context14.sent;
          _context14.next = 748;
          return paymentVoucher[i].total_amount;
        case 748:
          paymentVoucher[i].creditAmount = _context14.sent;
        case 749:
          _context14.next = 751;
          return paymentVoucher[i].PaymentBuyer;
        case 751:
          paymentVoucher[i].ledger = _context14.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context14.next = 755;
          return 'payment';
        case 755:
          paymentVoucher[i].voucher_type = _context14.sent;
          _context14.next = 758;
          return paymentVoucher[i].id;
        case 758:
          paymentVoucher[i].voucher_number = _context14.sent;
          _context14.next = 761;
          return paymentVoucher[i].invoice_id;
        case 761:
          _context14.t39 = _context14.sent;
          if (!(_context14.t39 <= 9)) {
            _context14.next = 766;
            break;
          }
          _context14.t40 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context14.next = 767;
          break;
        case 766:
          _context14.t40 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 767:
          paymentVoucher[i].invoice_id = _context14.t40;
          _context14.next = 770;
          return array.push(paymentVoucher[i]);
        case 770:
          i++;
          _context14.next = 730;
          break;
        case 773:
          _context14.next = 775;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 775:
          mainArray = _context14.sent;
          //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
          creditamount = 0;
          debetamount = 0;
          totalbalnce = 0;
          console.log("hello", openingbalncecredit);
          console.log("hello2", openingbalncedebit);
          _context14.next = 783;
          return mainArray.map(function (item) {
            if (item.creditAmount) {
              creditamount = creditamount + Number(item.creditAmount);
            } else if (item.debitAmount) {
              debetamount = debetamount + Number(item.debitAmount);
            }
          });
        case 783:
          console.log("hello3", creditamount);
          console.log("hello4", debetamount);
          totalbalnce = Number(openingbalncedebit) + debetamount - (creditamount + Number(openingbalncecredit));
          console.log("ddd", totalbalnce);
          return _context14.abrupt("return", totalbalnce);
        case 790:
          _context14.next = 796;
          break;
        case 792:
          _context14.prev = 792;
          _context14.t41 = _context14["catch"](0);
          console.log(_context14.t41);
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context14.t41,
            message: "Something went wrong!"
          });
        case 796:
        case "end":
          return _context14.stop();
      }
    }, _callee12, null, [[0, 792]]);
  }));
  return _getAllLedgerVoucherprivious.apply(this, arguments);
}
exports.getAllLedgerVoucher = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, res) {
    var journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, ledger, _invoice_date, _invoice_date2, _invoice_date3, _invoice_date4, _invoice_date5, _invoice_date6, _invoice_date7, _invoice_date8, _invoice_date9, _invoice_date10, _invoice_date11, _invoice_date12, _invoice_date13, _invoice_date14, _invoice_date15, array, totalcalculate_openingblance, i, s, mainArray, lastObj;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          paymentVoucher = [];
          _context.next = 4;
          return _ledger["default"].findOne({
            where: {
              uid: data.ledger_id,
              company_id: data.company_id
            }
          });
        case 4:
          ledger = _context.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context.next = 821;
            break;
          }
          if (!ledger.dataValues.tax_key) {
            _context.next = 21;
            break;
          }
          _context.next = 9;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: data.ledger_id
            }, {
              type: 'Sales'
            }, {
              invoice_date: (_invoice_date = {}, _defineProperty(_invoice_date, Op.gte, data.start_date), _defineProperty(_invoice_date, Op.lte, data.end_date), _invoice_date)
            }]),
            include: [{
              model: _saleVoucher["default"],
              as: 'tax',
              include: [{
                model: _ledger["default"],
                as: 'SalesLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          saleVoucher = _context.sent;
          _context.next = 12;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: data.ledger_id
            }, {
              type: 'Purchase'
            }, {
              invoice_date: (_invoice_date2 = {}, _defineProperty(_invoice_date2, Op.gte, data.start_date), _defineProperty(_invoice_date2, Op.lte, data.end_date), _invoice_date2)
            }]),
            include: [{
              model: _purchaseVoucher["default"],
              as: 'taxp',
              include: [{
                model: _ledger["default"],
                as: 'PurchaseLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 12:
          purchaseVoucher = _context.sent;
          _context.next = 15;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: data.ledger_id
            }, {
              type: 'Debit'
            }, {
              invoice_date: (_invoice_date3 = {}, _defineProperty(_invoice_date3, Op.gte, data.start_date), _defineProperty(_invoice_date3, Op.lte, data.end_date), _invoice_date3)
            }]),
            include: [{
              model: _creditVoucher["default"],
              as: 'taxc',
              include: [{
                model: _ledger["default"],
                as: 'CreditBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 15:
          creditVoucher = _context.sent;
          _context.next = 18;
          return _taxInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              tax_ledger_id: data.ledger_id
            }, {
              type: 'Credit'
            }, {
              invoice_date: (_invoice_date4 = {}, _defineProperty(_invoice_date4, Op.gte, data.start_date), _defineProperty(_invoice_date4, Op.lte, data.end_date), _invoice_date4)
            }]),
            include: [{
              model: _debitVoucher["default"],
              as: 'taxd',
              include: [{
                model: _ledger["default"],
                as: 'DebitBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 18:
          debitVoucher = _context.sent;
          _context.next = 57;
          break;
        case 21:
          if (!ledger.dataValues.sale_key) {
            _context.next = 36;
            break;
          }
          _context.next = 24;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: data.ledger_id
            }, {
              type: 'Sales'
            }, {
              invoice_date: (_invoice_date5 = {}, _defineProperty(_invoice_date5, Op.gte, data.start_date), _defineProperty(_invoice_date5, Op.lte, data.end_date), _invoice_date5)
            }]),
            include: [{
              model: _saleVoucher["default"],
              as: 'Vouchers',
              include: [{
                model: _ledger["default"],
                as: 'SalesLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 24:
          saleVoucher = _context.sent;
          _context.next = 27;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: data.ledger_id
            }, {
              type: 'Purchase'
            }, {
              invoice_date: (_invoice_date6 = {}, _defineProperty(_invoice_date6, Op.gte, data.start_date), _defineProperty(_invoice_date6, Op.lte, data.end_date), _invoice_date6)
            }]),
            include: [{
              model: _purchaseVoucher["default"],
              as: 'Voucherp',
              include: [{
                model: _ledger["default"],
                as: 'PurchaseLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 27:
          purchaseVoucher = _context.sent;
          _context.next = 30;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: data.ledger_id
            }, {
              type: 'Debit'
            }, {
              invoice_date: (_invoice_date7 = {}, _defineProperty(_invoice_date7, Op.gte, data.start_date), _defineProperty(_invoice_date7, Op.lte, data.end_date), _invoice_date7)
            }]),
            include: [{
              model: _creditVoucher["default"],
              as: 'Voucherc',
              include: [{
                model: _ledger["default"],
                as: 'CreditBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 30:
          creditVoucher = _context.sent;
          _context.next = 33;
          return _voucherInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: data.ledger_id
            }, {
              type: 'ow1kac6rc1y'
            }, {
              invoice_date: (_invoice_date8 = {}, _defineProperty(_invoice_date8, Op.gte, data.start_date), _defineProperty(_invoice_date8, Op.lte, data.end_date), _invoice_date8)
            }]),
            include: [{
              model: _debitVoucher["default"],
              as: 'Voucherd',
              include: [{
                model: _ledger["default"],
                as: 'DebitBuyer'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 33:
          debitVoucher = _context.sent;
          _context.next = 57;
          break;
        case 36:
          _context.next = 38;
          return _journalInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: data.ledger_id
            }, {
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date9 = {}, _defineProperty(_invoice_date9, Op.gte, data.start_date), _defineProperty(_invoice_date9, Op.lte, data.end_date), _invoice_date9)
            }]),
            include: [{
              model: _ledger["default"],
              as: "VoucherLedger"
            }, {
              model: _journalVoucher["default"],
              as: 'Voucher'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 38:
          journalVoucher = _context.sent;
          _context.next = 41;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date10 = {}, _defineProperty(_invoice_date10, Op.gte, data.start_date), _defineProperty(_invoice_date10, Op.lte, data.end_date), _invoice_date10)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 41:
          saleVoucher = _context.sent;
          _context.next = 44;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date11 = {}, _defineProperty(_invoice_date11, Op.gte, data.start_date), _defineProperty(_invoice_date11, Op.lte, data.end_date), _invoice_date11)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 44:
          purchaseVoucher = _context.sent;
          _context.next = 47;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date12 = {}, _defineProperty(_invoice_date12, Op.gte, data.start_date), _defineProperty(_invoice_date12, Op.lte, data.end_date), _invoice_date12)
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
        case 47:
          creditVoucher = _context.sent;
          _context.next = 50;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date13 = {}, _defineProperty(_invoice_date13, Op.gte, data.start_date), _defineProperty(_invoice_date13, Op.lte, data.end_date), _invoice_date13)
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
        case 50:
          debitVoucher = _context.sent;
          _context.next = 53;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date14 = {}, _defineProperty(_invoice_date14, Op.gte, data.start_date), _defineProperty(_invoice_date14, Op.lte, data.end_date), _invoice_date14)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'ReciptBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 53:
          recieptVoucher = _context.sent;
          _context.next = 56;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              ledger_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date15 = {}, _defineProperty(_invoice_date15, Op.gte, data.start_date), _defineProperty(_invoice_date15, Op.lte, data.end_date), _invoice_date15)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PaymentBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 56:
          paymentVoucher = _context.sent;
        case 57:
          _context.next = 59;
          return (0, _ledger2.decreption)(ledger, 'object', data.data.email);
        case 59:
          ledger = _context.sent;
          if (!(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key)) {
            _context.next = 70;
            break;
          }
          _context.next = 63;
          return (0, _journalEntries.decreptionJournalEntries)(journalVoucher, 'array', data.data.email);
        case 63:
          journalVoucher = _context.sent;
          _context.next = 66;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 66:
          recieptVoucher = _context.sent;
          _context.next = 69;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 69:
          paymentVoucher = _context.sent;
        case 70:
          _context.next = 72;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 72:
          saleVoucher = _context.sent;
          _context.next = 75;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 75:
          purchaseVoucher = _context.sent;
          _context.next = 78;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 78:
          creditVoucher = _context.sent;
          _context.next = 81;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 81:
          debitVoucher = _context.sent;
          _context.next = 84;
          return [];
        case 84:
          array = _context.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context.next = 109;
            break;
          }
          if (!(ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit')) {
            _context.next = 95;
            break;
          }
          _context.next = 89;
          return ledger.dataValues.amount;
        case 89:
          ledger.dataValues.debitAmount = _context.sent;
          _context.next = 92;
          return 0;
        case 92:
          ledger.dataValues.creditAmount = _context.sent;
          _context.next = 101;
          break;
        case 95:
          _context.next = 97;
          return 0;
        case 97:
          ledger.dataValues.debitAmount = _context.sent;
          _context.next = 100;
          return ledger.dataValues.amount;
        case 100:
          ledger.dataValues.creditAmount = _context.sent;
        case 101:
          _context.next = 103;
          return true;
        case 103:
          ledger.dataValues.open = _context.sent;
          ledger.dataValues.voucher_type = '';
          ledger.dataValues.voucher_number = '';
          ledger.dataValues.invoice_id = '';
          _context.next = 109;
          return array.push(ledger.dataValues);
        case 109:
          _context.next = 111;
          return getAllLedgerVoucherprivious(data.start_date, data.end_date, data.ledger_id, data.company_id, ledger.dataValues.creditAmount, ledger.dataValues.debitAmount, data.data.email);
        case 111:
          totalcalculate_openingblance = _context.sent;
          if (!(totalcalculate_openingblance >= 0)) {
            _context.next = 121;
            break;
          }
          _context.next = 115;
          return Math.abs(totalcalculate_openingblance).toString();
        case 115:
          ledger.dataValues.debitAmount = _context.sent;
          _context.next = 118;
          return 0;
        case 118:
          ledger.dataValues.creditAmount = _context.sent;
          _context.next = 127;
          break;
        case 121:
          _context.next = 123;
          return 0;
        case 123:
          ledger.dataValues.debitAmount = _context.sent;
          _context.next = 126;
          return Math.abs(totalcalculate_openingblance).toString();
        case 126:
          ledger.dataValues.creditAmount = _context.sent;
        case 127:
          if (!(journalVoucher && journalVoucher.length > 0)) {
            _context.next = 175;
            break;
          }
          i = 0;
        case 129:
          if (!(i < journalVoucher.length)) {
            _context.next = 175;
            break;
          }
          _context.next = 132;
          return journalVoucher[i].type;
        case 132:
          _context.t0 = _context.sent;
          if (!(_context.t0 === 'debit')) {
            _context.next = 142;
            break;
          }
          _context.next = 136;
          return journalVoucher[i].amount;
        case 136:
          journalVoucher[i].debitAmount = _context.sent;
          _context.next = 139;
          return 0;
        case 139:
          journalVoucher[i].creditAmount = _context.sent;
          _context.next = 148;
          break;
        case 142:
          _context.next = 144;
          return 0;
        case 144:
          journalVoucher[i].debitAmount = _context.sent;
          _context.next = 147;
          return journalVoucher[i].amount;
        case 147:
          journalVoucher[i].creditAmount = _context.sent;
        case 148:
          _context.next = 150;
          return journalVoucher[i].Voucher.invoice_date;
        case 150:
          journalVoucher[i].invoice_date = _context.sent;
          _context.next = 153;
          return 'journal';
        case 153:
          journalVoucher[i].voucher_type = _context.sent;
          _context.next = 156;
          return journalVoucher[i].Voucher.id;
        case 156:
          journalVoucher[i].voucher_number = _context.sent;
          _context.next = 159;
          return journalVoucher[i].Voucher.invoice_id;
        case 159:
          _context.t1 = _context.sent;
          if (!(_context.t1 <= 9)) {
            _context.next = 164;
            break;
          }
          _context.t2 = "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/00").concat(journalVoucher[i].Voucher.invoice_id);
          _context.next = 165;
          break;
        case 164:
          _context.t2 = journalVoucher[i].Voucher.invoice_id > 9 ? "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/0").concat(journalVoucher[i].Voucher.invoice_id) : "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/").concat(journalVoucher[i].Voucher.invoice_id);
        case 165:
          journalVoucher[i].invoice_id = _context.t2;
          _context.next = 168;
          return journalVoucher[i].VoucherLedger;
        case 168:
          journalVoucher[i].ledger = _context.sent;
          delete journalVoucher[i].VoucherLedger;
          _context.next = 172;
          return array.push(journalVoucher[i]);
        case 172:
          i++;
          _context.next = 129;
          break;
        case 175:
          if (!(saleVoucher && saleVoucher.length > 0)) {
            _context.next = 311;
            break;
          }
          s = 0;
        case 177:
          if (!(s < saleVoucher.length)) {
            _context.next = 311;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context.next = 227;
            break;
          }
          _context.next = 181;
          return 'sale';
        case 181:
          saleVoucher[s].voucher_type = _context.sent;
          if (!saleVoucher[s].Vouchers) {
            _context.next = 189;
            break;
          }
          _context.next = 185;
          return saleVoucher[s].Vouchers.SalesLedger;
        case 185:
          saleVoucher[s].ledger = _context.sent;
          delete saleVoucher[s].Vouchers.SalesLedger;
          _context.next = 190;
          break;
        case 189:
          saleVoucher[s].ledger = {};
        case 190:
          _context.next = 192;
          return saleVoucher[s].Vouchers;
        case 192:
          if (!_context.sent) {
            _context.next = 196;
            break;
          }
          _context.t3 = saleVoucher[s].Vouchers;
          _context.next = 197;
          break;
        case 196:
          _context.t3 = {};
        case 197:
          saleVoucher[s].Voucher = _context.t3;
          saleVoucher[s].type = 'credit';
          _context.next = 201;
          return 0;
        case 201:
          saleVoucher[s].debitAmount = _context.sent;
          _context.next = 204;
          return saleVoucher[s].amount;
        case 204:
          saleVoucher[s].creditAmount = _context.sent;
          saleVoucher[s].amount = saleVoucher[s].amount;
          _context.next = 208;
          return saleVoucher[s].Vouchers;
        case 208:
          if (!_context.sent) {
            _context.next = 212;
            break;
          }
          _context.t4 = saleVoucher[s].Vouchers.id;
          _context.next = 213;
          break;
        case 212:
          _context.t4 = '';
        case 213:
          saleVoucher[s].voucher_number = _context.t4;
          _context.next = 216;
          return saleVoucher[s].Vouchers;
        case 216:
          if (!_context.sent) {
            _context.next = 220;
            break;
          }
          _context.t5 = saleVoucher[s].Vouchers.invoice_id <= 9 ? "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/00").concat(saleVoucher[s].Vouchers.invoice_id) : saleVoucher[s].Vouchers.invoice_id > 9 ? "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/0").concat(saleVoucher[s].Vouchers.invoice_id) : "".concat(saleVoucher[s].Vouchers.current_year.toString().substr(-2) + "-" + saleVoucher[s].Vouchers.end_year.toString().substr(-2), "/").concat(saleVoucher[s].Vouchers.invoice_id);
          _context.next = 221;
          break;
        case 220:
          _context.t5 = '';
        case 221:
          saleVoucher[s].invoice_id = _context.t5;
          delete saleVoucher[s].Vouchers;
          _context.next = 225;
          return array.push(saleVoucher[s]);
        case 225:
          _context.next = 308;
          break;
        case 227:
          if (!ledger.dataValues.tax_key) {
            _context.next = 276;
            break;
          }
          _context.next = 230;
          return 'sale';
        case 230:
          saleVoucher[s].voucher_type = _context.sent;
          if (!saleVoucher[s].tax) {
            _context.next = 238;
            break;
          }
          _context.next = 234;
          return saleVoucher[s].tax.SalesLedger;
        case 234:
          saleVoucher[s].ledger = _context.sent;
          delete saleVoucher[s].tax.SalesLedger;
          _context.next = 239;
          break;
        case 238:
          saleVoucher[s].ledger = {};
        case 239:
          _context.next = 241;
          return saleVoucher[s].tax;
        case 241:
          if (!_context.sent) {
            _context.next = 245;
            break;
          }
          _context.t6 = saleVoucher[s].tax;
          _context.next = 246;
          break;
        case 245:
          _context.t6 = {};
        case 246:
          saleVoucher[s].Voucher = _context.t6;
          saleVoucher[s].type = 'credit';
          _context.next = 250;
          return 0;
        case 250:
          saleVoucher[s].debitAmount = _context.sent;
          _context.next = 253;
          return saleVoucher[s].amount;
        case 253:
          saleVoucher[s].creditAmount = _context.sent;
          saleVoucher[s].amount = saleVoucher[s].amount;
          _context.next = 257;
          return saleVoucher[s].tax;
        case 257:
          if (!_context.sent) {
            _context.next = 261;
            break;
          }
          _context.t7 = saleVoucher[s].tax.id;
          _context.next = 262;
          break;
        case 261:
          _context.t7 = '';
        case 262:
          saleVoucher[s].voucher_number = _context.t7;
          _context.next = 265;
          return saleVoucher[s].tax;
        case 265:
          if (!_context.sent) {
            _context.next = 269;
            break;
          }
          _context.t8 = saleVoucher[s].tax.invoice_id <= 9 ? "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/00").concat(saleVoucher[s].tax.invoice_id) : saleVoucher[s].tax.invoice_id > 9 ? "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/0").concat(saleVoucher[s].tax.invoice_id) : "".concat(saleVoucher[s].tax.current_year.toString().substr(-2) + "-" + saleVoucher[s].tax.end_year.toString().substr(-2), "/").concat(saleVoucher[s].tax.invoice_id);
          _context.next = 270;
          break;
        case 269:
          _context.t8 = '';
        case 270:
          saleVoucher[s].invoice_id = _context.t8;
          delete saleVoucher[s].tax;
          _context.next = 274;
          return array.push(saleVoucher[s]);
        case 274:
          _context.next = 308;
          break;
        case 276:
          _context.next = 278;
          return 'sale';
        case 278:
          saleVoucher[s].voucher_type = _context.sent;
          _context.next = 281;
          return saleVoucher[s].SalesLedger;
        case 281:
          saleVoucher[s].ledger = _context.sent;
          _context.next = 284;
          return {};
        case 284:
          saleVoucher[s].Voucher = _context.sent;
          saleVoucher[s].type = 'debit';
          _context.next = 288;
          return saleVoucher[s].total_amount;
        case 288:
          saleVoucher[s].debitAmount = _context.sent;
          _context.next = 291;
          return 0;
        case 291:
          saleVoucher[s].creditAmount = _context.sent;
          saleVoucher[s].amount = saleVoucher[s].total_amount;
          _context.next = 295;
          return saleVoucher[s].id;
        case 295:
          saleVoucher[s].voucher_number = _context.sent;
          _context.next = 298;
          return saleVoucher[s].invoice_id;
        case 298:
          _context.t9 = _context.sent;
          if (!(_context.t9 <= 9)) {
            _context.next = 303;
            break;
          }
          _context.t10 = "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/00").concat(saleVoucher[s].invoice_id);
          _context.next = 304;
          break;
        case 303:
          _context.t10 = saleVoucher[s].invoice_id > 9 ? "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/0").concat(saleVoucher[s].invoice_id) : "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/").concat(ssaleVoucher[s].invoice_id);
        case 304:
          saleVoucher[s].invoice_id = _context.t10;
          delete saleVoucher[s].SalesLedger;
          _context.next = 308;
          return array.push(saleVoucher[s]);
        case 308:
          s++;
          _context.next = 177;
          break;
        case 311:
          if (!(purchaseVoucher && purchaseVoucher.length > 0)) {
            _context.next = 447;
            break;
          }
          s = 0;
        case 313:
          if (!(s < purchaseVoucher.length)) {
            _context.next = 447;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context.next = 363;
            break;
          }
          _context.next = 317;
          return 'purchase';
        case 317:
          purchaseVoucher[s].voucher_type = _context.sent;
          if (!purchaseVoucher[s].Voucherp) {
            _context.next = 325;
            break;
          }
          _context.next = 321;
          return purchaseVoucher[s].Voucherp.PurchaseLedger;
        case 321:
          purchaseVoucher[s].ledger = _context.sent;
          delete purchaseVoucher[s].Voucherp.PurchaseLedger;
          _context.next = 326;
          break;
        case 325:
          purchaseVoucher[s].ledger = {};
        case 326:
          _context.next = 328;
          return purchaseVoucher[s].Voucherp;
        case 328:
          if (!_context.sent) {
            _context.next = 332;
            break;
          }
          _context.t11 = purchaseVoucher[s].Voucherp;
          _context.next = 333;
          break;
        case 332:
          _context.t11 = {};
        case 333:
          purchaseVoucher[s].Voucher = _context.t11;
          purchaseVoucher[s].type = 'debit';
          _context.next = 337;
          return purchaseVoucher[s].amount;
        case 337:
          purchaseVoucher[s].debitAmount = _context.sent;
          _context.next = 340;
          return 0;
        case 340:
          purchaseVoucher[s].creditAmount = _context.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].amount;
          _context.next = 344;
          return purchaseVoucher[s].Voucherp;
        case 344:
          if (!_context.sent) {
            _context.next = 348;
            break;
          }
          _context.t12 = purchaseVoucher[s].Voucherp.id;
          _context.next = 349;
          break;
        case 348:
          _context.t12 = '';
        case 349:
          purchaseVoucher[s].voucher_number = _context.t12;
          _context.next = 352;
          return purchaseVoucher[s].Voucherp;
        case 352:
          if (!_context.sent) {
            _context.next = 356;
            break;
          }
          _context.t13 = purchaseVoucher[s].taxp.invoice_id <= 9 ? "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].Voucherp.invoice_id) : purchaseVoucher[s].Voucherp.invoice_id > 9 ? "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].Voucherp.invoice_id) : "".concat(purchaseVoucher[s].Voucherp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].Voucherp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].Voucherp.invoice_id);
          _context.next = 357;
          break;
        case 356:
          _context.t13 = '';
        case 357:
          purchaseVoucher[s].invoice_id = _context.t13;
          delete purchaseVoucher[s].Voucherp;
          _context.next = 361;
          return array.push(purchaseVoucher[s]);
        case 361:
          _context.next = 444;
          break;
        case 363:
          if (!ledger.dataValues.tax_key) {
            _context.next = 412;
            break;
          }
          _context.next = 366;
          return 'purchase';
        case 366:
          purchaseVoucher[s].voucher_type = _context.sent;
          if (!purchaseVoucher[s].taxp) {
            _context.next = 374;
            break;
          }
          _context.next = 370;
          return purchaseVoucher[s].taxp.PurchaseLedger;
        case 370:
          purchaseVoucher[s].ledger = _context.sent;
          delete purchaseVoucher[s].taxp.PurchaseLedger;
          _context.next = 375;
          break;
        case 374:
          purchaseVoucher[s].ledger = {};
        case 375:
          _context.next = 377;
          return purchaseVoucher[s].taxp;
        case 377:
          if (!_context.sent) {
            _context.next = 381;
            break;
          }
          _context.t14 = purchaseVoucher[s].taxp;
          _context.next = 382;
          break;
        case 381:
          _context.t14 = {};
        case 382:
          purchaseVoucher[s].Voucher = _context.t14;
          purchaseVoucher[s].type = 'debit';
          _context.next = 386;
          return purchaseVoucher[s].amount;
        case 386:
          purchaseVoucher[s].debitAmount = _context.sent;
          _context.next = 389;
          return 0;
        case 389:
          purchaseVoucher[s].creditAmount = _context.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].amount;
          _context.next = 393;
          return purchaseVoucher[s].taxp;
        case 393:
          if (!_context.sent) {
            _context.next = 397;
            break;
          }
          _context.t15 = purchaseVoucher[s].taxp.id;
          _context.next = 398;
          break;
        case 397:
          _context.t15 = '';
        case 398:
          purchaseVoucher[s].voucher_number = _context.t15;
          _context.next = 401;
          return purchaseVoucher[s].taxp;
        case 401:
          if (!_context.sent) {
            _context.next = 405;
            break;
          }
          _context.t16 = purchaseVoucher[s].taxp.invoice_id <= 9 ? "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].taxp.invoice_id) : purchaseVoucher[s].taxp.invoice_id > 9 ? "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].taxp.invoice_id) : "".concat(purchaseVoucher[s].taxp.current_year.toString().substr(-2) + "-" + purchaseVoucher[s].taxp.end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].taxp.invoice_id);
          _context.next = 406;
          break;
        case 405:
          _context.t16 = '';
        case 406:
          purchaseVoucher[s].invoice_id = _context.t16;
          delete purchaseVoucher[s].tax;
          _context.next = 410;
          return array.push(purchaseVoucher[s]);
        case 410:
          _context.next = 444;
          break;
        case 412:
          _context.next = 414;
          return 'purchase';
        case 414:
          purchaseVoucher[s].voucher_type = _context.sent;
          _context.next = 417;
          return purchaseVoucher[s].PurchaseLedger;
        case 417:
          purchaseVoucher[s].ledger = _context.sent;
          _context.next = 420;
          return {};
        case 420:
          purchaseVoucher[s].Voucher = _context.sent;
          purchaseVoucher[s].type = 'Credit';
          _context.next = 424;
          return 0;
        case 424:
          purchaseVoucher[s].debitAmount = _context.sent;
          _context.next = 427;
          return purchaseVoucher[s].total_amount;
        case 427:
          purchaseVoucher[s].creditAmount = _context.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].total_amount;
          _context.next = 431;
          return purchaseVoucher[s].id;
        case 431:
          purchaseVoucher[s].voucher_number = _context.sent;
          _context.next = 434;
          return purchaseVoucher[s].invoice_id;
        case 434:
          _context.t17 = _context.sent;
          if (!(_context.t17 <= 9)) {
            _context.next = 439;
            break;
          }
          _context.t18 = "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].invoice_id);
          _context.next = 440;
          break;
        case 439:
          _context.t18 = purchaseVoucher[s].invoice_id > 9 ? "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].invoice_id) : "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].invoice_id);
        case 440:
          purchaseVoucher[s].invoice_id = _context.t18;
          delete purchaseVoucher[s].PurchaseLedger;
          _context.next = 444;
          return array.push(purchaseVoucher[s]);
        case 444:
          s++;
          _context.next = 313;
          break;
        case 447:
          if (!(creditVoucher && creditVoucher.length > 0)) {
            _context.next = 583;
            break;
          }
          s = 0;
        case 449:
          if (!(s < creditVoucher.length)) {
            _context.next = 583;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context.next = 499;
            break;
          }
          _context.next = 453;
          return 'sale';
        case 453:
          creditVoucher[s].voucher_type = _context.sent;
          if (!creditVoucher[s].Voucherc) {
            _context.next = 461;
            break;
          }
          _context.next = 457;
          return creditVoucher[s].Voucherc.CreditBuyer;
        case 457:
          creditVoucher[s].ledger = _context.sent;
          delete creditVoucher[s].Voucherc.CreditBuyer;
          _context.next = 462;
          break;
        case 461:
          creditVoucher[s].ledger = {};
        case 462:
          _context.next = 464;
          return creditVoucher[s].Voucherc;
        case 464:
          if (!_context.sent) {
            _context.next = 468;
            break;
          }
          _context.t19 = creditVoucher[s].Voucherc;
          _context.next = 469;
          break;
        case 468:
          _context.t19 = {};
        case 469:
          creditVoucher[s].Voucher = _context.t19;
          creditVoucher[s].type = 'credit';
          _context.next = 473;
          return 0;
        case 473:
          creditVoucher[s].debitAmount = _context.sent;
          _context.next = 476;
          return creditVoucher[s].amount;
        case 476:
          creditVoucher[s].creditAmount = _context.sent;
          creditVoucher[s].amount = creditVoucher[s].amount;
          _context.next = 480;
          return creditVoucher[s].Voucherc;
        case 480:
          if (!_context.sent) {
            _context.next = 484;
            break;
          }
          _context.t20 = creditVoucher[s].Voucherc.id;
          _context.next = 485;
          break;
        case 484:
          _context.t20 = '';
        case 485:
          creditVoucher[s].voucher_number = _context.t20;
          _context.next = 488;
          return creditVoucher[s].Voucherc;
        case 488:
          if (!_context.sent) {
            _context.next = 492;
            break;
          }
          _context.t21 = creditVoucher[s].Voucherc.invoice_id <= 9 ? "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/00").concat(creditVoucher[s].Voucherc.invoice_id) : creditVoucher[s].Voucherc.invoice_id > 9 ? "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/0").concat(creditVoucher[s].Voucherc.invoice_id) : "".concat(creditVoucher[s].Voucherc.current_year.toString().substr(-2) + "-" + creditVoucher[s].Voucherc.end_year.toString().substr(-2), "/").concat(creditVoucher[s].Voucherc.invoice_id);
          _context.next = 493;
          break;
        case 492:
          _context.t21 = '';
        case 493:
          creditVoucher[s].invoice_id = _context.t21;
          delete creditVoucher[s].Voucherc;
          _context.next = 497;
          return array.push(creditVoucher[s]);
        case 497:
          _context.next = 580;
          break;
        case 499:
          if (!ledger.dataValues.tax_key) {
            _context.next = 548;
            break;
          }
          _context.next = 502;
          return 'sale';
        case 502:
          creditVoucher[s].voucher_type = _context.sent;
          if (!creditVoucher[s].taxc) {
            _context.next = 510;
            break;
          }
          _context.next = 506;
          return creditVoucher[s].taxc.CreditBuyer;
        case 506:
          creditVoucher[s].ledger = _context.sent;
          delete creditVoucher[s].taxc.CreditBuyer;
          _context.next = 511;
          break;
        case 510:
          creditVoucher[s].ledger = {};
        case 511:
          _context.next = 513;
          return creditVoucher[s].taxc;
        case 513:
          if (!_context.sent) {
            _context.next = 517;
            break;
          }
          _context.t22 = creditVoucher[s].taxc;
          _context.next = 518;
          break;
        case 517:
          _context.t22 = {};
        case 518:
          creditVoucher[s].Voucher = _context.t22;
          creditVoucher[s].type = 'credit';
          _context.next = 522;
          return 0;
        case 522:
          creditVoucher[s].debitAmount = _context.sent;
          _context.next = 525;
          return creditVoucher[s].amount;
        case 525:
          creditVoucher[s].creditAmount = _context.sent;
          creditVoucher[s].amount = creditVoucher[s].amount;
          _context.next = 529;
          return creditVoucher[s].taxc;
        case 529:
          if (!_context.sent) {
            _context.next = 533;
            break;
          }
          _context.t23 = creditVoucher[s].taxc.id;
          _context.next = 534;
          break;
        case 533:
          _context.t23 = '';
        case 534:
          creditVoucher[s].voucher_number = _context.t23;
          _context.next = 537;
          return creditVoucher[s].taxc;
        case 537:
          if (!_context.sent) {
            _context.next = 541;
            break;
          }
          _context.t24 = creditVoucher[s].taxc.invoice_id <= 9 ? "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/00").concat(creditVoucher[s].taxc.invoice_id) : creditVoucher[s].taxc.invoice_id > 9 ? "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/0").concat(creditVoucher[s].taxc.invoice_id) : "".concat(creditVoucher[s].taxc.current_year.toString().substr(-2) + "-" + creditVoucher[s].taxc.end_year.toString().substr(-2), "/").concat(creditVoucher[s].taxc.invoice_id);
          _context.next = 542;
          break;
        case 541:
          _context.t24 = '';
        case 542:
          creditVoucher[s].invoice_id = _context.t24;
          delete creditVoucher[s].taxc;
          _context.next = 546;
          return array.push(creditVoucher[s]);
        case 546:
          _context.next = 580;
          break;
        case 548:
          _context.next = 550;
          return 'Credit note';
        case 550:
          creditVoucher[s].voucher_type = _context.sent;
          _context.next = 553;
          return creditVoucher[s].CreditBuyer;
        case 553:
          creditVoucher[s].ledger = _context.sent;
          _context.next = 556;
          return {};
        case 556:
          creditVoucher[s].Voucher = _context.sent;
          creditVoucher[s].type = 'debit';
          _context.next = 560;
          return creditVoucher[s].total_amount;
        case 560:
          creditVoucher[s].debitAmount = _context.sent;
          _context.next = 563;
          return 0;
        case 563:
          creditVoucher[s].creditAmount = _context.sent;
          creditVoucher[s].amount = creditVoucher[s].total_amount;
          _context.next = 567;
          return creditVoucher[s].id;
        case 567:
          creditVoucher[s].voucher_number = _context.sent;
          _context.next = 570;
          return creditVoucher[s].invoice_id;
        case 570:
          _context.t25 = _context.sent;
          if (!(_context.t25 <= 9)) {
            _context.next = 575;
            break;
          }
          _context.t26 = "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/00").concat(creditVoucher[s].invoice_id);
          _context.next = 576;
          break;
        case 575:
          _context.t26 = creditVoucher[s].invoice_id > 9 ? "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/0").concat(creditVoucher[s].invoice_id) : "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/").concat(creditVoucher[s].invoice_id);
        case 576:
          creditVoucher[s].invoice_id = _context.t26;
          delete creditVoucher[s].CreditBuyer;
          _context.next = 580;
          return array.push(creditVoucher[s]);
        case 580:
          s++;
          _context.next = 449;
          break;
        case 583:
          if (!(debitVoucher && debitVoucher.length > 0)) {
            _context.next = 719;
            break;
          }
          s = 0;
        case 585:
          if (!(s < debitVoucher.length)) {
            _context.next = 719;
            break;
          }
          if (!ledger.dataValues.sale_key) {
            _context.next = 635;
            break;
          }
          _context.next = 589;
          return 'sale';
        case 589:
          debitVoucher[s].voucher_type = _context.sent;
          if (!debitVoucher[s].Voucherd) {
            _context.next = 597;
            break;
          }
          _context.next = 593;
          return debitVoucher[s].Voucherd.DebitBuyer;
        case 593:
          debitVoucher[s].ledger = _context.sent;
          delete debitVoucher[s].Voucherd.DebitBuyer;
          _context.next = 598;
          break;
        case 597:
          debitVoucher[s].ledger = {};
        case 598:
          _context.next = 600;
          return debitVoucher[s].Voucherd;
        case 600:
          if (!_context.sent) {
            _context.next = 604;
            break;
          }
          _context.t27 = debitVoucher[s].Voucherd;
          _context.next = 605;
          break;
        case 604:
          _context.t27 = {};
        case 605:
          debitVoucher[s].Voucher = _context.t27;
          debitVoucher[s].type = 'debit';
          _context.next = 609;
          return 0;
        case 609:
          debitVoucher[s].debitAmount = _context.sent;
          _context.next = 612;
          return debitVoucher[s].amount;
        case 612:
          debitVoucher[s].creditAmount = _context.sent;
          debitVoucher[s].amount = debitVoucher[s].amount;
          _context.next = 616;
          return debitVoucher[s].Voucherd;
        case 616:
          if (!_context.sent) {
            _context.next = 620;
            break;
          }
          _context.t28 = debitVoucher[s].Voucherd.id;
          _context.next = 621;
          break;
        case 620:
          _context.t28 = '';
        case 621:
          debitVoucher[s].voucher_number = _context.t28;
          _context.next = 624;
          return debitVoucher[s].Voucherd;
        case 624:
          if (!_context.sent) {
            _context.next = 628;
            break;
          }
          _context.t29 = debitVoucher[s].Voucherd.invoice_id <= 9 ? "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/00").concat(debitVoucher[s].Voucherd.invoice_id) : debitVoucher[s].Voucherd.invoice_id > 9 ? "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/0").concat(debitVoucher[s].Voucherd.invoice_id) : "".concat(debitVoucher[s].Voucherd.current_year.toString().substr(-2) + "-" + debitVoucher[s].Voucherd.end_year.toString().substr(-2), "/").concat(debitVoucher[s].Voucherd.invoice_id);
          _context.next = 629;
          break;
        case 628:
          _context.t29 = '';
        case 629:
          debitVoucher[s].invoice_id = _context.t29;
          delete debitVoucher[s].Voucherd;
          _context.next = 633;
          return array.push(debitVoucher[s]);
        case 633:
          _context.next = 716;
          break;
        case 635:
          if (!ledger.dataValues.tax_key) {
            _context.next = 684;
            break;
          }
          _context.next = 638;
          return 'sale';
        case 638:
          debitVoucher[s].voucher_type = _context.sent;
          if (!debitVoucher[s].taxd) {
            _context.next = 646;
            break;
          }
          _context.next = 642;
          return debitVoucher[s].taxd.DebitBuyer;
        case 642:
          debitVoucher[s].ledger = _context.sent;
          delete debitVoucher[s].taxd.DebitBuyer;
          _context.next = 647;
          break;
        case 646:
          debitVoucher[s].ledger = {};
        case 647:
          _context.next = 649;
          return debitVoucher[s].taxd;
        case 649:
          if (!_context.sent) {
            _context.next = 653;
            break;
          }
          _context.t30 = debitVoucher[s].taxd;
          _context.next = 654;
          break;
        case 653:
          _context.t30 = {};
        case 654:
          debitVoucher[s].Voucher = _context.t30;
          debitVoucher[s].type = 'debit';
          _context.next = 658;
          return 0;
        case 658:
          debitVoucher[s].debitAmount = _context.sent;
          _context.next = 661;
          return debitVoucher[s].amount;
        case 661:
          debitVoucher[s].creditAmount = _context.sent;
          debitVoucher[s].amount = debitVoucher[s].amount;
          _context.next = 665;
          return debitVoucher[s].taxd;
        case 665:
          if (!_context.sent) {
            _context.next = 669;
            break;
          }
          _context.t31 = debitVoucher[s].taxd.id;
          _context.next = 670;
          break;
        case 669:
          _context.t31 = '';
        case 670:
          debitVoucher[s].voucher_number = _context.t31;
          _context.next = 673;
          return debitVoucher[s].taxd;
        case 673:
          if (!_context.sent) {
            _context.next = 677;
            break;
          }
          _context.t32 = debitVoucher[s].taxd.invoice_id <= 9 ? "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/00").concat(debitVoucher[s].taxd.invoice_id) : debitVoucher[s].taxd.invoice_id > 9 ? "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/0").concat(debitVoucher[s].taxd.invoice_id) : "".concat(debitVoucher[s].taxd.current_year.toString().substr(-2) + "-" + debitVoucher[s].taxd.end_year.toString().substr(-2), "/").concat(debitVoucher[s].taxd.invoice_id);
          _context.next = 678;
          break;
        case 677:
          _context.t32 = '';
        case 678:
          debitVoucher[s].invoice_id = _context.t32;
          delete debitVoucher[s].taxd;
          _context.next = 682;
          return array.push(debitVoucher[s]);
        case 682:
          _context.next = 716;
          break;
        case 684:
          _context.next = 686;
          return 'Debit note';
        case 686:
          debitVoucher[s].voucher_type = _context.sent;
          _context.next = 689;
          return debitVoucher[s].DebitBuyer;
        case 689:
          debitVoucher[s].ledger = _context.sent;
          _context.next = 692;
          return {};
        case 692:
          debitVoucher[s].Voucher = _context.sent;
          debitVoucher[s].type = 'Credit';
          _context.next = 696;
          return 0;
        case 696:
          debitVoucher[s].debitAmount = _context.sent;
          _context.next = 699;
          return debitVoucher[s].total_amount;
        case 699:
          debitVoucher[s].creditAmount = _context.sent;
          debitVoucher[s].amount = debitVoucher[s].total_amount;
          _context.next = 703;
          return debitVoucher[s].id;
        case 703:
          debitVoucher[s].voucher_number = _context.sent;
          _context.next = 706;
          return debitVoucher[s].invoice_id;
        case 706:
          _context.t33 = _context.sent;
          if (!(_context.t33 <= 9)) {
            _context.next = 711;
            break;
          }
          _context.t34 = "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/00").concat(debitVoucher[s].invoice_id);
          _context.next = 712;
          break;
        case 711:
          _context.t34 = debitVoucher[s].invoice_id > 9 ? "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/0").concat(debitVoucher[s].invoice_id) : "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/").concat(debitVoucher[s].invoice_id);
        case 712:
          debitVoucher[s].invoice_id = _context.t34;
          delete debitVoucher[s].DebitBuyer;
          _context.next = 716;
          return array.push(debitVoucher[s]);
        case 716:
          s++;
          _context.next = 585;
          break;
        case 719:
          if (!(recieptVoucher && recieptVoucher.length > 0)) {
            _context.next = 764;
            break;
          }
          i = 0;
        case 721:
          if (!(i < recieptVoucher.length)) {
            _context.next = 764;
            break;
          }
          _context.next = 724;
          return recieptVoucher[i].type;
        case 724:
          _context.t35 = _context.sent;
          if (!(_context.t35 === 'debit')) {
            _context.next = 734;
            break;
          }
          _context.next = 728;
          return recieptVoucher[i].total_amount;
        case 728:
          recieptVoucher[i].debitAmount = _context.sent;
          _context.next = 731;
          return 0;
        case 731:
          recieptVoucher[i].creditAmount = _context.sent;
          _context.next = 740;
          break;
        case 734:
          _context.next = 736;
          return 0;
        case 736:
          recieptVoucher[i].debitAmount = _context.sent;
          _context.next = 739;
          return recieptVoucher[i].total_amount;
        case 739:
          recieptVoucher[i].creditAmount = _context.sent;
        case 740:
          _context.next = 742;
          return recieptVoucher[i].ReciptBuyer;
        case 742:
          recieptVoucher[i].ledger = _context.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context.next = 746;
          return 'reciept';
        case 746:
          recieptVoucher[i].voucher_type = _context.sent;
          _context.next = 749;
          return recieptVoucher[i].id;
        case 749:
          recieptVoucher[i].voucher_number = _context.sent;
          _context.next = 752;
          return recieptVoucher[i].invoice_id;
        case 752:
          _context.t36 = _context.sent;
          if (!(_context.t36 <= 9)) {
            _context.next = 757;
            break;
          }
          _context.t37 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context.next = 758;
          break;
        case 757:
          _context.t37 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 758:
          recieptVoucher[i].invoice_id = _context.t37;
          _context.next = 761;
          return array.push(recieptVoucher[i]);
        case 761:
          i++;
          _context.next = 721;
          break;
        case 764:
          if (!(paymentVoucher && paymentVoucher.length > 0)) {
            _context.next = 809;
            break;
          }
          i = 0;
        case 766:
          if (!(i < paymentVoucher.length)) {
            _context.next = 809;
            break;
          }
          _context.next = 769;
          return paymentVoucher[i].type;
        case 769:
          _context.t38 = _context.sent;
          if (!(_context.t38 === 'debit')) {
            _context.next = 779;
            break;
          }
          _context.next = 773;
          return paymentVoucher[i].total_amount;
        case 773:
          paymentVoucher[i].debitAmount = _context.sent;
          _context.next = 776;
          return 0;
        case 776:
          paymentVoucher[i].creditAmount = _context.sent;
          _context.next = 785;
          break;
        case 779:
          _context.next = 781;
          return 0;
        case 781:
          paymentVoucher[i].debitAmount = _context.sent;
          _context.next = 784;
          return paymentVoucher[i].total_amount;
        case 784:
          paymentVoucher[i].creditAmount = _context.sent;
        case 785:
          _context.next = 787;
          return paymentVoucher[i].PaymentBuyer;
        case 787:
          paymentVoucher[i].ledger = _context.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context.next = 791;
          return 'payment';
        case 791:
          paymentVoucher[i].voucher_type = _context.sent;
          _context.next = 794;
          return paymentVoucher[i].id;
        case 794:
          paymentVoucher[i].voucher_number = _context.sent;
          _context.next = 797;
          return paymentVoucher[i].invoice_id;
        case 797:
          _context.t39 = _context.sent;
          if (!(_context.t39 <= 9)) {
            _context.next = 802;
            break;
          }
          _context.t40 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context.next = 803;
          break;
        case 802:
          _context.t40 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 803:
          paymentVoucher[i].invoice_id = _context.t40;
          _context.next = 806;
          return array.push(paymentVoucher[i]);
        case 806:
          i++;
          _context.next = 766;
          break;
        case 809:
          _context.next = 811;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 811:
          mainArray = _context.sent;
          _context.next = 814;
          return mainArray[mainArray.length - 1];
        case 814:
          lastObj = _context.sent;
          _context.next = 817;
          return mainArray.pop(mainArray.length - 1);
        case 817:
          mainArray.unshift(lastObj);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            JournalVoucher: mainArray
          });
        case 821:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "No date Found!"
          });
        case 822:
          _context.next = 828;
          break;
        case 824:
          _context.prev = 824;
          _context.t41 = _context["catch"](0);
          console.log(_context.t41);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t41,
            message: "Something went wrong!"
          });
        case 828:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 824]]);
  }));
  return function (_x9, _x10) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllCashVoucher = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var recieptVoucher, paymentVoucher, ledger, _invoice_date16, _invoice_date17, array, i, mainArray, lastObj;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          paymentVoucher = [];
          _context2.next = 4;
          return _ledger["default"].findOne({
            where: {
              uid: data.ledger_id,
              company_id: data.company_id
            }
          });
        case 4:
          ledger = _context2.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context2.next = 151;
            break;
          }
          _context2.next = 8;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date16 = {}, _defineProperty(_invoice_date16, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date16, Op.lte, new Date(data.end_date)), _invoice_date16)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'ReciptBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 8:
          recieptVoucher = _context2.sent;
          _context2.next = 11;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date17 = {}, _defineProperty(_invoice_date17, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date17, Op.lte, new Date(data.end_date)), _invoice_date17)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PaymentBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 11:
          paymentVoucher = _context2.sent;
          _context2.next = 14;
          return (0, _ledger2.decreption)(ledger, 'object', data.data.email);
        case 14:
          ledger = _context2.sent;
          if (!(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key)) {
            _context2.next = 22;
            break;
          }
          _context2.next = 18;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 18:
          recieptVoucher = _context2.sent;
          _context2.next = 21;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 21:
          paymentVoucher = _context2.sent;
        case 22:
          _context2.next = 24;
          return [];
        case 24:
          array = _context2.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context2.next = 49;
            break;
          }
          if (!(ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit')) {
            _context2.next = 35;
            break;
          }
          _context2.next = 29;
          return ledger.dataValues.amount;
        case 29:
          ledger.dataValues.debitAmount = _context2.sent;
          _context2.next = 32;
          return 0;
        case 32:
          ledger.dataValues.creditAmount = _context2.sent;
          _context2.next = 41;
          break;
        case 35:
          _context2.next = 37;
          return 0;
        case 37:
          ledger.dataValues.debitAmount = _context2.sent;
          _context2.next = 40;
          return ledger.dataValues.amount;
        case 40:
          ledger.dataValues.creditAmount = _context2.sent;
        case 41:
          _context2.next = 43;
          return true;
        case 43:
          ledger.dataValues.open = _context2.sent;
          ledger.dataValues.voucher_type = '';
          ledger.dataValues.voucher_number = '';
          ledger.dataValues.invoice_id = '';
          _context2.next = 49;
          return array.push(ledger.dataValues);
        case 49:
          if (!recieptVoucher) {
            _context2.next = 94;
            break;
          }
          i = 0;
        case 51:
          if (!(i < recieptVoucher.length)) {
            _context2.next = 94;
            break;
          }
          _context2.next = 54;
          return recieptVoucher[i].type;
        case 54:
          _context2.t0 = _context2.sent;
          if (!(_context2.t0 === 'debit')) {
            _context2.next = 64;
            break;
          }
          _context2.next = 58;
          return 0;
        case 58:
          recieptVoucher[i].debitAmount = _context2.sent;
          _context2.next = 61;
          return recieptVoucher[i].total_amount;
        case 61:
          recieptVoucher[i].creditAmount = _context2.sent;
          _context2.next = 70;
          break;
        case 64:
          _context2.next = 66;
          return recieptVoucher[i].total_amount;
        case 66:
          recieptVoucher[i].debitAmount = _context2.sent;
          _context2.next = 69;
          return 0;
        case 69:
          recieptVoucher[i].creditAmount = _context2.sent;
        case 70:
          _context2.next = 72;
          return recieptVoucher[i].ReciptBuyer;
        case 72:
          recieptVoucher[i].ledger = _context2.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context2.next = 76;
          return 'reciept';
        case 76:
          recieptVoucher[i].voucher_type = _context2.sent;
          _context2.next = 79;
          return recieptVoucher[i].id;
        case 79:
          recieptVoucher[i].voucher_number = _context2.sent;
          _context2.next = 82;
          return recieptVoucher[i].invoice_id;
        case 82:
          _context2.t1 = _context2.sent;
          if (!(_context2.t1 <= 9)) {
            _context2.next = 87;
            break;
          }
          _context2.t2 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context2.next = 88;
          break;
        case 87:
          _context2.t2 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 88:
          recieptVoucher[i].invoice_id = _context2.t2;
          _context2.next = 91;
          return array.push(recieptVoucher[i]);
        case 91:
          i++;
          _context2.next = 51;
          break;
        case 94:
          if (!paymentVoucher) {
            _context2.next = 139;
            break;
          }
          i = 0;
        case 96:
          if (!(i < paymentVoucher.length)) {
            _context2.next = 139;
            break;
          }
          _context2.next = 99;
          return paymentVoucher[i].type;
        case 99:
          _context2.t3 = _context2.sent;
          if (!(_context2.t3 === 'debit')) {
            _context2.next = 109;
            break;
          }
          _context2.next = 103;
          return 0;
        case 103:
          paymentVoucher[i].debitAmount = _context2.sent;
          _context2.next = 106;
          return paymentVoucher[i].total_amount;
        case 106:
          paymentVoucher[i].creditAmount = _context2.sent;
          _context2.next = 115;
          break;
        case 109:
          _context2.next = 111;
          return paymentVoucher[i].total_amount;
        case 111:
          paymentVoucher[i].debitAmount = _context2.sent;
          _context2.next = 114;
          return 0;
        case 114:
          paymentVoucher[i].creditAmount = _context2.sent;
        case 115:
          _context2.next = 117;
          return paymentVoucher[i].PaymentBuyer;
        case 117:
          paymentVoucher[i].ledger = _context2.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context2.next = 121;
          return 'payment';
        case 121:
          paymentVoucher[i].voucher_type = _context2.sent;
          _context2.next = 124;
          return paymentVoucher[i].id;
        case 124:
          paymentVoucher[i].voucher_number = _context2.sent;
          _context2.next = 127;
          return paymentVoucher[i].invoice_id;
        case 127:
          _context2.t4 = _context2.sent;
          if (!(_context2.t4 <= 9)) {
            _context2.next = 132;
            break;
          }
          _context2.t5 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context2.next = 133;
          break;
        case 132:
          _context2.t5 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 133:
          paymentVoucher[i].invoice_id = _context2.t5;
          _context2.next = 136;
          return array.push(paymentVoucher[i]);
        case 136:
          i++;
          _context2.next = 96;
          break;
        case 139:
          _context2.next = 141;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 141:
          mainArray = _context2.sent;
          _context2.next = 144;
          return mainArray[mainArray.length - 1];
        case 144:
          lastObj = _context2.sent;
          _context2.next = 147;
          return mainArray.pop(mainArray.length - 1);
        case 147:
          mainArray.unshift(lastObj);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            JournalVoucher: mainArray
          });
        case 151:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "No date Found!"
          });
        case 152:
          _context2.next = 157;
          break;
        case 154:
          _context2.prev = 154;
          _context2.t6 = _context2["catch"](0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t6,
            message: "Something went wrong!"
          });
        case 157:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 154]]);
  }));
  return function (_x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllBankVoucher = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var recieptVoucher, paymentVoucher, ledger, _invoice_date18, _invoice_date19, array, i, mainArray, lastObj;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(data, " = = = ");
          paymentVoucher = [];
          _context3.next = 5;
          return _ledger["default"].findOne({
            where: {
              uid: data.ledger_id,
              company_id: data.company_id
            }
          });
        case 5:
          ledger = _context3.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context3.next = 152;
            break;
          }
          _context3.next = 9;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date18 = {}, _defineProperty(_invoice_date18, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date18, Op.lte, new Date(data.end_date)), _invoice_date18)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'ReciptBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 9:
          recieptVoucher = _context3.sent;
          _context3.next = 12;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: (_invoice_date19 = {}, _defineProperty(_invoice_date19, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date19, Op.lte, new Date(data.end_date)), _invoice_date19)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PaymentBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 12:
          paymentVoucher = _context3.sent;
          _context3.next = 15;
          return (0, _ledger2.decreption)(ledger, 'object', data.data.email);
        case 15:
          ledger = _context3.sent;
          if (!(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key)) {
            _context3.next = 23;
            break;
          }
          _context3.next = 19;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 19:
          recieptVoucher = _context3.sent;
          _context3.next = 22;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 22:
          paymentVoucher = _context3.sent;
        case 23:
          _context3.next = 25;
          return [];
        case 25:
          array = _context3.sent;
          if (!(ledger && ledger.dataValues.id)) {
            _context3.next = 50;
            break;
          }
          if (!(ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit')) {
            _context3.next = 36;
            break;
          }
          _context3.next = 30;
          return ledger.dataValues.amount;
        case 30:
          ledger.dataValues.debitAmount = _context3.sent;
          _context3.next = 33;
          return 0;
        case 33:
          ledger.dataValues.creditAmount = _context3.sent;
          _context3.next = 42;
          break;
        case 36:
          _context3.next = 38;
          return 0;
        case 38:
          ledger.dataValues.debitAmount = _context3.sent;
          _context3.next = 41;
          return ledger.dataValues.amount;
        case 41:
          ledger.dataValues.creditAmount = _context3.sent;
        case 42:
          _context3.next = 44;
          return true;
        case 44:
          ledger.dataValues.open = _context3.sent;
          ledger.dataValues.voucher_type = '';
          ledger.dataValues.voucher_number = '';
          ledger.dataValues.invoice_id = '';
          _context3.next = 50;
          return array.push(ledger.dataValues);
        case 50:
          if (!recieptVoucher) {
            _context3.next = 95;
            break;
          }
          i = 0;
        case 52:
          if (!(i < recieptVoucher.length)) {
            _context3.next = 95;
            break;
          }
          _context3.next = 55;
          return recieptVoucher[i].type;
        case 55:
          _context3.t0 = _context3.sent;
          if (!(_context3.t0 === 'debit')) {
            _context3.next = 65;
            break;
          }
          _context3.next = 59;
          return 0;
        case 59:
          recieptVoucher[i].debitAmount = _context3.sent;
          _context3.next = 62;
          return recieptVoucher[i].total_amount;
        case 62:
          recieptVoucher[i].creditAmount = _context3.sent;
          _context3.next = 71;
          break;
        case 65:
          _context3.next = 67;
          return recieptVoucher[i].total_amount;
        case 67:
          recieptVoucher[i].debitAmount = _context3.sent;
          _context3.next = 70;
          return 0;
        case 70:
          recieptVoucher[i].creditAmount = _context3.sent;
        case 71:
          _context3.next = 73;
          return recieptVoucher[i].ReciptBuyer;
        case 73:
          recieptVoucher[i].ledger = _context3.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context3.next = 77;
          return 'reciept';
        case 77:
          recieptVoucher[i].voucher_type = _context3.sent;
          _context3.next = 80;
          return recieptVoucher[i].id;
        case 80:
          recieptVoucher[i].voucher_number = _context3.sent;
          _context3.next = 83;
          return recieptVoucher[i].invoice_id;
        case 83:
          _context3.t1 = _context3.sent;
          if (!(_context3.t1 <= 9)) {
            _context3.next = 88;
            break;
          }
          _context3.t2 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context3.next = 89;
          break;
        case 88:
          _context3.t2 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 89:
          recieptVoucher[i].invoice_id = _context3.t2;
          _context3.next = 92;
          return array.push(recieptVoucher[i]);
        case 92:
          i++;
          _context3.next = 52;
          break;
        case 95:
          if (!paymentVoucher) {
            _context3.next = 140;
            break;
          }
          i = 0;
        case 97:
          if (!(i < paymentVoucher.length)) {
            _context3.next = 140;
            break;
          }
          _context3.next = 100;
          return paymentVoucher[i].type;
        case 100:
          _context3.t3 = _context3.sent;
          if (!(_context3.t3 === 'debit')) {
            _context3.next = 110;
            break;
          }
          _context3.next = 104;
          return 0;
        case 104:
          paymentVoucher[i].debitAmount = _context3.sent;
          _context3.next = 107;
          return paymentVoucher[i].total_amount;
        case 107:
          paymentVoucher[i].creditAmount = _context3.sent;
          _context3.next = 116;
          break;
        case 110:
          _context3.next = 112;
          return paymentVoucher[i].total_amount;
        case 112:
          paymentVoucher[i].debitAmount = _context3.sent;
          _context3.next = 115;
          return 0;
        case 115:
          paymentVoucher[i].creditAmount = _context3.sent;
        case 116:
          _context3.next = 118;
          return paymentVoucher[i].PaymentBuyer;
        case 118:
          paymentVoucher[i].ledger = _context3.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context3.next = 122;
          return 'payment';
        case 122:
          paymentVoucher[i].voucher_type = _context3.sent;
          _context3.next = 125;
          return paymentVoucher[i].id;
        case 125:
          paymentVoucher[i].voucher_number = _context3.sent;
          _context3.next = 128;
          return paymentVoucher[i].invoice_id;
        case 128:
          _context3.t4 = _context3.sent;
          if (!(_context3.t4 <= 9)) {
            _context3.next = 133;
            break;
          }
          _context3.t5 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context3.next = 134;
          break;
        case 133:
          _context3.t5 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 134:
          paymentVoucher[i].invoice_id = _context3.t5;
          _context3.next = 137;
          return array.push(paymentVoucher[i]);
        case 137:
          i++;
          _context3.next = 97;
          break;
        case 140:
          _context3.next = 142;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 142:
          mainArray = _context3.sent;
          _context3.next = 145;
          return mainArray[mainArray.length - 1];
        case 145:
          lastObj = _context3.sent;
          _context3.next = 148;
          return mainArray.pop(mainArray.length - 1);
        case 148:
          mainArray.unshift(lastObj);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            JournalVoucher: mainArray
          });
        case 152:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "No date Found!"
          });
        case 153:
          _context3.next = 158;
          break;
        case 155:
          _context3.prev = 155;
          _context3.t6 = _context3["catch"](0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t6,
            message: "Something went wrong!"
          });
        case 158:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 155]]);
  }));
  return function (_x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getSalesRegisterVoucher = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, res) {
    var uids, ledger, _invoice_date20, items, array, head, _loop, i, mainArray, obj;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          uids = [];
          _context6.next = 4;
          return _ledger["default"].findAll({
            where: {
              company_id: data.company_id
            }
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 4:
          ledger = _context6.sent;
          _context6.next = 7;
          return (0, _ledger2.decreption)(ledger, "array", data.data.email);
        case 7:
          ledger = _context6.sent;
          _context6.next = 10;
          return ledger.map(function (item) {
            if (item.name && item.name.match("Sale ")) {
              console.log("comememe");
              uids.push(item.uid);
            }
          });
        case 10:
          if (!(ledger.length > 0)) {
            _context6.next = 43;
            break;
          }
          _context6.next = 13;
          return _voucherInteries["default"].findAll({
            where: {
              ledger_id: _defineProperty({}, Op["in"], uids)
            },
            include: [{
              model: _saleVoucher["default"],
              as: 'Vouchers',
              where: {
                invoice_date: (_invoice_date20 = {}, _defineProperty(_invoice_date20, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date20, Op.lte, new Date(data.end_date)), _invoice_date20)
              },
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
              }]
            }, {
              model: _ledger["default"]
            }]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 13:
          items = _context6.sent;
          _context6.next = 16;
          return (0, _salesvoucher.decreptionSale)(items, 'array', data.data.email);
        case 16:
          items = _context6.sent;
          _context6.next = 19;
          return [];
        case 19:
          array = _context6.sent;
          _context6.next = 22;
          return [];
        case 22:
          head = _context6.sent;
          if (!(items && items.length > 0)) {
            _context6.next = 32;
            break;
          }
          if (!(items && items.length > 0)) {
            _context6.next = 32;
            break;
          }
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
            var data, find;
            return _regeneratorRuntime().wrap(function _loop$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return {
                    voucherInteries: []
                  };
                case 2:
                  data = _context4.sent;
                  console.log(items[i].Vouchers.invoice_id, " == = = = =", i);
                  _context4.next = 6;
                  return items[i].Vouchers.invoice_id;
                case 6:
                  _context4.t0 = _context4.sent;
                  if (!(_context4.t0 <= 9)) {
                    _context4.next = 11;
                    break;
                  }
                  _context4.t1 = "".concat(items[i].Vouchers.current_year.toString().substr(-2) + "-" + items[i].Vouchers.end_year.toString().substr(-2), "/00").concat(items[i].Vouchers.invoice_id);
                  _context4.next = 12;
                  break;
                case 11:
                  _context4.t1 = items[i].Vouchers.invoice_id > 9 ? "".concat(items[i].Vouchers.current_year.toString().substr(-2) + "-" + items[i].Vouchers.end_year.toString().substr(-2), "/0").concat(items[i].Vouchers.invoice_id) : "".concat(items[i].Vouchers.current_year.toString().substr(-2) + "-" + items[i].Vouchers.end_year.toString().substr(-2), "/").concat(items[i].Vouchers.invoice_id);
                case 12:
                  items[i].Vouchers.invoice_id = _context4.t1;
                  _context4.next = 15;
                  return array.find(function (el) {
                    return el.invoice_id === items[i].Vouchers.invoice_id;
                  });
                case 15:
                  find = _context4.sent;
                  _context4.next = 18;
                  return find;
                case 18:
                  if (!_context4.sent) {
                    _context4.next = 25;
                    break;
                  }
                  _context4.next = 21;
                  return find.voucherInteries.push(items[i]);
                case 21:
                  _context4.next = 23;
                  return find.voucherInteries.map(function (ele) {
                    if (ele.Vouchers) {
                      delete ele.Vouchers;
                    }
                  });
                case 23:
                  _context4.next = 41;
                  break;
                case 25:
                  _context4.next = 27;
                  return [];
                case 27:
                  items[i].Vouchers.voucherInteries = _context4.sent;
                  _context4.next = 30;
                  return items[i].Vouchers.SalesLedger;
                case 30:
                  items[i].Vouchers.Buyer = _context4.sent;
                  delete items[i].Vouchers.SalesLedger;
                  _context4.next = 34;
                  return items[i].Vouchers;
                case 34:
                  data = _context4.sent;
                  _context4.next = 37;
                  return data.invoice_id;
                case 37:
                  data.invoice_id = _context4.sent;
                  data.voucherInteries.push(items[i]);
                  delete data.voucherInteries[0].Vouchers;
                  array.push(data);
                case 41:
                case "end":
                  return _context4.stop();
              }
            }, _loop);
          });
          i = 0;
        case 27:
          if (!(i < items.length)) {
            _context6.next = 32;
            break;
          }
          return _context6.delegateYield(_loop(i), "t0", 29);
        case 29:
          i++;
          _context6.next = 27;
          break;
        case 32:
          _context6.next = 34;
          return array.forEach( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
              return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    console.log("ccocmcmcooc", data);
                    _context5.next = 3;
                    return data.voucherInteries.forEach(function (h) {
                      if (data.is_local === 'yes') {
                        var name1 = h.type + ' (LOCAL) SGST ' + Number(h.ledger.sale_key) / 2;
                        // let name2 = h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2;
                        var check = head.find(function (c) {
                          return c.name === name1;
                        });
                        if (check) {} else {
                          head.push({
                            name: h.type + ' (LOCAL) SGST ' + Number(h.ledger.sale_key) / 2,
                            key: Number(h.ledger.sale_key) / 2,
                            flag: 'local'
                          }, {
                            name: h.type + ' (LOCAL) CGST ' + Number(h.ledger.sale_key) / 2,
                            key: Number(h.ledger.sale_key) / 2,
                            flag: 'local'
                          });
                        }
                      } else {
                        var name = h.type + ' (INTERSTATE) ' + h.ledger.sale_key;
                        var _check = head.find(function (c) {
                          return c.name === name;
                        });
                        if (_check) {} else {
                          head.push({
                            name: h.type + ' (INTERSTATE) ' + h.ledger.sale_key,
                            key: h.ledger.sale_key,
                            flag: 'outer'
                          });
                        }
                      }
                    });
                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }, _callee4);
            }));
            return function (_x17) {
              return _ref5.apply(this, arguments);
            };
          }());
        case 34:
          _context6.next = 36;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 36:
          mainArray = _context6.sent;
          _context6.next = 39;
          return {
            data: mainArray,
            head: head,
            items: items
          };
        case 39:
          obj = _context6.sent;
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: obj
          });
        case 43:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "No date Found!"
          });
        case 44:
          _context6.next = 50;
          break;
        case 46:
          _context6.prev = 46;
          _context6.t1 = _context6["catch"](0);
          console.log(_context6.t1, " == = = ");
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t1,
            message: "Something went wrong!"
          });
        case 50:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[0, 46]]);
  }));
  return function (_x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getPurchaseRegisterVoucher = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var uids, ledger, _invoice_date21, items, array, head, _loop2, i, mainArray, obj;
    return _regeneratorRuntime().wrap(function _callee7$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          uids = [];
          _context9.next = 4;
          return _ledger["default"].findAll({
            where: {
              company_id: data.company_id
              // name: { [Op.like]: "%purchase-%" }
            }
          });
        case 4:
          ledger = _context9.sent;
          _context9.next = 7;
          return (0, _ledger2.decreption)(ledger, "array", data.data.email);
        case 7:
          ledger = _context9.sent;
          _context9.next = 10;
          return ledger.map(function (item) {
            if (item.name && item.name.match("Purchase ")) {
              uids.push(item.uid);
            }
          });
        case 10:
          console.log(uids);
          if (!(ledger.length > 0)) {
            _context9.next = 44;
            break;
          }
          //     let items = await PurchaseVoucher.findAll({where:{
          //         invoice_date: {
          //             [Op.gte]: new Date(data.start_date),
          //             [Op.lte]: new Date(data.end_date)
          //         },
          //         buyer_ledger_id: { [Op.in]: uids }
          //     },
          //     include:[{
          //         model:Ledger,
          //         as: 'PurchaseLedger'
          //     },{
          //         model:ItemInteries,
          //         required: false,
          //         where: {
          //             type: 'Purchase'
          //         }
          //     },{
          //         model:VoucherInteries,
          //         required: false,
          //         where: {
          //             type: 'Purchase'
          //         },
          //         include:[{
          //             model:Ledger
          //         }]
          //     }]
          // }).map((node) => node.get({
          //     plain: true
          // }));
          console.log(data.start_date, "= = = == = = = =", data.start_date);
          _context9.next = 15;
          return _voucherInteries["default"].findAll({
            where: {
              ledger_id: _defineProperty({}, Op["in"], uids)
            },
            include: [{
              model: _purchaseVoucher["default"],
              as: 'Voucherp',
              where: {
                invoice_date: (_invoice_date21 = {}, _defineProperty(_invoice_date21, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date21, Op.lte, new Date(data.end_date)), _invoice_date21)
              },
              include: [{
                model: _ledger["default"],
                as: 'PurchaseLedger'
              }, {
                model: _itemInteries["default"],
                required: false,
                where: {
                  type: 'Purchase'
                }
              }, {
                model: _taxInteries["default"],
                required: false,
                where: {
                  type: 'Purchase'
                },
                include: [{
                  model: _ledger["default"]
                }]
              }]
            }, {
              model: _ledger["default"] //,as:'VoucherLedger'
            }]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 15:
          items = _context9.sent;
          _context9.next = 18;
          return (0, _purchasevoucher.decreptionPurchase)(items, 'array', data.data.email);
        case 18:
          items = _context9.sent;
          _context9.next = 21;
          return [];
        case 21:
          array = _context9.sent;
          _context9.next = 24;
          return [];
        case 24:
          head = _context9.sent;
          if (!(items && items.length > 0)) {
            _context9.next = 33;
            break;
          }
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2(i) {
            var data, find;
            return _regeneratorRuntime().wrap(function _loop2$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return {
                    voucherInteries: []
                  };
                case 2:
                  data = _context7.sent;
                  console.log(items[i].Voucherp.invoice_id, " == = = = =", i);
                  _context7.next = 6;
                  return items[i].Voucherp.invoice_id;
                case 6:
                  _context7.t0 = _context7.sent;
                  if (!(_context7.t0 <= 9)) {
                    _context7.next = 11;
                    break;
                  }
                  _context7.t1 = "".concat(items[i].Voucherp.current_year.toString().substr(-2) + "-" + items[i].Voucherp.end_year.toString().substr(-2), "/00").concat(items[i].Voucherp.invoice_id);
                  _context7.next = 12;
                  break;
                case 11:
                  _context7.t1 = items[i].Voucherp.invoice_id > 9 ? "".concat(items[i].Voucherp.current_year.toString().substr(-2) + "-" + items[i].Voucherp.end_year.toString().substr(-2), "/0").concat(items[i].Voucherp.invoice_id) : "".concat(items[i].Voucherp.current_year.toString().substr(-2) + "-" + items[i].Voucherp.end_year.toString().substr(-2), "/").concat(items[i].Voucherp.invoice_id);
                case 12:
                  items[i].Voucherp.invoice_id = _context7.t1;
                  _context7.next = 15;
                  return array.find(function (el) {
                    return el.invoice_id === items[i].Voucherp.invoice_id;
                  });
                case 15:
                  find = _context7.sent;
                  _context7.next = 18;
                  return find;
                case 18:
                  if (!_context7.sent) {
                    _context7.next = 25;
                    break;
                  }
                  _context7.next = 21;
                  return find.voucherInteries.push(items[i]);
                case 21:
                  _context7.next = 23;
                  return find.voucherInteries.map(function (ele) {
                    if (ele.Voucherp) {
                      delete ele.Voucherp;
                    }
                  });
                case 23:
                  _context7.next = 41;
                  break;
                case 25:
                  _context7.next = 27;
                  return [];
                case 27:
                  items[i].Voucherp.voucherInteries = _context7.sent;
                  _context7.next = 30;
                  return items[i].Voucherp.PurchaseLedger;
                case 30:
                  items[i].Voucherp.Buyer = _context7.sent;
                  delete items[i].Voucherp.PurchaseLedger;
                  _context7.next = 34;
                  return items[i].Voucherp;
                case 34:
                  data = _context7.sent;
                  _context7.next = 37;
                  return data.invoice_id;
                case 37:
                  data.invoice_id = _context7.sent;
                  data.voucherInteries.push(items[i]);
                  delete data.voucherInteries[0].Voucherp;
                  array.push(data);
                case 41:
                case "end":
                  return _context7.stop();
              }
            }, _loop2);
          });
          i = 0;
        case 28:
          if (!(i < items.length)) {
            _context9.next = 33;
            break;
          }
          return _context9.delegateYield(_loop2(i), "t0", 30);
        case 30:
          i++;
          _context9.next = 28;
          break;
        case 33:
          _context9.next = 35;
          return array.forEach( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
              return _regeneratorRuntime().wrap(function _callee6$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    console.log("ccocmcmcooc");
                    _context8.next = 3;
                    return data.voucherInteries.forEach(function (h) {
                      if (data.is_local === 'yes') {
                        var name1 = h.type + ' (LOCAL) SGST ' + Number(h.ledger.sale_key) / 2;
                        // let name2 = h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2;
                        var check = head.find(function (c) {
                          return c.name === name1;
                        });
                        if (check) {} else {
                          head.push({
                            name: h.type + ' (LOCAL) SGST ' + Number(h.ledger.sale_key) / 2,
                            key: Number(h.ledger.sale_key) / 2,
                            flag: 'local'
                          }, {
                            name: h.type + ' (LOCAL) CGST ' + Number(h.ledger.sale_key) / 2,
                            key: Number(h.ledger.sale_key) / 2,
                            flag: 'local'
                          });
                        }
                      } else {
                        var name = h.type + ' (INTERSTATE) ' + h.ledger.sale_key;
                        var _check2 = head.find(function (c) {
                          return c.name === name;
                        });
                        if (_check2) {} else {
                          head.push({
                            name: h.type + ' (INTERSTATE) ' + h.ledger.sale_key,
                            key: h.ledger.sale_key,
                            flag: 'outer'
                          });
                        }
                      }
                    });
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }, _callee6);
            }));
            return function (_x20) {
              return _ref7.apply(this, arguments);
            };
          }());
        case 35:
          _context9.next = 37;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 37:
          mainArray = _context9.sent;
          _context9.next = 40;
          return {
            data: mainArray,
            head: head
          };
        case 40:
          obj = _context9.sent;
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: obj
          });
        case 44:
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "No date Found!"
          });
        case 45:
          _context9.next = 51;
          break;
        case 47:
          _context9.prev = 47;
          _context9.t1 = _context9["catch"](0);
          console.log(_context9.t1);
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context9.t1,
            message: "Something went wrong!"
          });
        case 51:
        case "end":
          return _context9.stop();
      }
    }, _callee7, null, [[0, 47]]);
  }));
  return function (_x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getdayBookVoucher = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data, res) {
    var _invoice_date22, _invoice_date23, _invoice_date24, _invoice_date25, _invoice_date26, _invoice_date27, _invoice_date28, journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, array, i, s, mainArray;
    return _regeneratorRuntime().wrap(function _callee8$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          paymentVoucher = [];
          console.log("data", data);
          _context10.next = 5;
          return _journalInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              // invoice_date: data.start_date
              invoice_date: (_invoice_date22 = {}, _defineProperty(_invoice_date22, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date22, Op.lte, new Date(data.end_date)), _invoice_date22)
            }]),
            include: [{
              model: _ledger["default"],
              as: "VoucherLedger"
            }, {
              model: _journalVoucher["default"],
              as: 'Voucher'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 5:
          journalVoucher = _context10.sent;
          _context10.next = 8;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date23 = {}, _defineProperty(_invoice_date23, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date23, Op.lte, new Date(data.end_date)), _invoice_date23)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'SalesLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 8:
          saleVoucher = _context10.sent;
          _context10.next = 11;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date24 = {}, _defineProperty(_invoice_date24, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date24, Op.lte, new Date(data.end_date)), _invoice_date24)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PurchaseLedger'
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 11:
          purchaseVoucher = _context10.sent;
          _context10.next = 14;
          return _creditVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date25 = {}, _defineProperty(_invoice_date25, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date25, Op.lte, new Date(data.end_date)), _invoice_date25)
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
        case 14:
          creditVoucher = _context10.sent;
          _context10.next = 17;
          return _debitVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date26 = {}, _defineProperty(_invoice_date26, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date26, Op.lte, new Date(data.end_date)), _invoice_date26)
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
        case 17:
          debitVoucher = _context10.sent;
          _context10.next = 20;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date27 = {}, _defineProperty(_invoice_date27, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date27, Op.lte, new Date(data.end_date)), _invoice_date27)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'ReciptBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 20:
          recieptVoucher = _context10.sent;
          _context10.next = 23;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date28 = {}, _defineProperty(_invoice_date28, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date28, Op.lte, new Date(data.end_date)), _invoice_date28)
            }]),
            include: [{
              model: _ledger["default"],
              as: 'PaymentBuyer'
            }],
            order: [['invoice_id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 23:
          paymentVoucher = _context10.sent;
          _context10.next = 26;
          return (0, _journalEntries.decreptionJournalEntries)(journalVoucher, 'array', data.data.email);
        case 26:
          journalVoucher = _context10.sent;
          _context10.next = 29;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 29:
          recieptVoucher = _context10.sent;
          _context10.next = 32;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 32:
          paymentVoucher = _context10.sent;
          _context10.next = 35;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 35:
          saleVoucher = _context10.sent;
          _context10.next = 38;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 38:
          purchaseVoucher = _context10.sent;
          _context10.next = 41;
          return (0, _creditvoucher.decreptionCredit)(creditVoucher, 'array', data.data.email);
        case 41:
          creditVoucher = _context10.sent;
          _context10.next = 44;
          return (0, _debitvoucher.decreptionDebit)(debitVoucher, 'array', data.data.email);
        case 44:
          debitVoucher = _context10.sent;
          _context10.next = 47;
          return [];
        case 47:
          array = _context10.sent;
          if (!(journalVoucher && journalVoucher.length > 0)) {
            _context10.next = 102;
            break;
          }
          i = 0;
        case 50:
          if (!(i < journalVoucher.length)) {
            _context10.next = 102;
            break;
          }
          _context10.next = 53;
          return journalVoucher[i].type;
        case 53:
          _context10.t0 = _context10.sent;
          if (!(_context10.t0 === 'debit')) {
            _context10.next = 63;
            break;
          }
          _context10.next = 57;
          return journalVoucher[i].amount;
        case 57:
          journalVoucher[i].debitAmount = _context10.sent;
          _context10.next = 60;
          return 0;
        case 60:
          journalVoucher[i].creditAmount = _context10.sent;
          _context10.next = 69;
          break;
        case 63:
          _context10.next = 65;
          return 0;
        case 65:
          journalVoucher[i].debitAmount = _context10.sent;
          _context10.next = 68;
          return journalVoucher[i].amount;
        case 68:
          journalVoucher[i].creditAmount = _context10.sent;
        case 69:
          _context10.next = 71;
          return journalVoucher[i].VoucherLedger;
        case 71:
          journalVoucher[i].ledger = _context10.sent;
          _context10.next = 74;
          return 'journal';
        case 74:
          journalVoucher[i].voucher_type = _context10.sent;
          if (!journalVoucher[i].Voucher) {
            _context10.next = 93;
            break;
          }
          _context10.next = 78;
          return journalVoucher[i].Voucher.invoice_date;
        case 78:
          journalVoucher[i].invoice_date = _context10.sent;
          _context10.next = 81;
          return journalVoucher[i].Voucher.id;
        case 81:
          journalVoucher[i].voucher_number = _context10.sent;
          _context10.next = 84;
          return journalVoucher[i].Voucher.invoice_id;
        case 84:
          _context10.t1 = _context10.sent;
          if (!(_context10.t1 <= 9)) {
            _context10.next = 89;
            break;
          }
          _context10.t2 = "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/00").concat(journalVoucher[i].Voucher.invoice_id);
          _context10.next = 90;
          break;
        case 89:
          _context10.t2 = journalVoucher[i].Voucher.invoice_id > 9 ? "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/0").concat(journalVoucher[i].Voucher.invoice_id) : "".concat(journalVoucher[i].Voucher.current_year.toString().substr(-2) + "-" + journalVoucher[i].Voucher.end_year.toString().substr(-2), "/").concat(journalVoucher[i].Voucher.invoice_id);
        case 90:
          journalVoucher[i].invoice_id = _context10.t2;
          _context10.next = 96;
          break;
        case 93:
          journalVoucher[i].invoice_date = '';
          journalVoucher[i].voucher_number = '';
          journalVoucher[i].invoice_id = '';
        case 96:
          delete journalVoucher[i].VoucherLedger;
          _context10.next = 99;
          return array.push(journalVoucher[i]);
        case 99:
          i++;
          _context10.next = 50;
          break;
        case 102:
          if (!(saleVoucher && saleVoucher.length > 0)) {
            _context10.next = 140;
            break;
          }
          s = 0;
        case 104:
          if (!(s < saleVoucher.length)) {
            _context10.next = 140;
            break;
          }
          _context10.next = 107;
          return 'sale';
        case 107:
          saleVoucher[s].voucher_type = _context10.sent;
          _context10.next = 110;
          return saleVoucher[s].SalesLedger;
        case 110:
          saleVoucher[s].ledger = _context10.sent;
          _context10.next = 113;
          return {};
        case 113:
          saleVoucher[s].Voucher = _context10.sent;
          saleVoucher[s].type = 'debit';
          _context10.next = 117;
          return saleVoucher[s].total_amount;
        case 117:
          saleVoucher[s].debitAmount = _context10.sent;
          _context10.next = 120;
          return 0;
        case 120:
          saleVoucher[s].creditAmount = _context10.sent;
          saleVoucher[s].amount = saleVoucher[s].total_amount;
          _context10.next = 124;
          return saleVoucher[s].id;
        case 124:
          saleVoucher[s].voucher_number = _context10.sent;
          _context10.next = 127;
          return saleVoucher[s].invoice_id;
        case 127:
          _context10.t3 = _context10.sent;
          if (!(_context10.t3 <= 9)) {
            _context10.next = 132;
            break;
          }
          _context10.t4 = "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/00").concat(saleVoucher[s].invoice_id);
          _context10.next = 133;
          break;
        case 132:
          _context10.t4 = saleVoucher[s].invoice_id > 9 ? "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/0").concat(saleVoucher[s].invoice_id) : "".concat(saleVoucher[s].current_year.toString().substr(-2) + "-" + saleVoucher[s].end_year.toString().substr(-2), "/").concat(saleVoucher[s].invoice_id);
        case 133:
          saleVoucher[s].invoice_id = _context10.t4;
          delete saleVoucher[s].SalesLedger;
          _context10.next = 137;
          return array.push(saleVoucher[s]);
        case 137:
          s++;
          _context10.next = 104;
          break;
        case 140:
          if (!(purchaseVoucher && purchaseVoucher.length > 0)) {
            _context10.next = 178;
            break;
          }
          s = 0;
        case 142:
          if (!(s < purchaseVoucher.length)) {
            _context10.next = 178;
            break;
          }
          _context10.next = 145;
          return 'purchase';
        case 145:
          purchaseVoucher[s].voucher_type = _context10.sent;
          _context10.next = 148;
          return purchaseVoucher[s].PurchaseLedger;
        case 148:
          purchaseVoucher[s].ledger = _context10.sent;
          _context10.next = 151;
          return {};
        case 151:
          purchaseVoucher[s].Voucher = _context10.sent;
          purchaseVoucher[s].type = 'Credit';
          _context10.next = 155;
          return 0;
        case 155:
          purchaseVoucher[s].debitAmount = _context10.sent;
          _context10.next = 158;
          return purchaseVoucher[s].total_amount;
        case 158:
          purchaseVoucher[s].creditAmount = _context10.sent;
          purchaseVoucher[s].amount = purchaseVoucher[s].total_amount;
          _context10.next = 162;
          return purchaseVoucher[s].id;
        case 162:
          purchaseVoucher[s].voucher_number = _context10.sent;
          _context10.next = 165;
          return purchaseVoucher[s].invoice_id;
        case 165:
          _context10.t5 = _context10.sent;
          if (!(_context10.t5 <= 9)) {
            _context10.next = 170;
            break;
          }
          _context10.t6 = "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/00").concat(purchaseVoucher[s].invoice_id);
          _context10.next = 171;
          break;
        case 170:
          _context10.t6 = purchaseVoucher[s].invoice_id > 9 ? "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/0").concat(purchaseVoucher[s].invoice_id) : "".concat(purchaseVoucher[s].current_year.toString().substr(-2) + "-" + purchaseVoucher[s].end_year.toString().substr(-2), "/").concat(purchaseVoucher[s].invoice_id);
        case 171:
          purchaseVoucher[s].invoice_id = _context10.t6;
          delete purchaseVoucher[s].PurchaseLedger;
          _context10.next = 175;
          return array.push(purchaseVoucher[s]);
        case 175:
          s++;
          _context10.next = 142;
          break;
        case 178:
          if (!creditVoucher) {
            _context10.next = 216;
            break;
          }
          s = 0;
        case 180:
          if (!(s < creditVoucher.length)) {
            _context10.next = 216;
            break;
          }
          _context10.next = 183;
          return 'Credit note';
        case 183:
          creditVoucher[s].voucher_type = _context10.sent;
          _context10.next = 186;
          return creditVoucher[s].CreditBuyer;
        case 186:
          creditVoucher[s].ledger = _context10.sent;
          _context10.next = 189;
          return {};
        case 189:
          creditVoucher[s].Voucher = _context10.sent;
          creditVoucher[s].type = 'debit';
          _context10.next = 193;
          return creditVoucher[s].total_amount;
        case 193:
          creditVoucher[s].debitAmount = _context10.sent;
          _context10.next = 196;
          return 0;
        case 196:
          creditVoucher[s].creditAmount = _context10.sent;
          creditVoucher[s].amount = creditVoucher[s].total_amount;
          _context10.next = 200;
          return creditVoucher[s].id;
        case 200:
          creditVoucher[s].voucher_number = _context10.sent;
          _context10.next = 203;
          return creditVoucher[s].invoice_id;
        case 203:
          _context10.t7 = _context10.sent;
          if (!(_context10.t7 <= 9)) {
            _context10.next = 208;
            break;
          }
          _context10.t8 = "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/00").concat(creditVoucher[s].invoice_id);
          _context10.next = 209;
          break;
        case 208:
          _context10.t8 = creditVoucher[s].invoice_id > 9 ? "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/0").concat(creditVoucher[s].invoice_id) : "".concat(creditVoucher[s].current_year.toString().substr(-2) + "-" + creditVoucher[s].end_year.toString().substr(-2), "/").concat(creditVoucher[s].invoice_id);
        case 209:
          creditVoucher[s].invoice_id = _context10.t8;
          delete creditVoucher[s].CreditBuyer;
          _context10.next = 213;
          return array.push(creditVoucher[s]);
        case 213:
          s++;
          _context10.next = 180;
          break;
        case 216:
          if (!debitVoucher) {
            _context10.next = 254;
            break;
          }
          s = 0;
        case 218:
          if (!(s < debitVoucher.length)) {
            _context10.next = 254;
            break;
          }
          _context10.next = 221;
          return 'Debit note';
        case 221:
          debitVoucher[s].voucher_type = _context10.sent;
          _context10.next = 224;
          return debitVoucher[s].DebitBuyer;
        case 224:
          debitVoucher[s].ledger = _context10.sent;
          _context10.next = 227;
          return {};
        case 227:
          debitVoucher[s].Voucher = _context10.sent;
          debitVoucher[s].type = 'Credit';
          _context10.next = 231;
          return 0;
        case 231:
          debitVoucher[s].debitAmount = _context10.sent;
          _context10.next = 234;
          return debitVoucher[s].total_amount;
        case 234:
          debitVoucher[s].creditAmount = _context10.sent;
          debitVoucher[s].amount = debitVoucher[s].total_amount;
          _context10.next = 238;
          return debitVoucher[s].id;
        case 238:
          debitVoucher[s].voucher_number = _context10.sent;
          _context10.next = 241;
          return debitVoucher[s].invoice_id;
        case 241:
          _context10.t9 = _context10.sent;
          if (!(_context10.t9 <= 9)) {
            _context10.next = 246;
            break;
          }
          _context10.t10 = "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/00").concat(debitVoucher[s].invoice_id);
          _context10.next = 247;
          break;
        case 246:
          _context10.t10 = debitVoucher[s].invoice_id > 9 ? "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/0").concat(debitVoucher[s].invoice_id) : "".concat(debitVoucher[s].current_year.toString().substr(-2) + "-" + debitVoucher[s].end_year.toString().substr(-2), "/").concat(debitVoucher[s].invoice_id);
        case 247:
          debitVoucher[s].invoice_id = _context10.t10;
          delete debitVoucher[s].DebitBuyer;
          _context10.next = 251;
          return array.push(debitVoucher[s]);
        case 251:
          s++;
          _context10.next = 218;
          break;
        case 254:
          if (!recieptVoucher) {
            _context10.next = 299;
            break;
          }
          i = 0;
        case 256:
          if (!(i < recieptVoucher.length)) {
            _context10.next = 299;
            break;
          }
          _context10.next = 259;
          return recieptVoucher[i].type;
        case 259:
          _context10.t11 = _context10.sent;
          if (!(_context10.t11 === 'debit')) {
            _context10.next = 269;
            break;
          }
          _context10.next = 263;
          return recieptVoucher[i].total_amount;
        case 263:
          recieptVoucher[i].debitAmount = _context10.sent;
          _context10.next = 266;
          return 0;
        case 266:
          recieptVoucher[i].creditAmount = _context10.sent;
          _context10.next = 275;
          break;
        case 269:
          _context10.next = 271;
          return 0;
        case 271:
          recieptVoucher[i].debitAmount = _context10.sent;
          _context10.next = 274;
          return recieptVoucher[i].total_amount;
        case 274:
          recieptVoucher[i].creditAmount = _context10.sent;
        case 275:
          _context10.next = 277;
          return recieptVoucher[i].ReciptBuyer;
        case 277:
          recieptVoucher[i].ledger = _context10.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context10.next = 281;
          return 'reciept';
        case 281:
          recieptVoucher[i].voucher_type = _context10.sent;
          _context10.next = 284;
          return recieptVoucher[i].id;
        case 284:
          recieptVoucher[i].voucher_number = _context10.sent;
          _context10.next = 287;
          return recieptVoucher[i].invoice_id;
        case 287:
          _context10.t12 = _context10.sent;
          if (!(_context10.t12 <= 9)) {
            _context10.next = 292;
            break;
          }
          _context10.t13 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context10.next = 293;
          break;
        case 292:
          _context10.t13 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 293:
          recieptVoucher[i].invoice_id = _context10.t13;
          _context10.next = 296;
          return array.push(recieptVoucher[i]);
        case 296:
          i++;
          _context10.next = 256;
          break;
        case 299:
          if (!paymentVoucher) {
            _context10.next = 344;
            break;
          }
          i = 0;
        case 301:
          if (!(i < paymentVoucher.length)) {
            _context10.next = 344;
            break;
          }
          _context10.next = 304;
          return paymentVoucher[i].type;
        case 304:
          _context10.t14 = _context10.sent;
          if (!(_context10.t14 === 'debit')) {
            _context10.next = 314;
            break;
          }
          _context10.next = 308;
          return paymentVoucher[i].total_amount;
        case 308:
          paymentVoucher[i].debitAmount = _context10.sent;
          _context10.next = 311;
          return 0;
        case 311:
          paymentVoucher[i].creditAmount = _context10.sent;
          _context10.next = 320;
          break;
        case 314:
          _context10.next = 316;
          return 0;
        case 316:
          paymentVoucher[i].debitAmount = _context10.sent;
          _context10.next = 319;
          return paymentVoucher[i].total_amount;
        case 319:
          paymentVoucher[i].creditAmount = _context10.sent;
        case 320:
          _context10.next = 322;
          return paymentVoucher[i].PaymentBuyer;
        case 322:
          paymentVoucher[i].ledger = _context10.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context10.next = 326;
          return 'payment';
        case 326:
          paymentVoucher[i].voucher_type = _context10.sent;
          _context10.next = 329;
          return paymentVoucher[i].id;
        case 329:
          paymentVoucher[i].voucher_number = _context10.sent;
          _context10.next = 332;
          return paymentVoucher[i].invoice_id;
        case 332:
          _context10.t15 = _context10.sent;
          if (!(_context10.t15 <= 9)) {
            _context10.next = 337;
            break;
          }
          _context10.t16 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context10.next = 338;
          break;
        case 337:
          _context10.t16 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 338:
          paymentVoucher[i].invoice_id = _context10.t16;
          _context10.next = 341;
          return array.push(paymentVoucher[i]);
        case 341:
          i++;
          _context10.next = 301;
          break;
        case 344:
          console.log(array, " = == = = ");
          if (!(array.length > 0)) {
            _context10.next = 352;
            break;
          }
          _context10.next = 348;
          return (0, _arraySort["default"])(array, 'invoice_date');
        case 348:
          mainArray = _context10.sent;
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            JournalVoucher: mainArray,
            journal: journalVoucher,
            sales: saleVoucher,
            purchase: purchaseVoucher,
            credit: creditVoucher,
            debit: debitVoucher,
            payment: paymentVoucher,
            reciept: recieptVoucher
          });
        case 352:
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher not found!",
            JournalVoucher: []
          });
        case 353:
          _context10.next = 359;
          break;
        case 355:
          _context10.prev = 355;
          _context10.t17 = _context10["catch"](0);
          console.log(_context10.t17);
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context10.t17,
            message: "Something went wrong!"
          });
        case 359:
        case "end":
          return _context10.stop();
      }
    }, _callee8, null, [[0, 355]]);
  }));
  return function (_x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getJournalRegisterVoucher = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data, res) {
    var _invoice_date29, items, array, i;
    return _regeneratorRuntime().wrap(function _callee9$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          console.log(data.start_date, new Date(data.start_date));
          // return;
          _context11.next = 4;
          return _journalVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date29 = {}, _defineProperty(_invoice_date29, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date29, Op.lte, new Date(data.end_date)), _invoice_date29)
            }]),
            include: [{
              model: _company["default"],
              attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
            }, {
              model: _purpose["default"]
            }, {
              model: _item_stock_voucher_entries["default"]
            }, {
              model: _journalInteries["default"],
              required: true,
              include: [{
                model: _ledger["default"],
                as: 'VoucherLedger'
              }]
            }],
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 4:
          items = _context11.sent;
          _context11.next = 7;
          return (0, _journalvoucher.decreptionJournal)(items, 'array', data.data.email);
        case 7:
          items = _context11.sent;
          _context11.next = 10;
          return [];
        case 10:
          array = _context11.sent;
          if (!(items && items.length > 0)) {
            _context11.next = 15;
            break;
          }
          for (i = 0; i < items.length; i++) {
            if (items[i].journal_entries) {
              items[i].journal_entries.forEach(function (el, index) {
                if (index === 0) {
                  if (el.type === 'debit') {
                    el.debitAmount = el.amount;
                    el.creditAmount = 0;
                  } else {
                    el.debitAmount = 0;
                    el.creditAmount = el.amount;
                  }
                  el.total_amount = items[i].total_amount;
                  el.invoice_id = items[i].invoice_id <= 9 ? "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/").concat(items[i].invoice_id) : items[i].invoice_id > 9 ? "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/").concat(items[i].invoice_id) : "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/").concat(items[i].invoice_id);
                  ;
                  el.invoice_date = items[i].invoice_date;
                  el.purpose_voucher = items[i].purpose_voucher;
                  el.journal_voucher_id = items[i].uid;
                  array.push(el);
                } else {
                  if (el.type === 'debit') {
                    el.debitAmount = el.amount;
                    el.creditAmount = 0;
                  } else {
                    el.debitAmount = 0;
                    el.creditAmount = el.amount;
                  }
                  el.total_amount = '';
                  el.invoice_id = '';
                  el.invoice_date = '';
                  el.purpose_voucher = '';
                  el.journal_voucher_id = items[i].uid;
                  array.push(el);
                }
              });
            }
            if (items[i].item_stock_voucher_entries) {
              items[i].item_stock_voucher_entries.forEach(function (el, index) {
                if (index === 0) {
                  if (el.type.toLowerCase() === 'debit') {
                    el.debitAmount = el.price;
                    el.creditAmount = 0;
                  } else {
                    el.debitAmount = 0;
                    el.creditAmount = el.price;
                  }
                  el.VoucherLedger = items[i].Ledger;
                  el.total_amount = items[i].total_amount;
                  el.invoice_id = items[i].invoice_id <= 9 ? "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/00").concat(items[i].invoice_id) : items[i].invoice_id > 9 ? "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/0").concat(items[i].invoice_id) : "".concat(items[i].current_year.toString().substr(-2) + "-" + items[i].end_year.toString().substr(-2), "/").concat(items[i].invoice_id);
                  ;
                  el.invoice_date = items[i].invoice_date;
                  el.purpose_voucher = items[i].purpose_voucher;
                  el.journal_voucher_id = items[i].uid;
                  array.push(el);
                } else {
                  if (el.type.toLowerCase() === 'debit') {
                    el.debitAmount = el.price;
                    el.creditAmount = 0;
                  } else {
                    el.debitAmount = 0;
                    el.creditAmount = el.price;
                  }
                  el.VoucherLedger = items[i].Ledger;
                  el.total_amount = '';
                  el.invoice_id = '';
                  el.invoice_date = '';
                  el.purpose_voucher = '';
                  el.journal_voucher_id = items[i].uid;
                  array.push(el);
                }
              });
            }
            ;
          }
          _context11.next = 16;
          break;
        case 15:
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher not found!",
            Voucher: []
          });
        case 16:
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: array
          });
        case 19:
          _context11.prev = 19;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context11.t0,
            message: "Something went wrong!"
          });
        case 23:
        case "end":
          return _context11.stop();
      }
    }, _callee9, null, [[0, 19]]);
  }));
  return function (_x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getgroupVoucher = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, res) {
    var _invoice_date30, _invoice_date31, _invoice_date32, _invoice_date33, _invoice_date34, _invoice_date35, _invoice_date36, Mainarray, query, ledger, returngroup;
    return _regeneratorRuntime().wrap(function _callee10$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return [];
        case 3:
          Mainarray = _context12.sent;
          if (!data.account_id) {
            _context12.next = 8;
            break;
          }
          _context12.next = 7;
          return {
            account_group_id: data.account_id
          };
        case 7:
          query = _context12.sent;
        case 8:
          if (!data.sub_account_id) {
            _context12.next = 12;
            break;
          }
          _context12.next = 11;
          return {
            sub_account_group_id: data.sub_account_id
          };
        case 11:
          query = _context12.sent;
        case 12:
          _context12.next = 14;
          return _ledger["default"].findAll({
            where: _defineProperty({}, Op.and, [query, {
              company_id: data.company_id
            }]),
            attributes: ['id', 'uid', 'name', 'amount', 'opening_balance'],
            include: [{
              model: _accountGroup["default"]
            }, {
              model: _subAccountGroup["default"]
            }, {
              model: _journalInteries["default"],
              where: {
                invoice_date: (_invoice_date30 = {}, _defineProperty(_invoice_date30, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date30, Op.lte, new Date(data.end_date)), _invoice_date30)
              },
              required: false,
              attributes: ['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
              include: [{
                model: _journalVoucher["default"],
                attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                as: 'Voucher'
              }]
            }, {
              model: _recieptVoucher["default"],
              where: {
                invoice_date: (_invoice_date31 = {}, _defineProperty(_invoice_date31, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date31, Op.lte, new Date(data.end_date)), _invoice_date31)
              },
              required: false,
              attributes: ['id', 'uid', 'total_amount', 'type', 'receive_type']
            }, {
              model: _paymentVoucher["default"],
              where: {
                invoice_date: (_invoice_date32 = {}, _defineProperty(_invoice_date32, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date32, Op.lte, new Date(data.end_date)), _invoice_date32)
              },
              required: false,
              attributes: ['id', 'uid', 'total_amount', 'type', 'receive_type']
            }, {
              model: _saleVoucher["default"],
              where: {
                invoice_date: (_invoice_date33 = {}, _defineProperty(_invoice_date33, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date33, Op.lte, new Date(data.end_date)), _invoice_date33)
              },
              required: false,
              attributes: ['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
              include: [{
                model: _itemInteries["default"],
                required: false,
                where: {
                  type: 'Sales'
                }
              }]
            }, {
              model: _purchaseVoucher["default"],
              where: {
                invoice_date: (_invoice_date34 = {}, _defineProperty(_invoice_date34, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date34, Op.lte, new Date(data.end_date)), _invoice_date34)
              },
              required: false,
              attributes: ['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
              include: [{
                model: _itemInteries["default"],
                required: false,
                where: {
                  type: 'Purchase'
                }
              }]
            }, {
              model: _creditVoucher["default"],
              where: {
                invoice_date: (_invoice_date35 = {}, _defineProperty(_invoice_date35, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date35, Op.lte, new Date(data.end_date)), _invoice_date35)
              },
              required: false,
              attributes: ['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
              include: [{
                model: _itemInteries["default"],
                required: false,
                where: {
                  type: 'Debit'
                }
              }]
            }, {
              model: _debitVoucher["default"],
              where: {
                invoice_date: (_invoice_date36 = {}, _defineProperty(_invoice_date36, Op.gte, new Date(data.start_date)), _defineProperty(_invoice_date36, Op.lte, new Date(data.end_date)), _invoice_date36)
              },
              required: false,
              attributes: ['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
              include: [{
                model: _itemInteries["default"],
                required: false,
                where: {
                  type: 'Credit'
                }
              }]
            }, {
              model: _voucherInteries["default"],
              as: 'vocher_entries',
              attributes: ['id', 'uid', 'amount', 'type']
            }, {
              model: _taxInteries["default"],
              as: 'tax_entries',
              attributes: ['id', 'uid', 'amount', 'type']
            }]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 14:
          ledger = _context12.sent;
          _context12.next = 17;
          return (0, _voucherReport.decreptionReport)(ledger, 'array', data.data.email);
        case 17:
          ledger = _context12.sent;
          console.log("array1233-->", ledger);
          if (!(ledger.length > 0)) {
            _context12.next = 36;
            break;
          }
          console.log("array-->", ledger);
          _context12.next = 23;
          return ledger.map(function (item) {
            item.open_amount = item.amount;
            item.open_type = item.opening_balance;
            item.name = item.name;
            item.subAccount = item.sub_account_group ? item.sub_account_group : {};
            item.account = item.account_group ? item.account_group : {};
            delete item.amount;
            delete item.opening_balance;
            delete item.sub_account_group;
            delete item.account_group;
            item.closeing_amount = 0;
            item.debitAmount = 0;
            item.creditAmount = 0;
            if (item.journal_entries.length > 0) {
              item.journal_entries.forEach(function (journal) {
                if (journal.type === 'debit') {
                  item.debitAmount = Number(journal.amount) + Number(item.debitAmount);
                } else {
                  item.creditAmount = Number(journal.amount) + Number(item.debitAmount);
                }
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.reciept_vouchers.length > 0) {
              item.reciept_vouchers.forEach(function (reciept) {
                if (reciept.type === 'debit') {
                  item.debitAmount = Number(reciept.total_amount) + Number(item.debitAmount);
                } else {
                  item.creditAmount = Number(reciept.total_amount) + Number(item.creditAmount);
                }
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.payment_vouchers.length > 0) {
              item.payment_vouchers.forEach(function (payment) {
                if (payment.type === 'debit') {
                  item.debitAmount = Number(payment.total_amount) + Number(item.debitAmount);
                } else {
                  item.creditAmount = Number(payment.total_amount) + Number(item.creditAmount);
                }
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.sales_vouchers && item.sales_vouchers.length > 0) {
              item.sales_vouchers.forEach(function (sale) {
                item.debitAmount = Number(sale.total_amount) + Number(item.debitAmount);
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.purchase_vouchers.length > 0) {
              item.purchase_vouchers.forEach(function (purchase) {
                item.creditAmount = Number(purchase.total_amount) + Number(item.creditAmount);
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.credit_vouchers.length > 0) {
              item.credit_vouchers.forEach(function (credit) {
                item.debitAmount = Number(credit.total_amount) + Number(item.debitAmount);
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.debit_vouchers.length > 0) {
              item.debit_vouchers.forEach(function (debit) {
                item.creditAmount = Number(debit.total_amount) + Number(item.creditAmount);
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.vocher_entries.length > 0) {
              item.vocher_entries.forEach(function (voucher) {
                if (voucher.type === "Sales" || voucher.type === "sales") {
                  item.creditAmount = Number(voucher.amount) + Number(item.creditAmount);
                } else if (voucher.type === "Purchase" || voucher.type === "purchase") {
                  item.debitAmount = Number(voucher.amount) + Number(item.creditAmount);
                } else if (voucher.type === "Debit" || voucher.type === "Debit") {
                  item.debitAmount = Number(voucher.amount) + Number(item.creditAmount);
                } else if (voucher.type === "Credit" || voucher.type === "Credit") {
                  item.creditAmount = Number(voucher.amount) + Number(item.creditAmount);
                }
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            if (item.tax_entries.length > 0) {
              item.tax_entries.forEach(function (tax) {
                if (tax.type === "Sales" || tax.type === "sales") {
                  item.creditAmount = Number(tax.amount) + Number(item.creditAmount);
                } else if (tax.type === "Purchase" || tax.type === "purchase") {
                  item.debitAmount = Number(tax.amount) + Number(item.debitAmount);
                } else if (tax.type === "Debit" || tax.type === "Debit") {
                  item.debitAmount = Number(tax.amount) + Number(item.creditAmount);
                } else if (tax.type === "Credit" || tax.type === "Credit") {
                  item.creditAmount = Number(tax.amount) + Number(item.creditAmount);
                }
                item.closeing_amount = Number(Number(item.debitAmount) - Number(item.creditAmount)) + Number(item.open_amount);
              });
            }
            delete item.journal_entries;
            delete item.reciept_vouchers;
            delete item.payment_vouchers;
            delete item.sales_vouchers;
            delete item.purchase_vouchers;
            delete item.credit_vouchers;
            delete item.debit_vouchers;
            delete item.vocher_entries;
            delete item.tax_entries;
          });
        case 23:
          _context12.next = 25;
          return groupFuncation(ledger);
        case 25:
          returngroup = _context12.sent;
          if (!returngroup) {
            _context12.next = 29;
            break;
          }
          _context12.next = 29;
          return Object.keys(returngroup).forEach(function (item) {
            // console.log(item);
            // console.log(returngroup[item][0].account.name, " == = = = =")
            if (item === "MainGroup") {
              if (returngroup[item].length > 0) {
                var a = {
                  name: returngroup[item][0].account.name,
                  open_amount: 0,
                  closeing_amount: 0,
                  sub_uid: '',
                  subAccount: {},
                  debitAmount: 0,
                  creditAmount: 0,
                  ishead: true,
                  ismain: true
                };
                var b = [];
                returngroup[item].forEach(function (element) {
                  a.open_amount = Number(a.open_amount) + Number(element.open_amount);
                  a.subAccount = {};
                  a.closeing_amount = Number(a.closeing_amount) + Number(element.closeing_amount);
                  if (element.type === 'debit') {
                    a.debitAmount = Number(a.debitAmount) + Number(element.debitAmount);
                    a.creditAmount = Number(a.creditAmount) + Number(element.creditAmount);
                  } else {
                    a.debitAmount = Number(a.debitAmount) + Number(element.debitAmount);
                    a.creditAmount = Number(a.creditAmount) + Number(element.creditAmount);
                  }
                  b.push(element);
                });
                b.unshift(a);
                Mainarray = Mainarray.concat(b);
              }
            } else {
              var _a = {
                name: item,
                open_amount: 0,
                closeing_amount: 0,
                sub_uid: '',
                subAccount: {},
                debitAmount: 0,
                creditAmount: 0,
                ishead: true,
                issub: true
              };
              var _b = [];
              returngroup[item].forEach(function (element) {
                _a.open_amount = Number(_a.open_amount) + Number(element.open_amount);
                _a.sub_uid = element.subAccount.uid;
                _a.subAccount = {};
                _a.closeing_amount = Number(_a.closeing_amount) + Number(element.closeing_amount);
                if (element.type === 'debit') {
                  _a.debitAmount = Number(_a.debitAmount) + Number(element.debitAmount);
                  _a.creditAmount = Number(_a.creditAmount) + Number(element.creditAmount);
                } else {
                  _a.debitAmount = Number(_a.debitAmount) + Number(element.debitAmount);
                  _a.creditAmount = Number(_a.creditAmount) + Number(element.creditAmount);
                }
                _b.push(element);
              });
              _b.unshift(_a);
              Mainarray = Mainarray.concat(_b);
            }
          });
        case 29:
          if (!(Mainarray.length > 0)) {
            _context12.next = 33;
            break;
          }
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            JournalVoucher: Mainarray
          });
        case 33:
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "No date Found!"
          });
        case 34:
          _context12.next = 37;
          break;
        case 36:
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "No date Found!"
          });
        case 37:
          _context12.next = 43;
          break;
        case 39:
          _context12.prev = 39;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0, " == = = =errro");
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context12.t0.message,
            message: "Something went wrong!"
          });
        case 43:
        case "end":
          return _context12.stop();
      }
    }, _callee10, null, [[0, 39]]);
  }));
  return function (_x25, _x26) {
    return _ref10.apply(this, arguments);
  };
}();