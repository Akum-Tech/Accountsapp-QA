import PurposeServices from '../services/purpose.service'
import "@babel/polyfill"

export async function getPurposes(req, res) {
    try{
        let getdata = await PurposeServices.getAllData(req.params, res);
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


export async function getPurpose(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Purpose id required!",
                Purpose:{}
            });
        }
        let createdata = await PurposeServices.getSingleData(req.params.id, res);
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

export async function createPurpose(req, res) {
    try{
        let checkdata = await  PurposeServices.createData(req.body, res);
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

export async function deletePurpose(req, res) {
    try{
        let deletedata = await PurposeServices.deleteData(req.params.id, res);
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


export async function updatePurposes(req, res) {
    try{
        let updatedata = await PurposeServices.updateData(req.params.id, req.body, res);
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
