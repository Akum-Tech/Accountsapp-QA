import { log } from 'console';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');//crypto.randomBytes(16);

let key = '';
export const encreption = async(data) => {
  consoel.log('encryption data---------->',data)
    // key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);
    key = crypto.createHash('sha256').update(data.email).digest('base64').substr(0, 32);
  

    data.company_name =await data.company_name && data.company_name!==''? encrypt(data.company_name).toString():'';
    data.street =await data.street && data.street!==''?encrypt(data.street).toString():'';
    data.area =await data.area && data.area!==''?encrypt(data.area).toString():'';
    data.gst_number =await data.gst_number && data.gst_number!==''? encrypt(data.gst_number).toString():'';
    data.company_pan_number =await data.company_pan_number && data.company_pan_number!==''? encrypt(data.company_pan_number).toString():'';
    data.cin_number =await data.cin_number && data.cin_number!==''? encrypt(data.cin_number).toString():'';
    data.company_logo =await data.company_logo && data.company_logo!==''? encrypt(data.company_logo).toString():'';
    data.website =await data.website && data.website!==''? encrypt(data.website).toString():'';
    data.email =await data.email && data.email!==''? encrypt(data.email).toString():'';
    data.phone_number =await data.phone_number && data.phone_number!==''? encrypt(data.phone_number).toString():'';
    data.jurisdiction =await data.jurisdiction && data.jurisdiction!==''? encrypt(data.jurisdiction).toString():'';
    return data;
};

export const decreption = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  console.log('data------>',data)
  if(await type==='array'){
    await data.map(item=>{
        item.company_name = item.company_name && item.company_name!==''? decrypt(item.company_name):'';
        item.street = item.street && item.street!==''? decrypt(item.street):'';
        item.area = item.area && item.area!==''? decrypt(item.area):'';
        item.gst_number = item.gst_number && item.gst_number!==''? decrypt(item.gst_number):'';
        item.company_pan_number =  item.company_pan_number && item.company_pan_number!==''?decrypt(item.company_pan_number):'';
        item.cin_number = item.cin_number && item.cin_number!==''? decrypt(item.cin_number):'';
        item.company_logo =  item.company_logo && item.company_logo!==''? decrypt(item.company_logo):'';
        item.website =  item.website && item.website!==''? decrypt(item.website):'';
        item.email =  item.email && item.email!==''? decrypt(item.email):'';
        item.phone_number =  item.phone_number && item.phone_number!==''? decrypt(item.phone_number):'';
        item.jurisdiction =  item.jurisdiction && item.jurisdiction!==''? decrypt(item.jurisdiction):'';
    });
    return data;
  }else if(type==="object"){
    data.dataValues.company_name =data.dataValues.company_name && data.dataValues.company_name!==''? decrypt(data.dataValues.company_name):'';
    data.dataValues.street =data.dataValues.street && data.dataValues.street!==''? decrypt(data.dataValues.street):'';
    data.dataValues.area =data.dataValues.area && data.dataValues.area!==''? decrypt(data.dataValues.area):'';
    data.dataValues.gst_number =data.dataValues.gst_number && data.dataValues.gst_number!==''? decrypt(data.dataValues.gst_number):'';
    data.dataValues.company_pan_number =data.dataValues.company_pan_number && data.dataValues.company_pan_number!==''? decrypt(data.dataValues.company_pan_number):'';
    data.dataValues.cin_number =data.dataValues.cin_number && data.dataValues.cin_number!==''? decrypt(data.dataValues.cin_number):'';
    data.dataValues.website =data.dataValues.website && data.dataValues.website!==''?  decrypt(data.dataValues.website):'';
    data.dataValues.email =data.dataValues.email && data.dataValues.email!==''?  decrypt(data.dataValues.email):'';
    data.dataValues.phone_number =data.dataValues.phone_number && data.dataValues.phone_number!==''?  decrypt(data.dataValues.phone_number):'';
    data.dataValues.jurisdiction =data.dataValues.jurisdiction && data.dataValues.jurisdiction!==''?  decrypt(data.dataValues.jurisdiction):'';
    return data;
  }else{
    return data;
  }
};


function encrypt(text) {
  console.log('text------>',text)
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text) {
  console.log('text---->',text)
  console.log('key---->',key)
  console.log('iv---->',iv)

  // let textParts = text.split(':');
  // let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(text, 'hex');
  console.log('encryptedText-------->',encryptedText)
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  console.log('decipher---->',decipher)
  let decrypted = decipher.update(encryptedText);
  decrypted =  Buffer.concat([decrypted, decipher.final()]);
  console.log('decrypted------------>',decrypted)
  return decrypted.toString();
}