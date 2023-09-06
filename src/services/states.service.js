import State from '../models/states';
import Sequelize from 'sequelize';
import { checkCode } from "../utility/statusCode";
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import "@babel/polyfill"

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      State: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, res) {
    try {
        let createdata = await State.findOne({ where: {id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State fetch Successfully",
                state:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State not Found!",
                state:createdata?createdata:{}
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
        let createdata = await State.findAll({order: [
    // Will escape username and validate DESC against a list of valid direction parameters
    ['name', 'ASC']]});
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State fetch Successfully",
                state:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State not Found!",
                state:createdata?createdata:[]
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
        let checkdata = await State.findOne({where:{name:data.name}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"State Already Exist",
                state:checkdata
            };
        }else{
            
            let createdata = await State.create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"State Created Successfully",
                    state:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    state:createdata
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
        let deletedata = await  State.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State Delete Successfully",
                state:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                state:deletedata
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
        let finddata = await  State.findOne({ where: {id:id}});
        if(finddata){
            if(finddata.dataValues.taxes_slab_value!=data.taxes_slab_value){
                data.effective_date = new Date();
            }
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"State update Successfully",
                state:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                state:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"State not found!",
                state:finddata?finddata:{}
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
