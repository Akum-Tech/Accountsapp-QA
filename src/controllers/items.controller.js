import ItemServices from '../services/items.service'
import {createItemsValidation} from '../validation/items';
import { checkCode } from '../utility/statusCode';
import { encreptionItem } from "../security/item";
import "@babel/polyfill"
import Ledger from '../models/ledger';
import Constant from '../constant/config';
import { decreption } from '../security/ledger';

export async function getItems(req, res) {
    try{
       req.body.data = req.decoded.data;
        let getdata = await ItemServices.getAllData(req.query.company_id, req.body, res);
        if(getdata){
            res.json(getdata);
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

export async function getItem(req, res) {
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
        let createdata = await ItemServices.getSingleData(req.params.id, req.body, res);
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

export async function createItem(req, res) {
    try{
        let validation =await createItemsValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            req.body.name = req.body.name.toLowerCase();
            let data = await encreptionItem(req.body);
            if(data){
                let checkdata = await  ItemServices.createData(data, res);
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

export async function deleteItem(req, res) {
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
        let deletedata = await ItemServices.deleteData(req.params.id, req.body, res);
        if(deletedata){
            res.json(deletedata);
        }
    }catch(err){
        console.log("e", err)
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function updateItems(req, res) {
    try{
        let validation =await createItemsValidation(req.body);
        if(validation.success){
           req.body.data = req.decoded.data;
           let data = await encreptionItem(req.body);
           if(data){
                let updatedata = await ItemServices.updateData(req.params.id, data, res);
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