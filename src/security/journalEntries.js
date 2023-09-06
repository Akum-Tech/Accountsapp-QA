const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionJournalEntries = async(data) => {
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);

    data.amount =await data.amount && data.amount!==''? encrypt(data.amount).toString():'';
    return data;
};

export const decreptionJournalEntries = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';
        if(item.Voucher){
          item.Voucher.total_amount = item.Voucher.total_amount && item.Voucher.total_amount!==''? decrypt(item.Voucher.total_amount):'';
          item.Voucher.narration = item.Voucher.narration && item.Voucher.narration!==''? decrypt(item.Voucher.narration):'';
        }
        if(item.VoucherLedger){
          item.VoucherLedger.name = item.VoucherLedger.name && item.VoucherLedger.name!==''? decrypt(item.VoucherLedger.name):'';
          item.VoucherLedger.email = item.VoucherLedger.email && item.VoucherLedger.email!==''? decrypt(item.VoucherLedger.email):'';
          item.VoucherLedger.amount = item.VoucherLedger.amount && item.VoucherLedger.amount!==''? decrypt(item.VoucherLedger.amount):'';
          item.VoucherLedger.phone = item.VoucherLedger.phone && item.VoucherLedger.phone!==''? decrypt(item.VoucherLedger.phone):'';
          item.VoucherLedger.street =  item.VoucherLedger.street && item.VoucherLedger.street!==''?decrypt(item.VoucherLedger.street):'';
          item.VoucherLedger.area = item.VoucherLedger.area && item.VoucherLedger.area!==''? decrypt(item.VoucherLedger.area):'';
          item.VoucherLedger.gst_number =  item.VoucherLedger.gst_number && item.VoucherLedger.gst_number!==''? decrypt(item.VoucherLedger.gst_number):'';
          item.VoucherLedger.opening_balance =  item.VoucherLedger.opening_balance && item.VoucherLedger.opening_balance!==''? decrypt(item.VoucherLedger.opening_balance):'';
          item.VoucherLedger.cess_tax =  item.VoucherLedger.cess_tax && item.VoucherLedger.cess_tax!==''? decrypt(item.VoucherLedger.cess_tax):'';
          item.VoucherLedger.bank_name =  item.VoucherLedger.bank_name && item.VoucherLedger.bank_name!==''? decrypt(item.VoucherLedger.bank_name):'';
          item.VoucherLedger.bank_branch =  item.VoucherLedger.bank_branch && item.VoucherLedger.bank_branch!==''? decrypt(item.VoucherLedger.bank_branch):'';
          item.VoucherLedger.account_holder_name =  item.VoucherLedger.account_holder_name && item.VoucherLedger.account_holder_name!==''? decrypt(item.VoucherLedger.account_holder_name):'';
          item.VoucherLedger.ifsc =  item.VoucherLedger.ifsc && item.VoucherLedger.ifsc!==''? decrypt(item.VoucherLedger.ifsc):'';
          item.VoucherLedger.pan_number =  item.VoucherLedger.pan_number && item.VoucherLedger.pan_number!==''? decrypt(item.VoucherLedger.pan_number):'';
          item.VoucherLedger.bank_account_number =  item.VoucherLedger.bank_account_number && item.VoucherLedger.bank_account_number!==''? decrypt(item.VoucherLedger.bank_account_number):'';

          item.VoucherLedger.website =  item.VoucherLedger.website && item.VoucherLedger.website!==''? decrypt(item.VoucherLedger.website):'';
          item.VoucherLedger.jurisdiction = item.VoucherLedger.jurisdiction && item.VoucherLedger.jurisdiction!==''? decrypt(item.VoucherLedger.jurisdiction):'';
          item.VoucherLedger.cin_number = item.VoucherLedger.cin_number && item.VoucherLedger.cin_number!==''? decrypt(item.VoucherLedger.cin_number):'';
        }
    });
    return data;
  }else if(type==="object"){
    data.dataValues.amount =data.dataValues.amount && data.dataValues.amount!==''? decrypt(data.dataValues.amount):'';
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