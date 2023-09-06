"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _itemStockVoucher = _interopRequireDefault(require("../models/itemStockVoucher"));
var _company = _interopRequireDefault(require("../models/company"));
var _item_stock_voucher_entries = _interopRequireDefault(require("../models/item_stock_voucher_entries"));
var _states = _interopRequireDefault(require("../models/states"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _database = require("../database/database");
var _config = _interopRequireDefault(require("../constant/config"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _itemEntries = require("../security/itemEntries");
var _entry = _interopRequireDefault(require("../utility/entry"));
var _purpose = _interopRequireDefault(require("../models/purpose"));
var _journalvoucher = require("../security/journalvoucher");
var _journalEntries = require("../security/journalEntries");
var _arraySort = _interopRequireDefault(require("array-sort"));
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
function addStockItemInteries(_x, _x2, _x3, _x4) {
  return _addStockItemInteries.apply(this, arguments);
}
function _addStockItemInteries() {
  _addStockItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(array, data, key, trans) {
    var items, mainArray, i, body, encypted, itemInteries;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          items = array;
          mainArray = [];
          i = 0;
        case 3:
          if (!(i < items.length)) {
            _context12.next = 42;
            break;
          }
          _context12.next = 6;
          return (0, _uniqid["default"])();
        case 6:
          _context12.t0 = _context12.sent;
          _context12.t1 = data.dataValues.uid;
          _context12.t2 = data.dataValues.company_id;
          _context12.t3 = items[i].item_id;
          _context12.t4 = items[i].quantity;
          _context12.t5 = items[i].name;
          _context12.t6 = items[i].description;
          _context12.t7 = items[i].hsn_code;
          _context12.t8 = items[i].unit;
          _context12.t9 = items[i].price.toString();
          _context12.t10 = items[i].discount.toString();
          _context12.t11 = items[i].discount_type;
          _context12.t12 = items[i].total_amount.toString();
          _context12.t13 = items[i].igst_tax;
          _context12.t14 = items[i].type;
          _context12.t15 = data.dataValues.invoice_date;
          _context12.t16 = new Date();
          _context12.t17 = new Date();
          _context12.t18 = {
            email: key
          };
          body = {
            uid: _context12.t0,
            voucher_id: _context12.t1,
            company_id: _context12.t2,
            item_id: _context12.t3,
            quantity: _context12.t4,
            name: _context12.t5,
            description: _context12.t6,
            model: "",
            hsn_code: _context12.t7,
            unit: _context12.t8,
            price: _context12.t9,
            discount: _context12.t10,
            discount_type: _context12.t11,
            total_amount: _context12.t12,
            igst_tax: _context12.t13,
            type: _context12.t14,
            invoice_date: _context12.t15,
            status: 1,
            creation_date: _context12.t16,
            updated_date: _context12.t17,
            data: _context12.t18
          };
          _context12.next = 28;
          return (0, _itemEntries.encreptionItem)(body);
        case 28:
          encypted = _context12.sent;
          mainArray.push(encypted);
          if (!(i === items.length - 1)) {
            _context12.next = 39;
            break;
          }
          _context12.next = 33;
          return _item_stock_voucher_entries["default"].bulkCreate(mainArray, {
            transaction: trans
          });
        case 33:
          itemInteries = _context12.sent;
          if (!itemInteries) {
            _context12.next = 38;
            break;
          }
          return _context12.abrupt("return", "true");
        case 38:
          return _context12.abrupt("return", "false");
        case 39:
          i++;
          _context12.next = 3;
          break;
        case 42:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
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
            },
            // {
            //   model: Purpose
            // },
            {
              model: _item_stock_voucher_entries["default"]
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
            message: "ItemStockVoucher fetch Successfully",
            ItemStockVoucher: response
          });
        case 12:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStockVoucher not Found!",
            ItemStockVoucher: createdata ? createdata : {}
          });
        case 13:
          _context.next = 19;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log("error", _context.t0);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function (_x5, _x6, _x7) {
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
          return _itemStockVoucher["default"].findOne({
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
          return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher fetch Successfully",
            ItemStockVoucher: response
          });
        case 11:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStockVoucher not Found!",
            ItemStockVoucher: createdata ? createdata : {}
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
  return function (_x8, _x9) {
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
          return _itemStockVoucher["default"].findAll({
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
              model: ItemStockInteries,
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
          createdata = _context3.sent;
          if (!(createdata.length > 0)) {
            _context3.next = 15;
            break;
          }
          _context3.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata, "array", data.data.email);
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
            message: "ItemStockVoucher fetch Successfully",
            ItemStockVoucher: response
          });
        case 15:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStockVoucher not Found!",
            ItemStockVoucher: createdata ? createdata : []
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
  return function (_x10, _x11) {
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
          return _itemStockVoucher["default"].findAndCountAll({
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
          createdata = _context4.sent;
          if (!(createdata.rows.length > 0)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 7;
          return (0, _journalvoucher.decreptionJournal)(createdata.rows, "array", data.data.email);
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
            message: "ItemStockVoucher fetch Successfully",
            ItemStockVoucher: response,
            Count: createdata.count
          });
        case 15:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStockVoucher not Found!",
            ItemStockVoucher: createdata.rows.length > 0 ? createdata : []
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
  return function (_x12, _x13) {
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
              var count, checkYear, _where3, updateCount, _count, _checkYear, finddate, _updateCount, _updateCount2, _count2, _checkYear2, itemData, createdata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!data.is_after) {
                      _context5.next = 22;
                      break;
                    }
                    _context5.next = 3;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        uid: data.after_id
                      }])
                    }, t);
                  case 3:
                    count = _context5.sent;
                    _context5.next = 6;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
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
                    return _itemStockVoucher["default"].update({
                      invoice_id: _sequelize["default"].literal("invoice_id+1")
                    }, {
                      where: (_where3 = {}, _defineProperty(_where3, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
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
                    return _itemStockVoucher["default"].findOne({
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
                    return _itemStockVoucher["default"].findOne({
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
                    return _itemStockVoucher["default"].findOne({
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
                    return _itemStockVoucher["default"].update({
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
                    return _itemStockVoucher["default"].update({
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
                    return _itemStockVoucher["default"].count({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
                      }])
                    });
                  case 65:
                    _count2 = _context5.sent;
                    _context5.next = 68;
                    return _itemStockVoucher["default"].findOne({
                      where: _defineProperty({}, Op.and, [{
                        current_year: data.current_year
                      }, {
                        end_year: data.end_year
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
                    itemData = data.itemAdd;
                    console.log("data", data);
                    delete data.itemAdd;
                    _context5.next = 88;
                    return _itemStockVoucher["default"].create(data, {
                      transaction: t
                    });
                  case 88:
                    createdata = _context5.sent;
                    if (!createdata) {
                      _context5.next = 114;
                      break;
                    }
                    _context5.prev = 90;
                    _entry["default"].createData(data.company_id, _entryMessage["default"].journal_create);
                    _context5.next = 99;
                    break;
                  case 94:
                    _context5.prev = 94;
                    _context5.t3 = _context5["catch"](90);
                    _context5.next = 98;
                    return t.rollback();
                  case 98:
                    return _context5.abrupt("return", false);
                  case 99:
                    if (!(itemData.length > 0)) {
                      _context5.next = 108;
                      break;
                    }
                    _context5.next = 102;
                    return _item_stock_voucher_entries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 102:
                    _context5.next = 104;
                    return addStockItemInteries(itemData, createdata, data.data.email, t);
                  case 104:
                    itemSuccess = _context5.sent;
                    if (itemSuccess) {
                      _context5.next = 108;
                      break;
                    }
                    _context5.next = 108;
                    return t.rollback();
                  case 108:
                    _context5.next = 110;
                    return (0, _journalvoucher.decreptionJournal)(createdata, "object", data.data.email);
                  case 110:
                    reponse = _context5.sent;
                    return _context5.abrupt("return", reponse);
                  case 114:
                    _context5.next = 116;
                    return t.rollback();
                  case 116:
                    return _context5.abrupt("return", false);
                  case 117:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[90, 94]]);
            }));
            return function (_x16) {
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
            message: "ItemStockVoucher Created Successfully",
            JournalVoucher: result
          });
        case 8:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStockVoucher Not Created",
            JournalVoucher: []
          });
        case 9:
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0.message,
            message: "Something went wrong-!"
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function (_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, data, res) {
    var find, _where11, updateCount, deleteInteries, deletedata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _itemStockVoucher["default"].findOne({
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
          return _itemStockVoucher["default"].update({
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
          return _item_stock_voucher_entries["default"].destroy({
            where: {
              voucher_id: id
            }
          });
        case 10:
          deleteInteries = _context7.sent;
          _context7.next = 13;
          return _itemStockVoucher["default"].destroy({
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
            message: "ItemStockVoucher Delete Successfully",
            ItemStockVoucher: deletedata
          });
        case 18:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not delete please try later!",
            ItemStockVoucher: {}
          });
        case 19:
          _context7.next = 22;
          break;
        case 21:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Voucher not found!",
            ItemStockVoucher: {}
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
  return function (_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
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
              var itemData, updatedata, itemSuccess, reponse;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    data.invoice_date = data.invoice_date;
                    data.updated_date = new Date();
                    itemData = data.itemAdd;
                    delete data.itemAdd;
                    _context8.next = 6;
                    return _itemStockVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 6:
                    updatedata = _context8.sent;
                    if (!updatedata) {
                      _context8.next = 28;
                      break;
                    }
                    delete data.invoice_id;
                    _context8.next = 11;
                    return updatedata.update(data);
                  case 11:
                    _context8.next = 13;
                    return _entry["default"].createData(data.company_id, _entryMessage["default"].stock_voucher_update);
                  case 13:
                    if (!(itemData.length > 0)) {
                      _context8.next = 22;
                      break;
                    }
                    _context8.next = 16;
                    return _item_stock_voucher_entries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 16:
                    _context8.next = 18;
                    return updateStockItemInteries(itemData, updatedata, data.data.email, t);
                  case 18:
                    itemSuccess = _context8.sent;
                    if (itemSuccess) {
                      _context8.next = 22;
                      break;
                    }
                    _context8.next = 22;
                    return t.rollback();
                  case 22:
                    _context8.next = 24;
                    return (0, _journalvoucher.decreptionJournal)(updatedata, "object", data.data.email);
                  case 24:
                    reponse = _context8.sent;
                    return _context8.abrupt("return", reponse);
                  case 28:
                    _context8.next = 30;
                    return t.rollback();
                  case 30:
                    return _context8.abrupt("return", false);
                  case 31:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x23) {
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
            message: "ItemStockVoucher Update Successfully",
            JournalVoucher: result
          });
        case 8:
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStockVoucher Not Created",
            JournalVoucher: []
          });
        case 9:
          _context9.next = 15;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context9.t0.message,
            message: "Something went wrong!"
          });
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 11]]);
  }));
  return function (_x20, _x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}();
function updateStockItemInteries(_x24, _x25, _x26, _x27) {
  return _updateStockItemInteries.apply(this, arguments);
}
function _updateStockItemInteries() {
  _updateStockItemInteries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(array, data, key, trans) {
    var items, i, body, obj, finddata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          items = array;
          i = 0;
        case 2:
          if (!(i < items.length)) {
            _context13.next = 48;
            break;
          }
          if (!items[i].uid) {
            _context13.next = 7;
            break;
          }
          _context13.t0 = items[i].uid;
          _context13.next = 10;
          break;
        case 7:
          _context13.next = 9;
          return (0, _uniqid["default"])();
        case 9:
          _context13.t0 = _context13.sent;
        case 10:
          _context13.t1 = _context13.t0;
          _context13.t2 = items[i].voucher_id ? items[i].voucher_id : data.dataValues.uid;
          _context13.t3 = items[i].company_id ? items[i].company_id : data.dataValues.company_id;
          _context13.t4 = items[i].item_id;
          _context13.t5 = items[i].quantity ? items[i].quantity : '0';
          _context13.t6 = items[i].name ? items[i].name : '';
          _context13.t7 = items[i].description ? items[i].description : '';
          _context13.t8 = items[i].hsn_code ? items[i].hsn_code : '';
          _context13.t9 = items[i].unit ? items[i].unit : '';
          _context13.t10 = items[i].price ? items[i].price.toString() : '0';
          _context13.t11 = items[i].discount ? items[i].discount.toString() : '0';
          _context13.t12 = items[i].discount_type ? items[i].discount_type : '';
          _context13.t13 = items[i].total_amount ? items[i].total_amount.toString() : '0';
          _context13.t14 = items[i].igst_tax ? items[i].igst_tax : '';
          _context13.t15 = items[i].type ? items[i].type : '';
          _context13.t16 = items[i].invoice_date ? items[i].invoice_date : data.dataValues.invoice_date;
          _context13.t17 = items[i].creation_date ? items[i].creation_date : new Date();
          _context13.t18 = new Date();
          _context13.t19 = {
            email: key
          };
          body = {
            uid: _context13.t1,
            voucher_id: _context13.t2,
            company_id: _context13.t3,
            item_id: _context13.t4,
            quantity: _context13.t5,
            name: _context13.t6,
            description: _context13.t7,
            model: "",
            hsn_code: _context13.t8,
            unit: _context13.t9,
            price: _context13.t10,
            discount: _context13.t11,
            discount_type: _context13.t12,
            total_amount: _context13.t13,
            igst_tax: _context13.t14,
            type: _context13.t15,
            invoice_date: _context13.t16,
            status: 1,
            creation_date: _context13.t17,
            updated_date: _context13.t18,
            data: _context13.t19
          };
          _context13.next = 32;
          return (0, _itemEntries.encreptionItem)(body);
        case 32:
          obj = _context13.sent;
          _context13.next = 35;
          return _item_stock_voucher_entries["default"].findOne({
            where: {
              uid: obj.uid,
              voucher_id: obj.voucher_id
            }
          }, trans);
        case 35:
          finddata = _context13.sent;
          if (!finddata) {
            _context13.next = 41;
            break;
          }
          _context13.next = 39;
          return finddata.update(obj);
        case 39:
          _context13.next = 43;
          break;
        case 41:
          _context13.next = 43;
          return _item_stock_voucher_entries["default"].create(obj, trans);
        case 43:
          if (!(i === items.length - 1)) {
            _context13.next = 45;
            break;
          }
          return _context13.abrupt("return", true);
        case 45:
          i++;
          _context13.next = 2;
          break;
        case 48:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _updateStockItemInteries.apply(this, arguments);
}
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
                    data.ledger_id = '';
                    data.purpose_id = 0;
                    data.narration = '';
                    data.type = '';
                    data.total_amount = '0';
                    _context10.next = 9;
                    return (0, _journalvoucher.encreptionJournal)(data, data.data.email);
                  case 9:
                    data = _context10.sent;
                    _context10.next = 12;
                    return _itemStockVoucher["default"].findOne({
                      where: {
                        uid: data.uid
                      }
                    }, t);
                  case 12:
                    updatedata = _context10.sent;
                    if (!updatedata) {
                      _context10.next = 21;
                      break;
                    }
                    delete data.invoice_id;
                    _context10.next = 17;
                    return updatedata.update(data);
                  case 17:
                    _context10.next = 19;
                    return _item_stock_voucher_entries["default"].destroy({
                      where: {
                        voucher_id: data.uid
                      }
                    });
                  case 19:
                    _context10.next = 23;
                    break;
                  case 21:
                    _context10.next = 23;
                    return t.rollback();
                  case 23:
                    _context10.next = 25;
                    return (0, _journalvoucher.decreptionJournal)(updatedata, 'object', data.data.email);
                  case 25:
                    response = _context10.sent;
                    return _context10.abrupt("return", response);
                  case 27:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x31) {
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
            message: "ItemStockVoucher Cancel Successfully",
            ItemStockVoucher: result
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
  return function (_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();