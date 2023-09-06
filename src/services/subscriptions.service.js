import Subscription from "../models/subscription";
import SubscriptionOrder from "../models/subscriptionOrder";
import { checkCode } from "../utility/statusCode";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import "@babel/polyfill";
import Company from "../models/company";
import User from "../models/users";
import SubscriptionTranction from "../models/subscriptionTransction";
var fs = require('fs');
import path from 'path';
import transport from "../utility/mail";
import config from "../constant/config";
import Constant from "../constant/config";
import OrganizationInfo from "../models/organizationInfo";
import Taxes from "../models/taxes";
import moment from 'moment';
var pdf = require('html-pdf');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios");
var converter = require('number-to-words');

exports.getSingleData = async function(id, res) {
  try {
    let createdata = await Subscription.findOne({ where: { id: id } , include:[{
      model:Taxes
    }]});
    if (createdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription fetch Successfully",
        Subscription: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription not Found!",
        Subscription: createdata ? createdata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.checkPlanExpired = async function(data, res) {
  try {
    let getUser = await User.findOne({where:{id:data.data.id}});
    if (getUser) {
      if(getUser.dataValues.subscription_end_date && new Date(getUser.dataValues.subscription_end_date+' 23:59:00').getTime() > new Date().getTime()){
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Subscription fetch Successfully",
          Subscription: true,
          subscription_date: getUser.dataValues.subscription_end_date
        };
      }else{
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Your subscription plan expired",
          Subscription: false
        };
      }
     
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Subscription not Found!",
        Subscription: false
      };
    }
  } catch (e) {
    console.log("e", e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};
exports.getAllData = async function(data, res) {
  try {

    let createdata = await Subscription.findAll({
      include:[{
        model:Taxes
      }],
      order: [
        // Will escape username and validate DESC against a list of valid direction parameters
        ["months", "ASC"]
      ]
    });
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription fetch Successfully",
        Subscription: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription not Found!",
        Subscription: createdata ? createdata : []
      };
    }
  } catch (e) {
    console.log("e", e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};
exports.getActiveAllData = async function(data, res) {
  try {
    let createdata = await Subscription.findAll({
      where:{
        status:'1'
      },
      include:[{
        model:Taxes
      }],
      order: [
        ["months", "ASC"]
      ]
    });
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription fetch Successfully",
        Subscription: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription not Found!",
        Subscription: createdata ? createdata : []
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};
exports.createData = async function(data, res) {
  try {
    let checkdata = await Subscription.findOne({
      where: { months: data.months }
    });
    if (checkdata) {
      return {
        statusCode:await checkCode("validation"),
        success: false,
        message: "Already Exist",
        Subscription: checkdata
      };
    } else {
      let createdata = await Subscription.create(data);
      if (createdata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Subscription Created Successfully",
          Subscription: createdata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Something went wrong!",
          Subscription: createdata
        };
      }
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, res) {
  try {
    let deletedata = await Subscription.destroy({ where: { id: id } });
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription Delete Successfully",
        Subscription: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        Subscription: deletedata
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.updateData = async function(id, data, res) {
  try {
    let finddata = await Subscription.findOne({ where: { id: id } });
    if (finddata) {
      let updatedata = await finddata.update(data);
      if (updatedata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Subscription update Successfully",
          Subscription: updatedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          Subscription: updatedata
        };
      }
    } else {
      console.log("come");
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Subscription not found!",
        Subscription: finddata ? finddata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.order = async function(req, res) {
  try {
    console.log("ordercreate", req);
    let finddata = await Subscription.findOne({ where: { id: req.body.id } });
    let data = new SubscriptionOrder();
    let recpit_id = Math.random().toString().substr(2, 8);
    let rzp = new Razorpay({
      key_id:config.razorpay_key_id,
      key_secret:config.razorpay_key_secret
    });
    var options = {
      amount: finddata.total * 100,
      currency: "INR",
      receipt: recpit_id,
      payment_capture: "0"
    };
    rzp.orders.create(options, async function(resp, order) {
      if (resp == null && order.id != null) {
        console.log("responce", resp);
        console.log("order", order);
        //let DataForUpdate = await  SubscriptionOrder.findOne({ where: {id: createdata.dataValues.id}});
        // data.razorpay_order_id = order.id;
        data = {
          user_id: req.decoded.data.uid,
          amount: finddata.basic,
          subscription_id: finddata.id,
          recpit_id: recpit_id,
          razorpay_order_id: order.id,
          gst: finddata.gst,
          total: finddata.total,
          status: "Pending",
          name:req.body.name?req.body.name:'',
          email:req.body.email?req.body.email:'',
          address:req.body.address?req.body.address:'',
          gst_number:req.body.name?req.body.gst_number:'',
        };
        let createdata = await SubscriptionOrder.create(data);
        //console.log(createdata.dataValues.id);
        //let dbop = await DataForUpdate.update(data);
        res.status(200).json({
          message: "Order Created Successfully",
          success: true,
          statuscode: 200,
          data: order
        });
      } else {
        return {
          statusCode: await checkCode("error"),
          success: false,
          message: "Something went wrong!"
        };
      }
    });
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.verifyPayment = async function(req) {
  try {
    let DataForUpdate = await SubscriptionOrder.findOne({
      where: { razorpay_order_id: req.body.razorpay_order_id }
    });

    if (req.body.razorpay_payment_id && req.body.razorpay_signature) {
      let data = {
        razorpay_payment_id: req.body.razorpay_payment_id,
        razorpay_signature: req.body.razorpay_signature,
        status: "success"
      };
      await DataForUpdate.update(data);
      console.log("ddd", DataForUpdate);
      let finddata = await Subscription.findOne({
        where: { id: DataForUpdate.subscription_id },
        include:[{
          model:Taxes
        }]
      });
      let user = await User.findOne({ where: { uid: DataForUpdate.user_id } });
      if (user) {
        if (new Date(user.subscription_end_date) > new Date()) {
          var d = new Date(user.subscription_end_date);
          d.setMonth(d.getMonth() + finddata.months);
          await User.update(
            { subscription_end_date: d },
            { where: { id: user.id } }
          );
        } else {
          var d = new Date();
          d.setMonth(d.getMonth() + finddata.months);
          await user.update(
            { subscription_end_date: d },
            { where: { id: user.id } }
          );
        }
        let transctiondata=null;
        if(user.subscription_end_date){
          transctiondata={
             user_id:user.uid,
              type:'paid',
              entry_by:'self',
             subscription_start:new Date(user.subscription_end_date),
             subscription_end:d
          }
         
        }else{
           transctiondata={
             user_id:user.uid,
              type:'paid',
              entry_by:'self',
             subscription_start:new Date(),
             subscription_end:d
          }
        }
        await SubscriptionTranction.create(transctiondata);

        let finSubscription = await Subscription.findOne({where:{id:DataForUpdate.subscription_id}})
        if(DataForUpdate && DataForUpdate.dataValues && DataForUpdate.dataValues.status=="success"){
          let url = Constant.smsurl;
          let urlwithnumber = url.concat(user.phone);
          let v3 = urlwithnumber.concat("&message=");
          let v4 = v3.concat(Constant.purchasemsgtxt1);
          let v5 = v4.concat(DataForUpdate.total);
          let v6 = v5.concat(Constant.purchasemsgtxt2);
          let v7 = v6.concat(finSubscription.months+" months");
          let v8 = v7.concat(Constant.purchasemsgtxt3);
          let v9 = v8.concat(moment(user.subscription_end_date).format('DD-MMM-YYYY'));
          let msg = v9.concat(Constant.purchasemsgtxt4+Constant.websiteurl);
  
          //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
          console.log("smstemplate", msg);
  
          // let lasturl=data.concat(msg);
          axios
            .get(msg)
            .then(function(response) {
              // handle success
              console.log(response);
              console.log("response");
            })
            .catch(function(error) {
              // handle error
              console.log(error);
              console.log("error");
            })
            .then(function() {
              // always executed
              console.log("always");
            });
        }
       
      

        console.log("finddata.dataValues1", finddata.dataValues)
        if(DataForUpdate && DataForUpdate.dataValues && DataForUpdate.dataValues.status=="success" && DataForUpdate.dataValues.email){
            let findInfo = await  OrganizationInfo.findAll({});
            let Orginfo = findInfo.length>0?findInfo[0].dataValues:{};
              let islocal = true;
              if(Orginfo.gst_number && DataForUpdate.dataValues.gst_number){
                let Orginfogst = Orginfo.gst_number.substring(0, 2);
                let recivergst = DataForUpdate.dataValues.gst_number.substring(0, 2);
                console.log("Orginfogst", Orginfogst, "recivergst", recivergst)
                if(Orginfogst !== recivergst){
                  islocal = false
                }
              }

            let options = { format: 'A4' };

             
            let file = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title></title> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"> <style>@page{size: auto; margin: 0;}b{font-size: 11px;}th{font-size: 12px;}</style> </head> <body> <div style="width:100%; max-width: 1000px; margin:auto;"> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" > <tbody> <tr> <td> <table cellpadding="0" cellspacing="0" height="auto" width="100%" style="width: 100%; margin:auto;"> <tr> <td align="center" style="border: 1px solid #414141; border-collapse: collapse; width: 100%; margin-top:5px;font-family: 'Lato', sans-serif;"> <h4 style="margin:5px 0; font-size:15px;">TAX INVOICE</h4> </td></tr><tr> <td class="emailHead" align="center" style="padding: 0;border-left: 1px solid #414141;border-right: 1px solid #414141;"> <img src="http://www.myaccountsapp.in/assets/images/logofinal500.png" width="100"> </td></tr><table style="border: 1px solid #414141; border-collapse: collapse; width: 100%; font-family: 'Lato', sans-serif;"> <thead> <tr> <th style="border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;">Seller</th> <th style="border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;">Buyer</th> <th style="border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;">Invoice No.</th> <th style="border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;">Date</th> </tr></thead> <thead> <tr> <td style="border: 1px solid #414141;padding: 5px;font-size: 11px;"> <h3 style="margin: 0;">${Orginfo && Orginfo.company_name ?Orginfo.company_name:''}</h3> <p style="margin: 5px 0;">${Orginfo && Orginfo.address?Orginfo.address:''}</p>${Orginfo.gst_number ? ` <p style="margin: 5px 0;">GSTIN No:- ${Orginfo.gst_number}</p>`:''}${Orginfo.cin_number ? ` <p style="margin: 5px 0;">CIN No:- ${Orginfo.cin_number}</p>`:''}</td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;"> <h3 style="margin: 0;">${DataForUpdate.dataValues && DataForUpdate.dataValues.name? DataForUpdate.dataValues.name:''}</h3> ${DataForUpdate.dataValues && DataForUpdate.dataValues.address ?` <p style="margin: 5px 0;">DataForUpdate.dataValues.address</p>`:''}${DataForUpdate.dataValues && DataForUpdate.dataValues.gst_number ? ` <p style="margin: 5px 0;">GSTIN No:- ${DataForUpdate.dataValues.gst_number}</p>`:''}<p style="margin: 5px 0;">Place of supply:- </p></td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;">XXXXXX</td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;">${moment(new Date(DataForUpdate.dataValues.creation_date)).format('DD-MMM-YYYY')}</td></tr></thead> </table> <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <thead> <tr> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Description of Goods/Services</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Units</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Discount</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">GST</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Amount</th> </tr></thead> <tbody> <tr> <td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;">${finddata.dataValues.title?finddata.dataValues.title:''}</td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${'1'}</b> </td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> ${0}</td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(finddata.dataValues.tax.dataValues.tax).toFixed(2)+"%": ''}</b> </td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</b> </td></tr></tbody> </table> <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: left;width: 59.8%;" colspan="3"> <p style="margin: 3px 0;font-size: 12px;font-weight: 400;">Amount Chargeable (in words):</p><p style="margin: 0;font-size: 12px;text-transform: capitalize;"><b>${finddata.dataValues.total?converter.toWords(finddata.dataValues.total)+" only":''}</b></p></th> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;" colspan="2"> <b>Total</b> </th> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;"> <b>${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</b> </th> </tr></table> ${islocal ? ` <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Services Accounting Code</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Taxable Value</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>Central (CGST)</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>State (SGST)</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Total Invoice Value</b> </td></tr><tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td></tr><tr> <td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${Orginfo && Orginfo.service_code ? Orginfo.service_code:''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.basic?"Rs."+Number(finddata.dataValues.basic).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(Number(finddata.dataValues.tax.dataValues.tax)/2)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;">${finddata.dataValues.gst?"Rs."+Number(Number(finddata.dataValues.gst)/2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(Number(finddata.dataValues.tax.dataValues.tax)/2)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;">${finddata.dataValues.gst?"Rs."+Number(Number(finddata.dataValues.gst)/2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</td></tr><tr> ${Orginfo && Orginfo.pan_number?` <td style="border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;" colspan="4"> <b>Company's PAN: ${Orginfo.pan_number}</b> </td>`:null}<td style="border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;" colspan="3"> <b style="font-size: 11px;">${Orginfo && Orginfo.company_name?'For '+ Orginfo.company_name:''}</b> <p style="font-size: 12px; margin: 0; margin-bottom: 30px;">Authorised Signatory</p><img src="http://www.myaccountsapp.in/assets/images/intrahop.png" width="60"> </td></td></tr></table> ` :` <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2" colspan="3"> <b>Services Accounting Code</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Taxable Value</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>Integrated Tax</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Total Invoice Value</b> </td></tr><tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td></tr><tr> <td colspan="3" style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${Orginfo && Orginfo.service_code ? Orginfo.service_code:''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.basic?"Rs."+Number(finddata.dataValues.basic).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?"Rs."+Number(finddata.dataValues.tax.dataValues.tax)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.gst? "Rs."+ Number(finddata.dataValues.gst).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</td></tr><tr> ${Orginfo && Orginfo.pan_number?` <td style="border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;" colspan="4"> <b>Company's PAN: ${Orginfo.pan_number}</b> </td>`:null}<td style="border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;" colspan="3"> <b style="font-size: 11px;">${Orginfo && Orginfo.company_name?'For '+ Orginfo.company_name:''}</b> <p style="font-size: 12px; margin: 0; margin-bottom: 30px;">Authorised Signatory</p><img src="http://www.myaccountsapp.in/assets/images/intrahop.png" width="60"> </td></td></tr></table> `}<table style="margin-top:15px; margin-bottom: 15px; font-family: 'Lato', sans-serif;"> <tr style="vertical-align:top;"> <td> <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">For Support</p>${Orginfo && Orginfo.phone_number?` <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">Call: ${Orginfo.phone_number}</p>`:''}${Orginfo && Orginfo.email?` <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">Email: ${Orginfo.email}</p>`:''}<p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">*This is a system generated Invoice</p></td></tr></table> </td></tr></tbody> </table> </div></body></html>`;
          pdf.create(file, options).toFile(path.join(__dirname, '../../uploads/invoice/')+DataForUpdate.dataValues.id+DataForUpdate.dataValues.recpit_id+'.pdf', async function(err, pdfdata){
                if(pdfdata && pdfdata.filename){
                  var messgae = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title></title> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"> </head> <body> <div style="width:100%; max-width: 605px; margin:auto; background:#F4F5FB; padding: 20px 15px;"> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" bgcolor="#fff" style="padding:15px"> <tbody> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" height="auto" width="100%" style="max-width: 605px; width: 100%; margin:auto;"> <tr> <td class="emailHead" align="center" style="padding: 0;"> <img src="http://www.myaccountsapp.in/assets/images/gstlogo.png" width="140" style="border-radius:25px;"> <h2 style="color: #111; letter-spacing: 0.5px; font-size: 20px; line-height: 26px; margin: 15px 0 0 0; font-family: 'Lato', sans-serif; font-weight: 700;">Thank you for your purchase</h2> <h4 style="color:#747474; margin: 10px 0; letter-spacing: 0.5px; font-size: 16px; font-weight: 400; font-family: 'Lato', sans-serif;">Your purchase details as below</h4> </td></tr><table style="border-collapse: collapse; width: 100%; text-align: center; margin-top:15px;font-family: 'Lato', sans-serif;"> <thead> <tr> <th style="border: 1px solid #ccc; padding: 5px;">Date</th> <th style="border: 1px solid #ccc; padding: 5px;">Particulars</th> <th style="border: 1px solid #ccc; padding: 5px;">Basic Value</th> <th style="border: 1px solid #ccc; padding: 5px;">Tax</th> <th style="border: 1px solid #ccc; padding: 5px;">Total Value</th> </tr></thead> <thead> <tr> <td style="border: 1px solid #ccc;padding: 5px;font-size: 13px;">${moment(new Date(DataForUpdate.dataValues.creation_date)).format('DD-MMM-YYYY')}</td><td style="border: 1px solid #ccc;padding: 5px;font-size: 13px;">${finddata.dataValues.title}</td><td style="border: 1px solid #ccc;padding: 5px;font-size: 13px;">₹ ${finddata.dataValues.basic}</td><td style="border: 1px solid #ccc;padding: 5px;font-size: 13px;">₹ ${finddata.dataValues.gst}</td><td style="border: 1px solid #ccc;padding: 5px;font-size: 13px;">₹ ${finddata.dataValues.total}</td></tr></thead> </table> <table style="margin-top:15px;font-family: 'Lato', sans-serif;"> <thead> <tr> <td style="font-size: 15px; padding-top:10px;"><b>Paid through : </b></td></tr><tr> <td style="font-size: 15px; padding-top:10px;">You received this email because you made a purchase on <a target="_blank" href="http://www.myaccountsapp.in/">MYACCOUNTSAPP.IN</a></td></tr><tr> <td style="font-size: 15px; padding-top:10px;"> Please contact <a style="color:#1a1e57" href="mailto:connect@myaccountsapp.in">connect@myaccountsapp.in</a> or call <a style="color:#1a1e57" href="tel:+917970020909">+91-7970020909</a> </td></tr></thead> </table> <table style="margin-top:20px;font-family: 'Lato', sans-serif;"> <tr style="vertical-align:top;"> <td> <img src="http://www.myaccountsapp.in/assets/images/gstlogo.png" width="120"> </td><td style="padding-left: 15px;"> <h4 style="margin-bottom:10px;margin-top:0;">Made for you with passion</h4> <p style="margin-bottom:6px; margin-top: 0; font-size: 14px;">By Intrahop Systech Team</p><p style="margin-bottom:6px; margin-top: 0; font-size: 14px;">Plot No 287, PU4, Scheme No 54,</p><p style="margin-bottom:6px; margin-top: 0; font-size: 14px;">Behind C21 Mall, </p><p style="margin-bottom:6px; margin-top: 0; font-size: 14px;">Indore MP 452010 IN</p></td></tr></table> </td></tr></tbody> </table> </div><table width="320" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-top: 30px;"> <tr> <td align="center" width="50"> <a href="#" target="_blank"><img src="http://www.myaccountsapp.in/assets/images/fb.png" style="width:12px;max-width:21px;"></a> </td><td align="center" width="50"> <a href="#" target="_blank"><img src="http://www.myaccountsapp.in/assets/images/insta.png" style="width:25px;max-width:25px;"></a> </td><td align="center" width="50"> <a href="#" target="_blank"><img src="http://www.myaccountsapp.in/assets/images/in.png" style="width:19px;max-width:19px;"></a> </td></tr></table> </body></html>`;
                  var msg = {
                      html: messgae,
                      createTextFromHtml: true,
                      from: `${Constant.App_name} ${transport.options.auth.user}`,
                      to:  DataForUpdate.dataValues.email,
                      subject: "invoice confirmation",
                      attachments: [
                        {
                            filename: `${DataForUpdate.dataValues.id}${DataForUpdate.dataValues.recpit_id}.pdf`,
                            path: pdfdata.filename,
                        }
                    ]
                  };
                  let maildata =await transport.sendMail(msg);
                  console.log("maile data", maildata);
                  if(maildata && maildata.messageId){
                    console.log("success fully send mail")
                  }
                }
          });
        }
        return {
          statusCode: 200,
          success: true,
          message: "Order update Successfully",
          Subscription: DataForUpdate
        };
      } else {
        return {
          statusCode: await checkCode("error"),
          success: false,
          error: e.message,
          message: "User Not valid"
        };
      }
    } else {
      return {
        statusCode: await checkCode("error"),
        success: false,
        error: e.message,
        message: "Something went wrong!"
      };
    }
  } catch (e) {
    console.log("e", e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.orderListByUser = async function(req,res) {
  try{
 console.log("orderreqlist",req.body);
  let finddata = await SubscriptionOrder.findAll({
    where: { user_id: req.body.id,
    status:'success' },
    order: [['creation_date', 'DESC']]
  });
  return {
    statusCode: res.statusCode,
    success: true,
    message: "Order List",
    Subscription: finddata
  };
  }catch(e){
return {
    statusCode: res.statusCode,
    success: false,
    message: e.message,
  };
  }
   
};

exports.orderList = async function(req) {
  let finddata = await SubscriptionOrder.findAll();
  return {
    statusCode: res.statusCode,
    success: true,
    message: "Order List",
    Subscription: finddata
  };
};

exports.getDownload = async function(data, res) {
  try {
    let createdata = await  SubscriptionOrder.findOne({ where: { id: data.id } });
    let finddata = await  Subscription.findOne({ where: { id: createdata.dataValues.subscription_id } , include:[{
      model:Taxes
    }]});
    let findInfo = await  OrganizationInfo.findAll({});

    if(createdata && createdata.dataValues && createdata.dataValues.status=="success"){
      if (createdata && finddata) {
        console.log("findInfo", createdata.dataValues)
        let Orginfo = findInfo.length>0?findInfo[0].dataValues:{};
        let islocal = true;
        if(Orginfo.gst_number && createdata.dataValues.gst_number){
          let Orginfogst = Orginfo.gst_number.substring(0, 2);
          let recivergst = createdata.dataValues.gst_number.substring(0, 2);
          console.log("Orginfogst", Orginfogst, "recivergst", recivergst)
          if(Orginfogst !== recivergst){
            islocal = false
          }
        }
  
        let options = { format: 'A4' };
        let file = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title></title> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"> <style>@page{size: auto; margin: 0;}b{font-size: 11px;}th{font-size: 12px;}</style> </head> <body> <div style="width:100%; max-width: 1000px; margin:auto;"> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" > <tbody> <tr> <td> <table cellpadding="0" cellspacing="0" height="auto" width="100%" style="width: 100%; margin:auto;"> <tr> <td align="center" style="border: 1px solid #414141; border-collapse: collapse; width: 100%; margin-top:5px;font-family: 'Lato', sans-serif;"> <h4 style="margin:5px 0; font-size:15px;">TAX INVOICE</h4> </td></tr><tr> <td class="emailHead" align="center" style="padding: 0;border-left: 1px solid #414141;border-right: 1px solid #414141;"> <img src="http://www.myaccountsapp.in/assets/images/logofinal500.png" width="100"> </td></tr><table style="border: 1px solid #414141; border-collapse: collapse; width: 100%; font-family: 'Lato', sans-serif;"> <thead> <tr> <th style="border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;">Seller</th> <th style="border: 1px solid #414141; padding: 5px;text-align: left;width: 35%;">Buyer</th> <th style="border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;">Invoice No.</th> <th style="border: 1px solid #414141; padding: 5px;text-align: center;width: 15%;">Date</th> </tr></thead> <thead> <tr> <td style="border: 1px solid #414141;padding: 5px;font-size: 11px;"> <h3 style="margin: 0;">${Orginfo && Orginfo.company_name ?Orginfo.company_name:''}</h3> <p style="margin: 5px 0;">${Orginfo && Orginfo.address?Orginfo.address:''}</p>${Orginfo.gst_number ? ` <p style="margin: 5px 0;">GSTIN No:- ${Orginfo.gst_number}</p>`:''}${Orginfo.cin_number ? ` <p style="margin: 5px 0;">CIN No:- ${Orginfo.cin_number}</p>`:''}</td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;"> <h3 style="margin: 0;">${createdata.dataValues && createdata.dataValues.name? createdata.dataValues.name:''}</h3> ${createdata.dataValues && createdata.dataValues.address ?` <p style="margin: 5px 0;">createdata.dataValues.address</p>`:''}${createdata.dataValues && createdata.dataValues.gst_number ? ` <p style="margin: 5px 0;">GSTIN No:- ${createdata.dataValues.gst_number}</p>`:''}<p style="margin: 5px 0;">Place of supply:- </p></td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;">XXXXXX</td><td style="border: 1px solid #414141;padding: 5px;font-size: 11px;text-align: center;">${moment(new Date(createdata.dataValues.creation_date)).format('DD-MMM-YYYY')}</td></tr></thead> </table> <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <thead> <tr> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Description of Goods/Services</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Units</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Discount</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">GST</th> <th style="border: 1px solid #414141; background-color:rgb(196, 196, 196); padding: 5px;text-align: center;">Amount</th> </tr></thead> <tbody> <tr> <td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;">${finddata.dataValues.title?finddata.dataValues.title:''}</td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${'1'}</b> </td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> ${0}</td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(finddata.dataValues.tax.dataValues.tax)+"%": ''}</b> </td><td style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;height: 100px;vertical-align: top;"> <b>${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</b> </td></tr></tbody> </table> <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: left;width: 59.8%;" colspan="3"> <p style="margin: 3px 0;font-size: 12px;font-weight: 400;">Amount Chargeable (in words):</p><p style="margin: 0;font-size: 12px;text-transform: capitalize;"><b>${finddata.dataValues.total?converter.toWords(finddata.dataValues.total)+" only":''}</b></p></th> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;" colspan="2"> <b>Total</b> </th> <th style="border: 1px solid #414141;padding: 8px;font-size: 11px;text-align: center;vertical-align: bottom;"> <b>${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</b> </th> </tr></table> ${islocal ? ` <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Services Accounting Code</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Taxable Value</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>Central (CGST)</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>State (SGST)</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Total Invoice Value</b> </td></tr><tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td></tr><tr> <td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${Orginfo && Orginfo.service_code ? Orginfo.service_code:''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.basic?"Rs."+Number(finddata.dataValues.basic).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(Number(finddata.dataValues.tax.dataValues.tax)/2)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;">${finddata.dataValues.gst?"Rs."+Number(Number(finddata.dataValues.gst)/2).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(Number(finddata.dataValues.tax.dataValues.tax)/2)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;">${finddata.dataValues.gst?"Rs."+Number(Number(finddata.dataValues.gst)/2).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;font-size: 11px;"> ${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</td></tr><tr> ${Orginfo && Orginfo.pan_number?` <td style="border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;" colspan="4"> <b>Company's PAN: ${Orginfo.pan_number}</b> </td>`:null}<td style="border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;" colspan="3"> <b style="font-size: 11px;">${Orginfo && Orginfo.company_name?'For '+ Orginfo.company_name:''}</b> <p style="font-size: 12px; margin: 0; margin-bottom: 30px;">Authorised Signatory</p><img src="http://www.myaccountsapp.in/assets/images/intrahop.png" width="60"></td></td></tr></table> ` :` <table cellpadding="0" cellspacing="0" style="font-family: 'Lato', sans-serif; border: 1px solid #414141; width:100%;margin-top: -1px;"> <tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2" colspan="3"> <b>Services Accounting Code</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Taxable Value</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" colspan="2"> <b>Integrated Tax</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;" rowspan="2"> <b>Total Invoice Value</b> </td></tr><tr> <td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Rate</b> </td><td style="border: 1px solid #414141; background-color:rgb(196 196 196); padding: 5px;text-align: center;"> <b>Amount</b> </td></tr><tr> <td colspan="3" style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${Orginfo && Orginfo.service_code ? Orginfo.service_code:''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.basic?"Rs."+Number(finddata.dataValues.basic).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.tax && finddata.dataValues.tax.dataValues && finddata.dataValues.tax.dataValues.tax?Number(finddata.dataValues.tax.dataValues.tax)+"%": ''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.gst?"Rs."+Number(finddata.dataValues.gst).toFixed(2):''}</td><td style="border: 1px solid #414141; padding: 5px;text-align: center;"> ${finddata.dataValues.total?"Rs."+Number(finddata.dataValues.total).toFixed(2):''}</td></tr><tr> ${Orginfo && Orginfo.pan_number?` <td style="border: 1px solid #414141; padding: 5px;text-align: left; height: 100px;" colspan="4"> <b>Company's PAN: ${Orginfo.pan_number}</b> </td>`:null}<td style="border: 1px solid #414141; padding: 5px;text-align: center;height: 100px;" colspan="3"> <b style="font-size: 11px;">${Orginfo && Orginfo.company_name?'For '+ Orginfo.company_name:''}</b> <p style="font-size: 12px; margin: 0; margin-bottom: 30px;">Authorised Signatory</p><img src="http://www.myaccountsapp.in/assets/images/intrahop.png" width="60"> </td></td></tr></table> `}<table style="margin-top:15px; margin-bottom: 15px; font-family: 'Lato', sans-serif;"> <tr style="vertical-align:top;"> <td> <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">For Support</p>${Orginfo && Orginfo.phone_number?` <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">Call: ${Orginfo.phone_number}</p>`:''}${Orginfo && Orginfo.email?` <p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">Email: ${Orginfo.email}</p>`:''}<p style="margin-bottom:5px; margin-top: 0; font-size: 11px;">*This is a system generated Invoice</p></td></tr></table> </td></tr></tbody> </table> </div></body></html>`;
        pdf.create(file, options).toFile(path.join(__dirname, '../../uploads/invoice/')+createdata.dataValues.id+createdata.dataValues.recpit_id+'.pdf', function(err, data){
              if(data && data.filename){
                console.log("data.filename", data)
                res.send({
                  statusCode: res.statusCode,
                  success: true,
                  message: "PDF path",
                  filepath :`uploads/invoice/${createdata.dataValues.id}${createdata.dataValues.recpit_id}.pdf`
                }); 
              }else{
                res.send({
                  statusCode: res.statusCode,
                  success: false,
                  message: "PDF not genrated please try later!"
                });
              }
            return;
        });
      } else {
        return {
          statusCode:404,
          success: false,
          message: "Order not Found!"
        };
      }
    }else {
      return {
        statusCode:404,
        success: false,
        message: "Order status is pendding"
      };
    }
  } catch (e) {
    console.log("e", e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getRemove = async function(data, res) {
  try {
    let createdata = await SubscriptionOrder.findOne({ where: { id: data.id } });
    if (createdata) {
      if (fs.existsSync(path.join(__dirname, '../../uploads/invoice/')+createdata.dataValues.id+createdata.dataValues.recpit_id+'.pdf')) {
        fs.unlink(path.join(__dirname, '../../uploads/invoice/')+createdata.dataValues.id+createdata.dataValues.recpit_id+'.pdf', function(err) {
          console.log("err", err)
            if (err) {
              res.send({
                statusCode: res.statusCode,
                success: false,
                message: "PDF not remove!"
              });
            };
            res.send({
              statusCode: res.statusCode,
              success: true,
              message: "file deleted"
            }); 
        });
      }else{
        res.send({
          statusCode: res.statusCode,
          success: true,
          message: "file alredy deleted"
        }); 
      }
    } else {
      return {
        statusCode:404,
        success: false,
        message: "Order not Found!"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};


exports.subscribed = async function(data, res) {
  try {
    let object= {};
    if(data.start_date && data.end_date){
      object ={
        creation_date: {
            [Op.gte]: data.start_date,
            [Op.lte]: data.end_date
        }
      }
    }
    console.log("object", object)
    let findsubscribed = await SubscriptionOrder.findAll({
      where:object,
      include:[{model:User}],
      order: [['creation_date', 'DESC']]
    })
    if(findsubscribed && findsubscribed.length>0){
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Order List",
        data: findsubscribed
      };
    }else{
      return {
        statusCode:404,
        success: false,
        message: "Order List not Found!"
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};