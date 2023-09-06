const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');//crypto.randomBytes(16);

let key = '';
export const encreptionItem = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);
    data.name =await data.name && data.name!==''? encrypt(data.name).toString():'';
    data.hsn_code =await data.hsn_code && data.hsn_code!==''?encrypt(data.hsn_code).toString():'';
    data.rate =await data.rate && data.rate!==''?encrypt(data.rate.toString()).toString():'';
    data.quantity =await data.quantity && data.quantity!==''?encrypt(data.quantity).toString():'';
    data.total_value =await data.total_value && data.total_value!==''? encrypt(data.total_value.toString()).toString():'';
    data.cess_tax =await data.cess_tax && data.cess_tax!==''? encrypt(data.cess_tax).toString():'';
    return data;
};

export const decreptionItem = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
        item.rate = item.rate && item.rate!==''? decrypt(item.rate):'';
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
        item.total_value =  item.total_value && item.total_value!==''?decrypt(item.total_value):'';
        item.cess_tax =  item.cess_tax && item.cess_tax!==''?decrypt(item.cess_tax):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.name =data.dataValues.name && data.dataValues.name!==''? decrypt(data.dataValues.name):'';
    data.dataValues.hsn_code =data.dataValues.hsn_code && data.dataValues.hsn_code!==''? decrypt(data.dataValues.hsn_code):'';
    data.dataValues.rate =data.dataValues.rate && data.dataValues.rate!==''? decrypt(data.dataValues.rate):'';
    data.dataValues.quantity =data.dataValues.quantity && data.dataValues.quantity!==''? decrypt(data.dataValues.quantity):'';
    data.dataValues.total_value =data.dataValues.total_value && data.dataValues.total_value!==''? decrypt(data.dataValues.total_value):'';
    data.dataValues.cess_tax =data.dataValues.cess_tax && data.dataValues.cess_tax!==''? decrypt(data.dataValues.cess_tax):'';
    return data;
  }else{
    return data;
  }
};


export const decreptionItemAmount = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.rate = item.rate && item.rate!==''? decrypt(item.rate):'';
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.rate =data.dataValues.rate && data.dataValues.rate!==''? decrypt(data.dataValues.rate):'';
    data.dataValues.quantity =data.dataValues.quantity && data.dataValues.quantity!==''? decrypt(data.dataValues.quantity):'';
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