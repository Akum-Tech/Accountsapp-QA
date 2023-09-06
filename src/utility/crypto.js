const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
let key = '';

export const encrypt = async(text, keyvalue) => {
  console.log(text, keyvalue)
  key = await crypto.createHash('sha256').update(keyvalue).digest('base64').substr(0, 32);
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decrypt = async(text, keyvalue) => {
  key = await crypto.createHash('sha256').update(keyvalue).digest('base64').substr(0, 32);
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted =  Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
