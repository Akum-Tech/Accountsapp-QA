import City from '../models/cities';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await City.findAll({ where: {state_id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City fetch Successfully",
                city:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City not Found!",
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
        let createdata = await City.findAll(data);
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City fetch Successfully",
                city:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City not Found!",
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
        let checkdata = await City.findOne({where:{name:data.name}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"City Already Exist",
                city:checkdata
            };
        }else{
            let createdata = await City.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"City Created Successfully",
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
        let deletedata = await  City.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City Delete Successfully",
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
        let finddata = await  City.findOne({ where: {id:id}});
        if(finddata){
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"City update Successfully",
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
                message:"City not found!",
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