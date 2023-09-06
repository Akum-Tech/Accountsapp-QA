"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encreptionCredit = exports.decreptionCredit = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var iv = Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');
var key = '';
var encreptionCredit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
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
  return function encreptionCredit(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.encreptionCredit = encreptionCredit;
var decreptionCredit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, type, keydata) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
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
            if (item.CreditBuyer) {
              item.CreditBuyer.name = item.CreditBuyer.name && item.CreditBuyer.name !== '' ? decrypt(item.CreditBuyer.name) : '';
              item.CreditBuyer.email = item.CreditBuyer.email && item.CreditBuyer.email !== '' ? decrypt(item.CreditBuyer.email) : '';
              item.CreditBuyer.amount = item.CreditBuyer.amount && item.CreditBuyer.amount !== '' ? decrypt(item.CreditBuyer.amount) : '';
              item.CreditBuyer.phone = item.CreditBuyer.phone && item.CreditBuyer.phone !== '' ? decrypt(item.CreditBuyer.phone) : '';
              item.CreditBuyer.street = item.CreditBuyer.street && item.CreditBuyer.street !== '' ? decrypt(item.CreditBuyer.street) : '';
              item.CreditBuyer.area = item.CreditBuyer.area && item.CreditBuyer.area !== '' ? decrypt(item.CreditBuyer.area) : '';
              item.CreditBuyer.gst_number = item.CreditBuyer.gst_number && item.CreditBuyer.gst_number !== '' ? decrypt(item.CreditBuyer.gst_number) : '';
              item.CreditBuyer.opening_balance = item.CreditBuyer.opening_balance && item.CreditBuyer.opening_balance !== '' ? decrypt(item.CreditBuyer.opening_balance) : '';
              item.CreditBuyer.cess_tax = item.CreditBuyer.cess_tax && item.CreditBuyer.cess_tax !== '' ? decrypt(item.CreditBuyer.cess_tax) : '';
              item.CreditBuyer.bank_name = item.CreditBuyer.bank_name && item.CreditBuyer.bank_name !== '' ? decrypt(item.CreditBuyer.bank_name) : '';
              item.CreditBuyer.bank_branch = item.CreditBuyer.bank_branch && item.CreditBuyer.bank_branch !== '' ? decrypt(item.CreditBuyer.bank_branch) : '';
              item.CreditBuyer.account_holder_name = item.CreditBuyer.account_holder_name && item.CreditBuyer.account_holder_name !== '' ? decrypt(item.CreditBuyer.account_holder_name) : '';
              item.CreditBuyer.ifsc = item.CreditBuyer.ifsc && item.CreditBuyer.ifsc !== '' ? decrypt(item.CreditBuyer.ifsc) : '';
              item.CreditBuyer.pan_number = item.CreditBuyer.pan_number && item.CreditBuyer.pan_number !== '' ? decrypt(item.CreditBuyer.pan_number) : '';
              item.CreditBuyer.bank_account_number = item.CreditBuyer.bank_account_number && item.CreditBuyer.bank_account_number !== '' ? decrypt(item.CreditBuyer.bank_account_number) : '';
              item.CreditBuyer.website = item.CreditBuyer.website && item.CreditBuyer.website !== '' ? decrypt(item.CreditBuyer.website) : '';
              item.CreditBuyer.jurisdiction = item.CreditBuyer.jurisdiction && item.CreditBuyer.jurisdiction !== '' ? decrypt(item.CreditBuyer.jurisdiction) : '';
              item.CreditBuyer.cin_number = item.CreditBuyer.cin_number && item.CreditBuyer.cin_number !== '' ? decrypt(item.CreditBuyer.cin_number) : '';
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
            if (item.CreditDiscountLedger) {
              item.CreditDiscountLedger.name = item.CreditDiscountLedger.name && item.CreditDiscountLedger.name !== '' ? decrypt(item.CreditDiscountLedger.name) : '';
              item.CreditDiscountLedger.email = item.CreditDiscountLedger.email && item.CreditDiscountLedger.email !== '' ? decrypt(item.CreditDiscountLedger.email) : '';
              item.CreditDiscountLedger.amount = item.CreditDiscountLedger.amount && item.CreditDiscountLedger.amount !== '' ? decrypt(item.CreditDiscountLedger.amount) : '';
              item.CreditDiscountLedger.phone = item.CreditDiscountLedger.phone && item.CreditDiscountLedger.phone !== '' ? decrypt(item.CreditDiscountLedger.phone) : '';
              item.CreditDiscountLedger.street = item.CreditDiscountLedger.street && item.CreditDiscountLedger.street !== '' ? decrypt(item.CreditDiscountLedger.street) : '';
              item.CreditDiscountLedger.area = item.CreditDiscountLedger.area && item.CreditDiscountLedger.area !== '' ? decrypt(item.CreditDiscountLedger.area) : '';
              item.CreditDiscountLedger.gst_number = item.CreditDiscountLedger.gst_number && item.CreditDiscountLedger.gst_number !== '' ? decrypt(item.CreditDiscountLedger.gst_number) : '';
              item.CreditDiscountLedger.opening_balance = item.CreditDiscountLedger.opening_balance && item.CreditDiscountLedger.opening_balance !== '' ? decrypt(item.CreditDiscountLedger.opening_balance) : '';
              item.CreditDiscountLedger.cess_tax = item.CreditDiscountLedger.cess_tax && item.CreditDiscountLedger.cess_tax !== '' ? decrypt(item.CreditDiscountLedger.cess_tax) : '';
              item.CreditDiscountLedger.bank_name = item.CreditDiscountLedger.bank_name && item.CreditDiscountLedger.bank_name !== '' ? decrypt(item.CreditDiscountLedger.bank_name) : '';
              item.CreditDiscountLedger.bank_branch = item.CreditDiscountLedger.bank_branch && item.CreditDiscountLedger.bank_branch !== '' ? decrypt(item.CreditDiscountLedger.bank_branch) : '';
              item.CreditDiscountLedger.account_holder_name = item.CreditDiscountLedger.account_holder_name && item.CreditDiscountLedger.account_holder_name !== '' ? decrypt(item.CreditDiscountLedger.account_holder_name) : '';
              item.CreditDiscountLedger.ifsc = item.CreditDiscountLedger.ifsc && item.CreditDiscountLedger.ifsc !== '' ? decrypt(item.CreditDiscountLedger.ifsc) : '';
              item.CreditDiscountLedger.pan_number = item.CreditDiscountLedger.pan_number && item.CreditDiscountLedger.pan_number !== '' ? decrypt(item.CreditDiscountLedger.pan_number) : '';
              item.CreditDiscountLedger.bank_account_number = item.CreditDiscountLedger.bank_account_number && item.CreditDiscountLedger.bank_account_number !== '' ? decrypt(item.CreditDiscountLedger.bank_account_number) : '';
              item.CreditDiscountLedger.website = item.CreditDiscountLedger.website && item.CreditDiscountLedger.website !== '' ? decrypt(item.CreditDiscountLedger.website) : '';
              item.CreditDiscountLedger.jurisdiction = item.CreditDiscountLedger.jurisdiction && item.CreditDiscountLedger.jurisdiction !== '' ? decrypt(item.CreditDiscountLedger.jurisdiction) : '';
              item.CreditDiscountLedger.cin_number = item.CreditDiscountLedger.cin_number && item.CreditDiscountLedger.cin_number !== '' ? decrypt(item.CreditDiscountLedger.cin_number) : '';
            }
            if (item.company) {
              item.company.company_name = item.company.company_name && item.company.company_name !== '' ? decrypt(item.company.company_name) : '';
              item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number !== '' ? decrypt(item.company.company_pan_number) : '';
              item.company.gst_number = item.company.gst_number && item.company.gst_number !== '' ? decrypt(item.company.gst_number) : '';
              item.company.street = item.company.street && item.company.street !== '' ? decrypt(item.company.street) : '';
              item.company.area = item.company.area && item.company.area !== '' ? decrypt(item.company.area) : '';
              item.company.company_logo = item.company.company_logo && item.company.company_logo !== '' ? decrypt(item.company.company_logo) : '';
            }
            if (item.tax) {
              if (item.tax.CreditBuyer) {
                item.tax.CreditBuyer.name = item.tax.CreditBuyer.name && item.tax.CreditBuyer.name !== '' ? decrypt(item.tax.CreditBuyer.name) : '';
                item.tax.CreditBuyer.email = item.tax.CreditBuyer.email && item.tax.CreditBuyer.email !== '' ? decrypt(item.tax.CreditBuyer.email) : '';
                item.tax.CreditBuyer.amount = item.tax.CreditBuyer.amount && item.tax.CreditBuyer.amount !== '' ? decrypt(item.tax.CreditBuyer.amount) : '';
                item.tax.CreditBuyer.phone = item.tax.CreditBuyer.phone && item.tax.CreditBuyer.phone !== '' ? decrypt(item.tax.CreditBuyer.phone) : '';
                item.tax.CreditBuyer.street = item.tax.CreditBuyer.street && item.tax.CreditBuyer.street !== '' ? decrypt(item.tax.CreditBuyer.street) : '';
                item.tax.CreditBuyer.area = item.tax.CreditBuyer.area && item.tax.CreditBuyer.area !== '' ? decrypt(item.tax.CreditBuyer.area) : '';
                item.tax.CreditBuyer.gst_number = item.tax.CreditBuyer.gst_number && item.tax.CreditBuyer.gst_number !== '' ? decrypt(item.tax.CreditBuyer.gst_number) : '';
                item.tax.CreditBuyer.opening_balance = item.tax.CreditBuyer.opening_balance && item.tax.CreditBuyer.opening_balance !== '' ? decrypt(item.tax.CreditBuyer.opening_balance) : '';
                item.tax.CreditBuyer.cess_tax = item.tax.CreditBuyer.cess_tax && item.tax.CreditBuyer.cess_tax !== '' ? decrypt(item.tax.CreditBuyer.cess_tax) : '';
                item.tax.CreditBuyer.bank_name = item.tax.CreditBuyer.bank_name && item.tax.CreditBuyer.bank_name !== '' ? decrypt(item.tax.CreditBuyer.bank_name) : '';
                item.tax.CreditBuyer.bank_branch = item.tax.CreditBuyer.bank_branch && item.tax.CreditBuyer.bank_branch !== '' ? decrypt(item.tax.CreditBuyer.bank_branch) : '';
                item.tax.CreditBuyer.account_holder_name = item.tax.CreditBuyer.account_holder_name && item.tax.CreditBuyer.account_holder_name !== '' ? decrypt(item.tax.CreditBuyer.account_holder_name) : '';
                item.tax.CreditBuyer.ifsc = item.tax.CreditBuyer.ifsc && item.tax.CreditBuyer.ifsc !== '' ? decrypt(item.tax.CreditBuyer.ifsc) : '';
                item.tax.CreditBuyer.pan_number = item.tax.CreditBuyer.pan_number && item.tax.CreditBuyer.pan_number !== '' ? decrypt(item.tax.CreditBuyer.pan_number) : '';
                item.tax.CreditBuyer.bank_account_number = item.tax.CreditBuyer.bank_account_number && item.tax.CreditBuyer.bank_account_number !== '' ? decrypt(item.tax.CreditBuyer.bank_account_number) : '';
                item.tax.CreditBuyer.website = item.tax.CreditBuyer.website && item.tax.CreditBuyer.website !== '' ? decrypt(item.tax.CreditBuyer.website) : '';
                item.tax.CreditBuyer.jurisdiction = item.tax.CreditBuyer.jurisdiction && item.tax.CreditBuyer.jurisdiction !== '' ? decrypt(item.tax.CreditBuyer.jurisdiction) : '';
                item.tax.CreditBuyer.cin_number = item.tax.CreditBuyer.cin_number && item.tax.CreditBuyer.cin_number !== '' ? decrypt(item.tax.CreditBuyer.cin_number) : '';
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
            if (item.taxc) {
              if (item.taxc.CreditBuyer) {
                item.taxc.CreditBuyer.name = item.taxc.CreditBuyer.name && item.taxc.CreditBuyer.name !== '' ? decrypt(item.taxc.CreditBuyer.name) : '';
                item.taxc.CreditBuyer.email = item.taxc.CreditBuyer.email && item.taxc.CreditBuyer.email !== '' ? decrypt(item.taxc.CreditBuyer.email) : '';
                item.taxc.CreditBuyer.amount = item.taxc.CreditBuyer.amount && item.taxc.CreditBuyer.amount !== '' ? decrypt(item.taxc.CreditBuyer.amount) : '';
                item.taxc.CreditBuyer.phone = item.taxc.CreditBuyer.phone && item.taxc.CreditBuyer.phone !== '' ? decrypt(item.taxc.CreditBuyer.phone) : '';
                item.taxc.CreditBuyer.street = item.taxc.CreditBuyer.street && item.taxc.CreditBuyer.street !== '' ? decrypt(item.taxc.CreditBuyer.street) : '';
                item.taxc.CreditBuyer.area = item.taxc.CreditBuyer.area && item.taxc.CreditBuyer.area !== '' ? decrypt(item.taxc.CreditBuyer.area) : '';
                item.taxc.CreditBuyer.gst_number = item.taxc.CreditBuyer.gst_number && item.taxc.CreditBuyer.gst_number !== '' ? decrypt(item.taxc.CreditBuyer.gst_number) : '';
                item.taxc.CreditBuyer.opening_balance = item.taxc.CreditBuyer.opening_balance && item.taxc.CreditBuyer.opening_balance !== '' ? decrypt(item.taxc.CreditBuyer.opening_balance) : '';
                item.taxc.CreditBuyer.cess_tax = item.taxc.CreditBuyer.cess_tax && item.taxc.CreditBuyer.cess_tax !== '' ? decrypt(item.taxc.CreditBuyer.cess_tax) : '';
                item.taxc.CreditBuyer.bank_name = item.taxc.CreditBuyer.bank_name && item.taxc.CreditBuyer.bank_name !== '' ? decrypt(item.taxc.CreditBuyer.bank_name) : '';
                item.taxc.CreditBuyer.bank_branch = item.taxc.CreditBuyer.bank_branch && item.taxc.CreditBuyer.bank_branch !== '' ? decrypt(item.taxc.CreditBuyer.bank_branch) : '';
                item.taxc.CreditBuyer.account_holder_name = item.taxc.CreditBuyer.account_holder_name && item.taxc.CreditBuyer.account_holder_name !== '' ? decrypt(item.taxc.CreditBuyer.account_holder_name) : '';
                item.taxc.CreditBuyer.ifsc = item.taxc.CreditBuyer.ifsc && item.taxc.CreditBuyer.ifsc !== '' ? decrypt(item.taxc.CreditBuyer.ifsc) : '';
                item.taxc.CreditBuyer.pan_number = item.taxc.CreditBuyer.pan_number && item.taxc.CreditBuyer.pan_number !== '' ? decrypt(item.taxc.CreditBuyer.pan_number) : '';
                item.taxc.CreditBuyer.bank_account_number = item.taxc.CreditBuyer.bank_account_number && item.taxc.CreditBuyer.bank_account_number !== '' ? decrypt(item.taxc.CreditBuyer.bank_account_number) : '';
                item.taxc.CreditBuyer.website = item.taxc.CreditBuyer.website && item.taxc.CreditBuyer.website !== '' ? decrypt(item.taxc.CreditBuyer.website) : '';
                item.taxc.CreditBuyer.jurisdiction = item.taxc.CreditBuyer.jurisdiction && item.taxc.CreditBuyer.jurisdiction !== '' ? decrypt(item.taxc.CreditBuyer.jurisdiction) : '';
                item.taxc.CreditBuyer.cin_number = item.taxc.CreditBuyer.cin_number && item.taxc.CreditBuyer.cin_number !== '' ? decrypt(item.taxc.CreditBuyer.cin_number) : '';
              }
              item.taxc.amount = item.taxc.amount && item.taxc.amount !== '' ? decrypt(item.taxc.amount) : '';
              item.taxc.narration = item.taxc.narration && item.taxc.narration !== '' ? decrypt(item.taxc.narration) : '';
              item.taxc.bank_name = item.taxc.bank_name && item.taxc.bank_name !== '' ? decrypt(item.taxc.bank_name) : '';
              item.taxc.bank_account_number = item.taxc.bank_account_number && item.taxc.bank_account_number !== '' ? decrypt(item.taxc.bank_account_number) : '';
              item.taxc.bank_ifsc = item.taxc.bank_ifsc && item.taxc.bank_ifsc !== '' ? decrypt(item.taxc.bank_ifsc) : '';
              item.taxc.shipping_address = item.taxc.shipping_address && item.taxc.shipping_address !== '' ? decrypt(item.taxc.shipping_address) : '';
              item.taxc.sub_amount = item.taxc.sub_amount && item.taxc.sub_amount !== '' ? decrypt(item.taxc.sub_amount) : '';
              item.taxc.discount = item.taxc.discount && item.taxc.discount !== '' ? decrypt(item.taxc.discount) : '';
              item.taxc.total_amount = item.taxc.total_amount && item.taxc.total_amount !== '' ? decrypt(item.taxc.total_amount) : '';
            }
            if (item.Voucherc) {
              if (item.Voucherc.CreditBuyer) {
                item.Voucherc.CreditBuyer.name = item.Voucherc.CreditBuyer.name && item.Voucherc.CreditBuyer.name !== '' ? decrypt(item.Voucherc.CreditBuyer.name) : '';
                item.Voucherc.CreditBuyer.email = item.Voucherc.CreditBuyer.email && item.Voucherc.CreditBuyer.email !== '' ? decrypt(item.Voucherc.CreditBuyer.email) : '';
                item.Voucherc.CreditBuyer.amount = item.Voucherc.CreditBuyer.amount && item.Voucherc.CreditBuyer.amount !== '' ? decrypt(item.Voucherc.CreditBuyer.amount) : '';
                item.Voucherc.CreditBuyer.phone = item.Voucherc.CreditBuyer.phone && item.Voucherc.CreditBuyer.phone !== '' ? decrypt(item.Voucherc.CreditBuyer.phone) : '';
                item.Voucherc.CreditBuyer.street = item.Voucherc.CreditBuyer.street && item.Voucherc.CreditBuyer.street !== '' ? decrypt(item.Voucherc.CreditBuyer.street) : '';
                item.Voucherc.CreditBuyer.area = item.Voucherc.CreditBuyer.area && item.Voucherc.CreditBuyer.area !== '' ? decrypt(item.Voucherc.CreditBuyer.area) : '';
                item.Voucherc.CreditBuyer.gst_number = item.Voucherc.CreditBuyer.gst_number && item.Voucherc.CreditBuyer.gst_number !== '' ? decrypt(item.Voucherc.CreditBuyer.gst_number) : '';
                item.Voucherc.CreditBuyer.opening_balance = item.Voucherc.CreditBuyer.opening_balance && item.Voucherc.CreditBuyer.opening_balance !== '' ? decrypt(item.Voucherc.CreditBuyer.opening_balance) : '';
                item.Voucherc.CreditBuyer.cess_Voucherc = item.Voucherc.CreditBuyer.cess_Voucherc && item.Voucherc.CreditBuyer.cess_Voucherc !== '' ? decrypt(item.Voucherc.CreditBuyer.cess_Voucherc) : '';
                item.Voucherc.CreditBuyer.bank_name = item.Voucherc.CreditBuyer.bank_name && item.Voucherc.CreditBuyer.bank_name !== '' ? decrypt(item.Voucherc.CreditBuyer.bank_name) : '';
                item.Voucherc.CreditBuyer.bank_branch = item.Voucherc.CreditBuyer.bank_branch && item.Voucherc.CreditBuyer.bank_branch !== '' ? decrypt(item.Voucherc.CreditBuyer.bank_branch) : '';
                item.Voucherc.CreditBuyer.account_holder_name = item.Voucherc.CreditBuyer.account_holder_name && item.Voucherc.CreditBuyer.account_holder_name !== '' ? decrypt(item.Voucherc.CreditBuyer.account_holder_name) : '';
                item.Voucherc.CreditBuyer.ifsc = item.Voucherc.CreditBuyer.ifsc && item.Voucherc.CreditBuyer.ifsc !== '' ? decrypt(item.Voucherc.CreditBuyer.ifsc) : '';
                item.Voucherc.CreditBuyer.pan_number = item.Voucherc.CreditBuyer.pan_number && item.Voucherc.CreditBuyer.pan_number !== '' ? decrypt(item.Voucherc.CreditBuyer.pan_number) : '';
                item.Voucherc.CreditBuyer.bank_account_number = item.Voucherc.CreditBuyer.bank_account_number && item.Voucherc.CreditBuyer.bank_account_number !== '' ? decrypt(item.Voucherc.CreditBuyer.bank_account_number) : '';
                item.Voucherc.CreditBuyer.website = item.Voucherc.CreditBuyer.website && item.Voucherc.CreditBuyer.website !== '' ? decrypt(item.Voucherc.CreditBuyer.website) : '';
                item.Voucherc.CreditBuyer.jurisdiction = item.Voucherc.CreditBuyer.jurisdiction && item.Voucherc.CreditBuyer.jurisdiction !== '' ? decrypt(item.Voucherc.CreditBuyer.jurisdiction) : '';
                item.Voucherc.CreditBuyer.cin_number = item.Voucherc.CreditBuyer.cin_number && item.Voucherc.CreditBuyer.cin_number !== '' ? decrypt(item.Voucherc.CreditBuyer.cin_number) : '';
              }
              if (item.Voucherc.item_entries && item.Voucherc.item_entries.length > 0) {
                item.Voucherc.item_entries.map(function (ele) {
                  ele.quantity = ele.quantity && ele.quantity !== '' ? decrypt(ele.quantity) : '';
                  ele.name = ele.name && ele.name !== '' ? decrypt(ele.name) : '';
                  ele.hsn_code = ele.hsn_code && ele.hsn_code !== '' ? decrypt(ele.hsn_code) : '';
                  ele.price = ele.price && ele.price !== '' ? decrypt(ele.price) : '';
                  ele.discount = ele.discount && ele.discount !== '' ? decrypt(ele.discount) : '';
                  ele.total_amount = ele.total_amount && ele.total_amount !== '' ? decrypt(ele.total_amount) : '';
                });
              }
              if (item.Voucherc.tax_entries && item.Voucherc.tax_entries.length > 0) {
                item.Voucherc.tax_entries.map(function (ele) {
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
              item.Voucherc.amount = item.Voucherc.amount && item.Voucherc.amount !== '' ? decrypt(item.Voucherc.amount) : '';
              item.Voucherc.narration = item.Voucherc.narration && item.Voucherc.narration !== '' ? decrypt(item.Voucherc.narration) : '';
              item.Voucherc.bank_name = item.Voucherc.bank_name && item.Voucherc.bank_name !== '' ? decrypt(item.Voucherc.bank_name) : '';
              item.Voucherc.bank_account_number = item.Voucherc.bank_account_number && item.Voucherc.bank_account_number !== '' ? decrypt(item.Voucherc.bank_account_number) : '';
              item.Voucherc.bank_ifsc = item.Voucherc.bank_ifsc && item.Voucherc.bank_ifsc !== '' ? decrypt(item.Voucherc.bank_ifsc) : '';
              item.Voucherc.shipping_address = item.Voucherc.shipping_address && item.Voucherc.shipping_address !== '' ? decrypt(item.Voucherc.shipping_address) : '';
              item.Voucherc.sub_amount = item.Voucherc.sub_amount && item.Voucherc.sub_amount !== '' ? decrypt(item.Voucherc.sub_amount) : '';
              item.Voucherc.discount = item.Voucherc.discount && item.Voucherc.discount !== '' ? decrypt(item.Voucherc.discount) : '';
              item.Voucherc.total_amount = item.Voucherc.total_amount && item.Voucherc.total_amount !== '' ? decrypt(item.Voucherc.total_amount) : '';
            }
            if (item.Voucheric) {
              if (item.Voucheric.SalesLedger) {
                item.Voucheric.SalesLedger.name = item.Voucheric.SalesLedger.name && item.Voucheric.SalesLedger.name !== '' ? decrypt(item.Voucheric.SalesLedger.name) : '';
                item.Voucheric.SalesLedger.email = item.Voucheric.SalesLedger.email && item.Voucheric.SalesLedger.email !== '' ? decrypt(item.Voucheric.SalesLedger.email) : '';
                item.Voucheric.SalesLedger.amount = item.Voucheric.SalesLedger.amount && item.Voucheric.SalesLedger.amount !== '' ? decrypt(item.Voucheric.SalesLedger.amount) : '';
                item.Voucheric.SalesLedger.phone = item.Voucheric.SalesLedger.phone && item.Voucheric.SalesLedger.phone !== '' ? decrypt(item.Voucheric.SalesLedger.phone) : '';
                item.Voucheric.SalesLedger.street = item.Voucheric.SalesLedger.street && item.Voucheric.SalesLedger.street !== '' ? decrypt(item.Voucheric.SalesLedger.street) : '';
                item.Voucheric.SalesLedger.area = item.Voucheric.SalesLedger.area && item.Voucheric.SalesLedger.area !== '' ? decrypt(item.Voucheric.SalesLedger.area) : '';
                item.Voucheric.SalesLedger.gst_number = item.Voucheric.SalesLedger.gst_number && item.Voucheric.SalesLedger.gst_number !== '' ? decrypt(item.Voucheric.SalesLedger.gst_number) : '';
                item.Voucheric.SalesLedger.opening_balance = item.Voucheric.SalesLedger.opening_balance && item.Voucheric.SalesLedger.opening_balance !== '' ? decrypt(item.Voucheric.SalesLedger.opening_balance) : '';
                item.Voucheric.SalesLedger.cess_Vouchers = item.Voucheric.SalesLedger.cess_Vouchers && item.Voucheric.SalesLedger.cess_Vouchers !== '' ? decrypt(item.Voucheric.SalesLedger.cess_Vouchers) : '';
                item.Voucheric.SalesLedger.bank_name = item.Voucheric.SalesLedger.bank_name && item.Voucheric.SalesLedger.bank_name !== '' ? decrypt(item.Voucheric.SalesLedger.bank_name) : '';
                item.Voucheric.SalesLedger.bank_branch = item.Voucheric.SalesLedger.bank_branch && item.Voucheric.SalesLedger.bank_branch !== '' ? decrypt(item.Voucheric.SalesLedger.bank_branch) : '';
                item.Voucheric.SalesLedger.account_holder_name = item.Voucheric.SalesLedger.account_holder_name && item.Voucheric.SalesLedger.account_holder_name !== '' ? decrypt(item.Voucheric.SalesLedger.account_holder_name) : '';
                item.Voucheric.SalesLedger.ifsc = item.Voucheric.SalesLedger.ifsc && item.Voucheric.SalesLedger.ifsc !== '' ? decrypt(item.Voucheric.SalesLedger.ifsc) : '';
                item.Voucheric.SalesLedger.pan_number = item.Voucheric.SalesLedger.pan_number && item.Voucheric.SalesLedger.pan_number !== '' ? decrypt(item.Voucheric.SalesLedger.pan_number) : '';
                item.Voucheric.SalesLedger.bank_account_number = item.Voucheric.SalesLedger.bank_account_number && item.Voucheric.SalesLedger.bank_account_number !== '' ? decrypt(item.Voucheric.SalesLedger.bank_account_number) : '';
                item.Voucheric.SalesLedger.website = item.Voucheric.SalesLedger.website && item.Voucheric.SalesLedger.website !== '' ? decrypt(item.Voucheric.SalesLedger.website) : '';
                item.Voucheric.SalesLedger.jurisdiction = item.Voucheric.SalesLedger.jurisdiction && item.Voucheric.SalesLedger.jurisdiction !== '' ? decrypt(item.Voucheric.SalesLedger.jurisdiction) : '';
                item.Voucheric.SalesLedger.cin_number = item.Voucheric.SalesLedger.cin_number && item.Voucheric.SalesLedger.cin_number !== '' ? decrypt(item.Voucheric.SalesLedger.cin_number) : '';
              }
              if (item.Voucheric.CreditBuyer) {
                item.Voucheric.CreditBuyer.name = item.Voucheric.CreditBuyer.name && item.Voucheric.CreditBuyer.name !== '' ? decrypt(item.Voucheric.CreditBuyer.name) : '';
                item.Voucheric.CreditBuyer.email = item.Voucheric.CreditBuyer.email && item.Voucheric.CreditBuyer.email !== '' ? decrypt(item.Voucheric.CreditBuyer.email) : '';
                item.Voucheric.CreditBuyer.amount = item.Voucheric.CreditBuyer.amount && item.Voucheric.CreditBuyer.amount !== '' ? decrypt(item.Voucheric.CreditBuyer.amount) : '';
                item.Voucheric.CreditBuyer.phone = item.Voucheric.CreditBuyer.phone && item.Voucheric.CreditBuyer.phone !== '' ? decrypt(item.Voucheric.CreditBuyer.phone) : '';
                item.Voucheric.CreditBuyer.street = item.Voucheric.CreditBuyer.street && item.Voucheric.CreditBuyer.street !== '' ? decrypt(item.Voucheric.CreditBuyer.street) : '';
                item.Voucheric.CreditBuyer.area = item.Voucheric.CreditBuyer.area && item.Voucheric.CreditBuyer.area !== '' ? decrypt(item.Voucheric.CreditBuyer.area) : '';
                item.Voucheric.CreditBuyer.gst_number = item.Voucheric.CreditBuyer.gst_number && item.Voucheric.CreditBuyer.gst_number !== '' ? decrypt(item.Voucheric.CreditBuyer.gst_number) : '';
                item.Voucheric.CreditBuyer.opening_balance = item.Voucheric.CreditBuyer.opening_balance && item.Voucheric.CreditBuyer.opening_balance !== '' ? decrypt(item.Voucheric.CreditBuyer.opening_balance) : '';
                item.Voucheric.CreditBuyer.cess_Vouchers = item.Voucheric.CreditBuyer.cess_Vouchers && item.Voucheric.CreditBuyer.cess_Vouchers !== '' ? decrypt(item.Voucheric.CreditBuyer.cess_Vouchers) : '';
                item.Voucheric.CreditBuyer.bank_name = item.Voucheric.CreditBuyer.bank_name && item.Voucheric.CreditBuyer.bank_name !== '' ? decrypt(item.Voucheric.CreditBuyer.bank_name) : '';
                item.Voucheric.CreditBuyer.bank_branch = item.Voucheric.CreditBuyer.bank_branch && item.Voucheric.CreditBuyer.bank_branch !== '' ? decrypt(item.Voucheric.CreditBuyer.bank_branch) : '';
                item.Voucheric.CreditBuyer.account_holder_name = item.Voucheric.CreditBuyer.account_holder_name && item.Voucheric.CreditBuyer.account_holder_name !== '' ? decrypt(item.Voucheric.CreditBuyer.account_holder_name) : '';
                item.Voucheric.CreditBuyer.ifsc = item.Voucheric.CreditBuyer.ifsc && item.Voucheric.CreditBuyer.ifsc !== '' ? decrypt(item.Voucheric.CreditBuyer.ifsc) : '';
                item.Voucheric.CreditBuyer.pan_number = item.Voucheric.CreditBuyer.pan_number && item.Voucheric.CreditBuyer.pan_number !== '' ? decrypt(item.Voucheric.CreditBuyer.pan_number) : '';
                item.Voucheric.CreditBuyer.bank_account_number = item.Voucheric.CreditBuyer.bank_account_number && item.Voucheric.CreditBuyer.bank_account_number !== '' ? decrypt(item.Voucheric.CreditBuyer.bank_account_number) : '';
                item.Voucheric.CreditBuyer.website = item.Voucheric.CreditBuyer.website && item.Voucheric.CreditBuyer.website !== '' ? decrypt(item.Voucheric.CreditBuyer.website) : '';
                item.Voucheric.CreditBuyer.jurisdiction = item.Voucheric.CreditBuyer.jurisdiction && item.Voucheric.CreditBuyer.jurisdiction !== '' ? decrypt(item.Voucheric.CreditBuyer.jurisdiction) : '';
                item.Voucheric.CreditBuyer.cin_number = item.Voucheric.CreditBuyer.cin_number && item.Voucheric.CreditBuyer.cin_number !== '' ? decrypt(item.Voucheric.CreditBuyer.cin_number) : '';
              }
              item.Voucheric.amount = item.Voucheric.amount && item.Voucheric.amount !== '' ? decrypt(item.Voucheric.amount) : null;
              item.Voucheric.narration = item.Voucheric.narration && item.Voucheric.narration !== '' ? decrypt(item.Voucheric.narration) : '';
              item.Voucheric.bank_name = item.Voucheric.bank_name && item.Voucheric.bank_name !== '' ? decrypt(item.Voucheric.bank_name) : '';
              item.Voucheric.bank_account_number = item.Voucheric.bank_account_number && item.Voucheric.bank_account_number !== '' ? decrypt(item.Voucheric.bank_account_number) : '';
              item.Voucheric.bank_ifsc = item.Voucheric.bank_ifsc && item.Voucheric.bank_ifsc !== '' ? decrypt(item.Voucheric.bank_ifsc) : '';
              item.Voucheric.shipping_address = item.Voucheric.shipping_address && item.Voucheric.shipping_address !== '' ? decrypt(item.Voucheric.shipping_address) : '';
              item.Voucheric.sub_amount = item.Voucheric.sub_amount && item.Voucheric.sub_amount !== '' ? decrypt(item.Voucheric.sub_amount) : '';
              item.Voucheric.discount = item.Voucheric.discount && item.Voucheric.discount !== '' ? decrypt(item.Voucheric.discount) : '';
              item.Voucheric.total_amount = item.Voucheric.total_amount && item.Voucheric.total_amount !== '' ? decrypt(item.Voucheric.total_amount) : '';
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
          if (data.dataValues.CreditBuyer) {
            data.dataValues.CreditBuyer.name = data.dataValues.CreditBuyer.name && data.dataValues.CreditBuyer.name !== '' ? decrypt(data.dataValues.CreditBuyer.name) : '';
            data.dataValues.CreditBuyer.amount = data.dataValues.CreditBuyer.amount && data.dataValues.CreditBuyer.amount !== '' ? decrypt(data.dataValues.CreditBuyer.amount) : '';
            data.dataValues.CreditBuyer.opening_balance = data.dataValues.CreditBuyer.opening_balance && data.dataValues.CreditBuyer.opening_balance !== '' ? decrypt(data.dataValues.CreditBuyer.opening_balance) : '';
            data.dataValues.CreditBuyer.account_holder_name = data.dataValues.CreditBuyer.account_holder_name && data.dataValues.CreditBuyer.account_holder_name !== '' ? decrypt(data.dataValues.CreditBuyer.account_holder_name) : '';
            data.dataValues.CreditBuyer.bank_account_number = data.dataValues.CreditBuyer.bank_account_number && data.dataValues.CreditBuyer.bank_account_number !== '' ? decrypt(data.dataValues.CreditBuyer.bank_account_number) : '';
            data.dataValues.CreditBuyer.bank_branch = data.dataValues.CreditBuyer.bank_branch && data.dataValues.CreditBuyer.bank_branch !== '' ? decrypt(data.dataValues.CreditBuyer.bank_branch) : '';
            data.dataValues.CreditBuyer.bank_name = data.dataValues.CreditBuyer.bank_name && data.dataValues.CreditBuyer.bank_name !== '' ? decrypt(data.dataValues.CreditBuyer.bank_name) : '';
            data.dataValues.CreditBuyer.website = data.dataValues.CreditBuyer.website && data.dataValues.CreditBuyer.website !== '' ? decrypt(data.dataValues.CreditBuyer.website) : '';
            data.dataValues.CreditBuyer.jurisdiction = data.dataValues.CreditBuyer.jurisdiction && data.dataValues.CreditBuyer.jurisdiction !== '' ? decrypt(data.dataValues.CreditBuyer.jurisdiction) : '';
            data.dataValues.CreditBuyer.cin_number = data.dataValues.CreditBuyer.cin_number && data.dataValues.CreditBuyer.cin_number !== '' ? decrypt(data.dataValues.CreditBuyer.cin_number) : '';
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
                tax.ledger.cin_number = tax.ledgercin_number && tax.ledger.cin_number !== '' ? decrypt(tax.ledger.cin_number) : '';
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
  return function decreptionCredit(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.decreptionCredit = decreptionCredit;
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