"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _purchaseVoucher = _interopRequireDefault(require("../models/purchaseVoucher"));
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
var _purchasevoucher = require("../security/purchasevoucher");
var _bank = require("../security/bank");
var _ledger2 = require("../security/ledger");
var _itemEntries = require("../security/itemEntries");
var _taxEntries = require("../security/taxEntries");
var _voucherEntries = require("../security/voucherEntries");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
function addItemInteries(_x, _x2, _x3, _x4, _x5) {
  return _addItemInteries.apply(this, arguments);
}
function _addItemInteries() {
  _addItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(array, data, key, companydata, trans) {
    var items, mainArray, i, nameobj, findtax, body, encypted, _body, ledgerencrypted, createLedger, _body2, _encypted, itemInteries;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          console.log("array123 = = = ", array);
          items = array;
          mainArray = [];
          i = 0;
        case 4:
          if (!(i < items.length)) {
            _context12.next = 90;
            break;
          }
          _context12.next = 7;
          return (0, _ledger2.encreption)({
            name: data.dataValues.is_local == "yes" ? "Purchase Local @ " + items[i].igst_tax + "%" : "Purchase Interstate @ " + items[i].igst_tax + "%",
            data: {
              email: key
            }
          });
        case 7:
          nameobj = _context12.sent;
          _context12.next = 10;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              sale_key: data.dataValues.is_local == "yes" ? items[i].igst_tax : items[i].igst_tax
            }, {
              name: nameobj.name
            }, {
              company_id: data.dataValues.company_id
            }])
          });
        case 10:
          findtax = _context12.sent;
          if (!findtax) {
            _context12.next = 41;
            break;
          }
          _context12.next = 14;
          return (0, _uniqid["default"])();
        case 14:
          _context12.t0 = _context12.sent;
          _context12.t1 = data.dataValues.uid;
          _context12.t2 = items[i].item_id;
          _context12.t3 = items[i].quantity;
          _context12.t4 = findtax.dataValues.uid;
          _context12.t5 = data.dataValues.company_id;
          _context12.t6 = items[i].name;
          _context12.t7 = items[i].description ? items[i].description : '';
          _context12.t8 = items[i].hsn_code ? items[i].hsn_code : '';
          _context12.t9 = items[i].unit ? items[i].unit : '';
          _context12.t10 = items[i].price.toString();
          _context12.t11 = items[i].discount.toString();
          _context12.t12 = items[i].discount_type;
          _context12.t13 = items[i].total_amount.toString();
          _context12.t14 = items[i].igst_tax;
          _context12.t15 = items[i].type;
          _context12.t16 = data.dataValues.invoice_date;
          _context12.t17 = new Date();
          _context12.t18 = new Date();
          _context12.t19 = {
            email: key
          };
          body = {
            uid: _context12.t0,
            voucher_id: _context12.t1,
            item_id: _context12.t2,
            quantity: _context12.t3,
            ledger_id: _context12.t4,
            company_id: _context12.t5,
            name: _context12.t6,
            description: _context12.t7,
            model: '',
            hsn_code: _context12.t8,
            unit: _context12.t9,
            price: _context12.t10,
            discount: _context12.t11,
            discount_type: _context12.t12,
            total_amount: _context12.t13,
            igst_tax: _context12.t14,
            type: _context12.t15,
            invoice_date: _context12.t16,
            status: 1,
            creation_date: _context12.t17,
            updated_date: _context12.t18,
            data: _context12.t19
          };
          _context12.next = 37;
          return (0, _itemEntries.encreptionItem)(body);
        case 37:
          encypted = _context12.sent;
          mainArray.push(encypted);
          _context12.next = 78;
          break;
        case 41:
          _context12.next = 43;
          return {
            uid: (0, _uniqid["default"])(),
            company_id: companydata.dataValues.uid,
            name: data.dataValues.is_local == "yes" ? "Purchase Local @ " + items[i].igst_tax + "%" : "Purchase Interstate @ " + items[i].igst_tax + "%",
            account_group_id: _config["default"].PurchaseAccounts,
            sale_key: data.dataValues.is_local == "yes" ? items[i].igst_tax : items[i].igst_tax,
            period_start: companydata.dataValues.current_period_start,
            period_end: companydata.dataValues.current_period_end,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            cess: false,
            is_auto: true,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 43:
          _body = _context12.sent;
          _context12.next = 46;
          return (0, _ledger2.encreption)(_body);
        case 46:
          ledgerencrypted = _context12.sent;
          _context12.next = 49;
          return _ledger["default"].create(ledgerencrypted);
        case 49:
          createLedger = _context12.sent;
          if (!createLedger) {
            _context12.next = 78;
            break;
          }
          _context12.next = 53;
          return (0, _uniqid["default"])();
        case 53:
          _context12.t20 = _context12.sent;
          _context12.t21 = data.dataValues.uid;
          _context12.t22 = items[i].item_id;
          _context12.t23 = items[i].quantity;
          _context12.t24 = createLedger.dataValues.uid;
          _context12.t25 = data.dataValues.company_id;
          _context12.t26 = items[i].name;
          _context12.t27 = items[i].description ? items[i].description : '';
          _context12.t28 = items[i].hsn_code ? items[i].hsn_code : '';
          _context12.t29 = items[i].unit ? items[i].unit : '';
          _context12.t30 = items[i].price.toString();
          _context12.t31 = items[i].discount.toString();
          _context12.t32 = items[i].discount_type;
          _context12.t33 = items[i].total_amount.toString();
          _context12.t34 = items[i].igst_tax;
          _context12.t35 = items[i].type;
          _context12.t36 = data.dataValues.invoice_date;
          _context12.t37 = new Date();
          _context12.t38 = new Date();
          _context12.t39 = {
            email: key
          };
          _body2 = {
            uid: _context12.t20,
            voucher_id: _context12.t21,
            item_id: _context12.t22,
            quantity: _context12.t23,
            ledger_id: _context12.t24,
            company_id: _context12.t25,
            name: _context12.t26,
            description: _context12.t27,
            model: '',
            hsn_code: _context12.t28,
            unit: _context12.t29,
            price: _context12.t30,
            discount: _context12.t31,
            discount_type: _context12.t32,
            total_amount: _context12.t33,
            igst_tax: _context12.t34,
            type: _context12.t35,
            invoice_date: _context12.t36,
            status: 1,
            creation_date: _context12.t37,
            updated_date: _context12.t38,
            data: _context12.t39
          };
          _context12.next = 76;
          return (0, _itemEntries.encreptionItem)(_body2);
        case 76:
          _encypted = _context12.sent;
          mainArray.push(_encypted);
        case 78:
          if (!(i === items.length - 1)) {
            _context12.next = 87;
            break;
          }
          _context12.next = 81;
          return _itemInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 81:
          itemInteries = _context12.sent;
          if (!itemInteries) {
            _context12.next = 86;
            break;
          }
          return _context12.abrupt("return", 'true');
        case 86:
          return _context12.abrupt("return", 'false');
        case 87:
          i++;
          _context12.next = 4;
          break;
        case 90:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _addItemInteries.apply(this, arguments);
}
function addTaxInteries(_x6, _x7, _x8, _x9, _x10) {
  return _addTaxInteries.apply(this, arguments);
}
function _addTaxInteries() {
  _addTaxInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(array, data, key, trans, companydata) {
    var taxs, mainArray, i, findtax, body, taxencyption, _body3, leadgerEn, createLedger, _body4, _taxencyption, taxAdd;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          taxs = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < taxs.length)) {
            _context13.next = 82;
            break;
          }
          _context13.next = 6;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              tax_key: taxs[i].tax_percentage + '-' + taxs[i].tax_name
            }, {
              company_id: data.company_id
            }])
          });
        case 6:
          findtax = _context13.sent;
          if (!findtax) {
            _context13.next = 29;
            break;
          }
          _context13.next = 10;
          return (0, _uniqid["default"])();
        case 10:
          _context13.t0 = _context13.sent;
          _context13.t1 = data.dataValues.uid;
          _context13.t2 = findtax.dataValues.uid;
          _context13.t3 = taxs[i].tax_amount;
          _context13.t4 = taxs[i].type;
          _context13.t5 = data.dataValues.invoice_date;
          _context13.t6 = new Date();
          _context13.t7 = new Date();
          _context13.t8 = {
            email: key
          };
          _context13.next = 21;
          return {
            uid: _context13.t0,
            voucher_id: _context13.t1,
            tax_ledger_id: _context13.t2,
            amount: _context13.t3,
            type: _context13.t4,
            invoice_date: _context13.t5,
            status: 1,
            creation_date: _context13.t6,
            updated_date: _context13.t7,
            data: _context13.t8
          };
        case 21:
          body = _context13.sent;
          _context13.next = 24;
          return (0, _taxEntries.encreptionTax)(body);
        case 24:
          taxencyption = _context13.sent;
          _context13.next = 27;
          return mainArray.push(taxencyption);
        case 27:
          _context13.next = 70;
          break;
        case 29:
          _context13.next = 31;
          return (0, _uniqid["default"])();
        case 31:
          _context13.t9 = _context13.sent;
          _context13.t10 = companydata.dataValues.uid;
          _context13.t11 = "tax-" + taxs[i].tax_percentage + '-' + taxs[i].tax_name;
          _context13.t12 = _config["default"].tax_account_id;
          _context13.t13 = taxs[i].tax_percentage + '-' + taxs[i].tax_name;
          _context13.t14 = companydata.dataValues.current_period_start;
          _context13.t15 = companydata.dataValues.current_period_end;
          _context13.t16 = new Date();
          _context13.t17 = new Date();
          _context13.t18 = {
            email: key
          };
          _context13.next = 43;
          return {
            uid: _context13.t9,
            company_id: _context13.t10,
            name: _context13.t11,
            account_group_id: _context13.t12,
            tax_key: _context13.t13,
            period_start: _context13.t14,
            period_end: _context13.t15,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            cess: false,
            is_auto: true,
            status: 1,
            creation_date: _context13.t16,
            updated_date: _context13.t17,
            data: _context13.t18
          };
        case 43:
          _body3 = _context13.sent;
          _context13.next = 46;
          return (0, _ledger2.encreption)(_body3);
        case 46:
          leadgerEn = _context13.sent;
          _context13.next = 49;
          return _ledger["default"].create(leadgerEn);
        case 49:
          createLedger = _context13.sent;
          if (!createLedger) {
            _context13.next = 70;
            break;
          }
          _context13.next = 53;
          return (0, _uniqid["default"])();
        case 53:
          _context13.t19 = _context13.sent;
          _context13.t20 = data.dataValues.uid;
          _context13.t21 = createLedger.dataValues.uid;
          _context13.t22 = taxs[i].tax_amount;
          _context13.t23 = taxs[i].type;
          _context13.t24 = data.dataValues.invoice_date;
          _context13.t25 = new Date();
          _context13.t26 = new Date();
          _context13.t27 = {
            email: key
          };
          _context13.next = 64;
          return {
            uid: _context13.t19,
            voucher_id: _context13.t20,
            tax_ledger_id: _context13.t21,
            amount: _context13.t22,
            type: _context13.t23,
            invoice_date: _context13.t24,
            status: 1,
            creation_date: _context13.t25,
            updated_date: _context13.t26,
            data: _context13.t27
          };
        case 64:
          _body4 = _context13.sent;
          _context13.next = 67;
          return (0, _taxEntries.encreptionTax)(_body4);
        case 67:
          _taxencyption = _context13.sent;
          _context13.next = 70;
          return mainArray.push(_taxencyption);
        case 70:
          if (!(i === taxs.length - 1)) {
            _context13.next = 79;
            break;
          }
          _context13.next = 73;
          return _taxInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 73:
          taxAdd = _context13.sent;
          if (!taxAdd) {
            _context13.next = 78;
            break;
          }
          return _context13.abrupt("return", 'true');
        case 78:
          return _context13.abrupt("return", 'false');
        case 79:
          i++;
          _context13.next = 3;
          break;
        case 82:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _addTaxInteries.apply(this, arguments);
}
function addVoucherInteries(_x11, _x12, _x13, _x14, _x15) {
  return _addVoucherInteries.apply(this, arguments);
}
function _addVoucherInteries() {
  _addVoucherInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(array, data, key, trans, companydata) {
    var voucher, mainArray, i, nameobj, findtax, body, encrypted, _body5, ledgerencrypted, createLedger, _body6, _encrypted, voucherAdd;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          voucher = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < voucher.length)) {
            _context14.next = 51;
            break;
          }
          _context14.next = 6;
          return (0, _ledger2.encreption)({
            name: voucher[i].sale_type === "local" ? "Purchase Local @ " + voucher[i].percentage + "%" : "Purchase Interstate @ " + voucher[i].sale_percentage + "%",
            data: {
              email: key
            }
          });
        case 6:
          nameobj = _context14.sent;
          _context14.next = 9;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              sale_key: voucher[i].sale_type === "local" ? voucher[i].percentage : voucher[i].sale_percentage
            }, {
              name: nameobj.name
            }, {
              company_id: data.company_id
            }])
          });
        case 9:
          findtax = _context14.sent;
          if (!findtax) {
            _context14.next = 21;
            break;
          }
          _context14.next = 13;
          return {
            uid: (0, _uniqid["default"])(),
            voucher_id: data.dataValues.uid,
            ledger_id: findtax.dataValues.uid,
            amount: voucher[i].amount,
            type: 'Purchase',
            invoice_date: data.dataValues.invoice_date,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 13:
          body = _context14.sent;
          _context14.next = 16;
          return (0, _voucherEntries.encreptionVoucher)(body);
        case 16:
          encrypted = _context14.sent;
          _context14.next = 19;
          return mainArray.push(encrypted);
        case 19:
          _context14.next = 39;
          break;
        case 21:
          _context14.next = 23;
          return {
            uid: (0, _uniqid["default"])(),
            company_id: companydata.dataValues.uid,
            name: voucher[i].sale_type === "local" ? "Purchase Local @ " + voucher[i].percentage + "%" : "Purchase Interstate @ " + voucher[i].sale_percentage + "%",
            account_group_id: _config["default"].PurchaseAccounts,
            sale_key: voucher[i].sale_type === "local" ? voucher[i].percentage : voucher[i].sale_percentage,
            period_start: companydata.dataValues.current_period_start,
            period_end: companydata.dataValues.current_period_end,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            cess: false,
            status: 1,
            is_auto: true,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 23:
          _body5 = _context14.sent;
          _context14.next = 26;
          return (0, _ledger2.encreption)(_body5);
        case 26:
          ledgerencrypted = _context14.sent;
          _context14.next = 29;
          return _ledger["default"].create(ledgerencrypted);
        case 29:
          createLedger = _context14.sent;
          if (!createLedger) {
            _context14.next = 39;
            break;
          }
          _context14.next = 33;
          return {
            uid: (0, _uniqid["default"])(),
            voucher_id: data.dataValues.uid,
            amount: voucher[i].amount,
            ledger_id: createLedger.dataValues.uid,
            type: 'Purchase',
            invoice_date: data.dataValues.invoice_date,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 33:
          _body6 = _context14.sent;
          _context14.next = 36;
          return (0, _voucherEntries.encreptionVoucher)(_body6);
        case 36:
          _encrypted = _context14.sent;
          _context14.next = 39;
          return mainArray.push(_encrypted);
        case 39:
          if (!(i === voucher.length - 1)) {
            _context14.next = 48;
            break;
          }
          _context14.next = 42;
          return _voucherInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 42:
          voucherAdd = _context14.sent;
          if (!voucherAdd) {
            _context14.next = 47;
            break;
          }
          return _context14.abrupt("return", 'true');
        case 47:
          return _context14.abrupt("return", 'false');
        case 48:
          i++;
          _context14.next = 3;
          break;
        case 51:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _addVoucherInteries.apply(this, arguments);
}
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _purchaseVoucher["default"].findOne({
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
              as: 'PurchaseLedger',
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
              }
            }, {
              model: _voucherInteries["default"],
              required: false,
              where: {
                type: 'Purchase'
              }
            }]
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 11;
            break;
          }
          _context.next = 7;
          return (0, _purchasevoucher.decreptionPurchase)(createdata, 'object', data.data.email);
        case 7:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher fetch Successfully",
            PurchaseVoucher: response
          });
        case 11:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher not Found!",
            PurchaseVoucher: createdata ? createdata : {}
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
  return function (_x16, _x17, _x18) {
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
          return _purchaseVoucher["default"].findOne({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            order: [['invoice_date', 'DESC']]
          });
        case 3:
          createdata = _context2.sent;
          if (!createdata) {
            _context2.next = 11;
            break;
          }
          _context2.next = 7;
          return (0, _purchasevoucher.decreptionPurchase)(createdata, 'object', data.data.email);
        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher fetch Successfully",
            PurchaseVoucher: response
          });
        case 11:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher not Found!",
            PurchaseVoucher: createdata ? createdata : {}
          });
        case 12:
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function (_x19, _x20) {
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
          return _purchaseVoucher["default"].findAll({
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
            }, {
              model: _ledger["default"],
              as: 'PurchaseLedger',
              attributes: ['name', 'uid', 'amount', 'opening_balance']
            }],
            order: [['invoice_date', 'ASC']]
          });
        case 3:
          createdata = _context3.sent;
          if (!(createdata.length > 0)) {
            _context3.next = 11;
            break;
          }
          _context3.next = 7;
          return (0, _purchasevoucher.decreptionPurchase)(createdata, 'array', data.data.email);
        case 7:
          response = _context3.sent;
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher fetch Successfully",
            PurchaseVoucher: response
          });
        case 11:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher not Found!",
            PurchaseVoucher: createdata ? createdata : []
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
  return function (_x21, _x22) {
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
          return _purchaseVoucher["default"].findAndCountAll({
            limit: data.limit,
            offset: data.offset,
            where: {
              company_id: data.company_id,
              current_year: data.current_year,
              end_year: data.end_year
            },
            include: [{
              model: _company["default"],
              attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
            }, {
              model: _ledger["default"],
              as: 'PurchaseLedger',
              attributes: ['name', 'uid', 'amount', 'opening_balance']
            }],
            order: [['invoice_date', 'ASC']],
            distinct: true
          });
        case 3:
          createdata = _context4.sent;
          if (!(createdata.rows.length > 0)) {
            _context4.next = 12;
            break;
          }
          console.log("createdata.rows", createdata.rows);
          _context4.next = 8;
          return (0, _purchasevoucher.decreptionPurchase)(createdata.rows, 'array', data.data.email);
        case 8:
          response = _context4.sent;
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher fetch Successfully",
            PurchaseVoucher: response,
            Count: createdata.count
          });
        case 12:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher not Found!",
            PurchaseVoucher: createdata.rows.length > 0 ? createdata : []
          });
        case 13:
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0.message,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function (_x23, _x24) {
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
              var itemData, taxData, voucherData, bankdata, companydata, createdata, itemSuccess, taxSuccess, voucherSuccess, response;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    // if(data.is_after){
                    //    let count = await PurchaseVoucher.findOne({where:{[Op.and]: [ {uid:data.after_id}]}}, t);
                    //    let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
                    //    if(checkYear){
                    //      data.invoice_id = await Number(count.dataValues.invoice_id)+1;
                    //      let updateCount = await PurchaseVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }],invoice_id:{[Op.gte]:data.invoice_id}}}, t)
                    //    }else{
                    //      data.invoice_id = await 1;
                    //    }
                    //  }else if(data.is_before){
                    //      let count = await PurchaseVoucher.findOne({where:{[Op.and]: [ {uid:data.after_id},{current_year: data.current_year },{end_year: data.end_year }]}}, t);
                    //      let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
                    //      if(checkYear){
                    //          data.invoice_id = await Number(count.dataValues.invoice_id);
                    //          let updateCount = await PurchaseVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }],invoice_id:{[Op.gte]:data.invoice_id}}}, t)
                    //      }else{
                    //          data.invoice_id = await 1;
                    //      }
                    //  }else{
                    //      let count  = await PurchaseVoucher.count({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}});
                    //      let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
                    //      if(checkYear){
                    //          data.invoice_id = Number(count)+1;
                    //      }else{
                    //          data.invoice_id = await 1;
                    //      }
                    //  }
                    data.invoice_date = data.invoice_date;
                    _context5.next = 3;
                    return (0, _uniqid["default"])();
                  case 3:
                    data.uid = _context5.sent;
                    data.status = 1;
                    data.creation_date = new Date();
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    taxData = data.taxAdd;
                    voucherData = data.voucherAdd;
                    delete data.itemAdd;
                    delete data.taxAdd;
                    delete data.voucherAdd;
                    if (!(data.deleteItem && data.deleteItem.length > 0)) {
                      _context5.next = 17;
                      break;
                    }
                    _context5.next = 16;
                    return _itemInteries["default"].destroy({
                      where: {
                        uid: _defineProperty({}, Op["in"], [data.deleteItem])
                      }
                    });
                  case 16:
                    delete data.deleteItem;
                  case 17:
                    _context5.next = 19;
                    return data.is_bank;
                  case 19:
                    _context5.t1 = _context5.sent;
                    _context5.t0 = _context5.t1 === 'yes';
                    if (_context5.t0) {
                      _context5.next = 26;
                      break;
                    }
                    _context5.next = 24;
                    return data.is_bank;
                  case 24:
                    _context5.t2 = _context5.sent;
                    _context5.t0 = _context5.t2 === 'Yes';
                  case 26:
                    if (!_context5.t0) {
                      _context5.next = 43;
                      break;
                    }
                    _context5.next = 29;
                    return _ledger["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        is_default_bank: 'true'
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 29:
                    bankdata = _context5.sent;
                    if (!bankdata) {
                      _context5.next = 43;
                      break;
                    }
                    _context5.next = 33;
                    return {
                      email: data.data.email
                    };
                  case 33:
                    bankdata.dataValues.data = _context5.sent;
                    _context5.next = 36;
                    return bankdata.dataValues.bank_name;
                  case 36:
                    data.bank_name = _context5.sent;
                    _context5.next = 39;
                    return bankdata.dataValues.bank_account_number;
                  case 39:
                    data.bank_account_number = _context5.sent;
                    _context5.next = 42;
                    return bankdata.dataValues.ifsc;
                  case 42:
                    data.bank_ifsc = _context5.sent;
                  case 43:
                    _context5.next = 45;
                    return _company["default"].findOne({
                      where: {
                        uid: data.company_id
                      }
                    }, t);
                  case 45:
                    companydata = _context5.sent;
                    _context5.next = 48;
                    return _purchaseVoucher["default"].create(data, {
                      transaction: t
                    });
                  case 48:
                    createdata = _context5.sent;
                    _entry["default"].createData(data.company_id, _entryMessage["default"].purchase_create);
                    if (!(itemData.length > 0)) {
                      _context5.next = 57;
                      break;
                    }
                    _context5.next = 53;
                    return addItemInteries(itemData, createdata, data.data.email, companydata, t);
                  case 53:
                    itemSuccess = _context5.sent;
                    if (itemSuccess) {
                      _context5.next = 57;
                      break;
                    }
                    _context5.next = 57;
                    return t.rollback();
                  case 57:
                    if (!(taxData.length > 0)) {
                      _context5.next = 64;
                      break;
                    }
                    _context5.next = 60;
                    return addTaxInteries(taxData, createdata, data.data.email, t, companydata);
                  case 60:
                    taxSuccess = _context5.sent;
                    if (taxSuccess) {
                      _context5.next = 64;
                      break;
                    }
                    _context5.next = 64;
                    return t.rollback();
                  case 64:
                    if (!(voucherData.length > 0)) {
                      _context5.next = 71;
                      break;
                    }
                    _context5.next = 67;
                    return addVoucherInteries(voucherData, createdata, data.data.email, t, companydata);
                  case 67:
                    voucherSuccess = _context5.sent;
                    if (voucherSuccess) {
                      _context5.next = 71;
                      break;
                    }
                    _context5.next = 71;
                    return t.rollback();
                  case 71:
                    _context5.next = 73;
                    return (0, _purchasevoucher.decreptionPurchase)(createdata, 'object', data.data.email);
                  case 73:
                    response = _context5.sent;
                    return _context5.abrupt("return", response);
                  case 75:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x27) {
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
            message: "PurchaseVoucher Created Successfully",
            PurchaseVoucher: result
          });
        case 8:
          _context6.next = 10;
          return transaction.rollback();
        case 10:
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0.message,
            message: "Something went wrong!"
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function (_x25, _x26) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, data, res) {
    var find, deletedata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _purchaseVoucher["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          find = _context7.sent;
          if (!find) {
            _context7.next = 21;
            break;
          }
          _context7.next = 7;
          return _itemInteries["default"].destroy({
            where: {
              voucher_id: id
            }
          });
        case 7:
          _context7.next = 9;
          return _taxInteries["default"].destroy({
            where: {
              voucher_id: id
            }
          });
        case 9:
          _context7.next = 11;
          return _voucherInteries["default"].destroy({
            where: {
              voucher_id: id
            }
          });
        case 11:
          _context7.next = 13;
          return _purchaseVoucher["default"].destroy({
            where: {
              uid: id
            }
          });
        case 13:
          deletedata = _context7.sent;
          if (!deletedata) {
            _context7.next = 18;
            break;
          }
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher Delete Successfully",
            PurchaseVoucher: deletedata
          });
        case 18:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not delete please try later!",
            PurchaseVoucher: {}
          });
        case 19:
          _context7.next = 22;
          break;
        case 21:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not found!",
            PurchaseVoucher: {}
          });
        case 22:
          _context7.next = 27;
          break;
        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context7.t0,
            message: "Something went wrong!"
          });
        case 27:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 24]]);
  }));
  return function (_x28, _x29, _x30) {
    return _ref7.apply(this, arguments);
  };
}();
function updateItemInteries(_x31, _x32, _x33, _x34, _x35) {
  return _updateItemInteries.apply(this, arguments);
}
function _updateItemInteries() {
  _updateItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(array, data, key, companydata, trans) {
    var items, mainArray, i, nameobj, findtax, body, encypted, _body7, ledgerencrypted, createLedger, _body8, _encypted2, itemInteries;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          items = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < items.length)) {
            _context15.next = 90;
            break;
          }
          _context15.next = 6;
          return (0, _ledger2.encreption)({
            name: data.dataValues.is_local == "yes" ? "Purchase Local @ " + items[i].igst_tax + "%" : "Purchase Interstate @ " + items[i].igst_tax + "%",
            data: {
              email: key
            }
          });
        case 6:
          nameobj = _context15.sent;
          _context15.next = 9;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              sale_key: data.dataValues.is_local == "yes" ? items[i].igst_tax : items[i].igst_tax
            }, {
              name: nameobj.name
            }, {
              company_id: data.dataValues.company_id
            }])
          });
        case 9:
          findtax = _context15.sent;
          if (!findtax) {
            _context15.next = 41;
            break;
          }
          _context15.next = 13;
          return (0, _uniqid["default"])();
        case 13:
          _context15.t0 = _context15.sent;
          _context15.t1 = data.dataValues.uid;
          _context15.t2 = items[i].item_id;
          _context15.t3 = items[i].quantity;
          _context15.t4 = findtax.dataValues.uid;
          _context15.t5 = data.dataValues.company_id;
          _context15.t6 = items[i].name;
          _context15.t7 = items[i].description ? items[i].description : '';
          _context15.t8 = items[i].hsn_code ? items[i].hsn_code : '';
          _context15.t9 = items[i].unit ? items[i].unit : '';
          _context15.t10 = items[i].price.toString();
          _context15.t11 = items[i].discount.toString();
          _context15.t12 = items[i].discount_type;
          _context15.t13 = items[i].total_amount.toString();
          _context15.t14 = items[i].igst_tax;
          _context15.t15 = items[i].type;
          _context15.t16 = data.dataValues.invoice_date;
          _context15.t17 = new Date();
          _context15.t18 = new Date();
          _context15.t19 = {
            email: key
          };
          body = {
            uid: _context15.t0,
            voucher_id: _context15.t1,
            item_id: _context15.t2,
            quantity: _context15.t3,
            ledger_id: _context15.t4,
            company_id: _context15.t5,
            name: _context15.t6,
            description: _context15.t7,
            model: '',
            hsn_code: _context15.t8,
            unit: _context15.t9,
            price: _context15.t10,
            discount: _context15.t11,
            discount_type: _context15.t12,
            total_amount: _context15.t13,
            igst_tax: _context15.t14,
            type: _context15.t15,
            invoice_date: _context15.t16,
            status: 1,
            creation_date: _context15.t17,
            updated_date: _context15.t18,
            data: _context15.t19
          };
          console.log("body == ", body);
          _context15.next = 37;
          return (0, _itemEntries.encreptionItem)(body);
        case 37:
          encypted = _context15.sent;
          mainArray.push(encypted);
          _context15.next = 78;
          break;
        case 41:
          _context15.next = 43;
          return {
            uid: (0, _uniqid["default"])(),
            company_id: companydata.dataValues.uid,
            name: data.dataValues.is_local == "yes" ? "Purchase Local @ " + items[i].igst_tax + "%" : "Purchase Interstate @ " + items[i].igst_tax + "%",
            account_group_id: _config["default"].PurchaseAccounts,
            sale_key: data.dataValues.is_local == "yes" ? items[i].igst_tax : items[i].igst_tax,
            period_start: companydata.dataValues.current_period_start,
            period_end: companydata.dataValues.current_period_end,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            cess: false,
            is_auto: true,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 43:
          _body7 = _context15.sent;
          _context15.next = 46;
          return (0, _ledger2.encreption)(_body7);
        case 46:
          ledgerencrypted = _context15.sent;
          _context15.next = 49;
          return _ledger["default"].create(ledgerencrypted);
        case 49:
          createLedger = _context15.sent;
          if (!createLedger) {
            _context15.next = 78;
            break;
          }
          _context15.next = 53;
          return (0, _uniqid["default"])();
        case 53:
          _context15.t20 = _context15.sent;
          _context15.t21 = data.dataValues.uid;
          _context15.t22 = items[i].item_id;
          _context15.t23 = items[i].quantity;
          _context15.t24 = createLedger.dataValues.uid;
          _context15.t25 = data.dataValues.company_id;
          _context15.t26 = items[i].name;
          _context15.t27 = items[i].description ? items[i].description : '';
          _context15.t28 = items[i].hsn_code ? items[i].hsn_code : '';
          _context15.t29 = items[i].unit ? items[i].unit : '';
          _context15.t30 = items[i].price.toString();
          _context15.t31 = items[i].discount.toString();
          _context15.t32 = items[i].discount_type;
          _context15.t33 = items[i].total_amount.toString();
          _context15.t34 = items[i].igst_tax;
          _context15.t35 = items[i].type;
          _context15.t36 = data.dataValues.invoice_date;
          _context15.t37 = new Date();
          _context15.t38 = new Date();
          _context15.t39 = {
            email: key
          };
          _body8 = {
            uid: _context15.t20,
            voucher_id: _context15.t21,
            item_id: _context15.t22,
            quantity: _context15.t23,
            ledger_id: _context15.t24,
            company_id: _context15.t25,
            name: _context15.t26,
            description: _context15.t27,
            model: '',
            hsn_code: _context15.t28,
            unit: _context15.t29,
            price: _context15.t30,
            discount: _context15.t31,
            discount_type: _context15.t32,
            total_amount: _context15.t33,
            igst_tax: _context15.t34,
            type: _context15.t35,
            invoice_date: _context15.t36,
            status: 1,
            creation_date: _context15.t37,
            updated_date: _context15.t38,
            data: _context15.t39
          };
          _context15.next = 76;
          return (0, _itemEntries.encreptionItem)(_body8);
        case 76:
          _encypted2 = _context15.sent;
          mainArray.push(_encypted2);
        case 78:
          if (!(i === items.length - 1)) {
            _context15.next = 87;
            break;
          }
          _context15.next = 81;
          return _itemInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 81:
          itemInteries = _context15.sent;
          if (!itemInteries) {
            _context15.next = 86;
            break;
          }
          return _context15.abrupt("return", 'true');
        case 86:
          return _context15.abrupt("return", 'false');
        case 87:
          i++;
          _context15.next = 3;
          break;
        case 90:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _updateItemInteries.apply(this, arguments);
}
function updateTaxInteries(_x36, _x37, _x38, _x39, _x40) {
  return _updateTaxInteries.apply(this, arguments);
}
function _updateTaxInteries() {
  _updateTaxInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(array, data, key, trans, companydata) {
    var taxs, mainArray, i, findtax, body, taxencyption, _body9, leadgerEn, createLedger, _body10, _taxencyption2, taxAdd;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          taxs = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < taxs.length)) {
            _context16.next = 82;
            break;
          }
          _context16.next = 6;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              tax_key: taxs[i].tax_percentage + '-' + taxs[i].tax_name
            }, {
              company_id: data.company_id
            }])
          });
        case 6:
          findtax = _context16.sent;
          if (!findtax) {
            _context16.next = 29;
            break;
          }
          _context16.next = 10;
          return (0, _uniqid["default"])();
        case 10:
          _context16.t0 = _context16.sent;
          _context16.t1 = data.dataValues.uid;
          _context16.t2 = findtax.dataValues.uid;
          _context16.t3 = taxs[i].tax_amount;
          _context16.t4 = taxs[i].type;
          _context16.t5 = data.dataValues.invoice_date;
          _context16.t6 = new Date();
          _context16.t7 = new Date();
          _context16.t8 = {
            email: key
          };
          _context16.next = 21;
          return {
            uid: _context16.t0,
            voucher_id: _context16.t1,
            tax_ledger_id: _context16.t2,
            amount: _context16.t3,
            type: _context16.t4,
            invoice_date: _context16.t5,
            status: 1,
            creation_date: _context16.t6,
            updated_date: _context16.t7,
            data: _context16.t8
          };
        case 21:
          body = _context16.sent;
          _context16.next = 24;
          return (0, _taxEntries.encreptionTax)(body);
        case 24:
          taxencyption = _context16.sent;
          _context16.next = 27;
          return mainArray.push(taxencyption);
        case 27:
          _context16.next = 70;
          break;
        case 29:
          _context16.next = 31;
          return (0, _uniqid["default"])();
        case 31:
          _context16.t9 = _context16.sent;
          _context16.t10 = companydata.dataValues.uid;
          _context16.t11 = "tax-" + taxs[i].tax_percentage + '-' + taxs[i].tax_name;
          _context16.t12 = _config["default"].tax_account_id;
          _context16.t13 = taxs[i].tax_percentage + '-' + taxs[i].tax_name;
          _context16.t14 = companydata.dataValues.current_period_start;
          _context16.t15 = companydata.dataValues.current_period_end;
          _context16.t16 = new Date();
          _context16.t17 = new Date();
          _context16.t18 = {
            email: key
          };
          _context16.next = 43;
          return {
            uid: _context16.t9,
            company_id: _context16.t10,
            name: _context16.t11,
            account_group_id: _context16.t12,
            tax_key: _context16.t13,
            period_start: _context16.t14,
            period_end: _context16.t15,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            cess: false,
            status: 1,
            is_auto: true,
            creation_date: _context16.t16,
            updated_date: _context16.t17,
            data: _context16.t18
          };
        case 43:
          _body9 = _context16.sent;
          _context16.next = 46;
          return (0, _ledger2.encreption)(_body9);
        case 46:
          leadgerEn = _context16.sent;
          _context16.next = 49;
          return _ledger["default"].create(leadgerEn);
        case 49:
          createLedger = _context16.sent;
          if (!createLedger) {
            _context16.next = 70;
            break;
          }
          _context16.next = 53;
          return (0, _uniqid["default"])();
        case 53:
          _context16.t19 = _context16.sent;
          _context16.t20 = data.dataValues.uid;
          _context16.t21 = createLedger.dataValues.uid;
          _context16.t22 = taxs[i].tax_amount;
          _context16.t23 = taxs[i].type;
          _context16.t24 = data.dataValues.invoice_date;
          _context16.t25 = new Date();
          _context16.t26 = new Date();
          _context16.t27 = {
            email: key
          };
          _context16.next = 64;
          return {
            uid: _context16.t19,
            voucher_id: _context16.t20,
            tax_ledger_id: _context16.t21,
            amount: _context16.t22,
            type: _context16.t23,
            invoice_date: _context16.t24,
            status: 1,
            creation_date: _context16.t25,
            updated_date: _context16.t26,
            data: _context16.t27
          };
        case 64:
          _body10 = _context16.sent;
          _context16.next = 67;
          return (0, _taxEntries.encreptionTax)(_body10);
        case 67:
          _taxencyption2 = _context16.sent;
          _context16.next = 70;
          return mainArray.push(_taxencyption2);
        case 70:
          if (!(i === taxs.length - 1)) {
            _context16.next = 79;
            break;
          }
          _context16.next = 73;
          return _taxInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 73:
          taxAdd = _context16.sent;
          if (!taxAdd) {
            _context16.next = 78;
            break;
          }
          return _context16.abrupt("return", 'true');
        case 78:
          return _context16.abrupt("return", 'false');
        case 79:
          i++;
          _context16.next = 3;
          break;
        case 82:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _updateTaxInteries.apply(this, arguments);
}
function updateVoucherInteries(_x41, _x42, _x43, _x44, _x45) {
  return _updateVoucherInteries.apply(this, arguments);
}
function _updateVoucherInteries() {
  _updateVoucherInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(array, data, key, trans, companydata) {
    var voucher, mainArray, i, nameobj, findtax, body, encrypted, _body11, ledgerencrypted, createLedger, _body12, _encrypted2, voucherAdd;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          voucher = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < voucher.length)) {
            _context17.next = 51;
            break;
          }
          _context17.next = 6;
          return (0, _ledger2.encreption)({
            name: voucher[i].sale_type === "local" ? "Purchase Local @ " + voucher[i].percentage + "%" : "Purchase Interstate @ " + voucher[i].sale_percentage + "%",
            data: {
              email: key
            }
          });
        case 6:
          nameobj = _context17.sent;
          _context17.next = 9;
          return _ledger["default"].findOne({
            where: _defineProperty({}, Op.and, [{
              sale_key: voucher[i].sale_type === "local" ? voucher[i].percentage : voucher[i].sale_percentage
            }, {
              name: nameobj.name
            }, {
              company_id: data.company_id
            }])
          });
        case 9:
          findtax = _context17.sent;
          if (!findtax) {
            _context17.next = 21;
            break;
          }
          _context17.next = 13;
          return {
            uid: (0, _uniqid["default"])(),
            voucher_id: data.dataValues.uid,
            ledger_id: findtax.dataValues.uid,
            amount: voucher[i].amount,
            type: voucher[i].type,
            invoice_date: data.dataValues.invoice_date,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 13:
          body = _context17.sent;
          _context17.next = 16;
          return (0, _voucherEntries.encreptionVoucher)(body);
        case 16:
          encrypted = _context17.sent;
          _context17.next = 19;
          return mainArray.push(encrypted);
        case 19:
          _context17.next = 39;
          break;
        case 21:
          _context17.next = 23;
          return {
            uid: (0, _uniqid["default"])(),
            company_id: companydata.dataValues.uid,
            name: voucher[i].sale_type === "local" ? "Purchase Local @ " + voucher[i].percentage + "%" : "Purchase Interstate @ " + voucher[i].sale_percentage + "%",
            account_group_id: _config["default"].PurchaseAccounts,
            sale_key: voucher[i].sale_type === "local" ? voucher[i].percentage : voucher[i].sale_percentage,
            period_start: companydata.dataValues.current_period_start,
            period_end: companydata.dataValues.current_period_end,
            opening_balance: 'debit',
            amount: '0',
            is_default_bank: "false",
            is_auto: true,
            cess: false,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 23:
          _body11 = _context17.sent;
          _context17.next = 26;
          return (0, _ledger2.encreption)(_body11);
        case 26:
          ledgerencrypted = _context17.sent;
          _context17.next = 29;
          return _ledger["default"].create(ledgerencrypted);
        case 29:
          createLedger = _context17.sent;
          if (!createLedger) {
            _context17.next = 39;
            break;
          }
          _context17.next = 33;
          return {
            uid: (0, _uniqid["default"])(),
            voucher_id: data.dataValues.uid,
            amount: voucher[i].amount,
            ledger_id: data.dataValues.uid,
            type: voucher[i].type,
            invoice_date: data.dataValues.invoice_date,
            status: 1,
            creation_date: new Date(),
            updated_date: new Date(),
            data: {
              email: key
            }
          };
        case 33:
          _body12 = _context17.sent;
          _context17.next = 36;
          return (0, _voucherEntries.encreptionVoucher)(_body12);
        case 36:
          _encrypted2 = _context17.sent;
          _context17.next = 39;
          return mainArray.push(_encrypted2);
        case 39:
          if (!(i === voucher.length - 1)) {
            _context17.next = 48;
            break;
          }
          _context17.next = 42;
          return _voucherInteries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 42:
          voucherAdd = _context17.sent;
          if (!voucherAdd) {
            _context17.next = 47;
            break;
          }
          return _context17.abrupt("return", 'true');
        case 47:
          return _context17.abrupt("return", 'false');
        case 48:
          i++;
          _context17.next = 3;
          break;
        case 51:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _updateVoucherInteries.apply(this, arguments);
}
exports.updateData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(t) {
              var itemData, taxData, voucherData, bankdata, companydata, updatedata, itemSuccess, taxSuccess, voucherSuccess, response;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    taxData = data.taxAdd;
                    voucherData = data.voucherAdd; // if(data.deleteItem.length>0){
                    //     await ItemInteries.destroy({where:{uid: {[Op.in]: [data.deleteItem]}}});
                    // }
                    delete data.itemAdd;
                    delete data.taxAdd;
                    delete data.voucherAdd;
                    delete data.deleteItem;
                    _context8.next = 10;
                    return data.is_bank;
                  case 10:
                    _context8.t1 = _context8.sent;
                    _context8.t0 = _context8.t1 === 'yes';
                    if (_context8.t0) {
                      _context8.next = 17;
                      break;
                    }
                    _context8.next = 15;
                    return data.is_bank;
                  case 15:
                    _context8.t2 = _context8.sent;
                    _context8.t0 = _context8.t2 === 'Yes';
                  case 17:
                    if (!_context8.t0) {
                      _context8.next = 34;
                      break;
                    }
                    _context8.next = 20;
                    return _ledger["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        is_default_bank: 'true'
                      }, {
                        company_id: data.company_id
                      }])
                    }, t);
                  case 20:
                    bankdata = _context8.sent;
                    if (!bankdata) {
                      _context8.next = 34;
                      break;
                    }
                    _context8.next = 24;
                    return {
                      email: data.data.email
                    };
                  case 24:
                    bankdata.dataValues.data = _context8.sent;
                    _context8.next = 27;
                    return bankdata.dataValues.bank_name;
                  case 27:
                    data.bank_name = _context8.sent;
                    _context8.next = 30;
                    return bankdata.dataValues.bank_account_number;
                  case 30:
                    data.bank_account_number = _context8.sent;
                    _context8.next = 33;
                    return bankdata.dataValues.ifsc;
                  case 33:
                    data.bank_ifsc = _context8.sent;
                  case 34:
                    _context8.next = 36;
                    return _company["default"].findOne({
                      where: {
                        uid: data.company_id
                      }
                    }, t);
                  case 36:
                    companydata = _context8.sent;
                    _context8.next = 39;
                    return _purchaseVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 39:
                    updatedata = _context8.sent;
                    if (!updatedata) {
                      _context8.next = 75;
                      break;
                    }
                    _context8.next = 43;
                    return updatedata.update(data);
                  case 43:
                    _context8.next = 45;
                    return _entry["default"].createData(data.company_id, _entryMessage["default"].purchase_update);
                  case 45:
                    if (!(itemData.length > 0)) {
                      _context8.next = 54;
                      break;
                    }
                    _context8.next = 48;
                    return _itemInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 48:
                    _context8.next = 50;
                    return updateItemInteries(itemData, updatedata, data.data.email, companydata, t);
                  case 50:
                    itemSuccess = _context8.sent;
                    if (itemSuccess) {
                      _context8.next = 54;
                      break;
                    }
                    _context8.next = 54;
                    return t.rollback();
                  case 54:
                    if (!(taxData.length > 0)) {
                      _context8.next = 63;
                      break;
                    }
                    _context8.next = 57;
                    return _taxInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 57:
                    _context8.next = 59;
                    return updateTaxInteries(taxData, updatedata, data.data.email, t, companydata);
                  case 59:
                    taxSuccess = _context8.sent;
                    if (taxSuccess) {
                      _context8.next = 63;
                      break;
                    }
                    _context8.next = 63;
                    return t.rollback();
                  case 63:
                    if (!(voucherData.length > 0)) {
                      _context8.next = 73;
                      break;
                    }
                    _context8.next = 66;
                    return _voucherInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 66:
                    _context8.next = 68;
                    return updateVoucherInteries(voucherData, updatedata, data.data.email, t, companydata);
                  case 68:
                    voucherSuccess = _context8.sent;
                    console.log(voucherSuccess, "itemSuccess = == = = ");
                    if (voucherSuccess) {
                      _context8.next = 73;
                      break;
                    }
                    _context8.next = 73;
                    return t.rollback();
                  case 73:
                    _context8.next = 77;
                    break;
                  case 75:
                    _context8.next = 77;
                    return t.rollback();
                  case 77:
                    _context8.next = 79;
                    return (0, _purchasevoucher.decreptionPurchase)(updatedata, 'object', data.data.email);
                  case 79:
                    response = _context8.sent;
                    return _context8.abrupt("return", response);
                  case 81:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x49) {
              return _ref9.apply(this, arguments);
            };
          }());
        case 3:
          result = _context9.sent;
          if (!result) {
            _context9.next = 8;
            break;
          }
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher Created Successfully",
            PurchaseVoucher: result
          });
        case 8:
          _context9.next = 10;
          return transaction.rollback();
        case 10:
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context9.t0,
            message: "Something went wrong!"
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return function (_x46, _x47, _x48) {
    return _ref8.apply(this, arguments);
  };
}();
exports.cancelData = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id, data, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _database.sequelize.transaction( /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(t) {
              var updatedata, response;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    data.updated_date = new Date();
                    data.status = 0;
                    data.buyer_ledger_id = '';
                    data.narration = '';
                    data.is_local = '';
                    data.bank_name = '';
                    data.bank_account_number = '';
                    data.bank_ifsc = '';
                    data.is_bank = '';
                    data.shipping_address = '';
                    data.description = '';
                    data.discount_type = '';
                    data.discount_ledger = '';
                    data.discount_percentage = '';
                    data.sub_amount = '0';
                    data.discount = '0';
                    data.total_amount = '0';
                    data.roundoff_ledger_id = '';
                    data.roundoff_value = '0';
                    _context10.next = 21;
                    return (0, _purchasevoucher.encreptionPurchase)(data, data.data.email);
                  case 21:
                    data = _context10.sent;
                    _context10.next = 24;
                    return _purchaseVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 24:
                    updatedata = _context10.sent;
                    if (!updatedata) {
                      _context10.next = 37;
                      break;
                    }
                    delete data.invoice_id;
                    _context10.next = 29;
                    return updatedata.update(data);
                  case 29:
                    _context10.next = 31;
                    return _itemInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 31:
                    _context10.next = 33;
                    return _taxInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 33:
                    _context10.next = 35;
                    return _voucherInteries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 35:
                    _context10.next = 39;
                    break;
                  case 37:
                    _context10.next = 39;
                    return t.rollback();
                  case 39:
                    _context10.next = 41;
                    return (0, _purchasevoucher.decreptionPurchase)(updatedata, 'object', data.data.email);
                  case 41:
                    response = _context10.sent;
                    return _context10.abrupt("return", response);
                  case 43:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x53) {
              return _ref11.apply(this, arguments);
            };
          }());
        case 3:
          result = _context11.sent;
          if (!result) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "PurchaseVoucher Cancel Successfully",
            PurchaseVoucher: result
          });
        case 8:
          _context11.next = 10;
          return transaction.rollback();
        case 10:
          _context11.next = 16;
          break;
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context11.t0,
            message: "Something went wrong!"
          });
        case 16:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 12]]);
  }));
  return function (_x50, _x51, _x52) {
    return _ref10.apply(this, arguments);
  };
}();