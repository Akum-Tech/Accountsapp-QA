import SubAccountGroupServices from '../services/subAccountGroup.service'
import "@babel/polyfill"

export async function getSubAccountGroups(req, res) {
    try{
        let getdata = await SubAccountGroupServices.getAllData(req.query.company_id, res);
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


export async function getSubAccountGroup(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"SubAccountGroup id required!",
                SubAccountGroup:{}
            });
        }
        let createdata = await SubAccountGroupServices.getSingleData(req.params.id, res);
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

export async function createSubAccountGroup(req, res) {
    try{
        req.body.name = req.body.name.toLowerCase();
        let checkdata = await  SubAccountGroupServices.createData(req.body, res);
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

export async function deleteSubAccountGroup(req, res) {
    try{
        let deletedata = await SubAccountGroupServices.deleteData(req.params.id, res);
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


export async function updateSubAccountGroups(req, res) {
    try{
        let updatedata = await SubAccountGroupServices.updateData(req.params.id, req.body, res);
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

