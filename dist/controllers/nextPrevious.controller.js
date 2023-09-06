"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextVoucher = nextVoucher;
exports.previousVoucher = previousVoucher;
var _ledgerBalance = _interopRequireDefault(require("../services/ledgerBalance.service"));
var _nextPrevious = _interopRequireDefault(require("../services/nextPrevious.service"));
var _saleVoucher = _interopRequireDefault(require("../services/saleVoucher.service"));
var _purchaseVoucher = _interopRequireDefault(require("../services/purchaseVoucher.service"));
var _recieptVoucher = _interopRequireDefault(require("../services/recieptVoucher.service"));
var _paymentVoucher = _interopRequireDefault(require("../services/paymentVoucher.service"));
var _debitVoucher = _interopRequireDefault(require("../services/debitVoucher.service"));
var _creditVoucher = _interopRequireDefault(require("../services/creditVoucher.service"));
var _journalVoucher = _interopRequireDefault(require("../services/journalVoucher.service"));
var _nextPrevious2 = require("../validation/nextPrevious");
var _statusCode = require("../utility/statusCode");
require("@babel/polyfill");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function previousVoucher(_x, _x2) {
  return _previousVoucher.apply(this, arguments);
}
function _previousVoucher() {
  _previousVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var validation, checkdata, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _nextPrevious2.nextPreviousValidation)(req.body);
        case 3:
          validation = _context.sent;
          if (!validation.success) {
            _context.next = 113;
            break;
          }
          checkdata = null;
          data = null;
          req.body.data = req.decoded.data;
          if (!(req.body.type === "salevoucher")) {
            _context.next = 14;
            break;
          }
          _context.next = 11;
          return _nextPrevious["default"].getpreviousDataDetail_sv(req.body, res);
        case 11:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 14:
          if (!(req.body.type === "purchasevoucher")) {
            _context.next = 20;
            break;
          }
          _context.next = 17;
          return _nextPrevious["default"].getpreviousDataDetail_purv(req.body, res);
        case 17:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 20:
          if (!(req.body.type === "recieptvoucher")) {
            _context.next = 26;
            break;
          }
          _context.next = 23;
          return _nextPrevious["default"].getpreviousDataDetail_rv(req.body, res);
        case 23:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 26:
          if (!(req.body.type === "paymentvoucher")) {
            _context.next = 32;
            break;
          }
          _context.next = 29;
          return _nextPrevious["default"].getpreviousDataDetail_payv(req.body, res);
        case 29:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 32:
          if (!(req.body.type === "debitvoucher")) {
            _context.next = 38;
            break;
          }
          _context.next = 35;
          return _nextPrevious["default"].getpreviousDataDetail_dv(req.body, res);
        case 35:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 38:
          if (!(req.body.type === "creditvoucher")) {
            _context.next = 44;
            break;
          }
          _context.next = 41;
          return _nextPrevious["default"].getpreviousDataDetail_cv(req.body, res);
        case 41:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 44:
          if (!(req.body.type === "journalvoucher")) {
            _context.next = 50;
            break;
          }
          _context.next = 47;
          return _nextPrevious["default"].getpreviousDataDetail_jv(req.body, res);
        case 47:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 50:
          if (!(req.body.type === "itemstockvoucher")) {
            _context.next = 56;
            break;
          }
          _context.next = 53;
          return _nextPrevious["default"].getpreviousDataDetail_isv(req.body, res);
        case 53:
          checkdata = _context.sent;
          _context.next = 57;
          break;
        case 56:
          checkdata = null;
        case 57:
          if (!checkdata) {
            _context.next = 110;
            break;
          }
          if (!(req.body.type === "salevoucher")) {
            _context.next = 64;
            break;
          }
          _context.next = 61;
          return _saleVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 61:
          data = _context.sent;
          _context.next = 107;
          break;
        case 64:
          if (!(req.body.type === "purchasevoucher")) {
            _context.next = 70;
            break;
          }
          _context.next = 67;
          return _purchaseVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 67:
          data = _context.sent;
          _context.next = 107;
          break;
        case 70:
          if (!(req.body.type === "recieptvoucher")) {
            _context.next = 76;
            break;
          }
          _context.next = 73;
          return _recieptVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 73:
          data = _context.sent;
          _context.next = 107;
          break;
        case 76:
          if (!(req.body.type === "paymentvoucher")) {
            _context.next = 82;
            break;
          }
          _context.next = 79;
          return _paymentVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 79:
          data = _context.sent;
          _context.next = 107;
          break;
        case 82:
          if (!(req.body.type === "debitvoucher")) {
            _context.next = 88;
            break;
          }
          _context.next = 85;
          return _debitVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 85:
          data = _context.sent;
          _context.next = 107;
          break;
        case 88:
          if (!(req.body.type === "creditvoucher")) {
            _context.next = 94;
            break;
          }
          _context.next = 91;
          return _creditVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 91:
          data = _context.sent;
          _context.next = 107;
          break;
        case 94:
          if (!(req.body.type === "journalvoucher")) {
            _context.next = 100;
            break;
          }
          _context.next = 97;
          return _journalVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 97:
          data = _context.sent;
          _context.next = 107;
          break;
        case 100:
          if (!(req.body.type === "itemstockvoucher")) {
            _context.next = 106;
            break;
          }
          _context.next = 103;
          return _journalVoucher["default"].getSingleDatastockentry(checkdata.uid, req.body, res);
        case 103:
          data = _context.sent;
          _context.next = 107;
          break;
        case 106:
          data = null;
        case 107:
          if (data) {
            res.json(data);
          } else {
            res.json({
              statusCode: 200,
              success: false,
              message: "something went wrong"
            });
          }
          _context.next = 111;
          break;
        case 110:
          res.json({
            statusCode: 200,
            success: false,
            message: "something went wrong"
          });
        case 111:
          _context.next = 120;
          break;
        case 113:
          _context.t0 = res;
          _context.next = 116;
          return (0, _statusCode.checkCode)("validation");
        case 116:
          _context.t1 = _context.sent;
          _context.t2 = validation.message;
          _context.t3 = {
            statusCode: _context.t1,
            success: false,
            message: _context.t2
          };
          _context.t0.json.call(_context.t0, _context.t3);
        case 120:
          _context.next = 125;
          break;
        case 122:
          _context.prev = 122;
          _context.t4 = _context["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context.t4.message,
            message: "Something went wrong!"
          });
        case 125:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 122]]);
  }));
  return _previousVoucher.apply(this, arguments);
}
function nextVoucher(_x3, _x4) {
  return _nextVoucher.apply(this, arguments);
} // export async function nextVoucher(req, res) {
//     try{
//         let validation =await nextPreviousValidation(req.body);
//         if(validation.success){
//              req.body.data = req.decoded.data;
//             let checkdata = await  NextPrevious.getpreviousDataDetail_sv(req.body, res);
//             if(checkdata){
//         let data = await SaleVoucher.getSingleData(checkdata.uid, req.body, res);
//         if(data){
//             res.json(data);
//         }
//             }else{
//                 res.json({
//                 statusCode: 200,
//                 success: false,
//                 message:'something went wrong'
//             })
//             }
//         }else{
//             res.json({
//                 statusCode: await checkCode('validation'),
//                 success: false,
//                 message:validation.message
//             })
//         }
//     }catch(err){
//         res.status(500).json({
//             statusCode:res.statusCode,
//             success: false,
//             error:err.message,
//             message:"Something went wrong!"
//         })
//     }
// }
function _nextVoucher() {
  _nextVoucher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var validation, checkdata, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _nextPrevious2.nextPreviousValidation)(req.body);
        case 3:
          validation = _context2.sent;
          if (!validation.success) {
            _context2.next = 114;
            break;
          }
          checkdata = null;
          data = null;
          req.body.data = req.decoded.data;
          // console.log("hello", req.body.type, req.body.type === "salevoucher");
          if (!(req.body.type === "salevoucher")) {
            _context2.next = 14;
            break;
          }
          _context2.next = 11;
          return _nextPrevious["default"].getnextDataDetail_sv(req.body, res);
        case 11:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 14:
          if (!(req.body.type === "purchasevoucher")) {
            _context2.next = 20;
            break;
          }
          _context2.next = 17;
          return _nextPrevious["default"].getnextDataDetail_purv(req.body, res);
        case 17:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 20:
          if (!(req.body.type === "recieptvoucher")) {
            _context2.next = 26;
            break;
          }
          _context2.next = 23;
          return _nextPrevious["default"].getnextDataDetail_rv(req.body, res);
        case 23:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 26:
          if (!(req.body.type === "paymentvoucher")) {
            _context2.next = 32;
            break;
          }
          _context2.next = 29;
          return _nextPrevious["default"].getnextDataDetail_payv(req.body, res);
        case 29:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 32:
          if (!(req.body.type === "debitvoucher")) {
            _context2.next = 38;
            break;
          }
          _context2.next = 35;
          return _nextPrevious["default"].getnextDataDetail_dv(req.body, res);
        case 35:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 38:
          if (!(req.body.type === "creditvoucher")) {
            _context2.next = 44;
            break;
          }
          _context2.next = 41;
          return _nextPrevious["default"].getnextDataDetail_cv(req.body, res);
        case 41:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 44:
          if (!(req.body.type === "journalvoucher")) {
            _context2.next = 50;
            break;
          }
          _context2.next = 47;
          return _nextPrevious["default"].getnextDataDetail_jv(req.body, res);
        case 47:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 50:
          if (!(req.body.type === "itemstockvoucher")) {
            _context2.next = 56;
            break;
          }
          _context2.next = 53;
          return _nextPrevious["default"].getnextDataDetail_isv(req.body, res);
        case 53:
          checkdata = _context2.sent;
          _context2.next = 57;
          break;
        case 56:
          checkdata = null;
        case 57:
          console.log("checkdata", checkdata);
          if (!checkdata) {
            _context2.next = 111;
            break;
          }
          if (!(req.body.type === "salevoucher")) {
            _context2.next = 65;
            break;
          }
          _context2.next = 62;
          return _saleVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 62:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 65:
          if (!(req.body.type === "purchasevoucher")) {
            _context2.next = 71;
            break;
          }
          _context2.next = 68;
          return _purchaseVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 68:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 71:
          if (!(req.body.type === "recieptvoucher")) {
            _context2.next = 77;
            break;
          }
          _context2.next = 74;
          return _recieptVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 74:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 77:
          if (!(req.body.type === "paymentvoucher")) {
            _context2.next = 83;
            break;
          }
          _context2.next = 80;
          return _paymentVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 80:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 83:
          if (!(req.body.type === "debitvoucher")) {
            _context2.next = 89;
            break;
          }
          _context2.next = 86;
          return _debitVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 86:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 89:
          if (!(req.body.type === "creditvoucher")) {
            _context2.next = 95;
            break;
          }
          _context2.next = 92;
          return _creditVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 92:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 95:
          if (!(req.body.type === "journalvoucher")) {
            _context2.next = 101;
            break;
          }
          _context2.next = 98;
          return _journalVoucher["default"].getSingleData(checkdata.uid, req.body, res);
        case 98:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 101:
          if (!(req.body.type === "itemstockvoucher")) {
            _context2.next = 107;
            break;
          }
          _context2.next = 104;
          return _journalVoucher["default"].getSingleDatastockentry(checkdata.uid, req.body, res);
        case 104:
          data = _context2.sent;
          _context2.next = 108;
          break;
        case 107:
          data = null;
        case 108:
          if (data) {
            res.json(data);
          } else {
            res.json({
              statusCode: 200,
              success: false,
              code: 1,
              message: "something went wrong"
            });
          }
          _context2.next = 112;
          break;
        case 111:
          res.json({
            statusCode: 200,
            success: false,
            code: 2,
            message: "No data found!"
          });
        case 112:
          _context2.next = 121;
          break;
        case 114:
          _context2.t0 = res;
          _context2.next = 117;
          return (0, _statusCode.checkCode)("validation");
        case 117:
          _context2.t1 = _context2.sent;
          _context2.t2 = validation.message;
          _context2.t3 = {
            statusCode: _context2.t1,
            success: false,
            message: _context2.t2
          };
          _context2.t0.json.call(_context2.t0, _context2.t3);
        case 121:
          _context2.next = 126;
          break;
        case 123:
          _context2.prev = 123;
          _context2.t4 = _context2["catch"](0);
          res.status(500).json({
            statusCode: res.statusCode,
            success: false,
            error: _context2.t4.message,
            message: "Something went wrong!"
          });
        case 126:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 123]]);
  }));
  return _nextVoucher.apply(this, arguments);
}