import GSTReport from '../services/gstReport.service'
import "@babel/polyfill"



export async function getGstR1(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST1(req.body, res);
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

export async function getGstR1Summary(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST1Summary(req.body, res);
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


export async function getGstR2(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST2(req.body, res);
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

export async function getGstR2Summary(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST2Summary(req.body, res);
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

export async function getGstR3B(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST3B(req.body, res);
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

export async function getGstR3BSummary(req, res){
    try{
        req.body.data =await req.decoded.data;
        let getdata = await GSTReport.getReportGST3BSummary(req.body, res);
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