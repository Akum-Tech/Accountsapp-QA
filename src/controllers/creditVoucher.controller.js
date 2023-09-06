import CreditVoucher from '../services/creditVoucher.service'
import {createCreditVoucherValidation} from '../validation/creditVoucher';
import { checkCode } from '../utility/statusCode';

import { encreptionCredit } from "../security/creditvoucher";

import "@babel/polyfill"

export async function getCreditVouchers(req, res) {
    try{
       req.body.data = req.decoded.data;
        let getdata = await CreditVoucher.getAllDataPagination(req.body, res);
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

export async function getCreditVoucherLastDate(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"company id required!"
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await CreditVoucher.getLastData(req.body, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        // console.log(err, " = = = = == =err")
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function getCreditVoucher(req, res) {
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
        let createdata = await CreditVoucher.getSingleData(req.params.id, req.body, res);
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

export async function createCreditVoucher(req, res) {
    try{
       
        let validation =await createCreditVoucherValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            let data = await encreptionCredit(req.body);
            if(data){
                let checkdata = await  CreditVoucher.createData(data, res);
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
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteCreditVoucher(req, res) {
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
        let deletedata = await CreditVoucher.deleteData(req.params.id, req.body, res);
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

export async function updateCreditVoucher(req, res) {
    try{
        let validation =await createCreditVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           let data = await encreptionCredit(req.body);
            if(data){
                let updatedata = await CreditVoucher.updateData(req.params.id, data, res);
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

export async function cancelCreditVoucher(req, res) {
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
        let data = await encreptionCredit(req.body);
        if(data){
        let updatedata = await CreditVoucher.cancelData(req.params.id, data, res);
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