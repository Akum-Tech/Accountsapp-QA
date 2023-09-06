"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _company = _interopRequireDefault(require("../models/company"));
var _users = _interopRequireDefault(require("../models/users"));
var _entries = _interopRequireDefault(require("../models/entries"));
var _accountGroup = _interopRequireDefault(require("../models/accountGroup"));
var _stockGroup = _interopRequireDefault(require("../models/stockGroup"));
var _statusCode = require("../utility/statusCode");
var _states = _interopRequireDefault(require("../models/states"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _company_account_group = _interopRequireDefault(require("../models/company_account_group"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _fs = _interopRequireDefault(require("fs"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _entry = _interopRequireDefault(require("../utility/entry"));
var _ledger = _interopRequireDefault(require("../models/ledger"));
var _config = _interopRequireDefault(require("../constant/config"));
var _company2 = require("../security/company");
var _ledger2 = require("../security/ledger");
require("@babel/polyfill");
var _recieptVoucher = _interopRequireDefault(require("../models/recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("../models/paymentVoucher"));
var _journalVoucher = _interopRequireDefault(require("../models/journalVoucher"));
var _saleVoucher = _interopRequireDefault(require("../models/saleVoucher"));
var _creditVoucher = _interopRequireDefault(require("../models/creditVoucher"));
var _debitVoucher = _interopRequireDefault(require("../models/debitVoucher"));
var _purchaseVoucher = _interopRequireDefault(require("../models/purchaseVoucher"));
var _items = _interopRequireDefault(require("../models/items"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
          return _company["default"].findOne({
            where: {
              uid: id
            },
            include: [{
              model: _users["default"]
            }, {
              model: _entries["default"]
            }]
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 11;
            break;
          }
          _context.next = 7;
          return (0, _company2.decreption)(createdata, "object", data.data.email);
        case 7:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company fetch Successfully",
            company: response
          });
        case 11:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company not Found!",
            company: {}
          });
        case 12:
          _context.next = 22;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          _context.next = 19;
          return (0, _statusCode.checkCode)("error");
        case 19:
          _context.t1 = _context.sent;
          _context.t2 = _context.t0;
          return _context.abrupt("return", {
            statusCode: _context.t1,
            success: false,
            error: _context.t2,
            message: "Something went wrong!"
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _company["default"].findAll({
            where: {
              user_id: data.data.uid
            },
            include: [{
              model: _cities["default"],
              attributes: ["name"],
              include: [{
                model: _states["default"],
                attributes: ["name"]
              }]
            }, {
              model: _entries["default"]
            }],
            order: [['id', 'ASC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          createdata = _context3.sent;
          if (!(createdata.length > 0)) {
            _context3.next = 15;
            break;
          }
          console.log('createdata', createdata);
          console.log('email', data.data.email);
          _context3.next = 9;
          return (0, _company2.decreption)(createdata, "array", data.data.email);
        case 9:
          response = _context3.sent;
          _context3.next = 12;
          return response.forEach( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(element) {
              var ledgerbody3, find;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _ledger2.encreption)({
                      uid: (0, _uniqid["default"])(),
                      name: 'Round Off',
                      company_id: element.uid,
                      account_group_id: _config["default"].indirect_Expenses_id,
                      opening_balance: 'debit',
                      registration_type: 'Regular',
                      status: 1,
                      period_start: element.current_period_start,
                      period_end: element.current_period_end,
                      cess: false,
                      amount: '0',
                      data: {
                        email: data.data.email
                      }
                    });
                  case 2:
                    ledgerbody3 = _context2.sent;
                    if (!ledgerbody3) {
                      _context2.next = 8;
                      break;
                    }
                    _context2.next = 6;
                    return _ledger["default"].findOne({
                      where: {
                        name: ledgerbody3.name,
                        company_id: ledgerbody3.company_id
                      }
                    });
                  case 6:
                    find = _context2.sent;
                    if (!find) {
                      _ledger["default"].create(ledgerbody3);
                    }
                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x6) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 12:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company fetch Successfully",
            company: response
          });
        case 15:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company not Found!",
            company: createdata ? createdata : []
          });
        case 16:
          _context3.next = 26;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          _context3.next = 23;
          return (0, _statusCode.checkCode)("error");
        case 23:
          _context3.t1 = _context3.sent;
          _context3.t2 = _context3.t0.message;
          return _context3.abrupt("return", {
            statusCode: _context3.t1,
            success: false,
            error: _context3.t2,
            message: "Something went wrong!"
          });
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, res) {
    var checkdata, response, dummydate, dummymonth, yearend, yearstart, finaldatestart, finaldateend, createdata, ledgerbody, ledgerbody1, ledgerbody3, ledgerbody4, stockObj, stockcreate, _response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(new Date() >= new Date(data.financial_year))) {
            _context4.next = 66;
            break;
          }
          data.user_id = data.data.uid;
          _context4.next = 5;
          return _company["default"].findOne({
            where: {
              company_name: data.company_name,
              user_id: data.data.uid
            }
          });
        case 5:
          checkdata = _context4.sent;
          if (!checkdata) {
            _context4.next = 13;
            break;
          }
          _context4.next = 9;
          return (0, _company2.decreption)(checkdata, "object", data.data.email);
        case 9:
          response = _context4.sent;
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Already Exist!",
            company: response
          });
        case 13:
          _context4.next = 15;
          return (0, _uniqid["default"])();
        case 15:
          data.uid = _context4.sent;
          data.creation_date = new Date();
          data.updated_date = new Date();
          dummydate = new Date(data.financial_year);
          dummymonth = dummydate.getMonth() + 1;
          if (dummymonth == 1 || dummymonth == 2 || dummymonth == 3) {
            yearend = Number(dummydate.getFullYear());
            yearstart = Number(dummydate.getFullYear()) - 1;
          } else {
            yearend = Number(dummydate.getFullYear()) + 1;
            yearstart = Number(dummydate.getFullYear());
          }
          finaldatestart = "04-01-" + yearstart;
          finaldateend = "03-31-" + yearend;
          data.financial_start = finaldatestart;
          data.financial_end = finaldateend;
          data.current_period_start = finaldatestart;
          data.current_period_end = finaldateend;
          data.bookstart_date = data.financial_year;
          _context4.next = 30;
          return _company["default"].create(data);
        case 30:
          createdata = _context4.sent;
          if (!createdata) {
            _context4.next = 63;
            break;
          }
          _context4.next = 34;
          return (0, _ledger2.encreption)({
            uid: (0, _uniqid["default"])(),
            name: 'Cash',
            company_id: createdata.dataValues.uid,
            account_group_id: _config["default"]["case"],
            opening_balance: 'debit',
            registration_type: 'Regular',
            status: 1,
            period_start: createdata.dataValues.current_period_start,
            period_end: createdata.dataValues.current_period_end,
            cess: false,
            amount: '0',
            is_auto: true,
            data: {
              email: data.data.email
            }
          });
        case 34:
          ledgerbody = _context4.sent;
          if (ledgerbody) {
            _ledger["default"].create(ledgerbody);
          }
          _context4.next = 38;
          return (0, _ledger2.encreption)({
            uid: (0, _uniqid["default"])(),
            name: 'Opening Stock',
            company_id: createdata.dataValues.uid,
            account_group_id: _config["default"].stockinhand_id,
            opening_balance: 'debit',
            registration_type: 'Regular',
            status: 1,
            period_start: createdata.dataValues.current_period_start,
            period_end: createdata.dataValues.current_period_end,
            cess: false,
            amount: '0',
            is_auto: true,
            data: {
              email: data.data.email
            }
          });
        case 38:
          ledgerbody1 = _context4.sent;
          if (ledgerbody1) {
            _ledger["default"].create(ledgerbody1);
          }
          _context4.next = 42;
          return (0, _ledger2.encreption)({
            uid: (0, _uniqid["default"])(),
            name: 'Round Off',
            company_id: createdata.dataValues.uid,
            account_group_id: _config["default"].indirect_Expenses_id,
            opening_balance: 'debit',
            registration_type: 'Regular',
            status: 1,
            period_start: createdata.dataValues.current_period_start,
            period_end: createdata.dataValues.current_period_end,
            cess: false,
            amount: '0',
            is_auto: true,
            data: {
              email: data.data.email
            }
          });
        case 42:
          ledgerbody3 = _context4.sent;
          if (ledgerbody3) {
            _ledger["default"].create(ledgerbody3);
          }
          _context4.next = 46;
          return (0, _ledger2.encreption)({
            uid: (0, _uniqid["default"])(),
            name: 'Profit & Loss A/c',
            company_id: createdata.dataValues.uid,
            account_group_id: _config["default"].profit_loss_id,
            opening_balance: 'credit',
            registration_type: 'Regular',
            status: 1,
            period_start: createdata.dataValues.current_period_start,
            period_end: createdata.dataValues.current_period_end,
            cess: false,
            amount: '0',
            is_auto: true,
            data: {
              email: data.data.email
            }
          });
        case 46:
          ledgerbody4 = _context4.sent;
          if (ledgerbody4) {
            _ledger["default"].create(ledgerbody4);
          }
          _context4.next = 50;
          return (0, _uniqid["default"])();
        case 50:
          _context4.t0 = _context4.sent;
          _context4.t1 = createdata.dataValues.uid;
          stockObj = {
            uid: _context4.t0,
            stock_name: "Primary",
            company_id: _context4.t1
          };
          _context4.next = 55;
          return _stockGroup["default"].create(stockObj);
        case 55:
          stockcreate = _context4.sent;
          _entry["default"].createData(createdata.dataValues.uid, _entryMessage["default"].company_create);
          _context4.next = 59;
          return (0, _company2.decreption)(createdata, "object", data.data.email);
        case 59:
          _response = _context4.sent;
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company Created Successfully",
            company: _response
          });
        case 63:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "company not created",
            company: createdata
          });
        case 64:
          _context4.next = 67;
          break;
        case 66:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Financial Year not greater then today date",
            company: {}
          });
        case 67:
          _context4.next = 77;
          break;
        case 69:
          _context4.prev = 69;
          _context4.t2 = _context4["catch"](0);
          console.log(_context4.t2);
          _context4.next = 74;
          return (0, _statusCode.checkCode)("error");
        case 74:
          _context4.t3 = _context4.sent;
          _context4.t4 = _context4.t2.message;
          return _context4.abrupt("return", {
            statusCode: _context4.t3,
            success: false,
            error: _context4.t4,
            message: "Something went wrong!"
          });
        case 77:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 69]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, res) {
    var findReciept, findPaymentVoucher, findJournalVoucher, findSaleVoucher, findCreditVoucher, findDebitVoucher, findPurchaseVoucher, findItem, deletedata, deleteComapnydata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _recieptVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 3:
          findReciept = _context5.sent;
          _context5.next = 6;
          return _paymentVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 6:
          findPaymentVoucher = _context5.sent;
          _context5.next = 9;
          return _journalVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 9:
          findJournalVoucher = _context5.sent;
          _context5.next = 12;
          return _saleVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 12:
          findSaleVoucher = _context5.sent;
          _context5.next = 15;
          return _creditVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 15:
          findCreditVoucher = _context5.sent;
          _context5.next = 18;
          return _debitVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 18:
          findDebitVoucher = _context5.sent;
          _context5.next = 21;
          return _purchaseVoucher["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 21:
          findPurchaseVoucher = _context5.sent;
          _context5.next = 24;
          return _items["default"].findOne({
            where: {
              company_id: id
            }
          });
        case 24:
          findItem = _context5.sent;
          if (!(findReciept || findPaymentVoucher || findJournalVoucher || findSaleVoucher || findCreditVoucher || findDebitVoucher || findPurchaseVoucher || findItem)) {
            _context5.next = 27;
            break;
          }
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "you can not delete Company!",
            Ledger: {}
          });
        case 27:
          _context5.next = 29;
          return _company_account_group["default"].destroy({
            where: {
              company_id: id
            }
          });
        case 29:
          deletedata = _context5.sent;
          _context5.next = 32;
          return _company["default"].destroy({
            where: {
              uid: id
            }
          });
        case 32:
          deleteComapnydata = _context5.sent;
          if (!deleteComapnydata) {
            _context5.next = 37;
            break;
          }
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company Delete Successfully",
            company: deletedata
          });
        case 37:
          _context5.next = 39;
          return (0, _statusCode.checkCode)("error");
        case 39:
          _context5.t0 = _context5.sent;
          _context5.t1 = deletedata;
          return _context5.abrupt("return", {
            statusCode: _context5.t0,
            success: false,
            message: "Something went wrong!",
            company: _context5.t1
          });
        case 42:
          _context5.next = 51;
          break;
        case 44:
          _context5.prev = 44;
          _context5.t2 = _context5["catch"](0);
          _context5.next = 48;
          return (0, _statusCode.checkCode)("error");
        case 48:
          _context5.t3 = _context5.sent;
          _context5.t4 = _context5.t2;
          return _context5.abrupt("return", {
            statusCode: _context5.t3,
            success: false,
            error: _context5.t4,
            message: "Something went wrong!"
          });
        case 51:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 44]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, data, res) {
    var finddata, updatedata, response;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          data.user_id = data.data.uid;
          _context6.next = 4;
          return _company["default"].findOne({
            where: {
              uid: id
            }
          });
        case 4:
          finddata = _context6.sent;
          if (!finddata) {
            _context6.next = 24;
            break;
          }
          data.updated_date = new Date();
          _context6.next = 9;
          return finddata.update(data);
        case 9:
          updatedata = _context6.sent;
          if (!updatedata) {
            _context6.next = 17;
            break;
          }
          _context6.next = 13;
          return (0, _company2.decreption)(updatedata, "object", data.data.email);
        case 13:
          response = _context6.sent;
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company update Successfully",
            company: response
          });
        case 17:
          _context6.next = 19;
          return (0, _statusCode.checkCode)("error");
        case 19:
          _context6.t0 = _context6.sent;
          _context6.t1 = {};
          return _context6.abrupt("return", {
            statusCode: _context6.t0,
            success: false,
            message: "Something went wrong!",
            company: _context6.t1
          });
        case 22:
          _context6.next = 25;
          break;
        case 24:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Company not found!",
            company: {}
          });
        case 25:
          _context6.next = 34;
          break;
        case 27:
          _context6.prev = 27;
          _context6.t2 = _context6["catch"](0);
          _context6.next = 31;
          return (0, _statusCode.checkCode)("error");
        case 31:
          _context6.t3 = _context6.sent;
          _context6.t4 = _context6.t2;
          return _context6.abrupt("return", {
            statusCode: _context6.t3,
            success: false,
            error: _context6.t4,
            message: "Something went wrong!"
          });
        case 34:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 27]]);
  }));
  return function (_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updatePeriodDate = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var dummydate, dummymonth, yearend, yearstart, finaldatestart, finaldateend, finddata, updatedata, response;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          data.user_id = data.data.uid;
          if (!(new Date() >= new Date(data.current_period_start) && new Date(data.current_period_start) >= new Date(data.financial_start))) {
            _context7.next = 34;
            break;
          }
          dummydate = new Date(data.current_period_start);
          dummymonth = dummydate.getMonth() + 1;
          if (dummymonth == 1 || dummymonth == 2 || dummymonth == 3) {
            // if(dummydate.getFullYear()){

            // }
            yearend = Number(dummydate.getFullYear());
            yearstart = Number(dummydate.getFullYear()) - 1;
          } else {
            yearend = Number(dummydate.getFullYear()) + 1;
            yearstart = Number(dummydate.getFullYear());
          }
          finaldatestart = "04-01-" + yearstart;
          finaldateend = "03-31-" + yearend;
          data.current_period_start = finaldatestart;
          data.current_period_end = finaldateend;
          _context7.next = 12;
          return _company["default"].findOne({
            where: {
              uid: data.uid
            }
          });
        case 12:
          finddata = _context7.sent;
          if (!finddata) {
            _context7.next = 31;
            break;
          }
          _context7.next = 16;
          return finddata.update(data);
        case 16:
          updatedata = _context7.sent;
          if (!updatedata) {
            _context7.next = 24;
            break;
          }
          _context7.next = 20;
          return (0, _company2.decreption)(updatedata, "object", data.data.email);
        case 20:
          response = _context7.sent;
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Company update Successfully",
            company: response
          });
        case 24:
          _context7.next = 26;
          return (0, _statusCode.checkCode)("error");
        case 26:
          _context7.t0 = _context7.sent;
          _context7.t1 = updatedata;
          return _context7.abrupt("return", {
            statusCode: _context7.t0,
            success: false,
            message: "Something went wrong!",
            company: _context7.t1
          });
        case 29:
          _context7.next = 32;
          break;
        case 31:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Company not found!",
            company: finddata ? finddata : {}
          });
        case 32:
          _context7.next = 35;
          break;
        case 34:
          return _context7.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Current period date less then current date and grater the financial year",
            company: {}
          });
        case 35:
          _context7.next = 44;
          break;
        case 37:
          _context7.prev = 37;
          _context7.t2 = _context7["catch"](0);
          _context7.next = 41;
          return (0, _statusCode.checkCode)("error");
        case 41:
          _context7.t3 = _context7.sent;
          _context7.t4 = _context7.t2;
          return _context7.abrupt("return", {
            statusCode: _context7.t3,
            success: false,
            error: _context7.t4,
            message: "Something went wrong!"
          });
        case 44:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 37]]);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateMaualstock = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data, res) {
    var finddata, updatedata, response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          data.user_id = data.data.uid;
          if (!(new Date() >= new Date(data.current_period_start) && new Date(data.current_period_start) >= new Date(data.financial_start))) {
            _context8.next = 27;
            break;
          }
          _context8.next = 5;
          return _company["default"].findOne({
            where: {
              uid: data.uid
            }
          });
        case 5:
          finddata = _context8.sent;
          if (!finddata) {
            _context8.next = 24;
            break;
          }
          _context8.next = 9;
          return finddata.update(data);
        case 9:
          updatedata = _context8.sent;
          if (!updatedata) {
            _context8.next = 17;
            break;
          }
          _context8.next = 13;
          return (0, _company2.decreption)(updatedata, "object", data.data.email);
        case 13:
          response = _context8.sent;
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "manula stock update Successfully",
            company: response
          });
        case 17:
          _context8.next = 19;
          return (0, _statusCode.checkCode)("error");
        case 19:
          _context8.t0 = _context8.sent;
          _context8.t1 = updatedata;
          return _context8.abrupt("return", {
            statusCode: _context8.t0,
            success: false,
            message: "Something went wrong!",
            company: _context8.t1
          });
        case 22:
          _context8.next = 25;
          break;
        case 24:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Company not found!",
            company: finddata ? finddata : {}
          });
        case 25:
          _context8.next = 28;
          break;
        case 27:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Current period date less then current date and grater the financial year",
            company: {}
          });
        case 28:
          _context8.next = 37;
          break;
        case 30:
          _context8.prev = 30;
          _context8.t2 = _context8["catch"](0);
          _context8.next = 34;
          return (0, _statusCode.checkCode)("error");
        case 34:
          _context8.t3 = _context8.sent;
          _context8.t4 = _context8.t2;
          return _context8.abrupt("return", {
            statusCode: _context8.t3,
            success: false,
            error: _context8.t4,
            message: "Something went wrong!"
          });
        case 37:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 30]]);
  }));
  return function (_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();