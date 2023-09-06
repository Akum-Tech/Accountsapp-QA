import JournalVoucher from "../models/journalVoucher";
import JournalInteries from "../models/journalInteries";
import Company from "../models/company";
import SaleVoucher from "../models/saleVoucher";
import PurchaseVoucher from "../models/purchaseVoucher";
import CreditVoucher from "../models/creditVoucher";
import DebitVoucher from "../models/debitVoucher";
import TaxInteries from "../models/taxInteries";
import VoucherInteries from "../models/voucherInteries";
import ItemInteries from "../models/itemInteries";
import itemStockVoucherEntries from "../models/item_stock_voucher_entries";
import AccountGroup from "../models/accountGroup";
import RecieptVoucher from "../models/recieptVoucher";
import PaymentVoucher from "../models/paymentVoucher";
import subAccountGroup from "../models/subAccountGroup";
import State from "../models/states";
import City from "../models/cities";
import Ledger from "../models/ledger";
import { sequelize } from "../database/database";
import Constant from "../constant/config";
import Sequelize from "sequelize";
import { encreptionItem } from "../security/itemEntries";
const Op = Sequelize.Op;
import uniqid from "uniqid";
import Message from "../constant/entryMessage";
import entry from "../utility/entry";
import Purpose from "../models/purpose";
import arraySort from 'array-sort';

import {
  encreptionJournal,
  decreptionJournal
} from "../security/journalvoucher";
import {
  encreptionJournalEntries,
  decreptionJournalEntries
} from "../security/journalEntries";

import "@babel/polyfill";
import ItemStockVoucher from "../models/itemStockVoucher";
import { log } from "handlebars/runtime";

async function addItemInteries(array, data, key, trans) {
  console.log('array-------------->',array)
  console.log('data--------------->',data);
  console.log('key---------------->',key)
  let items = array;
  let mainArray = [];
  for (let i = 0; i < items.length; i++) {
    let body = await {
      uid: await uniqid(),
      type: items[i].type,
      journa_voucher_id: data.dataValues.uid,
      ledger_id: items[i].ledger_id,
      invoice_date: data.dataValues.invoice_date,
      company_id: data.dataValues.company_id,
      amount: items[i].amount ? items[i].amount.toString() : '0',
      creation_date: new Date(),
      updated_date: new Date(),
      data: {
        email: key
      }
    };
    console.log('body in additementries---------->',body)
    let encrypted = await encreptionJournalEntries(body);
    mainArray.push(encrypted);
    if (i === items.length - 1) {
      let itemInteries = await JournalInteries.bulkCreate(mainArray, {
        transaction: trans
      });
      if (itemInteries) {
        return "true";
      } else {
        return "false";
      }
    }
  }
}
async function addStockItemInteries(array, data, key, trans) {
  let items = array;
  let mainArray = [];
  for (let i = 0; i < items.length; i++) {
    let body = {
      uid: await uniqid(),
      voucher_id: data.dataValues.uid,
      company_id: data.dataValues.company_id,
      item_id: items[i].item_id,
      quantity: items[i].quantity,
      name: items[i].name,
      description: items[i].description,
      model: "", //items[i].model
      hsn_code: items[i].hsn_code,
      unit: items[i].unit,
      price: items[i].price.toString(),
      discount: items[i].discount.toString(),
      discount_type: items[i].discount_type,
      total_amount: items[i].total_amount.toString(),
      igst_tax: items[i].igst_tax,
      type: items[i].type,
      invoice_date: data.dataValues.invoice_date,
      status: 1,
      creation_date: new Date(),
      updated_date: new Date(),
      data: {
        email: key
      }
    };
    let encypted = await encreptionItem(body);
    mainArray.push(encypted);
    if (i === items.length - 1) {
      let itemInteries = await itemStockVoucherEntries.bulkCreate(mainArray, {
        transaction: trans
      });
      if (itemInteries) {
        return "true";
      } else {
        return "false";
      }
    }
  }
}

exports.getSingleData = async function (id, data, res) {
  try {
    let createdata = await JournalVoucher.findOne({
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
          model: Purpose,
          required: false,
        },
        {
          model: JournalInteries,
          required: false,
          include: [
            {
              model: Ledger,
              as: "VoucherLedger",
              attributes: [
                "uid",
                "name",
                "opening_balance",
                "amount",
                "tax_key",
                "sale_key",
                "account_holder_name",
                "bank_account_number",
                "bank_branch",
                "bank_name"
              ]
            }
          ]
        }
      ]
    });
    if (createdata) {
      let response = await decreptionJournal(
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
        message: "JournalVoucher fetch Successfully",
        JournalVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher not Found!",
        JournalVoucher: createdata ? createdata : {}
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


exports.getSingleDatastockentry = async function (id, data, res) {
  try {
    let createdata = await ItemStockVoucher.findOne({
      where:
      {
        uid: id
      }, include: [
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
        }, {
          model: Ledger, as: 'Ledger',
          attributes: ['uid', 'name', 'opening_balance', 'amount', 'tax_key', 'sale_key', 'account_holder_name', 'bank_account_number', 'bank_branch', 'bank_name'],
          include: [{
            model: City,
            attributes: ['name'],
            include: [{
              model: State,
              attributes: ['name']
            }]
          }, {
            model: subAccountGroup,
            attributes: ['uid', 'name'],
          }, {
            model: AccountGroup,
            attributes: ['uid', 'name'],
          }]
        },
        {
          model: itemStockVoucherEntries,
          required: false,
          // where: {
          //     type: 'Sales'
          // }
        },

      ]
    });
    if (createdata) {
      let response = await decreptionJournal(
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
        message: "JournalVoucher fetch Successfully",
        JournalVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher not Found!",
        JournalVoucher: createdata ? createdata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    }
  }
}

exports.getLastData = async function (data, res) {
  try {
    let createdata = await JournalVoucher.findOne({
      where:
      {
        company_id: data.company_id,
        current_year: data.current_year,
        end_year: data.end_year
      }, order: [['invoice_date', 'DESC']]
    });
    if (createdata) {
      let response = await decreptionJournal(
        createdata,
        "object",
        data.data.email
      );
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher fetch Successfully",
        JournalVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher not Found!",
        JournalVoucher: createdata ? createdata : {}
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

exports.getAllData = async function (data, res) {
  try {
    let createdata = await JournalVoucher.findAll({
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
          model: Purpose
        },
        {
          model: JournalInteries,
          required: true,
          include: [
            {
              model: Ledger,
              as: "VoucherLedger",
              attributes: [
                "uid",
                "name",
                "opening_balance",
                "amount",
                "tax_key",
                "sale_key",
                "account_holder_name",
                "bank_account_number",
                "bank_branch",
                "bank_name"
              ]
            }
          ]
        }
      ],
      order: [['invoice_date', 'ASC']],
    });
    if (createdata.length > 0) {
      let response = await decreptionJournal(
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
        message: "JournalVoucher fetch Successfully",
        JournalVoucher: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher not Found!",
        JournalVoucher: createdata ? createdata : []
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

// exports.getAllDataPagination = async function(data, res) {
//   try {
//     let createdata = await JournalVoucher.findAndCountAll({
//       where: {
//         company_id: data.company_id,
//         current_year: data.current_year,
//         end_year: data.end_year
//       },
//       include: [
//         {
//           model: Company,
//           attributes: [
//             "company_name",
//             "uid",
//             "gst_number",
//             "terms",
//             "financial_year",
//             "cin_number",
//             "company_pan_number"
//           ]
//         },
//         {
//           model: Purpose
//         },
//         {
//           model: JournalInteries,
//           required: true,
//           include: [
//             {
//               model: Ledger,
//               as: "VoucherLedger",
//               attributes: [
//                 "uid",
//                 "name",
//                 "opening_balance",
//                 "amount",
//                 "tax_key",
//                 "sale_key",
//                 "account_holder_name",
//                 "bank_account_number",
//                 "bank_branch",
//                 "bank_name"
//               ]
//             }
//           ]
//         }
//       ],
//       order: [["invoice_date", "ASC"]],
//       distinct: true,
//       limit: data.limit,
//       offset: data.offset
//     });
//     if (createdata.rows.length > 0) {
//       let response = await decreptionJournal(
//         createdata.rows,
//         "array",
//         data.data.email
//       );
//       response = response.map(item => {
//         if (item.invoice_id) {
//           item.invoice_id =
//             item.invoice_id <= 9
//               ? `${data.current_year.toString().substr(-2) +
//                   `-` +
//                   data.end_year.toString().substr(-2)}/00${item.invoice_id}`
//               : item.invoice_id > 9
//                 ? `${data.current_year.toString().substr(-2) +
//                     `-` +
//                     data.end_year.toString().substr(-2)}/0${item.invoice_id}`
//                 : `${data.current_year.toString().substr(-2) +
//                     `-` +
//                     data.end_year.toString().substr(-2)}/${item.invoice_id}`;
//         }
//         return item;
//       });
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "JournalVoucher fetch Successfully",
//         JournalVoucher: response,
//         Count: createdata.count
//       };
//     } else {
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "JournalVoucher not Found!",
//         JournalVoucher: createdata.rows.length > 0 ? createdata : []
//       };
//     }
//   } catch (e) {
//     return {
//       statusCode: res.statusCode,
//       success: false,
//       error: e.message,
//       message: "Something went wrong!"
//     };
//   }
// };

exports.getAllDataPagination = async function (data, res) {
  try {
    let createdata = await JournalVoucher.findAndCountAll({
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
          model: Purpose
        }
      ],
      order: [['invoice_date', 'ASC']],
      distinct: true,
      limit: data.limit,
      offset: data.offset
    });
    if (createdata.rows.length > 0) {
      let response = await decreptionJournal(
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
        message: "JournalVoucher fetch Successfully",
        JournalVoucher: response,
        Count: createdata.count
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher not Found!",
        JournalVoucher: createdata.rows.length > 0 ? createdata : []
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


exports.createData = async function (data, res) {
  try {
    console.log('data-------------->',data)
    const result = await sequelize.transaction(async t => {
      let isallclear = false;
      if (data.is_after) {
        let count = await JournalVoucher.findOne(
          { where: { [Op.and]: [{ uid: data.after_id }, { company_id: data.company_id }] } },
          t
        );
        let checkYear = await JournalVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year }, { company_id: data.company_id }
              ]
            }
          },
          t
        );
        if (checkYear) {
          data.invoice_id = (await Number(count.dataValues.invoice_id)) + 1;
          let updateCount = await JournalVoucher.update(
            { invoice_id: Sequelize.literal("invoice_id+1") },
            {
              where: {
                [Op.and]: [
                  { current_year: data.current_year },
                  { end_year: data.end_year }, { company_id: data.company_id }
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
        let count = await JournalVoucher.findOne({ where: { [Op.and]: [{ invoice_date: { [Op.lte]: data.invoice_date } }, { current_year: data.current_year }, { end_year: data.end_year }, { company_id: data.company_id }] }, order: [['invoice_id', 'DESC']] }, t);
        let checkYear = await JournalVoucher.findOne({ where: { [Op.and]: [{ current_year: data.current_year }, { end_year: data.end_year }, { company_id: data.company_id }] } }, t)
        if (checkYear) {
          // console.log("count", count.dataValues);
          let finddate = await JournalVoucher.findOne({ where: { [Op.and]: [{ invoice_date: data.invoice_date }, { current_year: data.current_year }, { end_year: data.end_year }, { company_id: data.company_id }] }, order: [['invoice_id', 'DESC']] }, t);
          // console.log("finddate", finddate, data.invoice_id)
          if (finddate) {
            data.invoice_id = await Number(finddate.dataValues.invoice_id) + 1;
            let updateCount = await JournalVoucher.update({ invoice_id: Sequelize.literal('invoice_id+1') }, { where: { [Op.and]: [{ current_year: data.current_year }, { end_year: data.end_year }, { company_id: data.company_id }, { invoice_id: { [Op.gte]: data.invoice_id } }] }, order: [['invoice_id', 'DESC']] }, t);
          } else {
            if (count) {
              data.invoice_id = await Number(count.dataValues.invoice_id) + 1;
            } else {
              data.invoice_id = await 1;
            }
            let updateCount = await JournalVoucher.update({ invoice_id: Sequelize.literal('invoice_id+1') }, { where: { [Op.and]: [{ current_year: data.current_year }, { end_year: data.end_year }, { company_id: data.company_id }, { invoice_date: { [Op.gte]: data.invoice_date } }] } }, t)
          }
        } else {
          data.invoice_id = await 1;
        }
      } else {
        let count = await JournalVoucher.count({
          where: {
            [Op.and]: [
              { current_year: data.current_year },
              { end_year: data.end_year }, { company_id: data.company_id }
            ]
          }
        });
        let checkYear = await JournalVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year }, { company_id: data.company_id }
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
      let itemData = data.itemAdd;
      delete data.itemAdd;
      console.log('data------------->',data)
      let createdata = await JournalVoucher.create(data, { transaction: t });
      entry.createData(data.company_id, Message.journal_create);
      if (itemData.length > 0) {
        console.log('itemData--------------->', itemData)
        console.log('createdata---------------->', createdata)
        console.log(' data.data.email-------------->', data.data.email)
        console.log('t------------------->', t)
        let itemSuccess = await addItemInteries(
          itemData,
          createdata,
          data.data.email,
          t
        );
        if (!itemSuccess) {
          await t.rollback();
          isallclear = false;
        } else {
          isallclear = true;
        }
      }
      let reponse = await decreptionJournal(
        createdata,
        "object",
        data.data.email
      );
      return reponse;
    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher Created Successfully",
        JournalVoucher: result
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

exports.deleteData = async function (id, data, res) {
  try {
    let find = await JournalVoucher.findOne({ where: { uid: id } });
    if (find) {
      let updateCount = await JournalVoucher.update({ invoice_id: Sequelize.literal('invoice_id-1') }, { where: { [Op.and]: [{ current_year: find.dataValues.current_year }, { end_year: find.dataValues.end_year }, { company_id: find.dataValues.company_id }], invoice_id: { [Op.gte]: Number(find.dataValues.invoice_id) } } })
      let deleteInteries = await JournalInteries.destroy({ where: { journa_voucher_id: id } });
      let deletedata = await JournalVoucher.destroy({ where: { uid: id } });
      if (deletedata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "JournalVoucher Delete Successfully",
          JournalVoucher: deletedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Voucher not delete please try later!",
          JournalVoucher: {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Voucher not found!",
        JournalVoucher: {}
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

async function updateItemInteries(array, data, key, trans) {
  for (let i = 0; i < array.length; i++) {
    let obj = await {
      uid: array[i].uid ? array[i].uid : await uniqid(),
      type: array[i].type,
      journa_voucher_id: array[i].journa_voucher_id
        ? array[i].journa_voucher_id
        : data.dataValues.uid,
      ledger_id: array[i].ledger_id,
      company_id: data.dataValues.company_id,
      invoice_date: data.dataValues.invoice_date,
      amount: array[i].amount.toString(),
      creation_date: array[i].creation_date
        ? array[i].creation_date
        : new Date(),
      updated_date: new Date(),
      data: {
        email: key
      }
    };
    let encrypted = await encreptionJournalEntries(obj);

    let finddata = await JournalInteries.findOne(
      {
        where: {
          uid: encrypted.uid,
          journa_voucher_id: encrypted.journa_voucher_id
        }
      },
      trans
    );
    if (finddata) {
      await finddata.update(encrypted);
    } else {
      await JournalInteries.create(encrypted);
    }
    if (i === array.length - 1) {
      return true;
    }
  }
}
exports.updateData = async function (id, data, res) {
  try {
    const result = await sequelize.transaction(async t => {
      data.invoice_date = data.invoice_date;
      data.updated_date = new Date();
      let itemData = data.itemAdd;
      delete data.itemAdd;
      let updatedata = await JournalVoucher.findOne(
        { where: { uid: data.uid } },
        t
      );
      if (updatedata) {
        delete data.invoice_id;
        await updatedata.update(data);
        await entry.createData(data.company_id, Message.journal_update);
        if (itemData.length > 0) {
          await JournalInteries.destroy({ where: { journa_voucher_id: data.uid } });
          let itemSuccess = await updateItemInteries(
            itemData,
            updatedata,
            data.data.email,
            t
          );
          if (!itemSuccess) {
            await t.rollback();
          }
        }
      } else {
        await t.rollback();
      }
      let reponse = await decreptionJournal(
        updatedata,
        "object",
        data.data.email
      );
      return reponse;
    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher Update Successfully",
        JournalVoucher: result
      };
    } else {
      await transaction.rollback();
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

exports.createStockJournalData = async function (data, res) {
  try {
    const result = await sequelize.transaction(async t => {
      if (data.is_after) {
        let count = await ItemStockVoucher.findOne(
          { where: { [Op.and]: [{ uid: data.after_id }] } },
          t
        );
        let checkYear = await ItemStockVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year }
              ]
            }
          },
          t
        );
        if (checkYear) {
          data.invoice_id = (await Number(count.dataValues.invoice_id)) + 1;
          let updateCount = await ItemStockVoucher.update(
            { invoice_id: Sequelize.literal("invoice_id+1") },
            {
              where: {
                [Op.and]: [
                  { current_year: data.current_year },
                  { end_year: data.end_year }
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
        let count = await ItemStockVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { uid: data.after_id },
                { current_year: data.current_year },
                { end_year: data.end_year }
              ]
            }
          },
          t
        );
        let checkYear = await ItemStockVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year }
              ]
            }
          },
          t
        );
        if (checkYear) {
          data.invoice_id = await Number(count.dataValues.invoice_id);
          let updateCount = await ItemStockVoucher.update(
            { invoice_id: Sequelize.literal("invoice_id+1") },
            {
              where: {
                [Op.and]: [
                  { current_year: data.current_year },
                  { end_year: data.end_year }
                ],
                invoice_id: { [Op.gte]: data.invoice_id }
              }
            },
            t
          );
        } else {
          data.invoice_id = await 1;
        }
      } else {
        let count = await ItemStockVoucher.count({
          where: {
            [Op.and]: [
              { current_year: data.current_year },
              { end_year: data.end_year }
            ]
          }
        });
        let checkYear = await ItemStockVoucher.findOne(
          {
            where: {
              [Op.and]: [
                { current_year: data.current_year },
                { end_year: data.end_year }
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
      let itemData = data.itemAdd;
      delete data.itemAdd;
      let createdata = await ItemStockVoucher.create(data, { transaction: t });
      if (createdata) {
        try {
          entry.createData(data.company_id, Message.journal_create);
        } catch (e) {
          await t.rollback();
          return false;
        }

        if (itemData.length > 0) {
          await itemStockVoucherEntries.destroy({ where: { voucher_id: data.uid } });
          let itemSuccess = await addStockItemInteries(
            itemData,
            createdata,
            data.data.email,
            t
          );
          if (!itemSuccess) {
            await t.rollback();
          }
        }
        let reponse = await decreptionJournal(
          createdata,
          "object",
          data.data.email
        );
        return reponse;
      } else {
        await t.rollback();
        return false;
      }
    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStockVoucher Created Successfully",
        JournalVoucher: result
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStockVoucher Not Created",
        JournalVoucher: []
      };
      //await t.rollback();
    }
  } catch (e) {
    //await t.rollback();
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong-!"
    };
  }
};

async function updateStockItemInteries(array, data, key, trans) {
  let items = array;
  for (let i = 0; i < items.length; i++) {
    let body = {
      uid: items[i].uid ? items[i].uid : await uniqid(),
      voucher_id: items[i].voucher_id ? items[i].voucher_id : data.dataValues.uid,
      company_id: items[i].company_id ? items[i].company_id : data.dataValues.company_id,
      item_id: items[i].item_id,
      quantity: items[i].quantity,
      name: items[i].name,
      description: items[i].description,
      model: '',//items[i].model
      hsn_code: items[i].hsn_code,
      unit: items[i].unit,
      price: items[i].price.toString(),
      discount: items[i].discount.toString(),
      discount_type: items[i].discount_type,
      total_amount: items[i].total_amount.toString(),
      igst_tax: items[i].igst_tax,
      type: items[i].type,
      invoice_date: items[i].invoice_date ? items[i].invoice_date : data.dataValues.invoice_date,
      status: 1,
      creation_date: items[i].creation_date ? items[i].creation_date : new Date(),
      updated_date: new Date(),
      data: {
        email: key
      }
    }
    let obj = await encreptionItem(body)
    let finddata = await itemStockVoucherEntries.findOne({ where: { uid: obj.uid, voucher_id: obj.voucher_id } }, trans);
    if (finddata) {
      await finddata.update(obj)
    } else {
      await itemStockVoucherEntries.create(obj, trans);
    }
    if (i === items.length - 1) {
      return true;
    }
  }
}

exports.updateStockvoucherData = async function (id, data, res) {
  try {
    const result = await sequelize.transaction(async t => {
      data.invoice_date = data.invoice_date;
      data.updated_date = new Date();
      let itemData = data.itemAdd;
      delete data.itemAdd;
      let updatedata = await ItemStockVoucher.findOne(
        { where: { uid: data.uid } },
        t
      );
      if (updatedata) {
        delete data.invoice_id;
        await updatedata.update(data);
        await entry.createData(data.company_id, Message.journal_update);
        if (itemData.length > 0) {
          await itemStockVoucherEntries.destroy({ where: { voucher_id: data.uid } });
          let itemSuccess = await updateStockItemInteries(
            itemData,
            updatedata,
            data.data.email,
            t
          );
          if (!itemSuccess) {
            await t.rollback();
          }
        }
        let reponse = await decreptionJournal(
          updatedata,
          "object",
          data.data.email
        );
        return reponse;
      } else {
        await t.rollback();
        return false;
        // await t.rollback();
      }

    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStockVoucher Update Successfully",
        JournalVoucher: result
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStockVoucher Not Created",
        JournalVoucher: []
      };
      //await transaction.rollback();
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.cancelData = async function (id, data, res) {
  try {
    const result = await sequelize.transaction(async (t) => {
      data.updated_date = new Date();
      data.status = 0;
      data.ledger_id = '';
      data.narration = '';
      data.purpose_id = 0;
      data.type = '';
      data.total_amount = '0';
      data = await encreptionJournal(data, data.data.email)
      let updatedata = await JournalVoucher.findOne({ where: { uid: data.uid } }, t);
      if (updatedata) {
        delete data.invoice_id;
        await updatedata.update(data);
        await JournalInteries.destroy({ where: { journa_voucher_id: data.uid } });
      } else {
        await t.rollback();
      }
      let response = await decreptionJournal(updatedata, 'object', data.data.email);
      return response;
    });
    if (result) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "JournalVoucher Cancel Successfully",
        JournalVoucher: result
      };
    } else {
      await transaction.rollback();
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    }
  }
}