const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionBank = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.bank_name =await data.bank_name && data.bank_name!==''? encrypt(data.bank_name).toString():'';
    data.bank_account_number =await data.bank_account_number && data.bank_account_number!==''? encrypt(data.bank_account_number).toString():'';
    data.bank_ifsc =await data.bank_ifsc && data.bank_ifsc!==''? encrypt(data.bank_ifsc).toString():'';
    return data;
};

export const decreptionBank = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  
  if(await type==='array'){
    await data.map(item=>{
        item.bank_name = item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_account_number = item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.bank_ifsc = item.bank_ifsc && item.bank_ifsc!==''? decrypt(item.bank_ifsc):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.bank_name =data.dataValues.bank_name && data.dataValues.bank_name!==''? decrypt(data.dataValues.bank_name):'';
    data.dataValues.bank_account_number =data.dataValues.bank_account_number && data.dataValues.bank_account_number!==''? decrypt(data.dataValues.bank_account_number):'';
    data.dataValues.bank_ifsc =data.dataValues.bank_ifsc && data.dataValues.bank_ifsc!==''? decrypt(data.dataValues.bank_ifsc):'';
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