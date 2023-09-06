const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionItem = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.quantity =await data.quantity && data.quantity!==''? encrypt(data.quantity.toString()).toString():'';
    data.name =await data.name && data.name!==''?encrypt(data.name).toString():'';
    data.description =await data.description && data.description!==''?encrypt(data.description).toString():'';
    data.model =await data.model && data.model!==''? encrypt(data.model).toString():'';
    data.hsn_code =await data.hsn_code && data.hsn_code!==''? encrypt(data.hsn_code).toString():'';
    data.price =await data.price && data.price!==''?encrypt(data.price).toString():'';
    data.discount =await data.discount && data.discount!==''? encrypt(data.discount).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount).toString():'';
    return data;
};

export const decreptionItem = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        if(item.itemone){
          item.itemone.name =item.itemone.name && item.itemone.name!==''? decrypt(item.itemone.name):'';
          item.itemone.hsn_code =item.itemone.hsn_code && item.itemone.hsn_code!==''? decrypt(item.itemone.hsn_code):'';
          item.itemone.rate =item.itemone.rate && item.itemone.rate!==''? decrypt(item.itemone.rate):'';
          item.itemone.quantity =item.itemone.quantity && item.itemone.quantity!==''? decrypt(item.itemone.quantity):'';
          item.itemone.total_value =item.itemone.total_value && item.itemone.total_value!==''? decrypt(item.itemone.total_value):'';
          item.itemone.cess_tax =item.itemone.cess_tax && item.itemone.cess_tax!==''? decrypt(item.itemone.cess_tax):'';
        }
        if(item.itemsone){
          item.itemsone.name =item.itemsone.name && item.itemsone.name!==''? decrypt(item.itemsone.name):'';
          item.itemsone.hsn_code =item.itemsone.hsn_code && item.itemsone.hsn_code!==''? decrypt(item.itemsone.hsn_code):'';
          item.itemsone.rate =item.itemsone.rate && item.itemsone.rate!==''? decrypt(item.itemsone.rate):'';
          item.itemsone.quantity =item.itemsone.quantity && item.itemsone.quantity!==''? decrypt(item.itemsone.quantity):'';
          item.itemsone.total_value =item.itemsone.total_value && item.itemsone.total_value!==''? decrypt(item.itemsone.total_value):'';
          item.itemsone.cess_tax =item.itemsone.cess_tax && item.itemsone.cess_tax!==''? decrypt(item.itemsone.cess_tax):'';
        }

        if(item.ledgerone){
            item.ledgerone.name = item.ledgerone.name && item.ledgerone.name!==''? decrypt(item.ledgerone.name):'';
            item.ledgerone.email = item.ledgerone.email && item.ledgerone.email!==''? decrypt(item.ledgerone.email):'';
            item.ledgerone.amount = item.ledgerone.amount && item.ledgerone.amount!==''? decrypt(item.ledgerone.amount):'';
            item.ledgerone.phone = item.ledgerone.phone && item.ledgerone.phone!==''? decrypt(item.ledgerone.phone):'';
            item.ledgerone.street =  item.ledgerone.street && item.ledgerone.street!==''?decrypt(item.ledgerone.street):'';
            item.ledgerone.area = item.ledgerone.area && item.ledgerone.area!==''? decrypt(item.ledgerone.area):'';
            item.ledgerone.gst_number =  item.ledgerone.gst_number && item.ledgerone.gst_number!==''? decrypt(item.ledgerone.gst_number):'';
            item.ledgerone.opening_balance =  item.ledgerone.opening_balance && item.ledgerone.opening_balance!==''? decrypt(item.ledgerone.opening_balance):'';
            item.ledgerone.cess_tax =  item.ledgerone.cess_tax && item.ledgerone.cess_tax!==''? decrypt(item.ledgerone.cess_tax):'';
            item.ledgerone.bank_name =  item.ledgerone.bank_name && item.ledgerone.bank_name!==''? decrypt(item.ledgerone.bank_name):'';
            item.ledgerone.bank_branch =  item.ledgerone.bank_branch && item.ledgerone.bank_branch!==''? decrypt(item.ledgerone.bank_branch):'';
            item.ledgerone.account_holder_name =  item.ledgerone.account_holder_name && item.ledgerone.account_holder_name!==''? decrypt(item.ledgerone.account_holder_name):'';
            item.ledgerone.ifsc =  item.ledgerone.ifsc && item.ledgerone.ifsc!==''? decrypt(item.ledgerone.ifsc):'';
            item.ledgerone.pan_number =  item.ledgerone.pan_number && item.ledgerone.pan_number!==''? decrypt(item.ledgerone.pan_number):'';
            item.ledgerone.bank_account_number =  item.ledgerone.bank_account_number && item.ledgerone.bank_account_number!==''? decrypt(item.ledgerone.bank_account_number):'';
        }
        
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.model = item.model && item.model!==''? decrypt(item.model):'';
        item.hsn_code =  item.hsn_code && item.hsn_code!==''?decrypt(item.hsn_code):'';
        item.price = item.price && item.price!==''? decrypt(item.price):'';
        item.discount =  item.discount && item.discount!==''? decrypt(item.discount):'';
        item.total_value =item.total_value && item.total_value!==''? decrypt(item.total_value):'';
        item.total_amount =  item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
        item.rate =  item.rate && item.rate!==''? decrypt(item.rate):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.quantity =data.dataValues.quantity && data.dataValues.quantity!==''? decrypt(data.dataValues.quantity):'';
    data.dataValues.name =data.dataValues.name && data.dataValues.name!==''? decrypt(data.dataValues.name):'';
    data.dataValues.description =data.dataValues.description && data.dataValues.description!==''? decrypt(data.dataValues.description):'';
    data.dataValues.model =data.dataValues.model && data.dataValues.model!==''? decrypt(data.dataValues.model):'';
    data.dataValues.hsn_code =data.dataValues.hsn_code && data.dataValues.hsn_code!==''? decrypt(data.dataValues.hsn_code):'';
    data.dataValues.price =data.dataValues.price && data.dataValues.price!==''? decrypt(data.dataValues.price):'';
    data.dataValues.discount =data.dataValues.discount && data.dataValues.discount!==''?  decrypt(data.dataValues.discount):'';
    data.dataValues.total_amount =data.dataValues.total_amount && data.dataValues.total_amount!==''?  decrypt(data.dataValues.total_amount):'';
    data.dataValues.rate =data.dataValues.rate && data.dataValues.rate!==''?  decrypt(data.dataValues.rate):'';
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
  // let textParts = text.split(':');
  // let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted =  Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}