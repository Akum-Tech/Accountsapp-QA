import LedgerBalance from '../models/ledgerBalance';
import Company from '../models/company';
import Sequelize from 'sequelize';
import Units from '../models/units';
import State from '../models/states';
import StockGroup from '../models/stockGroup';
import subStockGroup from '../models/stockSubGroup';
import City from '../models/cities';

import JournalVoucher from '../models/journalVoucher';
import SaleVoucher from '../models/saleVoucher';
import PurchaseVoucher from '../models/purchaseVoucher';
import RecieptVoucher from '../models/recieptVoucher';
import PaymentVoucher from '../models/paymentVoucher'; 
import CreditVoucher from '../models/creditVoucher';
import DebitVoucher from '../models/debitVoucher';

import { encreptionSale, decreptionSale } from "../security/salesvoucher";
const Op = Sequelize.Op;
import uniqid from 'uniqid';
import "@babel/polyfill"


import AccountGroup from '../models/accountGroup';
import subAccountGroup from '../models/subAccountGroup';
import Ledger from '../models/ledger';
import TaxInteries from '../models/taxInteries';
import VoucherInteries from '../models/voucherInteries';
import ItemInteries from '../models/itemInteries';
import { sequelize } from '../database/database'
import Constant from '../constant/config'
import Message from '../constant/entryMessage'
import entry from '../utility/entry'
import { encreptionBank } from "../security/bank";
import { encreption } from "../security/ledger";
import { encreptionItem } from "../security/itemEntries";
import { encreptionTax } from "../security/taxEntries";
import { encreptionVoucher } from "../security/voucherEntries";
import ItemStockVoucher from '../models/itemStockVoucher';




exports.getnextDataDetail_sv = async function (data, res) {
    try {
        let createdata = await SaleVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await SaleVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_sv = async function (data, res) {
    try {
        let createdata = await SaleVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await SaleVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}


exports.getnextDataDetail_purv = async function (data, res) {
    try {
        let createdata = await PurchaseVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await PurchaseVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_purv = async function (data, res) {
    try {
        let createdata = await PurchaseVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await PurchaseVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getnextDataDetail_rv = async function (data, res) {
    try {
        let createdata = await RecieptVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await RecieptVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_rv = async function (data, res) {
    try {
        let createdata = await RecieptVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await RecieptVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}


exports.getnextDataDetail_payv = async function (data, res) {
    try {
        let createdata = await PaymentVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await PaymentVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_payv = async function (data, res) {
    try {
        let createdata = await PaymentVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await PaymentVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}


exports.getnextDataDetail_cv = async function (data, res) {
    try {
        let createdata = await CreditVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await CreditVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_cv = async function (data, res) {
    try {
        let createdata = await CreditVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await CreditVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getnextDataDetail_dv = async function (data, res) {
    try {
        let createdata = await DebitVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await DebitVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.gt]: createdata.id
                            }
                        }]
                    }, attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_dv = async function (data, res) {
    try {
        let createdata = await DebitVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','current_year','end_year']});
        if(createdata){

             let nextdata = await DebitVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            id: {
                                [Op.lt]: createdata.id
                            }
                        }]
                    },order: [
            ['id', 'DESC']
        ], attributes: ['company_id','id','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getnextDataDetail_jv = async function (data, res) {
    try {
        let createdata = await JournalVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','invoice_id','current_year','end_year']});
        if(createdata){

             let nextdata = await JournalVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            invoice_id: {
                                [Op.gt]: createdata.invoice_id
                            }
                        }]
                    },order: [
            ['invoice_id', 'ASC']
        ], attributes: ['company_id','id','voucher_type','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}

exports.getpreviousDataDetail_jv = async function (data, res) {
    try {
        let createdata = await JournalVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','invoice_id','current_year','end_year']});
        if(createdata){

             let nextdata = await JournalVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            invoice_id: {
                                [Op.lt]: createdata.invoice_id
                            }
                        }]
                    },order: [
            ['invoice_id', 'DESC']
        ], attributes: ['company_id','id','voucher_type','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}



exports.getnextDataDetail_isv = async function (data, res) {
    try {
        let createdata = await ItemStockVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','invoice_id','current_year','end_year']});
        if(createdata){

             let nextdata = await ItemStockVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            invoice_id: {
                                [Op.gt]: createdata.invoice_id
                            }
                        }]
                    },order: [
            ['invoice_id', 'ASC']
        ], attributes: ['company_id','id','voucher_type','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
        console.log(e)
       return false;
    }
}

exports.getpreviousDataDetail_isv = async function (data, res) {
    try {
        let createdata = await ItemStockVoucher.findOne({ where: 
            {
                 uid:data.id
            }, attributes: ['company_id','id','invoice_id','current_year','end_year']});
        if(createdata){

             let nextdata = await ItemStockVoucher.findOne({where: {

                        [Op.and]: [{
                            end_year: createdata.end_year
                        }, {
                            company_id: createdata.company_id
                        },{
                            current_year:createdata.current_year
                        },{
                            invoice_id: {
                                [Op.lt]: createdata.invoice_id
                            }
                        }]
                    },order: [
            ['invoice_id', 'DESC']
        ], attributes: ['company_id','id','voucher_type','uid','current_year','end_year']});

                if(nextdata){
                     return nextdata;
                }else{
                    return false;
                }
        }else{
            return false;
               
        }
    } catch (e) {
       return false;
    }
}



