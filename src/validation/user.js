
export async function createUserValidation(data) {
    let error = [];
    if(await !data.name){
        error.push('name')
    }
    // if(await !data.email){
    //     error.push('email')
    // }
    if(await !data.password){
        error.push('password')
    }
    if(await data.email=='' && await data.phone==''){
        error.push('email');
        error.push('phone')

    }
    // if(await !data.phone){
    //     error.push('phone')
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