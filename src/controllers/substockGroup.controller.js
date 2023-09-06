import SubStockGroupServices from '../services/subStockGroup.service'
import "@babel/polyfill"
import {createSubStockGroupValidation} from '../validation/subStockGroup';
import { checkCode } from '../utility/statusCode';

export async function getSubStocks(req, res) {
    try{
        let getdata = await SubStockGroupServices.getAllData(req.query.company_id, res);
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


export async function getSubStock(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"StockGroup id required!",
                StockGroup:{}
            });
        }
        let createdata = await SubStockGroupServices.getSingleData(req.params.id, res);
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

export async function createSubStock(req, res) {
    try{
   let validation =await createSubStockGroupValidation(req.body);
        if(validation.success){
           // req.body.data = req.decoded.data;
           req.body.stock_name = req.body.stock_name.toLowerCase();
          let checkdata = await  SubStockGroupServices.createData(req.body, res);
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


export async function deleteSubStock(req, res) {
    try{
        let deletedata = await SubStockGroupServices.deleteData(req.params.id, res);
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


export async function updateSubStocks(req, res) {
    try{
        let updatedata = await SubStockGroupServices.updateData(req.params.id, req.body, res);
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
