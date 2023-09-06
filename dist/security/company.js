"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encreption = exports.decreption = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var iv = Buffer.from("770f0c773ce18d38534838801446dc31", 'hex'); //crypto.randomBytes(16);

var key = '';
var encreption = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);
          _context.next = 3;
          return data.company_name;
        case 3:
          _context.t0 = _context.sent;
          if (!_context.t0) {
            _context.next = 6;
            break;
          }
          _context.t0 = data.company_name !== '';
        case 6:
          if (!_context.t0) {
            _context.next = 10;
            break;
          }
          _context.t1 = encrypt(data.company_name).toString();
          _context.next = 11;
          break;
        case 10:
          _context.t1 = '';
        case 11:
          data.company_name = _context.t1;
          _context.next = 14;
          return data.street;
        case 14:
          _context.t2 = _context.sent;
          if (!_context.t2) {
            _context.next = 17;
            break;
          }
          _context.t2 = data.street !== '';
        case 17:
          if (!_context.t2) {
            _context.next = 21;
            break;
          }
          _context.t3 = encrypt(data.street).toString();
          _context.next = 22;
          break;
        case 21:
          _context.t3 = '';
        case 22:
          data.street = _context.t3;
          _context.next = 25;
          return data.area;
        case 25:
          _context.t4 = _context.sent;
          if (!_context.t4) {
            _context.next = 28;
            break;
          }
          _context.t4 = data.area !== '';
        case 28:
          if (!_context.t4) {
            _context.next = 32;
            break;
          }
          _context.t5 = encrypt(data.area).toString();
          _context.next = 33;
          break;
        case 32:
          _context.t5 = '';
        case 33:
          data.area = _context.t5;
          _context.next = 36;
          return data.gst_number;
        case 36:
          _context.t6 = _context.sent;
          if (!_context.t6) {
            _context.next = 39;
            break;
          }
          _context.t6 = data.gst_number !== '';
        case 39:
          if (!_context.t6) {
            _context.next = 43;
            break;
          }
          _context.t7 = encrypt(data.gst_number).toString();
          _context.next = 44;
          break;
        case 43:
          _context.t7 = '';
        case 44:
          data.gst_number = _context.t7;
          _context.next = 47;
          return data.company_pan_number;
        case 47:
          _context.t8 = _context.sent;
          if (!_context.t8) {
            _context.next = 50;
            break;
          }
          _context.t8 = data.company_pan_number !== '';
        case 50:
          if (!_context.t8) {
            _context.next = 54;
            break;
          }
          _context.t9 = encrypt(data.company_pan_number).toString();
          _context.next = 55;
          break;
        case 54:
          _context.t9 = '';
        case 55:
          data.company_pan_number = _context.t9;
          _context.next = 58;
          return data.cin_number;
        case 58:
          _context.t10 = _context.sent;
          if (!_context.t10) {
            _context.next = 61;
            break;
          }
          _context.t10 = data.cin_number !== '';
        case 61:
          if (!_context.t10) {
            _context.next = 65;
            break;
          }
          _context.t11 = encrypt(data.cin_number).toString();
          _context.next = 66;
          break;
        case 65:
          _context.t11 = '';
        case 66:
          data.cin_number = _context.t11;
          _context.next = 69;
          return data.company_logo;
        case 69:
          _context.t12 = _context.sent;
          if (!_context.t12) {
            _context.next = 72;
            break;
          }
          _context.t12 = data.company_logo !== '';
        case 72:
          if (!_context.t12) {
            _context.next = 76;
            break;
          }
          _context.t13 = encrypt(data.company_logo).toString();
          _context.next = 77;
          break;
        case 76:
          _context.t13 = '';
        case 77:
          data.company_logo = _context.t13;
          _context.next = 80;
          return data.website;
        case 80:
          _context.t14 = _context.sent;
          if (!_context.t14) {
            _context.next = 83;
            break;
          }
          _context.t14 = data.website !== '';
        case 83:
          if (!_context.t14) {
            _context.next = 87;
            break;
          }
          _context.t15 = encrypt(data.website).toString();
          _context.next = 88;
          break;
        case 87:
          _context.t15 = '';
        case 88:
          data.website = _context.t15;
          _context.next = 91;
          return data.email;
        case 91:
          _context.t16 = _context.sent;
          if (!_context.t16) {
            _context.next = 94;
            break;
          }
          _context.t16 = data.email !== '';
        case 94:
          if (!_context.t16) {
            _context.next = 98;
            break;
          }
          _context.t17 = encrypt(data.email).toString();
          _context.next = 99;
          break;
        case 98:
          _context.t17 = '';
        case 99:
          data.email = _context.t17;
          _context.next = 102;
          return data.phone_number;
        case 102:
          _context.t18 = _context.sent;
          if (!_context.t18) {
            _context.next = 105;
            break;
          }
          _context.t18 = data.phone_number !== '';
        case 105:
          if (!_context.t18) {
            _context.next = 109;
            break;
          }
          _context.t19 = encrypt(data.phone_number).toString();
          _context.next = 110;
          break;
        case 109:
          _context.t19 = '';
        case 110:
          data.phone_number = _context.t19;
          _context.next = 113;
          return data.jurisdiction;
        case 113:
          _context.t20 = _context.sent;
          if (!_context.t20) {
            _context.next = 116;
            break;
          }
          _context.t20 = data.jurisdiction !== '';
        case 116:
          if (!_context.t20) {
            _context.next = 120;
            break;
          }
          _context.t21 = encrypt(data.jurisdiction).toString();
          _context.next = 121;
          break;
        case 120:
          _context.t21 = '';
        case 121:
          data.jurisdiction = _context.t21;
          return _context.abrupt("return", data);
        case 123:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function encreption(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.encreption = encreption;
var decreption = /*#__PURE__*/function () {
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
            item.company_name = item.company_name && item.company_name !== '' ? decrypt(item.company_name) : '';
            item.street = item.street && item.street !== '' ? decrypt(item.street) : '';
            item.area = item.area && item.area !== '' ? decrypt(item.area) : '';
            item.gst_number = item.gst_number && item.gst_number !== '' ? decrypt(item.gst_number) : '';
            item.company_pan_number = item.company_pan_number && item.company_pan_number !== '' ? decrypt(item.company_pan_number) : '';
            item.cin_number = item.cin_number && item.cin_number !== '' ? decrypt(item.cin_number) : '';
            item.company_logo = item.company_logo && item.company_logo !== '' ? decrypt(item.company_logo) : '';
            item.website = item.website && item.website !== '' ? decrypt(item.website) : '';
            item.email = item.email && item.email !== '' ? decrypt(item.email) : '';
            item.phone_number = item.phone_number && item.phone_number !== '' ? decrypt(item.phone_number) : '';
            item.jurisdiction = item.jurisdiction && item.jurisdiction !== '' ? decrypt(item.jurisdiction) : '';
          });
        case 7:
          return _context2.abrupt("return", data);
        case 10:
          if (!(type === "object")) {
            _context2.next = 24;
            break;
          }
          data.dataValues.company_name = data.dataValues.company_name && data.dataValues.company_name !== '' ? decrypt(data.dataValues.company_name) : '';
          data.dataValues.street = data.dataValues.street && data.dataValues.street !== '' ? decrypt(data.dataValues.street) : '';
          data.dataValues.area = data.dataValues.area && data.dataValues.area !== '' ? decrypt(data.dataValues.area) : '';
          data.dataValues.gst_number = data.dataValues.gst_number && data.dataValues.gst_number !== '' ? decrypt(data.dataValues.gst_number) : '';
          data.dataValues.company_pan_number = data.dataValues.company_pan_number && data.dataValues.company_pan_number !== '' ? decrypt(data.dataValues.company_pan_number) : '';
          data.dataValues.cin_number = data.dataValues.cin_number && data.dataValues.cin_number !== '' ? decrypt(data.dataValues.cin_number) : '';
          data.dataValues.website = data.dataValues.website && data.dataValues.website !== '' ? decrypt(data.dataValues.website) : '';
          data.dataValues.email = data.dataValues.email && data.dataValues.email !== '' ? decrypt(data.dataValues.email) : '';
          data.dataValues.phone_number = data.dataValues.phone_number && data.dataValues.phone_number !== '' ? decrypt(data.dataValues.phone_number) : '';
          data.dataValues.jurisdiction = data.dataValues.jurisdiction && data.dataValues.jurisdiction !== '' ? decrypt(data.dataValues.jurisdiction) : '';
          return _context2.abrupt("return", data);
        case 24:
          return _context2.abrupt("return", data);
        case 25:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function decreption(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.decreption = decreption;
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