"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encreptionJournal = exports.decreptionJournal = void 0;
var _path = require("path");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var iv = Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');
var key = '';
var encreptionJournal = /*#__PURE__*/function () {
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
          return data.total_amount;
        case 14:
          _context.t2 = _context.sent;
          if (!_context.t2) {
            _context.next = 17;
            break;
          }
          _context.t2 = data.total_amount !== '';
        case 17:
          if (!_context.t2) {
            _context.next = 21;
            break;
          }
          _context.t3 = encrypt(data.total_amount.toString()).toString();
          _context.next = 22;
          break;
        case 21:
          _context.t3 = '';
        case 22:
          data.total_amount = _context.t3;
          return _context.abrupt("return", data);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function encreptionJournal(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.encreptionJournal = encreptionJournal;
var decreptionJournal = /*#__PURE__*/function () {
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
            if (item.company) {
              item.company.company_name = item.company.company_name && item.company.company_name !== '' ? decrypt(item.company.company_name) : '';
              item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number !== '' ? decrypt(item.company.company_pan_number) : '';
              item.company.gst_number = item.company.gst_number && item.company.gst_number !== '' ? decrypt(item.company.gst_number) : '';
              item.company.street = item.company.street && item.company.street !== '' ? decrypt(item.company.street) : '';
              item.company.area = item.company.area && item.company.area !== '' ? decrypt(item.company.area) : '';
              item.company.company_logo = item.company.company_logo && item.company.company_logo !== '' ? decrypt(item.company.company_logo) : '';
            }
            if (item.Ledger) {
              item.Ledger.name = item.Ledger.name && item.Ledger.name !== '' ? decrypt(item.Ledger.name) : '';
              item.Ledger.email = item.Ledger.email && item.Ledger.email !== '' ? decrypt(item.Ledger.email) : '';
              item.Ledger.amount = item.Ledger.amount && item.Ledger.amount !== '' ? decrypt(item.Ledger.amount) : '';
              item.Ledger.phone = item.Ledger.phone && item.Ledger.phone !== '' ? decrypt(item.Ledger.phone) : '';
              item.Ledger.street = item.Ledger.street && item.Ledger.street !== '' ? decrypt(item.Ledger.street) : '';
              item.Ledger.area = item.Ledger.area && item.Ledger.area !== '' ? decrypt(item.Ledger.area) : '';
              item.Ledger.gst_number = item.Ledger.gst_number && item.Ledger.gst_number !== '' ? decrypt(item.Ledger.gst_number) : '';
              item.Ledger.opening_balance = item.Ledger.opening_balance && item.Ledger.opening_balance !== '' ? decrypt(item.Ledger.opening_balance) : '';
              item.Ledger.cess_tax = item.Ledger.cess_tax && item.Ledger.cess_tax !== '' ? decrypt(item.Ledger.cess_tax) : '';
              item.Ledger.bank_name = item.Ledger.bank_name && item.Ledger.bank_name !== '' ? decrypt(item.Ledger.bank_name) : '';
              item.Ledger.bank_branch = item.Ledger.bank_branch && item.Ledger.bank_branch !== '' ? decrypt(item.Ledger.bank_branch) : '';
              item.Ledger.account_holder_name = item.Ledger.account_holder_name && item.Ledger.account_holder_name !== '' ? decrypt(item.Ledger.account_holder_name) : '';
              item.Ledger.ifsc = item.Ledger.ifsc && item.Ledger.ifsc !== '' ? decrypt(item.Ledger.ifsc) : '';
              item.Ledger.pan_number = item.Ledger.pan_number && item.Ledger.pan_number !== '' ? decrypt(item.Ledger.pan_number) : '';
              item.Ledger.bank_account_number = item.Ledger.bank_account_number && item.Ledger.bank_account_number !== '' ? decrypt(item.Ledger.bank_account_number) : '';
              item.Ledger.website = item.Ledger.website && item.Ledger.website !== '' ? decrypt(item.Ledger.website) : '';
              item.Ledger.jurisdiction = item.Ledger.jurisdiction && item.Ledger.jurisdiction !== '' ? decrypt(item.Ledger.jurisdiction) : '';
              item.Ledger.cin_number = item.Ledger.cin_number && item.Ledger.cin_number !== '' ? decrypt(item.Ledger.cin_number) : '';
            }
            if (item.journal_entries && item.journal_entries.length > 0) {
              item.journal_entries.map(function (jl) {
                jl.amount = jl.amount && jl.amount !== '' ? decrypt(jl.amount) : '';
                if (jl.VoucherLedger) {
                  jl.VoucherLedger.name = jl.VoucherLedger.name && jl.VoucherLedger.name !== '' ? decrypt(jl.VoucherLedger.name) : '';
                  jl.VoucherLedger.amount = jl.VoucherLedger.amount && jl.VoucherLedger.amount !== '' ? decrypt(jl.VoucherLedger.amount) : '';
                  jl.VoucherLedger.opening_balance = jl.VoucherLedger.opening_balance && jl.VoucherLedger.opening_balance !== '' ? decrypt(jl.VoucherLedger.opening_balance) : '';
                  jl.VoucherLedger.account_holder_name = jl.VoucherLedger.account_holder_name && jl.VoucherLedger.account_holder_name !== '' ? decrypt(jl.VoucherLedger.account_holder_name) : '';
                  jl.VoucherLedger.bank_account_number = jl.VoucherLedger.bank_account_number && jl.VoucherLedger.bank_account_number !== '' ? decrypt(jl.VoucherLedger.bank_account_number) : '';
                  jl.VoucherLedger.bank_branch = jl.VoucherLedger.bank_branch && jl.VoucherLedger.bank_branch !== '' ? decrypt(jl.VoucherLedger.bank_branch) : '';
                  jl.VoucherLedger.bank_name = jl.VoucherLedger.bank_name && jl.VoucherLedger.bank_name !== '' ? decrypt(jl.VoucherLedger.bank_name) : '';
                  jl.VoucherLedger.website = jl.VoucherLedger.website && jl.VoucherLedger.website !== '' ? decrypt(jl.VoucherLedger.website) : '';
                  jl.VoucherLedger.jurisdiction = jl.VoucherLedger.jurisdiction && jl.VoucherLedger.jurisdiction !== '' ? decrypt(jl.VoucherLedger.jurisdiction) : '';
                  jl.VoucherLedger.cin_number = jl.VoucherLedger.cin_number && jl.VoucherLedger.cin_number !== '' ? decrypt(jl.VoucherLedger.cin_number) : '';
                }
              });
            }
            if (item.item_stock_voucher_entries && item.item_stock_voucher_entries.length > 0) {
              item.item_stock_voucher_entries.map(function (jl) {
                jl.price = jl.price && jl.price !== '' ? decrypt(jl.price) : '';
                jl.name = jl.name && jl.name !== '' ? decrypt(jl.name) : '';
                jl.hsn_code = jl.hsn_code && jl.hsn_code !== '' ? decrypt(jl.hsn_code) : '';
                jl.rate = jl.rate && jl.rate !== '' ? decrypt(jl.rate) : '';
                jl.quantity = jl.quantity && jl.quantity !== '' ? decrypt(jl.quantity) : '';
                jl.total_value = jl.total_value && jl.total_value !== '' ? decrypt(jl.total_value) : '';
                jl.cess_tax = jl.cess_tax && jl.cess_tax !== '' ? decrypt(jl.cess_tax) : '';
              });
            }
            item.narration = item.narration && item.narration !== '' ? decrypt(item.narration) : '';
            item.bank_name = item.bank_name && item.bank_name !== '' ? decrypt(item.bank_name) : '';
            item.bank_account_number = item.bank_account_number && item.bank_account_number !== '' ? decrypt(item.bank_account_number) : '';
            item.bank_ifsc = item.bank_ifsc && item.bank_ifsc !== '' ? decrypt(item.bank_ifsc) : '';
            item.shipping_address = item.shipping_address && item.shipping_address !== '' ? decrypt(item.shipping_address) : '';
            item.description = item.description && item.description !== '' ? decrypt(item.description) : '';
            item.sub_amount = item.sub_amount && item.sub_amount !== '' ? decrypt(item.sub_amount) : '';
            item.discount = item.discount && item.discount !== '' ? decrypt(item.discount) : '';
            item.total_amount = item.total_amount && item.total_amount !== '' ? decrypt(item.total_amount) : '';
            if (item.item_stock_voucher_entries && item.item_stock_voucher_entries.length > 0) {
              item.item_stock_voucher_entries.map(function (ele) {
                ele.quantity = ele.quantity && ele.quantity !== '' ? decrypt(ele.quantity) : '';
                ele.name = ele.name && ele.name !== '' ? decrypt(ele.name) : '';
                ele.description = ele.description && ele.description !== '' ? decrypt(ele.description) : '';
                ele.model = ele.model && ele.model !== '' ? decrypt(ele.model) : '';
                ele.hsn_code = ele.hsn_code && ele.hsn_code !== '' ? decrypt(ele.hsn_code) : '';
                ele.price = ele.price && ele.price !== '' ? decrypt(ele.price) : '';
                ele.discount = ele.discount && ele.discount !== '' ? decrypt(ele.discount) : '';
                ele.total_value = ele.total_value && ele.total_value !== '' ? decrypt(ele.total_value) : '';
                ele.total_amount = ele.total_amount && ele.total_amount !== '' ? decrypt(ele.total_amount) : '';
                ele.rate = ele.rate && ele.rate !== '' ? decrypt(ele.rate) : '';
              });
            }
          });
        case 7:
          return _context2.abrupt("return", data);
        case 10:
          if (!(type === "object")) {
            _context2.next = 20;
            break;
          }
          if (data.dataValues.company) {
            data.dataValues.company.company_name = data.dataValues.company.company_name && data.dataValues.company.company_name !== '' ? decrypt(data.dataValues.company.company_name) : '';
            data.dataValues.company.company_pan_number = data.dataValues.company.company_pan_number && data.dataValues.company.company_pan_number !== '' ? decrypt(data.dataValues.company.company_pan_number) : '';
            data.dataValues.company.gst_number = data.dataValues.company.gst_number && data.dataValues.company.gst_number !== '' ? decrypt(data.dataValues.company.gst_number) : '';
            data.dataValues.company.street = data.dataValues.company.street && data.dataValues.company.street !== '' ? decrypt(data.dataValues.company.street) : '';
            data.dataValues.company.area = data.dataValues.company.area && data.dataValues.company.area !== '' ? decrypt(data.dataValues.company.area) : '';
            data.dataValues.company.company_logo = data.dataValues.company.company_logo && data.dataValues.company.company_logo !== '' ? decrypt(data.dataValues.company.company_logo) : '';
          }
          if (data.dataValues.Ledger) {
            data.dataValues.Ledger.name = data.dataValues.Ledger.name && data.dataValues.Ledger.name !== '' ? decrypt(data.dataValues.Ledger.name) : '';
            data.dataValues.Ledger.opening_balance = data.dataValues.Ledger.opening_balance && data.dataValues.Ledger.opening_balance !== '' ? decrypt(data.dataValues.Ledger.opening_balance) : '';
            data.dataValues.Ledger.amount = data.dataValues.Ledger.amount && data.dataValues.Ledger.amount !== '' ? decrypt(data.dataValues.Ledger.amount) : '';
          }
          if (data.dataValues.item_stock_voucher_entries && data.dataValues.item_stock_voucher_entries.length > 0) {
            data.dataValues.item_stock_voucher_entries.map(function (ele) {
              // jl.amount = jl.amount && jl.amount!==''?decrypt(jl.amount):'';
              // if(jl.VoucherLedger){
              ele.quantity = ele.quantity && ele.quantity !== '' ? decrypt(ele.quantity) : '';
              ele.name = ele.name && ele.name !== '' ? decrypt(ele.name) : '';
              ele.description = ele.description && ele.description !== '' ? decrypt(ele.description) : '';
              ele.model = ele.model && ele.model !== '' ? decrypt(ele.model) : '';
              ele.hsn_code = ele.hsn_code && ele.hsn_code !== '' ? decrypt(ele.hsn_code) : '';
              ele.price = ele.price && ele.price !== '' ? decrypt(ele.price) : '';
              ele.discount = ele.discount && ele.discount !== '' ? decrypt(ele.discount) : '';
              ele.total_value = ele.total_value && ele.total_value !== '' ? decrypt(ele.total_value) : '';
              ele.total_amount = ele.total_amount && ele.total_amount !== '' ? decrypt(ele.total_amount) : '';
              ele.rate = ele.rate && ele.rate !== '' ? decrypt(ele.rate) : '';
              // }
            });
          }

          if (data.dataValues.journal_entries && data.dataValues.journal_entries.length > 0) {
            data.dataValues.journal_entries.map(function (jl) {
              jl.amount = jl.amount && jl.amount !== '' ? decrypt(jl.amount) : '';
              if (jl.VoucherLedger) {
                jl.VoucherLedger.name = jl.VoucherLedger.name && jl.VoucherLedger.name !== '' ? decrypt(jl.VoucherLedger.name) : '';
                jl.VoucherLedger.amount = jl.VoucherLedger.amount && jl.VoucherLedger.amount !== '' ? decrypt(jl.VoucherLedger.amount) : '';
                jl.VoucherLedger.opening_balance = jl.VoucherLedger.opening_balance && jl.VoucherLedger.opening_balance !== '' ? decrypt(jl.VoucherLedger.opening_balance) : '';
                jl.VoucherLedger.account_holder_name = jl.VoucherLedger.account_holder_name && jl.VoucherLedger.account_holder_name !== '' ? decrypt(jl.VoucherLedger.account_holder_name) : '';
                jl.VoucherLedger.bank_account_number = jl.VoucherLedger.bank_account_number && jl.VoucherLedger.bank_account_number !== '' ? decrypt(jl.VoucherLedger.bank_account_number) : '';
                jl.VoucherLedger.bank_branch = jl.VoucherLedger.bank_branch && jl.VoucherLedger.bank_branch !== '' ? decrypt(jl.VoucherLedger.bank_branch) : '';
                jl.VoucherLedger.bank_name = jl.VoucherLedger.bank_name && jl.VoucherLedger.bank_name !== '' ? decrypt(jl.VoucherLedger.bank_name) : '';
                jl.VoucherLedger.website = jl.VoucherLedger.website && jl.VoucherLedger.website !== '' ? decrypt(jl.VoucherLedger.website) : '';
                jl.VoucherLedger.jurisdiction = jl.VoucherLedger.jurisdiction && jl.VoucherLedger.jurisdiction !== '' ? decrypt(jl.VoucherLedger.jurisdiction) : '';
                jl.VoucherLedger.cin_number = jl.VoucherLedger.cin_number && jl.VoucherLedger.cin_number !== '' ? decrypt(jl.VoucherLedger.cin_number) : '';
              }
            });
          }
          data.dataValues.narration = data.dataValues.narration && data.dataValues.narration !== '' ? decrypt(data.dataValues.narration) : '';
          data.dataValues.total_amount = data.dataValues.total_amount && data.dataValues.total_amount !== '' ? decrypt(data.dataValues.total_amount) : '';
          return _context2.abrupt("return", data);
        case 20:
          return _context2.abrupt("return", data);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function decreptionJournal(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.decreptionJournal = decreptionJournal;
function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher["final"]()]);
  return encrypted.toString('hex');
}
function decrypt(text) {
  var encryptedText = Buffer.from(text, 'hex');
  var decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  var decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher["final"]()]);
  return decrypted.toString();
}