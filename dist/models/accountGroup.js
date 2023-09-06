"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = require("../database/database");
var _subAccountGroup = _interopRequireDefault(require("./subAccountGroup"));
var _users = _interopRequireDefault(require("./users"));
var _company = _interopRequireDefault(require("./company"));
var _company_bank = _interopRequireDefault(require("./company_bank"));
var _items = _interopRequireDefault(require("./items"));
var _itemInteries = _interopRequireDefault(require("./itemInteries"));
var _taxInteries = _interopRequireDefault(require("./taxInteries"));
var _voucherInteries = _interopRequireDefault(require("./voucherInteries"));
var _taxes = _interopRequireDefault(require("./taxes"));
var _ledger = _interopRequireDefault(require("./ledger"));
var _units = _interopRequireDefault(require("./units"));
var _cities = _interopRequireDefault(require("./cities"));
var _states = _interopRequireDefault(require("./states"));
var _stockGroup = _interopRequireDefault(require("./stockGroup"));
var _stockSubGroup = _interopRequireDefault(require("./stockSubGroup"));
var _saleVoucher = _interopRequireDefault(require("./saleVoucher"));
var _creditVoucher = _interopRequireDefault(require("./creditVoucher"));
var _debitVoucher = _interopRequireDefault(require("./debitVoucher"));
var _purchaseVoucher = _interopRequireDefault(require("./purchaseVoucher"));
var _entries = _interopRequireDefault(require("./entries"));
var _recieptVoucher = _interopRequireDefault(require("./recieptVoucher"));
var _paymentVoucher = _interopRequireDefault(require("./paymentVoucher"));
var _purpose = _interopRequireDefault(require("./purpose"));
var _journalVoucher = _interopRequireDefault(require("./journalVoucher"));
var _journalInteries = _interopRequireDefault(require("./journalInteries"));
var _item_stock_voucher_entries = _interopRequireDefault(require("./item_stock_voucher_entries"));
var _subscription = _interopRequireDefault(require("./subscription"));
var _subscriptionOrder = _interopRequireDefault(require("./subscriptionOrder"));
var _itemStockVoucher = _interopRequireDefault(require("./itemStockVoucher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AccountGroup = _database.sequelize.define('account_groups', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  name: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  type: {
    type: _sequelize["default"].STRING
  },
  status: {
    type: _sequelize["default"].BOOLEAN
  }
});

//Entries
_entries["default"].belongsTo(_company["default"], {
  foreignKey: 'company_id',
  sourceKey: 'company_id'
});
_company["default"].hasOne(_entries["default"], {
  foreignKey: 'company_id',
  sourceKey: 'uid'
});

//AccountGroup
AccountGroup.hasMany(_subAccountGroup["default"], {
  foreignKey: 'account_group_id'
});
_subAccountGroup["default"].belongsTo(AccountGroup, {
  foreignKey: 'account_group_id',
  targetKey: 'uid'
});

//RecieptVoucher
_recieptVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid'
});
_company["default"].hasOne(_recieptVoucher["default"], {
  foreignKey: 'company_id'
});
_recieptVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Buyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_recieptVoucher["default"], {
  as: 'Buyer',
  foreignKey: 'ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_recieptVoucher["default"].belongsTo(_ledger["default"], {
  as: 'RBuyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_recieptVoucher["default"], {
  as: 'RBuyer',
  foreignKey: 'receive_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_recieptVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Reciver',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_recieptVoucher["default"], {
  foreignKey: 'receive_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_recieptVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_recieptVoucher["default"].hasOne(_ledger["default"], {
  as: 'ReciptReciver',
  foreignKey: 'uid',
  sourceKey: 'receive_id',
  targetKey: 'receive_id',
  otherKey: 'receive_id'
});
_ledger["default"].belongsTo(_recieptVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_recieptVoucher["default"].hasOne(_ledger["default"], {
  as: 'ReciptBuyer',
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});

//Ledger

_ledger["default"].belongsTo(_taxInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_taxInteries["default"].hasOne(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'tax_ledger_id',
  targetKey: 'tax_ledger_id',
  otherKey: 'uid'
});

//JournalInteries
_journalInteries["default"].belongsTo(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_journalInteries["default"], {
  foreignKey: 'ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_journalVoucher["default"].belongsTo(_journalInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucher'
});
_journalInteries["default"].hasOne(_journalVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'journa_voucher_id',
  targetKey: 'journa_voucher_id',
  otherKey: 'uid',
  as: 'Voucher'
});
_itemStockVoucher["default"].belongsTo(_item_stock_voucher_entries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucher'
});
_item_stock_voucher_entries["default"].hasOne(_itemStockVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucher'
});
_ledger["default"].belongsTo(_journalInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_journalInteries["default"].hasOne(_ledger["default"], {
  as: 'VoucherLedger',
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});

//multi
// Ledger.belongsTo(JournalInteries, { targetKey:'ledger_id' });
// JournalInteries.hasMany(Ledger, { foreignKey:'uid' });

//JournalVoucher
_journalVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid'
});
_company["default"].hasOne(_journalVoucher["default"], {
  foreignKey: 'company_id'
});
_journalVoucher["default"].belongsTo(_purpose["default"], {
  foreignKey: 'purpose_id'
});
_purpose["default"].hasOne(_journalVoucher["default"], {
  foreignKey: 'id'
});
_journalInteries["default"].belongsTo(_journalVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_journalVoucher["default"].hasMany(_journalInteries["default"], {
  foreignKey: 'journa_voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_item_stock_voucher_entries["default"].belongsTo(_journalVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_journalVoucher["default"].hasMany(_item_stock_voucher_entries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_journalVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_journalVoucher["default"].hasOne(_ledger["default"], {
  as: 'Ledger',
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});

//ItemStockVoucher
_itemStockVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid'
});
_company["default"].hasOne(_itemStockVoucher["default"], {
  foreignKey: 'company_id'
});
_itemStockVoucher["default"].belongsTo(_purpose["default"], {
  foreignKey: 'purpose_id'
});
_purpose["default"].hasOne(_itemStockVoucher["default"], {
  foreignKey: 'id'
});

// JournalInteries.belongsTo(ItemStockVoucher, { foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});
// ItemStockVoucher.hasMany(JournalInteries, { foreignKey:'journa_voucher_id', sourceKey:'uid', targetKey:'uid', otherKey:'uid' });

_item_stock_voucher_entries["default"].belongsTo(_itemStockVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemStockVoucher["default"].hasMany(_item_stock_voucher_entries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_itemStockVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemStockVoucher["default"].hasOne(_ledger["default"], {
  as: 'Ledger',
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});

//PaymentVoucher
_paymentVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid'
});
_company["default"].hasOne(_paymentVoucher["default"], {
  foreignKey: 'company_id'
});
_paymentVoucher["default"].belongsTo(_ledger["default"], {
  as: 'PBuyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_paymentVoucher["default"], {
  as: 'PBuyer',
  foreignKey: 'ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_paymentVoucher["default"].belongsTo(_ledger["default"], {
  as: 'PRBuyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_paymentVoucher["default"], {
  as: 'PRBuyer',
  foreignKey: 'receive_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_paymentVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Reciver',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_paymentVoucher["default"], {
  foreignKey: 'receive_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_paymentVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_paymentVoucher["default"].hasOne(_ledger["default"], {
  as: 'PaymentReciver',
  foreignKey: 'uid',
  sourceKey: 'receive_id',
  targetKey: 'receive_id',
  otherKey: 'receive_id'
});
_ledger["default"].belongsTo(_paymentVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_paymentVoucher["default"].hasOne(_ledger["default"], {
  as: 'PaymentBuyer',
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});
_ledger["default"].hasOne(_paymentVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});

//sales voucher
_saleVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid',
  onDelete: 'CASCADE'
});
_company["default"].hasOne(_saleVoucher["default"], {
  foreignKey: 'company_id'
});

// SaleVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});
// Ledger.hasMany(SaleVoucher,{foreignKey:'buyer_ledger_id', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});

_saleVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Buyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_saleVoucher["default"], {
  foreignKey: 'buyer_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].belongsTo(_ledger["default"], {
  as: 'RoundOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_saleVoucher["default"], {
  as: 'roundsales',
  foreignKey: 'roundoff_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasOne(_ledger["default"], {
  as: 'SalesLedger',
  foreignKey: 'uid',
  sourceKey: 'buyer_ledger_id',
  targetKey: 'buyer_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_ledger["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasOne(_ledger["default"], {
  as: 'SalesRoundoffLedger',
  foreignKey: 'uid',
  sourceKey: 'roundoff_ledger_id',
  targetKey: 'roundoff_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_saleVoucher["default"].belongsTo(_ledger["default"], {
  as: 'discountOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_saleVoucher["default"], {
  as: 'discountsales',
  foreignKey: 'discount_ledger',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasOne(_ledger["default"], {
  as: 'SalesDiscountLedger',
  foreignKey: 'uid',
  sourceKey: 'discount_ledger',
  targetKey: 'discount_ledger',
  otherKey: 'discount_ledger'
});
_itemInteries["default"].belongsTo(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'voucher_id',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].hasOne(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'voucher_id',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_items["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_items["default"].hasOne(_itemInteries["default"], {
  foreignKey: 'item_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_items["default"].belongsTo(_itemInteries["default"], {
  as: "itemone",
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].hasOne(_items["default"], {
  as: "itemone",
  foreignKey: 'uid',
  sourceKey: 'item_id',
  targetKey: 'item_id',
  otherKey: 'item_id'
});
_items["default"].belongsTo(_item_stock_voucher_entries["default"], {
  as: "itemsone",
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_item_stock_voucher_entries["default"].hasOne(_items["default"], {
  as: "itemsone",
  foreignKey: 'uid',
  sourceKey: 'item_id',
  targetKey: 'item_id',
  otherKey: 'item_id'
});
_ledger["default"].belongsTo(_itemInteries["default"], {
  as: "ledgerone",
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].hasOne(_ledger["default"], {
  as: "ledgerone",
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'ledger_id'
});
_item_stock_voucher_entries["default"].belongsTo(_items["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_items["default"].hasOne(_item_stock_voucher_entries["default"], {
  foreignKey: 'item_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'ItemVouchers'
});
_itemInteries["default"].hasOne(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'ItemVouchers'
});
_purchaseVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'ItemVoucherp'
});
_itemInteries["default"].hasOne(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'ItemVoucherp'
});
_creditVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'ItemVoucherc'
});
_itemInteries["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'ItemVoucherc'
});
_debitVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'ItemVoucherd'
});
_itemInteries["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'ItemVoucherd'
});
_taxInteries["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasMany(_taxInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasMany(_voucherInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_saleVoucher["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Vouchers'
});
_voucherInteries["default"].hasOne(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Vouchers'
});
_saleVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucheris'
});
_itemInteries["default"].hasOne(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucheris'
});
_ledger["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].hasOne(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'ledger_id',
  targetKey: 'ledger_id',
  otherKey: 'uid'
});
_saleVoucher["default"].belongsTo(_taxInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'tax'
});
_taxInteries["default"].hasOne(_saleVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'tax'
});

//voucher entries
_voucherInteries["default"].belongsTo(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'vocher_entries'
});
_ledger["default"].hasMany(_voucherInteries["default"], {
  foreignKey: 'ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'vocher_entries'
});

//tax entries
_taxInteries["default"].belongsTo(_ledger["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'tax_entries'
});
_ledger["default"].hasMany(_taxInteries["default"], {
  foreignKey: 'tax_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'tax_entries'
});

//Credit voucher
_creditVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid',
  onDelete: 'CASCADE'
});
_company["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'company_id'
});
// CreditVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'buyer_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(CreditVoucher,{foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'})

_creditVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Buyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_creditVoucher["default"], {
  foreignKey: 'buyer_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].hasOne(_ledger["default"], {
  as: 'CreditBuyer',
  foreignKey: 'uid',
  sourceKey: 'buyer_ledger_id',
  targetKey: 'buyer_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_taxInteries["default"].belongsTo(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].hasMany(_taxInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].belongsTo(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].hasMany(_voucherInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].belongsTo(_purpose["default"], {
  foreignKey: 'purpose_id'
});
_purpose["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'id'
});
_creditVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucheric'
});
_itemInteries["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucheric'
});
_creditVoucher["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucherc'
});
_voucherInteries["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucherc'
});
_creditVoucher["default"].belongsTo(_taxInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'taxc'
});
_taxInteries["default"].hasOne(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'taxc'
});
_creditVoucher["default"].belongsTo(_ledger["default"], {
  as: 'discountCreditOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_creditVoucher["default"], {
  as: 'discountCredit',
  foreignKey: 'discount_ledger',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_creditVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_creditVoucher["default"].hasOne(_ledger["default"], {
  as: 'CreditDiscountLedger',
  foreignKey: 'uid',
  sourceKey: 'discount_ledger',
  targetKey: 'discount_ledger',
  otherKey: 'discount_ledger'
});

//Debit voucher
_debitVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid',
  onDelete: 'CASCADE'
});
_company["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'company_id'
});
// DebitVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'buyer_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(DebitVoucher,{foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'})

_debitVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Buyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_debitVoucher["default"], {
  foreignKey: 'buyer_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].hasOne(_ledger["default"], {
  as: 'DebitBuyer',
  foreignKey: 'uid',
  sourceKey: 'buyer_ledger_id',
  targetKey: 'buyer_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_taxInteries["default"].belongsTo(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].hasMany(_taxInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].belongsTo(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].hasMany(_voucherInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].belongsTo(_purpose["default"], {
  foreignKey: 'purpose_id'
});
_purpose["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'id'
});
_debitVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucherid'
});
_itemInteries["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucherid'
});
_debitVoucher["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucherd'
});
_voucherInteries["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucherd'
});
_debitVoucher["default"].belongsTo(_taxInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'taxd'
});
_taxInteries["default"].hasOne(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'taxd'
});
_debitVoucher["default"].belongsTo(_ledger["default"], {
  as: 'discountdebitOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_debitVoucher["default"], {
  as: 'discountDebit',
  foreignKey: 'discount_ledger',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_debitVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_debitVoucher["default"].hasOne(_ledger["default"], {
  as: 'DebitDiscountLedger',
  foreignKey: 'uid',
  sourceKey: 'discount_ledger',
  targetKey: 'discount_ledger',
  otherKey: 'discount_ledger'
});

//PurchaseVoucher
_purchaseVoucher["default"].belongsTo(_company["default"], {
  targetKey: 'uid',
  onDelete: 'CASCADE'
});
_company["default"].hasOne(_purchaseVoucher["default"], {
  foreignKey: 'company_id'
});
_purchaseVoucher["default"].belongsTo(_ledger["default"], {
  as: 'Buyer',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_purchaseVoucher["default"], {
  foreignKey: 'buyer_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].belongsTo(_ledger["default"], {
  as: 'RoundOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_purchaseVoucher["default"], {
  as: 'roundpurchase',
  foreignKey: 'roundoff_ledger_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasOne(_ledger["default"], {
  as: 'PurchaseLedger',
  foreignKey: 'uid',
  sourceKey: 'buyer_ledger_id',
  targetKey: 'buyer_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_ledger["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasOne(_ledger["default"], {
  as: 'PurchaseRoundLedger',
  foreignKey: 'uid',
  sourceKey: 'roundoff_ledger_id',
  targetKey: 'roundoff_ledger_id',
  otherKey: 'buyer_ledger_id'
});
_purchaseVoucher["default"].belongsTo(_ledger["default"], {
  as: 'discountPurchaseOff',
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].hasMany(_purchaseVoucher["default"], {
  as: 'discountPurchases',
  foreignKey: 'discount_ledger',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_ledger["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasOne(_ledger["default"], {
  as: 'PurchaseDiscountLedger',
  foreignKey: 'uid',
  sourceKey: 'discount_ledger',
  targetKey: 'discount_ledger',
  otherKey: 'discount_ledger'
});
_taxInteries["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasMany(_taxInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_voucherInteries["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasMany(_voucherInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_itemInteries["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].belongsTo(_itemInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucherip'
});
_itemInteries["default"].hasOne(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucherip'
});
// PurchaseVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'ledger_id', targetKey: 'uid' });
// PurchaseVoucher.belongsTo(Ledger, {as: 'Bank', foreignKey: 'bank_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(PurchaseVoucher,{targetKey: 'uid'});

_purchaseVoucher["default"].belongsTo(_voucherInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'Voucherp'
});
_voucherInteries["default"].hasOne(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'Voucherp'
});
_purchaseVoucher["default"].belongsTo(_taxInteries["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid',
  as: 'taxp'
});
_taxInteries["default"].hasOne(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'voucher_id',
  targetKey: 'voucher_id',
  otherKey: 'uid',
  as: 'taxp'
});

// ItemInteries.belongsTo(SaleVoucher, { targetKey: 'uid' });
_itemInteries["default"].belongsTo(_purchaseVoucher["default"], {
  foreignKey: 'uid',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_purchaseVoucher["default"].hasMany(_itemInteries["default"], {
  foreignKey: 'voucher_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});

//company
_company["default"].belongsTo(_users["default"], {
  foreignKey: 'user_id'
});
_users["default"].hasOne(_company["default"], {
  foreignKey: 'id'
});
_subscriptionOrder["default"].belongsTo(_users["default"], {
  foreignKey: 'user_id',
  sourceKey: 'uid',
  targetKey: 'uid',
  otherKey: 'uid'
});
_users["default"].hasOne(_subscriptionOrder["default"], {
  foreignKey: 'id',
  sourceKey: 'id',
  targetKey: 'id',
  otherKey: 'id'
});
_company["default"].belongsTo(_cities["default"], {
  targetKey: 'id'
});
_cities["default"].hasOne(_company["default"], {
  targetKey: 'state_id'
});
_cities["default"].belongsTo(_states["default"], {
  targetKey: 'id'
});
_states["default"].hasOne(_cities["default"], {
  targetKey: 'state_id'
});
_items["default"].belongsTo(_company["default"], {
  targetKey: 'uid',
  onDelete: 'CASCADE'
});
_company["default"].hasMany(_items["default"], {
  targetKey: 'company_id'
});
_items["default"].belongsTo(_units["default"], {
  foreignKey: 'unit_id'
});
_units["default"].hasMany(_items["default"], {
  foreignKey: 'id'
});
_ledger["default"].belongsTo(_company["default"], {
  targetKey: 'uid'
});
_company["default"].hasMany(_ledger["default"], {
  targetKey: 'company_id'
});
_ledger["default"].belongsTo(_cities["default"], {
  targetKey: 'id'
});
_cities["default"].hasOne(_ledger["default"], {
  targetKey: 'state_id'
});
_stockGroup["default"].hasMany(_items["default"], {
  foreignKey: 'stock_group_id'
});
_items["default"].belongsTo(_stockGroup["default"], {
  foreignKey: 'stock_group_id',
  targetKey: 'uid'
});
_stockSubGroup["default"].hasMany(_items["default"], {
  foreignKey: 'stock_sub_group_id'
});
_items["default"].belongsTo(_stockSubGroup["default"], {
  foreignKey: 'stock_sub_group_id',
  targetKey: 'uid'
});

//StockGroup
_stockGroup["default"].hasMany(_stockSubGroup["default"], {
  foreignKey: 'stock_id'
});
_stockSubGroup["default"].belongsTo(_stockGroup["default"], {
  foreignKey: 'stock_id',
  targetKey: 'uid'
});

//////////////

AccountGroup.hasMany(_ledger["default"], {
  foreignKey: 'account_group_id'
});
_ledger["default"].belongsTo(AccountGroup, {
  foreignKey: 'account_group_id',
  targetKey: 'uid'
});
_subAccountGroup["default"].hasMany(_ledger["default"], {
  foreignKey: 'sub_account_group_id'
});
_ledger["default"].belongsTo(_subAccountGroup["default"], {
  foreignKey: 'sub_account_group_id',
  targetKey: 'uid'
});

//company
_items["default"].belongsTo(_taxes["default"], {
  foreignKey: 'taxes_slab_id'
});
_taxes["default"].hasOne(_items["default"], {
  foreignKey: 'uid'
});
_subscription["default"].belongsTo(_taxes["default"], {
  foreignKey: 'tax_id'
});
_taxes["default"].hasOne(_subscription["default"], {
  foreignKey: 'id'
});
var _default = AccountGroup;
exports["default"] = _default;