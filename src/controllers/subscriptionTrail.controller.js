import subscriptionsTrailService from '../services/subscriptionTrail.service'
import "@babel/polyfill"
const Razorpay = require('razorpay')

export async function getSubscriptionTrails(req, res) {
    try{
        let getdata = await subscriptionsTrailService.getAllData(req.body, res);
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

export async function getSubscriptionTrail(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Subscription id required!",
                Subscription:{}
            });
        }
        let createdata = await subscriptionsTrailService.getSingleData(req.params.id, res);
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

export async function createSubscriptionTrail(req, res) {
    try{
         //req.body.data = await req.decoded.data;
           // let data = await encreption(req.body);
            
        let checkdata = await  subscriptionsTrailService.createData(req.body, res);
        if(checkdata){
            res.json(checkdata);
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

export async function deleteSubscriptionTrail(req, res) {
    try{
        let deletedata = await subscriptionsTrailService.deleteData(req.params.id, res);
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

export async function updateSubscriptionTrail(req, res) {
    try{
        let updatedata = await subscriptionsTrailService.updateData(req.params.id, req.body, res);
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
