import PurchaseVoucher from '../services/purchaseVoucher.service'
import {createPurchaseVoucherValidation} from '../validation/purchaseVoucher';
import { checkCode } from '../utility/statusCode';
import { encreptionPurchase } from "../security/purchasevoucher";
import Constant from '../constant/config'
import "@babel/polyfill"
import Ledger from '../models/ledger';
import { decreption } from '../security/ledger';

export async function getPurchaseVouchers(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await PurchaseVoucher.getAllDataPagination(req.body, res);
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

export async function getPurchaseVoucherLastDate(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"company id required!"
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await PurchaseVoucher.getLastData(req.body, res);
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

export async function getPurchaseVoucher(req, res) {
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
        let createdata = await PurchaseVoucher.getSingleData(req.params.id, req.body, res);
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

export async function createPurchaseVoucher(req, res) {
    try{
        let validation =await createPurchaseVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           if(req.body.roundoff_value){
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
                req.body.total_amount = Number(req.body.total_amount)+Number(req.body.roundoff_value);
                req.body.roundoff_ledger_id = findRound.uid;
                if(Number(req.body.roundoff_value) < 0){
                    req.body.roundoff_type =  "credit"
                }else{
                    req.body.roundoff_type =  "debit"
                }
                
           }
           let data = await encreptionPurchase(req.body);
            if(data){
                let checkdata = await  PurchaseVoucher.createData(data, res);
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
        console.log("err", err)
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deletePurchaseVoucher(req, res) {
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
        let deletedata = await PurchaseVoucher.deleteData(req.params.id, req.body, res);
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

export async function updatePurchaseVoucher(req, res) {
    try{
        let validation =await createPurchaseVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           if(req.body.roundoff_value){
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

                console.log("findRound", findRound)
                req.body.total_amount = Number(req.body.total_amount)+Number(req.body.roundoff_value);
                req.body.roundoff_ledger_id = findRound.uid;
                if(Number(req.body.roundoff_value) < 0){
                    req.body.roundoff_type =  "credit"
                }else{
                    req.body.roundoff_type =  "debit"
                }
           }
        //    console.log(req.body, " = = = =")
        //    return
           let data = await encreptionPurchase(req.body);
            if(data){
                let updatedata = await PurchaseVoucher.updateData(req.params.id, data, res);
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
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}

export async function cancelPurchaseVoucher(req, res) {
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
        let data = await encreptionPurchase(req.body);
        if(data){
        let updatedata = await PurchaseVoucher.cancelData(req.params.id, data, res);
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