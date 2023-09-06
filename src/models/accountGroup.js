import Sequelize from 'sequelize';
import { sequelize } from '../database/database'
import SubAccountGroup from './subAccountGroup';
import User from './users';
import Company from './company';
import CompanyBank from './company_bank';
import addSubusers from './addsubusers';
import compUserSubUserTrack from './userSubUsertrack'
import Item from './items';
import ItemInteries from './itemInteries';
import TaxInteries from './taxInteries';
import VoucherInteries from './voucherInteries';
import Taxes from './taxes';
import Ledger from './ledger';
import Units from './units';
import City from './cities';
import State from './states';
import StockGroup from './stockGroup';
import SubStockGroup from './stockSubGroup';
import SaleVoucher from './saleVoucher';
import CreditVoucher from './creditVoucher';
import DebitVoucher from './debitVoucher';
import PurchaseVoucher from './purchaseVoucher';
import Entries from './entries';
import RecieptVoucher from './recieptVoucher';
import PaymentVoucher from './paymentVoucher';
import Purpose from './purpose';
import JournalVoucher from './journalVoucher';
import JournalInteries from './journalInteries';
import itemStockVoucherEntries from './item_stock_voucher_entries';
import Subscription from './subscription';
import SubscriptionOrder from './subscriptionOrder';
import ItemStockVoucher from './itemStockVoucher';

const AccountGroup = sequelize.define('account_groups', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid: {
        type: Sequelize.STRING,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    type: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN
    }
});

//Entries
Entries.belongsTo(Company, { foreignKey: 'company_id', sourceKey: 'company_id' });
Company.hasOne(Entries, { foreignKey: 'company_id', sourceKey: 'uid' });

//AccountGroup
AccountGroup.hasMany(SubAccountGroup, { foreignKey: 'account_group_id' });
SubAccountGroup.belongsTo(AccountGroup, { foreignKey: 'account_group_id', targetKey: 'uid' });


//RecieptVoucher
RecieptVoucher.belongsTo(Company, { targetKey: 'uid' });
Company.hasOne(RecieptVoucher, { foreignKey: 'company_id' });
//commented by me
// RecieptVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
// Ledger.hasMany(RecieptVoucher, { as: 'Buyer', foreignKey: 'ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })

// RecieptVoucher.belongsTo(Ledger, { as: 'RBuyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid'});
// Ledger.hasMany(RecieptVoucher, { as: 'RBuyer', foreignKey: 'receive_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })

// RecieptVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', targetKey: 'uid' });
// Ledger.hasMany(RecieptVoucher, { as: 'Buyer', foreignKey: 'ledger_id', sourceKey: 'uid' })

// RecieptVoucher.belongsTo(Ledger, { as: 'RBuyer', foreignKey: 'uid', targetKey: 'uid'});
// Ledger.hasMany(RecieptVoucher, { as: 'RBuyer', foreignKey: 'receive_id', sourceKey: 'uid' })

RecieptVoucher.belongsTo(Ledger, { as: 'Reciver', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid'});  
Ledger.hasMany(RecieptVoucher, { foreignKey: 'receive_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })
//BYME

// Ledger.belongsTo(RecieptVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
// RecieptVoucher.hasOne(Ledger, { as: 'ReciptReciver', foreignKey: 'uid', sourceKey: 'receive_id', targetKey: 'receive_id', otherKey: 'receive_id' });

// Ledger.belongsTo(RecieptVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
// RecieptVoucher.hasOne(Ledger, { as: 'ReciptBuyer', foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });


//Ledger

Ledger.belongsTo(TaxInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
TaxInteries.hasOne(Ledger, { foreignKey: 'uid', sourceKey: 'tax_ledger_id', targetKey: 'tax_ledger_id', otherKey: 'uid' });


//JournalInteries
JournalInteries.belongsTo(Ledger, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(JournalInteries, { foreignKey: 'ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

JournalVoucher.belongsTo(JournalInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucher' });
JournalInteries.hasOne(JournalVoucher, { foreignKey: 'uid', sourceKey: 'journa_voucher_id', targetKey: 'journa_voucher_id', otherKey: 'uid', as: 'Voucher' });


ItemStockVoucher.belongsTo(itemStockVoucherEntries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucher' });
itemStockVoucherEntries.hasOne(ItemStockVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucher' });

Ledger.belongsTo(JournalInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
JournalInteries.hasOne(Ledger, { as: 'VoucherLedger', foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });

//multi
// Ledger.belongsTo(JournalInteries, { targetKey:'ledger_id' });
// JournalInteries.hasMany(Ledger, { foreignKey:'uid' });


//JournalVoucher
JournalVoucher.belongsTo(Company, { targetKey: 'uid' });
Company.hasOne(JournalVoucher, { foreignKey: 'company_id' });

JournalVoucher.belongsTo(Purpose, { foreignKey: 'purpose_id' });
Purpose.hasOne(JournalVoucher, { foreignKey: 'id' });

JournalInteries.belongsTo(JournalVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
JournalVoucher.hasMany(JournalInteries, { foreignKey: 'journa_voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

itemStockVoucherEntries.belongsTo(JournalVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
JournalVoucher.hasMany(itemStockVoucherEntries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });


Ledger.belongsTo(JournalVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
JournalVoucher.hasOne(Ledger, { as: 'Ledger', foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });


//ItemStockVoucher
ItemStockVoucher.belongsTo(Company, { targetKey: 'uid' });
Company.hasOne(ItemStockVoucher, { foreignKey: 'company_id' });

ItemStockVoucher.belongsTo(Purpose, { foreignKey: 'purpose_id' });
Purpose.hasOne(ItemStockVoucher, { foreignKey: 'id' });

// JournalInteries.belongsTo(ItemStockVoucher, { foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});
// ItemStockVoucher.hasMany(JournalInteries, { foreignKey:'journa_voucher_id', sourceKey:'uid', targetKey:'uid', otherKey:'uid' });

itemStockVoucherEntries.belongsTo(ItemStockVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemStockVoucher.hasMany(itemStockVoucherEntries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });


Ledger.belongsTo(ItemStockVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemStockVoucher.hasOne(Ledger, { as: 'Ledger', foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });







//PaymentVoucher
PaymentVoucher.belongsTo(Company, { targetKey: 'uid' });
Company.hasOne(PaymentVoucher, { foreignKey: 'company_id' });

PaymentVoucher.belongsTo(Ledger, { as: 'PBuyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PaymentVoucher, { as: 'PBuyer', foreignKey: 'ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })

PaymentVoucher.belongsTo(Ledger, { as: 'PRBuyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PaymentVoucher, { as: 'PRBuyer', foreignKey: 'receive_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })

PaymentVoucher.belongsTo(Ledger, { as: 'Reciver', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PaymentVoucher, { foreignKey: 'receive_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })


Ledger.belongsTo(PaymentVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PaymentVoucher.hasOne(Ledger, { as: 'PaymentReciver', foreignKey: 'uid', sourceKey: 'receive_id', targetKey: 'receive_id', otherKey: 'receive_id' });
Ledger.belongsTo(PaymentVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PaymentVoucher.hasOne(Ledger, { as: 'PaymentBuyer', foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });


Ledger.hasOne(PaymentVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' })

//sales voucher
SaleVoucher.belongsTo(Company, { targetKey: 'uid', onDelete: 'CASCADE' });
Company.hasOne(SaleVoucher, { foreignKey: 'company_id' });

// SaleVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});
// Ledger.hasMany(SaleVoucher,{foreignKey:'buyer_ledger_id', sourceKey:'uid', targetKey:'uid', otherKey:'uid'});

SaleVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(SaleVoucher, { foreignKey: 'buyer_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

SaleVoucher.belongsTo(Ledger, { as: 'RoundOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(SaleVoucher, { as: 'roundsales', foreignKey: 'roundoff_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });



Ledger.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasOne(Ledger, { as: 'SalesLedger', foreignKey: 'uid', sourceKey: 'buyer_ledger_id', targetKey: 'buyer_ledger_id', otherKey: 'buyer_ledger_id' });

Ledger.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasOne(Ledger, { as: 'SalesRoundoffLedger', foreignKey: 'uid', sourceKey: 'roundoff_ledger_id', targetKey: 'roundoff_ledger_id', otherKey: 'buyer_ledger_id' });

SaleVoucher.belongsTo(Ledger, { as: 'discountOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(SaleVoucher, { as: 'discountsales', foreignKey: 'discount_ledger', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasOne(Ledger, { as: 'SalesDiscountLedger', foreignKey: 'uid', sourceKey: 'discount_ledger', targetKey: 'discount_ledger', otherKey: 'discount_ledger' });


ItemInteries.belongsTo(Ledger, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(ItemInteries, { foreignKey: 'ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });


ItemInteries.belongsTo(VoucherInteries, { foreignKey: 'voucher_id', sourceKey: 'voucher_id', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.hasOne(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'voucher_id', otherKey: 'uid' });

//by me wrk
// ItemInteries.belongsTo(Item, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
// Item.hasOne(ItemInteries, { foreignKey: 'item_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
//by me issue fix
Item.belongsTo(ItemInteries, { as: "itemone", foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemInteries.hasOne(Item, { as: "itemone", foreignKey: 'uid', sourceKey: 'item_id', targetKey: 'item_id', otherKey: 'item_id' });

//by me issue fix
Item.belongsTo(itemStockVoucherEntries, { as: "itemsone", foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
itemStockVoucherEntries.hasOne(Item, { as: "itemsone", foreignKey: 'uid', sourceKey: 'item_id', targetKey: 'item_id', otherKey: 'item_id' });

Ledger.belongsTo(ItemInteries, { as: "ledgerone", foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemInteries.hasOne(Ledger, { as: "ledgerone", foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'ledger_id' });
//by me wrk
itemStockVoucherEntries.belongsTo(Item, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid'});
Item.hasOne(itemStockVoucherEntries, { foreignKey: 'item_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

SaleVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'ItemVouchers' });
ItemInteries.hasOne(SaleVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'ItemVouchers' });

PurchaseVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'ItemVoucherp' });
ItemInteries.hasOne(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'ItemVoucherp' });

CreditVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'ItemVoucherc' });
ItemInteries.hasOne(CreditVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'ItemVoucherc' });

DebitVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'ItemVoucherd' });
ItemInteries.hasOne(DebitVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'ItemVoucherd' });


TaxInteries.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasMany(TaxInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasMany(VoucherInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

ItemInteries.belongsTo(SaleVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
SaleVoucher.hasMany(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

SaleVoucher.belongsTo(VoucherInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Vouchers' });
VoucherInteries.hasOne(SaleVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Vouchers' });

SaleVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucheris' });
ItemInteries.hasOne(SaleVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucheris' });

Ledger.belongsTo(VoucherInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.hasOne(Ledger, { foreignKey: 'uid', sourceKey: 'ledger_id', targetKey: 'ledger_id', otherKey: 'uid' });


SaleVoucher.belongsTo(TaxInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'tax' });
TaxInteries.hasOne(SaleVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'tax' });



//voucher entries
VoucherInteries.belongsTo(Ledger, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'vocher_entries' });
Ledger.hasMany(VoucherInteries, { foreignKey: 'ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'vocher_entries' });

//tax entries//byme 
// TaxInteries.belongsTo(Ledger, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'tax_entries' });
// Ledger.hasMany(TaxInteries, { foreignKey: 'tax_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'tax_entries' });

//Credit voucher
CreditVoucher.belongsTo(Company, { targetKey: 'uid', onDelete: 'CASCADE' });
Company.hasOne(CreditVoucher, { foreignKey: 'company_id' });
// CreditVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'buyer_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(CreditVoucher,{foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'})

CreditVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(CreditVoucher, { foreignKey: 'buyer_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(CreditVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
CreditVoucher.hasOne(Ledger, { as: 'CreditBuyer', foreignKey: 'uid', sourceKey: 'buyer_ledger_id', targetKey: 'buyer_ledger_id', otherKey: 'buyer_ledger_id' });

TaxInteries.belongsTo(CreditVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
CreditVoucher.hasMany(TaxInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.belongsTo(CreditVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
CreditVoucher.hasMany(VoucherInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemInteries.belongsTo(CreditVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
CreditVoucher.hasMany(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

CreditVoucher.belongsTo(Purpose, { foreignKey: 'purpose_id' });
Purpose.hasOne(CreditVoucher, { foreignKey: 'id' });


CreditVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucheric' });
ItemInteries.hasOne(CreditVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucheric' });


CreditVoucher.belongsTo(VoucherInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucherc' });
VoucherInteries.hasOne(CreditVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucherc' });

CreditVoucher.belongsTo(TaxInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'taxc' });
TaxInteries.hasOne(CreditVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'taxc' });


CreditVoucher.belongsTo(Ledger, { as: 'discountCreditOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(CreditVoucher, { as: 'discountCredit', foreignKey: 'discount_ledger', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(CreditVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
CreditVoucher.hasOne(Ledger, { as: 'CreditDiscountLedger', foreignKey: 'uid', sourceKey: 'discount_ledger', targetKey: 'discount_ledger', otherKey: 'discount_ledger' });




//Debit voucher
DebitVoucher.belongsTo(Company, { targetKey: 'uid', onDelete: 'CASCADE' });
Company.hasOne(DebitVoucher, { foreignKey: 'company_id' });
// DebitVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'buyer_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(DebitVoucher,{foreignKey:'uid', sourceKey:'uid', targetKey:'uid', otherKey:'uid'})

DebitVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(DebitVoucher, { foreignKey: 'buyer_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(DebitVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
DebitVoucher.hasOne(Ledger, { as: 'DebitBuyer', foreignKey: 'uid', sourceKey: 'buyer_ledger_id', targetKey: 'buyer_ledger_id', otherKey: 'buyer_ledger_id' });


TaxInteries.belongsTo(DebitVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
DebitVoucher.hasMany(TaxInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.belongsTo(DebitVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
DebitVoucher.hasMany(VoucherInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemInteries.belongsTo(DebitVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
DebitVoucher.hasMany(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

DebitVoucher.belongsTo(Purpose, { foreignKey: 'purpose_id' });
Purpose.hasOne(DebitVoucher, { foreignKey: 'id' });

DebitVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucherid' });
ItemInteries.hasOne(DebitVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucherid' });


DebitVoucher.belongsTo(VoucherInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucherd' });
VoucherInteries.hasOne(DebitVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucherd' });

DebitVoucher.belongsTo(TaxInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'taxd' });
TaxInteries.hasOne(DebitVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'taxd' });


DebitVoucher.belongsTo(Ledger, { as: 'discountdebitOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(DebitVoucher, { as: 'discountDebit', foreignKey: 'discount_ledger', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(DebitVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
DebitVoucher.hasOne(Ledger, { as: 'DebitDiscountLedger', foreignKey: 'uid', sourceKey: 'discount_ledger', targetKey: 'discount_ledger', otherKey: 'discount_ledger' });



//PurchaseVoucher
PurchaseVoucher.belongsTo(Company, { targetKey: 'uid', onDelete: 'CASCADE' });
Company.hasOne(PurchaseVoucher, { foreignKey: 'company_id' });

PurchaseVoucher.belongsTo(Ledger, { as: 'Buyer', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PurchaseVoucher, { foreignKey: 'buyer_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });


PurchaseVoucher.belongsTo(Ledger, { as: 'RoundOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PurchaseVoucher, { as: 'roundpurchase', foreignKey: 'roundoff_ledger_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasOne(Ledger, { as: 'PurchaseLedger', foreignKey: 'uid', sourceKey: 'buyer_ledger_id', targetKey: 'buyer_ledger_id', otherKey: 'buyer_ledger_id' });

Ledger.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasOne(Ledger, { as: 'PurchaseRoundLedger', foreignKey: 'uid', sourceKey: 'roundoff_ledger_id', targetKey: 'roundoff_ledger_id', otherKey: 'buyer_ledger_id' });

PurchaseVoucher.belongsTo(Ledger, { as: 'discountPurchaseOff', foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
Ledger.hasMany(PurchaseVoucher, { as: 'discountPurchases', foreignKey: 'discount_ledger', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

Ledger.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasOne(Ledger, { as: 'PurchaseDiscountLedger', foreignKey: 'uid', sourceKey: 'discount_ledger', targetKey: 'discount_ledger', otherKey: 'discount_ledger' });


TaxInteries.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasMany(TaxInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
VoucherInteries.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasMany(VoucherInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
ItemInteries.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasMany(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });

PurchaseVoucher.belongsTo(ItemInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucherip' });
ItemInteries.hasOne(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucherip' });
// PurchaseVoucher.belongsTo(Ledger, {as: 'Buyer', foreignKey: 'ledger_id', targetKey: 'uid' });
// PurchaseVoucher.belongsTo(Ledger, {as: 'Bank', foreignKey: 'bank_ledger_id', targetKey: 'uid' });
// Ledger.hasOne(PurchaseVoucher,{targetKey: 'uid'});

PurchaseVoucher.belongsTo(VoucherInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'Voucherp' });
VoucherInteries.hasOne(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'Voucherp' });

PurchaseVoucher.belongsTo(TaxInteries, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid', as: 'taxp' });
TaxInteries.hasOne(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'voucher_id', targetKey: 'voucher_id', otherKey: 'uid', as: 'taxp' });


// ItemInteries.belongsTo(SaleVoucher, { targetKey: 'uid' });
ItemInteries.belongsTo(PurchaseVoucher, { foreignKey: 'uid', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
PurchaseVoucher.hasMany(ItemInteries, { foreignKey: 'voucher_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });




//company
Company.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Company, { foreignKey: 'id' });

SubscriptionOrder.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'uid', targetKey: 'uid', otherKey: 'uid' });
User.hasOne(SubscriptionOrder, { foreignKey: 'id', sourceKey: 'id', targetKey: 'id', otherKey: 'id' });

Company.belongsTo(City, { targetKey: 'id' })
City.hasOne(Company, { targetKey: 'state_id' })

City.belongsTo(State, { targetKey: 'id' })
State.hasOne(City, { targetKey: 'state_id' })

Item.belongsTo(Company, { targetKey: 'uid', onDelete: 'CASCADE' })
Company.hasMany(Item, { targetKey: 'company_id' })

Item.belongsTo(Units, { foreignKey: 'unit_id' })
Units.hasMany(Item, { foreignKey: 'id' })

Ledger.belongsTo(Company, { targetKey: 'uid' })
Company.hasMany(Ledger, { targetKey: 'company_id' })

Ledger.belongsTo(City, { targetKey: 'id' })
City.hasOne(Ledger, { targetKey: 'state_id' })

Ledger.belongsTo(State, { targetKey: 'id' })
State.hasOne(Ledger, { targetKey: 'state_id' })

StockGroup.hasMany(Item, { foreignKey: 'stock_group_id' })
Item.belongsTo(StockGroup, { foreignKey: 'stock_group_id', targetKey: 'uid' })

SubStockGroup.hasMany(Item, { foreignKey: 'stock_sub_group_id' })
Item.belongsTo(SubStockGroup, { foreignKey: 'stock_sub_group_id', targetKey: 'uid' })


//StockGroup
StockGroup.hasMany(SubStockGroup, { foreignKey: 'stock_id' });
SubStockGroup.belongsTo(StockGroup, { foreignKey: 'stock_id', targetKey: 'uid' });

//////////////

AccountGroup.hasMany(Ledger, { foreignKey: 'account_group_id' })
Ledger.belongsTo(AccountGroup, { foreignKey: 'account_group_id', targetKey: 'uid' })

SubAccountGroup.hasMany(Ledger, { foreignKey: 'sub_account_group_id' })
Ledger.belongsTo(SubAccountGroup, { foreignKey: 'sub_account_group_id', targetKey: 'uid' })



//company
Item.belongsTo(Taxes, { foreignKey: 'taxes_slab_id' });
Taxes.hasOne(Item, { foreignKey: 'uid' });

Subscription.belongsTo(Taxes, { foreignKey: 'tax_id' });
Taxes.hasOne(Subscription, { foreignKey: 'id' });

export default AccountGroup;