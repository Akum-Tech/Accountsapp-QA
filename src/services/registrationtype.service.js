import registrationType from '../models/registrationType';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      Item: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await registrationType.findOne({ where: {id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item fetch Successfully",
                Item:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item not Found!",
                Item:createdata?createdata:{}
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
        let createdata = await registrationType.findAll(data);
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item fetch Successfully",
                Item:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item not Found!",
                Item:createdata?createdata:[]
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
