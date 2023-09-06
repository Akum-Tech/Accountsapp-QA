"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _itemStock = _interopRequireDefault(require("../models/itemStock"));
var _company = _interopRequireDefault(require("../models/company"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _units = _interopRequireDefault(require("../models/units"));
var _states = _interopRequireDefault(require("../models/states"));
var _stockGroup = _interopRequireDefault(require("../models/stockGroup"));
var _stockSubGroup = _interopRequireDefault(require("../models/stockSubGroup"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _voucherInteries = _interopRequireDefault(require("../models/voucherInteries"));
var _voucherEntries = require("../security/voucherEntries");
var _itemEntries = require("../security/itemEntries");
var _itemInteries = _interopRequireDefault(require("../models/itemInteries"));
var _taxInteries = _interopRequireDefault(require("../models/taxInteries"));
var _purchaseVoucher = _interopRequireDefault(require("../models/purchaseVoucher"));
var _purchasevoucher = require("../security/purchasevoucher");
var _saleVoucher = _interopRequireDefault(require("../models/saleVoucher"));
var _debitVoucher = _interopRequireDefault(require("../models/debitVoucher"));
var _creditVoucher = _interopRequireDefault(require("../models/creditVoucher"));
var _itemStock2 = _interopRequireDefault(require("./itemStock.service"));
var _database = require("../database/database");
var _ledger4 = _interopRequireDefault(require("../models/ledger"));
var _allReport = require("../security/allReport");
var _manualClosingStock = require("../security/manualClosingStock");
var _ledger5 = require("../security/ledger");
var _uniqid = _interopRequireDefault(require("uniqid"));
require("@babel/polyfill");
var _salesvoucher = require("../security/salesvoucher");
var _manualCosingStock = _interopRequireDefault(require("../models/manualCosingStock"));
var _journalVoucher = _interopRequireDefault(require("../models/journalVoucher"));
var _item_stock_voucher_entries = _interopRequireDefault(require("../models/item_stock_voucher_entries"));
var _debitvoucher = require("../security/debitvoucher");
var _creditvoucher = require("../security/creditvoucher");
var _items = _interopRequireDefault(require("../models/items"));
var _journalvoucher = require("../security/journalvoucher");
var _receiptvoucher = require("../security/receiptvoucher");
var _paymentvoucher = require("../security/paymentvoucher");
var _recieptVoucher = _interopRequireDefault(require("../models/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _journalInteries = _interopRequireDefault(require("../models/journalInteries"));
var _journalEntries = require("../security/journalEntries");
var _accountData = require("../utility/accountData");
var _config = _interopRequireDefault(require("../constant/config"));
var _voucherReport = require("../security/voucherReport");
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _openAmount = require("../security/openAmount");
var _arraySort = _interopRequireDefault(require("array-sort"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function profitCal(_x) {
  return _profitCal.apply(this, arguments);
}
function _profitCal() {
  _profitCal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(object) {
    var salesAmount, purchaseAmount, directIncomeAmount, directExpenseAmount, indirectExpenseAmount, indirectIncomeAmount, closeAmount, openAmount, purchaseCreditAmount, salesCreditAmount, indirectgrossAmount, netProfite, grossProfitAmount;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          salesAmount = 0;
          purchaseAmount = 0;
          directIncomeAmount = 0;
          directExpenseAmount = 0;
          indirectExpenseAmount = 0;
          indirectIncomeAmount = 0;
          closeAmount = object.closeingStock ? object.closeingStock : 0;
          openAmount = object.openingStock ? object.openingStock : 0;
          purchaseCreditAmount = 0;
          salesCreditAmount = 0;
          indirectgrossAmount = 0; // let grossProfitAmount = 0;
          netProfite = 0;
          grossProfitAmount = 0;
          if (object.SaleAccount && object.SaleAccount.length > 0) {
            object.SaleAccount.map(function (item) {
              salesAmount = Number(salesAmount) + Number(item.total_amount);
            });
          }
          if (object.PurchaseAccount && object.PurchaseAccount.length > 0) {
            object.PurchaseAccount.map(function (item) {
              purchaseAmount = Number(purchaseAmount) + Number(item.total_amount);
            });
          }
          if (object.directIncome && object.directIncome.length > 0) {
            object.directIncome.map(function (item) {
              directIncomeAmount = Number(directIncomeAmount) + Number(item.total_amount);
            });
          }
          if (object.directExpense && object.directExpense.length > 0) {
            object.directExpense.map(function (item) {
              directExpenseAmount = Number(directExpenseAmount) + Number(item.total_amount);
            });
          }
          if (object.indirectExpense && object.indirectExpense.length > 0) {
            object.indirectExpense.map(function (item) {
              indirectExpenseAmount = Number(indirectExpenseAmount) + Number(item.total_amount);
            });
          }
          if (object.indirectIncome && object.indirectIncome.length > 0) {
            object.indirectIncome.map(function (item) {
              indirectIncomeAmount = Number(indirectIncomeAmount) + Number(item.total_amount);
            });
          }
          salesCreditAmount = Number(salesAmount) + Number(directIncomeAmount) + Number(closeAmount);
          purchaseCreditAmount = Number(openAmount) + Number(purchaseAmount) + Number(directExpenseAmount);
          grossProfitAmount = Number(salesCreditAmount) - Number(purchaseCreditAmount);
          indirectgrossAmount = Number(grossProfitAmount) + Number(indirectIncomeAmount);
          netProfite = Number(indirectgrossAmount) - Number(indirectExpenseAmount);
          return _context10.abrupt("return", {
            salesAmount: salesAmount,
            purchaseAmount: purchaseAmount,
            directIncomeAmount: directIncomeAmount,
            directExpenseAmount: directExpenseAmount,
            indirectExpenseAmount: indirectExpenseAmount,
            indirectIncomeAmount: indirectIncomeAmount,
            closeAmount: closeAmount,
            openAmount: openAmount,
            salesCreditAmount: salesCreditAmount,
            purchaseCreditAmount: purchaseCreditAmount,
            grossProfitAmount: grossProfitAmount,
            indirectgrossAmount: indirectgrossAmount,
            netProfite: netProfite
          });
        case 25:
        case "end":
          return _context10.stop();
      }
    }, _callee9);
  }));
  return _profitCal.apply(this, arguments);
}
;
function currentprofitLoss(_x2, _x3) {
  return _currentprofitLoss.apply(this, arguments);
}
function _currentprofitLoss() {
  _currentprofitLoss = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, res) {
    var letmainobject, purcseobjcet, saleobject, directExpenseobject, directIncomeobject, indirectExpenseobject, indirectIncomebject, openingStock, closeingStock;
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          letmainobject = {};
          _context11.next = 4;
          return getPurchaceAccountcalculaton(_config["default"].PurchaseAccounts, data, res);
        case 4:
          purcseobjcet = _context11.sent;
          _context11.next = 7;
          return getSaleAccountcalculaton(_config["default"].sale_account_id, data, res);
        case 7:
          saleobject = _context11.sent;
          _context11.next = 10;
          return (0, _accountData.groupData)(_config["default"].direct_expense_id, data, res);
        case 10:
          directExpenseobject = _context11.sent;
          _context11.next = 13;
          return (0, _accountData.groupData)(_config["default"].direct_income_id, data, res);
        case 13:
          directIncomeobject = _context11.sent;
          _context11.next = 16;
          return (0, _accountData.groupData)(_config["default"].indirect_Expenses_id, data, res);
        case 16:
          indirectExpenseobject = _context11.sent;
          _context11.next = 19;
          return (0, _accountData.groupData)(_config["default"].indirect_income_id, data, res);
        case 19:
          indirectIncomebject = _context11.sent;
          _context11.next = 22;
          return getopeingbalanceStockcalculation(data, res);
        case 22:
          openingStock = _context11.sent;
          _context11.next = 25;
          return getcloasingbalanceStockcalculation(data, openingStock, res);
        case 25:
          closeingStock = _context11.sent;
          //getcloasingbalancecalculation(data, res);

          letmainobject.PurchaseAccount = purcseobjcet;
          letmainobject.SaleAccount = saleobject;
          letmainobject.directExpense = directExpenseobject;
          letmainobject.directIncome = directIncomeobject;
          letmainobject.indirectExpense = indirectExpenseobject;
          letmainobject.indirectIncome = indirectIncomebject;
          letmainobject.openingStock = openingStock;
          letmainobject.closeingStock = closeingStock;
          if (!letmainobject) {
            _context11.next = 38;
            break;
          }
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data fetch Successfully",
            sheetdata: letmainobject
          });
        case 38:
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data not Found!",
            sheetdata: letmainobject
          });
        case 39:
          _context11.next = 44;
          break;
        case 41:
          _context11.prev = 41;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context11.t0.message,
            message: "Something went wrong!"
          });
        case 44:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[0, 41]]);
  }));
  return _currentprofitLoss.apply(this, arguments);
}
function oldprofitLoss(_x4, _x5) {
  return _oldprofitLoss.apply(this, arguments);
}
function _oldprofitLoss() {
  _oldprofitLoss = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data, res) {
    var letmainobject, purcseobjcet, saleobject, directExpenseobject, directIncomeobject, indirectExpenseobject, indirectIncomebject, openingStock, closeingStock;
    return _regeneratorRuntime().wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          letmainobject = {};
          _context12.next = 4;
          return getPurchaceAccountcalculaton(_config["default"].PurchaseAccounts, data, res);
        case 4:
          purcseobjcet = _context12.sent;
          _context12.next = 7;
          return getSaleAccountcalculaton(_config["default"].sale_account_id, data, res);
        case 7:
          saleobject = _context12.sent;
          _context12.next = 10;
          return (0, _accountData.groupData)(_config["default"].direct_expense_id, data, res);
        case 10:
          directExpenseobject = _context12.sent;
          _context12.next = 13;
          return (0, _accountData.groupData)(_config["default"].direct_income_id, data, res);
        case 13:
          directIncomeobject = _context12.sent;
          _context12.next = 16;
          return (0, _accountData.groupData)(_config["default"].indirect_Expenses_id, data, res);
        case 16:
          indirectExpenseobject = _context12.sent;
          _context12.next = 19;
          return (0, _accountData.groupData)(_config["default"].indirect_income_id, data, res);
        case 19:
          indirectIncomebject = _context12.sent;
          _context12.next = 22;
          return getopeingbalanceStockcalculation(data, res);
        case 22:
          openingStock = _context12.sent;
          _context12.next = 25;
          return getcloasingbalanceStockcalculation(data, openingStock, res);
        case 25:
          closeingStock = _context12.sent;
          //getcloasingbalancecalculation(data, res);

          letmainobject.PurchaseAccount = purcseobjcet;
          letmainobject.SaleAccount = saleobject;
          letmainobject.directExpense = directExpenseobject;
          letmainobject.directIncome = directIncomeobject;
          letmainobject.indirectExpense = indirectExpenseobject;
          letmainobject.indirectIncome = indirectIncomebject;
          letmainobject.openingStock = openingStock;
          letmainobject.closeingStock = closeingStock;
          if (!letmainobject) {
            _context12.next = 38;
            break;
          }
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data fetch Successfully",
            sheetdata: letmainobject
          });
        case 38:
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data not Found!",
            sheetdata: letmainobject
          });
        case 39:
          _context12.next = 44;
          break;
        case 41:
          _context12.prev = 41;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context12.t0.message,
            message: "Something went wrong!"
          });
        case 44:
        case "end":
          return _context12.stop();
      }
    }, _callee11, null, [[0, 41]]);
  }));
  return _oldprofitLoss.apply(this, arguments);
}
exports.getProitLossSheetData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, res) {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return currentprofitLoss(data, res);
        case 3:
          response = _context.sent;
          return _context.abrupt("return", response);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0.message,
            message: "Something went wrong!"
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
exports.getBlanceSheetReport = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, res) {
    var dataobj, dataobjnew, accountgroup, _loop, i, ledgerOpeningDiffrence, j, _j, response, calculation, olddata, findyear, findProfitLedger, responseold, calculationold, debitProfiltAmount, creditProfiltAmount, openAmount1, diffrence, _invoice_date, journalVoucher, findCompany, startdate, sign;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          dataobj = {};
          dataobjnew = {};
          _context7.next = 5;
          return [
          // R P J Voucher
          {
            uid: _config["default"].bankA,
            name: "Bank (A)",
            subname: "Bank_A",
            ledger: []
          }, {
            uid: _config["default"].bankL,
            name: "Bank (L)",
            subname: "Bank_L",
            ledger: []
          }, {
            uid: _config["default"]["case"],
            name: "Cash",
            subname: "Cash",
            ledger: []
          }, {
            uid: _config["default"].capital_account_id,
            name: "Capital Account",
            subname: "Capital_Account",
            ledger: []
          }, {
            uid: _config["default"].current_assets_id,
            name: "Current Assets",
            subname: "Current_Assets",
            ledger: []
          }, {
            uid: _config["default"].current_liabilities_id,
            name: "Current Liabilities",
            subname: "Current_Liabilities",
            ledger: []
          }, {
            uid: _config["default"].fixed_assets,
            name: "Fixed Assets",
            subname: "Fixed_Assets",
            ledger: []
          }, {
            uid: _config["default"].stockinhand_id,
            name: "Stock in Hand",
            subname: "Stock_in_Hand",
            ledger: []
          }, {
            uid: _config["default"].sundry_debtors_id,
            name: "Sundry Debtors",
            subname: "Sundry_Debtors",
            ledger: []
          }, {
            uid: _config["default"].sundry_creditors_id,
            name: "Sundry Creditors",
            subname: "Sundry_Creditors",
            ledger: []
          }, {
            uid: _config["default"].tax_account_id,
            name: "Taxes",
            subname: "Taxes",
            ledger: []
          }

          //Stock in Hand voucher
          ];
        case 5:
          accountgroup = _context7.sent;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
            var value, ledgersum, ledger, _ledger, mainData, _ledger2, _ledger3;
            return _regeneratorRuntime().wrap(function _loop$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(accountgroup[i].uid == _config["default"].stockinhand_id)) {
                    _context6.next = 10;
                    break;
                  }
                  _context6.next = 3;
                  return getcloasingbalanceStockcalculation(data, res);
                case 3:
                  value = _context6.sent;
                  ledgersum = {};
                  ledgersum.name = "Closing Stock";
                  ledgersum.amount = value;
                  accountgroup[i].ledger.push(ledgersum);
                  _context6.next = 56;
                  break;
                case 10:
                  if (!(accountgroup[i].uid == _config["default"].tax_account_id)) {
                    _context6.next = 22;
                    break;
                  }
                  _context6.next = 13;
                  return _ledger4["default"].findAll({
                    where: {
                      company_id: data.company_id,
                      account_group_id: accountgroup[i].uid
                    }
                  }).map(function (node) {
                    return node.get({
                      plain: true
                    });
                  });
                case 13:
                  ledger = _context6.sent;
                  if (!(ledger.length > 0)) {
                    _context6.next = 20;
                    break;
                  }
                  _context6.next = 17;
                  return (0, _ledger5.decreption)(ledger, "array", data.data.email);
                case 17:
                  ledger = _context6.sent;
                  _context6.next = 20;
                  return Promise.all(ledger.map( /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(item) {
                      var datak;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return (0, _accountData.getRJPCalculationData)(item.uid, accountgroup[i].uid, data, res);
                          case 2:
                            datak = _context2.sent;
                            if (!isObjectEmpty(datak)) {
                              accountgroup[i].ledger.push(datak);
                            }
                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    }));
                    return function (_x10) {
                      return _ref3.apply(this, arguments);
                    };
                  }()));
                case 20:
                  _context6.next = 56;
                  break;
                case 22:
                  if (!(accountgroup[i].uid == _config["default"]["case"] || accountgroup[i].uid == _config["default"].bankA || accountgroup[i].uid == _config["default"].bankL)) {
                    _context6.next = 35;
                    break;
                  }
                  _context6.next = 25;
                  return _ledger4["default"].findAll({
                    where: {
                      company_id: data.company_id,
                      account_group_id: accountgroup[i].uid
                    }
                  }).map(function (node) {
                    return node.get({
                      plain: true
                    });
                  });
                case 25:
                  _ledger = _context6.sent;
                  if (!(_ledger.length > 0)) {
                    _context6.next = 33;
                    break;
                  }
                  _context6.next = 29;
                  return (0, _ledger5.decreption)(_ledger, "array", data.data.email);
                case 29:
                  _ledger = _context6.sent;
                  mainData = [];
                  _context6.next = 33;
                  return Promise.all(_ledger.map( /*#__PURE__*/function () {
                    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
                      var datak;
                      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return (0, _accountData.getRJPCalculationData)(item.uid, accountgroup[i].uid, data, res);
                          case 2:
                            datak = _context3.sent;
                            // mainData.push(datak)
                            // await getRPSPCalculation(
                            //     item.uid,
                            //     accountgroup[i].uid,
                            //     data,
                            //     res
                            // );
                            // accountgroup[i].ledger = await accountgroup[i].ledger.concat(datak);
                            if (!isObjectEmpty(datak)) {
                              accountgroup[i].ledger.push(datak);
                            }
                            // if (!isObjectEmpty(datak)) {
                            //     accountgroup[i].ledger.push(datak);
                            // }
                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }, _callee3);
                    }));
                    return function (_x11) {
                      return _ref4.apply(this, arguments);
                    };
                  }()));
                case 33:
                  _context6.next = 56;
                  break;
                case 35:
                  if (!(accountgroup[i].uid == _config["default"].sundry_debtors_id || accountgroup[i].uid == _config["default"].sundry_creditors_id)) {
                    _context6.next = 47;
                    break;
                  }
                  _context6.next = 38;
                  return _ledger4["default"].findAll({
                    where: {
                      company_id: data.company_id,
                      account_group_id: accountgroup[i].uid
                    }
                  }).map(function (node) {
                    return node.get({
                      plain: true
                    });
                  });
                case 38:
                  _ledger2 = _context6.sent;
                  if (!(_ledger2.length > 0)) {
                    _context6.next = 45;
                    break;
                  }
                  _context6.next = 42;
                  return (0, _ledger5.decreption)(_ledger2, "array", data.data.email);
                case 42:
                  _ledger2 = _context6.sent;
                  _context6.next = 45;
                  return Promise.all(_ledger2.map( /*#__PURE__*/function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item) {
                      var datak;
                      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                        while (1) switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return (0, _accountData.getRJPCalculationData)(item.uid, accountgroup[i].uid, data, res);
                          case 2:
                            datak = _context4.sent;
                            if (!isObjectEmpty(datak)) {
                              accountgroup[i].ledger.push(datak);
                            }
                          case 4:
                          case "end":
                            return _context4.stop();
                        }
                      }, _callee4);
                    }));
                    return function (_x12) {
                      return _ref5.apply(this, arguments);
                    };
                  }()));
                case 45:
                  _context6.next = 56;
                  break;
                case 47:
                  _context6.next = 49;
                  return _ledger4["default"].findAll({
                    where: {
                      company_id: data.company_id,
                      account_group_id: accountgroup[i].uid
                    }
                  }).map(function (node) {
                    return node.get({
                      plain: true
                    });
                  });
                case 49:
                  _ledger3 = _context6.sent;
                  if (!(_ledger3.length > 0)) {
                    _context6.next = 56;
                    break;
                  }
                  _context6.next = 53;
                  return (0, _ledger5.decreption)(_ledger3, "array", data.data.email);
                case 53:
                  _ledger3 = _context6.sent;
                  _context6.next = 56;
                  return Promise.all(_ledger3.map( /*#__PURE__*/function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(item) {
                      var datak;
                      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                        while (1) switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return (0, _accountData.getRJPCalculationData)(item.uid, accountgroup[i].uid, data, res);
                          case 2:
                            datak = _context5.sent;
                            if (!isObjectEmpty(datak)) {
                              accountgroup[i].ledger.push(datak);
                            }
                          case 4:
                          case "end":
                            return _context5.stop();
                        }
                      }, _callee5);
                    }));
                    return function (_x13) {
                      return _ref6.apply(this, arguments);
                    };
                  }()));
                case 56:
                case "end":
                  return _context6.stop();
              }
            }, _loop);
          });
          _context7.t0 = _regeneratorRuntime().keys(accountgroup);
        case 8:
          if ((_context7.t1 = _context7.t0()).done) {
            _context7.next = 13;
            break;
          }
          i = _context7.t1.value;
          return _context7.delegateYield(_loop(i), "t2", 11);
        case 11:
          _context7.next = 8;
          break;
        case 13:
          _context7.next = 15;
          return (0, _accountData.getLeaderDiffrenc)(data, res);
        case 15:
          ledgerOpeningDiffrence = _context7.sent;
          // return ledgerOpeningDiffrence;

          for (j in accountgroup) {
            dataobj[accountgroup[j].name] = accountgroup[j].ledger;
          }
          for (_j in accountgroup) {
            dataobjnew[accountgroup[_j].subname] = accountgroup[_j].ledger;
          }
          _context7.next = 20;
          return ledgerOpeningDiffrence;
        case 20:
          dataobj['diffrence'] = _context7.sent;
          _context7.next = 23;
          return ledgerOpeningDiffrence;
        case 23:
          dataobjnew['diffrence'] = _context7.sent;
          _context7.next = 26;
          return currentprofitLoss(data, res);
        case 26:
          response = _context7.sent;
          _context7.next = 29;
          return profitCal(response.sheetdata ? response.sheetdata : {});
        case 29:
          calculation = _context7.sent;
          dataobj['currentProfitloss'] = calculation.netProfite;
          dataobjnew['currentProfitloss'] = calculation.netProfite;
          olddata = _objectSpread({}, data);
          findyear = new Date(olddata.start_date).getFullYear();
          olddata.start_date = "1900-04-01";
          olddata.end_date = "".concat(Number(findyear), "-03-31");
          // console.log("data old", olddata)
          _context7.next = 38;
          return _ledger4["default"].findOne({
            where: {
              company_id: data.company_id,
              account_group_id: _config["default"].profit_loss_id
            }
          });
        case 38:
          findProfitLedger = _context7.sent;
          _context7.next = 41;
          return (0, _ledger5.decreption)(findProfitLedger, 'object', data.data.email);
        case 41:
          findProfitLedger = _context7.sent;
          _context7.next = 44;
          return oldprofitLoss(olddata, res);
        case 44:
          responseold = _context7.sent;
          _context7.next = 47;
          return profitCal(responseold.sheetdata ? responseold.sheetdata : {});
        case 47:
          calculationold = _context7.sent;
          debitProfiltAmount = 0;
          creditProfiltAmount = 0;
          openAmount1 = 0;
          diffrence = 0; // console.log("calculationold", calculationold)
          // console.log("calculation", calculation)
          if (!findProfitLedger) {
            _context7.next = 66;
            break;
          }
          _context7.next = 55;
          return _journalInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: findProfitLedger.dataValues.uid
            }, {
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date = {}, _defineProperty(_invoice_date, Op.gte, data.start_date), _defineProperty(_invoice_date, Op.lte, data.end_date), _invoice_date)
            }]),
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 55:
          journalVoucher = _context7.sent;
          if (!(journalVoucher.length > 0)) {
            _context7.next = 61;
            break;
          }
          _context7.next = 59;
          return (0, _journalEntries.decreptionJournalEntries)(journalVoucher, 'array', data.data.email);
        case 59:
          journalVoucher = _context7.sent;
          journalVoucher.map(function (item) {
            if (item.type == "debit") {
              debitProfiltAmount = Number(debitProfiltAmount) + Number(item.amount);
            } else {
              creditProfiltAmount = Number(creditProfiltAmount) + Number(item.amount);
            }
          });
          // return {journalVoucher}
        case 61:
          _context7.next = 63;
          return _company["default"].findOne({
            where: {
              uid: data.company_id
            }
          });
        case 63:
          findCompany = _context7.sent;
          if (findCompany && findCompany.dataValues && findCompany.dataValues.id) {
            console.log("new Date(findCompany.dataValues.bookstart_date)", new Date(findCompany.dataValues.bookstart_date), new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate() - 1)));
            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              startdate = new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate() - 1));
              if (new Date(findCompany.dataValues.bookstart_date).getTime() > new Date(startdate).getTime()) {
                console.log("calculationold.netProfite = 0; if");
                calculationold.netProfite = 0;
              } else {
                console.log("calculationold.netProfite = 0; else");
                //
              }
            } else {
              if (new Date(findCompany.dataValues.bookstart_date).getTime() > new Date(data.start_date).getTime()) {
                console.log("calculationold.netProfite = 01; if");
                calculationold.netProfite = 0;
              } else {
                console.log("calculationold.netProfite = 01; else");
                // calculationold.netProfite = 0;
              }
            }
          }

          if (findProfitLedger.dataValues.opening_balance == "credit") {
            // if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
            //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
            // }else{
            //     diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
            // }

            diffrence = Number(creditProfiltAmount) - Number(debitProfiltAmount);
            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              openAmount1 = Number(calculationold.netProfite) + Number(findProfitLedger.dataValues.amount);
            } else {
              sign = Number(calculationold.netProfite) < 0 ? '-' : "+";
              openAmount1 = Number(calculationold.netProfite);
              //(Number(calculationold.netProfite)<0?-1*Number(calculationold.netProfite):Number(calculationold.netProfite))+Number(findProfitLedger.dataValues.amount);
              // openAmount1 = sign+openAmount1; 
            }
            // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
            calculationold.netProfite = Number(calculationold.netProfite) + Number(Number(findProfitLedger.dataValues.amount) - Number(diffrence));
            // calculation.netProfite = Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
          } else {
            // if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
            //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
            // }else{
            //     diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
            // }
            diffrence = Number(debitProfiltAmount) - Number(creditProfiltAmount);
            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              openAmount1 = Number(calculationold.netProfite) + Number(findProfitLedger.dataValues.amount);
            } else {
              openAmount1 = Number(calculationold.netProfite);
            }
            calculationold.netProfite = -1 * Number(Number(calculationold.netProfite) + Number(Number(findProfitLedger.dataValues.amount) + Number(diffrence)));
            // calculation.netProfite = -1*Number(Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)+Number(diffrence)));   
          }
        case 66:
          // dataobj['oldProfitloss']  =await findProfitLedger && findProfitLedger.dataValues && findProfitLedger.dataValues.amount? Number(findProfitLedger.dataValues.amount)+Number(calculationold.netProfite) :calculationold.netProfite;

          // dataobjnew['oldProfitloss']  = await findProfitLedger && findProfitLedger.dataValues && findProfitLedger.dataValues.amount? Number(findProfitLedger.dataValues.amount)+Number(calculationold.netProfite) :calculationold.netProfite;

          console.log("calculationold.netProfite", calculationold.netProfite, openAmount1, diffrence, data);
          dataobj['currentProfitloss'] = calculation.netProfite;
          dataobjnew['currentProfitloss'] = calculation.netProfite;
          _context7.next = 71;
          return calculationold.netProfite;
        case 71:
          dataobj['oldProfitloss'] = _context7.sent;
          _context7.next = 74;
          return openAmount1;
        case 74:
          dataobjnew['oldProfitloss'] = _context7.sent;
          _context7.next = 77;
          return diffrence;
        case 77:
          dataobjnew['less'] = _context7.sent;
          if (!accountgroup) {
            _context7.next = 82;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data fetch Successfully",
            // sheetdata: accountgroup,
            // sheetdatanew: dataobj,
            sheetdatanewspace: dataobjnew
          });
        case 82:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data not Found!"
          });
        case 83:
          _context7.next = 88;
          break;
        case 85:
          _context7.prev = 85;
          _context7.t3 = _context7["catch"](0);
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t3.message,
            message: "Something went wrong!"
          });
        case 88:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 85]]);
  }));
  return function (_x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getTrailBlanceReport = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data, res) {
    var _ref9, dataobj, dataobjnew, accountgroup, traildata, i, datak, ledgerOpeningDiffrence, j, response, calculation, olddata, findyear, findProfitLedger, responseold, calculationold, debitProfiltAmount, creditProfiltAmount, openAmount1, diffrence, _invoice_date2, journalVoucher, findCompany, startdate, sign, oldAmount, closeamount, getLegder, openamount, openingStock, closeingStock, totalcopen, totaldopen, totalcredit, totaldebit, totalcclose, totaldclose, _i, _Object$entries, _Object$entries$_i, key, value, diffrenceamount, diffrencecloseamount;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          dataobj = {};
          dataobjnew = {};
          _context9.next = 5;
          return [{
            uid: _config["default"].tax_account_id,
            name: "Taxes",
            subname: "Taxes",
            ledger: []
          }, {
            uid: _config["default"].sale_account_id,
            name: "Sales Accounts",
            subname: "Sales_Accounts",
            ledger: []
          }, {
            uid: _config["default"].sundry_debtors_id,
            name: "Sundry Debtors",
            subname: "Sundry_Debtors",
            ledger: []
          }, {
            uid: _config["default"].sundry_creditors_id,
            name: "Sundry Creditors",
            subname: "Sundry_Creditors",
            ledger: []
          }, {
            uid: _config["default"].current_assets_id,
            name: "Current Assets",
            subname: "Current_Assets",
            ledger: []
          }, {
            uid: _config["default"].indirect_Expenses_id,
            name: "Indirect Expenses",
            subname: "Indirect_Expenses",
            ledger: []
          }, {
            uid: _config["default"].indirect_income_id,
            name: "Indirect Income",
            subname: "Indirect_Income",
            ledger: []
          }, {
            uid: _config["default"].direct_income_id,
            name: "Direct Income",
            subname: "Direct_Income",
            ledger: []
          },
          // {
          //     uid: Constant.profit_loss_id,
          //     name: "Profit & Loss A/c",
          //     subname: "Profit&LossAc",
          //     ledger: []
          // },
          {
            uid: _config["default"].direct_expense_id,
            name: "Direct Expenses",
            subname: "Direct_Expenses",
            ledger: []
          },
          // {
          //     uid: Constant.stockinhand_id,
          //     name: "Stock in Hand",
          //     subname: "Stock_in_Hand",
          //     ledger: []
          // },
          {
            uid: _config["default"].bankA,
            name: "Bank (A)",
            subname: "bankA",
            ledger: []
          }, {
            uid: _config["default"].bankL,
            name: "Bank (L)",
            subname: "bankL",
            ledger: []
          }, {
            uid: _config["default"]["case"],
            name: "Case",
            subname: "case",
            ledger: []
          }, {
            uid: _config["default"].PurchaseAccounts,
            name: "Purchase Accounts",
            subname: "Purchase_Accounts",
            ledger: []
          }, {
            uid: _config["default"].fixed_assets,
            name: "Fixed Assets",
            subname: "Fixed_Assets",
            ledger: []
          }, {
            uid: _config["default"].capital_account_id,
            name: "Capital Account",
            subname: "Capital_Account",
            ledger: []
          }, {
            uid: _config["default"].current_liabilities_id,
            name: "Current Liabilities",
            subname: "Current_Liabilities",
            ledger: []
          }];
        case 5:
          accountgroup = _context9.sent;
          traildata = [];
          _context9.t0 = _regeneratorRuntime().keys(accountgroup);
        case 8:
          if ((_context9.t1 = _context9.t0()).done) {
            _context9.next = 19;
            break;
          }
          i = _context9.t1.value;
          _context9.next = 12;
          return (0, _accountData.getTrailbalancfunction)('', accountgroup[i].uid, data, res);
        case 12:
          datak = _context9.sent;
          if (!(datak && datak.length > 0)) {
            _context9.next = 17;
            break;
          }
          _context9.next = 16;
          return datak;
        case 16:
          accountgroup[i].ledger = _context9.sent;
        case 17:
          _context9.next = 8;
          break;
        case 19:
          _context9.next = 21;
          return (0, _accountData.getLeaderDiffrenc)(data, res);
        case 21:
          ledgerOpeningDiffrence = _context9.sent;
          for (j in accountgroup) {
            dataobjnew[accountgroup[j].subname] = accountgroup[j].ledger;
          }
          _context9.next = 25;
          return ledgerOpeningDiffrence;
        case 25:
          dataobjnew['diffrence'] = _context9.sent;
          _context9.next = 28;
          return currentprofitLoss(data, res);
        case 28:
          response = _context9.sent;
          _context9.next = 31;
          return profitCal(response.sheetdata ? response.sheetdata : {});
        case 31:
          calculation = _context9.sent;
          dataobj['currentProfitloss'] = calculation.netProfite;
          dataobjnew['currentProfitloss'] = calculation.netProfite;
          olddata = _objectSpread({}, data);
          findyear = new Date(olddata.start_date).getFullYear();
          olddata.start_date = "1900-04-01";
          olddata.end_date = "".concat(Number(findyear), "-03-31");
          // console.log("data old", olddata)
          _context9.next = 40;
          return _ledger4["default"].findOne({
            where: {
              company_id: data.company_id,
              account_group_id: _config["default"].profit_loss_id
            }
          });
        case 40:
          findProfitLedger = _context9.sent;
          _context9.next = 43;
          return (0, _ledger5.decreption)(findProfitLedger, 'object', data.data.email);
        case 43:
          findProfitLedger = _context9.sent;
          _context9.next = 46;
          return oldprofitLoss(olddata, res);
        case 46:
          responseold = _context9.sent;
          _context9.next = 49;
          return profitCal(responseold.sheetdata ? responseold.sheetdata : {});
        case 49:
          calculationold = _context9.sent;
          debitProfiltAmount = 0;
          creditProfiltAmount = 0;
          openAmount1 = 0;
          diffrence = 0;
          if (!findProfitLedger) {
            _context9.next = 68;
            break;
          }
          _context9.next = 57;
          return _journalInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              ledger_id: findProfitLedger.dataValues.uid
            }, {
              company_id: data.company_id
            }, {
              invoice_date: (_invoice_date2 = {}, _defineProperty(_invoice_date2, Op.gte, data.start_date), _defineProperty(_invoice_date2, Op.lte, data.end_date), _invoice_date2)
            }]),
            order: [['invoice_date', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 57:
          journalVoucher = _context9.sent;
          if (!(journalVoucher.length > 0)) {
            _context9.next = 63;
            break;
          }
          _context9.next = 61;
          return (0, _journalEntries.decreptionJournalEntries)(journalVoucher, 'array', data.data.email);
        case 61:
          journalVoucher = _context9.sent;
          journalVoucher.map(function (item) {
            if (item.type == "debit") {
              debitProfiltAmount = Number(debitProfiltAmount) + Number(item.amount);
            } else {
              creditProfiltAmount = Number(creditProfiltAmount) + Number(item.amount);
            }
          });
          // return {journalVoucher}
        case 63:
          _context9.next = 65;
          return _company["default"].findOne({
            where: {
              uid: data.company_id
            }
          });
        case 65:
          findCompany = _context9.sent;
          if (findCompany && findCompany.dataValues && findCompany.dataValues.id) {
            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              startdate = new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate() - 1));
              if (new Date(findCompany.dataValues.bookstart_date).getTime() > new Date(startdate).getTime()) {
                // console.log("calculationold.netProfite = 0; if")
                calculationold.netProfite = 0;
              } else {
                // console.log("calculationold.netProfite = 0; else")
                //
              }
            } else {
              if (new Date(findCompany.dataValues.bookstart_date).getTime() > new Date(data.start_date).getTime()) {
                // console.log("calculationold.netProfite = 01; if")
                calculationold.netProfite = 0;
              } else {
                // console.log("calculationold.netProfite = 01; else")
                // calculationold.netProfite = 0;
              }
            }
          }
          if (findProfitLedger.dataValues.opening_balance == "credit") {
            if (Number(creditProfiltAmount) > Number(debitProfiltAmount)) {
              diffrence = Number(creditProfiltAmount) - Number(debitProfiltAmount);
            } else {
              diffrence = Number(debitProfiltAmount) - Number(creditProfiltAmount);
            }
            // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);

            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              openAmount1 = Number(calculationold.netProfite) + Number(findProfitLedger.dataValues.amount);
            } else {
              sign = Number(calculationold.netProfite) < 0 ? '-' : "+";
              openAmount1 = Number(calculationold.netProfite);
              //(Number(calculationold.netProfite)<0?-1*Number(calculationold.netProfite):Number(calculationold.netProfite))+Number(findProfitLedger.dataValues.amount);
              // openAmount1 = sign+openAmount1; 
            }

            calculationold.netProfite = Number(calculationold.netProfite) + Number(Number(findProfitLedger.dataValues.amount) - Number(diffrence));
            calculation.netProfite = Number(calculation.netProfite) + Number(Number(findProfitLedger.dataValues.amount) - Number(diffrence));
          } else {
            if (Number(creditProfiltAmount) > Number(debitProfiltAmount)) {
              diffrence = Number(creditProfiltAmount) - Number(debitProfiltAmount);
            } else {
              diffrence = Number(debitProfiltAmount) - Number(creditProfiltAmount);
            }
            // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
            if (new Date(findCompany.dataValues.bookstart_date).getFullYear() == new Date(data.start_date).getFullYear()) {
              openAmount1 = Number(calculationold.netProfite) + Number(findProfitLedger.dataValues.amount);
            } else {
              openAmount1 = Number(calculationold.netProfite);
            }
            calculationold.netProfite = -1 * Number(Number(calculationold.netProfite) + Number(Number(findProfitLedger.dataValues.amount) + Number(diffrence)));
            calculation.netProfite = -1 * Number(Number(calculation.netProfite) + Number(Number(findProfitLedger.dataValues.amount) + Number(diffrence)));
          }
        case 68:
          oldAmount = Number(Number(openAmount1) >= 0 ? Number(openAmount1) : -1 * Number(openAmount1));
          closeamount = Number(oldAmount) + Number(Number(creditProfiltAmount) - Number(Number(debitProfiltAmount)));
          dataobjnew['Profit_Loss'] = [{
            account_group_id: _config["default"].profit_loss_id,
            // closeing_amount: calculation.netProfite>=0?Number(calculation.netProfite): -1*Number(calculation.netProfite),
            closeing_amount: closeamount,
            accounttype: Number(closeamount) >= 0 ? 'credit' : 'debit',
            creditAmount: creditProfiltAmount,
            debitAmount: debitProfiltAmount,
            ishead: true,
            ismain: true,
            name: "Profit & Loss A/C",
            open_amount: openAmount1 >= 0 ? Number(openAmount1) : -1 * Number(openAmount1),
            open_type: openAmount1 >= 0 ? 'credit' : 'debit',
            subAccount: {},
            sub_uid: ""
          }];
          _context9.next = 73;
          return _ledger4["default"].findOne({
            where: {
              company_id: data.company_id,
              account_group_id: _config["default"].stockinhand_id
            }
          });
        case 73:
          getLegder = _context9.sent;
          openamount = {
            type: 'debit',
            amount: 0
          };
          if (!getLegder) {
            _context9.next = 80;
            break;
          }
          _context9.next = 78;
          return (0, _ledger5.decreption)(getLegder, 'object', data.data.email);
        case 78:
          getLegder = _context9.sent;
          openamount = {
            type: getLegder.opening_balance,
            amount: getLegder.amount
          };
        case 80:
          _context9.next = 82;
          return getopeingbalanceStockcalculation(data, res);
        case 82:
          openingStock = _context9.sent;
          //await getopeingbalancecalculation(data, res);
          if (openamount.type == "debit") {
            openingStock = Number(openingStock) == 0 ? Number(openingStock) + Number(openamount.amount) : Number(openamount.amount);
          } else {
            openingStock = Number(openingStock) == 0 ? Number(openingStock) - Number(openamount.amount) : Number(openamount.amount);
          }
          _context9.next = 86;
          return getcloasingbalanceStockcalculation(data, openingStock, res);
        case 86:
          closeingStock = _context9.sent;
          //getcloasingbalancecalculation(data, res);
          console.log("openingStock", openingStock, closeingStock);
          if (closeingStock == 0) {
            closeingStock = openingStock;
          }
          dataobjnew['Stock_in_Hand'] = [{
            account_group_id: _config["default"].stockinhand_id,
            accounttype: Number(closeingStock) == 0 ? 'debit' : Number(closeingStock) < 0 ? 'credit' : 'debit',
            closeing_amount: Number(closeingStock) < 0 ? -1 * Number(closeingStock) : closeingStock,
            creditAmount: 0,
            debitAmount: 0,
            ishead: true,
            ismain: true,
            name: "Opening Stock",
            open_amount: Number(openingStock) < 0 ? -1 * Number(openingStock) : openingStock,
            open_type: Number(openingStock) == 0 ? 'debit' : Number(openingStock) < 0 ? 'credit' : 'debit',
            subAccount: {},
            sub_uid: ""
          }];

          // console.log("await ledgerOpeningDiffrence", await ledgerOpeningDiffrence)
          //    let diffrenceLedger =  await ledgerOpeningDiffrence;

          // dataobjnew['ledgerdiffrence'] = [{
          //     account_group_id:'',
          //     accounttype:Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?'debit':'credit',
          //     closeing_amount: Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?-1*Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)):Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)),
          //     creditAmount: 0,
          //     debitAmount: 0,
          //     ishead: true,
          //     ismain: true,
          //     name: "Difference in opening balances",
          //     open_amount: Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?-1*Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)):Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)),
          //     open_type:Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?'debit':'credit',
          //     creditAmount: 0,
          //     subAccount: {},
          //     sub_uid: ""
          // }];
          totalcopen = 0;
          totaldopen = 0;
          totalcredit = 0;
          totaldebit = 0;
          totalcclose = 0;
          totaldclose = 0;
          for (_i = 0, _Object$entries = Object.entries(dataobjnew); _i < _Object$entries.length; _i++) {
            _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
            if (value.length > 0) {
              value.forEach( /*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(item) {
                  return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        if (item.ishead && item.ismain) {
                          // console.log("come")
                          if (item.open_type == "credit") {
                            if (item.open_amount < 0) {
                              item.open_amount = -1 * Number(item.open_amount);
                            }
                            totalcopen = Number(totalcopen) + Number(item.open_amount);
                          } else {
                            if (item.open_amount < 0) {
                              item.open_amount = -1 * Number(item.open_amount);
                            }
                            totaldopen = Number(totaldopen) + Number(item.open_amount);
                          }
                          if (item.accounttype == "credit") {
                            if (item.closeing_amount < 0) {
                              item.closeing_amount = -1 * Number(item.closeing_amount);
                            }
                            totalcclose = Number(totalcclose) + Number(item.closeing_amount);
                          } else {
                            // console.log(item.closeing_amount)
                            if (item.closeing_amount < 0) {
                              item.closeing_amount = -1 * Number(item.closeing_amount);
                            }
                            totaldclose = Number(totaldclose) + Number(item.closeing_amount);
                          }
                          totalcredit = Number(totalcredit) + Number(item.creditAmount);
                          totaldebit = Number(totaldebit) + Number(item.debitAmount);
                        }
                        // if(item.issub){
                        //     let findmainGroup = await value.find(el=> el.ishead && el.ismain);
                        //     if(findmainGroup){
                        //         findmainGroup.open_amount = Number(findmainGroup.open_amount)+(Number(item.open_amount));
                        //         findmainGroup.creditAmount = Number(findmainGroup.creditAmount)+Number(item.creditAmount);
                        //         findmainGroup.debitAmount = Number(findmainGroup.debitAmount)+Number(item.debitAmount);
                        //         findmainGroup.closeing_amount = Number(findmainGroup.closeing_amount)+Number(item.closeing_amount);
                        //     }
                        // }
                      case 1:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee7);
                }));
                return function (_x16) {
                  return _ref8.apply(this, arguments);
                };
              }());
            }
          }
          _context9.next = 99;
          return Number(totalcopen);
        case 99:
          _context9.t2 = _context9.sent;
          _context9.t3 = Number(totaldopen);
          diffrenceamount = _context9.t2 - _context9.t3;
          _context9.next = 104;
          return Number(Number(totalcclose) - Number(totaldclose));
        case 104:
          diffrencecloseamount = _context9.sent;
          dataobjnew['ledgerdiffrence'] = [(_ref9 = {
            account_group_id: '',
            accounttype: Number(diffrencecloseamount) < 0 ? 'credit' : 'debit',
            closeing_amount: diffrencecloseamount < 0 ? -1 * diffrencecloseamount : diffrencecloseamount,
            creditAmount: 0,
            debitAmount: 0,
            ishead: true,
            ismain: true,
            name: "Difference in opening balances",
            open_amount: diffrenceamount < 0 ? -1 * diffrenceamount : diffrenceamount,
            open_type: Number(diffrenceamount) < 0 ? 'credit' : 'debit'
          }, _defineProperty(_ref9, "creditAmount", 0), _defineProperty(_ref9, "subAccount", {}), _defineProperty(_ref9, "sub_uid", ""), _ref9)];
          _context9.next = 108;
          return totalcopen;
        case 108:
          dataobjnew['totalcopen'] = _context9.sent;
          _context9.next = 111;
          return totaldopen;
        case 111:
          dataobjnew['totaldopen'] = _context9.sent;
          _context9.next = 114;
          return Number(diffrenceamount);
        case 114:
          _context9.t4 = _context9.sent;
          _context9.t5 = Number(Number(totalcopen) - Number(totaldopen));
          dataobjnew['totalopen'] = _context9.t4 - _context9.t5;
          _context9.next = 119;
          return totalcredit;
        case 119:
          dataobjnew['totalcredit'] = _context9.sent;
          _context9.next = 122;
          return totaldebit;
        case 122:
          dataobjnew['totaldebit'] = _context9.sent;
          _context9.next = 125;
          return Number(totalcclose);
        case 125:
          dataobjnew['totalcclose'] = _context9.sent;
          _context9.next = 128;
          return Number(totaldclose);
        case 128:
          dataobjnew['totaldclose'] = _context9.sent;
          _context9.next = 131;
          return Number(diffrencecloseamount);
        case 131:
          _context9.t6 = _context9.sent;
          _context9.t7 = Number(Number(totalcclose) - Number(totaldclose));
          dataobjnew['totalclose'] = _context9.t6 - _context9.t7;
          _context9.next = 136;
          return Number(Number(totalcclose) - Number(totaldclose));
        case 136:
          dataobjnew['totalwithoutclose'] = _context9.sent;
          if (!accountgroup) {
            _context9.next = 141;
            break;
          }
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data fetch Successfully",
            data: dataobjnew
          });
        case 141:
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Data not Found!"
          });
        case 142:
          _context9.next = 148;
          break;
        case 144:
          _context9.prev = 144;
          _context9.t8 = _context9["catch"](0);
          console.log(_context9.t8);
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context9.t8.message,
            message: "Something went wrong!"
          });
        case 148:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[0, 144]]);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
function getPurchaceAccountcalculaton(_x17, _x18, _x19) {
  return _getPurchaceAccountcalculaton.apply(this, arguments);
}
function _getPurchaceAccountcalculaton() {
  _getPurchaceAccountcalculaton = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(accountGroupId, data, res) {
    var _invoice_date3, _invoice_date4, findPurchaseItems, findDebitItems, mainArray, group, returnData, _i2, _Object$entries2, _Object$entries2$_i, key, value, amount;
    return _regeneratorRuntime().wrap(function _callee12$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _itemInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              type: 'Purchase'
            }, {
              invoice_date: (_invoice_date3 = {}, _defineProperty(_invoice_date3, Op.gte, data.start_date), _defineProperty(_invoice_date3, Op.lte, data.end_date), _invoice_date3)
            }]),
            include: [{
              model: _items["default"],
              as: "itemone"
            }, {
              model: _ledger4["default"],
              as: "ledgerone"
            }]
          });
        case 3:
          findPurchaseItems = _context13.sent;
          _context13.next = 6;
          return _itemInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              type: 'Credit'
            }, {
              invoice_date: (_invoice_date4 = {}, _defineProperty(_invoice_date4, Op.gte, data.start_date), _defineProperty(_invoice_date4, Op.lte, data.end_date), _invoice_date4)
            }]),
            include: [{
              model: _items["default"],
              as: "itemone"
            }, {
              model: _ledger4["default"],
              as: "ledgerone"
            }]
          });
        case 6:
          findDebitItems = _context13.sent;
          mainArray = [];
          _context13.next = 10;
          return (0, _itemEntries.decreptionItem)(findPurchaseItems, "array", data.data.email);
        case 10:
          findPurchaseItems = _context13.sent;
          _context13.next = 13;
          return (0, _itemEntries.decreptionItem)(findDebitItems, "array", data.data.email);
        case 13:
          findDebitItems = _context13.sent;
          if (findPurchaseItems.length > 0) {
            findPurchaseItems.map(function (item) {
              var data = {
                buyer_ledger_id: item.ledger_id,
                isgst: item.igst_tax,
                is_return: 0,
                ledgerdata: item.ledgerone,
                quantity: item.quantity ? item.quantity : 0,
                total_amount: Number(item.total_amount),
                invoice_date: item.invoice_date,
                name: item.ledgerone && item.ledgerone.name ? item.ledgerone.name : ''
              };
              mainArray.push(data);
            });
          }
          if (findDebitItems.length > 0) {
            findDebitItems.map(function (item) {
              var data = {
                buyer_ledger_id: item.ledger_id,
                isgst: item.igst_tax,
                is_return: 1,
                quantity: item.quantity ? item.quantity : 0,
                total_amount: Number(item.total_amount),
                ledgerdata: item.ledgerone,
                invoice_date: item.invoice_date,
                name: item.ledgerone && item.ledgerone.name ? item.ledgerone.name : ''
              };
              mainArray.push(data);
            });
          }
          group = mainArray.reduce(function (r, a) {
            r[a.name] = [].concat(_toConsumableArray(r[a.name] || []), [a]);
            return r;
          }, {});
          returnData = [];
          _i2 = 0, _Object$entries2 = Object.entries(group);
        case 19:
          if (!(_i2 < _Object$entries2.length)) {
            _context13.next = 42;
            break;
          }
          _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
          _context13.next = 23;
          return value.map(function (calAmount) {
            return Number(calAmount.total_amount);
          });
        case 23:
          amount = _context13.sent;
          _context13.t0 = returnData;
          _context13.t1 = value[0].buyer_ledger_id;
          _context13.t2 = value[0].igst_tax;
          _context13.t3 = value[0].is_return;
          _context13.t4 = value[0].is_local;
          _context13.t5 = value[0].ledgerone ? value[0].ledgerone : {};
          _context13.next = 32;
          return Number(Number(amount.reduce(function (a, b) {
            return Number(a) + Number(b);
          }, 0)).toFixed(2));
        case 32:
          _context13.t6 = _context13.sent;
          _context13.t7 = Number(value[0].ledgerdata.amount);
          _context13.t8 = _context13.t6 + _context13.t7;
          _context13.t9 = value[0].invoice_date;
          _context13.t10 = key;
          _context13.t11 = {
            buyer_ledger_id: _context13.t1,
            isgst: _context13.t2,
            is_return: _context13.t3,
            is_local: _context13.t4,
            ledgerdata: _context13.t5,
            total_amount: _context13.t8,
            invoice_date: _context13.t9,
            name: _context13.t10
          };
          _context13.t0.push.call(_context13.t0, _context13.t11);
        case 39:
          _i2++;
          _context13.next = 19;
          break;
        case 42:
          return _context13.abrupt("return", returnData);
        case 45:
          _context13.prev = 45;
          _context13.t12 = _context13["catch"](0);
          return _context13.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context13.t12.message,
            message: "Something went wrong-->!"
          });
        case 48:
        case "end":
          return _context13.stop();
      }
    }, _callee12, null, [[0, 45]]);
  }));
  return _getPurchaceAccountcalculaton.apply(this, arguments);
}
function getSaleAccountcalculaton(_x20, _x21, _x22) {
  return _getSaleAccountcalculaton.apply(this, arguments);
}
function _getSaleAccountcalculaton() {
  _getSaleAccountcalculaton = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(accountGroupId, data, res) {
    var _invoice_date5, _invoice_date6, findSalesItems, findCreditItems, mainArray, group, returnData, _i3, _Object$entries3, _Object$entries3$_i, key, value, amount;
    return _regeneratorRuntime().wrap(function _callee13$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _itemInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              type: 'Sales'
            }, {
              invoice_date: (_invoice_date5 = {}, _defineProperty(_invoice_date5, Op.gte, data.start_date), _defineProperty(_invoice_date5, Op.lte, data.end_date), _invoice_date5)
            }]),
            include: [{
              model: _items["default"],
              as: "itemone"
            }, {
              model: _ledger4["default"],
              as: "ledgerone"
            }]
          });
        case 3:
          findSalesItems = _context14.sent;
          _context14.next = 6;
          return _itemInteries["default"].findAll({
            where: _defineProperty({}, Op.and, [{
              company_id: data.company_id
            }, {
              type: 'Debit'
            }, {
              invoice_date: (_invoice_date6 = {}, _defineProperty(_invoice_date6, Op.gte, data.start_date), _defineProperty(_invoice_date6, Op.lte, data.end_date), _invoice_date6)
            }]),
            include: [{
              model: _items["default"],
              as: "itemone"
            }, {
              model: _ledger4["default"],
              as: "ledgerone"
            }]
          });
        case 6:
          findCreditItems = _context14.sent;
          mainArray = [];
          _context14.next = 10;
          return (0, _itemEntries.decreptionItem)(findSalesItems, "array", data.data.email);
        case 10:
          findSalesItems = _context14.sent;
          _context14.next = 13;
          return (0, _itemEntries.decreptionItem)(findCreditItems, "array", data.data.email);
        case 13:
          findCreditItems = _context14.sent;
          // return {findSalesItems:findSalesItems, findCreditItems:findCreditItems}
          if (findSalesItems.length > 0) {
            findSalesItems.map(function (item) {
              var data = {
                buyer_ledger_id: item.ledger_id,
                isgst: item.igst_tax,
                is_return: 0,
                quantity: item.quantity ? item.quantity : 0,
                total_amount: Number(item.total_amount),
                invoice_date: item.invoice_date,
                ledgerdata: item.ledgerone,
                name: item.ledgerone && item.ledgerone.name ? item.ledgerone.name : ''
              };
              mainArray.push(data);
            });
          }
          if (findCreditItems.length > 0) {
            findCreditItems.map(function (item) {
              var data = {
                buyer_ledger_id: item.ledger_id,
                isgst: item.igst_tax,
                is_return: 1,
                quantity: item.quantity ? item.quantity : 0,
                total_amount: Number(item.total_amount),
                ledgerdata: item.ledgerone,
                invoice_date: item.invoice_date,
                name: item.ledgerone && item.ledgerone.name ? item.ledgerone.name : ''
              };
              mainArray.push(data);
            });
          }
          group = mainArray.reduce(function (r, a) {
            r[a.name] = [].concat(_toConsumableArray(r[a.name] || []), [a]);
            return r;
          }, {});
          returnData = [];
          _i3 = 0, _Object$entries3 = Object.entries(group);
        case 19:
          if (!(_i3 < _Object$entries3.length)) {
            _context14.next = 41;
            break;
          }
          _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), key = _Object$entries3$_i[0], value = _Object$entries3$_i[1];
          _context14.next = 23;
          return value.map(function (calAmount) {
            return Number(calAmount.total_amount);
          });
        case 23:
          amount = _context14.sent;
          _context14.t0 = returnData;
          _context14.t1 = value[0].buyer_ledger_id;
          _context14.t2 = value[0].igst_tax;
          _context14.t3 = value[0].is_return;
          _context14.t4 = value[0].is_local;
          _context14.next = 31;
          return Number(Number(amount.reduce(function (a, b) {
            return Number(a) + Number(b);
          }, 0)).toFixed(2));
        case 31:
          _context14.t5 = _context14.sent;
          _context14.t6 = Number(value[0].ledgerdata.amount);
          _context14.t7 = _context14.t5 + _context14.t6;
          _context14.t8 = value[0].invoice_date;
          _context14.t9 = key;
          _context14.t10 = {
            buyer_ledger_id: _context14.t1,
            isgst: _context14.t2,
            is_return: _context14.t3,
            is_local: _context14.t4,
            total_amount: _context14.t7,
            invoice_date: _context14.t8,
            name: _context14.t9
          };
          _context14.t0.push.call(_context14.t0, _context14.t10);
        case 38:
          _i3++;
          _context14.next = 19;
          break;
        case 41:
          return _context14.abrupt("return", returnData);
        case 44:
          _context14.prev = 44;
          _context14.t11 = _context14["catch"](0);
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context14.t11.message,
            message: "Something went wrong-->!"
          });
        case 47:
        case "end":
          return _context14.stop();
      }
    }, _callee13, null, [[0, 44]]);
  }));
  return _getSaleAccountcalculaton.apply(this, arguments);
}
function getopeingbalanceStockcalculation(_x23, _x24) {
  return _getopeingbalanceStockcalculation.apply(this, arguments);
}
function _getopeingbalanceStockcalculation() {
  _getopeingbalanceStockcalculation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, res) {
    var totalvalue, getCompanydetail, ledgerData, ledger, currentYeardata, findOldAmountdiffrence;
    return _regeneratorRuntime().wrap(function _callee14$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          totalvalue = 0;
          _context15.next = 4;
          return _database.sequelize.query("SELECT * FROM companies WHERE uid='".concat(data.company_id, "'"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 4:
          getCompanydetail = _context15.sent;
          if (!getCompanydetail) {
            _context15.next = 31;
            break;
          }
          if (!(getCompanydetail[0].manualstock_closing === "Yes")) {
            _context15.next = 20;
            break;
          }
          _context15.next = 9;
          return _ledger4["default"].findOne({
            where: {
              account_group_id: _config["default"].stockinhand_id,
              company_id: data.company_id
            }
          });
        case 9:
          ledgerData = _context15.sent;
          if (!ledgerData) {
            _context15.next = 17;
            break;
          }
          _context15.next = 13;
          return (0, _ledger5.decreption)(ledgerData, "object", data.data.email);
        case 13:
          ledgerData = _context15.sent;
          totalvalue = ledgerData.dataValues.opening_balance == "credit" ? -1 * Number(ledgerData.dataValues.amount) : Number(ledgerData.dataValues.amount);
          _context15.next = 18;
          break;
        case 17:
          totalvalue = 0;
        case 18:
          _context15.next = 31;
          break;
        case 20:
          _context15.next = 22;
          return _ledger4["default"].findOne({
            where: {
              account_group_id: _config["default"].stockinhand_id,
              company_id: data.company_id
            }
          });
        case 22:
          ledger = _context15.sent;
          _context15.next = 25;
          return (0, _ledger5.decreption)(ledger, 'object', data.data.email);
        case 25:
          ledger = _context15.sent;
          _context15.next = 28;
          return (0, _accountData.getOldYearData)(data, res);
        case 28:
          currentYeardata = _context15.sent;
          if (ledger) {
            if (currentYeardata.finalAmount == 0) {
              if (ledger.dataValues.opening_balance == "credit") {
                currentYeardata.finalAmount = Number(currentYeardata.finalAmount) - Number(ledger.dataValues.amount);
              } else {
                currentYeardata.finalAmount = Number(currentYeardata.finalAmount) + Number(ledger.dataValues.amount);
              }
            } else {
              findOldAmountdiffrence = 0;
              if (Number(currentYeardata.finalAmount) >= Number(ledger.dataValues.amount)) {
                findOldAmountdiffrence = Number(currentYeardata.finalAmount) - Number(ledger.dataValues.amount);
              } else {
                findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.finalAmount);
              }
              if (ledger.dataValues.opening_balance == "credit") {
                currentYeardata.finalAmount = Number(currentYeardata.finalAmount) - Number(findOldAmountdiffrencet);
              } else {
                currentYeardata.finalAmount = Number(currentYeardata.finalAmount) + Number(findOldAmountdiffrence);
              }
            }
          }
          return _context15.abrupt("return", currentYeardata.finalAmount ? currentYeardata.finalAmount : 0);
        case 31:
          return _context15.abrupt("return", totalvalue);
        case 34:
          _context15.prev = 34;
          _context15.t0 = _context15["catch"](0);
          return _context15.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context15.t0.message,
            message: "Something went wrong-->!"
          });
        case 37:
        case "end":
          return _context15.stop();
      }
    }, _callee14, null, [[0, 34]]);
  }));
  return _getopeingbalanceStockcalculation.apply(this, arguments);
}
function getcloasingbalanceStockcalculation(_x25, _x26, _x27) {
  return _getcloasingbalanceStockcalculation.apply(this, arguments);
}
function _getcloasingbalanceStockcalculation() {
  _getcloasingbalanceStockcalculation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data, openstock, res) {
    var totalvalue, getCompanydetail, getdata, response, ledger, finalAmount, oldPrice, currentYeardata, findOldAmountdiffrence, amountledger;
    return _regeneratorRuntime().wrap(function _callee15$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          totalvalue = 0;
          _context16.next = 4;
          return _database.sequelize.query("SELECT * FROM companies WHERE uid='".concat(data.company_id, "'"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 4:
          getCompanydetail = _context16.sent;
          if (!getCompanydetail) {
            _context16.next = 38;
            break;
          }
          if (!(getCompanydetail[0].manualstock_closing === "Yes")) {
            _context16.next = 17;
            break;
          }
          _context16.next = 9;
          return _database.sequelize.query("SELECT * FROM maual_closingstock WHERE (closingdate BETWEEN '".concat(data.start_date, "' and '").concat(data.end_date, "') and company_id='").concat(data.company_id, "' order by closingdate DESC limit 1"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 9:
          getdata = _context16.sent;
          if (!(getdata.length > 0)) {
            _context16.next = 15;
            break;
          }
          _context16.next = 13;
          return (0, _manualClosingStock.decreptionmnualstock)(getdata, "array", data.data.email);
        case 13:
          response = _context16.sent;
          totalvalue = Number(response[0].stockvalue);
        case 15:
          _context16.next = 38;
          break;
        case 17:
          _context16.next = 19;
          return _ledger4["default"].findOne({
            where: {
              account_group_id: _config["default"].stockinhand_id,
              company_id: data.company_id
            }
          });
        case 19:
          ledger = _context16.sent;
          _context16.next = 22;
          return (0, _ledger5.decreption)(ledger, 'object', data.data.email);
        case 22:
          ledger = _context16.sent;
          _context16.next = 25;
          return (0, _accountData.getOldYearData)(data, res);
        case 25:
          finalAmount = _context16.sent;
          _context16.next = 28;
          return (0, _accountData.getOldPriceCurrentItem)(data, res);
        case 28:
          oldPrice = _context16.sent;
          _context16.next = 31;
          return (0, _accountData.getCurrentYearData)(data, res, finalAmount.finalAmountqty ? finalAmount.finalAmountqty : 0, oldPrice);
        case 31:
          currentYeardata = _context16.sent;
          if (ledger) {
            if (currentYeardata == 0) {
              if (ledger.dataValues.opening_balance == "credit") {
                currentYeardata.closeStockAmount = Number(ledger.dataValues.amount);
              } else {
                currentYeardata.closeStockAmount = -1 * Number(ledger.dataValues.amount);
              }
            } else {
              findOldAmountdiffrence = 0;
              if (Number(currentYeardata) >= Number(ledger.dataValues.amount)) {
                findOldAmountdiffrence = Number(currentYeardata.returnAmount) - Number(ledger.dataValues.amount);
              } else {
                findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.returnAmount);
              }
              if (ledger.dataValues.opening_balance == "credit") {
                currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount) - Number(findOldAmountdiffrencet);
              } else {
                currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount) + Number(findOldAmountdiffrence);
              }
            }
          }
          return _context16.abrupt("return", currentYeardata.closeStockAmount);
        case 36:
          amountledger = _context16.sent;
          return _context16.abrupt("return", Number(currentYeardata));
        case 38:
          return _context16.abrupt("return", totalvalue);
        case 41:
          _context16.prev = 41;
          _context16.t0 = _context16["catch"](0);
          return _context16.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context16.t0.message,
            message: "Something went wrong-->!"
          });
        case 44:
        case "end":
          return _context16.stop();
      }
    }, _callee15, null, [[0, 41]]);
  }));
  return _getcloasingbalanceStockcalculation.apply(this, arguments);
}