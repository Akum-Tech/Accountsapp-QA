"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _manualCosingStock = _interopRequireDefault(require("../models/manualCosingStock"));
var _statusCode = require("../utility/statusCode");
var _sequelize = _interopRequireDefault(require("sequelize"));
var _uniqid = _interopRequireDefault(require("uniqid"));
var _fs = _interopRequireDefault(require("fs"));
var _entryMessage = _interopRequireDefault(require("../constant/entryMessage"));
var _config = _interopRequireDefault(require("../constant/config"));
var _manualClosingStock = require("../security/manualClosingStock");
require("@babel/polyfill");
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
          return _manualCosingStock["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 11;
            break;
          }
          _context.next = 7;
          return (0, _manualClosingStock.decreptionmnualstock)(createdata, "object", data.data.email);
        case 7:
          response = _context.sent;
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Manual Stock fetch Successfully",
            stock: response
          });
        case 11:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Manual Stock Found!",
            stock: {}
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    var createdata, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _manualCosingStock["default"].findAll({
            where: {
              company_id: data.company_id
            },
            order: [['closingdate', 'DESC']]
          }).map(function (node) {
            return node.get({
              plain: true
            });
          });
        case 3:
          createdata = _context2.sent;
          if (!(createdata.length > 0)) {
            _context2.next = 11;
            break;
          }
          _context2.next = 7;
          return (0, _manualClosingStock.decreptionmnualstock)(createdata, "array", data.data.email);
        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Manual Stock fetch Successfully",
            stock: response
          });
        case 11:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Manual Stock not Found!",
            stock: createdata ? createdata : []
          });
        case 12:
          _context2.next = 22;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          _context2.next = 19;
          return (0, _statusCode.checkCode)("error");
        case 19:
          _context2.t1 = _context2.sent;
          _context2.t2 = _context2.t0.message;
          return _context2.abrupt("return", {
            statusCode: _context2.t1,
            success: false,
            error: _context2.t2,
            message: "Something went wrong!"
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!(new Date() >= new Date(data.financial_year))) {
            _context3.next = 17;
            break;
          }
          _context3.next = 4;
          return (0, _uniqid["default"])();
        case 4:
          data.uid = _context3.sent;
          data.creation_date = new Date();
          data.updated_date = new Date();
          _context3.next = 9;
          return _manualCosingStock["default"].create(data);
        case 9:
          createdata = _context3.sent;
          if (!createdata) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Manual stock Created Successfully",
            stock: createdata
          });
        case 14:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Manual Stock not created",
            stock: {}
          });
        case 15:
          _context3.next = 18;
          break;
        case 17:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Financial Year not greater then today date",
            company: {}
          });
        case 18:
          _context3.next = 28;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          _context3.next = 25;
          return (0, _statusCode.checkCode)("error");
        case 25:
          _context3.t1 = _context3.sent;
          _context3.t2 = _context3.t0.message;
          return _context3.abrupt("return", {
            statusCode: _context3.t1,
            success: false,
            error: _context3.t2,
            message: "Something went wrong!"
          });
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, res) {
    var deletemanualClosingStock;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _manualCosingStock["default"].destroy({
            where: {
              uid: id
            }
          });
        case 3:
          deletemanualClosingStock = _context4.sent;
          if (!deletemanualClosingStock) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "maual stock Delete Successfully",
            stock: deletemanualClosingStock
          });
        case 8:
          _context4.next = 10;
          return (0, _statusCode.checkCode)("error");
        case 10:
          _context4.t0 = _context4.sent;
          _context4.t1 = {};
          return _context4.abrupt("return", {
            statusCode: _context4.t0,
            success: false,
            message: "Something went wrong!",
            stock: _context4.t1
          });
        case 13:
          _context4.next = 22;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t2 = _context4["catch"](0);
          _context4.next = 19;
          return (0, _statusCode.checkCode)("error");
        case 19:
          _context4.t3 = _context4.sent;
          _context4.t4 = _context4.t2.message;
          return _context4.abrupt("return", {
            statusCode: _context4.t3,
            success: false,
            error: _context4.t4,
            message: "Something went wrong!"
          });
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, data, res) {
    var finddata, updatedata, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _manualCosingStock["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          finddata = _context5.sent;
          if (!finddata) {
            _context5.next = 23;
            break;
          }
          data.updated_date = new Date();
          _context5.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context5.sent;
          if (!updatedata) {
            _context5.next = 16;
            break;
          }
          _context5.next = 12;
          return (0, _manualClosingStock.decreptionmnualstock)(updatedata, "object", data.data.email);
        case 12:
          response = _context5.sent;
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "manual stock update Successfully",
            stock: response
          });
        case 16:
          _context5.next = 18;
          return (0, _statusCode.checkCode)("error");
        case 18:
          _context5.t0 = _context5.sent;
          _context5.t1 = {};
          return _context5.abrupt("return", {
            statusCode: _context5.t0,
            success: false,
            message: "Something went wrong!",
            stock: _context5.t1
          });
        case 21:
          _context5.next = 24;
          break;
        case 23:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "manual Stock not found!",
            stock: {}
          });
        case 24:
          _context5.next = 33;
          break;
        case 26:
          _context5.prev = 26;
          _context5.t2 = _context5["catch"](0);
          _context5.next = 30;
          return (0, _statusCode.checkCode)("error");
        case 30:
          _context5.t3 = _context5.sent;
          _context5.t4 = _context5.t2;
          return _context5.abrupt("return", {
            statusCode: _context5.t3,
            success: false,
            error: _context5.t4,
            message: "Something went wrong!"
          });
        case 33:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 26]]);
  }));
  return function (_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();