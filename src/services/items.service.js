import Item from '../models/items';
import Taxes from '../models/taxes';
import { checkCode } from "../utility/statusCode";
import ItemStock from '../models/itemStock';
import Company from '../models/company';
import Sequelize from 'sequelize';
import Units from '../models/units';
import State from '../models/states';
import StockGroup from '../models/stockGroup';
import subStockGroup from '../models/stockSubGroup';
import City from '../models/cities';
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import uniqid from 'uniqid';
import nodemailer from 'nodemailer';
import Message from '../constant/entryMessage'
import Constant from '../constant/config';
import entry from '../utility/entry'

import { decreptionItem, decreptionItemAmount } from "../security/item";


import "@babel/polyfill"
import ItemInteries from '../models/itemInteries';
import Ledger from '../models/ledger';
import { decreption, encreption, encreptionamount } from '../security/ledger';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      Item: "webapitest101@gmail.com",
      pass: "test@123#"
    },
    secure:false,
    tls: {rejectUnauthorized: false},
});


exports.getSingleData = async function (id, data, res) {
    try {
        let createdata = await Item.findOne({ where: {uid:id}});
        if(createdata){
            let response = await decreptionItem(createdata, 'object', data.data.email)
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item fetch Successfully",
                Item:response
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

exports.getAllData = async function (cid, data, res) {
    try {
        let createdata = await Item.findAll({
            where: {
                company_id: cid
            },include: [{
                model: Company,
                include: [{
                    model:City,
                    attributes: ['name'],
                    include: [{
                        model:State,
                        attributes: ['name']
                    }]
                }]
             },{
                model: Units,
                attributes: ['uqc','quantity_description'],
             },{
                model: Taxes
             },{
                model: StockGroup,
                attributes: ['uid','stock_name']
             },{
                        model:subStockGroup,
                        attributes: ['uid','stock_name']
             }],order: [
                ['id', 'ASC']
            ]
            });
        if(createdata.length>0){
            let response = await decreptionItem(createdata, 'array', data.data.email)
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item fetch Successfully",
                Item:response
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
        console.log(e, " = == ")
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
        let checkdata = await Item.findOne({where:{name:data.name,company_id:data.company_id}});
        if(checkdata){
            return {
                statusCode:await checkCode("validation"),
                success: false,
                message:"Item Already Exist",
                Item:checkdata
            };
        }else{
            data.uid = await uniqid();
            data.creation_date = new Date();
            data.updated_date = new Date();
            data.effective_date = new Date();

            let createdata = await Item.create(data);
            if(createdata){
                let findledger = await Ledger.findOne({where:{
                    account_group_id:Constant.stockinhand_id,
                    company_id:data.company_id
                }});
                if(findledger){
                    findledger = await decreption(findledger, 'object', data.data.email);
                    let updatedataledger = {
                        data:{
                            email:data.data.email
                        },
                        amount: findledger.dataValues.amount
                    }

                  
                    createdata = await decreptionItemAmount(createdata, 'object', data.data.email);

                    if(createdata.dataValues && createdata.dataValues.quantity){
                        updatedataledger.amount =await Number(updatedataledger.amount)+Number(Number(createdata.dataValues.quantity)*Number(createdata.dataValues.rate));
                        updatedataledger.amount = updatedataledger.amount.toString();
                        updatedataledger =await encreptionamount(updatedataledger);

                        console.log("createdata", updatedataledger)
                        findledger.update(updatedataledger);
                    }
                }

                entry.createData(data.company_id, Message.item_create);
                
                let body = await {
                    uid: await uniqid(),
                    item_id:createdata.dataValues.uid,
                    date:createdata.dataValues.creation_date,
                    period_start:createdata.dataValues.period_start,
                    period_end:createdata.dataValues.period_end,
                    opening_blance:createdata.dataValues.quantity,
                    inword:0,
                    outword:0,
                    closing:createdata.dataValues.quantity,
                    status:1,
                    creation_date:new Date(),
                    updated_date:new Date()
                }

                let findStock = await ItemStock.findOne({where:{item_id:body.item_id}});
                let stockcreate;
                if(!findStock){
                    stockcreate = await ItemStock.create(body)
                }
                if(stockcreate){
                    // let response = await decreptionItem(createdata, 'object', data.data.email)
                    return {
                        statusCode:res.statusCode,
                        success: true,
                        message:"Item Created Successfully",
                    };
                }else{
                    return {
                        statusCode:res.statusCode,
                        success: false,
                        message:"Something went wrong in item stock!",
                        Item:createdata
                    };
                }
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Something went wrong!",
                    Item:createdata
                };
            }
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}

exports.deleteData = async function (id, data, res) {
    try {

        console.log("data", data)
        let findItemInteries = await ItemInteries.findOne({where:{item_id:id}});
        if(findItemInteries){
          return {
            statusCode: res.statusCode,
            success: false,
            message: "you can not delete Item!",
            Ledger: {}
          };
        }

        let findItem = await Item.findOne({ where: {uid:id}});
        if(findItem){
            findItem = await decreptionItem(findItem, 'object', data.data.email);
            let findledger = await Ledger.findOne({where:{
                account_group_id:Constant.stockinhand_id,
                company_id:findItem.dataValues.company_id
            }});
            findledger = await decreption(findledger, 'object', data.data.email);
            let updatedataledger = {
                data:{
                    email:data.data.email
                },
                amount : Number(findledger.amount)-Number(findItem.dataValues.total_value),
            }
            updatedataledger.amount = updatedataledger.amount.toString();
            updatedataledger =await encreptionamount(updatedataledger);
            findledger.update(updatedataledger);
        }

        let deletedata = await  Item.destroy({ where: {uid:id}});
        // let deletedataStock = await  ItemStock.destroy({ where: {item_id:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"Item Delete Successfully",
                Item:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Something went wrong!",
                Item:deletedata
            };
        }
    } catch (e) {
        console.log("e", e)
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
        let key = data.data.email;
        let finddata = await  Item.findOne({ where:{uid:id,company_id:data.company_id}});
        if(finddata){
            data.updated_date = new Date();
            if(finddata.dataValues.taxes_slab_value!=data.taxes_slab_value){
                data.effective_date = new Date();
            }
            let findledger = await Ledger.findOne({where:{
                account_group_id:Constant.stockinhand_id,
                company_id:data.company_id
            }});
            finddata =await decreptionItemAmount(finddata, 'object', data.data.email);
            findledger = await decreption(findledger, 'object', data.data.email);


            console.log("olddata", finddata)

            let updatedataledger = {
                data:{
                    email:data.data.email
                },
                amount: Number(findledger.dataValues.amount)-Number(Number(finddata.dataValues.quantity)*Number(finddata.dataValues.rate))
            }

            let updatedata =  await finddata.update(data);
            if(updatedata){
                updatedata = await decreptionItemAmount(updatedata, 'object', data.data.email);
                if(updatedata.dataValues && updatedata.dataValues.quantity){
                    updatedataledger.amount =await Number(updatedataledger.amount)+Number(Number(updatedata.dataValues.quantity)*Number(updatedata.dataValues.rate));
                    updatedataledger.amount = updatedataledger.amount.toString();
                    updatedataledger =await encreptionamount(updatedataledger);
    
                    console.log("createdata", updatedataledger)
                    findledger.update(updatedataledger);
                }
           
                
                let finddataStock = await  ItemStock.findOne({ where:{item_id:id}});
                if(finddataStock){
                    let body = {    
                        financial_year : updatedata.dataValues.financial_year,
                        opening_blance : updatedata.dataValues.quantity,
                        closing : updatedata.dataValues.quantity,
                        updated_date : new Date()
                    }
                    let updatedataStock =  await finddataStock.update(body);
                    // console.log("updatedata", updatedata)
                    // let response = await decreptionItem(updatedata, 'object', data.data.email)
                    return {
                        statusCode:res.statusCode,
                        success: true,
                        message:"Item update Successfully",
                    };
                }else{
                     return {
                        statusCode:res.statusCode,
                        success: true,
                        message:"Item update Successfully",
                        Item:updatedata
                    };
                }   
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Something went wrong!",
                    Item:updatedata
                };
            }
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Item not found!",
                Item:finddata?finddata:{}
            };
        }
    } catch (e) {
        console.log("e", e)
        return {
            statusCode:res.statusCode,
            success: false,
            error:e,
            message:"Something went wrong!"
        }
    }
}
