import Users from '../models/users';
import Forgetpassword from '../models/forgetpassword';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import otpGenerator from 'otp-generator';
import uniqid from 'uniqid';
import Constant from '../constant/config'
import sha1 from 'sha1';
import "@babel/polyfill";
const axios = require('axios');
var handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
import mailotpTrigger from "../utility/mail"


exports.genrateOtp = async function (data, res) {
    try {
        let checkdata = await Users.findOne({
            where: {
                [Op.or]: [{
                    email: data.email
                }, {
                    phone: data.phone
                }]
            }
        });
        if (checkdata) {
            let otp = otpGenerator.generate(6, {
                alphabets: false,
                upperCase: false,
                specialChars: false
            });
            data.creation_date = new Date();
            data.updated_date = new Date();
            data.otp = otp;
            data.user_id = checkdata.uid;
            data.is_verified = 0;
            let checkdata1 = await Forgetpassword.findOne({
                where: {
                    user_id: checkdata.uid
                }
            });
            if (checkdata1) {
                let updatedata2 = await checkdata1.update(data)
                if (updatedata2) {

                    if (data.phone) {
                        let number = checkdata.phone;
                        //  let url=Constant.smsurl;
                        // let urlwithnumber = url.concat(number);
                        //  let v1= urlwithnumber.concat('&template_id=');
                        //     let v2=v1.concat(Constant.verficationotpid);
                        //     let v3=v2.concat('&msgtxt=');
                        //      let v4=v3.concat(Constant.verficationotpmsgtxt1);
                        //    let v5= v4.concat(otp);
                        //     let msg= v5.concat(Constant.verficationotpmsgtxt2);

                        let url = Constant.smsurl;
                        let urlwithnumber = url.concat(number);
                        let v3 = urlwithnumber.concat("&message=");
                        let v4 = v3.concat(Constant.verficationotpmsgtxt1);
                        let v5 = v4.concat(otp);
                        let msg = v5;
                        //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
                        console.log('smstemplate', msg);
                        // let lasturl=data.concat(msg);
                        axios.get(msg)
                            .then(function (response) {
                                // handle success
                                console.log(response);
                                console.log("response");
                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                                console.log("error");
                            })
                            .then(function () {
                                // always executed
                                console.log("always");
                            });
                    } else {
                        var html = fs.readFileSync(
                            path.resolve(__dirname, "../template/forgot.html"),
                            "utf8"
                        );
                        var template = handlebars.compile(html);
                        var replacements = {
                            otp: otp
                        };
                        var htmlToSend = template(replacements);
                        let userMailName = checkdata.name;
                        let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 1)
                    }
                    return {
                        statusCode: res.statusCode,
                        success: true,
                        message: "Otp send Sucessfully",
                        userinfo: {
                            'userid': checkdata.uid
                        }
                    };

                } else {
                    return {
                        statusCode: res.statusCode,
                        success: false,
                        message: "request not genrated please try later",

                    };
                }
            } else {
                let createdata = await Forgetpassword.create(data);
                if (createdata) {

                    if (data.phone) {
                        let number = checkdata.phone;
                        //  let url=Constant.smsurl;
                        // let urlwithnumber = url.concat(number);
                        //  let v1= urlwithnumber.concat('&template_id=');
                        //     let v2=v1.concat(Constant.verficationotpid);
                        //     let v3=v2.concat('&msgtxt=');
                        //      let v4=v3.concat(Constant.verficationotpmsgtxt1);
                        //    let v5= v4.concat(otp);
                        //     let msg= v5.concat(Constant.verficationotpmsgtxt2);

                        let url = Constant.smsurl;
                        let urlwithnumber = url.concat(number);
                        let v3 = urlwithnumber.concat("&message=");
                        let v4 = v3.concat(Constant.verficationotpmsgtxt1);
                        let v5 = v4.concat(otp);
                        let msg = v5;
                        //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
                        console.log('smstemplate', msg);
                        //let lasturl=data.concat(msg);
                        axios.get(msg)
                            .then(function (response) {
                                // handle success
                                console.log(response);
                                console.log("response");
                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                                console.log("error");
                            })
                            .then(function () {
                                // always executed
                                console.log("always");
                            });
                    } else {
                        var html = fs.readFileSync(
                            path.resolve(__dirname, "../template/forgot.html"),
                            "utf8"
                        );
                        var template = handlebars.compile(html);
                        var replacements = {
                            otp: otp
                        };
                        var htmlToSend = template(replacements);
                        let userMailName = checkdata.name;
                        let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 1)
                    }

                    return {
                        statusCode: res.statusCode,
                        success: true,
                        message: "Otp send Sucessfully",
                        userinfo: {
                            'userid': checkdata.uid
                        }
                    };
                } else {
                    return {
                        statusCode: res.statusCode,
                        success: false,
                        message: "request not genrated please try later"
                    };
                }
            }
        } else {
            return {
                statusCode: res.statusCode,
                success: false,
                message: "User Not Exsit!"
            };

        }
    } catch (e) {
        console.log()
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}

exports.verifyotp = async function (data, res) {
    try {
        let finddata = await Forgetpassword.findOne({
            where: {
                user_id: data.user_id,
                otp: data.otp,
                is_verified: '0'
            }
        });
        if (finddata) {
            return {
                statusCode: res.statusCode,
                success: true,
                message: "OTP verify Sucessfully"
            };

        } else {
            return {
                statusCode: res.statusCode,
                success: false,
                message: "OTP not valid!"
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}

exports.updateData = async function (id, data, res) {
    try {
        let finddata = await Users.findOne({
            where: {
                uid: id
            }
        });
        if (finddata) {
            data.updated_date = new Date();
            data.password = await sha1(data.password);
            let updatedata = await finddata.update(data)
            if (updatedata) {
                let finddata1 = await Forgetpassword.findOne({
                    where: {
                        user_id: id
                    }
                });
                data.is_verified = 1;
                let updatedata1 = await finddata1.update(data)
                return {
                    statusCode: res.statusCode,
                    success: true,
                    message: "Password update Successfully"
                };

            } else {
                return {
                    statusCode: res.statusCode,
                    success: false,
                    message: "someting went wrong Please try later"
                };
            }
        } else {
            return {
                statusCode: res.statusCode,
                success: false,
                message: "User not found!"
            };
        }
    } catch (e) {
        return {
            statusCode: res.statusCode,
            success: false,
            error: e.message,
            message: "Something went wrong!"
        }
    }
}