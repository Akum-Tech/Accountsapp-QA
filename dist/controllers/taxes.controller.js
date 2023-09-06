"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaxes = createTaxes;
exports.deleteTaxes = deleteTaxes;
exports.getTaxebyStatus = getTaxebyStatus;
exports.getTaxes = getTaxes;
exports.getTaxess = getTaxess;
exports.login = login;
exports.updateTaxes = updateTaxes;
var _taxes = _interopRequireDefault(require("../services/taxes.service"));
var _taxes2 = require("../validation/taxes");
var _statusCode = require("../utility/statusCode");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getTaxess(_x, _x2) {
  return _getTaxess.apply(this, arguments);
}
function _getTaxess() {
  _getTaxess = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.body.data = req.decoded.data;
          _context.next = 4;
          return _taxes["default"].getAllData(req.body, res);
        case 4:
          getdata = _context.sent;
          if (getdata) {
            res.json(getdata);
          }
          _context.next = 17;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.t1 = res.status(500);
          _context.next = 13;
          return (0, _statusCode.checkCode)('error');
        case 13:
          _context.t2 = _context.sent;
          _context.t3 = _context.t0;
          _context.t4 = {
            statusCode: _context.t2,
            success: false,
            error: _context.t3,
            message: "Something went wrong!"
          };
          _context.t1.json.call(_context.t1, _context.t4);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getTaxess.apply(this, arguments);
}
function getTaxebyStatus(_x3, _x4) {
  return _getTaxebyStatus.apply(this, arguments);
}
function _getTaxebyStatus() {
  _getTaxebyStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (req.params.status) {
            _context2.next = 9;
            break;
          }
          _context2.t0 = res;
          _context2.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context2.t1 = _context2.sent;
          _context2.t2 = {};
          _context2.t3 = {
            statusCode: _context2.t1,
            success: false,
            message: "Taxes id required!",
            Taxes: _context2.t2
          };
          return _context2.abrupt("return", _context2.t0.json.call(_context2.t0, _context2.t3));
        case 9:
          _context2.next = 11;
          return _taxes["default"].getStatusData(req.params.status, res);
        case 11:
          createdata = _context2.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context2.next = 24;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t4 = _context2["catch"](0);
          _context2.t5 = res.status(500);
          _context2.next = 20;
          return (0, _statusCode.checkCode)('error');
        case 20:
          _context2.t6 = _context2.sent;
          _context2.t7 = _context2.t4;
          _context2.t8 = {
            statusCode: _context2.t6,
            success: false,
            error: _context2.t7,
            message: "Something went wrong!"
          };
          _context2.t5.json.call(_context2.t5, _context2.t8);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _getTaxebyStatus.apply(this, arguments);
}
function getTaxes(_x5, _x6) {
  return _getTaxes.apply(this, arguments);
}
function _getTaxes() {
  _getTaxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (req.params.id) {
            _context3.next = 9;
            break;
          }
          _context3.t0 = res;
          _context3.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context3.t1 = _context3.sent;
          _context3.t2 = {};
          _context3.t3 = {
            statusCode: _context3.t1,
            success: false,
            message: "Taxes id required!",
            Taxes: _context3.t2
          };
          return _context3.abrupt("return", _context3.t0.json.call(_context3.t0, _context3.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context3.next = 12;
          return _taxes["default"].getSingleData(req.params.id, res);
        case 12:
          createdata = _context3.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context3.next = 25;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t4 = _context3["catch"](0);
          _context3.t5 = res.status(500);
          _context3.next = 21;
          return (0, _statusCode.checkCode)('error');
        case 21:
          _context3.t6 = _context3.sent;
          _context3.t7 = _context3.t4;
          _context3.t8 = {
            statusCode: _context3.t6,
            success: false,
            error: _context3.t7,
            message: "Something went wrong!"
          };
          _context3.t5.json.call(_context3.t5, _context3.t8);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return _getTaxes.apply(this, arguments);
}
function createTaxes(_x7, _x8) {
  return _createTaxes.apply(this, arguments);
}
function _createTaxes() {
  _createTaxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var validation, checkdata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _taxes2.createTaxesValidation)(req.body);
        case 3:
          validation = _context4.sent;
          if (!validation.success) {
            _context4.next = 11;
            break;
          }
          _context4.next = 7;
          return _taxes["default"].createData(req.body, res);
        case 7:
          checkdata = _context4.sent;
          if (checkdata) {
            res.json(checkdata);
          }
          _context4.next = 18;
          break;
        case 11:
          _context4.t0 = res;
          _context4.next = 14;
          return (0, _statusCode.checkCode)('validation');
        case 14:
          _context4.t1 = _context4.sent;
          _context4.t2 = validation.message;
          _context4.t3 = {
            statusCode: _context4.t1,
            success: false,
            message: _context4.t2
          };
          _context4.t0.json.call(_context4.t0, _context4.t3);
        case 18:
          _context4.next = 29;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t4 = _context4["catch"](0);
          _context4.t5 = res.status(500);
          _context4.next = 25;
          return (0, _statusCode.checkCode)('error');
        case 25:
          _context4.t6 = _context4.sent;
          _context4.t7 = _context4.t4;
          _context4.t8 = {
            statusCode: _context4.t6,
            success: false,
            error: _context4.t7,
            message: "Something went wrong!"
          };
          _context4.t5.json.call(_context4.t5, _context4.t8);
        case 29:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return _createTaxes.apply(this, arguments);
}
function deleteTaxes(_x9, _x10) {
  return _deleteTaxes.apply(this, arguments);
}
function _deleteTaxes() {
  _deleteTaxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
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
            message: "Taxes id required!",
            Taxes: _context5.t2
          };
          return _context5.abrupt("return", _context5.t0.json.call(_context5.t0, _context5.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context5.next = 12;
          return _taxes["default"].deleteData(req.params.id, res);
        case 12:
          deletedata = _context5.sent;
          if (deletedata) {
            res.json(deletedata);
          }
          _context5.next = 25;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t4 = _context5["catch"](0);
          _context5.t5 = res.status(500);
          _context5.next = 21;
          return (0, _statusCode.checkCode)('error');
        case 21:
          _context5.t6 = _context5.sent;
          _context5.t7 = _context5.t4;
          _context5.t8 = {
            statusCode: _context5.t6,
            error: _context5.t7,
            success: false,
            message: "Something went wrong!"
          };
          _context5.t5.json.call(_context5.t5, _context5.t8);
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return _deleteTaxes.apply(this, arguments);
}
function updateTaxes(_x11, _x12) {
  return _updateTaxes.apply(this, arguments);
}
function _updateTaxes() {
  _updateTaxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var validation, updatedata;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (req.params.id) {
            _context6.next = 9;
            break;
          }
          _context6.t0 = res;
          _context6.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context6.t1 = _context6.sent;
          _context6.t2 = {};
          _context6.t3 = {
            statusCode: _context6.t1,
            success: false,
            message: "Taxes id required!",
            Taxes: _context6.t2
          };
          return _context6.abrupt("return", _context6.t0.json.call(_context6.t0, _context6.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context6.next = 12;
          return (0, _taxes2.createTaxesValidation)(req.body);
        case 12:
          validation = _context6.sent;
          if (!validation.success) {
            _context6.next = 20;
            break;
          }
          _context6.next = 16;
          return _taxes["default"].updateData(req.params.id, req.body, res);
        case 16:
          updatedata = _context6.sent;
          if (updatedata) {
            res.json(updatedata);
          }
          _context6.next = 27;
          break;
        case 20:
          _context6.t4 = res;
          _context6.next = 23;
          return (0, _statusCode.checkCode)('validation');
        case 23:
          _context6.t5 = _context6.sent;
          _context6.t6 = validation.message;
          _context6.t7 = {
            statusCode: _context6.t5,
            success: false,
            message: _context6.t6
          };
          _context6.t4.json.call(_context6.t4, _context6.t7);
        case 27:
          _context6.next = 38;
          break;
        case 29:
          _context6.prev = 29;
          _context6.t8 = _context6["catch"](0);
          _context6.t9 = res.status(500);
          _context6.next = 34;
          return (0, _statusCode.checkCode)('error');
        case 34:
          _context6.t10 = _context6.sent;
          _context6.t11 = _context6.t8;
          _context6.t12 = {
            statusCode: _context6.t10,
            error: _context6.t11,
            success: false,
            message: "Something went wrong!"
          };
          _context6.t9.json.call(_context6.t9, _context6.t12);
        case 38:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 29]]);
  }));
  return _updateTaxes.apply(this, arguments);
}
function login(_x13, _x14) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _taxes["default"].loginTaxes(req.body, res);
        case 3:
          logindata = _context7.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context7.next = 16;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          _context7.t1 = res.status(500);
          _context7.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context7.t2 = _context7.sent;
          _context7.t3 = _context7.t0;
          _context7.t4 = {
            statusCode: _context7.t2,
            error: _context7.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context7.t1.json.call(_context7.t1, _context7.t4);
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _login.apply(this, arguments);
}