import ItemInteriesServices from '../services/itemInteries.service'
import {createItemInteriesValidation} from '../validation/itemInteries';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"

export async function getItemInteries(req, res) {
    try{
       // req.body.data = req.decoded.data;
        let getdata = await ItemInteriesServices.getAllData(req.query.company_id, res);
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


export async function getItemIntery(req, res) {
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
        let createdata = await ItemInteriesServices.getSingleData(req.params.id, res);
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

export async function createItemInteries(req, res) {
    try{
        let validation =await createItemInteriesValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
            let checkdata = await  ItemInteriesServices.createData(req.body, res);
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

export async function deleteItemInteries(req, res) {
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
        let deletedata = await ItemInteriesServices.deleteData(req.params.id, res);
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

export async function updateItemInteries(req, res) {
    try{
        let validation =await createItemInteriesValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
            let updatedata = await ItemInteriesServices.updateData(req.params.id, req.body, res);
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