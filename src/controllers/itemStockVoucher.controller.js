import ItemStockVoucher from '../services/itemStockVoucher.service'
import {createJournalVoucherValidation} from '../validation/journalVoucher';
import { checkCode } from '../utility/statusCode';

import { encreptionJournalEntries } from "../security/journalEntries";


import "@babel/polyfill"
import { encreptionJournal } from '../security/journalvoucher';


export async function getItemStockVouchers(req, res) {
    try{
       req.body.data = req.decoded.data;
        let getdata = await ItemStockVoucher.getAllDataPagination(req.body, res);
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

export async function getItemStockVoucherLastDate(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"company id required!"
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await ItemStockVoucher.getLastData(req.body, res);
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

export async function getItemStockVoucher(req, res) {
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
        let createdata = await ItemStockVoucher.getSingleData(req.params.id, req.body, res);
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

export async function createItemStockVoucher(req, res) {
    try{
        let validation =await createJournalVoucherValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            let data = await encreptionJournal(req.body);
            if(data){
                let checkdata = await  ItemStockVoucher.createData(data, res);
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

export async function deleteItemStockVoucher(req, res) {
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
        let deletedata = await ItemStockVoucher.deleteData(req.params.id, req.body, res);
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

export async function updateItemStockVoucher(req, res) {
    try{
        let validation =await createJournalVoucherValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           let data = await encreptionJournal(req.body);
           if(data){
                let updatedata = await ItemStockVoucher.updateData(req.params.id, data, res);
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

export async function cancelItemStockVoucher(req, res) {
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
        let updatedata = await ItemStockVoucher.cancelData(req.params.id, data, res);
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