
export async function createmaualstockValidation(data) {
    let error = [];
    if(await !data.company_id){
        error.push('Company id')
    }
    if(await !data.stockvalue){
        error.push('Stock value')
    }
    
    if(await !data.closingdate){
        error.push('Closing date')
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