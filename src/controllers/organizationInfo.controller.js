import OrganizationInfoServices from '../services/organizationInfo.service'
// import { createOrganizationInfoValidation } from '../validation/company';
import { checkCode } from '../utility/statusCode';

import { encreption, decreption } from "../security/company";

import "@babel/polyfill"

export async function getOrganizationInfos(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await OrganizationInfoServices.getAllData(req.body, res);
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


export async function getOrganizationInfo(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"OrganizationInfo id required!",
                OrganizationInfo:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await OrganizationInfoServices.getSingleData(req.params.id, req.body, res);
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

export async function createOrganizationInfo(req, res) {
    try{
        if(req.file){
            req.body.logo = req.file.path;
        }
        console.log("req.body", req.body)
        req.body.data = await req.decoded.data;
        if(req.body){
            let checkdata = await OrganizationInfoServices.createData(req.body, res);
            if(checkdata){
                res.json(checkdata);
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteOrganizationInfo(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"OrganizationInfo id required!",
                OrganizationInfo:{}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await OrganizationInfoServices.deleteData(req.params.id, res);
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


export async function updateOrganizationInfo(req, res) {
    try{
        if(req.file){
            req.body.logo = req.file.path;
        }
        if(req.body.file){
            req.body.logo = req.body.file;
        }
        req.body.data = req.decoded.data;
        if(req.body){
            let updatedata = await OrganizationInfoServices.updateData(req.params.id, req.body, res);
            if(updatedata){
                res.json(updatedata);
            }
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
