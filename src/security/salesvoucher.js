import { decreptionPayment } from './paymentvoucher';
import { decreptionReport } from './voucherReport';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionSale = async(data) => {
  //console.log('forenc',data);
    key = crypto.createHash('sha256').update(data.data.email).digest('base64').substr(0, 32);


    data.narration =await data.narration && data.narration!==''? encrypt(data.narration).toString():'';
    data.bank_name =await data.bank_name && data.bank_name!==''?encrypt(data.bank_name).toString():'';
    data.bank_account_number =await data.bank_account_number && data.bank_account_number!==''?encrypt(data.bank_account_number).toString():'';
    data.bank_ifsc =await data.bank_ifsc && data.bank_ifsc!==''? encrypt(data.bank_ifsc).toString():'';
    data.shipping_address =await data.shipping_address && data.shipping_address!==''? encrypt(data.shipping_address).toString():'';
    data.description =await data.description && data.description!==''? encrypt(data.description).toString():'';
    data.sub_amount =await data.sub_amount && data.sub_amount!==''? encrypt(data.sub_amount.toString()).toString():'';
    data.discount =await data.discount && data.discount!==''? encrypt(data.discount.toString()).toString():'';
    data.total_amount =await data.total_amount && data.total_amount!==''? encrypt(data.total_amount.toString()).toString():'';
    return data;
};

export const decreptionSale = async(data, type, keydata) => {
  
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  
//console.log("forenc",encrypt('85248785'));
  //console.log('fordec',decrypt(data[3].bank_account_number));
  if(await type==='array'){
    
    await data.map(item=>{
        if(item.SalesLedger){
          item.SalesLedger.name = item.SalesLedger.name && item.SalesLedger.name!==''? decrypt(item.SalesLedger.name):'';
          item.SalesLedger.email = item.SalesLedger.email && item.SalesLedger.email!==''? decrypt(item.SalesLedger.email):'';
          item.SalesLedger.amount = item.SalesLedger.amount && item.SalesLedger.amount!==''? decrypt(item.SalesLedger.amount):'';
          item.SalesLedger.phone = item.SalesLedger.phone && item.SalesLedger.phone!==''? decrypt(item.SalesLedger.phone):'';
          item.SalesLedger.street =  item.SalesLedger.street && item.SalesLedger.street!==''?decrypt(item.SalesLedger.street):'';
          item.SalesLedger.area = item.SalesLedger.area && item.SalesLedger.area!==''? decrypt(item.SalesLedger.area):'';
          item.SalesLedger.gst_number =  item.SalesLedger.gst_number && item.SalesLedger.gst_number!==''? decrypt(item.SalesLedger.gst_number):'';
          item.SalesLedger.opening_balance =  item.SalesLedger.opening_balance && item.SalesLedger.opening_balance!==''? decrypt(item.SalesLedger.opening_balance):'';
          item.SalesLedger.cess_tax =  item.SalesLedger.cess_tax && item.SalesLedger.cess_tax!==''? decrypt(item.SalesLedger.cess_tax):'';
          item.SalesLedger.bank_name =  item.SalesLedger.bank_name && item.SalesLedger.bank_name!==''? decrypt(item.SalesLedger.bank_name):'';
          item.SalesLedger.bank_branch =  item.SalesLedger.bank_branch && item.SalesLedger.bank_branch!==''? decrypt(item.SalesLedger.bank_branch):'';
          item.SalesLedger.account_holder_name =  item.SalesLedger.account_holder_name && item.SalesLedger.account_holder_name!==''? decrypt(item.SalesLedger.account_holder_name):'';
          item.SalesLedger.ifsc =  item.SalesLedger.ifsc && item.SalesLedger.ifsc!==''? decrypt(item.SalesLedger.ifsc):'';
          item.SalesLedger.pan_number =  item.SalesLedger.pan_number && item.SalesLedger.pan_number!==''? decrypt(item.SalesLedger.pan_number):'';
          item.SalesLedger.bank_account_number =  item.SalesLedger.bank_account_number && item.SalesLedger.bank_account_number!==''? decrypt(item.SalesLedger.bank_account_number):'';
          item.SalesLedger.website =  item.SalesLedger.website && item.SalesLedger.website!==''? decrypt(item.SalesLedger.website):'';
          item.SalesLedger.jurisdiction =  item.SalesLedger.jurisdiction && item.SalesLedger.jurisdiction!==''? decrypt(item.SalesLedger.jurisdiction):'';
          item.SalesLedger.cin_number =  item.SalesLedger.cin_number && item.SalesLedger.cin_number!==''? decrypt(item.SalesLedger.cin_number):'';
        }

        if(item.SalesRoundoffLedger){
          item.SalesRoundoffLedger.name = item.SalesRoundoffLedger.name && item.SalesRoundoffLedger.name!==''? decrypt(item.SalesRoundoffLedger.name):'';
          item.SalesRoundoffLedger.email = item.SalesRoundoffLedger.email && item.SalesRoundoffLedger.email!==''? decrypt(item.SalesRoundoffLedger.email):'';
          item.SalesRoundoffLedger.amount = item.SalesRoundoffLedger.amount && item.SalesRoundoffLedger.amount!==''? decrypt(item.SalesRoundoffLedger.amount):'';
          item.SalesRoundoffLedger.phone = item.SalesRoundoffLedger.phone && item.SalesRoundoffLedger.phone!==''? decrypt(item.SalesRoundoffLedger.phone):'';
          item.SalesRoundoffLedger.street =  item.SalesRoundoffLedger.street && item.SalesRoundoffLedger.street!==''?decrypt(item.SalesRoundoffLedger.street):'';
          item.SalesRoundoffLedger.area = item.SalesRoundoffLedger.area && item.SalesRoundoffLedger.area!==''? decrypt(item.SalesRoundoffLedger.area):'';
          item.SalesRoundoffLedger.gst_number =  item.SalesRoundoffLedger.gst_number && item.SalesRoundoffLedger.gst_number!==''? decrypt(item.SalesRoundoffLedger.gst_number):'';
          item.SalesRoundoffLedger.opening_balance =  item.SalesRoundoffLedger.opening_balance && item.SalesRoundoffLedger.opening_balance!==''? decrypt(item.SalesRoundoffLedger.opening_balance):'';
          item.SalesRoundoffLedger.cess_tax =  item.SalesRoundoffLedger.cess_tax && item.SalesRoundoffLedger.cess_tax!==''? decrypt(item.SalesRoundoffLedger.cess_tax):'';
          item.SalesRoundoffLedger.bank_name =  item.SalesRoundoffLedger.bank_name && item.SalesRoundoffLedger.bank_name!==''? decrypt(item.SalesRoundoffLedger.bank_name):'';
          item.SalesRoundoffLedger.bank_branch =  item.SalesRoundoffLedger.bank_branch && item.SalesRoundoffLedger.bank_branch!==''? decrypt(item.SalesRoundoffLedger.bank_branch):'';
          item.SalesRoundoffLedger.account_holder_name =  item.SalesRoundoffLedger.account_holder_name && item.SalesRoundoffLedger.account_holder_name!==''? decrypt(item.SalesRoundoffLedger.account_holder_name):'';
          item.SalesRoundoffLedger.ifsc =  item.SalesRoundoffLedger.ifsc && item.SalesRoundoffLedger.ifsc!==''? decrypt(item.SalesRoundoffLedger.ifsc):'';
          item.SalesRoundoffLedger.pan_number =  item.SalesRoundoffLedger.pan_number && item.SalesRoundoffLedger.pan_number!==''? decrypt(item.SalesRoundoffLedger.pan_number):'';
          item.SalesRoundoffLedger.bank_account_number =  item.SalesRoundoffLedger.bank_account_number && item.SalesRoundoffLedger.bank_account_number!==''? decrypt(item.SalesRoundoffLedger.bank_account_number):'';

          item.SalesRoundoffLedger.website =  item.SalesRoundoffLedger.website && item.SalesRoundoffLedger.website!==''? decrypt(item.SalesRoundoffLedger.website):'';
          item.SalesRoundoffLedger.jurisdiction =  item.SalesRoundoffLedger.jurisdiction && item.SalesRoundoffLedger.jurisdiction!==''? decrypt(item.SalesRoundoffLedger.jurisdiction):'';
          item.SalesRoundoffLedger.cin_number =  item.SalesRoundoffLedger.cin_number && item.SalesRoundoffLedger.cin_number!==''? decrypt(item.SalesRoundoffLedger.cin_number):'';

        }

        if(item.SalesDiscountLedger){
          item.SalesDiscountLedger.name = item.SalesDiscountLedger.name && item.SalesDiscountLedger.name!==''? decrypt(item.SalesDiscountLedger.name):'';
          item.SalesDiscountLedger.email = item.SalesDiscountLedger.email && item.SalesDiscountLedger.email!==''? decrypt(item.SalesDiscountLedger.email):'';
          item.SalesDiscountLedger.amount = item.SalesDiscountLedger.amount && item.SalesDiscountLedger.amount!==''? decrypt(item.SalesDiscountLedger.amount):'';
          item.SalesDiscountLedger.phone = item.SalesDiscountLedger.phone && item.SalesDiscountLedger.phone!==''? decrypt(item.SalesDiscountLedger.phone):'';
          item.SalesDiscountLedger.street =  item.SalesDiscountLedger.street && item.SalesDiscountLedger.street!==''?decrypt(item.SalesDiscountLedger.street):'';
          item.SalesDiscountLedger.area = item.SalesDiscountLedger.area && item.SalesDiscountLedger.area!==''? decrypt(item.SalesDiscountLedger.area):'';
          item.SalesDiscountLedger.gst_number =  item.SalesDiscountLedger.gst_number && item.SalesDiscountLedger.gst_number!==''? decrypt(item.SalesDiscountLedger.gst_number):'';
          item.SalesDiscountLedger.opening_balance =  item.SalesDiscountLedger.opening_balance && item.SalesDiscountLedger.opening_balance!==''? decrypt(item.SalesDiscountLedger.opening_balance):'';
          item.SalesDiscountLedger.cess_tax =  item.SalesDiscountLedger.cess_tax && item.SalesDiscountLedger.cess_tax!==''? decrypt(item.SalesDiscountLedger.cess_tax):'';
          item.SalesDiscountLedger.bank_name =  item.SalesDiscountLedger.bank_name && item.SalesDiscountLedger.bank_name!==''? decrypt(item.SalesDiscountLedger.bank_name):'';
          item.SalesDiscountLedger.bank_branch =  item.SalesDiscountLedger.bank_branch && item.SalesDiscountLedger.bank_branch!==''? decrypt(item.SalesDiscountLedger.bank_branch):'';
          item.SalesDiscountLedger.account_holder_name =  item.SalesDiscountLedger.account_holder_name && item.SalesDiscountLedger.account_holder_name!==''? decrypt(item.SalesDiscountLedger.account_holder_name):'';
          item.SalesDiscountLedger.ifsc =  item.SalesDiscountLedger.ifsc && item.SalesDiscountLedger.ifsc!==''? decrypt(item.SalesDiscountLedger.ifsc):'';
          item.SalesDiscountLedger.pan_number =  item.SalesDiscountLedger.pan_number && item.SalesDiscountLedger.pan_number!==''? decrypt(item.SalesDiscountLedger.pan_number):'';
          item.SalesDiscountLedger.bank_account_number =  item.SalesDiscountLedger.bank_account_number && item.SalesDiscountLedger.bank_account_number!==''? decrypt(item.SalesDiscountLedger.bank_account_number):'';

          item.SalesDiscountLedger.website =  item.SalesDiscountLedger.website && item.SalesDiscountLedger.website!==''? decrypt(item.SalesDiscountLedger.website):'';
          item.SalesDiscountLedger.jurisdiction =  item.SalesDiscountLedger.jurisdiction && item.SalesDiscountLedger.jurisdiction!==''? decrypt(item.SalesDiscountLedger.jurisdiction):'';
          item.SalesDiscountLedger.cin_number =  item.SalesDiscountLedger.cin_number && item.SalesDiscountLedger.cin_number!==''? decrypt(item.SalesDiscountLedger.cin_number):'';

        }


        

        if(item.item_entries && item.item_entries.length>0){
          item.item_entries.map(ele=>{
            ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
            ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
            ele.hsn_code = ele.hsn_code && ele.hsn_code!==''? decrypt(ele.hsn_code):'';
            ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
            ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
            ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            if(ele.itemone){
              ele.itemone.name =ele.itemone.name && ele.itemone.name!==''? decrypt(ele.itemone.name):'';
              ele.itemone.hsn_code =ele.itemone.hsn_code && ele.itemone.hsn_code!==''? decrypt(ele.itemone.hsn_code):'';
              ele.itemone.rate =ele.itemone.rate && ele.itemone.rate!==''? decrypt(ele.itemone.rate):'';
              ele.itemone.quantity =ele.itemone.quantity && ele.itemone.quantity!==''? decrypt(ele.itemone.quantity):'';
              ele.itemone.total_value =ele.itemone.total_value && ele.itemone.total_value!==''? decrypt(ele.itemone.total_value):'';
              ele.itemone.cess_tax =ele.itemone.cess_tax && ele.itemone.cess_tax!==''? decrypt(ele.itemone.cess_tax):'';
            }
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


        if(item.voucher_entries && item.voucher_entries.length>0){
          item.voucher_entries.map(voucher=>{
            voucher.amount = voucher.amount && voucher.amount!==''?decrypt(voucher.amount):'';
            if(voucher.ledger){
              voucher.ledger.name = voucher.ledger.name && voucher.ledger.name!==''? decrypt(voucher.ledger.name):'';
              voucher.ledger.email = voucher.ledger.email && voucher.ledger.email!==''? decrypt(voucher.ledger.email):'';
              voucher.ledger.amount = voucher.ledger.amount && voucher.ledger.amount!==''? decrypt(voucher.ledger.amount):'';
              voucher.ledger.phone = voucher.ledger.phone && voucher.ledger.phone!==''? decrypt(voucher.ledger.phone):'';
              voucher.ledger.street =  voucher.ledger.street && voucher.ledger.street!==''?decrypt(voucher.ledger.street):'';
              voucher.ledger.area = voucher.ledger.area && voucher.ledger.area!==''? decrypt(voucher.ledger.area):'';
              voucher.ledger.gst_number =  voucher.ledger.gst_number && voucher.ledger.gst_number!==''? decrypt(voucher.ledger.gst_number):'';
              voucher.ledger.opening_balance =  voucher.ledger.opening_balance && voucher.ledger.opening_balance!==''? decrypt(voucher.ledger.opening_balance):'';
              voucher.ledger.cess_tax =  voucher.ledger.cess_tax && voucher.ledger.cess_tax!==''? decrypt(voucher.ledger.cess_tax):'';
              voucher.ledger.bank_name =  voucher.ledger.bank_name && voucher.ledger.bank_name!==''? decrypt(voucher.ledger.bank_name):'';
              voucher.ledger.bank_branch =  voucher.ledger.bank_branch && voucher.ledger.bank_branch!==''? decrypt(voucher.ledger.bank_branch):'';
              voucher.ledger.account_holder_name =  voucher.ledger.account_holder_name && voucher.ledger.account_holder_name!==''? decrypt(voucher.ledger.account_holder_name):'';
              voucher.ledger.ifsc =  voucher.ledger.ifsc && voucher.ledger.ifsc!==''? decrypt(voucher.ledger.ifsc):'';
              voucher.ledger.pan_number =  voucher.ledger.pan_number && voucher.ledger.pan_number!==''? decrypt(voucher.ledger.pan_number):'';
              voucher.ledger.bank_account_number =  voucher.ledger.bank_account_number && voucher.ledger.bank_account_number!==''? decrypt(voucher.ledger.bank_account_number):'';
            }
          })
        }



        if(item.tax){
          if(item.tax.SalesLedger){
            item.tax.SalesLedger.name = item.tax.SalesLedger.name && item.tax.SalesLedger.name!==''? decrypt(item.tax.SalesLedger.name):'';
            item.tax.SalesLedger.email = item.tax.SalesLedger.email && item.tax.SalesLedger.email!==''? decrypt(item.tax.SalesLedger.email):'';
            item.tax.SalesLedger.amount = item.tax.SalesLedger.amount && item.tax.SalesLedger.amount!==''? decrypt(item.tax.SalesLedger.amount):'';
            item.tax.SalesLedger.phone = item.tax.SalesLedger.phone && item.tax.SalesLedger.phone!==''? decrypt(item.tax.SalesLedger.phone):'';
            item.tax.SalesLedger.street =  item.tax.SalesLedger.street && item.tax.SalesLedger.street!==''?decrypt(item.tax.SalesLedger.street):'';
            item.tax.SalesLedger.area = item.tax.SalesLedger.area && item.tax.SalesLedger.area!==''? decrypt(item.tax.SalesLedger.area):'';
            item.tax.SalesLedger.gst_number =  item.tax.SalesLedger.gst_number && item.tax.SalesLedger.gst_number!==''? decrypt(item.tax.SalesLedger.gst_number):'';
            item.tax.SalesLedger.opening_balance =  item.tax.SalesLedger.opening_balance && item.tax.SalesLedger.opening_balance!==''? decrypt(item.tax.SalesLedger.opening_balance):'';
            item.tax.SalesLedger.cess_tax =  item.tax.SalesLedger.cess_tax && item.tax.SalesLedger.cess_tax!==''? decrypt(item.tax.SalesLedger.cess_tax):'';
            item.tax.SalesLedger.bank_name =  item.tax.SalesLedger.bank_name && item.tax.SalesLedger.bank_name!==''? decrypt(item.tax.SalesLedger.bank_name):'';
            item.tax.SalesLedger.bank_branch =  item.tax.SalesLedger.bank_branch && item.tax.SalesLedger.bank_branch!==''? decrypt(item.tax.SalesLedger.bank_branch):'';
            item.tax.SalesLedger.account_holder_name =  item.tax.SalesLedger.account_holder_name && item.tax.SalesLedger.account_holder_name!==''? decrypt(item.tax.SalesLedger.account_holder_name):'';
            item.tax.SalesLedger.ifsc =  item.tax.SalesLedger.ifsc && item.tax.SalesLedger.ifsc!==''? decrypt(item.tax.SalesLedger.ifsc):'';
            item.tax.SalesLedger.pan_number =  item.tax.SalesLedger.pan_number && item.tax.SalesLedger.pan_number!==''? decrypt(item.tax.SalesLedger.pan_number):'';
            item.tax.SalesLedger.bank_account_number =  item.tax.SalesLedger.bank_account_number && item.tax.SalesLedger.bank_account_number!==''? decrypt(item.tax.SalesLedger.bank_account_number):'';

            item.tax.SalesLedger.website =   item.tax.SalesLedger.website && item.tax.SalesLedger.website!==''? decrypt(item.tax.SalesLedger.website):'';
            item.tax.SalesLedger.jurisdiction =   item.tax.SalesLedger.jurisdiction && item.tax.SalesLedger.jurisdiction!==''? decrypt(item.tax.SalesLedger.jurisdiction):'';
            item.tax.SalesLedger.cin_number =   item.tax.SalesLedger.cin_number &&  item.tax.SalesLedger.cin_number!==''? decrypt(item.tax.SalesLedger.cin_number):'';
            
          }
          item.tax.amount = item.tax.amount && item.tax.amount!==''? decrypt(item.tax.amount):'';
          item.tax.narration = item.tax.narration && item.tax.narration!==''? decrypt(item.tax.narration):'';
          item.tax.bank_name = item.tax.bank_name && item.tax.bank_name!==''? decrypt(item.tax.bank_name):'';
          item.tax.bank_account_number = item.tax.bank_account_number && item.tax.bank_account_number!==''? decrypt(item.tax.bank_account_number):'';
          item.tax.bank_ifsc = item.tax.bank_ifsc && item.tax.bank_ifsc!==''? decrypt(item.tax.bank_ifsc):'';
          item.tax.shipping_address = item.tax.shipping_address && item.tax.shipping_address!==''? decrypt(item.tax.shipping_address):'';
          item.tax.sub_amount = item.tax.sub_amount && item.tax.sub_amount!==''? decrypt(item.tax.sub_amount):'';
          item.tax.discount = item.tax.discount && item.tax.discount!==''? decrypt(item.tax.discount):'';
          item.tax.total_amount = item.tax.total_amount && item.tax.total_amount!==''? decrypt(item.tax.total_amount):'';
        } 

        if(item.Vouchers){
          if(item.Vouchers.SalesLedger){
            item.Vouchers.SalesLedger.name = item.Vouchers.SalesLedger.name && item.Vouchers.SalesLedger.name!==''? decrypt(item.Vouchers.SalesLedger.name):'';
            item.Vouchers.SalesLedger.email = item.Vouchers.SalesLedger.email && item.Vouchers.SalesLedger.email!==''? decrypt(item.Vouchers.SalesLedger.email):'';
            item.Vouchers.SalesLedger.amount = item.Vouchers.SalesLedger.amount && item.Vouchers.SalesLedger.amount!==''? decrypt(item.Vouchers.SalesLedger.amount):'';
            item.Vouchers.SalesLedger.phone = item.Vouchers.SalesLedger.phone && item.Vouchers.SalesLedger.phone!==''? decrypt(item.Vouchers.SalesLedger.phone):'';
            item.Vouchers.SalesLedger.street =  item.Vouchers.SalesLedger.street && item.Vouchers.SalesLedger.street!==''?decrypt(item.Vouchers.SalesLedger.street):'';
            item.Vouchers.SalesLedger.area = item.Vouchers.SalesLedger.area && item.Vouchers.SalesLedger.area!==''? decrypt(item.Vouchers.SalesLedger.area):'';
            item.Vouchers.SalesLedger.gst_number =  item.Vouchers.SalesLedger.gst_number && item.Vouchers.SalesLedger.gst_number!==''? decrypt(item.Vouchers.SalesLedger.gst_number):'';
            item.Vouchers.SalesLedger.opening_balance =  item.Vouchers.SalesLedger.opening_balance && item.Vouchers.SalesLedger.opening_balance!==''? decrypt(item.Vouchers.SalesLedger.opening_balance):'';
            item.Vouchers.SalesLedger.cess_Vouchers =  item.Vouchers.SalesLedger.cess_Vouchers && item.Vouchers.SalesLedger.cess_Vouchers!==''? decrypt(item.Vouchers.SalesLedger.cess_Vouchers):'';
            item.Vouchers.SalesLedger.bank_name =  item.Vouchers.SalesLedger.bank_name && item.Vouchers.SalesLedger.bank_name!==''? decrypt(item.Vouchers.SalesLedger.bank_name):'';
            item.Vouchers.SalesLedger.bank_branch =  item.Vouchers.SalesLedger.bank_branch && item.Vouchers.SalesLedger.bank_branch!==''? decrypt(item.Vouchers.SalesLedger.bank_branch):'';
            item.Vouchers.SalesLedger.account_holder_name =  item.Vouchers.SalesLedger.account_holder_name && item.Vouchers.SalesLedger.account_holder_name!==''? decrypt(item.Vouchers.SalesLedger.account_holder_name):'';
            item.Vouchers.SalesLedger.ifsc =  item.Vouchers.SalesLedger.ifsc && item.Vouchers.SalesLedger.ifsc!==''? decrypt(item.Vouchers.SalesLedger.ifsc):'';
            item.Vouchers.SalesLedger.pan_number =  item.Vouchers.SalesLedger.pan_number && item.Vouchers.SalesLedger.pan_number!==''? decrypt(item.Vouchers.SalesLedger.pan_number):'';
            item.Vouchers.SalesLedger.bank_account_number =  item.Vouchers.SalesLedger.bank_account_number && item.Vouchers.SalesLedger.bank_account_number!==''? decrypt(item.Vouchers.SalesLedger.bank_account_number):'';

            item.Vouchers.SalesLedger.website =   item.Vouchers.SalesLedger.website && item.Vouchers.SalesLedger.website!==''? decrypt(item.Vouchers.SalesLedger.website):'';
            item.Vouchers.SalesLedger.jurisdiction =   item.Vouchers.SalesLedger.jurisdiction && item.Vouchers.SalesLedger.jurisdiction!==''? decrypt(item.Vouchers.SalesLedger.jurisdiction):'';
            item.Vouchers.SalesLedger.cin_number =   item.Vouchers.SalesLedger.cin_number &&  item.Vouchers.SalesLedger.cin_number!==''? decrypt(item.Vouchers.SalesLedger.cin_number):'';
          }
          if(item.Vouchers.item_entries && item.Vouchers.item_entries.length>0){
            item.Vouchers.item_entries.map(ele=>{
              ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
              ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
              ele.hsn_code = ele.hsn_code && ele.hsn_code!==''? decrypt(ele.hsn_code):'';
              ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
              ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
              ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            })
          }

          if(item.Vouchers.tax_entries && item.Vouchers.tax_entries.length>0){
            item.Vouchers.tax_entries.map(ele=>{
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

                ele.ledger.website =   ele.ledger.website && ele.ledger.website!==''? decrypt(ele.ledger.website):'';
                ele.ledger.jurisdiction =   ele.ledger.jurisdiction && ele.ledger.jurisdiction!==''? decrypt(ele.ledger.jurisdiction):'';
                ele.ledger.cin_number =   ele.ledger.cin_number &&  ele.ledger.cin_number!==''? decrypt(ele.ledger.cin_number):'';
              
              }
            })
          }


          item.Vouchers.amount = item.Vouchers.amount && item.Vouchers.amount!==''? decrypt(item.Vouchers.amount):null;
          item.Vouchers.narration = item.Vouchers.narration && item.Vouchers.narration!==''? decrypt(item.Vouchers.narration):'';
          item.Vouchers.bank_name = item.Vouchers.bank_name && item.Vouchers.bank_name!==''? decrypt(item.Vouchers.bank_name):'';
          item.Vouchers.bank_account_number = item.Vouchers.bank_account_number && item.Vouchers.bank_account_number!==''? decrypt(item.Vouchers.bank_account_number):'';
          item.Vouchers.bank_ifsc = item.Vouchers.bank_ifsc && item.Vouchers.bank_ifsc!==''? decrypt(item.Vouchers.bank_ifsc):'';
          item.Vouchers.shipping_address = item.Vouchers.shipping_address && item.Vouchers.shipping_address!==''? decrypt(item.Vouchers.shipping_address):'';
          item.Vouchers.sub_amount = item.Vouchers.sub_amount && item.Vouchers.sub_amount!==''? decrypt(item.Vouchers.sub_amount):'';
          item.Vouchers.discount = item.Vouchers.discount && item.Vouchers.discount!==''? decrypt(item.Vouchers.discount):'';
          item.Vouchers.total_amount = item.Vouchers.total_amount && item.Vouchers.total_amount!==''? decrypt(item.Vouchers.total_amount):'';
        } 

        if(item.Voucheris){
          if(item.Voucheris.SalesLedger){
            item.Voucheris.SalesLedger.name = item.Voucheris.SalesLedger.name && item.Voucheris.SalesLedger.name!==''? decrypt(item.Voucheris.SalesLedger.name):'';
            item.Voucheris.SalesLedger.email = item.Voucheris.SalesLedger.email && item.Voucheris.SalesLedger.email!==''? decrypt(item.Voucheris.SalesLedger.email):'';
            item.Voucheris.SalesLedger.amount = item.Voucheris.SalesLedger.amount && item.Voucheris.SalesLedger.amount!==''? decrypt(item.Voucheris.SalesLedger.amount):'';
            item.Voucheris.SalesLedger.phone = item.Voucheris.SalesLedger.phone && item.Voucheris.SalesLedger.phone!==''? decrypt(item.Voucheris.SalesLedger.phone):'';
            item.Voucheris.SalesLedger.street =  item.Voucheris.SalesLedger.street && item.Voucheris.SalesLedger.street!==''?decrypt(item.Voucheris.SalesLedger.street):'';
            item.Voucheris.SalesLedger.area = item.Voucheris.SalesLedger.area && item.Voucheris.SalesLedger.area!==''? decrypt(item.Voucheris.SalesLedger.area):'';
            item.Voucheris.SalesLedger.gst_number =  item.Voucheris.SalesLedger.gst_number && item.Voucheris.SalesLedger.gst_number!==''? decrypt(item.Voucheris.SalesLedger.gst_number):'';
            item.Voucheris.SalesLedger.opening_balance =  item.Voucheris.SalesLedger.opening_balance && item.Voucheris.SalesLedger.opening_balance!==''? decrypt(item.Voucheris.SalesLedger.opening_balance):'';
            item.Voucheris.SalesLedger.cess_Vouchers =  item.Voucheris.SalesLedger.cess_Vouchers && item.Voucheris.SalesLedger.cess_Vouchers!==''? decrypt(item.Voucheris.SalesLedger.cess_Vouchers):'';
            item.Voucheris.SalesLedger.bank_name =  item.Voucheris.SalesLedger.bank_name && item.Voucheris.SalesLedger.bank_name!==''? decrypt(item.Voucheris.SalesLedger.bank_name):'';
            item.Voucheris.SalesLedger.bank_branch =  item.Voucheris.SalesLedger.bank_branch && item.Voucheris.SalesLedger.bank_branch!==''? decrypt(item.Voucheris.SalesLedger.bank_branch):'';
            item.Voucheris.SalesLedger.account_holder_name =  item.Voucheris.SalesLedger.account_holder_name && item.Voucheris.SalesLedger.account_holder_name!==''? decrypt(item.Voucheris.SalesLedger.account_holder_name):'';
            item.Voucheris.SalesLedger.ifsc =  item.Voucheris.SalesLedger.ifsc && item.Voucheris.SalesLedger.ifsc!==''? decrypt(item.Voucheris.SalesLedger.ifsc):'';
            item.Voucheris.SalesLedger.pan_number =  item.Voucheris.SalesLedger.pan_number && item.Voucheris.SalesLedger.pan_number!==''? decrypt(item.Voucheris.SalesLedger.pan_number):'';
            item.Voucheris.SalesLedger.bank_account_number =  item.Voucheris.SalesLedger.bank_account_number && item.Voucheris.SalesLedger.bank_account_number!==''? decrypt(item.Voucheris.SalesLedger.bank_account_number):'';

            item.Voucheris.SalesLedger.website =   item.Voucheris.SalesLedger.website && item.Voucheris.SalesLedger.website!==''? decrypt(item.Voucheris.SalesLedger.website):'';
            item.Voucheris.SalesLedger.jurisdiction =   item.Voucheris.SalesLedger.jurisdiction && item.Voucheris.SalesLedger.jurisdiction!==''? decrypt(item.Voucheris.SalesLedger.jurisdiction):'';
            item.Voucheris.SalesLedger.cin_number =   item.Voucheris.SalesLedger.cin_number &&  item.Voucheris.SalesLedger.cin_number!==''? decrypt(item.Voucheris.SalesLedger.cin_number):'';
          }

          item.Voucheris.amount = item.Voucheris.amount && item.Voucheris.amount!==''? decrypt(item.Voucheris.amount):null;
          item.Voucheris.narration = item.Voucheris.narration && item.Voucheris.narration!==''? decrypt(item.Voucheris.narration):'';
          item.Voucheris.bank_name = item.Voucheris.bank_name && item.Voucheris.bank_name!==''? decrypt(item.Voucheris.bank_name):'';
          item.Voucheris.bank_account_number = item.Voucheris.bank_account_number && item.Voucheris.bank_account_number!==''? decrypt(item.Voucheris.bank_account_number):'';
          item.Voucheris.bank_ifsc = item.Voucheris.bank_ifsc && item.Voucheris.bank_ifsc!==''? decrypt(item.Voucheris.bank_ifsc):'';
          item.Voucheris.shipping_address = item.Voucheris.shipping_address && item.Voucheris.shipping_address!==''? decrypt(item.Voucheris.shipping_address):'';
          item.Voucheris.sub_amount = item.Voucheris.sub_amount && item.Voucheris.sub_amount!==''? decrypt(item.Voucheris.sub_amount):'';
          item.Voucheris.discount = item.Voucheris.discount && item.Voucheris.discount!==''? decrypt(item.Voucheris.discount):'';
          item.Voucheris.total_amount = item.Voucheris.total_amount && item.Voucheris.total_amount!==''? decrypt(item.Voucheris.total_amount):'';
        } 
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.model = item.model && item.model!==''? decrypt(item.model):'';
        item.hsn_code =  item.hsn_code && item.hsn_code!==''?decrypt(item.hsn_code):'';
        item.price = item.price && item.price!==''? decrypt(item.price):'';
        item.total_value =item.total_value && item.total_value!==''? decrypt(item.total_value):'';
        item.rate =  item.rate && item.rate!==''? decrypt(item.rate):'';



        if(item.ledger){
          item.ledger.name = item.ledger.name && item.ledger.name!==''? decrypt(item.ledger.name):'';
          item.ledger.email = item.ledger.email && item.ledger.email!==''? decrypt(item.ledger.email):'';
          item.ledger.amount = item.ledger.amount && item.ledger.amount!==''? decrypt(item.ledger.amount):'';
          item.ledger.phone = item.ledger.phone && item.ledger.phone!==''? decrypt(item.ledger.phone):'';
          item.ledger.street =  item.ledger.street && item.ledger.street!==''?decrypt(item.ledger.street):'';
          item.ledger.area = item.ledger.area && item.ledger.area!==''? decrypt(item.ledger.area):'';
          item.ledger.gst_number =  item.ledger.gst_number && item.ledger.gst_number!==''? decrypt(item.ledger.gst_number):'';
          item.ledger.opening_balance =  item.ledger.opening_balance && item.ledger.opening_balance!==''? decrypt(item.ledger.opening_balance):'';
          item.ledger.cess_Vouchers =  item.ledger.cess_Vouchers && item.ledger.cess_Vouchers!==''? decrypt(item.ledger.cess_Vouchers):'';
          item.ledger.bank_name =  item.ledger.bank_name && item.ledger.bank_name!==''? decrypt(item.ledger.bank_name):'';
          item.ledger.bank_branch =  item.ledger.bank_branch && item.ledger.bank_branch!==''? decrypt(item.ledger.bank_branch):'';
          item.ledger.account_holder_name =  item.ledger.account_holder_name && item.ledger.account_holder_name!==''? decrypt(item.ledger.account_holder_name):'';
          item.ledger.ifsc =  item.ledger.ifsc && item.ledger.ifsc!==''? decrypt(item.ledger.ifsc):'';
          item.ledger.pan_number =  item.ledger.pan_number && item.ledger.pan_number!==''? decrypt(item.ledger.pan_number):'';
          item.ledger.bank_account_number =  item.ledger.bank_account_number && item.ledger.bank_account_number!==''? decrypt(item.ledger.bank_account_number):'';  

          item.ledger.website =   item.ledger.website && item.ledger.website!==''? decrypt(item.ledger.website):'';
          item.ledger.jurisdiction =   item.ledger.jurisdiction && item.ledger.jurisdiction!==''? decrypt(item.ledger.jurisdiction):'';
          item.ledger.cin_number =   item.ledger.cin_number &&  item.ledger.cin_number!==''? decrypt(item.ledger.cin_number):'';
        }

        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';

        // if(item.voucherInteries && item.voucherInteries.length>0){
        //   item.voucherInteries.map(voucher=>{
        //     voucher.
        //   })
        // }

        if(item.company){
            item.company.company_name = item.company.company_name && item.company.company_name!==''?decrypt(item.company.company_name):'';
            item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number!==''?decrypt(item.company.company_pan_number):'';
            item.company.gst_number = item.company.gst_number && item.company.gst_number!==''?decrypt(item.company.gst_number):'';
            item.company.street = item.company.street && item.company.street!==''?decrypt(item.company.street):'';
            item.company.area = item.company.area && item.company.area!==''?decrypt(item.company.area):'';
            item.company.company_logo = item.company.company_logo && item.company.company_logo!==''?decrypt(item.company.company_logo):'';
        }

        item.narration = item.narration && item.narration!==''? decrypt(item.narration):'';
        item.bank_name = item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_account_number = item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.bank_ifsc = item.bank_ifsc && item.bank_ifsc!==''? decrypt(item.bank_ifsc):'';
        item.shipping_address =  item.shipping_address && item.shipping_address!==''?decrypt(item.shipping_address):'';
        // item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.sub_amount =  item.sub_amount && item.sub_amount!==''? decrypt(item.sub_amount):'';
        item.discount =  item.discount && item.discount!==''? decrypt(item.discount):'';
        item.total_amount =  item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
    });
    return data;
  }else if(type==="object"){
    if( data.dataValues.SalesLedger){
       data.dataValues.SalesLedger.name =  data.dataValues.SalesLedger.name &&  data.dataValues.SalesLedger.name!==''?decrypt( data.dataValues.SalesLedger.name):'';
       data.dataValues.SalesLedger.amount =  data.dataValues.SalesLedger.amount &&  data.dataValues.SalesLedger.amount!==''?decrypt( data.dataValues.SalesLedger.amount):'';
       data.dataValues.SalesLedger.opening_balance =  data.dataValues.SalesLedger.opening_balance &&  data.dataValues.SalesLedger.opening_balance!==''?decrypt( data.dataValues.SalesLedger.opening_balance):'';
       data.dataValues.SalesLedger.account_holder_name =  data.dataValues.SalesLedger.account_holder_name &&  data.dataValues.SalesLedger.account_holder_name!==''?decrypt( data.dataValues.SalesLedger.account_holder_name):'';
       data.dataValues.SalesLedger.bank_account_number =  data.dataValues.SalesLedger.bank_account_number &&  data.dataValues.SalesLedger.bank_account_number!==''?decrypt( data.dataValues.SalesLedger.bank_account_number):'';
       data.dataValues.SalesLedger.bank_branch =  data.dataValues.SalesLedger.bank_branch &&  data.dataValues.SalesLedger.bank_branch!==''?decrypt( data.dataValues.SalesLedger.bank_branch):'';
       data.dataValues.SalesLedger.bank_name =  data.dataValues.SalesLedger.bank_name &&  data.dataValues.SalesLedger.bank_name!==''?decrypt( data.dataValues.SalesLedger.bank_name):'';

       data.dataValues.SalesLedger.website =   data.dataValues.SalesLedger.website && data.dataValues.SalesLedger.website!==''? decrypt(data.dataValues.SalesLedger.website):'';
       data.dataValues.SalesLedger.jurisdiction =   data.dataValues.SalesLedger.jurisdiction && data.dataValues.SalesLedger.jurisdiction!==''? decrypt(data.dataValues.SalesLedger.jurisdiction):'';
       data.dataValues.SalesLedger.cin_number =   data.dataValues.SalesLedger.cin_number &&  data.dataValues.SalesLedger.cin_number!==''? decrypt(data.dataValues.SalesLedger.cin_number):'';
  }
  
  if( data.dataValues.company){
       data.dataValues.company.company_name =  data.dataValues.company.company_name &&  data.dataValues.company.company_name!==''?decrypt( data.dataValues.company.company_name):'';
       data.dataValues.company.company_pan_number =  data.dataValues.company.company_pan_number &&  data.dataValues.company.company_pan_number!==''?decrypt( data.dataValues.company.company_pan_number):'';
       data.dataValues.company.gst_number =  data.dataValues.company.gst_number &&  data.dataValues.company.gst_number!==''?decrypt( data.dataValues.company.gst_number):'';
       data.dataValues.company.street =  data.dataValues.company.street &&  data.dataValues.company.street!==''?decrypt( data.dataValues.company.street):'';
       data.dataValues.company.area =  data.dataValues.company.area &&  data.dataValues.company.area!==''?decrypt( data.dataValues.company.area):'';
       data.dataValues.company.company_logo =  data.dataValues.company.company_logo &&  data.dataValues.company.company_logo!==''?decrypt( data.dataValues.company.company_logo):'';
  }
  if(data.dataValues.item_entries && data.dataValues.item_entries.length>0){
    data.dataValues.item_entries.map(it=>{
      it.quantity = it.quantity && it.quantity!==''?decrypt(it.quantity):'';
      it.name = it.name && it.name!==''?decrypt(it.name):'';
      it.description = it.description && it.description!==''?decrypt(it.description):'';
      it.model = it.model && it.model!==''?decrypt(it.model):'';
      it.hsn_code = it.hsn_code && it.hsn_code!==''?decrypt(it.hsn_code):'';
      it.price = it.price && it.price!==''?decrypt(it.price):'';
      it.discount = it.discount && it.discount!==''?decrypt(it.discount):'';
      it.total_amount = it.total_amount && it.total_amount!==''?decrypt(it.total_amount):'';
    })
  }
  if(data.dataValues.tax_entries && data.dataValues.tax_entries.length>0){
    data.dataValues.tax_entries.map(tax=>{
      tax.amount = tax.amount && tax.amount!==''?decrypt(tax.amount):'';
      if(tax.ledger){
        tax.ledger.name = tax.ledger.name &&  tax.ledger.name!==''?decrypt( tax.ledger.name):'';
        tax.ledger.amount =  tax.ledger.amount &&  tax.ledger.amount!==''?decrypt( tax.ledger.amount):'';
        tax.ledger.opening_balance =  tax.ledger.opening_balance &&  tax.ledger.opening_balance!==''?decrypt( tax.ledger.opening_balance):'';

        tax.ledger.account_holder_name =  tax.ledger.account_holder_name &&  tax.ledger.account_holder_name!==''?decrypt( tax.ledger.account_holder_name):'';
        tax.ledger.bank_account_number =  tax.ledger.bank_account_number &&  tax.ledger.bank_account_number!==''?decrypt( tax.ledger.bank_account_number):'';
        tax.ledger.bank_branch =  tax.ledger.bank_branch &&  tax.ledger.bank_branch!==''?decrypt( tax.ledger.bank_branch):'';
        tax.ledger.bank_name =  tax.ledger.bank_name &&  tax.ledger.bank_name!==''?decrypt( tax.ledger.bank_name):'';

        tax.ledger.website =  tax.ledger.website && tax.ledger.website!==''? decrypt(tax.ledger.website):'';
        tax.ledger.jurisdiction = tax.ledger.jurisdiction && tax.ledger.jurisdiction!==''? decrypt(tax.ledger.jurisdiction):'';
        tax.ledger.cin_number = tax.ledger.cin_number && tax.ledger.cin_number!==''? decrypt(tax.ledger.cin_number):'';
      }
      // it.total_amount = it.total_amount && it.total_amount!==''?decrypt(it.total_amount):'';
    })
  }
  if(data.dataValues.voucher_entries && data.dataValues.voucher_entries.length>0){
    data.dataValues.voucher_entries.map(voucher=>{
      voucher.amount = voucher.amount && voucher.amount!==''?decrypt(voucher.amount):'';
    })
  }
  



    data.dataValues.narration =data.dataValues.narration && data.dataValues.narration!==''? decrypt(data.dataValues.narration):'';
    data.dataValues.bank_name =data.dataValues.bank_name && data.dataValues.bank_name!==''? decrypt(data.dataValues.bank_name):'';
    data.dataValues.bank_account_number =data.dataValues.bank_account_number && data.dataValues.bank_account_number!==''? decrypt(data.dataValues.bank_account_number):'';
    data.dataValues.bank_ifsc =data.dataValues.bank_ifsc && data.dataValues.bank_ifsc!==''? decrypt(data.dataValues.bank_ifsc):'';
    data.dataValues.shipping_address =data.dataValues.shipping_address && data.dataValues.shipping_address!==''? decrypt(data.dataValues.shipping_address):'';
    data.dataValues.description =data.dataValues.description && data.dataValues.description!==''? decrypt(data.dataValues.description):'';
    data.dataValues.sub_amount =data.dataValues.sub_amount && data.dataValues.sub_amount!==''?  decrypt(data.dataValues.sub_amount):'';
    data.dataValues.discount =data.dataValues.discount && data.dataValues.discount!==''?  decrypt(data.dataValues.discount):'';
    data.dataValues.total_amount =data.dataValues.total_amount && data.dataValues.total_amount!==''?  decrypt(data.dataValues.total_amount):'';
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