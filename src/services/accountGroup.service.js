import AccountGroup from '../models/accountGroup';
import SubAccountGroup from '../models/subAccountGroup';
import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Op = Sequelize.Op;
import "@babel/polyfill"

exports.getSingleData = async function (id, res) {
    try {
        let createdata = await AccountGroup.findOne({ 
            where: {id:id},
            include:[{
                model:SubAccountGroup
            }]
        });
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group fetch Successfully",
                AccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group not Found!",
                AccountGroup:createdata?createdata:{}
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

exports.accountGroupByName = async function (value, res) {
    try {
        console.log(value);
        let createdata = await sequelize.query("SELECT id,name,uid,type,null as account_group_id FROM `account_groups` UNION SELECT id,name,uid,type,account_group_id From `sub_account_groups` WHERE `account_groups`.uid== `sub_account_groups`.account_group_id AND `account_groups`.name LIKE"+"'%"+value+"%'",{type:sequelize.QueryTypes.SELECT});
        if(createdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group fetch Successfully",
                AccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group not Found!",
                AccountGroup:createdata?createdata:{}
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


exports.getAllData = async function (id, res) {
    try {
        let createdata = await AccountGroup.findAll({ 
            where:{
                status:1
            },
            include:[{
                model:SubAccountGroup
            }],order: [
    // Will escape username and validate DESC against a list of valid direction parameters
    ['id', 'ASC']]
        });
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group fetch Successfully",
                AccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group not Found!",
                AccountGroup:createdata?createdata:[]
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
         let createdata =await sequelize.query("SELECT id,name,uid,type,null as account_group_id,status FROM `account_groups` WHERE status=:status UNION SELECT id,name,uid,type,account_group_id,null as status From `sub_account_groups` WHERE `sub_account_groups`.company_id=:id",{ replacements: { id: cid, status:1 },type:sequelize.QueryTypes.SELECT});
       // let createdata = await AccountGroup.findAll();
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups fetch Successfully",
                AccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups not Found!",
                AccountGroup:createdata?createdata:[]
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

exports.getAllDataGrouplist = async function (cid, res) {
    try {
         let createdata =await sequelize.query("SELECT id,name,uid,type,null as account_group_id,status FROM `account_groups` UNION SELECT id,name,uid,type,account_group_id,null as status From `sub_account_groups` WHERE `sub_account_groups`.company_id=:id",{ replacements: { id: cid },type:sequelize.QueryTypes.SELECT});
       // let createdata = await AccountGroup.findAll();
        if(createdata.length>0){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups fetch Successfully",
                AccountGroup:createdata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Groups not Found!",
                AccountGroup:createdata?createdata:[]
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
        let checkdata = await AccountGroup.findOne({where:{name:data.name}});
        if(checkdata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Already Exist!",
                AccountGroup:checkdata
            };
        }else{
            let createdata = await AccountGroup.Create(data);
            if(createdata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Account Group Created Successfully",
                    AccountGroup:createdata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"Something went wrong!",
                    AccountGroup:createdata
                };
            }
        }
    } catch (e) {
        console.log(e);
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
        let deletedata = await AccountGroup.destroy({ where: {id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Account Group Delete Successfully",
                AccountGroup:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                AccountGroup:deletedata
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
        let finddata = await  AccountGroup.findOne({ where: {id:id}});
        if(finddata){
          let updatedata =  await finddata.update(data)
          if(updatedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"AccountGroup update Successfully",
                AccountGroup:updatedata
            };
          }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                AccountGroup:updatedata
            };
          }
        }else{
            console.log("come");
            return {
                statusCode:res.statusCode,
                success: false,
                message:"AccountGroup not found!",
                AccountGroup:finddata?finddata:{}
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