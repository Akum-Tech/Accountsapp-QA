import PurchaseVoucher from '../models/purchaseVoucher';
import Company from '../models/company';
import AccountGroup from '../models/accountGroup';
import subAccountGroup from '../models/subAccountGroup';
import State from '../models/states';
import City from '../models/cities';
import Ledger from '../models/ledger';
import TaxInteries from '../models/taxInteries';
import VoucherInteries from '../models/voucherInteries';
import ItemInteries from '../models/itemInteries';
import { sequelize } from '../database/database'
import Constant from '../constant/config'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import uniqid from 'uniqid';
import Message from '../constant/entryMessage'
import entry from '../utility/entry'
import arraySort from 'array-sort';

import { encreptionPurchase, decreptionPurchase } from "../security/purchasevoucher";
import { encreptionBank } from "../security/bank";
import { encreption } from "../security/ledger";
import { encreptionItem } from "../security/itemEntries";
import { encreptionTax } from "../security/taxEntries";
import { encreptionVoucher } from "../security/voucherEntries";

import "@babel/polyfill"

async function addItemInteries(array, data, key, companydata, trans){

    console.log("array123 = = = ", array)
    let items = array;
    let mainArray = [];
    for(let i=0;i<items.length;i++){
        let nameobj = await encreption({
            name:data.dataValues.is_local=="yes"?"Purchase Local @ "+items[i].igst_tax+"%":"Purchase Interstate @ "+items[i].igst_tax+"%",
            data:{
                email:key
            }
        })
        let findtax = await Ledger.findOne({where:
            {
                [Op.and]: [{sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax},{name:nameobj.name}, {company_id: data.dataValues.company_id }]
            }
        });
        if(findtax){
            let body ={
                uid: await uniqid(),
                voucher_id:data.dataValues.uid,
                item_id:items[i].item_id,
                quantity:items[i].quantity,
                ledger_id:findtax.dataValues.uid,
                company_id:data.dataValues.company_id,
                name:items[i].name,
                description:items[i].description?items[i].description:'',
                model:'',//items[i].model
                hsn_code:items[i].hsn_code?items[i].hsn_code:'',
                unit:items[i].unit?items[i].unit:'',
                price:items[i].price.toString(),
                discount:items[i].discount.toString(),
                discount_type:items[i].discount_type,
                total_amount:items[i].total_amount.toString(),
                igst_tax:items[i].igst_tax,
                type:items[i].type,
                invoice_date:data.dataValues.invoice_date,
                status:1,
                creation_date:new Date(),
                updated_date: new Date(),
                data:{
                    email:key
                }
            }
            let encypted = await encreptionItem(body)
            mainArray.push(encypted);
        }else{
            let body = await {
                uid: uniqid(),
                company_id:companydata.dataValues.uid,
                name:data.dataValues.is_local=="yes"?"Purchase Local @ "+items[i].igst_tax+"%":"Purchase Interstate @ "+items[i].igst_tax+"%",
                account_group_id:Constant.PurchaseAccounts,
                sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax,
                period_start:companydata.dataValues.current_period_start,
                period_end:companydata.dataValues.current_period_end,
                opening_balance:'debit',
                amount:'0',
                is_default_bank:"false",
                cess:false,
                is_auto:true,
                status:1,
                creation_date:new Date(),
                updated_date: new Date(),
                data:{
                    email:key
                }
            }
            let ledgerencrypted= await encreption(body);
            let createLedger =await Ledger.create(ledgerencrypted);
            if(createLedger){
                let body ={
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    item_id:items[i].item_id,
                    quantity:items[i].quantity,
                    ledger_id:createLedger.dataValues.uid,
                    company_id:data.dataValues.company_id,
                    name:items[i].name,
                    description:items[i].description?items[i].description:'',
                    model:'',//items[i].model
                    hsn_code:items[i].hsn_code?items[i].hsn_code:'',
                    unit:items[i].unit?items[i].unit:'',
                    price:items[i].price.toString(),
                    discount:items[i].discount.toString(),
                    discount_type:items[i].discount_type,
                    total_amount:items[i].total_amount.toString(),
                    igst_tax:items[i].igst_tax,
                    type:items[i].type,
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let encypted = await encreptionItem(body)
                mainArray.push(encypted);
            }
        }
        
        if(i===items.length-1){
            let itemInteries = await ItemInteries.bulkCreate(mainArray, {transaction:trans});
            if(itemInteries){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}
async function addTaxInteries(array, data, key, trans, companydata){
    let taxs = array;
    let mainArray = [];
    for(let i=0;i<taxs.length;i++){
            let findtax = await Ledger.findOne({where:{
                  [Op.and]: [{tax_key:taxs[i].tax_percentage+'-'+taxs[i].tax_name},
                     {company_id: data.company_id }]
                }});
            if(findtax){
                let body = await {
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    tax_ledger_id:findtax.dataValues.uid,
                    amount:taxs[i].tax_amount,
                    type:taxs[i].type,
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let taxencyption = await encreptionTax(body);
               await mainArray.push(taxencyption); 
            }else{
                let body = await {uid:await uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:"tax-"+taxs[i].tax_percentage+'-'+taxs[i].tax_name,
                    account_group_id:Constant.tax_account_id,
                    tax_key:taxs[i].tax_percentage+'-'+taxs[i].tax_name,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'debit',
                    amount:'0',
                    is_default_bank:"false",
                    cess:false,
                    is_auto:true,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let leadgerEn = await encreption(body)
                let createLedger =await Ledger.create(leadgerEn);
                if(createLedger){
                    let body = await {
                        uid: await uniqid(),
                        voucher_id:data.dataValues.uid,
                        tax_ledger_id:createLedger.dataValues.uid,
                        amount:taxs[i].tax_amount,
                        type:taxs[i].type,
                        invoice_date:data.dataValues.invoice_date,
                        status:1,
                        creation_date:new Date(),
                        updated_date: new Date(),
                        data:{
                            email:key
                        }
                    }
                    let taxencyption = await encreptionTax(body);
                    await mainArray.push(taxencyption)
                }
            }
        if(i===taxs.length-1){
            let taxAdd = await TaxInteries.bulkCreate(mainArray, {transaction:trans});
            if(taxAdd){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}
async function addVoucherInteries(array, data, key, trans, companydata){
    let voucher = array;
    let mainArray = [];
    for(let i=0;i<voucher.length;i++){
            let nameobj = await encreption({
                name:voucher[i].sale_type==="local"?"Purchase Local @ "+voucher[i].percentage+"%":"Purchase Interstate @ "+voucher[i].sale_percentage+"%",
                data:{
                    email:key
                }
            })
            let findtax = await Ledger.findOne({where:
                    {
                        [Op.and]: [{sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage},{name:nameobj.name},
                        {company_id: data.company_id }]
                    }
                });
            if(findtax){
                let body = await {
                    uid: uniqid(),
                    voucher_id:data.dataValues.uid,
                    ledger_id:findtax.dataValues.uid,
                    amount:voucher[i].amount,
                    type:'Purchase',
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                };
                let encrypted = await encreptionVoucher(body);
                await mainArray.push(encrypted); 
            }else{
                let body = await {uid: uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:voucher[i].sale_type==="local"?"Purchase Local @ "+voucher[i].percentage+"%":"Purchase Interstate @ "+voucher[i].sale_percentage+"%",
                    account_group_id:Constant.PurchaseAccounts,
                    sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'debit',
                    amount:'0',
                    is_default_bank:"false",
                    cess:false,
                    status:1,
                    is_auto:true,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let ledgerencrypted= await encreption(body);
                let createLedger =await Ledger.create(ledgerencrypted);
                if(createLedger){
                    let body = await {
                        uid: uniqid(),
                        voucher_id:data.dataValues.uid,
                        amount:voucher[i].amount,
                        ledger_id:createLedger.dataValues.uid,
                        type:'Purchase',
                        invoice_date:data.dataValues.invoice_date,
                        status:1,
                        creation_date:new Date(),
                        updated_date: new Date(),
                        data:{
                            email:key
                        }
                    };
                    let encrypted = await encreptionVoucher(body);
                    await mainArray.push(encrypted)
                }
            }
        if(i===voucher.length-1){
            let voucherAdd = await VoucherInteries.bulkCreate(mainArray, {transaction:trans});
            if(voucherAdd){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}

exports.getSingleData = async function (id, data, res) {
    try {
        let createdata = await PurchaseVoucher.findOne({ where: 
            {
                uid:id
            },include:[
            {
                model:Company,
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
            },{
                model:Ledger,as:'PurchaseLedger',
                attributes: ['uid','name', 'opening_balance', 'amount', 'tax_key', 'sale_key', 'account_holder_name', 'bank_account_number', 'bank_branch', 'bank_name'],  
                include:[{
                    model:City,
                    attributes: ['name'],
                    include: [{
                        model:State,
                        attributes: ['name']
                    }]
                },{
                model:subAccountGroup,
                    attributes: ['uid','name'],  
                },{
                    model:AccountGroup,
                    attributes: ['uid','name'],
                }]
            },
            {
                model:ItemInteries,
                required: false,
                where: {
                    type: 'Purchase'
                }
            },
            {
                model:TaxInteries,
                required: false,
                where: {
                    type: 'Purchase'
                }
            },
            {
                model:VoucherInteries,
                required: false,
                where: {
                    type: 'Purchase'
                }
            }
         ]});
        if(createdata){
            let response = await decreptionPurchase(createdata, 'object', data.data.email);
            // response.dataValues.invoice_id = response.dataValues.invoice_id<=9?`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/00${response.dataValues.invoice_id}`:response.dataValues.invoice_id>9?`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/0${response.dataValues.invoice_id}`:`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/${response.dataValues.invoice_id}`;
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher fetch Successfully",
                PurchaseVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher not Found!",
                PurchaseVoucher:createdata?createdata:{}
            };
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

exports.getLastData = async function (data, res) {
    try {
        let createdata = await PurchaseVoucher.findOne({ where: 
            {
                 company_id:data.company_id,
                 current_year: data.current_year,
                 end_year: data.end_year
            }, order: [ [ 'invoice_date', 'DESC' ]]});
        if(createdata){
            let response = await decreptionPurchase(createdata, 'object', data.data.email);
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher fetch Successfully",
                PurchaseVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher not Found!",
                PurchaseVoucher:createdata?createdata:{}
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
        let createdata = await PurchaseVoucher.findAll({
            where: {
                    company_id: data.company_id,
                    current_year: data.current_year,
                    end_year: data.end_year,
            },include:[
                {
                    model:Company,
                    attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
                },
                {
                    model:Ledger,as:'PurchaseLedger',
                    attributes: ['name', 'uid', 'amount', 'opening_balance']
                }
             ],order: [['invoice_date', 'ASC']],
        });
        if(createdata.length>0){
            let response = await decreptionPurchase(createdata, 'array', data.data.email);
            // response = response.map(item=>{
            //     if(item.invoice_id){
            //         item.invoice_id = item.invoice_id<=9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/${item.invoice_id}`;
            //     }
            //     return item;
            // })
            // response = await arraySort(response, 'invoice_id')
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher fetch Successfully",
                PurchaseVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher not Found!",
                PurchaseVoucher:createdata?createdata:[]
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

exports.getAllDataPagination = async function (data, res) {
    try {
        let createdata = await PurchaseVoucher.findAndCountAll({
             limit: data.limit,
             offset: data.offset,
            where: {
                    company_id: data.company_id,
                    current_year: data.current_year,
                    end_year: data.end_year,
            },include:[
                {
                    model:Company,
                    attributes: ['company_name', 'uid', 'gst_number', 'terms', 'financial_year', 'cin_number', 'company_pan_number']
                },
                {
                    model:Ledger,as:'PurchaseLedger',
                    attributes: ['name', 'uid', 'amount', 'opening_balance']
                }
             ],order: [['invoice_date', 'ASC']],
             distinct:true
        });
        if(createdata.rows.length>0){
            console.log("createdata.rows", createdata.rows)
            let response = await decreptionPurchase(createdata.rows, 'array', data.data.email);
            // response = response.map(item=>{
            //     if(item.invoice_id){
            //         item.invoice_id = item.invoice_id<=9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/${item.invoice_id}`;
            //     }
            //     return item;
            // })
            // response = await arraySort(response, 'invoice_id')
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher fetch Successfully",
                PurchaseVoucher:response,
                Count:createdata.count
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"PurchaseVoucher not Found!",
                PurchaseVoucher:createdata.rows.length>0?createdata:[]
            };
        }
    } catch (e) {
        console.log(e)
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
        const result = await sequelize.transaction(async(t) => {
            // if(data.is_after){
            //    let count = await PurchaseVoucher.findOne({where:{[Op.and]: [ {uid:data.after_id}]}}, t);
            //    let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
            //    if(checkYear){
            //      data.invoice_id = await Number(count.dataValues.invoice_id)+1;
            //      let updateCount = await PurchaseVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }],invoice_id:{[Op.gte]:data.invoice_id}}}, t)
            //    }else{
            //      data.invoice_id = await 1;
            //    }
            //  }else if(data.is_before){
            //      let count = await PurchaseVoucher.findOne({where:{[Op.and]: [ {uid:data.after_id},{current_year: data.current_year },{end_year: data.end_year }]}}, t);
            //      let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
            //      if(checkYear){
            //          data.invoice_id = await Number(count.dataValues.invoice_id);
            //          let updateCount = await PurchaseVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }],invoice_id:{[Op.gte]:data.invoice_id}}}, t)
            //      }else{
            //          data.invoice_id = await 1;
            //      }
            //  }else{
            //      let count  = await PurchaseVoucher.count({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}});
            //      let checkYear = await PurchaseVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year }]}}, t)
            //      if(checkYear){
            //          data.invoice_id = Number(count)+1;
            //      }else{
            //          data.invoice_id = await 1;
            //      }
            //  }
             data.invoice_date = data.invoice_date;
             data.uid = await uniqid();
             data.status = 1;
             data.creation_date = new Date();
             data.updated_date = new Date();
             let itemData = data.itemAdd;
             let taxData = data.taxAdd;
             let voucherData = data.voucherAdd;
             delete data.itemAdd;
             delete data.taxAdd;
             delete data.voucherAdd;
           
             if(data.deleteItem && data.deleteItem.length>0){
                await ItemInteries.destroy({where:{uid: {[Op.in]: [data.deleteItem]}}});
                delete data.deleteItem;
             }

             if(await data.is_bank==='yes' || await data.is_bank==='Yes'){
                 let bankdata = await Ledger.findOne(
                     {where:{
                         [Op.and]: [ {is_default_bank:'true'}, {company_id: data.company_id }]
                         }
                     }
                 ,t);
                 if(bankdata){
                    bankdata.dataValues.data =await {
                        email:data.data.email
                    }
                    // let bank = await encreptionBank(bankdata.dataValues);
                    // data.bank_name =await bank.bank_name
                    // data.bank_account_number =await bank.bank_account_number
                    // data.bank_ifsc =await bank.ifsc
                     data.bank_name=await bankdata.dataValues.bank_name
                     data.bank_account_number =await bankdata.dataValues.bank_account_number
                     data.bank_ifsc =await bankdata.dataValues.ifsc
                 }
             }
             let companydata = await Company.findOne({where:{uid:data.company_id}},t);
             let createdata = await PurchaseVoucher.create(data, {transaction:t});
             entry.createData(data.company_id, Message.purchase_create);
             if(itemData.length>0){
                 let itemSuccess =await addItemInteries(itemData, createdata, data.data.email, companydata, t);
                 if(!itemSuccess){
                     await t.rollback();
                 }
             }
             if(taxData.length>0){
                 let taxSuccess = await addTaxInteries(taxData, createdata, data.data.email, t, companydata);
                 if(!taxSuccess){
                     await t.rollback();
                 }
             }
             if(voucherData.length>0){
                 let voucherSuccess =await addVoucherInteries(voucherData, createdata, data.data.email, t, companydata);
                 if(!voucherSuccess){
                     await t.rollback();
                 }
             }

             let response  = await decreptionPurchase(createdata, 'object', data.data.email);
 
             return response;
         });
         if(result){
             return {
                 statusCode:res.statusCode,
                 success: true,
                 message:"PurchaseVoucher Created Successfully",
                 PurchaseVoucher:result
             };
         }else{
             await transaction.rollback();
         }
    } catch (e) {
        console.log(e)
        return {
            statusCode:res.statusCode,
            success: false,
            error:e.message,
            message:"Something went wrong!"
        }
    }
}

exports.deleteData = async function (id, data, res) {
    try {
        let find =await PurchaseVoucher.findOne({where:{uid:id}});
        if(find){
            // let updateCount = await PurchaseVoucher.update({invoice_id : Sequelize.literal('invoice_id-1')}, {where:{[Op.and]: [{current_year: find.dataValues.current_year },{end_year: find.dataValues.end_year },{company_id:find.dataValues.company_id}],invoice_id:{[Op.gte]:find.dataValues.invoice_id}}})
            await ItemInteries.destroy({where:{voucher_id:id}});
            await TaxInteries.destroy({where:{voucher_id:id}});
            await VoucherInteries.destroy({where:{voucher_id:id}});
            let deletedata = await  PurchaseVoucher.destroy({ where: {uid:id}});
            if(deletedata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"PurchaseVoucher Delete Successfully",
                    PurchaseVoucher:deletedata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Voucher not delete please try later!",
                    PurchaseVoucher:{}
                };
            }
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Voucher not found!",
                PurchaseVoucher:{}
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

async function updateItemInteries(array, data, key, companydata, trans){
    let items = array;
    let mainArray = [];
    for(let i=0;i<items.length;i++){
      
        let nameobj = await encreption({
            name:data.dataValues.is_local=="yes"?"Purchase Local @ "+items[i].igst_tax+"%":"Purchase Interstate @ "+items[i].igst_tax+"%",
            data:{
                email:key
            }
        })
        let findtax = await Ledger.findOne({where:
                    {
                        [Op.and]: [{sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax},{name:nameobj.name}, {company_id: data.dataValues.company_id }]
                    }
            });
        if(findtax){
            let body ={
                uid: await uniqid(),
                voucher_id:data.dataValues.uid,
                item_id:items[i].item_id,
                quantity:items[i].quantity,
                ledger_id:findtax.dataValues.uid,
                company_id:data.dataValues.company_id,
                name:items[i].name,
                description:items[i].description?items[i].description:'',
                model:'',//items[i].model
                hsn_code:items[i].hsn_code?items[i].hsn_code:'',
                unit:items[i].unit?items[i].unit:'',
                price:items[i].price.toString(),
                discount:items[i].discount.toString(),
                discount_type:items[i].discount_type,
                total_amount:items[i].total_amount.toString(),
                igst_tax:items[i].igst_tax,
                type:items[i].type,
                invoice_date:data.dataValues.invoice_date,
                status:1,
                creation_date:new Date(),
                updated_date: new Date(),
                data:{
                    email:key
                }
            }
            console.log("body == ", body)
            let encypted = await encreptionItem(body)
            mainArray.push(encypted);
        }else{
            let body = await {
                uid: uniqid(),
                company_id:companydata.dataValues.uid,
                name:data.dataValues.is_local=="yes"?"Purchase Local @ "+items[i].igst_tax+"%":"Purchase Interstate @ "+items[i].igst_tax+"%",
                account_group_id:Constant.PurchaseAccounts,
                sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax,
                period_start:companydata.dataValues.current_period_start,
                period_end:companydata.dataValues.current_period_end,
                opening_balance:'debit',
                amount:'0',
                is_default_bank:"false",
                cess:false,
                is_auto:true,
                status:1,
                creation_date:new Date(),
                updated_date: new Date(),
                data:{
                    email:key
                }
            }
            let ledgerencrypted= await encreption(body);
            let createLedger =await Ledger.create(ledgerencrypted);
            if(createLedger){
                let body ={
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    item_id:items[i].item_id,
                    quantity:items[i].quantity,
                    ledger_id:createLedger.dataValues.uid,
                    company_id:data.dataValues.company_id,
                    name:items[i].name,
                    description:items[i].description?items[i].description:'',
                    model:'',//items[i].model
                    hsn_code:items[i].hsn_code?items[i].hsn_code:'',
                    unit:items[i].unit?items[i].unit:'',
                    price:items[i].price.toString(),
                    discount:items[i].discount.toString(),
                    discount_type:items[i].discount_type,
                    total_amount:items[i].total_amount.toString(),
                    igst_tax:items[i].igst_tax,
                    type:items[i].type,
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let encypted = await encreptionItem(body)
                mainArray.push(encypted);
            }
        }
        
        if(i===items.length-1){
            let itemInteries = await ItemInteries.bulkCreate(mainArray, {transaction:trans});
            if(itemInteries){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}

async function updateTaxInteries(array, data, key, trans, companydata){
    let taxs = array;
    let mainArray = [];
    for(let i=0;i<taxs.length;i++){
            let findtax = await Ledger.findOne({where:{
                  [Op.and]: [{tax_key:taxs[i].tax_percentage+'-'+taxs[i].tax_name},
                     {company_id: data.company_id }]
                }});
            if(findtax){
                let body = await {
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    tax_ledger_id:findtax.dataValues.uid,
                    amount:taxs[i].tax_amount,
                    type:taxs[i].type,
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let taxencyption = await encreptionTax(body);
               await mainArray.push(taxencyption); 
            }else{
                let body = await {uid:await uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:"tax-"+taxs[i].tax_percentage+'-'+taxs[i].tax_name,
                    account_group_id:Constant.tax_account_id,
                    tax_key:taxs[i].tax_percentage+'-'+taxs[i].tax_name,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'debit',
                    amount:'0',
                    is_default_bank:"false",
                    cess:false,
                    status:1,
                    is_auto:true,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let leadgerEn = await encreption(body)
                let createLedger =await Ledger.create(leadgerEn);
                if(createLedger){
                    let body = await {
                        uid: await uniqid(),
                        voucher_id:data.dataValues.uid,
                        tax_ledger_id:createLedger.dataValues.uid,
                        amount:taxs[i].tax_amount,
                        type:taxs[i].type,
                        invoice_date:data.dataValues.invoice_date,
                        status:1,
                        creation_date:new Date(),
                        updated_date: new Date(),
                        data:{
                            email:key
                        }
                    }
                    let taxencyption = await encreptionTax(body);
                    await mainArray.push(taxencyption)
                }
            }
        if(i===taxs.length-1){
            let taxAdd = await TaxInteries.bulkCreate(mainArray, {transaction:trans});
            if(taxAdd){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}

async function updateVoucherInteries(array, data, key, trans, companydata){
    let voucher = array;
    let mainArray = [];
    for(let i=0;i<voucher.length;i++){
            let nameobj = await encreption({
                name:voucher[i].sale_type==="local"?"Purchase Local @ "+voucher[i].percentage+"%":"Purchase Interstate @ "+voucher[i].sale_percentage+"%",
                data:{
                    email:key
                }
            })
            let findtax = await Ledger.findOne({where:
                        {
                            [Op.and]: [ {sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage},{name:nameobj.name},
                            {company_id: data.company_id }]
                        }
                });
            if(findtax){
                let body = await {
                    uid: uniqid(),
                    voucher_id:data.dataValues.uid,
                    ledger_id:findtax.dataValues.uid,
                    amount:voucher[i].amount,
                    type:voucher[i].type,
                    invoice_date:data.dataValues.invoice_date,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                };
                let encrypted = await encreptionVoucher(body);
                await mainArray.push(encrypted); 
            }else{
                let body = await {uid: uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:voucher[i].sale_type==="local"?"Purchase Local @ "+voucher[i].percentage+"%":"Purchase Interstate @ "+voucher[i].sale_percentage+"%",
                    account_group_id:Constant.PurchaseAccounts,
                    sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'debit',
                    amount:'0',
                    is_default_bank:"false",
                    is_auto:true,
                    cess:false,
                    status:1,
                    creation_date:new Date(),
                    updated_date: new Date(),
                    data:{
                        email:key
                    }
                }
                let ledgerencrypted= await encreption(body);
                let createLedger =await Ledger.create(ledgerencrypted);
                if(createLedger){
                    let body = await {
                        uid: uniqid(),
                        voucher_id:data.dataValues.uid,
                        amount:voucher[i].amount,
                        ledger_id:data.dataValues.uid,
                        type:voucher[i].type,
                        invoice_date:data.dataValues.invoice_date,
                        status:1,
                        creation_date:new Date(),
                        updated_date: new Date(),
                        data:{
                            email:key
                        }
                    };
                    let encrypted = await encreptionVoucher(body);
                    await mainArray.push(encrypted)
                }
            }
        if(i===voucher.length-1){
            let voucherAdd = await VoucherInteries.bulkCreate(mainArray, {transaction:trans});
            if(voucherAdd){
                return 'true';
            }else{
                return 'false';
            }
        }
    }
}

exports.updateData = async function (id, data, res) {
    try {
        const result = await sequelize.transaction(async(t) => {
             data.updated_date = new Date();
             let itemData = data.itemAdd;
             let taxData = data.taxAdd;
             let voucherData = data.voucherAdd;
            // if(data.deleteItem.length>0){
            //     await ItemInteries.destroy({where:{uid: {[Op.in]: [data.deleteItem]}}});
            // }
             delete data.itemAdd;
             delete data.taxAdd;
             delete data.voucherAdd;
             delete data.deleteItem;
             if(await data.is_bank==='yes' || await data.is_bank==='Yes'){
                 let bankdata = await Ledger.findOne(
                     {where:{
                         [Op.and]: [ {is_default_bank:'true'},
                              {company_id: data.company_id }]
                         }
                     }
                 ,t);
                 if(bankdata){
                    bankdata.dataValues.data =await {
                        email:data.data.email
                    }
                    // let bank = await encreptionBank(bankdata.dataValues);
                    // data.bank_name =await bank.bank_name
                    // data.bank_account_number =await bank.bank_account_number
                    // data.bank_ifsc =await bank.ifsc
                    data.bank_name=await bankdata.dataValues.bank_name
                     data.bank_account_number =await bankdata.dataValues.bank_account_number
                     data.bank_ifsc =await bankdata.dataValues.ifsc
                  }
             }
             let companydata = await Company.findOne({where:{uid:data.company_id}},t);
             let updatedata = await PurchaseVoucher.findOne({where:{uid:data.uid}},t);
             if(updatedata){
                // delete data.invoice_id;
                await updatedata.update(data);
                await entry.createData(data.company_id, Message.purchase_update);
                if(itemData.length>0){
                    await ItemInteries.destroy({where:{voucher_id:data.uid}});
                    let itemSuccess =await updateItemInteries(itemData, updatedata,data.data.email, companydata, t);
                    if(!itemSuccess){
                        await t.rollback();
                    }
                }
                if(taxData.length>0){
                    await TaxInteries.destroy({where:{voucher_id:data.uid}});
                    let taxSuccess = await updateTaxInteries(taxData, updatedata,data.data.email, t, companydata);
                    if(!taxSuccess){
                        await t.rollback();
                    }
                }
                if(voucherData.length>0){
                    await VoucherInteries.destroy({where:{voucher_id:data.uid}});
                    let voucherSuccess =await updateVoucherInteries(voucherData, updatedata,data.data.email, t, companydata);
                    console.log(voucherSuccess, "itemSuccess = == = = ")
                    if(!voucherSuccess){
                        await t.rollback();
                    }
                }
             }else{
                await t.rollback();
             }
             let response  = await decreptionPurchase(updatedata, 'object', data.data.email);

             return response;
         });
         if(result){
             return {
                 statusCode:res.statusCode,
                 success: true,
                 message:"PurchaseVoucher Created Successfully",
                 PurchaseVoucher:result
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

exports.cancelData = async function (id, data, res) {
    try {
        const result = await sequelize.transaction(async(t) => {
             data.updated_date = new Date();
             data.status = 0;
             data.buyer_ledger_id = '';
             data.narration = '';
             data.is_local = '';
             data.bank_name = '';
             data.bank_account_number = '';
             data.bank_ifsc = '';
             data.is_bank = '';
             data.shipping_address = '';
             data.description = '';
             data.discount_type = '';
             data.discount_ledger = '';
             data.discount_percentage = '';
             data.sub_amount = '0';
             data.discount = '0';
             data.total_amount = '0';
             data.roundoff_ledger_id = '';
             data.roundoff_value = '0';

             data = await encreptionPurchase(data, data.data.email)
             let updatedata = await PurchaseVoucher.findOne({where:{uid:data.uid}},t);
             if(updatedata){
               delete data.invoice_id;
                await updatedata.update(data);
                await ItemInteries.destroy({where:{voucher_id:data.uid}});
                await TaxInteries.destroy({where:{voucher_id:data.uid}});
                await VoucherInteries.destroy({where:{voucher_id:data.uid}});
             }else{
                await t.rollback();
             }
             let response  = await decreptionPurchase(updatedata, 'object', data.data.email);
             return response;
         });
         if(result){
             return {
                 statusCode:res.statusCode,
                 success: true,
                 message:"PurchaseVoucher Cancel Successfully",
                 PurchaseVoucher:result
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