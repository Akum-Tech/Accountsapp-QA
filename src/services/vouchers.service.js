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
import { CashOldBlance, BankOldBlance } from '../utility/oldBalance';

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
import Constant from '../constant/config';
import {
    decreptionmnualstock
} from "../security/manualClosingStock";
import balanceGroup from '../constant/balanceGroup';
import { getbankACashAccountData, getRJPCalculationData, groupData, getCurrentYearData, getOldYearData, getLeaderDiffrenc, getOldPriceCurrentItem } from '../utility/accountData';
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

// async function getopeingbalanceStockcalculation(data, res){
//     try {
//         let totalvalue = 0;
//         let getCompanydetail = await sequelize.query(
//             `SELECT * FROM companies WHERE uid='${data.company_id}'`, {
//                 type: sequelize.QueryTypes.SELECT
//             }
//         );

//         if (getCompanydetail) {
//             if (getCompanydetail[0].manualstock_closing === "Yes") {
//                 // let getdata = await sequelize.query(
//                 //     `SELECT * FROM maual_closingstock WHERE closingdate <= '${data.start_date}' and company_id='${data.company_id}' order by closingdate DESC limit 1`, {
//                 //         type: sequelize.QueryTypes.SELECT
//                 //     }
//                 // );
//                 // if (getdata.length > 0) {
//                 //     let response = await decreptionmnualstock(
//                 //         getdata,
//                 //         "array",
//                 //         data.data.email
//                 //     );
//                 //     totalvalue = Number(response[0].stockvalue);
//                 // }
//                 let ledgerData = await Ledger.findOne({where:{
//                     account_group_id:Constant.stockinhand_id,
//                     company_id:data.company_id
//                 }})
//                 if(ledgerData){
//                     ledgerData =await decreption(ledgerData, "object", data.data.email);
//                     totalvalue = ledgerData.dataValuesopening_balance=="credit"?Number(ledgerData.dataValues.amount):-1*Number(ledgerData.dataValues.amount);
//                 }else{
//                     totalvalue = 0;   
//                 }
//             } else {
//                 // calculation
//                 let ledger = await Ledger.findOne({
//                     where:{
//                         account_group_id:Constant.stockinhand_id,
//                         company_id: data.company_id
//                     }
//                 })
//                 ledger = await decreption(ledger, 'object', data.data.email)

//                 // return {getCompanydetail:getCompanydetail, data:data};
//                 // let bookStartyear = await yearexist(getCompanydetail[0].bookstart_date, data.start_date, data.end_date)
//                 // let findOldEntry = await 
//                 // return bookStartyear;
//                 let currentYeardata = await getOldYearData(data, res);

//                 console.log(currentYeardata, "currentYeardata", ledger.dataValues);
//                 if(ledger){
//                     if(currentYeardata.finalAmount==0){
//                         if(ledger.dataValues.opening_balance=="credit"){
//                             currentYeardata.finalAmount = Number(currentYeardata.finalAmount)-Number(ledger.dataValues.amount);
//                         }else{
//                             currentYeardata.finalAmount = Number(currentYeardata.finalAmount)+Number(ledger.dataValues.amount);
//                         }
//                     }else{
//                         let findOldAmountdiffrence = 0
//                         if(Number(currentYeardata.finalAmount)>=Number(ledger.dataValues.amount)){
//                             findOldAmountdiffrence = Number(currentYeardata.finalAmount)-Number(ledger.dataValues.amount)
//                         }else{
//                             findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.finalAmount);
//                         }
//                         if(ledger.dataValues.opening_balance=="credit"){
//                             currentYeardata.finalAmount = Number(currentYeardata.finalAmount)-Number(findOldAmountdiffrencet);
//                         }else{
//                             currentYeardata.finalAmount = Number(currentYeardata.finalAmount)+Number(findOldAmountdiffrence);
//                         }
//                     }
//                 }
//                 console.log(currentYeardata.finalAmount)
//                 return currentYeardata.finalAmount?currentYeardata.finalAmount:0;
//                 // let amountledger = await  ledger.reduce( function(a, b){
//                 //     return a + Number(b['amount']);
//                 // }, 0);
//                 // return amountledger
//             }
//         }


//         return totalvalue;
//     } catch (e) {
//         return {
//             statusCode: res.statusCode,
//             success: false,
//             error: e.message,
//             message: "Something went wrong-->!"
//         };
//     }
// }

// async function getcloasingbalanceStockcalculation(data, openstock, res) {
//     try {
//         let totalvalue = 0;
//         let getCompanydetail = await sequelize.query(
//             `SELECT * FROM companies WHERE uid='${data.company_id}'`, {
//                 type: sequelize.QueryTypes.SELECT
//             }
//         );
//         if (getCompanydetail) {
//             if (getCompanydetail[0].manualstock_closing === "Yes") {
//                 let getdata = await sequelize.query(
//                     `SELECT * FROM maual_closingstock WHERE (closingdate BETWEEN '${data.start_date}' and '${data.end_date}') and company_id='${data.company_id}' order by closingdate DESC limit 1`, {
//                         type: sequelize.QueryTypes.SELECT
//                     }
//                 );
//                 if (getdata.length > 0) {
//                     let response = await decreptionmnualstock(
//                         getdata,
//                         "array",
//                         data.data.email
//                     );
//                     console.log("closeingStock<0?'credit':'debit',", response)
//                     totalvalue = Number(response[0].stockvalue);
//                 }
//             } else {
//                 // calculation
//                 let ledger = await Ledger.findOne({
//                     where:{
//                         account_group_id:Constant.stockinhand_id,
//                         company_id: data.company_id
//                     }
//                 })
//                 ledger = await decreption(ledger, 'object', data.data.email)

//                 let finalAmount = await getOldYearData(data, res);
//                 let oldPrice = await getOldPriceCurrentItem(data, res)
//                 let currentYeardata = await getCurrentYearData(data, res, finalAmount.finalAmountqty?finalAmount.finalAmountqty:0, oldPrice);
              
//                 console.log("currentYeardata", currentYeardata.closeStockAmount);

//                 if(ledger){
//                     if(currentYeardata==0){
//                         if(ledger.dataValues.opening_balance=="credit"){
//                             currentYeardata.closeStockAmount = Number(ledger.dataValues.amount)
//                         }else{
//                             currentYeardata.closeStockAmount = -1*Number(ledger.dataValues.amount)
//                         }
//                     }else{
//                         let findOldAmountdiffrence = 0
//                         if(Number(currentYeardata)>=Number(ledger.dataValues.amount)){
//                             findOldAmountdiffrence = Number(currentYeardata.returnAmount)-Number(ledger.dataValues.amount)
//                         }else{
//                             findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.returnAmount);
//                         }
//                         if(ledger.dataValues.opening_balance=="credit"){
//                             currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount)-Number(findOldAmountdiffrencet);
//                         }else{
//                             currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount)+Number(findOldAmountdiffrence);
//                         }
//                         console.log("findOldAmountdiffrence", findOldAmountdiffrence)
//                     }
//                 }
//                 console.log("currentYeardata", currentYeardata)

//                 return currentYeardata.closeStockAmount;
//                 let amountledger = await  ledger.reduce( function(a, b){
//                     return a + Number(b['amount']);
//                 }, 0);
//                 return Number(currentYeardata);
//             }
//         }

//         return totalvalue;
//     } catch (e) {
//         return {
//             statusCode: res.statusCode,
//             success: false,
//             error: e.message,
//             message: "Something went wrong-->!"
//         };
//     }
// }

async function getopeingbalanceStockcalculation(data, res){
    try {
        let totalvalue = 0;
        let getCompanydetail = await sequelize.query(
            `SELECT * FROM companies WHERE uid='${data.company_id}'`, {
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (getCompanydetail) {
            if (getCompanydetail[0].manualstock_closing === "Yes") {
                let ledgerData = await Ledger.findOne({where:{
                    account_group_id:Constant.stockinhand_id,
                    company_id:data.company_id
                }})
                if(ledgerData){
                    ledgerData =await decreption(ledgerData, "object", data.data.email);
                    totalvalue = ledgerData.dataValues.opening_balance=="credit"?-1*Number(ledgerData.dataValues.amount):Number(ledgerData.dataValues.amount);
                }else{
                    totalvalue = 0;   
                }
                
                // let getdata = await sequelize.query(
                //     `SELECT * FROM maual_closingstock WHERE closingdate <= '${data.start_date}' and company_id='${data.company_id}' order by closingdate DESC limit 1`, {
                //         type: sequelize.QueryTypes.SELECT
                //     }
                // );
                // if (getdata.length > 0) {
                //     // console.log("--->>", getdata);
                //     let response = await decreptionmnualstock(
                //         getdata,
                //         "array",
                //         data.data.email
                //     );
                //     // console.log("responce-->", response);
                //     totalvalue = Number(response[0].stockvalue);
                // }
            } else {
                // calculation
                let ledger = await Ledger.findOne({
                    where:{
                        account_group_id:Constant.stockinhand_id,
                        company_id: data.company_id
                    }
                })
                ledger = await decreption(ledger, 'object', data.data.email)

                // return {getCompanydetail:getCompanydetail, data:data};
                // let bookStartyear = await yearexist(getCompanydetail[0].bookstart_date, data.start_date, data.end_date)
                // let findOldEntry = await 
                // return bookStartyear;
                let currentYeardata = await getOldYearData(data, res);
                if(ledger){
                    if(currentYeardata.finalAmount==0){
                        if(ledger.dataValues.opening_balance=="credit"){
                            currentYeardata.finalAmount = Number(currentYeardata.finalAmount)-Number(ledger.dataValues.amount);
                        }else{
                            currentYeardata.finalAmount = Number(currentYeardata.finalAmount)+Number(ledger.dataValues.amount);
                        }
                    }else{
                        let findOldAmountdiffrence = 0
                        if(Number(currentYeardata.finalAmount)>=Number(ledger.dataValues.amount)){
                            findOldAmountdiffrence = Number(currentYeardata.finalAmount)-Number(ledger.dataValues.amount)
                        }else{
                            findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.finalAmount);
                        }
                        if(ledger.dataValues.opening_balance=="credit"){
                            currentYeardata.finalAmount = Number(currentYeardata.finalAmount)-Number(findOldAmountdiffrencet);
                        }else{
                            currentYeardata.finalAmount = Number(currentYeardata.finalAmount)+Number(findOldAmountdiffrence);
                        }
                    }
                }
                return currentYeardata.finalAmount?currentYeardata.finalAmount:0;
                // let amountledger = await  ledger.reduce( function(a, b){
                //     return a + Number(b['amount']);
                // }, 0);
                // return amountledger
            }
        }

        return totalvalue;
    } catch (e) {
        // console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong-->!"
        };
    }
}

async function getcloasingbalanceStockcalculation(data, openstock, res) {
    try {
        let totalvalue = 0;
        let getCompanydetail = await sequelize.query(
            `SELECT * FROM companies WHERE uid='${data.company_id}'`, {
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (getCompanydetail) {
            if (getCompanydetail[0].manualstock_closing === "Yes") {
                let getdata = await sequelize.query(
                    `SELECT * FROM maual_closingstock WHERE (closingdate BETWEEN '${data.start_date}' and '${data.end_date}') and company_id='${data.company_id}' order by closingdate DESC limit 1`, {
                        type: sequelize.QueryTypes.SELECT
                    }
                );
                if (getdata.length > 0) {
                    let response = await decreptionmnualstock(
                        getdata,
                        "array",
                        data.data.email
                    );
                    totalvalue = Number(response[0].stockvalue);
                }
            } else {
                // calculation
                let ledger = await Ledger.findOne({
                    where:{
                        account_group_id:Constant.stockinhand_id,
                        company_id: data.company_id
                    }
                })
                ledger = await decreption(ledger, 'object', data.data.email)

                let finalAmount = await getOldYearData(data, res);
                let oldPrice = await getOldPriceCurrentItem(data, res)
                let currentYeardata = await getCurrentYearData(data, res, finalAmount.finalAmountqty?finalAmount.finalAmountqty:0, oldPrice);


                if(ledger){
                    if(currentYeardata==0){
                        if(ledger.dataValues.opening_balance=="credit"){
                            currentYeardata.closeStockAmount = Number(ledger.dataValues.amount)
                        }else{
                            currentYeardata.closeStockAmount = -1*Number(ledger.dataValues.amount)
                        }
                    }else{
                        let findOldAmountdiffrence = 0
                        if(Number(currentYeardata)>=Number(ledger.dataValues.amount)){
                            findOldAmountdiffrence = Number(currentYeardata.returnAmount)-Number(ledger.dataValues.amount)
                        }else{
                            findOldAmountdiffrence = Number(ledger.dataValues.amount) - Number(currentYeardata.returnAmount);
                        }
                        if(ledger.dataValues.opening_balance=="credit"){
                            currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount)-Number(findOldAmountdiffrencet);
                        }else{
                            currentYeardata.closeStockAmount = Number(currentYeardata.closeStockAmount)+Number(findOldAmountdiffrence);
                        }
                    }
                }

                return currentYeardata.closeStockAmount;
                let amountledger = await  ledger.reduce( function(a, b){
                    return a + Number(b['amount']);
                }, 0);
                return Number(currentYeardata);
            }
        }

        return totalvalue;
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong-->!"
        };
    }
}

async function getPurchaceAccountcalculaton(accountGroupId, data, res) {
    try {
        let findPurchaseItems = await ItemInteries.findAll({
            where:{
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    type: 'Purchase'
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                model:Item,as:"itemone"
            },{
                model:Ledger,as:"ledgerone"
            }]
        })

        let findDebitItems = await ItemInteries.findAll({
            where:{
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    type: 'Credit'
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                model:Item,as:"itemone"
            },{
                model:Ledger,as:"ledgerone"
            }]
        })


        let mainArray = [];
        findPurchaseItems = await decreptionItem(findPurchaseItems, "array", data.data.email)
        findDebitItems = await decreptionItem(findDebitItems, "array", data.data.email)

        if(findPurchaseItems.length>0){
            findPurchaseItems.map(item=>{
                let data = {
                    buyer_ledger_id:item.ledger_id,
                    isgst: item.igst_tax,
                    is_return: 0,
                    ledgerdata:item.ledgerone,
                    quantity:item.quantity?item.quantity:0,
                    total_amount: Number(item.total_amount),
                    invoice_date: item.invoice_date,
                    name: item.ledgerone && item.ledgerone.name?item.ledgerone.name:''
                }
                mainArray.push(data);
            })
        }
        if(findDebitItems.length>0){
            findDebitItems.map(item=>{
                let data = {
                    buyer_ledger_id:item.ledger_id,
                    isgst: item.igst_tax,
                    is_return: 1,
                    quantity:item.quantity?item.quantity:0,
                    total_amount: Number(item.total_amount),
                    ledgerdata:item.ledgerone,
                    invoice_date: item.invoice_date,
                    name: item.ledgerone && item.ledgerone.name?item.ledgerone.name:''
                }
                mainArray.push(data);
            })
        }

        let group = mainArray.reduce((r, a) => {
            r[a.name] = [...r[a.name] || [], a];
            return r;
        }, {});

        let returnData = [];
        for (const [key, value] of Object.entries(group)) {
            let amount = await value.map(calAmount => {
                return Number(calAmount.total_amount);
            });
            returnData.push({
                buyer_ledger_id: value[0].buyer_ledger_id,
                isgst: value[0].igst_tax,
                is_return: value[0].is_return,
                is_local: value[0].is_local,
                ledgerdata:value[0].ledgerone?value[0].ledgerone:{},
                total_amount: await Number(Number(amount.reduce((a, b) => Number(a) + Number(b), 0)).toFixed(2))+Number(value[0].ledgerdata.amount),
                invoice_date: value[0].invoice_date,
                name: key
            })
        }

        // await returnData.map(item=>{
        //     if(item.name && item.name.match('purchase-local-')){
        //         item.name = 'Purchase Local @ '+item.name.split('purchase-local-')[1];
        //     }

        //     if(item.name && item.name.match('purchase-outer-state-')){
        //         item.name = 'Purchase Interstate @ '+item.name.split('purchase-outer-state-')[1];
        //     }

        //     if(item.name && item.name.match('debit-note-local-')){
        //         item.name = 'Purchase Return Local @ '+item.name.split('debit-note-local-')[1];
        //         item.total_amount = -1*item.total_amount
        //     }

        //     if(item.name && item.name.match('debit-note-outer-state-')){
        //         item.name = 'Purchase Return Interstate @ '+item.name.split('debit-note-outer-state-')[1];
        //         item.total_amount = -1*item.total_amount
        //     }
        // })
        return returnData
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong-->!"
        };
    }
}

async function getSaleAccountcalculaton(accountGroupId,  data, res) {
    try {  
        let findSalesItems = await ItemInteries.findAll({
            where:{
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    type: 'Sales'
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                model:Item,as:"itemone"
            },{
                model:Ledger,as:"ledgerone"
            }]
        })

        let findCreditItems = await ItemInteries.findAll({
            where:{
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    type: 'Debit'
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },
            include:[{
                model:Item,as:"itemone"
            },{
                model:Ledger,as:"ledgerone"
            }]
        })


        let mainArray = [];
        findSalesItems = await decreptionItem(findSalesItems, "array", data.data.email)
        findCreditItems = await decreptionItem(findCreditItems, "array", data.data.email)
        // return {findSalesItems:findSalesItems, findCreditItems:findCreditItems}
        if(findSalesItems.length>0){
            findSalesItems.map(item=>{
                let data = {
                    buyer_ledger_id:item.ledger_id,
                    isgst: item.igst_tax,
                    is_return: 0,
                    quantity:item.quantity?item.quantity:0,
                    total_amount: Number(item.total_amount),
                    invoice_date: item.invoice_date,
                    ledgerdata :item.ledgerone,
                    name: item.ledgerone && item.ledgerone.name?item.ledgerone.name:''
                }
                mainArray.push(data);
            })
        }
        if(findCreditItems.length>0){
            findCreditItems.map(item=>{
                let data = {
                    buyer_ledger_id:item.ledger_id,
                    isgst: item.igst_tax,
                    is_return: 1,
                    quantity:item.quantity?item.quantity:0,
                    total_amount: Number(item.total_amount),
                    ledgerdata :item.ledgerone,
                    invoice_date: item.invoice_date,
                    name: item.ledgerone && item.ledgerone.name?item.ledgerone.name:''
                }
                mainArray.push(data);
            })
        }
        
        let group = mainArray.reduce((r, a) => {
            r[a.name] = [...r[a.name] || [], a];
            return r;
        }, {});


        let returnData = [];
        for (const [key, value] of Object.entries(group)) {
            let amount = await value.map(calAmount => {
                return  Number(calAmount.total_amount);
            });
            returnData.push({
                buyer_ledger_id: value[0].buyer_ledger_id,
                isgst: value[0].igst_tax,
                is_return: value[0].is_return,
                is_local: value[0].is_local,
                total_amount: await Number(Number(amount.reduce((a, b) => Number(a) + Number(b), 0)).toFixed(2))+Number(value[0].ledgerdata.amount),
                invoice_date: value[0].invoice_date,
                name: key
            })
        }
        return returnData

    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong-->!"
        };
    }
}

async function profitCal(object){
    let salesAmount = 0;
    let purchaseAmount = 0;
    let directIncomeAmount = 0;
    let directExpenseAmount = 0;
    let indirectExpenseAmount = 0;
    let indirectIncomeAmount = 0;
    let closeAmount = object.closeingStock?object.closeingStock:0;
    let openAmount =  object.openingStock?object.openingStock:0;
    let purchaseCreditAmount = 0;
    let salesCreditAmount = 0;
    let indirectgrossAmount = 0;
    // let grossProfitAmount = 0;
    let netProfite = 0;
    let grossProfitAmount = 0;
    if(object.SaleAccount && object.SaleAccount.length>0){
        object.SaleAccount.map(item=>{
            salesAmount = Number(salesAmount)+Number(item.total_amount);
        })
    }
    if(object.PurchaseAccount && object.PurchaseAccount.length>0){
        object.PurchaseAccount.map(item=>{
            purchaseAmount = Number(purchaseAmount)+Number(item.total_amount);
        })
    }
    if(object.directIncome && object.directIncome.length>0){
        object.directIncome.map(item=>{
            directIncomeAmount = Number(directIncomeAmount)+Number(item.total_amount);
        })
    }
    if(object.directExpense && object.directExpense.length>0){
        object.directExpense.map(item=>{
            directExpenseAmount = Number(directExpenseAmount)+Number(item.total_amount);
        })
    }
    if(object.indirectExpense && object.indirectExpense.length>0){
        object.indirectExpense.map(item=>{
            indirectExpenseAmount = Number(indirectExpenseAmount)+Number(item.total_amount);
        })
    }
    if(object.indirectIncome && object.indirectIncome.length>0){
        object.indirectIncome.map(item=>{
            indirectIncomeAmount = Number(indirectIncomeAmount)+Number(item.total_amount);
        })
    }
    salesCreditAmount = Number(salesAmount)+Number(directIncomeAmount)+Number(closeAmount);
    purchaseCreditAmount =  Number(openAmount)+Number(purchaseAmount)+Number(directExpenseAmount);
    grossProfitAmount = Number(salesCreditAmount)-Number(purchaseCreditAmount);
    indirectgrossAmount = Number(grossProfitAmount)+Number(indirectIncomeAmount);
    netProfite = Number(indirectgrossAmount)-Number(indirectExpenseAmount);
    return{
        salesAmount:salesAmount,
        purchaseAmount:purchaseAmount,
        directIncomeAmount:directIncomeAmount,
        directExpenseAmount:directExpenseAmount,
        indirectExpenseAmount:indirectExpenseAmount,
        indirectIncomeAmount:indirectIncomeAmount,
        closeAmount:closeAmount,
        openAmount:openAmount,
        salesCreditAmount:salesCreditAmount,
        purchaseCreditAmount:purchaseCreditAmount,
        grossProfitAmount:grossProfitAmount,
        indirectgrossAmount:indirectgrossAmount,
        netProfite:netProfite
    }

};

async function currentprofitLoss(data, res){
    try {
        let letmainobject = {};
        let purcseobjcet = await getPurchaceAccountcalculaton(Constant.PurchaseAccounts, data, res);
        let saleobject = await getSaleAccountcalculaton(Constant.sale_account_id,data, res);
        let directExpenseobject = await groupData(
            Constant.direct_expense_id,
            data,
            res
        );
        let directIncomeobject = await groupData(
            Constant.direct_income_id,
            data,
            res
        );
        let indirectExpenseobject = await groupData(
            Constant.indirect_Expenses_id,
            data,
            res
        );

        // return {indirectExpenseobject:indirectExpenseobject}
        let indirectIncomebject = await groupData(
            Constant.indirect_income_id,
            data,
            res
        );

        let openingStock = await getopeingbalanceStockcalculation(data, res); //await getopeingbalancecalculation(data, res);
        let closeingStock = await getcloasingbalanceStockcalculation(data, openingStock, res); //getcloasingbalancecalculation(data, res);
            

        letmainobject.PurchaseAccount = purcseobjcet;
        letmainobject.SaleAccount = saleobject;
        letmainobject.directExpense = directExpenseobject;
        letmainobject.directIncome = directIncomeobject;
        letmainobject.indirectExpense = indirectExpenseobject;
        letmainobject.indirectIncome = indirectIncomebject;
        letmainobject.openingStock = openingStock;
        letmainobject.closeingStock = closeingStock;

        if (letmainobject) {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data fetch Successfully",
                sheetdata: letmainobject
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data not Found!",
                sheetdata: letmainobject
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        };
    }
}

async function oldprofitLoss(data, res){
    try {
        let letmainobject = {};
        let purcseobjcet = await getPurchaceAccountcalculaton(Constant.PurchaseAccounts, data, res);
        let saleobject = await getSaleAccountcalculaton(Constant.sale_account_id,data, res);
        let directExpenseobject = await groupData(
            Constant.direct_expense_id,
            data,
            res
        );
        let directIncomeobject = await groupData(
            Constant.direct_income_id,
            data,
            res
        );
        let indirectExpenseobject = await groupData(
            Constant.indirect_Expenses_id,
            data,
            res
        );
        let indirectIncomebject = await groupData(
            Constant.indirect_income_id,
            data,
            res
        );

        let openingStock = await getopeingbalanceStockcalculation(data, res); //await getopeingbalancecalculation(data, res);
        let closeingStock = await getcloasingbalanceStockcalculation(data, openingStock, res); //getcloasingbalancecalculation(data, res);
    
    
        letmainobject.PurchaseAccount = purcseobjcet;
        letmainobject.SaleAccount = saleobject;
        letmainobject.directExpense = directExpenseobject;
        letmainobject.directIncome = directIncomeobject;
        letmainobject.indirectExpense = indirectExpenseobject;
        letmainobject.indirectIncome = indirectIncomebject;
        letmainobject.openingStock = openingStock;
        letmainobject.closeingStock = closeingStock;

        if (letmainobject) {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data fetch Successfully",
                sheetdata: letmainobject
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data not Found!",
                sheetdata: letmainobject
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        };
    }
}

async function getAllLedgerVoucherprivious(start_date,end_date,ledger_id,company_id,openingbalncecredit,openingbalncedebit,email) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, discountsaleVoucher, discountdebitVoucher, discountpurchaseVoucher, discountcreditVoucher, reciverrecieptVoucher, reciverpaymentVoucher = [];
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

            reciverrecieptVoucher = await RecieptVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: company_id
                    }, {
                        receive_id: ledger_id
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
                        receive_id: ledger_id
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
                    discountpurchaseVoucher[s].debitAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?Number(discountpurchaseVoucher[s].discount):0
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
        console.log("e", e)
        // return {
        //     statusCode: res.statusCode,
        //     success: false,
        //     error: e,
        //     message: "Something went wrong!"
        // }
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
                        receive_id: ledger_id
                    }, {
                        invoice_date: {
                            [Op.gte]: start_date,
                            [Op.lt]: end_date
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
                        receive_id: ledger_id
                    }, {
                        invoice_date: {
                            [Op.gte]: start_date,
                            [Op.lt]: end_date
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
                                console.log("saleVoucher[s]", saleVoucher[s])
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
        console.log("e", e)
        // return {
        //     statusCode: res.statusCode,
        //     success: false,
        //     error: e,
        //     message: "Something went wrong!"
        // }
    }
}

exports.getAllLedgerVoucher = async function(data, res) {
    try {
        let journalVoucher, saleVoucher, purchaseVoucher, creditVoucher, debitVoucher, recieptVoucher, paymentVoucher, discountsaleVoucher, discountdebitVoucher, discountpurchaseVoucher, discountcreditVoucher, reciverrecieptVoucher, reciverpaymentVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            },
            include:[{
                model:AccountGroup
            }]
        });
        if (ledger && ledger.dataValues.id) {
            if(ledger.dataValues.account_group_id===Constant.profit_loss_id){
                let response = await currentprofitLoss(data, res);
                console.log("response", response)
                let calculation = await profitCal(response.sheetdata?response.sheetdata:{})
                console.log("calculation", calculation)
                let olddata = {
                    ...data
                }
                let findyear = new Date(olddata.start_date).getFullYear();
                olddata.start_date = `1900-04-01`;
                olddata.end_date = `${Number(findyear)}-03-31`;
                let responseold = await oldprofitLoss(olddata, res);
                // return responseold
                let calculationold = await profitCal(responseold.sheetdata?responseold.sheetdata:{})

                console.log("calculationold", calculationold)

                let findProfitLedger = await Ledger.findOne({where:{
                    company_id:data.company_id,
                    account_group_id:Constant.profit_loss_id
                }})
                let debitProfiltAmount = 0;
                let creditProfiltAmount = 0;
                let diffrence =0;
                let openAmount1 = 0;
                let findCompany = await  Company.findOne({where:{
                    uid:data.company_id
                }})
                
                if(findProfitLedger){
                    findProfitLedger =await decreption(findProfitLedger, 'object', data.data.email);
                    let journalVoucher = await JournalInteries.findAll({
                        where: {
                            [Op.and]: [{
                                ledger_id: findProfitLedger.dataValues.uid
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
                            as: 'Voucher',
                            include:[{model:Ledger, as:'Ledger'}]
                        }],
                        order: [
                            ['invoice_date', 'ASC']
                        ]
                    }).map((node) => node.get({
                        plain: true
                    }));

                    
                    if(findProfitLedger.dataValues.opening_balance=="credit"){
                        if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                            openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                            creditProfiltAmount = Number(findProfitLedger.dataValues.amount);
                        }else{
                            // creditProfiltAmount = Number(calculationold.netProfite);
                            if(calculationold.netProfite<0){
                                debitProfiltAmount = -1*Number(calculationold.netProfite);
                            } else{
                                creditProfiltAmount = Number(calculationold.netProfite);
                            }  
                        }
                    }else{
                        if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                            debitProfiltAmount = Number(findProfitLedger.dataValues.amount);
                        }else{
                            if(calculationold.netProfite<0){
                                creditProfiltAmount = -1*Number(calculationold.netProfite);
                            } else{
                                debitProfiltAmount = Number(calculationold.netProfite);
                            } 
                        }
                    }
                    console.log("creditProfiltAmount" , creditProfiltAmount, debitProfiltAmount, calculationold.netProfite)
                    let responsedata = [{
                            account_group_id: data.account_id,
                            closeing_amount: Number(creditProfiltAmount)-Number(debitProfiltAmount),
                            creditAmount: creditProfiltAmount,
                            debitAmount: debitProfiltAmount,
                            open: true,
                            name: "Profit and Loss",
                            open_amount:  openAmount1>0? Number(openAmount1):Number(openAmount1),
                            subAccount: {},
                            sub_uid: ""
                        },
                        // {
                        //     account_group_id: data.account_id,
                        //     closeing_amount: calculation.netProfite,
                        //     voucher_type:'',
                        //     ledger:{
                        //         name:"Profit and Loss",
                        //     },
                        //     invoice_date:'',
                        //     invoice_id:'',
                        //     creditAmount: Number(calculation.netProfite)>0?calculation.netProfite:0,
                        //     debitAmount:  Number(calculation.netProfite)<0?calculation.netProfite:0,
                        //     name: "Profit and Loss",
                        //     subAccount: {},
                        //     sub_uid: ""
                        // }
                    ]



                    if(journalVoucher.length>0){
                        journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
                        // journalVoucher.map(item=>{
                        //     if(item.type=="debit"){
                        //         debitProfiltAmount = Number(debitProfiltAmount)+Number(item.amount);
                        //     }else{
                        //         creditProfiltAmount = Number(creditProfiltAmount)+Number(item.amount);
                        //     }
                        // })
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
                            await responsedata.push(journalVoucher[i]);
                        }
                    }
                    
                    console.log("debitProfiltAmount", debitProfiltAmount, creditProfiltAmount, findProfitLedger.dataValues)

                    return {
                        statusCode: res.statusCode,
                        success: true,
                        message: "voucher fetch Successfully",
                        JournalVoucher: responsedata,
                        journalVoucherl:journalVoucher
                    }

                }   
    
                // console.log("calculationold", creditProfiltAmount, debitProfiltAmount)
                // let responsedata = [{
                //     account_group_id: data.account_id,
                //     accounttype : calculationold.netProfite>0? 'credit':'debit',
                //     closeing_amount: calculationold.netProfite>0?Number(calculationold.netProfite): -1*Number(calculationold.netProfite),
                //     creditAmount: creditProfiltAmount,
                //     debitAmount:debitProfiltAmount,
                //     ishead: true,
                //     ismain: true,
                //     name: "Profit and Loss",
                //     open_amount: openAmount1>0? Number(openAmount1):-1*Number(openAmount1),
                //     open_type: calculationold.netProfite>0? 'credit':'debit',
                //     // accounttype : 'debit',
                //     subAccount: {},
                //     sub_uid: ""
                // },{
                //     account_group_id: data.account_id,
                //     accounttype : Number(calculation.netProfite)>0?'credit':'debit',
                //     closeing_amount: calculation.netProfite<0? -1*Number(calculation.netProfite):calculation.netProfite,
                //     voucher_type:'',
                //     account:{
                //         name:"Profit and Loss",
                //     },
                //     invoice_date:'',
                //     invoice_id:'',
                //     creditAmount: 0,
                //     debitAmount: 0,
                //     open_amount: calculation.netProfite<0? -1*Number(calculation.netProfite):calculation.netProfite,
                //     open_type:  Number(calculation.netProfite)>0?'credit':'debit',
                //     name: "Profit and Loss",
                //     subAccount: {},
                //     sub_uid: ""
                // }]


             
                
               
            }
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

            } else if (ledger.dataValues.sale_key) {
                saleVoucher = await ItemInteries.findAll({
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
                            ledger_id: data.ledger_id
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

            reciverrecieptVoucher = await RecieptVoucher.findAll({
                where: {
                    [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        receive_id:  data.ledger_id
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
                        receive_id:  data.ledger_id
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


            
           

            // return {discountsaleVoucher:discountsaleVoucher, discountdebitVoucher:discountdebitVoucher}

            ledger = await decreption(ledger, 'object', data.data.email);

            if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                saleVoucher = await SaleVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            roundoff_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
                            company_id: data.company_id
                        }, {
                            roundoff_ledger_id: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
                            company_id: data.company_id
                        }, {
                            discount_ledger: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
                            company_id: data.company_id
                        }, {
                            discount_ledger: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
                            company_id: data.company_id
                        }, {
                            discount_ledger: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
                            company_id: data.company_id
                        }, {
                            discount_ledger: data.ledger_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
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
            //     journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            //     recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
            //     paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
            // }
            // return {
            //     saleVoucher:saleVoucher,
            //     discountsaleVoucher:discountsaleVoucher
            // }
            // return {
            //     discountpurchaseVoucher:discountpurchaseVoucher,
            //     purchaseVoucher:purchaseVoucher
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
            if(discountsaleVoucher && discountsaleVoucher.length>0){
                discountsaleVoucher = await decreptionSale(discountsaleVoucher, 'array', data.data.email);
            }
            if(discountsaleVoucher && discountsaleVoucher.length>0){
                discountpurchaseVoucher = await decreptionPurchase(discountpurchaseVoucher, 'array', data.data.email);
            }
            if(discountcreditVoucher && discountcreditVoucher.length>0){
                discountcreditVoucher = await decreptionCredit(discountcreditVoucher, 'array', data.data.email);
            }
            if(discountdebitVoucher && discountdebitVoucher.length>0){
                discountdebitVoucher = await decreptionDebit(discountdebitVoucher, 'array', data.data.email);
            }
           
            // return {journalVoucher}
           
            // return {ledger:ledger}
          
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
                console.log("ledger.dataValues", ledger.dataValues)
                await array.push(ledger.dataValues);
            }

            let companyFind = await Company.findOne({where:{
                uid:data.company_id
            }})

            let totalcalculate_openingblance = {};
            if(await checkValid(ledger.dataValues.account_group_id)){
                totalcalculate_openingblance = await getAllLedgerVouchercurrent(data.start_date,data.end_date,data.ledger_id,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);
                // return {totalcalculate_openingblance:totalcalculate_openingblance}

                console.log("totalcalculate_openingblance", totalcalculate_openingblance)

            }else{
                totalcalculate_openingblance = await getAllLedgerVoucherprivious(data.start_date,data.end_date,data.ledger_id,data.company_id,ledger.dataValues.creditAmount,ledger.dataValues.debitAmount,data.data.email);

                console.log("totalcalculate_openingblance privious", totalcalculate_openingblance)
            }

         
            if(totalcalculate_openingblance < 0){
                ledger.dataValues.debitAmount = await -1*Number(totalcalculate_openingblance).toString();
                ledger.dataValues.creditAmount = await 0;
            }else{
                ledger.dataValues.debitAmount = await 0;
                ledger.dataValues.creditAmount = await totalcalculate_openingblance.toString();
            }

            // return {saleVoucher:saleVoucher, purchaseVoucher:purchaseVoucher, creditVoucher:creditVoucher, debitVoucher:debitVoucher, journalVoucher:journalVoucher, recieptVoucher:recieptVoucher, paymentVoucher:paymentVoucher, ledger:ledger, totalcalculate_openingblance:totalcalculate_openingblance, discountsaleVoucher:discountsaleVoucher, discountpurchaseVoucher:discountpurchaseVoucher}
         


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

            // return {data:purchaseVoucher, creditVoucher:creditVoucher}
          
            
            if (saleVoucher && saleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < saleVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        if(saleVoucher[s].roundoff_value){
                            saleVoucher[s].voucher_type = await 'sale';
                            saleVoucher[s].ledger = await saleVoucher[s].SalesLedger;
                            saleVoucher[s].Voucher = await {};
                            saleVoucher[s].type = saleVoucher[s].roundoff_type,
                            saleVoucher[s].debitAmount = await saleVoucher[s].roundoff_type=="debit"?Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                            saleVoucher[s].creditAmount = await saleVoucher[s].roundoff_type=="credit"?Number(saleVoucher[s].roundoff_value)>0?Number(saleVoucher[s].roundoff_value):-1*Number(saleVoucher[s].roundoff_value):0;
                            saleVoucher[s].amount = saleVoucher[s].roundoff_value,
                            saleVoucher[s].voucher_number = await saleVoucher[s].id;
                            saleVoucher[s].invoice_id = await saleVoucher[s].invoice_id<=9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/00${saleVoucher[s].invoice_id}`:saleVoucher[s].invoice_id>9?`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/0${saleVoucher[s].invoice_id}`:`${saleVoucher[s].current_year.toString().substr(-2)+`-`+saleVoucher[s].end_year.toString().substr(-2)}/${ssaleVoucher[s].invoice_id}`;
                            delete saleVoucher[s].SalesLedger;
                            if(saleVoucher[s].amount){
                                await array.push(saleVoucher[s]);
                            }
                        }
                        
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

             
            if (discountsaleVoucher && discountsaleVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountsaleVoucher.length; s++) {
                    if(discountsaleVoucher[s].discount){
                        discountsaleVoucher[s].voucher_type = await 'sale';
                        discountsaleVoucher[s].ledger = await discountsaleVoucher[s].SalesDiscountLedger;
                        discountsaleVoucher[s].Voucher = await {};
                        discountsaleVoucher[s].type = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?'Credit':'Debit',
                        discountsaleVoucher[s].debitAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)<0 ?-1*Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].creditAmount = await discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):0
                        discountsaleVoucher[s].amount = discountsaleVoucher[s].discount && Number(discountsaleVoucher[s].discount)>0 ?Number(discountsaleVoucher[s].discount):-1*Number(discountsaleVoucher[s].discount)
                        discountsaleVoucher[s].voucher_number = await discountsaleVoucher[s].id;
                        discountsaleVoucher[s].invoice_id = await discountsaleVoucher[s].invoice_id<=9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/00${discountsaleVoucher[s].invoice_id}`:discountsaleVoucher[s].invoice_id>9?`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/0${discountsaleVoucher[s].invoice_id}`:`${discountsaleVoucher[s].current_year.toString().substr(-2)+`-`+discountsaleVoucher[s].end_year.toString().substr(-2)}/${discountsaleVoucher[s].invoice_id}`;
                        delete discountsaleVoucher[s].SalesDiscountLedger;
                        await array.push(discountsaleVoucher[s]);
                    }
                }
            }
            if (discountpurchaseVoucher && discountpurchaseVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountpurchaseVoucher.length; s++) {
                    if(discountpurchaseVoucher[s].discount){
                        discountpurchaseVoucher[s].voucher_type = await 'purchase';
                        discountpurchaseVoucher[s].ledger = await discountpurchaseVoucher[s].PurchaseDiscountLedger;
                        discountpurchaseVoucher[s].Voucher = await {};
                        discountpurchaseVoucher[s].type = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?'Debit':'Credit',
                        discountpurchaseVoucher[s].debitAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?Number(discountpurchaseVoucher[s].discount):0
                        discountpurchaseVoucher[s].creditAmount = await discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)<0 ?-1*Number(discountpurchaseVoucher[s].discount):0
                        discountpurchaseVoucher[s].amount = discountpurchaseVoucher[s].discount && Number(discountpurchaseVoucher[s].discount)>0 ?Number(discountpurchaseVoucher[s].discount):Number(discountpurchaseVoucher[s].discount)
                        discountpurchaseVoucher[s].voucher_number = await discountpurchaseVoucher[s].id;
                        discountpurchaseVoucher[s].invoice_id = await discountpurchaseVoucher[s].invoice_id;
                            delete discountpurchaseVoucher[s].PurchaseDiscountLedger;
                            await array.push(discountpurchaseVoucher[s]);
                    }
                   
                }
            }
            if (discountcreditVoucher && discountcreditVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountcreditVoucher.length; s++) {
                  if(discountcreditVoucher[s].discount){
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
            }
            if (discountdebitVoucher && discountdebitVoucher.length>0) {         
                let salearray = []   
                for (var s = 0; s < discountdebitVoucher.length; s++) {
                    if(discountdebitVoucher[s].discount){
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
            }

            if (purchaseVoucher && purchaseVoucher.length>0) {
                console.log("come purchaseVoucher")
                let purchasearray = [] 
                for (var s = 0; s < purchaseVoucher.length; s++) {
                    if(ledger.name=="Round Off" || ledger.name=="round off"  || ledger.name=="Round Off"){
                        purchaseVoucher[s].voucher_type = await 'purchase';
                        purchaseVoucher[s].ledger = await purchaseVoucher[s].PurchaseLedger;
                        purchaseVoucher[s].Voucher = await {};
                        purchaseVoucher[s].type = purchaseVoucher[s].roundoff_type,

                        purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"?Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;
                        purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"?Number(purchaseVoucher[s].roundoff_value)>0?Number(purchaseVoucher[s].roundoff_value):-1*Number(purchaseVoucher[s].roundoff_value):0;


                        // purchaseVoucher[s].debitAmount = await purchaseVoucher[s].roundoff_type=="debit"?-1*Number(purchaseVoucher[s].roundoff_value):0;
                        // purchaseVoucher[s].creditAmount = await purchaseVoucher[s].roundoff_type=="credit"? purchaseVoucher[s].roundoff_value:0;
                        purchaseVoucher[s].amount = purchaseVoucher[s].roundoff_value,
                        purchaseVoucher[s].voucher_number = await purchaseVoucher[s].id;
                        purchaseVoucher[s].invoice_id = await purchaseVoucher[s].invoice_id<=9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:purchaseVoucher[s].invoice_id>9?`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`:`${purchaseVoucher[s].current_year.toString().substr(-2)+`-`+purchaseVoucher[s].end_year.toString().substr(-2)}/${purchaseVoucher[s].invoice_id}`;
                        
                        delete purchaseVoucher[s].PurchaseLedger;
                        // await array.push(purchaseVoucher[s]);

                        if(purchaseVoucher[s].amount){
                            await array.push(purchaseVoucher[s]);
                        }
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
                success: false,
                message: "No date Found!"
            };
        }

    } catch (e) {
        console.log("errr", e)
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
        let recieptVoucher, paymentVoucher, purchaseVoucher, saleVoucher, journalVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            }
        });
        if (ledger && ledger.dataValues.id) {
                let getOldBlance = await CashOldBlance(data);
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
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
                            receive_id: data.ledger_id
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
                
            ledger = await decreption(ledger, 'object', data.data.email);
            if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
                purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
                saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
                journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
            }
            let array = await [];
            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance == 'Debit' || ledger.dataValues.opening_balance == 'debit') {
                    ledger.dataValues.debitAmount = await Number(ledger.dataValues.amount)+Number(getOldBlance.debit);
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await Number(ledger.dataValues.amount)+Number(getOldBlance.credit);
                  
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


            if(journalVoucher){
                for (var i = 0; i < journalVoucher.length; i++) {
                    if (await journalVoucher[i].type == 'debit' || await journalVoucher[i].type == 'Debit') {
                        journalVoucher[i].debitAmount = await journalVoucher[i].amount;
                        journalVoucher[i].creditAmount = await 0;
                    } else {
                       journalVoucher[i].debitAmount = await 0;
                       journalVoucher[i].creditAmount = await journalVoucher[i].amount;
                    }
                    journalVoucher[i].voucher_number = journalVoucher[i].Voucher.id;
                    journalVoucher[i].invoice_id = journalVoucher[i].Voucher.invoice_id<=9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/00${ journalVoucher[i].Voucher.invoice_id}`: journalVoucher[i].Voucher.invoice_id>9?`${ journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/0${ journalVoucher[i].Voucher.invoice_id}`:`${ journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/${ journalVoucher[i].invoice_id}`;
                    // journalVoucher[i].debitAmount = journalVoucher[i].type=="debit"?journalVoucher[i].amount:0;
                    // journalVoucher[i].creditAmount = journalVoucher[i].type=="credit"?journalVoucher[i].amount:0;
                    journalVoucher[i].ledger =  journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    journalVoucher[i].voucher_type = 'jounrnal';
                    array.push(journalVoucher[i]);
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
                JournalVoucher: mainArray,
                getOldBlance:getOldBlance
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: false,
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
        let recieptVoucher, paymentVoucher, saleVoucher, purchaseVoucher, journalVoucher = [];
        let ledger = await Ledger.findOne({
            where: {
                uid: data.ledger_id,
                company_id: data.company_id
            }
        });
        if (ledger && ledger.dataValues.id) {
                let oldBalance= await BankOldBlance(data);
                recieptVoucher = await RecieptVoucher.findAll({
                    where: {
                        [Op.and]: [{
                            company_id: data.company_id
                        }, {
                            receive_id: data.ledger_id
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
                            receive_id: data.ledger_id
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

            
                // return {journalVoucher:journalVoucher}

                ledger = await decreption(ledger, 'object', data.data.email);
                if(!ledger.dataValues.tax_key && !ledger.dataValues.sale_key){
                    recieptVoucher = await decreptionReceipt(recieptVoucher, 'array', data.data.email);
                    paymentVoucher = await decreptionPayment(paymentVoucher, 'array', data.data.email);
                    purchaseVoucher = await decreptionPurchase(purchaseVoucher, 'array', data.data.email);
                    saleVoucher = await decreptionSale(saleVoucher, 'array', data.data.email);
                    journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
                    // journalVoucher = await decreptionJournal(saleVoucher, 'array', data.data.email);
                }

            let array = await [];

            // return {journalVoucher12:journalVoucher}

            if (ledger && ledger.dataValues.id) {
                if (ledger.dataValues.opening_balance === 'Debit' || ledger.dataValues.opening_balance === 'debit') {
                    ledger.dataValues.debitAmount = await Number(ledger.dataValues.amount)+Number(oldBalance.debit);
                    ledger.dataValues.creditAmount = await 0;
                } else {
                    ledger.dataValues.debitAmount = await 0;
                    ledger.dataValues.creditAmount = await Number(ledger.dataValues.amount)+Number(oldBalance.credit);
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

            if(journalVoucher){
                for (var i = 0; i < journalVoucher.length; i++) {
                    if (await journalVoucher[i].type == 'debit' || await journalVoucher[i].type == 'Debit') {
                       journalVoucher[i].debitAmount = await journalVoucher[i].amount;
                       journalVoucher[i].creditAmount = await 0;
                   } else {
                      journalVoucher[i].debitAmount = await 0;
                      journalVoucher[i].creditAmount = await journalVoucher[i].amount;
                   }
                    journalVoucher[i].voucher_number = journalVoucher[i].Voucher.id;
                    journalVoucher[i].invoice_id = journalVoucher[i].Voucher.invoice_id<=9?`${journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/00${ journalVoucher[i].Voucher.invoice_id}`: journalVoucher[i].Voucher.invoice_id>9?`${ journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/0${ journalVoucher[i].Voucher.invoice_id}`:`${ journalVoucher[i].Voucher.current_year.toString().substr(-2)+`-`+ journalVoucher[i].Voucher.end_year.toString().substr(-2)}/${ journalVoucher[i].invoice_id}`;
                    journalVoucher[i].debitAmount = journalVoucher[i].type=="debit"?journalVoucher[i].amount:0;
                    journalVoucher[i].creditAmount = journalVoucher[i].type=="credit"?journalVoucher[i].amount:0;
                    journalVoucher[i].ledger =  journalVoucher[i].VoucherLedger;
                    delete journalVoucher[i].VoucherLedger;
                    journalVoucher[i].voucher_type = 'jounrnal';
                    array.push(journalVoucher[i]);
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
                JournalVoucher: mainArray,
                purchaseVoucher:purchaseVoucher,
                saleVoucher:saleVoucher,
                oldBalance:oldBalance,
                // journalVoucher:journalVoucher
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: false,
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
        ledger = await decreption(ledger, "array", data.data.email);

        await ledger.map(item=>{
            if(item.name && item.name.match("Sale ")){
                uids.push(item.uid)
            }else(
                console.log("else")
            )
        })
        if(uids.length>0){
            let items = await VoucherInteries.findAll({where:{ ledger_id: {[Op.in]: uids }},
                include:[{
                    model:SaleVoucher,
                    required:true,
                    as:'Vouchers',
                    where:{
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    },
                    include:[{
                        model:Ledger,
                        required: false,
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
            let itemlist = items;
            let array = await [];
            let head =await [];
            if(items && items.length>0){
                for (let i = 0; i < items.length; i++) {
                    let data =await {
                        voucherInteries:[]
                    }; 
                    if(items[i].Vouchers){
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
                    if(i==items.length-1){

                        await array.forEach(async(data) => {
                           await data.voucherInteries.forEach(h => {
                                if(data.is_local==='yes'){
                                    let name1 = h.type+' (LOCAL) SGST '+Number(h.ledger.sale_key)/2;
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
                            items:itemlist,
                            array:array
                        }
                        return {
                            statusCode: res.statusCode,
                            success: true,
                            message: "voucher fetch Successfully",
                            Voucher: obj
                        };
                       
                    }
                }
            }else{
                return {
                    statusCode: res.statusCode,
                    success: false,
                    message: "No date Found!"
                };
            }
          
        }else{
            return {
                statusCode: res.statusCode,
                success: false,
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
        if(uids.length>0){

        //     let items = await PurchaseVoucher.findAll({where:{
        //         invoice_date: {
        //             [Op.gte]: data.start_date,
        //             [Op.lte]: data.end_date
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
            let items = await VoucherInteries.findAll({where:{ledger_id: { [Op.in]: uids }},
                include:[{
                    model:PurchaseVoucher,
                    as:'Voucherp',
                    where:{
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
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

            // return{items:items}

            items = await decreptionPurchase(items, 'array', data.data.email);

            let array = await [];
            let head =await [];
            if(items && items.length>0){
                for (let i = 0; i < items.length; i++) {
                    let data =await {
                        voucherInteries:[]
                    }; 
                    items[i].Voucherp.invoice_id = await `${items[i].Voucherp.current_year.toString().substr(-2)+`-`+items[i].Voucherp.end_year.toString().substr(-2)}/${items[i].Voucherp.invoice_id}`;
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

                await array.forEach(async(data) => {
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
                    success: false,
                    message: "No date Found!"
                };
            }
           
        }else{
            return {
                statusCode: res.statusCode,
                success: false,
                message: "No date Found!"
            };
        }
    } catch (e) {
        console.log(e);
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
        journalVoucher = await JournalInteries.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                   // invoice_date: data.start_date
                   invoice_date:{
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
                    invoice_date:{
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
                },{
                    invoice_date:{
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

        debitVoucher = await DebitVoucher.findAll({
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

        recieptVoucher = await RecieptVoucher.findAll({
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
                success: false,
                message: "voucher not found!",
                JournalVoucher: []
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

exports.getJournalRegisterVoucher = async function(data, res) {
    try {
        // return;
        let items = await JournalVoucher.findAll({
            where: {
                [Op.and]: [{
                    company_id: data.company_id
                }, {
                    invoice_date: {
                        [Op.gte]: data.start_date,
                        [Op.lte]: data.end_date
                    }
                }]
            },include:[
                {
                    model:Ledger, as:'Ledger'
                },
                {
                    model:Company,
                    attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
                },
                {
                    model:Purpose,
                },
                {
                    model:JournalInteries,
                    where:{ [Op.and]: [{
                        company_id: data.company_id
                    }, {
                        invoice_date: {
                            [Op.gte]: data.start_date,
                            [Op.lte]: data.end_date
                        }
                    }]},
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
        let other = items;

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
                            el.invoice_id = items[i] && Number(items[i].invoice_id)<9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/00${items[i].invoice_id}`:Number(items[i].invoice_id)>9?`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`:`${items[i].current_year.toString().substr(-2)+`-`+items[i].end_year.toString().substr(-2)}/${items[i].invoice_id}`;;
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
                            if (el.type == 'debit' || el.type == 'Debit') {
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
                            if (el.type == 'debit' || el.type == 'Debit') {
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

                if(i==items.length-1){
                    // array = await arraySort(array, 'invoice_id')
                    return {
                        statusCode: res.statusCode,
                        success: true,
                        message: "voucher fetch Successfully",
                        Voucher: array,
                        item:other
                    };
                }
            }
        }else{
            return {
                statusCode: res.statusCode,
                success: false,
                message: "voucher not found!",
                Voucher: []
            };
        }
        // let mainArray = await arraySort(array, 'invoice_date') 
        
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e,
            message: "Something went wrong!"
        }
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
            console.log(end_date, "end_date", start_date, accountId)

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
                                    item.debitAmount = Number(-1*item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
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
                    delete item.roundsales;
                    delete item.roundpurchase;
                    delete item.discountsales;
                    delete item.discountPurchases;
                    delete item.discountCredit;
                    delete item.discountDebit;

                    // if(item.open_type=="debit"){
                    //     item.debitAmount = Number(item.debitAmount)+Number(item.open_amount)
                    // }else{
                    //     item.creditAmount = Number(item.creditAmount)+Number(item.open_amount)
                    // }
                    totalbalnce = Number(totalbalnce)+Number(Number(item.creditAmount))-Number(Number(item.debitAmount));
                    creditbalnce = Number(creditbalnce)+Number(item.creditAmount);
                    debitbalnce = Number(debitbalnce)+Number(item.debitAmount);
                })
                // return ledger

                console.log( {totalbalnce:totalbalnce, creditbalnce:creditbalnce, debitbalnce:debitbalnce})
                return {totalbalnce:totalbalnce, creditbalnce:creditbalnce, debitbalnce:debitbalnce};
            }else{
                return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
            }
        }else{
            return {totalbalnce:0, creditbalnce:0, debitbalnce:0};
        }
    } catch (e) {
        console.log("err",e)
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
                                item.debitAmount = Number(-1*item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
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
        console.log("e", e)
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

        if(data.account_id==Constant.profit_loss_id){
            let response = await currentprofitLoss(data, res);
            let calculation = await profitCal(response.sheetdata?response.sheetdata:{})
            let olddata = {
                ...data
            }
            let findyear = new Date(olddata.start_date).getFullYear();
            olddata.start_date = `1900-04-01`;
            olddata.end_date = `${Number(findyear)}-03-31`;
            // console.log("data old", olddata)
            let findProfitLedger = await Ledger.findOne({where:{
                company_id:data.company_id,
                account_group_id:Constant.profit_loss_id
            }})
            
            findProfitLedger =await decreption(findProfitLedger, 'object', data.data.email);

            let responseold = await oldprofitLoss(olddata, res);
            let calculationold = await profitCal(responseold.sheetdata?responseold.sheetdata:{})
            let debitProfiltAmount = 0;
            let creditProfiltAmount = 0;
            let openAmount1 = 0;
            let diffrence = 0;
            if(findProfitLedger){


                let journalVoucher = await JournalInteries.findAll({
                    where: {
                        [Op.and]: [{
                            ledger_id: findProfitLedger.dataValues.uid
                        }, {
                            company_id: data.company_id
                        }, {
                            invoice_date: {
                                [Op.gte]: data.start_date,
                                [Op.lte]: data.end_date
                            }
                        }]
                    },
                    order: [
                        ['invoice_date', 'ASC']
                    ]
                }).map((node) => node.get({
                    plain: true
                }));

                

                if(journalVoucher.length>0){
                    journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
                    journalVoucher.map(item=>{
                        if(item.type=="debit"){
                            debitProfiltAmount = Number(debitProfiltAmount)+Number(item.amount);
                        }else{
                            creditProfiltAmount = Number(creditProfiltAmount)+Number(item.amount);
                        }
                    })
                    // return {journalVoucher}
                }
                

                
                // if(findProfitLedger.dataValues.opening_balance=="credit"){
                //      diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                //     // if(diffrence<0){
                //     //     diffrence = -1*Number(diffrence);
                //     // }
                //     openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                //     calculationold.netProfite = Number(calculationold.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
                //     calculation.netProfite = Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
                
                // }else{
                //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                //     openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                //     calculationold.netProfite = Number(calculationold.netProfite)-Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence)); 
                //     calculation.netProfite = Number(calculation.netProfite)-Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));   
                // }

                let findCompany = await  Company.findOne({where:{
                    uid:data.company_id
                }})
                
               
                if(findCompany && findCompany.dataValues && findCompany.dataValues.id){
                    console.log("new Date(findCompany.dataValues.bookstart_date)", new Date(findCompany.dataValues.bookstart_date), new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate()-1)))
                    if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                        let startdate = new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate()-1));
                        if(new Date(findCompany.dataValues.bookstart_date).getTime()>new Date(startdate).getTime()){
                            console.log("calculationold.netProfite = 0; if")
                            calculationold.netProfite = 0;
                        }else{
                            console.log("calculationold.netProfite = 0; else")
                            //
                        }
                    }else{
                        if(new Date(findCompany.dataValues.bookstart_date).getTime()>new Date(data.start_date).getTime()){
                            console.log("calculationold.netProfite = 01; if")
                            calculationold.netProfite = 0;
                        }else{
                            console.log("calculationold.netProfite = 01; else")
                            // calculationold.netProfite = 0;
                        }
                    }
                }


               

                // calculationold.netProfite =  Number(calculationold.netProfite)- Number(calculationold.openAmount);


                if(findProfitLedger.dataValues.opening_balance=="credit"){
                    if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
                        diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                    }else{
                        diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
                    }
                    // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                    if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                        openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                    }else{
                        let sign =Number(calculationold.netProfite)<0?'-':"+";
                        openAmount1 = Number(calculationold.netProfite)
                         //(Number(calculationold.netProfite)<0?-1*Number(calculationold.netProfite):Number(calculationold.netProfite))+Number(findProfitLedger.dataValues.amount);
                        // openAmount1 = sign+openAmount1; 
                    }
                    calculationold.netProfite = Number(calculationold.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
                    calculation.netProfite = Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
                }else{
                    if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
                        diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                    }else{
                        diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
                    }
                    // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                    if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                        openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                    }else{
                        openAmount1 = Number(calculationold.netProfite)
                    }
                    calculationold.netProfite = -1*Number(Number(calculationold.netProfite)+Number(Number(findProfitLedger.dataValues.amount)+Number(diffrence))); 
                    calculation.netProfite = -1*Number(Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)+Number(diffrence)));   
                }


            }   
  
            console.log("calculationold", calculationold)
            console.log("calculation", calculation)

            let oldAmount = Number(Number(openAmount1)>=0?Number(openAmount1):-1*Number(openAmount1));
            console.log("oldAmount", oldAmount, debitProfiltAmount, creditProfiltAmount)
            let closeamount = Number(oldAmount)+Number(Number(creditProfiltAmount)-Number(Number(debitProfiltAmount)))



            let responsedata = [{
                account_group_id: data.account_id,
                closeing_amount: closeamount,//calculation.netProfite>0?Number(calculation.netProfite): -1*Number(calculation.netProfite),
                accounttype:Number(closeamount)>0?'credit':'debit',
                creditAmount: creditProfiltAmount,
                debitAmount:debitProfiltAmount,
                ishead: true,
                ismain: true,
                name: "Profit and Loss",
                open_amount: openAmount1>0? Number(openAmount1):-1*Number(openAmount1),
                open_type: openAmount1>0? 'credit':'debit',
                // accounttype : 'debit',
                subAccount: {},
                sub_uid: ""
            },{
                account_group_id: data.account_id,
                // closeing_amount: calculation.netProfite>0?Number(calculation.netProfite): -1*Number(calculation.netProfite),
                // accounttype:Number(calculation.netProfite)>0?'credit':'debit',
                accounttype:Number(closeamount)>0?'credit':'debit',
                creditAmount: creditProfiltAmount,
                voucher_type:'',
                account:{
                    name:"Profit and Loss",
                },
                invoice_date:'',
                invoice_id:'',
                creditAmount: 0,
                debitAmount: 0,
                // open_amount: calculation.netProfite<0? -1*Number(calculation.netProfite):calculation.netProfite,
                // open_type:  Number(calculation.netProfite)>0?'credit':'debit',
                open_amount: openAmount1>0? Number(openAmount1):-1*Number(openAmount1),
                open_type: calculationold.netProfite>0? 'credit':'debit',
                name: "Profit and Loss",
                subAccount: {},
                sub_uid: ""
            }]
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: responsedata
            }

            // let findProfitLedger = await Ledger.findOne({where:{
            //     company_id:data.company_id,
            //     account_group_id:Constant.profit_loss_id
            // }})
            
            // findProfitLedger =await decreption(findProfitLedger, 'object', data.data.email);
        }else if(data.account_id===Constant.stockinhand_id){
        
            let openingStock = await getopeingbalanceStockcalculation(data, res); //await getopeingbalancecalculation(data, res);
            console.log(openingStock, "openingStock")
            let closeingStock = await getcloasingbalanceStockcalculation(data, openingStock, res); //getcloasingbalancecalculation(data, res);
              
            if(closeingStock==0){
                closeingStock = openingStock
            }
            console.log("openingStock", openingStock)
            console.log("closeingStock", closeingStock)
            let responsedata = [{
                account_group_id: data.account_id,
                accounttype : Number(closeingStock)<0?'credit':'debit',
                closeing_amount: Number(closeingStock)<0? -1*Number(closeingStock):closeingStock,
                creditAmount: 0,
                debitAmount: 0,
                ishead: true,
                ismain: true,
                name: "Opening Stock",
                open_amount: Number(openingStock)<0? -1*Number(openingStock):openingStock,
                open_type: Number(openingStock)<0?'credit':'debit',
                subAccount: {},
                sub_uid: ""
            },{
                account_group_id: data.account_id,
                accounttype : Number(closeingStock)<0?'credit':'debit',
                open_amount: Number(openingStock)<0? -1*Number(openingStock):openingStock,
                closeing_amount: Number(closeingStock)<0? -1*Number(closeingStock):closeingStock,
                voucher_type:'',
                account:{
                    name:"Opening Stock",
                },
                invoice_date:'',
                invoice_id:'',
                creditAmount:0,
                debitAmount:0,
                open_type: Number(openingStock)<0?'credit':'debit',
                name: "Opening Stock",
                subAccount: {},
                sub_uid: ""
            }]
            return {
                statusCode: res.statusCode,
                success: true,
                message: "voucher fetch Successfully",
                JournalVoucher: responsedata
            }
        }else{
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
            //  return {ledger:ledger}

        
            if(ledger.length>0){
                let totalcalculate_openingblance =await {
                    creditbalnce:0,
                    debitbalnce:0,
                    totalbalnce:0
                };
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
                                    item.debitAmount = Number(-1*item.debitAmount)+Number(Number(purchase.roundoff_value)>0?Number(purchase.roundoff_value):-1*Number(purchase.roundoff_value));
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
                // return ledger;
                let returngroup = await groupFuncation(ledger);
                // return {returngroup:returngroup}
                let sb = [];
                if(returngroup){
                    await Object.keys(returngroup).map(function (item) {
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
                                    accounttype:'',
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
                                    a.subAccount = {};
                                    a.closeing_amount = Number(a.closeing_amount?a.closeing_amount:0)+Number(element.closeing_amount?element.closeing_amount:0);
                                    a.debitAmount =  Number(a.debitAmount)+Number(element.debitAmount?element.debitAmount:0);
                                    a.creditAmount =  Number(a.creditAmount)+Number(element.creditAmount?element.creditAmount:0);
                                    a.account_group_id = element.account_group_id; 
                                    // element.open_amount = 0;  
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
                                })
                                
                                if(Number(a.creditAmount)>Number(a.debitAmount)){
                                    a.accounttype = 'credit';
                                    a.closeing_amount = Number(a.creditAmount)-Number(a.debitAmount);
                                }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                                    a.accounttype = 'debit';
                                    a.closeing_amount = Number(a.debitAmount)-Number(a.creditAmount);
                                }
                                b.unshift(a);
                                Mainarray = Mainarray.concat(b);
                            }
                        }else{
                            let a = {
                                name:returngroup[item][0].name,
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
                                a.subAccount = {};
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
                                sb.push(element);
                            })
                            
                            if(Number(a.creditAmount)>Number(a.debitAmount)){
                                a.accounttype = 'credit';
                                a.closeing_amount = Number(a.creditAmount)-Number(a.debitAmount);
                            }else if(Number(a.debitAmount)>Number(a.creditAmount)){
                                a.accounttype = 'debit';
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
                    return {
                        statusCode: res.statusCode,
                        success: true,
                        message: "voucher fetch Successfully",
                        JournalVoucher: Mainarray
                    }



                    // let opendebittatal = 0
                    // let opencredittatal = 0
                    // let credittatal = 0
                    // let debittatal = 0
                    // let closingdebittatal = 0
                    // let closingcredittatal = 0
                    // // await Mainarray.map((item)=>{
                    // //     if(!item.ishead && !item.ismain){
                    // //         debittatal = Number(debittatal)+Number(item.debitAmount);
                    // //         credittatal = Number(credittatal)+Number(item.creditAmount);
                    // //         if(item.accounttype=="debit"){
                    // //             opendebittatal = Number(opendebittatal)+Number(item.open_amount);
                    // //             closingdebittatal = Number(closingdebittatal)+Number(item.closeing_amount);
                    // //         }else{
                    // //             opencredittatal = Number(opencredittatal)+Number(item.open_amount);
                    // //             closingcredittatal = Number(closingcredittatal)+Number(item.closeing_amount)
                    // //         }
                    // //     }
                    // // })

                    // if(await sb.length>0){
                    //     Mainarray = await Mainarray.concat(sb);
                    // }
                    // console.log("Mainarray", Mainarray.length)
                    // await Mainarray.map((item)=>{
                    //     if(item.ishead && item.ismain && !item.issub){
                            
                    //     }else if(!item.ishead && !item.ismain && item.issub){
                    //             console.log("item.issub", item.issub)
                    //     }else{
                    //         debittatal = Number(debittatal)+Number(item.debitAmount);
                    //         credittatal = Number(credittatal)+Number(item.creditAmount);
                    //         if(item.open_type=="debit"){
                    //             opendebittatal = Number(opendebittatal)+Number(item.open_amount);
                    //         }else{
                    //             opencredittatal = Number(opencredittatal)+Number(item.open_amount);
                    //         }
                    //         if(item.accounttype=="debit"){
                    //             closingdebittatal = Number(closingdebittatal)+Number(item.closeing_amount);
                    //         }else{
                    //             closingcredittatal = Number(closingcredittatal)+Number(item.closeing_amount)
                    //         }
                    //     }
                    // })

                    // let findLedgerType = await Ledger.findOne({where:{uid:Mainarray[0].ledger_id}});
                    // findLedgerType = await decreption(findLedgerType, 'object', data.data.email);
                    // if(Number(opencredittatal)>Number(opendebittatal)){
                    //     Mainarray[0].open_type = Number(opendebittatal)==0?findLedgerType.opening_balance:'credit';
                    //     Mainarray[0].open_amount = Number(opencredittatal)-Number(opendebittatal);
                    //     Mainarray[0].closeing_amount = Number(Mainarray[0].creditAmount)+Number(Number(opencredittatal)-Number(opendebittatal));
                    // }else{
                    //     Mainarray[0].open_type = Number(opencredittatal)==0?findLedgerType.opening_balance:'debit'
                    //     Mainarray[0].open_amount = Number(opendebittatal)-Number(opencredittatal);
                    //     Mainarray[0].closeing_amount = Number(Mainarray[0].debitAmount)+Number(Number(opendebittatal)-Number(opencredittatal));
                    // }   
                    // if(Number(closingcredittatal)>Number(closingdebittatal)){
                    //     Mainarray[0].accounttype = 'credit';
                    //     Mainarray[0].closeing_amount = Number(closingcredittatal)-Number(closingdebittatal);
                    // }else{
                    //     Mainarray[0].accounttype = 'debit'
                    //     Mainarray[0].closeing_amount = Number(closingdebittatal)-Number(closingcredittatal);
                    // }

                    // // return  Mainarray;
                    // if(await checkValid(Mainarray[0].account_group_id)){
                    //     totalcalculate_openingblance = await getAllGroupVouchercurrent(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);

                    //     if(totalcalculate_openingblance.totalbalnce!=0){
                    //         if(totalcalculate_openingblance.totalbalnce<0){
                    //             Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                    //         }else{
                    //             Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                    //         }
                    //     }else{
                    //         Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                    //     }
                    //     Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                    //     Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);



                    //     if(Mainarray[0].accounttype=='debit'){
                    //         if(Mainarray[0].closeing_amount<0){
                    //             Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    //         }
                    //     }
                    //     if(Mainarray[0].accounttype=='credit'){
                    //         if(Mainarray[0].closeing_amount<0){
                    //             Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    //         }
                    //     }
                    // }else{
                    //     totalcalculate_openingblance = await getAllGroupVoucherprivious(data.start_date,data.end_date,Mainarray[0].account_group_id,data.company_id,data.data.email);
                    //     if(totalcalculate_openingblance.totalbalnce!=0){
                    //         if(totalcalculate_openingblance.totalbalnce<0){
                    //             Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)-Number(Mainarray[0].open_amount);
                    //         }else{
                    //             Mainarray[0].closeing_amount  = Number(totalcalculate_openingblance.totalbalnce)+Number(Mainarray[0].open_amount);
                    //         }
                    //     }else{
                    //         Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                    //     }
                    //     // Mainarray[0].closeing_amount = Number(Mainarray[0].closeing_amount)+Number(totalcalculate_openingblance.totalbalnce?totalcalculate_openingblance.totalbalnce:0);
                    //     Mainarray[0].creditAmount = Number(Mainarray[0].creditAmount)+Number(totalcalculate_openingblance.creditbalnce?totalcalculate_openingblance.creditbalnce:0);
                    //     Mainarray[0].debitAmount = Number(Mainarray[0].debitAmount)+Number(totalcalculate_openingblance.debitbalnce?totalcalculate_openingblance.debitbalnce:0);
                    //     if(Mainarray[0].accounttype=='debit'){
                    //         if(Mainarray[0].closeing_amount<0){
                    //             Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    //         }
                    //     }
                    //     if(Mainarray[0].accounttype=='credit'){
                    //         if(Mainarray[0].closeing_amount<0){
                    //             Mainarray[0].closeing_amount = -1*Number(Mainarray[0].closeing_amount);
                    //         }
                    //     }
                    // }
                    // return {
                    //     statusCode: res.statusCode,
                    //     success: true,
                    //     message: "voucher fetch Successfully",
                    //     JournalVoucher: Mainarray
                    // }
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
        }
    } catch (e) {
        console.log(e, "err")
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}