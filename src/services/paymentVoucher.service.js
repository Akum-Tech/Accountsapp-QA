import PaymentVoucher from "../models/paymentVoucher";
import Company from "../models/company";
import AccountGroup from "../models/accountGroup";
import subAccountGroup from "../models/subAccountGroup";
import State from "../models/states";
import City from "../models/cities";
import Ledger from "../models/ledger";
import TaxInteries from "../models/taxInteries";
import VoucherInteries from "../models/voucherInteries";
import ItemInteries from "../models/itemInteries";
import { sequelize } from "../database/database";
import Constant from "../constant/config";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import uniqid from "uniqid";
import Message from "../constant/entryMessage";
import entry from "../utility/entry";
import arraySort from 'array-sort';
import { decreptionPayment, encreptionPayment } from "../security/paymentvoucher";
import { encreptionBank } from "../security/bank";

import "@babel/polyfill";

exports.getSingleData = async function(id, data, res) {
  try {
    let createdata = await PaymentVoucher.findOne({
      where: {
        uid: id
      },
      include: [
        {
          model: Company,
          include: [
            {
              model: City,
              attributes: ["name"],
              include: [
                {
                  model: State,
                  attributes: ["name"]
                }
              ]
            }
          ]
        },
        {
          model: Ledger,
          as: "PaymentBuyer",
          attributes: ["uid", "name", "opening_balance", "amount"],
          include: [
            {
              model: City,
              attributes: ["name"],
              include: [
                {
                  model: State,
                  attributes: ["name"]
                }
              ]
            },
            {
              model: subAccountGroup,
              attributes: ["uid", "name"]
            },
            {
              model: AccountGroup,
              attributes: ["uid", "name"]
            }
          ]
        },
        {
          model: Ledger,
          as: "PaymentReciver",
          attributes: ["uid", "name", "opening_balance", "amount"],
          include: [
            {
              model: City,
              include: [
                {
                  model: State,
                  attributes: ["name"]
                }
              ]
            },
            {
              model: subAccountGroup,
              attributes: ["uid", "name"]
            },
            {
              model: AccountGroup,
              attributes: ["uid", "name"]
            }
          ]
        }
      ]
    });
    if (createdata) {
      let response = await decreptionPayment(
        createdata,
        "object",
        data.data.email
      );
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher fetch Successfully",
        PaymentVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher not Found!",
        PaymentVoucher: createdata ? createdata : {}
      };
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getLastData = async function(data, res) {
  try {
    let createdata = await PaymentVoucher.findOne({
      where: {
        company_id: data.company_id,
        current_year: data.current_year,
        end_year: data.end_year
      },
      order: [["invoice_date", "DESC"]]
    });
    if (createdata) {
      let response = await decreptionPayment(
        createdata,
        "object",
        data.data.email
      );
      response.dataValues.invoice_id =
        response.dataValues.invoice_id <= 9
          ? `${response.dataValues.current_year.toString().substr(-2) +
              `-` +
              response.dataValues.end_year.toString().substr(-2)}/00${response
              .dataValues.invoice_id}`
          : response.dataValues.invoice_id > 9
            ? `${response.dataValues.current_year.toString().substr(-2) +
                `-` +
                response.dataValues.end_year.toString().substr(-2)}/0${response
                .dataValues.invoice_id}`
            : `${response.dataValues.current_year.toString().substr(-2) +
                `-` +
                response.dataValues.end_year.toString().substr(-2)}/${response
                .dataValues.invoice_id}`;
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher fetch Successfully",
        PaymentVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher not Found!",
        PaymentVoucher: createdata ? createdata : {}
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

exports.getAllData = async function(data, res) {
  try {
    let createdata = await PaymentVoucher.findAll({
      where: {
        company_id: data.company_id,
        current_year: data.current_year,
        end_year: data.end_year
      },
      include: [
        {
          model: Company,
          attributes: [
            "company_name",
            "uid",
            "gst_number",
            "terms",
            "financial_year",
            "cin_number",
            "company_pan_number"
          ]
        },
        {
          model: Ledger,
          as: "PaymentBuyer",
          attributes: ["name", "uid", "amount", "opening_balance"]
        },
        {
          model: Ledger,
          as: "PaymentReciver",
          attributes: ["name", "uid", "amount", "opening_balance"]
        }
      ],
      order: [['invoice_date', 'ASC']],
    });
    if (createdata.length > 0) {
      let response = await decreptionPayment(
        createdata,
        "array",
        data.data.email
      );
      response = response.map(item => {
        if (item.invoice_id) {
          item.invoice_id =
            item.invoice_id <= 9
              ? `${data.current_year.toString().substr(-2) +
                  `-` +
                  data.end_year.toString().substr(-2)}/00${item.invoice_id}`
              : item.invoice_id > 9
                ? `${data.current_year.toString().substr(-2) +
                    `-` +
                    data.end_year.toString().substr(-2)}/0${item.invoice_id}`
                : `${data.current_year.toString().substr(-2) +
                    `-` +
                    data.end_year.toString().substr(-2)}/${item.invoice_id}`;
        }
        return item;
      });
      response = await arraySort(response, 'invoice_id')
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher fetch Successfully",
        PaymentVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher not Found!",
        PaymentVoucher: createdata ? createdata : []
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

exports.getAllDataPagination = async function(data, res) {
  try {
    let createdata = await PaymentVoucher.findAndCountAll({
      limit: data.limit,
      offset: data.offset,
      where: {
        company_id: data.company_id,
        current_year: data.current_year,
        end_year: data.end_year
      },
      include: [
        {
          model: Company,
          attributes: [
            "company_name",
            "uid",
            "gst_number",
            "terms",
            "financial_year",
            "cin_number",
            "company_pan_number"
          ]
        },
        {
          model: Ledger,
          as: "PaymentBuyer",
          attributes: ["name", "uid", "amount", "opening_balance"]
        },
        {
          model: Ledger,
          as: "PaymentReciver",
          attributes: ["name", "uid", "amount", "opening_balance"]
        }
      ],order: [['invoice_date', 'ASC']],
      distinct: true
    });
    if (createdata.rows.length > 0) {
      let response = await decreptionPayment(
        createdata.rows,
        "array",
        data.data.email
      );
      response = response.map(item => {
        if (item.invoice_id) {
          item.invoice_id =
            item.invoice_id <= 9
              ? `${data.current_year.toString().substr(-2) +
                  `-` +
                  data.end_year.toString().substr(-2)}/00${item.invoice_id}`
              : item.invoice_id > 9
                ? `${data.current_year.toString().substr(-2) +
                    `-` +
                    data.end_year.toString().substr(-2)}/0${item.invoice_id}`
                : `${data.current_year.toString().substr(-2) +
                    `-` +
                    data.end_year.toString().substr(-2)}/${item.invoice_id}`;
        }
        return item;
      });
      response = await arraySort(response, 'invoice_id')
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher fetch Successfully",
        PaymentVoucher: response,
        Count: createdata.count
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher not Found!",
        PaymentVoucher: createdata.rows.length > 0 ? createdata : []
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
    const result = await sequelize.transaction(async t => {
      // let count  = await PaymentVoucher.count({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}});
      // let checkYear = await PaymentVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
      // if(checkYear){
      //     data.invoice_id = Number(count)+1;
      // }else{
      //     data.invoice_id = await 1;
      // }

      if (data.is_after) {
        let count = await PaymentVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { uid: data.after_id },
                { company_id: data.company_id }
              ]
            }
          },
          t
        );
        let checkYear = await PaymentVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year },
                { company_id: data.company_id }
              ]
            }
          },
          t
        );
        if (checkYear) {
          data.invoice_id = (await Number(count.dataValues.invoice_id)) + 1;
          let updateCount = await PaymentVoucher.update(
            { invoice_id: Sequelize.literal("invoice_id+1") },
            {
              where: {
                [Op.and]: [
                  { current_year: data.current_year },
                  { end_year: data.end_year },
                  { company_id: data.company_id }
                ],
                invoice_id: { [Op.gte]: data.invoice_id }
              }
            },
            t
          );
        } else {
          data.invoice_id = await 1;
        }
      } else if (data.is_before) {
             let count = await PaymentVoucher.findOne({where:{[Op.and]: [ {invoice_date:{[Op.lte]:data.invoice_date}},{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                let checkYear = await PaymentVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}}, t)
            if(checkYear){
                // console.log("count", count.dataValues);
                let finddate = await PaymentVoucher.findOne({where:{[Op.and]: [{invoice_date:data.invoice_date},{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                // console.log("finddate", finddate, data.invoice_id)
                if(finddate){
                    data.invoice_id = await Number(finddate.dataValues.invoice_id)+1; 
                    let updateCount = await PaymentVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id},{invoice_id:{[Op.gte]:data.invoice_id}}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                }else{
                    if(count){
                        data.invoice_id = await Number(count.dataValues.invoice_id)+1;
                    }else{
                        data.invoice_id = await 1;
                    }
                    let updateCount = await PaymentVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id},{invoice_date:{[Op.gte]:data.invoice_date}}]}}, t)
                }
            }else{
                data.invoice_id = await 1;
            }
      } else {
        let count = await PaymentVoucher.count({
          where: {
            [Op.and]: [
              { current_year: data.current_year },
              { end_year: data.end_year },
              { company_id: data.company_id }
            ]
          }
        });
        let checkYear = await PaymentVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year },
                { company_id: data.company_id }
              ]
            }
          },
          t
        );
        if (checkYear) {
          data.invoice_id = Number(count) + 1;
        } else {
          data.invoice_id = await 1;
        }
      }

      data.invoice_date = data.invoice_date;
      data.uid = await uniqid();
      data.status = 1;
      data.creation_date = new Date();
      data.updated_date = new Date();
      let createdata = await PaymentVoucher.create(data, { transaction: t });
      entry.createData(data.company_id, Message.payment_create);

      let response = await decreptionPayment(
        createdata,
        "object",
        data.data.email
      );
      return response;
    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "PaymentVoucher Created Successfully",
        PaymentVoucher: result
      };
    } else {
      await transaction.rollback();
    }
  } catch (e) {
    await transaction.rollback();
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, data, res) {
  try {
    let find =await PaymentVoucher.findOne({where:{uid:id}});
    if(find){
        let updateCount = await PaymentVoucher.update({invoice_id : Sequelize.literal('invoice_id-1')}, {where:{[Op.and]: [{current_year: find.dataValues.current_year },{end_year: find.dataValues.end_year },{company_id:find.dataValues.company_id}],invoice_id:{[Op.gte]:Number(find.dataValues.invoice_id)}}})
        let deletedata = await  PaymentVoucher.destroy({ where: {uid:id}});
        if(deletedata){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PaymentVoucher Delete Successfully",
                PaymentVoucher:deletedata
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Voucher not delete please try later!",
                PaymentVoucher:{}
            };
        }
    }else{
        return {
            statusCode:res.statusCode,
            success: false,
            message:"Voucher not found!",
            PaymentVoucher:{}
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
    let finddata = await PaymentVoucher.findOne({
      where: { uid: id, company_id: data.company_id }
    });
    if (finddata) {
      data.updated_date = new Date();
      delete data.invoice_id;
      let updatedata = await finddata.update(data);
      entry.createData(data.company_id, Message.payment_update);
      if (updatedata) {
        let response = await decreptionPayment(
          updatedata,
          "object",
          data.data.email
        );
        return {
          statusCode: res.statusCode,
          success: true,
          message: "PaymentVoucher update Successfully",
          PaymentVoucher: response
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          PaymentVoucher: updatedata
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "PaymentVoucher not found!",
        PaymentVoucher: finddata ? finddata : {}
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


exports.cancelData = async function (id, data, res) {
  try {
      const result = await sequelize.transaction(async(t) => {
           data.updated_date = new Date();
           data.status = 0;
           data.ledger_id = '';
           data.receive_id = '';
           data.is_local = '';
           data.name = '';
           data.bank_account_number = '';
           data.bank_ifsc = '';
           data.bank_name = '';
           data.receive_type	 = '';
           data.narration = '';
           data.type = '';
           data.total_amount = '0';
           data = await encreptionPayment(data, data.data.email)
           let updatedata = await PaymentVoucher.findOne({where:{uid:data.uid}},t);
           if(updatedata){
             delete data.invoice_id;
              await updatedata.update(data);
           }else{
              await t.rollback();
           }
           let response  = await decreptionPayment(updatedata, 'object', data.data.email);
           return response;
       });
       if(result){
           return {
               statusCode:res.statusCode,
               success: true,
               message:"PaymentVoucher Cancel Successfully",
               PaymentVoucher:result
           };
       }else{
           await transaction.rollback();
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