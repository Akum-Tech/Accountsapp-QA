
export async function createJournalVoucherValidation(data) {
    let error = [];
    if(await !data.company_id){
        error.push('Company')
    }
    if(await !data.total_amount){
        error.push('Total amount')
    }
    if(await !data.purpose_id){
        error.push('Purpose')
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