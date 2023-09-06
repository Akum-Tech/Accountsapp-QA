import StockSubGroup from '../models/stockSubGroup';
import StockGroup from '../models/stockGroup';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
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
      StockSubGroup: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await StockSubGroup.findOne({ where: {uid:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup fetch Successfully",
                StockSubGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup not Found!",
                StockSubGroup:createdata?createdata:{}
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

exports.getAllData = async function (cid, res) {
    try {
        let createdata = await StockSubGroup.findAll({
  where: {
    company_id: cid
  },include:[{
                model:StockGroup,attributes: ['uid','stock_name']
            }]
});
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup fetch Successfully",
                StockSubGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup not Found!",
                StockSubGroup:createdata?createdata:[]
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
        let checkdata = await StockSubGroup.findOne({where:{stock_name:data.stock_name,company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"StockSubGroup Already Exist"
            };
        }else{
             data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await StockSubGroup.create(data);
            if(createdata){
                entry.createData(createdata.dataValues.company_id, Message.sub_stock_create);
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"StockSubGroup Created Successfully",
                    StockSubGroup:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    StockSubGroup:createdata
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
        let findItem = await Item.findOne({where:{stock_sub_group_id:id}});

        if(findItem){
          return {
            statusCode: res.statusCode,
            success: false,
            message: "you can not delete Sub Stock Group!",
            Ledger: {}
          };
        }


        let deletedata = await  StockSubGroup.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup Delete Successfully",
                StockSubGroup:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                StockSubGroup:deletedata
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
        let finddata = await  StockSubGroup.findOne({ where: {uid:id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"StockSubGroup update Successfully",
                StockSubGroup:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                StockSubGroup:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"StockSubGroup not found!",
                StockSubGroup:finddata?finddata:{}
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
