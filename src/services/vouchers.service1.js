import JournalVoucher from '../models/journalVoucher';
import JournalInteries from '../models/journalInteries';
import Company from '../models/company';
import SaleVoucher from '../models/saleVoucher';
import PurchaseVoucher from '../models/purchaseVoucher';
import CreditVoucher from '../models/creditVoucher';
import DebitVoucher from '../models/debitVoucher';
import TaxInteries from '../models/taxInteries';
import VoucherInteries from '../models/voucherInteries';
import ItemInteries from '../models/itemInteries';
import AccountGroup from '../models/accountGroup';
import RecieptVoucher from '../models/recieptVoucher';
import PaymentVoucher from '../models/paymentVoucher';
import SubAccountGroup from '../models/subAccountGroup';
import State from '../models/states';
import City from '../models/cities';
import Purpose from '../models/purpose';
import Ledger from '../models/ledger';
import Sequelize, { NUMBER } from 'sequelize';
import arraySort from 'array-sort';
const Op = Sequelize.Op;

import { sequelize } from '../database/database'

import { decreptionReport } from "../security/voucherReport";
import { decreption } from "../security/ledger";
import { decreptionSale } from "../security/salesvoucher";
import { decreptionPayment } from "../security/paymentvoucher";
import { decreptionPurchase } from "../security/purchasevoucher";
import { decreptionReceipt } from "../security/receiptvoucher";
import { decreptionCredit } from "../security/creditvoucher";
import { decreptionDebit } from "../security/debitvoucher";
import { decreptionJournal } from "../security/journalvoucher";
import { decreptionJournalEntries } from "../security/journalEntries";
import { decreptionItem } from "../security/itemEntries";
import { decreptionTax } from "../security/taxEntries";
import { decreptionVoucher } from "../security/voucherEntries";

import "@babel/polyfill"
import itemStockVoucherEntries from '../models/item_stock_voucher_entries';

async function groupFuncation(array){
    return array.reduce((acc, obj) => {
        let key;
        // console.log(obj, "= = = = == =object");
        if(obj.subAccount && obj.subAccount.name){
            key = obj.subAccount.name;
        }else{
            key = 'MainGroup';
        }
        if (!acc[key]) {
           acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
     }, {});
}


async function getAllLedgerVoucherprivious(start_date,end_date,ledger_id,company_id,openingbalncecredit,openingbalncedebit,email) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: ledger_id,
                company_id: company_id
            }
        });
        if (ledger && ledger.dataValues.id) {
            if (ledger.dataValues.tax_key) {
                saleVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: SaleVoucher,
                        as: 'tax',
                        include:[{
                            model: Ledger,
                            as: 'SalesLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                purchaseVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledger_id
                        }, {
                            type: 'Purchase'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: PurchaseVoucher,
                        as: 'taxp',
                        include:[{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledger_id
                        }, {
                            type: 'Debit'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: CreditVoucher,
                        as: 'taxc',
                        include:[{
                            model: Ledger,
                            as: 'CreditBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledger_id
                        }, {
                            type: 'Credit'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: DebitVoucher,
                        as: 'taxd',
                        include:[{
                            model: Ledger,
                            as: 'DebitBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            } else if (ledger.dataValues.sale_key) {
                saleVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: SaleVoucher,
                        as: 'Vouchers',
                        include:[{
                            model: Ledger,
                            as: 'SalesLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            
                purchaseVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Purchase'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: PurchaseVoucher,
                        as: 'Voucherp',
                        include:[{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Debit'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: CreditVoucher,
                        as: 'Voucherc',
                        include:[{
                            model: Ledger,
                            as: 'CreditBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'ow1kac6rc1y'
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: DebitVoucher,
                        as: 'Voucherd',
                        include:[{
                            model: Ledger,
                            as: 'DebitBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));


            } else {
                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            company_id: company_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,as:"VoucherLedger"
                    }, {
                        model: JournalVoucher,
                        as: 'Voucher'
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            buyer_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                purchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            buyer_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await CreditVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            buyer_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'CreditBuyer',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await DebitVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            buyer_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'DebitBuyer',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'ReciptBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                paymentVoucher = await PaymentVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'PaymentBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            }


            ledger = await decreption(ledger, 'object', email);
            if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', email);
                recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', email);
                paymentVoucher = await decreptionPayment(paymentVoucher, 'array', email);
            }
            saleVoucher = await decreptionSale(saleVoucher, 'array', email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', email);
           

         
            let array = await [];
            // if (ledger && ledger.dataValues.id) {
            //     if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
            //         ledger.dataValues.debitAmount = await ledger.dataValues.amount;
            //         ledger.dataValues.creditAmount = await 0;
            //     } else {
            //         ledger.dataValues.debitAmount = await 0;
            //         ledger.dataValues.creditAmount = await ledger.dataValues.amount;
            //     }
            //     ledger.dataValues.open = await true;
            //     ledger.dataValues.voucher_type = '';
            //     ledger.dataValues.voucher_number = '';
            //     ledger.dataValues.invoice_id = '';
            //     await array.push(ledger.dataValues);
            // }

            if (journalVoucher && journalVoucher.length>0) {
                for (var i = 0; i < journalVoucher.length; i++) {
                    if (await journalVoucher[i].type === 'debit') {
                        journalVoucher[i].debitAmount = await journalVoucher[i].amount;
                        journalVoucher[i].creditAmount = await 0;
                    } else {
                        journalVoucher[i].debitAmount = await 0;
                        journalVoucher[i].creditAmount = await journalVoucher[i].amount;
                    }

                    if(journalVoucher[i].Voucher){
                        journalVoucher[i].invoice_date =  await journalVoucher[i].Voucher.invoice_date;
                        journalVoucher[i].voucher_number = await journalVoucher[i].Voucher.id;
                        journalVoucher[i].invoice_id =await journalVoucher[i].Voucher.invoice_id<=9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/00${journalVoucher[i].Voucher.invoice_id}`:journalVoucher[i].Voucher.invoice_id>9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/0${journalVoucher[i].Voucher.invoice_id}`:`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/${journalVoucher[i].Voucher.invoice_id}`;
                    }else{
                        journalVoucher[i].invoice_date = '';
                        journalVoucher[i].voucher_number ='';
                        journalVoucher[i].invoice_id ='';
                    }

                    journalVoucher[i].voucher_type = await 'journal';
                    
                    
                    
                    journalVoucher[i].ledger = await journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    await array.push(journalVoucher[i]);
                }
            }
          
            if (saleVoucher && saleVoucher.length>0) {            
                for (var s = 0; s < saleVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        saleVoucher[s].voucher_type = await 'sale';
                        if(saleVoucher[s].Vouchers){
                            saleVoucher[s].ledger = await saleVoucher[s].Vouchers.SalesLedger;
                            delete  saleVoucher[s].Vouchers.SalesLedger;
                        }else{
                            saleVoucher[s].ledger = {};
                        }
                        saleVoucher[s].Voucher = await saleVoucher[s].Vouchers ? saleVoucher[s].Vouchers : {};
                        saleVoucher[s].type = 'credit',
                        saleVoucher[s].debitAmount = await 0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].amount;
                        saleVoucher[s].amount = saleVoucher[s].amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].Vouchers ? saleVoucher[s].Vouchers.id : '';
                        saleVoucher[s].invoice_id = await saleVoucher[s].Vouchers ?saleVoucher[s].Vouchers.invoice_id<=9?`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/00${saleVoucher[s].Vouchers.invoice_id}`:saleVoucher[s].Vouchers.invoice_id>9?`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/0${saleVoucher[s].Vouchers.invoice_id}`:`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/${saleVoucher[s].Vouchers.invoice_id}`: '';
                        
                        delete saleVoucher[s].Vouchers;
                        await array.push(saleVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        saleVoucher[s].voucher_type = await 'sale';
                        if(saleVoucher[s].tax){
                            saleVoucher[s].ledger = await saleVoucher[s].tax.SalesLedger;
                            delete  saleVoucher[s].tax.SalesLedger;
                        }else{
                            saleVoucher[s].ledger = {};
                        }
                        saleVoucher[s].Voucher = await saleVoucher[s].tax ? saleVoucher[s].tax : {};
                        saleVoucher[s].type = 'credit',
                        saleVoucher[s].debitAmount = await 0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].amount;
                        saleVoucher[s].amount = saleVoucher[s].amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].tax ? saleVoucher[s].tax.id : '';
                        saleVoucher[s].invoice_id = await saleVoucher[s].tax ?saleVoucher[s].tax.invoice_id<=9?`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/00${saleVoucher[s].tax.invoice_id}`:saleVoucher[s].tax.invoice_id>9?`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/0${saleVoucher[s].tax.invoice_id}`:`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/${saleVoucher[s].tax.invoice_id}`: '';
                        
                        delete saleVoucher[s].tax;
                        await array.push(saleVoucher[s]);
                    } else {
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].SalesLedger;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = 'debit',
                        saleVoucher[s].debitAmount = await saleVoucher[s].total_amount;
                        saleVoucher[s].creditAmount = await 0;
                        saleVoucher[s].amount = saleVoucher[s].total_amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].SalesLedger;
                        await array.push(saleVoucher[s]);
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        if(purchaseVoucher[s].Voucherp){
                            purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherp.PurchaseLedger;
                            delete  purchaseVoucher[s].Voucherp.PurchaseLedger;
                        }else{
                            purchaseVoucher[s].ledger = {};
                        }
                        purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].Voucherp : {};
                        purchaseVoucher[s].type = 'debit',
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].amount;
                        purchaseVoucher[s].creditAmount = await 0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].Voucherp.id : '';
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].taxp.invoice_id<=9?`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/00${purchaseVoucher[s].Voucherp.invoice_id}`:purchaseVoucher[s].Voucherp.invoice_id>9?`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/0${purchaseVoucher[s].Voucherp.invoice_id}`:`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/${purchaseVoucher[s].Voucherp.invoice_id}`:'';
                        delete  purchaseVoucher[s].Voucherp;
                        await array.push(purchaseVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        if(purchaseVoucher[s].taxp){
                            purchaseVoucher[s].ledger = await purchaseVoucher[s].taxp.PurchaseLedger;
                            delete  purchaseVoucher[s].taxp.PurchaseLedger;
                        }else{
                            purchaseVoucher[s].ledger = {};
                        }
                        purchaseVoucher[s].Voucher = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp : {};
                        purchaseVoucher[s].type = 'debit',
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].amount;
                        purchaseVoucher[s].creditAmount = await 0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp.id : '';
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp.invoice_id<=9?`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/00${purchaseVoucher[s].taxp.invoice_id}`:purchaseVoucher[s].taxp.invoice_id>9?`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/0${purchaseVoucher[s].taxp.invoice_id}`:`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/${purchaseVoucher[s].taxp.invoice_id}`:'';
                        delete purchaseVoucher[s].tax;
                        await array.push(purchaseVoucher[s]);
                    } else {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].PurchaseLedger;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = 'Credit',
                        purchaseVoucher[s].debitAmount = await 0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].total_amount;
                        purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/00${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/0${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].PurchaseLedger;
                        await array.push(purchaseVoucher[s]);
                    }
                }
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'sale';
                        if(creditVoucher[s].Voucherc){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucherc.CreditBuyer;
                            delete  creditVoucher[s].Voucherc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc : {};
                        creditVoucher[s].type = 'credit',
                        creditVoucher[s].debitAmount = await 0;
                        creditVoucher[s].creditAmount = await creditVoucher[s].amount;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc.invoice_id<=9?`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucherc.invoice_id}`:creditVoucher[s].Voucherc.invoice_id>9?`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucherc.invoice_id}`:`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/${creditVoucher[s].Voucherc.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucherc;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'sale';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'credit',
                        creditVoucher[s].debitAmount = await 0;
                        creditVoucher[s].creditAmount = await creditVoucher[s].amount;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Credit note';
                        creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                        creditVoucher[s].Voucher = await {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].id;
                        creditVoucher[s].invoice_id =await creditVoucher[s].invoice_id<=9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/00${creditVoucher[s].invoice_id}`:creditVoucher[s].invoice_id>9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/0${creditVoucher[s].invoice_id}`:`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/${creditVoucher[s].invoice_id}`;
                        delete creditVoucher[s].CreditBuyer;
                        await array.push(creditVoucher[s]);
                    }
                }
            }

            if (debitVoucher && debitVoucher.length>0) {
                for (var s = 0; s < debitVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        debitVoucher[s].voucher_type = await 'sale';
                        if(debitVoucher[s].Voucherd){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherd.DebitBuyer;
                            delete  debitVoucher[s].Voucherd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd : {};
                        debitVoucher[s].type = 'debit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd.invoice_id<=9?`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherd.invoice_id}`:debitVoucher[s].Voucherd.invoice_id>9?`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherd.invoice_id}`:`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherd.invoice_id}` : '';
                        delete debitVoucher[s].Voucherd;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'sale';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'debit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Debit note';
                        debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                        debitVoucher[s].Voucher = await {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].id;
                        debitVoucher[s].invoice_id = await debitVoucher[s].invoice_id<=9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/00${debitVoucher[s].invoice_id}`:debitVoucher[s].invoice_id>9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/0${debitVoucher[s].invoice_id}`:`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/${debitVoucher[s].invoice_id}`;
                        delete debitVoucher[s].DebitBuyer;
                        await array.push(debitVoucher[s]);
                    }
                }
            }

            if (recieptVoucher  && recieptVoucher.length>0) {
                for (var i = 0; i < recieptVoucher.length; i++) {
                    if (await recieptVoucher[i].type === 'debit') {
                        recieptVoucher[i].debitAmount = await recieptVoucher[i].total_amount;
                        recieptVoucher[i].creditAmount = await 0;
                    } else {
                        recieptVoucher[i].debitAmount = await 0;
                        recieptVoucher[i].creditAmount = await recieptVoucher[i].total_amount;
                    }
                    recieptVoucher[i].ledger = await recieptVoucher[i].ReciptBuyer;
                    delete recieptVoucher[i].ReciptBuyer;
                    recieptVoucher[i].voucher_type = await 'reciept';
                    recieptVoucher[i].voucher_number = await recieptVoucher[i].id;
                    recieptVoucher[i].invoice_id = await recieptVoucher[i].invoice_id<=9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/00${recieptVoucher[i].invoice_id}`:recieptVoucher[i].invoice_id>9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/0${recieptVoucher[i].invoice_id}`:`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/${recieptVoucher[i].invoice_id}`;
                    await array.push(recieptVoucher[i]);
                }
            }

            if (paymentVoucher && paymentVoucher.length>0) {
                for (var i = 0; i < paymentVoucher.length; i++) {
                    if (await paymentVoucher[i].type === 'debit') {
                        paymentVoucher[i].debitAmount = await paymentVoucher[i].total_amount;
                        paymentVoucher[i].creditAmount = await 0;
                    } else {
                        paymentVoucher[i].debitAmount = await 0;
                        paymentVoucher[i].creditAmount = await paymentVoucher[i].total_amount;
                    }
                    paymentVoucher[i].ledger = await paymentVoucher[i].PaymentBuyer;
                    delete paymentVoucher[i].PaymentBuyer;
                    paymentVoucher[i].voucher_type = await 'payment';
                    paymentVoucher[i].voucher_number = await paymentVoucher[i].id;
                    paymentVoucher[i].invoice_id = await paymentVoucher[i].invoice_id<=9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/00${paymentVoucher[i].invoice_id}`:paymentVoucher[i].invoice_id>9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/0${paymentVoucher[i].invoice_id}`:`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/${paymentVoucher[i].invoice_id}`;
                    await array.push(paymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
           
           let creditamount=0;
           let debetamount=0;
          let totalbalnce=0;
          console.log("hello",openingbalncecredit);
          console.log("hello2",openingbalncedebit);
            await mainArray.map(item => {
              if (item.creditAmount) {
                creditamount = creditamount + Number(item.creditAmount);
              } else if (item.debitAmount) {
                debetamount = debetamount + Number(item.debitAmount);
              }
            });
            console.log("hello3",creditamount);
          console.log("hello4",debetamount);
            totalbalnce = (Number(openingbalncedebit)+debetamount)-(creditamount+Number(openingbalncecredit));
            console.log("ddd",totalbalnce);
           
           return totalbalnce;
           
            // let lastObj =await mainArray[mainArray.length-1];
            // await mainArray.pop(mainArray.length-1);
            // mainArray.unshift(lastObj);
            // return {
            //     statusCode: res.statusCode,
            //     success: true,
            //     message: "voucher fetch Successfully",
            //     JournalVoucher: mainArray
            // };
        } else {
            // return {
            //     statusCode: res.statusCode,
            //     success: true,
            //     message: "No date Found!"
            // };
        }

    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getAllLedgerVoucher = async function(data, res) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            }
        });
        
        if (ledger && ledger.dataValues.id) {
            if (ledger.dataValues.tax_key) {
                saleVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: data.ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: SaleVoucher,
                        as: 'tax',
                        include:[{
                            model: Ledger,
                            as: 'SalesLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                purchaseVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: data.ledger_id
                        }, {
                            type: 'Purchase'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: PurchaseVoucher,
                        as: 'taxp',
                        include:[{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: data.ledger_id
                        }, {
                            type: 'Debit'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: CreditVoucher,
                        as: 'taxc',
                        include:[{
                            model: Ledger,
                            as: 'CreditBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: data.ledger_id
                        }, {
                            type: 'Credit'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: DebitVoucher,
                        as: 'taxd',
                        include:[{
                            model: Ledger,
                            as: 'DebitBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            } else if (ledger.dataValues.sale_key) {
                saleVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: data.ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: SaleVoucher,
                        as: 'Vouchers',
                        include:[{
                            model: Ledger,
                            as: 'SalesLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            
                purchaseVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: data.ledger_id
                        }, {
                            type: 'Purchase'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: PurchaseVoucher,
                        as: 'Voucherp',
                        include:[{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: data.ledger_id
                        }, {
                            type: 'Debit'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: CreditVoucher,
                        as: 'Voucherc',
                        include:[{
                            model: Ledger,
                            as: 'CreditBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: data.ledger_id
                        }, {
                            type: 'ow1kac6rc1y'
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: DebitVoucher,
                        as: 'Voucherd',
                        include:[{
                            model: Ledger,
                            as: 'DebitBuyer',
                        }]
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));


            } else {
                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: data.ledger_id
                        }, {
                            company_id: data.company_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,as:"VoucherLedger"
                    }, {
                        model: JournalVoucher,
                        as: 'Voucher'
                    }],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            buyer_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                purchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            buyer_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                creditVoucher = await CreditVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            buyer_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'CreditBuyer',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                debitVoucher = await DebitVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            buyer_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'DebitBuyer',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'ReciptBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                paymentVoucher = await PaymentVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'PaymentBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

            }


            ledger = await decreption(ledger, 'object', data.data.email);
            if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
                recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            }
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
           

         
            let array = await [];
            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
                    ledger.dataValues.debitAmount = await ledger.dataValues.amount;
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await ledger.dataValues.amount;
                }
                ledger.dataValues.open = await true;
                ledger.dataValues.voucher_type = '';
                ledger.dataValues.voucher_number = '';
                ledger.dataValues.invoice_id = '';
                await array.push(ledger.dataValues);
            }

          let totalcalculate_openingblance= await getAllLedgerVoucherprivious(data.start_date,data.end_date,data.ledger_id,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);
            if(totalcalculate_openingblance >= 0){
                ledger.dataValues.debitAmount = await Math.abs(totalcalculate_openingblance).toString();
                    ledger.dataValues.creditAmount = await 0;
            }else{

                ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await Math.abs(totalcalculate_openingblance).toString();
            }


            if (journalVoucher && journalVoucher.length>0) {
                for (var i = 0; i < journalVoucher.length; i++) {
                    if (await journalVoucher[i].type === 'debit') {
                        journalVoucher[i].debitAmount = await journalVoucher[i].amount;
                        journalVoucher[i].creditAmount = await 0;
                    } else {
                        journalVoucher[i].debitAmount = await 0;
                        journalVoucher[i].creditAmount = await journalVoucher[i].amount;
                    }
                    journalVoucher[i].invoice_date =  await journalVoucher[i].Voucher.invoice_date;
                    journalVoucher[i].voucher_type = await 'journal';
                    journalVoucher[i].voucher_number = await journalVoucher[i].Voucher.id;
                    journalVoucher[i].invoice_id =await journalVoucher[i].Voucher.invoice_id<=9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/00${journalVoucher[i].Voucher.invoice_id}`:journalVoucher[i].Voucher.invoice_id>9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/0${journalVoucher[i].Voucher.invoice_id}`:`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/${journalVoucher[i].Voucher.invoice_id}`;
                    
                    
                    journalVoucher[i].ledger = await journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    await array.push(journalVoucher[i]);
                }
            }
          
            if (saleVoucher && saleVoucher.length>0) {            
                for (var s = 0; s < saleVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        saleVoucher[s].voucher_type = await 'sale';
                        if(saleVoucher[s].Vouchers){
                            saleVoucher[s].ledger = await saleVoucher[s].Vouchers.SalesLedger;
                            delete  saleVoucher[s].Vouchers.SalesLedger;
                        }else{
                            saleVoucher[s].ledger = {};
                        }
                        saleVoucher[s].Voucher = await saleVoucher[s].Vouchers ? saleVoucher[s].Vouchers : {};
                        saleVoucher[s].type = 'credit',
                        saleVoucher[s].debitAmount = await 0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].amount;
                        saleVoucher[s].amount = saleVoucher[s].amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].Vouchers ? saleVoucher[s].Vouchers.id : '';
                        saleVoucher[s].invoice_id = await saleVoucher[s].Vouchers ?saleVoucher[s].Vouchers.invoice_id<=9?`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/00${saleVoucher[s].Vouchers.invoice_id}`:saleVoucher[s].Vouchers.invoice_id>9?`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/0${saleVoucher[s].Vouchers.invoice_id}`:`${saleVoucher[s].Vouchers.current_year.toString().substr(-2)+`-`+saleVoucher[s].Vouchers.end_year.toString().substr(-2)}/${saleVoucher[s].Vouchers.invoice_id}`: '';
                        
                        delete saleVoucher[s].Vouchers;
                        await array.push(saleVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        saleVoucher[s].voucher_type = await 'sale';
                        if(saleVoucher[s].tax){
                            saleVoucher[s].ledger = await saleVoucher[s].tax.SalesLedger;
                            delete  saleVoucher[s].tax.SalesLedger;
                        }else{
                            saleVoucher[s].ledger = {};
                        }
                        saleVoucher[s].Voucher = await saleVoucher[s].tax ? saleVoucher[s].tax : {};
                        saleVoucher[s].type = 'credit',
                        saleVoucher[s].debitAmount = await 0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].amount;
                        saleVoucher[s].amount = saleVoucher[s].amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].tax ? saleVoucher[s].tax.id : '';
                        saleVoucher[s].invoice_id = await saleVoucher[s].tax ?saleVoucher[s].tax.invoice_id<=9?`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/00${saleVoucher[s].tax.invoice_id}`:saleVoucher[s].tax.invoice_id>9?`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/0${saleVoucher[s].tax.invoice_id}`:`${saleVoucher[s].tax.current_year.toString().substr(-2)+`-`+saleVoucher[s].tax.end_year.toString().substr(-2)}/${saleVoucher[s].tax.invoice_id}`: '';
                        
                        delete saleVoucher[s].tax;
                        await array.push(saleVoucher[s]);
                    } else {
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].SalesLedger;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = 'debit',
                        saleVoucher[s].debitAmount = await saleVoucher[s].total_amount;
                        saleVoucher[s].creditAmount = await 0;
                        saleVoucher[s].amount = saleVoucher[s].total_amount,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].SalesLedger;
                        await array.push(saleVoucher[s]);
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        if(purchaseVoucher[s].Voucherp){
                            purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherp.PurchaseLedger;
                            delete  purchaseVoucher[s].Voucherp.PurchaseLedger;
                        }else{
                            purchaseVoucher[s].ledger = {};
                        }
                        purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].Voucherp : {};
                        purchaseVoucher[s].type = 'debit',
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].amount;
                        purchaseVoucher[s].creditAmount = await 0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].Voucherp.id : '';
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherp ? purchaseVoucher[s].taxp.invoice_id<=9?`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/${purchaseVoucher[s].Voucherp.invoice_id}`:purchaseVoucher[s].Voucherp.invoice_id>9?`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/${purchaseVoucher[s].Voucherp.invoice_id}`:`${purchaseVoucher[s].Voucherp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].Voucherp.end_year.toString().substr(-2)}/${purchaseVoucher[s].Voucherp.invoice_id}`:'';
                        delete  purchaseVoucher[s].Voucherp;
                        await array.push(purchaseVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        if(purchaseVoucher[s].taxp){
                            purchaseVoucher[s].ledger = await purchaseVoucher[s].taxp.PurchaseLedger;
                            delete  purchaseVoucher[s].taxp.PurchaseLedger;
                        }else{
                            purchaseVoucher[s].ledger = {};
                        }
                        purchaseVoucher[s].Voucher = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp : {};
                        purchaseVoucher[s].type = 'debit',
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].amount;
                        purchaseVoucher[s].creditAmount = await 0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp.id : '';
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].taxp ? purchaseVoucher[s].taxp.invoice_id<=9?`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/${purchaseVoucher[s].taxp.invoice_id}`:purchaseVoucher[s].taxp.invoice_id>9?`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/${purchaseVoucher[s].taxp.invoice_id}`:`${purchaseVoucher[s].taxp.current_year.toString().substr(-2)+`-`+purchaseVoucher[s].taxp.end_year.toString().substr(-2)}/${purchaseVoucher[s].taxp.invoice_id}`:'';
                        delete purchaseVoucher[s].tax;
                        await array.push(purchaseVoucher[s]);
                    } else {
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].PurchaseLedger;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = 'Credit',
                        purchaseVoucher[s].debitAmount = await 0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].total_amount;
                        purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].PurchaseLedger;
                        await array.push(purchaseVoucher[s]);
                    }
                }
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'sale';
                        if(creditVoucher[s].Voucherc){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucherc.CreditBuyer;
                            delete  creditVoucher[s].Voucherc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc : {};
                        creditVoucher[s].type = 'credit',
                        creditVoucher[s].debitAmount = await 0;
                        creditVoucher[s].creditAmount = await creditVoucher[s].amount;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucherc ? creditVoucher[s].Voucherc.invoice_id<=9?`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucherc.invoice_id}`:creditVoucher[s].Voucherc.invoice_id>9?`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucherc.invoice_id}`:`${creditVoucher[s].Voucherc.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucherc.end_year.toString().substr(-2)}/${creditVoucher[s].Voucherc.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucherc;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'sale';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'credit',
                        creditVoucher[s].debitAmount = await 0;
                        creditVoucher[s].creditAmount = await creditVoucher[s].amount;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Credit note';
                        creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                        creditVoucher[s].Voucher = await {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].id;
                        creditVoucher[s].invoice_id =await creditVoucher[s].invoice_id<=9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/00${creditVoucher[s].invoice_id}`:creditVoucher[s].invoice_id>9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/0${creditVoucher[s].invoice_id}`:`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/${creditVoucher[s].invoice_id}`;
                        delete creditVoucher[s].CreditBuyer;
                        await array.push(creditVoucher[s]);
                    }
                }
            }

            if (debitVoucher && debitVoucher.length>0) {
                for (var s = 0; s < debitVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        debitVoucher[s].voucher_type = await 'sale';
                        if(debitVoucher[s].Voucherd){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherd.DebitBuyer;
                            delete  debitVoucher[s].Voucherd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd : {};
                        debitVoucher[s].type = 'debit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherd ? debitVoucher[s].Voucherd.invoice_id<=9?`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherd.invoice_id}`:debitVoucher[s].Voucherd.invoice_id>9?`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherd.invoice_id}`:`${debitVoucher[s].Voucherd.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherd.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherd.invoice_id}` : '';
                        delete debitVoucher[s].Voucherd;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'sale';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'debit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Debit note';
                        debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                        debitVoucher[s].Voucher = await {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].id;
                        debitVoucher[s].invoice_id = await debitVoucher[s].invoice_id<=9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/00${debitVoucher[s].invoice_id}`:debitVoucher[s].invoice_id>9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/0${debitVoucher[s].invoice_id}`:`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/${debitVoucher[s].invoice_id}`;
                        delete debitVoucher[s].DebitBuyer;
                        await array.push(debitVoucher[s]);
                    }
                }
            }

            if (recieptVoucher  && recieptVoucher.length>0) {
                for (var i = 0; i < recieptVoucher.length; i++) {
                    if (await recieptVoucher[i].type === 'debit') {
                        recieptVoucher[i].debitAmount = await recieptVoucher[i].total_amount;
                        recieptVoucher[i].creditAmount = await 0;
                    } else {
                        recieptVoucher[i].debitAmount = await 0;
                        recieptVoucher[i].creditAmount = await recieptVoucher[i].total_amount;
                    }
                    recieptVoucher[i].ledger = await recieptVoucher[i].ReciptBuyer;
                    delete recieptVoucher[i].ReciptBuyer;
                    recieptVoucher[i].voucher_type = await 'reciept';
                    recieptVoucher[i].voucher_number = await recieptVoucher[i].id;
                    recieptVoucher[i].invoice_id = await recieptVoucher[i].invoice_id<=9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/00${recieptVoucher[i].invoice_id}`:recieptVoucher[i].invoice_id>9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/0${recieptVoucher[i].invoice_id}`:`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/${recieptVoucher[i].invoice_id}`;
                    await array.push(recieptVoucher[i]);
                }
            }

            if (paymentVoucher && paymentVoucher.length>0) {
                for (var i = 0; i < paymentVoucher.length; i++) {
                    if (await paymentVoucher[i].type === 'debit') {
                        paymentVoucher[i].debitAmount = await paymentVoucher[i].total_amount;
                        paymentVoucher[i].creditAmount = await 0;
                    } else {
                        paymentVoucher[i].debitAmount = await 0;
                        paymentVoucher[i].creditAmount = await paymentVoucher[i].total_amount;
                    }
                    paymentVoucher[i].ledger = await paymentVoucher[i].PaymentBuyer;
                    delete paymentVoucher[i].PaymentBuyer;
                    paymentVoucher[i].voucher_type = await 'payment';
                    paymentVoucher[i].voucher_number = await paymentVoucher[i].id;
                    paymentVoucher[i].invoice_id = await paymentVoucher[i].invoice_id<=9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/00${paymentVoucher[i].invoice_id}`:paymentVoucher[i].invoice_id>9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/0${paymentVoucher[i].invoice_id}`:`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/${paymentVoucher[i].invoice_id}`;
                    await array.push(paymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: mainArray
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "No date Found!"
            };
        }

    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getAllCashVoucher = async function(data, res) {
    try {
        let recieptVoucher, paymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            }
        });
        if (ledger && ledger.dataValues.id) {
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: new Date(data.start_date),
                                [Op.lte]: new Date(data.end_date)
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'ReciptBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                paymentVoucher = await PaymentVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: new Date(data.start_date),
                                [Op.lte]: new Date(data.end_date)
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'PaymentBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));


            ledger = await decreption(ledger, 'object', data.data.email);
            if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            }

            let array = await [];

            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
                    ledger.dataValues.debitAmount = await ledger.dataValues.amount;
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await ledger.dataValues.amount;
                }
                ledger.dataValues.open = await true;
                ledger.dataValues.voucher_type = '';
                ledger.dataValues.voucher_number = '';
                ledger.dataValues.invoice_id = '';
                await array.push(ledger.dataValues);
            }

            if (recieptVoucher) {
                for (var i = 0; i < recieptVoucher.length; i++) {
                    if (await recieptVoucher[i].type === 'debit') {
                     

			recieptVoucher[i].debitAmount = await 0;
                        recieptVoucher[i].creditAmount = await recieptVoucher[i].total_amount;
                    } else {
                           recieptVoucher[i].debitAmount = await recieptVoucher[i].total_amount;
                        recieptVoucher[i].creditAmount = await 0;
                    }
                    recieptVoucher[i].ledger = await recieptVoucher[i].ReciptBuyer;
                    delete recieptVoucher[i].ReciptBuyer;
                    recieptVoucher[i].voucher_type = await 'reciept';
                    recieptVoucher[i].voucher_number = await recieptVoucher[i].id;
                    recieptVoucher[i].invoice_id = await recieptVoucher[i].invoice_id<=9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/00${recieptVoucher[i].invoice_id}`:recieptVoucher[i].invoice_id>9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/0${recieptVoucher[i].invoice_id}`:`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/${recieptVoucher[i].invoice_id}`;
                    await array.push(recieptVoucher[i]);
                }
            }

            if (paymentVoucher) {
                for (var i = 0; i < paymentVoucher.length; i++) {
                    if (await paymentVoucher[i].type === 'debit') {
                        paymentVoucher[i].debitAmount = await 0;
                        paymentVoucher[i].creditAmount = await paymentVoucher[i].total_amount;
                    } else {
			 paymentVoucher[i].debitAmount = await paymentVoucher[i].total_amount;
                        paymentVoucher[i].creditAmount = await 0;

                       
                    }
                    paymentVoucher[i].ledger = await paymentVoucher[i].PaymentBuyer;
                    delete paymentVoucher[i].PaymentBuyer;
                    paymentVoucher[i].voucher_type = await 'payment';
                    paymentVoucher[i].voucher_number = await paymentVoucher[i].id;
                    paymentVoucher[i].invoice_id = await paymentVoucher[i].invoice_id<=9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/00${paymentVoucher[i].invoice_id}`:paymentVoucher[i].invoice_id>9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/0${paymentVoucher[i].invoice_id}`:`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/${paymentVoucher[i].invoice_id}`;
                    await array.push(paymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: mainArray
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "No date Found!"
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getAllBankVoucher = async function(data, res) {
    try {
        console.log(data, " = = = ");
        let recieptVoucher, paymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            }
        });
        if (ledger && ledger.dataValues.id) {
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: new Date(data.start_date),
                                [Op.lte]: new Date(data.end_date)
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'ReciptBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                paymentVoucher = await PaymentVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: new Date(data.start_date),
                                [Op.lte]: new Date(data.end_date)
                            }
                        }]
                    },
                    include: [{
                        model: Ledger,
                        as: 'PaymentBuyer',
                    }],
                    order: [
                        ['invoice_id', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
                ledger = await decreption(ledger, 'object', data.data.email);
                if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                    recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                    paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
                }

            let array = await [];


            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
                    ledger.dataValues.debitAmount = await ledger.dataValues.amount;
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await ledger.dataValues.amount;
                }
                ledger.dataValues.open = await true;
                ledger.dataValues.voucher_type = '';
                ledger.dataValues.voucher_number = '';
                ledger.dataValues.invoice_id = '';
                await array.push(ledger.dataValues);
            }

            if (recieptVoucher) {
                for (var i = 0; i < recieptVoucher.length; i++) {
                    if (await recieptVoucher[i].type === 'debit') {
 			recieptVoucher[i].debitAmount = await 0;
                        recieptVoucher[i].creditAmount = await recieptVoucher[i].total_amount;

                        
                    } else {
                       recieptVoucher[i].debitAmount = await recieptVoucher[i].total_amount;
                        recieptVoucher[i].creditAmount = await 0;
                    }
                    recieptVoucher[i].ledger = await recieptVoucher[i].ReciptBuyer;
                    delete recieptVoucher[i].ReciptBuyer;
                    recieptVoucher[i].voucher_type = await 'reciept';
                    recieptVoucher[i].voucher_number = await recieptVoucher[i].id;
                    recieptVoucher[i].invoice_id = await recieptVoucher[i].invoice_id<=9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/00${recieptVoucher[i].invoice_id}`:recieptVoucher[i].invoice_id>9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/0${recieptVoucher[i].invoice_id}`:`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/${recieptVoucher[i].invoice_id}`;
                    await array.push(recieptVoucher[i]);
                }
            }

            if (paymentVoucher) {
                for (var i = 0; i < paymentVoucher.length; i++) {
                    if (await paymentVoucher[i].type === 'debit') {
                       
			paymentVoucher[i].debitAmount = await 0;
                        paymentVoucher[i].creditAmount = await paymentVoucher[i].total_amount;
                    } else {
                         paymentVoucher[i].debitAmount = await paymentVoucher[i].total_amount;
                        paymentVoucher[i].creditAmount = await 0;
                    }
                    paymentVoucher[i].ledger = await paymentVoucher[i].PaymentBuyer;
                    delete paymentVoucher[i].PaymentBuyer;
                    paymentVoucher[i].voucher_type = await 'payment';
                    paymentVoucher[i].voucher_number = await paymentVoucher[i].id;
                    paymentVoucher[i].invoice_id = await paymentVoucher[i].invoice_id<=9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/00${paymentVoucher[i].invoice_id}`:paymentVoucher[i].invoice_id>9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/0${paymentVoucher[i].invoice_id}`:`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/${paymentVoucher[i].invoice_id}`;
                    await array.push(paymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: mainArray
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "No date Found!"
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getSalesRegisterVoucher = async function(data, res) {
    try {
        let uids = [];
        let ledger = await Ledger.findAll({
            where: {
                company_id: data.company_id
            }
        }).map((node) => node.get({
            plain: true
        }));
        ledger = await decreption(ledger, "array", data.data.email)
        await ledger.map(item=>{
            if(item.name && item.name.match("Sale ")){
               console.log("comememe")
                uids.push(item.uid)
            }
        })

        if(ledger.length>0){
            let items = await VoucherInteries.findAll({where:{ ledger_id: {[Op.in]: uids }},
                include:[{
                    model:SaleVoucher,
                    as:'Vouchers',
                    where:{
                        invoice_date: {
                            [Op.gte]: new Date(data.start_date),
                            [Op.lte]: new Date(data.end_date)
                        }
                    },
                    include:[{
                        model:Ledger,
                        as: 'SalesLedger'
                    },{
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Sales'
                        }
                    },{
                        model:TaxInteries,
                        required: false,
                        where: {
                            type: 'Sales'
                        }
                    }]
                },{
                    model:Ledger
                }]
            }).map((node) => node.get({
                plain: true
            }));
            items = await decreptionSale(items, 'array', data.data.email);
            let array = await [];
            let head =await [];
            if(items && items.length>0){
            //     items.map(async(element) => {
            //        let data = {}; 
            //         element.Vouchers.invoice_id = await element.Vouchers.invoice_id<=9?`${element.Vouchers.current_year.toString().substr(-2)+`-`+element.Vouchers.end_year.toString().substr(-2)}/00${element.Vouchers.invoice_id}`:element.Vouchers.invoice_id>9?`${element.Vouchers.current_year.toString().substr(-2)+`-`+element.Vouchers.end_year.toString().substr(-2)}/0${element.Vouchers.invoice_id}`:`${element.Vouchers.current_year.toString().substr(-2)+`-`+element.Vouchers.end_year.toString().substr(-2)}/${element.Vouchers.invoice_id}`;
            //         console.log(element.Vouchers.invoice_id, " = == = = = = == ")
            //         let find = array.find(el=>el.invoice_id===element.Vouchers.invoice_id);
            //         if(find){
            //             find.voucherInteries.push(element);
            //             find.voucherInteries.map(ele=>{
            //                 if(ele.Vouchers){
            //                     delete ele.Vouchers;
            //                 }
            //             })
            //         }else{
            //             element.Vouchers.voucherInteries= [];
            //             element.Vouchers.Buyer = element.Vouchers.SalesLedger;
            //             delete element.Vouchers.SalesLedger;
            //             data = element.Vouchers;
            //             data.invoice_id = await data.invoice_id;
            //             data.voucherInteries.push(element);
            //             delete data.voucherInteries[0].Vouchers;
            //             array.push(data)
            //         }
            //    });

               if(items && items.length>0){
                for (let i = 0; i < items.length; i++) {
                    let data =await {
                        voucherInteries:[]
                    }; 
                    console.log(items[i].Vouchers.invoice_id , " == = = = =", i)
                    items[i].Vouchers.invoice_id = await items[i].Vouchers.invoice_id<=9?`${items[i].Vouchers.current_year.toString().substr(-2)+`-`+items[i].Vouchers.end_year.toString().substr(-2)}/00${items[i].Vouchers.invoice_id}`:items[i].Vouchers.invoice_id>9?`${items[i].Vouchers.current_year.toString().substr(-2)+`-`+items[i].Vouchers.end_year.toString().substr(-2)}/0${items[i].Vouchers.invoice_id}`:`${items[i].Vouchers.current_year.toString().substr(-2)+`-`+items[i].Vouchers.end_year.toString().substr(-2)}/${items[i].Vouchers.invoice_id}`;
                    let find  =await array.find(el=>el.invoice_id===items[i].Vouchers.invoice_id);
                    if(await find){
                        await find.voucherInteries.push(items[i]);
                        await find.voucherInteries.map(ele=>{
                            if(ele.Vouchers){
                                delete ele.Vouchers;
                            }
                        })
                    }else{
                        items[i].Vouchers.voucherInteries=await [];
                        items[i].Vouchers.Buyer =await items[i].Vouchers.SalesLedger;
                        delete items[i].Vouchers.SalesLedger;
                        data =await items[i].Vouchers;
                        data.invoice_id =await data.invoice_id;
                        data.voucherInteries.push(items[i]);
                        delete data.voucherInteries[0].Vouchers;
                        array.push(data)
                    }
                }
            }
            }
         
            await array.forEach(async(data) => {
                console.log("ccocmcmcooc", data)
                await data.voucherInteries.forEach(h => {
                    if(data.is_local==='yes'){
                        let name1 = h.type+' (LOCAL) SGST '+Number(h.ledger.sale_key)/2;
                        // let name2 = h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2;
                        let check = head.find(c=>c.name===name1);
                        if(check){

                        }else{
                            head.push({name:h.type+' (LOCAL) SGST '+Number(h.ledger.sale_key)/2, key:Number(h.ledger.sale_key)/2, flag:'local'},{name:h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2, key:Number(h.ledger.sale_key)/2, flag:'local'})
                        }
                    }else{
                        let name = h.type+' (INTERSTATE) '+h.ledger.sale_key;
                        let check = head.find(c=>c.name===name);
                        if(check){

                        }else{
                            head.push({name:h.type+' (INTERSTATE) '+h.ledger.sale_key, key :h.ledger.sale_key, flag:'outer'})
                        }
                    }
                });
            });
            let mainArray = await arraySort(array, 'invoice_date') 
            let obj =await {
                data:mainArray,
                head:head,
                items:items
            }
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                Voucher: obj
            };
           
        }else{
            return {
                statusCode: res.statusCode,
                success: true,
                message: "No date Found!"
            };
        }
    } catch (e) {
        console.log(e, " == = = ")
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getPurchaseRegisterVoucher = async function(data, res) {
    try {
        let uids = [];
        let ledger = await Ledger.findAll({
            where: {
                company_id: data.company_id,
                // name: { [Op.like]: "%purchase-%" }
            }
        })//.map(u => u.get("uid"));
        ledger = await decreption(ledger, "array", data.data.email)
        await ledger.map(item=>{
            if(item.name && item.name.match("Purchase ")){
                uids.push(item.uid)
            }
        })
        console.log(uids);
        if(ledger.length>0){

        //     let items = await PurchaseVoucher.findAll({where:{
        //         invoice_date: {
        //             [Op.gte]: new Date(data.start_date),
        //             [Op.lte]: new Date(data.end_date)
        //         },
        //         buyer_ledger_id: { [Op.in]: uids }
        //     },
        //     include:[{
        //         model:Ledger,
        //         as: 'PurchaseLedger'
        //     },{
        //         model:ItemInteries,
        //         required: false,
        //         where: {
        //             type: 'Purchase'
        //         }
        //     },{
        //         model:VoucherInteries,
        //         required: false,
        //         where: {
        //             type: 'Purchase'
        //         },
        //         include:[{
        //             model:Ledger
        //         }]
        //     }]
        // }).map((node) => node.get({
        //     plain: true
        // }));
        console.log(data.start_date, "= = = == = = = =", data.start_date)
            let items = await VoucherInteries.findAll({where:{ledger_id: { [Op.in]: uids }},
                include:[{
                    model:PurchaseVoucher,
                    as:'Voucherp',
                    where:{
                        invoice_date: {
                            [Op.gte]: new Date(data.start_date),
                            [Op.lte]: new Date(data.end_date)
                        }
                    },
                    include:[{
                        model:Ledger,
                        as: 'PurchaseLedger'
                    },{
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    },{
                        model:TaxInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        },
                        include:[{
                            model:Ledger
                        }]
                    }]
                },{
                    model:Ledger//,as:'VoucherLedger'
                }]
            }).map((node) => node.get({
                plain: true
            }));

            items = await decreptionPurchase(items, 'array', data.data.email);

            let array = await [];
            let head =await [];
            if(items && items.length>0){
                for (let i = 0; i < items.length; i++) {
                    let data =await {
                        voucherInteries:[]
                    }; 
                    console.log(items[i].Voucherp.invoice_id , " == = = = =", i)
                    items[i].Voucherp.invoice_id = await items[i].Voucherp.invoice_id<=9?`${items[i].Voucherp.current_year.toString().substr(-2)+`-`+items[i].Voucherp.end_year.toString().substr(-2)}/00${items[i].Voucherp.invoice_id}`:items[i].Voucherp.invoice_id>9?`${items[i].Voucherp.current_year.toString().substr(-2)+`-`+items[i].Voucherp.end_year.toString().substr(-2)}/0${items[i].Voucherp.invoice_id}`:`${items[i].Voucherp.current_year.toString().substr(-2)+`-`+items[i].Voucherp.end_year.toString().substr(-2)}/${items[i].Voucherp.invoice_id}`;
                    let find  =await array.find(el=>el.invoice_id===items[i].Voucherp.invoice_id);
                    if(await find){
                        await find.voucherInteries.push(items[i]);
                        await find.voucherInteries.map(ele=>{
                            if(ele.Voucherp){
                                delete ele.Voucherp;
                            }
                        })
                    }else{
                        items[i].Voucherp.voucherInteries=await [];
                        items[i].Voucherp.Buyer =await items[i].Voucherp.PurchaseLedger;
                        delete items[i].Voucherp.PurchaseLedger;
                        data =await items[i].Voucherp;
                        data.invoice_id =await data.invoice_id;
                        data.voucherInteries.push(items[i]);
                        delete data.voucherInteries[0].Voucherp;
                        array.push(data)
                    }
                }
            }
            await array.forEach(async(data) => {
                console.log("ccocmcmcooc")
                await data.voucherInteries.forEach(h => {
                    if(data.is_local==='yes'){
                        let name1 = h.type+' (LOCAL) SGST '+Number(h.ledger.sale_key)/2;
                        // let name2 = h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2;
                        let check = head.find(c=>c.name===name1);
                        if(check){

                        }else{
                            head.push({name:h.type+' (LOCAL) SGST '+Number(h.ledger.sale_key)/2, key:Number(h.ledger.sale_key)/2, flag:'local'},{name:h.type+' (LOCAL) CGST '+Number(h.ledger.sale_key)/2, key:Number(h.ledger.sale_key)/2, flag:'local'})
                        }
                    }else{
                        let name = h.type+' (INTERSTATE) '+h.ledger.sale_key;
                        let check = head.find(c=>c.name===name);
                        if(check){

                        }else{
                            head.push({name:h.type+' (INTERSTATE) '+h.ledger.sale_key, key :h.ledger.sale_key, flag:'outer'})
                        }
                    }
                });
            });
            
            let mainArray = await arraySort(array, 'invoice_date') 
            let obj =await {
                data:mainArray,
                head:head
            }
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                Voucher: obj
            };
           
        }else{
            return {
                statusCode: res.statusCode,
                success: true,
                message: "No date Found!"
            };
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getdayBookVoucher = async function(data, res) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher = [];

    
        console.log("data", data)
        journalVoucher = await JournalInteries.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                   // invoice_date: data.start_date
                   invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                model: Ledger,as:"VoucherLedger"
            }, {
                model: JournalVoucher,
                as: 'Voucher'
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'SalesLedger',
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));


        purchaseVoucher = await PurchaseVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'PurchaseLedger',
                },
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'CreditBuyer',
                },
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'DebitBuyer',
                },
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        recieptVoucher = await RecieptVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                model: Ledger,
                as: 'ReciptBuyer',
            }],
            order: [
                ['invoice_id', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        paymentVoucher = await PaymentVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },
            include: [{
                model: Ledger,
                as: 'PaymentBuyer',
            }],
            order: [
                ['invoice_id', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
        
        journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
        recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
        paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
        saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
        purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
        creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
        debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);

        let array = await [];

        if (journalVoucher && journalVoucher.length>0) {
            for (var i = 0; i < journalVoucher.length; i++) {
                if (await journalVoucher[i].type === 'debit') {
                    journalVoucher[i].debitAmount = await journalVoucher[i].amount;
                    journalVoucher[i].creditAmount = await 0;
                } else {
                    journalVoucher[i].debitAmount = await 0;
                    journalVoucher[i].creditAmount = await journalVoucher[i].amount;
                }
                journalVoucher[i].ledger = await journalVoucher[i].VoucherLedger;
                journalVoucher[i].voucher_type = await 'journal';
                if(journalVoucher[i].Voucher){
                    journalVoucher[i].invoice_date =  await journalVoucher[i].Voucher.invoice_date;
                    journalVoucher[i].voucher_number = await journalVoucher[i].Voucher.id;
                    journalVoucher[i].invoice_id =await journalVoucher[i].Voucher.invoice_id<=9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/00${journalVoucher[i].Voucher.invoice_id}`:journalVoucher[i].Voucher.invoice_id>9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/0${journalVoucher[i].Voucher.invoice_id}`:`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+journalVoucher[i].Voucher.end_year.toString().substr(-2)}/${journalVoucher[i].Voucher.invoice_id}`;
                }else{
                    journalVoucher[i].invoice_date = '';
                    journalVoucher[i].voucher_number ='';
                    journalVoucher[i].invoice_id ='';
                }
                delete  journalVoucher[i].VoucherLedger;
                await array.push(journalVoucher[i]);
            }
        }
        
        if (saleVoucher && saleVoucher.length>0) {            
            for (var s = 0; s < saleVoucher.length; s++) {
                saleVoucher[s].voucher_type = await 'sale';
                saleVoucher[s].ledger = await saleVoucher[s].SalesLedger;
                saleVoucher[s].Voucher = await {};
                saleVoucher[s].type = 'debit',
                saleVoucher[s].debitAmount = await saleVoucher[s].total_amount;
                saleVoucher[s].creditAmount = await 0;
                saleVoucher[s].amount = saleVoucher[s].total_amount,
                saleVoucher[s].voucher_number = await saleVoucher[s].id;
                saleVoucher[s].invoice_id =  await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${saleVoucher[s].invoice_id}`;
                delete saleVoucher[s].SalesLedger;
                await array.push(saleVoucher[s]);
            }
        }

        if (purchaseVoucher && purchaseVoucher.length>0) {
            for (var s = 0; s < purchaseVoucher.length; s++) {
                purchaseVoucher[s].voucher_type = await 'purchase';
                purchaseVoucher[s].ledger = await purchaseVoucher[s].PurchaseLedger;
                purchaseVoucher[s].Voucher = await {};
                purchaseVoucher[s].type = 'Credit',
                purchaseVoucher[s].debitAmount = await 0;
                purchaseVoucher[s].creditAmount = await purchaseVoucher[s].total_amount;
                purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                purchaseVoucher[s].invoice_id =  await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/00${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/0${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                delete purchaseVoucher[s].PurchaseLedger;
                await array.push(purchaseVoucher[s]);
            }
        }

        if (creditVoucher) {
            for (var s = 0; s < creditVoucher.length; s++) {
                creditVoucher[s].voucher_type = await 'Credit note';
                creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                creditVoucher[s].Voucher = await {};
                creditVoucher[s].type = 'debit',
                creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                creditVoucher[s].creditAmount = await 0;
                creditVoucher[s].amount = creditVoucher[s].total_amount,
                creditVoucher[s].voucher_number = await creditVoucher[s].id;
                creditVoucher[s].invoice_id =  await creditVoucher[s].invoice_id<=9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/00${creditVoucher[s].invoice_id}`:creditVoucher[s].invoice_id>9?`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/0${creditVoucher[s].invoice_id}`:`${creditVoucher[s].current_year.toString().substr(-2)+`-`+creditVoucher[s].end_year.toString().substr(-2)}/${creditVoucher[s].invoice_id}`;
                delete creditVoucher[s].CreditBuyer;
                await array.push(creditVoucher[s]);
            }
        }

        if (debitVoucher) {
            for (var s = 0; s < debitVoucher.length; s++) {
                debitVoucher[s].voucher_type = await 'Debit note';
                debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                debitVoucher[s].Voucher = await {};
                debitVoucher[s].type = 'Credit',
                debitVoucher[s].debitAmount = await 0;
                debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                debitVoucher[s].amount = debitVoucher[s].total_amount,
                debitVoucher[s].voucher_number = await debitVoucher[s].id;
                debitVoucher[s].invoice_id = await debitVoucher[s].invoice_id<=9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/00${debitVoucher[s].invoice_id}`:debitVoucher[s].invoice_id>9?`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/0${debitVoucher[s].invoice_id}`:`${debitVoucher[s].current_year.toString().substr(-2)+`-`+debitVoucher[s].end_year.toString().substr(-2)}/${debitVoucher[s].invoice_id}`;
                delete debitVoucher[s].DebitBuyer;
                await array.push(debitVoucher[s]);
            }
        }

        if (recieptVoucher) {
            for (var i = 0; i < recieptVoucher.length; i++) {
                if (await recieptVoucher[i].type === 'debit') {
                    recieptVoucher[i].debitAmount = await recieptVoucher[i].total_amount;
                    recieptVoucher[i].creditAmount = await 0;
                } else {
                    recieptVoucher[i].debitAmount = await 0;
                    recieptVoucher[i].creditAmount = await recieptVoucher[i].total_amount;
                }
                recieptVoucher[i].ledger = await recieptVoucher[i].ReciptBuyer;
                delete recieptVoucher[i].ReciptBuyer;
                recieptVoucher[i].voucher_type = await 'reciept';
                recieptVoucher[i].voucher_number = await recieptVoucher[i].id;
                recieptVoucher[i].invoice_id = await recieptVoucher[i].invoice_id<=9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/00${recieptVoucher[i].invoice_id}`:recieptVoucher[i].invoice_id>9?`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/0${recieptVoucher[i].invoice_id}`:`${recieptVoucher[i].current_year.toString().substr(-2)+`-`+recieptVoucher[i].end_year.toString().substr(-2)}/${recieptVoucher[i].invoice_id}`;
                await array.push(recieptVoucher[i]);
            }
        }

        if (paymentVoucher) {
            for (var i = 0; i < paymentVoucher.length; i++) {
                if (await paymentVoucher[i].type === 'debit') {
                    paymentVoucher[i].debitAmount = await paymentVoucher[i].total_amount;
                    paymentVoucher[i].creditAmount = await 0;
                } else {
                    paymentVoucher[i].debitAmount = await 0;
                    paymentVoucher[i].creditAmount = await paymentVoucher[i].total_amount;
                }
                paymentVoucher[i].ledger = await paymentVoucher[i].PaymentBuyer;
                delete paymentVoucher[i].PaymentBuyer;
                paymentVoucher[i].voucher_type = await 'payment';
                paymentVoucher[i].voucher_number = await paymentVoucher[i].id;
                paymentVoucher[i].invoice_id =await paymentVoucher[i].invoice_id<=9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/00${paymentVoucher[i].invoice_id}`:paymentVoucher[i].invoice_id>9?`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/0${paymentVoucher[i].invoice_id}`:`${paymentVoucher[i].current_year.toString().substr(-2)+`-`+paymentVoucher[i].end_year.toString().substr(-2)}/${paymentVoucher[i].invoice_id}`;
                await array.push(paymentVoucher[i]);
            }
        }
        console.log(array, " = == = = ")
        if(array.length>0){
            let mainArray = await arraySort(array, 'invoice_date') 
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: mainArray,
                journal:journalVoucher,
                sales:saleVoucher,
                purchase:purchaseVoucher,
                credit:creditVoucher,
                debit:debitVoucher,
                payment:paymentVoucher,
                reciept:recieptVoucher
            };
        }else{
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher not found!",
                JournalVoucher: []
            }; 
        }
       
    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getJournalRegisterVoucher = async function(data, res) {
    try {
        console.log(data.start_date, new Date(data.start_date))
        // return;
        let items = await JournalVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                }]
            },include:[
                {
                    model:Company,
                    attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
                },
                {
                    model:Purpose,
                },
                {
                    model:itemStockVoucherEntries,
                },
                {
                    model:JournalInteries,
                    required:true,
                    include:[
                        {
                            model:Ledger, as:'VoucherLedger'
                        }
                    ]
                }
             ],order: [['invoice_date', 'ASC']]
        }).map((node) => node.get({
            plain: true
        }));
        items = await decreptionJournal(items, 'array', data.data.email);
        let array = await [];

        if(items && items.length>0){
            for (var i = 0; i < items.length; i++) {
                if(items[i].journal_entries){
                    items[i].journal_entries.forEach((el, index) => {
                        if(index===0){
                            if (el.type === 'debit') {
                                el.debitAmount = el.amount;
                                el.creditAmount = 0;
                            } else {
                                el.debitAmount = 0;
                                el.creditAmount = el.amount;
                            }
                            el.total_amount = items[i].total_amount;
                            el.invoice_id = items[i].invoice_id<=9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`:items[i].invoice_id>9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`:`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`;;
                            el.invoice_date = items[i].invoice_date;
                            el.purpose_voucher = items[i].purpose_voucher;
                            el.journal_voucher_id = items[i].uid;
                            array.push(el);
                        }else{
                            if (el.type === 'debit') {
                                el.debitAmount = el.amount;
                                el.creditAmount = 0;
                            } else {
                                el.debitAmount = 0;
                                el.creditAmount = el.amount;
                            }
                            el.total_amount = '';
                            el.invoice_id = '';
                            el.invoice_date = '';
                            el.purpose_voucher = '';
                            el.journal_voucher_id = items[i].uid;
                            array.push(el);
                        }
                    })
                }
                
                if(items[i].item_stock_voucher_entries){
                    items[i].item_stock_voucher_entries.forEach((el, index) => {
                        if(index===0){
                            if (el.type.toLowerCase() === 'debit') {
                                el.debitAmount = el.price;
                                el.creditAmount = 0;
                            } else {
                                el.debitAmount = 0;
                                el.creditAmount = el.price;
                            }
                            el.VoucherLedger = items[i].Ledger;
                            el.total_amount = items[i].total_amount;
                            el.invoice_id = items[i].invoice_id<=9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/00${items[i].invoice_id}`:items[i].invoice_id>9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/0${items[i].invoice_id}`:`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`;;
                            el.invoice_date = items[i].invoice_date;
                            el.purpose_voucher = items[i].purpose_voucher;
                            el.journal_voucher_id = items[i].uid;
                            array.push(el);
                        }else{
                            if (el.type.toLowerCase() === 'debit') {
                                el.debitAmount = el.price;
                                el.creditAmount = 0;
                            } else {
                                el.debitAmount = 0;
                                el.creditAmount = el.price;
                            }
                            el.VoucherLedger = items[i].Ledger;
                            el.total_amount = '';
                            el.invoice_id = '';
                            el.invoice_date = '';
                            el.purpose_voucher = '';
                            el.journal_voucher_id = items[i].uid;
                            array.push(el);
                        }
                    })
                };
            }
        }else{
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher not found!",
                Voucher: []
            };
        }
        // let mainArray = await arraySort(array, 'invoice_date') 
        return {
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
            Voucher: array
        };
    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getgroupVoucher = async function(data, res) {
    try {
        let Mainarray = await [];
        let query;
        if(data.account_id){
            query =await {account_group_id:data.account_id}
        }
        if(data.sub_account_id){
            query =await {sub_account_group_id:data.sub_account_id}
        }
        let ledger = await Ledger.findAll({
            where: {
                [Op.and]: [query, {
                    company_id: data.company_id
                }]
            },
            attributes:['id', 'uid', 'name', 'amount', 'opening_balance'],
            include:[{
                    model: AccountGroup
                },{
                    model: SubAccountGroup
                },{
                    model:JournalInteries,
                    where:{
                        invoice_date: {
                            [Op.gte]: new Date(data.start_date),
                            [Op.lte]: new Date(data.end_date)
                        }
                    },
                    required:false,
                    attributes:['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
                    include:[
                        {
                            model: JournalVoucher,
                            attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                            as: 'Voucher'
                        }
                    ]
            }, {
                model:RecieptVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },{
                model:PaymentVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            }, {
                model:SaleVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },{
                model:PurchaseVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    }]
            },{
                model:CreditVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Debit'
                        }
                    }]
            },
            {
                model:DebitVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: new Date(data.start_date),
                        [Op.lte]: new Date(data.end_date)
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Credit'
                        }
                    }]
            },
            {
                model:VoucherInteries, as:'vocher_entries',
                attributes:['id', 'uid', 'amount', 'type']
            },{
                model:TaxInteries,as:'tax_entries',
                attributes:['id', 'uid', 'amount', 'type']
            }
        ]}).map((node) => node.get({
            plain: true
        }));
        ledger = await decreptionReport(ledger, 'array', data.data.email);
         console.log("array1233-->",ledger);
        if(ledger.length>0){
            console.log("array-->",ledger);
            await ledger.map(item=>{
                item.open_amount = item.amount;
                item.open_type = item.opening_balance; 
                item.name = item.name; 
                item.subAccount = item.sub_account_group?item.sub_account_group:{}; 
                item.account = item.account_group?item.account_group:{}; 
                delete item.amount;delete item.opening_balance;delete item.sub_account_group;delete item.account_group;
                item.closeing_amount = 0;
                item.debitAmount = 0;
                item.creditAmount = 0;
                if(item.journal_entries.length>0){
                    item.journal_entries.forEach(journal=>{
                        if (journal.type === 'debit') {
                           
                            item.debitAmount =  Number(journal.amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(journal.amount)+Number(item.debitAmount);
                           
                        }
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.reciept_vouchers.length>0){
                    item.reciept_vouchers.forEach(reciept=>{
                        if (reciept.type === 'debit') {
                            item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(reciept.total_amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.payment_vouchers.length>0){
                    item.payment_vouchers.forEach(payment=>{
                        if (payment.type === 'debit') {
                            item.debitAmount =  Number(payment.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(payment.total_amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.sales_vouchers && item.sales_vouchers.length>0){
                    item.sales_vouchers.forEach(sale=>{
                        item.debitAmount =  Number(sale.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.purchase_vouchers.length>0){
                    item.purchase_vouchers.forEach(purchase=>{
                        item.creditAmount =  Number(purchase.total_amount)+Number(item.creditAmount);
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.credit_vouchers.length>0){
                    item.credit_vouchers.forEach(credit=>{
                        item.debitAmount =  Number(credit.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.debit_vouchers.length>0){
                    item.debit_vouchers.forEach(debit=>{
                        item.creditAmount =  Number(debit.total_amount)+Number(item.creditAmount);
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.vocher_entries.length>0){
                    item.vocher_entries.forEach(voucher=>{
                        if(voucher.type==="Sales" || voucher.type==="sales"){
                            item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                        }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                            item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
                        }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                            item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
                        }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                            item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                if(item.tax_entries.length>0){
                    item.tax_entries.forEach(tax=>{
                        if(tax.type==="Sales" || tax.type==="sales"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }else if(tax.type==="Purchase" || tax.type==="purchase"){
                            item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                        }else if(tax.type==="Debit" || tax.type==="Debit"){
                            item.debitAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }else if(tax.type==="Credit" || tax.type==="Credit"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.debitAmount)-Number(item.creditAmount))+Number(item.open_amount);
                    })
                }
                delete item.journal_entries;
                delete item.reciept_vouchers;
                delete item.payment_vouchers;
                delete item.sales_vouchers;
                delete item.purchase_vouchers;
                delete item.credit_vouchers;
                delete item.debit_vouchers;
                delete item.vocher_entries;
                delete item.tax_entries;
            })
            let returngroup = await groupFuncation(ledger);
            if(returngroup){
                await Object.keys(returngroup).forEach(function (item) {
                    // console.log(item);
                    // console.log(returngroup[item][0].account.name, " == = = = =")
                    if(item==="MainGroup"){
                        if(returngroup[item].length>0){
                           
                            let a = {
                                name:returngroup[item][0].account.name,
                                open_amount:0,
                                closeing_amount:0,
                                sub_uid:'',
                                subAccount:{},
                                debitAmount:0,
                                creditAmount:0,
                                ishead:true,
                                ismain:true
                            };
                            let b = [];
                            returngroup[item].forEach(element=>{
                                a.open_amount = Number(a.open_amount)+Number(element.open_amount);
                                a.subAccount = {};
                                a.closeing_amount = Number(a.closeing_amount)+Number(element.closeing_amount);
                                if (element.type === 'debit') {
                                    a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount);
                                    a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount);
                                } else {
                                    a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount);
                                    a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount);
                                }
                                b.push(element);
                            })
                            b.unshift(a);
                            Mainarray = Mainarray.concat(b);
                        }
                    }else{
                        let a = {
                            name:item,
                            open_amount:0,
                            closeing_amount:0,
                            sub_uid:'',
                            subAccount:{},
                            debitAmount:0,
                            creditAmount:0,
                            ishead:true,
                            issub:true
                        };
                        let b = [];
                        returngroup[item].forEach(element=>{
                            a.open_amount = Number(a.open_amount)+Number(element.open_amount);
                            a.sub_uid = element.subAccount.uid;
                            a.subAccount = {};
                            a.closeing_amount = Number(a.closeing_amount)+Number(element.closeing_amount);
                            if (element.type === 'debit') {
                                a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount);
                                a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount);
                            } else {
                                a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount);
                                a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount);
                            }
                            b.push(element);
                        })
                        b.unshift(a);
                        Mainarray = Mainarray.concat(b);
                    }
                });
            }
            if(Mainarray.length>0){
                return {
                    statusCode: res.statusCode,
                    success: true,
                    message: "voucher fetch Successfully",
                    JournalVoucher: Mainarray
                }
            }else{
                return {
                    statusCode: res.statusCode,
                    success: false,
                    message: "No date Found!"
                };
            }
            // return{
            //     data:ledger
            // }
        }else{
            return {
                statusCode: res.statusCode,
                success: false,
                message: "No date Found!"
            };
        }
    } catch (e) {
        console.log(e, " == = = =errro")
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}