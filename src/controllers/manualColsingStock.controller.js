import ManualClosingStockServices from '../services/manualClosingStock.service'
import { createmaualstockValidation } from '../validation/manualClosingStock';
import { checkCode } from '../utility/statusCode';

import { encreption, decreption } from "../security/manualClosingStock";

import "@babel/polyfill"



export async function getManulstocks(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await ManualClosingStockServices.getAllData(req.body, res);
        if(getdata){
            res.json(getdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err.message,
            message:"Something went wrong!"
        })
    }
}


export async function getManulstock(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Company id required!",
                Company:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await ManualClosingStockServices.getSingleData(req.params.id, req.body, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err.message,
            message:"Something went wrong!"
        })
    }
}

export async function createManulstock(req, res) {
    try{
        let validation =await createmaualstockValidation(req.body);
        if(validation.success){
            req.body.data = await req.decoded.data;
            let data = await encreption(req.body);
            if(data){
                let checkdata = await ManualClosingStockServices.createData(data, res);
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
            statusCode:await checkCode('error'),
            success: false,
            error:err.message,
            message:"Something went wrong!"
        })
    }
}

export async function deleteManulstock(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"stock id required!",
                stock:{}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await ManualClosingStockServices.deleteData(req.params.id, res);
        if(deletedata){
            res.json(deletedata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function updateManulstock(req, res) {
    try{
        let validation =await createmaualstockValidation(req.body);
        if(validation.success){
           
            req.body.data = req.decoded.data;
            let data = await encreption(req.body);
            if(data){
                let updatedata = await ManualClosingStockServices.updateData(req.params.id, data, res);
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
            statusCode:await checkCode('error'),
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }
}


