import Units from '../models/units';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      Units: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await Units.findOne({ where: {id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units fetch Successfully",
                Units:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units not Found!"
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
        let createdata = await Units.findAll(data);
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units fetch Successfully",
                Units:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units not Found!"
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
        let checkdata = await Units.findOne({where:{uqc:data.uqc}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"Units Already Exist",
                Units:checkdata
            };
        }else{
            let createdata = await Units.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Units Created Successfully",
                    Units:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    Units:createdata
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
        let deletedata = await  Units.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units Delete Successfully"
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!"
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
        let finddata = await  Units.findOne({ where: {id:id}});
        if(finddata){
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Units update Successfully",
                Units:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                Units:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Units not found!",
                Units:finddata?finddata:{}
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
