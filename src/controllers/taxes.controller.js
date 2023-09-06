import TaxesServices from '../services/taxes.service'
import { createTaxesValidation } from '../validation/taxes';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"

export async function getTaxess(req, res) {
    try{
        req.body.data =  req.decoded.data;
        let getdata = await TaxesServices.getAllData(req.body, res);
        if(getdata){
            res.json(getdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function getTaxebyStatus(req, res) {
    try{
        if(!req.params.status){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Taxes id required!",
                Taxes:{}
            });
        }
        let createdata = await TaxesServices.getStatusData(req.params.status, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}


export async function getTaxes(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Taxes id required!",
                Taxes:{}
            });
        }
        req.body.data =  req.decoded.data;
        let createdata = await TaxesServices.getSingleData(req.params.id, res);
        if(createdata){
            res.json(createdata);
        }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function createTaxes(req, res) {
    try{
        let validation =await createTaxesValidation(req.body);
        if(validation.success){
            let checkdata = await  TaxesServices.createData(req.body, res);
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
            statusCode: await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteTaxes(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Taxes id required!",
                Taxes:{}
            });
        }
        req.body.data =  req.decoded.data;
        let deletedata = await TaxesServices.deleteData(req.params.id, res);
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


export async function updateTaxes(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Taxes id required!",
                Taxes:{}
            });
        }
        req.body.data = req.decoded.data;
        let validation =await createTaxesValidation(req.body);
        if(validation.success){
            let updatedata = await TaxesServices.updateData(req.params.id, req.body, res);
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
            statusCode:await checkCode('error'),
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}

export async function login(req, res) {
    try{
        let logindata = await TaxesServices.loginTaxes(req.body, res);
        if(logindata){
            res.json(logindata);
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
