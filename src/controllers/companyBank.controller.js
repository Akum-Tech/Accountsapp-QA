import CompanyBankServices from '../services/companyBank.service'
import { createCompanyBankValidation } from '../validation/companyBank';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"

// export async function getCompanyBanks(req, res) {
//     try{
//         req.body.data = req.decoded.data;
//         let getdata = await CompanyBankServices.getAllData(req.body, res);
//         if(getdata){
//             res.json(getdata);
//         }
//     }catch(err){
//         res.status(500).json({
//             statusCode:await checkCode('error'),
//             success: false,
//             error:err,
//             message:"Something went wrong!"
//         })
//     }
// }


export async function getCompanyBank(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Company required!",
                CompanyBank:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await CompanyBankServices.getSingleData(req.params.id, req.body, res);
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

export async function createCompanyBank(req, res) {
    try{
        let validation =await createCompanyBankValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            let checkdata = await  CompanyBankServices.createData(req.body, res);
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
            statusCode:await checkCode('error'),
            success: false,
            error:err,
            message:"Something went wrong!"
        })
    }
}

export async function deleteCompanyBank(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"CompanyBank id required!",
                CompanyBank:{}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await CompanyBankServices.deleteData(req.params.id, res);
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


export async function updateCompanyBank(req, res) {
    try{
        let validation =await createCompanyBankValidation(req.body);
        if(validation.success){
            req.body.data = req.decoded.data;
            let updatedata = await CompanyBankServices.updateData(req.params.id, req.body, res);
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
