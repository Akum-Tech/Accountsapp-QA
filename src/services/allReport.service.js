import ItemStock from "../models/itemStock";
import Company from "../models/company";
import Sequelize, { NUMBER } from "sequelize";
import Units from "../models/units";
import State from "../models/states";
import StockGroup from "../models/stockGroup";
import subStockGroup from "../models/stockSubGroup";
import City from "../models/cities";
import VoucherInteries from '../models/voucherInteries';
import {
    decreptionVoucher
} from "../security/voucherEntries";
import {
    decreptionItem
} from "../security/itemEntries";
import ItemInteries from '../models/itemInteries';
import TaxInteries from '../models/taxInteries';
import PurchaseVoucher from "../models/purchaseVoucher";
import {
    decreptionPurchase
} from "../security/purchasevoucher";
import SaleVoucher from "../models/saleVoucher";
import DebitVoucher from "../models/debitVoucher";
import CreditVoucher from "../models/creditVoucher";
import ItemServices from "./itemStock.service";
import {
    sequelize
} from "../database/database";
import Ledger from "../models/ledger";
import {
    decreptionreport
} from "../security/allReport";
import {
    decreptionmnualstock
} from "../security/manualClosingStock";
import {
    decreption
} from "../security/ledger";
const Op = Sequelize.Op;
import uniqid from "uniqid";
import "@babel/polyfill";
import {
    decreptionSale
} from "../security/salesvoucher";
import ManualClosingStock from "../models/manualCosingStock";
import JournalVoucher from "../models/journalVoucher";
import itemStockVoucherEntries from "../models/item_stock_voucher_entries";
import {
    decreptionDebit
} from "../security/debitvoucher";
import {
    decreptionCredit
} from "../security/creditvoucher";
import Item from "../models/items";
import {
    decreptionJournal
} from "../security/journalvoucher";
import {
    decreptionReceipt
} from "../security/receiptvoucher";
import {
    decreptionPayment
} from "../security/paymentvoucher";
import RecieptVoucher from "../models/recieptVoucher";
import PaymentVoucher from "../models/paymentVoucher";
import JournalInteries from "../models/journalInteries";
import {
    decreptionJournalEntries
} from "../security/journalEntries";

import { getbankACashAccountData, getRJPCalculationData, groupData, getCurrentYearData, getOldYearData, getLeaderDiffrenc, getOldPriceCurrentItem, getTrailbalancfunction, getbalancSheetfunction } from '../utility/accountData';
import Constant from '../constant/config';
import { decreptionReport } from "../security/voucherReport";
import AccountGroup from "../models/accountGroup";
import { decreptionOpenAmount } from "../security/openAmount";
import arraySort from "array-sort";

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
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

exports.getProitLossSheetData = async function(data, res) {
    try {
       let response = await currentprofitLoss(data, res);
    //    console.log("response", response)
       return response;
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        };
    }
}

exports.getBlanceSheetReport = async function(data, res) {
    try {
        let dataobj = {};
        let dataobjnew = {};
        let accountgroup = await [
            // R P J Voucher
            {
                uid: Constant.bankA,
                name: "Bank (A)",
                subname: "Bank_A",
                ledger: []
            },
            {
                uid: Constant.bankL,
                name: "Bank (L)",
                subname: "Bank_L",
                ledger: []
            },
            {
                uid: Constant.case,
                name: "Cash",
                subname: "Cash",
                ledger: []
            },
            {
                uid: Constant.capital_account_id,
                name: "Capital Account",
                subname: "Capital_Account",
                ledger: []
            },
            {
                uid: Constant.current_assets_id,
                name: "Current Assets",
                subname: "Current_Assets",
                ledger: []
            },
            {
                uid: Constant.current_liabilities_id,
                name: "Current Liabilities",
                subname: "Current_Liabilities",
                ledger: []
            },
            {
                uid: Constant.fixed_assets,
                name: "Fixed Assets",
                subname: "Fixed_Assets",
                ledger: []
            },
            {
                uid: Constant.stockinhand_id,
                name: "Stock in Hand",
                subname: "Stock_in_Hand",
                ledger: []
            },
            {
                uid: Constant.sundry_debtors_id,
                name: "Sundry Debtors",
                subname: "Sundry_Debtors",
                ledger: []
            },
            {
                uid: Constant.sundry_creditors_id,
                name: "Sundry Creditors",
                subname: "Sundry_Creditors",
                ledger: []
            },
            {
                uid: Constant.tax_account_id,
                name: "Taxes",
                subname: "Taxes",
                ledger: []
            },

           
            //Stock in Hand voucher
            
        ];
        for (let i in accountgroup) {
            if (accountgroup[i].uid == Constant.stockinhand_id) {
                let value = await getcloasingbalanceStockcalculation(data, res);
                let ledgersum = {};
                ledgersum.name = "Closing Stock";
                ledgersum.amount = value;
                accountgroup[i].ledger.push(ledgersum);
            } else if (accountgroup[i].uid == Constant.tax_account_id) {
                let ledger = await Ledger.findAll({
                    where: {
                        company_id: data.company_id,
                        account_group_id: accountgroup[i].uid
                    }
                }).map(node =>
                    node.get({
                        plain: true
                    })
                );
                if (ledger.length > 0) {
                    ledger = await decreption(ledger, "array", data.data.email);
                    //  ledger.map(item => {
                    //       let data = getledgerwisecalculaton(item.uid,accountgroup[i].uid,data,res);
                    //       if(data){
                    //         accountgroup[i].ledger.push(data);
                    //       }
                    // });
                    await Promise.all(
                        ledger.map(async item => {
                            let datak = await getRJPCalculationData(
                                item.uid,
                                accountgroup[i].uid,
                                data,
                                res
                            );
                            if (!isObjectEmpty(datak)) {
                                accountgroup[i].ledger.push(datak);
                            }
                        })
                    );
                }
            } else if (accountgroup[i].uid == Constant.case || accountgroup[i].uid == Constant.bankA || accountgroup[i].uid == Constant.bankL) {
                let ledger = await Ledger.findAll({
                    where: {
                        company_id: data.company_id,
                        account_group_id: accountgroup[i].uid
                    }
                }).map(node =>
                    node.get({
                        plain: true
                    })
                );
                if (ledger.length > 0) {
                    ledger = await decreption(ledger, "array", data.data.email);
                    let mainData = [];
                    await Promise.all(
                        ledger.map(async item => {
                            let datak = await getRJPCalculationData(item.uid, accountgroup[i].uid, data, res);
                            // mainData.push(datak)
                            // await getRPSPCalculation(
                            //     item.uid,
                            //     accountgroup[i].uid,
                            //     data,
                            //     res
                            // );
                            // accountgroup[i].ledger = await accountgroup[i].ledger.concat(datak);
                            if (!isObjectEmpty(datak)) {
                                accountgroup[i].ledger.push(datak);
                            }
                            // if (!isObjectEmpty(datak)) {
                            //     accountgroup[i].ledger.push(datak);
                            // }
                        })
                    );

                }
            }else if (accountgroup[i].uid == Constant.sundry_debtors_id || accountgroup[i].uid == Constant.sundry_creditors_id) {
              let ledger = await Ledger.findAll({
                  where: {
                      company_id: data.company_id,
                      account_group_id: accountgroup[i].uid
                  }
              }).map(node =>
                  node.get({
                      plain: true
                  })
              );
              if (ledger.length > 0) {
                   ledger = await decreption(ledger, "array", data.data.email);
                   await Promise.all(
                      ledger.map(async item => {
                        // getAllVoucherCalculation
                          let datak = await getRJPCalculationData(
                              item.uid,
                              accountgroup[i].uid,
                              data,
                              res
                          );
                          if (!isObjectEmpty(datak)) {
                              accountgroup[i].ledger.push(datak);
                          }
                      })
                  );
              }
            } else {
                let ledger = await Ledger.findAll({
                    where: {
                        company_id: data.company_id,
                        account_group_id: accountgroup[i].uid
                    }
                }).map(node =>
                    node.get({
                        plain: true
                    })
                );
                if (ledger.length > 0) {
                    ledger = await decreption(ledger, "array", data.data.email);
                    await Promise.all(
                        ledger.map(async item => {
                            let datak = await getRJPCalculationData(
                                item.uid,
                                accountgroup[i].uid,
                                data,
                                res
                            );
                            if (!isObjectEmpty(datak)) {
                                accountgroup[i].ledger.push(datak);
                            }
                        })
                    );
                }
            }
        }


        let ledgerOpeningDiffrence = await getLeaderDiffrenc(data, res);

        // return ledgerOpeningDiffrence;

        for (let j in accountgroup) {
            dataobj[accountgroup[j].name] = accountgroup[j].ledger;
        }
        for (let j in accountgroup) {
            dataobjnew[accountgroup[j].subname] = accountgroup[j].ledger;
        }
        dataobj['diffrence'] =await ledgerOpeningDiffrence;

        
        dataobjnew['diffrence'] =await ledgerOpeningDiffrence;

        // let response = await currentprofitLoss(data, res);
        // let calculation = await profitCal(response.sheetdata?response.sheetdata:{})
       
        // let olddata = {
        //     ...data
        // }
        // let findyear = new Date(olddata.start_date).getFullYear();
        // olddata.start_date = `1900-04-01`;
        // olddata.end_date = `${Number(findyear)}-03-31`;
        // // console.log("data old", olddata)
        // // return;
        // let responseold = await oldprofitLoss(olddata, res);

        // // console.log("responseold", responseold);

        // let calculationold = await profitCal(responseold.sheetdata?responseold.sheetdata:{})
        // // console.log("calculationold", calculationold)

        // let findProfitLedger = await Ledger.findOne({where:{
        //     company_id:data.company_id,
        //     account_group_id:Constant.profit_loss_id
        // }})
        
        // findProfitLedger =await decreption(findProfitLedger, 'object', data.data.email);

        // let debitProfiltAmount = 0;
        // let creditProfiltAmount = 0;
        // let openAmount1 = 0;
        // let diffrence = 0;
        // if(findProfitLedger){


        //     let journalVoucher = await JournalInteries.findAll({
        //         where: {
        //             [Op.and]: [{
        //                 ledger_id: findProfitLedger.dataValues.uid
        //             }, {
        //                 company_id: data.company_id
        //             }, {
        //                 invoice_date: {
        //                     [Op.gte]: data.start_date,
        //                     [Op.lte]: data.end_date
        //                 }
        //             }]
        //         },
        //         order: [
        //             ['invoice_date', 'ASC']
        //         ]
        //     }).map((node) => node.get({
        //         plain: true
        //     }));

            

        //     if(journalVoucher.length>0){
        //         journalVoucher = await decreptionJournalEntries(journalVoucher, 'array', data.data.email);
        //         journalVoucher.map(item=>{
        //             if(item.type=="debit"){
        //                 debitProfiltAmount = Number(debitProfiltAmount)+Number(item.amount);
        //             }else{
        //                 creditProfiltAmount = Number(creditProfiltAmount)+Number(item.amount);
        //             }
        //         })
        //         // return {journalVoucher}
        //     }
            

        //     // let findCompany = await Company.findOne({where:{
        //     //     uid:data.company_id,
        //     //     bookstart_date: {
        //     //         [Op.between]: [data.start_date, data.end_date]
        //     //     }
        //     // }})
        //     // console.log("findCompany", findCompany)
        //     // if(findCompany && findCompany.dataValues && findCompany.dataValues.id){
        //     //     if(new Date(findCompany.dataValues.bookstart_date)<new Date(data.start_date)){
        //     //         console.log("else then")
        //     //         calculationold.netProfite = 0;
        //     //     }else{
        //     //         console.log("else then")
        //     //     }
        //     // }

            
        //     if(findProfitLedger.dataValues.opening_balance=="credit"){
        //         if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
        //             diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
        //         }else{
        //             diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
        //         }
        //         // diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
        //         openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
        //         calculationold.netProfite =Number(calculationold.netProfite)-Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
        //         if(Number(calculationold.netProfite)<0){
        //             calculationold.netProfite = -1*Number(calculationold.netProfite);
        //         }
        //         // calculation.netProfite = Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
               
        //     }else{
        //         // if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
        //         //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
        //         // }else{
        //         //     diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
        //         // }
        //         diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
        //         openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
        //         calculationold.netProfite = Number(calculationold.netProfite)-Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence)); 
        //         // calculation.netProfite = Number(calculation.netProfite)-Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));   
        //     }
        // }   


        let response = await currentprofitLoss(data, res);
        let calculation = await profitCal(response.sheetdata?response.sheetdata:{})
        dataobj['currentProfitloss']  = calculation.netProfite;
        dataobjnew['currentProfitloss']  = calculation.netProfite;
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

        // console.log("calculationold", calculationold)
        // console.log("calculation", calculation)


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



            if(findProfitLedger.dataValues.opening_balance=="credit"){
                // if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
                //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                // }else{
                //     diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
                // }

                diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                
                if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                    openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                }else{
                    let sign =Number(calculationold.netProfite)<0?'-':"+";
                    openAmount1 = Number(calculationold.netProfite)
                     //(Number(calculationold.netProfite)<0?-1*Number(calculationold.netProfite):Number(calculationold.netProfite))+Number(findProfitLedger.dataValues.amount);
                    // openAmount1 = sign+openAmount1; 
                }
                // openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                calculationold.netProfite = Number(calculationold.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
                // calculation.netProfite = Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)-Number(diffrence));
            }else{
                // if(Number(creditProfiltAmount)>Number(debitProfiltAmount)){
                //     diffrence = Number(creditProfiltAmount)-Number(debitProfiltAmount);
                // }else{
                //     diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
                // }
                diffrence = Number(debitProfiltAmount)-Number(creditProfiltAmount);
                if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                    openAmount1 = Number(calculationold.netProfite)+Number(findProfitLedger.dataValues.amount);
                }else{
                    openAmount1 = Number(calculationold.netProfite)
                }
                calculationold.netProfite = -1*Number(Number(calculationold.netProfite)+Number(Number(findProfitLedger.dataValues.amount)+Number(diffrence))); 
                // calculation.netProfite = -1*Number(Number(calculation.netProfite)+Number(Number(findProfitLedger.dataValues.amount)+Number(diffrence)));   
            }


        }  


        // dataobj['oldProfitloss']  =await findProfitLedger && findProfitLedger.dataValues && findProfitLedger.dataValues.amount? Number(findProfitLedger.dataValues.amount)+Number(calculationold.netProfite) :calculationold.netProfite;
       
        // dataobjnew['oldProfitloss']  = await findProfitLedger && findProfitLedger.dataValues && findProfitLedger.dataValues.amount? Number(findProfitLedger.dataValues.amount)+Number(calculationold.netProfite) :calculationold.netProfite;

     

        console.log("calculationold.netProfite",  calculationold.netProfite, openAmount1, diffrence, data)
        dataobj['currentProfitloss']  = calculation.netProfite;
        dataobjnew['currentProfitloss']  = calculation.netProfite;


        dataobj['oldProfitloss']  =await calculationold.netProfite
       
        dataobjnew['oldProfitloss']  = await openAmount1
        dataobjnew['less'] = await diffrence;
        if (accountgroup) {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data fetch Successfully",
                // sheetdata: accountgroup,
                // sheetdatanew: dataobj,
                sheetdatanewspace: dataobjnew
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data not Found!"
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
};

exports.getTrailBlanceReport =  async function(data, res) {
    try {
        let dataobj = {};
        let dataobjnew = {};
        let accountgroup = await [
            {
                uid: Constant.tax_account_id,
                name: "Taxes",
                subname: "Taxes",
                ledger: []
            },
            {
                uid: Constant.sale_account_id,
                name: "Sales Accounts",
                subname: "Sales_Accounts",
                ledger: []
            },
            {
                uid: Constant.sundry_debtors_id,
                name: "Sundry Debtors",
                subname: "Sundry_Debtors",
                ledger: []
            },
            {
                uid: Constant.sundry_creditors_id,
                name: "Sundry Creditors",
                subname: "Sundry_Creditors",
                ledger: []
            },
            {
                uid: Constant.current_assets_id,
                name: "Current Assets",
                subname: "Current_Assets",
                ledger: []
            },
            {
                uid: Constant.indirect_Expenses_id,
                name: "Indirect Expenses",
                subname: "Indirect_Expenses",
                ledger: []
            },
            {
                uid: Constant.indirect_income_id,
                name: "Indirect Income",
                subname: "Indirect_Income",
                ledger: []
            },
            {
                uid: Constant.direct_income_id,
                name: "Direct Income",
                subname: "Direct_Income",
                ledger: []
            },
            // {
            //     uid: Constant.profit_loss_id,
            //     name: "Profit & Loss A/c",
            //     subname: "Profit&LossAc",
            //     ledger: []
            // },
            {
                uid: Constant.direct_expense_id,
                name: "Direct Expenses",
                subname: "Direct_Expenses",
                ledger: []
            },
            // {
            //     uid: Constant.stockinhand_id,
            //     name: "Stock in Hand",
            //     subname: "Stock_in_Hand",
            //     ledger: []
            // },
            {
                uid: Constant.bankA,
                name: "Bank (A)",
                subname: "bankA",
                ledger: []
            },
            {
                uid: Constant.bankL,
                name: "Bank (L)",
                subname: "bankL",
                ledger: []
            },
            {
                uid: Constant.case,
                name: "Case",
                subname: "case",
                ledger: []
            },
            {
                uid: Constant.PurchaseAccounts,
                name: "Purchase Accounts",
                subname: "Purchase_Accounts",
                ledger: []
            },
            {
                uid: Constant.fixed_assets,
                name: "Fixed Assets",
                subname: "Fixed_Assets",
                ledger: []
            },
            {
                uid: Constant.capital_account_id,
                name: "Capital Account",
                subname: "Capital_Account",
                ledger: []
            },
            {
                uid: Constant.current_liabilities_id,
                name: "Current Liabilities",
                subname: "Current_Liabilities",
                ledger: []
            },
        ];
        let traildata = [];
        
        for (let i in accountgroup) {
    
            let datak = await getTrailbalancfunction(
                '',
                accountgroup[i].uid,
                data,
                res
            );
            if (datak && datak.length>0) {
                // traildata.push(datak);
                // datak =await arraySort(datak, 'name')
                accountgroup[i].ledger =await datak;
            }
        }
        // traildata = await getTrailbalancfunction(data, res);

        let ledgerOpeningDiffrence = await getLeaderDiffrenc(data, res);    

        for (let j in accountgroup) {
            dataobjnew[accountgroup[j].subname] = accountgroup[j].ledger;
        }

        dataobjnew['diffrence'] =await ledgerOpeningDiffrence;

        let response = await currentprofitLoss(data, res);
        let calculation = await profitCal(response.sheetdata?response.sheetdata:{})
        dataobj['currentProfitloss']  = calculation.netProfite;
        dataobjnew['currentProfitloss']  = calculation.netProfite;
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
                if(new Date(findCompany.dataValues.bookstart_date).getFullYear()==new Date(data.start_date).getFullYear()){
                    let startdate = new Date(new Date(new Date(data.start_date).getDate()).setDate(new Date(data.start_date).getDate()-1));
                    if(new Date(findCompany.dataValues.bookstart_date).getTime()>new Date(startdate).getTime()){
                        // console.log("calculationold.netProfite = 0; if")
                        calculationold.netProfite = 0;
                    }else{
                        // console.log("calculationold.netProfite = 0; else")
                        //
                    }
                }else{
                    if(new Date(findCompany.dataValues.bookstart_date).getTime()>new Date(data.start_date).getTime()){
                        // console.log("calculationold.netProfite = 01; if")
                        calculationold.netProfite = 0;
                    }else{
                        // console.log("calculationold.netProfite = 01; else")
                        // calculationold.netProfite = 0;
                    }
                }
            }

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

        let oldAmount = Number(Number(openAmount1)>=0?Number(openAmount1):-1*Number(openAmount1));
        let closeamount = Number(oldAmount)+Number(Number(creditProfiltAmount)-Number(Number(debitProfiltAmount)))

        dataobjnew['Profit_Loss'] = [{
            account_group_id: Constant.profit_loss_id,
            // closeing_amount: calculation.netProfite>=0?Number(calculation.netProfite): -1*Number(calculation.netProfite),
            closeing_amount: closeamount,
            accounttype:Number(closeamount)>=0?'credit':'debit',
            creditAmount: creditProfiltAmount,
            debitAmount: debitProfiltAmount,
            ishead: true,
            ismain: true,
            name: "Profit & Loss A/C",
            open_amount: openAmount1>=0? Number(openAmount1):-1*Number(openAmount1),
            open_type: openAmount1>=0? 'credit':'debit',
            subAccount: {},
            sub_uid: ""
        }];

        let getLegder = await Ledger.findOne({where:{
            company_id:data.company_id,
            account_group_id:Constant.stockinhand_id
        }});
        let openamount = {
            type:'debit',
            amount:0
        };
        if(getLegder){
            getLegder = await decreption(getLegder, 'object', data.data.email);
            openamount  = {
                type:getLegder.opening_balance,
                amount:getLegder.amount
            } 
        }

        let openingStock = await getopeingbalanceStockcalculation(data, res); //await getopeingbalancecalculation(data, res);
        if(openamount.type=="debit"){
            openingStock = Number(openingStock)==0?Number(openingStock)+Number(openamount.amount):Number(openamount.amount)
        }else{
            openingStock = Number(openingStock)==0?Number(openingStock)-Number(openamount.amount):Number(openamount.amount)
        }
        let closeingStock = await getcloasingbalanceStockcalculation(data, openingStock, res); //getcloasingbalancecalculation(data, res);
        console.log("openingStock", openingStock, closeingStock)
        
        
        if(closeingStock==0){
            closeingStock = openingStock;
        }

       
        
        dataobjnew['Stock_in_Hand'] = [{
            account_group_id: Constant.stockinhand_id,
            accounttype : Number(closeingStock)==0?'debit':Number(closeingStock)<0?'credit':'debit',
            closeing_amount: Number(closeingStock)<0? -1*Number(closeingStock):closeingStock,
            creditAmount: 0,
            debitAmount: 0,
            ishead: true,
            ismain: true,
            name: "Opening Stock",
            open_amount: Number(openingStock)<0? -1*Number(openingStock):openingStock,
            open_type: Number(openingStock)==0?'debit':Number(openingStock)<0? 'credit' : 'debit' ,
            subAccount: {},
            sub_uid: ""
        }];

        // console.log("await ledgerOpeningDiffrence", await ledgerOpeningDiffrence)
    //    let diffrenceLedger =  await ledgerOpeningDiffrence;


        // dataobjnew['ledgerdiffrence'] = [{
        //     account_group_id:'',
        //     accounttype:Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?'debit':'credit',
        //     closeing_amount: Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?-1*Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)):Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)),
        //     creditAmount: 0,
        //     debitAmount: 0,
        //     ishead: true,
        //     ismain: true,
        //     name: "Difference in opening balances",
        //     open_amount: Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?-1*Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)):Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount)),
        //     open_type:Number(Number(diffrenceLedger.debitAmount)-Number(diffrenceLedger.creditAmount))<0?'debit':'credit',
        //     creditAmount: 0,
        //     subAccount: {},
        //     sub_uid: ""
        // }];

        let totalcopen =0;
        let totaldopen =0;
        let totalcredit =0;
        let totaldebit =0;
        let totalcclose =0; 
        let totaldclose =0; 
        for (const [key, value] of Object.entries(dataobjnew)) {
           if(value.length>0){
            value.forEach(async(item)=>{
                if(item.ishead && item.ismain){
                    // console.log("come")
                    if(item.open_type=="credit"){
                        if(item.open_amount<0){
                            item.open_amount = -1*Number(item.open_amount)
                        }
                        totalcopen = Number(totalcopen)+Number(item.open_amount);
                    }else{
                        if(item.open_amount<0){
                            item.open_amount = -1*Number(item.open_amount)
                        }
                        totaldopen = Number(totaldopen)+Number(item.open_amount);
                    }
                    if(item.accounttype=="credit"){
                        if(item.closeing_amount<0){
                            item.closeing_amount = -1*Number(item.closeing_amount)
                        }
                        totalcclose = Number(totalcclose)+Number(item.closeing_amount);
                    }else{
                        // console.log(item.closeing_amount)
                        if(item.closeing_amount<0){
                            item.closeing_amount = -1*Number(item.closeing_amount)
                        }
                        totaldclose = Number(totaldclose)+Number(item.closeing_amount);
                    }
                    totalcredit = Number(totalcredit)+Number(item.creditAmount);
                    totaldebit = Number(totaldebit)+Number(item.debitAmount);
                }
                // if(item.issub){
                //     let findmainGroup = await value.find(el=> el.ishead && el.ismain);
                //     if(findmainGroup){
                //         findmainGroup.open_amount = Number(findmainGroup.open_amount)+(Number(item.open_amount));
                //         findmainGroup.creditAmount = Number(findmainGroup.creditAmount)+Number(item.creditAmount);
                //         findmainGroup.debitAmount = Number(findmainGroup.debitAmount)+Number(item.debitAmount);
                //         findmainGroup.closeing_amount = Number(findmainGroup.closeing_amount)+Number(item.closeing_amount);
                //     }
                // }
            })
           }
        }

        let diffrenceamount = await Number(totalcopen)-Number(totaldopen);
        let diffrencecloseamount = await Number(Number(totalcclose)-Number(totaldclose));

        dataobjnew['ledgerdiffrence'] = [{
            account_group_id:'',
            accounttype:Number(diffrencecloseamount)<0?'credit':'debit',
            closeing_amount: diffrencecloseamount<0?-1*diffrencecloseamount:diffrencecloseamount,
            creditAmount: 0,
            debitAmount: 0,
            ishead: true,
            ismain: true,
            name: "Difference in opening balances",
            open_amount: diffrenceamount<0?-1*diffrenceamount:diffrenceamount,
            open_type: Number(diffrenceamount)<0?'credit':'debit',
            creditAmount: 0,
            subAccount: {},
            sub_uid: ""
        }];



        dataobjnew['totalcopen']  =await totalcopen;
        dataobjnew['totaldopen']  =await totaldopen;
        dataobjnew['totalopen']  =await Number(diffrenceamount)-Number(Number(totalcopen)-Number(totaldopen));
        dataobjnew['totalcredit']  =await totalcredit;
        dataobjnew['totaldebit']  =await totaldebit;
        dataobjnew['totalcclose']  = await Number(totalcclose);
        dataobjnew['totaldclose']  = await Number(totaldclose);
        dataobjnew['totalclose']  = await Number(diffrencecloseamount)-Number(Number(totalcclose)-Number(totaldclose));
        dataobjnew['totalwithoutclose']  = await Number(Number(totalcclose)-Number(totaldclose));
        if (accountgroup) {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data fetch Successfully",
                data: dataobjnew,
            };
        } else {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "Data not Found!"
            };
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        };
    }
};

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
        // console.log("e", e)
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
        // return returnData;


        // await returnData.map(item=>{
        //     if(item.name && item.name.match('sale-local-')){
        //         item.name = 'Sale Local @ '+item.name.split('sale-local-')[1];
        //     }

        //     if(item.name && item.name.match('sale-outer-state-')){
        //         item.name = 'Sale Interstate @ '+item.name.split('sale-outer-state-')[1];
        //     }

        //     if(item.name && item.name.match('credit-note-local-')){
        //         item.name = 'Sale Return Local @ '+item.name.split('credit-note-local-')[1];
        //         item.total_amount = -1*item.total_amount
        //     }

        //     if(item.name && item.name.match('credit-note-outer-state-')){
        //         item.name = 'Sale Return Interstate @ '+item.name.split('credit-note-outer-state-')[1];
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