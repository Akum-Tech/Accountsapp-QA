
export async function createRecieptVoucherValidation(data) {
    let error = [];
    if(await !data.company_id){
        error.push('Company')
    }
    if(await !data.ledger_id){
        error.push('leadger')
    }
    if(await !data.receive_id){
        error.push('Revicer Leadger')
    }
    if(await !data.total_amount){
        error.push('Total amount')
    }
    // if(await !data.gst_rate){
    //     error.push('GST Rate')
    // }

    // if(await !data.rate){
    //     error.push('Rate')
    // }
    // if(await !data.standard_sale_rate){
    //     error.push('Standard sale rate')
    // }
    // if(await !data.standard_purchase_rate){
    //     error.push('Standard purchase rate')
    // }
    // if(await !data.total_value){
    //     error.push('Total value')
    // }
    // if(await !data.company_id){
    //     error.push('Comapny')
    // }
    if(error.length>0){
        return {
            success:false,
            message:error.join(',') + ' is required!'
        }
    }else{
        return {
            success:true
        }
    }
}