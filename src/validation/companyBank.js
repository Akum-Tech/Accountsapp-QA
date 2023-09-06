
export async function createCompanyBankValidation(data) {
    let error = [];
    if(await !data.account_number){
        error.push('Account Number')
    }
    if(await !data.ifsc_code){
        error.push('IFSC Code')
    }
    if(await !data.branch_name){
        error.push('Branch Name')
    }
    if(await !data.bank_name){
        error.push('Bank Name')
    }
    if(await !data.company_id){
        error.push('Company')
    }
    if(error.length>0){
        return {
            success:false,
            message:error.join(',')+ ' is required!'
        }
    }else{
        return {
            success:true
        }
    }
}