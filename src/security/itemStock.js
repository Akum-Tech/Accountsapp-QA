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
    data.price =await data.price && data.price!==''? encrypt(data.price.toString()).toString():'';
    data.discount =await data.discount && data.discount!==''? encrypt(data.discount.toString()).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount.toString()).toString():'';
    return data;
};

export const decreptionItem = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.ledger_name = item.ledger_name && item.ledger_name!=''? decrypt(item.ledger_name):'';
        item.amount = item.amount && item.amount!='' && item.amount!='0'? decrypt(item.amount):'';
        item.name = item.name && item.name!=''? decrypt(item.name):'';
        item.quantity=item.quantity && item.quantity!=''? decrypt(item.quantity):'';
        item.inwards=item.inwards && item.inwards!=''? decrypt(item.inwards):'';
        item.outwards=item.outwards && item.outwards!=''? decrypt(item.outwards):'';
        item.rate =  item.rate && item.rate!=''? decrypt(item.rate):'';
        item.total_value =  item.total_value && item.total_value!=''? decrypt(item.total_value):'';
    });
    return data;
  }else if(type==="object"){
    item.ledger_name = item.ledger_name && item.ledger_name!==''? decrypt(item.ledger_name):'';
        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
          item.inwards=item.inwards && item.inwards!==''? decrypt(item.inwards):'';
        item.outwards=item.outwards && item.outwards!==''? decrypt(item.outwards):'';
        item.rate =  item.rate && item.rate!==''? decrypt(item.rate):'';
        item.total_value =  item.total_value && item.total_value!==''? decrypt(item.total_value):'';
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