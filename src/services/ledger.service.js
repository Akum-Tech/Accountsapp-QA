import Ledger from "../models/ledger";
import AccountGroup from "../models/accountGroup";
import LedgerBalance from "../models/ledgerBalance";
import { checkCode } from "../utility/statusCode";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import uniqid from "uniqid";
import subAccountGroup from "../models/subAccountGroup";
import accountGroup from "../models/accountGroup";
import State from "../models/states";
import Constant from '../constant/config'
import City from "../models/cities";
import "@babel/polyfill";
import Message from '../constant/entryMessage'
import entry from '../utility/entry'

import { encreption, decreption } from "../security/ledger";
import RecieptVoucher from "../models/recieptVoucher";
import TaxInteries from "../models/taxInteries";
import JournalInteries from "../models/journalInteries";
import JournalVoucher from "../models/journalVoucher";
import PaymentVoucher from "../models/paymentVoucher";
import SaleVoucher from "../models/saleVoucher";
import VoucherInteries from "../models/voucherInteries";
import CreditVoucher from "../models/creditVoucher";
import DebitVoucher from "../models/debitVoucher";
import PurchaseVoucher from "../models/purchaseVoucher";


// account_group_id:{[Op.notIn]:[Constant.bankA, Constant.bankL, Constant.case]}

exports.getSingleData = async function(id, data, res) {
  try {
    let createdata = await Ledger.findOne({
      where: { uid: id },
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
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ]
    });
    if (createdata) {
      let response = await decreption(createdata, 'object', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : {}
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

exports.getAllData = async function(cid, data, res) {
  try {
    let createdata = await Ledger.findAll({
      where: {
        company_id: cid
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC'],
            ['name','DESC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email);
      // console.log("response", response)
      let findObject =await response.find(el=>el.name=="Stock In Hand dr" || el.name=="Opening Stock");
      console.log("findObject", findObject)
      if(findObject){
        let findIndex =await response.findIndex(el=>el.name=="Stock In Hand dr" || el.name=="Opening Stock");
        console.log("findIndex", findIndex)
        response.splice(findIndex, 1);
        response.unshift(findObject);
      }
     
      // var index = $scope.messageList.indexOf(msg);
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
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

exports.getAllLedgerForJournlVoucher = async function(cid, data, res) {
  try {
    let createdata = await Ledger.findAll({
      where: {
        company_id: cid,
        account_group_id:{[Op.notIn]:[Constant.stockinhand_id]}
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
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

exports.getAllLedgerwithoutbank = async function(cid, data, res) {
  try {
    let createdata = await Ledger.findAll({
      where: {
        company_id: cid,
        account_group_id:{[Op.notIn]:[Constant.stockinhand_id,Constant.bankA, Constant.bankL, Constant.case, Constant.profit_loss_id, Constant.sale_account_id, Constant.PurchaseAccounts]}
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
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


exports.getAllLedgerReport = async function(cid, data, res) {
  try {
    let createdata = await Ledger.findAll({
      where: {
        company_id: cid,
        account_group_id:{[Op.notIn]:[Constant.stockinhand_id,Constant.bankA, Constant.bankL, Constant.case]}
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
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


exports.getAllSalePurchase = async function(cid, data, res) {

  try {
    let createdata = await Ledger.findAll({
      where: {
        [Op.and]:[
          {company_id:cid},
          {account_group_id: {[Op.in]: [Constant.sundry_debtors_id,Constant.sundry_creditors_id]}}
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
      };
    }
  } catch (e) {
    console.log('error in ledger----->',JSON.stringify(e))
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};


exports.getAllSalePurchaseVoucherLedger = async function(cid, data, res) {
  try {
    let createdata = await Ledger.findAll({
      where: {
        [Op.and]:[
          {company_id:cid},
          {account_group_id: {[Op.in]: [Constant.bankA,Constant.bankL,Constant.case,Constant.sundry_debtors_id,Constant.sundry_creditors_id]}}
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
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

exports.getstockinhand = async function(cid, data, res) {
  try {
    
    let createdata = await Ledger.findAll({
      where: {
        [Op.and]:[
          {company_id:cid},
          {account_group_id: {[Op.in]: [Constant.stockinhand_id]}}
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ],order: [
            ['id', 'ASC']
        ]
    });
    if (createdata.length > 0) {
      let response = await decreption(createdata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger fetch Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger not Found!",
        Ledger: createdata ? createdata : []
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong--->!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
    data.uid = await uniqid();
    data.creation_date = new Date();
    data.updated_date = new Date();
    let find = await Ledger.findOne({where:{
      name:data.name,
      company_id:data.company_id
    }})
    if(find){
      return {
        statusCode: await checkCode("validation"),
        success: false,
        message: "Ledger name already exist!"
      };
    }else{

      if(data.is_default_bank){
        let finddata = await Ledger.findOne({
          where: {
            company_id: data.company_id,
            is_default_bank:'true'
          }
        });
        if(finddata){
          await finddata.update({is_default_bank:'false'});
        }
      }
      // return

      let createdata = await Ledger.create(data);
      if (createdata) {
        entry.createData(data.company_id, Message.ledger_create);
        let response = await decreption(createdata, 'object', data.data.email)
        return {
            statusCode: res.statusCode,
            success: true,
            message: "Ledger Created Successfully",
            Ledger: response
          };
      }else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Ledger Not created"
        };
      }
    }
   
  } catch (e) {
    console.log("e", e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, res) {
  try {
    let findReciept = await RecieptVoucher.findOne({where:{[Op.or]:[{receive_id:id},{ledger_id:id}]}});
    let findPaymentVoucher = await PaymentVoucher.findOne({where:{[Op.or]:[{receive_id:id},{ledger_id:id}]}});
    let findTaxInteries = await TaxInteries.findOne({where:{tax_ledger_id:id}});
    let findJournalInteries = await JournalInteries.findOne({where:{ledger_id:id}});
    let findJournalVoucher = await JournalVoucher.findOne({where:{ledger_id:id}});
    let findSaleVoucher = await SaleVoucher.findOne({where:{buyer_ledger_id:id}});
    let findVoucherInteries = await VoucherInteries.findOne({where:{ledger_id:id}});
    let findCreditVoucher = await CreditVoucher.findOne({where:{buyer_ledger_id:id}});
    let findDebitVoucher = await DebitVoucher.findOne({where:{buyer_ledger_id:id}});
    let findPurchaseVoucher = await PurchaseVoucher.findOne({where:{buyer_ledger_id:id}});
    if(findReciept || findPaymentVoucher || findTaxInteries || findJournalInteries || findJournalVoucher || findSaleVoucher || findVoucherInteries || findCreditVoucher || findDebitVoucher || findPurchaseVoucher){
      return {
        statusCode: res.statusCode,
        success: false,
        message: "you can not delete ledger!",
        Ledger: {}
      };
    }
    

    let deletedata = await Ledger.destroy({ where: { uid: id } });
    // let deletedatabalance = await  LedgerBalance.destroy({ where: {ledger_id:id}});
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger Delete Successfully",
        Ledger: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        Ledger: deletedata
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

exports.updateData = async function(id, data, res) {
  try {
    let finddata = await Ledger.findOne({ where: { uid: id } });

    if (finddata) {
      if(data.is_default_bank){
        let finddata = await Ledger.findOne({
          where: {
            company_id: data.company_id,
            is_default_bank:'true'
          }
        });
        if(finddata){
          await finddata.update({is_default_bank:'false'});
        }
      }
      
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
        let response = await decreption(updatedata, 'object', data.data.email)
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Ledger update Successfully",
          Ledger: response
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          Ledger: {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Ledger not found!",
        Ledger:  {}
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

exports.getAllbankData = async function(data, res) {
  try {
    // let findbankIds = await AccountGroup.findAll({
    //   where: { name: { [Op.like]: "%Bank%" } }
    // }).map(u => u.get("uid"));
    let finddata = await Ledger.findAll({
      where: {
        [Op.and]: [
          {
            company_id: data.company_id
          },
          {
            account_group_id: { [Op.in]: [Constant.bankA, Constant.bankL] }
          }
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ]
    });
    if (finddata) {
      let response = await decreption(finddata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger update Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Bank ledger not created",
        Ledger: []
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

exports.getAllbankcaseData= async function(data, res) {
  try {
    // let findbankIds = await AccountGroup.findAll({
    //   where: {
    //     [Op.and]:[
    //       { name: { [Op.like]: "%Bank%" }}
    //     ]
    //   }
    // }).map(u => u.get("uid"));

    let finddata = await Ledger.findAll({
      where: {
        [Op.and]: [
          {
            company_id: data.company_id
          },
          {
            account_group_id: { [Op.in]: [Constant.case,Constant.bankA, Constant.bankL] }
          }
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ]
    });
    if (finddata) {
      let response = await decreption(finddata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger find Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Bank ledger not created",
        Ledger: []
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

exports.getAllcaseData= async function(data, res) {
  try {
    let finddata = await Ledger.findAll({
      where: {
        [Op.and]: [
          {
            company_id: data.company_id
          },
          {
            account_group_id: { [Op.in]: [Constant.case] }
          }
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ]
    });
    if (finddata) {
      let response = await decreption(finddata, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Case Ledger find Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Case ledger not created",
        Ledger: []
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

exports.getAllDiscountData= async function(data, res) {
  try {
   let finddata = await Ledger.findAll({
      where: {
        [Op.and]: [
          {
            company_id: data.company_id
          },
          {
            account_group_id: { [Op.in]: [Constant.indirect_Expenses_id] }
          }
        ]
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
        },
        {
          model: subAccountGroup,
          attributes: ["uid", "name"]
        },
        {
          model: accountGroup,
          attributes: ["uid", "name"]
        }
      ]
    });
    if (finddata) {
      let response = await decreption(finddata, 'array', data.data.email)
      let find = response.find(el=>el.name=="Round Off" || el.name=="round off");
      if(find){
        var index = response.indexOf(find);
        response.splice(index,1);
      }
     
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger find Successfully",
        Ledger: response
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Bank ledger not created",
        Ledger: []
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

exports.getDefaultbankData = async function(id, data, res) {
  try {
    let exists = await Ledger.findOne({
      where:{
        company_id: id,
        [Op.or]:[
          {
            account_group_id:Constant.bankA
          },
          {
            account_group_id:Constant.bankL
          }
        ]
      }
    })
    if(exists){
      let finddata = await Ledger.findOne({
        where: {
          company_id: id,
          is_default_bank:'true'
        }
      });
      if (finddata) {
        let response = await decreption(finddata, 'object', data.data.email)
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Ledger Fetch Successfully",
          Ledger: response
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Bank ledger not set as default",
          Ledger: {}
        };
      }
    }else{
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Bank ledger not created",
        Ledger: {}
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


exports.getAutoLedgerList= async function(data, res) {
  try {
    let findAutoLedger = await Ledger.findAll({where:{
      is_auto:true,
      company_id:data.company_id
    }})
    if(findAutoLedger && findAutoLedger.length>0){
      findAutoLedger =await decreption(findAutoLedger, 'array', data.data.email)
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Ledger find Successfully",
        Ledger: findAutoLedger
      };
    }else{
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Auto Ledger Not Found!",
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
