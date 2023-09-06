const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');//crypto.randomBytes(16);

let key = '';
export const encreption = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);
    data.stockvalue =await data.stockvalue && data.stockvalue!==''?encrypt(data.stockvalue).toString():'';
    return data;
};

export const decreptionmnualstock = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.stockvalue = item.stockvalue && item.stockvalue!==''? decrypt(item.stockvalue):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.stockvalue =data.dataValues.stockvalue && data.dataValues.stockvalue!==''? decrypt(data.dataValues.stockvalue):'';
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