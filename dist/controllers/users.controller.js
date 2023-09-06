"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checksubscription = checksubscription;
exports.checksubscriptionuser = checksubscriptionuser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.emailverify = emailverify;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.login = login;
exports.mobileverify = mobileverify;
exports.resendotpemail = resendotpemail;
exports.resendotpmobile = resendotpmobile;
exports.testemail = testemail;
exports.updateUsers = updateUsers;
exports.updatesubscriptionUsers = updatesubscriptionUsers;
var _user = _interopRequireDefault(require("../services/user.service"));
var _user2 = require("../validation/user");
var _statusCode = require("../utility/statusCode");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getUsers(_x, _x2) {
  return _getUsers.apply(this, arguments);
}
function _getUsers() {
  _getUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var getdata;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body, "testing");
          _context.prev = 1;
          // req.body.data =  req.decoded.data;
          console.log(req.body, "testing");
          _context.next = 5;
          return _user["default"].getAllData(req.body, res);
        case 5:
          getdata = _context.sent;
          console.log(getdata);
          if (getdata) {
            res.json(getdata);
          }
          _context.next = 19;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          _context.t1 = res.status(500);
          _context.next = 15;
          return (0, _statusCode.checkCode)('error');
        case 15:
          _context.t2 = _context.sent;
          _context.t3 = _context.t0;
          _context.t4 = {
            statusCode: _context.t2,
            success: false,
            error: _context.t3,
            message: "Something wentfdsfsd wrong!"
          };
          _context.t1.json.call(_context.t1, _context.t4);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _getUsers.apply(this, arguments);
}
function getUser(_x3, _x4) {
  return _getUser.apply(this, arguments);
}
function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var createdata;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (req.params.id) {
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
            message: "User id required!",
            user: _context2.t2
          };
          return _context2.abrupt("return", _context2.t0.json.call(_context2.t0, _context2.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context2.next = 12;
          return _user["default"].getSingleData(req.params.id, req.body, res);
        case 12:
          createdata = _context2.sent;
          if (createdata) {
            res.json(createdata);
          }
          _context2.next = 25;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t4 = _context2["catch"](0);
          _context2.t5 = res.status(500);
          _context2.next = 21;
          return (0, _statusCode.checkCode)('error');
        case 21:
          _context2.t6 = _context2.sent;
          _context2.t7 = _context2.t4;
          _context2.t8 = {
            statusCode: _context2.t6,
            success: false,
            error: _context2.t7,
            message: "Something went wrong!"
          };
          _context2.t5.json.call(_context2.t5, _context2.t8);
        case 25:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return _getUser.apply(this, arguments);
}
function createUser(_x5, _x6) {
  return _createUser.apply(this, arguments);
}
function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var validation, checkdata;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _user2.createUserValidation)(req.body);
        case 3:
          validation = _context3.sent;
          if (!validation.success) {
            _context3.next = 11;
            break;
          }
          _context3.next = 7;
          return _user["default"].createData(req.body, res);
        case 7:
          checkdata = _context3.sent;
          if (checkdata) {
            res.json(checkdata);
          }
          _context3.next = 18;
          break;
        case 11:
          _context3.t0 = res;
          _context3.next = 14;
          return (0, _statusCode.checkCode)('validation');
        case 14:
          _context3.t1 = _context3.sent;
          _context3.t2 = validation.message;
          _context3.t3 = {
            statusCode: _context3.t1,
            success: false,
            message: _context3.t2
          };
          _context3.t0.json.call(_context3.t0, _context3.t3);
        case 18:
          _context3.next = 28;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t4 = _context3["catch"](0);
          _context3.t5 = res.status(500);
          _context3.next = 25;
          return (0, _statusCode.checkCode)('error');
        case 25:
          _context3.t6 = _context3.sent;
          _context3.t7 = {
            statusCode: _context3.t6,
            success: false,
            error: "test",
            message: "Something went wrong!"
          };
          _context3.t5.json.call(_context3.t5, _context3.t7);
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return _createUser.apply(this, arguments);
}
function deleteUser(_x7, _x8) {
  return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
  _deleteUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var deletedata;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (req.params.id) {
            _context4.next = 9;
            break;
          }
          _context4.t0 = res;
          _context4.next = 5;
          return (0, _statusCode.checkCode)('validation');
        case 5:
          _context4.t1 = _context4.sent;
          _context4.t2 = {};
          _context4.t3 = {
            statusCode: _context4.t1,
            success: false,
            message: "User id required!",
            user: _context4.t2
          };
          return _context4.abrupt("return", _context4.t0.json.call(_context4.t0, _context4.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context4.next = 12;
          return _user["default"].deleteData(req.params.id, res);
        case 12:
          deletedata = _context4.sent;
          if (deletedata) {
            res.json(deletedata);
          }
          _context4.next = 25;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t4 = _context4["catch"](0);
          _context4.t5 = res.status(500);
          _context4.next = 21;
          return (0, _statusCode.checkCode)('error');
        case 21:
          _context4.t6 = _context4.sent;
          _context4.t7 = _context4.t4;
          _context4.t8 = {
            statusCode: _context4.t6,
            error: _context4.t7,
            success: false,
            message: "Something went wrong!"
          };
          _context4.t5.json.call(_context4.t5, _context4.t8);
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return _deleteUser.apply(this, arguments);
}
function updateUsers(_x9, _x10) {
  return _updateUsers.apply(this, arguments);
}
function _updateUsers() {
  _updateUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var validation, updatedata;
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
            message: "User id required!",
            user: _context5.t2
          };
          return _context5.abrupt("return", _context5.t0.json.call(_context5.t0, _context5.t3));
        case 9:
          req.body.data = req.decoded.data;
          _context5.next = 12;
          return (0, _user2.createUserValidation)(req.body);
        case 12:
          validation = _context5.sent;
          if (!validation.success) {
            _context5.next = 20;
            break;
          }
          _context5.next = 16;
          return _user["default"].updateData(req.params.id, req.body, res);
        case 16:
          updatedata = _context5.sent;
          if (updatedata) {
            res.json(updatedata);
          }
          _context5.next = 27;
          break;
        case 20:
          _context5.t4 = res;
          _context5.next = 23;
          return (0, _statusCode.checkCode)('validation');
        case 23:
          _context5.t5 = _context5.sent;
          _context5.t6 = validation.message;
          _context5.t7 = {
            statusCode: _context5.t5,
            success: false,
            message: _context5.t6
          };
          _context5.t4.json.call(_context5.t4, _context5.t7);
        case 27:
          _context5.next = 38;
          break;
        case 29:
          _context5.prev = 29;
          _context5.t8 = _context5["catch"](0);
          _context5.t9 = res.status(500);
          _context5.next = 34;
          return (0, _statusCode.checkCode)('error');
        case 34:
          _context5.t10 = _context5.sent;
          _context5.t11 = _context5.t8;
          _context5.t12 = {
            statusCode: _context5.t10,
            error: _context5.t11,
            success: false,
            message: "Something went wrong!"
          };
          _context5.t9.json.call(_context5.t9, _context5.t12);
        case 38:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 29]]);
  }));
  return _updateUsers.apply(this, arguments);
}
function updatesubscriptionUsers(_x11, _x12) {
  return _updatesubscriptionUsers.apply(this, arguments);
}
function _updatesubscriptionUsers() {
  _updatesubscriptionUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var updatedata;
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
            message: "User id required!",
            user: _context6.t2
          };
          return _context6.abrupt("return", _context6.t0.json.call(_context6.t0, _context6.t3));
        case 9:
          req.body.data = req.decoded.data;
          // let validation =await createUserValidation(req.body);
          // if(validation.success){
          _context6.next = 12;
          return _user["default"].updatesubscriptionData(req.params.id, req.body, res);
        case 12:
          updatedata = _context6.sent;
          if (updatedata) {
            res.json(updatedata);
          }
          // }else{
          //     res.json({
          //         statusCode: await checkCode('validation'),
          //         success: false,
          //         message:validation.message
          //     })
          // }
          _context6.next = 25;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t4 = _context6["catch"](0);
          _context6.t5 = res.status(500);
          _context6.next = 21;
          return (0, _statusCode.checkCode)('error');
        case 21:
          _context6.t6 = _context6.sent;
          _context6.t7 = _context6.t4;
          _context6.t8 = {
            statusCode: _context6.t6,
            error: _context6.t7,
            success: false,
            message: "Something went wrong!"
          };
          _context6.t5.json.call(_context6.t5, _context6.t8);
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return _updatesubscriptionUsers.apply(this, arguments);
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
          console.log("testing mail");
          _context7.prev = 1;
          _context7.next = 4;
          return _user["default"].loginUser(req.body, res);
        case 4:
          logindata = _context7.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context7.next = 17;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          _context7.t1 = res.status(500);
          _context7.next = 13;
          return (0, _statusCode.checkCode)('error');
        case 13:
          _context7.t2 = _context7.sent;
          _context7.t3 = _context7.t0;
          _context7.t4 = {
            statusCode: _context7.t2,
            error: _context7.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context7.t1.json.call(_context7.t1, _context7.t4);
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return _login.apply(this, arguments);
}
function emailverify(_x15, _x16) {
  return _emailverify.apply(this, arguments);
}
function _emailverify() {
  _emailverify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _user["default"].verifyotpemail(req.body, res);
        case 3:
          logindata = _context8.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context8.next = 16;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          _context8.t1 = res.status(500);
          _context8.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context8.t2 = _context8.sent;
          _context8.t3 = _context8.t0;
          _context8.t4 = {
            statusCode: _context8.t2,
            error: _context8.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context8.t1.json.call(_context8.t1, _context8.t4);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _emailverify.apply(this, arguments);
}
function mobileverify(_x17, _x18) {
  return _mobileverify.apply(this, arguments);
}
function _mobileverify() {
  _mobileverify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _user["default"].verifyotpmobile(req.body, res);
        case 3:
          logindata = _context9.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context9.next = 16;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          _context9.t1 = res.status(500);
          _context9.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context9.t2 = _context9.sent;
          _context9.t3 = _context9.t0;
          _context9.t4 = {
            statusCode: _context9.t2,
            error: _context9.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context9.t1.json.call(_context9.t1, _context9.t4);
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return _mobileverify.apply(this, arguments);
}
function resendotpemail(_x19, _x20) {
  return _resendotpemail.apply(this, arguments);
}
function _resendotpemail() {
  _resendotpemail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _user["default"].resendotpemail(req.body, res);
        case 3:
          logindata = _context10.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context10.next = 16;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          _context10.t1 = res.status(500);
          _context10.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context10.t2 = _context10.sent;
          _context10.t3 = _context10.t0;
          _context10.t4 = {
            statusCode: _context10.t2,
            error: _context10.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context10.t1.json.call(_context10.t1, _context10.t4);
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return _resendotpemail.apply(this, arguments);
}
function resendotpmobile(_x21, _x22) {
  return _resendotpmobile.apply(this, arguments);
}
function _resendotpmobile() {
  _resendotpmobile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _user["default"].resendotpmobile(req.body, res);
        case 3:
          logindata = _context11.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context11.next = 16;
          break;
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          _context11.t1 = res.status(500);
          _context11.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context11.t2 = _context11.sent;
          _context11.t3 = _context11.t0;
          _context11.t4 = {
            statusCode: _context11.t2,
            error: _context11.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context11.t1.json.call(_context11.t1, _context11.t4);
        case 16:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return _resendotpmobile.apply(this, arguments);
}
function checksubscription(_x23, _x24) {
  return _checksubscription.apply(this, arguments);
}
function _checksubscription() {
  _checksubscription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          req.body.data = req.decoded.data;
          _context12.next = 4;
          return _user["default"].checksubscription(req.body, res);
        case 4:
          logindata = _context12.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context12.next = 17;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          _context12.t1 = res.status(500);
          _context12.next = 13;
          return (0, _statusCode.checkCode)('error');
        case 13:
          _context12.t2 = _context12.sent;
          _context12.t3 = _context12.t0;
          _context12.t4 = {
            statusCode: _context12.t2,
            error: _context12.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context12.t1.json.call(_context12.t1, _context12.t4);
        case 17:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return _checksubscription.apply(this, arguments);
}
function checksubscriptionuser(_x25, _x26) {
  return _checksubscriptionuser.apply(this, arguments);
}
function _checksubscriptionuser() {
  _checksubscriptionuser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          req.body.data = req.decoded.data;
          _context13.next = 4;
          return _user["default"].checksubscriptionuser(req.body, res);
        case 4:
          logindata = _context13.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context13.next = 17;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          _context13.t1 = res.status(500);
          _context13.next = 13;
          return (0, _statusCode.checkCode)('error');
        case 13:
          _context13.t2 = _context13.sent;
          _context13.t3 = _context13.t0;
          _context13.t4 = {
            statusCode: _context13.t2,
            error: _context13.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context13.t1.json.call(_context13.t1, _context13.t4);
        case 17:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return _checksubscriptionuser.apply(this, arguments);
}
function testemail(_x27, _x28) {
  return _testemail.apply(this, arguments);
}
function _testemail() {
  _testemail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var logindata;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _user["default"].testemail(req.body, res);
        case 3:
          logindata = _context14.sent;
          if (logindata) {
            res.json(logindata);
          }
          _context14.next = 16;
          break;
        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          _context14.t1 = res.status(500);
          _context14.next = 12;
          return (0, _statusCode.checkCode)('error');
        case 12:
          _context14.t2 = _context14.sent;
          _context14.t3 = _context14.t0.message;
          _context14.t4 = {
            statusCode: _context14.t2,
            error: _context14.t3,
            success: false,
            message: "Something went wrong!"
          };
          _context14.t1.json.call(_context14.t1, _context14.t4);
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return _testemail.apply(this, arguments);
}