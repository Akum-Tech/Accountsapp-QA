const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionDebit = async(data) => {
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

export const decreptionDebit = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        if(item.DebitBuyer){
          item.DebitBuyer.name = item.DebitBuyer.name && item.DebitBuyer.name!==''? decrypt(item.DebitBuyer.name):'';
          item.DebitBuyer.email = item.DebitBuyer.email && item.DebitBuyer.email!==''? decrypt(item.DebitBuyer.email):'';
          item.DebitBuyer.amount = item.DebitBuyer.amount && item.DebitBuyer.amount!==''? decrypt(item.DebitBuyer.amount):'';
          item.DebitBuyer.phone = item.DebitBuyer.phone && item.DebitBuyer.phone!==''? decrypt(item.DebitBuyer.phone):'';
          item.DebitBuyer.street =  item.DebitBuyer.street && item.DebitBuyer.street!==''?decrypt(item.DebitBuyer.street):'';
          item.DebitBuyer.area = item.DebitBuyer.area && item.DebitBuyer.area!==''? decrypt(item.DebitBuyer.area):'';
          item.DebitBuyer.gst_number =  item.DebitBuyer.gst_number && item.DebitBuyer.gst_number!==''? decrypt(item.DebitBuyer.gst_number):'';
          item.DebitBuyer.opening_balance =  item.DebitBuyer.opening_balance && item.DebitBuyer.opening_balance!==''? decrypt(item.DebitBuyer.opening_balance):'';
          item.DebitBuyer.cess_tax =  item.DebitBuyer.cess_tax && item.DebitBuyer.cess_tax!==''? decrypt(item.DebitBuyer.cess_tax):'';
          item.DebitBuyer.bank_name =  item.DebitBuyer.bank_name && item.DebitBuyer.bank_name!==''? decrypt(item.DebitBuyer.bank_name):'';
          item.DebitBuyer.bank_branch =  item.DebitBuyer.bank_branch && item.DebitBuyer.bank_branch!==''? decrypt(item.DebitBuyer.bank_branch):'';
          item.DebitBuyer.account_holder_name =  item.DebitBuyer.account_holder_name && item.DebitBuyer.account_holder_name!==''? decrypt(item.DebitBuyer.account_holder_name):'';
          item.DebitBuyer.ifsc =  item.DebitBuyer.ifsc && item.DebitBuyer.ifsc!==''? decrypt(item.DebitBuyer.ifsc):'';
          item.DebitBuyer.pan_number =  item.DebitBuyer.pan_number && item.DebitBuyer.pan_number!==''? decrypt(item.DebitBuyer.pan_number):'';
          item.DebitBuyer.bank_account_number =  item.DebitBuyer.bank_account_number && item.DebitBuyer.bank_account_number!==''? decrypt(item.DebitBuyer.bank_account_number):'';

          item.DebitBuyer.website =  item.DebitBuyer.website && item.DebitBuyer.website!==''? decrypt(item.DebitBuyer.website):'';
          item.DebitBuyer.jurisdiction = item.DebitBuyer.jurisdiction && item.DebitBuyer.jurisdiction!==''? decrypt(item.DebitBuyer.jurisdiction):'';
          item.DebitBuyer.cin_number = item.DebitBuyer.cin_number && item.DebitBuyer.cin_number!==''? decrypt(item.DebitBuyer.cin_number):'';
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

        if(item.DebitDiscountLedger){
          item.DebitDiscountLedger.name = item.DebitDiscountLedger.name && item.DebitDiscountLedger.name!==''? decrypt(item.DebitDiscountLedger.name):'';
          item.DebitDiscountLedger.email = item.DebitDiscountLedger.email && item.DebitDiscountLedger.email!==''? decrypt(item.DebitDiscountLedger.email):'';
          item.DebitDiscountLedger.amount = item.DebitDiscountLedger.amount && item.DebitDiscountLedger.amount!==''? decrypt(item.DebitDiscountLedger.amount):'';
          item.DebitDiscountLedger.phone = item.DebitDiscountLedger.phone && item.DebitDiscountLedger.phone!==''? decrypt(item.DebitDiscountLedger.phone):'';
          item.DebitDiscountLedger.street =  item.DebitDiscountLedger.street && item.DebitDiscountLedger.street!==''?decrypt(item.DebitDiscountLedger.street):'';
          item.DebitDiscountLedger.area = item.DebitDiscountLedger.area && item.DebitDiscountLedger.area!==''? decrypt(item.DebitDiscountLedger.area):'';
          item.DebitDiscountLedger.gst_number =  item.DebitDiscountLedger.gst_number && item.DebitDiscountLedger.gst_number!==''? decrypt(item.DebitDiscountLedger.gst_number):'';
          item.DebitDiscountLedger.opening_balance =  item.DebitDiscountLedger.opening_balance && item.DebitDiscountLedger.opening_balance!==''? decrypt(item.DebitDiscountLedger.opening_balance):'';
          item.DebitDiscountLedger.cess_tax =  item.DebitDiscountLedger.cess_tax && item.DebitDiscountLedger.cess_tax!==''? decrypt(item.DebitDiscountLedger.cess_tax):'';
          item.DebitDiscountLedger.bank_name =  item.DebitDiscountLedger.bank_name && item.DebitDiscountLedger.bank_name!==''? decrypt(item.DebitDiscountLedger.bank_name):'';
          item.DebitDiscountLedger.bank_branch =  item.DebitDiscountLedger.bank_branch && item.DebitDiscountLedger.bank_branch!==''? decrypt(item.DebitDiscountLedger.bank_branch):'';
          item.DebitDiscountLedger.account_holder_name =  item.DebitDiscountLedger.account_holder_name && item.DebitDiscountLedger.account_holder_name!==''? decrypt(item.DebitDiscountLedger.account_holder_name):'';
          item.DebitDiscountLedger.ifsc =  item.DebitDiscountLedger.ifsc && item.DebitDiscountLedger.ifsc!==''? decrypt(item.DebitDiscountLedger.ifsc):'';
          item.DebitDiscountLedger.pan_number =  item.DebitDiscountLedger.pan_number && item.DebitDiscountLedger.pan_number!==''? decrypt(item.DebitDiscountLedger.pan_number):'';
          item.DebitDiscountLedger.bank_account_number =  item.DebitDiscountLedger.bank_account_number && item.DebitDiscountLedger.bank_account_number!==''? decrypt(item.DebitDiscountLedger.bank_account_number):'';

          item.DebitDiscountLedger.website =  item.DebitDiscountLedger.website && item.DebitDiscountLedger.website!==''? decrypt(item.DebitDiscountLedger.website):'';
          item.DebitDiscountLedger.jurisdiction =  item.DebitDiscountLedger.jurisdiction && item.DebitDiscountLedger.jurisdiction!==''? decrypt(item.DebitDiscountLedger.jurisdiction):'';
          item.DebitDiscountLedger.cin_number =  item.DebitDiscountLedger.cin_number && item.DebitDiscountLedger.cin_number!==''? decrypt(item.DebitDiscountLedger.cin_number):'';

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
          if(item.tax.DebitBuyer){
            item.tax.DebitBuyer.name = item.tax.DebitBuyer.name && item.tax.DebitBuyer.name!==''? decrypt(item.tax.DebitBuyer.name):'';
            item.tax.DebitBuyer.email = item.tax.DebitBuyer.email && item.tax.DebitBuyer.email!==''? decrypt(item.tax.DebitBuyer.email):'';
            item.tax.DebitBuyer.amount = item.tax.DebitBuyer.amount && item.tax.DebitBuyer.amount!==''? decrypt(item.tax.DebitBuyer.amount):'';
            item.tax.DebitBuyer.phone = item.tax.DebitBuyer.phone && item.tax.DebitBuyer.phone!==''? decrypt(item.tax.DebitBuyer.phone):'';
            item.tax.DebitBuyer.street =  item.tax.DebitBuyer.street && item.tax.DebitBuyer.street!==''?decrypt(item.tax.DebitBuyer.street):'';
            item.tax.DebitBuyer.area = item.tax.DebitBuyer.area && item.tax.DebitBuyer.area!==''? decrypt(item.tax.DebitBuyer.area):'';
            item.tax.DebitBuyer.gst_number =  item.tax.DebitBuyer.gst_number && item.tax.DebitBuyer.gst_number!==''? decrypt(item.tax.DebitBuyer.gst_number):'';
            item.tax.DebitBuyer.opening_balance =  item.tax.DebitBuyer.opening_balance && item.tax.DebitBuyer.opening_balance!==''? decrypt(item.tax.DebitBuyer.opening_balance):'';
            item.tax.DebitBuyer.cess_tax =  item.tax.DebitBuyer.cess_tax && item.tax.DebitBuyer.cess_tax!==''? decrypt(item.tax.DebitBuyer.cess_tax):'';
            item.tax.DebitBuyer.bank_name =  item.tax.DebitBuyer.bank_name && item.tax.DebitBuyer.bank_name!==''? decrypt(item.tax.DebitBuyer.bank_name):'';
            item.tax.DebitBuyer.bank_branch =  item.tax.DebitBuyer.bank_branch && item.tax.DebitBuyer.bank_branch!==''? decrypt(item.tax.DebitBuyer.bank_branch):'';
            item.tax.DebitBuyer.account_holder_name =  item.tax.DebitBuyer.account_holder_name && item.tax.DebitBuyer.account_holder_name!==''? decrypt(item.tax.DebitBuyer.account_holder_name):'';
            item.tax.DebitBuyer.ifsc =  item.tax.DebitBuyer.ifsc && item.tax.DebitBuyer.ifsc!==''? decrypt(item.tax.DebitBuyer.ifsc):'';
            item.tax.DebitBuyer.pan_number =  item.tax.DebitBuyer.pan_number && item.tax.DebitBuyer.pan_number!==''? decrypt(item.tax.DebitBuyer.pan_number):'';
            item.tax.DebitBuyer.bank_account_number =  item.tax.DebitBuyer.bank_account_number && item.tax.DebitBuyer.bank_account_number!==''? decrypt(item.tax.DebitBuyer.bank_account_number):'';

            item.tax.DebitBuyer.website =  item.tax.DebitBuyer.website && item.tax.DebitBuyer.website!==''? decrypt(item.tax.DebitBuyer.website):'';
            item.tax.DebitBuyer.jurisdiction = item.tax.DebitBuyer.jurisdiction && item.tax.DebitBuyer.jurisdiction!==''? decrypt(item.tax.DebitBuyer.jurisdiction):'';
            item.tax.DebitBuyer.cin_number = item.tax.DebitBuyer.cin_number && item.tax.DebitBuyer.cin_number!==''? decrypt(item.tax.DebitBuyer.cin_number):'';
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
        if(item.taxd){
          if(item.taxd.DebitBuyer){
            item.taxd.DebitBuyer.name = item.taxd.DebitBuyer.name && item.taxd.DebitBuyer.name!==''? decrypt(item.taxd.DebitBuyer.name):'';
            item.taxd.DebitBuyer.email = item.taxd.DebitBuyer.email && item.taxd.DebitBuyer.email!==''? decrypt(item.taxd.DebitBuyer.email):'';
            item.taxd.DebitBuyer.amount = item.taxd.DebitBuyer.amount && item.taxd.DebitBuyer.amount!==''? decrypt(item.taxd.DebitBuyer.amount):'';
            item.taxd.DebitBuyer.phone = item.taxd.DebitBuyer.phone && item.taxd.DebitBuyer.phone!==''? decrypt(item.taxd.DebitBuyer.phone):'';
            item.taxd.DebitBuyer.street =  item.taxd.DebitBuyer.street && item.taxd.DebitBuyer.street!==''?decrypt(item.taxd.DebitBuyer.street):'';
            item.taxd.DebitBuyer.area = item.taxd.DebitBuyer.area && item.taxd.DebitBuyer.area!==''? decrypt(item.taxd.DebitBuyer.area):'';
            item.taxd.DebitBuyer.gst_number =  item.taxd.DebitBuyer.gst_number && item.taxd.DebitBuyer.gst_number!==''? decrypt(item.taxd.DebitBuyer.gst_number):'';
            item.taxd.DebitBuyer.opening_balance =  item.taxd.DebitBuyer.opening_balance && item.taxd.DebitBuyer.opening_balance!==''? decrypt(item.taxd.DebitBuyer.opening_balance):'';
            item.taxd.DebitBuyer.cess_tax =  item.taxd.DebitBuyer.cess_tax && item.taxd.DebitBuyer.cess_tax!==''? decrypt(item.taxd.DebitBuyer.cess_tax):'';
            item.taxd.DebitBuyer.bank_name =  item.taxd.DebitBuyer.bank_name && item.taxd.DebitBuyer.bank_name!==''? decrypt(item.taxd.DebitBuyer.bank_name):'';
            item.taxd.DebitBuyer.bank_branch =  item.taxd.DebitBuyer.bank_branch && item.taxd.DebitBuyer.bank_branch!==''? decrypt(item.taxd.DebitBuyer.bank_branch):'';
            item.taxd.DebitBuyer.account_holder_name =  item.taxd.DebitBuyer.account_holder_name && item.taxd.DebitBuyer.account_holder_name!==''? decrypt(item.taxd.DebitBuyer.account_holder_name):'';
            item.taxd.DebitBuyer.ifsc =  item.taxd.DebitBuyer.ifsc && item.taxd.DebitBuyer.ifsc!==''? decrypt(item.taxd.DebitBuyer.ifsc):'';
            item.taxd.DebitBuyer.pan_number =  item.taxd.DebitBuyer.pan_number && item.taxd.DebitBuyer.pan_number!==''? decrypt(item.taxd.DebitBuyer.pan_number):'';
            item.taxd.DebitBuyer.bank_account_number =  item.taxd.DebitBuyer.bank_account_number && item.taxd.DebitBuyer.bank_account_number!==''? decrypt(item.taxd.DebitBuyer.bank_account_number):'';

            item.taxd.DebitBuyer.website =  item.taxd.DebitBuyer.website && item.taxd.DebitBuyer.website!==''? decrypt(item.taxd.DebitBuyer.website):'';
            item.taxd.DebitBuyer.jurisdiction = item.taxd.DebitBuyer.jurisdiction && item.taxd.DebitBuyer.jurisdiction!==''? decrypt(item.taxd.DebitBuyer.jurisdiction):'';
            item.taxd.DebitBuyer.cin_number = item.taxd.DebitBuyer.cin_number && item.taxd.DebitBuyer.cin_number!==''? decrypt(item.taxd.DebitBuyer.cin_number):'';
          }
          item.taxd.amount = item.taxd.amount && item.taxd.amount!==''? decrypt(item.taxd.amount):'';
          item.taxd.narration = item.taxd.narration && item.taxd.narration!==''? decrypt(item.taxd.narration):'';
          item.taxd.bank_name = item.taxd.bank_name && item.taxd.bank_name!==''? decrypt(item.taxd.bank_name):'';
          item.taxd.bank_account_number = item.taxd.bank_account_number && item.taxd.bank_account_number!==''? decrypt(item.taxd.bank_account_number):'';
          item.taxd.bank_ifsc = item.taxd.bank_ifsc && item.taxd.bank_ifsc!==''? decrypt(item.taxd.bank_ifsc):'';
          item.taxd.shipping_address = item.taxd.shipping_address && item.taxd.shipping_address!==''? decrypt(item.taxd.shipping_address):'';
          item.taxd.sub_amount = item.taxd.sub_amount && item.taxd.sub_amount!==''? decrypt(item.taxd.sub_amount):'';
          item.taxd.discount = item.taxd.discount && item.taxd.discount!==''? decrypt(item.taxd.discount):'';
          item.taxd.total_amount = item.taxd.total_amount && item.taxd.total_amount!==''? decrypt(item.taxd.total_amount):'';
        } 

        if(item.Voucherd){
          if(item.Voucherd.DebitBuyer){
            item.Voucherd.DebitBuyer.name = item.Voucherd.DebitBuyer.name && item.Voucherd.DebitBuyer.name!==''? decrypt(item.Voucherd.DebitBuyer.name):'';
            item.Voucherd.DebitBuyer.email = item.Voucherd.DebitBuyer.email && item.Voucherd.DebitBuyer.email!==''? decrypt(item.Voucherd.DebitBuyer.email):'';
            item.Voucherd.DebitBuyer.amount = item.Voucherd.DebitBuyer.amount && item.Voucherd.DebitBuyer.amount!==''? decrypt(item.Voucherd.DebitBuyer.amount):'';
            item.Voucherd.DebitBuyer.phone = item.Voucherd.DebitBuyer.phone && item.Voucherd.DebitBuyer.phone!==''? decrypt(item.Voucherd.DebitBuyer.phone):'';
            item.Voucherd.DebitBuyer.street =  item.Voucherd.DebitBuyer.street && item.Voucherd.DebitBuyer.street!==''?decrypt(item.Voucherd.DebitBuyer.street):'';
            item.Voucherd.DebitBuyer.area = item.Voucherd.DebitBuyer.area && item.Voucherd.DebitBuyer.area!==''? decrypt(item.Voucherd.DebitBuyer.area):'';
            item.Voucherd.DebitBuyer.gst_number =  item.Voucherd.DebitBuyer.gst_number && item.Voucherd.DebitBuyer.gst_number!==''? decrypt(item.Voucherd.DebitBuyer.gst_number):'';
            item.Voucherd.DebitBuyer.opening_balance =  item.Voucherd.DebitBuyer.opening_balance && item.Voucherd.DebitBuyer.opening_balance!==''? decrypt(item.Voucherd.DebitBuyer.opening_balance):'';
            item.Voucherd.DebitBuyer.cess_Voucherd =  item.Voucherd.DebitBuyer.cess_Voucherd && item.Voucherd.DebitBuyer.cess_Voucherd!==''? decrypt(item.Voucherd.DebitBuyer.cess_Voucherd):'';
            item.Voucherd.DebitBuyer.bank_name =  item.Voucherd.DebitBuyer.bank_name && item.Voucherd.DebitBuyer.bank_name!==''? decrypt(item.Voucherd.DebitBuyer.bank_name):'';
            item.Voucherd.DebitBuyer.bank_branch =  item.Voucherd.DebitBuyer.bank_branch && item.Voucherd.DebitBuyer.bank_branch!==''? decrypt(item.Voucherd.DebitBuyer.bank_branch):'';
            item.Voucherd.DebitBuyer.account_holder_name =  item.Voucherd.DebitBuyer.account_holder_name && item.Voucherd.DebitBuyer.account_holder_name!==''? decrypt(item.Voucherd.DebitBuyer.account_holder_name):'';
            item.Voucherd.DebitBuyer.ifsc =  item.Voucherd.DebitBuyer.ifsc && item.Voucherd.DebitBuyer.ifsc!==''? decrypt(item.Voucherd.DebitBuyer.ifsc):'';
            item.Voucherd.DebitBuyer.pan_number =  item.Voucherd.DebitBuyer.pan_number && item.Voucherd.DebitBuyer.pan_number!==''? decrypt(item.Voucherd.DebitBuyer.pan_number):'';
            item.Voucherd.DebitBuyer.bank_account_number =  item.Voucherd.DebitBuyer.bank_account_number && item.Voucherd.DebitBuyer.bank_account_number!==''? decrypt(item.Voucherd.DebitBuyer.bank_account_number):'';
            item.Voucherd.DebitBuyer.website =  item.Voucherd.DebitBuyer.website && item.Voucherd.DebitBuyer.website!==''? decrypt(item.Voucherd.DebitBuyer.website):'';
            item.Voucherd.DebitBuyer.jurisdiction = item.Voucherd.DebitBuyer.jurisdiction && item.Voucherd.DebitBuyer.jurisdiction!==''? decrypt(item.Voucherd.DebitBuyer.jurisdiction):'';
            item.Voucherd.DebitBuyer.cin_number = item.Voucherd.DebitBuyer.cin_number && item.Voucherd.DebitBuyer.cin_number!==''? decrypt(item.Voucherd.DebitBuyer.cin_number):'';
          }

          if(item.Voucherd.item_entries && item.Voucherd.item_entries.length>0){
            item.Voucherd.item_entries.map(ele=>{
              ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
              ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
              ele.hsn_code = ele.hsn_code && ele.hsn_code!==''? decrypt(ele.hsn_code):'';
              ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
              ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
              ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            })
          }


          if(item.Voucherd.tax_entries && item.Voucherd.tax_entries.length>0){
            item.Voucherd.tax_entries.map(ele=>{
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

          item.Voucherd.amount = item.Voucherd.amount && item.Voucherd.amount!==''? decrypt(item.Voucherd.amount):'';
          item.Voucherd.narration = item.Voucherd.narration && item.Voucherd.narration!==''? decrypt(item.Voucherd.narration):'';
          item.Voucherd.bank_name = item.Voucherd.bank_name && item.Voucherd.bank_name!==''? decrypt(item.Voucherd.bank_name):'';
          item.Voucherd.bank_account_number = item.Voucherd.bank_account_number && item.Voucherd.bank_account_number!==''? decrypt(item.Voucherd.bank_account_number):'';
          item.Voucherd.bank_ifsc = item.Voucherd.bank_ifsc && item.Voucherd.bank_ifsc!==''? decrypt(item.Voucherd.bank_ifsc):'';
          item.Voucherd.shipping_address = item.Voucherd.shipping_address && item.Voucherd.shipping_address!==''? decrypt(item.Voucherd.shipping_address):'';
          item.Voucherd.sub_amount = item.Voucherd.sub_amount && item.Voucherd.sub_amount!==''? decrypt(item.Voucherd.sub_amount):'';
          item.Voucherd.discount = item.Voucherd.discount && item.Voucherd.discount!==''? decrypt(item.Voucherd.discount):'';
          item.Voucherd.total_amount = item.Voucherd.total_amount && item.Voucherd.total_amount!==''? decrypt(item.Voucherd.total_amount):'';
        } 

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


        if(item.Voucherid){
          if(item.Voucherid.SalesLedger){
            item.Voucherid.SalesLedger.name = item.Voucherid.SalesLedger.name && item.Voucherid.SalesLedger.name!==''? decrypt(item.Voucherid.SalesLedger.name):'';
            item.Voucherid.SalesLedger.email = item.Voucherid.SalesLedger.email && item.Voucherid.SalesLedger.email!==''? decrypt(item.Voucherid.SalesLedger.email):'';
            item.Voucherid.SalesLedger.amount = item.Voucherid.SalesLedger.amount && item.Voucherid.SalesLedger.amount!==''? decrypt(item.Voucherid.SalesLedger.amount):'';
            item.Voucherid.SalesLedger.phone = item.Voucherid.SalesLedger.phone && item.Voucherid.SalesLedger.phone!==''? decrypt(item.Voucherid.SalesLedger.phone):'';
            item.Voucherid.SalesLedger.street =  item.Voucherid.SalesLedger.street && item.Voucherid.SalesLedger.street!==''?decrypt(item.Voucherid.SalesLedger.street):'';
            item.Voucherid.SalesLedger.area = item.Voucherid.SalesLedger.area && item.Voucherid.SalesLedger.area!==''? decrypt(item.Voucherid.SalesLedger.area):'';
            item.Voucherid.SalesLedger.gst_number =  item.Voucherid.SalesLedger.gst_number && item.Voucherid.SalesLedger.gst_number!==''? decrypt(item.Voucherid.SalesLedger.gst_number):'';
            item.Voucherid.SalesLedger.opening_balance =  item.Voucherid.SalesLedger.opening_balance && item.Voucherid.SalesLedger.opening_balance!==''? decrypt(item.Voucherid.SalesLedger.opening_balance):'';
            item.Voucherid.SalesLedger.cess_Vouchers =  item.Voucherid.SalesLedger.cess_Vouchers && item.Voucherid.SalesLedger.cess_Vouchers!==''? decrypt(item.Voucherid.SalesLedger.cess_Vouchers):'';
            item.Voucherid.SalesLedger.bank_name =  item.Voucherid.SalesLedger.bank_name && item.Voucherid.SalesLedger.bank_name!==''? decrypt(item.Voucherid.SalesLedger.bank_name):'';
            item.Voucherid.SalesLedger.bank_branch =  item.Voucherid.SalesLedger.bank_branch && item.Voucherid.SalesLedger.bank_branch!==''? decrypt(item.Voucherid.SalesLedger.bank_branch):'';
            item.Voucherid.SalesLedger.account_holder_name =  item.Voucherid.SalesLedger.account_holder_name && item.Voucherid.SalesLedger.account_holder_name!==''? decrypt(item.Voucherid.SalesLedger.account_holder_name):'';
            item.Voucherid.SalesLedger.ifsc =  item.Voucherid.SalesLedger.ifsc && item.Voucherid.SalesLedger.ifsc!==''? decrypt(item.Voucherid.SalesLedger.ifsc):'';
            item.Voucherid.SalesLedger.pan_number =  item.Voucherid.SalesLedger.pan_number && item.Voucherid.SalesLedger.pan_number!==''? decrypt(item.Voucherid.SalesLedger.pan_number):'';
            item.Voucherid.SalesLedger.bank_account_number =  item.Voucherid.SalesLedger.bank_account_number && item.Voucherid.SalesLedger.bank_account_number!==''? decrypt(item.Voucherid.SalesLedger.bank_account_number):'';

            item.Voucherid.SalesLedger.website =   item.Voucherid.SalesLedger.website && item.Voucherid.SalesLedger.website!==''? decrypt(item.Voucherid.SalesLedger.website):'';
            item.Voucherid.SalesLedger.jurisdiction =   item.Voucherid.SalesLedger.jurisdiction && item.Voucherid.SalesLedger.jurisdiction!==''? decrypt(item.Voucherid.SalesLedger.jurisdiction):'';
            item.Voucherid.SalesLedger.cin_number =   item.Voucherid.SalesLedger.cin_number &&  item.Voucherid.SalesLedger.cin_number!==''? decrypt(item.Voucherid.SalesLedger.cin_number):'';
          }

          if(item.Voucherid.DebitBuyer){
            item.Voucherid.DebitBuyer.name = item.Voucherid.DebitBuyer.name && item.Voucherid.DebitBuyer.name!==''? decrypt(item.Voucherid.DebitBuyer.name):'';
            item.Voucherid.DebitBuyer.email = item.Voucherid.DebitBuyer.email && item.Voucherid.DebitBuyer.email!==''? decrypt(item.Voucherid.DebitBuyer.email):'';
            item.Voucherid.DebitBuyer.amount = item.Voucherid.DebitBuyer.amount && item.Voucherid.DebitBuyer.amount!==''? decrypt(item.Voucherid.DebitBuyer.amount):'';
            item.Voucherid.DebitBuyer.phone = item.Voucherid.DebitBuyer.phone && item.Voucherid.DebitBuyer.phone!==''? decrypt(item.Voucherid.DebitBuyer.phone):'';
            item.Voucherid.DebitBuyer.street =  item.Voucherid.DebitBuyer.street && item.Voucherid.DebitBuyer.street!==''?decrypt(item.Voucherid.DebitBuyer.street):'';
            item.Voucherid.DebitBuyer.area = item.Voucherid.DebitBuyer.area && item.Voucherid.DebitBuyer.area!==''? decrypt(item.Voucherid.DebitBuyer.area):'';
            item.Voucherid.DebitBuyer.gst_number =  item.Voucherid.DebitBuyer.gst_number && item.Voucherid.DebitBuyer.gst_number!==''? decrypt(item.Voucherid.DebitBuyer.gst_number):'';
            item.Voucherid.DebitBuyer.opening_balance =  item.Voucherid.DebitBuyer.opening_balance && item.Voucherid.DebitBuyer.opening_balance!==''? decrypt(item.Voucherid.DebitBuyer.opening_balance):'';
            item.Voucherid.DebitBuyer.cess_Vouchers =  item.Voucherid.DebitBuyer.cess_Vouchers && item.Voucherid.DebitBuyer.cess_Vouchers!==''? decrypt(item.Voucherid.DebitBuyer.cess_Vouchers):'';
            item.Voucherid.DebitBuyer.bank_name =  item.Voucherid.DebitBuyer.bank_name && item.Voucherid.DebitBuyer.bank_name!==''? decrypt(item.Voucherid.DebitBuyer.bank_name):'';
            item.Voucherid.DebitBuyer.bank_branch =  item.Voucherid.DebitBuyer.bank_branch && item.Voucherid.DebitBuyer.bank_branch!==''? decrypt(item.Voucherid.DebitBuyer.bank_branch):'';
            item.Voucherid.DebitBuyer.account_holder_name =  item.Voucherid.DebitBuyer.account_holder_name && item.Voucherid.DebitBuyer.account_holder_name!==''? decrypt(item.Voucherid.DebitBuyer.account_holder_name):'';
            item.Voucherid.DebitBuyer.ifsc =  item.Voucherid.DebitBuyer.ifsc && item.Voucherid.DebitBuyer.ifsc!==''? decrypt(item.Voucherid.DebitBuyer.ifsc):'';
            item.Voucherid.DebitBuyer.pan_number =  item.Voucherid.DebitBuyer.pan_number && item.Voucherid.DebitBuyer.pan_number!==''? decrypt(item.Voucherid.DebitBuyer.pan_number):'';
            item.Voucherid.DebitBuyer.bank_account_number =  item.Voucherid.DebitBuyer.bank_account_number && item.Voucherid.DebitBuyer.bank_account_number!==''? decrypt(item.Voucherid.DebitBuyer.bank_account_number):'';

            item.Voucherid.DebitBuyer.website =   item.Voucherid.DebitBuyer.website && item.Voucherid.DebitBuyer.website!==''? decrypt(item.Voucherid.DebitBuyer.website):'';
            item.Voucherid.DebitBuyer.jurisdiction =   item.Voucherid.DebitBuyer.jurisdiction && item.Voucherid.DebitBuyer.jurisdiction!==''? decrypt(item.Voucherid.DebitBuyer.jurisdiction):'';
            item.Voucherid.DebitBuyer.cin_number =   item.Voucherid.DebitBuyer.cin_number &&  item.Voucherid.DebitBuyer.cin_number!==''? decrypt(item.Voucherid.DebitBuyer.cin_number):'';
          }

          item.Voucherid.amount = item.Voucherid.amount && item.Voucherid.amount!==''? decrypt(item.Voucherid.amount):null;
          item.Voucherid.narration = item.Voucherid.narration && item.Voucherid.narration!==''? decrypt(item.Voucherid.narration):'';
          item.Voucherid.bank_name = item.Voucherid.bank_name && item.Voucherid.bank_name!==''? decrypt(item.Voucherid.bank_name):'';
          item.Voucherid.bank_account_number = item.Voucherid.bank_account_number && item.Voucherid.bank_account_number!==''? decrypt(item.Voucherid.bank_account_number):'';
          item.Voucherid.bank_ifsc = item.Voucherid.bank_ifsc && item.Voucherid.bank_ifsc!==''? decrypt(item.Voucherid.bank_ifsc):'';
          item.Voucherid.shipping_address = item.Voucherid.shipping_address && item.Voucherid.shipping_address!==''? decrypt(item.Voucherid.shipping_address):'';
          item.Voucherid.sub_amount = item.Voucherid.sub_amount && item.Voucherid.sub_amount!==''? decrypt(item.Voucherid.sub_amount):'';
          item.Voucherid.discount = item.Voucherid.discount && item.Voucherid.discount!==''? decrypt(item.Voucherid.discount):'';
          item.Voucherid.total_amount = item.Voucherid.total_amount && item.Voucherid.total_amount!==''? decrypt(item.Voucherid.total_amount):'';
        } 
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        // item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.model = item.model && item.model!==''? decrypt(item.model):'';
        item.hsn_code =  item.hsn_code && item.hsn_code!==''?decrypt(item.hsn_code):'';
        item.price = item.price && item.price!==''? decrypt(item.price):'';
        item.total_value =item.total_value && item.total_value!==''? decrypt(item.total_value):'';
        item.rate =  item.rate && item.rate!==''? decrypt(item.rate):'';


        item.amount = item.amount && item.amount!==''? decrypt(item.amount):'';


        item.narration = item.narration && item.narration!==''? decrypt(item.narration):'';
        item.bank_name = item.bank_name && item.bank_name!==''? decrypt(item.bank_name):'';
        item.bank_account_number = item.bank_account_number && item.bank_account_number!==''? decrypt(item.bank_account_number):'';
        item.bank_ifsc = item.bank_ifsc && item.bank_ifsc!==''? decrypt(item.bank_ifsc):'';
        item.shipping_address =  item.shipping_address && item.shipping_address!==''?decrypt(item.shipping_address):'';
        item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.sub_amount =  item.sub_amount && item.sub_amount!==''? decrypt(item.sub_amount):'';
        item.discount =  item.discount && item.discount!==''? decrypt(item.discount):'';
        item.total_amount =  item.total_amount && item.total_amount!==''? decrypt(item.total_amount):'';
    });
    return data;
  }else if(type==="object"){
    if( data.dataValues.DebitBuyer){
       data.dataValues.DebitBuyer.name =  data.dataValues.DebitBuyer.name &&  data.dataValues.DebitBuyer.name!==''?decrypt( data.dataValues.DebitBuyer.name):'';
       data.dataValues.DebitBuyer.amount =  data.dataValues.DebitBuyer.amount &&  data.dataValues.DebitBuyer.amount!==''?decrypt( data.dataValues.DebitBuyer.amount):'';
       data.dataValues.DebitBuyer.opening_balance =  data.dataValues.DebitBuyer.opening_balance &&  data.dataValues.DebitBuyer.opening_balance!==''?decrypt( data.dataValues.DebitBuyer.opening_balance):'';



       data.dataValues.DebitBuyer.account_holder_name =  data.dataValues.DebitBuyer.account_holder_name &&  data.dataValues.DebitBuyer.account_holder_name!==''?decrypt( data.dataValues.DebitBuyer.account_holder_name):'';
       data.dataValues.DebitBuyer.bank_account_number =  data.dataValues.DebitBuyer.bank_account_number &&  data.dataValues.DebitBuyer.bank_account_number!==''?decrypt( data.dataValues.DebitBuyer.bank_account_number):'';
       data.dataValues.DebitBuyer.bank_branch =  data.dataValues.DebitBuyer.bank_branch &&  data.dataValues.DebitBuyer.bank_branch!==''?decrypt( data.dataValues.DebitBuyer.bank_branch):'';
       data.dataValues.DebitBuyer.bank_name =  data.dataValues.DebitBuyer.bank_name &&  data.dataValues.DebitBuyer.bank_name!==''?decrypt( data.dataValues.DebitBuyer.bank_name):'';

       data.dataValues.DebitBuyer.website =  data.dataValues.DebitBuyer.website && data.dataValues.DebitBuyer.website!==''? decrypt(data.dataValues.DebitBuyer.website):'';
       data.dataValues.DebitBuyer.jurisdiction = data.dataValues.DebitBuyer.jurisdiction && data.dataValues.DebitBuyer.jurisdiction!==''? decrypt(data.dataValues.DebitBuyer.jurisdiction):'';
       data.dataValues.DebitBuyer.cin_number = data.dataValues.DebitBuyer.cin_number && data.dataValues.DebitBuyer.cin_number!==''? decrypt(data.dataValues.DebitBuyer.cin_number):'';
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