import RegistrationtypeServices from '../services/registrationtype.service'
import "@babel/polyfill"

export async function getRegistrationTypes(req, res) {
    try{
        req.body.data = req.decoded.data;
        let getdata = await RegistrationtypeServices.getAllData(req.body, res);
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


export async function getRegistrationType(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Ledger id required!",
                Ledger:{}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await RegistrationtypeServices.getSingleData(req.params.id, res);
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

