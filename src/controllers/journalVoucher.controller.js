import JournalVoucher from '../services/journalVoucher.service'
import {createJournalVoucherValidation} from '../validation/journalVoucher';
import { checkCode } from '../utility/statusCode';

import { encreptionJournal } from "../security/journalvoucher";


import "@babel/polyfill"


export async function getJournalVouchers(req, res) {
    try{
       req.body.data = req.decoded.data;
        let getdata = await JournalVoucher.getAllDataPagination(req.body, res);
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

export async function getJournalVoucherLastDate(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"company id required!"
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await JournalVoucher.getLastData(req.body, res);
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


export async function getJournalVoucher(req, res) {
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
        let createdata = await JournalVoucher.getSingleData(req.params.id, req.body, res);
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

export async function getJournalStockVoucher(req, res) {
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
        let createdata = await JournalVoucher.getSingleDatastockentry(req.params.id, req.body, res);
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



export async function createJournalVoucher(req, res) {
    try{
        console.log('iam in controller')
        let validation =await createJournalVoucherValidation(req.body);
        console.log('validation------------>',validation)
        if(validation.success){
            // req.body.data = req.decoded.data;
            console.log('12345')
            let data = await encreptionJournal(req.body);
            console.log('validation------>',data)

            if(data){
                let checkdata = await  JournalVoucher.createData(data, res);
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

export async function createStockJournalVoucher(req, res) {
    try{
        let validation =await createJournalVoucherValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            let data = await encreptionJournal(req.body);
            if(data){
                let checkdata = await  JournalVoucher.createStockJournalData(data, res);
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





export async function deleteJournalVoucher(req, res) {
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
        let deletedata = await JournalVoucher.deleteData(req.params.id, req.body, res);
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

export async function updateJournalVoucher(req, res) {
    try{
        let validation =await createJournalVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           let data = await encreptionJournal(req.body);
           if(data){
                let updatedata = await JournalVoucher.updateData(req.params.id, data, res);
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



export async function updateStockJournalVoucher(req, res) {
    try{
        let validation =await createJournalVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           let data = await encreptionJournal(req.body);
           if(data){
                let updatedata = await JournalVoucher.updateStockvoucherData(req.params.id, data, res);
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
            error:err.message,
            success: false,
            message:"Something went wrong-->!"
        })
    }
}

export async function cancelJournalVoucher(req, res) {
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
        let data = await encreptionJournal(req.body);
        if(data){
        let updatedata = await JournalVoucher.cancelData(req.params.id, data, res);
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