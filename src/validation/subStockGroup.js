
export async function createSubStockGroupValidation(data) {
    let error = [];
    if(await !data.stock_name){
        error.push('Stock name')
    }if(await !data.stock_id){
        error.push('stock id')
    }
    if(await !data.company_id){
        error.push('company id')
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