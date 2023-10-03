import Company from "../models/company";
import User from "../models/users";
import Entries from "../models/entries";
import AccountGroup from "../models/accountGroup";
import StockGroup from '../models/stockGroup';
import { checkCode } from "../utility/statusCode";
import State from "../models/states";
import City from "../models/cities";
import CompanyAccountGroup from "../models/company_account_group";
import Sequelize from "sequelize";
import uniqid from "uniqid";
import fs from "fs";
import Message from '../constant/entryMessage'
import entry from '../utility/entry'
import Ledger from "../models/ledger";
import Constant from '../constant/config';
import { decreption } from "../security/company";
import { encreption } from "../security/ledger";
const Op = Sequelize.Op;
import "@babel/polyfill";
import RecieptVoucher from "../models/recieptVoucher";
import PaymentVoucher from "../models/paymentVoucher";
import JournalVoucher from "../models/journalVoucher";
import SaleVoucher from "../models/saleVoucher";
import CreditVoucher from "../models/creditVoucher";
import DebitVoucher from "../models/debitVoucher";
import PurchaseVoucher from "../models/purchaseVoucher";
import Item from "../models/items";
import addSubusers from "../models/addsubusers";

exports.getSingleData = async function (id, data, res) {
  try {
    let createdata = await Company.findOne({
      where: {
        uid: id
      },
      include: [
        {
          model: User
        }, {
          model: Entries
        }
      ]
    });
    if (createdata) {
      let response = await decreption(createdata, "object", data.data.email);
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company fetch Successfully",
        company: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company not Found!",
        company: {}
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
    let createdata = await Company.findAll({
      where: {
        user_id: data.data.uid
      },
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
        },{
          model:Entries
        }
      ],order: [
        ['id', 'ASC']
      ]
    }).map((node) => node.get({
        plain: true
    }));
    if (createdata.length > 0) {
      console.log('createdata',createdata);
      console.log('email',data.data.email);
      let response = await decreption(createdata, "array", data.data.email);
      await response.forEach(async(element) => {
        let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:element.uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'debit',registration_type:'Regular', status:1,period_start:element.current_period_start,period_end :element.current_period_end,cess:false,amount:'0',data:{email:data.data.email} });
        if(ledgerbody3){
          let find = await Ledger.findOne({where:{name:ledgerbody3.name, company_id:ledgerbody3.company_id}});
          if(!find){
            Ledger.create(ledgerbody3);
          }
        }
      });
      // for (let index = 0; index < response.length; index++) {
      //   let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:response[index].uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'credit',registration_type:'Regular', status:1,period_start:response[index].current_period_start,period_end :response[index].current_period_end,cess:false,amount:'0',data:{email:data.data.email} });

      //   console.log("ledgerbody3", ledgerbody3)

      //   if(ledgerbody3){
      //     let find = await Ledger.findOne({where:{name:ledgerbody3.name, company_id:ledgerbody3.company_id}});
      //     if(!find){
      //       Ledger.create(ledgerbody3);
      //     }
      //   }
      //   if(index==response.length-1){
         
      //   }
      // }
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company fetch Successfully",
        company: response
      };

    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company not Found!",
        company: createdata ? createdata : []
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
exports.getAllData = async function (data, res) {
  try {
    let checksubUsers = await addSubusers.findAll({
      where: {
        // sub_user_id: data.uid
        sub_user_id: data.data.uid
      }
    })
    console.log('checksubUsers-------------------->', checksubUsers)
    var companyId
    
    let filter={};
    filter.where={}
    if (checksubUsers.length != 0) {
      companyId = [...new Set(checksubUsers.map(x => x.company_id))]
      console.log('companyId-------------->', companyId)
     
      filter.where={
        [Op.or]: {
          // user_id: data.uid,
          user_id:  data.data.uid,
          uid: companyId
        }
      }
    }else{
      // filter.where.user_id=data.uid

      filter.where.user_id=data.data.uid
    }
    filter.include=[
      {
        model: City,
        attributes: ["name"],
        include: [
          {
            model: State,
            attributes: ["name"]
          }
        ]
      }, {
        model: Entries
      }
    ]
    filter.order=[['id', 'ASC']]
    let resp=await Company.findAll(filter).map((node) => node.get({
      plain: true
    }));

    // let resp = await Company.findAll({
    //   where: {
    //     // user_id: data.data.uid
    //     [Op.or]: {
    //       user_id: data.uid,
    //       uid: companyId
    //     }
    //   },
    //   include: [
    //     {
    //       model: City,
    //       attributes: ["name"],
    //       include: [
    //         {
    //           model: State,
    //           attributes: ["name"]
    //         }
    //       ]
    //     }, {
    //       model: Entries
    //     }
    //   ], order: [
    //     ['id', 'ASC']
    //   ]
    // }).map((node) => node.get({
    //   plain: true
    // }));
    if (resp.length > 0) {
      console.log('createdata', resp);
      let checkset = [...new Set(resp.map(x => x.user_id))]
      let arr = []
      for (let i = 0; i < checkset.length; i++) {
        let userEmailFind = await User.findOne({
          where: {
            uid: checkset[i]
          },
          attributes: ['email']
        })
        let resp1 = resp.filter((item) => item.user_id == checkset[i])
        let response = await decreption(resp1, "array", userEmailFind.dataValues.email);
        await response.forEach(async (element) => {
          // let ledgerbody3 = await encreption({ uid: uniqid(), name: 'Round Off', company_id: element.uid, account_group_id: Constant.indirect_Expenses_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: element.current_period_start, period_end: element.current_period_end, cess: false, amount: '0', data: { email: data.data.email } }); byme
          let ledgerbody3 = await encreption({ uid: uniqid(), name: 'Round Off', company_id: element.uid, account_group_id: Constant.indirect_Expenses_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: element.current_period_start, period_end: element.current_period_end, cess: false, amount: '0', data: { email: data.email } });
          if (ledgerbody3) {
            let find = await Ledger.findOne({ where: { name: ledgerbody3.name, company_id: ledgerbody3.company_id } });
            if (!find) {
              Ledger.create(ledgerbody3);
            }
          }
        });
        arr.push(response)
      }
      let flatArray = arr.reduce((acc, curVal) => {
        return acc.concat(curVal)
    }, []);
    // console.log('faltarray----------->',flatArray)
    let roleadd=flatArray.filter((value,index,arr)=>{
      if(value.user_id==data.data.uid){
          value['role']='Admin'
      }else{
          value['role']='Subuser'
      }
      return flatArray
      })
      res.json({
        statusCode: res.statusCode,
        success: true,
        message: "Company fetch Successfully",
        company: roleadd
      })




      // console.log('email',data.data.email);
      // let response = await decreption(createdata, "array", data.email);

      // let response = await decreption(createdata, "array", data.data.email);
      // await response.forEach(async (element) => {
      //   let ledgerbody3 = await encreption({ uid: uniqid(), name: 'Round Off', company_id: element.uid, account_group_id: Constant.indirect_Expenses_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: element.current_period_start, period_end: element.current_period_end, cess: false, amount: '0', data: { email: data.data.email } });
      //   if (ledgerbody3) {
      //     let find = await Ledger.findOne({ where: { name: ledgerbody3.name, company_id: ledgerbody3.company_id } });
      //     if (!find) {
      //       Ledger.create(ledgerbody3);
      //     }
      //   }
      // });
      // for (let index = 0; index < response.length; index++) {
      //   let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:response[index].uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'credit',registration_type:'Regular', status:1,period_start:response[index].current_period_start,period_end :response[index].current_period_end,cess:false,amount:'0',data:{email:data.data.email} });

      //   console.log("ledgerbody3", ledgerbody3)

      //   if(ledgerbody3){
      //     let find = await Ledger.findOne({where:{name:ledgerbody3.name, company_id:ledgerbody3.company_id}});
      //     if(!find){
      //       Ledger.create(ledgerbody3);
      //     }
      //   }
      //   if(index==response.length-1){

      //   }
      // }
      // return {
      //   statusCode: res.statusCode,
      //   success: true,
      //   message: "Company fetch Successfully",
      //   company: response
      // };

    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company not Found!",
        company: resp ? resp : []
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


// exports.getAllData = async function(data, res) {
//   try {
//     let createdata = await Company.findAll({
//       where: {
//         // user_id: data.data.uid
//         user_id: data.uid

//       },
//       include: [
//         {
//           model: City,
//           attributes: ["name"],
//           include: [
//             {
//               model: State,
//               attributes: ["name"]
//             }
//           ]
//         },{
//           model:Entries
//         }
//       ],order: [
//         ['id', 'ASC']
//       ]
//     }).map((node) => node.get({
//         plain: true
//     }));
//     if (createdata.length > 0) {
//       // console.log('createdata',createdata);
//       // console.log('email',data.data.email);
//       let response = await decreption(createdata, "array", data.email);
//       // let response = await decreption(createdata, "array", data.data.email);
//       await response.forEach(async(element) => {
//         let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:element.uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'debit',registration_type:'Regular', status:1,period_start:element.current_period_start,period_end :element.current_period_end,cess:false,amount:'0',data:{email:data.email} });
//         // let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:element.uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'debit',registration_type:'Regular', status:1,period_start:element.current_period_start,period_end :element.current_period_end,cess:false,amount:'0',data:{email:data.data.email} });

//         if(ledgerbody3){
//           let find = await Ledger.findOne({where:{name:ledgerbody3.name, company_id:ledgerbody3.company_id}});
//           if(!find){
//             Ledger.create(ledgerbody3);
//           }
//         }
//       });
//       // for (let index = 0; index < response.length; index++) {
//       //   let ledgerbody3 =await encreption({uid:uniqid(),name:'Round Off',company_id:response[index].uid,account_group_id:Constant.indirect_Expenses_id,opening_balance:'credit',registration_type:'Regular', status:1,period_start:response[index].current_period_start,period_end :response[index].current_period_end,cess:false,amount:'0',data:{email:data.data.email} });

//       //   console.log("ledgerbody3", ledgerbody3)

//       //   if(ledgerbody3){
//       //     let find = await Ledger.findOne({where:{name:ledgerbody3.name, company_id:ledgerbody3.company_id}});
//       //     if(!find){
//       //       Ledger.create(ledgerbody3);
//       //     }
//       //   }
//       //   if(index==response.length-1){

//       //   }
//       // }
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "Company fetch Successfully",
//         company: response
//       };

//     } else {
//       return {
//         statusCode: res.statusCode,
//         success: true,
//         message: "Company not Found!",
//         company: createdata ? createdata : []
//       };
//     }
//   } catch (e) {
//     console.log(e)
//     return {
//       statusCode: await checkCode("error"),
//       success: false,
//       error: e.message,
//       message: "Something went wrong!"
//     };
//   }
// };
exports.createData = async function (data, res) {
  try {
    if (new Date() >= new Date(data.financial_year)) {
      // data.user_id = data.data.uid;byme
      // data.user_id = data.uid;

      let checkdata = await Company.findOne({
        // where: { company_name: data.company_name, user_id: data.data.uid } byme
        where: { company_name: data.company_name, user_id: data.user_id }

      });
      if (checkdata) {
        // let response = await decreption(checkdata, "object", data.data.email);byme
        let response = await decreption(checkdata, "object", data.email);

        return {
          statusCode: res.statusCode,
          success: false,
          message: "Already Exist!",
          company: response
        };
      } else {
        data.uid = await uniqid();
        data.creation_date = new Date();
        data.updated_date = new Date();
        let dummydate = new Date(data.financial_year);
        let dummymonth = dummydate.getMonth() + 1;
        let yearend;
        let yearstart;
        if (dummymonth == 1 || dummymonth == 2 || dummymonth == 3) {
          yearend = Number(dummydate.getFullYear());
          yearstart = Number(dummydate.getFullYear()) - 1;
        } else {
          yearend = Number(dummydate.getFullYear()) + 1;
          yearstart = Number(dummydate.getFullYear());
        }
        let finaldatestart = "04-01-" + yearstart;
        let finaldateend = "03-31-" + yearend;
        data.financial_start = finaldatestart;
        data.financial_end = finaldateend;
        data.current_period_start = finaldatestart;
        data.current_period_end = finaldateend;
        data.bookstart_date = data.financial_year;
        // data.role = 'Admin';
        let createdata = await Company.create(data)
        // console.log('createddata------>', createdata)
        let userData = await User.findOne({ where: { uid: data.user_id } })
        // let filter = {
        //   cid: createdata.uid,
        //   company_name: createdata.company_name,
        //   main_user_id: data.user_id,
        //   main_user_name: userData.dataValues.name,
        //   mainuser_email: userData.dataValues.email,
        //   mainuser_mobile: userData.dataValues.phone,
        //   status: 'Company created by Admin',
        //   isAdminInvitedSubUser: 'No',
        //   is_editable: 'Yes',
        //   is_viewable: 'Yes',
        //   Role: 'Admin'
        // }


        // let createtrack = await compUserSubUserTrack.create(filter)


        if (createdata) {
          // let ledgerbody = await encreption({ uid: uniqid(), name: 'Cash', company_id: createdata.dataValues.uid, account_group_id: Constant.case, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.data.email } });byme
          let ledgerbody = await encreption({ uid: uniqid(), name: 'Cash', company_id: createdata.dataValues.uid, account_group_id: Constant.case, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.email } });

          if (ledgerbody) {
            Ledger.create(ledgerbody);
          }
          // let ledgerbody1 = await encreption({ uid: uniqid(), name: 'Opening Stock', company_id: createdata.dataValues.uid, account_group_id: Constant.stockinhand_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.data.email } });byme
          let ledgerbody1 = await encreption({ uid: uniqid(), name: 'Opening Stock', company_id: createdata.dataValues.uid, account_group_id: Constant.stockinhand_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.email } });

          if (ledgerbody1) {
            Ledger.create(ledgerbody1);
          }

          // let ledgerbody3 = await encreption({ uid: uniqid(), name: 'Round Off', company_id: createdata.dataValues.uid, account_group_id: Constant.indirect_Expenses_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.data.email } }); byme
          let ledgerbody3 = await encreption({ uid: uniqid(), name: 'Round Off', company_id: createdata.dataValues.uid, account_group_id: Constant.indirect_Expenses_id, opening_balance: 'debit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.email } });

          if (ledgerbody3) {
            Ledger.create(ledgerbody3);
          }

          // let ledgerbody4 = await encreption({ uid: uniqid(), name: 'Profit & Loss A/c', company_id: createdata.dataValues.uid, account_group_id: Constant.profit_loss_id, opening_balance: 'credit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.data.email } }); byme
          let ledgerbody4 = await encreption({ uid: uniqid(), name: 'Profit & Loss A/c', company_id: createdata.dataValues.uid, account_group_id: Constant.profit_loss_id, opening_balance: 'credit', registration_type: 'Regular', status: 1, period_start: createdata.dataValues.current_period_start, period_end: createdata.dataValues.current_period_end, cess: false, amount: '0', is_auto: true, data: { email: data.email } });

          if (ledgerbody4) {
            Ledger.create(ledgerbody4);
          }

          let stockObj = {
            uid: await uniqid(),
            stock_name: "Primary",
            company_id: createdata.dataValues.uid
          }
          let stockcreate = await StockGroup.create(stockObj);
          entry.createData(createdata.dataValues.uid, Message.company_create);
          // let response = await decreption(createdata, "object", data.data.email);by me
          let response = await decreption(createdata, "object", data.email);
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Company Created Successfully",
            company: response
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "company not created",
            company: createdata
          };
        }
      }
    } else {
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

exports.deleteData = async function (id, res) {
  try {

    let findReciept = await RecieptVoucher.findOne({ where: { company_id: id } });
    let findPaymentVoucher = await PaymentVoucher.findOne({ where: { company_id: id } });
    let findJournalVoucher = await JournalVoucher.findOne({ where: { company_id: id } });
    let findSaleVoucher = await SaleVoucher.findOne({ where: { company_id: id } });
    let findCreditVoucher = await CreditVoucher.findOne({ where: { company_id: id } });
    let findDebitVoucher = await DebitVoucher.findOne({ where: { company_id: id } });
    let findPurchaseVoucher = await PurchaseVoucher.findOne({ where: { company_id: id } });
    let findItem = await Item.findOne({ where: { company_id: id } });
    if (findReciept || findPaymentVoucher || findJournalVoucher || findSaleVoucher || findCreditVoucher || findDebitVoucher || findPurchaseVoucher || findItem) {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "you can not delete Company!",
        Ledger: {}
      };
    }
    let deletedata = await CompanyAccountGroup.destroy({
      where: { company_id: id }
    });
    let deleteComapnydata = await Company.destroy({ where: { uid: id } });
    if (deleteComapnydata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Company Delete Successfully",
        company: deletedata
      };
    } else {
      return {
        statusCode: await checkCode("error"),
        success: false,
        message: "Something went wrong!",
        company: deletedata
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

exports.updateData = async function (id, data, res) {
  try {
    data.user_id = data.data.uid;
    let finddata = await Company.findOne({ where: { uid: id } });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
        let response = await decreption(updatedata, "object", data.data.email);
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Company update Successfully",
          company: response
        };
      } else {
        return {
          statusCode: await checkCode("error"),
          success: false,
          message: "Something went wrong!",
          company: {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Company not found!",
        company: {}
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

exports.updatePeriodDate = async function (data, res) {
  try {
    data.user_id = data.data.uid;
    if (new Date() >= new Date(data.current_period_start) && new Date(data.current_period_start) >= new Date(data.financial_start)) {
      let dummydate = new Date(data.current_period_start);
      let dummymonth = dummydate.getMonth() + 1;
      let yearend;
      let yearstart;
      if (dummymonth == 1 || dummymonth == 2 || dummymonth == 3) {
        // if(dummydate.getFullYear()){

        // }
        yearend = Number(dummydate.getFullYear());
        yearstart = Number(dummydate.getFullYear()) - 1;
      } else {
        yearend = Number(dummydate.getFullYear()) + 1;
        yearstart = Number(dummydate.getFullYear());
      }
      let finaldatestart = "04-01-" + yearstart;
      let finaldateend = "03-31-" + yearend;
      data.current_period_start = finaldatestart;
      data.current_period_end = finaldateend;
      let finddata = await Company.findOne({ where: { uid: data.uid } });
      if (finddata) {
        // data.updated_date = new Date();
        let updatedata = await finddata.update(data);
        if (updatedata) {
          let response = await decreption(updatedata, "object", data.data.email);
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Company update Successfully",
            company: response
          };
        } else {
          return {
            statusCode: await checkCode("error"),
            success: false,
            message: "Something went wrong!",
            company: updatedata
          };
        }
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Company not found!",
          company: finddata ? finddata : {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Current period date less then current date and grater the financial year",
        company: {}
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
}

exports.updateMaualstock = async function (data, res) {
  try {
    data.user_id = data.data.uid;
    if (new Date() >= new Date(data.current_period_start) && new Date(data.current_period_start) >= new Date(data.financial_start)) {


      let finddata = await Company.findOne({ where: { uid: data.uid } });
      if (finddata) {
        // data.updated_date = new Date();
        let updatedata = await finddata.update(data);
        if (updatedata) {
          let response = await decreption(updatedata, "object", data.data.email);
          return {
            statusCode: res.statusCode,
            success: true,
            message: "manula stock update Successfully",
            company: response
          };
        } else {
          return {
            statusCode: await checkCode("error"),
            success: false,
            message: "Something went wrong!",
            company: updatedata
          };
        }
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Company not found!",
          company: finddata ? finddata : {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Current period date less then current date and grater the financial year",
        company: {}
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
}