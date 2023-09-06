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
import itemStockVoucherEntries from '../models/item_stock_voucher_entries';
import { getDebitCredit } from './getDebitCredit';
import balanceGroup from '../constant/balanceGroup';

console.log("balanceGroup", balanceGroup.ids)

async function checkValid(id) {
    let findledger = await Ledger.findOne({where:{uid:id}});
    if(findledger){
        let data = balanceGroup.ids.find((item) => item==findledger.dataValues.account_group_id);
        console.log("data", data)
        if(data){
            return true
        }else{
            return false  
        }
    }else{
        return false
    }

}


exports.CashOldBlance = async function (data) {
    try {
        let checkExist = await checkValid(data.ledger_id);
        if(!checkExist){
            return {credit:0, debit:0}
        }
        let recieptVoucher, paymentVoucher, purchaseVoucher, saleVoucher = [];
        recieptVoucher = await RecieptVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    receive_id: data.ledger_id
                }, {
                    invoice_date: {
                        [Op.lt]: data.start_date
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
                        [Op.lt]: data.start_date
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
    
        saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    buyer_ledger_id: data.ledger_id
                }, {
                    invoice_date: {
                        [Op.lt]: data.start_date
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
                        [Op.lt]: data.start_date
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
        recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
        paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
        purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
        saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
        let array = [];
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
    
        if (purchaseVoucher) {
            for (var i = 0; i < purchaseVoucher.length; i++) {
                purchaseVoucher[i].debitAmount = await 0;
                purchaseVoucher[i].creditAmount = await purchaseVoucher[i].total_amount;
                purchaseVoucher[i].ledger = await purchaseVoucher[i].PurchaseLedger;
                delete purchaseVoucher[i].PurchaseLedger;
                purchaseVoucher[i].voucher_type = await 'purchase';
                purchaseVoucher[i].voucher_number = await purchaseVoucher[i].id;
                purchaseVoucher[i].invoice_id = await `${purchaseVoucher[i].current_year.toString().substr(-2)+`-`+purchaseVoucher[i].end_year.toString().substr(-2)}/${purchaseVoucher[i].invoice_id}`;
                await array.push(purchaseVoucher[i]);
            }
        }
        if (saleVoucher) {
            for (var i = 0; i < saleVoucher.length; i++) {
                saleVoucher[i].debitAmount = await saleVoucher[i].total_amount
                saleVoucher[i].creditAmount = 0
                saleVoucher[i].ledger = await saleVoucher[i].SalesLedger;
                delete saleVoucher[i].SalesLedger;
                saleVoucher[i].voucher_type = await 'sale';
                saleVoucher[i].voucher_number = await saleVoucher[i].id;
                saleVoucher[i].invoice_id = await saleVoucher[i].invoice_id<=9?`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/00${saleVoucher[i].invoice_id}`:saleVoucher[i].invoice_id>9?`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/0${saleVoucher[i].invoice_id}`:`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/${saleVoucher[i].invoice_id}`;
                await array.push(saleVoucher[i]);
            }
        }
        let debitcredit =await getDebitCredit(array);
        return debitcredit
    } catch (e) {
       console.log(e)
    }
}



exports.BankOldBlance = async function (data) {
    try {
        let checkExist = await checkValid(data.ledger_id);
        if(!checkExist){
            return {credit:0, debit:0}
        }
        let recieptVoucher, paymentVoucher, saleVoucher, purchaseVoucher = [];
       
        recieptVoucher = await RecieptVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    receive_id: data.ledger_id
                }, {
                    invoice_date: {
                        [Op.lt]: data.start_date
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
                        [Op.lt]: data.start_date
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

        saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    buyer_ledger_id: data.ledger_id
                }, {
                    invoice_date: {
                        [Op.lt]: data.start_date
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
                        [Op.lt]: data.start_date
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

        recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
        paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
        purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
        saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);

        let array = [];
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
    
        if (purchaseVoucher) {
            for (var i = 0; i < purchaseVoucher.length; i++) {
                purchaseVoucher[i].debitAmount = await 0;
                purchaseVoucher[i].creditAmount = await purchaseVoucher[i].total_amount;
                purchaseVoucher[i].ledger = await purchaseVoucher[i].PurchaseLedger;
                delete purchaseVoucher[i].PurchaseLedger;
                purchaseVoucher[i].voucher_type = await 'purchase';
                purchaseVoucher[i].voucher_number = await purchaseVoucher[i].id;
                purchaseVoucher[i].invoice_id = await `${purchaseVoucher[i].current_year.toString().substr(-2)+`-`+purchaseVoucher[i].end_year.toString().substr(-2)}/${purchaseVoucher[i].invoice_id}`;
                await array.push(purchaseVoucher[i]);
            }
        }
        if (saleVoucher) {
            for (var i = 0; i < saleVoucher.length; i++) {
                saleVoucher[i].debitAmount = await saleVoucher[i].total_amount
                saleVoucher[i].creditAmount = 0
                saleVoucher[i].ledger = await saleVoucher[i].SalesLedger;
                delete saleVoucher[i].SalesLedger;
                saleVoucher[i].voucher_type = await 'sale';
                saleVoucher[i].voucher_number = await saleVoucher[i].id;
                saleVoucher[i].invoice_id = await saleVoucher[i].invoice_id<=9?`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/00${saleVoucher[i].invoice_id}`:saleVoucher[i].invoice_id>9?`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/0${saleVoucher[i].invoice_id}`:`${saleVoucher[i].current_year.toString().substr(-2)+`-`+saleVoucher[i].end_year.toString().substr(-2)}/${saleVoucher[i].invoice_id}`;
                await array.push(saleVoucher[i]);
            }
        }
        let debitcredit =await getDebitCredit(array);
        return debitcredit
    } catch (e) {
       console.log(e)
    }
}
