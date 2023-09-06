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
import Ledger from '../models/ledger';
import Sequelize, { NUMBER } from 'sequelize';
import arraySort from 'array-sort';
const Op = Sequelize.Op;
import { BankOldBlance } from './oldBalance';
import { decreptionReport } from "../security/voucherReport";
import { decreption } from "../security/ledger";
import { decreptionSale } from "../security/salesvoucher";
import { decreptionPayment } from "../security/paymentvoucher";
import { decreptionPurchase } from "../security/purchasevoucher";
import { decreptionReceipt } from "../security/receiptvoucher";
import { decreptionCredit } from "../security/creditvoucher";
import { decreptionDebit } from "../security/debitvoucher";
import { decreptionJournalEntries } from "../security/journalEntries";
import { decreptionItem } from "../security/itemEntries";
import itemStockVoucherEntries from '../models/item_stock_voucher_entries';
import balanceGroup from '../constant/balanceGroup';
import Groupsdrcr from '../constant/groups';
import "@babel/polyfill"
import Item from '../models/items';

async function groupFuncation(array){
    return array.reduce((acc, obj) => {
        let key;
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

async function checkValid(id) {
    let data = balanceGroup.profitids.find((item) => item==id);
    if(data){
        return true
    }else{
        return false  
    }
}

async function getAllLedgerVoucherprivious(start_date,end_date,ledger_id,company_id,openingbalncecredit,openingbalncedebit,email) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher,discountsaleVoucher, discountdebitVoucher, discountpurchaseVoucher, discountcreditVoucher, reciverrecieptVoucher, reciverpaymentVoucher
        let ledger = await Ledger.findOne({
            where: {
                uid: ledger_id,
                company_id: company_id
            },
            include:[{
                model:AccountGroup
            }]
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

            } else if (ledger.dataValues.sale_key) {

                saleVoucher = await ItemInteries.findAll({
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
                        as: 'Voucheris',
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


            
                purchaseVoucher = await ItemInteries.findAll({
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
                        as: 'Voucherip',
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

                creditVoucher = await ItemInteries.findAll({
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
                        as: 'Voucheric',
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

                debitVoucher = await ItemInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
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
                        as: 'Voucherid',
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


                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            company_id:company_id
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
                            company_id: data.company_id
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

            reciverrecieptVoucher = await RecieptVoucher.findAll({
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
                    as: 'ReciptReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            reciverpaymentVoucher = await PaymentVoucher.findAll({
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
                    as: 'PaymentReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));


            ledger = await decreption(ledger, 'object', email);

            if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            roundoff_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesRoundoffLedger',
                        },
                        {
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

                // return {saleVoucher}

                purchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            roundoff_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseRoundLedger',
                        },
                        {
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                // return {purchaseVoucher}
            }else{
                discountsaleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesDiscountLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                discountpurchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountcreditVoucher = await CreditVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'CreditDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountdebitVoucher = await DebitVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.lt]: start_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'DebitDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
            }

            // if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
            //     journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', email);
            //     recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', email);
            //     paymentVoucher = await decreptionPayment(paymentVoucher, 'array', email);
            // }
            journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', email);
            recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', email);
            paymentVoucher = await decreptionPayment(paymentVoucher, 'array', email);
            saleVoucher = await decreptionSale(saleVoucher, 'array', email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', email);
            reciverrecieptVoucher = await decreptionReceipt(reciverrecieptVoucher, 'array', email);
            reciverpaymentVoucher = await decreptionPayment(reciverpaymentVoucher, 'array', email);
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
                let salearray = []   
                for (var s = 0; s < saleVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].RoundOff;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = saleVoucher[s].roundoff_type,
                        saleVoucher[s].debitAmount = await saleVoucher[s].roundoff_type=="debit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].roundoff_type=="credit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].amount = saleVoucher[s].roundoff_value,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].RoundOff;
                        await array.push(saleVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(salearray.length>0){
                                let findSales = await salearray.find(it=> saleVoucher[s].Voucheris && it.invoice_idold==saleVoucher[s].Voucheris.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    saleVoucher[s].voucher_type = await 'sale';
                                    if(saleVoucher[s].Voucheris){
                                        saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                        delete  saleVoucher[s].Voucheris.SalesLedger;
                                    }else{
                                        saleVoucher[s].ledger = {};
                                    }
                                    saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                    saleVoucher[s].type = 'credit',
                                    saleVoucher[s].debitAmount = await 0;
                                    saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                    saleVoucher[s].amount = saleVoucher[s].total_amount,
                                    saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                    saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                    saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                    
                                    delete saleVoucher[s].Voucheris;
                                    await salearray.push(saleVoucher[s]);
                                    await array.push(saleVoucher[s]);
                                }
                            }else{
                                saleVoucher[s].voucher_type = await 'sale';
                                if(saleVoucher[s].Voucheris){
                                    saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                    delete  saleVoucher[s].Voucheris.SalesLedger;
                                }else{
                                    saleVoucher[s].ledger = {};
                                }
                                saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                saleVoucher[s].type = 'credit',
                                saleVoucher[s].debitAmount = await 0;
                                saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                saleVoucher[s].amount = saleVoucher[s].total_amount,
                                saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                
                                // delete saleVoucher[s].Vouchers;
                                await salearray.push(saleVoucher[s]);
                                await array.push(saleVoucher[s]);
                            }
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
                            saleVoucher[s].debitAmount = await 0
                            saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                            saleVoucher[s].amount = saleVoucher[s].total_amount,
                            saleVoucher[s].voucher_number = await saleVoucher[s].id;
                            saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${saleVoucher[s].invoice_id}`;
                            delete saleVoucher[s].SalesLedger;
                            await array.push(saleVoucher[s]);
                        }
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                let purchasearray = [] 
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].RoundOff;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = purchaseVoucher[s].roundoff_type,
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].roundoff_value,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].RoundOff;
                        await array.push(purchaseVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(purchaseVoucher.length>0){
                                let findSales = await purchasearray.find(it=>purchaseVoucher[s].Voucherip && it.invoice_idold==purchaseVoucher[s].Voucherip.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    purchaseVoucher[s].voucher_type = await 'purchase';
                                    if(purchaseVoucher[s].Voucherip){
                                        purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                        delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    }else{
                                        purchaseVoucher[s].ledger = {};
                                    }
                                    purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                    purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                    purchaseVoucher[s].type = 'debit',
                                    purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                    purchaseVoucher[s].creditAmount = await 0;
                                    purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                    purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                    purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                    delete  purchaseVoucher[s].Voucherip;
                                    await purchasearray.push(purchaseVoucher[s]);
                                    await array.push(purchaseVoucher[s]);
                                }
                            }else{
                                purchaseVoucher[s].voucher_type = await 'purchase';
                                if(purchaseVoucher[s].Voucherip){
                                    purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                }else{
                                    purchaseVoucher[s].ledger = {};
                                }
                                purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                purchaseVoucher[s].type = 'debit',
                                purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                purchaseVoucher[s].creditAmount = await 0;
                                purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                delete  purchaseVoucher[s].Voucherip;
                                await purchasearray.push(purchaseVoucher[s]);
                                await array.push(purchaseVoucher[s]);
                            }
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
                            purchaseVoucher[s].type = 'credit',
                            purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                            purchaseVoucher[s].creditAmount = await 0;
                            purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                            purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                            purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                            
                            delete purchaseVoucher[s].PurchaseLedger;
                            await array.push(purchaseVoucher[s]);
                        }
                    }
                }
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].Voucheric){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucheric.CreditBuyer;
                            delete  creditVoucher[s].Voucheric.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.invoice_id<=9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucheric.invoice_id}`:creditVoucher[s].Voucheric.invoice_id>9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucheric.invoice_id}`:`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/${creditVoucher[s].Voucheric.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucheric;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                        creditVoucher[s].Voucher = await {};
                        creditVoucher[s].type = 'credit',
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
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].Voucherid){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherid.DebitBuyer;
                            delete  debitVoucher[s].Voucherid.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.invoice_id<=9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherid.invoice_id}`:debitVoucher[s].Voucherid.invoice_id>9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherid.invoice_id}`:`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherid.invoice_id}` : '';
                        delete debitVoucher[s].Voucherid;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                        debitVoucher[s].Voucher = await {};
                        debitVoucher[s].type = 'debit',
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

            if (discountsaleVoucher && discountsaleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountsaleVoucher.length; s++) {
                        discountsaleVoucher[s].voucher_type = await 'sale';
                        discountsaleVoucher[s].ledger = await discountsaleVoucher[s].SalesDiscountLedger;
                        discountsaleVoucher[s].Voucher = await {};
                        discountsaleVoucher[s].type = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?'Credit':'Debit',
                        discountsaleVoucher[s].debitAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)<0 ?-1*Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].creditAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].amount = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):Number(discountsaleVoucher[s].discount)
                        discountsaleVoucher[s].voucher_number = await discountsaleVoucher[s].id;
                        discountsaleVoucher[s].invoice_id = await discountsaleVoucher[s].invoice_id<=9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/00${discountsaleVoucher[s].invoice_id}`:discountsaleVoucher[s].invoice_id>9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/0${discountsaleVoucher[s].invoice_id}`:`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/${discountsaleVoucher[s].invoice_id}`;
                        delete discountsaleVoucher[s].SalesDiscountLedger;
                        await array.push(discountsaleVoucher[s]);
                }
            }
            if (discountpurchaseVoucher && discountpurchaseVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountpurchaseVoucher.length; s++) {
                    discountpurchaseVoucher[s].voucher_type = await 'purchase';
                    discountpurchaseVoucher[s].ledger = await discountpurchaseVoucher[s].PurchaseDiscountLedger;
                    discountpurchaseVoucher[s].Voucher = await {};
                    discountpurchaseVoucher[s].type = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?'Debit':'Credit',
                    discountpurchaseVoucher[s].debitAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ? Number(discountpurchaseVoucher[s].discount):0
                    discountpurchaseVoucher[s].creditAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)<0 ?-1*Number(discountpurchaseVoucher[s].discount):0
                    discountpurchaseVoucher[s].amount = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?Number(discountpurchaseVoucher[s].discount):Number(discountpurchaseVoucher[s].discount)
                    discountpurchaseVoucher[s].voucher_number = await discountpurchaseVoucher[s].id;
                    discountpurchaseVoucher[s].invoice_id = await discountpurchaseVoucher[s].invoice_id;
                        delete discountpurchaseVoucher[s].PurchaseDiscountLedger;
                        await array.push(discountpurchaseVoucher[s]);
                }
            }
            if (discountcreditVoucher && discountcreditVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountcreditVoucher.length; s++) {
                    discountcreditVoucher[s].voucher_type = await 'sales return';
                    discountcreditVoucher[s].ledger = await discountcreditVoucher[s].CreditDiscountLedger;
                    discountcreditVoucher[s].Voucher = await {};
                    discountcreditVoucher[s].type = discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?'Debit':'Credit',
                    discountcreditVoucher[s].debitAmount = await discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?Number(discountcreditVoucher[s].discount):0
                    discountcreditVoucher[s].creditAmount = await discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)<0 ?-1*Number(discountcreditVoucher[s].discount):0
                    discountcreditVoucher[s].amount = discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?Number(discountcreditVoucher[s].discount):Number(discountcreditVoucher[s].discount)
                    discountcreditVoucher[s].invoice_id = await discountcreditVoucher[s].invoice_id<=9?`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/00${discountcreditVoucher[s].invoice_id}`:discountcreditVoucher[s].invoice_id>9?`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/0${discountcreditVoucher[s].invoice_id}`:`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/${discountcreditVoucher[s].invoice_id}`;
                    discountcreditVoucher[s].voucher_number = await discountcreditVoucher[s].id;
                    discountcreditVoucher[s].invoice_id = await discountcreditVoucher[s].invoice_id;
                        delete discountcreditVoucher[s].CreditDiscountLedger;
                        await array.push(discountcreditVoucher[s]);
                }
            }
            if (discountdebitVoucher && discountdebitVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountdebitVoucher.length; s++) {
                    discountdebitVoucher[s].voucher_type = await 'purchase return';
                    discountdebitVoucher[s].ledger = await discountdebitVoucher[s].DebitDiscountLedger;
                    discountdebitVoucher[s].Voucher = await {};
                    discountdebitVoucher[s].type = discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?'Credit':'debit',
                    discountdebitVoucher[s].debitAmount = await discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)<0 ?-1*Number(discountdebitVoucher[s].discount):0
                    discountdebitVoucher[s].creditAmount = await discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?Number(discountdebitVoucher[s].discount):0
                    discountdebitVoucher[s].amount = discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?Number(discountdebitVoucher[s].discount):Number(discountdebitVoucher[s].discount)
                    discountdebitVoucher[s].voucher_number = await discountdebitVoucher[s].id;
                    discountdebitVoucher[s].invoice_id = await discountdebitVoucher[s].invoice_id<=9?`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/00${discountdebitVoucher[s].invoice_id}`:discountdebitVoucher[s].invoice_id>9?`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/0${discountdebitVoucher[s].invoice_id}`:`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/${discountdebitVoucher[s].invoice_id}`;
                        delete discountdebitVoucher[s].DebitDiscountLedger;
                        await array.push(discountdebitVoucher[s]);
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
            if (reciverrecieptVoucher  && reciverrecieptVoucher.length>0) {
                for (var i = 0; i < reciverrecieptVoucher.length; i++) {
                    reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    reciverrecieptVoucher[i].creditAmount = await 0;
                    // if (await reciverrecieptVoucher[i].type === 'debit') {
                    //     reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    //     reciverrecieptVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverrecieptVoucher[i].debitAmount = await 0;
                    //     reciverrecieptVoucher[i].creditAmount = await reciverrecieptVoucher[i].total_amount;
                    // }
                    reciverrecieptVoucher[i].ledger = await reciverrecieptVoucher[i].ReciptReciver;
                    delete reciverrecieptVoucher[i].ReciptReciver;
                    reciverrecieptVoucher[i].voucher_type = await 'reciept reciver';
                    reciverrecieptVoucher[i].voucher_number = await reciverrecieptVoucher[i].id;
                    reciverrecieptVoucher[i].invoice_id = await reciverrecieptVoucher[i].invoice_id<=9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/00${reciverrecieptVoucher[i].invoice_id}`:reciverrecieptVoucher[i].invoice_id>9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/0${reciverrecieptVoucher[i].invoice_id}`:`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/${reciverrecieptVoucher[i].invoice_id}`;
                    reciverrecieptVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverrecieptVoucher[i]);
                }
            }

            if (reciverpaymentVoucher && reciverpaymentVoucher.length>0) {
                for (var i = 0; i < reciverpaymentVoucher.length; i++) {
                    // if (await reciverpaymentVoucher[i].type === 'debit') {
                    //     reciverpaymentVoucher[i].debitAmount = await reciverpaymentVoucher[i].total_amount;
                    //     reciverpaymentVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverpaymentVoucher[i].debitAmount = await 0;
                    //     reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    // }
                    reciverpaymentVoucher[i].debitAmount = await 0;
                    reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    reciverpaymentVoucher[i].ledger = await reciverpaymentVoucher[i].PaymentReciver;
                    delete reciverpaymentVoucher[i].PaymentReciver;
                    reciverpaymentVoucher[i].voucher_type = await 'payment reciver';
                    reciverpaymentVoucher[i].voucher_number = await reciverpaymentVoucher[i].id;
                    reciverpaymentVoucher[i].invoice_id = await reciverpaymentVoucher[i].invoice_id<=9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/00${reciverpaymentVoucher[i].invoice_id}`:reciverpaymentVoucher[i].invoice_id>9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/0${reciverpaymentVoucher[i].invoice_id}`:`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/${reciverpaymentVoucher[i].invoice_id}`;
                    reciverpaymentVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverpaymentVoucher[i]);
                }
            }

            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
           
           let creditamount=0;
           let debetamount=0;
          let totalbalnce=0;
            await mainArray.map(item => {
                console.log("item", item)
              if (item.creditAmount) {
                creditamount = creditamount + Number(item.creditAmount);
              } else if (item.debitAmount) {
                debetamount = debetamount + Number(item.debitAmount);
              }
            });

            console.log("openingbalncedebit", openingbalncedebit, debetamount, creditamount, openingbalncecredit)
            totalbalnce = (Number(openingbalncedebit)+Number(debetamount))-(Number(creditamount)+Number(openingbalncecredit));
           
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
        console.log("getAllLedgerVoucherprivious", e)
        return 0
    }
}

async function getAllLedgerVouchercurrent(start_date,end_date,ledger_id,company_id,openingbalncecredit,openingbalncedebit,email) {
    try {
       
        let currentyear = new Date(start_date).getFullYear();
        end_date = start_date
        start_date = `${currentyear}-04-01`;
        // console.log("start_date", new Date(start_date))

        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher,discountsaleVoucher, discountdebitVoucher, discountpurchaseVoucher, discountcreditVoucher, reciverrecieptVoucher, reciverpaymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: ledger_id,
                company_id: company_id
            },
            include:[{
                model:AccountGroup
            }]
        });
        if (ledger && ledger.dataValues.id) {
            // console.log("ledger.dataValues", ledger.dataValues)
            if (ledger.dataValues.tax_key) {
                saleVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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


                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            company_id: company_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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

            } else if (ledger.dataValues.sale_key) {
                
                saleVoucher = await ItemInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Sales'
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                        model: SaleVoucher,
                        as: 'Voucheris',
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


            
                purchaseVoucher = await ItemInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Purchase'
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                        model: PurchaseVoucher,
                        as: 'Voucherip',
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

                creditVoucher = await ItemInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Debit'
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                        model: CreditVoucher,
                        as: 'Voucheric',
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

                debitVoucher = await ItemInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            type: 'Credit'
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                        model: DebitVoucher,
                        as: 'Voucherid',
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


                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            company_id: company_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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

            } else {
                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledger_id
                        }, {
                            company_id: company_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
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

                discountsaleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesDiscountLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                discountpurchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountcreditVoucher = await CreditVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'CreditDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountdebitVoucher = await DebitVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lt]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'DebitDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
            }

            reciverrecieptVoucher = await RecieptVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: company_id
                    }, {
                        ledger_id: ledger_id
                    }, {
                        invoice_date: {
                            [Op.gte]: start_date,
                            [Op.lte]: end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'ReciptReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            reciverpaymentVoucher = await PaymentVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: company_id
                    }, {
                        ledger_id: ledger_id
                    }, {
                        invoice_date: {
                            [Op.gte]: start_date,
                            [Op.lte]: end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'PaymentReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));



            ledger = await decreption(ledger, 'object', email);

            if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            roundoff_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesRoundoffLedger',
                        },
                        {
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

                // return {saleVoucher}

                purchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            roundoff_ledger_id: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseRoundLedger',
                        },
                        {
                            model: Ledger,
                            as: 'PurchaseLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                // return {purchaseVoucher}
            }else{
                discountsaleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'SalesDiscountLedger',
                        }
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                discountpurchaseVoucher = await PurchaseVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'PurchaseDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountcreditVoucher = await CreditVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'CreditDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
    
                discountdebitVoucher = await DebitVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: company_id
                        }, {
                            discount_ledger: ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: start_date,
                                [Op.lte]: end_date
                            }
                        }]
                    },
                    include: [{
                            model: Ledger,
                            as: 'DebitDiscountLedger',
                        },
                    ],
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));
            }

            // if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
            //     journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', email);
            //     recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', email);
            //     paymentVoucher = await decreptionPayment(paymentVoucher, 'array', email);
            // }
            journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', email);
            recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', email);
            paymentVoucher = await decreptionPayment(paymentVoucher, 'array', email);
            saleVoucher = await decreptionSale(saleVoucher, 'array', email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', email);
            reciverrecieptVoucher = await decreptionReceipt(reciverrecieptVoucher, 'array', email);
            reciverpaymentVoucher = await decreptionPayment(reciverpaymentVoucher, 'array', email);
            if(discountsaleVoucher && discountsaleVoucher.length>0){
                discountsaleVoucher = await decreptionSale(discountsaleVoucher, 'array', email);
            }
            if(discountsaleVoucher && discountsaleVoucher.length>0){
                discountpurchaseVoucher = await decreptionPurchase(discountpurchaseVoucher, 'array', email);
            }
            if(discountcreditVoucher && discountcreditVoucher.length>0){
                discountcreditVoucher = await decreptionCredit(discountcreditVoucher, 'array', email);
            }
            if(discountdebitVoucher && discountdebitVoucher.length>0){
                discountdebitVoucher = await decreptionDebit(discountdebitVoucher, 'array', email);
            }


            // return {saleVoucher:saleVoucher, purchaseVoucher:purchaseVoucher, creditVoucher:creditVoucher, debitVoucher:debitVoucher, journalVoucher:journalVoucher, recieptVoucher:recieptVoucher, paymentVoucher:paymentVoucher, ledger:ledger}
     
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
                let salearray = []   
                for (var s = 0; s < saleVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].RoundOff;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = saleVoucher[s].roundoff_type,
                        saleVoucher[s].debitAmount = await saleVoucher[s].roundoff_type=="debit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].roundoff_type=="credit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].amount = saleVoucher[s].roundoff_value,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].RoundOff;
                        await array.push(saleVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(salearray.length>0){
                                let findSales = await salearray.find(it=> saleVoucher[s].Voucheris && it.invoice_idold==saleVoucher[s].Voucheris.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    saleVoucher[s].voucher_type = await 'sale';
                                    if(saleVoucher[s].Voucheris){
                                        saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                        delete  saleVoucher[s].Voucheris.SalesLedger;
                                    }else{
                                        saleVoucher[s].ledger = {};
                                    }
                                    saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                    saleVoucher[s].type = 'credit',
                                    saleVoucher[s].debitAmount = await 0;
                                    saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                    saleVoucher[s].amount = saleVoucher[s].total_amount,
                                    saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                    saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                    saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                    
                                    delete saleVoucher[s].Voucheris;
                                    await salearray.push(saleVoucher[s]);
                                    await array.push(saleVoucher[s]);
                                }
                            }else{
                                saleVoucher[s].voucher_type = await 'sale';
                                if(saleVoucher[s].Voucheris){
                                    saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                    delete  saleVoucher[s].Voucheris.SalesLedger;
                                }else{
                                    saleVoucher[s].ledger = {};
                                }
                                saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                saleVoucher[s].type = 'credit',
                                saleVoucher[s].debitAmount = await 0;
                                saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                saleVoucher[s].amount = saleVoucher[s].total_amount,
                                saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                
                                // delete saleVoucher[s].Vouchers;
                                await salearray.push(saleVoucher[s]);
                                await array.push(saleVoucher[s]);
                            }
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
                            saleVoucher[s].debitAmount = await 0
                            saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                            saleVoucher[s].amount = saleVoucher[s].total_amount,
                            saleVoucher[s].voucher_number = await saleVoucher[s].id;
                            saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${saleVoucher[s].invoice_id}`;
                            delete saleVoucher[s].SalesLedger;
                            await array.push(saleVoucher[s]);
                        }
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                let purchasearray = [] 
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].RoundOff;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = purchaseVoucher[s].roundoff_type,
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].roundoff_value,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].RoundOff;
                        await array.push(purchaseVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(purchaseVoucher.length>0){
                                let findSales = await purchasearray.find(it=>purchaseVoucher[s].Voucherip && it.invoice_idold==purchaseVoucher[s].Voucherip.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    purchaseVoucher[s].voucher_type = await 'purchase';
                                    if(purchaseVoucher[s].Voucherip){
                                        purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                        delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    }else{
                                        purchaseVoucher[s].ledger = {};
                                    }
                                    purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                    purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                    purchaseVoucher[s].type = 'debit',
                                    purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                    purchaseVoucher[s].creditAmount = await 0;
                                    purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                    purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                    purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                    delete  purchaseVoucher[s].Voucherip;
                                    await purchasearray.push(purchaseVoucher[s]);
                                    await array.push(purchaseVoucher[s]);
                                }
                            }else{
                                purchaseVoucher[s].voucher_type = await 'purchase';
                                if(purchaseVoucher[s].Voucherip){
                                    purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                }else{
                                    purchaseVoucher[s].ledger = {};
                                }
                                purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                purchaseVoucher[s].type = 'debit',
                                purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                purchaseVoucher[s].creditAmount = await 0;
                                purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                delete  purchaseVoucher[s].Voucherip;
                                await purchasearray.push(purchaseVoucher[s]);
                                await array.push(purchaseVoucher[s]);
                            }
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
                            purchaseVoucher[s].type = 'credit',
                            purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                            purchaseVoucher[s].creditAmount = await 0;
                            purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                            purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                            purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                            
                            delete purchaseVoucher[s].PurchaseLedger;
                            await array.push(purchaseVoucher[s]);
                        }
                    }
                }
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].Voucheric){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucheric.CreditBuyer;
                            delete  creditVoucher[s].Voucheric.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.invoice_id<=9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucheric.invoice_id}`:creditVoucher[s].Voucheric.invoice_id>9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucheric.invoice_id}`:`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/${creditVoucher[s].Voucheric.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucheric;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                        creditVoucher[s].Voucher = await {};
                        creditVoucher[s].type = 'credit',
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
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].Voucherid){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherid.DebitBuyer;
                            delete  debitVoucher[s].Voucherid.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.invoice_id<=9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherid.invoice_id}`:debitVoucher[s].Voucherid.invoice_id>9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherid.invoice_id}`:`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherid.invoice_id}` : '';
                        delete debitVoucher[s].Voucherid;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                        debitVoucher[s].Voucher = await {};
                        debitVoucher[s].type = 'debit',
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

            if (discountsaleVoucher && discountsaleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountsaleVoucher.length; s++) {
                        discountsaleVoucher[s].voucher_type = await 'sale';
                        discountsaleVoucher[s].ledger = await discountsaleVoucher[s].SalesDiscountLedger;
                        discountsaleVoucher[s].Voucher = await {};
                        discountsaleVoucher[s].type = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?'Credit':'Debit',
                        discountsaleVoucher[s].debitAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)<0 ?-1*Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].creditAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].amount = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):Number(discountsaleVoucher[s].discount)
                        discountsaleVoucher[s].voucher_number = await discountsaleVoucher[s].id;
                        discountsaleVoucher[s].invoice_id = await discountsaleVoucher[s].invoice_id<=9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/00${discountsaleVoucher[s].invoice_id}`:discountsaleVoucher[s].invoice_id>9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/0${discountsaleVoucher[s].invoice_id}`:`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/${discountsaleVoucher[s].invoice_id}`;
                        delete discountsaleVoucher[s].SalesDiscountLedger;
                        await array.push(discountsaleVoucher[s]);
                }
            }
            if (discountpurchaseVoucher && discountpurchaseVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountpurchaseVoucher.length; s++) {
                    discountpurchaseVoucher[s].voucher_type = await 'purchase';
                    discountpurchaseVoucher[s].ledger = await discountpurchaseVoucher[s].PurchaseDiscountLedger;
                    discountpurchaseVoucher[s].Voucher = await {};
                    discountpurchaseVoucher[s].type = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?'Debit':'Credit',
                    discountpurchaseVoucher[s].debitAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ? Number(discountpurchaseVoucher[s].discount):0
                    discountpurchaseVoucher[s].creditAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)<0 ?-1*Number(discountpurchaseVoucher[s].discount):0
                    discountpurchaseVoucher[s].amount = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?Number(discountpurchaseVoucher[s].discount):Number(discountpurchaseVoucher[s].discount)
                    discountpurchaseVoucher[s].voucher_number = await discountpurchaseVoucher[s].id;
                    discountpurchaseVoucher[s].invoice_id = await discountpurchaseVoucher[s].invoice_id;
                        delete discountpurchaseVoucher[s].PurchaseDiscountLedger;
                        await array.push(discountpurchaseVoucher[s]);
                }
            }
            if (discountcreditVoucher && discountcreditVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountcreditVoucher.length; s++) {
                    discountcreditVoucher[s].voucher_type = await 'sales return';
                    discountcreditVoucher[s].ledger = await discountcreditVoucher[s].CreditDiscountLedger;
                    discountcreditVoucher[s].Voucher = await {};
                    discountcreditVoucher[s].type = discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?'Debit':'Credit',
                    discountcreditVoucher[s].debitAmount = await discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?Number(discountcreditVoucher[s].discount):0
                    discountcreditVoucher[s].creditAmount = await discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)<0 ?-1*Number(discountcreditVoucher[s].discount):0
                    discountcreditVoucher[s].amount = discountcreditVoucher[s].discount && Number(discountcreditVoucher[s].discount)>0 ?Number(discountcreditVoucher[s].discount):Number(discountcreditVoucher[s].discount)
                    discountcreditVoucher[s].invoice_id = await discountcreditVoucher[s].invoice_id<=9?`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/00${discountcreditVoucher[s].invoice_id}`:discountcreditVoucher[s].invoice_id>9?`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/0${discountcreditVoucher[s].invoice_id}`:`${discountcreditVoucher[s].current_year.toString().substr(-2)+`-`+discountcreditVoucher[s].end_year.toString().substr(-2)}/${discountcreditVoucher[s].invoice_id}`;
                    discountcreditVoucher[s].voucher_number = await discountcreditVoucher[s].id;
                    discountcreditVoucher[s].invoice_id = await discountcreditVoucher[s].invoice_id;
                        delete discountcreditVoucher[s].CreditDiscountLedger;
                        await array.push(discountcreditVoucher[s]);
                }
            }
            if (discountdebitVoucher && discountdebitVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountdebitVoucher.length; s++) {
                    discountdebitVoucher[s].voucher_type = await 'purchase return';
                    discountdebitVoucher[s].ledger = await discountdebitVoucher[s].DebitDiscountLedger;
                    discountdebitVoucher[s].Voucher = await {};
                    discountdebitVoucher[s].type = discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?'Credit':'debit',
                    discountdebitVoucher[s].debitAmount = await discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)<0 ?-1*Number(discountdebitVoucher[s].discount):0
                    discountdebitVoucher[s].creditAmount = await discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?Number(discountdebitVoucher[s].discount):0
                    discountdebitVoucher[s].amount = discountdebitVoucher[s].discount && Number(discountdebitVoucher[s].discount)>0 ?Number(discountdebitVoucher[s].discount):Number(discountdebitVoucher[s].discount)
                    discountdebitVoucher[s].voucher_number = await discountdebitVoucher[s].id;
                    discountdebitVoucher[s].invoice_id = await discountdebitVoucher[s].invoice_id<=9?`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/00${discountdebitVoucher[s].invoice_id}`:discountdebitVoucher[s].invoice_id>9?`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/0${discountdebitVoucher[s].invoice_id}`:`${discountdebitVoucher[s].current_year.toString().substr(-2)+`-`+discountdebitVoucher[s].end_year.toString().substr(-2)}/${discountdebitVoucher[s].invoice_id}`;
                        delete discountdebitVoucher[s].DebitDiscountLedger;
                        await array.push(discountdebitVoucher[s]);
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
            if (reciverrecieptVoucher  && reciverrecieptVoucher.length>0) {
                for (var i = 0; i < reciverrecieptVoucher.length; i++) {
                    reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    reciverrecieptVoucher[i].creditAmount = await 0;
                    // if (await reciverrecieptVoucher[i].type === 'debit') {
                    //     reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    //     reciverrecieptVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverrecieptVoucher[i].debitAmount = await 0;
                    //     reciverrecieptVoucher[i].creditAmount = await reciverrecieptVoucher[i].total_amount;
                    // }
                    reciverrecieptVoucher[i].ledger = await reciverrecieptVoucher[i].ReciptReciver;
                    delete reciverrecieptVoucher[i].ReciptReciver;
                    reciverrecieptVoucher[i].voucher_type = await 'reciept reciver';
                    reciverrecieptVoucher[i].voucher_number = await reciverrecieptVoucher[i].id;
                    reciverrecieptVoucher[i].invoice_id = await reciverrecieptVoucher[i].invoice_id<=9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/00${reciverrecieptVoucher[i].invoice_id}`:reciverrecieptVoucher[i].invoice_id>9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/0${reciverrecieptVoucher[i].invoice_id}`:`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/${reciverrecieptVoucher[i].invoice_id}`;
                    reciverrecieptVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverrecieptVoucher[i]);
                }
            }

            if (reciverpaymentVoucher && reciverpaymentVoucher.length>0) {
                for (var i = 0; i < reciverpaymentVoucher.length; i++) {
                    // if (await reciverpaymentVoucher[i].type === 'debit') {
                    //     reciverpaymentVoucher[i].debitAmount = await reciverpaymentVoucher[i].total_amount;
                    //     reciverpaymentVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverpaymentVoucher[i].debitAmount = await 0;
                    //     reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    // }
                    reciverpaymentVoucher[i].debitAmount = await 0;
                    reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    reciverpaymentVoucher[i].ledger = await reciverpaymentVoucher[i].PaymentReciver;
                    delete reciverpaymentVoucher[i].PaymentReciver;
                    reciverpaymentVoucher[i].voucher_type = await 'payment reciver';
                    reciverpaymentVoucher[i].voucher_number = await reciverpaymentVoucher[i].id;
                    reciverpaymentVoucher[i].invoice_id = await reciverpaymentVoucher[i].invoice_id<=9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/00${reciverpaymentVoucher[i].invoice_id}`:reciverpaymentVoucher[i].invoice_id>9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/0${reciverpaymentVoucher[i].invoice_id}`:`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/${reciverpaymentVoucher[i].invoice_id}`;
                    reciverpaymentVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverpaymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
           
            // return {mainArray:mainArray}
           
           let creditamount=0;
           let debetamount=0;
           let totalbalnce=0;
            await mainArray.map(item => {
              if (item.creditAmount) {
                creditamount = creditamount + Number(item.creditAmount);
              } else if (item.debitAmount) {
                debetamount = debetamount + Number(item.debitAmount);
              }
            });
            totalbalnce = Number(Number(openingbalncecredit)+Number(creditamount))-Number(Number(debetamount)+Number(openingbalncedebit));
           
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
        console.log("getAllLedgerVouchercurrent", e)
        return 0
        // console.log("e", e)
        // return {
        //     statusCode: res.statusCode,
        //     success: false,
        //     error: e,
        //     message: "Something went wrong!"
        // }
    }
}

async function getAllGroupVouchercurrent(start_date,end_date,accountId,company_id,email) {
    try {

        let findCompany = await Company.findOne({where:{
            uid:company_id
        }}) 

        if(findCompany && findCompany.dataValues){
            let compaanyinfo = findCompany.dataValues;
            let currentyear =await new Date(start_date).getFullYear();
            end_date =await start_date
            start_date =await `${currentyear}-04-01`;
            // if(new Date(compaanyinfo.bookstart_date).getFullYear()==new Date(start_date).getFullYear()){
            //     start_date = compaanyinfo.bookstart_date;
            // }
      
            let ledger = await Ledger.findAll({
                where: {
                    [Op.and]: [{account_group_id:accountId}, {
                        company_id: company_id
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
                            [Op.gte]: start_date,
                            [Op.lt]: end_date
                        }
                    },
                    required:false,
                    attributes:['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
                    include:[
                        {
                            model: JournalVoucher,
                            required:false,
                            attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                            as: 'Voucher'
                        }
                    ]
            }, {
                model:RecieptVoucher,
                as: 'Buyer',
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },{
                model:PaymentVoucher,
                as: 'PBuyer',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },
            {
                model:RecieptVoucher,
                as: 'RBuyer',
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },{
                model:PaymentVoucher,
                as: 'PRBuyer',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },
            {
                model:SaleVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
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
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    }]
            },
            {
                model:SaleVoucher,
                as:"roundsales",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:PurchaseVoucher,
                as:"roundpurchase",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    }]
            },
            {
                model:CreditVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                model:ItemInteries,
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                include:[
                    {
                        model:SaleVoucher,
                        as:"ItemVouchers",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:PurchaseVoucher,
                        as:"ItemVoucherp",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:DebitVoucher,
                        as:"ItemVoucherd",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:CreditVoucher,
                        as:"ItemVoucherc",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    }
                ]
            },
            {
                model:VoucherInteries, as:'vocher_entries',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                attributes:['id', 'uid', 'amount', 'type', 'ledger_id']
            },{
                model:TaxInteries,as:'tax_entries',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                attributes:['id', 'uid', 'amount', 'type', 'tax_ledger_id']
            },
            {
                model:SaleVoucher,
                as:"discountsales",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:PurchaseVoucher,
                as:"discountPurchases",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:CreditVoucher,
                as:"discountCredit",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:DebitVoucher,
                as:"discountDebit",
                where:{
                    invoice_date: {
                        [Op.gte]: start_date,
                        [Op.lt]: end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            }
        ]
            }).map((node) => node.get({
                plain: true
            }));
            ledger = await decreptionReport(ledger, 'array', email);
           
            // return ledger;
            
            if(ledger.length>0){
                let totalbalnce = 0;
                let creditbalnce = 0;
                let debitbalnce = 0;
                await ledger.map(async(item)=>{
                    item.open_amount = item.amount?item.opening_balance=='debit'?-1*Number(item.amount):item.amount:0;
                    item.open_type = item.opening_balance; 
                    item.name = item.name; 
                    item.subAccount = item.sub_account_group?item.sub_account_group:{}; 
                    item.accounttype = item.account_group && item.account_group.type=="dr"? 'debit':'credit';
                    item.open_amount = item.amount ? Number(item.amount):item.amount;
                    delete item.amount;delete item.opening_balance;delete item.sub_account_group;delete item.account_group;
                    item.invoice_id = '';
                    item.voucher_type = '';
                    item.debitAmount = 0;
                    item.creditAmount = 0;

            

                    if(item.journal_entries.length>0){
                        item.journal_entries.forEach(journal=>{
                           if (journal.type === 'debit') {
                                item.debitAmount =  Number(journal.amount)+Number(item.debitAmount);
                            } else {
                                item.creditAmount = Number(journal.amount)+Number(item.creditAmount);
                            }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                    if(item.Buyer.length>0){
                        item.Buyer.forEach(reciept=>{
                            if (reciept.type === 'debit') {
                                item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                            } else {
                                item.creditAmount = Number(reciept.total_amount)+Number(item.creditAmount);
                            }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                    if(item.PBuyer.length>0){
                        item.PBuyer.forEach(payment=>{
                            if (payment.type === 'debit') {
                                item.debitAmount =  Number(payment.total_amount)+Number(item.debitAmount);
                            } else {
                                item.creditAmount = Number(payment.total_amount)+Number(item.creditAmount);
                            }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                    if(item.RBuyer.length>0){
                        item.RBuyer.forEach(reciept=>{
                            item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        })
                    }
                    if(item.PRBuyer.length>0){
                        item.PRBuyer.forEach(payment=>{
                            item.creditAmount =  Number(payment.total_amount)+Number(item.creditAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                  
                    if(item.sales_vouchers && item.sales_vouchers.length>0){
                        item.sales_vouchers.forEach(sale=>{
                            item.debitAmount =  Number(sale.total_amount)+Number(item.debitAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }

                    if(item.purchase_vouchers.length>0){
                        item.purchase_vouchers.forEach(purchase=>{
                            item.creditAmount =  Number(purchase.total_amount)+Number(item.creditAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }

                    if(item.roundsales && item.roundsales.length>0){
                        item.roundsales.forEach(sale=>{
                            if(sale.roundoff_ledger_id){
                                if(sale.roundoff_type=="debit" || sale.roundoff_type=="Debit"){
                                    item.debitAmount =  Number(item.debitAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                                }else{
                                    item.creditAmount =  Number(item.creditAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                                }
                                // if(item.debitAmount<0){
                                //     item.debitAmount = -1*Number(item.debitAmount)
                                // }
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                // if(item.accounttype=="debit"){
                                //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                                // }else{
                                //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                                // }
                            }
                        })
                    }
                    if(item.roundpurchase.length>0){
                        item.roundpurchase.forEach(purchase=>{
                            if(purchase.roundoff_ledger_id){
                                if(purchase.roundoff_type=="debit" || purchase.roundoff_type=="Debit"){
                                    item.debitAmount = Number(item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                                }else{
                                    item.creditAmount =  Number(item.creditAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                                }
                                // if(item.debitAmount<0){
                                //     item.debitAmount = -1*Number(item.debitAmount)
                                // }
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                // if(item.accounttype=="debit"){
                                //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                                // }else{
                                //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                                // }
                            }
                        })
                    }

                    if(item.credit_vouchers.length>0){
                        item.credit_vouchers.forEach(credit=>{
                            item.debitAmount =  Number(credit.total_amount)+Number(item.debitAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                    if(item.debit_vouchers.length>0){
                        item.debit_vouchers.forEach(debit=>{
                            item.debitAmount =  Number(debit.total_amount)+Number(item.debitAmount);
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }
                    if(item.item_entries.length>0){
                        item.item_entries.forEach(voucher=>{
                            if(voucher.ItemVouchers){
                                item.invoice_date = voucher.ItemVouchers.invoice_date;
                                item.invoice_id =voucher.ItemVouchers.invoice_id<=9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/00${voucher.ItemVouchers.invoice_id}`:voucher.ItemVouchers.invoice_id>9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/0${voucher.ItemVouchers.invoice_id}`:`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/${voucher.ItemVouchers.invoice_id}`;
                                item.voucher_type = 'sale';
                            }
                            if(voucher.ItemVoucherc){
                                item.invoice_date = voucher.ItemVoucherc.invoice_date;
                                item.invoice_id = voucher.ItemVoucherc.invoice_id<=9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/00${voucher.ItemVoucherc.invoice_id}`:voucher.ItemVoucherc.invoice_id>9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/0${voucher.ItemVoucherc.invoice_id}`:`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/${voucher.ItemVoucherc.invoice_id}`;
                                item.voucher_type = 'credit';
                            }
                            if(voucher.ItemVoucherd){
                                item.invoice_date = voucher.ItemVoucherd.invoice_date;
                                item.invoice_id =voucher.ItemVoucherd.invoice_id<=9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/00${voucher.ItemVoucherd.invoice_id}`:voucher.ItemVoucherd.invoice_id>9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/0${voucher.ItemVoucherd.invoice_id}`:`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/${voucher.ItemVoucherd.invoice_id}`;
                                item.voucher_type = 'debit';
                            }
                            if(voucher.ItemVoucherp){
                                item.invoice_date = voucher.ItemVoucherp.invoice_date;
                                item.invoice_id = voucher.ItemVoucherp.invoice_id;
                                item.voucher_type = 'purchase';
                            }
                            if(voucher.type==="Sales" || voucher.type==="sales"){
                                item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                            }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                                item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                            }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                                item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                            }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                                item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                            }

                            
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }

                    // if(item.vocher_entries.length>0){
                    //     item.vocher_entries.forEach(voucher=>{
                    //         if(voucher.type==="Sales" || voucher.type==="sales"){
                    //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                    //         }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                    //             item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
                    //         }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                    //             item.debitAmount =  Number(voucher.amount)+Number(item.debitAmount);
                    //         }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                    //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                    //         }
                    //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount))+Number(item.open_amount);
                    //     })
                    // }
                    if(item.tax_entries.length>0){
                        item.tax_entries.forEach(tax=>{
                            if(tax.type==="Sales" || tax.type==="sales"){
                                item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                            }else if(tax.type==="Purchase" || tax.type==="purchase"){
                                item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                            }else if(tax.type==="Debit" || tax.type==="debit"){
                                item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                            }else if(tax.type==="Credit" || tax.type==="credit"){
                                item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                            }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        })
                    }

                    // if(item.discountsales && item.discountsales.length>0){
                    //     item.discountsales.forEach(sale=>{
                    //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                    //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                    //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    //     })
                    // }

                    // if(item.discountPurchases && item.discountPurchases.length>0){
                    //     item.discountPurchases.forEach(sale=>{
                    //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                    //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                    //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    //     })
                    // }

                    // if(item.discountCredit && item.discountCredit.length>0){
                    //     item.discountCredit.forEach(sale=>{

                    //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                    //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                    //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    //     })
                    // }

                    // if(item.discountDebit && item.discountDebit.length>0){
                    //     item.discountDebit.forEach(sale=>{

                    //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                    //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                    //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    //     })
                    // }
                    if((item.roundsales && item.roundsales.length<0) || item.roundpurchase.length<0){
                        if(item.discountsales && item.discountsales.length>0){
                            item.discountsales.forEach(sale=>{
                                if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                    if(item.roundoff_ledger_id){
            
                                    }else{
                                        item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                        item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                    }
                                }
                            })
                        }
            
                        if(item.discountPurchases && item.discountPurchases.length>0){
                            item.discountPurchases.forEach(sale=>{
                                if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                    if(item.roundoff_ledger_id){
            
                                    }else{
                                        item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                        item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                    }
                                }
                               
                            })
                        }
            
                        if(item.discountCredit && item.discountCredit.length>0){
                            item.discountCredit.forEach(sale=>{
                                if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                    if(item.roundoff_ledger_id){
            
                                    }else{
                                        item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                        item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                    }
                                }
                            })
                        }
            
                        if(item.discountDebit && item.discountDebit.length>0){
                            item.discountDebit.forEach(sale=>{
                                if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                    if(item.roundoff_ledger_id){
            
                                    }else{
                                        item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                        item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                    }
                                }
                            })
                        }
                    }
    


                    if(item.open_type === "debit"){
                        item.closeing_amount = Number(item.closeing_amount)-Number(item.open_amount);
                        if(item.closeing_amount<0){
                            item.closeing_amount = -1*Number(item.closeing_amount)
                        }
                        item.closeing_type = 'debit';
                        item.accounttype =  item.closeing_type
                    }


                    if(item.open_type === "credit"){
                        item.closeing_amount = Number(item.closeing_amount)+Number(item.open_amount);
                        if(item.closeing_amount<0){
                            item.closeing_amount = -1*Number(item.closeing_amount)
                        }
                        item.closeing_type = 'credit';
                        item.accounttype =  item.closeing_type
                    }


                    delete item.journal_entries;
                    delete item.reciept_vouchers;
                    delete item.payment_vouchers;
                    delete item.sales_vouchers;
                    delete item.purchase_vouchers;
                    delete item.credit_vouchers;
                    delete item.debit_vouchers;
                    delete item.item_entries;
                    delete item.vocher_entries;
                    delete item.tax_entries;
                    delete item.Buyer;
                    delete item.PBuyer;
                    delete item.PRBuyer;
                    delete item.RBuyer;
                    totalbalnce = Number(totalbalnce)+Number(Number(item.creditAmount))-Number(Number(item.debitAmount));
                    creditbalnce = Number(creditbalnce)+Number(item.creditAmount);
                    debitbalnce = Number(debitbalnce)+Number(item.debitAmount);
                })
                return {totalbalnce:totalbalnce, creditbalnce:creditbalnce, debitbalnce:debitbalnce};
            }else{
                return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
            }
        }else{
            return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
        }
    } catch (e) {
        console.log("getAllGroupVouchercurrent", e)
        return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
        // console.log("err",e)
    }
}
async function getAllGroupVoucherprivious(start_date,end_date,accountId,company_id,email) {
    try {
        let ledger = await Ledger.findAll({
            where: {
                [Op.and]: [{account_group_id:accountId}, {
                    company_id: company_id
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
                        [Op.lt]: start_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
                include:[
                    {
                        model: JournalVoucher,
                        required:false,
                        attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                        as: 'Voucher'
                    }
                ]
        }, {
            model:RecieptVoucher,
            as: 'Buyer',
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },{
            model:PaymentVoucher,
            as: 'PBuyer',
            required:false,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },
        {
            model:RecieptVoucher,
            as: 'RBuyer',
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },{
            model:PaymentVoucher,
            as: 'PRBuyer',
            required:false,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },
        {
            model:SaleVoucher,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
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
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }]
        },
        {
            model:SaleVoucher,
            as:"roundsales",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:PurchaseVoucher,
            as:"roundpurchase",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }]
        },
        {
            model:CreditVoucher,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
            model:ItemInteries,
            required:false,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            include:[
                {
                    model:SaleVoucher,
                    as:"ItemVouchers",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:PurchaseVoucher,
                    as:"ItemVoucherp",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:DebitVoucher,
                    as:"ItemVoucherd",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:CreditVoucher,
                    as:"ItemVoucherc",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                }
            ]
        },
        {
            model:VoucherInteries, as:'vocher_entries',
            required:false,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            attributes:['id', 'uid', 'amount', 'type', 'ledger_id']
        },{
            model:TaxInteries,as:'tax_entries',
            required:false,
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            attributes:['id', 'uid', 'amount', 'type', 'tax_ledger_id']
        },
        {
            model:SaleVoucher,
            as:"discountsales",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:PurchaseVoucher,
            as:"discountPurchases",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:CreditVoucher,
            as:"discountCredit",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:DebitVoucher,
            as:"discountDebit",
            where:{
                invoice_date: {
                    [Op.lt]: start_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        }
    ]
        }).map((node) => node.get({
            plain: true
        }));
        ledger = await decreptionReport(ledger, 'array', email);
        // return {ledger:ledger}

        if(ledger.length>0){
            let totalbalnce = 0;
            let creditbalnce = 0;
            let debitbalnce = 0;
            await ledger.map(async(item)=>{
                item.open_amount = item.amount?item.opening_balance=='debit'?-1*Number(item.amount):item.amount:0;
                item.open_type = item.opening_balance; 
                item.name = item.name; 
                item.subAccount = item.sub_account_group?item.sub_account_group:{}; 
                item.account = item.account_group?item.account_group:{}; 
                item.accounttype = item.account_group && item.account_group.type=="dr"? 'debit':'credit';
                item.open_amount = item.amount ? Number(item.amount):item.amount;
                delete item.amount;delete item.opening_balance;delete item.sub_account_group;delete item.account_group;
                item.invoice_id = '';
                item.voucher_type = '';
                item.debitAmount = 0;
                item.creditAmount = 0;

                

                if(item.journal_entries.length>0){
                    item.journal_entries.forEach(journal=>{
                       if (journal.type === 'debit') {
                            item.debitAmount =  Number(journal.amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(journal.amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.Buyer.length>0){
                    item.Buyer.forEach(reciept=>{
                        if (reciept.type === 'debit') {
                            item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(reciept.total_amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.PBuyer.length>0){
                    item.PBuyer.forEach(payment=>{
                        if (payment.type === 'debit') {
                            item.debitAmount =  Number(payment.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(payment.total_amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.RBuyer.length>0){
                    item.RBuyer.forEach(reciept=>{
                        item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    })
                }
                if(item.PRBuyer.length>0){
                    item.PRBuyer.forEach(payment=>{
                        item.creditAmount =  Number(payment.total_amount)+Number(item.creditAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
               

                if(item.sales_vouchers && item.sales_vouchers.length>0){
                    item.sales_vouchers.forEach(sale=>{
                        item.debitAmount =  Number(sale.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                if(item.purchase_vouchers.length>0){
                    item.purchase_vouchers.forEach(purchase=>{
                        item.creditAmount =  Number(purchase.total_amount)+Number(item.creditAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                if(item.roundsales && item.roundsales.length>0){
                    item.roundsales.forEach(sale=>{
                        if(sale.roundoff_ledger_id){
                            if(sale.roundoff_type=="debit" || sale.roundoff_type=="Debit"){
                                item.debitAmount =  Number(item.debitAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                            }else{
                                item.creditAmount =  Number(item.creditAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                            }
                            // if(item.debitAmount<0){
                            //     item.debitAmount = -1*Number(item.debitAmount)
                            // }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        }
                    })
                }
                if(item.roundpurchase.length>0){
                    item.roundpurchase.forEach(purchase=>{
                        if(purchase.roundoff_ledger_id){
                            if(purchase.roundoff_type=="debit" || purchase.roundoff_type=="Debit"){
                                item.debitAmount = Number(item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                            }else{
                                item.creditAmount =  Number(item.creditAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                            }
                            // if(item.debitAmount<0){
                            //     item.debitAmount = -1*Number(item.debitAmount)
                            // }
                            item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        }
                    })
                }

                if(item.credit_vouchers.length>0){
                    item.credit_vouchers.forEach(credit=>{
                        item.debitAmount =  Number(credit.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.debit_vouchers.length>0){
                    item.debit_vouchers.forEach(debit=>{
                        item.debitAmount =  Number(debit.total_amount)+Number(item.debitAmount);
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.item_entries.length>0){
                    item.item_entries.forEach(voucher=>{
                        if(voucher.ItemVouchers){
                            item.invoice_date = voucher.ItemVouchers.invoice_date;
                            item.invoice_id =voucher.ItemVouchers.invoice_id<=9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/00${voucher.ItemVouchers.invoice_id}`:voucher.ItemVouchers.invoice_id>9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/0${voucher.ItemVouchers.invoice_id}`:`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/${voucher.ItemVouchers.invoice_id}`;
                            item.voucher_type = 'sale';
                        }
                        if(voucher.ItemVoucherc){
                            item.invoice_date = voucher.ItemVoucherc.invoice_date;
                            item.invoice_id = voucher.ItemVoucherc.invoice_id<=9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/00${voucher.ItemVoucherc.invoice_id}`:voucher.ItemVoucherc.invoice_id>9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/0${voucher.ItemVoucherc.invoice_id}`:`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/${voucher.ItemVoucherc.invoice_id}`;
                            item.voucher_type = 'credit';
                        }
                        if(voucher.ItemVoucherd){
                            item.invoice_date = voucher.ItemVoucherd.invoice_date;
                            item.invoice_id =voucher.ItemVoucherd.invoice_id<=9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/00${voucher.ItemVoucherd.invoice_id}`:voucher.ItemVoucherd.invoice_id>9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/0${voucher.ItemVoucherd.invoice_id}`:`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/${voucher.ItemVoucherd.invoice_id}`;
                            item.voucher_type = 'debit';
                        }
                        if(voucher.ItemVoucherp){
                            item.invoice_date = voucher.ItemVoucherp.invoice_date;
                            item.invoice_id = voucher.ItemVoucherp.invoice_id;
                            item.voucher_type = 'purchase';
                        }
                        if(voucher.type==="Sales" || voucher.type==="sales"){
                            item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                        }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                            item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                        }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                            item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                        }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                            item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                        }

                        
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                // if(item.vocher_entries.length>0){
                //     item.vocher_entries.forEach(voucher=>{
                //         if(voucher.type==="Sales" || voucher.type==="sales"){
                //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                //             item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                //             item.debitAmount =  Number(voucher.amount)+Number(item.debitAmount);
                //         }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount))+Number(item.open_amount);
                //     })
                // }
                if(item.tax_entries.length>0){
                    item.tax_entries.forEach(tax=>{
                        if(tax.type==="Sales" || tax.type==="sales"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }else if(tax.type==="Purchase" || tax.type==="purchase"){
                            item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                        }else if(tax.type==="Debit" || tax.type==="debit"){
                            item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                        }else if(tax.type==="Credit" || tax.type==="credit"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                // if(item.discountsales && item.discountsales.length>0){
                //     item.discountsales.forEach(sale=>{
                //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountPurchases && item.discountPurchases.length>0){
                //     item.discountPurchases.forEach(sale=>{
                //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountCredit && item.discountCredit.length>0){
                //     item.discountCredit.forEach(sale=>{

                //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountDebit && item.discountDebit.length>0){
                //     item.discountDebit.forEach(sale=>{

                //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }
                if((item.roundsales && item.roundsales.length<0) || item.roundpurchase.length<0){
                    if(item.discountsales && item.discountsales.length>0){
                        item.discountsales.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
        
                    if(item.discountPurchases && item.discountPurchases.length>0){
                        item.discountPurchases.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                           
                        })
                    }
        
                    if(item.discountCredit && item.discountCredit.length>0){
                        item.discountCredit.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
        
                    if(item.discountDebit && item.discountDebit.length>0){
                        item.discountDebit.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
                }




                if(item.open_type === "debit"){
                    item.closeing_amount = Number(item.closeing_amount)-Number(item.open_amount);
                    if(item.closeing_amount<0){
                        item.closeing_amount = -1*Number(item.closeing_amount)
                    }
                    item.closeing_type = 'debit';
                    item.accounttype =  item.closeing_type
                }


                if(item.open_type === "credit"){
                    item.closeing_amount = Number(item.closeing_amount)+Number(item.open_amount);
                    if(item.closeing_amount<0){
                        item.closeing_amount = -1*Number(item.closeing_amount)
                    }
                    item.closeing_type = 'credit';
                    item.accounttype =  item.closeing_type
                }

                delete item.journal_entries;
                delete item.reciept_vouchers;
                delete item.payment_vouchers;
                delete item.sales_vouchers;
                delete item.purchase_vouchers;
                delete item.credit_vouchers;
                delete item.debit_vouchers;
                delete item.item_entries;
                delete item.vocher_entries;
                delete item.tax_entries;
                delete item.Buyer;
                delete item.PBuyer;
                delete item.PRBuyer;
                delete item.RBuyer;
                totalbalnce = Number(totalbalnce)+Number(Number(item.creditAmount))-Number(Number(item.debitAmount));
                creditbalnce = Number(creditbalnce)+Number(item.creditAmount);
                debitbalnce = Number(debitbalnce)+Number(item.debitAmount);
            })
           
           
            return {totalbalnce:totalbalnce, creditbalnce:creditbalnce, debitbalnce:debitbalnce};
            
        }else{
            return 0
        }

    } catch (e) {
        console.log("getAllGroupVoucherprivious", e)
        return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
    }
}

async function isCreditGroup(id){
    let data = Groupsdrcr.creditids.find((item) => item==id);
    if(data){
        return true
    }else{
        return false  
    }
}

async function calculationbank(array) {
    let ledgerObj ={};
    let balancesum = 0;
    let convernumber = 0;
    let credittotal = 0;
    let debittotal = 0;
    if(array.length>0){

       if(await isCreditGroup(array[0].account_group_id)){
            if(array[0].opening_balance=="credit"){
                array[0].creditAmount = array[0].amount;
            }else{
                array[0].debitAmount = array[0].amount;
            }
            await array.forEach(element => {
                credittotal = Number(credittotal)+Number(element.creditAmount);
                debittotal = Number(debittotal)+Number(element.debitAmount);
                balancesum = Number(balancesum) + Number(Number(element.creditAmount<0?-1*Number(element.creditAmount):element.creditAmount) - Number(element.debitAmount<0?-1*Number(element.debitAmount):element.debitAmount));
                convernumber = Number(balancesum);
            });
            ledgerObj.amount = Number(credittotal)-Number(debittotal);
             //ledgerObj.amount =array[0].opening_balance =="credit" && Number(balancesum)<0 ? -1*Number(balancesum) : Number(balancesum)
        }else{
            if(array[0].opening_balance=="credit"){
                array[0].creditAmount = array[0].amount;
            }else{
                array[0].debitAmount = array[0].amount;
            }
            await array.forEach(element => {
                credittotal = Number(credittotal)+Number(element.creditAmount);
                debittotal = Number(debittotal)+Number(element.debitAmount);
                balancesum = Number(balancesum) + Number(Number(element.debitAmount<0?-1*Number(element.debitAmount):element.debitAmount) - Number(element.creditAmount<0?-1*Number(element.creditAmount):element.creditAmount));
                convernumber = Number(balancesum);
            });
            ledgerObj.amount = Number(debittotal)-Number(credittotal);
            // ledgerObj.amount =array[0].opening_balance =="debit" && Number(balancesum)<0 ? -1*Number(balancesum) : Number(balancesum)
        }

        
        
        // Number(credittotal)-Number(debittotal):-1*Number(credittotal)-Number(debittotal):array[0].account_group_type=="credit"?Number(debittotal)-Number(credittotal):-1*Number(debittotal)-Number(credittotal);
        
        // array[0].account_group_type == array[0].opening_balance ? convernumber>0?convernumber:-1*convernumber:  array[0].account_group_type=="credit"?convernumber>0? convernumber: -1*convernumber : convernumber>0? -1*convernumber: convernumber;
        ledgerObj.name = array[0].name;
        // console.log("array[0].account_group_type ledgerObj", array[0].account_group_type , array[0].opening_balance  ,convernumber)

        return ledgerObj;
    }else{
        return [];
    }
}

async function calculationGroup(array) {
    // return array;

    let ledgerObj ={};

    // let balancesum = 0;
    let convernumber = 0;
    if(array.length>0){
        await array.forEach(element => {
            if(element.ishead && element.ismain){
                // balancesum = Number(balancesum) + Number(Number(element.debitAmount) - Number(element.creditAmount));
                convernumber = element.closeing_amount
            }
        });
        ledgerObj.total_amount = convernumber;
        ledgerObj.name = array[0].name;
        ledgerObj.invoice_date = array[0].invoice_date;
        ledgerObj.ledger_id = array[0].ledger_id;
        return ledgerObj;
    }else{
        return [];
    }
}

async function oldyearPriceItem(data, res){
    try{
        let itemEnteriesVoucher, stockitemEnteriesVoucher = [];
            itemEnteriesVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                        [Op.or] :[
                            {
                                type: 'Purchase'
                           },
                           {
                                type: 'Debit'
                            }
                        ]
                    }, {
                        company_id:data.company_id
                    },{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            stockitemEnteriesVoucher = await itemStockVoucherEntries.findAll({
                where: {
                    [Op.and]: [{
                        type: 'Debit'
                    },{
                        company_id:data.company_id
                    },{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemsone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            let mainArray = []
            let itemArray = await Item.findAll({where:{
                company_id:data.company_id
            }})
            itemArray = await decreptionItem(itemArray, 'array', data.data.email);
            itemEnteriesVoucher = await decreptionItem(itemEnteriesVoucher, 'array', data.data.email);
            stockitemEnteriesVoucher = await decreptionItem(stockitemEnteriesVoucher, 'array', data.data.email);
            // purchaseVoucher = await decreptionItem(purchaseVoucher, 'array', data.data.email);
            // creditVoucher = await decreptionItem(creditVoucher, 'array', data.data.email);
            // debitVoucher = await decreptionItem(debitVoucher, 'array', data.data.email);

            // return {stockitemEnteriesVoucher:stockitemEnteriesVoucher, itemEnteriesVoucher:itemEnteriesVoucher}

            if(itemEnteriesVoucher.length>0){
                itemEnteriesVoucher.map((item)=>{
                    mainArray.push(item);
                })
            }

            if(stockitemEnteriesVoucher.length>0){
                stockitemEnteriesVoucher.map((item)=>{
                    item.itemone = item.itemsone
                    delete item.itemsone;
                    mainArray.push(item);
                })
            }
            let group = {};

            let itemgroup = await itemArray.reduce((r, a) => {
                r[a.name] = [...r[a.name] || [], a];
                return r;
            }, {});  
            if(mainArray.length>0){
                group = mainArray.reduce((r, a) => {
                    r[a.name] = [...r[a.name] || [], a];
                    return r;
                }, {});
            }else{
                group = itemArray.reduce((r, a) => {
                    r[a.name] = [...r[a.name] || [], a];
                    return r;
                }, {});    
            }
           
          

            let oldPrice = {};
            for (const [key, value] of Object.entries(group)) {
                let updatedata = await arraySort(value, 'updated_date') 
                oldPrice[key] = Number(updatedata[updatedata.length-1].rate)?Number(updatedata[updatedata.length-1].rate):Number(updatedata[updatedata.length-1].price);
            }
            let availableKeys =await Object.keys(oldPrice);
            for (const [key, value] of Object.entries(itemgroup)) {
                let find = availableKeys.find(k => k==key);
                if(!find){
                    let updatedata = await arraySort(value, 'updated_date') 
                    oldPrice[key] =  Number(updatedata[updatedata.length-1].rate)?Number(updatedata[updatedata.length-1].rate):0;
                }
            }


            // return{group:group, oldPrice:oldPrice}
            return oldPrice
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getbankACashAccountData = async function (ledgerid, accountgroupid, data, res) {
    try {
        let recieptVoucher, paymentVoucher, saleVoucher, purchaseVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: ledgerid,
                company_id: data.company_id
            },
            include:[{
                model:AccountGroup
            }]
        });
        if (ledger && ledger.dataValues.id) {
               ledgerid =ledgerid; 
               let oldBalance= await BankOldBlance(data);
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: ledgerid
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
                            receive_id: ledgerid
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

                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            buyer_ledger_id:ledgerid
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
                            buyer_ledger_id:ledgerid
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

                ledger = await decreption(ledger, 'object', data.data.email);
                if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                    recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                    paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
                    purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
                    saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
                }

            let array = await [];


            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
                    ledger.dataValues.debitAmount = await Number(ledger.dataValues.amount)+Number(oldBalance && oldBalance.debit?oldBalance.debit:0);
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await Number(ledger.dataValues.amount)+Number(oldBalance && oldBalance.credit?oldBalance.credit:0);
                }
                ledger.dataValues.open = await true;
                ledger.dataValues.voucher_type = '';
                ledger.dataValues.voucher_number = '';
                ledger.dataValues.invoice_id = '';
                ledger.dataValues.account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                await array.push(ledger.dataValues);
            }

            // if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
            //     ledger.dataValues.debitAmount = await Number(ledger.dataValues.amount)+Number(oldBalance && oldBalance.debit?Number(oldBalance.debit)<0?-1*Number(oldBalance.debit):oldBalance.debit:0);
            //     ledger.dataValues.creditAmount = await 0;
            // } else {
            //     ledger.dataValues.debitAmount = await 0;
            //     ledger.dataValues.creditAmount = await Number(ledger.dataValues.amount)+Number(oldBalance && oldBalance.credit?Number(oldBalance.credit)<0?-1*Number(oldBalance.credit):Number(oldBalance.credit):0);
            // }

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

                    recieptVoucher[i].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
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
                    paymentVoucher[i].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
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
                    purchaseVoucher[i].account_group_type = 'debit';
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
                    saleVoucher[i].account_group_type = 'credit';
                    await array.push(saleVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            let calData = await calculationbank(mainArray)
            return calData
        } else {
            return [];
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

exports.getRJPCalculationData = async function (ledgerid, accountgroupid, data, res) {
    try{

    let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, reciverrecieptVoucher, reciverpaymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid:ledgerid || null,
                company_id: data.company_id
            },
            include:[{
                model:AccountGroup
            }]
        });
        if (ledger && ledger.dataValues.id) {
            if (ledger.dataValues.tax_key) {
                saleVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledgerid
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
                        where:{
                            company_id:data.company_id,
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        },
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
                            tax_ledger_id: ledgerid
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
                        where:{
                            company_id:data.company_id,
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        },
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
                            tax_ledger_id: ledgerid
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
                        required:true,
                        where:{
                            company_id:data.company_id,
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        },
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
                            tax_ledger_id: ledgerid
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
                        required:true,
                        where:{
                            company_id:data.company_id,
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        },
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

                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id:ledgerid
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
                            ledger_id: ledgerid
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

            } else if (ledger.dataValues.sale_key) {
                saleVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                

                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id:ledgerid
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
                            ledger_id: ledgerid
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

            } else {
                
                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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

            reciverrecieptVoucher = await RecieptVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        receive_id: ledgerid
                    }, {
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'ReciptReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            reciverpaymentVoucher = await PaymentVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        receive_id: ledgerid
                    }, {
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'PaymentReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));



            ledger = await decreption(ledger, 'object', data.data.email);

            // return {reciverrecieptVoucher, reciverpaymentVoucher, ledger};

            // if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
            //     journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            //     recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
            //     paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            // }
            journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
            paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            reciverrecieptVoucher = await decreptionReceipt(reciverrecieptVoucher, 'array', data.data.email);
            reciverpaymentVoucher = await decreptionPayment(reciverpaymentVoucher, 'array', data.data.email);
       
         
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
                ledger.dataValues.account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                ledger.dataValues.account_group_id = ledger.dataValues.account_group_id
                await array.push(ledger.dataValues);
            }

         
            let totalcalculate_openingblance = {};
            if(await checkValid(ledger.dataValues.account_group_id)){
                totalcalculate_openingblance = await getAllLedgerVouchercurrent(data.start_date,data.end_date,ledgerid,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);

            }else{
                totalcalculate_openingblance = await getAllLedgerVoucherprivious(data.start_date,data.end_date,ledgerid,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);
            }


            console.log("totalcalculate_openingblance", totalcalculate_openingblance)


           
            if(totalcalculate_openingblance >= 0){
                ledger.dataValues.debitAmount = await totalcalculate_openingblance.toString();
                ledger.dataValues.creditAmount = await 0;
            }else{
                ledger.dataValues.debitAmount = await 0;
                ledger.dataValues.creditAmount = await totalcalculate_openingblance.toString();
                // Number(totalcalculate_openingblance)<0?-1*Number(totalcalculate_openingblance).toString():Number(totalcalculate_openingblance).toString();
            }

            // return {ledger}
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
                    
                    journalVoucher[i].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    journalVoucher[i].ledger = await journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    await array.push(journalVoucher[i]);
                }
            }
          
            if (saleVoucher && saleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < saleVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].RoundOff;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = saleVoucher[s].roundoff_type,
                        saleVoucher[s].debitAmount = await saleVoucher[s].roundoff_type=="debit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].roundoff_type=="credit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].amount = saleVoucher[s].roundoff_value,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].RoundOff;
                        await array.push(saleVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(salearray.length>0){
                                let findSales = await salearray.find(it=>saleVoucher[s].Voucheris && it.invoice_idold==saleVoucher[s].Voucheris.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    saleVoucher[s].voucher_type = await 'sale';
                                    if(saleVoucher[s].Voucheris){
                                        saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                        delete  saleVoucher[s].Voucheris.SalesLedger;
                                    }else{
                                        saleVoucher[s].ledger = {};
                                    }
                                    saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                    saleVoucher[s].type = 'credit',
                                    saleVoucher[s].debitAmount = await 0;
                                    saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                    saleVoucher[s].amount = saleVoucher[s].total_amount,
                                    saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                    saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                    saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                    
                                    delete saleVoucher[s].Voucheris;
                                    await salearray.push(saleVoucher[s]);
                                    await array.push(saleVoucher[s]);
                                }
                            }else{
                                saleVoucher[s].voucher_type = await 'sale';
                                if(saleVoucher[s].Voucheris){
                                    saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                    delete  saleVoucher[s].Voucheris.SalesLedger;
                                }else{
                                    saleVoucher[s].ledger = {};
                                }
                                saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                saleVoucher[s].type = 'credit',
                                saleVoucher[s].debitAmount = await 0;
                                saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                saleVoucher[s].amount = saleVoucher[s].total_amount,
                                saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                
                                // delete saleVoucher[s].Vouchers;
                                await salearray.push(saleVoucher[s]);
                                await array.push(saleVoucher[s]);
                            }
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
                            saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${saleVoucher[s].invoice_id}`;
                            delete saleVoucher[s].SalesLedger;
                            await array.push(saleVoucher[s]);
                        }
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                let purchasearray = [] 
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].RoundOff;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = purchaseVoucher[s].roundoff_type,
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"?Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].roundoff_value,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].RoundOff;
                        await array.push(purchaseVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(purchaseVoucher.length>0){
                                let findSales = await purchasearray.find(it=>purchaseVoucher[s].Voucherip && it.invoice_idold==purchaseVoucher[s].Voucherip.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    purchaseVoucher[s].voucher_type = await 'purchase';
                                    if(purchaseVoucher[s].Voucherip){
                                        purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                        delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    }else{
                                        purchaseVoucher[s].ledger = {};
                                    }
                                    purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                    purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                    purchaseVoucher[s].type = 'debit',
                                    purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                    purchaseVoucher[s].creditAmount = await 0;
                                    purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                    purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                    purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                    delete  purchaseVoucher[s].Voucherip;
                                    await purchasearray.push(purchaseVoucher[s]);
                                    await array.push(purchaseVoucher[s]);
                                }
                            }else{
                                purchaseVoucher[s].voucher_type = await 'purchase';
                                if(purchaseVoucher[s].Voucherip){
                                    purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                }else{
                                    purchaseVoucher[s].ledger = {};
                                }
                                purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                purchaseVoucher[s].type = 'debit',
                                purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                purchaseVoucher[s].creditAmount = await 0;
                                purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                delete  purchaseVoucher[s].Voucherip;
                                await purchasearray.push(purchaseVoucher[s]);
                                await array.push(purchaseVoucher[s]);
                            }
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
                            purchaseVoucher[s].type = 'credit',
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
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].Voucheric){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucheric.CreditBuyer;
                            delete  creditVoucher[s].Voucheric.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.invoice_id<=9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucheric.invoice_id}`:creditVoucher[s].Voucheric.invoice_id>9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucheric.invoice_id}`:`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/${creditVoucher[s].Voucheric.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucheric;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        creditVoucher[s].ledger = await creditVoucher[s].CreditBuyer;
                        creditVoucher[s].Voucher = await {};
                        creditVoucher[s].type = 'credit',
                        creditVoucher[s].debitAmount = await 0;
                        creditVoucher[s].creditAmount = await creditVoucher[s].total_amount;
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
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].Voucherid){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherid.DebitBuyer;
                            delete  debitVoucher[s].Voucherid.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.invoice_id<=9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherid.invoice_id}`:debitVoucher[s].Voucherid.invoice_id>9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherid.invoice_id}`:`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherid.invoice_id}` : '';
                        delete debitVoucher[s].Voucherid;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        debitVoucher[s].ledger = await debitVoucher[s].DebitBuyer;
                        debitVoucher[s].Voucher = await {};
                        debitVoucher[s].type = 'debit',
                        debitVoucher[s].debitAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].creditAmount = await 0;
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
                    recieptVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
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
                    paymentVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(paymentVoucher[i]);
                }
            }

            if (reciverrecieptVoucher  && reciverrecieptVoucher.length>0) {
                for (var i = 0; i < reciverrecieptVoucher.length; i++) {
                    reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    reciverrecieptVoucher[i].creditAmount = await 0;
                    // if (await reciverrecieptVoucher[i].type === 'debit') {
                    //     reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    //     reciverrecieptVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverrecieptVoucher[i].debitAmount = await 0;
                    //     reciverrecieptVoucher[i].creditAmount = await reciverrecieptVoucher[i].total_amount;
                    // }
                    reciverrecieptVoucher[i].ledger = await reciverrecieptVoucher[i].ReciptReciver;
                    delete reciverrecieptVoucher[i].ReciptReciver;
                    reciverrecieptVoucher[i].voucher_type = await 'reciept reciver';
                    reciverrecieptVoucher[i].voucher_number = await reciverrecieptVoucher[i].id;
                    reciverrecieptVoucher[i].invoice_id = await reciverrecieptVoucher[i].invoice_id<=9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/00${reciverrecieptVoucher[i].invoice_id}`:reciverrecieptVoucher[i].invoice_id>9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/0${reciverrecieptVoucher[i].invoice_id}`:`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/${reciverrecieptVoucher[i].invoice_id}`;
                    reciverrecieptVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverrecieptVoucher[i]);
                }
            }

            if (reciverpaymentVoucher && reciverpaymentVoucher.length>0) {
                for (var i = 0; i < reciverpaymentVoucher.length; i++) {
                    // if (await reciverpaymentVoucher[i].type === 'debit') {
                    //     reciverpaymentVoucher[i].debitAmount = await reciverpaymentVoucher[i].total_amount;
                    //     reciverpaymentVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverpaymentVoucher[i].debitAmount = await 0;
                    //     reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    // }
                    reciverpaymentVoucher[i].debitAmount = await 0;
                    reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    reciverpaymentVoucher[i].ledger = await reciverpaymentVoucher[i].PaymentReciver;
                    delete reciverpaymentVoucher[i].PaymentReciver;
                    reciverpaymentVoucher[i].voucher_type = await 'payment reciver';
                    reciverpaymentVoucher[i].voucher_number = await reciverpaymentVoucher[i].id;
                    reciverpaymentVoucher[i].invoice_id = await reciverpaymentVoucher[i].invoice_id<=9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/00${reciverpaymentVoucher[i].invoice_id}`:reciverpaymentVoucher[i].invoice_id>9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/0${reciverpaymentVoucher[i].invoice_id}`:`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/${reciverpaymentVoucher[i].invoice_id}`;
                    reciverpaymentVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverpaymentVoucher[i]);
                }
            }

            // return {array}

            
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            // return mainArray;
            let calData = await calculationbank(mainArray)
            return calData
        } else {
            return []
        }
    } catch (e) {
        console.log("e", e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getProfileSalePurcaseCalculationData = async function (ledgerid, accountgroupid, data, res) {
    try{
    let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, reciverrecieptVoucher, reciverpaymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid:ledgerid,
                company_id: data.company_id
            },
            include:[{
                model:AccountGroup
            }]
        });
        
        if (ledger && ledger.dataValues.id) {
            if (ledger.dataValues.tax_key) {
                saleVoucher = await TaxInteries.findAll({
                    where: {
                        [Op.and]: [{
                            tax_ledger_id: ledgerid
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
                            tax_ledger_id: ledgerid
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
                            tax_ledger_id: ledgerid
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
                            tax_ledger_id: ledgerid
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

                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id:ledgerid
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
                            ledger_id: ledgerid
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

            } else if (ledger.dataValues.sale_key) {
                saleVoucher = await VoucherInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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

                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            ledger_id:ledgerid
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
                            ledger_id: ledgerid
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

            } else {
                journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            buyer_ledger_id: ledgerid
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
                            ledger_id: ledgerid
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
                            ledger_id: ledgerid
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

            reciverrecieptVoucher = await RecieptVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        receive_id: ledgerid
                    }, {
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'ReciptReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            reciverpaymentVoucher = await PaymentVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        receive_id: ledgerid
                    }, {
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    }]
                },
                include: [{
                    model: Ledger,
                    as: 'PaymentReciver',
                }],
                order: [
                    ['invoice_id', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            ledger = await decreption(ledger, 'object', data.data.email);
            // if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
            //     journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            //     recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
            //     paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            // }
            journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
            paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            reciverrecieptVoucher = await decreptionReceipt(reciverrecieptVoucher, 'array', data.data.email);
            reciverpaymentVoucher = await decreptionPayment(reciverpaymentVoucher, 'array', data.data.email);

         
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
                ledger.dataValues.account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                await array.push(ledger.dataValues);
            }

            let totalcalculate_openingblance = {};
            if(await checkValid(ledger.dataValues.account_group_id)){
                totalcalculate_openingblance = await getAllLedgerVouchercurrent(data.start_date,data.end_date,ledgerid,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);
            }else{
                totalcalculate_openingblance = await getAllLedgerVoucherprivious(data.start_date,data.end_date,ledgerid,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);
            }

            if(totalcalculate_openingblance >= 0){
                ledger.dataValues.debitAmount = await totalcalculate_openingblance.toString();
                    ledger.dataValues.creditAmount = await 0;
            }else{

                ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await totalcalculate_openingblance.toString();
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
                    journalVoucher[i].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    
                    journalVoucher[i].ledger = await journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    await array.push(journalVoucher[i]);
                }
            }
          
            if (saleVoucher && saleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < saleVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        saleVoucher[s].voucher_type = await 'sale';
                        saleVoucher[s].ledger = await saleVoucher[s].RoundOff;
                        saleVoucher[s].Voucher = await {};
                        saleVoucher[s].type = saleVoucher[s].roundoff_type,
                        saleVoucher[s].debitAmount = await saleVoucher[s].roundoff_type=="debit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].creditAmount = await saleVoucher[s].roundoff_type=="credit"? Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                        saleVoucher[s].amount = saleVoucher[s].roundoff_value,
                        saleVoucher[s].voucher_number = await saleVoucher[s].id;
                        saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                        delete saleVoucher[s].RoundOff;
                        await array.push(saleVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(salearray.length>0){
                                let findSales = await salearray.find(it=>saleVoucher[s].Voucheris && it.invoice_idold==saleVoucher[s].Voucheris.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    saleVoucher[s].voucher_type = await 'sale';
                                    if(saleVoucher[s].Voucheris){
                                        saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                        delete  saleVoucher[s].Voucheris.SalesLedger;
                                    }else{
                                        saleVoucher[s].ledger = {};
                                    }
                                    saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                    saleVoucher[s].type = 'credit',
                                    saleVoucher[s].debitAmount = await 0;
                                    saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                    saleVoucher[s].amount = saleVoucher[s].total_amount,
                                    saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                    saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                    saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                    
                                    delete saleVoucher[s].Voucheris;
                                    await salearray.push(saleVoucher[s]);
                                    await array.push(saleVoucher[s]);
                                }
                            }else{
                                saleVoucher[s].voucher_type = await 'sale';
                                if(saleVoucher[s].Voucheris){
                                    saleVoucher[s].ledger = await saleVoucher[s].Voucheris.SalesLedger;
                                    delete  saleVoucher[s].Voucheris.SalesLedger;
                                }else{
                                    saleVoucher[s].ledger = {};
                                }
                                saleVoucher[s].Voucher = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris : {};
                                saleVoucher[s].type = 'credit',
                                saleVoucher[s].debitAmount = await 0;
                                saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                                saleVoucher[s].amount = saleVoucher[s].total_amount,
                                saleVoucher[s].invoice_idold =  saleVoucher[s].Voucheris && saleVoucher[s].Voucheris.invoice_id?saleVoucher[s].Voucheris.invoice_id:'';
                                saleVoucher[s].voucher_number = await saleVoucher[s].Voucheris ? saleVoucher[s].Voucheris.id : '';
                                saleVoucher[s].invoice_id = await saleVoucher[s].Voucheris ?saleVoucher[s].Voucheris.invoice_id<=9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/00${saleVoucher[s].Voucheris.invoice_id}`:saleVoucher[s].Voucheris.invoice_id>9?`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/0${saleVoucher[s].Voucheris.invoice_id}`:`${saleVoucher[s].Voucheris.current_year.toString().substr(-2)+`-`+saleVoucher[s].Voucheris.end_year.toString().substr(-2)}/${saleVoucher[s].Voucheris.invoice_id}`: '';
                                
                                // delete saleVoucher[s].Vouchers;
                                await salearray.push(saleVoucher[s]);
                                await array.push(saleVoucher[s]);
                            }
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
                            saleVoucher[s].type = 'Credit',
                            saleVoucher[s].debitAmount = await 0
                            saleVoucher[s].creditAmount = await saleVoucher[s].total_amount;
                            saleVoucher[s].amount = saleVoucher[s].total_amount,
                            saleVoucher[s].voucher_number = await saleVoucher[s].id;
                            saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${saleVoucher[s].invoice_id}`;
                            delete saleVoucher[s].SalesLedger;
                            await array.push(saleVoucher[s]);
                        }
                    }
                }
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                let purchasearray = [] 
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].RoundOff;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = purchaseVoucher[s].roundoff_type,
                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"? Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].roundoff_value,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].RoundOff;
                        await array.push(purchaseVoucher[s]);
                    }else{
                        if (ledger.dataValues.sale_key) {
                            if(purchaseVoucher.length>0){
                                let findSales = await purchasearray.find(it=>purchaseVoucher[s].Voucherip && it.invoice_idold==purchaseVoucher[s].Voucherip.invoice_id);
                                if(findSales && findSales.Voucher){
    
                                }else{
                                    purchaseVoucher[s].voucher_type = await 'purchase';
                                    if(purchaseVoucher[s].Voucherip){
                                        purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                        delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    }else{
                                        purchaseVoucher[s].ledger = {};
                                    }
                                    purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                    purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                    purchaseVoucher[s].type = 'debit',
                                    purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                    purchaseVoucher[s].creditAmount = await 0;
                                    purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                    purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                    purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                    delete  purchaseVoucher[s].Voucherip;
                                    await purchasearray.push(purchaseVoucher[s]);
                                    await array.push(purchaseVoucher[s]);
                                }
                            }else{
                                purchaseVoucher[s].voucher_type = await 'purchase';
                                if(purchaseVoucher[s].Voucherip){
                                    purchaseVoucher[s].ledger = await purchaseVoucher[s].Voucherip.PurchaseLedger;
                                    delete  purchaseVoucher[s].Voucherip.PurchaseLedger;
                                }else{
                                    purchaseVoucher[s].ledger = {};
                                }
                                purchaseVoucher[s].invoice_idold =  purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id?purchaseVoucher[s].Voucherip.invoice_id:'';
                                purchaseVoucher[s].Voucher = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip : {};
                                purchaseVoucher[s].type = 'debit',
                                purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                                purchaseVoucher[s].creditAmount = await 0;
                                purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                                purchaseVoucher[s].voucher_number = await purchaseVoucher[s].Voucherip ? purchaseVoucher[s].Voucherip.id : '';
                                purchaseVoucher[s].invoice_id = await purchaseVoucher[s].Voucherip && purchaseVoucher[s].Voucherip.invoice_id ? purchaseVoucher[s].Voucherip.invoice_id:'';
                                delete  purchaseVoucher[s].Voucherip;
                                await purchasearray.push(purchaseVoucher[s]);
                                await array.push(purchaseVoucher[s]);
                            }
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
                            purchaseVoucher[s].type = 'debit',
                            purchaseVoucher[s].debitAmount = await purchaseVoucher[s].total_amount;
                            purchaseVoucher[s].creditAmount = await 0;
                            purchaseVoucher[s].amount = purchaseVoucher[s].total_amount,
                            purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                            purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                            
                            delete purchaseVoucher[s].PurchaseLedger;
                            await array.push(purchaseVoucher[s]);
                        }
                    }
                }
            }

            if (creditVoucher && creditVoucher.length>0) {
                for (var s = 0; s < creditVoucher.length; s++) {
                    if (ledger.dataValues.sale_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].Voucheric){
                            creditVoucher[s].ledger = await creditVoucher[s].Voucheric.CreditBuyer;
                            delete  creditVoucher[s].Voucheric.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].total_amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].total_amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.id : '';
                        creditVoucher[s].invoice_id =  await creditVoucher[s].Voucheric ? creditVoucher[s].Voucheric.invoice_id<=9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/00${creditVoucher[s].Voucheric.invoice_id}`:creditVoucher[s].Voucheric.invoice_id>9?`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/0${creditVoucher[s].Voucheric.invoice_id}`:`${creditVoucher[s].Voucheric.current_year.toString().substr(-2)+`-`+creditVoucher[s].Voucheric.end_year.toString().substr(-2)}/${creditVoucher[s].Voucheric.invoice_id}`:'';
                        
                        
                        delete creditVoucher[s].Voucheric;
                        await array.push(creditVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        creditVoucher[s].voucher_type = await 'Sale Return';
                        if(creditVoucher[s].taxc){
                            creditVoucher[s].ledger = await creditVoucher[s].taxc.CreditBuyer;
                            delete  creditVoucher[s].taxc.CreditBuyer;
                        }else{
                            creditVoucher[s].ledger = {};
                        }
                        creditVoucher[s].Voucher = await creditVoucher[s].taxc ? creditVoucher[s].taxc : {};
                        creditVoucher[s].type = 'debit',
                        creditVoucher[s].debitAmount = await creditVoucher[s].amount;
                        creditVoucher[s].creditAmount = await 0;
                        creditVoucher[s].amount = creditVoucher[s].amount,
                        creditVoucher[s].voucher_number = await creditVoucher[s].taxc ? creditVoucher[s].taxc.id : '';
                        creditVoucher[s].invoice_id = await creditVoucher[s].taxc ? creditVoucher[s].taxc.invoice_id<=9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/00${creditVoucher[s].taxc.invoice_id}`:creditVoucher[s].taxc.invoice_id>9?`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/0${creditVoucher[s].taxc.invoice_id}`:`${creditVoucher[s].taxc.current_year.toString().substr(-2)+`-`+creditVoucher[s].taxc.end_year.toString().substr(-2)}/${creditVoucher[s].taxc.invoice_id}`:'';
                        
                        delete creditVoucher[s].taxc;
                        await array.push(creditVoucher[s]);
                    } else {
                        creditVoucher[s].voucher_type = await 'Sale Return';
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
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].Voucherid){
                            debitVoucher[s].ledger = await debitVoucher[s].Voucherid.DebitBuyer;
                            delete  debitVoucher[s].Voucherid.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].total_amount;
                        debitVoucher[s].amount = debitVoucher[s].total_amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].Voucherid ? debitVoucher[s].Voucherid.invoice_id<=9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/00${debitVoucher[s].Voucherid.invoice_id}`:debitVoucher[s].Voucherid.invoice_id>9?`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/0${debitVoucher[s].Voucherid.invoice_id}`:`${debitVoucher[s].Voucherid.current_year.toString().substr(-2)+`-`+debitVoucher[s].Voucherid.end_year.toString().substr(-2)}/${debitVoucher[s].Voucherid.invoice_id}` : '';
                        delete debitVoucher[s].Voucherid;
                        await array.push(debitVoucher[s]);
                    } else if (ledger.dataValues.tax_key) {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
                        if(debitVoucher[s].taxd){
                            debitVoucher[s].ledger = await debitVoucher[s].taxd.DebitBuyer;
                            delete  debitVoucher[s].taxd.DebitBuyer;
                        }else{
                            debitVoucher[s].ledger = {};
                        }
                        debitVoucher[s].Voucher = await debitVoucher[s].taxd ? debitVoucher[s].taxd : {};
                        debitVoucher[s].type = 'Credit',
                        debitVoucher[s].debitAmount = await 0;
                        debitVoucher[s].creditAmount = await debitVoucher[s].amount;
                        debitVoucher[s].amount = debitVoucher[s].amount,
                        debitVoucher[s].voucher_number = await debitVoucher[s].taxd ? debitVoucher[s].taxd.id : '';
                        debitVoucher[s].invoice_id = await debitVoucher[s].taxd ? debitVoucher[s].taxd.invoice_id<=9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/00${debitVoucher[s].taxd.invoice_id}`:debitVoucher[s].taxd.invoice_id>9?`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/0${debitVoucher[s].taxd.invoice_id}`:`${debitVoucher[s].taxd.current_year.toString().substr(-2)+`-`+debitVoucher[s].taxd.end_year.toString().substr(-2)}/${debitVoucher[s].taxd.invoice_id}` : '';
                        delete debitVoucher[s].taxd;
                        await array.push(debitVoucher[s]);
                    } else {
                        debitVoucher[s].voucher_type = await 'Purchase Return';
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
                    recieptVoucher[s].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
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
                    paymentVoucher[s].account_group_type = ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(paymentVoucher[i]);
                }
            }
            if (reciverrecieptVoucher  && reciverrecieptVoucher.length>0) {
                for (var i = 0; i < reciverrecieptVoucher.length; i++) {
                    reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    reciverrecieptVoucher[i].creditAmount = await 0;
                    // if (await reciverrecieptVoucher[i].type === 'debit') {
                    //     reciverrecieptVoucher[i].debitAmount = await reciverrecieptVoucher[i].total_amount;
                    //     reciverrecieptVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverrecieptVoucher[i].debitAmount = await 0;
                    //     reciverrecieptVoucher[i].creditAmount = await reciverrecieptVoucher[i].total_amount;
                    // }
                    reciverrecieptVoucher[i].ledger = await reciverrecieptVoucher[i].ReciptReciver;
                    delete reciverrecieptVoucher[i].ReciptReciver;
                    reciverrecieptVoucher[i].voucher_type = await 'reciept reciver';
                    reciverrecieptVoucher[i].voucher_number = await reciverrecieptVoucher[i].id;
                    reciverrecieptVoucher[i].invoice_id = await reciverrecieptVoucher[i].invoice_id<=9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/00${reciverrecieptVoucher[i].invoice_id}`:reciverrecieptVoucher[i].invoice_id>9?`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/0${reciverrecieptVoucher[i].invoice_id}`:`${reciverrecieptVoucher[i].current_year.toString().substr(-2)+`-`+reciverrecieptVoucher[i].end_year.toString().substr(-2)}/${reciverrecieptVoucher[i].invoice_id}`;
                    reciverrecieptVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverrecieptVoucher[i]);
                }
            }

            if (reciverpaymentVoucher && reciverpaymentVoucher.length>0) {
                for (var i = 0; i < reciverpaymentVoucher.length; i++) {
                    // if (await reciverpaymentVoucher[i].type === 'debit') {
                    //     reciverpaymentVoucher[i].debitAmount = await reciverpaymentVoucher[i].total_amount;
                    //     reciverpaymentVoucher[i].creditAmount = await 0;
                    // } else {
                    //     reciverpaymentVoucher[i].debitAmount = await 0;
                    //     reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    // }
                    reciverpaymentVoucher[i].debitAmount = await 0;
                    reciverpaymentVoucher[i].creditAmount = await reciverpaymentVoucher[i].total_amount;
                    reciverpaymentVoucher[i].ledger = await reciverpaymentVoucher[i].PaymentReciver;
                    delete reciverpaymentVoucher[i].PaymentReciver;
                    reciverpaymentVoucher[i].voucher_type = await 'payment reciver';
                    reciverpaymentVoucher[i].voucher_number = await reciverpaymentVoucher[i].id;
                    reciverpaymentVoucher[i].invoice_id = await reciverpaymentVoucher[i].invoice_id<=9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/00${reciverpaymentVoucher[i].invoice_id}`:reciverpaymentVoucher[i].invoice_id>9?`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/0${reciverpaymentVoucher[i].invoice_id}`:`${reciverpaymentVoucher[i].current_year.toString().substr(-2)+`-`+reciverpaymentVoucher[i].end_year.toString().substr(-2)}/${reciverpaymentVoucher[i].invoice_id}`;
                    reciverpaymentVoucher[i].account_group_type =ledger.dataValues.account_group.dataValues.type == 'dr'? 'debit':'credit';
                    await array.push(reciverpaymentVoucher[i]);
                }
            }
            let mainArray = await arraySort(array, 'invoice_date') //array.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date));
            let lastObj =await mainArray[mainArray.length-1];
            await mainArray.pop(mainArray.length-1);
            mainArray.unshift(lastObj);
            let calData = await calculationbank(mainArray)
            return calData
        } else {
            return []
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

exports.groupData = async function(account_id, data, res){
    try {
        data.account_id =await account_id;
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
            attributes:['id', 'uid', 'name', 'amount', 'opening_balance', 'account_group_id', 'sub_account_group_id'],
            include:[{
                    model: AccountGroup
                },{
                    model: SubAccountGroup
                },{
                    model:JournalInteries,
                    where:{
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    },
                    required:false,
                    attributes:['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
                    include:[
                        {
                            model: JournalVoucher,
                            required:false,
                            attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                            as: 'Voucher'
                        }
                    ]
            }, {
                model:RecieptVoucher,
                as: 'Buyer',
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },{
                model:PaymentVoucher,
                as: 'PBuyer',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },
            {
                model:RecieptVoucher,
                as: 'RBuyer',
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },{
                model:PaymentVoucher,
                as: 'PRBuyer',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
            },
            {
                model:SaleVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
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
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    }]
            },
            {
                model:SaleVoucher,
                as:"roundsales",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:PurchaseVoucher,
                as:"roundpurchase",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[
                    {
                        model:ItemInteries,
                        required: false,
                        where: {
                            type: 'Purchase'
                        }
                    }]
            },
            {
                model:CreditVoucher,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                model:ItemInteries,
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                include:[
                    {
                        model:SaleVoucher,
                        as:"ItemVouchers",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:PurchaseVoucher,
                        as:"ItemVoucherp",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:DebitVoucher,
                        as:"ItemVoucherd",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    },
                    {
                        model:CreditVoucher,
                        as:"ItemVoucherc",
                        attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                    }
                ]
            },
            {
                model:VoucherInteries, as:'vocher_entries',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                attributes:['id', 'uid', 'amount', 'type', 'ledger_id']
            },{
                model:TaxInteries,as:'tax_entries',
                required:false,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                attributes:['id', 'uid', 'amount', 'type', 'tax_ledger_id']
            },
            {
                model:SaleVoucher,
                as:"discountsales",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:PurchaseVoucher,
                as:"discountPurchases",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:CreditVoucher,
                as:"discountCredit",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            },
            {
                model:DebitVoucher,
                as:"discountDebit",
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
                include:[{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }]
            }
        ]
        }).map((node) => node.get({
            plain: true
        }));
        ledger = await decreptionReport(ledger, 'array', data.data.email);
       
        if(ledger.length>0){
            let totalcalculate_openingblance =await {
                creditbalnce:0,
                debitbalnce:0,
                totalbalnce:0
            };
            await ledger.map(async(item)=>{
                item.total_amount = 0;
                item.open_type = item.opening_balance; 
                item.name = item.name; 
                item.subAccount = item.sub_account_group?item.sub_account_group:{}; 
                item.account = item.account_group?item.account_group:{}; 
                item.accounttype = item.account_group && item.account_group.type=="dr"? 'debit':'credit';
                item.open_amount = item.amount ? Number(item.amount):item.amount;
                delete item.amount;delete item.opening_balance;delete item.sub_account_group;delete item.account_group;
                item.invoice_id = '';
                item.voucher_type = '';
                item.debitAmount = 0;
                item.creditAmount = 0;

                if(item.journal_entries.length>0){
                    item.journal_entries.forEach(journal=>{
                       if (journal.type === 'debit') {
                            item.debitAmount =  Number(journal.amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(journal.amount)+Number(item.creditAmount);
                        }
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.Buyer.length>0){
                    item.Buyer.forEach(reciept=>{
                        if (reciept.type === 'debit') {
                            item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(reciept.total_amount)+Number(item.creditAmount);
                        }
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.PBuyer.length>0){
                    item.PBuyer.forEach(payment=>{
                        if (payment.type === 'debit') {
                            item.debitAmount =  Number(payment.total_amount)+Number(item.debitAmount);
                        } else {
                            item.creditAmount = Number(payment.total_amount)+Number(item.creditAmount);
                        }
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.RBuyer.length>0){
                    item.RBuyer.forEach(reciept=>{
                        item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    })
                }
                if(item.PRBuyer.length>0){
                    item.PRBuyer.forEach(payment=>{
                        item.creditAmount =  Number(payment.total_amount)+Number(item.creditAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
         
                if(item.sales_vouchers && item.sales_vouchers.length>0){
                    item.sales_vouchers.forEach(sale=>{
                        item.debitAmount =  Number(sale.total_amount)+Number(item.debitAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                if(item.purchase_vouchers.length>0){
                    item.purchase_vouchers.forEach(purchase=>{
                        item.creditAmount =  Number(purchase.total_amount)+Number(item.creditAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                if(item.roundsales && item.roundsales.length>0){
                    item.roundsales.forEach(sale=>{
                        if(sale.roundoff_ledger_id){
                            if(sale.roundoff_type=="debit" || sale.roundoff_type=="Debit"){
                                item.debitAmount =  Number(item.debitAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                            }else{
                                item.creditAmount =  Number(item.creditAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                            }
                            // if(item.debitAmount<0){
                            //     item.debitAmount = -1*Number(item.debitAmount)
                            // }
                            item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        }
                    })
                }
                if(item.roundpurchase.length>0){
                    item.roundpurchase.forEach(purchase=>{
                        if(purchase.roundoff_ledger_id){
                            if(purchase.roundoff_type=="debit" || purchase.roundoff_type=="debit"){
                                item.debitAmount = Number(item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                            }else{
                                item.creditAmount =  Number(item.creditAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                            }
                            // if(item.debitAmount<0){
                            //     item.debitAmount = -1*Number(item.debitAmount)
                            // }
                            item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            // if(item.accounttype=="debit"){
                            //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                            // }else{
                            //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                            // }
                        }
                    })
                }

                if((item.roundsales && item.roundsales.length<0) || item.roundpurchase.length<0){
                    if(item.discountsales && item.discountsales.length>0){
                        item.discountsales.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
        
                    if(item.discountPurchases && item.discountPurchases.length>0){
                        item.discountPurchases.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                           
                        })
                    }
        
                    if(item.discountCredit && item.discountCredit.length>0){
                        item.discountCredit.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
        
                    if(item.discountDebit && item.discountDebit.length>0){
                        item.discountDebit.forEach(sale=>{
                            if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                                if(item.roundoff_ledger_id){
        
                                }else{
                                    item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                    item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                                }
                            }
                        })
                    }
                }


                if(item.credit_vouchers.length>0){
                    item.credit_vouchers.forEach(credit=>{
                        item.debitAmount =  Number(credit.total_amount)+Number(item.debitAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.debit_vouchers.length>0){
                    item.debit_vouchers.forEach(debit=>{
                        item.debitAmount =  Number(debit.total_amount)+Number(item.debitAmount);
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }
                if(item.item_entries.length>0){
                    item.item_entries.forEach(voucher=>{
                        if(voucher.ItemVouchers){
                            item.invoice_date = voucher.ItemVouchers.invoice_date;
                            item.invoice_id =voucher.ItemVouchers.invoice_id<=9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/00${voucher.ItemVouchers.invoice_id}`:voucher.ItemVouchers.invoice_id>9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/0${voucher.ItemVouchers.invoice_id}`:`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/${voucher.ItemVouchers.invoice_id}`;
                            item.voucher_type = 'sale';
                        }
                        if(voucher.ItemVoucherc){
                            item.invoice_date = voucher.ItemVoucherc.invoice_date;
                            item.invoice_id = voucher.ItemVoucherc.invoice_id<=9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/00${voucher.ItemVoucherc.invoice_id}`:voucher.ItemVoucherc.invoice_id>9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/0${voucher.ItemVoucherc.invoice_id}`:`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/${voucher.ItemVoucherc.invoice_id}`;
                            item.voucher_type = 'credit';
                        }
                        if(voucher.ItemVoucherd){
                            item.invoice_date = voucher.ItemVoucherd.invoice_date;
                            item.invoice_id =voucher.ItemVoucherd.invoice_id<=9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/00${voucher.ItemVoucherd.invoice_id}`:voucher.ItemVoucherd.invoice_id>9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/0${voucher.ItemVoucherd.invoice_id}`:`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/${voucher.ItemVoucherd.invoice_id}`;
                            item.voucher_type = 'debit';
                        }
                        if(voucher.ItemVoucherp){
                            item.invoice_date = voucher.ItemVoucherp.invoice_date;
                            item.invoice_id = voucher.ItemVoucherp.invoice_id;
                            item.voucher_type = 'purchase';
                        }
                        if(voucher.type==="Sales" || voucher.type==="sales"){
                            item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                        }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                            item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                        }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                            item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                        }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                            item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                        }

                        
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }

                // if(item.vocher_entries.length>0){
                //     item.vocher_entries.forEach(voucher=>{
                //         if(voucher.type==="Sales" || voucher.type==="sales"){
                //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                //             item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                //             item.debitAmount =  Number(voucher.amount)+Number(item.debitAmount);
                //         }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
                //         }
                //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount))+Number(item.open_amount);
                //     })
                // }
                if(item.tax_entries.length>0){
                    item.tax_entries.forEach(tax=>{
                        if(tax.type==="Sales" || tax.type==="sales"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }else if(tax.type==="Purchase" || tax.type==="purchase"){
                            item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                        }else if(tax.type==="Debit" || tax.type==="debit"){
                            item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                        }else if(tax.type==="Credit" || tax.type==="credit"){
                            item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                        }
                        item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    })
                }


                // if(item.discountsales && item.discountsales.length>0){
                //     item.discountsales.forEach(sale=>{
                //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountPurchases && item.discountPurchases.length>0){
                //     item.discountPurchases.forEach(sale=>{
                //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountCredit && item.discountCredit.length>0){
                //     item.discountCredit.forEach(sale=>{

                //         item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }

                // if(item.discountDebit && item.discountDebit.length>0){
                //     item.discountDebit.forEach(sale=>{

                //         item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                //         item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                //         item.total_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                //     })
                // }


                // if(item.accounttype === "debit"){
                //     item.total_amount = Number(item.total_amount)-Number(item.open_amount);
                // }


                // if(item.accounttype === "credit"){
                //     item.total_amount = Number(item.total_amount)+Number(item.open_amount);
                // }

                if(item.open_type === "debit"){
                    item.total_amount = Number(item.total_amount)-Number(item.open_amount);
                    if(item.total_amount<0){
                        item.total_amount = -1*Number(item.total_amount)
                    }
                    item.closeing_type = 'debit';
                    item.accounttype =  item.closeing_type
                }


                if(item.open_type === "credit"){
                    item.total_amount = Number(item.total_amount)+Number(item.open_amount);
                    if(item.total_amount<0){
                        item.total_amount = -1*Number(item.total_amount)
                    }
                    item.closeing_type = 'credit';
                    item.accounttype =  item.closeing_type
                }



                delete item.journal_entries;
                delete item.reciept_vouchers;
                delete item.payment_vouchers;
                delete item.sales_vouchers;
                delete item.purchase_vouchers;
                delete item.credit_vouchers;
                delete item.debit_vouchers;
                delete item.item_entries;
                delete item.vocher_entries;
                delete item.tax_entries;
                delete item.Buyer;
                delete item.PBuyer;
                delete item.PRBuyer;
                delete item.RBuyer;
                delete item.roundsales;
                delete item.roundpurchase;
                delete item.discountsales;
                delete item.discountPurchases;
                delete item.discountCredit;
                delete item.discountDebit;
            })
            let returngroup = await groupFuncation(ledger);
            // return {returngroup:returngroup}
            if(returngroup){
                await Object.keys(returngroup).map(function (item) {
                    if(item==="MainGroup"){
                        if(returngroup[item].length>0){
                            let a = {
                                name:returngroup[item][0].account.name,
                                open_amount:0,
                                total_amount:0,
                                closeing_type:'',
                                sub_uid:'',
                                account_group_id:'',
                                subAccount:{},
                                accounttype:'debit',
                                debitAmount:0,
                                creditAmount:0,
                                ishead:true,
                                ismain:true
                            };
                            let b = [];
                            returngroup[item].map(element=>{
                                // a.open_amount = Number(a.open_amount)+Number(element.open_amount?element.open_amount:0);
                                // a.subAccount = {};
                                // a.total_amount = Number(a.total_amount?a.total_amount:0)+Number(element.total_amount?element.total_amount:0);
                                // a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount?element.debitAmount:0);
                                // a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount?element.creditAmount:0);
                                // a.account_group_id = element.account_group_id;   
                                if(element.open_type=="credit"){
                                    if(element.open_type==element.accounttype){
                                        if(Number(Number(element.creditAmount)+Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                            element.accounttype = 'credit';
                                        }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)+Number(Number(element.open_amount)))){
                                            element.accounttype = 'debit';
                                        }
                                    }else{
                                        if(Number(Number(element.creditAmount)-Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                            element.accounttype = 'credit';
                                        }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)-Number(Number(element.open_amount)))){
                                            element.accounttype = 'debit';
                                        }
                                    }
                                }else{
                                    if(element.open_type==element.accounttype){
                                        if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                            element.accounttype = 'credit';
                                        }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                            element.accounttype = 'debit';
                                        }
                                    }else{
                                        if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                            element.accounttype = 'credit';
                                        }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                            element.accounttype = 'debit';
                                        }
                                    }
                                }

                               
                                if(element.accounttype==element.open_type){
                                    if(element.account.type=="dr"){
                                        if(element.accounttype=="credit"){
                                            element.creditAmount = -1*Number(element.creditAmount);
                                            element.total_amount = -1*Number(element.total_amount);
                                        }
                                    }
                                    if(element.account.type=="cr"){
                                        if(element.accounttype=="debit"){
                                            element.debitAmount = -1*Number(element.debitAmount);
                                            element.total_amount = -1*Number(element.total_amount);
                                        }
                                    }
                                }else{
                                    if(element.accounttype=="credit"){
                                        element.creditAmount = -1*Number(element.creditAmount);
                                        element.total_amount = -1*Number(element.total_amount);
                                    }
                                    if(element.accounttype=="debit"){
                                        element.debitAmount = -1*Number(element.debitAmount);
                                        element.total_amount = -1*Number(element.total_amount);
                                    }
                                }
                               
                                // console.log("element.accounttype", element)
                                // a.closeing_amount = Number(element.closeing_amount?element.closeing_amount:0)+Number(Number(b.length>0?b[b.length-1].closeing_amount:0));
                                b.push(element);
                            })
                            
                            // if(Number(a.creditAmount)>Number(a.debitAmount)){
                            //     a.accounttype = 'credit';
                            //     a.total_amount = Number(a.creditAmount)-Number(a.debitAmount);
                            // }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                            //     a.accounttype = 'debit';
                            //     a.total_amount = Number(a.debitAmount)-Number(a.creditAmount);
                            // }
                            // b.unshift(a);
                            Mainarray = Mainarray.concat(b);
                        }
                    }else{
                        // let a = {
                        //     name:returngroup[item][0].account.name,
                        //     open_amount:0,
                        //     total_amount:0,
                        //     closeing_type:'',
                        //     sub_uid:'',
                        //     account_group_id:'',
                        //     subAccount:{},
                        //     accounttype:'debit',
                        //     debitAmount:0,
                        //     creditAmount:0,
                        //     ishead:true,
                        //     ismain:true
                        // };
                        let b = [];
                        returngroup[item].map(element=>{
                            // a.open_amount = Number(a.open_amount)+Number(element.open_amount?element.open_amount:0);
                            // a.subAccount = {};
                            // a.total_amount = Number(a.total_amount?a.total_amount:0)+Number(element.total_amount?element.total_amount:0);
                            // a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount?element.debitAmount:0);
                            // a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount?element.creditAmount:0);
                            // a.account_group_id = element.account_group_id;   
                            if(element.open_type=="credit"){
                                if(element.open_type==element.accounttype){
                                    if(Number(Number(element.creditAmount)+Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                        element.accounttype = 'credit';
                                    }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)+Number(Number(element.open_amount)))){
                                        element.accounttype = 'debit';
                                    }
                                }else{
                                    if(Number(Number(element.creditAmount)-Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                        element.accounttype = 'credit';
                                    }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)-Number(Number(element.open_amount)))){
                                        element.accounttype = 'debit';
                                    }
                                }
                            }else{
                                if(element.open_type==element.accounttype){
                                    if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                        element.accounttype = 'credit';
                                    }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                        element.accounttype = 'debit';
                                    }
                                }else{
                                    if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                        element.accounttype = 'credit';
                                    }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                        element.accounttype = 'debit';
                                    }
                                }
                            }

                            if(element.accounttype==element.open_type){
                                if(element.account.type=="dr"){
                                    if(element.accounttype=="credit"){
                                        element.creditAmount = -1*Number(element.creditAmount);
                                        element.total_amount = -1*Number(element.total_amount);
                                    }
                                }
                                if(element.account.type=="cr"){
                                    if(element.accounttype=="debit"){
                                        element.debitAmount = -1*Number(element.debitAmount);
                                        element.total_amount = -1*Number(element.total_amount);
                                    }
                                }
                            }else{
                                if(element.accounttype=="credit"){
                                    element.creditAmount = -1*Number(element.creditAmount);
                                    element.total_amount = -1*Number(element.total_amount);
                                }
                                if(element.accounttype=="debit"){
                                    element.debitAmount = -1*Number(element.debitAmount);
                                    element.total_amount = -1*Number(element.total_amount);
                                }
                            }

                            // a.closeing_amount = Number(element.closeing_amount?element.closeing_amount:0)+Number(Number(b.length>0?b[b.length-1].closeing_amount:0));
                            b.push(element);
                        })
                        
                        if(Number(a.creditAmount)>Number(a.debitAmount)){
                            a.accounttype = 'credit';
                            a.total_amount = Number(a.creditAmount)-Number(a.debitAmount);
                        }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                            a.accounttype = 'debit';
                            a.total_amount = Number(a.debitAmount)-Number(a.creditAmount);
                        }
                        b.unshift(a);
                        Mainarray = Mainarray.concat(b);
                    }
                });
            }
           
            // return Mainarray


            if(Mainarray.length>0){
                // let opendebittatal = 0
                // let opencredittatal = 0
                // let credittatal = 0
                // let debittatal = 0
                // let closingdebittatal = 0
                // let closingcredittatal = 0
                // await Mainarray.map((item)=>{
                //     if(!item.ishead && !item.ismain){
                //         debittatal = Number(debittatal)+Number(item.debitAmount);
                //         credittatal = Number(credittatal)+Number(item.creditAmount);
                //         if(item.accounttype=="debit"){
                //             opendebittatal = Number(opendebittatal)+Number(item.open_amount);
                //             closingdebittatal = Number(closingdebittatal)+Number(item.total_amount);
                //         }else{
                //             opencredittatal = Number(opendebittatal)+Number(item.open_amount);
                //             closingcredittatal = Number(closingcredittatal)+Number(item.total_amount)
                //         }
                //     }
                // })
                // if(Number(opencredittatal)>Number(opendebittatal)){
                //     Mainarray[0].open_type = 'credit';
                //     Mainarray[0].open_amount = Number(opencredittatal)-Number(opendebittatal);
                //     Mainarray[0].total_amount = Number(Mainarray[0].creditAmount)+Number(Number(opencredittatal)-Number(opendebittatal));
                // }else{
                //     Mainarray[0].open_type = 'debit'
                //     Mainarray[0].open_amount = Number(opendebittatal)-Number(opencredittatal);
                //     Mainarray[0].total_amount = Number(Mainarray[0].debitAmount)+Number(Number(opendebittatal)-Number(opencredittatal));
                // }

                // if(Number(closingcredittatal)>Number(closingdebittatal)){
                //     Mainarray[0].accounttype = 'credit';
                //     Mainarray[0].total_amount = Number(closingcredittatal)-Number(closingdebittatal);
                // }else{
                //     Mainarray[0].accounttype = 'debit'
                //     Mainarray[0].total_amount = Number(closingdebittatal)-Number(closingcredittatal);
                // }
                if(await checkValid(Mainarray[0].account_group_id)){
                    totalcalculate_openingblance = await getAllGroupVouchercurrent(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);

                    Mainarray[0].total_amount = Number(Mainarray[0].total_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                    Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                    Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);
                    // if(Mainarray[0].accounttype=='debit'){
                    //     if(Mainarray[0].total_amount<0){
                    //         Mainarray[0].total_amount = -1*Number(Mainarray[0].total_amount);
                    //     }
                    // }
                    // if(Mainarray[0].accounttype=='credit'){
                    //     if(Mainarray[0].total_amount<0){
                    //         Mainarray[0].total_amount = -1*Number(Mainarray[0].total_amount);
                    //     }
                    // }
                }else{
                    totalcalculate_openingblance = await getAllGroupVoucherprivious(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);
                    Mainarray[0].total_amount = Number(Mainarray[0].total_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                    Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                    Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);
                    // if(Mainarray[0].accounttype=='debit'){
                    //     if(Mainarray[0].total_amount<0){
                    //         Mainarray[0].total_amount = -1*Number(Mainarray[0].total_amount);
                    //     }
                    // }
                    // if(Mainarray[0].accounttype=='credit'){
                    //     if(Mainarray[0].total_amount<0){
                    //         Mainarray[0].total_amount = -1*Number(Mainarray[0].total_amount);
                    //     }
                    // }
                }

                return Mainarray
                let calData = await calculationGroup(Mainarray)
                return  calData.name?[calData]:[]
            }else{
                return [];
            }
        }else{
            return []
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}

exports.getCurrentYearData = async function (data, res, finalAmount, pricerate) {
    try{
        // return {finalAmount:finalAmount, pricerate:pricerate, data:data}
        let stockVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher = [];
      
        saleVoucher = await ItemInteries.findAll({
            where: {
                [Op.and]: [{
                    type: 'Sales'
                },{ company_id:data.company_id}, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                model: Item,
                as:"itemone",
                required: true,
                where:{
                    company_id:data.company_id,
                }
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
    
        purchaseVoucher = await ItemInteries.findAll({
            where: {
                [Op.and]: [{
                     type: 'Purchase'
                },{ company_id:data.company_id}, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                model: Item,
                as:"itemone",
                required: true,
                where:{
                    company_id:data.company_id
                }
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
    
        creditVoucher = await ItemInteries.findAll({
            where: {
                [Op.and]: [{
                     type: 'Debit'
                },{ company_id:data.company_id}, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                model: Item,
                as:"itemone",
                required: true,
                where:{
                    company_id:data.company_id
                }
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
    
        debitVoucher = await ItemInteries.findAll({
            where: {
                [Op.and]: [{
                     type: 'Credit'
                },{ company_id:data.company_id}, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                model: Item,
                as:"itemone",
                required: true,
                where:{
                    company_id:data.company_id
                }
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        stockVoucher = await itemStockVoucherEntries.findAll({
            where: {
                [Op.and]: [ {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },{ company_id:data.company_id}]
            },
            include: [{
                model: Item,
                as:"itemsone",
                required: true,
                where:{
                    company_id:data.company_id
                }
            }],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));


        let mainArray = []
        let itemArray = await Item.findAll({where:{
            company_id:data.company_id
        }})
        itemArray = await decreptionItem(itemArray, 'array', data.data.email);
        saleVoucher = await decreptionItem(saleVoucher, 'array', data.data.email);
        purchaseVoucher = await decreptionItem(purchaseVoucher, 'array', data.data.email);
        creditVoucher = await decreptionItem(creditVoucher, 'array', data.data.email);
        debitVoucher = await decreptionItem(debitVoucher, 'array', data.data.email);
        stockVoucher = await decreptionItem(stockVoucher, 'array', data.data.email);
        // return {saleVoucher:saleVoucher}
    
        if(saleVoucher.length>0){
            saleVoucher.map((item)=>{
                item.voucher = 'sales';
                mainArray.push(item);
            })
        }
        if(purchaseVoucher.length>0){
            purchaseVoucher.map((item)=>{
                item.voucher = 'purchase';
                mainArray.push(item);
            })
        }
        if(creditVoucher.length>0){
            creditVoucher.map((item)=>{
                item.voucher = 'credit';
                mainArray.push(item);
            })
        }
        if(debitVoucher.length>0){
            debitVoucher.map((item)=>{
                item.voucher = 'debit';
                mainArray.push(item);
            })
        }
        if(stockVoucher.length>0){
            stockVoucher.map((item)=>{
                item.voucher = 'stock';
                item.itemone = item.itemsone;
                delete item.itemsone;
                mainArray.push(item);
            })
        }
    
        // return {itemArray:itemArray, mainArray:mainArray, data:data}
    
        let group = mainArray.reduce((r, a) => {
            r[a.name] = [...r[a.name] || [], a];
            return r;
        }, {});
    
        // let returnAmount = 0;
    
        // let amount = await itemArray.map(calAmount => {
        //     if(calAmount.rate){
        //         return  Number(calAmount.quantity)*Number(calAmount.rate);
        //     }else{
        //         return 0;
        //     }
        // });
        let returnAmount =  0; //await Number(amount.reduce((a, b) => Number(a) + Number(b), 0));
        
        
        for (const [key, value] of Object.entries(finalAmount)) {
            returnAmount = Number(returnAmount)+Number(Number(value?value:0)*Number(pricerate[key]?pricerate[key]:0))
        }
        // return {group:group}
        let salevoucherAmount = 0;
        let purchasevoucherAmount = 0;
        let debitvoucherAmount = 0;
        let creditvoucherAmount = 0;
        let stockcreditvoucherAmount = 0;
        let stockdebitvoucherAmount = 0;

        for (const [key, value] of Object.entries(group)) {
            value.map(item=>{
                if(item.voucher === 'sales' && item.name==key){
                    salevoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }

                if(item.voucher === 'purchase' && item.name==key){
                    purchasevoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }
    
                if(item.voucher === 'debit' && item.name==key){
                    debitvoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }
    
                if(item.voucher === 'credit' && item.name==key){
                    creditvoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }

                if(item.voucher === 'stock' && item.type=="Debit" && item.name==key){
                    stockdebitvoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }

                if(item.voucher === 'stock' && item.type=="Credit" && item.name==key){
                    stockcreditvoucherAmount +=  Number(item.quantity) * Number(pricerate[key]);
                }
            })
        }
        // finalAmount = await getOldYearData(data, res);
        let closeStockAmount = Number(returnAmount)-Number(salevoucherAmount)+Number(purchasevoucherAmount)+Number(creditvoucherAmount)-Number(debitvoucherAmount)+Number(stockdebitvoucherAmount)-Number(stockcreditvoucherAmount);
       
        // return {salevoucherAmount:salevoucherAmount, purchasevoucherAmount:purchasevoucherAmount, creditvoucherAmount:creditvoucherAmount, debitvoucherAmount:debitvoucherAmount , finalAmount:closeStockAmount}

        return {closeStockAmount:closeStockAmount, returnAmount:returnAmount}
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getOldYearData = async function (data, res) {
    try{
            let stockJournalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher = [];
            let oldPrice = await oldyearPriceItem(data, res);
            // return {oldPrice:oldPrice}
            saleVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                         type: 'Sales'
                    }, { company_id:data.company_id},{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            purchaseVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                         type: 'Purchase'
                    },{ company_id:data.company_id}, {
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            creditVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                         type: 'Debit'
                    }, { company_id:data.company_id},{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            debitVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                         type: 'Credit'
                    }, { company_id:data.company_id},{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            stockJournalVoucher = await itemStockVoucherEntries.findAll({
                where: {
                    [Op.and]: [{
                        company_id:data.company_id
                    },{
                        invoice_date: {
                            [Op.lt]: data.start_date
                        }
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemsone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            let mainArray = []
            let itemArray = await Item.findAll({where:{
                company_id:data.company_id
            }})
            itemArray = await decreptionItem(itemArray, 'array', data.data.email);
            saleVoucher = await decreptionItem(saleVoucher, 'array', data.data.email);
            purchaseVoucher = await decreptionItem(purchaseVoucher, 'array', data.data.email);
            creditVoucher = await decreptionItem(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionItem(debitVoucher, 'array', data.data.email);
            stockJournalVoucher = await decreptionItem(stockJournalVoucher, 'array', data.data.email);

            // return {saleVoucher:saleVoucher}

            if(saleVoucher.length>0){
                saleVoucher.map((item)=>{
                    item.voucher = 'sales';
                    mainArray.push(item);
                })
            }
            if(purchaseVoucher.length>0){
                purchaseVoucher.map((item)=>{
                    item.voucher = 'purchase';
                    mainArray.push(item);
                })
            }
            if(creditVoucher.length>0){
                creditVoucher.map((item)=>{
                    item.voucher = 'credit';
                    mainArray.push(item);
                })
            }
            if(debitVoucher.length>0){
                debitVoucher.map((item)=>{
                    item.voucher = 'debit';
                    mainArray.push(item);
                })
            }
            if(stockJournalVoucher.length>0){
                stockJournalVoucher.map((item)=>{
                    item.voucher = 'stock';
                    item.itemone = item.itemsone;
                    delete item.itemsone;
                    mainArray.push(item);
                })
            }

            // return {itemArray:itemArray, mainArray:mainArray}

            // let group = mainArray.reduce((r, a) => {
            //     r[a.itemone.name] = [...r[a.itemone.name] || [], a];
            //     return r;
            // }, {});

            // let itemArray = await Item.findAll({where:{
            //     company_id:data.company_id
            // }})
            // itemArray = await decreptionItem(itemArray, 'array', data.data.email);

            let groupItem = await itemArray.reduce((r, a) => {
                r[a.name] = [...r[a.name] || [], a];
                return r;
            }, {});
           let group = {};
            if(mainArray.length>0){
                group =await mainArray.reduce((r, a) => {
                    r[a.name] = [...r[a.name] || [], a];
                    return r;
                }, {});
            }else{
                group =await itemArray.reduce((r, a) => {
                    r[a.name] = [...r[a.name] || [], a];
                    return r;
                }, {});    
            }

            let amount = await itemArray.map(calAmount => {
                for (const [key, value] of Object.entries(oldPrice)) {
                    if(calAmount.name==key){
                        if(calAmount.rate){
                            return  Number(calAmount.quantity)*Number(value);
                        }else{
                            return 0;
                        }
                    }
                }
            });

            let qty = await itemArray.map(calAmount => {
                for (const [key, value] of Object.entries(oldPrice)) {
                    if(calAmount.name==key){
                        if(calAmount.quantity){
                            return  Number(calAmount.quantity);
                        }else{
                            return 0;
                        }
                    }
                }
            });
            let returnAmount =  await Number(amount.reduce((a, b) => Number(a) + Number(b), 0));
            let finalQty = await Number(qty.reduce((a, b) => Number(a) + Number(b), 0)); 
           
            let salevoucherAmountqty = {};
            let purchasevoucherAmountqty = {};
            let debitvoucherAmountqty = {};
            let creditvoucherAmountqty = {};
            let stockcreditvoucherAmountqty = {}
            let stockdebitvoucherAmountqty = {};
            let newoldPrice = {};

            // return {group:group}
            for (const [key, value] of Object.entries(group)) {
                let updatedata = await arraySort(value, 'updated_date') 
                newoldPrice[key] = Number(updatedata[updatedata.length-1].rate)?Number(updatedata[updatedata.length-1].rate):Number(updatedata[updatedata.length-1].price);

                let amount = await value.map(calAmount => {
                    if(calAmount.voucher == 'sales' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                salevoucherAmountqty[key]=  await Number(amount.reduce((a, b) => Number(a) + Number(b), 0));

                let amount1 = await value.map(calAmount => {
                    if(calAmount.voucher == 'purchase' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                purchasevoucherAmountqty[key] = await Number(amount1.reduce((a, b) => Number(a) + Number(b), 0));

                let amount2 = await value.map(calAmount => {
                    if(calAmount.voucher == 'debit' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                debitvoucherAmountqty[key] =  await Number(amount2.reduce((a, b) => Number(a) + Number(b), 0));

                let amount3 = await value.map(calAmount => {
                    if(calAmount.voucher == 'credit' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                creditvoucherAmountqty[key] =  await Number(amount3.reduce((a, b) => Number(a) + Number(b), 0));

                let amountStockCredit = await value.map(calAmount => {
                    if(calAmount.voucher == 'stock' && calAmount.type == 'Credit' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                stockcreditvoucherAmountqty[key] =  await Number(amountStockCredit.reduce((a, b) => Number(a) + Number(b), 0));

                let amountStockDebit = await value.map(calAmount => {
                    if(calAmount.voucher == 'stock' && calAmount.type == 'Debit' && calAmount.name==key){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
                stockdebitvoucherAmountqty[key] =  await Number(amountStockDebit.reduce((a, b) => Number(a) + Number(b), 0));
            }

            let finalAmount = 0;
            let finalAmountqty = {}
            for (const [key, value] of Object.entries(groupItem)) {
                let itemQty = await value.map(calAmount => {
                    if(calAmount.name==key && calAmount.quantity){
                        return Number(calAmount.quantity)
                    }else{
                        return 0
                    }
                });
              
                finalAmountqty[key] = Number(itemQty)-Number(salevoucherAmountqty[key]?salevoucherAmountqty[key]:0)+Number(purchasevoucherAmountqty[key]?purchasevoucherAmountqty[key]:0)+Number(creditvoucherAmountqty[key]?creditvoucherAmountqty[key]:0)-Number(debitvoucherAmountqty[key]?debitvoucherAmountqty[key]:0)+Number(stockdebitvoucherAmountqty[key]?stockdebitvoucherAmountqty[key]:0)-Number(stockcreditvoucherAmountqty[key]?stockcreditvoucherAmountqty[key]:0)
            }

            for (const [key, value] of Object.entries(finalAmountqty)) {
                finalAmount = Number(finalAmount)+Number(Number(value?value:0)*Number(oldPrice[key]?oldPrice[key]:0))
            }

            return {finalAmount:finalAmount, finalAmountqty:finalAmountqty}
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getLeaderDiffrenc = async function (data, res) {
    let getAll = await Ledger.findAll({
        where:{
            company_id:data.company_id
        }
    })

    getAll =await decreption(getAll, 'array', data.data.email);
    let debitAmount = 0;
    let creditAmount = 0;
    await getAll.map(item=>{
        if(item.opening_balance==="debit"){
            debitAmount = Number(debitAmount)+Number(item.amount?item.amount:0);
        }else{
            creditAmount =Number(creditAmount)+Number(item.amount?item.amount:0);
        }
    })
    let amount =await  {
        'name':"Opening Balance Difference",
        "amount": Number(creditAmount)-Number(debitAmount),
        "debitAmount":debitAmount,
        "creditAmount":creditAmount
    }


    return amount;
}

exports.getOldPriceCurrentItem = async function (data, res) {
    try{
            let itemEnteriesVoucher, stockitemEnteriesVoucher = [];

            // ,{
            //     invoice_date: {
            //         [Op.gte]: data.start_date,
            //         [Op.lte]: data.end_date
            //     }
            // }
            itemEnteriesVoucher = await ItemInteries.findAll({
                where: {
                    [Op.and]: [{
                        [Op.or] :[
                            {
                                type: 'Purchase'
                           },
                           {
                                type: 'Debit'
                            }
                        ]
                    }, {
                        company_id:data.company_id
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            stockitemEnteriesVoucher = await itemStockVoucherEntries.findAll({
                where: {
                    [Op.and]: [{
                        type: 'Debit'
                    },{
                        company_id:data.company_id
                    }]
                },
                include: [{
                    model: Item,
                    as:"itemsone",
                    required: true,
                    where:{
                        company_id:data.company_id
                    }
                }],
                order: [
                    ['invoice_date', 'ASC']
                ]
            }).map((node) => node.get({
                plain: true
            }));

            let mainArray = []
            let itemArray = await Item.findAll({where:{
                company_id:data.company_id
            }})
            itemArray = await decreptionItem(itemArray, 'array', data.data.email);
            itemEnteriesVoucher = await decreptionItem(itemEnteriesVoucher, 'array', data.data.email);
            stockitemEnteriesVoucher = await decreptionItem(stockitemEnteriesVoucher, 'array', data.data.email);
            // purchaseVoucher = await decreptionItem(purchaseVoucher, 'array', data.data.email);
            // creditVoucher = await decreptionItem(creditVoucher, 'array', data.data.email);
            // debitVoucher = await decreptionItem(debitVoucher, 'array', data.data.email);

            // return {stockitemEnteriesVoucher:stockitemEnteriesVoucher, itemEnteriesVoucher:itemEnteriesVoucher}

            if(itemEnteriesVoucher.length>0){
                itemEnteriesVoucher.map((item)=>{
                    mainArray.push(item);
                })
            }

            if(stockitemEnteriesVoucher.length>0){
                stockitemEnteriesVoucher.map((item)=>{
                    item.itemone = item.itemsone
                    delete item.itemsone;
                    mainArray.push(item);
                })
            }

            let itemgroup = await itemArray.reduce((r, a) => {
                r[a.name] = [...r[a.name] || [], a];
                return r;
            }, {});  


            let group = mainArray.reduce((r, a) => {
                r[a.name] = [...r[a.name] || [], a];
                return r;
            }, {});

            let oldPrice = {};
            for (const [key, value] of Object.entries(group)) {
                let updatedata = await arraySort(value, 'updated_date') 
                oldPrice[key] = Number(updatedata[updatedata.length-1].price);
            }

            let availableKeys =await Object.keys(oldPrice);
            for (const [key, value] of Object.entries(itemgroup)) {
                let find = availableKeys.find(k => k==key);
                if(!find){
                    let updatedata = await arraySort(value, 'updated_date') 
                    oldPrice[key] =  Number(updatedata[updatedata.length-1].rate)?Number(updatedata[updatedata.length-1].rate):0;
                }
            }
            return oldPrice
            
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getTrailbalancfunction = async function(ledgerid, accountId, data, res){
    try {
        console.log("accountId", accountId)
        let Mainarray = await [];
        let query;
        let ledger = await Ledger.findAll({
            where: {
                [Op.and]: [
                    {account_group_id:accountId}, 
                    {company_id: data.company_id}
                ]
            },
            attributes:['id', 'uid', 'name', 'amount', 'opening_balance', 'account_group_id', 'sub_account_group_id'],
            include:[{
                model: AccountGroup
            },{
                model: SubAccountGroup
            },{
                model:JournalInteries,
                where:{
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                },
                required:false,
                attributes:['id', 'uid', 'type', 'invoice_date', 'amount', 'journa_voucher_id'],
                include:[
                    {
                        model: JournalVoucher,
                        required:false,
                        attributes: ['id', 'uid', 'total_amount', 'invoice_id', 'invoice_date'],
                        as: 'Voucher'
                    }
                ]
        }, {
            model:RecieptVoucher,
            as: 'Buyer',
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },{
            model:PaymentVoucher,
            as: 'PBuyer',
            required:false,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },
        {
            model:RecieptVoucher,
            as: 'RBuyer',
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },{
            model:PaymentVoucher,
            as: 'PRBuyer',
            required:false,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            attributes:['id', 'uid', 'total_amount', 'type', 'receive_type'],
        },
        {
            model:SaleVoucher,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
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
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }]
        },
        {
            model:SaleVoucher,
            as:"roundsales",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:PurchaseVoucher,
            as:"roundpurchase",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }]
        },
        {
            model:CreditVoucher,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
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
            model:ItemInteries,
            required:false,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            include:[
                {
                    model:SaleVoucher,
                    as:"ItemVouchers",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:PurchaseVoucher,
                    as:"ItemVoucherp",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:DebitVoucher,
                    as:"ItemVoucherd",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                },
                {
                    model:CreditVoucher,
                    as:"ItemVoucherc",
                    attributes:['uid', 'id', 'invoice_id', 'invoice_date', 'current_year', 'end_year']
                }
            ]
        },
        {
            model:VoucherInteries, as:'vocher_entries',
            required:false,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            attributes:['id', 'uid', 'amount', 'type', 'ledger_id']
        },{
            model:TaxInteries,as:'tax_entries',
            required:false,
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            attributes:['id', 'uid', 'amount', 'type', 'tax_ledger_id']
        },
        {
            model:SaleVoucher,
            as:"discountsales",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:PurchaseVoucher,
            as:"discountPurchases",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'roundoff_ledger_id', "roundoff_type", "roundoff_value", 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:CreditVoucher,
            as:"discountCredit",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        },
        {
            model:DebitVoucher,
            as:"discountDebit",
            where:{
                invoice_date: {
                    [Op.gte]: data.start_date,
                    [Op.lte]: data.end_date
                }
            },
            required:false,
            attributes:['id', 'uid', 'narration', 'sub_amount', 'total_amount', 'is_local', 'is_bank', 'discount', 'discount_type', 'discount_percentage', 'discount_ledger', 'buyer_ledger_id', 'invoice_id'],
            include:[{
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }]
        }
    ]
    }).map((node) => node.get({
        plain: true
    }));
   
    ledger = await decreptionReport(ledger, 'array', data.data.email);
   
    // return [ledger]
    if(ledger.length>0){
        let totalcalculate_openingblance =await {
            creditbalnce:0,
            debitbalnce:0,
            totalbalnce:0
        };
        // return [ledger]
        await ledger.map(async(item)=>{
            item.closeing_amount = 0;
            item.open_type = item.opening_balance; 
            item.name = item.name; 
            item.subAccount = item.sub_account_group?item.sub_account_group:{}; 
            item.account = item.account_group?item.account_group:{}; 
            item.accounttype = item.account_group && item.account_group.type=="dr"? 'debit':'credit';
            item.open_amount = item.amount ? Number(item.amount):item.amount;
            delete item.amount;delete item.opening_balance;delete item.sub_account_group;delete item.account_group;
            item.invoice_id = '';
            item.voucher_type = '';
            item.debitAmount = 0;
            item.creditAmount = 0;
            item.closeing_type = '';
            

            if(item.journal_entries.length>0){
                item.journal_entries.forEach(journal=>{
                   if (journal.type == 'debit' || journal.type == 'Debit') {
                        item.debitAmount =  Number(journal.amount)+Number(item.debitAmount);
                    } else {
                        item.creditAmount = Number(journal.amount)+Number(item.creditAmount);
                    }
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.Buyer.length>0){
                item.Buyer.forEach(reciept=>{
                    if (reciept.type == 'debit' || reciept.type == 'Debit') {
                        item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                    } else {
                        item.creditAmount = Number(reciept.total_amount)+Number(item.creditAmount);
                    }
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.PBuyer.length>0){
                item.PBuyer.forEach(payment=>{
                    if (payment.type == 'debit' || payment.type == 'Debit') {
                        item.debitAmount =  Number(payment.total_amount)+Number(item.debitAmount);
                    } else {
                        item.creditAmount = Number(payment.total_amount)+Number(item.creditAmount);
                    }
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.RBuyer.length>0){
                item.RBuyer.forEach(reciept=>{
                    item.debitAmount =  Number(reciept.total_amount)+Number(item.debitAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                })
            }
            if(item.PRBuyer.length>0){
                item.PRBuyer.forEach(payment=>{
                    item.creditAmount =  Number(payment.total_amount)+Number(item.creditAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.roundsales && item.roundsales.length>0){
                item.roundsales.forEach(sale=>{
                    if(sale.roundoff_ledger_id){
                        if(sale.roundoff_type=="debit" || sale.roundoff_type=="Debit"){
                            item.debitAmount =  Number(item.debitAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                        }else{
                            item.creditAmount =  Number(item.creditAmount)+Number(Number(sale.roundoff_value)>0?Number(sale.roundoff_value):-1*Number(sale.roundoff_value));
                        }
                        // if(item.debitAmount<0){
                        //     item.debitAmount = -1*Number(item.debitAmount)
                        // }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    }
                })
            }
            if(item.roundpurchase.length>0){
                item.roundpurchase.forEach(purchase=>{
                    if(purchase.roundoff_ledger_id){
                        if(purchase.roundoff_type=="debit" || purchase.roundoff_type=="Debit"){                            
                            item.debitAmount = Number(item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                        }else{
                            item.creditAmount =  Number(item.creditAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
                        }
                        // if(item.debitAmount<0){
                        //     item.debitAmount = -1*Number(item.debitAmount)
                        // }
                        item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                        // if(item.accounttype=="debit"){
                        //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                        // }else{
                        //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                        // }
                    }
                })
            }

            if((item.roundsales && item.roundsales.length<0) || item.roundpurchase.length<0){
                if(item.discountsales && item.discountsales.length>0){
                    item.discountsales.forEach(sale=>{
                        if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                            if(item.roundoff_ledger_id){
    
                            }else{
                                item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            }
                        }
                    })
                }
    
                if(item.discountPurchases && item.discountPurchases.length>0){
                    item.discountPurchases.forEach(sale=>{
                        if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                            if(item.roundoff_ledger_id){
    
                            }else{
                                item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            }
                        }
                       
                    })
                }
    
                if(item.discountCredit && item.discountCredit.length>0){
                    item.discountCredit.forEach(sale=>{
                        if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                            if(item.roundoff_ledger_id){
    
                            }else{
                                item.debitAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                item.creditAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            }
                        }
                    })
                }
    
                if(item.discountDebit && item.discountDebit.length>0){
                    item.discountDebit.forEach(sale=>{
                        if(item.name=="Round Off" || item.name=="round off"  || item.name=="Round Off"){
                            if(item.roundoff_ledger_id){
    
                            }else{
                                item.creditAmount = sale.discount && Number(sale.discount)<0 ? -1*Number(sale.discount)+Number(item.creditAmount):0+Number(item.creditAmount)
                                item.debitAmount = sale.discount && Number(sale.discount)>0 ? Number(sale.discount)+Number(item.debitAmount):0+Number(item.debitAmount)
                                item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                            }
                        }
                    })
                }
            }
            if(item.sales_vouchers && item.sales_vouchers.length>0){
                item.sales_vouchers.forEach(sale=>{
                    item.debitAmount =  Number(sale.total_amount)+Number(item.debitAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }

            if(item.purchase_vouchers.length>0){
                item.purchase_vouchers.forEach(purchase=>{
                    item.creditAmount =  Number(purchase.total_amount)+Number(item.creditAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }

         
            if(item.credit_vouchers.length>0){
                item.credit_vouchers.forEach(credit=>{
                    item.debitAmount =  Number(credit.total_amount)+Number(item.debitAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.debit_vouchers.length>0){
                item.debit_vouchers.forEach(debit=>{
                    item.debitAmount =  Number(debit.total_amount)+Number(item.debitAmount);
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }
            if(item.item_entries.length>0){
                item.item_entries.forEach(voucher=>{
                    if(voucher.ItemVouchers){
                        item.invoice_date = voucher.ItemVouchers.invoice_date;
                        item.invoice_id =voucher.ItemVouchers.invoice_id<=9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/00${voucher.ItemVouchers.invoice_id}`:voucher.ItemVouchers.invoice_id>9?`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/0${voucher.ItemVouchers.invoice_id}`:`${voucher.ItemVouchers.current_year.toString().substr(-2)+`-`+voucher.ItemVouchers.end_year.toString().substr(-2)}/${voucher.ItemVouchers.invoice_id}`;
                        item.voucher_type = 'sale';
                    }
                    if(voucher.ItemVoucherc){
                        item.invoice_date = voucher.ItemVoucherc.invoice_date;
                        item.invoice_id = voucher.ItemVoucherc.invoice_id<=9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/00${voucher.ItemVoucherc.invoice_id}`:voucher.ItemVoucherc.invoice_id>9?`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/0${voucher.ItemVoucherc.invoice_id}`:`${voucher.ItemVoucherc.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherc.end_year.toString().substr(-2)}/${voucher.ItemVoucherc.invoice_id}`;
                        item.voucher_type = 'credit';
                    }
                    if(voucher.ItemVoucherd){
                        item.invoice_date = voucher.ItemVoucherd.invoice_date;
                        item.invoice_id =voucher.ItemVoucherd.invoice_id<=9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/00${voucher.ItemVoucherd.invoice_id}`:voucher.ItemVoucherd.invoice_id>9?`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/0${voucher.ItemVoucherd.invoice_id}`:`${voucher.ItemVoucherd.current_year.toString().substr(-2)+`-`+voucher.ItemVoucherd.end_year.toString().substr(-2)}/${voucher.ItemVoucherd.invoice_id}`;
                        item.voucher_type = 'debit';
                    }
                    if(voucher.ItemVoucherp){
                        item.invoice_date = voucher.ItemVoucherp.invoice_date;
                        item.invoice_id = voucher.ItemVoucherp.invoice_id;
                        item.voucher_type = 'purchase';
                    }
                    if(voucher.type==="Sales" || voucher.type==="sales"){
                        item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                    }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
                        item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                    }else if(voucher.type==="Debit" || voucher.type==="Debit"){
                        item.debitAmount =  Number(voucher.total_amount)+Number(item.debitAmount);
                    }else if(voucher.type==="Credit" || voucher.type==="Credit"){
                        item.creditAmount =  Number(voucher.total_amount)+Number(item.creditAmount);
                    }

                    
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }

            // if(item.vocher_entries.length>0){
            //     item.vocher_entries.forEach(voucher=>{
            //         if(voucher.type==="Sales" || voucher.type==="sales"){
            //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
            //         }else if(voucher.type==="Purchase" || voucher.type==="purchase"){
            //             item.debitAmount =  Number(voucher.amount)+Number(item.creditAmount);
            //         }else if(voucher.type==="Debit" || voucher.type==="Debit"){
            //             item.debitAmount =  Number(voucher.amount)+Number(item.debitAmount);
            //         }else if(voucher.type==="Credit" || voucher.type==="Credit"){
            //             item.creditAmount =  Number(voucher.amount)+Number(item.creditAmount);
            //         }
            //         item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount))+Number(item.open_amount);
            //     })
            // }
            if(item.tax_entries.length>0){
                item.tax_entries.forEach(tax=>{
                    if(tax.type==="Sales" || tax.type==="sales"){
                        item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                    }else if(tax.type==="Purchase" || tax.type==="purchase"){
                        item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                    }else if(tax.type==="Debit" || tax.type==="debit"){
                        item.debitAmount =  Number(tax.amount)+Number(item.debitAmount);
                    }else if(tax.type==="Credit" || tax.type==="credit"){
                        item.creditAmount =  Number(tax.amount)+Number(item.creditAmount);
                    }
                    item.closeing_amount =  Number(Number(item.creditAmount)-Number(item.debitAmount));
                    // if(item.accounttype=="debit"){
                    //     item.closeing_amount = Number(item.open_amount)-Number(item.closeing_amount);
                    // }else{
                    //     item.closeing_amount = Number(item.open_amount)+Number(item.closeing_amount);
                    // }
                })
            }

           


            // if(item.open_type=="debit"){
            //     item.debitAmount = Number(item.debitAmount)+ item.open_amount;
            // }
            // if(item.open_type=="credit"){
            //     item.creditAmount = Number(item.creditAmount)+ item.open_amount;
            // }


            if(item.open_type === "debit"){
                item.closeing_amount = Number(item.closeing_amount)-Number(item.open_amount);
                if(item.closeing_amount<0){
                    item.closeing_amount = -1*Number(item.closeing_amount)
                }
                item.closeing_type = 'debit';
                item.accounttype =  item.closeing_type
            }


            if(item.open_type === "credit"){
                item.closeing_amount = Number(item.closeing_amount)+Number(item.open_amount);
                if(item.closeing_amount<0){
                    item.closeing_amount = -1*Number(item.closeing_amount)
                }
                item.closeing_type = 'credit';
                item.accounttype =  item.closeing_type
            }

            delete item.journal_entries;
            delete item.reciept_vouchers;
            delete item.payment_vouchers;
            delete item.sales_vouchers;
            delete item.purchase_vouchers;
            delete item.credit_vouchers;
            delete item.debit_vouchers;
            delete item.item_entries;
            delete item.vocher_entries;
            delete item.tax_entries;
            delete item.Buyer;
            delete item.PBuyer;
            delete item.PRBuyer;
            delete item.RBuyer;
        })
        let returngroup = await groupFuncation(ledger);
        // return [returngroup]
        let sb = [];
        if(returngroup){
            await Object.keys(returngroup).map(function (item) {
            //    console.log(returngroup, " == = = = =")
                if(item==="MainGroup"){
                    if(returngroup[item].length>0){
                        let a = {
                            name:returngroup[item][0].account.name,
                            ledger_id:returngroup[item][0].uid,
                            open_amount:0,
                            closeing_amount:0,
                            closeing_type:'',
                            sub_uid:'',
                            account_group_id:'',
                            subAccount:{},
                            accounttype:'debit',
                            debitAmount:0,
                            creditAmount:0,
                            ishead:true,
                            ismain:true,
                            issub:false,
                        };
                        let b = [];
                        returngroup[item].map(element=>{
                            if(element.open_type=="credit"){
                                a.open_amount = Number(a.open_amount)+Number(element.open_amount?element.open_amount:0);
                            }else{
                                a.open_amount = Number(a.open_amount)-Number(element.open_amount?element.open_amount:0);
                                if(a.open_amount<0){
                                    // a.open_amount = -1*Number(a.open_amount)
                                    a.open_type = "debit"
                                }
                            }
                            // a.open_amount = Number(a.open_amount)+Number(element.open_amount?element.open_amount:0);
                            a.subAccount = {};
                            element.name = element.name.toLowerCase();
                            element.main = "true";
                            a.closeing_amount = Number(a.closeing_amount?a.closeing_amount:0)+Number(element.closeing_amount?element.closeing_amount:0);
                            a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount?element.debitAmount:0);
                            a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount?element.creditAmount:0);
                            a.account_group_id = element.account_group_id;   
                            if(element.open_type=="credit"){
                                if(element.open_type==element.accounttype){
                                    if(Number(Number(element.creditAmount)+Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                        element.accounttype = 'credit';
                                    }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)+Number(Number(element.open_amount)))){
                                        element.accounttype = 'debit';
                                    }
                                }else{
                                    if(Number(Number(element.creditAmount)-Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                        element.accounttype = 'credit';
                                    }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)-Number(Number(element.open_amount)))){
                                        element.accounttype = 'debit';
                                    }
                                }
                            }else{
                                if(element.open_type==element.accounttype){
                                    if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                        element.accounttype = 'credit';
                                    }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                        element.accounttype = 'debit';
                                    }
                                }else{
                                    if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                        element.accounttype = 'credit';
                                    }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                        element.accounttype = 'debit';
                                    }
                                }
                            }
                            // a.closeing_amount = Number(element.closeing_amount?element.closeing_amount:0)+Number(Number(b.length>0?b[b.length-1].closeing_amount:0));
                            b.push(element);
                            b.sort((a, c) =>
                                a.name.localeCompare(c.name)//using String.prototype.localCompare()
                            );
                        })
                        
                        if(Number(a.creditAmount)>Number(a.debitAmount)){
                            a.accounttype = 'credit';
                            a.open_type = 'credit';
                            a.closeing_amount = Number(a.creditAmount)-Number(a.debitAmount);
                        }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                            a.accounttype = 'debit';
                            a.open_type = 'debit';
                            a.closeing_amount = Number(a.debitAmount)-Number(a.creditAmount);
                        }
                        b.unshift(a);
                        Mainarray = Mainarray.concat(b);
                    }
                }else{
                    let a = {
                        name:returngroup[item][0].subAccount.name,
                        ledger_id:returngroup[item][0].uid,
                        open_amount:0,
                        closeing_amount:0,
                        closeing_type:'',
                        sub_uid:'',
                        account_group_id:'',
                        subAccount:{},
                        accounttype:'debit',
                        debitAmount:0,
                        creditAmount:0,
                        ishead:false,
                        ismain:false,
                        issub:true,
                    };
                
                    returngroup[item].map(element=>{
                        if(element.open_type=="credit"){
                            a.open_amount = Number(a.open_amount)+Number(element.open_amount?element.open_amount:0);
                        }else{
                            a.open_amount = Number(a.open_amount)-Number(element.open_amount?element.open_amount:0);
                            if(a.open_amount<0){
                                a.open_amount = -1*Number(a.open_amount)
                                a.open_type = "debit"
                            }
                        }
                        a.subAccount = {};
                        element.sub = "true";
                        a.closeing_amount = Number(a.closeing_amount?a.closeing_amount:0)+Number(element.closeing_amount?element.closeing_amount:0);
                        a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount?element.debitAmount:0);
                        a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount?element.creditAmount:0);
                        a.account_group_id = element.account_group_id;  
                        element.name = element.name.toLowerCase(); 
                        if(element.open_type=="credit"){
                            if(element.open_type==element.accounttype){
                                if(Number(Number(element.creditAmount)+Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                    element.accounttype = 'credit';
                                }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)+Number(Number(element.open_amount)))){
                                    element.accounttype = 'debit';
                                }
                            }else{
                                if(Number(Number(element.creditAmount)-Number(Number(element.open_amount)))>Number(element.debitAmount)){
                                    element.accounttype = 'credit';
                                }else if(Number(element.debitAmount)>Number(Number(element.creditAmount)-Number(Number(element.open_amount)))){
                                    element.accounttype = 'debit';
                                }
                            }
                        }else{
                            if(element.open_type==element.accounttype){
                                if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                    element.accounttype = 'credit';
                                }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                    element.accounttype = 'debit';
                                }
                            }else{
                                if(Number(element.creditAmount)>Number(Number(element.debitAmount)+Number(element.open_amount))){
                                    element.accounttype = 'credit';
                                }else if(Number(Number(element.debitAmount)+Number(element.open_amount))>Number(element.creditAmount)){
                                    element.accounttype = 'debit';
                                }
                            }
                        }
                        // a.closeing_amount = Number(element.closeing_amount?element.closeing_amount:0)+Number(Number(b.length>0?b[b.length-1].closeing_amount:0));
                        sb.push(element);

                        sb.sort((a, b) =>
                            a.name.localeCompare(b.name)//using String.prototype.localCompare()
                        );
                    })
                    if(Number(a.creditAmount)>Number(a.debitAmount)){
                        a.accounttype = 'credit';
                        a.open_type = 'credit';
                        a.closeing_amount = Number(a.creditAmount)-Number(a.debitAmount);
                    }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                        a.accounttype = 'debit';
                        a.open_type = 'debit';
                        a.closeing_amount = Number(a.debitAmount)-Number(a.creditAmount);
                    }
                    sb.unshift(a);
                    // Mainarray = Mainarray.concat(b);
                }
            });
        }
        
       
        // return Mainarray;
        if(Mainarray.length>0){
            let opendebittatal = 0
            let opencredittatal = 0
            let credittatal = 0
            let debittatal = 0
            let closingdebittatal = 0
            let closingcredittatal = 0
            // Mainarray = await arraySort(Mainarray, 'name')
            if(await sb.length>0){
                // sb = await arraySort(sb, 'name')
                Mainarray = await Mainarray.concat(sb);
            }
            await Mainarray.map((item)=>{
                if(item.ishead && item.ismain && !item.issub){
                    
                }else if(!item.ishead && !item.ismain && item.issub){
                        // console.log("item.issub", item.issub)
                }else{
                    debittatal = Number(debittatal)+Number(item.debitAmount);
                    credittatal = Number(credittatal)+Number(item.creditAmount);
                    if(item.open_type=="debit"){
                        opendebittatal = Number(opendebittatal)+Number(item.open_amount);
                    }else{
                        opencredittatal = Number(opencredittatal)+Number(item.open_amount);
                    }
                    if(item.accounttype=="debit"){
                        closingdebittatal = Number(closingdebittatal)+Number(item.closeing_amount);
                    }else{
                        closingcredittatal = Number(closingcredittatal)+Number(item.closeing_amount)
                    }
                }
            })
        
            let findLedgerType = await Ledger.findOne({where:{uid:Mainarray[0].ledger_id}});
            let findCompany = await Company.findOne({where:{uid:data.company_id}});
            findLedgerType = await decreption(findLedgerType, 'object', data.data.email);
            if(Number(opencredittatal)>Number(opendebittatal)){
                Mainarray[0].open_type = Number(opendebittatal)==0?findLedgerType.opening_balance:'credit';
                Mainarray[0].open_amount = Number(opencredittatal)-Number(opendebittatal);
                Mainarray[0].closeing_amount = Number(Mainarray[0].creditAmount)+Number(Number(opencredittatal)-Number(opendebittatal));
            }else{
                Mainarray[0].open_type = Number(opencredittatal)==0?findLedgerType.opening_balance:'debit'
                Mainarray[0].open_amount = Number(opendebittatal)-Number(opencredittatal);
                Mainarray[0].closeing_amount = Number(Mainarray[0].debitAmount)+Number(Number(opendebittatal)-Number(opencredittatal));
            }   
        
            if(Number(closingcredittatal)>Number(closingdebittatal)){
                Mainarray[0].accounttype = 'credit';
                Mainarray[0].closeing_amount = Number(closingcredittatal)-Number(closingdebittatal);
            }else{
                Mainarray[0].accounttype = 'debit'
                Mainarray[0].closeing_amount = Number(closingdebittatal)-Number(closingcredittatal);
            }
        
            if(await checkValid(Mainarray[0].account_group_id)){
                totalcalculate_openingblance = await getAllGroupVouchercurrent(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);
                if(totalcalculate_openingblance.totalbalnce!=0){
                    if(totalcalculate_openingblance.totalbalnce<0){
                        Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                    }else{
                        Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                    }
                }else{
                    Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                }
                // Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);
                if(Mainarray[0].accounttype=='debit'){
                    if(Mainarray[0].closeing_amount<0){
                        Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    }
                }
                if(Mainarray[0].accounttype=='credit'){
                    if(Mainarray[0].closeing_amount<0){
                        Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    }
                }
            }else{
                totalcalculate_openingblance = await getAllGroupVoucherprivious(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);
        
                console.log("totalcalculate_openingblance", totalcalculate_openingblance)
        
                if(totalcalculate_openingblance.totalbalnce!=0){
                    if(totalcalculate_openingblance.totalbalnce<0){
                        // if(Mainarray[0].open_type=="debit"){
                            // Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                        // }
                        if(Mainarray[0].open_type=="debit"){
                            Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                            if(Number(Mainarray[0].closeing_amount)<0){
                                Mainarray[0].accounttype = "debit"
                                Mainarray[0].closeing_amount  = -1*Number(Mainarray[0].closeing_amount);
                            }else{
                                Mainarray[0].accounttype = "credit"
                            }
                        }else{
                            Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                            if(Number(Mainarray[0].closeing_amount)<0){
                                Mainarray[0].accounttype = "debit"
                                Mainarray[0].closeing_amount  = -1*Number(Mainarray[0].closeing_amount);
                            }else{
                                Mainarray[0].accounttype = "credit"
                            }
                        }
                        
                    }else{
                        if(Mainarray[0].open_type=="debit"){
                            Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                            if(Number(Mainarray[0].closeing_amount)<0){
                                Mainarray[0].accounttype = "debit"
                                Mainarray[0].closeing_amount  = -1*Number(Mainarray[0].closeing_amount);
                            }else{
                                Mainarray[0].accounttype = "credit"
                            }
                        }else{
                            Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                            if(Number(Mainarray[0].closeing_amount)<0){
                                Mainarray[0].accounttype = "debit"
                                Mainarray[0].closeing_amount  = -1*Number(Mainarray[0].closeing_amount);
                            }else{
                                Mainarray[0].accounttype = "credit"
                            }
                        }
                        // Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                    }
                }else{
                    Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                }
                // Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);
                if(Mainarray[0].accounttype=='debit'){
                    if(Mainarray[0].closeing_amount<0){
                        Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    }
                }
                if(Mainarray[0].accounttype=='credit'){
                    if(Mainarray[0].closeing_amount<0){
                        Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    }
                }
                
            }

            // let sortMainArray = [];
            // let sortSubArray = [];
            // Mainarray.forEach((el)=>{
            //     if(el.main=="true"){
            //         sortMainArray.push(el)
            //     }else if(el.sub == "true"){
            //         sortSubArray.push(el)
            //     }else{

            //     }
            // })

             return Mainarray
            }else{
                return []
            }
        }else{
            return []
        }
    } catch (e) {
        return []
    }
}





