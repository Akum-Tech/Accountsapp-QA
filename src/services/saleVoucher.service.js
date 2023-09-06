import SaleVoucher from '../models/saleVoucher';
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

import { encreptionSale, decreptionSale } from "../security/salesvoucher";
import { encreptionBank } from "../security/bank";
import { decreption, encreption } from "../security/ledger";
import { encreptionItem } from "../security/itemEntries";
import { encreptionTax } from "../security/taxEntries";
import { encreptionVoucher } from "../security/voucherEntries";
import arraySort from 'array-sort';
import "@babel/polyfill"

async function addItemInteries(array, data, key, companydata, trans){
    let items = array;
    let mainArray = [];
    for(let i=0;i<items.length;i++){
        let nameobj = await encreption({
            name:data.dataValues.is_local=="yes"?"Sale Local @ "+items[i].igst_tax+'%':"Sale Interstate @ "+items[i].igst_tax+'%',
            data:{
                email:key
            }
        })
        let findtax = await Ledger.findOne({where:
                    {
                        [Op.and]: [{sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax}, {name:nameobj.name}, {company_id: data.company_id }]
                    }
            });
        if(findtax){
            let body ={
                uid: await uniqid(),
                voucher_id:data.dataValues.uid,
                item_id:items[i].item_id,
                quantity:items[i].quantity,
                ledger_id:findtax.dataValues.uid,
                company_id:data.company_id,
                name:items[i].name,
                description:items[i].description,
                model:'',//items[i].model
                hsn_code:items[i].hsn_code,
                unit:items[i].unit,
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
                name:data.dataValues.is_local=="yes"?"Sale Local @ "+items[i].igst_tax+"%":"Sale Interstate @ "+items[i].igst_tax+"%",
                account_group_id:Constant.sale_account_id,
                sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax,
                period_start:companydata.dataValues.current_period_start,
                period_end:companydata.dataValues.current_period_end,
                opening_balance:'credit',
                is_auto:true,
                amount:'0',
                is_default_bank:"false",
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
                let body ={
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    item_id:items[i].item_id,
                    quantity:items[i].quantity,
                    ledger_id:createLedger.dataValues.uid,
                    company_id:data.dataValues.company_id,
                    name:items[i].name,
                    description:items[i].description,
                    model:'',//items[i].model
                    hsn_code:items[i].hsn_code,
                    unit:items[i].unit,
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
                    opening_balance:'credit',
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
                name:voucher[i].sale_type==="local"?"Sale Local @ "+voucher[i].percentage+"%":"Sale Interstate @ "+voucher[i].sale_percentage+"%",
                data:{
                    email:key
                }
            })
            let findtax = await Ledger.findOne({where:
                        {
                            [Op.and]: [ {name:nameobj.name}, {company_id: data.company_id }]
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
                let body = await {
                    uid: uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:voucher[i].sale_type==="local"?"Sale Local @ "+voucher[i].percentage+"%":"Sale Interstate @ "+voucher[i].sale_percentage+"%",
                    account_group_id:Constant.sale_account_id,
                    sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'credit',
                    is_auto:true,
                    amount:'0',
                    is_default_bank:"false",
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
                        ledger_id:createLedger.dataValues.uid,
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

exports.getSingleData = async function (id, data, res) {
    try {
        let createdata = await SaleVoucher.findOne({ where: 
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
                model:Ledger,as:'SalesLedger',
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
                    type: 'Sales'
                }
            },
            {
                model:TaxInteries,
                required: false,
                where: {
                    type: 'Sales'
                },
                include:[{
                    model:Ledger,
                    attributes: ['uid','name', 'opening_balance', 'amount', 'tax_key', 'sale_key', 'account_holder_name', 'bank_account_number', 'bank_branch', 'bank_name'],  
                }]
            },
            {
                model:VoucherInteries,
                required: false,
                where: {
                    type: 'Sales'
                }
            }
         ]});
        if(createdata){
            let response = await decreptionSale(createdata, 'object', data.data.email);

            response.dataValues.invoice_id = response.dataValues.invoice_id<=9?`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/00${response.dataValues.invoice_id}`:response.dataValues.invoice_id>9?`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/0${response.dataValues.invoice_id}`:`${response.dataValues.current_year.toString().substr(-2)+`-`+response.dataValues.end_year.toString().substr(-2)}/${response.dataValues.invoice_id}`;
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher fetch Successfully",
                SaleVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher not Found!",
                SaleVoucher:createdata?createdata:{}
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

exports.getLastData = async function (data, res) {
    try {
        let createdata = await SaleVoucher.findOne({ where: 
            {
                 company_id:data.company_id,
                 current_year: data.current_year,
                 end_year: data.end_year
            }, order: [ [ 'invoice_date', 'DESC' ]]});
        if(createdata){
            let response = await decreptionSale(createdata, 'object', data.data.email);
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher fetch Successfully",
                SaleVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher not Found!",
                SaleVoucher:createdata?createdata:{}
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
        let createdata = await SaleVoucher.findAll({
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
                    model:Ledger,as:'SalesLedger',
                    attributes: ['name', 'uid', 'amount', 'opening_balance']
                }
             ],order: [['invoice_date', 'ASC']],
        });
        if(createdata.length>0){
            let response = await decreptionSale(createdata, 'array', data.data.email);
            response = response.map(item=>{
                if(item.invoice_id){
                    item.invoice_id = item.invoice_id<=9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/${item.invoice_id}`;
                }
                return item;
            })
            response = await arraySort(response, 'invoice_id')
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher fetch Successfully",
                SaleVoucher:response
            };
        }else{
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher not Found!",
                SaleVoucher:createdata?createdata:[]
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
        let createdata = await SaleVoucher.findAndCountAll({
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
                    model:Ledger,as:'SalesLedger',
                    attributes: ['name', 'uid', 'amount', 'opening_balance']
                }
             ],order: [['invoice_date', 'ASC']],
             distinct:true
        });
        if(createdata.rows.length>0){

            let response = await decreptionSale(createdata.rows, 'array', data.data.email);
            response = response.map(item=>{
                if(item.invoice_id){
                    item.invoice_id = item.invoice_id<=9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/00${item.invoice_id}`:item.invoice_id>9?`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/0${item.invoice_id}`:`${data.current_year.toString().substr(-2)+`-`+data.end_year.toString().substr(-2)}/${item.invoice_id}`;
                }
                return item;
            })
           // response['count']=createdata.rows.length;
            response = await arraySort(response, 'invoice_id')
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher fetch Successfully",
                SaleVoucher:response,
                Count:createdata.count
  
            };
        }else{

            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher not Found!",
                SaleVoucher:createdata.rows.length>0?createdata:[]
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
     
        const result = await sequelize.transaction(async(t) => {
           if(data.is_after){
              let count = await SaleVoucher.findOne({where:{[Op.and]: [ {uid:data.after_id},{company_id:data.company_id}]}}, t);
              let checkYear = await SaleVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}}, t)
              if(checkYear){
                data.invoice_id = await Number(count.dataValues.invoice_id)+1;
                let updateCount = await SaleVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}],invoice_id:{[Op.gte]:data.invoice_id}}}, t)
              }else{
                data.invoice_id = await 1;
              }
            }else if(data.is_before){
                let count = await SaleVoucher.findOne({where:{[Op.and]: [ {invoice_date:{[Op.lte]:data.invoice_date}},{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                let checkYear = await SaleVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}}, t)
                if(checkYear){
                    console.log("count", count);
                    let finddate = await SaleVoucher.findOne({where:{[Op.and]: [{invoice_date:data.invoice_date},{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                    console.log("finddate", finddate, data.invoice_id)
                    if(finddate){
                        data.invoice_id = await Number(finddate.dataValues.invoice_id)+1; 
                        let updateCount = await SaleVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id},{invoice_id:{[Op.gte]:data.invoice_id}}]}, order: [ [ 'invoice_id', 'DESC' ]]}, t);
                    }else{
                        if(count){
                            data.invoice_id = await Number(count.dataValues.invoice_id)+1;
                        }else{
                            data.invoice_id = await 1;
                        }
                        
                        let updateCount = await SaleVoucher.update({invoice_id : Sequelize.literal('invoice_id+1')}, {where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id},{invoice_date:{[Op.gte]:data.invoice_date}}]}}, t)
                    }
                }else{
                    data.invoice_id = await 1;
                }
            }else{
                let count  = await SaleVoucher.count({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}});
                let checkYear = await SaleVoucher.findOne({where:{[Op.and]: [{current_year: data.current_year },{end_year: data.end_year },{company_id:data.company_id}]}}, t)
                if(checkYear){
                    data.invoice_id = Number(count)+1;
                }else{
                    data.invoice_id = await 1;
                }
            }

            data.invoice_date = new Date(data.invoice_date);
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
                        [Op.and]: [ {is_default_bank:'true'},
                             {company_id: data.company_id }]
                        }
                    }
                ,t);
                if(bankdata){
                    bankdata.dataValues.data =await {
                        email:data.data.email
                    }
                     data.bank_name=await bankdata.dataValues.bank_name
                     data.bank_account_number =await bankdata.dataValues.bank_account_number
                     data.bank_ifsc =await bankdata.dataValues.ifsc
                 }
                 
            }


            let companydata = await Company.findOne({where:{uid:data.company_id}},t);

            let createdata = await SaleVoucher.create(data, {transaction:t});
            entry.createData(data.company_id, Message.sale_create);

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
            let response  = await decreptionSale(createdata, 'object', data.data.email);

            return response;
        });
        if(result){
            return {
                statusCode:res.statusCode,
                success: true,
                message:"SaleVoucher Created Successfully",
                SaleVoucher:result
            };
        }else{
            await transaction.rollback();
        }
    } catch (e) {
        console.log("e", e)
        // await transaction.rollback();
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

        let find =await SaleVoucher.findOne({where:{uid:id}});
        if(find){
           
            let updateCount = await SaleVoucher.update({invoice_id : Sequelize.literal('invoice_id-1')}, {where:{[Op.and]: [{current_year: find.dataValues.current_year },{end_year: find.dataValues.end_year },{company_id:find.dataValues.company_id}],invoice_id:{[Op.gte]:Number(find.dataValues.invoice_id)}}})
            
            await ItemInteries.destroy({where:{voucher_id:id}});
            await TaxInteries.destroy({where:{voucher_id:id}});
            await VoucherInteries.destroy({where:{voucher_id:id}});
            let deletedata = await  SaleVoucher.destroy({ where: {uid:id}});
            if(deletedata){
                return {
                    statusCode:res.statusCode,
                    success: true,
                    message:"SaleVoucher Delete Successfully",
                    SaleVoucher:deletedata
                };
            }else{
                return {
                    statusCode:res.statusCode,
                    success: false,
                    message:"Voucher not delete please try later!",
                    SaleVoucher:deletedata
                };
            }
        }else{
            return {
                statusCode:res.statusCode,
                success: false,
                message:"Voucher not found!",
                SaleVoucher:{}
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
            name:data.dataValues.is_local=="yes"?"Sale Local @ "+items[i].igst_tax+"%":"Sale Interstate @ "+items[i].igst_tax+"%",
            data:{
                email:key
            }
        })
        let findtax = await Ledger.findOne({where:
                    {
                        [Op.and]: [{sale_key:data.dataValues.is_local=="yes"?items[i].igst_tax:items[i].igst_tax},{name:nameobj.name}, {company_id: data.company_id }]
                    }
            });
        if(findtax){
            let body =await {
                uid: await uniqid(),
                voucher_id:data.dataValues.uid,
                item_id:items[i].item_id,
                quantity:items[i].quantity,
                ledger_id:findtax.dataValues.uid,
                company_id:data.company_id,
                name:items[i].name,
                description:items[i].description,
                model:'',//items[i].model
                hsn_code:items[i].hsn_code,
                unit:items[i].unit,
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
                name:data.dataValues.is_local=="yes"?"Sale Local @ "+items[i].igst_tax+"%":"Sale Interstate @ "+items[i].igst_tax+"%",
                account_group_id:Constant.sale_account_id,
                sale_key:data.dataValues.is_local==="yes"?items[i].igst_tax:items[i].igst_tax,
                period_start:companydata.dataValues.current_period_start,
                period_end:companydata.dataValues.current_period_end,
                opening_balance:'credit',
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
                let body ={
                    uid: await uniqid(),
                    voucher_id:data.dataValues.uid,
                    item_id:items[i].item_id,
                    quantity:items[i].quantity,
                    ledger_id:createLedger.dataValues.uid,
                    company_id:data.company_id,
                    name:items[i].name,
                    description:items[i].description,
                    model:'',//items[i].model
                    hsn_code:items[i].hsn_code,
                    unit:items[i].unit,
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
                    opening_balance:'credit',
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
                return true;
            }else{
                return false;
            }
        }
    }
}

async function updateVoucherInteries(array, data, key, trans, companydata){
    let voucher = array;
    let mainArray = [];
    for(let i=0;i<voucher.length;i++){
            let nameobj = await encreption({
                name:voucher[i].sale_type==="local"?"Sale Local @ "+voucher[i].percentage+"%":"Sale Interstate @ "+voucher[i].sale_percentage+"%",
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
                    uid: await uniqid(),
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
                let body = await {
                    uid:await uniqid(),
                    company_id:companydata.dataValues.uid,
                    name:voucher[i].sale_type==="local"?"Sale Local @ "+voucher[i].percentage+"%":"Sale Interstate @ "+voucher[i].sale_percentage+"%",
                    account_group_id:Constant.sale_account_id,
                    sale_key:voucher[i].sale_type==="local"?voucher[i].percentage:voucher[i].sale_percentage,
                    period_start:companydata.dataValues.current_period_start,
                    period_end:companydata.dataValues.current_period_end,
                    opening_balance:'credit',
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
                    let body = await {
                        uid:await uniqid(),
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
                    data.bank_name=await bankdata.dataValues.bank_name
                    data.bank_account_number =await bankdata.dataValues.bank_account_number
                    data.bank_ifsc =await bankdata.dataValues.ifsc
                }
             }
             let companydata = await Company.findOne({where:{uid:data.company_id}},t);
             let updatedata = await SaleVoucher.findOne({where:{uid:data.uid}},t);
             if(updatedata){
               delete data.invoice_id;
                await updatedata.update(data);
                await entry.createData(data.company_id, Message.sale_update);
                if(itemData.length>0){
                    await ItemInteries.destroy({where:{voucher_id:data.uid}});
                    let itemSuccess =await updateItemInteries(itemData, updatedata, data.data.email, companydata, t);
                    if(!itemSuccess){
                        await t.rollback();
                    }
                }
                if(taxData.length>0){
                    await TaxInteries.destroy({where:{voucher_id:data.uid}});
                    let taxSuccess = await updateTaxInteries(taxData, updatedata, data.data.email, t, companydata);
                    if(!taxSuccess){
                        await t.rollback();
                    }
                }
                if(voucherData.length>0){
                    await VoucherInteries.destroy({where:{voucher_id:data.uid}});
                    let voucherSuccess =await updateVoucherInteries(voucherData, updatedata, data.data.email, t, companydata);
                    if(!voucherSuccess){
                        await t.rollback();
                    }
                }
             }else{
                await t.rollback();
             }
             let response  = await decreptionSale(updatedata, 'object', data.data.email);

             return response;
         });
         if(result){
             return {
                 statusCode:res.statusCode,
                 success: true,
                 message:"SaleVoucher Created Successfully",
                 SaleVoucher:result
             };
         }else{
             await transaction.rollback();
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

             data = await encreptionSale(data, data.data.email)
             let updatedata = await SaleVoucher.findOne({where:{uid:data.uid}},t);
             if(updatedata){
               delete data.invoice_id;
                await updatedata.update(data);
                await ItemInteries.destroy({where:{voucher_id:data.uid}});
                await TaxInteries.destroy({where:{voucher_id:data.uid}});
                await VoucherInteries.destroy({where:{voucher_id:data.uid}});
             }else{
                await t.rollback();
             }
             let response  = await decreptionSale(updatedata, 'object', data.data.email);
             return response;
         });
         if(result){
             return {
                 statusCode:res.statusCode,
                 success: true,
                 message:"SaleVoucher Cancel Successfully",
                 SaleVoucher:result
             };
         }else{
             await transaction.rollback();
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

