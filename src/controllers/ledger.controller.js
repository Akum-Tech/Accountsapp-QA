import LedgerServices from '../services/ledger.service'
import { createLedgerValidation } from '../validation/ledger';
import { checkCode } from '../utility/statusCode';
import { encreption } from "../security/ledger";

import "@babel/polyfill"

export async function getLedgers(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllData(req.query.company_id, req.body, res);
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

export async function getLedgerwithoutbank(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllLedgerwithoutbank(req.query.company_id, req.body, res);
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

export async function getLedgerReport(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllLedgerReport(req.query.company_id, req.body, res);
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

export async function getAutoLedgerList(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAutoLedgerList(req.body, res);
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



export async function getSalePurchaseLedger(req, res){
    try{
        // req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllSalePurchase(req.params.id, req.body, res);
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




export async function getSalePurchaseVoucherLedger(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllSalePurchaseVoucherLedger(req.params.id, req.body, res);
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

export async function getJournlVoucherLedger(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllLedgerForJournlVoucher(req.params.id, req.body, res);
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

export async function getbankLedgers(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllbankData(req.body, res);
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

export async function getbankCaseLedgers(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllbankcaseData(req.body, res);
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

export async function getdiscountLedgers(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllDiscountData(req.body, res);
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

export async function getbankdefault(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getDefaultbankData(req.params.id, req.body, res);
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


export async function getLedger(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Ledger id required!",
                Ledger:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await LedgerServices.getSingleData(req.params.id, req.body, res);
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

export async function createLedger(req, res) {
    try{
        let validation =await createLedgerValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            req.body.name = req.body.name.toLowerCase();
            let data = await encreption(req.body);
            if(data){
                let checkdata = await  LedgerServices.createData(data, res);
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
            error:err.message,
            message:"Something went wrong!"
        })
    }
}

export async function deleteLedger(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Ledger Id required!",
                user:{}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await LedgerServices.deleteData(req.params.id, res);
        if(deletedata){
            res.json(deletedata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function updateLedger(req, res) {
    try{
        let validation =await createLedgerValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            
            let data = await encreption(req.body);
            if(data){
                let updatedata = await LedgerServices.updateData(req.params.id, data, res);
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

export async function getCaseLedgers(req, res){
    try{
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getAllcaseData(req.body, res);
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

export async function getstockinhandLedgers(req, res){
    try{
        
        req.body.data = req.decoded.data;
        let getdata = await LedgerServices.getstockinhand(req.params.id,req.body, res);
        if(getdata){
            res.json(getdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            success: false,
            error:err.message,
            message:"Something went wrong!"
        })
    }
}


