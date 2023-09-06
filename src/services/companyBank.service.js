import CompanyBank from '../models/company_bank';
import Sequelize from 'sequelize';
import { checkCode } from '../utility/statusCode';
import uniqid from 'uniqid';
import fs from 'fs';
const Op = Sequelize.Op;
import "@babel/polyfill"


exports.getSingleData = async function (id, data, res) {
    try {
        console.log(id);
        let createdata = await CompanyBank.findAll({ where: {company_id:id}});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Company Bank fetch Successfully",
                company:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Company Bank not Found!",
                company:createdata?createdata:{}
            };
        }
    } catch (e) {
        return {
            statusCode:await checkCode('error'),
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

// exports.getAllData = async function (data, res) {
//     try {
//         let createdata = await CompanyBank.findAll({ where: {company_id:id}});
//         if(createdata.length>0){
//             return {
//                 statusCode:res.statusCode,
//                 success: true,
//                 message:"CompanyBank fetch Successfully",
//                 company:createdata
//             };
//         }else{
//             return {
//                 statusCode:res.statusCode,
//                 success: true,
//                 message:"CompanyBank not Found!",
//                 company:createdata?createdata:[]
//             };
//         }
//     } catch (e) {
//         return {
//             statusCode:await checkCode('error'),
//             success: false,
//             error:e,
//             message:"Something went wrong!"
//         }
//     }
// }

exports.createData = async function (data, res) {
    try {
        let checkdata = await CompanyBank.findOne({where:{account_number:data.account_number, company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Already Exist!",
                company:checkdata
            };
        }else{
            data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            let createdata = await CompanyBank.create(data);
            if(createdata){
                if(createdata.dataValues.id){
                    return {
                        statusCode:res.statusCode,
                        success: true,
                        message:"CompanyBank Created Successfully",
                        company:createdata
                    };
                }else{
                    return {
                        statusCode:res.statusCode,
                        success: true,
                        message:"company created",
                        company:createdata
                    };
                }
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"company created",
                    company:createdata
                };
            }
        }
    } catch (e) {
        return {
            statusCode:await checkCode('error'),
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.deleteData = async function (id, res) {
    try {
        console.log(id);
        let deleteComapnydata = await  CompanyBank.destroy({ where: {uid:id}});
        if(deleteComapnydata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"CompanyBank Delete Successfully",
                company:deleteComapnydata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                company:deleteComapnydata
            };
        }
    } catch (e) {
        console.log(e);
        return {
            statusCode:await checkCode('error'),
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.updateData = async function (id, data, res) {
    try {
        let finddata = await  CompanyBank.findOne({ where: {uid:id}});
        if(finddata){
          data.updated_date = new Date();
          let updatedata =  await finddata.update(data)
            if(updatedata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"CompanyBank update Successfully",
                    company:updatedata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Something went wrong!",
                    company:updatedata
                };
            }
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"CompanyBank not found!",
                company:finddata?finddata:{}
            };
        }
    } catch (e) {
        return {
            statusCode:await checkCode('error'),
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}