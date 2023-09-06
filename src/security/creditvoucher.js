const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionCredit = async(data) => {
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

export const decreptionCredit = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{

        if(item.CreditBuyer){
          item.CreditBuyer.name = item.CreditBuyer.name && item.CreditBuyer.name!==''? decrypt(item.CreditBuyer.name):'';
          item.CreditBuyer.email = item.CreditBuyer.email && item.CreditBuyer.email!==''? decrypt(item.CreditBuyer.email):'';
          item.CreditBuyer.amount = item.CreditBuyer.amount && item.CreditBuyer.amount!==''? decrypt(item.CreditBuyer.amount):'';
          item.CreditBuyer.phone = item.CreditBuyer.phone && item.CreditBuyer.phone!==''? decrypt(item.CreditBuyer.phone):'';
          item.CreditBuyer.street =  item.CreditBuyer.street && item.CreditBuyer.street!==''?decrypt(item.CreditBuyer.street):'';
          item.CreditBuyer.area = item.CreditBuyer.area && item.CreditBuyer.area!==''? decrypt(item.CreditBuyer.area):'';
          item.CreditBuyer.gst_number =  item.CreditBuyer.gst_number && item.CreditBuyer.gst_number!==''? decrypt(item.CreditBuyer.gst_number):'';
          item.CreditBuyer.opening_balance =  item.CreditBuyer.opening_balance && item.CreditBuyer.opening_balance!==''? decrypt(item.CreditBuyer.opening_balance):'';
          item.CreditBuyer.cess_tax =  item.CreditBuyer.cess_tax && item.CreditBuyer.cess_tax!==''? decrypt(item.CreditBuyer.cess_tax):'';
          item.CreditBuyer.bank_name =  item.CreditBuyer.bank_name && item.CreditBuyer.bank_name!==''? decrypt(item.CreditBuyer.bank_name):'';
          item.CreditBuyer.bank_branch =  item.CreditBuyer.bank_branch && item.CreditBuyer.bank_branch!==''? decrypt(item.CreditBuyer.bank_branch):'';
          item.CreditBuyer.account_holder_name =  item.CreditBuyer.account_holder_name && item.CreditBuyer.account_holder_name!==''? decrypt(item.CreditBuyer.account_holder_name):'';
          item.CreditBuyer.ifsc =  item.CreditBuyer.ifsc && item.CreditBuyer.ifsc!==''? decrypt(item.CreditBuyer.ifsc):'';
          item.CreditBuyer.pan_number =  item.CreditBuyer.pan_number && item.CreditBuyer.pan_number!==''? decrypt(item.CreditBuyer.pan_number):'';
          item.CreditBuyer.bank_account_number =  item.CreditBuyer.bank_account_number && item.CreditBuyer.bank_account_number!==''? decrypt(item.CreditBuyer.bank_account_number):'';

          item.CreditBuyer.website =  item.CreditBuyer.website && item.CreditBuyer.website!==''? decrypt(item.CreditBuyer.website):'';
          item.CreditBuyer.jurisdiction = item.CreditBuyer.jurisdiction && item.CreditBuyer.jurisdiction!==''? decrypt(item.CreditBuyer.jurisdiction):'';
          item.CreditBuyer.cin_number = item.CreditBuyer.cin_number && item.CreditBuyer.cin_number!==''? decrypt(item.CreditBuyer.cin_number):'';
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

        if(item.CreditDiscountLedger){
          item.CreditDiscountLedger.name = item.CreditDiscountLedger.name && item.CreditDiscountLedger.name!==''? decrypt(item.CreditDiscountLedger.name):'';
          item.CreditDiscountLedger.email = item.CreditDiscountLedger.email && item.CreditDiscountLedger.email!==''? decrypt(item.CreditDiscountLedger.email):'';
          item.CreditDiscountLedger.amount = item.CreditDiscountLedger.amount && item.CreditDiscountLedger.amount!==''? decrypt(item.CreditDiscountLedger.amount):'';
          item.CreditDiscountLedger.phone = item.CreditDiscountLedger.phone && item.CreditDiscountLedger.phone!==''? decrypt(item.CreditDiscountLedger.phone):'';
          item.CreditDiscountLedger.street =  item.CreditDiscountLedger.street && item.CreditDiscountLedger.street!==''?decrypt(item.CreditDiscountLedger.street):'';
          item.CreditDiscountLedger.area = item.CreditDiscountLedger.area && item.CreditDiscountLedger.area!==''? decrypt(item.CreditDiscountLedger.area):'';
          item.CreditDiscountLedger.gst_number =  item.CreditDiscountLedger.gst_number && item.CreditDiscountLedger.gst_number!==''? decrypt(item.CreditDiscountLedger.gst_number):'';
          item.CreditDiscountLedger.opening_balance =  item.CreditDiscountLedger.opening_balance && item.CreditDiscountLedger.opening_balance!==''? decrypt(item.CreditDiscountLedger.opening_balance):'';
          item.CreditDiscountLedger.cess_tax =  item.CreditDiscountLedger.cess_tax && item.CreditDiscountLedger.cess_tax!==''? decrypt(item.CreditDiscountLedger.cess_tax):'';
          item.CreditDiscountLedger.bank_name =  item.CreditDiscountLedger.bank_name && item.CreditDiscountLedger.bank_name!==''? decrypt(item.CreditDiscountLedger.bank_name):'';
          item.CreditDiscountLedger.bank_branch =  item.CreditDiscountLedger.bank_branch && item.CreditDiscountLedger.bank_branch!==''? decrypt(item.CreditDiscountLedger.bank_branch):'';
          item.CreditDiscountLedger.account_holder_name =  item.CreditDiscountLedger.account_holder_name && item.CreditDiscountLedger.account_holder_name!==''? decrypt(item.CreditDiscountLedger.account_holder_name):'';
          item.CreditDiscountLedger.ifsc =  item.CreditDiscountLedger.ifsc && item.CreditDiscountLedger.ifsc!==''? decrypt(item.CreditDiscountLedger.ifsc):'';
          item.CreditDiscountLedger.pan_number =  item.CreditDiscountLedger.pan_number && item.CreditDiscountLedger.pan_number!==''? decrypt(item.CreditDiscountLedger.pan_number):'';
          item.CreditDiscountLedger.bank_account_number =  item.CreditDiscountLedger.bank_account_number && item.CreditDiscountLedger.bank_account_number!==''? decrypt(item.CreditDiscountLedger.bank_account_number):'';

          item.CreditDiscountLedger.website =  item.CreditDiscountLedger.website && item.CreditDiscountLedger.website!==''? decrypt(item.CreditDiscountLedger.website):'';
          item.CreditDiscountLedger.jurisdiction =  item.CreditDiscountLedger.jurisdiction && item.CreditDiscountLedger.jurisdiction!==''? decrypt(item.CreditDiscountLedger.jurisdiction):'';
          item.CreditDiscountLedger.cin_number =  item.CreditDiscountLedger.cin_number && item.CreditDiscountLedger.cin_number!==''? decrypt(item.CreditDiscountLedger.cin_number):'';

        }

        if(item.company){
            item.company.company_name = item.company.company_name && item.company.company_name!==''?decrypt(item.company.company_name):'';
            item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number!==''?decrypt(item.company.company_pan_number):'';
            item.company.gst_number = item.company.gst_number && item.company.gst_number!==''?decrypt(item.company.gst_number):'';
            item.company.street = item.company.street && item.company.street!==''?decrypt(item.company.street):'';
            item.company.area = item.company.area && item.company.area!==''?decrypt(item.company.area):'';
            item.company.company_logo = item.company.company_logo && item.company.company_logo!==''?decrypt(item.company.company_logo):'';
        }

        if(item.tax){
          if(item.tax.CreditBuyer){
            item.tax.CreditBuyer.name = item.tax.CreditBuyer.name && item.tax.CreditBuyer.name!==''? decrypt(item.tax.CreditBuyer.name):'';
            item.tax.CreditBuyer.email = item.tax.CreditBuyer.email && item.tax.CreditBuyer.email!==''? decrypt(item.tax.CreditBuyer.email):'';
            item.tax.CreditBuyer.amount = item.tax.CreditBuyer.amount && item.tax.CreditBuyer.amount!==''? decrypt(item.tax.CreditBuyer.amount):'';
            item.tax.CreditBuyer.phone = item.tax.CreditBuyer.phone && item.tax.CreditBuyer.phone!==''? decrypt(item.tax.CreditBuyer.phone):'';
            item.tax.CreditBuyer.street =  item.tax.CreditBuyer.street && item.tax.CreditBuyer.street!==''?decrypt(item.tax.CreditBuyer.street):'';
            item.tax.CreditBuyer.area = item.tax.CreditBuyer.area && item.tax.CreditBuyer.area!==''? decrypt(item.tax.CreditBuyer.area):'';
            item.tax.CreditBuyer.gst_number =  item.tax.CreditBuyer.gst_number && item.tax.CreditBuyer.gst_number!==''? decrypt(item.tax.CreditBuyer.gst_number):'';
            item.tax.CreditBuyer.opening_balance =  item.tax.CreditBuyer.opening_balance && item.tax.CreditBuyer.opening_balance!==''? decrypt(item.tax.CreditBuyer.opening_balance):'';
            item.tax.CreditBuyer.cess_tax =  item.tax.CreditBuyer.cess_tax && item.tax.CreditBuyer.cess_tax!==''? decrypt(item.tax.CreditBuyer.cess_tax):'';
            item.tax.CreditBuyer.bank_name =  item.tax.CreditBuyer.bank_name && item.tax.CreditBuyer.bank_name!==''? decrypt(item.tax.CreditBuyer.bank_name):'';
            item.tax.CreditBuyer.bank_branch =  item.tax.CreditBuyer.bank_branch && item.tax.CreditBuyer.bank_branch!==''? decrypt(item.tax.CreditBuyer.bank_branch):'';
            item.tax.CreditBuyer.account_holder_name =  item.tax.CreditBuyer.account_holder_name && item.tax.CreditBuyer.account_holder_name!==''? decrypt(item.tax.CreditBuyer.account_holder_name):'';
            item.tax.CreditBuyer.ifsc =  item.tax.CreditBuyer.ifsc && item.tax.CreditBuyer.ifsc!==''? decrypt(item.tax.CreditBuyer.ifsc):'';
            item.tax.CreditBuyer.pan_number =  item.tax.CreditBuyer.pan_number && item.tax.CreditBuyer.pan_number!==''? decrypt(item.tax.CreditBuyer.pan_number):'';
            item.tax.CreditBuyer.bank_account_number =  item.tax.CreditBuyer.bank_account_number && item.tax.CreditBuyer.bank_account_number!==''? decrypt(item.tax.CreditBuyer.bank_account_number):'';

            item.tax.CreditBuyer.website =  item.tax.CreditBuyer.website && item.tax.CreditBuyer.website!==''? decrypt(item.tax.CreditBuyer.website):'';
            item.tax.CreditBuyer.jurisdiction = item.tax.CreditBuyer.jurisdiction && item.tax.CreditBuyer.jurisdiction!==''? decrypt(item.tax.CreditBuyer.jurisdiction):'';
            item.tax.CreditBuyer.cin_number = item.tax.CreditBuyer.cin_number && item.tax.CreditBuyer.cin_number!==''? decrypt(item.tax.CreditBuyer.cin_number):'';
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


        if(item.taxc){
          if(item.taxc.CreditBuyer){
            item.taxc.CreditBuyer.name = item.taxc.CreditBuyer.name && item.taxc.CreditBuyer.name!==''? decrypt(item.taxc.CreditBuyer.name):'';
            item.taxc.CreditBuyer.email = item.taxc.CreditBuyer.email && item.taxc.CreditBuyer.email!==''? decrypt(item.taxc.CreditBuyer.email):'';
            item.taxc.CreditBuyer.amount = item.taxc.CreditBuyer.amount && item.taxc.CreditBuyer.amount!==''? decrypt(item.taxc.CreditBuyer.amount):'';
            item.taxc.CreditBuyer.phone = item.taxc.CreditBuyer.phone && item.taxc.CreditBuyer.phone!==''? decrypt(item.taxc.CreditBuyer.phone):'';
            item.taxc.CreditBuyer.street =  item.taxc.CreditBuyer.street && item.taxc.CreditBuyer.street!==''?decrypt(item.taxc.CreditBuyer.street):'';
            item.taxc.CreditBuyer.area = item.taxc.CreditBuyer.area && item.taxc.CreditBuyer.area!==''? decrypt(item.taxc.CreditBuyer.area):'';
            item.taxc.CreditBuyer.gst_number =  item.taxc.CreditBuyer.gst_number && item.taxc.CreditBuyer.gst_number!==''? decrypt(item.taxc.CreditBuyer.gst_number):'';
            item.taxc.CreditBuyer.opening_balance =  item.taxc.CreditBuyer.opening_balance && item.taxc.CreditBuyer.opening_balance!==''? decrypt(item.taxc.CreditBuyer.opening_balance):'';
            item.taxc.CreditBuyer.cess_tax =  item.taxc.CreditBuyer.cess_tax && item.taxc.CreditBuyer.cess_tax!==''? decrypt(item.taxc.CreditBuyer.cess_tax):'';
            item.taxc.CreditBuyer.bank_name =  item.taxc.CreditBuyer.bank_name && item.taxc.CreditBuyer.bank_name!==''? decrypt(item.taxc.CreditBuyer.bank_name):'';
            item.taxc.CreditBuyer.bank_branch =  item.taxc.CreditBuyer.bank_branch && item.taxc.CreditBuyer.bank_branch!==''? decrypt(item.taxc.CreditBuyer.bank_branch):'';
            item.taxc.CreditBuyer.account_holder_name =  item.taxc.CreditBuyer.account_holder_name && item.taxc.CreditBuyer.account_holder_name!==''? decrypt(item.taxc.CreditBuyer.account_holder_name):'';
            item.taxc.CreditBuyer.ifsc =  item.taxc.CreditBuyer.ifsc && item.taxc.CreditBuyer.ifsc!==''? decrypt(item.taxc.CreditBuyer.ifsc):'';
            item.taxc.CreditBuyer.pan_number =  item.taxc.CreditBuyer.pan_number && item.taxc.CreditBuyer.pan_number!==''? decrypt(item.taxc.CreditBuyer.pan_number):'';
            item.taxc.CreditBuyer.bank_account_number =  item.taxc.CreditBuyer.bank_account_number && item.taxc.CreditBuyer.bank_account_number!==''? decrypt(item.taxc.CreditBuyer.bank_account_number):'';

            item.taxc.CreditBuyer.website =  item.taxc.CreditBuyer.website && item.taxc.CreditBuyer.website!==''? decrypt(item.taxc.CreditBuyer.website):'';
            item.taxc.CreditBuyer.jurisdiction = item.taxc.CreditBuyer.jurisdiction && item.taxc.CreditBuyer.jurisdiction!==''? decrypt(item.taxc.CreditBuyer.jurisdiction):'';
            item.taxc.CreditBuyer.cin_number = item.taxc.CreditBuyer.cin_number && item.taxc.CreditBuyer.cin_number!==''? decrypt(item.taxc.CreditBuyer.cin_number):'';
          }
          item.taxc.amount = item.taxc.amount && item.taxc.amount!==''? decrypt(item.taxc.amount):'';
          item.taxc.narration = item.taxc.narration && item.taxc.narration!==''? decrypt(item.taxc.narration):'';
          item.taxc.bank_name = item.taxc.bank_name && item.taxc.bank_name!==''? decrypt(item.taxc.bank_name):'';
          item.taxc.bank_account_number = item.taxc.bank_account_number && item.taxc.bank_account_number!==''? decrypt(item.taxc.bank_account_number):'';
          item.taxc.bank_ifsc = item.taxc.bank_ifsc && item.taxc.bank_ifsc!==''? decrypt(item.taxc.bank_ifsc):'';
          item.taxc.shipping_address = item.taxc.shipping_address && item.taxc.shipping_address!==''? decrypt(item.taxc.shipping_address):'';
          item.taxc.sub_amount = item.taxc.sub_amount && item.taxc.sub_amount!==''? decrypt(item.taxc.sub_amount):'';
          item.taxc.discount = item.taxc.discount && item.taxc.discount!==''? decrypt(item.taxc.discount):'';
          item.taxc.total_amount = item.taxc.total_amount && item.taxc.total_amount!==''? decrypt(item.taxc.total_amount):'';
        } 


        
        if(item.Voucherc){
          if(item.Voucherc.CreditBuyer){
            item.Voucherc.CreditBuyer.name = item.Voucherc.CreditBuyer.name && item.Voucherc.CreditBuyer.name!==''? decrypt(item.Voucherc.CreditBuyer.name):'';
            item.Voucherc.CreditBuyer.email = item.Voucherc.CreditBuyer.email && item.Voucherc.CreditBuyer.email!==''? decrypt(item.Voucherc.CreditBuyer.email):'';
            item.Voucherc.CreditBuyer.amount = item.Voucherc.CreditBuyer.amount && item.Voucherc.CreditBuyer.amount!==''? decrypt(item.Voucherc.CreditBuyer.amount):'';
            item.Voucherc.CreditBuyer.phone = item.Voucherc.CreditBuyer.phone && item.Voucherc.CreditBuyer.phone!==''? decrypt(item.Voucherc.CreditBuyer.phone):'';
            item.Voucherc.CreditBuyer.street =  item.Voucherc.CreditBuyer.street && item.Voucherc.CreditBuyer.street!==''?decrypt(item.Voucherc.CreditBuyer.street):'';
            item.Voucherc.CreditBuyer.area = item.Voucherc.CreditBuyer.area && item.Voucherc.CreditBuyer.area!==''? decrypt(item.Voucherc.CreditBuyer.area):'';
            item.Voucherc.CreditBuyer.gst_number =  item.Voucherc.CreditBuyer.gst_number && item.Voucherc.CreditBuyer.gst_number!==''? decrypt(item.Voucherc.CreditBuyer.gst_number):'';
            item.Voucherc.CreditBuyer.opening_balance =  item.Voucherc.CreditBuyer.opening_balance && item.Voucherc.CreditBuyer.opening_balance!==''? decrypt(item.Voucherc.CreditBuyer.opening_balance):'';
            item.Voucherc.CreditBuyer.cess_Voucherc =  item.Voucherc.CreditBuyer.cess_Voucherc && item.Voucherc.CreditBuyer.cess_Voucherc!==''? decrypt(item.Voucherc.CreditBuyer.cess_Voucherc):'';
            item.Voucherc.CreditBuyer.bank_name =  item.Voucherc.CreditBuyer.bank_name && item.Voucherc.CreditBuyer.bank_name!==''? decrypt(item.Voucherc.CreditBuyer.bank_name):'';
            item.Voucherc.CreditBuyer.bank_branch =  item.Voucherc.CreditBuyer.bank_branch && item.Voucherc.CreditBuyer.bank_branch!==''? decrypt(item.Voucherc.CreditBuyer.bank_branch):'';
            item.Voucherc.CreditBuyer.account_holder_name =  item.Voucherc.CreditBuyer.account_holder_name && item.Voucherc.CreditBuyer.account_holder_name!==''? decrypt(item.Voucherc.CreditBuyer.account_holder_name):'';
            item.Voucherc.CreditBuyer.ifsc =  item.Voucherc.CreditBuyer.ifsc && item.Voucherc.CreditBuyer.ifsc!==''? decrypt(item.Voucherc.CreditBuyer.ifsc):'';
            item.Voucherc.CreditBuyer.pan_number =  item.Voucherc.CreditBuyer.pan_number && item.Voucherc.CreditBuyer.pan_number!==''? decrypt(item.Voucherc.CreditBuyer.pan_number):'';
            item.Voucherc.CreditBuyer.bank_account_number =  item.Voucherc.CreditBuyer.bank_account_number && item.Voucherc.CreditBuyer.bank_account_number!==''? decrypt(item.Voucherc.CreditBuyer.bank_account_number):'';

            item.Voucherc.CreditBuyer.website =  item.Voucherc.CreditBuyer.website && item.Voucherc.CreditBuyer.website!==''? decrypt(item.Voucherc.CreditBuyer.website):'';
            item.Voucherc.CreditBuyer.jurisdiction = item.Voucherc.CreditBuyer.jurisdiction && item.Voucherc.CreditBuyer.jurisdiction!==''? decrypt(item.Voucherc.CreditBuyer.jurisdiction):'';
            item.Voucherc.CreditBuyer.cin_number = item.Voucherc.CreditBuyer.cin_number && item.Voucherc.CreditBuyer.cin_number!==''? decrypt(item.Voucherc.CreditBuyer.cin_number):'';
          }

          if(item.Voucherc.item_entries && item.Voucherc.item_entries.length>0){
            item.Voucherc.item_entries.map(ele=>{
              ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
              ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
              ele.hsn_code = ele.hsn_code && ele.hsn_code!==''? decrypt(ele.hsn_code):'';
              ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
              ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
              ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            })
          }


          if(item.Voucherc.tax_entries && item.Voucherc.tax_entries.length>0){
            item.Voucherc.tax_entries.map(ele=>{
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
          item.Voucherc.amount = item.Voucherc.amount && item.Voucherc.amount!==''? decrypt(item.Voucherc.amount):'';
          item.Voucherc.narration = item.Voucherc.narration && item.Voucherc.narration!==''? decrypt(item.Voucherc.narration):'';
          item.Voucherc.bank_name = item.Voucherc.bank_name && item.Voucherc.bank_name!==''? decrypt(item.Voucherc.bank_name):'';
          item.Voucherc.bank_account_number = item.Voucherc.bank_account_number && item.Voucherc.bank_account_number!==''? decrypt(item.Voucherc.bank_account_number):'';
          item.Voucherc.bank_ifsc = item.Voucherc.bank_ifsc && item.Voucherc.bank_ifsc!==''? decrypt(item.Voucherc.bank_ifsc):'';
          item.Voucherc.shipping_address = item.Voucherc.shipping_address && item.Voucherc.shipping_address!==''? decrypt(item.Voucherc.shipping_address):'';
          item.Voucherc.sub_amount = item.Voucherc.sub_amount && item.Voucherc.sub_amount!==''? decrypt(item.Voucherc.sub_amount):'';
          item.Voucherc.discount = item.Voucherc.discount && item.Voucherc.discount!==''? decrypt(item.Voucherc.discount):'';
          item.Voucherc.total_amount = item.Voucherc.total_amount && item.Voucherc.total_amount!==''? decrypt(item.Voucherc.total_amount):'';
        } 

        if(item.Voucheric){
          if(item.Voucheric.SalesLedger){
            item.Voucheric.SalesLedger.name = item.Voucheric.SalesLedger.name && item.Voucheric.SalesLedger.name!==''? decrypt(item.Voucheric.SalesLedger.name):'';
            item.Voucheric.SalesLedger.email = item.Voucheric.SalesLedger.email && item.Voucheric.SalesLedger.email!==''? decrypt(item.Voucheric.SalesLedger.email):'';
            item.Voucheric.SalesLedger.amount = item.Voucheric.SalesLedger.amount && item.Voucheric.SalesLedger.amount!==''? decrypt(item.Voucheric.SalesLedger.amount):'';
            item.Voucheric.SalesLedger.phone = item.Voucheric.SalesLedger.phone && item.Voucheric.SalesLedger.phone!==''? decrypt(item.Voucheric.SalesLedger.phone):'';
            item.Voucheric.SalesLedger.street =  item.Voucheric.SalesLedger.street && item.Voucheric.SalesLedger.street!==''?decrypt(item.Voucheric.SalesLedger.street):'';
            item.Voucheric.SalesLedger.area = item.Voucheric.SalesLedger.area && item.Voucheric.SalesLedger.area!==''? decrypt(item.Voucheric.SalesLedger.area):'';
            item.Voucheric.SalesLedger.gst_number =  item.Voucheric.SalesLedger.gst_number && item.Voucheric.SalesLedger.gst_number!==''? decrypt(item.Voucheric.SalesLedger.gst_number):'';
            item.Voucheric.SalesLedger.opening_balance =  item.Voucheric.SalesLedger.opening_balance && item.Voucheric.SalesLedger.opening_balance!==''? decrypt(item.Voucheric.SalesLedger.opening_balance):'';
            item.Voucheric.SalesLedger.cess_Vouchers =  item.Voucheric.SalesLedger.cess_Vouchers && item.Voucheric.SalesLedger.cess_Vouchers!==''? decrypt(item.Voucheric.SalesLedger.cess_Vouchers):'';
            item.Voucheric.SalesLedger.bank_name =  item.Voucheric.SalesLedger.bank_name && item.Voucheric.SalesLedger.bank_name!==''? decrypt(item.Voucheric.SalesLedger.bank_name):'';
            item.Voucheric.SalesLedger.bank_branch =  item.Voucheric.SalesLedger.bank_branch && item.Voucheric.SalesLedger.bank_branch!==''? decrypt(item.Voucheric.SalesLedger.bank_branch):'';
            item.Voucheric.SalesLedger.account_holder_name =  item.Voucheric.SalesLedger.account_holder_name && item.Voucheric.SalesLedger.account_holder_name!==''? decrypt(item.Voucheric.SalesLedger.account_holder_name):'';
            item.Voucheric.SalesLedger.ifsc =  item.Voucheric.SalesLedger.ifsc && item.Voucheric.SalesLedger.ifsc!==''? decrypt(item.Voucheric.SalesLedger.ifsc):'';
            item.Voucheric.SalesLedger.pan_number =  item.Voucheric.SalesLedger.pan_number && item.Voucheric.SalesLedger.pan_number!==''? decrypt(item.Voucheric.SalesLedger.pan_number):'';
            item.Voucheric.SalesLedger.bank_account_number =  item.Voucheric.SalesLedger.bank_account_number && item.Voucheric.SalesLedger.bank_account_number!==''? decrypt(item.Voucheric.SalesLedger.bank_account_number):'';

            item.Voucheric.SalesLedger.website =   item.Voucheric.SalesLedger.website && item.Voucheric.SalesLedger.website!==''? decrypt(item.Voucheric.SalesLedger.website):'';
            item.Voucheric.SalesLedger.jurisdiction =   item.Voucheric.SalesLedger.jurisdiction && item.Voucheric.SalesLedger.jurisdiction!==''? decrypt(item.Voucheric.SalesLedger.jurisdiction):'';
            item.Voucheric.SalesLedger.cin_number =   item.Voucheric.SalesLedger.cin_number &&  item.Voucheric.SalesLedger.cin_number!==''? decrypt(item.Voucheric.SalesLedger.cin_number):'';
          }

          if(item.Voucheric.CreditBuyer){
            item.Voucheric.CreditBuyer.name = item.Voucheric.CreditBuyer.name && item.Voucheric.CreditBuyer.name!==''? decrypt(item.Voucheric.CreditBuyer.name):'';
            item.Voucheric.CreditBuyer.email = item.Voucheric.CreditBuyer.email && item.Voucheric.CreditBuyer.email!==''? decrypt(item.Voucheric.CreditBuyer.email):'';
            item.Voucheric.CreditBuyer.amount = item.Voucheric.CreditBuyer.amount && item.Voucheric.CreditBuyer.amount!==''? decrypt(item.Voucheric.CreditBuyer.amount):'';
            item.Voucheric.CreditBuyer.phone = item.Voucheric.CreditBuyer.phone && item.Voucheric.CreditBuyer.phone!==''? decrypt(item.Voucheric.CreditBuyer.phone):'';
            item.Voucheric.CreditBuyer.street =  item.Voucheric.CreditBuyer.street && item.Voucheric.CreditBuyer.street!==''?decrypt(item.Voucheric.CreditBuyer.street):'';
            item.Voucheric.CreditBuyer.area = item.Voucheric.CreditBuyer.area && item.Voucheric.CreditBuyer.area!==''? decrypt(item.Voucheric.CreditBuyer.area):'';
            item.Voucheric.CreditBuyer.gst_number =  item.Voucheric.CreditBuyer.gst_number && item.Voucheric.CreditBuyer.gst_number!==''? decrypt(item.Voucheric.CreditBuyer.gst_number):'';
            item.Voucheric.CreditBuyer.opening_balance =  item.Voucheric.CreditBuyer.opening_balance && item.Voucheric.CreditBuyer.opening_balance!==''? decrypt(item.Voucheric.CreditBuyer.opening_balance):'';
            item.Voucheric.CreditBuyer.cess_Vouchers =  item.Voucheric.CreditBuyer.cess_Vouchers && item.Voucheric.CreditBuyer.cess_Vouchers!==''? decrypt(item.Voucheric.CreditBuyer.cess_Vouchers):'';
            item.Voucheric.CreditBuyer.bank_name =  item.Voucheric.CreditBuyer.bank_name && item.Voucheric.CreditBuyer.bank_name!==''? decrypt(item.Voucheric.CreditBuyer.bank_name):'';
            item.Voucheric.CreditBuyer.bank_branch =  item.Voucheric.CreditBuyer.bank_branch && item.Voucheric.CreditBuyer.bank_branch!==''? decrypt(item.Voucheric.CreditBuyer.bank_branch):'';
            item.Voucheric.CreditBuyer.account_holder_name =  item.Voucheric.CreditBuyer.account_holder_name && item.Voucheric.CreditBuyer.account_holder_name!==''? decrypt(item.Voucheric.CreditBuyer.account_holder_name):'';
            item.Voucheric.CreditBuyer.ifsc =  item.Voucheric.CreditBuyer.ifsc && item.Voucheric.CreditBuyer.ifsc!==''? decrypt(item.Voucheric.CreditBuyer.ifsc):'';
            item.Voucheric.CreditBuyer.pan_number =  item.Voucheric.CreditBuyer.pan_number && item.Voucheric.CreditBuyer.pan_number!==''? decrypt(item.Voucheric.CreditBuyer.pan_number):'';
            item.Voucheric.CreditBuyer.bank_account_number =  item.Voucheric.CreditBuyer.bank_account_number && item.Voucheric.CreditBuyer.bank_account_number!==''? decrypt(item.Voucheric.CreditBuyer.bank_account_number):'';

            item.Voucheric.CreditBuyer.website =   item.Voucheric.CreditBuyer.website && item.Voucheric.CreditBuyer.website!==''? decrypt(item.Voucheric.CreditBuyer.website):'';
            item.Voucheric.CreditBuyer.jurisdiction =   item.Voucheric.CreditBuyer.jurisdiction && item.Voucheric.CreditBuyer.jurisdiction!==''? decrypt(item.Voucheric.CreditBuyer.jurisdiction):'';
            item.Voucheric.CreditBuyer.cin_number =   item.Voucheric.CreditBuyer.cin_number &&  item.Voucheric.CreditBuyer.cin_number!==''? decrypt(item.Voucheric.CreditBuyer.cin_number):'';
          }

          item.Voucheric.amount = item.Voucheric.amount && item.Voucheric.amount!==''? decrypt(item.Voucheric.amount):null;
          item.Voucheric.narration = item.Voucheric.narration && item.Voucheric.narration!==''? decrypt(item.Voucheric.narration):'';
          item.Voucheric.bank_name = item.Voucheric.bank_name && item.Voucheric.bank_name!==''? decrypt(item.Voucheric.bank_name):'';
          item.Voucheric.bank_account_number = item.Voucheric.bank_account_number && item.Voucheric.bank_account_number!==''? decrypt(item.Voucheric.bank_account_number):'';
          item.Voucheric.bank_ifsc = item.Voucheric.bank_ifsc && item.Voucheric.bank_ifsc!==''? decrypt(item.Voucheric.bank_ifsc):'';
          item.Voucheric.shipping_address = item.Voucheric.shipping_address && item.Voucheric.shipping_address!==''? decrypt(item.Voucheric.shipping_address):'';
          item.Voucheric.sub_amount = item.Voucheric.sub_amount && item.Voucheric.sub_amount!==''? decrypt(item.Voucheric.sub_amount):'';
          item.Voucheric.discount = item.Voucheric.discount && item.Voucheric.discount!==''? decrypt(item.Voucheric.discount):'';
          item.Voucheric.total_amount = item.Voucheric.total_amount && item.Voucheric.total_amount!==''? decrypt(item.Voucheric.total_amount):'';
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
    if( data.dataValues.CreditBuyer){
       data.dataValues.CreditBuyer.name =  data.dataValues.CreditBuyer.name &&  data.dataValues.CreditBuyer.name!==''?decrypt( data.dataValues.CreditBuyer.name):'';
       data.dataValues.CreditBuyer.amount =  data.dataValues.CreditBuyer.amount &&  data.dataValues.CreditBuyer.amount!==''?decrypt( data.dataValues.CreditBuyer.amount):'';
       data.dataValues.CreditBuyer.opening_balance =  data.dataValues.CreditBuyer.opening_balance &&  data.dataValues.CreditBuyer.opening_balance!==''?decrypt( data.dataValues.CreditBuyer.opening_balance):'';



       data.dataValues.CreditBuyer.account_holder_name =  data.dataValues.CreditBuyer.account_holder_name &&  data.dataValues.CreditBuyer.account_holder_name!==''?decrypt( data.dataValues.CreditBuyer.account_holder_name):'';
       data.dataValues.CreditBuyer.bank_account_number =  data.dataValues.CreditBuyer.bank_account_number &&  data.dataValues.CreditBuyer.bank_account_number!==''?decrypt( data.dataValues.CreditBuyer.bank_account_number):'';
       data.dataValues.CreditBuyer.bank_branch =  data.dataValues.CreditBuyer.bank_branch &&  data.dataValues.CreditBuyer.bank_branch!==''?decrypt( data.dataValues.CreditBuyer.bank_branch):'';
       data.dataValues.CreditBuyer.bank_name =  data.dataValues.CreditBuyer.bank_name &&  data.dataValues.CreditBuyer.bank_name!==''?decrypt( data.dataValues.CreditBuyer.bank_name):'';

      data.dataValues.CreditBuyer.website = data.dataValues.CreditBuyer.website && data.dataValues.CreditBuyer.website!==''? decrypt(data.dataValues.CreditBuyer.website):'';
      data.dataValues.CreditBuyer.jurisdiction =data.dataValues.CreditBuyer.jurisdiction && data.dataValues.CreditBuyer.jurisdiction!==''? decrypt(data.dataValues.CreditBuyer.jurisdiction):'';
      data.dataValues.CreditBuyer.cin_number =data.dataValues.CreditBuyer.cin_number && data.dataValues.CreditBuyer.cin_number!==''? decrypt(data.dataValues.CreditBuyer.cin_number):'';
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

        tax.ledger.website = tax.ledger.website && tax.ledger.website!==''? decrypt(tax.ledger.website):'';
        tax.ledger.jurisdiction =tax.ledger.jurisdiction && tax.ledger.jurisdiction!==''? decrypt(tax.ledger.jurisdiction):'';
        tax.ledger.cin_number =tax.ledgercin_number && tax.ledger.cin_number!==''? decrypt(tax.ledger.cin_number):'';
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