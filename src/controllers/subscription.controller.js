import subscriptionsService from '../services/subscriptions.service'
import "@babel/polyfill"
const Razorpay = require('razorpay')

export async function getSubscriptions(req, res) {
    try{
        
        let getdata = await subscriptionsService.getAllData(req.body, res);
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

export async function getActiveSubscriptions(req, res) {
    try{
        let getdata = await subscriptionsService.getActiveAllData(req.body, res);
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



export async function CheckSubscriptions(req, res) {
    try{
        let createdata = await subscriptionsService.checkPlanExpired(req.body, res);
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


export async function getSubscription(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Subscription id required!",
                Subscription:{}
            });
        }
        let createdata = await subscriptionsService.getSingleData(req.params.id, res);
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

export async function createSubscription(req, res) {
    try{
         //req.body.data = await req.decoded.data;
           // let data = await encreption(req.body);
            
        let checkdata = await  subscriptionsService.createData(req.body, res);
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

export async function deleteSubscription(req, res) {
    try{
        let deletedata = await subscriptionsService.deleteData(req.params.id, res);
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


export async function updateSubscription(req, res) {
    try{
        let updatedata = await subscriptionsService.updateData(req.params.id, req.body, res);
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

export async function Order(req, res) {
    try{
        subscriptionsService.order(req, res);
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}

export async function VerifyOrder(req, res) {
    try{
        const data = await subscriptionsService.verifyPayment(req);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}
export async function OrderListByUser(req, res) {
    try{
      const data = await subscriptionsService.orderListByUser(req,res);
       res.status(200).json(data);
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }
}
export async function OrderList(req, res) {
    try{
     subscriptionsService.orderList(req);
    }catch(err){
        res.status(500).json({
            statusCode:res.statusCode,
            error:err,
            success: false,
            message:"Something went wrong!"
        })
    }
}


export async function DownloadInvoice(req, res) {
    try{
        if(!req.body.id){
            return res.status(300).json({
                success: false,
                message:"Order id required!"
            });
        }
        // req.body.data = await req.decoded.data;
        let createdata = await subscriptionsService.getDownload(req.body, res);
        if(createdata){
            res.json(createdata);
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

export async function RemoveInvoice(req, res) {
    try{
        if(!req.body.id){
            return res.status(300).json({
                success: false,
                message:"Order id required!"
            });
        }
        let createdata = await subscriptionsService.getRemove(req.body, res);
        if(createdata){
            res.json(createdata);
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


export async function subscribedList(req, res) {
    try{
        // if(!req.body.id){
        //     return res.status(300).json({
        //         success: false,
        //         message:"Order id required!"
        //     });
        // }
        let createdata = await subscriptionsService.subscribed(req.body, res);
        if(createdata){
            res.json(createdata);
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
