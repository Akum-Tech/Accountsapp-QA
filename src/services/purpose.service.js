import Purpose from '../models/purpose';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await Purpose.findAll({ where: {id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose fetch Successfully",
                city:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose not Found!",
                city:createdata?createdata:{}
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

exports.getAllData = async function (data, res) {
    try {
        console.log("data = == = = ", data)
        let createdata = await Purpose.findAll({where:{
            type:data.type, status:1},order: [
                ['order_by', 'ASC']
            ]});
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose fetch Successfully",
                city:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose not Found!",
                city:createdata?createdata:[]
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
        let checkdata = await Purpose.findOne({where:{name:data.name}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"Purpose Already Exist",
                city:checkdata
            };
        }else{
            let createdata = await Purpose.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Purpose Created Successfully",
                    city:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    city:createdata
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
        let deletedata = await  Purpose.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose Delete Successfully",
                city:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                city:deletedata
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
        let finddata = await  Purpose.findOne({ where: {id:id}});
        if(finddata){
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Purpose update Successfully",
                city:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                city:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Purpose not found!",
                city:finddata?finddata:{}
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