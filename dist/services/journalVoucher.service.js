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
var _item_stock_voucher_entries = _interopRequireDefault(require("../models/item_stock_voucher_entries"));
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _recieptVoucher = _interopRequireDefault(require("../models/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _subAccountGroup = _interopRequireDefault(require("../models/subAccountGroup"));
var _states = _interopRequireDefault(require("../models/states"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _database = require("../database/database");
var _config = _interopRequireDefault(require("../constant/config"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _itemEntries = require("../security/itemEntries");
var _uniqid = _interopRequireDefault(require("uniqid"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _entry = _interopRequireDefault(require("../utility/entry"));
var _purpose = _interopRequireDefault(require("../models/purpose"));
var _arraySort = _interopRequireDefault(require("array-sort"));
var _journalvoucher = require("../security/journalvoucher");
var _journalEntries = require("../security/journalEntries");
require("@babel/polyfill");
var _itemStockVoucher = _interopRequireDefault(require("../models/itemStockVoucher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
function addItemInteries(_x, _x2, _x3, _x4) {
  return _addItemInteries.apply(this, arguments);
}
function _addItemInteries() {
  _addItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(array, data, key, trans) {
    var items, mainArray, i, body, encrypted, itemInteries;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          items = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < items.length)) {
            _context17.next = 35;
            break;
          }
          _context17.next = 6;
          return (0, _uniqid["default"])();
        case 6:
          _context17.t0 = _context17.sent;
          _context17.t1 = items[i].type;
          _context17.t2 = data.dataValues.uid;
          _context17.t3 = items[i].ledger_id;
          _context17.t4 = data.dataValues.invoice_date;
          _context17.t5 = data.dataValues.company_id;
          _context17.t6 = items[i].amount ? items[i].amount.toString() : '0';
          _context17.t7 = new Date();
          _context17.t8 = new Date();
          _context17.t9 = {
            email: key
          };
          _context17.next = 18;
          return {
            uid: _context17.t0,
            type: _context17.t1,
            journa_voucher_id: _context17.t2,
            ledger_id: _context17.t3,
            invoice_date: _context17.t4,
            company_id: _context17.t5,
            amount: _context17.t6,
            creation_date: _context17.t7,
            updated_date: _context17.t8,
            data: _context17.t9
          };
        case 18:
          body = _context17.sent;
          _context17.next = 21;
          return (0, _journalEntries.encreptionJournalEntries)(body);
        case 21:
          encrypted = _context17.sent;
          mainArray.push(encrypted);
          if (!(i === items.length - 1)) {
            _context17.next = 32;
            break;
          }
          _context17.next = 26;
          return _journalInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 26:
          itemInteries = _context17.sent;
          if (!itemInteries) {
            _context17.next = 31;
            break;
          }
          return _context17.abrupt("return", "true");
        case 31:
          return _context17.abrupt("return", "false");
        case 32:
          i++;
          _context17.next = 3;
          break;
        case 35:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _addItemInteries.apply(this, arguments);
}
function addStockItemInteries(_x5, _x6, _x7, _x8) {
  return _addStockItemInteries.apply(this, arguments);
}
function _addStockItemInteries() {
  _addStockItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(array, data, key, trans) {
    var items, mainArray, i, body, encypted, itemInteries;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          items = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < items.length)) {
            _context18.next = 42;
            break;
          }
          _context18.next = 6;
          return (0, _uniqid["default"])();
        case 6:
          _context18.t0 = _context18.sent;
          _context18.t1 = data.dataValues.uid;
          _context18.t2 = data.dataValues.company_id;
          _context18.t3 = items[i].item_id;
          _context18.t4 = items[i].quantity;
          _context18.t5 = items[i].name;
          _context18.t6 = items[i].description;
          _context18.t7 = items[i].hsn_code;
          _context18.t8 = items[i].unit;
          _context18.t9 = items[i].price.toString();
          _context18.t10 = items[i].discount.toString();
          _context18.t11 = items[i].discount_type;
          _context18.t12 = items[i].total_amount.toString();
          _context18.t13 = items[i].igst_tax;
          _context18.t14 = items[i].type;
          _context18.t15 = data.dataValues.invoice_date;
          _context18.t16 = new Date();
          _context18.t17 = new Date();
          _context18.t18 = {
            email: key
          };
          body = {
            uid: _context18.t0,
            voucher_id: _context18.t1,
            company_id: _context18.t2,
            item_id: _context18.t3,
            quantity: _context18.t4,
            name: _context18.t5,
            description: _context18.t6,
            model: "",
            hsn_code: _context18.t7,
            unit: _context18.t8,
            price: _context18.t9,
            discount: _context18.t10,
            discount_type: _context18.t11,
            total_amount: _context18.t12,
            igst_tax: _context18.t13,
            type: _context18.t14,
            invoice_date: _context18.t15,
            status: 1,
            creation_date: _context18.t16,
            updated_date: _context18.t17,
            data: _context18.t18
          };
          _context18.next = 28;
          return (0, _itemEntries.encreptionItem)(body);
        case 28:
          encypted = _context18.sent;
          mainArray.push(encypted);
          if (!(i === items.length - 1)) {
            _context18.next = 39;
            break;
          }
          _context18.next = 33;
          return _item_stock_voucher_entries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 33:
          itemInteries = _context18.sent;
          if (!itemInteries) {
            _context18.next = 38;
            break;
          }
          return _context18.abrupt("return", "true");
        case 38:
          return _context18.abrupt("return", "false");
        case 39:
          i++;
          _context18.next = 3;
          break;
        case 42:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return _addStockItemInteries.apply(this, arguments);
}
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _journalVoucher["default"].findOne({
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
              model: _purpose["default"],
              required: false
            }, {
              model: _journalInteries["default"],
              required: false,
              include: [{
                model: _ledger["default"],
                as: "VoucherLedger",
                attributes: ["uid", "name", "opening_balance", "amount", "tax_key", "sale_key", "account_holder_name", "bank_account_number", "bank_branch", "bank_name"]
              }]
            }]
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 12;
            break;
          }
          _context.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
        case 7:
          response = _context.sent;
          response.dataValues.invoice_id = response.dataValues.invoice_id <= 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/00").concat(response.dataValues.invoice_id) : response.dataValues.invoice_id > 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/0").concat(response.dataValues.invoice_id) : "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/").concat(response.dataValues.invoice_id);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher fetch Successfully",
            JournalVoucher: response
          });
        case 12:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher not Found!",
            JournalVoucher: createdata ? createdata : {}
          });
        case 13:
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
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
    }, _callee, null, [[0, 15]]);
  }));
  return function (_x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();
exports.getSingleDatastockentry = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _itemStockVoucher["default"].findOne({
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
              as: 'Ledger',
              attributes: ['uid', 'name', 'opening_balance', 'amount', 'tax_key', 'sale_key', 'account_holder_name', 'bank_account_number', 'bank_branch', 'bank_name'],
              include: [{
                model: _cities["default"],
                attributes: ['name'],
                include: [{
                  model: _states["default"],
                  attributes: ['name']
                }]
              }, {
                model: _subAccountGroup["default"],
                attributes: ['uid', 'name']
              }, {
                model: _accountGroup["default"],
                attributes: ['uid', 'name']
              }]
            }, {
              model: _item_stock_voucher_entries["default"],
              required: false
              // where: {
              //     type: 'Sales'
              // }
            }]
          });
        case 3:
          createdata = _context2.sent;
          if (!createdata) {
            _context2.next = 12;
            break;
          }
          _context2.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
        case 7:
          response = _context2.sent;
          response.dataValues.invoice_id = response.dataValues.invoice_id <= 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/00").concat(response.dataValues.invoice_id) : response.dataValues.invoice_id > 9 ? "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/0").concat(response.dataValues.invoice_id) : "".concat(response.dataValues.current_year.toString().substr(-2) + "-" + response.dataValues.end_year.toString().substr(-2), "/").concat(response.dataValues.invoice_id);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher fetch Successfully",
            JournalVoucher: response
          });
        case 12:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher not Found!",
            JournalVoucher: createdata ? createdata : {}
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
  return function (_x12, _x13, _x14) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getLastData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _journalVoucher["default"].findOne({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            order: [['invoice_date', 'DESC']]
          });
        case 3:
          createdata = _context3.sent;
          if (!createdata) {
            _context3.next = 11;
            break;
          }
          _context3.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
        case 7:
          response = _context3.sent;
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher fetch Successfully",
            JournalVoucher: response
          });
        case 11:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher not Found!",
            JournalVoucher: createdata ? createdata : {}
          });
        case 12:
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t0,
            message: "Something went wrong!"
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function (_x15, _x16) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _journalVoucher["default"].findAll({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ["company_name", "uid", "gst_number", "terms", "financial_year", "cin_number", "company_pan_number"]
            }, {
              model: _purpose["default"]
            }, {
              model: _journalInteries["default"],
              required: true,
              include: [{
                model: _ledger["default"],
                as: "VoucherLedger",
                attributes: ["uid", "name", "opening_balance", "amount", "tax_key", "sale_key", "account_holder_name", "bank_account_number", "bank_branch", "bank_name"]
              }]
            }],
            order: [['invoice_date', 'ASC']]
          });
        case 3:
          createdata = _context4.sent;
          if (!(createdata.length > 0)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata, "array", data.data.email);
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
            message: "JournalVoucher fetch Successfully",
            JournalVoucher: response
          });
        case 15:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher not Found!",
            JournalVoucher: createdata ? createdata : []
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
            error: _context4.t0,
            message: "Something went wrong!"
          });
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function (_x17, _x18) {
    return _ref4.apply(this, arguments);
  };
}();

// exports.getAllDataPagination = async function(data, res) {
//   try {
//     let createdata = await JournalVoucher.findAndCountAll({
//       where: {
//         company_id: data.company_id,
//         current_year: data.current_year,
//         end_year: data.end_year
//       },
//       include: [
//         {
//           model: Company,
//           attributes: [
//             "company_name",
//             "uid",
//             "gst_number",
//             "terms",
//             "financial_year",
//             "cin_number",
//             "company_pan_number"
//           ]
//         },
//         {
//           model: Purpose
//         },
//         {
//           model: JournalInteries,
//           required: true,
//           include: [
//             {
//               model: Ledger,
//               as: "VoucherLedger",
//               attributes: [
//                 "uid",
//                 "name",
//                 "opening_balance",
//                 "amount",
//                 "tax_key",
//                 "sale_key",
//                 "account_holder_name",
//                 "bank_account_number",
//                 "bank_branch",
//                 "bank_name"
//               ]
//             }
//           ]
//         }
//       ],
//       order: [["invoice_date", "ASC"]],
//       distinct: true,
//       limit: data.limit,
//       offset: data.offset
//     });
//     if (createdata.rows.length > 0) {
//       let response = await decreptionJournal(
//         createdata.rows,
//         "array",
//         data.data.email
//       );
//       response = response.map(item => {
//         if (item.invoice_id) {
//           item.invoice_id =
//             item.invoice_id <= 9
//               ? `${data.current_year.toString().substr(-2) +
//                   `-` +
//                   data.end_year.toString().substr(-2)}/00${item.invoice_id}`
//               : item.invoice_id > 9
//                 ? `${data.current_year.toString().substr(-2) +
//                     `-` +
//                     data.end_year.toString().substr(-2)}/0${item.invoice_id}`
//                 : `${data.current_year.toString().substr(-2) +
//                     `-` +
//                     data.end_year.toString().substr(-2)}/${item.invoice_id}`;
//         }
//         return item;
//       });
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "JournalVoucher fetch Successfully",
//         JournalVoucher: response,
//         Count: createdata.count
//       };
//     } else {
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "JournalVoucher not Found!",
//         JournalVoucher: createdata.rows.length > 0 ? createdata : []
//       };
//     }
//   } catch (e) {
//     return {
//       statusCode: res.statusCode,
//       success: false,
//       error: e.message,
//       message: "Something went wrong!"
//     };
//   }
// };

exports.getAllDataPagination = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _journalVoucher["default"].findAndCountAll({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ["company_name", "uid", "gst_number", "terms", "financial_year", "cin_number", "company_pan_number"]
            }, {
              model: _purpose["default"]
            }],
            order: [['invoice_date', 'ASC']],
            distinct: true,
            limit: data.limit,
            offset: data.offset
          });
        case 3:
          createdata = _context5.sent;
          if (!(createdata.rows.length > 0)) {
            _context5.next = 15;
            break;
          }
          _context5.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata.rows, "array", data.data.email);
        case 7:
          response = _context5.sent;
          response = response.map(function (item) {
            if (item.invoice_id) {
              item.invoice_id = item.invoice_id <= 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/00").concat(item.invoice_id) : item.invoice_id > 9 ? "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/0").concat(item.invoice_id) : "".concat(data.current_year.toString().substr(-2) + "-" + data.end_year.toString().substr(-2), "/").concat(item.invoice_id);
            }
            return item;
          });
          _context5.next = 11;
          return (0, _arraySort["default"])(response, 'invoice_id');
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher fetch Successfully",
            JournalVoucher: response,
            Count: createdata.count
          });
        case 15:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher not Found!",
            JournalVoucher: createdata.rows.length > 0 ? createdata : []
          });
        case 16:
          _context5.next = 21;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context5.t0.message,
            message: "Something went wrong!"
          });
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function (_x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(t) {
              var isallclear, count, checkYear, _where3, updateCount, _count, _checkYear, finddate, _updateCount, _updateCount2, _count2, _checkYear2, itemData, createdata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    isallclear = false;
                    if (!data.is_after) {
                      _context6.next = 23;
                      break;
                    }
                    _context6.next = 4;
                    return _journalVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        uid: data.after_id
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 4:
                    count = _context6.sent;
                    _context6.next = 7;
                    return _journalVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 7:
                    checkYear = _context6.sent;
                    if (!checkYear) {
                      _context6.next = 18;
                      break;
                    }
                    _context6.next = 11;
                    return Number(count.dataValues.invoice_id);
                  case 11:
                    _context6.t0 = _context6.sent;
                    data.invoice_id = _context6.t0 + 1;
                    _context6.next = 15;
                    return _journalVoucher["default"].update({
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
                  case 15:
                    updateCount = _context6.sent;
                    _context6.next = 21;
                    break;
                  case 18:
                    _context6.next = 20;
                    return 1;
                  case 20:
                    data.invoice_id = _context6.sent;
                  case 21:
                    _context6.next = 77;
                    break;
                  case 23:
                    if (!data.is_before) {
                      _context6.next = 64;
                      break;
                    }
                    _context6.next = 26;
                    return _journalVoucher["default"].findOne({
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
                  case 26:
                    _count = _context6.sent;
                    _context6.next = 29;
                    return _journalVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 29:
                    _checkYear = _context6.sent;
                    if (!_checkYear) {
                      _context6.next = 59;
                      break;
                    }
                    _context6.next = 33;
                    return _journalVoucher["default"].findOne({
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
                  case 33:
                    finddate = _context6.sent;
                    if (!finddate) {
                      _context6.next = 44;
                      break;
                    }
                    _context6.next = 37;
                    return Number(finddate.dataValues.invoice_id);
                  case 37:
                    _context6.t1 = _context6.sent;
                    data.invoice_id = _context6.t1 + 1;
                    _context6.next = 41;
                    return _journalVoucher["default"].update({
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
                  case 41:
                    _updateCount = _context6.sent;
                    _context6.next = 57;
                    break;
                  case 44:
                    if (!_count) {
                      _context6.next = 51;
                      break;
                    }
                    _context6.next = 47;
                    return Number(_count.dataValues.invoice_id);
                  case 47:
                    _context6.t2 = _context6.sent;
                    data.invoice_id = _context6.t2 + 1;
                    _context6.next = 54;
                    break;
                  case 51:
                    _context6.next = 53;
                    return 1;
                  case 53:
                    data.invoice_id = _context6.sent;
                  case 54:
                    _context6.next = 56;
                    return _journalVoucher["default"].update({
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
                  case 56:
                    _updateCount2 = _context6.sent;
                  case 57:
                    _context6.next = 62;
                    break;
                  case 59:
                    _context6.next = 61;
                    return 1;
                  case 61:
                    data.invoice_id = _context6.sent;
                  case 62:
                    _context6.next = 77;
                    break;
                  case 64:
                    _context6.next = 66;
                    return _journalVoucher["default"].count({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    });
                  case 66:
                    _count2 = _context6.sent;
                    _context6.next = 69;
                    return _journalVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 69:
                    _checkYear2 = _context6.sent;
                    if (!_checkYear2) {
                      _context6.next = 74;
                      break;
                    }
                    data.invoice_id = Number(_count2) + 1;
                    _context6.next = 77;
                    break;
                  case 74:
                    _context6.next = 76;
                    return 1;
                  case 76:
                    data.invoice_id = _context6.sent;
                  case 77:
                    data.invoice_date = data.invoice_date;
                    _context6.next = 80;
                    return (0, _uniqid["default"])();
                  case 80:
                    data.uid = _context6.sent;
                    data.status = 1;
                    data.creation_date = new Date();
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    delete data.itemAdd;
                    _context6.next = 88;
                    return _journalVoucher["default"].create(data, {
                      transaction: t
                    });
                  case 88:
                    createdata = _context6.sent;
                    _entry["default"].createData(data.company_id, _entryMessage["default"].journal_create);
                    if (!(itemData.length > 0)) {
                      _context6.next = 101;
                      break;
                    }
                    _context6.next = 93;
                    return addItemInteries(itemData, createdata, data.data.email, t);
                  case 93:
                    itemSuccess = _context6.sent;
                    if (itemSuccess) {
                      _context6.next = 100;
                      break;
                    }
                    _context6.next = 97;
                    return t.rollback();
                  case 97:
                    isallclear = false;
                    _context6.next = 101;
                    break;
                  case 100:
                    isallclear = true;
                  case 101:
                    _context6.next = 103;
                    return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
                  case 103:
                    reponse = _context6.sent;
                    return _context6.abrupt("return", reponse);
                  case 105:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x23) {
              return _ref7.apply(this, arguments);
            };
          }());
        case 3:
          result = _context7.sent;
          if (!result) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher Created Successfully",
            JournalVoucher: result
          });
        case 8:
          _context7.next = 10;
          return transaction.rollback();
        case 10:
          _context7.next = 17;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 16;
          return transaction.rollback();
        case 16:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function (_x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id, data, res) {
    var find, _where11, updateCount, deleteInteries, deletedata;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _journalVoucher["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          find = _context8.sent;
          if (!find) {
            _context8.next = 21;
            break;
          }
          _context8.next = 7;
          return _journalVoucher["default"].update({
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
          updateCount = _context8.sent;
          _context8.next = 10;
          return _journalInteries["default"].destroy({
            where: {
              journa_voucher_id: id
            }
          });
        case 10:
          deleteInteries = _context8.sent;
          _context8.next = 13;
          return _journalVoucher["default"].destroy({
            where: {
              uid: id
            }
          });
        case 13:
          deletedata = _context8.sent;
          if (!deletedata) {
            _context8.next = 18;
            break;
          }
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher Delete Successfully",
            JournalVoucher: deletedata
          });
        case 18:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not delete please try later!",
            JournalVoucher: {}
          });
        case 19:
          _context8.next = 22;
          break;
        case 21:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not found!",
            JournalVoucher: {}
          });
        case 22:
          _context8.next = 28;
          break;
        case 24:
          _context8.prev = 24;
          _context8.t0 = _context8["catch"](0);
          console.log("e", _context8.t0);
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context8.t0,
            message: "Something went wrong!"
          });
        case 28:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 24]]);
  }));
  return function (_x24, _x25, _x26) {
    return _ref8.apply(this, arguments);
  };
}();
function updateItemInteries(_x27, _x28, _x29, _x30) {
  return _updateItemInteries.apply(this, arguments);
}
function _updateItemInteries() {
  _updateItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(array, data, key, trans) {
    var i, obj, encrypted, finddata;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          i = 0;
        case 1:
          if (!(i < array.length)) {
            _context19.next = 40;
            break;
          }
          if (!array[i].uid) {
            _context19.next = 6;
            break;
          }
          _context19.t0 = array[i].uid;
          _context19.next = 9;
          break;
        case 6:
          _context19.next = 8;
          return (0, _uniqid["default"])();
        case 8:
          _context19.t0 = _context19.sent;
        case 9:
          _context19.t1 = _context19.t0;
          _context19.t2 = array[i].type;
          _context19.t3 = array[i].journa_voucher_id ? array[i].journa_voucher_id : data.dataValues.uid;
          _context19.t4 = array[i].ledger_id;
          _context19.t5 = data.dataValues.company_id;
          _context19.t6 = data.dataValues.invoice_date;
          _context19.t7 = array[i].amount.toString();
          _context19.t8 = array[i].creation_date ? array[i].creation_date : new Date();
          _context19.t9 = new Date();
          _context19.t10 = {
            email: key
          };
          _context19.next = 21;
          return {
            uid: _context19.t1,
            type: _context19.t2,
            journa_voucher_id: _context19.t3,
            ledger_id: _context19.t4,
            company_id: _context19.t5,
            invoice_date: _context19.t6,
            amount: _context19.t7,
            creation_date: _context19.t8,
            updated_date: _context19.t9,
            data: _context19.t10
          };
        case 21:
          obj = _context19.sent;
          _context19.next = 24;
          return (0, _journalEntries.encreptionJournalEntries)(obj);
        case 24:
          encrypted = _context19.sent;
          _context19.next = 27;
          return _journalInteries["default"].findOne({
            where: {
              uid: encrypted.uid,
              journa_voucher_id: encrypted.journa_voucher_id
            }
          }, trans);
        case 27:
          finddata = _context19.sent;
          if (!finddata) {
            _context19.next = 33;
            break;
          }
          _context19.next = 31;
          return finddata.update(encrypted);
        case 31:
          _context19.next = 35;
          break;
        case 33:
          _context19.next = 35;
          return _journalInteries["default"].create(encrypted);
        case 35:
          if (!(i === array.length - 1)) {
            _context19.next = 37;
            break;
          }
          return _context19.abrupt("return", true);
        case 37:
          i++;
          _context19.next = 1;
          break;
        case 40:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return _updateItemInteries.apply(this, arguments);
}
exports.updateData = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(t) {
              var itemData, updatedata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    data.invoice_date = data.invoice_date;
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    delete data.itemAdd;
                    _context9.next = 6;
                    return _journalVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 6:
                    updatedata = _context9.sent;
                    if (!updatedata) {
                      _context9.next = 24;
                      break;
                    }
                    delete data.invoice_id;
                    _context9.next = 11;
                    return updatedata.update(data);
                  case 11:
                    _context9.next = 13;
                    return _entry["default"].createData(data.company_id, _entryMessage["default"].journal_update);
                  case 13:
                    if (!(itemData.length > 0)) {
                      _context9.next = 22;
                      break;
                    }
                    _context9.next = 16;
                    return _journalInteries["default"].destroy({
                      where: {
                        journa_voucher_id: data.uid
                      }
                    });
                  case 16:
                    _context9.next = 18;
                    return updateItemInteries(itemData, updatedata, data.data.email, t);
                  case 18:
                    itemSuccess = _context9.sent;
                    if (itemSuccess) {
                      _context9.next = 22;
                      break;
                    }
                    _context9.next = 22;
                    return t.rollback();
                  case 22:
                    _context9.next = 26;
                    break;
                  case 24:
                    _context9.next = 26;
                    return t.rollback();
                  case 26:
                    _context9.next = 28;
                    return (0, _journalvoucher.decreptionJournal)(updatedata, "object", data.data.email);
                  case 28:
                    reponse = _context9.sent;
                    return _context9.abrupt("return", reponse);
                  case 30:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x34) {
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
            message: "JournalVoucher Update Successfully",
            JournalVoucher: result
          });
        case 8:
          _context10.next = 10;
          return transaction.rollback();
        case 10:
          _context10.next = 15;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context10.t0,
            message: "Something went wrong!"
          });
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 12]]);
  }));
  return function (_x31, _x32, _x33) {
    return _ref9.apply(this, arguments);
  };
}();
exports.createStockJournalData = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(t) {
              var count, checkYear, _where14, updateCount, _count3, _checkYear3, _where17, _updateCount3, _count4, _checkYear4, itemData, createdata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    if (!data.is_after) {
                      _context11.next = 22;
                      break;
                    }
                    _context11.next = 3;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        uid: data.after_id
                      }])
                    }, t);
                  case 3:
                    count = _context11.sent;
                    _context11.next = 6;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    }, t);
                  case 6:
                    checkYear = _context11.sent;
                    if (!checkYear) {
                      _context11.next = 17;
                      break;
                    }
                    _context11.next = 10;
                    return Number(count.dataValues.invoice_id);
                  case 10:
                    _context11.t0 = _context11.sent;
                    data.invoice_id = _context11.t0 + 1;
                    _context11.next = 14;
                    return _itemStockVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal("invoice_id+1")
                    }, {
                      where: (_where14 = {}, _defineProperty(_where14, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }]), _defineProperty(_where14, "invoice_id", _defineProperty({}, Op.gte, data.invoice_id)), _where14)
                    }, t);
                  case 14:
                    updateCount = _context11.sent;
                    _context11.next = 20;
                    break;
                  case 17:
                    _context11.next = 19;
                    return 1;
                  case 19:
                    data.invoice_id = _context11.sent;
                  case 20:
                    _context11.next = 56;
                    break;
                  case 22:
                    if (!data.is_before) {
                      _context11.next = 43;
                      break;
                    }
                    _context11.next = 25;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        uid: data.after_id
                      }, {
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    }, t);
                  case 25:
                    _count3 = _context11.sent;
                    _context11.next = 28;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    }, t);
                  case 28:
                    _checkYear3 = _context11.sent;
                    if (!_checkYear3) {
                      _context11.next = 38;
                      break;
                    }
                    _context11.next = 32;
                    return Number(_count3.dataValues.invoice_id);
                  case 32:
                    data.invoice_id = _context11.sent;
                    _context11.next = 35;
                    return _itemStockVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal("invoice_id+1")
                    }, {
                      where: (_where17 = {}, _defineProperty(_where17, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }]), _defineProperty(_where17, "invoice_id", _defineProperty({}, Op.gte, data.invoice_id)), _where17)
                    }, t);
                  case 35:
                    _updateCount3 = _context11.sent;
                    _context11.next = 41;
                    break;
                  case 38:
                    _context11.next = 40;
                    return 1;
                  case 40:
                    data.invoice_id = _context11.sent;
                  case 41:
                    _context11.next = 56;
                    break;
                  case 43:
                    _context11.next = 45;
                    return _itemStockVoucher["default"].count({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    });
                  case 45:
                    _count4 = _context11.sent;
                    _context11.next = 48;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    }, t);
                  case 48:
                    _checkYear4 = _context11.sent;
                    if (!_checkYear4) {
                      _context11.next = 53;
                      break;
                    }
                    data.invoice_id = Number(_count4) + 1;
                    _context11.next = 56;
                    break;
                  case 53:
                    _context11.next = 55;
                    return 1;
                  case 55:
                    data.invoice_id = _context11.sent;
                  case 56:
                    data.invoice_date = data.invoice_date;
                    _context11.next = 59;
                    return (0, _uniqid["default"])();
                  case 59:
                    data.uid = _context11.sent;
                    data.status = 1;
                    data.creation_date = new Date();
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    delete data.itemAdd;
                    _context11.next = 67;
                    return _itemStockVoucher["default"].create(data, {
                      transaction: t
                    });
                  case 67:
                    createdata = _context11.sent;
                    if (!createdata) {
                      _context11.next = 93;
                      break;
                    }
                    _context11.prev = 69;
                    _entry["default"].createData(data.company_id, _entryMessage["default"].journal_create);
                    _context11.next = 78;
                    break;
                  case 73:
                    _context11.prev = 73;
                    _context11.t1 = _context11["catch"](69);
                    _context11.next = 77;
                    return t.rollback();
                  case 77:
                    return _context11.abrupt("return", false);
                  case 78:
                    if (!(itemData.length > 0)) {
                      _context11.next = 87;
                      break;
                    }
                    _context11.next = 81;
                    return _item_stock_voucher_entries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 81:
                    _context11.next = 83;
                    return addStockItemInteries(itemData, createdata, data.data.email, t);
                  case 83:
                    itemSuccess = _context11.sent;
                    if (itemSuccess) {
                      _context11.next = 87;
                      break;
                    }
                    _context11.next = 87;
                    return t.rollback();
                  case 87:
                    _context11.next = 89;
                    return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
                  case 89:
                    reponse = _context11.sent;
                    return _context11.abrupt("return", reponse);
                  case 93:
                    _context11.next = 95;
                    return t.rollback();
                  case 95:
                    return _context11.abrupt("return", false);
                  case 96:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, null, [[69, 73]]);
            }));
            return function (_x37) {
              return _ref12.apply(this, arguments);
            };
          }());
        case 3:
          result = _context12.sent;
          if (!result) {
            _context12.next = 8;
            break;
          }
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher Created Successfully",
            JournalVoucher: result
          });
        case 8:
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher Not Created",
            JournalVoucher: []
          });
        case 9:
          _context12.next = 14;
          break;
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context12.t0.message,
            message: "Something went wrong-!"
          });
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 11]]);
  }));
  return function (_x35, _x36) {
    return _ref11.apply(this, arguments);
  };
}();
function updateStockItemInteries(_x38, _x39, _x40, _x41) {
  return _updateStockItemInteries.apply(this, arguments);
}
function _updateStockItemInteries() {
  _updateStockItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(array, data, key, trans) {
    var items, i, body, obj, finddata;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          items = array;
          i = 0;
        case 2:
          if (!(i < items.length)) {
            _context20.next = 48;
            break;
          }
          if (!items[i].uid) {
            _context20.next = 7;
            break;
          }
          _context20.t0 = items[i].uid;
          _context20.next = 10;
          break;
        case 7:
          _context20.next = 9;
          return (0, _uniqid["default"])();
        case 9:
          _context20.t0 = _context20.sent;
        case 10:
          _context20.t1 = _context20.t0;
          _context20.t2 = items[i].voucher_id ? items[i].voucher_id : data.dataValues.uid;
          _context20.t3 = items[i].company_id ? items[i].company_id : data.dataValues.company_id;
          _context20.t4 = items[i].item_id;
          _context20.t5 = items[i].quantity;
          _context20.t6 = items[i].name;
          _context20.t7 = items[i].description;
          _context20.t8 = items[i].hsn_code;
          _context20.t9 = items[i].unit;
          _context20.t10 = items[i].price.toString();
          _context20.t11 = items[i].discount.toString();
          _context20.t12 = items[i].discount_type;
          _context20.t13 = items[i].total_amount.toString();
          _context20.t14 = items[i].igst_tax;
          _context20.t15 = items[i].type;
          _context20.t16 = items[i].invoice_date ? items[i].invoice_date : data.dataValues.invoice_date;
          _context20.t17 = items[i].creation_date ? items[i].creation_date : new Date();
          _context20.t18 = new Date();
          _context20.t19 = {
            email: key
          };
          body = {
            uid: _context20.t1,
            voucher_id: _context20.t2,
            company_id: _context20.t3,
            item_id: _context20.t4,
            quantity: _context20.t5,
            name: _context20.t6,
            description: _context20.t7,
            model: '',
            hsn_code: _context20.t8,
            unit: _context20.t9,
            price: _context20.t10,
            discount: _context20.t11,
            discount_type: _context20.t12,
            total_amount: _context20.t13,
            igst_tax: _context20.t14,
            type: _context20.t15,
            invoice_date: _context20.t16,
            status: 1,
            creation_date: _context20.t17,
            updated_date: _context20.t18,
            data: _context20.t19
          };
          _context20.next = 32;
          return (0, _itemEntries.encreptionItem)(body);
        case 32:
          obj = _context20.sent;
          _context20.next = 35;
          return _item_stock_voucher_entries["default"].findOne({
            where: {
              uid: obj.uid,
              voucher_id: obj.voucher_id
            }
          }, trans);
        case 35:
          finddata = _context20.sent;
          if (!finddata) {
            _context20.next = 41;
            break;
          }
          _context20.next = 39;
          return finddata.update(obj);
        case 39:
          _context20.next = 43;
          break;
        case 41:
          _context20.next = 43;
          return _item_stock_voucher_entries["default"].create(obj, trans);
        case 43:
          if (!(i === items.length - 1)) {
            _context20.next = 45;
            break;
          }
          return _context20.abrupt("return", true);
        case 45:
          i++;
          _context20.next = 2;
          break;
        case 48:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return _updateStockItemInteries.apply(this, arguments);
}
exports.updateStockvoucherData = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(t) {
              var itemData, updatedata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    data.invoice_date = data.invoice_date;
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    delete data.itemAdd;
                    _context13.next = 6;
                    return _itemStockVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 6:
                    updatedata = _context13.sent;
                    if (!updatedata) {
                      _context13.next = 28;
                      break;
                    }
                    delete data.invoice_id;
                    _context13.next = 11;
                    return updatedata.update(data);
                  case 11:
                    _context13.next = 13;
                    return _entry["default"].createData(data.company_id, _entryMessage["default"].journal_update);
                  case 13:
                    if (!(itemData.length > 0)) {
                      _context13.next = 22;
                      break;
                    }
                    _context13.next = 16;
                    return _item_stock_voucher_entries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 16:
                    _context13.next = 18;
                    return updateStockItemInteries(itemData, updatedata, data.data.email, t);
                  case 18:
                    itemSuccess = _context13.sent;
                    if (itemSuccess) {
                      _context13.next = 22;
                      break;
                    }
                    _context13.next = 22;
                    return t.rollback();
                  case 22:
                    _context13.next = 24;
                    return (0, _journalvoucher.decreptionJournal)(updatedata, "object", data.data.email);
                  case 24:
                    reponse = _context13.sent;
                    return _context13.abrupt("return", reponse);
                  case 28:
                    _context13.next = 30;
                    return t.rollback();
                  case 30:
                    return _context13.abrupt("return", false);
                  case 31:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            return function (_x45) {
              return _ref14.apply(this, arguments);
            };
          }());
        case 3:
          result = _context14.sent;
          if (!result) {
            _context14.next = 8;
            break;
          }
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher Update Successfully",
            JournalVoucher: result
          });
        case 8:
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher Not Created",
            JournalVoucher: []
          });
        case 9:
          _context14.next = 15;
          break;
        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context14.t0.message,
            message: "Something went wrong!"
          });
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 11]]);
  }));
  return function (_x42, _x43, _x44) {
    return _ref13.apply(this, arguments);
  };
}();
exports.cancelData = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(t) {
              var updatedata, response;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    data.updated_date = new Date();
                    data.status = 0;
                    data.ledger_id = '';
                    data.narration = '';
                    data.purpose_id = 0;
                    data.type = '';
                    data.total_amount = '0';
                    _context15.next = 9;
                    return (0, _journalvoucher.encreptionJournal)(data, data.data.email);
                  case 9:
                    data = _context15.sent;
                    _context15.next = 12;
                    return _journalVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 12:
                    updatedata = _context15.sent;
                    if (!updatedata) {
                      _context15.next = 21;
                      break;
                    }
                    delete data.invoice_id;
                    _context15.next = 17;
                    return updatedata.update(data);
                  case 17:
                    _context15.next = 19;
                    return _journalInteries["default"].destroy({
                      where: {
                        journa_voucher_id: data.uid
                      }
                    });
                  case 19:
                    _context15.next = 23;
                    break;
                  case 21:
                    _context15.next = 23;
                    return t.rollback();
                  case 23:
                    _context15.next = 25;
                    return (0, _journalvoucher.decreptionJournal)(updatedata, 'object', data.data.email);
                  case 25:
                    response = _context15.sent;
                    return _context15.abrupt("return", response);
                  case 27:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }));
            return function (_x49) {
              return _ref16.apply(this, arguments);
            };
          }());
        case 3:
          result = _context16.sent;
          if (!result) {
            _context16.next = 8;
            break;
          }
          return _context16.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "JournalVoucher Cancel Successfully",
            JournalVoucher: result
          });
        case 8:
          _context16.next = 10;
          return transaction.rollback();
        case 10:
          _context16.next = 16;
          break;
        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context16.t0,
            message: "Something went wrong!"
          });
        case 16:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 12]]);
  }));
  return function (_x46, _x47, _x48) {
    return _ref15.apply(this, arguments);
  };
}();