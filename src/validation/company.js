
export async function createCompanyValidation(data) {
    let error = [];
    if(await !data.company_name){
        error.push('Comapny name')
    }
    
    if(await !data.state_id){
        error.push('State')
    }
    if(await !data.city_id){
        error.push('City')
    }
    if(await !data.financial_year){
        error.push('Financial year')
    }

    // if(await !data.area){
    //     error.push('Area')
    // }
    // if(await !data.pin_code){
    //     error.push('Pin Code')
    // }
    // if(await !data.gst_number){
    //     error.push('GST Number')
    // }
    // if(await !data.terms){
    //     error.push('Terms')
    // }
    // if(await !data.cin_number){
    //     error.push('CIN Number')
    // }
    // if(await !data.company_pan_number){
    //     error.push('Comapny Pan Number')
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