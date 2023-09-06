import LedgerBalance from '../models/ledgerBalance';
import Company from '../models/company';
import Sequelize from 'sequelize';
import Units from '../models/units';
import State from '../models/states';
import StockGroup from '../models/stockGroup';
import subStockGroup from '../models/stockSubGroup';
import City from '../models/cities';
const Op = Sequelize.Op;
import uniqid from 'uniqid';
import "@babel/polyfill"


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await LedgerBalance.findOne({ where: {uid:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance fetch Successfully",
                LedgerBalance:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance not Found!",
                LedgerBalance:createdata?createdata:{}
            };
        }
    } catch (e) {
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.getAllData = async function (cid, res) {
    try {
        let createdata = await LedgerBalance.findAll({
            where: {
                company_id: cid
            },include: [{
                model: Company,
                include: [{
                    model:City,
                    attributes: ['name'],
                    include: [{
                        model:State,
                        attributes: ['name']
                    }]
                }]
             },{
                model: Units,
                attributes: ['uqc','quantity_description'],
             },{
                model: StockGroup,
                attributes: ['uid','stock_name']
             },{
                        model:subStockGroup,
                        attributes: ['uid','stock_name']
                    }]
            });
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance fetch Successfully",
                LedgerBalance:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance not Found!",
                LedgerBalance:createdata?createdata:[]
            };
        }
    } catch (e) {
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.createData = async function (data, res) {
    try {
        let checkdata = await LedgerBalance.findOne({where:{name:data.name,company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Already Exist",
                LedgerBalance:checkdata
            };
        }else{
            data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await LedgerBalance.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"LedgerBalance Created Successfully",
                    LedgerBalance:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Something went wrong!",
                    LedgerBalance:createdata
                };
            }
        }
    } catch (e) {
        return {
            statusCode:res.statusCode,
            success: false,
            error:e.message,
            message:"Something went wrong!"
        }
    }
}

exports.deleteData = async function (id, res) {
    try {
        let deletedata = await  LedgerBalance.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance Delete Successfully",
                LedgerBalance:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                LedgerBalance:deletedata
            };
        }
    } catch (e) {
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.updateData = async function (id, data, res) {
    try {
        let finddata = await  LedgerBalance.findOne({ where:{uid:id,company_id:data.company_id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"LedgerBalance update Successfully",
                LedgerBalance:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                LedgerBalance:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"LedgerBalance not found!",
                LedgerBalance:finddata?finddata:{}
            };
        }
    } catch (e) {
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}
