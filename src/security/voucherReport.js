import { join } from 'path';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';

export const decreptionReport = async(data, type, keydata, group) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
     
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';
        item.opening_balance = item.opening_balance && item.opening_balance!==''? decrypt(item.opening_balance):'';
        if(item.journal_entries && item.journal_entries.length>0){
          item.journal_entries.map(ele=>{
            ele.amount = ele.amount && ele.amount!==''? decrypt(ele.amount):'';
            if(ele.Voucher){
              ele.Voucher.narration = ele.Voucher.narration && ele.Voucher.narration!==''? decrypt(ele.Voucher.narration):'';
              ele.Voucher.bank_name = ele.Voucher.bank_name && ele.Voucher.bank_name!==''? decrypt(ele.Voucher.bank_name):'';
              ele.Voucher.bank_account_number = ele.Voucher.bank_account_number && ele.Voucher.bank_account_number!==''? decrypt(ele.Voucher.bank_account_number):'';
              ele.Voucher.bank_ifsc = ele.Voucher.bank_ifsc && ele.Voucher.bank_ifsc!==''? decrypt(ele.Voucher.bank_ifsc):'';
              ele.Voucher.shipping_address =  ele.Voucher.shipping_address && ele.Voucher.shipping_address!==''?decrypt(ele.Voucher.shipping_address):'';
              ele.Voucher.description = ele.Voucher.description && ele.Voucher.description!==''? decrypt(ele.Voucher.description):'';
              ele.Voucher.sub_amount =  ele.Voucher.sub_amount && ele.Voucher.sub_amount!==''? decrypt(ele.Voucher.sub_amount):'';
              ele.Voucher.discount =  ele.Voucher.discount && ele.Voucher.discount!==''? decrypt(ele.Voucher.discount):'';
              ele.Voucher.total_amount =  ele.Voucher.total_amount && ele.Voucher.total_amount!==''? decrypt(ele.Voucher.total_amount):'';
            }
          })
        }
        if(item.reciept_vouchers && item.reciept_vouchers.length>0){
          item.reciept_vouchers.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.payment_vouchers && item.payment_vouchers.length>0){
          item.payment_vouchers.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.Buyer && item.Buyer.length>0){
          item.Buyer.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.PBuyer && item.PBuyer.length>0){
          item.PBuyer.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.RBuyer && item.RBuyer.length>0){
          item.RBuyer.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.PRBuyer && item.PRBuyer.length>0){
          item.PRBuyer.map(ele=>{
            ele.total_amount  = ele.total_amount && ele.total_amount!==''?decrypt(ele.total_amount):'';
          })
        }
        if(item.sales_vouchers && item.sales_vouchers.length>0){
          item.sales_vouchers.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }

        if(item.roundsales && item.roundsales.length>0){
          item.roundsales.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }

        if(item.discountPurchases && item.discountPurchases.length>0){
          item.discountPurchases.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';
          })
        }

        if(item.discountsales && item.discountsales.length>0){
          item.discountsales.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';
          })
        }


        if(item.discountCredit && item.discountCredit.length>0){
          item.discountCredit.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';
          })
        }

        if(item.discountDebit && item.discountDebit.length>0){
          item.discountDebit.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';
          })
        }



        if(item.item_entries && item.item_entries.length>0){
          item.item_entries.map(item=>{
            item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
            item.name = item.name && item.name!==''? decrypt(item.name):'';
            item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
            item.price = item.price && item.price!==''? decrypt(item.price):'';
            item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
            item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
          })
        }


        if(item.purchase_vouchers && item.purchase_vouchers.length>0){
          item.purchase_vouchers.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }

        if(item.roundpurchase && item.roundpurchase.length>0){
          item.roundpurchase.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }


        if(item.credit_vouchers && item.credit_vouchers.length>0){
          item.credit_vouchers.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }
        if(item.debit_vouchers && item.debit_vouchers.length>0){
          item.debit_vouchers.map(ele=>{
            ele.narration = ele.narration && ele.narration!==''? decrypt(ele.narration):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            ele.sub_amount = ele.sub_amount && ele.sub_amount!==''? decrypt(ele.sub_amount):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.discount_percentage = ele.discount_percentage && ele.discount_percentage!==''? decrypt(ele.discount_percentage):'';

            if(ele.item_entries && ele.item_entries.length>0){
              ele.item_entries.map(item=>{
                item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
                item.name = item.name && item.name!==''? decrypt(item.name):'';
                item.hsn_code = item.hsn_code && item.hsn_code!==''? decrypt(item.hsn_code):'';
                item.price = item.price && item.price!==''? decrypt(item.price):'';
                item.discount = item.discount && item.discount!==''? decrypt(item.discount):'';
                item.total_amount = item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
              })
            }
          })
        }
        if(item.vocher_entries && item.vocher_entries.length>0){
          item.vocher_entries.map(ele=>{
            ele.amount = ele.amount && ele.amount!==''?decrypt(ele.amount):'';
          })
        }
        if(item.tax_entries && item.tax_entries.length>0){
          item.tax_entries.map(ele=>{
            ele.amount = ele.amount && ele.amount!==''?decrypt(ele.amount):'';
            if(ele.ledger){
              ele.ledger.name = ele.ledger.name && ele.ledger.name!==''? decrypt(ele.ledger.name):'';
              ele.ledger.email = ele.ledger.email && ele.ledger.email!==''? decrypt(ele.ledger.email):'';
              ele.ledger.amount = ele.ledger.amount && ele.ledger.amount!==''? decrypt(ele.ledger.amount):'';
              ele.ledger.phone = ele.ledger.phone && ele.ledger.phone!==''? decrypt(ele.ledger.phone):'';
              ele.ledger.street =  ele.ledger.street && ele.ledger.street!==''?decrypt(ele.ledger.street):'';
              ele.ledger.area = ele.ledger.area && ele.ledger.area!==''? decrypt(ele.ledger.area):'';
              ele.ledger.gst_number =  ele.ledger.gst_number && ele.ledger.gst_number!==''? decrypt(ele.ledger.gst_number):'';
              ele.ledger.opening_balance =  ele.ledger.opening_balance && ele.ledger.opening_balance!==''? decrypt(ele.ledger.opening_balance):'';
              ele.ledger.cess_tax =  ele.ledger.cess_tax && ele.ledger.cess_tax!==''? decrypt(ele.ledger.cess_tax):'';
              ele.ledger.bank_name =  ele.ledger.bank_name && ele.ledger.bank_name!==''? decrypt(ele.ledger.bank_name):'';
              ele.ledger.bank_branch =  ele.ledger.bank_branch && ele.ledger.bank_branch!==''? decrypt(ele.ledger.bank_branch):'';
              ele.ledger.account_holder_name =  ele.ledger.account_holder_name && ele.ledger.account_holder_name!==''? decrypt(ele.ledger.account_holder_name):'';
              ele.ledger.ifsc =  ele.ledger.ifsc && ele.ledger.ifsc!==''? decrypt(ele.ledger.ifsc):'';
              ele.ledger.pan_number =  ele.ledger.pan_number && ele.ledger.pan_number!==''? decrypt(ele.ledger.pan_number):'';
              ele.ledger.bank_account_number =  ele.ledger.bank_account_number && ele.ledger.bank_account_number!==''? decrypt(ele.ledger.bank_account_number):'';
            }
          })
        }
    });
    return data;
  }else if(type==="object"){
   
    return data;
  }else{
    return data;
  }
};


function decrypt(text) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted =  Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}