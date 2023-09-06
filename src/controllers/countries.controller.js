import CountryServices from '../services/countries.service'
import "@babel/polyfill"

export async function getCountrys(req, res) {
    try{
        let getdata = await CountryServices.getAllData(req.body, res);
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


export async function getCountry(req, res) {
    try{
        if(!req.params.id){
            return res.json({
                statusCode:res.statusCode,
                success: false,
                message:"Country id required!",
                Country:{}
            });
        }
        let createdata = await CountryServices.getSingleData(req.params.id, res);
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

export async function createCountry(req, res) {
    try{
        let checkdata = await  CountryServices.createData(req.body, res);
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

export async function deleteCountry(req, res) {
    try{
        let deletedata = await CountryServices.deleteData(req.params.id, res);
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


export async function updateCountrys(req, res) {
    try{
        let updatedata = await CountryServices.updateData(req.params.id, req.body, res);
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
