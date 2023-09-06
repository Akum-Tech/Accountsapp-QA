
export async function forgetPasswordValidation(data) {
    let error = [];   
       if(await !data.email && !data.phone){
           error.push('Email OR Phone')
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

export async function verifyOtpValidation(data) {
    let error = [];   
       if(await !data.user_id){
           error.push('User ID')
       }
        if(await !data.otp){
           error.push('OTP')
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

export async function updatePasswordValidation(data) {
    let error = [];   
       if(await !data.user_id){
           error.push('User ID')
       }
        if(await !data.otp){
           error.push('OTP')
       }
       if(await !data.password){
           error.push('new password')
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