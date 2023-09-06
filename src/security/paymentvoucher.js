import { join } from 'path';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionPayment = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.narration =await data.narration && data.narration!==''? encrypt(data.narration).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount.toString()).toString():'';
    data.bank_name =await data.bank_name && data.bank_name!==''?encrypt(data.bank_name).toString():'';
    data.bank_account_number =await data.bank_account_number && data.bank_account_number!==''?encrypt(data.bank_account_number).toString():'';
    data.bank_ifsc =await data.bank_ifsc && data.bank_ifsc!==''? encrypt(data.bank_ifsc).toString():'';
    return data;
};

export const decreptionPayment = async(data, type, keydata) => {
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
        if(item.PaymentBuyer){
          item.PaymentBuyer.name = item.PaymentBuyer.name && item.PaymentBuyer.name!==''? decrypt(item.PaymentBuyer.name):'';
          item.PaymentBuyer.email = item.PaymentBuyer.email && item.PaymentBuyer.email!==''? decrypt(item.PaymentBuyer.email):'';
          item.PaymentBuyer.amount = item.PaymentBuyer.amount && item.PaymentBuyer.amount!==''? decrypt(item.PaymentBuyer.amount):'';
          item.PaymentBuyer.phone = item.PaymentBuyer.phone && item.PaymentBuyer.phone!==''? decrypt(item.PaymentBuyer.phone):'';
          item.PaymentBuyer.street =  item.PaymentBuyer.street && item.PaymentBuyer.street!==''?decrypt(item.PaymentBuyer.street):'';
          item.PaymentBuyer.area = item.PaymentBuyer.area && item.PaymentBuyer.area!==''? decrypt(item.PaymentBuyer.area):'';
          item.PaymentBuyer.gst_number =  item.PaymentBuyer.gst_number && item.PaymentBuyer.gst_number!==''? decrypt(item.PaymentBuyer.gst_number):'';
          item.PaymentBuyer.opening_balance =  item.PaymentBuyer.opening_balance && item.PaymentBuyer.opening_balance!==''? decrypt(item.PaymentBuyer.opening_balance):'';
          item.PaymentBuyer.cess_tax =  item.PaymentBuyer.cess_tax && item.PaymentBuyer.cess_tax!==''? decrypt(item.PaymentBuyer.cess_tax):'';
          item.PaymentBuyer.bank_name =  item.PaymentBuyer.bank_name && item.PaymentBuyer.bank_name!==''? decrypt(item.PaymentBuyer.bank_name):'';
          item.PaymentBuyer.bank_branch =  item.PaymentBuyer.bank_branch && item.PaymentBuyer.bank_branch!==''? decrypt(item.PaymentBuyer.bank_branch):'';
          item.PaymentBuyer.account_holder_name =  item.PaymentBuyer.account_holder_name && item.PaymentBuyer.account_holder_name!==''? decrypt(item.PaymentBuyer.account_holder_name):'';
          item.PaymentBuyer.ifsc =  item.PaymentBuyer.ifsc && item.PaymentBuyer.ifsc!==''? decrypt(item.PaymentBuyer.ifsc):'';
          item.PaymentBuyer.pan_number =  item.PaymentBuyer.pan_number && item.PaymentBuyer.pan_number!==''? decrypt(item.PaymentBuyer.pan_number):'';
          item.PaymentBuyer.bank_account_number =  item.PaymentBuyer.bank_account_number && item.PaymentBuyer.bank_account_number!==''? decrypt(item.PaymentBuyer.bank_account_number):'';

          item.PaymentBuyer.website =  item.PaymentBuyer.website && item.PaymentBuyer.website!==''? decrypt(item.PaymentBuyer.website):'';
          item.PaymentBuyer.jurisdiction = item.PaymentBuyer.jurisdiction && item.PaymentBuyer.jurisdiction!==''? decrypt(item.PaymentBuyer.jurisdiction):'';
          item.PaymentBuyer.cin_number = item.PaymentBuyer.cin_number && item.PaymentBuyer.cin_number!==''? decrypt(item.PaymentBuyer.cin_number):'';
      }

      if(item.PaymentReciver){
        item.PaymentReciver.name = item.PaymentReciver.name && item.PaymentReciver.name!==''? decrypt(item.PaymentReciver.name):'';
        item.PaymentReciver.email = item.PaymentReciver.email && item.PaymentReciver.email!==''? decrypt(item.PaymentReciver.email):'';
        item.PaymentReciver.amount = item.PaymentReciver.amount && item.PaymentReciver.amount!==''? decrypt(item.PaymentReciver.amount):'';
        item.PaymentReciver.phone = item.PaymentReciver.phone && item.PaymentReciver.phone!==''? decrypt(item.PaymentReciver.phone):'';
        item.PaymentReciver.street =  item.PaymentReciver.street && item.PaymentReciver.street!==''?decrypt(item.PaymentReciver.street):'';
        item.PaymentReciver.area = item.PaymentReciver.area && item.PaymentReciver.area!==''? decrypt(item.PaymentReciver.area):'';
        item.PaymentReciver.gst_number =  item.PaymentReciver.gst_number && item.PaymentReciver.gst_number!==''? decrypt(item.PaymentReciver.gst_number):'';
        item.PaymentReciver.opening_balance =  item.PaymentReciver.opening_balance && item.PaymentReciver.opening_balance!==''? decrypt(item.PaymentReciver.opening_balance):'';
        item.PaymentReciver.cess_tax =  item.PaymentReciver.cess_tax && item.PaymentReciver.cess_tax!==''? decrypt(item.PaymentReciver.cess_tax):'';
        item.PaymentReciver.bank_name =  item.PaymentReciver.bank_name && item.PaymentReciver.bank_name!==''? decrypt(item.PaymentReciver.bank_name):'';
        item.PaymentReciver.bank_branch =  item.PaymentReciver.bank_branch && item.PaymentReciver.bank_branch!==''? decrypt(item.PaymentReciver.bank_branch):'';
        item.PaymentReciver.account_holder_name =  item.PaymentReciver.account_holder_name && item.PaymentReciver.account_holder_name!==''? decrypt(item.PaymentReciver.account_holder_name):'';
        item.PaymentReciver.ifsc =  item.PaymentReciver.ifsc && item.PaymentReciver.ifsc!==''? decrypt(item.PaymentReciver.ifsc):'';
        item.PaymentReciver.pan_number =  item.PaymentReciver.pan_number && item.PaymentReciver.pan_number!==''? decrypt(item.PaymentReciver.pan_number):'';
        item.PaymentReciver.bank_account_number =  item.PaymentReciver.bank_account_number && item.PaymentReciver.bank_account_number!==''? decrypt(item.PaymentReciver.bank_account_number):'';

        item.PaymentReciver.website =  item.PaymentReciver.website && item.PaymentReciver.website!==''? decrypt(item.PaymentReciver.website):'';
        item.PaymentReciver.jurisdiction = item.PaymentReciver.jurisdiction && item.PaymentReciver.jurisdiction!==''? decrypt(item.PaymentReciver.jurisdiction):'';
        item.PaymentReciver.cin_number = item.PaymentReciver.cin_number && item.PaymentReciver.cin_number!==''? decrypt(item.PaymentReciver.cin_number):'';
      }


        
        item.narration = item.narration && item.narration!==''? decrypt(item.narration):'';
        item.bank_name = item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_account_number = item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.bank_ifsc = item.bank_ifsc && item.bank_ifsc!==''? decrypt(item.bank_ifsc):'';
        item.total_amount =  item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
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
      
    if(data.dataValues.PaymentBuyer){
      data.dataValues.PaymentBuyer.name = data.dataValues.PaymentBuyer.name && data.dataValues.PaymentBuyer.name!==''?decrypt(data.dataValues.PaymentBuyer.name):'';
      data.dataValues.PaymentBuyer.opening_balance = data.dataValues.PaymentBuyer.opening_balance && data.dataValues.PaymentBuyer.opening_balance!==''?decrypt(data.dataValues.PaymentBuyer.opening_balance):'';
      data.dataValues.PaymentBuyer.amount = data.dataValues.PaymentBuyer.amount && data.dataValues.PaymentBuyer.amount!==''?decrypt(data.dataValues.PaymentBuyer.amount):'';
    }

    if(data.dataValues.PaymentReciver){
      data.dataValues.PaymentReciver.name = data.dataValues.PaymentReciver.name && data.dataValues.PaymentReciver.name!==''?decrypt(data.dataValues.PaymentReciver.name):'';
      data.dataValues.PaymentReciver.opening_balance = data.dataValues.PaymentReciver.opening_balance && data.dataValues.PaymentReciver.opening_balance!==''?decrypt(data.dataValues.PaymentReciver.opening_balance):'';
      data.dataValues.PaymentReciver.amount = data.dataValues.PaymentReciver.amount && data.dataValues.PaymentReciver.amount!==''?decrypt(data.dataValues.PaymentReciver.amount):'';
    }
   
    data.dataValues.narration =data.dataValues.narration && data.dataValues.narration!==''? decrypt(data.dataValues.narration):'';
    data.dataValues.total_amount =data.dataValues.total_amount && data.dataValues.total_amount!==''?  decrypt(data.dataValues.total_amount):'';
    data.dataValues.bank_name = data.dataValues.bank_name && data.dataValues.bank_name!==''?decrypt(data.dataValues.bank_name):'';
    data.dataValues.bank_account_number = data.dataValues.bank_account_number && data.dataValues.bank_account_number!==''?decrypt(data.dataValues.bank_account_number):'';
    data.dataValues.bank_ifsc = data.dataValues.bank_ifsc && data.dataValues.bank_ifsc!==''? decrypt(data.dataValues.bank_ifsc):''
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