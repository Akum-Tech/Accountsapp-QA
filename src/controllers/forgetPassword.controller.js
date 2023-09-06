import ForgetPasswordServices from '../services/forgetPassword.service'
import "@babel/polyfill"
import { forgetPasswordValidation } from '../validation/forgetPassword';
import {updatePasswordValidation}from '../validation/forgetPassword';
import { verifyOtpValidation } from '../validation/forgetPassword';
import { checkCode } from '../utility/statusCode';

export async function genrateOtp(req, res) {
    try{

let validation =await forgetPasswordValidation(req.body);
        if(validation.success){
         let checkdata = await  ForgetPasswordServices.genrateOtp(req.body, res);
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

export async function verifyOtp(req, res) {
    try{
let validation =await verifyOtpValidation(req.body);
        if(validation.success){
 let checkdata = await ForgetPasswordServices.verifyotp(req.body, res);
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
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function UpdatePassword(req, res) {
    try{
let validation =await updatePasswordValidation(req.body);
        if(validation.success){
 let updatedata = await ForgetPasswordServices.updateData(req.params.id, req.body, res);
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
