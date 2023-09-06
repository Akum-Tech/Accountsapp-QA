import ItemServices from '../services/itemStock.service'
import {createItemStockValidation} from '../validation/itemStock';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"

export async function getItemStocks(req, res) {
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


export async function getItemStock(req, res) {
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

export async function createItemStock(req, res) {
    try{
        let validation =await createItemStockValidation(req.body);
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

export async function deleteItemStock(req, res) {
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

export async function updateItemStocks(req, res) {
    try{
        let validation =await createItemStockValidation(req.body);
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


export async function getItemStockReport(req, res) {
    try{
        if(!req.body.item_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Item id required!",
                Item:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await ItemServices.getAllStockitem(req.body, res);
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

export async function getItemStockGroupReport(req, res) {
    try{
        if(!req.body.company_id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Company id required!",
                Item:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await ItemServices.getAllGroupStockitem(req.body, res);
        if(createdata){
            res.json(createdata);
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

