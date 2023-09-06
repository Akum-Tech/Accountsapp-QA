import Country from '../models/countries';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      Country: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await Country.findOne({ where: {id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country fetch Successfully",
                country:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country not Found!",
                country:createdata?createdata:{}
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
        let createdata = await Country.findAll(data);
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country fetch Successfully",
                country:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country not Found!",
                country:createdata?createdata:[]
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
        let checkdata = await Country.findOne({where:{name:data.name}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"Country Already Exist",
                country:checkdata
            };
        }else{
            let createdata = await Country.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Country Created Successfully",
                    country:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    country:createdata
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
        let deletedata = await  Country.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country Delete Successfully",
                country:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                country:deletedata
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
        let finddata = await  Country.findOne({ where: {id:id}});
        if(finddata){
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Country update Successfully",
                country:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                country:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Country not found!",
                country:finddata?finddata:{}
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
