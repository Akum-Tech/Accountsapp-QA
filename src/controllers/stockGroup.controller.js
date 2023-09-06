import StockGroupServices from '../services/stockGroup.service'
import "@babel/polyfill"
import {createStockGroupValidation} from '../validation/stockgroup';
import { checkCode } from '../utility/statusCode';

export async function getStocks(req, res) {
    try{
        let getdata = await StockGroupServices.getAllData(req.query.company_id, res);
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

export async function getAllStockGroups(req, res) {
    try{
        let getdata = await StockGroupServices.getAllDataGroups(req.params.id, res);
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




export async function getStock(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"StockGroup id required!",
                StockGroup:{}
            });
        }
        let createdata = await StockGroupServices.getSingleData(req.params.id, res);
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

export async function createStock(req, res) {
    try{
   let validation =await createStockGroupValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
          req.body.stock_name = req.body.stock_name.toLowerCase();
          let checkdata = await  StockGroupServices.createData(req.body, res);
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
            error:err.message,
            message:"Something went wrong!"
        })
    }
}


export async function deleteStock(req, res) {
    try{
        let deletedata = await StockGroupServices.deleteData(req.params.id, res);
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


export async function updateStocks(req, res) {
    try{
        let updatedata = await StockGroupServices.updateData(req.params.id, req.body, res);
        if(updatedata){
            res.json(updatedata);
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
