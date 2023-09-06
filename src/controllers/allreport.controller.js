
import AllReportServices from '../services/allReport.service'
import {createAllReportValidation} from '../validation/ReportValidation';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"


export async function getProitLossSheet(req, res) {
  try{
     
        let validation =await createAllReportValidation(req.body);
        if(validation.success){
          
        req.body.data = req.decoded.data;
        let createdata = await AllReportServices.getProitLossSheetData(req.body, res);  
        // getProitLossSheet(req.body, res);
        if(createdata){
            res.json(createdata);
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
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }


}



export async function getBlanceSheet(req, res) {
  try{
     
        let validation =await createAllReportValidation(req.body);
        if(validation.success){
          
        req.body.data = req.decoded.data;
        let createdata = await AllReportServices.getBlanceSheetReport(req.body, res);
        if(createdata){
            res.json(createdata);
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
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }


}



export async function getTrailBlance(req, res) {
    try{
          let validation =await createAllReportValidation(req.body);
          if(validation.success){
              req.body.data = req.decoded.data;
              let createdata = await AllReportServices.getTrailBlanceReport(req.body, res);
                if(createdata){
                    res.json(createdata);
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
            error:err.message,
            success: false,
            message:"Something went wrong!"
        })
    }
}

