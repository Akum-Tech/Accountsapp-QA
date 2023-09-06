const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');//crypto.randomBytes(16);

let key = '';
export const encreption = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.name =await data.name && data.name!==''? encrypt(data.name).toString():'';
    data.email =await data.email && data.email!==''?encrypt(data.email).toString():'';
    data.amount =await data.amount && data.amount!==''?encrypt(data.amount).toString():'';
    data.phone =await data.phone && data.phone!==''? encrypt(data.phone).toString():'';
    data.street =await data.street && data.street!==''? encrypt(data.street).toString():'';
    data.area =await data.area && data.area!==''? encrypt(data.area).toString():'';
    data.gst_number =await data.gst_number && data.gst_number!==''? encrypt(data.gst_number).toString():'';
    data.opening_balance =await data.opening_balance && data.opening_balance!==''? encrypt(data.opening_balance).toString():'';
    data.cess_tax =await data.cess_tax && data.cess_tax!==''? encrypt(data.cess_tax).toString():'';
    data.bank_name =await data.bank_name && data.bank_name!==''? encrypt(data.bank_name).toString():'';
    data.bank_branch =await data.bank_branch && data.bank_branch!==''? encrypt(data.bank_branch).toString():'';
    data.account_holder_name =await data.account_holder_name && data.account_holder_name!==''? encrypt(data.account_holder_name).toString():'';
    data.ifsc =await data.ifsc && data.ifsc!==''? encrypt(data.ifsc).toString():'';
    data.pan_number =await data.pan_number && data.pan_number!==''? encrypt(data.pan_number).toString():'';
    data.bank_account_number =await data.bank_account_number && data.bank_account_number!==''? encrypt(data.bank_account_number).toString():'';
    data.website =await data.website && data.website!==''? encrypt(data.website).toString():'';
    data.jurisdiction =await data.jurisdiction && data.jurisdiction!==''? encrypt(data.jurisdiction).toString():'';
    data.cin_number =await data.cin_number && data.cin_number!==''? encrypt(data.cin_number).toString():'';

    data.state_id =await data.state_id && data.state_id!==''? data.state_id:null;
    data.city_id =await data.city_id && data.city_id!==''? data.city_id:null;
    return data;
};


export const encreptionamount = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.amount =await data.amount && data.amount!==''?encrypt(data.amount).toString():'';
    return data;
};



export const decreption = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.email = item.email && item.email!==''? decrypt(item.email):'';
        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';
        item.phone = item.phone && item.phone!==''? decrypt(item.phone):'';
        item.street =  item.street && item.street!==''?decrypt(item.street):'';
        item.area = item.area && item.area!==''? decrypt(item.area):'';
        item.gst_number =  item.gst_number && item.gst_number!==''? decrypt(item.gst_number):'';
        item.opening_balance =  item.opening_balance && item.opening_balance!==''? decrypt(item.opening_balance):'';
        item.cess_tax =  item.cess_tax && item.cess_tax!==''? decrypt(item.cess_tax):'';
        item.bank_name =  item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_branch =  item.bank_branch && item.bank_branch!==''? decrypt(item.bank_branch):'';
        item.account_holder_name =  item.account_holder_name && item.account_holder_name!==''? decrypt(item.account_holder_name):'';
        item.ifsc =  item.ifsc && item.ifsc!==''? decrypt(item.ifsc):'';
        item.pan_number =  item.pan_number && item.pan_number!==''? decrypt(item.pan_number):'';
        item.bank_account_number =  item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.website =  item.website && item.website!==''? decrypt(item.website):'';
        item.jurisdiction =  item.jurisdiction && item.jurisdiction!==''? decrypt(item.jurisdiction):'';
        item.cin_number =  item.cin_number && item.cin_number!==''? decrypt(item.cin_number):'';
        
    });
    return data;
  }else if(type==="object"){
    data.dataValues.name =data.dataValues.name && data.dataValues.name!==''? decrypt(data.dataValues.name):'';
    data.dataValues.email =data.dataValues.email && data.dataValues.email!==''? decrypt(data.dataValues.email):'';
    data.dataValues.amount =data.dataValues.amount && data.dataValues.amount!==''? decrypt(data.dataValues.amount):'';
    data.dataValues.phone =data.dataValues.phone && data.dataValues.phone!==''? decrypt(data.dataValues.phone):'';
    data.dataValues.street =data.dataValues.street && data.dataValues.street!==''? decrypt(data.dataValues.street):'';
    data.dataValues.area =data.dataValues.area && data.dataValues.area!==''? decrypt(data.dataValues.area):'';
    data.dataValues.gst_number =data.dataValues.gst_number && data.dataValues.gst_number!==''?  decrypt(data.dataValues.gst_number):'';
    data.dataValues.opening_balance =data.dataValues.opening_balance && data.dataValues.opening_balance!==''?  decrypt(data.dataValues.opening_balance):'';
    data.dataValues.cess_tax =data.dataValues.cess_tax && data.dataValues.cess_tax!==''?  decrypt(data.dataValues.cess_tax):'';
    data.dataValues.bank_name =data.dataValues.bank_name && data.dataValues.bank_name!==''?  decrypt(data.dataValues.bank_name):'';
    data.dataValues.bank_branch =data.dataValues.bank_branch && data.dataValues.bank_branch!==''?  decrypt(data.dataValues.bank_branch):'';
    data.dataValues.account_holder_name =data.dataValues.account_holder_name && data.dataValues.account_holder_name!==''?  decrypt(data.dataValues.account_holder_name):'';
    data.dataValues.ifsc =data.dataValues.ifsc && data.dataValues.ifsc!==''?  decrypt(data.dataValues.ifsc):'';
    data.dataValues.pan_number =data.dataValues.pan_number && data.dataValues.pan_number!==''?  decrypt(data.dataValues.pan_number):'';
    data.dataValues.bank_account_number =data.dataValues.bank_account_number && data.dataValues.bank_account_number!==''?  decrypt(data.dataValues.bank_account_number):'';
    data.dataValues.website =data.dataValues.website && data.dataValues.website!==''?  decrypt(data.dataValues.website):'';
    data.dataValues.jurisdiction =data.dataValues.jurisdiction && data.dataValues.jurisdiction!==''?  decrypt(data.dataValues.jurisdiction):'';
    data.dataValues.cin_number =data.dataValues.cin_number && data.dataValues.cin_number!==''?  decrypt(data.dataValues.cin_number):'';
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