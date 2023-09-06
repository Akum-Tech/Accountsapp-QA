"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _itemStock = _interopRequireDefault(require("../models/itemStock"));
var _company = _interopRequireDefault(require("../models/company"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _statusCode = require("../utility/statusCode");
var _units = _interopRequireDefault(require("../models/units"));
var _states = _interopRequireDefault(require("../models/states"));
var _stockGroup = _interopRequireDefault(require("../models/stockGroup"));
var _stockSubGroup = _interopRequireDefault(require("../models/stockSubGroup"));
var _cities = _interopRequireDefault(require("../models/cities"));
var _database = require("../database/database");
var _itemStock2 = require("../security/itemStock");
var _uniqid = _interopRequireDefault(require("uniqid"));
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Op = _sequelize["default"].Op;
exports.getSingleData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _itemStock["default"].findOne({
            where: {
              uid: id
            }
          });
        case 3:
          createdata = _context.sent;
          if (!createdata) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock fetch Successfully",
            ItemStock: createdata
          });
        case 8:
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock not Found!",
            ItemStock: createdata ? createdata : {}
          });
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cid, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _itemStock["default"].findAll({
            where: {
              company_id: cid
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
              model: _units["default"],
              attributes: ["uqc", "quantity_description"]
            }, {
              model: _stockGroup["default"],
              attributes: ["uid", "stock_name"]
            }, {
              model: _stockSubGroup["default"],
              attributes: ["uid", "stock_name"]
            }]
          });
        case 3:
          createdata = _context2.sent;
          if (!(createdata.length > 0)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock fetch Successfully",
            ItemStock: createdata
          });
        case 8:
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock not Found!",
            ItemStock: createdata ? createdata : []
          });
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context2.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var checkdata, createdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _itemStock["default"].findOne({
            where: {
              name: data.name,
              company_id: data.company_id
            }
          });
        case 3:
          checkdata = _context3.sent;
          if (!checkdata) {
            _context3.next = 12;
            break;
          }
          _context3.next = 7;
          return (0, _statusCode.checkCode)("validation");
        case 7:
          _context3.t0 = _context3.sent;
          _context3.t1 = checkdata;
          return _context3.abrupt("return", {
            statusCode: _context3.t0,
            success: false,
            message: "ItemStock Already Exist",
            ItemStock: _context3.t1
          });
        case 12:
          _context3.next = 14;
          return (0, _uniqid["default"])();
        case 14:
          data.uid = _context3.sent;
          data.creation_date = new Date();
          data.updated_date = new Date();
          _context3.next = 19;
          return _itemStock["default"].create(data);
        case 19:
          createdata = _context3.sent;
          if (!createdata) {
            _context3.next = 24;
            break;
          }
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock Created Successfully",
            ItemStock: createdata
          });
        case 24:
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            ItemStock: createdata
          });
        case 25:
          _context3.next = 30;
          break;
        case 27:
          _context3.prev = 27;
          _context3.t2 = _context3["catch"](0);
          return _context3.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context3.t2.message,
            message: "Something went wrong!"
          });
        case 30:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 27]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _itemStock["default"].destroy({
            where: {
              uid: id
            }
          });
        case 3:
          deletedata = _context4.sent;
          if (!deletedata) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock Delete Successfully",
            ItemStock: deletedata
          });
        case 8:
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            ItemStock: deletedata
          });
        case 9:
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context4.t0,
            message: "Something went wrong!"
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, data, res) {
    var finddata, updatedata;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _itemStock["default"].findOne({
            where: {
              uid: id,
              company_id: data.company_id
            }
          });
        case 3:
          finddata = _context5.sent;
          if (!finddata) {
            _context5.next = 16;
            break;
          }
          data.updated_date = new Date();
          _context5.next = 8;
          return finddata.update(data);
        case 8:
          updatedata = _context5.sent;
          if (!updatedata) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "ItemStock update Successfully",
            ItemStock: updatedata
          });
        case 13:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            ItemStock: updatedata
          });
        case 14:
          _context5.next = 17;
          break;
        case 16:
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "ItemStock not found!",
            ItemStock: finddata ? finddata : {}
          });
        case 17:
          _context5.next = 22;
          break;
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context5.t0,
            message: "Something went wrong!"
          });
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function (_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getAllStockitem = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, res) {
    var openingbalance, oneitem, allprivioustranstions, inword, outword, totalbalnce, createdata, _response, type;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          openingbalance = 0;
          _context6.next = 4;
          return _database.sequelize.query("SELECT items.*,units.uqc  FROM items join units on items.unit_id=units.id WHERE items. uid= '".concat(data.item_id, "'"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 4:
          oneitem = _context6.sent;
          if (!oneitem) {
            _context6.next = 43;
            break;
          }
          _context6.next = 8;
          return (0, _itemStock2.decreptionItem)(oneitem, "array", data.data.email);
        case 8:
          oneitem = _context6.sent;
          openingbalance = Number(oneitem[0].quantity);

          // let allprivioustranstions = await sequelize.query(
          //   `select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' END AS outwards from item_entries where item_id='${data.item_id}' AND invoice_date <'${data.start_date}'`,
          //   { type: sequelize.QueryTypes.SELECT }
          // );
          _context6.next = 12;
          return _database.sequelize.query("select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' \n      THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE \n      WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' END AS outwards \n      from item_entries where item_id='".concat(data.item_id, "' AND invoice_date <'").concat(data.start_date, "'\n      UNION ALL\n      select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' \n      THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE \n      WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' \n      END AS outwards from item_stock_voucher_entries where item_id='").concat(data.item_id, "'\n      AND invoice_date <'").concat(data.start_date, "'"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 12:
          allprivioustranstions = _context6.sent;
          if (!allprivioustranstions) {
            _context6.next = 24;
            break;
          }
          _context6.next = 16;
          return (0, _itemStock2.decreptionItem)(allprivioustranstions, "array", data.data.email);
        case 16:
          allprivioustranstions = _context6.sent;
          inword = 0, outword = 0, totalbalnce = 0;
          _context6.next = 20;
          return allprivioustranstions.map(function (item) {
            if (item.inwards) {
              inword = inword + Number(item.inwards);
            } else if (item.outwards) {
              outword = outword + Number(item.outwards);
            }
          });
        case 20:
          totalbalnce = inword - outword;
          openingbalance = Number(oneitem[0].quantity) + totalbalnce;
          _context6.next = 25;
          break;
        case 24:
          openingbalance = oneitem.quantity;
        case 25:
          _context6.next = 27;
          return _database.sequelize.query("(Select le.name as ledger_name,le.amount,il.*,\n              CASE WHEN il.type ='Purchase' THEN il.quantity \n               WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,\n               CASE WHEN il.type ='Sales' THEN il.quantity \n               WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards \n               from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, \n               COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') \n               AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') \n               AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') \n               AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') \n               AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, \n               COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),\n               RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),\n               RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from \n               (SELECT uid ,voucher_id\t,item_id\t,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit\t,status,invoice_date,creation_date,updated_date from item_entries where item_id='".concat(data.item_id, "' \n               UNION All SELECT uid ,voucher_id\t,item_id\t,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit\t,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='").concat(data.item_id, "' ) ie \n               left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id \n               left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id \n               left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id \n               left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id\n               left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id\n                where ie.item_id='").concat(data.item_id, "' AND (ie.invoice_date >= '").concat(data.start_date, "'  \n                AND ie.invoice_date <= '").concat(data.end_date, "')) il \n                on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL\n      SELECT \"\" as ledger_name, '0' as amount, voucher_id, quantity, unit, name, type, \"\" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,\n              CASE WHEN type ='Purchase' THEN quantity \n               WHEN type ='Debit' THEN quantity ELSE ''  END  AS outwards,\n               CASE WHEN type ='Sales' THEN quantity \n               WHEN type ='Credit' THEN quantity ELSE ''  END  AS inwards  FROM item_stock_voucher_entries  where item_id='").concat(data.item_id, "' AND (invoice_date >= '").concat(data.start_date, "'  \n             AND invoice_date <= '").concat(data.end_date, "')"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 27:
          createdata = _context6.sent;
          if (!createdata) {
            _context6.next = 40;
            break;
          }
          _context6.next = 31;
          return (0, _itemStock2.decreptionItem)(createdata, "array", data.data.email);
        case 31:
          _response = _context6.sent;
          type = "";
          if (openingbalance > 0) {
            type = "inwards";
            oneitem[0].inwards = Math.abs(openingbalance).toString();
          } else {
            type = "outwards";
            oneitem[0].outwards = Math.abs(openingbalance).toString();
          }
          oneitem[0].type = type;
          oneitem[0].quantity = Math.abs(openingbalance).toString();
          _response.unshift(oneitem[0]);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Item Stock fetch Successfully",
            ItemStock: _response
          });
        case 40:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Item Stock not Found!",
            ItemStock: response ? response : {}
          });
        case 41:
          _context6.next = 44;
          break;
        case 43:
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Item  not Found!",
            ItemStock: response ? response : {}
          });
        case 44:
          _context6.next = 49;
          break;
        case 46:
          _context6.prev = 46;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context6.t0.message,
            message: "Something went wrong!"
          });
        case 49:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 46]]);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
function groupBy(arr, prop, subprob) {
  var map = new Map(Array.from(arr, function (obj) {
    return [obj[subprob] ? obj[subprob] : obj[prop], []];
  }));
  arr.forEach(function (obj) {
    return map.get(obj[subprob] ? obj[subprob] : obj[prop]).push(obj);
  });
  return Array.from(map.values());
}
function search(nameKey, myArray) {
  if (myArray.length > 0) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].stock_group_id === nameKey) {
        return myArray[i];
      } else {
        return -1;
      }
    }
  } else {
    return -1;
  }
}
exports.getAllGroupStockitem = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, res) {
    var groupitem, _iterator, _step, _loop, total_inwards, total_outwards, response1, lastgroupitem;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _database.sequelize.query("select main.*,b.stock_name,c.stock_name as subgroup_name from \n      (SELECT table1.*,table2.grou_itemid as checka FROM \n      (SELECT items.*,0 as grou_itemid from items where items.company_id='".concat(data.company_id, "') table1 \n      left JOIN \n      (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select uid,voucher_id\t,item_id,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit,status,invoice_date,creation_date,updated_date from item_entries UNION ALL select uid ,voucher_id,item_id,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit\t,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id\n       where items.company_id='").concat(data.company_id, "' and (item_entries.invoice_date >= '").concat(data.start_date, "' \n       AND item_entries.invoice_date <= '").concat(data.end_date, "') group by item_entries.item_id) \n       table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b \n       on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 3:
          groupitem = _context8.sent;
          console.log("groupitem", groupitem);
          if (!groupitem) {
            _context8.next = 34;
            break;
          }
          _iterator = _createForOfIteratorHelper(groupitem);
          _context8.prev = 7;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var itemdata, openingbalance, oneitem, allprivioustranstions, inword, outword, totalbalnce, createdata, type, _response2, closing_balanse;
            return _regeneratorRuntime().wrap(function _loop$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  itemdata = _step.value;
                  openingbalance = 0;
                  _context7.next = 4;
                  return _database.sequelize.query("SELECT items.*,units.uqc  FROM items join units on \n          items.unit_id=units.id WHERE items.uid= '".concat(itemdata.uid, "'"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 4:
                  oneitem = _context7.sent;
                  if (!oneitem) {
                    _context7.next = 52;
                    break;
                  }
                  _context7.next = 8;
                  return (0, _itemStock2.decreptionItem)(oneitem, "array", data.data.email);
                case 8:
                  oneitem = _context7.sent;
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) : 0;
                  console.log(oneitem, "- -- - - - -", itemdata.uid);
                  _context7.next = 13;
                  return _database.sequelize.query("select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_entries \n             where item_id='".concat(itemdata.uid, "' AND invoice_date <'").concat(data.start_date, "'\n              UNION All \n             select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries \n             where item_id='").concat(itemdata.uid, "' AND invoice_date <'").concat(data.start_date, "'\n             "), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 13:
                  allprivioustranstions = _context7.sent;
                  console.log("allprivioustranstions", allprivioustranstions);
                  if (!allprivioustranstions) {
                    _context7.next = 26;
                    break;
                  }
                  _context7.next = 18;
                  return (0, _itemStock2.decreptionItem)(allprivioustranstions, "array", data.data.email);
                case 18:
                  allprivioustranstions = _context7.sent;
                  inword = 0, outword = 0, totalbalnce = 0;
                  _context7.next = 22;
                  return allprivioustranstions.map(function (item) {
                    if (item.inwards) {
                      inword = inword + Number(item.inwards);
                    } else if (item.outwards) {
                      outword = outword + Number(item.outwards);
                    }
                  });
                case 22:
                  totalbalnce = inword - outword;
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) + totalbalnce : 0;
                  _context7.next = 27;
                  break;
                case 26:
                  openingbalance = oneitem.quantity;
                case 27:
                  _context7.next = 29;
                  return _database.sequelize.query("(Select le.name as ledger_name,le.amount,il.*,\n            CASE WHEN il.type ='Purchase' THEN il.quantity \n             WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,\n             CASE WHEN il.type ='Sales' THEN il.quantity \n             WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards \n             from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, \n             COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') \n             AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') \n             AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') \n             AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') \n             AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, \n             COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),\n             RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),\n             RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from \n             (SELECT uid ,voucher_id\t,item_id\t,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit\t,status,invoice_date,creation_date,updated_date from item_entries where item_id='".concat(itemdata.uid, "' \n             UNION All SELECT uid ,voucher_id\t,item_id\t,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit\t,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='").concat(itemdata.uid, "' ) ie \n             left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id \n             left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id \n             left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id \n             left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id\n             left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id\n              where ie.item_id='").concat(itemdata.uid, "' AND (ie.invoice_date >= '").concat(data.start_date, "'  \n              AND ie.invoice_date <= '").concat(data.end_date, "')) il \n              on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL\n    SELECT \"\" as ledger_name, '0' as amount, voucher_id, quantity, unit, name, type, \"\" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,\n            CASE WHEN type ='Purchase' THEN quantity \n             WHEN type ='Debit' THEN quantity ELSE ''  END  AS outwards,\n             CASE WHEN type ='Sales' THEN quantity \n             WHEN type ='Credit' THEN quantity ELSE ''  END  AS inwards  FROM item_stock_voucher_entries  where item_id='").concat(itemdata.uid, "' AND (invoice_date >= '").concat(data.start_date, "'  \n           AND invoice_date <= '").concat(data.end_date, "')"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 29:
                  createdata = _context7.sent;
                  if (!createdata) {
                    _context7.next = 50;
                    break;
                  }
                  type = "";
                  if (openingbalance > 0) {
                    type = "inwards";
                    oneitem[0].inwards = Math.abs(openingbalance).toString();
                  } else {
                    type = "outwards";
                    oneitem[0].outwards = Math.abs(openingbalance).toString();
                  }
                  _context7.next = 35;
                  return (0, _itemStock2.decreptionItem)(createdata, "array", data.data.email);
                case 35:
                  _response2 = _context7.sent;
                  total_inwards = _response2.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.inwards);

                    // set initial value as 0
                  }, 0);
                  total_outwards = _response2.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.outwards);

                    // set initial value as 0
                  }, 0);
                  oneitem[0].type = type;
                  oneitem[0].quantity = Math.abs(openingbalance).toString();
                  //response.unshift(oneitem[0]);
                  closing_balanse = Number(openingbalance) - Number(total_outwards) + Number(total_inwards);
                  itemdata.tl_inwards = total_inwards;
                  itemdata.tl_outwards = total_outwards;
                  itemdata.unit = oneitem[0].uqc;
                  itemdata.openingbalance = Math.abs(openingbalance).toString();
                  itemdata.type = type;
                  itemdata.closingbalnce = Math.abs(closing_balanse).toString();
                  itemdata.closingbalnce_type = closing_balanse > 0 ? "inward" : "outward";
                  _context7.next = 50;
                  break;
                case 50:
                  _context7.next = 53;
                  break;
                case 52:
                  console.log("goto else");
                case 53:
                case "end":
                  return _context7.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context8.next = 14;
            break;
          }
          return _context8.delegateYield(_loop(), "t0", 12);
        case 12:
          _context8.next = 10;
          break;
        case 14:
          _context8.next = 19;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t1 = _context8["catch"](7);
          _iterator.e(_context8.t1);
        case 19:
          _context8.prev = 19;
          _iterator.f();
          return _context8.finish(19);
        case 22:
          _context8.next = 24;
          return (0, _itemStock2.decreptionItem)(groupitem, "array", data.data.email);
        case 24:
          response1 = _context8.sent;
          response1 = response1.filter(function (obj) {
            return !(obj.checka == null && Number(obj.openingbalance) == 0);
          });
          lastgroupitem = groupBy(response1, "stock_group_id", "stock_sub_group_id");
          if (!(lastgroupitem.length > 0)) {
            _context8.next = 31;
            break;
          }
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: true,
            message: "Item Stock fetch Successfully",
            ItemStock: lastgroupitem
          });
        case 31:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Item Stock not found",
            ItemStock: lastgroupitem
          });
        case 32:
          _context8.next = 35;
          break;
        case 34:
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            message: "Data not Found!",
            ItemStock: response ? response : {}
          });
        case 35:
          _context8.next = 41;
          break;
        case 37:
          _context8.prev = 37;
          _context8.t2 = _context8["catch"](0);
          console.log("error", _context8.t2);
          return _context8.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context8.t2.message,
            message: "Something went wrong!"
          });
        case 41:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 37], [7, 16, 19, 22]]);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getAllGroupStockitemcalculation = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(type, company_id, start_date, end_date, email, res) {
    var groupstockvalue, groupitem, _iterator2, _step2, _loop2, total_inwards, total_outwards, response1, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          groupstockvalue = 0;
          groupitem = null;
          console.log("type value", type);
          if (!(type == "open")) {
            _context10.next = 10;
            break;
          }
          _context10.next = 7;
          return _database.sequelize.query("select main.*,b.stock_name,c.stock_name as subgroup_name from \n                  (SELECT table1.*,table2.grou_itemid as checka FROM \n                  (SELECT items.*,0 as grou_itemid from items where items.company_id='".concat(company_id, "') table1 \n                  left JOIN \n                  (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id\n                  where items.company_id='").concat(company_id, "' and (item_entries.invoice_date >= '").concat(start_date, "' \n                  AND item_entries.invoice_date <= '").concat(end_date, "') group by item_entries.item_id) \n                  table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b \n                  on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 7:
          groupitem = _context10.sent;
          _context10.next = 13;
          break;
        case 10:
          _context10.next = 12;
          return _database.sequelize.query("select main.*,b.stock_name,c.stock_name as subgroup_name from \n                (SELECT table1.*,table2.grou_itemid as checka FROM \n                (SELECT items.*,0 as grou_itemid from items where items.company_id='".concat(company_id, "') table1 \n                left JOIN \n                (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id\n                where items.company_id='").concat(company_id, "' and (item_entries.invoice_date >= '").concat(start_date, "' \n                AND item_entries.invoice_date <= '").concat(end_date, "') group by item_entries.item_id) \n                table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b \n                on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 12:
          groupitem = _context10.sent;
        case 13:
          if (!groupitem) {
            _context10.next = 40;
            break;
          }
          _iterator2 = _createForOfIteratorHelper(groupitem);
          _context10.prev = 15;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var itemdata, openingbalance, oneitem, allprivioustranstions, inword, outword, totalbalnce, createdata, _type, _response3, closing_balanse;
            return _regeneratorRuntime().wrap(function _loop2$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  itemdata = _step2.value;
                  openingbalance = 0;
                  _context9.next = 4;
                  return _database.sequelize.query("SELECT items.*,units.uqc  FROM items join units on \n          items.unit_id=units.id WHERE items. uid= '".concat(itemdata.uid, "'"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 4:
                  oneitem = _context9.sent;
                  if (!oneitem) {
                    _context9.next = 52;
                    break;
                  }
                  _context9.next = 8;
                  return (0, _itemStock2.decreptionItem)(oneitem, "array", email);
                case 8:
                  oneitem = _context9.sent;
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) : 0;
                  _context9.next = 12;
                  return _database.sequelize.query("select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_entries \n             where item_id='".concat(itemdata.uid, "' AND invoice_date < ' ").concat(start_date, "'\n              UNION All \n             select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries \n             where item_id='").concat(itemdata.uid, "' AND invoice_date <' ").concat(start_date, "'\n             "), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 12:
                  allprivioustranstions = _context9.sent;
                  if (!allprivioustranstions) {
                    _context9.next = 25;
                    break;
                  }
                  _context9.next = 16;
                  return (0, _itemStock2.decreptionItem)(allprivioustranstions, "array", email);
                case 16:
                  allprivioustranstions = _context9.sent;
                  inword = 0, outword = 0, totalbalnce = 0;
                  _context9.next = 20;
                  return allprivioustranstions.map(function (item) {
                    if (item.inwards) {
                      inword = inword + Number(item.inwards);
                    } else if (item.outwards) {
                      outword = outword + Number(item.outwards);
                    }
                  });
                case 20:
                  totalbalnce = inword - outword;
                  console.log("totalbalnce", openingbalance, totalbalnce, inword, outword);
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) + totalbalnce : 0;
                  _context9.next = 26;
                  break;
                case 25:
                  openingbalance = oneitem.quantity;
                case 26:
                  _context9.next = 28;
                  return _database.sequelize.query("Select le.name as ledger_name,le.amount,il.*,\n            CASE WHEN il.invoice_id <=9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) \n            WHEN il.invoice_id > 9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) \n            ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  END\n           AS new_invoiceid,\n           CASE WHEN il.type ='Purchase' THEN il.quantity \n            WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,\n            CASE WHEN il.type ='Sales' THEN il.quantity \n            WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards \n            from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, \n            COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') \n            AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') \n            AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') \n            AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') \n            AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, \n            COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),\n            RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),\n            RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from \n            (SELECT * from item_entries where item_id='".concat(itemdata.uid, "' \n            UNION All SELECT * from item_stock_voucher_entries where item_id='").concat(itemdata.uid, "' ) ie \n            left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id \n            left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id \n            left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id \n            left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id\n            left join ( select * from journal_vouchers ) e on e.uid = ie.voucher_id\n             where ie.item_id='").concat(itemdata.uid, "' AND (ie.invoice_date >= '").concat(start_date, "' \n             AND ie.invoice_date <= '").concat(end_date, "') ORDER BY invoice_id ASC) il \n             on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 28:
                  createdata = _context9.sent;
                  if (!createdata) {
                    _context9.next = 50;
                    break;
                  }
                  _type = "";
                  if (openingbalance > 0) {
                    _type = "inwards";
                    oneitem[0].inwards = Math.abs(openingbalance).toString();
                  } else {
                    _type = "outwards";
                    oneitem[0].outwards = Math.abs(openingbalance).toString();
                  }
                  _context9.next = 34;
                  return (0, _itemStock2.decreptionItem)(createdata, "array", email);
                case 34:
                  _response3 = _context9.sent;
                  total_inwards = _response3.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.inwards);

                    // set initial value as 0
                  }, 0);
                  total_outwards = _response3.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.outwards);

                    // set initial value as 0
                  }, 0);
                  oneitem[0].type = _type;
                  oneitem[0].quantity = Math.abs(openingbalance).toString();
                  //response.unshift(oneitem[0]);
                  closing_balanse = Number(openingbalance) - Number(total_outwards) + Number(total_inwards);
                  itemdata.tl_inwards = total_inwards;
                  itemdata.tl_outwards = total_outwards;
                  itemdata.unit = oneitem[0].uqc;
                  itemdata.openingbalance = Math.abs(openingbalance).toString();
                  itemdata.type = _type;
                  itemdata.closingbalnce = Math.abs(closing_balanse).toString();
                  itemdata.closingbalnce_type = closing_balanse > 0 ? "inward" : "outward";
                  if (itemdata.closingbalnce_type === 'inward') {
                    itemdata.totalamountclosing = Number(itemdata.rate) * Number(itemdata.closingbalnce);
                  } else {
                    itemdata.totalamountclosing = -Number(itemdata.rate) * Number(itemdata.closingbalnce);
                  }
                  _context9.next = 50;
                  break;
                case 50:
                  _context9.next = 52;
                  break;
                case 52:
                case "end":
                  return _context9.stop();
              }
            }, _loop2);
          });
          _iterator2.s();
        case 18:
          if ((_step2 = _iterator2.n()).done) {
            _context10.next = 22;
            break;
          }
          return _context10.delegateYield(_loop2(), "t0", 20);
        case 20:
          _context10.next = 18;
          break;
        case 22:
          _context10.next = 27;
          break;
        case 24:
          _context10.prev = 24;
          _context10.t1 = _context10["catch"](15);
          _iterator2.e(_context10.t1);
        case 27:
          _context10.prev = 27;
          _iterator2.f();
          return _context10.finish(27);
        case 30:
          _context10.next = 32;
          return (0, _itemStock2.decreptionItem)(groupitem, "array", email);
        case 32:
          response1 = _context10.sent;
          response1 = response1.filter(function (obj) {
            console.log("obj.openingbalance", obj.openingbalance, obj.checka);
            return !(obj.checka == null && Number(obj.openingbalance) == 0);
          });
          console.log("response1", response1);
          result = response1.reduce(function (tot, arr) {
            // return the sum with previous value

            var point = 0;
            if (arr.closingbalnce_type === 'outward') {
              // console.log("if arr.rate", arr.rate, arr.closingbalnce)
              point = arr.rate && Number(arr.rate) ? -Number(arr.rate) * Number(arr.closingbalnce) : -Number(0) * Number(arr.closingbalnce);
            } else {
              // console.log("else arr.rate", arr.rate, arr.closingbalnce)
              point = arr.rate && Number(arr.rate) ? Number(arr.rate) * Number(arr.closingbalnce) : Number(0) * Number(arr.closingbalnce);
            }
            //  console.log("rate",arr.rate);
            //    console.log("balnce",arr.closingbalnce);
            //    console.log("point",point)

            return Number(tot) + Number(point);
            // set initial value as 0
          }, 0);
          console.log("groupitem = = = =", result);
          return _context10.abrupt("return", result);
        case 40:
          return _context10.abrupt("return", groupstockvalue);
        case 41:
          _context10.next = 46;
          break;
        case 43:
          _context10.prev = 43;
          _context10.t2 = _context10["catch"](0);
          return _context10.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context10.t2.message,
            message: "Something went wrong!"
          });
        case 46:
        case "end":
          return _context10.stop();
      }
    }, _callee8, null, [[0, 43], [15, 24, 27, 30]]);
  }));
  return function (_x16, _x17, _x18, _x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getOpenGroupStockitemcalculation = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(type, company_id, start_date, end_date, email, res) {
    var groupstockvalue, groupitem, _iterator3, _step3, _loop3, total_inwards, total_outwards, response1, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          groupstockvalue = 0;
          groupitem = null;
          console.log("type value", type);
          if (!(type == "open")) {
            _context12.next = 10;
            break;
          }
          _context12.next = 7;
          return _database.sequelize.query("select main.*,b.stock_name,c.stock_name as subgroup_name from \n                  (SELECT table1.*,table2.grou_itemid as checka FROM \n                  (SELECT items.*,0 as grou_itemid from items where items.company_id='".concat(company_id, "') table1 \n                  left JOIN \n                  (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id\n                  where items.company_id='").concat(company_id, "' and (item_entries.invoice_date > '").concat(start_date, "') group by item_entries.item_id) \n                  table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b \n                  on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 7:
          groupitem = _context12.sent;
          _context12.next = 13;
          break;
        case 10:
          _context12.next = 12;
          return _database.sequelize.query("select main.*,b.stock_name,c.stock_name as subgroup_name from \n                (SELECT table1.*,table2.grou_itemid as checka FROM \n                (SELECT items.*,0 as grou_itemid from items where items.company_id='".concat(company_id, "') table1 \n                left JOIN \n                (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id\n                where items.company_id='").concat(company_id, "' and (item_entries.invoice_date >= '").concat(start_date, "' \n                AND item_entries.invoice_date <= '").concat(end_date, "') group by item_entries.item_id) \n                table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b \n                on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id"), {
            type: _database.sequelize.QueryTypes.SELECT
          });
        case 12:
          groupitem = _context12.sent;
        case 13:
          if (!groupitem) {
            _context12.next = 40;
            break;
          }
          _iterator3 = _createForOfIteratorHelper(groupitem);
          _context12.prev = 15;
          _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
            var itemdata, openingbalance, oneitem, allprivioustranstions, inword, outword, totalbalnce, createdata, _type2, _response4, closing_balanse;
            return _regeneratorRuntime().wrap(function _loop3$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  itemdata = _step3.value;
                  openingbalance = 0;
                  _context11.next = 4;
                  return _database.sequelize.query("SELECT items.*,units.uqc  FROM items join units on \n          items.unit_id=units.id WHERE items. uid= '".concat(itemdata.uid, "'"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 4:
                  oneitem = _context11.sent;
                  if (!oneitem) {
                    _context11.next = 52;
                    break;
                  }
                  _context11.next = 8;
                  return (0, _itemStock2.decreptionItem)(oneitem, "array", email);
                case 8:
                  oneitem = _context11.sent;
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) : 0;
                  _context11.next = 12;
                  return _database.sequelize.query("select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_entries \n             where item_id='".concat(itemdata.uid, "' AND invoice_date < ' ").concat(start_date, "'\n              UNION All \n             select voucher_id, quantity,unit,name,type,\n            CASE WHEN type ='Purchase' THEN quantity \n            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,\n             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' \n             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries \n             where item_id='").concat(itemdata.uid, "' AND invoice_date <' ").concat(start_date, "'\n             "), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 12:
                  allprivioustranstions = _context11.sent;
                  if (!allprivioustranstions) {
                    _context11.next = 25;
                    break;
                  }
                  _context11.next = 16;
                  return (0, _itemStock2.decreptionItem)(allprivioustranstions, "array", email);
                case 16:
                  allprivioustranstions = _context11.sent;
                  inword = 0, outword = 0, totalbalnce = 0;
                  _context11.next = 20;
                  return allprivioustranstions.map(function (item) {
                    if (item.inwards) {
                      inword = inword + Number(item.inwards);
                    } else if (item.outwards) {
                      outword = outword + Number(item.outwards);
                    }
                  });
                case 20:
                  totalbalnce = inword - outword;
                  console.log("totalbalnce", openingbalance, totalbalnce, inword, outword);
                  openingbalance = oneitem[0] ? Number(oneitem[0].quantity) + totalbalnce : 0;
                  _context11.next = 26;
                  break;
                case 25:
                  openingbalance = oneitem.quantity;
                case 26:
                  _context11.next = 28;
                  return _database.sequelize.query("Select le.name as ledger_name,le.amount,il.*,\n            CASE WHEN il.invoice_id <=9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) \n            WHEN il.invoice_id > 9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) \n            ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  END\n           AS new_invoiceid,\n           CASE WHEN il.type ='Purchase' THEN il.quantity \n            WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,\n            CASE WHEN il.type ='Sales' THEN il.quantity \n            WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards \n            from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, \n            COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') \n            AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') \n            AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') \n            AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') \n            AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, \n            COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),\n            RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),\n            RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from \n            (SELECT * from item_entries where item_id='".concat(itemdata.uid, "' \n            UNION All SELECT * from item_stock_voucher_entries where item_id='").concat(itemdata.uid, "' ) ie \n            left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id \n            left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id \n            left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id \n            left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id\n            left join ( select * from journal_vouchers ) e on e.uid = ie.voucher_id\n             where ie.item_id='").concat(itemdata.uid, "' AND (ie.invoice_date > '").concat(start_date, "') ORDER BY invoice_id ASC) il \n             on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC"), {
                    type: _database.sequelize.QueryTypes.SELECT
                  });
                case 28:
                  createdata = _context11.sent;
                  if (!createdata) {
                    _context11.next = 50;
                    break;
                  }
                  _type2 = "";
                  if (openingbalance > 0) {
                    _type2 = "inwards";
                    oneitem[0].inwards = Math.abs(openingbalance).toString();
                  } else {
                    _type2 = "outwards";
                    oneitem[0].outwards = Math.abs(openingbalance).toString();
                  }
                  _context11.next = 34;
                  return (0, _itemStock2.decreptionItem)(createdata, "array", email);
                case 34:
                  _response4 = _context11.sent;
                  total_inwards = _response4.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.inwards);

                    // set initial value as 0
                  }, 0);
                  total_outwards = _response4.reduce(function (tot, arr) {
                    // return the sum with previous value
                    return tot + Number(arr.outwards);

                    // set initial value as 0
                  }, 0);
                  oneitem[0].type = _type2;
                  oneitem[0].quantity = Math.abs(openingbalance).toString();
                  //response.unshift(oneitem[0]);
                  closing_balanse = Number(openingbalance) - Number(total_outwards) + Number(total_inwards);
                  itemdata.tl_inwards = total_inwards;
                  itemdata.tl_outwards = total_outwards;
                  itemdata.unit = oneitem[0].uqc;
                  itemdata.openingbalance = Math.abs(openingbalance).toString();
                  itemdata.type = _type2;
                  itemdata.closingbalnce = Math.abs(closing_balanse).toString();
                  itemdata.closingbalnce_type = closing_balanse > 0 ? "inward" : "outward";
                  if (itemdata.closingbalnce_type === 'inward') {
                    itemdata.totalamountclosing = Number(itemdata.rate) * Number(itemdata.closingbalnce);
                  } else {
                    itemdata.totalamountclosing = -Number(itemdata.rate) * Number(itemdata.closingbalnce);
                  }
                  _context11.next = 50;
                  break;
                case 50:
                  _context11.next = 52;
                  break;
                case 52:
                case "end":
                  return _context11.stop();
              }
            }, _loop3);
          });
          _iterator3.s();
        case 18:
          if ((_step3 = _iterator3.n()).done) {
            _context12.next = 22;
            break;
          }
          return _context12.delegateYield(_loop3(), "t0", 20);
        case 20:
          _context12.next = 18;
          break;
        case 22:
          _context12.next = 27;
          break;
        case 24:
          _context12.prev = 24;
          _context12.t1 = _context12["catch"](15);
          _iterator3.e(_context12.t1);
        case 27:
          _context12.prev = 27;
          _iterator3.f();
          return _context12.finish(27);
        case 30:
          _context12.next = 32;
          return (0, _itemStock2.decreptionItem)(groupitem, "array", email);
        case 32:
          response1 = _context12.sent;
          response1 = response1.filter(function (obj) {
            console.log("obj.openingbalance", obj.openingbalance, obj.checka);
            return !(obj.checka == null && Number(obj.openingbalance) == 0);
          });
          console.log("response1", response1);
          result = response1.reduce(function (tot, arr) {
            // return the sum with previous value

            var point = 0;
            if (arr.closingbalnce_type === 'outward') {
              // console.log("if arr.rate", arr.rate, arr.closingbalnce)
              point = arr.rate && Number(arr.rate) ? -Number(arr.rate) * Number(arr.closingbalnce) : -Number(0) * Number(arr.closingbalnce);
            } else {
              // console.log("else arr.rate", arr.rate, arr.closingbalnce)
              point = arr.rate && Number(arr.rate) ? Number(arr.rate) * Number(arr.closingbalnce) : Number(0) * Number(arr.closingbalnce);
            }
            //  console.log("rate",arr.rate);
            //    console.log("balnce",arr.closingbalnce);
            //    console.log("point",point)

            return Number(tot) + Number(point);
            // set initial value as 0
          }, 0);
          console.log("groupitem = = = =", result);
          return _context12.abrupt("return", result);
        case 40:
          return _context12.abrupt("return", groupstockvalue);
        case 41:
          _context12.next = 46;
          break;
        case 43:
          _context12.prev = 43;
          _context12.t2 = _context12["catch"](0);
          return _context12.abrupt("return", {
            statusCode: res.statusCode,
            success: false,
            error: _context12.t2.message,
            message: "Something went wrong!"
          });
        case 46:
        case "end":
          return _context12.stop();
      }
    }, _callee9, null, [[0, 43], [15, 24, 27, 30]]);
  }));
  return function (_x22, _x23, _x24, _x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();