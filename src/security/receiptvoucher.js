import { join } from 'path';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionReceipt = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.narration =await data.narration && data.narration!==''? encrypt(data.narration).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount.toString()).toString():'';
    data.bank_name =await data.bank_name && data.bank_name!==''?encrypt(data.bank_name).toString():'';
    data.bank_account_number =await data.bank_account_number && data.bank_account_number!==''?encrypt(data.bank_account_number).toString():'';
    data.bank_ifsc =await data.bank_ifsc && data.bank_ifsc!==''? encrypt(data.bank_ifsc).toString():'';
    return data;
};

export const decreptionReceipt = async(data, type, keydata) => {
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

        if(item.ReciptBuyer){
            item.ReciptBuyer.name = item.ReciptBuyer.name && item.ReciptBuyer.name!==''? decrypt(item.ReciptBuyer.name):'';
            item.ReciptBuyer.email = item.ReciptBuyer.email && item.ReciptBuyer.email!==''? decrypt(item.ReciptBuyer.email):'';
            item.ReciptBuyer.amount = item.ReciptBuyer.amount && item.ReciptBuyer.amount!==''? decrypt(item.ReciptBuyer.amount):'';
            item.ReciptBuyer.phone = item.ReciptBuyer.phone && item.ReciptBuyer.phone!==''? decrypt(item.ReciptBuyer.phone):'';
            item.ReciptBuyer.street =  item.ReciptBuyer.street && item.ReciptBuyer.street!==''?decrypt(item.ReciptBuyer.street):'';
            item.ReciptBuyer.area = item.ReciptBuyer.area && item.ReciptBuyer.area!==''? decrypt(item.ReciptBuyer.area):'';
            item.ReciptBuyer.gst_number =  item.ReciptBuyer.gst_number && item.ReciptBuyer.gst_number!==''? decrypt(item.ReciptBuyer.gst_number):'';
            item.ReciptBuyer.opening_balance =  item.ReciptBuyer.opening_balance && item.ReciptBuyer.opening_balance!==''? decrypt(item.ReciptBuyer.opening_balance):'';
            item.ReciptBuyer.cess_tax =  item.ReciptBuyer.cess_tax && item.ReciptBuyer.cess_tax!==''? decrypt(item.ReciptBuyer.cess_tax):'';
            item.ReciptBuyer.bank_name =  item.ReciptBuyer.bank_name && item.ReciptBuyer.bank_name!==''? decrypt(item.ReciptBuyer.bank_name):'';
            item.ReciptBuyer.bank_branch =  item.ReciptBuyer.bank_branch && item.ReciptBuyer.bank_branch!==''? decrypt(item.ReciptBuyer.bank_branch):'';
            item.ReciptBuyer.account_holder_name =  item.ReciptBuyer.account_holder_name && item.ReciptBuyer.account_holder_name!==''? decrypt(item.ReciptBuyer.account_holder_name):'';
            item.ReciptBuyer.ifsc =  item.ReciptBuyer.ifsc && item.ReciptBuyer.ifsc!==''? decrypt(item.ReciptBuyer.ifsc):'';
            item.ReciptBuyer.pan_number =  item.ReciptBuyer.pan_number && item.ReciptBuyer.pan_number!==''? decrypt(item.ReciptBuyer.pan_number):'';
            item.ReciptBuyer.bank_account_number =  item.ReciptBuyer.bank_account_number && item.ReciptBuyer.bank_account_number!==''? decrypt(item.ReciptBuyer.bank_account_number):'';

            item.ReciptBuyer.website =  item.ReciptBuyer.website && item.ReciptBuyer.website!==''? decrypt(item.ReciptBuyer.website):'';
            item.ReciptBuyer.jurisdiction = item.ReciptBuyer.jurisdiction && item.ReciptBuyer.jurisdiction!==''? decrypt(item.ReciptBuyer.jurisdiction):'';
            item.ReciptBuyer.cin_number = item.ReciptBuyer.cin_number && item.ReciptBuyer.cin_number!==''? decrypt(item.ReciptBuyer.cin_number):'';
        }

        if(item.ReciptReciver){
          item.ReciptReciver.name = item.ReciptReciver.name && item.ReciptReciver.name!==''? decrypt(item.ReciptReciver.name):'';
          item.ReciptReciver.email = item.ReciptReciver.email && item.ReciptReciver.email!==''? decrypt(item.ReciptReciver.email):'';
          item.ReciptReciver.amount = item.ReciptReciver.amount && item.ReciptReciver.amount!==''? decrypt(item.ReciptReciver.amount):'';
          item.ReciptReciver.phone = item.ReciptReciver.phone && item.ReciptReciver.phone!==''? decrypt(item.ReciptReciver.phone):'';
          item.ReciptReciver.street =  item.ReciptReciver.street && item.ReciptReciver.street!==''?decrypt(item.ReciptReciver.street):'';
          item.ReciptReciver.area = item.ReciptReciver.area && item.ReciptReciver.area!==''? decrypt(item.ReciptReciver.area):'';
          item.ReciptReciver.gst_number =  item.ReciptReciver.gst_number && item.ReciptReciver.gst_number!==''? decrypt(item.ReciptReciver.gst_number):'';
          item.ReciptReciver.opening_balance =  item.ReciptReciver.opening_balance && item.ReciptReciver.opening_balance!==''? decrypt(item.ReciptReciver.opening_balance):'';
          item.ReciptReciver.cess_tax =  item.ReciptReciver.cess_tax && item.ReciptReciver.cess_tax!==''? decrypt(item.ReciptReciver.cess_tax):'';
          item.ReciptReciver.bank_name =  item.ReciptReciver.bank_name && item.ReciptReciver.bank_name!==''? decrypt(item.ReciptReciver.bank_name):'';
          item.ReciptReciver.bank_branch =  item.ReciptReciver.bank_branch && item.ReciptReciver.bank_branch!==''? decrypt(item.ReciptReciver.bank_branch):'';
          item.ReciptReciver.account_holder_name =  item.ReciptReciver.account_holder_name && item.ReciptReciver.account_holder_name!==''? decrypt(item.ReciptReciver.account_holder_name):'';
          item.ReciptReciver.ifsc =  item.ReciptReciver.ifsc && item.ReciptReciver.ifsc!==''? decrypt(item.ReciptReciver.ifsc):'';
          item.ReciptReciver.pan_number =  item.ReciptReciver.pan_number && item.ReciptReciver.pan_number!==''? decrypt(item.ReciptReciver.pan_number):'';
          item.ReciptReciver.bank_account_number =  item.ReciptReciver.bank_account_number && item.ReciptReciver.bank_account_number!==''? decrypt(item.ReciptReciver.bank_account_number):'';

          item.ReciptReciver.website =  item.ReciptReciver.website && item.ReciptReciver.website!==''? decrypt(item.ReciptReciver.website):'';
          item.ReciptReciver.jurisdiction = item.ReciptReciver.jurisdiction && item.ReciptReciver.jurisdiction!==''? decrypt(item.ReciptReciver.jurisdiction):'';
          item.ReciptReciver.cin_number = item.ReciptReciver.cin_number && item.ReciptReciver.cin_number!==''? decrypt(item.ReciptReciver.cin_number):'';
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
      
    if(data.dataValues.ReciptBuyer){
      data.dataValues.ReciptBuyer.name = data.dataValues.ReciptBuyer.name && data.dataValues.ReciptBuyer.name!==''?decrypt(data.dataValues.ReciptBuyer.name):'';
      data.dataValues.ReciptBuyer.opening_balance = data.dataValues.ReciptBuyer.opening_balance && data.dataValues.ReciptBuyer.opening_balance!==''?decrypt(data.dataValues.ReciptBuyer.opening_balance):'';
      data.dataValues.ReciptBuyer.amount = data.dataValues.ReciptBuyer.amount && data.dataValues.ReciptBuyer.amount!==''?decrypt(data.dataValues.ReciptBuyer.amount):'';
    }

    if(data.dataValues.ReciptReciver){
      data.dataValues.ReciptReciver.name = data.dataValues.ReciptReciver.name && data.dataValues.ReciptReciver.name!==''?decrypt(data.dataValues.ReciptReciver.name):'';
      data.dataValues.ReciptReciver.opening_balance = data.dataValues.ReciptReciver.opening_balance && data.dataValues.ReciptReciver.opening_balance!==''?decrypt(data.dataValues.ReciptReciver.opening_balance):'';
      data.dataValues.ReciptReciver.amount = data.dataValues.ReciptReciver.amount && data.dataValues.ReciptReciver.amount!==''?decrypt(data.dataValues.ReciptReciver.amount):'';
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