"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encreptionSale = exports.decreptionSale = void 0;
var _paymentvoucher = require("./paymentvoucher");
var _voucherReport = require("./voucherReport");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var iv = Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');
var key = '';
var encreptionSale = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //console.log('forenc',data);
          key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);
          _context.next = 3;
          return data.narration;
        case 3:
          _context.t0 = _context.sent;
          if (!_context.t0) {
            _context.next = 6;
            break;
          }
          _context.t0 = data.narration !== '';
        case 6:
          if (!_context.t0) {
            _context.next = 10;
            break;
          }
          _context.t1 = encrypt(data.narration).toString();
          _context.next = 11;
          break;
        case 10:
          _context.t1 = '';
        case 11:
          data.narration = _context.t1;
          _context.next = 14;
          return data.bank_name;
        case 14:
          _context.t2 = _context.sent;
          if (!_context.t2) {
            _context.next = 17;
            break;
          }
          _context.t2 = data.bank_name !== '';
        case 17:
          if (!_context.t2) {
            _context.next = 21;
            break;
          }
          _context.t3 = encrypt(data.bank_name).toString();
          _context.next = 22;
          break;
        case 21:
          _context.t3 = '';
        case 22:
          data.bank_name = _context.t3;
          _context.next = 25;
          return data.bank_account_number;
        case 25:
          _context.t4 = _context.sent;
          if (!_context.t4) {
            _context.next = 28;
            break;
          }
          _context.t4 = data.bank_account_number !== '';
        case 28:
          if (!_context.t4) {
            _context.next = 32;
            break;
          }
          _context.t5 = encrypt(data.bank_account_number).toString();
          _context.next = 33;
          break;
        case 32:
          _context.t5 = '';
        case 33:
          data.bank_account_number = _context.t5;
          _context.next = 36;
          return data.bank_ifsc;
        case 36:
          _context.t6 = _context.sent;
          if (!_context.t6) {
            _context.next = 39;
            break;
          }
          _context.t6 = data.bank_ifsc !== '';
        case 39:
          if (!_context.t6) {
            _context.next = 43;
            break;
          }
          _context.t7 = encrypt(data.bank_ifsc).toString();
          _context.next = 44;
          break;
        case 43:
          _context.t7 = '';
        case 44:
          data.bank_ifsc = _context.t7;
          _context.next = 47;
          return data.shipping_address;
        case 47:
          _context.t8 = _context.sent;
          if (!_context.t8) {
            _context.next = 50;
            break;
          }
          _context.t8 = data.shipping_address !== '';
        case 50:
          if (!_context.t8) {
            _context.next = 54;
            break;
          }
          _context.t9 = encrypt(data.shipping_address).toString();
          _context.next = 55;
          break;
        case 54:
          _context.t9 = '';
        case 55:
          data.shipping_address = _context.t9;
          _context.next = 58;
          return data.description;
        case 58:
          _context.t10 = _context.sent;
          if (!_context.t10) {
            _context.next = 61;
            break;
          }
          _context.t10 = data.description !== '';
        case 61:
          if (!_context.t10) {
            _context.next = 65;
            break;
          }
          _context.t11 = encrypt(data.description).toString();
          _context.next = 66;
          break;
        case 65:
          _context.t11 = '';
        case 66:
          data.description = _context.t11;
          _context.next = 69;
          return data.sub_amount;
        case 69:
          _context.t12 = _context.sent;
          if (!_context.t12) {
            _context.next = 72;
            break;
          }
          _context.t12 = data.sub_amount !== '';
        case 72:
          if (!_context.t12) {
            _context.next = 76;
            break;
          }
          _context.t13 = encrypt(data.sub_amount.toString()).toString();
          _context.next = 77;
          break;
        case 76:
          _context.t13 = '';
        case 77:
          data.sub_amount = _context.t13;
          _context.next = 80;
          return data.discount;
        case 80:
          _context.t14 = _context.sent;
          if (!_context.t14) {
            _context.next = 83;
            break;
          }
          _context.t14 = data.discount !== '';
        case 83:
          if (!_context.t14) {
            _context.next = 87;
            break;
          }
          _context.t15 = encrypt(data.discount.toString()).toString();
          _context.next = 88;
          break;
        case 87:
          _context.t15 = '';
        case 88:
          data.discount = _context.t15;
          _context.next = 91;
          return data.total_amount;
        case 91:
          _context.t16 = _context.sent;
          if (!_context.t16) {
            _context.next = 94;
            break;
          }
          _context.t16 = data.total_amount !== '';
        case 94:
          if (!_context.t16) {
            _context.next = 98;
            break;
          }
          _context.t17 = encrypt(data.total_amount.toString()).toString();
          _context.next = 99;
          break;
        case 98:
          _context.t17 = '';
        case 99:
          data.total_amount = _context.t17;
          return _context.abrupt("return", data);
        case 101:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function encreptionSale(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.encreptionSale = encreptionSale;
var decreptionSale = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, type, keydata) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);

          //console.log("forenc",encrypt('85248785'));
          //console.log('fordec',decrypt(data[3].bank_account_number));
          _context2.next = 3;
          return type;
        case 3:
          _context2.t0 = _context2.sent;
          if (!(_context2.t0 === 'array')) {
            _context2.next = 10;
            break;
          }
          _context2.next = 7;
          return data.map(function (item) {
            if (item.SalesLedger) {
              item.SalesLedger.name = item.SalesLedger.name && item.SalesLedger.name !== '' ? decrypt(item.SalesLedger.name) : '';
              item.SalesLedger.email = item.SalesLedger.email && item.SalesLedger.email !== '' ? decrypt(item.SalesLedger.email) : '';
              item.SalesLedger.amount = item.SalesLedger.amount && item.SalesLedger.amount !== '' ? decrypt(item.SalesLedger.amount) : '';
              item.SalesLedger.phone = item.SalesLedger.phone && item.SalesLedger.phone !== '' ? decrypt(item.SalesLedger.phone) : '';
              item.SalesLedger.street = item.SalesLedger.street && item.SalesLedger.street !== '' ? decrypt(item.SalesLedger.street) : '';
              item.SalesLedger.area = item.SalesLedger.area && item.SalesLedger.area !== '' ? decrypt(item.SalesLedger.area) : '';
              item.SalesLedger.gst_number = item.SalesLedger.gst_number && item.SalesLedger.gst_number !== '' ? decrypt(item.SalesLedger.gst_number) : '';
              item.SalesLedger.opening_balance = item.SalesLedger.opening_balance && item.SalesLedger.opening_balance !== '' ? decrypt(item.SalesLedger.opening_balance) : '';
              item.SalesLedger.cess_tax = item.SalesLedger.cess_tax && item.SalesLedger.cess_tax !== '' ? decrypt(item.SalesLedger.cess_tax) : '';
              item.SalesLedger.bank_name = item.SalesLedger.bank_name && item.SalesLedger.bank_name !== '' ? decrypt(item.SalesLedger.bank_name) : '';
              item.SalesLedger.bank_branch = item.SalesLedger.bank_branch && item.SalesLedger.bank_branch !== '' ? decrypt(item.SalesLedger.bank_branch) : '';
              item.SalesLedger.account_holder_name = item.SalesLedger.account_holder_name && item.SalesLedger.account_holder_name !== '' ? decrypt(item.SalesLedger.account_holder_name) : '';
              item.SalesLedger.ifsc = item.SalesLedger.ifsc && item.SalesLedger.ifsc !== '' ? decrypt(item.SalesLedger.ifsc) : '';
              item.SalesLedger.pan_number = item.SalesLedger.pan_number && item.SalesLedger.pan_number !== '' ? decrypt(item.SalesLedger.pan_number) : '';
              item.SalesLedger.bank_account_number = item.SalesLedger.bank_account_number && item.SalesLedger.bank_account_number !== '' ? decrypt(item.SalesLedger.bank_account_number) : '';
              item.SalesLedger.website = item.SalesLedger.website && item.SalesLedger.website !== '' ? decrypt(item.SalesLedger.website) : '';
              item.SalesLedger.jurisdiction = item.SalesLedger.jurisdiction && item.SalesLedger.jurisdiction !== '' ? decrypt(item.SalesLedger.jurisdiction) : '';
              item.SalesLedger.cin_number = item.SalesLedger.cin_number && item.SalesLedger.cin_number !== '' ? decrypt(item.SalesLedger.cin_number) : '';
            }
            if (item.SalesRoundoffLedger) {
              item.SalesRoundoffLedger.name = item.SalesRoundoffLedger.name && item.SalesRoundoffLedger.name !== '' ? decrypt(item.SalesRoundoffLedger.name) : '';
              item.SalesRoundoffLedger.email = item.SalesRoundoffLedger.email && item.SalesRoundoffLedger.email !== '' ? decrypt(item.SalesRoundoffLedger.email) : '';
              item.SalesRoundoffLedger.amount = item.SalesRoundoffLedger.amount && item.SalesRoundoffLedger.amount !== '' ? decrypt(item.SalesRoundoffLedger.amount) : '';
              item.SalesRoundoffLedger.phone = item.SalesRoundoffLedger.phone && item.SalesRoundoffLedger.phone !== '' ? decrypt(item.SalesRoundoffLedger.phone) : '';
              item.SalesRoundoffLedger.street = item.SalesRoundoffLedger.street && item.SalesRoundoffLedger.street !== '' ? decrypt(item.SalesRoundoffLedger.street) : '';
              item.SalesRoundoffLedger.area = item.SalesRoundoffLedger.area && item.SalesRoundoffLedger.area !== '' ? decrypt(item.SalesRoundoffLedger.area) : '';
              item.SalesRoundoffLedger.gst_number = item.SalesRoundoffLedger.gst_number && item.SalesRoundoffLedger.gst_number !== '' ? decrypt(item.SalesRoundoffLedger.gst_number) : '';
              item.SalesRoundoffLedger.opening_balance = item.SalesRoundoffLedger.opening_balance && item.SalesRoundoffLedger.opening_balance !== '' ? decrypt(item.SalesRoundoffLedger.opening_balance) : '';
              item.SalesRoundoffLedger.cess_tax = item.SalesRoundoffLedger.cess_tax && item.SalesRoundoffLedger.cess_tax !== '' ? decrypt(item.SalesRoundoffLedger.cess_tax) : '';
              item.SalesRoundoffLedger.bank_name = item.SalesRoundoffLedger.bank_name && item.SalesRoundoffLedger.bank_name !== '' ? decrypt(item.SalesRoundoffLedger.bank_name) : '';
              item.SalesRoundoffLedger.bank_branch = item.SalesRoundoffLedger.bank_branch && item.SalesRoundoffLedger.bank_branch !== '' ? decrypt(item.SalesRoundoffLedger.bank_branch) : '';
              item.SalesRoundoffLedger.account_holder_name = item.SalesRoundoffLedger.account_holder_name && item.SalesRoundoffLedger.account_holder_name !== '' ? decrypt(item.SalesRoundoffLedger.account_holder_name) : '';
              item.SalesRoundoffLedger.ifsc = item.SalesRoundoffLedger.ifsc && item.SalesRoundoffLedger.ifsc !== '' ? decrypt(item.SalesRoundoffLedger.ifsc) : '';
              item.SalesRoundoffLedger.pan_number = item.SalesRoundoffLedger.pan_number && item.SalesRoundoffLedger.pan_number !== '' ? decrypt(item.SalesRoundoffLedger.pan_number) : '';
              item.SalesRoundoffLedger.bank_account_number = item.SalesRoundoffLedger.bank_account_number && item.SalesRoundoffLedger.bank_account_number !== '' ? decrypt(item.SalesRoundoffLedger.bank_account_number) : '';
              item.SalesRoundoffLedger.website = item.SalesRoundoffLedger.website && item.SalesRoundoffLedger.website !== '' ? decrypt(item.SalesRoundoffLedger.website) : '';
              item.SalesRoundoffLedger.jurisdiction = item.SalesRoundoffLedger.jurisdiction && item.SalesRoundoffLedger.jurisdiction !== '' ? decrypt(item.SalesRoundoffLedger.jurisdiction) : '';
              item.SalesRoundoffLedger.cin_number = item.SalesRoundoffLedger.cin_number && item.SalesRoundoffLedger.cin_number !== '' ? decrypt(item.SalesRoundoffLedger.cin_number) : '';
            }
            if (item.SalesDiscountLedger) {
              item.SalesDiscountLedger.name = item.SalesDiscountLedger.name && item.SalesDiscountLedger.name !== '' ? decrypt(item.SalesDiscountLedger.name) : '';
              item.SalesDiscountLedger.email = item.SalesDiscountLedger.email && item.SalesDiscountLedger.email !== '' ? decrypt(item.SalesDiscountLedger.email) : '';
              item.SalesDiscountLedger.amount = item.SalesDiscountLedger.amount && item.SalesDiscountLedger.amount !== '' ? decrypt(item.SalesDiscountLedger.amount) : '';
              item.SalesDiscountLedger.phone = item.SalesDiscountLedger.phone && item.SalesDiscountLedger.phone !== '' ? decrypt(item.SalesDiscountLedger.phone) : '';
              item.SalesDiscountLedger.street = item.SalesDiscountLedger.street && item.SalesDiscountLedger.street !== '' ? decrypt(item.SalesDiscountLedger.street) : '';
              item.SalesDiscountLedger.area = item.SalesDiscountLedger.area && item.SalesDiscountLedger.area !== '' ? decrypt(item.SalesDiscountLedger.area) : '';
              item.SalesDiscountLedger.gst_number = item.SalesDiscountLedger.gst_number && item.SalesDiscountLedger.gst_number !== '' ? decrypt(item.SalesDiscountLedger.gst_number) : '';
              item.SalesDiscountLedger.opening_balance = item.SalesDiscountLedger.opening_balance && item.SalesDiscountLedger.opening_balance !== '' ? decrypt(item.SalesDiscountLedger.opening_balance) : '';
              item.SalesDiscountLedger.cess_tax = item.SalesDiscountLedger.cess_tax && item.SalesDiscountLedger.cess_tax !== '' ? decrypt(item.SalesDiscountLedger.cess_tax) : '';
              item.SalesDiscountLedger.bank_name = item.SalesDiscountLedger.bank_name && item.SalesDiscountLedger.bank_name !== '' ? decrypt(item.SalesDiscountLedger.bank_name) : '';
              item.SalesDiscountLedger.bank_branch = item.SalesDiscountLedger.bank_branch && item.SalesDiscountLedger.bank_branch !== '' ? decrypt(item.SalesDiscountLedger.bank_branch) : '';
              item.SalesDiscountLedger.account_holder_name = item.SalesDiscountLedger.account_holder_name && item.SalesDiscountLedger.account_holder_name !== '' ? decrypt(item.SalesDiscountLedger.account_holder_name) : '';
              item.SalesDiscountLedger.ifsc = item.SalesDiscountLedger.ifsc && item.SalesDiscountLedger.ifsc !== '' ? decrypt(item.SalesDiscountLedger.ifsc) : '';
              item.SalesDiscountLedger.pan_number = item.SalesDiscountLedger.pan_number && item.SalesDiscountLedger.pan_number !== '' ? decrypt(item.SalesDiscountLedger.pan_number) : '';
              item.SalesDiscountLedger.bank_account_number = item.SalesDiscountLedger.bank_account_number && item.SalesDiscountLedger.bank_account_number !== '' ? decrypt(item.SalesDiscountLedger.bank_account_number) : '';
              item.SalesDiscountLedger.website = item.SalesDiscountLedger.website && item.SalesDiscountLedger.website !== '' ? decrypt(item.SalesDiscountLedger.website) : '';
              item.SalesDiscountLedger.jurisdiction = item.SalesDiscountLedger.jurisdiction && item.SalesDiscountLedger.jurisdiction !== '' ? decrypt(item.SalesDiscountLedger.jurisdiction) : '';
              item.SalesDiscountLedger.cin_number = item.SalesDiscountLedger.cin_number && item.SalesDiscountLedger.cin_number !== '' ? decrypt(item.SalesDiscountLedger.cin_number) : '';
            }
            if (item.item_entries && item.item_entries.length > 0) {
              item.item_entries.map(function (ele) {
                ele.quantity = ele.quantity && ele.quantity !== '' ? decrypt(ele.quantity) : '';
                ele.name = ele.name && ele.name !== '' ? decrypt(ele.name) : '';
                ele.hsn_code = ele.hsn_code && ele.hsn_code !== '' ? decrypt(ele.hsn_code) : '';
                ele.price = ele.price && ele.price !== '' ? decrypt(ele.price) : '';
                ele.discount = ele.discount && ele.discount !== '' ? decrypt(ele.discount) : '';
                ele.total_amount = ele.total_amount && ele.total_amount !== '' ? decrypt(ele.total_amount) : '';
                if (ele.itemone) {
                  ele.itemone.name = ele.itemone.name && ele.itemone.name !== '' ? decrypt(ele.itemone.name) : '';
                  ele.itemone.hsn_code = ele.itemone.hsn_code && ele.itemone.hsn_code !== '' ? decrypt(ele.itemone.hsn_code) : '';
                  ele.itemone.rate = ele.itemone.rate && ele.itemone.rate !== '' ? decrypt(ele.itemone.rate) : '';
                  ele.itemone.quantity = ele.itemone.quantity && ele.itemone.quantity !== '' ? decrypt(ele.itemone.quantity) : '';
                  ele.itemone.total_value = ele.itemone.total_value && ele.itemone.total_value !== '' ? decrypt(ele.itemone.total_value) : '';
                  ele.itemone.cess_tax = ele.itemone.cess_tax && ele.itemone.cess_tax !== '' ? decrypt(ele.itemone.cess_tax) : '';
                }
              });
            }
            if (item.tax_entries && item.tax_entries.length > 0) {
              item.tax_entries.map(function (ele) {
                ele.amount = ele.amount && ele.amount !== '' ? decrypt(ele.amount) : '';
                if (ele.ledger) {
                  ele.ledger.name = ele.ledger.name && ele.ledger.name !== '' ? decrypt(ele.ledger.name) : '';
                  ele.ledger.email = ele.ledger.email && ele.ledger.email !== '' ? decrypt(ele.ledger.email) : '';
                  ele.ledger.amount = ele.ledger.amount && ele.ledger.amount !== '' ? decrypt(ele.ledger.amount) : '';
                  ele.ledger.phone = ele.ledger.phone && ele.ledger.phone !== '' ? decrypt(ele.ledger.phone) : '';
                  ele.ledger.street = ele.ledger.street && ele.ledger.street !== '' ? decrypt(ele.ledger.street) : '';
                  ele.ledger.area = ele.ledger.area && ele.ledger.area !== '' ? decrypt(ele.ledger.area) : '';
                  ele.ledger.gst_number = ele.ledger.gst_number && ele.ledger.gst_number !== '' ? decrypt(ele.ledger.gst_number) : '';
                  ele.ledger.opening_balance = ele.ledger.opening_balance && ele.ledger.opening_balance !== '' ? decrypt(ele.ledger.opening_balance) : '';
                  ele.ledger.cess_tax = ele.ledger.cess_tax && ele.ledger.cess_tax !== '' ? decrypt(ele.ledger.cess_tax) : '';
                  ele.ledger.bank_name = ele.ledger.bank_name && ele.ledger.bank_name !== '' ? decrypt(ele.ledger.bank_name) : '';
                  ele.ledger.bank_branch = ele.ledger.bank_branch && ele.ledger.bank_branch !== '' ? decrypt(ele.ledger.bank_branch) : '';
                  ele.ledger.account_holder_name = ele.ledger.account_holder_name && ele.ledger.account_holder_name !== '' ? decrypt(ele.ledger.account_holder_name) : '';
                  ele.ledger.ifsc = ele.ledger.ifsc && ele.ledger.ifsc !== '' ? decrypt(ele.ledger.ifsc) : '';
                  ele.ledger.pan_number = ele.ledger.pan_number && ele.ledger.pan_number !== '' ? decrypt(ele.ledger.pan_number) : '';
                  ele.ledger.bank_account_number = ele.ledger.bank_account_number && ele.ledger.bank_account_number !== '' ? decrypt(ele.ledger.bank_account_number) : '';
                }
              });
            }
            if (item.voucher_entries && item.voucher_entries.length > 0) {
              item.voucher_entries.map(function (voucher) {
                voucher.amount = voucher.amount && voucher.amount !== '' ? decrypt(voucher.amount) : '';
                if (voucher.ledger) {
                  voucher.ledger.name = voucher.ledger.name && voucher.ledger.name !== '' ? decrypt(voucher.ledger.name) : '';
                  voucher.ledger.email = voucher.ledger.email && voucher.ledger.email !== '' ? decrypt(voucher.ledger.email) : '';
                  voucher.ledger.amount = voucher.ledger.amount && voucher.ledger.amount !== '' ? decrypt(voucher.ledger.amount) : '';
                  voucher.ledger.phone = voucher.ledger.phone && voucher.ledger.phone !== '' ? decrypt(voucher.ledger.phone) : '';
                  voucher.ledger.street = voucher.ledger.street && voucher.ledger.street !== '' ? decrypt(voucher.ledger.street) : '';
                  voucher.ledger.area = voucher.ledger.area && voucher.ledger.area !== '' ? decrypt(voucher.ledger.area) : '';
                  voucher.ledger.gst_number = voucher.ledger.gst_number && voucher.ledger.gst_number !== '' ? decrypt(voucher.ledger.gst_number) : '';
                  voucher.ledger.opening_balance = voucher.ledger.opening_balance && voucher.ledger.opening_balance !== '' ? decrypt(voucher.ledger.opening_balance) : '';
                  voucher.ledger.cess_tax = voucher.ledger.cess_tax && voucher.ledger.cess_tax !== '' ? decrypt(voucher.ledger.cess_tax) : '';
                  voucher.ledger.bank_name = voucher.ledger.bank_name && voucher.ledger.bank_name !== '' ? decrypt(voucher.ledger.bank_name) : '';
                  voucher.ledger.bank_branch = voucher.ledger.bank_branch && voucher.ledger.bank_branch !== '' ? decrypt(voucher.ledger.bank_branch) : '';
                  voucher.ledger.account_holder_name = voucher.ledger.account_holder_name && voucher.ledger.account_holder_name !== '' ? decrypt(voucher.ledger.account_holder_name) : '';
                  voucher.ledger.ifsc = voucher.ledger.ifsc && voucher.ledger.ifsc !== '' ? decrypt(voucher.ledger.ifsc) : '';
                  voucher.ledger.pan_number = voucher.ledger.pan_number && voucher.ledger.pan_number !== '' ? decrypt(voucher.ledger.pan_number) : '';
                  voucher.ledger.bank_account_number = voucher.ledger.bank_account_number && voucher.ledger.bank_account_number !== '' ? decrypt(voucher.ledger.bank_account_number) : '';
                }
              });
            }
            if (item.tax) {
              if (item.tax.SalesLedger) {
                item.tax.SalesLedger.name = item.tax.SalesLedger.name && item.tax.SalesLedger.name !== '' ? decrypt(item.tax.SalesLedger.name) : '';
                item.tax.SalesLedger.email = item.tax.SalesLedger.email && item.tax.SalesLedger.email !== '' ? decrypt(item.tax.SalesLedger.email) : '';
                item.tax.SalesLedger.amount = item.tax.SalesLedger.amount && item.tax.SalesLedger.amount !== '' ? decrypt(item.tax.SalesLedger.amount) : '';
                item.tax.SalesLedger.phone = item.tax.SalesLedger.phone && item.tax.SalesLedger.phone !== '' ? decrypt(item.tax.SalesLedger.phone) : '';
                item.tax.SalesLedger.street = item.tax.SalesLedger.street && item.tax.SalesLedger.street !== '' ? decrypt(item.tax.SalesLedger.street) : '';
                item.tax.SalesLedger.area = item.tax.SalesLedger.area && item.tax.SalesLedger.area !== '' ? decrypt(item.tax.SalesLedger.area) : '';
                item.tax.SalesLedger.gst_number = item.tax.SalesLedger.gst_number && item.tax.SalesLedger.gst_number !== '' ? decrypt(item.tax.SalesLedger.gst_number) : '';
                item.tax.SalesLedger.opening_balance = item.tax.SalesLedger.opening_balance && item.tax.SalesLedger.opening_balance !== '' ? decrypt(item.tax.SalesLedger.opening_balance) : '';
                item.tax.SalesLedger.cess_tax = item.tax.SalesLedger.cess_tax && item.tax.SalesLedger.cess_tax !== '' ? decrypt(item.tax.SalesLedger.cess_tax) : '';
                item.tax.SalesLedger.bank_name = item.tax.SalesLedger.bank_name && item.tax.SalesLedger.bank_name !== '' ? decrypt(item.tax.SalesLedger.bank_name) : '';
                item.tax.SalesLedger.bank_branch = item.tax.SalesLedger.bank_branch && item.tax.SalesLedger.bank_branch !== '' ? decrypt(item.tax.SalesLedger.bank_branch) : '';
                item.tax.SalesLedger.account_holder_name = item.tax.SalesLedger.account_holder_name && item.tax.SalesLedger.account_holder_name !== '' ? decrypt(item.tax.SalesLedger.account_holder_name) : '';
                item.tax.SalesLedger.ifsc = item.tax.SalesLedger.ifsc && item.tax.SalesLedger.ifsc !== '' ? decrypt(item.tax.SalesLedger.ifsc) : '';
                item.tax.SalesLedger.pan_number = item.tax.SalesLedger.pan_number && item.tax.SalesLedger.pan_number !== '' ? decrypt(item.tax.SalesLedger.pan_number) : '';
                item.tax.SalesLedger.bank_account_number = item.tax.SalesLedger.bank_account_number && item.tax.SalesLedger.bank_account_number !== '' ? decrypt(item.tax.SalesLedger.bank_account_number) : '';
                item.tax.SalesLedger.website = item.tax.SalesLedger.website && item.tax.SalesLedger.website !== '' ? decrypt(item.tax.SalesLedger.website) : '';
                item.tax.SalesLedger.jurisdiction = item.tax.SalesLedger.jurisdiction && item.tax.SalesLedger.jurisdiction !== '' ? decrypt(item.tax.SalesLedger.jurisdiction) : '';
                item.tax.SalesLedger.cin_number = item.tax.SalesLedger.cin_number && item.tax.SalesLedger.cin_number !== '' ? decrypt(item.tax.SalesLedger.cin_number) : '';
              }
              item.tax.amount = item.tax.amount && item.tax.amount !== '' ? decrypt(item.tax.amount) : '';
              item.tax.narration = item.tax.narration && item.tax.narration !== '' ? decrypt(item.tax.narration) : '';
              item.tax.bank_name = item.tax.bank_name && item.tax.bank_name !== '' ? decrypt(item.tax.bank_name) : '';
              item.tax.bank_account_number = item.tax.bank_account_number && item.tax.bank_account_number !== '' ? decrypt(item.tax.bank_account_number) : '';
              item.tax.bank_ifsc = item.tax.bank_ifsc && item.tax.bank_ifsc !== '' ? decrypt(item.tax.bank_ifsc) : '';
              item.tax.shipping_address = item.tax.shipping_address && item.tax.shipping_address !== '' ? decrypt(item.tax.shipping_address) : '';
              item.tax.sub_amount = item.tax.sub_amount && item.tax.sub_amount !== '' ? decrypt(item.tax.sub_amount) : '';
              item.tax.discount = item.tax.discount && item.tax.discount !== '' ? decrypt(item.tax.discount) : '';
              item.tax.total_amount = item.tax.total_amount && item.tax.total_amount !== '' ? decrypt(item.tax.total_amount) : '';
            }
            if (item.Vouchers) {
              if (item.Vouchers.SalesLedger) {
                item.Vouchers.SalesLedger.name = item.Vouchers.SalesLedger.name && item.Vouchers.SalesLedger.name !== '' ? decrypt(item.Vouchers.SalesLedger.name) : '';
                item.Vouchers.SalesLedger.email = item.Vouchers.SalesLedger.email && item.Vouchers.SalesLedger.email !== '' ? decrypt(item.Vouchers.SalesLedger.email) : '';
                item.Vouchers.SalesLedger.amount = item.Vouchers.SalesLedger.amount && item.Vouchers.SalesLedger.amount !== '' ? decrypt(item.Vouchers.SalesLedger.amount) : '';
                item.Vouchers.SalesLedger.phone = item.Vouchers.SalesLedger.phone && item.Vouchers.SalesLedger.phone !== '' ? decrypt(item.Vouchers.SalesLedger.phone) : '';
                item.Vouchers.SalesLedger.street = item.Vouchers.SalesLedger.street && item.Vouchers.SalesLedger.street !== '' ? decrypt(item.Vouchers.SalesLedger.street) : '';
                item.Vouchers.SalesLedger.area = item.Vouchers.SalesLedger.area && item.Vouchers.SalesLedger.area !== '' ? decrypt(item.Vouchers.SalesLedger.area) : '';
                item.Vouchers.SalesLedger.gst_number = item.Vouchers.SalesLedger.gst_number && item.Vouchers.SalesLedger.gst_number !== '' ? decrypt(item.Vouchers.SalesLedger.gst_number) : '';
                item.Vouchers.SalesLedger.opening_balance = item.Vouchers.SalesLedger.opening_balance && item.Vouchers.SalesLedger.opening_balance !== '' ? decrypt(item.Vouchers.SalesLedger.opening_balance) : '';
                item.Vouchers.SalesLedger.cess_Vouchers = item.Vouchers.SalesLedger.cess_Vouchers && item.Vouchers.SalesLedger.cess_Vouchers !== '' ? decrypt(item.Vouchers.SalesLedger.cess_Vouchers) : '';
                item.Vouchers.SalesLedger.bank_name = item.Vouchers.SalesLedger.bank_name && item.Vouchers.SalesLedger.bank_name !== '' ? decrypt(item.Vouchers.SalesLedger.bank_name) : '';
                item.Vouchers.SalesLedger.bank_branch = item.Vouchers.SalesLedger.bank_branch && item.Vouchers.SalesLedger.bank_branch !== '' ? decrypt(item.Vouchers.SalesLedger.bank_branch) : '';
                item.Vouchers.SalesLedger.account_holder_name = item.Vouchers.SalesLedger.account_holder_name && item.Vouchers.SalesLedger.account_holder_name !== '' ? decrypt(item.Vouchers.SalesLedger.account_holder_name) : '';
                item.Vouchers.SalesLedger.ifsc = item.Vouchers.SalesLedger.ifsc && item.Vouchers.SalesLedger.ifsc !== '' ? decrypt(item.Vouchers.SalesLedger.ifsc) : '';
                item.Vouchers.SalesLedger.pan_number = item.Vouchers.SalesLedger.pan_number && item.Vouchers.SalesLedger.pan_number !== '' ? decrypt(item.Vouchers.SalesLedger.pan_number) : '';
                item.Vouchers.SalesLedger.bank_account_number = item.Vouchers.SalesLedger.bank_account_number && item.Vouchers.SalesLedger.bank_account_number !== '' ? decrypt(item.Vouchers.SalesLedger.bank_account_number) : '';
                item.Vouchers.SalesLedger.website = item.Vouchers.SalesLedger.website && item.Vouchers.SalesLedger.website !== '' ? decrypt(item.Vouchers.SalesLedger.website) : '';
                item.Vouchers.SalesLedger.jurisdiction = item.Vouchers.SalesLedger.jurisdiction && item.Vouchers.SalesLedger.jurisdiction !== '' ? decrypt(item.Vouchers.SalesLedger.jurisdiction) : '';
                item.Vouchers.SalesLedger.cin_number = item.Vouchers.SalesLedger.cin_number && item.Vouchers.SalesLedger.cin_number !== '' ? decrypt(item.Vouchers.SalesLedger.cin_number) : '';
              }
              if (item.Vouchers.item_entries && item.Vouchers.item_entries.length > 0) {
                item.Vouchers.item_entries.map(function (ele) {
                  ele.quantity = ele.quantity && ele.quantity !== '' ? decrypt(ele.quantity) : '';
                  ele.name = ele.name && ele.name !== '' ? decrypt(ele.name) : '';
                  ele.hsn_code = ele.hsn_code && ele.hsn_code !== '' ? decrypt(ele.hsn_code) : '';
                  ele.price = ele.price && ele.price !== '' ? decrypt(ele.price) : '';
                  ele.discount = ele.discount && ele.discount !== '' ? decrypt(ele.discount) : '';
                  ele.total_amount = ele.total_amount && ele.total_amount !== '' ? decrypt(ele.total_amount) : '';
                });
              }
              if (item.Vouchers.tax_entries && item.Vouchers.tax_entries.length > 0) {
                item.Vouchers.tax_entries.map(function (ele) {
                  ele.amount = ele.amount && ele.amount !== '' ? decrypt(ele.amount) : '';
                  if (ele.ledger) {
                    ele.ledger.name = ele.ledger.name && ele.ledger.name !== '' ? decrypt(ele.ledger.name) : '';
                    ele.ledger.email = ele.ledger.email && ele.ledger.email !== '' ? decrypt(ele.ledger.email) : '';
                    ele.ledger.amount = ele.ledger.amount && ele.ledger.amount !== '' ? decrypt(ele.ledger.amount) : '';
                    ele.ledger.phone = ele.ledger.phone && ele.ledger.phone !== '' ? decrypt(ele.ledger.phone) : '';
                    ele.ledger.street = ele.ledger.street && ele.ledger.street !== '' ? decrypt(ele.ledger.street) : '';
                    ele.ledger.area = ele.ledger.area && ele.ledger.area !== '' ? decrypt(ele.ledger.area) : '';
                    ele.ledger.gst_number = ele.ledger.gst_number && ele.ledger.gst_number !== '' ? decrypt(ele.ledger.gst_number) : '';
                    ele.ledger.opening_balance = ele.ledger.opening_balance && ele.ledger.opening_balance !== '' ? decrypt(ele.ledger.opening_balance) : '';
                    ele.ledger.cess_tax = ele.ledger.cess_tax && ele.ledger.cess_tax !== '' ? decrypt(ele.ledger.cess_tax) : '';
                    ele.ledger.bank_name = ele.ledger.bank_name && ele.ledger.bank_name !== '' ? decrypt(ele.ledger.bank_name) : '';
                    ele.ledger.bank_branch = ele.ledger.bank_branch && ele.ledger.bank_branch !== '' ? decrypt(ele.ledger.bank_branch) : '';
                    ele.ledger.account_holder_name = ele.ledger.account_holder_name && ele.ledger.account_holder_name !== '' ? decrypt(ele.ledger.account_holder_name) : '';
                    ele.ledger.ifsc = ele.ledger.ifsc && ele.ledger.ifsc !== '' ? decrypt(ele.ledger.ifsc) : '';
                    ele.ledger.pan_number = ele.ledger.pan_number && ele.ledger.pan_number !== '' ? decrypt(ele.ledger.pan_number) : '';
                    ele.ledger.bank_account_number = ele.ledger.bank_account_number && ele.ledger.bank_account_number !== '' ? decrypt(ele.ledger.bank_account_number) : '';
                    ele.ledger.website = ele.ledger.website && ele.ledger.website !== '' ? decrypt(ele.ledger.website) : '';
                    ele.ledger.jurisdiction = ele.ledger.jurisdiction && ele.ledger.jurisdiction !== '' ? decrypt(ele.ledger.jurisdiction) : '';
                    ele.ledger.cin_number = ele.ledger.cin_number && ele.ledger.cin_number !== '' ? decrypt(ele.ledger.cin_number) : '';
                  }
                });
              }
              item.Vouchers.amount = item.Vouchers.amount && item.Vouchers.amount !== '' ? decrypt(item.Vouchers.amount) : null;
              item.Vouchers.narration = item.Vouchers.narration && item.Vouchers.narration !== '' ? decrypt(item.Vouchers.narration) : '';
              item.Vouchers.bank_name = item.Vouchers.bank_name && item.Vouchers.bank_name !== '' ? decrypt(item.Vouchers.bank_name) : '';
              item.Vouchers.bank_account_number = item.Vouchers.bank_account_number && item.Vouchers.bank_account_number !== '' ? decrypt(item.Vouchers.bank_account_number) : '';
              item.Vouchers.bank_ifsc = item.Vouchers.bank_ifsc && item.Vouchers.bank_ifsc !== '' ? decrypt(item.Vouchers.bank_ifsc) : '';
              item.Vouchers.shipping_address = item.Vouchers.shipping_address && item.Vouchers.shipping_address !== '' ? decrypt(item.Vouchers.shipping_address) : '';
              item.Vouchers.sub_amount = item.Vouchers.sub_amount && item.Vouchers.sub_amount !== '' ? decrypt(item.Vouchers.sub_amount) : '';
              item.Vouchers.discount = item.Vouchers.discount && item.Vouchers.discount !== '' ? decrypt(item.Vouchers.discount) : '';
              item.Vouchers.total_amount = item.Vouchers.total_amount && item.Vouchers.total_amount !== '' ? decrypt(item.Vouchers.total_amount) : '';
            }
            if (item.Voucheris) {
              if (item.Voucheris.SalesLedger) {
                item.Voucheris.SalesLedger.name = item.Voucheris.SalesLedger.name && item.Voucheris.SalesLedger.name !== '' ? decrypt(item.Voucheris.SalesLedger.name) : '';
                item.Voucheris.SalesLedger.email = item.Voucheris.SalesLedger.email && item.Voucheris.SalesLedger.email !== '' ? decrypt(item.Voucheris.SalesLedger.email) : '';
                item.Voucheris.SalesLedger.amount = item.Voucheris.SalesLedger.amount && item.Voucheris.SalesLedger.amount !== '' ? decrypt(item.Voucheris.SalesLedger.amount) : '';
                item.Voucheris.SalesLedger.phone = item.Voucheris.SalesLedger.phone && item.Voucheris.SalesLedger.phone !== '' ? decrypt(item.Voucheris.SalesLedger.phone) : '';
                item.Voucheris.SalesLedger.street = item.Voucheris.SalesLedger.street && item.Voucheris.SalesLedger.street !== '' ? decrypt(item.Voucheris.SalesLedger.street) : '';
                item.Voucheris.SalesLedger.area = item.Voucheris.SalesLedger.area && item.Voucheris.SalesLedger.area !== '' ? decrypt(item.Voucheris.SalesLedger.area) : '';
                item.Voucheris.SalesLedger.gst_number = item.Voucheris.SalesLedger.gst_number && item.Voucheris.SalesLedger.gst_number !== '' ? decrypt(item.Voucheris.SalesLedger.gst_number) : '';
                item.Voucheris.SalesLedger.opening_balance = item.Voucheris.SalesLedger.opening_balance && item.Voucheris.SalesLedger.opening_balance !== '' ? decrypt(item.Voucheris.SalesLedger.opening_balance) : '';
                item.Voucheris.SalesLedger.cess_Vouchers = item.Voucheris.SalesLedger.cess_Vouchers && item.Voucheris.SalesLedger.cess_Vouchers !== '' ? decrypt(item.Voucheris.SalesLedger.cess_Vouchers) : '';
                item.Voucheris.SalesLedger.bank_name = item.Voucheris.SalesLedger.bank_name && item.Voucheris.SalesLedger.bank_name !== '' ? decrypt(item.Voucheris.SalesLedger.bank_name) : '';
                item.Voucheris.SalesLedger.bank_branch = item.Voucheris.SalesLedger.bank_branch && item.Voucheris.SalesLedger.bank_branch !== '' ? decrypt(item.Voucheris.SalesLedger.bank_branch) : '';
                item.Voucheris.SalesLedger.account_holder_name = item.Voucheris.SalesLedger.account_holder_name && item.Voucheris.SalesLedger.account_holder_name !== '' ? decrypt(item.Voucheris.SalesLedger.account_holder_name) : '';
                item.Voucheris.SalesLedger.ifsc = item.Voucheris.SalesLedger.ifsc && item.Voucheris.SalesLedger.ifsc !== '' ? decrypt(item.Voucheris.SalesLedger.ifsc) : '';
                item.Voucheris.SalesLedger.pan_number = item.Voucheris.SalesLedger.pan_number && item.Voucheris.SalesLedger.pan_number !== '' ? decrypt(item.Voucheris.SalesLedger.pan_number) : '';
                item.Voucheris.SalesLedger.bank_account_number = item.Voucheris.SalesLedger.bank_account_number && item.Voucheris.SalesLedger.bank_account_number !== '' ? decrypt(item.Voucheris.SalesLedger.bank_account_number) : '';
                item.Voucheris.SalesLedger.website = item.Voucheris.SalesLedger.website && item.Voucheris.SalesLedger.website !== '' ? decrypt(item.Voucheris.SalesLedger.website) : '';
                item.Voucheris.SalesLedger.jurisdiction = item.Voucheris.SalesLedger.jurisdiction && item.Voucheris.SalesLedger.jurisdiction !== '' ? decrypt(item.Voucheris.SalesLedger.jurisdiction) : '';
                item.Voucheris.SalesLedger.cin_number = item.Voucheris.SalesLedger.cin_number && item.Voucheris.SalesLedger.cin_number !== '' ? decrypt(item.Voucheris.SalesLedger.cin_number) : '';
              }
              item.Voucheris.amount = item.Voucheris.amount && item.Voucheris.amount !== '' ? decrypt(item.Voucheris.amount) : null;
              item.Voucheris.narration = item.Voucheris.narration && item.Voucheris.narration !== '' ? decrypt(item.Voucheris.narration) : '';
              item.Voucheris.bank_name = item.Voucheris.bank_name && item.Voucheris.bank_name !== '' ? decrypt(item.Voucheris.bank_name) : '';
              item.Voucheris.bank_account_number = item.Voucheris.bank_account_number && item.Voucheris.bank_account_number !== '' ? decrypt(item.Voucheris.bank_account_number) : '';
              item.Voucheris.bank_ifsc = item.Voucheris.bank_ifsc && item.Voucheris.bank_ifsc !== '' ? decrypt(item.Voucheris.bank_ifsc) : '';
              item.Voucheris.shipping_address = item.Voucheris.shipping_address && item.Voucheris.shipping_address !== '' ? decrypt(item.Voucheris.shipping_address) : '';
              item.Voucheris.sub_amount = item.Voucheris.sub_amount && item.Voucheris.sub_amount !== '' ? decrypt(item.Voucheris.sub_amount) : '';
              item.Voucheris.discount = item.Voucheris.discount && item.Voucheris.discount !== '' ? decrypt(item.Voucheris.discount) : '';
              item.Voucheris.total_amount = item.Voucheris.total_amount && item.Voucheris.total_amount !== '' ? decrypt(item.Voucheris.total_amount) : '';
            }
            item.quantity = item.quantity && item.quantity !== '' ? decrypt(item.quantity) : '';
            item.name = item.name && item.name !== '' ? decrypt(item.name) : '';
            item.description = item.description && item.description !== '' ? decrypt(item.description) : '';
            item.model = item.model && item.model !== '' ? decrypt(item.model) : '';
            item.hsn_code = item.hsn_code && item.hsn_code !== '' ? decrypt(item.hsn_code) : '';
            item.price = item.price && item.price !== '' ? decrypt(item.price) : '';
            item.total_value = item.total_value && item.total_value !== '' ? decrypt(item.total_value) : '';
            item.rate = item.rate && item.rate !== '' ? decrypt(item.rate) : '';
            if (item.ledger) {
              item.ledger.name = item.ledger.name && item.ledger.name !== '' ? decrypt(item.ledger.name) : '';
              item.ledger.email = item.ledger.email && item.ledger.email !== '' ? decrypt(item.ledger.email) : '';
              item.ledger.amount = item.ledger.amount && item.ledger.amount !== '' ? decrypt(item.ledger.amount) : '';
              item.ledger.phone = item.ledger.phone && item.ledger.phone !== '' ? decrypt(item.ledger.phone) : '';
              item.ledger.street = item.ledger.street && item.ledger.street !== '' ? decrypt(item.ledger.street) : '';
              item.ledger.area = item.ledger.area && item.ledger.area !== '' ? decrypt(item.ledger.area) : '';
              item.ledger.gst_number = item.ledger.gst_number && item.ledger.gst_number !== '' ? decrypt(item.ledger.gst_number) : '';
              item.ledger.opening_balance = item.ledger.opening_balance && item.ledger.opening_balance !== '' ? decrypt(item.ledger.opening_balance) : '';
              item.ledger.cess_Vouchers = item.ledger.cess_Vouchers && item.ledger.cess_Vouchers !== '' ? decrypt(item.ledger.cess_Vouchers) : '';
              item.ledger.bank_name = item.ledger.bank_name && item.ledger.bank_name !== '' ? decrypt(item.ledger.bank_name) : '';
              item.ledger.bank_branch = item.ledger.bank_branch && item.ledger.bank_branch !== '' ? decrypt(item.ledger.bank_branch) : '';
              item.ledger.account_holder_name = item.ledger.account_holder_name && item.ledger.account_holder_name !== '' ? decrypt(item.ledger.account_holder_name) : '';
              item.ledger.ifsc = item.ledger.ifsc && item.ledger.ifsc !== '' ? decrypt(item.ledger.ifsc) : '';
              item.ledger.pan_number = item.ledger.pan_number && item.ledger.pan_number !== '' ? decrypt(item.ledger.pan_number) : '';
              item.ledger.bank_account_number = item.ledger.bank_account_number && item.ledger.bank_account_number !== '' ? decrypt(item.ledger.bank_account_number) : '';
              item.ledger.website = item.ledger.website && item.ledger.website !== '' ? decrypt(item.ledger.website) : '';
              item.ledger.jurisdiction = item.ledger.jurisdiction && item.ledger.jurisdiction !== '' ? decrypt(item.ledger.jurisdiction) : '';
              item.ledger.cin_number = item.ledger.cin_number && item.ledger.cin_number !== '' ? decrypt(item.ledger.cin_number) : '';
            }
            item.amount = item.amount && item.amount !== '' ? decrypt(item.amount) : '';

            // if(item.voucherInteries && item.voucherInteries.length>0){
            //   item.voucherInteries.map(voucher=>{
            //     voucher.
            //   })
            // }

            if (item.company) {
              item.company.company_name = item.company.company_name && item.company.company_name !== '' ? decrypt(item.company.company_name) : '';
              item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number !== '' ? decrypt(item.company.company_pan_number) : '';
              item.company.gst_number = item.company.gst_number && item.company.gst_number !== '' ? decrypt(item.company.gst_number) : '';
              item.company.street = item.company.street && item.company.street !== '' ? decrypt(item.company.street) : '';
              item.company.area = item.company.area && item.company.area !== '' ? decrypt(item.company.area) : '';
              item.company.company_logo = item.company.company_logo && item.company.company_logo !== '' ? decrypt(item.company.company_logo) : '';
            }
            item.narration = item.narration && item.narration !== '' ? decrypt(item.narration) : '';
            item.bank_name = item.bank_name && item.bank_name !== '' ? decrypt(item.bank_name) : '';
            item.bank_account_number = item.bank_account_number && item.bank_account_number !== '' ? decrypt(item.bank_account_number) : '';
            item.bank_ifsc = item.bank_ifsc && item.bank_ifsc !== '' ? decrypt(item.bank_ifsc) : '';
            item.shipping_address = item.shipping_address && item.shipping_address !== '' ? decrypt(item.shipping_address) : '';
            // item.description = item.description && item.description!==''? decrypt(item.description):'';
            item.sub_amount = item.sub_amount && item.sub_amount !== '' ? decrypt(item.sub_amount) : '';
            item.discount = item.discount && item.discount !== '' ? decrypt(item.discount) : '';
            item.total_amount = item.total_amount && item.total_amount !== '' ? decrypt(item.total_amount) : '';
          });
        case 7:
          return _context2.abrupt("return", data);
        case 10:
          if (!(type === "object")) {
            _context2.next = 28;
            break;
          }
          if (data.dataValues.SalesLedger) {
            data.dataValues.SalesLedger.name = data.dataValues.SalesLedger.name && data.dataValues.SalesLedger.name !== '' ? decrypt(data.dataValues.SalesLedger.name) : '';
            data.dataValues.SalesLedger.amount = data.dataValues.SalesLedger.amount && data.dataValues.SalesLedger.amount !== '' ? decrypt(data.dataValues.SalesLedger.amount) : '';
            data.dataValues.SalesLedger.opening_balance = data.dataValues.SalesLedger.opening_balance && data.dataValues.SalesLedger.opening_balance !== '' ? decrypt(data.dataValues.SalesLedger.opening_balance) : '';
            data.dataValues.SalesLedger.account_holder_name = data.dataValues.SalesLedger.account_holder_name && data.dataValues.SalesLedger.account_holder_name !== '' ? decrypt(data.dataValues.SalesLedger.account_holder_name) : '';
            data.dataValues.SalesLedger.bank_account_number = data.dataValues.SalesLedger.bank_account_number && data.dataValues.SalesLedger.bank_account_number !== '' ? decrypt(data.dataValues.SalesLedger.bank_account_number) : '';
            data.dataValues.SalesLedger.bank_branch = data.dataValues.SalesLedger.bank_branch && data.dataValues.SalesLedger.bank_branch !== '' ? decrypt(data.dataValues.SalesLedger.bank_branch) : '';
            data.dataValues.SalesLedger.bank_name = data.dataValues.SalesLedger.bank_name && data.dataValues.SalesLedger.bank_name !== '' ? decrypt(data.dataValues.SalesLedger.bank_name) : '';
            data.dataValues.SalesLedger.website = data.dataValues.SalesLedger.website && data.dataValues.SalesLedger.website !== '' ? decrypt(data.dataValues.SalesLedger.website) : '';
            data.dataValues.SalesLedger.jurisdiction = data.dataValues.SalesLedger.jurisdiction && data.dataValues.SalesLedger.jurisdiction !== '' ? decrypt(data.dataValues.SalesLedger.jurisdiction) : '';
            data.dataValues.SalesLedger.cin_number = data.dataValues.SalesLedger.cin_number && data.dataValues.SalesLedger.cin_number !== '' ? decrypt(data.dataValues.SalesLedger.cin_number) : '';
          }
          if (data.dataValues.company) {
            data.dataValues.company.company_name = data.dataValues.company.company_name && data.dataValues.company.company_name !== '' ? decrypt(data.dataValues.company.company_name) : '';
            data.dataValues.company.company_pan_number = data.dataValues.company.company_pan_number && data.dataValues.company.company_pan_number !== '' ? decrypt(data.dataValues.company.company_pan_number) : '';
            data.dataValues.company.gst_number = data.dataValues.company.gst_number && data.dataValues.company.gst_number !== '' ? decrypt(data.dataValues.company.gst_number) : '';
            data.dataValues.company.street = data.dataValues.company.street && data.dataValues.company.street !== '' ? decrypt(data.dataValues.company.street) : '';
            data.dataValues.company.area = data.dataValues.company.area && data.dataValues.company.area !== '' ? decrypt(data.dataValues.company.area) : '';
            data.dataValues.company.company_logo = data.dataValues.company.company_logo && data.dataValues.company.company_logo !== '' ? decrypt(data.dataValues.company.company_logo) : '';
          }
          if (data.dataValues.item_entries && data.dataValues.item_entries.length > 0) {
            data.dataValues.item_entries.map(function (it) {
              it.quantity = it.quantity && it.quantity !== '' ? decrypt(it.quantity) : '';
              it.name = it.name && it.name !== '' ? decrypt(it.name) : '';
              it.description = it.description && it.description !== '' ? decrypt(it.description) : '';
              it.model = it.model && it.model !== '' ? decrypt(it.model) : '';
              it.hsn_code = it.hsn_code && it.hsn_code !== '' ? decrypt(it.hsn_code) : '';
              it.price = it.price && it.price !== '' ? decrypt(it.price) : '';
              it.discount = it.discount && it.discount !== '' ? decrypt(it.discount) : '';
              it.total_amount = it.total_amount && it.total_amount !== '' ? decrypt(it.total_amount) : '';
            });
          }
          if (data.dataValues.tax_entries && data.dataValues.tax_entries.length > 0) {
            data.dataValues.tax_entries.map(function (tax) {
              tax.amount = tax.amount && tax.amount !== '' ? decrypt(tax.amount) : '';
              if (tax.ledger) {
                tax.ledger.name = tax.ledger.name && tax.ledger.name !== '' ? decrypt(tax.ledger.name) : '';
                tax.ledger.amount = tax.ledger.amount && tax.ledger.amount !== '' ? decrypt(tax.ledger.amount) : '';
                tax.ledger.opening_balance = tax.ledger.opening_balance && tax.ledger.opening_balance !== '' ? decrypt(tax.ledger.opening_balance) : '';
                tax.ledger.account_holder_name = tax.ledger.account_holder_name && tax.ledger.account_holder_name !== '' ? decrypt(tax.ledger.account_holder_name) : '';
                tax.ledger.bank_account_number = tax.ledger.bank_account_number && tax.ledger.bank_account_number !== '' ? decrypt(tax.ledger.bank_account_number) : '';
                tax.ledger.bank_branch = tax.ledger.bank_branch && tax.ledger.bank_branch !== '' ? decrypt(tax.ledger.bank_branch) : '';
                tax.ledger.bank_name = tax.ledger.bank_name && tax.ledger.bank_name !== '' ? decrypt(tax.ledger.bank_name) : '';
                tax.ledger.website = tax.ledger.website && tax.ledger.website !== '' ? decrypt(tax.ledger.website) : '';
                tax.ledger.jurisdiction = tax.ledger.jurisdiction && tax.ledger.jurisdiction !== '' ? decrypt(tax.ledger.jurisdiction) : '';
                tax.ledger.cin_number = tax.ledger.cin_number && tax.ledger.cin_number !== '' ? decrypt(tax.ledger.cin_number) : '';
              }
              // it.total_amount = it.total_amount && it.total_amount!==''?decrypt(it.total_amount):'';
            });
          }

          if (data.dataValues.voucher_entries && data.dataValues.voucher_entries.length > 0) {
            data.dataValues.voucher_entries.map(function (voucher) {
              voucher.amount = voucher.amount && voucher.amount !== '' ? decrypt(voucher.amount) : '';
            });
          }
          data.dataValues.narration = data.dataValues.narration && data.dataValues.narration !== '' ? decrypt(data.dataValues.narration) : '';
          data.dataValues.bank_name = data.dataValues.bank_name && data.dataValues.bank_name !== '' ? decrypt(data.dataValues.bank_name) : '';
          data.dataValues.bank_account_number = data.dataValues.bank_account_number && data.dataValues.bank_account_number !== '' ? decrypt(data.dataValues.bank_account_number) : '';
          data.dataValues.bank_ifsc = data.dataValues.bank_ifsc && data.dataValues.bank_ifsc !== '' ? decrypt(data.dataValues.bank_ifsc) : '';
          data.dataValues.shipping_address = data.dataValues.shipping_address && data.dataValues.shipping_address !== '' ? decrypt(data.dataValues.shipping_address) : '';
          data.dataValues.description = data.dataValues.description && data.dataValues.description !== '' ? decrypt(data.dataValues.description) : '';
          data.dataValues.sub_amount = data.dataValues.sub_amount && data.dataValues.sub_amount !== '' ? decrypt(data.dataValues.sub_amount) : '';
          data.dataValues.discount = data.dataValues.discount && data.dataValues.discount !== '' ? decrypt(data.dataValues.discount) : '';
          data.dataValues.total_amount = data.dataValues.total_amount && data.dataValues.total_amount !== '' ? decrypt(data.dataValues.total_amount) : '';
          return _context2.abrupt("return", data);
        case 28:
          return _context2.abrupt("return", data);
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function decreptionSale(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.decreptionSale = decreptionSale;
function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher["final"]()]);
  return encrypted.toString('hex');
}
function decrypt(text) {
  // let textParts = text.split(':');
  // let iv = Buffer.from(textParts.shift(), 'hex');
  var encryptedText = Buffer.from(text, 'hex');
  var decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  var decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher["final"]()]);
  return decrypted.toString();
}