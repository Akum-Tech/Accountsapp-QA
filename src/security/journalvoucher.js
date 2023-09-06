import { join } from 'path';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionJournal = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.narration =await data.narration && data.narration!==''? encrypt(data.narration).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount.toString()).toString():'';
    return data;
};

export const decreptionJournal = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{


        if(item.company){
            item.company.company_name = item.company.company_name && item.company.company_name!==''?decrypt(item.company.company_name):'';
            item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number!==''?decrypt(item.company.company_pan_number):'';
            item.company.gst_number = item.company.gst_number && item.company.gst_number!==''?decrypt(item.company.gst_number):'';
            item.company.street = item.company.street && item.company.street!==''?decrypt(item.company.street):'';
            item.company.area = item.company.area && item.company.area!==''?decrypt(item.company.area):'';
            item.company.company_logo = item.company.company_logo && item.company.company_logo!==''?decrypt(item.company.company_logo):'';
        }

        if(item.Ledger){
          item.Ledger.name = item.Ledger.name && item.Ledger.name!==''? decrypt(item.Ledger.name):'';
          item.Ledger.email = item.Ledger.email && item.Ledger.email!==''? decrypt(item.Ledger.email):'';
          item.Ledger.amount = item.Ledger.amount && item.Ledger.amount!==''? decrypt(item.Ledger.amount):'';
          item.Ledger.phone = item.Ledger.phone && item.Ledger.phone!==''? decrypt(item.Ledger.phone):'';
          item.Ledger.street =  item.Ledger.street && item.Ledger.street!==''?decrypt(item.Ledger.street):'';
          item.Ledger.area = item.Ledger.area && item.Ledger.area!==''? decrypt(item.Ledger.area):'';
          item.Ledger.gst_number =  item.Ledger.gst_number && item.Ledger.gst_number!==''? decrypt(item.Ledger.gst_number):'';
          item.Ledger.opening_balance =  item.Ledger.opening_balance && item.Ledger.opening_balance!==''? decrypt(item.Ledger.opening_balance):'';
          item.Ledger.cess_tax =  item.Ledger.cess_tax && item.Ledger.cess_tax!==''? decrypt(item.Ledger.cess_tax):'';
          item.Ledger.bank_name =  item.Ledger.bank_name && item.Ledger.bank_name!==''? decrypt(item.Ledger.bank_name):'';
          item.Ledger.bank_branch =  item.Ledger.bank_branch && item.Ledger.bank_branch!==''? decrypt(item.Ledger.bank_branch):'';
          item.Ledger.account_holder_name =  item.Ledger.account_holder_name && item.Ledger.account_holder_name!==''? decrypt(item.Ledger.account_holder_name):'';
          item.Ledger.ifsc =  item.Ledger.ifsc && item.Ledger.ifsc!==''? decrypt(item.Ledger.ifsc):'';
          item.Ledger.pan_number =  item.Ledger.pan_number && item.Ledger.pan_number!==''? decrypt(item.Ledger.pan_number):'';
          item.Ledger.bank_account_number =  item.Ledger.bank_account_number && item.Ledger.bank_account_number!==''? decrypt(item.Ledger.bank_account_number):'';

          item.Ledger.website =  item.Ledger.website && item.Ledger.website!==''? decrypt(item.Ledger.website):'';
          item.Ledger.jurisdiction = item.Ledger.jurisdiction && item.Ledger.jurisdiction!==''? decrypt(item.Ledger.jurisdiction):'';
          item.Ledger.cin_number = item.Ledger.cin_number && item.Ledger.cin_number!==''? decrypt(item.Ledger.cin_number):'';
        }


        if(item.journal_entries && item.journal_entries.length>0){
          item.journal_entries.map(jl=>{
            jl.amount = jl.amount && jl.amount!==''?decrypt(jl.amount):'';
            if(jl.VoucherLedger){
               jl.VoucherLedger.name = jl.VoucherLedger.name && jl.VoucherLedger.name!==''?decrypt(jl.VoucherLedger.name):'';
               jl.VoucherLedger.amount = jl.VoucherLedger.amount && jl.VoucherLedger.amount!==''?decrypt(jl.VoucherLedger.amount):'';
               jl.VoucherLedger.opening_balance = jl.VoucherLedger.opening_balance && jl.VoucherLedger.opening_balance!==''?decrypt(jl.VoucherLedger.opening_balance):'';
               jl.VoucherLedger.account_holder_name = jl.VoucherLedger.account_holder_name && jl.VoucherLedger.account_holder_name!==''?decrypt(jl.VoucherLedger.account_holder_name):'';
               jl.VoucherLedger.bank_account_number = jl.VoucherLedger.bank_account_number && jl.VoucherLedger.bank_account_number!==''?decrypt(jl.VoucherLedger.bank_account_number):'';
               jl.VoucherLedger.bank_branch = jl.VoucherLedger.bank_branch && jl.VoucherLedger.bank_branch!==''?decrypt(jl.VoucherLedger.bank_branch):'';
               jl.VoucherLedger.bank_name = jl.VoucherLedger.bank_name && jl.VoucherLedger.bank_name!==''?decrypt(jl.VoucherLedger.bank_name):'';

               jl.VoucherLedger.website =  jl.VoucherLedger.website && jl.VoucherLedger.website!==''? decrypt(jl.VoucherLedger.website):'';
               jl.VoucherLedger.jurisdiction = jl.VoucherLedger.jurisdiction && jl.VoucherLedger.jurisdiction!==''? decrypt(jl.VoucherLedger.jurisdiction):'';
               jl.VoucherLedger.cin_number = jl.VoucherLedger.cin_number && jl.VoucherLedger.cin_number!==''? decrypt(jl.VoucherLedger.cin_number):'';
            }
          })
        }

     


        if(item.item_stock_voucher_entries && item.item_stock_voucher_entries.length>0){
          item.item_stock_voucher_entries.map(jl=>{

            jl.price = jl.price && jl.price!==''?decrypt(jl.price):'';
            jl.name = jl.name && jl.name!==''? decrypt(jl.name):'';
            jl.hsn_code = jl.hsn_code && jl.hsn_code!==''? decrypt(jl.hsn_code):'';
            jl.rate = jl.rate && jl.rate!==''? decrypt(jl.rate):'';
            jl.quantity = jl.quantity && jl.quantity!==''? decrypt(jl.quantity):'';
            jl.total_value =  jl.total_value && jl.total_value!==''?decrypt(jl.total_value):'';
            jl.cess_tax =  jl.cess_tax && jl.cess_tax!==''?decrypt(jl.cess_tax):'';
          })
        }



        item.narration = item.narration && item.narration!==''? decrypt(item.narration):'';
        item.bank_name = item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_account_number = item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.bank_ifsc = item.bank_ifsc && item.bank_ifsc!==''? decrypt(item.bank_ifsc):'';
        item.shipping_address =  item.shipping_address && item.shipping_address!==''?decrypt(item.shipping_address):'';
        item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.sub_amount =  item.sub_amount && item.sub_amount!==''? decrypt(item.sub_amount):'';
        item.discount =  item.discount && item.discount!==''? decrypt(item.discount):'';
        item.total_amount =  item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';



        if(item.item_stock_voucher_entries && item.item_stock_voucher_entries.length>0){
          item.item_stock_voucher_entries.map(ele=>{
            ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
            ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
            ele.description = ele.description && ele.description!==''? decrypt(ele.description):'';
            ele.model = ele.model && ele.model!==''? decrypt(ele.model):'';
            ele.hsn_code =  ele.hsn_code && ele.hsn_code!==''?decrypt(ele.hsn_code):'';
            ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.total_value =ele.total_value && ele.total_value!==''? decrypt(ele.total_value):'';
            ele.total_amount =  ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.rate =  ele.rate && ele.rate!==''? decrypt(ele.rate):'';
          })
        }


    });
    return data;
  }else if(type==="object"){
    if( data.dataValues.company){
        data.dataValues.company.company_name =  data.dataValues.company.company_name &&  data.dataValues.company.company_name!==''?decrypt( data.dataValues.company.company_name):'';
        data.dataValues.company.company_pan_number =  data.dataValues.company.company_pan_number &&  data.dataValues.company.company_pan_number!==''?decrypt( data.dataValues.company.company_pan_number):'';
        data.dataValues.company.gst_number =  data.dataValues.company.gst_number &&  data.dataValues.company.gst_number!==''?decrypt( data.dataValues.company.gst_number):'';
        data.dataValues.company.street =  data.dataValues.company.street &&  data.dataValues.company.street!==''?decrypt( data.dataValues.company.street):'';
        data.dataValues.company.area =  data.dataValues.company.area &&  data.dataValues.company.area!==''?decrypt( data.dataValues.company.area):'';
        data.dataValues.company.company_logo =  data.dataValues.company.company_logo &&  data.dataValues.company.company_logo!==''?decrypt( data.dataValues.company.company_logo):'';
    }
      if( data.dataValues.Ledger){
        data.dataValues.Ledger.name =  data.dataValues.Ledger.name &&  data.dataValues.Ledger.name!==''?decrypt( data.dataValues.Ledger.name):'';
        data.dataValues.Ledger.opening_balance =  data.dataValues.Ledger.opening_balance &&  data.dataValues.Ledger.opening_balance!==''?decrypt( data.dataValues.Ledger.opening_balance):'';
        data.dataValues.Ledger.amount =  data.dataValues.Ledger.amount &&  data.dataValues.Ledger.amount!==''?decrypt( data.dataValues.Ledger.amount):'';
    }
    if(data.dataValues.item_stock_voucher_entries && data.dataValues.item_stock_voucher_entries.length>0){
      data.dataValues.item_stock_voucher_entries.map(ele=>{
        // jl.amount = jl.amount && jl.amount!==''?decrypt(jl.amount):'';
        // if(jl.VoucherLedger){
            ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
            ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
            ele.description = ele.description && ele.description!==''? decrypt(ele.description):'';
            ele.model = ele.model && ele.model!==''? decrypt(ele.model):'';
            ele.hsn_code =  ele.hsn_code && ele.hsn_code!==''?decrypt(ele.hsn_code):'';
            ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.total_value =ele.total_value && ele.total_value!==''? decrypt(ele.total_value):'';
            ele.total_amount =  ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.rate =  ele.rate && ele.rate!==''? decrypt(ele.rate):'';
       // }
      })
    }
    
    if(data.dataValues.journal_entries && data.dataValues.journal_entries.length>0){
      data.dataValues.journal_entries.map(jl=>{
        jl.amount = jl.amount && jl.amount!==''?decrypt(jl.amount):'';
        if(jl.VoucherLedger){
           jl.VoucherLedger.name = jl.VoucherLedger.name && jl.VoucherLedger.name!==''?decrypt(jl.VoucherLedger.name):'';
           jl.VoucherLedger.amount = jl.VoucherLedger.amount && jl.VoucherLedger.amount!==''?decrypt(jl.VoucherLedger.amount):'';
           jl.VoucherLedger.opening_balance = jl.VoucherLedger.opening_balance && jl.VoucherLedger.opening_balance!==''?decrypt(jl.VoucherLedger.opening_balance):'';
           jl.VoucherLedger.account_holder_name = jl.VoucherLedger.account_holder_name && jl.VoucherLedger.account_holder_name!==''?decrypt(jl.VoucherLedger.account_holder_name):'';
           jl.VoucherLedger.bank_account_number = jl.VoucherLedger.bank_account_number && jl.VoucherLedger.bank_account_number!==''?decrypt(jl.VoucherLedger.bank_account_number):'';
           jl.VoucherLedger.bank_branch = jl.VoucherLedger.bank_branch && jl.VoucherLedger.bank_branch!==''?decrypt(jl.VoucherLedger.bank_branch):'';
           jl.VoucherLedger.bank_name = jl.VoucherLedger.bank_name && jl.VoucherLedger.bank_name!==''?decrypt(jl.VoucherLedger.bank_name):'';
           jl.VoucherLedger.website =  jl.VoucherLedger.website && jl.VoucherLedger.website!==''? decrypt(jl.VoucherLedger.website):'';
          jl.VoucherLedger.jurisdiction = jl.VoucherLedger.jurisdiction && jl.VoucherLedger.jurisdiction!==''? decrypt(jl.VoucherLedger.jurisdiction):'';
          jl.VoucherLedger.cin_number = jl.VoucherLedger.cin_number && jl.VoucherLedger.cin_number!==''? decrypt(jl.VoucherLedger.cin_number):'';
        }
      })
    }

    data.dataValues.narration =data.dataValues.narration && data.dataValues.narration!==''? decrypt(data.dataValues.narration):'';
    data.dataValues.total_amount =data.dataValues.total_amount && data.dataValues.total_amount!==''?  decrypt(data.dataValues.total_amount):'';
    return data;
  }else{
    return data;
  }
};


function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted =  Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}