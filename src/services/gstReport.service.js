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
import "@babel/polyfill"
import Item from '../models/items';
import path from 'path';

var xl = require('excel4node');


async function getB2bledger(data){
    let b2b =[];
    let b2c = [];
    let items = [];
    let taxs = [];
    if(data.length>0){
        data.forEach((item)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }
            if(item.SalesLedger && item.SalesLedger.gst_number){
                item.ledger = item.SalesLedger;
                b2b.push(item);
                delete  item.SalesLedger;
            }else{
                item.ledger = item.SalesLedger;
                b2c.push(item);
                delete  item.SalesLedger;
            }
            
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
        // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
    }
    return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
}

async function getB2bledgersummary(data, cdata, ddata){
    let b2b =[];
    let b2bcess =[];
    let b2ccess =[];
    let b2cdnrcess =[];
    let b2cdnurcess =[];
    let b2c = [];
    let items = [];
    let taxs = [];
    let localtaxAmount = 0
    let taxAmount = 0
    let cdnr =[];
    let cdnur = [];  
    let itemnilrate = [];
    if(data.length>0){
        data.forEach((item)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }

            if(item.SalesLedger && item.SalesLedger.gst_number){
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2bcess.push(el.itemone)
                        }
                        if(el.igst_tax!='0' || el.igst_tax!=="0"){
                            item.ledger = item.SalesLedger;
                            delete  item.SalesLedger;
                            b2b.push(item);
                        }
                    })
                   
                }
               
            }else{
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2ccess.push(el.itemone)
                        }
                        if(el.igst_tax!='0' || el.igst_tax!=="0"){
                            item.ledger = item.SalesLedger;
                            delete item.SalesLedger;
                            b2c.push(item);
                        }
                    })
                    
                }
              
            }

            if(item.item_entries && item.item_entries.length>0){
                item.item_entries.forEach(el=>{
                    if(el.igst_tax=='0' || el.igst_tax==='0'){
                        itemnilrate.push(el)
                    }
                })
            }
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
    }

    if(cdata.length>0){
        cdata.forEach((item, index)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }
            if(item.CreditBuyer && item.CreditBuyer.gst_number){
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2cdnrcess.push(el.itemone)
                        }
                    })
                }
                item.ledger = item.CreditBuyer;
                delete  item.CreditBuyer;
                cdnr.push(item);
            }else{
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2cdnurcess.push(el.itemone)
                        }
                    })
                }
                item.ledger = item.CreditBuyer;
                delete  item.CreditBuyer;
                cdnur.push(item);
            }
            if(item.item_entries && item.item_entries.length>0){
                item.item_entries.forEach(el=>{
                    if(el.igst_tax=='0' || el.igst_tax==='0'){
                        itemnilrate.push(el)
                    }
                })
            }
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
    }


    let b2bObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let b2cObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let cdnrObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let cdnurObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let nilObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let total = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        tax_amount:0,
        invoice_amount:0,
    };

    if(b2c.length>0){
        b2cObject.voucher_count = b2c.length;
        b2cObject.cess_amount = 0;
        total.voucher_count = Number(total.voucher_count)+Number(b2cObject.voucher_count);
        await b2c.forEach((element) => {
            if(element.is_local=="yes"){
                b2cObject.cgst_amount =Number(b2cObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                b2cObject.sgst_amount =Number(b2cObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                b2cObject.igst_amount =Number(b2cObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                b2cObject.taxable_value = Number(b2cObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2cObject.tax_amount = Number(b2cObject.igst_amount)+Number(b2cObject.cgst_amount)+Number(b2cObject.sgst_amount);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount)+Number(b2cObject.taxable_value);
        });
        if(b2ccess.length>0){
            await b2ccess.forEach((element) => {
                b2cObject.cess_amount = Number(b2cObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(b2cObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)+Number(b2cObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)+Number(b2cObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)+Number(b2cObject.cgst_amount);
        total.tax_amount = Number(total.tax_amount)+Number(b2cObject.tax_amount);
        total.sgst_amount = Number(total.sgst_amount)+Number(b2cObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)+Number(b2cObject.igst_amount);
    }
    if(b2b.length>0){
        b2bObject.voucher_count = b2b.length;
        b2bObject.cess_amount = 0;
        total.voucher_count = Number(total.voucher_count)+Number(b2bObject.voucher_count);
        await b2b.forEach((element) => {
            if(element.is_local=="yes"){
                b2bObject.cgst_amount =Number(b2bObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                b2bObject.sgst_amount =Number(b2bObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                b2bObject.igst_amount =Number(b2bObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                b2bObject.taxable_value = Number(b2bObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2bObject.tax_amount = Number(b2bObject.igst_amount)+Number(b2bObject.cgst_amount)+Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount)+Number(b2bObject.taxable_value);
        });
        if(b2bcess.length>0){
            await b2bcess.forEach((element) => {
                b2bObject.cess_amount = Number(b2bObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(b2bObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)+Number(b2bObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)+Number(b2bObject.invoice_amount);
        total.tax_amount = Number(total.tax_amount)+Number(b2bObject.tax_amount);
        total.cgst_amount = Number(total.cgst_amount)+Number(b2bObject.cgst_amount);
        total.sgst_amount = Number(total.sgst_amount)+Number(b2bObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)+Number(b2bObject.igst_amount);
    }

    if(cdnr.length>0){
        cdnrObject.voucher_count = cdnr.length;
        total.voucher_count = Number(total.voucher_count)+Number(cdnrObject.voucher_count);
        cdnrObject.cess_amount = 0;
        await cdnr.forEach((element) => {
            if(element.is_local=="yes"){
                cdnrObject.cgst_amount =Number(cdnrObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                cdnrObject.sgst_amount =Number(cdnrObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                cdnrObject.igst_amount =Number(cdnrObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                cdnrObject.taxable_value = Number(cdnrObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount)+Number(cdnrObject.cgst_amount)+Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount)+Number(cdnrObject.taxable_value);
        });
        if(b2cdnrcess.length>0){
            await b2cdnrcess.forEach((element) => {
                cdnrObject.cess_amount = Number(cdnrObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(cdnrObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)-Number(cdnrObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)-Number(cdnrObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)-Number(cdnrObject.cgst_amount);
        total.tax_amount = Number(total.tax_amount)-Number(cdnrObject.tax_amount);
        total.sgst_amount = Number(total.sgst_amount)-Number(cdnrObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)-Number(cdnrObject.igst_amount);
    }
    if(cdnur.length>0){
        cdnurObject.voucher_count = cdnur.length;
        total.voucher_count = Number(total.voucher_count)+Number(cdnurObject.voucher_count);
        cdnurObject.cess_amount = 0;
        await cdnur.forEach((element) => {
            if(element.is_local=="yes"){
                cdnurObject.cgst_amount =Number(cdnurObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                cdnurObject.sgst_amount =Number(cdnurObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                cdnurObject.igst_amount =Number(cdnurObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                cdnurObject.taxable_value = Number(cdnurObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            cdnurObject.tax_amount = Number(cdnurObject.igst_amount)+Number(cdnurObject.cgst_amount)+Number(cdnurObject.sgst_amount);
            cdnurObject.invoice_amount = Number(cdnurObject.tax_amount)+Number(cdnurObject.taxable_value);
            
        });

        if(b2cdnurcess.length>0){
            await b2cdnurcess.forEach((element) => {
                cdnurObject.cess_amount = Number(cdnurObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(cdnurObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)-Number(cdnurObject.taxable_value);
        total.tax_amount = Number(total.tax_amount)-Number(cdnurObject.tax_amount);
        total.invoice_amount = Number(total.invoice_amount)-Number(cdnurObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)-Number(cdnurObject.cgst_amount);
        total.sgst_amount = Number(total.sgst_amount)-Number(cdnurObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)-Number(cdnurObject.igst_amount);
    }

    if(itemnilrate.length>0){
        // nilObject.voucher_count = itemnilrate.length;
        total.voucher_count = Number(total.voucher_count)+Number(nilObject.voucher_count);
        nilObject.cess_amount = 0;
        await itemnilrate.forEach((element) => {
            nilObject.taxable_value = Number(nilObject.taxable_value)+Number(Number(element.quantity)*Number(element.price));
            nilObject.invoice_amount = Number(nilObject.taxable_value);

            

            // total.invoice_amount = Number(total.invoice_amount)+Number(nilObject.invoice_amount);
            // total.tax_amount = Number(total.tax_amount)+Number(nilObject.tax_amount);
            // total.cgst_amount = Number(total.cgst_amount)+Number(cdnurObject.cgst_amount);
            // total.sgst_amount = Number(total.sgst_amount)+Number(cdnurObject.sgst_amount);
            // total.igst_amount = Number(total.igst_amount)+Number(cdnurObject.igst_amount);
        });
        total.taxable_value = Number(total.taxable_value)+Number(nilObject.taxable_value);
    }
    // console.log("{b2b:b2b, b2c:b2c, items:items, taxs:taxs}", {b2b:b2bObject, b2c:b2cObject, cdnr:cdnrObject, cdnur:cdnurObject, items:items, taxs:taxs})
    return {b2b:b2bObject, b2c:b2cObject, cdnr:cdnrObject, cdnur:cdnurObject, nilObject:nilObject, total:total}
}

async function getB2bledgerPurchasesummary(data, cdata, ddata){
    let b2b =[];
    let b2bcess =[];
    let b2ccess =[];
    let b2cdnrcess =[];
    let b2cdnurcess =[];
    let b2c = [];
    let items = [];
    let taxs = [];
    let localtaxAmount = 0
    let taxAmount = 0
    let cdnr =[];
    let cdnur = [];  
    let itemnilrate = [];
    if(data.length>0){
        data.forEach((item)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }
            if(item.PurchaseLedger && item.PurchaseLedger.gst_number){
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2bcess.push(el.itemone)
                        }
                        if(el.igst_tax!='0' || el.igst_tax!=="0"){
                            item.ledger = item.PurchaseLedger;
                            b2b.push(item);
                            delete  item.PurchaseLedger;
                        }
                    })
                }
            }else{
                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            b2ccess.push(el.itemone)
                        }
                        if(el.igst_tax!='0' || el.igst_tax!=="0"){
                            item.ledger = item.PurchaseLedger;
                            b2c.push(item);
                            delete  item.PurchaseLedger;
                        }
                    })
                }
            }
            if(item.item_entries && item.item_entries.length>0){
                item.item_entries.forEach(el=>{
                    if(el.igst_tax=='0' || el.igst_tax==="0"){
                        itemnilrate.push(el)
                    }
                })
            }
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
        // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
    }

    if(ddata.length>0){
        // cdata.forEach((item, index)=>{
        //     if(item.tax_entries && item.tax_entries.length>0){
        //         item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
        //             return prev + Number(cur.amount);
        //           }, 0);
        //     }else{
        //         item.taxAmount = 0;
        //     }
        //     if(item.CreditBuyer && item.CreditBuyer.gst_number){
        //         if(item.item_entries && item.item_entries.length>0){
        //             item.item_entries.forEach(el=>{
        //                 if(el.itemone && el.itemone.cess){
        //                     b2cdnrcess.push(el.itemone)
        //                 }
        //             })
        //         }
        //         item.ledger = item.CreditBuyer;
        //         delete  item.CreditBuyer;
        //         cdnr.push(item);
        //     }else{
        //         if(item.item_entries && item.item_entries.length>0){
        //             item.item_entries.forEach(el=>{
        //                 if(el.itemone && el.itemone.cess){
        //                     b2cdnurcess.push(el.itemone)
        //                 }
        //             })
        //         }
        //         item.ledger = item.CreditBuyer;
        //         delete  item.CreditBuyer;
        //         cdnur.push(item);
        //     }
        //     if(item.item_entries && item.item_entries.length>0){
        //         item.item_entries.forEach(el=>{
        //             if(el.igst_tax=='0' || el.igst_tax==='0'){
        //                 itemnilrate.push(el)
        //             }
        //         })
        //     }
        //     if(item.item_entries && item.item_entries.length>0){
        //         items = items.concat(item.item_entries);
        //     }
        //     if(item.tax_entries && item.tax_entries.length>0){
        //         taxs = taxs.concat(item.tax_entries);
        //     }
        // }) 
        ddata.forEach((item, index)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }
            if(item.DebitBuyer && item.DebitBuyer.gst_number){
                item.ledger = item.DebitBuyer;
                delete  item.DebitBuyer;
                cdnr.push(item);
            }else{
                item.ledger = item.DebitBuyer;
                delete  item.DebitBuyer;
                cdnur.push(item);
            }
            if(item.item_entries && item.item_entries.length>0){
                item.item_entries.forEach(el=>{
                    if(el.igst_tax=='0' || el.igst_tax==='0'){
                        itemnilrate.push(el)
                    }
                })
            }
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
    }


    let b2bObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let b2cObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let cdnrObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let cdnurObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let nilObject = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let total = {
        voucher_count:0,
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        tax_amount:0,
        invoice_amount:0,
    };

    if(b2c.length>0){
        b2cObject.voucher_count = b2c.length;
        b2cObject.cess_amount = 0;
        total.voucher_count = Number(total.voucher_count)+Number(b2cObject.voucher_count);
        await b2c.forEach((element) => {
            if(element.is_local=="yes"){
                b2cObject.cgst_amount =Number(b2cObject.cgst_amount?b2cObject.cgst_amount:0)+Number(element.taxAmount?Number(element.taxAmount)/2:0);
                b2cObject.sgst_amount =Number(b2cObject.sgst_amount?b2cObject.sgst_amount:0)+Number(element.taxAmount?Number(element.taxAmount)/2:0);
            }else{
                b2cObject.igst_amount =Number(b2cObject.igst_amount?b2cObject.igst_amount:0)+Number(element.taxAmount?element.taxAmount:0);
            }
            element.item_entries.map(el=>{
                b2cObject.taxable_value = Number(b2cObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2cObject.tax_amount = Number(b2cObject.igst_amount?b2cObject.igst_amount:0)+Number(b2cObject.cgst_amount?b2cObject.cgst_amount:0)+Number(b2cObject.sgst_amount?b2cObject.sgst_amount:0);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount?b2cObject.tax_amount:0)+Number(b2cObject.taxable_value?b2cObject.taxable_value:0);
        });
        if(b2ccess.length>0){
            await b2ccess.forEach((element) => {
                b2cObject.cess_amount = Number(b2cObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(b2cObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)+Number(b2cObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)+Number(b2cObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)+Number(b2cObject.cgst_amount);
        total.tax_amount = Number(total.tax_amount)+Number(b2cObject.tax_amount);
        total.sgst_amount = Number(total.sgst_amount)+Number(b2cObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)+Number(b2cObject.igst_amount);
    }
    if(b2b.length>0){
        b2bObject.voucher_count = b2b.length;
        b2bObject.cess_amount = 0;
        total.voucher_count = Number(total.voucher_count)+Number(b2bObject.voucher_count);
        await b2b.forEach((element) => {
            if(element.is_local=="yes"){
                b2bObject.cgst_amount =Number(b2bObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                b2bObject.sgst_amount =Number(b2bObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                b2bObject.igst_amount =Number(b2bObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                b2bObject.taxable_value = Number(b2bObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2bObject.tax_amount = Number(b2bObject.igst_amount)+Number(b2bObject.cgst_amount)+Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount)+Number(b2bObject.taxable_value);
        });
        if(b2bcess.length>0){
            await b2bcess.forEach((element) => {
                b2bObject.cess_amount = Number(b2bObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(b2bObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)+Number(b2bObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)+Number(b2bObject.invoice_amount);
        total.tax_amount = Number(total.tax_amount)+Number(b2bObject.tax_amount);
        total.cgst_amount = Number(total.cgst_amount)+Number(b2bObject.cgst_amount);
        total.sgst_amount = Number(total.sgst_amount)+Number(b2bObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)+Number(b2bObject.igst_amount);
    }

    if(cdnr.length>0){
        cdnrObject.voucher_count = cdnr.length;
        total.voucher_count = Number(total.voucher_count)+Number(cdnrObject.voucher_count);
        cdnrObject.cess_amount = 0;
        await cdnr.forEach((element) => {
            if(element.is_local=="yes"){
                cdnrObject.cgst_amount =Number(cdnrObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                cdnrObject.sgst_amount =Number(cdnrObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                cdnrObject.igst_amount =Number(cdnrObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                cdnrObject.taxable_value = Number(cdnrObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount)+Number(cdnrObject.cgst_amount)+Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount)+Number(cdnrObject.taxable_value);
        });
        if(b2cdnrcess.length>0){
            await b2cdnrcess.forEach((element) => {
                cdnrObject.cess_amount = Number(cdnrObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(cdnrObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)-Number(cdnrObject.taxable_value);
        total.invoice_amount = Number(total.invoice_amount)-Number(cdnrObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)-Number(cdnrObject.cgst_amount);
        total.tax_amount = Number(total.tax_amount)-Number(cdnrObject.tax_amount);
        total.sgst_amount = Number(total.sgst_amount)-Number(cdnrObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)-Number(cdnrObject.igst_amount);
    }
    if(cdnur.length>0){
        cdnurObject.voucher_count = cdnur.length;
        total.voucher_count = Number(total.voucher_count)+Number(cdnurObject.voucher_count);
        cdnurObject.cess_amount = 0;
        await cdnur.forEach((element) => {
            if(element.is_local=="yes"){
                cdnurObject.cgst_amount =Number(cdnurObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                cdnurObject.sgst_amount =Number(cdnurObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                cdnurObject.igst_amount =Number(cdnurObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                cdnurObject.taxable_value = Number(cdnurObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            cdnurObject.tax_amount = Number(cdnurObject.igst_amount)+Number(cdnurObject.cgst_amount)+Number(cdnurObject.sgst_amount);
            cdnurObject.invoice_amount = Number(cdnurObject.tax_amount)+Number(cdnurObject.taxable_value);
            
        });

        if(b2cdnurcess.length>0){
            await b2cdnurcess.forEach((element) => {
                cdnurObject.cess_amount = Number(cdnurObject.cess_amount)+Number(element.cess_tax);
                total.cess_amount = Number(total.cess_amount)+Number(cdnurObject.cess_amount);
            });
        }
        total.taxable_value = Number(total.taxable_value)-Number(cdnurObject.taxable_value);
        total.tax_amount = Number(total.tax_amount)-Number(cdnurObject.tax_amount);
        total.invoice_amount = Number(total.invoice_amount)-Number(cdnurObject.invoice_amount);
        total.cgst_amount = Number(total.cgst_amount)-Number(cdnurObject.cgst_amount);
        total.sgst_amount = Number(total.sgst_amount)-Number(cdnurObject.sgst_amount);
        total.igst_amount = Number(total.igst_amount)-Number(cdnurObject.igst_amount);
    }

    if(itemnilrate.length>0){
        nilObject.voucher_count = itemnilrate.length;
        total.voucher_count = Number(total.voucher_count)+Number(nilObject.voucher_count);
        nilObject.cess_amount = 0;
        await itemnilrate.forEach((element) => {
            nilObject.taxable_value = Number(nilObject.taxable_value)+Number(Number(element.quantity)*Number(element.price));
            nilObject.invoice_amount = Number(nilObject.taxable_value);

            // total.invoice_amount = Number(total.invoice_amount)+Number(nilObject.invoice_amount);
            // total.tax_amount = Number(total.tax_amount)+Number(nilObject.tax_amount);
            // total.cgst_amount = Number(total.cgst_amount)+Number(cdnurObject.cgst_amount);
            // total.sgst_amount = Number(total.sgst_amount)+Number(cdnurObject.sgst_amount);
            // total.igst_amount = Number(total.igst_amount)+Number(cdnurObject.igst_amount);
        });
        total.taxable_value = Number(total.taxable_value)+Number(nilObject.taxable_value);
    }
    // console.log("{b2b:b2b, b2c:b2c, items:items, taxs:taxs}", {b2b:b2bObject, b2c:b2cObject, cdnr:cdnrObject, cdnur:cdnurObject, items:items, taxs:taxs})
    return {b2b:b2bObject, b2c:b2cObject, cdnr:cdnrObject, cdnur:cdnurObject, nilObject:nilObject, total:total}
}

async function getB2bledgerPurchase(data){
    let b2b =[];
    let b2c = [];
    let items = [];
    let taxs = [];
    if(data.length>0){
        data.forEach((item)=>{
            if(item.tax_entries && item.tax_entries.length>0){
                item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                    return prev + Number(cur.amount);
                  }, 0);
            }else{
                item.taxAmount = 0;
            }
            if(item.PurchaseLedger && item.PurchaseLedger.gst_number){
                item.ledger = item.PurchaseLedger;
                b2b.push(item);
                delete  item.PurchaseLedger;
            }else {
                item.ledger = item.PurchaseLedger;
                b2c.push(item);
                delete  item.PurchaseLedger;
            }
            if(item.item_entries && item.item_entries.length>0){
                items = items.concat(item.item_entries);
            }
            if(item.tax_entries && item.tax_entries.length>0){
                taxs = taxs.concat(item.tax_entries);
            }
        }) 
        // return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
    }
    return {b2b:b2b, b2c:b2c, items:items, taxs:taxs}
}

async function getCreditDebit(credit, debit){
    let cdnr =[];
    let cdnur = [];  
    if(credit.length>0 || debit.length>0){
        credit.forEach((item, index)=>{
            if(item.CreditBuyer && item.CreditBuyer.gst_number){
                item.ledger = item.CreditBuyer;
                delete  item.CreditBuyer;
                cdnr.push(item);
            }else{
                item.ledger = item.CreditBuyer;
                delete  item.CreditBuyer;
                cdnur.push(item);
            }
        }) 
        debit.forEach((item, index)=>{
            if(item.DebitBuyer && item.DebitBuyer.gst_number){
                item.ledger = item.DebitBuyer;
                delete  item.DebitBuyer;
                cdnr.push(item);
            }else{
                item.ledger = item.DebitBuyer;
                delete  item.DebitBuyer;
                cdnur.push(item);
            }
        }) 
    }
    return {cdnr:cdnr, cdnur:cdnur} 
}

async function getSaleDocs(array){
    let docs = [];
    await array.forEach(async (item)=>{
        delete item.ledger;
        delete item.item_entries
        delete item.tax_entries
        item.type = 'credit';
        item.voucher_number = await item ? item.id : '';
        item.invoiceId =  await item.invoice_id<=9?`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/${item.invoice_id}`;
        docs.push(item);
    })
    return docs;
}

async function getPurchaseDocs(array){
    let docs = [];
    await array.forEach(async (item)=>{
        delete item.ledger;
        delete item.item_entries
        delete item.tax_entries
        item.type = 'credit';
        item.voucher_number = await item ? item.id : '';
        item.invoiceId =  await item.invoice_id<=9?`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${item.current_year.toString().substr(-2)+`-`+item.end_year.toString().substr(-2)}/${item.invoice_id}`;
        docs.push(item);
    })
    return docs;
}

async function getExemp(array){
    let exemp = [];
    await array.forEach(async (item)=>{
        if(item.item_entries.length>0){
            item.item_entries.forEach(async(data)=>{
                if(data.igst_tax=='0'){
                    console.log("item.ledger", item.ledger)
                    if(item.is_local.toLowerCase()=='yes'){
                        data.is_local = true;
                        data.discription = 'Inter-State supplies to registered ' + item.ledger.name
                    }else{
                        data.is_local = false;
                        data.discription = 'Intra-State supplies to registered ' + item.ledger.name
                    }
                    exemp.push(data);
                }
                
            })
        }
        
    })
    return exemp;
}

async function gst3bCal(data){
    let salesall =[];
    let salesnogst =[];
    let purchase = [];
    let purchasenogst = [];
    let purchasecess = [];
    let creditcess = [];
    let debitcess = [];
    let debit = [];
    let itemnilrate = [];
    let salesallcess =[];
    let salesnogstcess =[];
    let b2cdnrcess =[];
    let b2cdnurcess =[];
    let items = [];
    let creditdata = [];
    let taxs = [];
    let creditall =[];
    if(data.length>0){
        data.map((item)=>{
            if(item.voucher_type=="sale"){
                if(item.tax_entries && item.tax_entries.length>0){
                    item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                        return prev + Number(cur.amount);
                      }, 0);
                }else{
                    item.taxAmount = 0;
                }
                if(item.ledger && item.ledger.gst_number){
                    if(item.item_entries && item.item_entries.length>0){
                        item.item_entries.forEach(el=>{
                            if(el.itemone && el.itemone.cess){
                                salesallcess.push(el.itemone)
                            }
                        })
                    }
                    salesall.push(item);
                }else{
                    if(item.item_entries && item.item_entries.length>0){
                        item.item_entries.forEach(el=>{
                            if(el.itemone && el.itemone.cess){
                                salesnogstcess.push(el.itemone)
                            }
                        })
                    }
                    salesall.push(item);
                    salesnogst.push(item);
                }
            }else if(item.voucher_type=="purchase"){
                if(item.tax_entries && item.tax_entries.length>0){
                    item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                        return prev + Number(cur.amount);
                      }, 0);
                }else{
                    item.taxAmount = 0;
                }

                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            purchasecess.push(el.itemone)
                        }
                    })
                }

                purchase.push(item);

                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.igst_tax=='0' || el.igst_tax==='0'){
                            itemnilrate.push(el)
                            purchasenogst.push(item);
                        }
                    })
                }
            }else if(item.voucher_type=="credit"){
                if(item.tax_entries && item.tax_entries.length>0){
                    item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                        return prev + Number(cur.amount);
                      }, 0);
                }else{
                    item.taxAmount = 0;
                }

                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            creditcess.push(el.itemone)
                        }
                    })
                }

                creditdata.push(item);
            }else if(item.voucher_type=="debit"){
                if(item.tax_entries && item.tax_entries.length>0){
                    item.taxAmount =  item.tax_entries.reduce(function(prev, cur) {
                        return prev + Number(cur.amount);
                      }, 0);
                }else{
                    item.taxAmount = 0;
                }

                if(item.item_entries && item.item_entries.length>0){
                    item.item_entries.forEach(el=>{
                        if(el.itemone && el.itemone.cess){
                            debitcess.push(el.itemone)
                        }
                    })
                }

                debit.push(item);
            }
        }) 
    }
   
    let b2bObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let b2cObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let cdnrObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let purchaseObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let purchasenotgetObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };
    let debitObject = {
        taxable_value:0,
        igst_amount:0,
        cgst_amount:0,
        sgst_amount:0,
        cess_amount:0,
        invoice_amount:0,
    };


    if(salesall.length>0){
        await salesall.forEach((element) => {
            if(element.is_local=="yes"){
                b2bObject.cgst_amount =Number(b2bObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                b2bObject.sgst_amount =Number(b2bObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                b2bObject.igst_amount =Number(b2bObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                b2bObject.taxable_value = Number(b2bObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2bObject.tax_amount = Number(b2bObject.igst_amount)+Number(b2bObject.cgst_amount)+Number(b2bObject.sgst_amount);
            b2bObject.invoice_amount = Number(b2bObject.tax_amount)+Number(b2bObject.taxable_value);
        });

        if(salesallcess.length>0){
            await salesallcess.forEach((element) => {
                b2bObject.cess_amount = Number(b2bObject.cess_amount)+Number(b2bObject.cess_tax);
            });
        }
        
    }
    if(salesnogst.length>0){
        await salesnogst.forEach((element) => {
            if(element.is_local=="yes"){
                b2cObject.cgst_amount =Number(b2cObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                b2cObject.sgst_amount =Number(b2cObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                b2cObject.igst_amount =Number(b2cObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                b2cObject.taxable_value = Number(b2cObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            b2cObject.tax_amount = Number(b2cObject.igst_amount)+Number(b2cObject.cgst_amount)+Number(b2cObject.sgst_amount);
            b2cObject.invoice_amount = Number(b2cObject.tax_amount)+Number(b2cObject.taxable_value);
        });
        if(salesnogstcess.length>0){
            await salesnogstcess.forEach((element) => {
                b2cObject.cess_amount = Number(b2cObject.cess_amount)+Number(b2cObject.cess_tax);
            });
        }
    }
    if(creditdata.length>0){
        await creditdata.forEach((element) => {
            if(element.is_local=="yes"){
                cdnrObject.cgst_amount =Number(cdnrObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                cdnrObject.sgst_amount =Number(cdnrObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                cdnrObject.igst_amount =Number(cdnrObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                cdnrObject.taxable_value = Number(cdnrObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
               
            })
            cdnrObject.tax_amount = Number(cdnrObject.igst_amount)+Number(cdnrObject.cgst_amount)+Number(cdnrObject.sgst_amount);
            cdnrObject.invoice_amount = Number(cdnrObject.tax_amount)+Number(cdnrObject.taxable_value);
        });

        if(creditcess.length>0){
            await creditcess.forEach((element) => {
                cdnrObject.cess_amount = Number(cdnrObject.cess_amount)+Number(cdnrObject.cess_tax);
            });
        }

        b2bObject.tax_amount = Number(b2bObject.tax_amount)-Number(cdnrObject.tax_amount);
        b2bObject.invoice_amount = Number(b2bObject.invoice_amount)-Number(cdnrObject.invoice_amount);
        b2bObject.taxable_value = Number(b2bObject.taxable_value)-Number(cdnrObject.taxable_value);
        b2bObject.igst_amount = Number(b2bObject.igst_amount)-Number(cdnrObject.igst_amount);
        b2bObject.cgst_amount = Number(b2bObject.cgst_amount)-Number(cdnrObject.cgst_amount);
        b2bObject.sgst_amount = Number(b2bObject.sgst_amount)-Number(cdnrObject.sgst_amount);
        b2bObject.cess_amount = Number(b2bObject.cess_amount)-Number(cdnrObject.cess_amount);

        b2cObject.tax_amount = Number(b2cObject.tax_amount)-Number(cdnrObject.tax_amount);
        b2cObject.invoice_amount = Number(b2cObject.invoice_amount)-Number(cdnrObject.invoice_amount);
        b2cObject.taxable_value = Number(b2cObject.taxable_value)-Number(cdnrObject.taxable_value);
        b2cObject.igst_amount = Number(b2cObject.igst_amount)-Number(cdnrObject.igst_amount);
        b2cObject.cgst_amount = Number(b2cObject.cgst_amount)-Number(cdnrObject.cgst_amount);
        b2cObject.sgst_amount = Number(b2cObject.sgst_amount)-Number(cdnrObject.sgst_amount);
        b2cObject.cess_amount = Number(b2cObject.cess_amount)-Number(cdnrObject.cess_amount);
    }

    if(purchase.length>0){
        await purchase.forEach((element) => {
            if(element.is_local=="yes"){
                purchaseObject.cgst_amount =Number(purchaseObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                purchaseObject.sgst_amount =Number(purchaseObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                purchaseObject.igst_amount =Number(purchaseObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                purchaseObject.taxable_value = Number(purchaseObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            purchaseObject.tax_amount = Number(purchaseObject.igst_amount)+Number(purchaseObject.cgst_amount)+Number(purchaseObject.sgst_amount);
            purchaseObject.invoice_amount = Number(purchaseObject.tax_amount)+Number(purchaseObject.taxable_value);
        });

        if(purchasecess.length>0){
            await purchasecess.forEach((element) => {
                purchaseObject.cess_amount = Number(purchaseObject.cess_amount)+Number(purchaseObject.cess_tax);
            });
        }
    }
    if(purchasenogst.length>0){
        await purchasenogst.forEach((element) => {
            if(element.is_local=="yes"){
                purchasenotgetObject.cgst_amount =Number(purchasenotgetObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                purchasenotgetObject.sgst_amount =Number(purchasenotgetObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                purchasenotgetObject.igst_amount =Number(purchasenotgetObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                purchasenotgetObject.taxable_value = Number(purchasenotgetObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            purchasenotgetObject.tax_amount = Number(purchasenotgetObject.igst_amount)+Number(purchasenotgetObject.cgst_amount)+Number(purchasenotgetObject.sgst_amount);
            purchasenotgetObject.invoice_amount = Number(purchasenotgetObject.tax_amount)+Number(purchasenotgetObject.taxable_value);
        });
    }
    if(debit.length>0){
        await debit.forEach((element) => {
            if(element.is_local=="yes"){
                debitObject.cgst_amount =Number(debitObject.cgst_amount)+Number(Number(element.taxAmount)/2);
                debitObject.sgst_amount =Number(debitObject.sgst_amount)+Number(Number(element.taxAmount)/2);
            }else{
                debitObject.igst_amount =Number(debitObject.igst_amount)+Number(element.taxAmount);
            }
            element.item_entries.map(el=>{
                debitObject.taxable_value = Number(debitObject.taxable_value)+Number(Number(el.quantity)*Number(el.price));
            })
            debitObject.tax_amount = Number(debitObject.igst_amount)+Number(debitObject.cgst_amount)+Number(debitObject.sgst_amount);
            debitObject.invoice_amount = Number(debitObject.tax_amount)+Number(debitObject.taxable_value);
        });

        if(debitcess.length>0){
            await debitcess.forEach((element) => {
                debitObject.cess_amount = Number(debitObject.cess_amount)+Number(debitObject.cess_tax);
            });
        }

        purchaseObject.tax_amount = Number(purchaseObject.tax_amount)-Number(debitObject.tax_amount);
        purchaseObject.invoice_amount = Number(purchaseObject.invoice_amount)-Number(debitObject.invoice_amount);
        purchaseObject.taxable_value = Number(purchaseObject.taxable_value)-Number(debitObject.taxable_value);
        purchaseObject.igst_amount = Number(purchaseObject.igst_amount)-Number(debitObject.igst_amount);
        purchaseObject.cgst_amount = Number(purchaseObject.cgst_amount)-Number(debitObject.cgst_amount);
        purchaseObject.sgst_amount = Number(purchaseObject.sgst_amount)-Number(debitObject.sgst_amount);
        purchaseObject.cess_amount = Number(purchaseObject.cess_amount)-Number(debitObject.cess_amount);

        purchasenotgetObject.tax_amount = Number(purchasenotgetObject.tax_amount?purchasenotgetObject.tax_amount:0)-Number(debitObject.tax_amount);
        purchasenotgetObject.invoice_amount = Number(purchasenotgetObject.invoice_amount)-Number(debitObject.invoice_amount);
        purchasenotgetObject.taxable_value = Number(purchasenotgetObject.taxable_value)-Number(debitObject.taxable_value);
        purchasenotgetObject.igst_amount = Number(purchasenotgetObject.igst_amount)-Number(debitObject.igst_amount);
        purchasenotgetObject.cgst_amount = Number(purchasenotgetObject.cgst_amount)-Number(debitObject.cgst_amount);
        purchasenotgetObject.sgst_amount = Number(purchasenotgetObject.sgst_amount)-Number(debitObject.sgst_amount);
        purchasenotgetObject.cess_amount = Number(purchasenotgetObject.cess_amount)-Number(debitObject.cess_amount);

    }

  
   return {salesOwnword:b2bObject, salesnotgst:b2cObject, purchaseItc:purchaseObject, purchaseItcnill:purchasenotgetObject}
}

exports.getReportGST1 = async function(data, res) {
    try {
       let saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'SalesLedger',
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
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
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

        let debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
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

        
        if(saleVoucher){
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            let creditdebit = await getCreditDebit(creditVoucher, debitVoucher);
            let b2bandb2c =await getB2bledger(saleVoucher);
            b2bandb2c.exemp = await getExemp(saleVoucher);
            b2bandb2c = Object.assign(b2bandb2c, creditdebit)
            b2bandb2c.docs =await getSaleDocs(saleVoucher);
          
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                Voucher: saleVoucher,
                // creditVoucher:creditVoucher,
                // debitVoucher:debitVoucher,
                data:b2bandb2c
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

exports.getReportGST1Summary = async function(data, res) {
    try {
       let saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'SalesLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'CreditBuyer',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
        
        if(saleVoucher){
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            console.log("saleVoucher", saleVoucher.length)
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            let b2bandb2c =await getB2bledgersummary(saleVoucher, creditVoucher, []);
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                data:b2bandb2c
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


exports.getReportGST1download = async function(data, res){
    try {
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Help Instruction');
        var b2b = wb.addWorksheet('b2b');
        var b2ba = wb.addWorksheet('b2ba');
        var b2cl = wb.addWorksheet('b2cl');
        var b2cla = wb.addWorksheet('b2cla');
        var b2cs = wb.addWorksheet('b2cs');
        var b2csa = wb.addWorksheet('b2csa');
        var cdnr = wb.addWorksheet('cdnr');
        var cdnra = wb.addWorksheet('cdnra');
        var cdnur = wb.addWorksheet('cdnur');
        var cdnura = wb.addWorksheet('cdnura');
        var exp = wb.addWorksheet('exp');
        var expa = wb.addWorksheet('expa');
        var at = wb.addWorksheet('at');
        var ata = wb.addWorksheet('ata');
        var atadj = wb.addWorksheet('atadj');
        var atadja = wb.addWorksheet('atadja');
        var exemp = wb.addWorksheet('exemp');
        var hsn = wb.addWorksheet('hsn');
        var docs = wb.addWorksheet('docs');
        var master = wb.addWorksheet('master');

        // Set value of cell A1 to 100 as a number type styled with paramaters of style
        ws.cell(1, 1)
            .number(100)
        
        // Set value of cell B1 to 200 as a number type styled with paramaters of style
        ws.cell(1, 2)
            .number(200)
        
        // Set value of cell C1 to a formula styled with paramaters of style
        ws.cell(1, 3)
            .formula('A1 + B1')
        
        // Set value of cell A2 to 'string' styled with paramaters of style
        ws.cell(2, 1)
            .string('string')
        
        // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
        ws.cell(3, 1)
            .bool(true)
            .style({font: {size: 14}});
        
        wb.write(path.join(__dirname, '../../uploads/excel/')+'Excel.xlsx');
    }catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
    }
}

exports.getReportGST2 = async function(data, res) {
    try {
        let purchaseVoucher = await PurchaseVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'PurchaseLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
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

        let debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
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
        
        // return {purchaseVoucher:purchaseVoucher}
        if(purchaseVoucher){

            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            let creditdebit = await getCreditDebit(creditVoucher, debitVoucher);
            let b2bandb2c =await getB2bledgerPurchase(purchaseVoucher);
            b2bandb2c.exemp = await getExemp(purchaseVoucher);
            b2bandb2c = Object.assign(b2bandb2c, creditdebit)
            b2bandb2c.docs =await getPurchaseDocs(purchaseVoucher);
          
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                Voucher: purchaseVoucher,
                data:b2bandb2c
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

exports.getReportGST2Summary = async function(data, res) {
    try {
    //    let purchaseVoucher = await PurchaseVoucher.findAll({
    //         where: {
    //             [Op.and]: [{
    //                 company_id: data.company_id
    //             }, {
    //                 invoice_date: {
    //                     [Op.gte]: data.start_date,
    //                     [Op.lte]: data.end_date
    //                 }
    //             }]
    //         },
    //         include:[{
    //                 model: Ledger,
    //                 as: 'PurchaseLedger',
    //             },{
    //                 model:ItemInteries,
    //                 required: false,
    //                 where: {
    //                     type: 'Purchase'
    //                 },
    //                 include:[{
    //                     model:Item,
    //                     as:"itemone"
    //                 }]
    //             },{
    //                 model:TaxInteries,
    //                 required: false,
    //                 where: {
    //                     type: 'Purchase'
    //                 }
    //             }
    //         ],
    //         order: [
    //             ['invoice_date', 'ASC']
    //         ]
    //     }).map((node) => node.get({
    //         plain: true
    //     }));

        let purchaseVoucher = await PurchaseVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'PurchaseLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
        let debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'DebitBuyer',
                },
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'credit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'credit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        
        if(purchaseVoucher){
            purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
            // creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            // let creditdebit = await getCreditDebit(creditVoucher, debitVoucher);
            let b2bandb2c =await getB2bledgerPurchasesummary(purchaseVoucher, [], debitVoucher);
            // b2bandb2c.exemp = await getExemp(saleVoucher);
            // b2bandb2c = Object.assign(b2bandb2c, creditdebit)
            // b2bandb2c.docs =await getSaleDocs(saleVoucher);
          
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                purchaseVoucher:purchaseVoucher,
                debitVoucher:debitVoucher,
                data:b2bandb2c
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

exports.getReportGST3B = async function(data, res) {
    try {
        let saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'SalesLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'CreditBuyer',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let purchaseVoucher = await PurchaseVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'PurchaseLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Purchase'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));
        let debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'DebitBuyer',
                },
                {
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
        purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
        creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
        debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email)
       
        let array = [];
        await saleVoucher.map(item=>{
            item.voucher_type = 'sale'
            item.ledger = item.SalesLedger;
            delete item.SalesLedger;
            array.push(item);
        })
        await purchaseVoucher.map(item=>{
            item.voucher_type = 'purchase'
            item.ledger = item.PurchaseLedger;
            delete item.PurchaseLedger;
            array.push(item);
        })
        await creditVoucher.map(item=>{
            item.voucher_type = 'credit'
            item.ledger = item.CreditBuyer;
            delete item.CreditBuyer;
            array.push(item);
        })
        await debitVoucher.map(item=>{
            item.voucher_type = 'debit'
            item.ledger = item.DebitBuyer;
            delete item.DebitBuyer;
            array.push(item);
        })
        let returnObj = await gst3bCal(array)
        return {
            totalvoucher: array.length,
            data:returnObj,
            statusCode: res.statusCode,
            success: true,
            message: "voucher fetch Successfully",
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

exports.getReportGST3BSummary = async function(data, res) {
    try {
       let saleVoucher = await SaleVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                    model: Ledger,
                    as: 'SalesLedger',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Sales'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let creditVoucher = await CreditVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'CreditBuyer',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'Debit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        let debitVoucher = await DebitVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                },{
                    invoice_date:{
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include: [{
                    model: Ledger,
                    as: 'DebitBuyer',
                },{
                    model:ItemInteries,
                    required: false,
                    where: {
                        type: 'credit'
                    },
                    include:[{
                        model:Item,
                        as:"itemone"
                    }]
                },{
                    model:TaxInteries,
                    required: false,
                    where: {
                        type: 'credit'
                    }
                }
            ],
            order: [
                ['invoice_date', 'ASC']
            ]
        }).map((node) => node.get({
            plain: true
        }));

        
        if(saleVoucher){
            saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
            creditVoucher = await decreptionCredit(creditVoucher, 'array', data.data.email);
            debitVoucher = await decreptionDebit(debitVoucher, 'array', data.data.email);
            // let creditdebit = await getCreditDebit(creditVoucher, debitVoucher);
            let b2bandb2c =await getB2bledgersummary(saleVoucher, creditVoucher, debitVoucher);
            // b2bandb2c.exemp = await getExemp(saleVoucher);
            // b2bandb2c = Object.assign(b2bandb2c, creditdebit)
            // b2bandb2c.docs =await getSaleDocs(saleVoucher);
          
            console.log("saleVoucher", saleVoucher.length)
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                data:b2bandb2c
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