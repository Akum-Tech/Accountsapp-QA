import LedgerBalance from '../services/ledgerBalance.service'
import {createLedgerBalanceValidation} from '../validation/ledgerBalance';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"

export async function getLedgerBalancies(req, res) {
    try{
       // req.body.data = req.decoded.data;
        let getdata = await ItemServices.getAllData(req.query.company_id, res);
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


export async function getLedgerBalance(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Item id required!",
                Item:{}
            });
        }
        //req.body.data = req.decoded.data;
        let createdata = await ItemServices.getSingleData(req.params.id, res);
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

export async function createLedgerBalance(req, res) {
    try{
        let validation =await createLedgerBalanceValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
            let checkdata = await  ItemServices.createData(req.body, res);
            if(checkdata){
                res.json(checkdata);
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

export async function deleteLedgerBalance(req, res) {
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
        let deletedata = await ItemServices.deleteData(req.params.id, res);
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

export async function updateLedgerBalance(req, res) {
    try{
        let validation =await createLedgerBalanceValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
            let updatedata = await ItemServices.updateData(req.params.id, req.body, res);
            if(updatedata){
                res.json(updatedata);
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