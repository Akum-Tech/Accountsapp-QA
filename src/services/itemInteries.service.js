import ItemInteries from '../models/itemInteries';
import Company from '../models/company';
import { checkCode } from "../utility/statusCode";
import Sequelize from 'sequelize';
import Units from '../models/units';
import State from '../models/states';
import StockGroup from '../models/stockGroup';
import subStockGroup from '../models/stockSubGroup';
import City from '../models/cities';
const Op = Sequelize.Op;
import uniqid from 'uniqid';
import "@babel/polyfill"
import Ledger from '../models/ledger';
import Constant from '../constant/config';
import { decreption } from '../security/ledger';

exports.getSingleData = async function (id, res) {
    try {
        let createdata = await ItemInteries.findOne({ where: {uid:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"ItemInteries fetch Successfully",
                ItemInteries:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"ItemInteries not Found!",
                ItemInteries:createdata?createdata:{}
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
        let createdata = await ItemInteries.findAll({
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
                message:"ItemInteries fetch Successfully",
                ItemInteries:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"ItemInteries not Found!",
                ItemInteries:createdata?createdata:[]
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
        let checkdata = await ItemInteries.findOne({where:{name:data.name,company_id:data.company_id}});
        if(checkdata){
           
            return {
                statusCode:await checkCode("validation"),
                success: true,
                message:"ItemInteries Already Exist",
                ItemInteries:checkdata
            };
        }else{
            data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await ItemInteries.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"ItemInteries Created Successfully",
                    ItemInteries:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Something went wrong!",
                    ItemInteries:createdata
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
        let deletedata = await  ItemInteries.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"ItemInteries Delete Successfully",
                ItemInteries:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                ItemInteries:deletedata
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
        let finddata = await  ItemInteries.findOne({ where:{uid:id,company_id:data.company_id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"ItemInteries update Successfully",
                ItemInteries:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                ItemInteries:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"ItemInteries not found!",
                ItemInteries:finddata?finddata:{}
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
