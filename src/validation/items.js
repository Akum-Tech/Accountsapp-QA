
export async function createItemsValidation(data) {
    let error = [];
    if(await !data.name){
        error.push('Item name')
    }
    if(await !data.unit_id){
        error.push('Unit')
    }
    if(await !data.stock_group_id){
        error.push('Stock Group')
    }

    // if(await !data.hsn_code){
    //     error.push('HSN Code')
    // }
    // if(await !data.taxes_slab_id){
    //     error.push('Tax Rate')
    // }
    // if(await !data.standard_sale_rate){
    //     error.push('Standard sale rate')
    // }
    // if(await !data.standard_purchase_rate){
    //     error.push('Standard purchase rate')
    // }
    if(await !data.total_value){
        error.push('Total value')
    }
    if(await !data.company_id){
        error.push('Comapny')
    }
    if(await !data.period_start){
        error.push('Period start')
    }
    if(await !data.period_end){
        error.push('Period end')
    }
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