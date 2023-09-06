import SubAccountGroup from '../models/subAccountGroup';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
import accountGroup from '../models/accountGroup';
const Op = Sequelize.Op;
import uniqid from 'uniqid';
import nodemailer from 'nodemailer';
import Message from '../constant/entryMessage'
import entry from '../utility/entry'
import "@babel/polyfill"

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      SubAccountGroup: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await SubAccountGroup.findOne({ where: {uid:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup fetch Successfully",
                subAccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup not Found!",
                subAccountGroup:createdata?createdata:{}
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
        let createdata = await SubAccountGroup.findAll({
  where: {
    company_id: cid
  },include: [{
                model: accountGroup,
                attributes: ['name'],
             }]
});
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup fetch Successfully",
                subAccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup not Found!",
                subAccountGroup:createdata?createdata:[]
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
        let checkdata = await SubAccountGroup.findOne({where:{name:data.name,company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"SubAccountGroup Already Exist"
            };
        }else{
             data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await SubAccountGroup.create(data);
            if(createdata){
                entry.createData(createdata.dataValues.company_id, Message.sub_account_create);
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"SubAccountGroup Created Successfully",
                    subAccountGroup:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    subAccountGroup:createdata
                };
            }
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

exports.deleteData = async function (id, res) {
    try {
        let deletedata = await  SubAccountGroup.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup Delete Successfully",
                subAccountGroup:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                subAccountGroup:deletedata
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
        let finddata = await  SubAccountGroup.findOne({ where: {uid:id,company_id:data.company_id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SubAccountGroup update Successfully",
                subAccountGroup:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                subAccountGroup:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"SubAccountGroup not found!",
                subAccountGroup:finddata?finddata:{}
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
