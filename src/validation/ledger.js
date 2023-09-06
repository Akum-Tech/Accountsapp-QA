
export async function createLedgerValidation(data) {
     let error = [];
    if(await !data.name){
        error.push('Ledger name')
    }
    if(await !data.account_group_id){
        error.push('Account group')
    }
    if(await !data.opening_balance){
        error.push('Opening balance')
    }
    if(await !data.amount){
        error.push('Amount')
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