import SaleVoucher from '../services/saleVoucher.service'
import {createSaleVoucherValidation} from '../validation/saleVoucher';
import { checkCode } from '../utility/statusCode';

import { encreptionSale } from "../security/salesvoucher";
import Ledger from '../models/ledger';
import Constant from '../constant/config'

import "@babel/polyfill"
import { decreption } from '../security/ledger';


export async function getSaleVouchers(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await SaleVoucher.getAllDataPagination(req.body, res);
        if(getdata){
            res.json(getdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}


export async function getSaleVoucher(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Item id required!",
                Item:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await SaleVoucher.getSingleData(req.params.id, req.body, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}


export async function getSaleVoucherLastDate(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"company id required!"
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await SaleVoucher.getLastData(req.body, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function createSaleVoucher(req, res) {
    try{
        let validation =await createSaleVoucherValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            req.body.total_amount_not = req.body.total_amount;
            if(req.body.total_amount){
                    let find = await Ledger.findAll({where:{
                        company_id: req.body.company_id,
                        account_group_id:Constant.indirect_Expenses_id
                    }})
                    let response = await decreption(find, 'array', req.body.data.email);
                    let findRound = {};
                    await response.map(item=>{
                        if(item.name && item.name.match("Round Off")){
                            findRound = item;
                        }
                    })
                    req.body.roundoff_ledger_id = findRound.uid;
                    // req.body.total_amount  = Math.round(Number(req.body.total_amount));
                    // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.sub_amount);
                    // console.log("req.body.roundoff_value ", req.body.roundoff_value )
                    // req.body.roundoff_type =await  Number(req.body.roundoff_value)>0?"credit":'debit';
                    if((Number(req.body.total_amount) % 1) > 0.5){
                        console.log("data.total_amount.split('.') one", req.body.total_amount.split('.'))
                        req.body.roundoff_value =  req.body.total_amount.split('.')[1]?1-Number('0.'+req.body.total_amount.split('.')[1]):'0';
                        req.body.roundoff_type =  "credit"
                        req.body.total_amount  = Math.round(Number(req.body.total_amount));
                        // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.roundoff_value);
                    }else{
                        if((Number(req.body.total_amount) % 1) != 0){
                            console.log("data.total_amount.split('.')", req.body.total_amount.split('.'))
                            req.body.roundoff_value =  req.body.total_amount.split('.')[1]?'-0.'+req.body.total_amount.split('.')[1]:'0';
                            req.body.roundoff_type =  "debit"
                            req.body.total_amount  = Math.round(Number(req.body.total_amount));
                        }
                        // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.roundoff_value);
                    }
            }
            let data = await encreptionSale(req.body);
            if(data){
                let checkdata = await  SaleVoucher.createData(data, res);
                if(checkdata){
                    res.json(checkdata);
                }
            }
        }else{
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message:validation.message
            })
        }
    }catch(err){
        console.log("err",err)
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteSaleVoucher(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Item Id required!",
                user:{}
            });
        }
        //req.body.data = req.decoded.data;
        let deletedata = await SaleVoucher.deleteData(req.params.id, res);
        if(deletedata){
            res.json(deletedata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}

export async function updateSaleVoucher(req, res) {
    try{
        let validation =await createSaleVoucherValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
                if(req.body.total_amount){
                    let find = await Ledger.findAll({where:{
                        company_id: req.body.company_id,
                        account_group_id:Constant.indirect_Expenses_id
                    }})
                    let response = await decreption(find, 'array', req.body.data.email);
                    let findRound = {};
                    await response.map(item=>{
                        if(item.name && item.name.match("Round Off")){
                            findRound = item;
                        }
                    })
                    // req.body.roundoff_ledger_id = findRound.uid;
                    // req.body.total_amount  = Math.round(Number(req.body.total_amount));
                    // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.sub_amount);
                    // console.log("req.body.roundoff_value ", req.body.roundoff_value )
                    // req.body.roundoff_type =await  Number(req.body.roundoff_value)>0?"credit":'debit';
                    if((Number(req.body.total_amount) % 1) > 0.5){
                        console.log("data.total_amount.split('.') one", req.body.total_amount.split('.'))
                        req.body.roundoff_value =  req.body.total_amount.split('.')[1]?1-Number('0.'+req.body.total_amount.split('.')[1]):'0';
                        req.body.roundoff_type =  "credit"
                        req.body.total_amount  = Math.round(Number(req.body.total_amount));
                        // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.roundoff_value);
                    }else{
                        if((Number(req.body.total_amount) % 1) != 0){
                            console.log("data.total_amount.split('.')", req.body.total_amount.split('.'))
                            req.body.roundoff_value =  req.body.total_amount.split('.')[1]?'-0.'+req.body.total_amount.split('.')[1]:'0';
                            req.body.roundoff_type =  "debit"
                            req.body.total_amount  = Math.round(Number(req.body.total_amount));
                        }
                        // req.body.roundoff_value = Number(req.body.total_amount)-Number(req.body.roundoff_value);
                    }
            }
            let data = await encreptionSale(req.body);
            if(data){
            let updatedata = await SaleVoucher.updateData(req.params.id, data, res);
                if(updatedata){
                    res.json(updatedata);
                }
            }
        }else{
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message:validation.message
            })
        }
    }catch(err){
        console.log("err", err)
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function cancelSaleVoucher(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Item Id required!",
                user:{}
            });
        }
        req.body.data = req.decoded.data;
        let data = await encreptionSale(req.body);
        if(data){
        let updatedata = await SaleVoucher.cancelData(req.params.id, data, res);
            if(updatedata){
                res.json(updatedata);
            }
        }
    }catch(err){
        console.log("err", err)
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}