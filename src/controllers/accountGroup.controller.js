




import AccountGroupServices from '../services/accountGroup.service'
import "@babel/polyfill"

export async function getAccountGroups(req, res) {
    try{
        let getdata = await AccountGroupServices.getAllData(req.params.id, res);
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

export async function getAccountGroupByName(req, res) {
    try{
        if(!req.params.name){
            return res.json({
                statusCode:await checkCode('validation'),
                success: false,
                message:"Account name required!",
                Taxes:{}
            });
        }
        let getdata = await AccountGroupServices.accountGroupByName(req.params.name, res);
        if(getdata){
            res.json(getdata);
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

export async function getAllAccountGroups(req, res) {
    try{
        let getdata = await AccountGroupServices.getAllDataGroups(req.params.id, res);
        if(getdata){
            res.json(getdata);
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

export async function getAllAccountGroupList(req, res) {
    try{
        let getdata = await AccountGroupServices.getAllDataGrouplist(req.params.id, res);
        if(getdata){
            res.json(getdata);
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




export async function getAccountGroup(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Company id required!",
                Company:{}
            });
        }
        let createdata = await AccountGroupServices.getSingleData(req.params.id, res);
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

export async function createAccountGroup(req, res) {
    try{
        let checkdata = await  AccountGroupServices.createData(req.body, res);
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

export async function deleteAccountGroup(req, res) {
    try{
        let deletedata = await AccountGroupServices.deleteData(req.params.id, res);
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


export async function updateAccountGroup(req, res) {
    try{
        let updatedata = await AccountGroupServices.updateData(req.params.id, req.body, res);
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
