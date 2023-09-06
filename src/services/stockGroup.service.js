import StockGroup from '../models/stockGroup';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import { sequelize } from '../database/database';
import uniqid from 'uniqid';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import Message from '../constant/entryMessage'
import entry from '../utility/entry'
import "@babel/polyfill"
import Item from '../models/items';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      StockGroup: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await StockGroup.findOne({ where: {uid:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup fetch Successfully",
                stockGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup not Found!",
                stockGroup:createdata?createdata:{}
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
                    let createdata = await StockGroup.findAll({
            where: {
                company_id: cid
            }
            });
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup fetch Successfully",
                stockGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup not Found!",
                stockGroup:createdata?createdata:[]
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


exports.getAllDataGroups = async function (cid, res) {
    try {
         let createdata =await sequelize.query("SELECT `uid`,`stock_name`,null as stock_id FROM `stock_groups` WHERE company_id=:id union SELECT `uid`,`stock_name`,stock_id from stock_sub_groups where company_id=:id",{ replacements: { id: cid },type:sequelize.QueryTypes.SELECT});
       // let createdata = await AccountGroup.findAll();
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups fetch Successfully",
                StockGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups not Found!",
                StockGroup:createdata?createdata:[]
            };
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




exports.createData = async function (data, res) {
    try {
        let checkdata = await StockGroup.findOne({where:{stock_name:data.stock_name,company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"StockGroup Already Exist"
            };
        }else{
             data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await StockGroup.create(data);
            if(createdata){
                entry.createData(createdata.dataValues.company_id, Message.stock_create);
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"StockGroup Created Successfully",
                    stockGroup:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    stockGroup:createdata
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

        let findItem = await Item.findOne({where:{stock_group_id:id}});

        if(findItem){
          return {
            statusCode: res.statusCode,
            success: false,
            message: "you can not delete Stock Group!",
            Ledger: {}
          };
        }


        let deletedata = await  StockGroup.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup Delete Successfully",
                stockGroup:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                stockGroup:deletedata
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
        let finddata = await  StockGroup.findOne({ where: {uid:id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockGroup update Successfully",
                stockGroup:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                stockGroup:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"StockGroup not found!",
                stockGroup:finddata?finddata:{}
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
