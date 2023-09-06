import CompanyServices from '../services/company.service'
import { createCompanyValidation } from '../validation/company';
import { checkCode } from '../utility/statusCode';

import { encreption, decreption } from "../security/company";

import "@babel/polyfill"

export async function getCompanys(req, res) {
    try{
        // req.body.data = req.decoded.data;
        let getdata = await CompanyServices.getAllData(req.body, res);
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


export async function getCompany(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Company id required!",
                Company:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await CompanyServices.getSingleData(req.params.id, req.body, res);
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

export async function createCompany(req, res) {
    try{
        let validation =await createCompanyValidation(req.body);
        console.log('validation---->',validation)
        if(validation.success){
            if(req.file){
                req.body.company_logo = await req.file.path;
            }else{
                req.body.company_logo = '';
            }
            console.log('req.body---->',req.body)
            console.log('12345')
            // req.body.data = await req.decoded.data;
            let data = await encreption(req.body);
            console.log('data------>',data)
            if(data){
                let checkdata = await CompanyServices.createData(data, res);
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
        // console.log(err)
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteCompany(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Company id required!",
                Company:{}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await CompanyServices.deleteData(req.params.id, res);
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


export async function updateCompany(req, res) {
    try{
        // let validation =await createCompanyValidation(req.body);
        // if(validation.success){
            if(req.file){
                req.body.company_logo = req.file.path;
            }
            if(req.body.file){
                req.body.company_logo = req.body.file;
            }
            console.log("req.body", req.body)
            req.body.data = req.decoded.data;
            let data = await encreption(req.body);
            if(data){
                let updatedata = await CompanyServices.updateData(req.params.id, data, res);
                if(updatedata){
                    res.json(updatedata);
                }
            }
        // }else{
        //     res.json({
        //         statusCode: await checkCode('validation'),
        //         success: false,
        //         message:validation.message
        //     })
        // }
    }catch(err){
        res.status(500).json({
            statusCode:await checkCode('error'),
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}

export async function updatePeriod(req, res){
    try{
        if(req.params.id){
            req.body.data = req.decoded.data;
            let updatedata = await CompanyServices.updatePeriodDate(req.body, res);
            if(updatedata){
                res.json(updatedata);
            }
        }else{
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message:"Company id required"
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

export async function updatemanualstock(req, res){
    try{
        if(req.params.id){
            req.body.data = req.decoded.data;
            let updatedata = await CompanyServices.updateMaualstock(req.body, res);
            if(updatedata){
                res.json(updatedata);
            }
        }else{
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message:"Company id required"
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