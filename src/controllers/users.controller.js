import UserServices from '../services/user.service'
import { createUserValidation } from '../validation/user';
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"
import { ChangeUser } from 'mysql2/lib/commands';

export async function getUsers(req, res) {
    console.log(req.body, "testing")
    try {
        // req.body.data =  req.decoded.data;
        console.log(req.body, "testing")
        let getdata = await UserServices.getAllData(req.body, res);
        console.log(getdata)
        if (getdata) {
            res.json(getdata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            success: false,
            error: err,
            message: "Something wentfdsfsd wrong!"
        })
    }
}


export async function getUser(req, res) {
    try {
        if (!req.params.id) {
            return res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: "User id required!",
                user: {}
            });
        }
        req.body.data = req.decoded.data;
        let createdata = await UserServices.getSingleData(req.params.id, req.body, res);
        if (createdata) {
            res.json(createdata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            success: false,
            error: err,
            message: "Something went wrong!"
        })
    }
}

export async function createUser(req, res) {
    try {
        let validation = await createUserValidation(req.body);
        if (validation.success) {
            let checkdata = await UserServices.createData(req.body, res);
            if (checkdata) {
                res.json(checkdata);
            }
        } else {
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: validation.message
            })
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            success: false,
            error: "test",
            message: "Something went wrong!"
        })
    }
}

export async function deleteUser(req, res) {
    try {
        if (!req.params.id) {
            return res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: "User id required!",
                user: {}
            });
        }
        req.body.data = req.decoded.data;
        let deletedata = await UserServices.deleteData(req.params.id, res);
        if (deletedata) {
            res.json(deletedata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}


export async function updateUsers(req, res) {
    try {
        if (!req.params.id) {
            return res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: "User id required!",
                user: {}
            });
        }
        req.body.data = req.decoded.data;
        let validation = await createUserValidation(req.body);
        if (validation.success) {
            let updatedata = await UserServices.updateData(req.params.id, req.body, res);
            if (updatedata) {
                res.json(updatedata);
            }
        } else {
            res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: validation.message
            })
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function updatesubscriptionUsers(req, res) {
    try {
        if (!req.params.id) {
            return res.json({
                statusCode: await checkCode('validation'),
                success: false,
                message: "User id required!",
                user: {}
            });
        }
        req.body.data = req.decoded.data;
        // let validation =await createUserValidation(req.body);
        // if(validation.success){
        let updatedata = await UserServices.updatesubscriptionData(req.params.id, req.body, res);
        if (updatedata) {
            res.json(updatedata);
        }
        // }else{
        //     res.json({
        //         statusCode: await checkCode('validation'),
        //         success: false,
        //         message:validation.message
        //     })
        // }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}



export async function login(req, res) {
    console.log("testing mail")
    try {
        let logindata = await UserServices.loginUser(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function emailverify(req, res) {
    try {
        let logindata = await UserServices.verifyotpemail(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function mobileverify(req, res) {
    try {
        let logindata = await UserServices.verifyotpmobile(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function resendotpemail(req, res) {
    try {
        let logindata = await UserServices.resendotpemail(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}


export async function resendotpmobile(req, res) {
    try {
        let logindata = await UserServices.resendotpmobile(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function checksubscription(req, res) {
    try {
        req.body.data = req.decoded.data;
        let logindata = await UserServices.checksubscription(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function checksubscriptionuser(req, res) {
    try {
        req.body.data = req.decoded.data;
        let logindata = await UserServices.checksubscriptionuser(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err,
            success: false,
            message: "Something went wrong!"
        })
    }
}


export async function testemail(req, res) {
    try {
        //req.body.data = req.decoded.data;

        let logindata = await UserServices.testemail(req.body, res);
        if (logindata) {
            res.json(logindata);
        }
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err.message,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function changeUserDetails(req, res) {
    try {
        let changeDetails = await UserServices.changeUserDetails(req, res)
        if (changeDetails) {
            res.json(changeDetails);
        }
    } catch {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err.message,
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function addsubUser(req, res) {
    try {
        let addUser = await UserServices.addSubUser(req, res)
        res.json(addUser)
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err.message,
            success: false,
            message: "Something went wrong!"
        })
    }
}


export async function checkExistUser(req, res) {
    try {
        let checkExistUser = await UserServices.checkingExistUser(req, res)
        res.json(checkExistUser)
    } catch (err) {
        res.status(500).json({
            statusCode: await checkCode('error'),
            error: err.message,
            success: false,
            message: "Something went wrong!"
        })
    }
}
//lead creation
// export async function usersToLeads(req, res) {
//     try {
//         let insertUser = await UserServices.convertUserToLeads(req, res)
//         res.json(insertUser)
//     } catch (err) {
//         res.status(500).json({
//             statusCode: await checkCode('error'),
//             error: err.message,
//             success: false,
//             message: "Something went wrong!"
//         })
//     }
// }