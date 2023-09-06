import manualClosingStock from "../models/manualCosingStock";


import { checkCode } from "../utility/statusCode";
import Sequelize from "sequelize";
import uniqid from "uniqid";
import fs from "fs";
import Message from '../constant/entryMessage'
import Constant from '../constant/config';
import { decreptionmnualstock } from "../security/manualClosingStock";
const Op = Sequelize.Op;
import "@babel/polyfill";


exports.getSingleData = async function(id, data, res) {
  try {
    let createdata = await manualClosingStock.findOne({
      where: {
        uid: id
      }
    });
    if (createdata) {
      let response = await decreptionmnualstock(createdata, "object", data.data.email);
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Manual Stock fetch Successfully",
        stock: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Manual Stock Found!",
        stock:  {}
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getAllData = async function(data, res) {
  try {
   
    let createdata = await manualClosingStock.findAll({
      where: {
        company_id: data.company_id
      },order: [
        ['closingdate', 'DESC']
      ]
    }).map((node) => node.get({
        plain: true
    }));
    if (createdata.length > 0) {
      let response = await decreptionmnualstock(createdata, "array", data.data.email);
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Manual Stock fetch Successfully",
        stock: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Manual Stock not Found!",
        stock: createdata ? createdata : []
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
    if(new Date()>=new Date(data.financial_year)){
      //data.company_id = data.data.uid;
        data.uid = await uniqid();
        data.creation_date = new Date();
        data.updated_date = new Date();
        let createdata = await manualClosingStock.create(data);  
        if (createdata) {
        
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Manual stock Created Successfully",
            stock: createdata
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Manual Stock not created",
            stock: {}
          };
        }
      
    }else{
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Financial Year not greater then today date",
        company: {}
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, res) {
  try {
   
    let deletemanualClosingStock = await manualClosingStock.destroy({ where: { uid: id } });
    if (deletemanualClosingStock) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "maual stock Delete Successfully",
        stock: deletemanualClosingStock
      };
    } else {
      return {
        statusCode: await checkCode("error"),
        success: false,
        message: "Something went wrong!",
        stock: {}
      };
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.updateData = async function(id, data, res) {
  try {
    //data.company_id = data.data.uid;
    let finddata = await manualClosingStock.findOne({ where: { uid: id } });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
        let response = await decreptionmnualstock(updatedata, "object", data.data.email);
        return {
          statusCode: res.statusCode,
          success: true,
          message: "manual stock update Successfully",
          stock: response
        };
      } else {
        return {
          statusCode: await checkCode("error"),
          success: false,
          message: "Something went wrong!",
          stock: {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "manual Stock not found!",
        stock: {}
      };
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

