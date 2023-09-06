const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv =  Buffer.from("770f0c773ce18d38534838801446dc31", 'hex');

let key = '';
export const encreptionPurchase = async(data) => {
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

export const decreptionPurchase = async(data, type, keydata) => {
  key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
  if(await type==='array'){
    await data.map(item=>{
        if(item.PurchaseLedger){
          item.PurchaseLedger.name = item.PurchaseLedger.name && item.PurchaseLedger.name!==''? decrypt(item.PurchaseLedger.name):'';
          item.PurchaseLedger.email = item.PurchaseLedger.email && item.PurchaseLedger.email!==''? decrypt(item.PurchaseLedger.email):'';
          item.PurchaseLedger.amount = item.PurchaseLedger.amount && item.PurchaseLedger.amount!==''? decrypt(item.PurchaseLedger.amount):'';
          item.PurchaseLedger.phone = item.PurchaseLedger.phone && item.PurchaseLedger.phone!==''? decrypt(item.PurchaseLedger.phone):'';
          item.PurchaseLedger.street =  item.PurchaseLedger.street && item.PurchaseLedger.street!==''?decrypt(item.PurchaseLedger.street):'';
          item.PurchaseLedger.area = item.PurchaseLedger.area && item.PurchaseLedger.area!==''? decrypt(item.PurchaseLedger.area):'';
          item.PurchaseLedger.gst_number =  item.PurchaseLedger.gst_number && item.PurchaseLedger.gst_number!==''? decrypt(item.PurchaseLedger.gst_number):'';
          item.PurchaseLedger.opening_balance =  item.PurchaseLedger.opening_balance && item.PurchaseLedger.opening_balance!==''? decrypt(item.PurchaseLedger.opening_balance):'';
          item.PurchaseLedger.cess_tax =  item.PurchaseLedger.cess_tax && item.PurchaseLedger.cess_tax!==''? decrypt(item.PurchaseLedger.cess_tax):'';
          item.PurchaseLedger.bank_name =  item.PurchaseLedger.bank_name && item.PurchaseLedger.bank_name!==''? decrypt(item.PurchaseLedger.bank_name):'';
          item.PurchaseLedger.bank_branch =  item.PurchaseLedger.bank_branch && item.PurchaseLedger.bank_branch!==''? decrypt(item.PurchaseLedger.bank_branch):'';
          item.PurchaseLedger.account_holder_name =  item.PurchaseLedger.account_holder_name && item.PurchaseLedger.account_holder_name!==''? decrypt(item.PurchaseLedger.account_holder_name):'';
          item.PurchaseLedger.ifsc =  item.PurchaseLedger.ifsc && item.PurchaseLedger.ifsc!==''? decrypt(item.PurchaseLedger.ifsc):'';
          item.PurchaseLedger.pan_number =  item.PurchaseLedger.pan_number && item.PurchaseLedger.pan_number!==''? decrypt(item.PurchaseLedger.pan_number):'';
          item.PurchaseLedger.bank_account_number =  item.PurchaseLedger.bank_account_number && item.PurchaseLedger.bank_account_number!==''? decrypt(item.PurchaseLedger.bank_account_number):'';
          item.PurchaseLedger.website =  item.PurchaseLedger.website && item.PurchaseLedger.website!==''? decrypt(item.PurchaseLedger.website):'';
          item.PurchaseLedger.jurisdiction =  item.PurchaseLedger.jurisdiction && item.PurchaseLedger.jurisdiction!==''? decrypt(item.PurchaseLedger.jurisdiction):'';
          item.PurchaseLedger.cin_number =  item.PurchaseLedger.cin_number && item.PurchaseLedger.cin_number!==''? decrypt(item.PurchaseLedger.cin_number):'';
        }


        if(item.PurchaseRoundLedger){
          item.PurchaseRoundLedger.name = item.PurchaseRoundLedger.name && item.PurchaseRoundLedger.name!==''? decrypt(item.PurchaseRoundLedger.name):'';
          item.PurchaseRoundLedger.email = item.PurchaseRoundLedger.email && item.PurchaseRoundLedger.email!==''? decrypt(item.PurchaseRoundLedger.email):'';
          item.PurchaseRoundLedger.amount = item.PurchaseRoundLedger.amount && item.PurchaseRoundLedger.amount!==''? decrypt(item.PurchaseRoundLedger.amount):'';
          item.PurchaseRoundLedger.phone = item.PurchaseRoundLedger.phone && item.PurchaseRoundLedger.phone!==''? decrypt(item.PurchaseRoundLedger.phone):'';
          item.PurchaseRoundLedger.street =  item.PurchaseRoundLedger.street && item.PurchaseRoundLedger.street!==''?decrypt(item.PurchaseRoundLedger.street):'';
          item.PurchaseRoundLedger.area = item.PurchaseRoundLedger.area && item.PurchaseRoundLedger.area!==''? decrypt(item.PurchaseRoundLedger.area):'';
          item.PurchaseRoundLedger.gst_number =  item.PurchaseRoundLedger.gst_number && item.PurchaseRoundLedger.gst_number!==''? decrypt(item.PurchaseRoundLedger.gst_number):'';
          item.PurchaseRoundLedger.opening_balance =  item.PurchaseRoundLedger.opening_balance && item.PurchaseRoundLedger.opening_balance!==''? decrypt(item.PurchaseRoundLedger.opening_balance):'';
          item.PurchaseRoundLedger.cess_tax =  item.PurchaseRoundLedger.cess_tax && item.PurchaseRoundLedger.cess_tax!==''? decrypt(item.PurchaseRoundLedger.cess_tax):'';
          item.PurchaseRoundLedger.bank_name =  item.PurchaseRoundLedger.bank_name && item.PurchaseRoundLedger.bank_name!==''? decrypt(item.PurchaseRoundLedger.bank_name):'';
          item.PurchaseRoundLedger.bank_branch =  item.PurchaseRoundLedger.bank_branch && item.PurchaseRoundLedger.bank_branch!==''? decrypt(item.PurchaseRoundLedger.bank_branch):'';
          item.PurchaseRoundLedger.account_holder_name =  item.PurchaseRoundLedger.account_holder_name && item.PurchaseRoundLedger.account_holder_name!==''? decrypt(item.PurchaseRoundLedger.account_holder_name):'';
          item.PurchaseRoundLedger.ifsc =  item.PurchaseRoundLedger.ifsc && item.PurchaseRoundLedger.ifsc!==''? decrypt(item.PurchaseRoundLedger.ifsc):'';
          item.PurchaseRoundLedger.pan_number =  item.PurchaseRoundLedger.pan_number && item.PurchaseRoundLedger.pan_number!==''? decrypt(item.PurchaseRoundLedger.pan_number):'';
          item.PurchaseRoundLedger.bank_account_number =  item.PurchaseRoundLedger.bank_account_number && item.PurchaseRoundLedger.bank_account_number!==''? decrypt(item.PurchaseRoundLedger.bank_account_number):'';

          item.PurchaseRoundLedger.website =  item.PurchaseRoundLedger.website && item.PurchaseRoundLedger.website!==''? decrypt(item.PurchaseRoundLedger.website):'';
          item.PurchaseRoundLedger.jurisdiction = item.PurchaseRoundLedger.jurisdiction && item.PurchaseRoundLedger.jurisdiction!==''? decrypt(item.PurchaseRoundLedger.jurisdiction):'';
          item.PurchaseRoundLedger.cin_number = item.PurchaseRoundLedger.cin_number && item.PurchaseRoundLedger.cin_number!==''? decrypt(item.PurchaseRoundLedger.cin_number):'';
        }
        
        if(item.PurchaseDiscountLedger){
          item.PurchaseDiscountLedger.name = item.PurchaseDiscountLedger.name && item.PurchaseDiscountLedger.name!==''? decrypt(item.PurchaseDiscountLedger.name):'';
          item.PurchaseDiscountLedger.email = item.PurchaseDiscountLedger.email && item.PurchaseDiscountLedger.email!==''? decrypt(item.PurchaseDiscountLedger.email):'';
          item.PurchaseDiscountLedger.amount = item.PurchaseDiscountLedger.amount && item.PurchaseDiscountLedger.amount!==''? decrypt(item.PurchaseDiscountLedger.amount):'';
          item.PurchaseDiscountLedger.phone = item.PurchaseDiscountLedger.phone && item.PurchaseDiscountLedger.phone!==''? decrypt(item.PurchaseDiscountLedger.phone):'';
          item.PurchaseDiscountLedger.street =  item.PurchaseDiscountLedger.street && item.PurchaseDiscountLedger.street!==''?decrypt(item.PurchaseDiscountLedger.street):'';
          item.PurchaseDiscountLedger.area = item.PurchaseDiscountLedger.area && item.PurchaseDiscountLedger.area!==''? decrypt(item.PurchaseDiscountLedger.area):'';
          item.PurchaseDiscountLedger.gst_number =  item.PurchaseDiscountLedger.gst_number && item.PurchaseDiscountLedger.gst_number!==''? decrypt(item.PurchaseDiscountLedger.gst_number):'';
          item.PurchaseDiscountLedger.opening_balance =  item.PurchaseDiscountLedger.opening_balance && item.PurchaseDiscountLedger.opening_balance!==''? decrypt(item.PurchaseDiscountLedger.opening_balance):'';
          item.PurchaseDiscountLedger.cess_tax =  item.PurchaseDiscountLedger.cess_tax && item.PurchaseDiscountLedger.cess_tax!==''? decrypt(item.PurchaseDiscountLedger.cess_tax):'';
          item.PurchaseDiscountLedger.bank_name =  item.PurchaseDiscountLedger.bank_name && item.PurchaseDiscountLedger.bank_name!==''? decrypt(item.PurchaseDiscountLedger.bank_name):'';
          item.PurchaseDiscountLedger.bank_branch =  item.PurchaseDiscountLedger.bank_branch && item.PurchaseDiscountLedger.bank_branch!==''? decrypt(item.PurchaseDiscountLedger.bank_branch):'';
          item.PurchaseDiscountLedger.account_holder_name =  item.PurchaseDiscountLedger.account_holder_name && item.PurchaseDiscountLedger.account_holder_name!==''? decrypt(item.PurchaseDiscountLedger.account_holder_name):'';
          item.PurchaseDiscountLedger.ifsc =  item.PurchaseDiscountLedger.ifsc && item.PurchaseDiscountLedger.ifsc!==''? decrypt(item.PurchaseDiscountLedger.ifsc):'';
          item.PurchaseDiscountLedger.pan_number =  item.PurchaseDiscountLedger.pan_number && item.PurchaseDiscountLedger.pan_number!==''? decrypt(item.PurchaseDiscountLedger.pan_number):'';
          item.PurchaseDiscountLedger.bank_account_number =  item.PurchaseDiscountLedger.bank_account_number && item.PurchaseDiscountLedger.bank_account_number!==''? decrypt(item.PurchaseDiscountLedger.bank_account_number):'';

          item.PurchaseDiscountLedger.website =  item.PurchaseDiscountLedger.website && item.PurchaseDiscountLedger.website!==''? decrypt(item.PurchaseDiscountLedger.website):'';
          item.PurchaseDiscountLedger.jurisdiction =  item.PurchaseDiscountLedger.jurisdiction && item.PurchaseDiscountLedger.jurisdiction!==''? decrypt(item.PurchaseDiscountLedger.jurisdiction):'';
          item.PurchaseDiscountLedger.cin_number =  item.PurchaseDiscountLedger.cin_number && item.PurchaseDiscountLedger.cin_number!==''? decrypt(item.PurchaseDiscountLedger.cin_number):'';

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
          item.ledger.cess_tax =  item.ledger.cess_tax && item.ledger.cess_tax!==''? decrypt(item.ledger.cess_tax):'';
          item.ledger.bank_name =  item.ledger.bank_name && item.ledger.bank_name!==''? decrypt(item.ledger.bank_name):'';
          item.ledger.bank_branch =  item.ledger.bank_branch && item.ledger.bank_branch!==''? decrypt(item.ledger.bank_branch):'';
          item.ledger.account_holder_name =  item.ledger.account_holder_name && item.ledger.account_holder_name!==''? decrypt(item.ledger.account_holder_name):'';
          item.ledger.ifsc =  item.ledger.ifsc && item.ledger.ifsc!==''? decrypt(item.ledger.ifsc):'';
          item.ledger.pan_number =  item.ledger.pan_number && item.ledger.pan_number!==''? decrypt(item.ledger.pan_number):'';
          item.ledger.bank_account_number =  item.ledger.bank_account_number && item.ledger.bank_account_number!==''? decrypt(item.ledger.bank_account_number):'';

          item.ledger.website =  item.ledger.website && item.ledger.website!==''? decrypt(item.ledger.website):'';
          item.ledger.jurisdiction = item.ledger.jurisdiction && item.ledger.jurisdiction!==''? decrypt(item.ledger.jurisdiction):'';
          item.ledger.cin_number = item.ledger.cin_number && item.ledger.cin_number!==''? decrypt(item.ledger.cin_number):'';
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

              voucher.ledger.website =   voucher.ledger.website &&  voucher.ledger.website!==''? decrypt(voucher.ledger.website):'';
              voucher.ledger.jurisdiction =  voucher.ledger.jurisdiction &&  voucher.ledger.jurisdiction!==''? decrypt(voucher.ledger.jurisdiction):'';
              voucher.ledger.cin_number = voucher.ledger.cin_number &&  voucher.ledger.cin_number!==''? decrypt(voucher.ledger.cin_number):'';
            }
          })
        }

        if(item.company){
            item.company.company_name = item.company.company_name && item.company.company_name!==''?decrypt(item.company.company_name):'';
            item.company.company_pan_number = item.company.company_pan_number && item.company.company_pan_number!==''?decrypt(item.company.company_pan_number):'';
            item.company.gst_number = item.company.gst_number && item.company.gst_number!==''?decrypt(item.company.gst_number):'';
            item.company.street = item.company.street && item.company.street!==''?decrypt(item.company.street):'';
            item.company.area = item.company.area && item.company.area!==''?decrypt(item.company.area):'';
            item.company.company_logo = item.company.company_logo && item.company.company_logo!==''?decrypt(item.company.company_logo):'';
        }


        if(item.Voucherip){
          if(item.Voucherip.PurchaseLedger){
            item.Voucherip.PurchaseLedger.name = item.Voucherip.PurchaseLedger.name && item.Voucherip.PurchaseLedger.name!==''? decrypt(item.Voucherip.PurchaseLedger.name):'';
            item.Voucherip.PurchaseLedger.email = item.Voucherip.PurchaseLedger.email && item.Voucherip.PurchaseLedger.email!==''? decrypt(item.Voucherip.PurchaseLedger.email):'';
            item.Voucherip.PurchaseLedger.amount = item.Voucherip.PurchaseLedger.amount && item.Voucherip.PurchaseLedger.amount!==''? decrypt(item.Voucherip.PurchaseLedger.amount):'';
            item.Voucherip.PurchaseLedger.phone = item.Voucherip.PurchaseLedger.phone && item.Voucherip.PurchaseLedger.phone!==''? decrypt(item.Voucherip.PurchaseLedger.phone):'';
            item.Voucherip.PurchaseLedger.street =  item.Voucherip.PurchaseLedger.street && item.Voucherip.PurchaseLedger.street!==''?decrypt(item.Voucherip.PurchaseLedger.street):'';
            item.Voucherip.PurchaseLedger.area = item.Voucherip.PurchaseLedger.area && item.Voucherip.PurchaseLedger.area!==''? decrypt(item.Voucherip.PurchaseLedger.area):'';
            item.Voucherip.PurchaseLedger.gst_number =  item.Voucherip.PurchaseLedger.gst_number && item.Voucherip.PurchaseLedger.gst_number!==''? decrypt(item.Voucherip.PurchaseLedger.gst_number):'';
            item.Voucherip.PurchaseLedger.opening_balance =  item.Voucherip.PurchaseLedger.opening_balance && item.Voucherip.PurchaseLedger.opening_balance!==''? decrypt(item.Voucherip.PurchaseLedger.opening_balance):'';
            item.Voucherip.PurchaseLedger.cess_Vouchers =  item.Voucherip.PurchaseLedger.cess_Vouchers && item.Voucherip.PurchaseLedger.cess_Vouchers!==''? decrypt(item.Voucherip.PurchaseLedger.cess_Vouchers):'';
            item.Voucherip.PurchaseLedger.bank_name =  item.Voucherip.PurchaseLedger.bank_name && item.Voucherip.PurchaseLedger.bank_name!==''? decrypt(item.Voucherip.PurchaseLedger.bank_name):'';
            item.Voucherip.PurchaseLedger.bank_branch =  item.Voucherip.PurchaseLedger.bank_branch && item.Voucherip.PurchaseLedger.bank_branch!==''? decrypt(item.Voucherip.PurchaseLedger.bank_branch):'';
            item.Voucherip.PurchaseLedger.account_holder_name =  item.Voucherip.PurchaseLedger.account_holder_name && item.Voucherip.PurchaseLedger.account_holder_name!==''? decrypt(item.Voucherip.PurchaseLedger.account_holder_name):'';
            item.Voucherip.PurchaseLedger.ifsc =  item.Voucherip.PurchaseLedger.ifsc && item.Voucherip.PurchaseLedger.ifsc!==''? decrypt(item.Voucherip.PurchaseLedger.ifsc):'';
            item.Voucherip.PurchaseLedger.pan_number =  item.Voucherip.PurchaseLedger.pan_number && item.Voucherip.PurchaseLedger.pan_number!==''? decrypt(item.Voucherip.PurchaseLedger.pan_number):'';
            item.Voucherip.PurchaseLedger.bank_account_number =  item.Voucherip.PurchaseLedger.bank_account_number && item.Voucherip.PurchaseLedger.bank_account_number!==''? decrypt(item.Voucherip.PurchaseLedger.bank_account_number):'';

            item.Voucherip.PurchaseLedger.website =   item.Voucherip.PurchaseLedger.website && item.Voucherip.PurchaseLedger.website!==''? decrypt(item.Voucherip.PurchaseLedger.website):'';
            item.Voucherip.PurchaseLedger.jurisdiction =   item.Voucherip.PurchaseLedger.jurisdiction && item.Voucherip.PurchaseLedger.jurisdiction!==''? decrypt(item.Voucherip.PurchaseLedger.jurisdiction):'';
            item.Voucherip.PurchaseLedger.cin_number =   item.Voucherip.PurchaseLedger.cin_number &&  item.Voucherip.PurchaseLedger.cin_number!==''? decrypt(item.Voucherip.PurchaseLedger.cin_number):'';
          }

          // if(item.Voucherip.PurchaseLedger){
          //   item.Voucherip.PurchaseLedger.name = item.Voucherip.PurchaseLedger.name && item.Voucherip.PurchaseLedger.name!==''? decrypt(item.Voucherip.PurchaseLedger.name):'';
          //   item.Voucherip.PurchaseLedger.email = item.Voucherip.PurchaseLedger.email && item.Voucherip.PurchaseLedger.email!==''? decrypt(item.Voucherip.PurchaseLedger.email):'';
          //   item.Voucherip.PurchaseLedger.amount = item.Voucherip.PurchaseLedger.amount && item.Voucherip.PurchaseLedger.amount!==''? decrypt(item.Voucherip.PurchaseLedger.amount):'';
          //   item.Voucherip.PurchaseLedger.phone = item.Voucherip.PurchaseLedger.phone && item.Voucherip.PurchaseLedger.phone!==''? decrypt(item.Voucherip.PurchaseLedger.phone):'';
          //   item.Voucherip.PurchaseLedger.street =  item.Voucherip.PurchaseLedger.street && item.Voucherip.PurchaseLedger.street!==''?decrypt(item.Voucherip.PurchaseLedger.street):'';
          //   item.Voucherip.PurchaseLedger.area = item.Voucherip.PurchaseLedger.area && item.Voucherip.PurchaseLedger.area!==''? decrypt(item.Voucherip.PurchaseLedger.area):'';
          //   item.Voucherip.PurchaseLedger.gst_number =  item.Voucherip.PurchaseLedger.gst_number && item.Voucherip.PurchaseLedger.gst_number!==''? decrypt(item.Voucherip.PurchaseLedger.gst_number):'';
          //   item.Voucherip.PurchaseLedger.opening_balance =  item.Voucherip.PurchaseLedger.opening_balance && item.Voucherip.PurchaseLedger.opening_balance!==''? decrypt(item.Voucherip.PurchaseLedger.opening_balance):'';
          //   item.Voucherip.PurchaseLedger.cess_tax =  item.Voucherip.PurchaseLedger.cess_tax && item.Voucherip.PurchaseLedger.cess_tax!==''? decrypt(item.Voucherip.PurchaseLedger.cess_tax):'';
          //   item.Voucherip.PurchaseLedger.bank_name =  item.Voucherip.PurchaseLedger.bank_name && item.Voucherip.PurchaseLedger.bank_name!==''? decrypt(item.Voucherip.PurchaseLedger.bank_name):'';
          //   item.Voucherip.PurchaseLedger.bank_branch =  item.Voucherip.PurchaseLedger.bank_branch && item.Voucherip.PurchaseLedger.bank_branch!==''? decrypt(item.Voucherip.PurchaseLedger.bank_branch):'';
          //   item.Voucherip.PurchaseLedger.account_holder_name =  item.Voucherip.PurchaseLedger.account_holder_name && item.Voucherip.PurchaseLedger.account_holder_name!==''? decrypt(item.Voucherip.PurchaseLedger.account_holder_name):'';
          //   item.Voucherip.PurchaseLedger.ifsc =  item.Voucherip.PurchaseLedger.ifsc && item.Voucherip.PurchaseLedger.ifsc!==''? decrypt(item.Voucherip.PurchaseLedger.ifsc):'';
          //   item.Voucherip.PurchaseLedger.pan_number =  item.Voucherip.PurchaseLedger.pan_number && item.Voucherip.PurchaseLedger.pan_number!==''? decrypt(item.Voucherip.PurchaseLedger.pan_number):'';
          //   item.Voucherip.PurchaseLedger.bank_account_number =  item.Voucherip.PurchaseLedger.bank_account_number && item.Voucherip.PurchaseLedger.bank_account_number!==''? decrypt(item.Voucherip.PurchaseLedger.bank_account_number):'';
  
          //   item.Voucherip.PurchaseLedger.website =  item.Voucherip.PurchaseLedger.website && item.Voucherip.PurchaseLedger.website!==''? decrypt(item.Voucherip.PurchaseLedger.website):'';
          //   item.Voucherip.PurchaseLedger.jurisdiction = item.Voucherip.PurchaseLedger.jurisdiction && item.Voucherip.PurchaseLedger.jurisdiction!==''? decrypt(item.Voucherip.PurchaseLedger.jurisdiction):'';
          //   item.Voucherip.PurchaseLedger.cin_number = item.Voucherip.PurchaseLedger.cin_number && item.Voucherip.PurchaseLedger.cin_number!==''? decrypt(item.Voucherip.PurchaseLedger.cin_number):'';
          // }
  

          
          item.Voucherip.amount = item.Voucherip.amount && item.Voucherip.amount!==''? decrypt(item.Voucherip.amount):null;
          item.Voucherip.narration = item.Voucherip.narration && item.Voucherip.narration!==''? decrypt(item.Voucherip.narration):'';
          item.Voucherip.bank_name = item.Voucherip.bank_name && item.Voucherip.bank_name!==''? decrypt(item.Voucherip.bank_name):'';
          item.Voucherip.bank_account_number = item.Voucherip.bank_account_number && item.Voucherip.bank_account_number!==''? decrypt(item.Voucherip.bank_account_number):'';
          item.Voucherip.bank_ifsc = item.Voucherip.bank_ifsc && item.Voucherip.bank_ifsc!==''? decrypt(item.Voucherip.bank_ifsc):'';
          item.Voucherip.shipping_address = item.Voucherip.shipping_address && item.Voucherip.shipping_address!==''? decrypt(item.Voucherip.shipping_address):'';
          item.Voucherip.sub_amount = item.Voucherip.sub_amount && item.Voucherip.sub_amount!==''? decrypt(item.Voucherip.sub_amount):'';
          item.Voucherip.discount = item.Voucherip.discount && item.Voucherip.discount!==''? decrypt(item.Voucherip.discount):'';
          item.Voucherip.total_amount = item.Voucherip.total_amount && item.Voucherip.total_amount!==''? decrypt(item.Voucherip.total_amount):'';
        } 
        item.quantity = item.quantity && item.quantity!==''? decrypt(item.quantity):'';
        item.name = item.name && item.name!==''? decrypt(item.name):'';
        item.description = item.description && item.description!==''? decrypt(item.description):'';
        item.model = item.model && item.model!==''? decrypt(item.model):'';
        item.hsn_code =  item.hsn_code && item.hsn_code!==''?decrypt(item.hsn_code):'';
        item.price = item.price && item.price!==''? decrypt(item.price):'';
        item.total_value =item.total_value && item.total_value!==''? decrypt(item.total_value):'';
        item.rate =  item.rate && item.rate!==''? decrypt(item.rate):'';


        if(item.tax){
          if(item.tax.PurchaseLedger){
            item.tax.PurchaseLedger.name = item.tax.PurchaseLedger.name && item.tax.PurchaseLedger.name!==''? decrypt(item.tax.PurchaseLedger.name):'';
            item.tax.PurchaseLedger.email = item.tax.PurchaseLedger.email && item.tax.PurchaseLedger.email!==''? decrypt(item.tax.PurchaseLedger.email):'';
            item.tax.PurchaseLedger.amount = item.tax.PurchaseLedger.amount && item.tax.PurchaseLedger.amount!==''? decrypt(item.tax.PurchaseLedger.amount):'';
            item.tax.PurchaseLedger.phone = item.tax.PurchaseLedger.phone && item.tax.PurchaseLedger.phone!==''? decrypt(item.tax.PurchaseLedger.phone):'';
            item.tax.PurchaseLedger.street =  item.tax.PurchaseLedger.street && item.tax.PurchaseLedger.street!==''?decrypt(item.tax.PurchaseLedger.street):'';
            item.tax.PurchaseLedger.area = item.tax.PurchaseLedger.area && item.tax.PurchaseLedger.area!==''? decrypt(item.tax.PurchaseLedger.area):'';
            item.tax.PurchaseLedger.gst_number =  item.tax.PurchaseLedger.gst_number && item.tax.PurchaseLedger.gst_number!==''? decrypt(item.tax.PurchaseLedger.gst_number):'';
            item.tax.PurchaseLedger.opening_balance =  item.tax.PurchaseLedger.opening_balance && item.tax.PurchaseLedger.opening_balance!==''? decrypt(item.tax.PurchaseLedger.opening_balance):'';
            item.tax.PurchaseLedger.cess_tax =  item.tax.PurchaseLedger.cess_tax && item.tax.PurchaseLedger.cess_tax!==''? decrypt(item.tax.PurchaseLedger.cess_tax):'';
            item.tax.PurchaseLedger.bank_name =  item.tax.PurchaseLedger.bank_name && item.tax.PurchaseLedger.bank_name!==''? decrypt(item.tax.PurchaseLedger.bank_name):'';
            item.tax.PurchaseLedger.bank_branch =  item.tax.PurchaseLedger.bank_branch && item.tax.PurchaseLedger.bank_branch!==''? decrypt(item.tax.PurchaseLedger.bank_branch):'';
            item.tax.PurchaseLedger.account_holder_name =  item.tax.PurchaseLedger.account_holder_name && item.tax.PurchaseLedger.account_holder_name!==''? decrypt(item.tax.PurchaseLedger.account_holder_name):'';
            item.tax.PurchaseLedger.ifsc =  item.tax.PurchaseLedger.ifsc && item.tax.PurchaseLedger.ifsc!==''? decrypt(item.tax.PurchaseLedger.ifsc):'';
            item.tax.PurchaseLedger.pan_number =  item.tax.PurchaseLedger.pan_number && item.tax.PurchaseLedger.pan_number!==''? decrypt(item.tax.PurchaseLedger.pan_number):'';
            item.tax.PurchaseLedger.bank_account_number =  item.tax.PurchaseLedger.bank_account_number && item.tax.PurchaseLedger.bank_account_number!==''? decrypt(item.tax.PurchaseLedger.bank_account_number):'';

            item.tax.PurchaseLedger.website =  item.tax.PurchaseLedger.website && item.tax.PurchaseLedger.website!==''? decrypt(item.tax.PurchaseLedger.website):'';
            item.tax.PurchaseLedger.jurisdiction = item.tax.PurchaseLedger.jurisdiction &&  item.tax.PurchaseLedger.jurisdiction!==''? decrypt(item.tax.PurchaseLedger.jurisdiction):'';
            item.tax.PurchaseLedger.cin_number = item.tax.PurchaseLedger.cin_number && item.tax.PurchaseLedger.cin_number!==''? decrypt(item.tax.PurchaseLedger.cin_number):'';
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

        if(item.Voucherp){
          if(item.Voucherp.PurchaseLedger){
            item.Voucherp.PurchaseLedger.name = item.Voucherp.PurchaseLedger.name && item.Voucherp.PurchaseLedger.name!==''? decrypt(item.Voucherp.PurchaseLedger.name):'';
            item.Voucherp.PurchaseLedger.email = item.Voucherp.PurchaseLedger.email && item.Voucherp.PurchaseLedger.email!==''? decrypt(item.Voucherp.PurchaseLedger.email):'';
            item.Voucherp.PurchaseLedger.amount = item.Voucherp.PurchaseLedger.amount && item.Voucherp.PurchaseLedger.amount!==''? decrypt(item.Voucherp.PurchaseLedger.amount):'';
            item.Voucherp.PurchaseLedger.phone = item.Voucherp.PurchaseLedger.phone && item.Voucherp.PurchaseLedger.phone!==''? decrypt(item.Voucherp.PurchaseLedger.phone):'';
            item.Voucherp.PurchaseLedger.street =  item.Voucherp.PurchaseLedger.street && item.Voucherp.PurchaseLedger.street!==''?decrypt(item.Voucherp.PurchaseLedger.street):'';
            item.Voucherp.PurchaseLedger.area = item.Voucherp.PurchaseLedger.area && item.Voucherp.PurchaseLedger.area!==''? decrypt(item.Voucherp.PurchaseLedger.area):'';
            item.Voucherp.PurchaseLedger.gst_number =  item.Voucherp.PurchaseLedger.gst_number && item.Voucherp.PurchaseLedger.gst_number!==''? decrypt(item.Voucherp.PurchaseLedger.gst_number):'';
            item.Voucherp.PurchaseLedger.opening_balance =  item.Voucherp.PurchaseLedger.opening_balance && item.Voucherp.PurchaseLedger.opening_balance!==''? decrypt(item.Voucherp.PurchaseLedger.opening_balance):'';
            item.Voucherp.PurchaseLedger.cess_Voucherp =  item.Voucherp.PurchaseLedger.cess_Voucherp && item.Voucherp.PurchaseLedger.cess_Voucherp!==''? decrypt(item.Voucherp.PurchaseLedger.cess_Voucherp):'';
            item.Voucherp.PurchaseLedger.bank_name =  item.Voucherp.PurchaseLedger.bank_name && item.Voucherp.PurchaseLedger.bank_name!==''? decrypt(item.Voucherp.PurchaseLedger.bank_name):'';
            item.Voucherp.PurchaseLedger.bank_branch =  item.Voucherp.PurchaseLedger.bank_branch && item.Voucherp.PurchaseLedger.bank_branch!==''? decrypt(item.Voucherp.PurchaseLedger.bank_branch):'';
            item.Voucherp.PurchaseLedger.account_holder_name =  item.Voucherp.PurchaseLedger.account_holder_name && item.Voucherp.PurchaseLedger.account_holder_name!==''? decrypt(item.Voucherp.PurchaseLedger.account_holder_name):'';
            item.Voucherp.PurchaseLedger.ifsc =  item.Voucherp.PurchaseLedger.ifsc && item.Voucherp.PurchaseLedger.ifsc!==''? decrypt(item.Voucherp.PurchaseLedger.ifsc):'';
            item.Voucherp.PurchaseLedger.pan_number =  item.Voucherp.PurchaseLedger.pan_number && item.Voucherp.PurchaseLedger.pan_number!==''? decrypt(item.Voucherp.PurchaseLedger.pan_number):'';
            item.Voucherp.PurchaseLedger.bank_account_number =  item.Voucherp.PurchaseLedger.bank_account_number && item.Voucherp.PurchaseLedger.bank_account_number!==''? decrypt(item.Voucherp.PurchaseLedger.bank_account_number):'';

            item.Voucherp.PurchaseLedger.website =  item.Voucherp.PurchaseLedger.website && item.Voucherp.PurchaseLedger.website!==''? decrypt(item.Voucherp.PurchaseLedger.website):'';
            item.Voucherp.PurchaseLedger.jurisdiction = item.Voucherp.PurchaseLedger.jurisdiction &&  item.Voucherp.PurchaseLedger.jurisdiction!==''? decrypt(item.Voucherp.PurchaseLedger.jurisdiction):'';
            item.Voucherp.PurchaseLedger.cin_number = item.Voucherp.PurchaseLedger.cin_number && item.Voucherp.PurchaseLedger.cin_number!==''? decrypt(item.Voucherp.PurchaseLedger.cin_number):'';
          }

          if(item.Voucherp.item_entries && item.Voucherp.item_entries.length>0){
            item.Voucherp.item_entries.map(ele=>{
              ele.quantity = ele.quantity && ele.quantity!==''? decrypt(ele.quantity):'';
              ele.name = ele.name && ele.name!==''? decrypt(ele.name):'';
              ele.hsn_code = ele.hsn_code && ele.hsn_code!==''? decrypt(ele.hsn_code):'';
              ele.price = ele.price && ele.price!==''? decrypt(ele.price):'';
              ele.discount = ele.discount && ele.discount!==''? decrypt(ele.discount):'';
              ele.total_amount = ele.total_amount && ele.total_amount!==''? decrypt(ele.total_amount):'';
            })
          }

          if(item.Voucherp.tax_entries && item.Voucherp.tax_entries.length>0){
            item.Voucherp.tax_entries.map(ele=>{
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

                ele.ledger.website = ele.ledger.website && ele.ledger.website!==''? decrypt(ele.ledger.website):'';
                ele.ledger.jurisdiction = ele.ledger.jurisdiction && ele.ledger.jurisdiction!==''? decrypt(ele.ledger.jurisdiction):'';
                ele.ledger.cin_number = ele.ledger.cin_number && ele.ledger.cin_number!==''? decrypt(ele.ledger.cin_number):'';
              }
            })
          }



          item.Voucherp.amount = item.Voucherp.amount && item.Voucherp.amount!==''? decrypt(item.Voucherp.amount):'';
          item.Voucherp.narration = item.Voucherp.narration && item.Voucherp.narration!==''? decrypt(item.Voucherp.narration):'';
          item.Voucherp.bank_name = item.Voucherp.bank_name && item.Voucherp.bank_name!==''? decrypt(item.Voucherp.bank_name):'';
          item.Voucherp.bank_account_number = item.Voucherp.bank_account_number && item.Voucherp.bank_account_number!==''? decrypt(item.Voucherp.bank_account_number):'';
          item.Voucherp.bank_ifsc = item.Voucherp.bank_ifsc && item.Voucherp.bank_ifsc!==''? decrypt(item.Voucherp.bank_ifsc):'';
          item.Voucherp.shipping_address = item.Voucherp.shipping_address && item.Voucherp.shipping_address!==''? decrypt(item.Voucherp.shipping_address):'';
          item.Voucherp.sub_amount = item.Voucherp.sub_amount && item.Voucherp.sub_amount!==''? decrypt(item.Voucherp.sub_amount):'';
          item.Voucherp.discount = item.Voucherp.discount && item.Voucherp.discount!==''? decrypt(item.Voucherp.discount):'';
          item.Voucherp.total_amount = item.Voucherp.total_amount && item.Voucherp.total_amount!==''? decrypt(item.Voucherp.total_amount):'';
        } 

        // if(item.ledger){
        //   item.ledger.name = item.ledger.name && item.ledger.name!==''? decrypt(item.ledger.name):'';
        //   item.ledger.email = item.ledger.email && item.ledger.email!==''? decrypt(item.ledger.email):'';
        //   item.ledger.amount = item.ledger.amount && item.ledger.amount!==''? decrypt(item.ledger.amount):'';
        //   item.ledger.phone = item.ledger.phone && item.ledger.phone!==''? decrypt(item.ledger.phone):'';
        //   item.ledger.street =  item.ledger.street && item.ledger.street!==''?decrypt(item.ledger.street):'';
        //   item.ledger.area = item.ledger.area && item.ledger.area!==''? decrypt(item.ledger.area):'';
        //   item.ledger.gst_number =  item.ledger.gst_number && item.ledger.gst_number!==''? decrypt(item.ledger.gst_number):'';
        //   item.ledger.opening_balance =  item.ledger.opening_balance && item.ledger.opening_balance!==''? decrypt(item.ledger.opening_balance):'';
        //   item.ledger.cess_Vouchers =  item.ledger.cess_Vouchers && item.ledger.cess_Vouchers!==''? decrypt(item.ledger.cess_Vouchers):'';
        //   item.ledger.bank_name =  item.ledger.bank_name && item.ledger.bank_name!==''? decrypt(item.ledger.bank_name):'';
        //   item.ledger.bank_branch =  item.ledger.bank_branch && item.ledger.bank_branch!==''? decrypt(item.ledger.bank_branch):'';
        //   item.ledger.account_holder_name =  item.ledger.account_holder_name && item.ledger.account_holder_name!==''? decrypt(item.ledger.account_holder_name):'';
        //   item.ledger.ifsc =  item.ledger.ifsc && item.ledger.ifsc!==''? decrypt(item.ledger.ifsc):'';
        //   item.ledger.pan_number =  item.ledger.pan_number && item.ledger.pan_number!==''? decrypt(item.ledger.pan_number):'';
        //   item.ledger.bank_account_number =  item.ledger.bank_account_number && item.ledger.bank_account_number!==''? decrypt(item.ledger.bank_account_number):'';  

        //   item.ledger.website = item.ledger.website && item.ledger.website!==''? decrypt(item.ledger.website):'';
        //   item.ledger.jurisdiction = item.ledger.jurisdiction && item.ledger.jurisdiction!==''? decrypt(item.ledger.jurisdiction):'';
        //   item.ledger.cin_number = item.ledger.cin_number && item.ledger.cin_number!==''? decrypt(item.ledger.cin_number):'';
        // }

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
    if( data.dataValues.PurchaseLedger){
       data.dataValues.PurchaseLedger.name =  data.dataValues.PurchaseLedger.name &&  data.dataValues.PurchaseLedger.name!==''?decrypt( data.dataValues.PurchaseLedger.name):'';
       data.dataValues.PurchaseLedger.amount =  data.dataValues.PurchaseLedger.amount &&  data.dataValues.PurchaseLedger.amount!==''?decrypt( data.dataValues.PurchaseLedger.amount):'';
       data.dataValues.PurchaseLedger.opening_balance =  data.dataValues.PurchaseLedger.opening_balance &&  data.dataValues.PurchaseLedger.opening_balance!==''?decrypt( data.dataValues.PurchaseLedger.opening_balance):'';
       data.dataValues.PurchaseLedger.account_holder_name =  data.dataValues.PurchaseLedger.account_holder_name &&  data.dataValues.PurchaseLedger.account_holder_name!==''?decrypt( data.dataValues.PurchaseLedger.account_holder_name):'';
       data.dataValues.PurchaseLedger.bank_account_number =  data.dataValues.PurchaseLedger.bank_account_number &&  data.dataValues.PurchaseLedger.bank_account_number!==''?decrypt( data.dataValues.PurchaseLedger.bank_account_number):'';
       data.dataValues.PurchaseLedger.bank_branch =  data.dataValues.PurchaseLedger.bank_branch &&  data.dataValues.PurchaseLedger.bank_branch!==''?decrypt( data.dataValues.PurchaseLedger.bank_branch):'';
       data.dataValues.PurchaseLedger.bank_name =  data.dataValues.PurchaseLedger.bank_name &&  data.dataValues.PurchaseLedger.bank_name!==''?decrypt( data.dataValues.PurchaseLedger.bank_name):'';
       data.dataValues.PurchaseLedger.website = data.dataValues.PurchaseLedger.website && data.dataValues.PurchaseLedger.website!==''? decrypt(data.dataValues.PurchaseLedger.website):'';
       data.dataValues.PurchaseLedger.jurisdiction = data.dataValues.PurchaseLedger.jurisdiction && data.dataValues.PurchaseLedger.jurisdiction!==''? decrypt(data.dataValues.PurchaseLedger.jurisdiction):'';
       data.dataValues.PurchaseLedger.cin_number = data.dataValues.PurchaseLedger.cin_number && data.dataValues.PurchaseLedger.cin_number!==''? decrypt(data.dataValues.PurchaseLedger.cin_number):'';
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