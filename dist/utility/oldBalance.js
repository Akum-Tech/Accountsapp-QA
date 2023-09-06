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
var _getDebitCredit = require("./getDebitCredit");
var _balanceGroup = _interopRequireDefault(require("../constant/balanceGroup"));
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
console.log("balanceGroup", _balanceGroup["default"].ids);
function checkValid(_x) {
  return _checkValid.apply(this, arguments);
}
function _checkValid() {
  _checkValid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var findledger, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _ledger["default"].findOne({
            where: {
              uid: id
            }
          });
        case 2:
          findledger = _context3.sent;
          if (!findledger) {
            _context3.next = 13;
            break;
          }
          data = _balanceGroup["default"].ids.find(function (item) {
            return item == findledger.dataValues.account_group_id;
          });
          console.log("data", data);
          if (!data) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", true);
        case 10:
          return _context3.abrupt("return", false);
        case 11:
          _context3.next = 14;
          break;
        case 13:
          return _context3.abrupt("return", false);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _checkValid.apply(this, arguments);
}
exports.CashOldBlance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var checkExist, recieptVoucher, paymentVoucher, purchaseVoucher, saleVoucher, array, i, debitcredit;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return checkValid(data.ledger_id);
        case 3:
          checkExist = _context.sent;
          if (checkExist) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", {
            credit: 0,
            debit: 0
          });
        case 6:
          saleVoucher = [];
          _context.next = 9;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
          recieptVoucher = _context.sent;
          _context.next = 12;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
          paymentVoucher = _context.sent;
          _context.next = 15;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
        case 15:
          saleVoucher = _context.sent;
          _context.next = 18;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
        case 18:
          purchaseVoucher = _context.sent;
          _context.next = 21;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 21:
          recieptVoucher = _context.sent;
          _context.next = 24;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 24:
          paymentVoucher = _context.sent;
          _context.next = 27;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 27:
          purchaseVoucher = _context.sent;
          _context.next = 30;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 30:
          saleVoucher = _context.sent;
          array = [];
          if (!recieptVoucher) {
            _context.next = 77;
            break;
          }
          i = 0;
        case 34:
          if (!(i < recieptVoucher.length)) {
            _context.next = 77;
            break;
          }
          _context.next = 37;
          return recieptVoucher[i].type;
        case 37:
          _context.t0 = _context.sent;
          if (!(_context.t0 === 'debit')) {
            _context.next = 47;
            break;
          }
          _context.next = 41;
          return 0;
        case 41:
          recieptVoucher[i].debitAmount = _context.sent;
          _context.next = 44;
          return recieptVoucher[i].total_amount;
        case 44:
          recieptVoucher[i].creditAmount = _context.sent;
          _context.next = 53;
          break;
        case 47:
          _context.next = 49;
          return recieptVoucher[i].total_amount;
        case 49:
          recieptVoucher[i].debitAmount = _context.sent;
          _context.next = 52;
          return 0;
        case 52:
          recieptVoucher[i].creditAmount = _context.sent;
        case 53:
          _context.next = 55;
          return recieptVoucher[i].ReciptBuyer;
        case 55:
          recieptVoucher[i].ledger = _context.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context.next = 59;
          return 'reciept';
        case 59:
          recieptVoucher[i].voucher_type = _context.sent;
          _context.next = 62;
          return recieptVoucher[i].id;
        case 62:
          recieptVoucher[i].voucher_number = _context.sent;
          _context.next = 65;
          return recieptVoucher[i].invoice_id;
        case 65:
          _context.t1 = _context.sent;
          if (!(_context.t1 <= 9)) {
            _context.next = 70;
            break;
          }
          _context.t2 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context.next = 71;
          break;
        case 70:
          _context.t2 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 71:
          recieptVoucher[i].invoice_id = _context.t2;
          _context.next = 74;
          return array.push(recieptVoucher[i]);
        case 74:
          i++;
          _context.next = 34;
          break;
        case 77:
          if (!paymentVoucher) {
            _context.next = 122;
            break;
          }
          i = 0;
        case 79:
          if (!(i < paymentVoucher.length)) {
            _context.next = 122;
            break;
          }
          _context.next = 82;
          return paymentVoucher[i].type;
        case 82:
          _context.t3 = _context.sent;
          if (!(_context.t3 === 'debit')) {
            _context.next = 92;
            break;
          }
          _context.next = 86;
          return 0;
        case 86:
          paymentVoucher[i].debitAmount = _context.sent;
          _context.next = 89;
          return paymentVoucher[i].total_amount;
        case 89:
          paymentVoucher[i].creditAmount = _context.sent;
          _context.next = 98;
          break;
        case 92:
          _context.next = 94;
          return paymentVoucher[i].total_amount;
        case 94:
          paymentVoucher[i].debitAmount = _context.sent;
          _context.next = 97;
          return 0;
        case 97:
          paymentVoucher[i].creditAmount = _context.sent;
        case 98:
          _context.next = 100;
          return paymentVoucher[i].PaymentBuyer;
        case 100:
          paymentVoucher[i].ledger = _context.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context.next = 104;
          return 'payment';
        case 104:
          paymentVoucher[i].voucher_type = _context.sent;
          _context.next = 107;
          return paymentVoucher[i].id;
        case 107:
          paymentVoucher[i].voucher_number = _context.sent;
          _context.next = 110;
          return paymentVoucher[i].invoice_id;
        case 110:
          _context.t4 = _context.sent;
          if (!(_context.t4 <= 9)) {
            _context.next = 115;
            break;
          }
          _context.t5 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context.next = 116;
          break;
        case 115:
          _context.t5 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 116:
          paymentVoucher[i].invoice_id = _context.t5;
          _context.next = 119;
          return array.push(paymentVoucher[i]);
        case 119:
          i++;
          _context.next = 79;
          break;
        case 122:
          if (!purchaseVoucher) {
            _context.next = 149;
            break;
          }
          i = 0;
        case 124:
          if (!(i < purchaseVoucher.length)) {
            _context.next = 149;
            break;
          }
          _context.next = 127;
          return 0;
        case 127:
          purchaseVoucher[i].debitAmount = _context.sent;
          _context.next = 130;
          return purchaseVoucher[i].total_amount;
        case 130:
          purchaseVoucher[i].creditAmount = _context.sent;
          _context.next = 133;
          return purchaseVoucher[i].PurchaseLedger;
        case 133:
          purchaseVoucher[i].ledger = _context.sent;
          delete purchaseVoucher[i].PurchaseLedger;
          _context.next = 137;
          return 'purchase';
        case 137:
          purchaseVoucher[i].voucher_type = _context.sent;
          _context.next = 140;
          return purchaseVoucher[i].id;
        case 140:
          purchaseVoucher[i].voucher_number = _context.sent;
          _context.next = 143;
          return "".concat(purchaseVoucher[i].current_year.toString().substr(-2) + "-" + purchaseVoucher[i].end_year.toString().substr(-2), "/").concat(purchaseVoucher[i].invoice_id);
        case 143:
          purchaseVoucher[i].invoice_id = _context.sent;
          _context.next = 146;
          return array.push(purchaseVoucher[i]);
        case 146:
          i++;
          _context.next = 124;
          break;
        case 149:
          if (!saleVoucher) {
            _context.next = 180;
            break;
          }
          i = 0;
        case 151:
          if (!(i < saleVoucher.length)) {
            _context.next = 180;
            break;
          }
          _context.next = 154;
          return saleVoucher[i].total_amount;
        case 154:
          saleVoucher[i].debitAmount = _context.sent;
          saleVoucher[i].creditAmount = 0;
          _context.next = 158;
          return saleVoucher[i].SalesLedger;
        case 158:
          saleVoucher[i].ledger = _context.sent;
          delete saleVoucher[i].SalesLedger;
          _context.next = 162;
          return 'sale';
        case 162:
          saleVoucher[i].voucher_type = _context.sent;
          _context.next = 165;
          return saleVoucher[i].id;
        case 165:
          saleVoucher[i].voucher_number = _context.sent;
          _context.next = 168;
          return saleVoucher[i].invoice_id;
        case 168:
          _context.t6 = _context.sent;
          if (!(_context.t6 <= 9)) {
            _context.next = 173;
            break;
          }
          _context.t7 = "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/00").concat(saleVoucher[i].invoice_id);
          _context.next = 174;
          break;
        case 173:
          _context.t7 = saleVoucher[i].invoice_id > 9 ? "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/0").concat(saleVoucher[i].invoice_id) : "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/").concat(saleVoucher[i].invoice_id);
        case 174:
          saleVoucher[i].invoice_id = _context.t7;
          _context.next = 177;
          return array.push(saleVoucher[i]);
        case 177:
          i++;
          _context.next = 151;
          break;
        case 180:
          _context.next = 182;
          return (0, _getDebitCredit.getDebitCredit)(array);
        case 182:
          debitcredit = _context.sent;
          return _context.abrupt("return", debitcredit);
        case 186:
          _context.prev = 186;
          _context.t8 = _context["catch"](0);
          console.log(_context.t8);
        case 189:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 186]]);
  }));
  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.BankOldBlance = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var checkExist, recieptVoucher, paymentVoucher, saleVoucher, purchaseVoucher, array, i, debitcredit;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return checkValid(data.ledger_id);
        case 3:
          checkExist = _context2.sent;
          if (checkExist) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", {
            credit: 0,
            debit: 0
          });
        case 6:
          purchaseVoucher = [];
          _context2.next = 9;
          return _recieptVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
          recieptVoucher = _context2.sent;
          _context2.next = 12;
          return _paymentVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              receive_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
          paymentVoucher = _context2.sent;
          _context2.next = 15;
          return _saleVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
        case 15:
          saleVoucher = _context2.sent;
          _context2.next = 18;
          return _purchaseVoucher["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              buyer_ledger_id: data.ledger_id
            }, {
              invoice_date: _defineProperty({}, Op.lt, data.start_date)
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
        case 18:
          purchaseVoucher = _context2.sent;
          _context2.next = 21;
          return (0, _receiptvoucher.decreptionReceipt)(recieptVoucher, 'array', data.data.email);
        case 21:
          recieptVoucher = _context2.sent;
          _context2.next = 24;
          return (0, _paymentvoucher.decreptionPayment)(paymentVoucher, 'array', data.data.email);
        case 24:
          paymentVoucher = _context2.sent;
          _context2.next = 27;
          return (0, _purchasevoucher.decreptionPurchase)(purchaseVoucher, 'array', data.data.email);
        case 27:
          purchaseVoucher = _context2.sent;
          _context2.next = 30;
          return (0, _salesvoucher.decreptionSale)(saleVoucher, 'array', data.data.email);
        case 30:
          saleVoucher = _context2.sent;
          array = [];
          if (!recieptVoucher) {
            _context2.next = 77;
            break;
          }
          i = 0;
        case 34:
          if (!(i < recieptVoucher.length)) {
            _context2.next = 77;
            break;
          }
          _context2.next = 37;
          return recieptVoucher[i].type;
        case 37:
          _context2.t0 = _context2.sent;
          if (!(_context2.t0 === 'debit')) {
            _context2.next = 47;
            break;
          }
          _context2.next = 41;
          return 0;
        case 41:
          recieptVoucher[i].debitAmount = _context2.sent;
          _context2.next = 44;
          return recieptVoucher[i].total_amount;
        case 44:
          recieptVoucher[i].creditAmount = _context2.sent;
          _context2.next = 53;
          break;
        case 47:
          _context2.next = 49;
          return recieptVoucher[i].total_amount;
        case 49:
          recieptVoucher[i].debitAmount = _context2.sent;
          _context2.next = 52;
          return 0;
        case 52:
          recieptVoucher[i].creditAmount = _context2.sent;
        case 53:
          _context2.next = 55;
          return recieptVoucher[i].ReciptBuyer;
        case 55:
          recieptVoucher[i].ledger = _context2.sent;
          delete recieptVoucher[i].ReciptBuyer;
          _context2.next = 59;
          return 'reciept';
        case 59:
          recieptVoucher[i].voucher_type = _context2.sent;
          _context2.next = 62;
          return recieptVoucher[i].id;
        case 62:
          recieptVoucher[i].voucher_number = _context2.sent;
          _context2.next = 65;
          return recieptVoucher[i].invoice_id;
        case 65:
          _context2.t1 = _context2.sent;
          if (!(_context2.t1 <= 9)) {
            _context2.next = 70;
            break;
          }
          _context2.t2 = "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/00").concat(recieptVoucher[i].invoice_id);
          _context2.next = 71;
          break;
        case 70:
          _context2.t2 = recieptVoucher[i].invoice_id > 9 ? "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/0").concat(recieptVoucher[i].invoice_id) : "".concat(recieptVoucher[i].current_year.toString().substr(-2) + "-" + recieptVoucher[i].end_year.toString().substr(-2), "/").concat(recieptVoucher[i].invoice_id);
        case 71:
          recieptVoucher[i].invoice_id = _context2.t2;
          _context2.next = 74;
          return array.push(recieptVoucher[i]);
        case 74:
          i++;
          _context2.next = 34;
          break;
        case 77:
          if (!paymentVoucher) {
            _context2.next = 122;
            break;
          }
          i = 0;
        case 79:
          if (!(i < paymentVoucher.length)) {
            _context2.next = 122;
            break;
          }
          _context2.next = 82;
          return paymentVoucher[i].type;
        case 82:
          _context2.t3 = _context2.sent;
          if (!(_context2.t3 === 'debit')) {
            _context2.next = 92;
            break;
          }
          _context2.next = 86;
          return 0;
        case 86:
          paymentVoucher[i].debitAmount = _context2.sent;
          _context2.next = 89;
          return paymentVoucher[i].total_amount;
        case 89:
          paymentVoucher[i].creditAmount = _context2.sent;
          _context2.next = 98;
          break;
        case 92:
          _context2.next = 94;
          return paymentVoucher[i].total_amount;
        case 94:
          paymentVoucher[i].debitAmount = _context2.sent;
          _context2.next = 97;
          return 0;
        case 97:
          paymentVoucher[i].creditAmount = _context2.sent;
        case 98:
          _context2.next = 100;
          return paymentVoucher[i].PaymentBuyer;
        case 100:
          paymentVoucher[i].ledger = _context2.sent;
          delete paymentVoucher[i].PaymentBuyer;
          _context2.next = 104;
          return 'payment';
        case 104:
          paymentVoucher[i].voucher_type = _context2.sent;
          _context2.next = 107;
          return paymentVoucher[i].id;
        case 107:
          paymentVoucher[i].voucher_number = _context2.sent;
          _context2.next = 110;
          return paymentVoucher[i].invoice_id;
        case 110:
          _context2.t4 = _context2.sent;
          if (!(_context2.t4 <= 9)) {
            _context2.next = 115;
            break;
          }
          _context2.t5 = "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/00").concat(paymentVoucher[i].invoice_id);
          _context2.next = 116;
          break;
        case 115:
          _context2.t5 = paymentVoucher[i].invoice_id > 9 ? "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/0").concat(paymentVoucher[i].invoice_id) : "".concat(paymentVoucher[i].current_year.toString().substr(-2) + "-" + paymentVoucher[i].end_year.toString().substr(-2), "/").concat(paymentVoucher[i].invoice_id);
        case 116:
          paymentVoucher[i].invoice_id = _context2.t5;
          _context2.next = 119;
          return array.push(paymentVoucher[i]);
        case 119:
          i++;
          _context2.next = 79;
          break;
        case 122:
          if (!purchaseVoucher) {
            _context2.next = 149;
            break;
          }
          i = 0;
        case 124:
          if (!(i < purchaseVoucher.length)) {
            _context2.next = 149;
            break;
          }
          _context2.next = 127;
          return 0;
        case 127:
          purchaseVoucher[i].debitAmount = _context2.sent;
          _context2.next = 130;
          return purchaseVoucher[i].total_amount;
        case 130:
          purchaseVoucher[i].creditAmount = _context2.sent;
          _context2.next = 133;
          return purchaseVoucher[i].PurchaseLedger;
        case 133:
          purchaseVoucher[i].ledger = _context2.sent;
          delete purchaseVoucher[i].PurchaseLedger;
          _context2.next = 137;
          return 'purchase';
        case 137:
          purchaseVoucher[i].voucher_type = _context2.sent;
          _context2.next = 140;
          return purchaseVoucher[i].id;
        case 140:
          purchaseVoucher[i].voucher_number = _context2.sent;
          _context2.next = 143;
          return "".concat(purchaseVoucher[i].current_year.toString().substr(-2) + "-" + purchaseVoucher[i].end_year.toString().substr(-2), "/").concat(purchaseVoucher[i].invoice_id);
        case 143:
          purchaseVoucher[i].invoice_id = _context2.sent;
          _context2.next = 146;
          return array.push(purchaseVoucher[i]);
        case 146:
          i++;
          _context2.next = 124;
          break;
        case 149:
          if (!saleVoucher) {
            _context2.next = 180;
            break;
          }
          i = 0;
        case 151:
          if (!(i < saleVoucher.length)) {
            _context2.next = 180;
            break;
          }
          _context2.next = 154;
          return saleVoucher[i].total_amount;
        case 154:
          saleVoucher[i].debitAmount = _context2.sent;
          saleVoucher[i].creditAmount = 0;
          _context2.next = 158;
          return saleVoucher[i].SalesLedger;
        case 158:
          saleVoucher[i].ledger = _context2.sent;
          delete saleVoucher[i].SalesLedger;
          _context2.next = 162;
          return 'sale';
        case 162:
          saleVoucher[i].voucher_type = _context2.sent;
          _context2.next = 165;
          return saleVoucher[i].id;
        case 165:
          saleVoucher[i].voucher_number = _context2.sent;
          _context2.next = 168;
          return saleVoucher[i].invoice_id;
        case 168:
          _context2.t6 = _context2.sent;
          if (!(_context2.t6 <= 9)) {
            _context2.next = 173;
            break;
          }
          _context2.t7 = "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/00").concat(saleVoucher[i].invoice_id);
          _context2.next = 174;
          break;
        case 173:
          _context2.t7 = saleVoucher[i].invoice_id > 9 ? "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/0").concat(saleVoucher[i].invoice_id) : "".concat(saleVoucher[i].current_year.toString().substr(-2) + "-" + saleVoucher[i].end_year.toString().substr(-2), "/").concat(saleVoucher[i].invoice_id);
        case 174:
          saleVoucher[i].invoice_id = _context2.t7;
          _context2.next = 177;
          return array.push(saleVoucher[i]);
        case 177:
          i++;
          _context2.next = 151;
          break;
        case 180:
          _context2.next = 182;
          return (0, _getDebitCredit.getDebitCredit)(array);
        case 182:
          debitcredit = _context2.sent;
          return _context2.abrupt("return", debitcredit);
        case 186:
          _context2.prev = 186;
          _context2.t8 = _context2["catch"](0);
          console.log(_context2.t8);
        case 189:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 186]]);
  }));
  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();